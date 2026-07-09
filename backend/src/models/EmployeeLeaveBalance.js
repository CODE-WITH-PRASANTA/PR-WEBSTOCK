const mongoose = require("mongoose");

const EmployeeLeaveBalanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddEmployee",
      required: true,
    },
    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
    },
    leaveName: {
      type: String, 
      required: true,
    },
    allocatedTotal: {
      type: Number, 
      required: true,
      default: 0,
    },
    manuallyCredited: {
      type: Number, 
      default: 0,
    },
    usedLeaves: {
      type: Number, 
      default: 0,
    },
    availableLeaves: {
      type: Number, 
      default: 0,
    },
  },
  { timestamps: true }
);

// Ensures an employee only ever has one ledger entry per type
EmployeeLeaveBalanceSchema.index({ employee: 1, leaveType: 1 }, { unique: true });

module.exports = mongoose.model("EmployeeLeaveBalance", EmployeeLeaveBalanceSchema);