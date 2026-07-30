const Message = require('../models/Message');

// Get all messages for a group
exports.getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ groupId: groupId || 'PR_WEBSTOCK_CORE' })
      .sort({ createdAt: 1 }); // Oldest first

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Post a new message via REST (Fallback if WebSockets fail)
exports.createMessage = async (req, res) => {
  try {
    const { text, senderId, groupId } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    const message = await Message.create({
      text,
      senderId,
      groupId: groupId || 'PR_WEBSTOCK_CORE'
    });

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};