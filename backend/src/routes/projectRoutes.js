const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  upload,
  singleImageUpload,
} = require("../middleware/multer");

// Create
router.post(
  "/create",
  upload.single("image"),
  singleImageUpload,
  createProject
);

// Get All
router.get("/", getProjects);

// Get One
router.get("/:id", getProject);

// Update
router.put(
  "/update/:id",
  upload.single("image"),
  singleImageUpload,
  updateProject
);

// Delete
router.delete(
  "/delete/:id",
  deleteProject
);

module.exports = router;