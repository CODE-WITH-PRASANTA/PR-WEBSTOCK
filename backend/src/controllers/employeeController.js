const Employee = require("../models/Employee");

/**
 * ==========================================
 * Create Employee
 * POST : /api/employees
 * ==========================================
 */
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Employee added successfully.",
      data: employee,
    });
  } catch (error) {
    console.error("Create Employee Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================
 * Get All Employees
 * GET : /api/employees
 * ==========================================
 */
exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.employeeStatus = status;
    }

    const totalEmployees = await Employee.countDocuments(query);

    const employees = await Employee.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      totalEmployees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Get Employees Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================
 * Get Single Employee
 * GET : /api/employees/:id
 * ==========================================
 */
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("Get Employee Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================
 * Update Employee
 * PUT : /api/employees/:id
 * ==========================================
 */
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      data: employee,
    });
  } catch (error) {
    console.error("Update Employee Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================
 * Delete Employee
 * DELETE : /api/employees/:id
 * ==========================================
 */
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    await employee.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Employee Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};