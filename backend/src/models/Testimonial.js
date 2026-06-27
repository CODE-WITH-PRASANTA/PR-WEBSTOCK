const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      default: "",
    },

    organization: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    feedback: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);