const express = require('express');
const router = express.Router();
const { protectEmployee } = require('../middleware/authEmployee');
const { submitOvertime, getMyOvertime } = require('../controllers/overtimeController');

router.use(protectEmployee); // All routes protected

router.post('/submit', submitOvertime);
router.get('/history', getMyOvertime);

module.exports = router;