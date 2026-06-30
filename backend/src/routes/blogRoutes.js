const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const {
  upload,
  singleImageUpload,
} = require("../middleware/multer");

// Upload Image
router.post(
  "/upload-image",
  upload.single("image"),
  singleImageUpload,
  (req, res) => {
    res.status(200).json({
      success: true,
      image: req.file.path,
    });
  }
);

// CRUD Routes
router.post("/", createBlog);

router.get("/", getBlogs);

router.get("/:id", getSingleBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;