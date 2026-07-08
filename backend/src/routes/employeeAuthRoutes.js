const express = require("express");
const router = express.Router();

// Import controllers
const {
    loginEmployee,
    logoutEmployee,
    getProfile,
} = require("../controllers/employeeAuthController");

// Import token verification middleware
const {
    protectEmployee,
} = require("../middleware/authEmployee");

/* ===========================================
   Employee Authentication Routes
   Base URL assumption: /api/auth
=========================================== */

// @route   POST /api/auth/employee/login
// @desc    Authenticate employee & return token + metadata (including lastLoginTime)
// @access  Public
router.post("/employee/login", loginEmployee);

// @route   POST /api/auth/employee/logout
// @desc    Track session logout timestamp in LoginHistory
// @access  Private (Requires Bearer Token)
router.post("/employee/logout", protectEmployee, logoutEmployee);

// @route   GET /api/auth/employee/profile
// @desc    Fetch protected worker credentials
// @access  Private (Requires Bearer Token)
router.get("/employee/profile", protectEmployee, getProfile);

module.exports = router;