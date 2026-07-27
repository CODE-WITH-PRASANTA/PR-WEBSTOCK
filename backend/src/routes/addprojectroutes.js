const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/addprojectcontroller');
const { upload, singleImageUpload } = require('../middleware/multer');

// Base route: /api/projects
router
  .route('/')
  .get(getProjects)
  .post(upload.single('projectImage'), singleImageUpload, createProject);

// ID-specific route: /api/projects/:id
router
  .route('/:id')
  .get(getProjectById)
  .put(upload.single('projectImage'), singleImageUpload, updateProject)
  .delete(deleteProject);

module.exports = router;