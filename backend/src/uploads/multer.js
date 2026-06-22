const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Create upload directory if not exists
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Memory Storage
const storage = multer.memoryStorage();

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
        "Only JPG, JPEG, PNG, WEBP and AVIF images are allowed"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

/**
 * Convert image buffer to webp
 */
const convertToWebp = async (file) => {
  const fileName = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.webp`;

  const outputPath = path.join(uploadDir, fileName);

  await sharp(file.buffer)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toFile(outputPath);

  return `/uploads/${fileName}`;
};

/**
 * Single Image Upload Middleware
 */
const singleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const imagePath = await convertToWebp(req.file);

    req.file.path = imagePath;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Multiple Images Upload Middleware
 */
const multipleImageUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return next();

    const uploadedImages = [];

    for (const file of req.files) {
      const imagePath = await convertToWebp(file);

      uploadedImages.push({
        originalname: file.originalname,
        path: imagePath,
      });
    }

    req.uploadedImages = uploadedImages;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  singleImageUpload,
  multipleImageUpload,
};