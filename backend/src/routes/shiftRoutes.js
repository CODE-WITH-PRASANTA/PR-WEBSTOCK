const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shiftController");
const { protectEmployee } = require("../middleware/authEmployee"); // Path to your middleware

// 1. Dropdowns and Authentication-Protected Specific Routes (Put these FIRST)
router.get("/employees", shiftController.getEmployeesForDropdown);
router.get("/my-shifts", protectEmployee, shiftController.getLoggedInEmployeeShifts);

// 2. Global Collection Routes
router.get("/", shiftController.getAllShifts);
router.post("/", shiftController.createShifts);

// 3. Dynamic Parameterized Routes (Put these LAST)
router.put("/:id", shiftController.updateShift);
router.delete("/:id", shiftController.deleteShift);

module.exports = router;