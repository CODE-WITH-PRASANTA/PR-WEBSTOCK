const fs = require("fs");
const path = require("path");

const Gallery = require("../models/Gallery");

// ======================================
// CREATE GALLERY IMAGE
// ======================================

exports.createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

   const gallery = await Gallery.create({
  image: req.file.imagePath,
});

    res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully.",
      data: gallery,
    });
  } catch (error) {
    console.error("Create Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

// ======================================
// GET ALL GALLERY IMAGES
// ======================================

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: gallery.length,
      data: gallery,
    });
  } catch (error) {
    console.error("Get Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE IMAGE
// ======================================

exports.getSingleGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("Get Single Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE IMAGE
// ======================================

exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    if (req.file) {
    const oldImage = path.join(
  process.cwd(),
  "public",
  gallery.image.replace("/uploads/", "uploads/")
);

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

     gallery.image = req.file.imagePath;
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully.",
      data: gallery,
    });
  } catch (error) {
    console.error("Update Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE IMAGE
// ======================================

exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    const imagePath = path.join(
  process.cwd(),
  "public",
  gallery.image.replace("/uploads/", "uploads/")
);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery image deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Gallery Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};