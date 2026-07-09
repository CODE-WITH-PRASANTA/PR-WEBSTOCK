const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AddEmployee', 
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  // REMOVED fixed enum array array to support fully dynamic types from LeaveType
  leaveType: {
    type: String, 
    required: [true, "Leave type is required"],
    trim: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  halfDay: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);