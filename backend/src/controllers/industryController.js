const Industry = require("../models/Industry");
const fs = require("fs");
const path = require("path");

// =======================
// Create Industry
// =======================

exports.createIndustry = async (req, res) => {
  try {
    const {
      industryName,
      category,
      location,
      description,
    } = req.body;

    if (
      !industryName ||
      !category ||
      !location ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Industry image is required.",
      });
    }

    const industry = await Industry.create({
      industryName,
      category,
      location,
      description,
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Industry created successfully.",
      data: industry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get All Industries
// =======================

exports.getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: industries.length,
      data: industries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Get Single Industry
// =======================

exports.getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found.",
      });
    }

    res.json({
      success: true,
      data: industry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Update Industry
// =======================

exports.updateIndustry = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found.",
      });
    }

    if (req.file) {
      const oldImage = path.join(
        process.cwd(),
        industry.image
      );

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      industry.image = req.file.path;
    }

    industry.industryName =
      req.body.industryName || industry.industryName;

    industry.category =
      req.body.category || industry.category;

    industry.location =
      req.body.location || industry.location;

    industry.description =
      req.body.description || industry.description;

    await industry.save();

    res.json({
      success: true,
      message: "Industry updated successfully.",
      data: industry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// Delete Industry
// =======================

exports.deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found.",
      });
    }

    const imagePath = path.join(
      process.cwd(),
      industry.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await industry.deleteOne();

    res.json({
      success: true,
      message: "Industry deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};