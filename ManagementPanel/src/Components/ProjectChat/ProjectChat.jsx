import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  MoreVertical, 
  CheckCheck, 
  Users,
  Hash,
  Info,
  Loader2,
  AlertCircle
} from 'lucide-react';
import './ProjectChat.css';
import API from '../../Api/axios';

const GROUP_ID = 'PR_WEBSTOCK_CORE';

const singleGroupInfo = {
  id: GROUP_ID,
  name: "PR WEBSTOCK ( CORE ) GROUP",
  description: "Core web developments, updates, component reviews, and system management",
  membersCount: 12,
};

// Utility to get or create a persistent sender ID for the session/device
const getSenderId = () => {
  let senderId = localStorage.getItem('chat_sender_id');
  if (!senderId) {
    senderId = `user_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
    localStorage.setItem('chat_sender_id', senderId);
  }
  return senderId;
};

const ProjectChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const currentSenderId = useRef(getSenderId()).current;
  const chatFeedRef = useRef(null);

  // Auto-scroll feed to bottom when new messages load or send
  const scrollToBottom = () => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages from backend API
  const fetchMessages = async (isInitialCall = false) => {
    try {
      if (isInitialCall) setLoading(true);
      
      // Corresponds to backend route: GET /api/chat/messages/:groupId
      const res = await API.get(`/chat/messages/${GROUP_ID}`);

      if (res.data?.success) {
        const formattedMessages = res.data.data.map((msg) => {
          const isMe = msg.senderId === currentSenderId;
          return {
            id: msg._id,
            text: msg.text,
            senderName: isMe ? "You" : `Member (${msg.senderId.slice(-4)})`,
            senderRole: isMe ? "You" : "Team Member",
            avatar: isMe ? "" : `https://api.dicebear.com/7.x/identicon/svg?seed=${msg.senderId}`,
            time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: isMe,
            status: 'read'
          };
        });

        setMessages(formattedMessages);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to load chat messages:', err);
      if (isInitialCall) {
        setError(err.response?.data?.message || 'Failed to connect to chat server');
      }
    } finally {
      if (isInitialCall) setLoading(false);
    }
  };

  // Initial load and polling setup (every 4 seconds for simple updates)
  useEffect(() => {
    fetchMessages(true);

    const pollInterval = setInterval(() => {
      fetchMessages(false);
    }, 4000);

    return () => clearInterval(pollInterval);
  }, []);

  // Send Message function
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMsg = newMessage.trim();
    if (!trimmedMsg || sending) return;

    setSending(true);

    // Optimistic UI update
    const tempId = `temp_${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      text: trimmedMsg,
      senderName: "You",
      senderRole: "You",
      avatar: "",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sending'
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setNewMessage("");

    try {
      // Corresponds to backend route: POST /api/chat/messages
      const res = await API.post('/chat/messages', {
        text: trimmedMsg,
        senderId: currentSenderId,
        groupId: GROUP_ID
      });

      if (res.data?.success) {
        const createdMsg = res.data.data;

        // Replace temporary optimistic message with real DB record
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? {
                  id: createdMsg._id,
                  text: createdMsg.text,
                  senderName: "You",
                  senderRole: "You",
                  avatar: "",
                  time: new Date(createdMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isMe: true,
                  status: 'sent'
                }
              : msg
          )
        );
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove temporary message if creation fails
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      alert('Could not send message. Please check your connection.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ProjectChat-container">
      <div className="ProjectChat-main">
        
        {/* Header */}
        <div className="ProjectChat-header">
          <div className="ProjectChat-group-info">
            <div className="ProjectChat-header-icon">
              <Hash className="ProjectChat-icon" />
            </div>
            <div>
              <h3 className="ProjectChat-group-title">{singleGroupInfo.name}</h3>
              <div className="ProjectChat-group-meta">
                <span className="ProjectChat-meta-item">
                  <Users className="ProjectChat-meta-icon" />
                  {singleGroupInfo.membersCount} Members
                </span>
                <span className="ProjectChat-dot-separator">•</span>
                <span className="ProjectChat-meta-description">{singleGroupInfo.description}</span>
              </div>
            </div>
          </div>

          <div className="ProjectChat-header-actions">
            <button className="ProjectChat-icon-btn-ghost" aria-label="Group Info">
              <Info className="ProjectChat-icon" />
            </button>
            <button className="ProjectChat-icon-btn-ghost" aria-label="More Options">
              <MoreVertical className="ProjectChat-icon" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="ProjectChat-messages-feed" ref={chatFeedRef}>
          <div className="ProjectChat-date-separator">
            <span>Today</span>
          </div>

          {loading ? (
            <div className="ProjectChat-state-box">
              <Loader2 className="ProjectChat-spinner" />
              <span>Loading messages...</span>
            </div>
          ) : error ? (
            <div className="ProjectChat-state-box error">
              <AlertCircle />
              <span>{error}</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="ProjectChat-state-box">
              <span>No messages yet. Start the conversation!</span>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`ProjectChat-message-row ${msg.isMe ? 'me' : 'other'}`}>
                <div className="ProjectChat-message-wrapper">
                  {!msg.isMe && (
                    <img src={msg.avatar} alt={msg.senderName} className="ProjectChat-avatar-img" />
                  )}
                  <div className="ProjectChat-message-content">
                    {!msg.isMe && (
                      <div className="ProjectChat-sender-info">
                        <span className="ProjectChat-sender-name">{msg.senderName}</span>
                        <span className="ProjectChat-sender-role">{msg.senderRole}</span>
                        <span className="ProjectChat-sender-time">{msg.time}</span>
                      </div>
                    )}

                    <div className={`ProjectChat-message-bubble ${msg.isMe ? 'ProjectChat-bubble-me' : 'ProjectChat-bubble-other'}`}>
                      {msg.text}
                    </div>
                    
                    {msg.isMe && (
                      <div className="ProjectChat-message-meta-me">
                        <span>{msg.time}</span>
                        <CheckCheck className={`ProjectChat-status-icon ${msg.status === 'sending' ? 'pending' : ''}`} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="ProjectChat-input-area">
          <form onSubmit={handleSendMessage} className="ProjectChat-input-form">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${singleGroupInfo.name}...`}
              className="ProjectChat-message-input"
              disabled={loading}
            />

            <button 
              type="submit" 
              disabled={!newMessage.trim() || sending || loading}
              className="ProjectChat-send-btn"
              aria-label="Send Message"
            >
              {sending ? <Loader2 className="ProjectChat-spinner-sm" /> : <Send className="ProjectChat-icon" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProjectChat;