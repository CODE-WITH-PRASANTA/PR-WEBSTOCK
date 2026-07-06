import React, { useState } from "react";
import { 
  FiHome, FiMail, FiSend, FiFileText, FiTrash2, FiAlertCircle, 
  FiFolder, FiStar, FiTag, FiCornerUpLeft, FiPaperclip, FiChevronLeft, FiChevronRight 
} from "react-icons/fi";
import "./Inbox.css";

const initialEmails = [
  { id: 1, sender: "Nelson Lane", subject: "Work", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "12:30 PM", starred: false, attachment: true, unread: true, label: "Work" },
  { id: 2, sender: "Kerry Mann", subject: "", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 13", starred: true, attachment: true, unread: false },
  { id: 3, sender: "Adam Peters", subject: "Shopping", snippet: "Lorem ipsum perspiciatis unde omnis", date: "May 12", starred: false, attachment: true, unread: false, label: "Shop" },
  { id: 4, sender: "Lula Reese", subject: "Family", snippet: "Lorem ipsum perspiciatis unde omnis", date: "May 12", starred: false, attachment: true, unread: false, label: "Family" },
  { id: 5, sender: "Nelson Lane", subject: "Work", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 12", starred: false, attachment: true, unread: false, label: "Work" },
  { id: 6, sender: "Kerry Mann", subject: "", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 11", starred: true, attachment: true, unread: false },
  { id: 7, sender: "Adam Peters", subject: "Office", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 11", starred: false, attachment: true, unread: false, label: "Themeforest" },
  { id: 8, sender: "Lula Reese", subject: "Work", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 11", starred: false, attachment: true, unread: false, label: "Work" },
  { id: 9, sender: "Nelson Lane", subject: "Work", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 10", starred: false, attachment: true, unread: false, label: "Work" },
  { id: 10, sender: "Kerry Mann", subject: "", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 10", starred: true, attachment: true, unread: false },
  { id: 11, sender: "Adam Peters", subject: "Shopping", snippet: "Lorem ipsum perspiciatis unde omnis", date: "May 10", starred: false, attachment: true, unread: false, label: "Shop" },
  { id: 12, sender: "Lula Reese", subject: "Work", snippet: "Lorem ipsum perspiciatis unde omnis iste natus", date: "May 09", starred: false, attachment: true, unread: false, label: "Work" }
];

const Inbox = () => {
  const [emails, setEmailList] = useState(initialEmails);
  const [selectedIds, setSelectedRows] = useState([]);
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Toggle single star condition
  const toggleStar = (id) => {
    setEmailList(emails.map(email => email.id === id ? { ...email, starred: !email.starred } : email));
  };

  // Checkbox interactions
  const handleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(item => item.id));
    }
  };

  // Working Top Action buttons
  const handleDeleteSelected = () => {
    setEmailList(emails.filter(email => !selectedIds.includes(email.id)));
    setSelectedRows([]);
  };

  const handleMarkAsRead = () => {
    setEmailList(emails.map(email => selectedIds.includes(email.id) ? { ...email, unread: false } : email));
    setSelectedRows([]);
  };

  // Pagination setups
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = emails.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = emails.length;

  return (
    <div className="ib-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="ib-breadcrumb-header-strip">
        <div className="ib-crumb-left">
          <h2>Inbox</h2>
        </div>
        <div className="ib-crumb-right">
          <FiHome className="ib-home-icon-node" />
          <span className="ib-separator-node">&gt;</span>
          <span className="ib-dim-node">Home</span>
          <span className="ib-separator-node">&gt;</span>
          <span className="ib-dim-node">Email</span>
          <span className="ib-separator-node">&gt;</span>
          <span className="ib-active-node">Inbox</span>
        </div>
      </div>

      {/* ================= GRID DESKTOP INTERFACE ================= */}
      <div className="ib-interface-grid-wrapper">
        
        {/* LEFT COMPONENT COLUMN: NAVIGATION PANEL */}
        <div className="ib-sidebar-left">
          <button className="ib-compose-btn" onClick={() => alert("Compose modal triggered.")}>
            COMPOSE
          </button>

          <div className="ib-folders-menu-list">
            <div className={`ib-folder-item ${activeFolder === "Inbox" ? "active-folder" : ""}`} onClick={() => setActiveFolder("Inbox")}>
              <div className="folder-label-flex">
                <FiMail className="folder-ico" /> <span>Inbox</span>
              </div>
              <span className="unread-counter-badge">6</span>
            </div>
            <div className="ib-folder-item"><div className="folder-label-flex"><FiSend className="folder-ico"/> <span>Sent</span></div></div>
            <div className="ib-folder-item"><div className="folder-label-flex"><FiFileText className="folder-ico"/> <span>Draft</span></div></div>
            <div className="ib-folder-item"><div className="folder-label-flex"><FiTrash2 className="folder-ico"/> <span>Bin</span></div></div>
            <div className="ib-folder-item"><div className="folder-label-flex"><FiFolder className="folder-ico"/> <span>Important</span></div></div>
            <div className="ib-folder-item"><div className="folder-label-flex"><FiStar className="folder-ico"/> <span>Starred</span></div></div>
          </div>

          <div className="ib-sidebar-section-divider"></div>
          
          <span className="sidebar-group-title">Labels</span>
          <div className="ib-labels-tag-cloud">
            <span className="tag-label-node"><span className="tag-dot dot-red"></span> Family</span>
            <span className="tag-label-node"><span className="tag-dot dot-blue"></span> Work</span>
            <span className="tag-label-node"><span className="tag-dot dot-orange"></span> Shop</span>
            <span className="tag-label-node"><span className="tag-dot dot-teal"></span> Themeforest</span>
            <span className="tag-label-node"><span className="tag-dot dot-cyan"></span> Google</span>
          </div>

          <div className="ib-sidebar-section-divider"></div>

          <span className="sidebar-group-title">Online</span>
          <div className="ib-online-users-list">
            <div className="online-user-row"><span className="online-dot-indicator"></span> Sachin</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> John Smith</div>
            <div className="online-user-row"><span className="online-dot-indicator gold"></span> Askay</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> Dhavan</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> Lee</div>
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN: EMAIL GRID RECORD PANEL */}
        <div className="ib-mail-container-right">
          
          {/* HEADER OPTIONS ACTION BAR */}
          <div className="ib-action-toolbar-top">
            <div className="toolbar-left-actions">
              <input 
                type="checkbox" 
                checked={currentItems.length > 0 && selectedIds.length === currentItems.length}
                onChange={handleSelectAll}
                className="ib-master-checkbox"
              />
              <button className="tb-action-btn" onClick={() => alert("Reply triggered")} title="Reply"><FiCornerUpLeft /></button>
              <button className="tb-action-btn" onClick={handleMarkAsRead} title="Mark as Read"><FiAlertCircle /></button>
              <button className="tb-action-btn" onClick={handleDeleteSelected} disabled={selectedIds.length === 0} title="Delete"><FiTrash2 /></button>
              <button className="tb-action-btn" onClick={() => alert("Archive triggered")} title="Archive"><FiFolder /></button>
              <button className="tb-action-btn" onClick={() => alert("Tags menu opened")} title="Labels"><FiTag /></button>
            </div>

            <div className="toolbar-right-pagination">
              <span className="range-indicator-text">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
              </span>
              <div className="arrow-controls-group">
                <button className="p-arrow-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                  <FiChevronLeft />
                </button>
                <button className="p-arrow-btn" disabled={indexOfLastItem >= totalItems} onClick={() => setCurrentPage(prev => prev + 1)}>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* EMAILS LIST VIEW PORT */}
          <div className="ib-emails-list-viewport">
            {currentItems.map((email) => (
              <div 
                key={email.id} 
                className={`ib-email-row-item ${email.unread ? "unread-highlight" : ""} ${selectedIds.includes(email.id) ? "row-selected" : ""}`}
              >
                {/* Select column checkbox */}
                <div className="cell-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(email.id)}
                    onChange={() => handleSelectRow(email.id)}
                  />
                </div>

                {/* Star icon column */}
                <div className="cell-star" onClick={() => toggleStar(email.id)}>
                  <FiStar className={`star-ico-graphic ${email.starred ? "star-active-gold" : ""}`} />
                </div>

                {/* Sender profile column */}
                <div className="cell-sender-name">
                  {email.sender}
                </div>

                {/* Content snippet and badge column */}
                <div className="cell-content-snippet-block">
                  {email.label && (
                    <span className={`badge-pill-lbl lbl-${email.label.toLowerCase()}`}>
                      {email.label}
                    </span>
                  )}
                  <span className="snippet-body-text">{email.snippet}</span>
                </div>

                {/* Attachment paperclip metric column */}
                <div className="cell-attachment-clip">
                  {email.attachment && <FiPaperclip className="clip-ico-graphic" />}
                </div>

                {/* Date metric column */}
                <div className="cell-date-timestamp">
                  {email.date}
                </div>

              </div>
            ))}
            {currentItems.length === 0 && (
              <div className="empty-mailbox-fallback">No emails matching current view layers.</div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Inbox;