const express = require("express");

const router = express.Router();

const {
  createIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
} = require("../controllers/industryController");

const {
  upload,
  singleImageUpload,
} = require("../middleware/multer");

// Create
router.post(
  "/",
  upload.single("image"),
  singleImageUpload,
  createIndustry
);

// Get All
router.get("/", getIndustries);

// Get One
router.get("/:id", getIndustryById);

// Update
router.put(
  "/:id",
  upload.single("image"),
  singleImageUpload,
  updateIndustry
);

// Delete
router.delete("/:id", deleteIndustry);

module.exports = router;