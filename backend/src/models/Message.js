const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Message text is required'],
    trim: true,
  },
  groupId: {
    type: String,
    required: true,
    default: 'PR_WEBSTOCK_CORE',
  },
  senderId: {
    type: String,
    required: true, // Unique session/user ID sent from frontend
  }
}, {
  timestamps: true // Generates createdAt automatically
});

module.exports = mongoose.model('Message', MessageSchema);