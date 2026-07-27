const ProjectFile = require('../models/ProjectFile');
const path = require('path');
const fs = require('fs');

// Helper to format file size in human-readable units
const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// @desc    Get all project files
// @route   GET /api/project-files
exports.getAllFiles = async (req, res) => {
  try {
    const files = await ProjectFile.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: files.length, data: files });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create/Upload a new project file
// @route   POST /api/project-files
exports.createFile = async (req, res) => {
  try {
    const { name, type, uploadedBy, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file.' });
    }

    const filePath = req.file.imagePath || req.file.path;
    const filename = req.file.filename;
    const size = formatBytes(req.file.size);

    const newFile = await ProjectFile.create({
      name: name || req.file.originalname,
      type: type || (req.file.mimetype ? req.file.mimetype.split('/')[1].toUpperCase() : 'FILE'),
      size: req.body.size || size,
      uploadedBy,
      date: date || new Date(),
      filePath,
      filename,
    });

    return res.status(201).json({ success: true, data: newFile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a project file details (or replace file)
// @route   PUT /api/project-files/:id
exports.updateFile = async (req, res) => {
  try {
    let file = await ProjectFile.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File record not found' });
    }

    const updateFields = {
      name: req.body.name || file.name,
      type: req.body.type || file.type,
      size: req.body.size || file.size,
      uploadedBy: req.body.uploadedBy || file.uploadedBy,
      date: req.body.date || file.date,
    };

    if (req.file) {
      if (file.filename) {
        const oldPath = path.join(process.cwd(), 'public', 'uploads', file.filename);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateFields.filePath = req.file.imagePath || req.file.path;
      updateFields.filename = req.file.filename;
      updateFields.size = req.body.size || formatBytes(req.file.size);
    }

    file = await ProjectFile.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ success: true, data: file });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project file
// @route   DELETE /api/project-files/:id
exports.deleteFile = async (req, res) => {
  try {
    const file = await ProjectFile.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File record not found' });
    }

    if (file.filename) {
      const diskPath = path.join(process.cwd(), 'public', 'uploads', file.filename);
      if (fs.existsSync(diskPath)) {
        fs.unlinkSync(diskPath);
      }
    }

    await file.deleteOne();

    return res.status(200).json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Download project file
// @route   GET /api/project-files/download/:id
exports.downloadFile = async (req, res) => {
  try {
    const file = await ProjectFile.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File record not found' });
    }

    const absolutePath = path.join(process.cwd(), 'public', 'uploads', file.filename);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ success: false, message: 'Physical file not found on server' });
    }

    // Pass file.filename so the original extension is strictly preserved
    return res.download(absolutePath, file.filename);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};