import React, { useState } from "react";
import { 
  FiHome, FiMail, FiSend, FiFileText, FiTrash2, FiFolder, FiStar, FiPaperclip 
} from "react-icons/fi";
import "./ReadEmail.css";

const ReadEmail = () => {
  const [activeFolder, setActiveFolder] = useState("Inbox");

  const foldersList = [
    { name: "Inbox", icon: <FiMail />, badge: "6" },
    { name: "Sent", icon: <FiSend /> },
    { name: "Draft", icon: <FiFileText /> },
    { name: "Bin", icon: <FiTrash2 /> },
    { name: "Important", icon: <FiFolder /> },
    { name: "Starred", icon: <FiStar /> }
  ];

  const attachmentData = [
    { id: 1, name: "IMG_001.jpg", size: "20KB", url: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "IMG_002.jpg", size: "22KB", url: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 3, name: "IMG_003.jpg", size: "28KB", url: "https://randomuser.me/api/portraits/women/9.jpg" }
  ];

  return (
    <div className="re-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="re-breadcrumb-header-strip">
        <div className="re-crumb-left">
          <h2>Read</h2>
        </div>
        <div className="re-crumb-right">
          <FiHome className="re-home-icon-node" />
          <span className="re-separator-node">&gt;</span>
          <span className="re-dim-node">Home</span>
          <span className="re-separator-node">&gt;</span>
          <span className="re-dim-node">Email</span>
          <span className="re-separator-node">&gt;</span>
          <span className="re-active-node">Read</span>
        </div>
      </div>

      {/* ================= INTERFACE GRID WRAPPER ================= */}
      <div className="re-interface-grid-wrapper">
        
        {/* LEFT PANEL: NAVIGATION COLUMN */}
        <div className="re-sidebar-left">
          <button className="re-compose-btn-sidebar" onClick={() => alert("Compose action triggered.")}>
            COMPOSE
          </button>

          <div className="re-folders-menu-list">
            {foldersList.map((folder, index) => (
              <div 
                key={index} 
                className={`re-folder-item ${activeFolder === folder.name ? "active-folder" : ""}`} 
                onClick={() => setActiveFolder(folder.name)}
              >
                <div className="folder-label-flex">
                  {folder.icon} <span>{folder.name}</span>
                </div>
                {folder.badge && <span className="unread-counter-badge">{folder.badge}</span>}
              </div>
            ))}
          </div>

          <div className="re-sidebar-section-divider"></div>
          
          <span className="sidebar-group-title">Labels</span>
          <div className="re-labels-tag-cloud">
            <span className="tag-label-node"><span className="tag-dot dot-red"></span> Family</span>
            <span className="tag-label-node"><span className="tag-dot dot-blue"></span> Work</span>
            <span className="tag-label-node"><span className="tag-dot dot-orange"></span> Shop</span>
            <span className="tag-label-node"><span className="tag-dot dot-teal"></span> Themeforest</span>
            <span className="tag-label-node"><span className="tag-dot dot-cyan"></span> Google</span>
          </div>

          <div className="re-sidebar-section-divider"></div>

          <span className="sidebar-group-title">Online</span>
          <div className="re-online-users-list">
            <div className="online-user-row"><span className="online-dot-indicator"></span> Sachin</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> John Smith</div>
            <div className="online-user-row"><span className="online-dot-indicator gold"></span> Askay</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> Dhavan</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> Lee</div>
          </div>
        </div>

        {/* RIGHT PANEL: DISPLAY EMAIL AREA */}
        <div className="re-content-panel-right">
          
          {/* Email Subject Title Banner */}
          <div className="re-email-subject-header">
            <h3>Hi Dear, How are you?</h3>
          </div>

          {/* Sender Header Meta Information */}
          <div className="re-email-meta-sender-row">
            <div className="meta-sender-details">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Sarah Smith" className="sender-profile-circle-avatar" />
              <div className="meta-sender-txt-stack">
                <span className="sender-profile-title">Sarah Smith</span>
                <span className="sender-email-sub-label">From: sarah@example.com</span>
              </div>
            </div>
            <div className="meta-timestamp-right-node">
              <span>4:15AM 04 April 2017</span>
            </div>
          </div>

          {/* Email Content Paragraph Text Area */}
          <div className="re-email-body-text-content">
            <p>
              Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.
            </p>
            <p>
              Porttitor eu consequat risus. <span className="blue-inline-link">Mauris sed congue orci. Donec ultrices faucibus rutrum.</span> Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.
            </p>
            <p>
              Sodales <span className="blue-inline-link">vulputate urna, vel accumsan augue egestas ac.</span> Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.
            </p>
          </div>

          {/* Attachments Section Link Header */}
          <div className="re-attachments-control-title-strip">
            <div className="attachments-lbl-flex">
              <FiPaperclip className="clip-icon-attachment-node" />
              <span><strong>3 attachments</strong> — </span>
              <span className="blue-action-trigger-link" onClick={() => alert("Downloading attachments...")}>Download all attachments</span>
              <span className="partition-pipe">|</span>
              <span className="blue-action-trigger-link" onClick={() => alert("Opening image previews...")}>View all images</span>
            </div>
          </div>

          {/* Attachments Image Previews Row Card Grid Layout */}
          <div className="re-attachments-image-previews-grid">
            {attachmentData.map((attachment) => (
              <div key={attachment.id} className="attachment-card-box-node">
                <div className="attachment-image-aspect-frame">
                  <img src={attachment.url} alt={attachment.name} />
                </div>
                <div className="attachment-card-footer-lbl-link">
                  <span className="attachment-filename-txt">{attachment.name}</span>
                  <span className="attachment-filesize-txt">{attachment.size}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reply / Forward Input Shell Panel Footer */}
          <div className="re-quick-reply-action-footer-panel">
            <p className="reply-placeholder-prompt-lbl">
              click here to <span className="blue-action-trigger-link" onClick={() => alert("Reply initialized.")}>Reply</span> or <span className="blue-action-trigger-link" onClick={() => alert("Forward initialized.")}>Forward</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReadEmail;