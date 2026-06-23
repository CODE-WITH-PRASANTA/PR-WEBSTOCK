const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    keyHighlight: {
      type: String,
    },

    salary: {
      type: String,
    },

    experience: {
      type: String,
    },

    location: {
      type: String,
    },

    vacancy: {
      type: Number,
    },

    jobType: {
      type: String,
    },

    skills: {
      type: String,
    },

    whatsapp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Career",
  careerSchema
);