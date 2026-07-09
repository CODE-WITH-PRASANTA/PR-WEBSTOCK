const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getAllLeaves,
  getMyLeaves,
  updateLeaveStatus,
  getLeaveBalances
} = require("../controllers/leaveController");

const { protectEmployee } = require("../middleware/auth");

// ==================== ADMIN ROUTES ====================
// No employee authentication required
router.get("/all", getAllLeaves);
router.put("/:id", updateLeaveStatus);

// ==================== EMPLOYEE ROUTES ====================
router.post("/", protectEmployee, applyLeave);
router.get("/my-leaves", protectEmployee, getMyLeaves);

// Add to your admin or shared route section
router.get("/balances", getLeaveBalances);

module.exports = router;