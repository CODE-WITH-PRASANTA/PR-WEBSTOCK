const express = require("express");
const router = express.Router();
const { protectEmployee } = require("../middleware/authEmployee");
const { 
  getEmployeeBalance, 
  getAllEmployeeBalances,
  updateEmployeeBalance,
  deleteEmployeeBalance 
} = require("../controllers/leaveBalanceController");

router.get("/balance", protectEmployee, getEmployeeBalance);
router.get("/all-balances", protectEmployee, getAllEmployeeBalances);
router.put("/update/:id", protectEmployee, updateEmployeeBalance);
router.delete("/delete/:id", protectEmployee, deleteEmployeeBalance);

module.exports = router;