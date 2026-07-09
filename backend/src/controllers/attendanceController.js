const Attendance = require('../models/Attendance');
const Shift = require('../models/Shift'); 
const { getDistanceInMeters } = require('../utils/geoUtils');

// Configuration Constants
const SCHOOL_LAT = 20.376787623763956; 
const SCHOOL_LNG = 85.88828842333056;
const GEOFENCE_RADIUS_METERS = 400; 
const GRACE_PERIOD_MS = 2 * 60 * 1000; 
const MIN_REQUIRED_WORKING_MINUTES = (6 * 60) + 5; // 6.05 hours = 365 minutes


/**
 * Calculates delay in minutes between the assigned shift start time ("HH:MM") and actual check-in.
 */
function getMinutesBetweenShiftAndDate(shiftTimeStr, actualDate) {
  const [hours, minutes] = shiftTimeStr.split(':').map(Number);
  const shiftDate = new Date(actualDate);
  shiftDate.setHours(hours, minutes, 0, 0);
  
  // Returns difference in minutes (positive means late, negative means early)
  return (actualDate - shiftDate) / (1000 * 60);
}

/**
 * Calculates total worked minutes, explicitly excluding break durations.
 */
function calculateNetWorkingMinutes(punchIn, punchOut, breaks) {
  let totalMs = punchOut - punchIn;
  
  breaks.forEach(b => {
    if (b.start && b.end) {
      totalMs -= (b.end - b.start);
    } else if (b.start && !b.end) {
      totalMs -= (punchOut - b.start);
    }
  });
  
  return Math.max(0, Math.floor(totalMs / (1000 * 60)));
}

/**
 * Calculates net working minutes and updates the attendance document.
 */
async function finalizeDayStatus(attendance, punchOutTime) {
  // Ensure we use the provided punchOutTime
  attendance.punchOutTime = punchOutTime;
  
  // Calculate total minutes
  const netMinutes = calculateNetWorkingMinutes(
    attendance.punchInTime, 
    punchOutTime, 
    attendance.breaks
  );
  
  // Update the model field
  attendance.totalWorkingMinutes = netMinutes;

  // Determine Day Status based on threshold
  if (netMinutes < MIN_REQUIRED_WORKING_MINUTES) {
    attendance.dayStatus = 'Half Day';
  } else {
    // If it was already marked 'Late' at start, keep it; otherwise, 'Present'
    attendance.dayStatus = attendance.isLate ? 'Late' : 'Present';
  }
  
  // We do NOT call attendance.save() here, because the controller 
  // that calls this function will handle the .save() operation.
  return attendance;
}

// ==========================================
// CONTROLLER ROUTE HANDLERS
// ==========================================

