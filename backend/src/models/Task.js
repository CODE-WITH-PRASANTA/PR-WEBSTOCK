const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
    },
    project: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddEmployee',
        required: true,
      },
    ],
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Running', 'Rejected', 'Completed'],
      default: 'Pending',
    },
    date: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    attachments: [
      {
        name: String,
        url: String,
        fileType: String,
      },
    ],
    notes: [
      {
        author: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AddEmployee',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);