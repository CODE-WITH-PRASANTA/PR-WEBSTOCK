const express = require('express');
const router = express.Router();
const { getGroupMessages, createMessage } = require('../controllers/chatController');

// ✅ Route without groupId (falls back to default inside controller)
router.get('/messages', getGroupMessages);

// ✅ Route with required groupId
router.get('/messages/:groupId', getGroupMessages);

// POST route
router.post('/messages', createMessage);

module.exports = router;