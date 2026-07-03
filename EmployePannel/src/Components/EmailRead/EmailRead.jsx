import React from 'react';
import { 
  FaHome, FaChevronRight, FaTag, FaPaperclip 
} from 'react-icons/fa';
import './EmailRead.css';

const EmailRead = () => {
  // Mock image attachments data
  const attachments = [
    { id: 1, name: 'IMG_001.jpg', size: '20KB', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60' },
    { id: 2, name: 'IMG_002.jpg', size: '22KB', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60' },
    { id: 3, name: 'IMG_003.jpg', size: '28KB', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60' }
  ];

  const handleAction = (actionType) => {
    alert(`Action triggered: ${actionType}`);
  };

  return (
    <div className="EmailRead-container">
      {/* Top Header */}
      <header className="EmailRead-header">
        <h1 className="EmailRead-title">Read</h1>
        <div className="EmailRead-breadcrumbs">
          <FaHome className="EmailRead-breadcrumb-home-icon" />
          <span className="EmailRead-breadcrumb-text">Home</span>
          <FaChevronRight className="EmailRead-breadcrumb-arrow" />
          <span className="EmailRead-breadcrumb-text">Email</span>
          <FaChevronRight className="EmailRead-breadcrumb-arrow" />
          <span className="EmailRead-breadcrumb-active">Read</span>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="EmailRead-workspace">
        
        {/* Left Sidebar Card */}
        <aside className="EmailRead-sidebar">
          <button className="EmailRead-compose-btn">COMPOSE</button>
          
          <nav className="EmailRead-nav-menu">
            <div className="EmailRead-nav-item EmailRead-nav-item-active">
              <span>Inbox</span>
              <span className="EmailRead-badge">6</span>
            </div>
            <div className="EmailRead-nav-item">Sent</div>
            <div className="EmailRead-nav-item">Draft</div>
            <div className="EmailRead-nav-item">Bin</div>
            <div className="EmailRead-nav-item">Important</div>
            <div className="EmailRead-nav-item">Starred</div>
          </nav>

          <div className="EmailRead-section-divider"></div>

          <div className="EmailRead-labels-section">
            <h3 className="EmailRead-section-heading">Labels</h3>
            <div className="EmailRead-labels-grid">
              <span className="EmailRead-label-tag"><FaTag className="EmailRead-tag-family" /> Family</span>
              <span className="EmailRead-label-tag"><FaTag className="EmailRead-tag-work" /> Work</span>
              <span className="EmailRead-label-tag"><FaTag className="EmailRead-tag-shop" /> Shop</span>
              <span className="EmailRead-label-tag"><FaTag className="EmailRead-tag-themeforest" /> Themeforest</span>
              <span className="EmailRead-label-tag"><FaTag className="EmailRead-tag-google" /> Google</span>
            </div>
          </div>

          <div className="EmailRead-section-divider"></div>

          <div className="EmailRead-online-section">
            <h3 className="EmailRead-section-heading">Online</h3>
            <ul className="EmailRead-online-list">
              <li><span className="EmailRead-status-dot EmailRead-status-sachin"></span> Sachin</li>
              <li><span className="EmailRead-status-dot EmailRead-status-john"></span> John Smith</li>
              <li><span className="EmailRead-status-dot EmailRead-status-askay"></span> Askay</li>
              <li><span className="EmailRead-status-dot EmailRead-status-dhavan"></span> Dhavan</li>
              <li><span className="EmailRead-status-dot EmailRead-status-lee"></span> Lee</li>
            </ul>
          </div>
        </aside>

        {/* Right Message Content Card */}
        <main className="EmailRead-main-card">
          <div className="EmailRead-card-header">
            Hi Dear, How are you?
          </div>
          
          <div className="EmailRead-card-body">
            {/* Sender Information Row */}
            <div className="EmailRead-sender-row">
              <div className="EmailRead-sender-meta">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=facearea&facepad=2&q=80" 
                  alt="Sarah Smith" 
                  className="EmailRead-avatar"
                />
                <div className="EmailRead-sender-details">
                  <span className="EmailRead-sender-name">Sarah Smith</span>
                  <span className="EmailRead-sender-email">From: sarah@example.com</span>
                </div>
              </div>
              <div className="EmailRead-timestamp">
                4:15AM 04 April 2017
              </div>
            </div>

            {/* Email Core Message Body */}
            <div className="EmailRead-message-content">
              <p>
                Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.
              </p>
              <p>
                Porttitor eu consequat risus. <span className="EmailRead-text-blue">Mauris sed congue orci. Donec ultrices faucibus rutrum.</span> Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.
              </p>
              <p>
                Sodales <span className="EmailRead-text-blue">vulputate urna, vel accumsan augue egestas ac.</span> Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum. Phasellus sodales vulputate urna, vel accumsan augue egestas ac. Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci.
              </p>
            </div>

            {/* Attachments Section */}
            <div className="EmailRead-attachments-section">
              <div className="EmailRead-attachments-header">
                <FaPaperclip className="EmailRead-clip-icon" />
                <span className="EmailRead-attachments-count">3 attachments — </span>
                <button className="EmailRead-link-btn" onClick={() => handleAction('Download All')}>Download all attachments</button>
                <span className="EmailRead-link-divider">|</span>
                <button className="EmailRead-link-btn" onClick={() => handleAction('View Images')}>View all images</button>
              </div>

              {/* Grid of Attached Images */}
              <div className="EmailRead-attachments-grid">
                {attachments.map((file) => (
                  <div key={file.id} className="EmailRead-attachment-card">
                    <div className="EmailRead-attachment-preview">
                      <img src={file.url} alt={file.name} />
                    </div>
                    <div className="EmailRead-attachment-info">
                      <span className="EmailRead-file-name">{file.name}</span>
                      <span className="EmailRead-file-size">{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Quick Reply Prompt Box */}
            <div className="EmailRead-reply-box">
              click here to <button className="EmailRead-inline-action-btn" onClick={() => handleAction('Reply')}>Reply</button> or <button className="EmailRead-inline-action-btn" onClick={() => handleAction('Forward')}>Forward</button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default EmailRead;