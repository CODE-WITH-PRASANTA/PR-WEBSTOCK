import React, { useState } from 'react';
import { Home, ChevronRight, Paperclip, Smile } from 'lucide-react';
import './Chat.css';

// Mock Data for the Sidebar (Matching the design)
const contactsList = [
  { id: 1, name: 'William Smith', status: 'left 7 mins ago', isOnline: false, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Martha Williams', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Joseph Clark', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Nancy Taylor', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Margaret Wilson', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Joseph Jones', status: 'left 30 mins ago', isOnline: false, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Jane Brown', status: 'left 10 hours ago', isOnline: false, avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Eliza Johnson', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Mike Clark', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, name: 'Ann Henry', status: 'online', isOnline: true, avatar: 'https://i.pravatar.cc/150?u=10' },
];

// Mock Data for the Chat Messages
const initialMessages = [
  {
    id: 1,
    sender: 'Robert',
    time: '10:12 AM, Today',
    text: 'Its good. We completed almost all task assign by our manager.',
    isMine: false
  },
  {
    id: 2,
    sender: 'Robert',
    time: '10:12 AM, Today',
    text: 'How are you feel today? What\'s about vacation?.',
    isMine: false
  },
  {
    id: 3,
    sender: 'Maria',
    time: '10:10 AM, Today', // Keeping as designed in the image (even if timestamps are chronologically odd in the mockup)
    text: 'I am good, We think for next weekend.',
    isMine: true
  }
];

const Chat = () => {
  const [activeUser, setActiveUser] = useState(contactsList[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  // Auto-scroll could be added here via a ref to the messages container

  return (
    <div className="chat-app-wrapper">
      {/* Top Header / Breadcrumbs */}
      <header className="chat-app-header-top">
        <h1 className="chat-app-page-title">Chat</h1>
        <div className="chat-app-breadcrumbs">
          <Home size={14} /> <span>Home</span> <ChevronRight size={14} /> <span className="chat-app-breadcrumb-active">Chat</span>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="chat-app-layout">
        
        {/* Left Sidebar: User List */}
        <aside className="chat-app-sidebar">
          <div className="chat-app-search-container">
            <input 
              type="text" 
              placeholder="Search..." 
              className="chat-app-search-input" 
            />
          </div>
          
          <div className="chat-app-scrollable chat-app-user-list">
            {contactsList.map(contact => (
              <div 
                key={contact.id} 
                className={`chat-app-user-item ${activeUser.id === contact.id ? 'active' : ''}`}
                onClick={() => setActiveUser(contact)}
              >
                <div className="chat-app-avatar-wrapper">
                  <img src={contact.avatar} alt={contact.name} className="chat-app-avatar" />
                </div>
                <div className="chat-app-user-info">
                  <span className="chat-app-user-name">{contact.name}</span>
                  <span className="chat-app-user-status">
                    <span className={`chat-app-status-dot ${contact.isOnline ? 'online' : 'offline'}`}></span>
                    {contact.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Area: Active Chat */}
        <main className="chat-app-main">
          {/* Active Chat Header */}
          <div className="chat-app-chat-header">
            <div className="chat-app-avatar-wrapper">
              <img src="https://i.pravatar.cc/150?u=99" alt="Maria Smith" className="chat-app-avatar" />
            </div>
            <div className="chat-app-user-info">
              <span className="chat-app-user-name">Maria Smith</span>
              <span className="chat-app-user-status">2 new messages</span>
            </div>
          </div>

          {/* Messages List Area */}
          <div className="chat-app-scrollable chat-app-messages-container">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`chat-app-message-wrapper ${msg.isMine ? 'sent' : 'received'}`}
              >
                <div className="chat-app-message-meta">
                  {msg.isMine ? (
                    <>
                      <span>{msg.time}</span> <strong>{msg.sender}</strong>
                    </>
                  ) : (
                    <>
                      <strong>{msg.sender}</strong> <span>{msg.time}</span>
                    </>
                  )}
                </div>
                <div className="chat-app-message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="chat-app-input-area">
            <textarea 
              className="chat-app-message-input"
              placeholder="Enter text here.."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={1}
            ></textarea>
            
            <div className="chat-app-input-actions">
              <button className="chat-app-action-btn">
                <Paperclip size={18} />
              </button>
              <button className="chat-app-action-btn">
                <Smile size={18} />
              </button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Chat;