const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");


// Create Project
exports.createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      ownerName,
      projectDomain,
    } = req.body;

    if (
      !projectName ||
      !projectDescription ||
      !ownerName ||
      !projectDomain
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await Project.create({
      projectName,
      projectDescription,
      ownerName,
      projectDomain,
      image: req.file?.path || "",
    });

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete old image if new image uploaded
    if (req.file?.path && project.image) {
      const oldImagePath = path.join(
        process.cwd(),
        project.image.replace(/^\/+/, "")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          projectName:
            req.body.projectName,
          projectDescription:
            req.body.projectDescription,
          ownerName:
            req.body.ownerName,
          projectDomain:
            req.body.projectDomain,
          image:
            req.file?.path ||
            project.image,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Project Updated Successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.image) {
      const imagePath = path.join(
        process.cwd(),
        project.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Project Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};