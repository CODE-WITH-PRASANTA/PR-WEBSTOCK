const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  getEstimates,
  getEstimateById,
  createEstimate,
  updateEstimate,
  deleteEstimate,
  bulkDeleteEstimates,
  exportEstimatesExcel,
} = require("../controllers/estimateController");

// Validation middleware
const estimateValidation = [
  check("eId", "Estimate ID is required").notEmpty(),
  check("clientName", "Client Name is required").notEmpty(),
  check("mobile", "Valid mobile number is required").notEmpty(),
  check("email", "Valid email is required").isEmail(),
  check("eDate", "Estimate date is required").notEmpty(),
  check("expDate", "Expiration date is required").notEmpty(),
  check("amount", "Amount must be a positive number").isNumeric(),
  check("status", "Invalid status value").optional().isIn(["Accepted", "Declined", "Sent", "Expired"]),
];

router.get("/export/excel", exportEstimatesExcel);
router.post("/bulk-delete", bulkDeleteEstimates);

router.route("/")
  .get(getEstimates)
  .post(estimateValidation, createEstimate);

router.route("/:id")
  .get(getEstimateById)
  .put(estimateValidation, updateEstimate)
  .delete(deleteEstimate);

module.exports = router;