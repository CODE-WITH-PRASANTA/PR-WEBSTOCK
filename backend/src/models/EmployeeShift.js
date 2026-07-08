const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddEmployee",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    shift: {
      type: String,
      enum: ["Morning", "Evening", "Night"],
      required: true,
    },

    minStartTime: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    maxStartTime: {
      type: String,
      required: true,
    },

    minEndTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    maxEndTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmployeeShift", employeeShiftSchema);