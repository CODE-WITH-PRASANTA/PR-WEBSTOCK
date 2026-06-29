const express = require("express");
const router = express.Router();

const {
  upload,
  convertToWebp,
} = require("../middleware/multer");

const {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  changeStatus,
} = require("../controllers/testimonialController");

router.post(
  "/create",
  upload.single("profileImage"),
  convertToWebp,
  createTestimonial
);

router.get("/all", getTestimonials);

router.get("/:id", getTestimonial);

router.put(
  "/update/:id",
  upload.single("profileImage"),
  convertToWebp,
  updateTestimonial
);

router.delete("/delete/:id", deleteTestimonial);

router.patch("/status/:id", changeStatus);

module.exports = router;