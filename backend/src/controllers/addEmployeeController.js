const AddEmployee = require("../models/AddEmployee");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

/* ===========================================
   Create Employee Login
=========================================== */

exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body; 

    // Find the base employee document by its MongoDB ObjectId
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Base Employee profile record not found.",
      });
    }

    const alreadyExists = await AddEmployee.findOne({
      employee: employee._id,
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Employee authentication account already exists.",
      });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await AddEmployee.create({
      employee: employee._id,
      employeeId: employee.employeeId, // This maps "EMP101" string for logins
      name: employee.name,
      department: employee.department,
      role: employee.role,
      degree: employee.degree,
      mobile: employee.mobile,
      email: employee.email,
      birthDate: employee.birthDate,
      gender: employee.gender,
      address: employee.address,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      lastPromotionDate: employee.lastPromotionDate,
      employeeStatus: employee.employeeStatus || "Active",
      workLocation: employee.workLocation,
      password: hashedPassword,
      profileImage: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json({
      success: true,
      message: "Employee credentials generated successfully.",
      data: {
        id: newEmployee._id,
        employeeId: newEmployee.employeeId,
        email: newEmployee.email
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get All
=========================================== */

exports.getEmployees = async (req, res) => {
  try {
    const employees = await AddEmployee.find()
      .populate("employee")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get Single
=========================================== */

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await AddEmployee.findById(req.params.id).populate(
      "employee"
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Update
=========================================== */

exports.updateEmployee = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const employee = await AddEmployee.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Delete
=========================================== */

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await AddEmployee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};