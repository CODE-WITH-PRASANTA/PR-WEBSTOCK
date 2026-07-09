const mongoose = require('mongoose');

const OvertimeSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'AddEmployee' },
  // Add these fields to store snapshots of the employee info
  name: { type: String, required: true },
  empDisplayId: { type: String, required: true }, 
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Overtime', OvertimeSchema);