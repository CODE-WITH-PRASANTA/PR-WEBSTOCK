import React, { useState, useRef } from "react";
import { 
  FiHome, FiMail, FiSend, FiFileText, FiTrash2, FiFolder, FiStar, 
  FiBold, FiItalic, FiUnderline, FiCode, FiList, FiLink, FiImage, FiType 
} from "react-icons/fi";
import { FaQuoteRight, FaStrikethrough, FaListOl, FaPaintBrush, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from "react-icons/fa";
import "./Compose.css";

const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!to) {
      alert("Please specify a recipient in the 'TO' field.");
      return;
    }
    alert(`Email successfully sent to: ${to}\nSubject: ${subject}`);
    handleDiscard();
  };

  const handleDiscard = () => {
    setTo("");
    setSubject("");
    setMessage("");
    setFileName("No file chosen");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="comp-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="comp-breadcrumb-header-strip">
        <div className="comp-crumb-left">
          <h2>Compose</h2>
        </div>
        <div className="comp-crumb-right">
          <FiHome className="comp-home-icon-node" />
          <span className="comp-separator-node">&gt;</span>
          <span className="comp-dim-node">Home</span>
          <span className="comp-separator-node">&gt;</span>
          <span className="comp-dim-node">Email</span>
          <span className="comp-separator-node">&gt;</span>
          <span className="comp-active-node">Compose</span>
        </div>
      </div>

      {/* ================= MAIN INTERFACE GRID WRAPPER ================= */}
      <div className="comp-interface-grid-wrapper">
        
        {/* LEFT PANEL: NAVIGATION COLUMN */}
        <div className="comp-sidebar-left">
          <button className="comp-compose-btn-sidebar">COMPOSE</button>

          <div className="comp-folders-menu-list">
            <div className="comp-folder-item">
              <div className="folder-label-flex">
                <FiMail className="folder-ico" /> <span>Inbox</span>
              </div>
              <span className="unread-counter-badge">6</span>
            </div>
            <div className="comp-folder-item"><div className="folder-label-flex"><FiSend className="folder-ico"/> <span>Sent</span></div></div>
            <div className="comp-folder-item"><div className="folder-label-flex"><FiFileText className="folder-ico"/> <span>Draft</span></div></div>
            <div className="comp-folder-item"><div className="folder-label-flex"><FiTrash2 className="folder-ico"/> <span>Bin</span></div></div>
            <div className="comp-folder-item"><div className="folder-label-flex"><FiFolder className="folder-ico"/> <span>Important</span></div></div>
            <div className="comp-folder-item"><div className="folder-label-flex"><FiStar className="folder-ico"/> <span>Starred</span></div></div>
          </div>

          <div className="comp-sidebar-section-divider"></div>
          
          <span className="sidebar-group-title">Labels</span>
          <div className="comp-labels-tag-cloud">
            <span className="tag-label-node"><span className="tag-dot dot-red"></span> Family</span>
            <span className="tag-label-node"><span className="tag-dot dot-blue"></span> Work</span>
            <span className="tag-label-node"><span className="tag-dot dot-orange"></span> Shop</span>
            <span className="tag-label-node"><span className="tag-dot dot-teal"></span> Themeforest</span>
            <span className="tag-label-node"><span className="tag-dot dot-cyan"></span> Google</span>
          </div>

          <div className="comp-sidebar-section-divider"></div>

          <span className="sidebar-group-title">Online</span>
          <div className="comp-online-users-list">
            <div className="online-user-row"><span className="online-dot-indicator"></span> Sachin</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> John Smith</div>
            <div className="online-user-row"><span className="online-dot-indicator gold"></span> Askay</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> Dhavan</div>
            <div className="online-user-row"><span className="online-dot-indicator"></span> Lee</div>
          </div>
        </div>

        {/* RIGHT PANEL: COMPOSE MESSAGE FORM */}
        <div className="comp-form-container-right">
          <span className="comp-box-section-title">Compose New Message</span>
          
          <form onSubmit={handleSend} className="comp-actual-form">
            {/* Recipient Input */}
            <div className="comp-input-wrapper">
              <input 
                type="text" 
                placeholder="TO" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            {/* Subject Input */}
            <div className="comp-input-wrapper">
              <input 
                type="text" 
                placeholder="Subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Rich Text Editor Mockup Shell */}
            <div className="comp-editor-frame-box">
              <div className="comp-editor-toolbar-top">
                <div className="toolbar-btn-group">
                  <button type="button" className="editor-tool-btn font-bold-txt"><FiBold /></button>
                  <button type="button" className="editor-tool-btn"><FiItalic /></button>
                  <button type="button" className="editor-tool-btn"><FiUnderline /></button>
                  <button type="button" className="editor-tool-btn"><FaStrikethrough /></button>
                </div>
                <div className="toolbar-divider-pipe"></div>
                <div className="toolbar-btn-group">
                  <button type="button" className="editor-tool-btn"><FiCode /></button>
                  <button type="button" className="editor-tool-btn"><FaQuoteRight /></button>
                </div>
                <div className="toolbar-divider-pipe"></div>
                <div className="toolbar-btn-group">
                  <button type="button" className="editor-tool-btn"><FiList /></button>
                  <button type="button" className="editor-tool-btn"><FaListOl /></button>
                </div>
                <div className="toolbar-divider-pipe"></div>
                <div className="toolbar-btn-group select-dropdown-group">
                  <select defaultValue="Heading" className="editor-select-dropdown">
                    <option value="Heading">Heading</option>
                    <option value="Normal">Normal Paragraph</option>
                    <option value="Sub">Subheading</option>
                  </select>
                </div>
                <div className="toolbar-divider-pipe"></div>
                <div className="toolbar-btn-group">
                  <button type="button" className="editor-tool-btn"><FiLink /></button>
                  <button type="button" className="editor-tool-btn"><FiImage /></button>
                </div>
                <div className="toolbar-divider-pipe"></div>
                <div className="toolbar-btn-group">
                  <button type="button" className="editor-tool-btn"><FiType /></button>
                  <button type="button" className="editor-tool-btn"><FaPaintBrush /></button>
                </div>
                <div className="toolbar-divider-pipe"></div>
                <div className="toolbar-btn-group">
                  <button type="button" className="editor-tool-btn"><FaAlignLeft /></button>
                  <button type="button" className="editor-tool-btn"><FaAlignCenter /></button>
                  <button type="button" className="editor-tool-btn"><FaAlignRight /></button>
                  <button type="button" className="editor-tool-btn"><FaAlignJustify /></button>
                </div>
              </div>
              
              <textarea 
                className="comp-editor-textarea-body" 
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* Custom Styled Choose File Options Element */}
            <div className="comp-file-attachment-row">
              <input 
                type="file" 
                id="hidden-file-node" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden-file-node"
              />
              <button 
                type="button" 
                className="custom-choose-file-trigger"
                onClick={() => fileInputRef.current.click()}
              >
                Choose files
              </button>
              <span className="file-status-name-lbl">{fileName}</span>
            </div>

            {/* Form Footer Action Buttons */}
            <div className="comp-form-actions-footer-strip">
              <button type="submit" className="comp-action-btn-final btn-send-blue">Send</button>
              <button type="button" className="comp-action-btn-final btn-discard-blue" onClick={handleDiscard}>Discard</button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Compose;