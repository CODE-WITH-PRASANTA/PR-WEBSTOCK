const express = require("express");

const router = express.Router();

const {
  createGallery,
  getGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

const {
  upload,
  convertToWebp,
} = require("../middleware/multer");

// ======================
// CREATE GALLERY
// ======================

router.post(
  "/create",
  upload.single("image"),
  convertToWebp,
  createGallery
);

// ======================
// GET ALL GALLERY
// ======================

router.get("/all", getGallery);

// ======================
// GET SINGLE GALLERY
// ======================

router.get("/:id", getSingleGallery);

// ======================
// UPDATE GALLERY
// ======================

router.put(
  "/update/:id",
  upload.single("image"),
  convertToWebp,
  updateGallery
);

// ======================
// DELETE GALLERY
// ======================

router.delete("/delete/:id", deleteGallery);

module.exports = router;