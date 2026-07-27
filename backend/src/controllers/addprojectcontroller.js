const AddProject = require('../models/addprojectmodel');
const { deleteImage } = require('../middleware/multer');

// Helper to safely parse team input from either an array or a comma-separated string
const parseTeamMembers = (teamInput) => {
  if (Array.isArray(teamInput)) {
    return teamInput.map((m) => m.trim()).filter(Boolean);
  }
  if (typeof teamInput === 'string' && teamInput.trim() !== '') {
    return teamInput
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
  }
  return [];
};

// @desc    Create new project
// @route   POST /api/addprojects
const createProject = async (req, res) => {
  try {
    const {
      projectId,
      projectTitle,
      department,
      projectPriority,
      client,
      price,
      startDate,
      endDate,
      team,
      workStatus,
      projectDescription,
      budget,
      projectManager,
      projectType,
      richDescription,
    } = req.body;

    // 1. Check duplicate Project ID
    const existingProject = await AddProject.findOne({ projectId: projectId?.trim() });
    if (existingProject) {
      if (req.file) deleteImage(req.file.filename);
      return res.status(400).json({
        success: false,
        message: `Project ID '${projectId}' already exists.`,
      });
    }

    // 2. Format Image Payload
    const projectImageData = req.file
      ? {
          filename: req.file.filename,
          path: req.file.imagePath || req.file.path,
        }
      : { filename: '', path: '' };

    // 3. Format Team Array
    const formattedTeam = parseTeamMembers(team);

    // 4. Create Record
    const newProject = await AddProject.create({
      projectId: projectId?.trim(),
      projectTitle: projectTitle?.trim(),
      department,
      projectPriority,
      client: client?.trim(),
      price: Number(price) || 0,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      team: formattedTeam,
      workStatus: workStatus || 'Running',
      projectDescription: projectDescription?.trim(),
      budget: Number(budget) || 0,
      projectManager: projectManager?.trim(),
      projectType,
      richDescription: richDescription?.trim() || '',
      projectImage: projectImageData,
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully!',
      data: newProject,
    });
  } catch (error) {
    if (req.file) deleteImage(req.file.filename);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while creating project',
      error: error.message,
    });
  }
};

// @desc    Get all projects
// @route   GET /api/addprojects
const getProjects = async (req, res) => {
  try {
    const projects = await AddProject.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching projects',
      error: error.message,
    });
  }
};

// @desc    Get single project by MongoDB ID or Project ID
// @route   GET /api/addprojects/:id
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    const project = await AddProject.findOne({
      $or: [{ _id: isMongoId ? id : null }, { projectId: id }],
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching project details',
      error: error.message,
    });
  }
};

// @desc    Update an existing project
// @route   PUT /api/addprojects/:id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate if 'id' is a valid 24-character hex MongoDB ObjectId
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
    if (!isMongoId) {
      if (req.file) deleteImage(req.file.filename);
      return res.status(400).json({
        success: false,
        message: `Invalid Mongo ID format: '${id}'. Must be a 24-character hex string.`,
      });
    }

    // 2. Check if project exists
    const project = await AddProject.findById(id);
    if (!project) {
      if (req.file) deleteImage(req.file.filename);
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // 3. Prevent duplicate Project ID error if projectId changed
    if (req.body.projectId && req.body.projectId.trim() !== project.projectId) {
      const duplicate = await AddProject.findOne({ 
        projectId: req.body.projectId.trim(), 
        _id: { $ne: id } 
      });
      if (duplicate) {
        if (req.file) deleteImage(req.file.filename);
        return res.status(400).json({
          success: false,
          message: `Project ID '${req.body.projectId}' is already in use by another project.`,
        });
      }
    }

    // 4. Handle Image Replacement
    if (req.file) {
      if (project.projectImage && project.projectImage.filename) {
        deleteImage(project.projectImage.filename);
      }
      req.body.projectImage = {
        filename: req.file.filename,
        path: req.file.imagePath || req.file.path,
      };
    }

    // 5. Clean up data types
    if (req.body.projectId) req.body.projectId = req.body.projectId.trim();
    if (req.body.price !== undefined) req.body.price = Number(req.body.price) || 0;
    if (req.body.budget !== undefined) req.body.budget = Number(req.body.budget) || 0;
    if (req.body.team !== undefined) req.body.team = parseTeamMembers(req.body.team);
    if (req.body.startDate) req.body.startDate = new Date(req.body.startDate);
    if (req.body.endDate) req.body.endDate = new Date(req.body.endDate);

    // Don't overwrite _id
    delete req.body._id;

    const updatedProject = await AddProject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully!',
      data: updatedProject,
    });
  } catch (error) {
    if (req.file) deleteImage(req.file.filename);

    // Catch both ValidationError AND CastError (e.g. bad date/enum values)
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while updating project',
      error: error.message,
    });
  }
};

// @desc    Delete a project
// @route   DELETE /api/addprojects/:id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await AddProject.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    if (project.projectImage && project.projectImage.filename) {
      deleteImage(project.projectImage.filename);
    }

    await project.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting project',
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};