const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      trim: true,
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

    role: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    birthDate: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    address: {
      type: String,
      trim: true,
    },

    joiningDate: {
      type: Date,
    },

    salary: {
      type: Number,
      default: 0,
    },

    lastPromotionDate: {
      type: Date,
    },

    employeeStatus: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },

    workLocation: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Auto Generate Employee ID
employeeSchema.pre("save", async function () {
  if (!this.employeeId) {
    const count = await this.constructor.countDocuments();

    this.employeeId = `PRW-EMP-${new Date().getFullYear()}-${String(
      count + 1
    ).padStart(3, "0")}`;
  }
});

module.exports = mongoose.model("Employee", employeeSchema);