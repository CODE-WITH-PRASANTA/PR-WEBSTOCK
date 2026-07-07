const Employee = require("../models/Employee");
const Counter = require("../models/Counter"); // ✅ FIXED: Points directly to your separate counter collection

exports.createEmployee = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.gender === "") delete payload.gender;
    if (payload.workLocation === "") delete payload.workLocation;

    // Secure generation sequence
    if (!payload.employeeId) {
      const currentYear = new Date().getFullYear();
      const counterId = `empId_${currentYear}`;

      const counter = await Counter.findOneAndUpdate(
        { idName: counterId },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const sequenceNumber = String(counter.seq).padStart(3, "0");
      payload.employeeId = `PRW-EMP-${currentYear}-${sequenceNumber}`;
    }

    const employee = await Employee.create(payload);

    return res.status(201).json({
      success: true,
      message: "Employee added successfully.",
      data: employee,
    });
  } catch (error) {
    console.error("Create Employee Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Validation failed during item initialization.",
    });
  }
};
/**
 * ==========================================
 * Get All Employees (Paginated & Searchable)
 * GET : /api/employees
 * ==========================================
 */
exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } } // Added ID search functionality
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