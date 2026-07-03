import React, { useState } from 'react';
import { 
  FiCornerUpLeft, 
  FiFolder, 
  FiTag, 
  FiTrash2, 
  FiAlertCircle, 
  FiChevronLeft, 
  FiChevronRight, 
  FiPaperclip 
} from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { MdOutlineMoveToInbox } from 'react-icons/md';
import './EmailInbox.css';

const EmailInbox = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [starredEmails, setStarredEmails] = useState([2, 6, 10, 14]); // Pre-starred matching mockup

  const emailData = [
    { id: 1, sender: 'Nelson Lane', tag: 'Work', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: '12:30 PM', hasAttachment: true },
    { id: 2, sender: 'Kerry Mann', tag: null, text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 13', hasAttachment: true },
    { id: 3, sender: 'Adam Peters', tag: 'Shopping', text: 'Lorem ipsum perspiciatis unde omnis', date: 'May 12', hasAttachment: true },
    { id: 4, sender: 'Lula Reese', tag: 'Family', text: 'Lorem ipsum perspiciatis unde omnis', date: 'May 12', hasAttachment: true },
    { id: 5, sender: 'Nelson Lane', tag: 'Work', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 12', hasAttachment: true },
    { id: 6, sender: 'Kerry Mann', tag: null, text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 11', hasAttachment: true },
    { id: 7, sender: 'Adam Peters', tag: 'Office', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 11', hasAttachment: true },
    { id: 8, sender: 'Lula Reese', tag: 'Work', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 11', hasAttachment: true },
    { id: 9, sender: 'Nelson Lane', tag: 'Work', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 10', hasAttachment: true },
    { id: 10, sender: 'Kerry Mann', tag: null, text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 10', hasAttachment: true },
    { id: 11, sender: 'Adam Peters', tag: 'Shopping', text: 'Lorem ipsum perspiciatis unde omnis', date: 'May 10', hasAttachment: true },
    { id: 12, sender: 'Lula Reese', tag: 'Work', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 09', hasAttachment: true },
    { id: 13, sender: 'Nelson Lane', tag: 'Work', text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 09', hasAttachment: true },
    { id: 14, sender: 'Kerry Mann', tag: null, text: 'Lorem ipsum perspiciatis unde omnis iste natus', date: 'May 09', hasAttachment: true },
    { id: 15, sender: 'Adam Peters', tag: 'Shopping', text: 'Lorem ipsum perspiciatis unde omnis', date: 'May 09', hasAttachment: true }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmails(emailData.map(email => email.id));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleSelectEmail = (id) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(item => item !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const toggleStar = (id) => {
    if (starredEmails.includes(id)) {
      setStarredEmails(starredEmails.filter(item => item !== id));
    } else {
      setStarredEmails([...starredEmails, id]);
    }
  };

  const getTagClass = (tag) => {
    if (!tag) return '';
    return `email-inbox-tag-${tag.toLowerCase()}`;
  };

  return (
    <div className="email-inbox-container">
      {/* Top Header Row with Title and Breadcrumbs */}
      <div className="email-inbox-header-row">
        <h1 className="email-inbox-page-title">Inbox</h1>
        <div className="email-inbox-breadcrumb">
          <GoHome className="breadcrumb-home-icon" />
          <span className="breadcrumb-link">Home</span>
          <IoIosArrowForward className="breadcrumb-arrow-icon" />
          <span className="breadcrumb-link">Email</span>
          <IoIosArrowForward className="breadcrumb-arrow-icon" />
          <span className="breadcrumb-current">Inbox</span>
        </div>
      </div>

      {/* Main Grid Workspace split into Sidebar and Mail List */}
      <div className="email-inbox-layout">
        
        {/* Left Side Panel View */}
        <aside className="email-inbox-sidebar">
          <button className="email-inbox-compose-btn">COMPOSE</button>
          
          <nav className="email-inbox-nav">
            <div className="email-inbox-nav-item active">
              <span>Inbox</span>
              <span className="email-inbox-badge">6</span>
            </div>
            <div className="email-inbox-nav-item">Sent</div>
            <div className="email-inbox-nav-item">Draft</div>
            <div className="email-inbox-nav-item">Bin</div>
            <div className="email-inbox-nav-item">Important</div>
            <div className="email-inbox-nav-item">Starred</div>
          </nav>

          <div className="email-inbox-sidebar-section">
            <h3 className="email-inbox-sidebar-heading">Labels</h3>
            <div className="email-inbox-labels-list">
              <span className="email-inbox-label-tag"><span className="label-dot dot-family"></span>Family</span>
              <span className="email-inbox-label-tag"><span className="label-dot dot-work"></span>Work</span>
              <span className="email-inbox-label-tag"><span className="label-dot dot-shop"></span>Shop</span>
              <span className="email-inbox-label-tag"><span className="label-dot dot-themeforest"></span>Themeforest</span>
              <span className="email-inbox-label-tag"><span className="label-dot dot-google"></span>Google</span>
            </div>
          </div>

          <div className="email-inbox-sidebar-section">
            <h3 className="email-inbox-sidebar-heading">Online</h3>
            <ul className="email-inbox-online-list">
              <li><span className="status-dot online"></span>Sachin</li>
              <li><span className="status-dot offline"></span>John Smith</li>
              <li><span className="status-dot away"></span>Askay</li>
              <li><span className="status-dot offline"></span>Dhavan</li>
              <li><span className="status-dot offline"></span>Lee</li>
            </ul>
          </div>
        </aside>

        {/* Right Side Mail Grid Frame */}
        <main className="email-inbox-main-card">
          
          {/* Top Mailbox Controls Menu Toolbar */}
          <div className="email-inbox-toolbar">
            <div className="email-inbox-toolbar-left">
              <input 
                type="checkbox" 
                className="email-inbox-checkbox"
                onChange={handleSelectAll}
                checked={selectedEmails.length === emailData.length}
              />
              <button className="toolbar-icon-btn"><FiCornerUpLeft /></button>
              <button className="toolbar-icon-btn"><MdOutlineMoveToInbox /></button>
              <button className="toolbar-icon-btn"><FiAlertCircle /></button>
              <button className="toolbar-icon-btn"><FiTrash2 /></button>
              <button className="toolbar-icon-btn"><FiFolder /></button>
              <button className="toolbar-icon-btn"><FiTag /></button>
            </div>
            
            <div className="email-inbox-toolbar-right">
              <button className="toolbar-page-btn"><FiChevronLeft /></button>
              <button className="toolbar-page-btn"><FiChevronRight /></button>
            </div>
          </div>

          {/* List of Email Items Rows */}
          <div className="email-inbox-list">
            {emailData.map((email) => (
              <div 
                key={email.id} 
                className={`email-inbox-row ${selectedEmails.includes(email.id) ? 'selected' : ''}`}
              >
                <div className="email-inbox-cell-check">
                  <input 
                    type="checkbox" 
                    className="email-inbox-checkbox"
                    checked={selectedEmails.includes(email.id)}
                    onChange={() => handleSelectEmail(email.id)}
                  />
                </div>
                
                <div className="email-inbox-cell-star" onClick={() => toggleStar(email.id)}>
                  {starredEmails.includes(email.id) ? (
                    <FaStar className="star-icon active" />
                  ) : (
                    <FaRegStar className="star-icon" />
                  )}
                </div>

                <div className="email-inbox-cell-sender">
                  {email.sender}
                </div>

                <div className="email-inbox-cell-content">
                  {email.tag && (
                    <span className={`email-inbox-item-tag ${getTagClass(email.tag)}`}>
                      {email.tag}
                    </span>
                  )}
                  <span className="email-inbox-snippet-text">{email.text}</span>
                </div>

                <div className="email-inbox-cell-attachment">
                  {email.hasAttachment && <FiPaperclip className="attachment-clip-icon" />}
                </div>

                <div className="email-inbox-cell-date">
                  {email.date}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Card Pagination Row Footer View */}
          <div className="email-inbox-footer">
            <span className="email-inbox-pagination-text">Showing 1 - 15 of 200</span>
            <div className="email-inbox-footer-nav">
              <button className="toolbar-page-btn"><FiChevronLeft /></button>
              <button className="toolbar-page-btn"><FiChevronRight /></button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default EmailInbox;