// FETCH USER STATUS ON COMPONENT MOUNT
exports.getTodayStatus = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({ employeeId: req.employee._id, date: today });
    
    if (!attendance) {
      return res.json({ status: "Not Punched In", data: null });
    }
    return res.json({ status: attendance.status, data: attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 1. PUNCH IN
exports.punchIn = async (req, res) => {
  try {
    const { lat, lng, accuracy } = req.body;
    const today = new Date().toISOString().split('T')[0];

    // Block action if any record exists for today
    const existing = await Attendance.findOne({ employeeId: req.employee._id, date: today });
    if (existing) return res.status(400).json({ message: "Attendance limits exceeded. Shift complete or active for today." });

    // Boundary Validation
    const distance = getDistanceInMeters(lat, lng, SCHOOL_LAT, SCHOOL_LNG);
    if (distance > GEOFENCE_RADIUS_METERS) {
      return res.status(400).json({ message: `Outside campus bounds. You are ${Math.round(distance)}m away.` });
    }

    // Shift Tracking & Late Status Logic
    const shift = await Shift.findOne({ employee: req.employee._id, date: today, status: "Active" });
    let isLate = false;
    let dayStatus = 'Present'; 

    if (shift) {
      const delayMinutes = getMinutesBetweenShiftAndDate(shift.startTime, new Date());
      if (delayMinutes > 15) {
        isLate = true;
        dayStatus = 'Late'; 
      }
    }

    const newAttendance = new Attendance({
      employeeId: req.employee._id,
      employeeCustomId: req.employee.employeeId,
      name: req.employee.name,
      date: today,
      punchInTime: new Date(),
      coordinates: { punchIn: { lat, lng, accuracy } },
      status: 'Working',
      isLate,
      dayStatus
    });

    await newAttendance.save();
    res.status(201).json({ message: "Punched in successfully!", data: newAttendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. TOGGLE BREAK STATE
exports.toggleBreak = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const attendance = await Attendance.findOne({ employeeId: req.employee._id, date: today });
    
    if (!attendance || ['Punched Out', 'Auto Punched Out'].includes(attendance.status)) {
      return res.status(400).json({ message: "No active working session found to modify break status." });
    }

    const now = new Date();
    if (attendance.status === 'Working') {
      attendance.status = 'On Break';
      attendance.breaks.push({ start: now });
    } else if (attendance.status === 'On Break') {
      attendance.status = 'Working';
      if (attendance.breaks.length > 0) {
        attendance.breaks[attendance.breaks.length - 1].end = now;
      }
    }

    await attendance.save();
    res.json({ message: `Status flipped to ${attendance.status}`, data: attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. CONTINUOUS SYNC (GEOFENCE CHECK)
exports.syncLocation = async (req, res) => {
  try {
    const { lat, lng, accuracy } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({ 
      employeeId: req.employee._id, 
      date: today, 
      status: { $in: ['Working', 'On Break'] } 
    });
    if (!attendance) return res.status(404).json({ message: "No active session tracked." });

    if (attendance.status === 'On Break') {
      return res.json({ isInside: true, status: attendance.status });
    }

    const distance = getDistanceInMeters(lat, lng, SCHOOL_LAT, SCHOOL_LNG);
    const isInside = distance <= GEOFENCE_RADIUS_METERS;

    if (isInside) {
      if (attendance.isOutsideCampus) {
        attendance.isOutsideCampus = false;
        attendance.leftCampusAt = null;
        await attendance.save();
      }
      return res.json({ isInside: true, status: attendance.status });
    } else {
      const now = new Date();
      if (!attendance.isOutsideCampus) {
        attendance.isOutsideCampus = true;
        attendance.leftCampusAt = now;
        await attendance.save();
        return res.json({ isInside: false, message: "Left campus boundary. 2-minute auto punch-out timer started.", status: attendance.status });
      } else {
        const elapsed = now - new Date(attendance.leftCampusAt);
        
        // Timer Expired: Trigger Auto Punch Out
        if (elapsed >= GRACE_PERIOD_MS) {
          attendance.status = 'Auto Punched Out';
          attendance.punchOutTime = now;
          attendance.coordinates.punchOut = { lat, lng, accuracy };
          
          // Calculate final work metrics
          await finalizeDayStatus(attendance, now);
          
          await attendance.save();
          return res.json({ isInside: false, status: 'Auto Punched Out', message: "Auto punched out due to boundary breach expiration." });
        }
        
        const secondsLeft = Math.round((GRACE_PERIOD_MS - elapsed) / 1000);
        return res.json({ isInside: false, message: `Outside boundary. Auto punch-out in ${secondsLeft} seconds.`, status: attendance.status });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. MANUAL PUNCH OUT
exports.punchOut = async (req, res) => {
  try {
    const { lat, lng, accuracy } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({ 
      employeeId: req.employee._id, 
      date: today, 
      status: { $in: ['Working', 'On Break'] } 
    });
    if (!attendance) return res.status(404).json({ message: "No active session found to punch out from." });

    const distance = getDistanceInMeters(lat, lng, SCHOOL_LAT, SCHOOL_LNG);
    if (distance > GEOFENCE_RADIUS_METERS) {
      return res.status(400).json({ message: `Cannot punch out. You are outside bounds (${Math.round(distance)}m away).` });
    }

    const now = new Date();
    
    // Close out open breaks cleanly
    if (attendance.status === 'On Break' && attendance.breaks.length > 0) {
      attendance.breaks[attendance.breaks.length - 1].end = now;
    }

    attendance.punchOutTime = now;
    attendance.status = 'Punched Out';
    attendance.coordinates.punchOut = { lat, lng, accuracy };
    
    // Calculate final work metrics
    await finalizeDayStatus(attendance, now);
    
    await attendance.save();
    res.json({ message: "Punched out successfully!", data: attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add this to your attendanceController.js file

exports.getMonthlyAttendance = async (req, res) => {
  try {
    const { year, month } = req.query; // e.g., year=2026, month=01 (1-indexed base)
    if (!year || !month) {
      return res.status(400).json({ message: "Year and Month query parameters are required." });
    }

    const employeeId = req.employee._id;
    const targetMonthPrefix = `${year}-${month.toString().padStart(2, '0')}`; // "2026-01"

    // 1. Fetch all attendance logs for this employee in the specific month
    const logs = await Attendance.find({
      employeeId,
      date: { $regex: `^${targetMonthPrefix}` }
    });

    // 2. Fetch all shifts assigned to this employee during this month to mark accurate Absents
    const shifts = await Shift.find({
      employee: employeeId,
      date: { $regex: `^${targetMonthPrefix}` },
      status: "Active"
    });

    // Hash maps for quick matching
    const logsMap = new Map(logs.map(log => [log.date, log]));
    const shiftsMap = new Map(shifts.map(shift => [shift.date, shift]));

    // Determine the total days in that specific month
    const totalDaysInMonth = new Date(year, month, 0).getDate();
    
    let processedDays = [];
    let counts = { Present: 0, Absent: 0, Late: 0, "Half Day": 0 };

    // 3. Loop over every calendar day of the month
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayStr = `${targetMonthPrefix}-${day.toString().padStart(2, '0')}`;
      
      const attendanceRecord = logsMap.get(dayStr);
      const shiftRecord = shiftsMap.get(dayStr);
      
      let dayStatus = 'default';

      if (attendanceRecord) {
        // Use normalized names corresponding to our CSS status keys
        if (attendanceRecord.dayStatus === 'Present') dayStatus = 'present';
        else if (attendanceRecord.dayStatus === 'Late') dayStatus = 'late';
        else if (attendanceRecord.dayStatus === 'Half Day') dayStatus = 'halfday';
        else if (attendanceRecord.dayStatus === 'Absent') dayStatus = 'absent';
        
        if (counts[attendanceRecord.dayStatus] !== undefined) {
          counts[attendanceRecord.dayStatus]++;
        }
      } else if (shiftRecord) {
        // If a shift was assigned but no punch-in exists, it's a structural Absent
        const todayStr = new Date().toISOString().split('T')[0];
        
        // Only count as absent if the shift date has already passed or is today
        if (dayStr <= todayStr) {
          dayStatus = 'absent';
          counts['Absent']++;
        }
      }

      processedDays.push({
        day,
        dateStr: dayStr,
        status: dayStatus,
        data: attendanceRecord || null
      });
    }

    res.json({
      summary: counts,
      days: processedDays
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


