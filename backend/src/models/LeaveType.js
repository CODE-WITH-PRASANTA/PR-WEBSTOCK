const mongoose = require("mongoose");
const EmployeeLeaveBalance = require("./EmployeeLeaveBalance"); // Adjust path based on your directory layout

const LeaveTypeSchema = new mongoose.Schema(
  {
    leaveName: {
      type: String,
      required: [true, "Leave name is required"],
      trim: true,
    },
    leaveType: {
      type: String,
      required: [true, "Leave type is required"],
      enum: ["Paid", "Unpaid", "Half Day"],
    },
    leaveUnit: {
      type: String,
      required: [true, "Leave unit is required"],
      enum: ["Days", "Hours"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      default: 0,
    },
    createdBy: {
      type: String,
      required: [true, "Creator group/user is required"],
      default: "HR Department",
    },
    note: {
      type: String,
      trim: true,
    },
    carryOver: {
      type: String,
      enum: ["Not allowed", "Allowed"],
      default: "Not allowed",
    },
    notification: {
      type: String,
      enum: ["Immediate", "12 hours prior", "24 hours prior", "48 hours prior"],
      default: "24 hours prior",
    },
    maxLeaves: {
      type: Number,
      required: [true, "Maximum leaves value is required"],
      default: 0,
    },
    maxLimit: {
      type: Number,
      required: [true, "Annual limit is required"],
      default: 0,
    },
  },
  {
    timestamps: true, // Provides createdAt and updatedAt automatically
  }
);

// Virtual field to map MongoDB '_id' to client-expected 'id'
LeaveTypeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

LeaveTypeSchema.set("toJSON", {
  virtuals: true,
});

/* =========================================================================
  1. POST HOOK FOR UPDATE (findOneAndUpdate)
  Triggers whenever HR modifies a LeaveType definition using findOneAndUpdate
========================================================================= */
LeaveTypeSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    try {
      // Find all employee balances tracking this changed configurations identifier
      const balancesToUpdate = await EmployeeLeaveBalance.find({ leaveType: doc._id });

      for (const balance of balancesToUpdate) {
        balance.leaveName = doc.leaveName;
        balance.allocatedTotal = doc.maxLimit || 0;
        
        // Dynamic recomputation loop of safety margins
        balance.availableLeaves = Math.max(
          0,
          (balance.allocatedTotal + balance.manuallyCredited) - balance.usedLeaves
        );
        
        await balance.save();
      }
      console.log(`Successfully synced updates for LeaveType: ${doc.leaveName}`);
    } catch (err) {
      console.error("Error cascading LeaveType updates to employee balances:", err);
    }
  }
});

/* =========================================================================
  2. POST HOOK FOR DELETE (findOneAndDelete)
  Triggers whenever HR drops a LeaveType definition completely using findOneAndDelete
========================================================================= */
LeaveTypeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      // Cascade-purge orphaned tracking documents safely
      await EmployeeLeaveBalance.deleteMany({ leaveType: doc._id });
      console.log(`Successfully deleted balances for LeaveType: ${doc.leaveName}`);
    } catch (err) {
      console.error("Error cascading LeaveType deletion to employee balances:", err);
    }
  }
});

// CRITICAL: Compile and export the model ONLY AFTER registering all hooks
module.exports = mongoose.model("LeaveType", LeaveTypeSchema);