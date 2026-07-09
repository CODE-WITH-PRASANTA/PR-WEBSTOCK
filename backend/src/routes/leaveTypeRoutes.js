const express = require("express");
const router = express.Router();
const {
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
  bulkDeleteLeaveTypes,
} = require("../controllers/leaveTypeController");

// Base endpoint routes
router.route("/")
  .get(getLeaveTypes)
  .post(createLeaveType);

// Bulk items route
router.route("/bulk-delete")
  .post(bulkDeleteLeaveTypes);

// Parameter identifier routes
router.route("/:id")
  .put(updateLeaveType)
  .delete(deleteLeaveType);

module.exports = router;