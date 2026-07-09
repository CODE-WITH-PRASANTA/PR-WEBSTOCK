// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// 1. Import your auth protection middleware
const { protectEmployee } = require('../middleware/authEmployee'); // <-- Double check this path matches your folder structure!

// 2. Apply the middleware to ALL routes below it
router.use(protectEmployee);

// 3. Add the missing GET route for the initial state fetch
router.get('/today-status', attendanceController.getTodayStatus);

// 4. Existing action routes
router.post('/punch-in', attendanceController.punchIn);
router.post('/sync-location', attendanceController.syncLocation);
router.post('/punch-out', attendanceController.punchOut);

// 5. Add the missing POST route for toggling breaks
router.post('/toggle-break', attendanceController.toggleBreak);
// Add this route right along your other GET endpoints
router.get('/monthly-history', attendanceController.getMonthlyAttendance);

module.exports = router;