const bcrypt = require("bcryptjs");
const AddEmployee = require("../models/AddEmployee");
const LoginHistory = require("../models/LoginHistory");
const generateToken = require("../utils/generateEmployeeToken");

exports.loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and Password required.",
      });
    }

    const employee = await AddEmployee.findOne({
      employeeId,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    if (employee.employeeStatus !== "Active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    const match = await bcrypt.compare(
      password,
      employee.password
    );

    if (!match) {
      await LoginHistory.create({
        employee: employee._id,
        employeeId,
        loginStatus: "Failed",
        ipAddress: req.ip,
        device: req.headers["user-agent"],
      });

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(employee);

    await LoginHistory.create({
      employee: employee._id,
      employeeId,
      loginStatus: "Success",
      ipAddress: req.ip,
      device: req.headers["user-agent"],
    });

    res.status(200).json({
      success: true,
      token,

      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
        profileImage: employee.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.logoutEmployee = async (req, res) => {
  try {

    await LoginHistory.findOneAndUpdate(
      {
        employee: req.employee._id,
        logoutTime: null,
      },
      {
        logoutTime: new Date(),
      },
      {
        sort: {
          createdAt: -1,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

exports.getProfile = async (req, res) => {
  try {
    // Fresh employee data
    const employee = await AddEmployee.findById(req.employee._id).select("-password");

    // Previous successful login (exclude current active session)
    const lastLogin = await LoginHistory.findOne({
      employee: req.employee._id,
      loginStatus: "Success",
    })
      .sort({ loginTime: -1 });

    res.status(200).json({
      success: true,
      employee,
      lastLoginTime: lastLogin ? lastLogin.loginTime : null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};