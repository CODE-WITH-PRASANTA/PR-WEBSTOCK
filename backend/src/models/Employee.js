const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      required: [true, "Employee ID is mandatory"],
      trim: true,
    },
    name: { type: String, required: [true, "Employee name is required"], trim: true },
    department: { type: String, required: [true, "Department is required"], trim: true },
    role: { type: String, required: [true, "Role positioning is required"], trim: true },
    mobile: { type: String, required: [true, "Mobile contact number is required"], trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: [true, "Email is required"] },
    degree: { type: String, trim: true },
    birthDate: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "" },
    address: { type: String, trim: true },
    joiningDate: { type: Date, default: Date.now },
    salary: { type: Number, default: 0 },
    lastPromotionDate: { type: Date },
    employeeStatus: { type: String, enum: ["Active", "Inactive", "On Leave"], default: "Active" },
    workLocation: { type: String, enum: ["Onsite", "Remote", "Hybrid", ""], default: "" },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);