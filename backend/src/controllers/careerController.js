const Career = require("../models/Career");


// Create Job

exports.createCareer =
  async (req, res) => {
    try {
      const career =
        await Career.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: career,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// Get All Jobs

exports.getAllCareers =
  async (req, res) => {
    try {
      const careers =
        await Career.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        data: careers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// Get Single Job

exports.getCareer =
  async (req, res) => {
    try {
      const career =
        await Career.findById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: career,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// Update Job

exports.updateCareer =
  async (req, res) => {
    try {
      const career =
        await Career.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        data: career,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// Delete Job

exports.deleteCareer =
  async (req, res) => {
    try {
      await Career.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Job Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };