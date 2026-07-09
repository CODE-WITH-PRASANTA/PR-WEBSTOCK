import React, { useState, useEffect, useMemo } from "react";
import "./ShiftSchedule.css";
import API from "../../api/axios"; // Uses your pre-configured Axios instance
import { FiHome, FiChevronRight, FiClock } from "react-icons/fi";

// Fixed color-coded map for UI assignment configurations
const SHIFT_THEMES = {
  Morning: { name: "Morning Shift", color: "#45b649" },
  Evening: { name: "Evening Shift", color: "#ff9800" },
  Night: { name: "Night Shift", color: "#673ab7" },
  Off: { name: "Off", color: "#e5e7eb" }
};
const SHIFT_DETAILS_LEGEND = [
  {
    title: "Morning Shift",
    time: "08:00 AM - 02:30 PM",
    break: "Break: 10 min",
    color: "#45b649",
  },
  {
    title: "Evening Shift",
    time: "02:30 PM - 09:00 PM",
    break: "Break: 10 min",
    color: "#ff9800",
  },
  {
    title: "Night Shift",
    time: "10:00 PM - 06:00 AM (Next Day)",
    break: "Break: 1.5hr ",
    color: "#673ab7",
  },
];

const ShiftSchedule = () => {
  const [dbShifts, setDbShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate Current Week Array Structure (Mon -> Sun) dynamically
  const currentWeekDays = useMemo(() => {
    const daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = new Date();
    
    // Adjust index offset so Monday counts as day index 0
    const currentDayOfWeek = today.getDay(); 
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; 
    
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() + distanceToMonday);

    return daysName.map((dayName, idx) => {
      const targetDate = new Date(mondayDate);
      targetDate.setDate(mondayDate.getDate() + idx);
      
      const isoString = targetDate.toISOString().split("T")[0]; // YYYY-MM-DD
      const localizedDisplayDate = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // "Jan 20"
      
      return {
        day: dayName,
        dateStr: isoString,
        displayDate: localizedDisplayDate
      };
    });
  }, []);

  useEffect(() => {
    const fetchMyWeeklySchedule = async () => {
      try {
        setLoading(true);
        // Bounding API data fetch precisely to current visible week boundaries
        const fromDate = currentWeekDays[0].dateStr;
        const toDate = currentWeekDays[6].dateStr;

        const response = await API.get("/shifts/my-shifts", {
          params: { fromDate, toDate }
        });

        if (response.data.success) {
          setDbShifts(response.data.data);
        }
      } catch (err) {
        console.error("Error retrieving personal shift schedule logs:", err);
        setError(err.response?.data?.message || "Failed to load schedule data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyWeeklySchedule();
  }, [currentWeekDays]);

  // Merge generated calendar baseline with retrieved API shifts
  const weeklyScheduleData = useMemo(() => {
    return currentWeekDays.map((calendarDay) => {
      // Match calendar format template directly to 'YYYY-MM-DD'
      const activeShiftRecord = dbShifts.find(
        (s) => s.date.split("T")[0] === calendarDay.dateStr && s.status === "Active"
      );

      if (activeShiftRecord && SHIFT_THEMES[activeShiftRecord.shiftType]) {
        return {
          day: calendarDay.day,
          date: calendarDay.displayDate,
          shift: SHIFT_THEMES[activeShiftRecord.shiftType].name,
          color: SHIFT_THEMES[activeShiftRecord.shiftType].color
        };
      }

      // Default state when no active record coordinates match
      return {
        day: calendarDay.day,
        date: calendarDay.displayDate,
        shift: "Off",
        color: SHIFT_THEMES.Off.color
      };
    });
  }, [currentWeekDays, dbShifts]);

  return (
    <div className="shift-page">
      {/* Header */}
      <div className="shift-header">
        <h2>Shift Schedule</h2>
        <div className="breadcrumb">
          <FiHome />
          <FiChevronRight />
          <span>Attendance</span>
          <FiChevronRight />
          <span>Schedule</span>
        </div>
      </div>

      {/* Weekly Schedule Display Block */}
      <div className="schedule-section">
        <h2>My Weekly Schedule</h2>
        
        {loading && <div className="schedule-status-msg">Syncing your timeline blocks...</div>}
        {error && <div className="schedule-status-msg schedule-status-msg--error">❌ {error}</div>}
        
        {!loading && !error && (
          <div className="schedule-grid">
            {weeklyScheduleData.map((item, index) => (
              <div
                className="schedule-card"
                key={index}
                style={{ borderTop: `5px solid ${item.color}` }}
              >
                <h3>{item.day}</h3>
                <p>{item.date}</p>
                <div className="shift-tag" style={{ color: item.shift === "Off" ? "#718096" : item.color }}>
                  {item.shift}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shift Reference Details Metadata section */}
      <div className="details-section">
        <h2>Shift Details Legend Reference</h2>
        <div className="details-grid">
          {SHIFT_DETAILS_LEGEND.map((shift, index) => (
            <div className="detail-card" key={index}>
              <div className="clock-icon" style={{ background: shift.color }}>
                <FiClock />
              </div>
              <div>
                <h3>{shift.title}</h3>
                <h4>{shift.time}</h4>
                <p>{shift.break}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default ShiftSchedule;