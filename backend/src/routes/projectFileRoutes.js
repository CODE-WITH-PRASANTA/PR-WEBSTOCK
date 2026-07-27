const express = require('express');
const router = express.Router();

// Import the exact exported middleware functions (singleImageUpload or convertToWebp)
const { upload, singleImageUpload } = require('../middleware/multer'); // Adjust path if file is named 'multer'

const {
  getAllFiles,
  createFile,
  updateFile,
  deleteFile,
  downloadFile
} = require('../controllers/projectFileController');

// Standard API Endpoints
router.get('/', getAllFiles);
router.post('/', upload.single('file'), singleImageUpload, createFile);
router.put('/:id', upload.single('file'), singleImageUpload, updateFile);
router.delete('/:id', deleteFile);
router.get('/download/:id', downloadFile);

module.exports = router;