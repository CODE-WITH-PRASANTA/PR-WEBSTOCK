const express = require("express");
const router = express.Router();

const {
  upload,
  convertToWebp,
} = require("../middleware/multer");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers//addEmployeeController");

// Create Employee Login
router.post(
  "/addemployees",
  upload.single("uploadedFile"),
  convertToWebp,
  createEmployee
);

// Get All
router.get("/employees", getEmployees);

// Get Single
router.get("/employees/:id", getEmployeeById);

// Update
router.put(
  "/employees/:id",
  upload.single("uploadedFile"),
  convertToWebp,
  updateEmployee
);

// Delete
router.delete("/employees/:id", deleteEmployee);

module.exports = router;