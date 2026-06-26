const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    quote: {
      type: String,
      default: "",
    },

    publishDate: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    media: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);