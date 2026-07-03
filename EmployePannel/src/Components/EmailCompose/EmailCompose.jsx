import React, { useState, useRef } from 'react';
import { 
  FaHome, FaChevronRight, FaTag, FaBold, FaItalic, 
  FaUnderline, FaStrikethrough, FaCode, FaQuoteRight, 
  FaListOl, FaListUl, FaLink, FaImage, FaFont, 
  FaPaintBrush, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify
} from 'react-icons/fa';
import './EmailCompose.css';

const EmailCompose = () => {
  // Input states
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Formatting states
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [alignment, setAlignment] = useState('left');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSend = () => {
    alert(`Sending Email...\nTo: ${to}\nSubject: ${subject}\nMessage: ${message}\nAttachment: ${selectedFile || 'None'}`);
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard this message?')) {
      setTo('');
      setSubject('');
      setMessage('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="EmailCompose-container">
      {/* Top Header */}
      <header className="EmailCompose-header">
        <h1 className="EmailCompose-title">Compose</h1>
        <div className="EmailCompose-breadcrumbs">
          <FaHome className="EmailCompose-breadcrumb-home-icon" />
          <span className="EmailCompose-breadcrumb-text">Home</span>
          <FaChevronRight className="EmailCompose-breadcrumb-arrow" />
          <span className="EmailCompose-breadcrumb-text">Email</span>
          <FaChevronRight className="EmailCompose-breadcrumb-arrow" />
          <span className="EmailCompose-breadcrumb-active">Compose</span>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="EmailCompose-workspace">
        
        {/* Left Sidebar Card */}
        <aside className="EmailCompose-sidebar">
          <button className="EmailCompose-compose-btn">COMPOSE</button>
          
          <nav className="EmailCompose-nav-menu">
            <div className="EmailCompose-nav-item EmailCompose-nav-item-active">
              <span>Inbox</span>
              <span className="EmailCompose-badge">6</span>
            </div>
            <div className="EmailCompose-nav-item">Sent</div>
            <div className="EmailCompose-nav-item">Draft</div>
            <div className="EmailCompose-nav-item">Bin</div>
            <div className="EmailCompose-nav-item">Important</div>
            <div className="EmailCompose-nav-item">Starred</div>
          </nav>

          <div className="EmailCompose-section-divider"></div>

          <div className="EmailCompose-labels-section">
            <h3 className="EmailCompose-section-heading">Labels</h3>
            <div className="EmailCompose-labels-grid">
              <span className="EmailCompose-label-tag"><FaTag className="EmailCompose-tag-family" /> Family</span>
              <span className="EmailCompose-label-tag"><FaTag className="EmailCompose-tag-work" /> Work</span>
              <span className="EmailCompose-label-tag"><FaTag className="EmailCompose-tag-shop" /> Shop</span>
              <span className="EmailCompose-label-tag"><FaTag className="EmailCompose-tag-themeforest" /> Themeforest</span>
              <span className="EmailCompose-label-tag"><FaTag className="EmailCompose-tag-google" /> Google</span>
            </div>
          </div>

          <div className="EmailCompose-section-divider"></div>

          <div className="EmailCompose-online-section">
            <h3 className="EmailCompose-section-heading">Online</h3>
            <ul className="EmailCompose-online-list">
              <li><span className="EmailCompose-status-dot EmailCompose-status-sachin"></span> Sachin</li>
              <li><span className="EmailCompose-status-dot EmailCompose-status-john"></span> John Smith</li>
              <li><span className="EmailCompose-status-dot EmailCompose-status-askay"></span> Askay</li>
              <li><span className="EmailCompose-status-dot EmailCompose-status-dhavan"></span> Dhavan</li>
              <li><span className="EmailCompose-status-dot EmailCompose-status-lee"></span> Lee</li>
            </ul>
          </div>
        </aside>

        {/* Right Message Compose Card */}
        <main className="EmailCompose-main-card">
          <div className="EmailCompose-card-header">
            Compose New Message
          </div>
          
          <div className="EmailCompose-card-body">
            {/* TO Input */}
            <div className="EmailCompose-input-group">
              <input 
                type="text" 
                placeholder="TO" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="EmailCompose-text-input"
              />
            </div>

            {/* Subject Input */}
            <div className="EmailCompose-input-group">
              <input 
                type="text" 
                placeholder="Subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="EmailCompose-text-input"
              />
            </div>

            {/* Editor Toolbar */}
            <div className="EmailCompose-toolbar">
              <button 
                className={`EmailCompose-toolbar-btn ${isBold ? 'active' : ''}`}
                onClick={() => setIsBold(!isBold)}
                title="Bold"
              >
                <FaBold />
              </button>
              <button 
                className={`EmailCompose-toolbar-btn ${isItalic ? 'active' : ''}`}
                onClick={() => setIsItalic(!isItalic)}
                title="Italic"
              >
                <FaItalic />
              </button>
              <button 
                className={`EmailCompose-toolbar-btn ${isUnderline ? 'active' : ''}`}
                onClick={() => setIsUnderline(!isUnderline)}
                title="Underline"
              >
                <FaUnderline />
              </button>
              <button 
                className={`EmailCompose-toolbar-btn ${isStrikethrough ? 'active' : ''}`}
                onClick={() => setIsStrikethrough(!isStrikethrough)}
                title="Strikethrough"
              >
                <FaStrikethrough />
              </button>
              
              <span className="EmailCompose-toolbar-separator">|</span>

              <button className="EmailCompose-toolbar-btn"><FaCode /></button>
              <button className="EmailCompose-toolbar-btn"><FaQuoteRight /></button>
              
              <span className="EmailCompose-toolbar-separator">|</span>

              <button className="EmailCompose-toolbar-btn"><FaListOl /></button>
              <button className="EmailCompose-toolbar-btn"><FaListUl /></button>
              
              <div className="EmailCompose-dropdown-container">
                <select className="EmailCompose-toolbar-select" defaultValue="Heading">
                  <option value="Heading">Heading</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <span className="EmailCompose-toolbar-separator">|</span>

              <button className="EmailCompose-toolbar-btn"><FaLink /></button>
              <button className="EmailCompose-toolbar-btn"><FaImage /></button>
              <button className="EmailCompose-toolbar-btn"><FaFont /></button>
              <button className="EmailCompose-toolbar-btn"><FaPaintBrush /></button>

              <span className="EmailCompose-toolbar-separator">|</span>

              <button 
                className={`EmailCompose-toolbar-btn ${alignment === 'left' ? 'active' : ''}`}
                onClick={() => setAlignment('left')}
              >
                <FaAlignLeft />
              </button>
              <button 
                className={`EmailCompose-toolbar-btn ${alignment === 'center' ? 'active' : ''}`}
                onClick={() => setAlignment('center')}
              >
                <FaAlignCenter />
              </button>
              <button 
                className={`EmailCompose-toolbar-btn ${alignment === 'right' ? 'active' : ''}`}
                onClick={() => setAlignment('right')}
              >
                <FaAlignRight />
              </button>
              <button 
                className={`EmailCompose-toolbar-btn ${alignment === 'justify' ? 'active' : ''}`}
                onClick={() => setAlignment('justify')}
              >
                <FaAlignJustify />
              </button>
            </div>

            {/* Dynamic Interactive Textarea */}
            <div className="EmailCompose-textarea-container">
              <textarea
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="EmailCompose-textarea"
                style={{
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: `${isUnderline ? 'underline' : ''} ${isStrikethrough ? 'line-through' : ''}`.trim() || 'none',
                  textAlign: alignment
                }}
              />
            </div>

            {/* Native File Upload Area */}
            <div className="EmailCompose-file-uploader">
              <input 
                type="file" 
                id="email-file-input" 
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button 
                type="button" 
                className="EmailCompose-file-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Choose Files
              </button>
              <span className="EmailCompose-file-name">
                {selectedFile ? selectedFile : 'No file chosen'}
              </span>
            </div>

            {/* Actions Footer */}
            <div className="EmailCompose-actions">
              <button className="EmailCompose-btn-send" onClick={handleSend}>Send</button>
              <button className="EmailCompose-btn-discard" onClick={handleDiscard}>Discard</button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default EmailCompose;