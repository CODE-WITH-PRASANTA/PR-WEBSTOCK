const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// 1. Import your auth protection middleware
const { protectEmployee } = require('../middleware/authEmployee');

// --- PUBLIC ROUTES (No token required) ---
// These are placed BEFORE router.use(protectEmployee)
router.get('/admin/daily-report', attendanceController.getAllAttendanceReport);
router.put('/admin/update/:id', attendanceController.updateAttendanceEntry);
// Admin route: Get all employees' attendance for a month
router.get('/admin/monthly-report', attendanceController.getAllEmployeesMonthlyAttendance);

// --- PROTECTED ROUTES (Token required) ---
// Anything below this line is protected by protectEmployee
router.use(protectEmployee);

router.get('/today-status', attendanceController.getTodayStatus);
router.post('/punch-in', attendanceController.punchIn);
router.post('/sync-location', attendanceController.syncLocation);
router.post('/punch-out', attendanceController.punchOut);
router.post('/toggle-break', attendanceController.toggleBreak);
router.get('/monthly-history', attendanceController.getMonthlyAttendance);

module.exports = router;