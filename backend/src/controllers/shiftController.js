const Shift = require("../models/Shift");
const AddEmployee = require("..//models/AddEmployee");

// 1. Get all employees (For populating the form's select dropdown list)
exports.getEmployeesForDropdown = async (req, res) => {
  try {
    // Selects only active employees, returning ID, Name, and Department
    const employees = await AddEmployee.find(
      { employeeStatus: "Active" },
      "_id name department"
    ).sort({ name: 1 });

    return res.status(200).json({ success: true, data: employees });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

// 2. Create shift(s) - Handles single date or explicit date ranges
exports.createShifts = async (req, res) => {
  try {
    const { employeeId, shiftType, startTime, endTime, fromDate, toDate, date, department, status } = req.body;

    if (!employeeId || !shiftType || !startTime || !endTime || !department) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    let datesToProcess = [];

    if (date) {
      // Direct single date modification
      datesToProcess.push(date);
    } else if (fromDate && toDate) {
      // Range expansion matching your React loop structural behavior
      let start = new Date(fromDate);
      let end = new Date(toDate);

      while (start <= end) {
        datesToProcess.push(start.toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
      }
    } else {
      return res.status(400).json({ success: false, message: "Please provide either a date or a valid fromDate/toDate range." });
    }

    const shiftTimelineBlocks = [];
    
    for (const currentDate of datesToProcess) {
      // Update existing record if it conflicts, otherwise create a new one safely
      const updatedShift = await Shift.findOneAndUpdate(
        { employee: employeeId, date: currentDate },
        { shiftType, startTime, endTime, department, status: status || "Active" },
        { upsert: true, new: true, runValidators: true }
      );
      shiftTimelineBlocks.push(updatedShift);
    }

    return res.status(201).json({
      success: true,
      message: `Successfully generated ${shiftTimelineBlocks.length} shift timeline blocks`,
      data: shiftTimelineBlocks
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Query & Filter Shifts with execution metrics
exports.getAllShifts = async (req, res) => {
  try {
    const { fromDate, toDate, search } = req.query;
    let query = {};

    // Apply exact Date Range bounding queries
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = fromDate;
      if (toDate) query.date.$lte = toDate;
    }

    // Fetch shift array joined with Employee matching metadata definitions
    let shifts = await Shift.find(query)
      .populate("employee", "name employeeId profileImage")
      .sort({ date: -1 });

    // Client side regex matching evaluation replacement block
    if (search) {
      const regex = new RegExp(search, "i");
      shifts = shifts.filter(shift => 
        (shift.employee && shift.employee.name.match(regex)) ||
        shift.department.match(regex) ||
        shift.shiftType.match(regex) ||
        shift.status.match(regex)
      );
    }

    return res.status(200).json({ success: true, count: shifts.length, data: shifts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update a single isolated historical cell
exports.updateShift = async (req, res) => {
  try {
    const updatedShift = await Shift.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("employee", "name employeeId");

    if (!updatedShift) {
      return res.status(404).json({ success: false, message: "Shift target not found." });
    }

    return res.status(200).json({ success: true, message: "Shift updated successfully", data: updatedShift });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete absolute timeline row
exports.deleteShift = async (req, res) => {
  try {
    const deletedShift = await Shift.findByIdAndDelete(req.params.id);
    if (!deletedShift) {
      return res.status(404).json({ success: false, message: "Shift not found." });
    }
    return res.status(200).json({ success: true, message: "Shift deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get shifts specifically for the authenticated logged-in employee
exports.getLoggedInEmployeeShifts = async (req, res) => {
  try {
    // req.employee is set by the protectEmployee middleware
    const employeeId = req.employee._id; 
    const { fromDate, toDate } = req.query;

    let query = { employee: employeeId };

    // Bounding target dates if dates are supplied by the frontend interface
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = fromDate;
      if (toDate) query.date.$lte = toDate;
    } else {
      // Default: If no dates are provided, automatically fallback to a ±15 days timeline frame
      const today = new Date();
      const prior = new Date();
      const future = new Date();
      prior.setDate(today.getDate() - 7);
      future.setDate(today.getDate() + 14);

      query.date = {
        $gte: prior.toISOString().split("T")[0],
        $lte: future.toISOString().split("T")[0]
      };
    }

    const shifts = await Shift.find(query).sort({ date: 1 });

    return res.status(200).json({
      success: true,
      count: shifts.length,
      data: shifts
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};