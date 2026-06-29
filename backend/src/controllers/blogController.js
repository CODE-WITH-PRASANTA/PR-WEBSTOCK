const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      adminName: req.body.adminName,
      designation: req.body.designation,
      title: req.body.title,
      category: req.body.category,
      quote: req.body.quote,
      publishDate: req.body.publishDate,
      description: req.body.description,

      image: req.body.image || "",
      media: req.body.media || "",

      tags: JSON.parse(req.body.tags || "[]"),
    });

    res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tags: JSON.parse(req.body.tags || "[]"),
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};