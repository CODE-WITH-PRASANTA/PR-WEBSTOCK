const mongoose = require("mongoose");

const addEmployeeSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
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
      default: "",
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
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
      default: "",
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

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AddEmployee", addEmployeeSchema);