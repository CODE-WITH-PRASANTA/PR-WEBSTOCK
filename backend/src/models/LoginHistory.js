const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddEmployee",
      required: true,
    },

    employeeId: String,

    loginTime: {
      type: Date,
      default: Date.now,
    },

    logoutTime: {
      type: Date,
    },

    ipAddress: String,

    device: String,

    browser: String,

    os: String,

    loginStatus: {
      type: String,
      enum: ["Success", "Failed"],
      default: "Success",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LoginHistory", loginHistorySchema);