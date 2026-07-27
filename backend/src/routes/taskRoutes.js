const express = require('express');
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { upload, multipleImageUpload } = require('../middleware/multer');
const { protectEmployee, optionalEmployee } = require('../middleware/authEmployee');

// Personal workspace tasks
router.get('/my-tasks', protectEmployee, getMyTasks);
// Inside task routes file
router
  .route('/')
  .get(optionalEmployee, getAllTasks)
  .post(
    optionalEmployee,
    upload.array('files', 10), // Change 'attachments' to 'files'
    multipleImageUpload,
    createTask
  );

router
  .route('/:id')
  .put(
    optionalEmployee,
    upload.array('files', 10), // Change 'attachments' to 'files'
    multipleImageUpload,
    updateTask
  )
  .delete(optionalEmployee, deleteTask);
  

module.exports = router;