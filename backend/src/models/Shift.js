const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddEmployee", // References your existing AddEmployee model
      required: true,
    },
    shiftType: {
      type: String,
      enum: ["Morning", "Evening", "Night"],
      required: true,
    },
    startTime: {
      type: String, // Stored as "HH:MM" format
      required: true,
    },
    endTime: {
      type: String, // Stored as "HH:MM" format
      required: true,
    },
    date: {
      type: String, // Stored as "YYYY-MM-DD" for straightforward frontend matching and range querying
      required: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent assigning duplicate shifts to the same employee on the same day
shiftSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Shift", shiftSchema);