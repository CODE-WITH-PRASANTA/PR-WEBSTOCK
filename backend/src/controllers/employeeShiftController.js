const EmployeeShift = require("../models/EmployeeShift");
const AddEmployee = require("../models/AddEmployee");

exports.createShift = async (req, res) => {
  try {
    const {
      employeeId,
      shift,
      minStartTime,
      startTime,
      maxStartTime,
      minEndTime,
      endTime,
      maxEndTime,
    } = req.body;

    // employeeId = Mongo _id from AddEmployee
    const employee = await AddEmployee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    const alreadyAssigned = await EmployeeShift.findOne({
      employee: employee._id,
    });

    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,
        message: "Shift already assigned.",
      });
    }

    const newShift = await EmployeeShift.create({
      employee: employee._id,
      employeeId: employee.employeeId,
      name: employee.name,
      department: employee.department,

      shift,
      minStartTime,
      startTime,
      maxStartTime,
      minEndTime,
      endTime,
      maxEndTime,
    });

    res.status(201).json({
      success: true,
      message: "Employee shift assigned successfully.",
      data: newShift,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getEmployeeDropdown = async (req, res) => {
  try {
    const employees = await AddEmployee.find(
      {},
      "employeeId name department"
    ).sort({ employeeId: 1 });

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await EmployeeShift.find()
      .populate("employee")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: shifts.length,
      data: shifts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getShiftById = async (req, res) => {
  try {
    const shift = await EmployeeShift.findById(req.params.id).populate(
      "employee"
    );

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: "Shift not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: shift,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateShift = async (req, res) => {
  try {
    const shift = await EmployeeShift.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: "Shift not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shift updated successfully.",
      data: shift,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteShift = async (req, res) => {
  try {
    await EmployeeShift.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Shift deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};