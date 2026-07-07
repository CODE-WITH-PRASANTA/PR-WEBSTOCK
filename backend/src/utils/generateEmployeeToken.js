const jwt = require("jsonwebtoken");

const generateToken = (employee) => {
  // Signs payload with secret using a 1-day standard string lifepan
  return jwt.sign(
    { 
      id: employee._id, 
      employeeId: employee.employeeId, 
      role: employee.role 
    },
    process.env.JWT_SECRET || "your_fallback_jwt_secret_key",
    { expiresIn: "1d" } 
  );
};

module.exports = generateToken;