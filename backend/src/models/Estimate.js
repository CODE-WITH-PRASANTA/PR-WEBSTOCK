const mongoose = require("mongoose");

const EstimateSchema = new mongoose.Schema(
  {
    eId: {
      type: String,
      required: [true, "Estimate ID (eId) is required"],
      trim: true,
      unique: true,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      index: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    eDate: {
      type: Date,
      required: [true, "Estimate date is required"],
    },
    expDate: {
      type: Date,
      required: [true, "Expiration date is required"],
    },
    country: {
      type: String,
      default: "USA",
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be greater than or equal to 0"],
    },
    status: {
      type: String,
      enum: ["Accepted", "Declined", "Sent", "Expired"],
      default: "Sent",
    },
    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexing for search performance
EstimateSchema.index({ clientName: "text", eId: "text", email: "text" });

module.exports = mongoose.model("Estimate", EstimateSchema);