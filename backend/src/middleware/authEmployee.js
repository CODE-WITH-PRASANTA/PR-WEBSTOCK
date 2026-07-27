const jwt = require('jsonwebtoken');
const AddEmployee = require('../models/AddEmployee');

// Strict check - blocks request if token is missing or invalid
exports.protectEmployee = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access. Please log in.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await AddEmployee.findById(decoded.id).select('-password');

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Employee account not found.',
      });
    }

    req.employee = employee;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

// Soft check - attaches req.employee if token is present, but doesn't throw 401 if missing
exports.optionalEmployee = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.employee = await AddEmployee.findById(decoded.id).select('-password');
    }
  } catch (err) {
    // Soft fail - ignore token errors and let request proceed unauthenticated
    req.employee = null;
  }
  next();
};