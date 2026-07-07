const jwt = require("jsonwebtoken");
const AddEmployee = require("../models/AddEmployee");

exports.protectEmployee = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await AddEmployee.findById(decoded.id).select("-password");

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Employee not found.",
      });
    }

    req.employee = employee;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};