const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'AddEmployee' },
  employeeCustomId: { type: String, required: true }, // e.g., EMP1024
  name: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  punchInTime: { type: Date, required: true },
  punchOutTime: { type: Date },
  status: { 
    type: String, 
    enum: ['Working', 'On Break', 'Punched Out', 'Auto Punched Out'], 
    default: 'Working' 
  },
  // Storing break intervals explicitly for calculating aggregate times
  breaks: [
    {
      start: { type: Date },
      end: { type: Date }
    }
  ],
  coordinates: {
    punchIn: { lat: Number, lng: Number, accuracy: Number },
    punchOut: { lat: Number, lng: Number, accuracy: Number }
  },

  // Add these fields to your AttendanceSchema in Attendance.js
dayStatus: { 
  type: String, 
  enum: ['Present', 'Half Day', 'Late', 'Absent', 'Pending'], 
  default: 'Pending' 
},
isLate: { type: Boolean, default: false },
totalWorkingMinutes: { type: Number, default: 0 },

  leftCampusAt: { type: Date, default: null }, 
  isOutsideCampus: { type: Boolean, default: false }
}, { timestamps: true });



module.exports = mongoose.model('Attendance', AttendanceSchema); 