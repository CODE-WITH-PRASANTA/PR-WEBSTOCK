const mongoose = require('mongoose');

const projectFileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'File type is required'],
      trim: true,
    },
    size: {
      type: String,
      required: [true, 'File size is required'],
    },
    uploadedBy: {
      type: String,
      required: [true, 'Uploaded by is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Uploaded date is required'],
      default: Date.now,
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
    },
    filename: {
      type: String,
      required: [true, 'Filename is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProjectFile', projectFileSchema);