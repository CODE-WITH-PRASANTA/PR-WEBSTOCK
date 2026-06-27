const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// ======================================================
// Upload Folder
// ======================================================

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

// ======================================================
// Multer Memory Storage
// ======================================================

const storage = multer.memoryStorage();

// ======================================================
// Allowed File Types
// ======================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP and AVIF images are allowed."
      ),
      false
    );
  }
};

// ======================================================
// Multer Config
// ======================================================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// ======================================================
// Convert Image To WebP
// ======================================================

const convertImage = async (file) => {
  const filename =
    Date.now() +
    "-" +
    Math.round(Math.random() * 1e9) +
    ".webp";

  const outputPath = path.join(uploadDir, filename);

  await sharp(file.buffer)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toFile(outputPath);

  return {
    filename,
    imagePath: `/uploads/${filename}`,
  };
};

// ======================================================
// Single Image Upload
// ======================================================

const singleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const image = await convertImage(req.file);

    req.file.filename = image.filename;
    req.file.path = image.imagePath;
    req.file.imagePath = image.imagePath;

    next();
  } catch (err) {
    next(err);
  }
};

// ======================================================
// Multiple Image Upload
// ======================================================

const multipleImageUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const images = [];

    for (const file of req.files) {
      const image = await convertImage(file);

      images.push({
        filename: image.filename,
        path: image.imagePath,
      });
    }

    req.uploadedImages = images;

    next();
  } catch (err) {
    next(err);
  }
};

// ======================================================
// Convert To WebP Middleware
// ======================================================

const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const image = await convertImage(req.file);

    req.file.filename = image.filename;
    req.file.path = image.imagePath;
    req.file.imagePath = image.imagePath;

    next();
  } catch (err) {
    next(err);
  }
};

// ======================================================
// Delete Old Image
// ======================================================

const deleteImage = (filename) => {
  if (!filename) return;

  const imagePath = path.join(uploadDir, filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

// ======================================================
// Exports
// ======================================================

module.exports = {
  upload,
  singleImageUpload,
  multipleImageUpload,
  convertToWebp,
  deleteImage,
};