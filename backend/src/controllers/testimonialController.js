const fs = require("fs");
const path = require("path");

const Testimonial = require("../models/Testimonial");


// CREATE

exports.createTestimonial = async (req, res) => {
  try {

    const {
      name,
      designation,
      organization,
      country,
      rating,
      feedback,
      status,
      displayOrder,
    } = req.body;

    if (!name || !feedback) {
      return res.status(400).json({
        success: false,
        message: "Name and Feedback are required",
      });
    }

   const testimonial = await Testimonial.create({
  profileImage: req.file ? req.file.imagePath : "",

      name,
      designation,
      organization,
      country,

      rating,

      feedback,

      status,

      displayOrder,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial Created Successfully",
      data: testimonial,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// GET ALL

exports.getTestimonials = async (req, res) => {

  try {

    const data = await Testimonial.find()
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.json({
      success: true,
      total: data.length,
      data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};


// GET SINGLE

exports.getTestimonial = async (req, res) => {

  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    res.json({
      success: true,
      data: testimonial,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};


// UPDATE

exports.updateTestimonial = async (req, res) => {

  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
      });
    }

    if (req.file) {

      if (testimonial.profileImage) {

      const oldPath = path.join(
  process.cwd(),
  testimonial.profileImage.replace("/", "")
);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }

      }

    testimonial.profileImage = req.file.imagePath;

    }

    testimonial.name = req.body.name;

    testimonial.designation = req.body.designation;

    testimonial.organization = req.body.organization;

    testimonial.country = req.body.country;

    testimonial.rating = req.body.rating;

    testimonial.feedback = req.body.feedback;

    testimonial.status = req.body.status;

    testimonial.displayOrder = req.body.displayOrder;

    await testimonial.save();

    res.json({
      success: true,
      message: "Updated Successfully",
      data: testimonial,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};


// DELETE

exports.deleteTestimonial = async (req, res) => {

  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
      });
    }

    if (testimonial.profileImage) {
const img = path.join(
  process.cwd(),
  testimonial.profileImage.replace("/", "")
);

      if (fs.existsSync(img)) {
        fs.unlinkSync(img);
      }

    }

    await testimonial.deleteOne();

    res.json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};


// STATUS

exports.changeStatus = async (req, res) => {

  try {

    const testimonial = await Testimonial.findById(req.params.id);

    testimonial.status = req.body.status;

    await testimonial.save();

    res.json({
      success: true,
      message: "Status Updated",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};