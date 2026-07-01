import React, { useState } from "react";
import "./Chats.css";
import { FiHome, FiPaperclip, FiSmile, FiSearch } from "react-icons/fi";

const initialUsers = [
  { id: 1, name: "William Smith", status: "left 7 mins ago", isOnline: false, avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Martha Williams", status: "online", isOnline: false, dotType: "orange", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Joseph Clark", status: "online", isOnline: true, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "Nancy Taylor", status: "online", isOnline: true, avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: 5, name: "Margaret Wilson", status: "online", isOnline: true, avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, name: "Joseph Jones", status: "left 30 mins ago", isOnline: false, avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
  { id: 7, name: "Jane Brown", status: "left 10 hours ago", isOnline: false, avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
  { id: 8, name: "Eliza Johnson", status: "online", isOnline: true, avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
  { id: 9, name: "Mike Clark", status: "online", isOnline: true, avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
  { id: 10, name: "Ann Henry", status: "", isOnline: false, hideDot: true, avatar: "https://randomuser.me/api/portraits/women/10.jpg" }
];

const Chats = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeUserId, setActiveUserId] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const filteredUsers = initialUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="kuber-chat-page-root">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="chat-breadcrumb-header">
        <div className="breadcrumb-left">
          <h1>Chat</h1>
        </div>
        <div className="breadcrumb-right">
          <FiHome className="home-nav-icon" />
          <span className="nav-arrow">&gt;</span>
          <span className="nav-link-lbl">Home</span>
          <span className="nav-arrow">&gt;</span>
          <span className="nav-current-lbl">Chat</span>
        </div>
      </div>

      {/* ================= MAIN INTERFACE WRAPPER ================= */}
      <div className="chat-interface-layout">
        
        {/* LEFT COMPONENT: CONTACTS LIST */}
        <div className="chat-sidebar-left">
          <div className="sidebar-search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="sidebar-contacts-scroll">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`contact-item-row ${activeUserId === user.id ? "selected-active" : ""}`}
                onClick={() => setActiveUserId(user.id)}
              >
                <div className="contact-avatar-holder">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="contact-info-holder">
                  <span className="contact-profile-name">{user.name}</span>
                  {user.status && (
                    <div className="contact-status-flex">
                      {!user.hideDot && (
                        <span className={`indicator-dot ${user.isOnline ? "green-dot" : "orange-dot"}`}></span>
                      )}
                      <span className="status-timeline-text">{user.status}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COMPONENT: CONVERSATION BOX */}
        <div className="chat-window-right">
          
          {/* Active User Header Banner info */}
          <div className="chat-window-top-bar">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Maria Smith" className="active-chat-avatar" />
            <div className="active-chat-meta">
              <h5>Maria Smith</h5>
              <span>2 new messages</span>
            </div>
          </div>

          {/* Chat Messages Log Area */}
          <div className="chat-messages-scrollarea">
            
            {/* Incoming Message: Maria */}
            <div className="message-container incoming">
              <div className="msg-bubble shadow-tint">
                Hi Robert , how are you? How is your work going on?
              </div>
            </div>

            {/* Outgoing Message Timestamp Row: Robert */}
            <div className="msg-user-timestamp left-aligned">
              <strong>Robert</strong> 10:12 AM, Today
            </div>

            {/* Outgoing Message Bubble 1: Robert */}
            <div className="message-container outgoing">
              <div className="msg-bubble gray-bubble">
                Its good. We completed almost all task assign by our manager.
              </div>
            </div>

            {/* Outgoing Message Timestamp Row 2 */}
            <div className="msg-user-timestamp left-aligned">
              <strong>Robert</strong> 10:12 AM, Today
            </div>

            {/* Outgoing Message Bubble 2: Robert */}
            <div className="message-container outgoing">
              <div className="msg-bubble gray-bubble">
                How are you feel today? What's about vacation?.
              </div>
            </div>

            {/* Incoming Message Timestamp Row: Maria */}
            <div className="msg-user-timestamp right-aligned">
              10:10 AM, Today <strong>Maria</strong>
            </div>

            {/* Incoming Message Bubble 2: Maria */}
            <div className="message-container incoming last-msg-margin">
              <div className="msg-bubble shadow-tint attachment-tail">
                I am good, We think for next weekend.
              </div>
            </div>

          </div>

          {/* BOTTOM INTERACTIVE BAR FIELD */}
          <div className="chat-bottom-control-area">
            <div className="chat-input-outline-wrapper">
              <input 
                type="text" 
                placeholder="Enter text here.." 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </div>
            
            <div className="chat-action-buttons-group">
              <button className="orange-action-btn clip-btn" title="Attach file">
                <FiPaperclip />
              </button>
              <button className="orange-action-btn emoji-btn" title="Add emoji">
                <FiSmile />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Chats;