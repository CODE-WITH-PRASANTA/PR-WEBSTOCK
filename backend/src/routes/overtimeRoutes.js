const express = require('express');
const router = express.Router();
const { protectEmployee } = require('../middleware/authEmployee'); 
const { 
  submitOvertime, 
  getMyOvertime, 
  getAllOvertimeRequests, 
  updateOvertimeStatus 
} = require('../controllers/overtimeController');

// Employee Routes (Protected)
router.post('/submit', protectEmployee, submitOvertime);
router.get('/history', protectEmployee, getMyOvertime);



router.get('/admin/all', getAllOvertimeRequests);
router.put('/admin/update/:id', updateOvertimeStatus);

module.exports = router;