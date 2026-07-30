import React, { useState } from "react";
import "./Chats.css";
import {
  FiHome,
  FiPaperclip,
  FiSmile,
  FiSearch,
  FiDownload,
  FiEye,
  FiFileText,
  FiUsers,
  FiSend
} from "react-icons/fi";

const projectGroup = {
  id: "grp-1",
  name: "Prwebstock Project Hub",
  members: 12,
  category: "Development Workspace",
};

const initialFiles = [
  {
    id: 1,
    name: "PRWebstock_Architecture_v2.pdf",
    type: "PDF Document",
    size: "4.2 MB",
    uploadedBy: "Robert Fox (Manager)",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "May 24, 2026",
    downloadUrl: "#",
  },
  {
    id: 2,
    name: "Dashboard_Design_System.fig",
    type: "Figma File",
    size: "18.5 MB",
    uploadedBy: "Maria Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "May 22, 2026",
    downloadUrl: "#",
  },
  {
    id: 3,
    name: "Sprint_24_Task_Breakdown.xlsx",
    type: "Excel Sheet",
    size: "1.1 MB",
    uploadedBy: "William Smith",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "May 20, 2026",
    downloadUrl: "#",
  },
  {
    id: 4,
    name: "API_Endpoints_Specification.json",
    type: "JSON Data",
    size: "340 KB",
    uploadedBy: "Joseph Clark",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "May 18, 2026",
    downloadUrl: "#",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "Maria Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "10:10 AM",
    text: "Hey team, I've updated the core architectural design for the Prwebstock project. Please review the docs in the file workspace below.",
    isSelf: false,
  },
  {
    id: 2,
    sender: "Robert Fox (Manager)",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "10:12 AM",
    text: "Thanks Maria! I just uploaded the Sprint task breakdown sheet to the files list.",
    isSelf: true,
  },
];

const Chats = () => {
  const [fileSearch, setFileSearch] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [fileList] = useState(initialFiles);

  const filteredFiles = fileList.filter(
    (file) =>
      file.name.toLowerCase().includes(fileSearch.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(fileSearch.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "Robert Fox (Manager)",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "Just now",
      text: messageInput,
      isSelf: true,
    };
    setMessages([...messages, newMsg]);
    setMessageInput("");
  };

  const handleDownloadFile = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="Chats-root">
      
      {/* HEADER & BREADCRUMB */}
      <header className="Chats-header">
        <div className="Chats-header-title">
          <h1>{projectGroup.name}</h1>
          <p>Collaborate with team members and manage shared project files in one place.</p>
        </div>
        <div className="Chats-breadcrumb">
          <FiHome className="Chats-breadcrumb-icon" />
          <span>/</span>
          <span className="Chats-breadcrumb-link">Projects</span>
          <span>/</span>
          <span className="Chats-breadcrumb-current">Prwebstock Workspace</span>
        </div>
      </header>

      {/* SINGLE CONTAINER LAYOUT */}
      <div className="Chats-single-wrapper">
        
        {/* GROUP CHAT SECTION */}
        <section className="Chats-chat-section">
          <div className="Chats-chat-header">
            <div className="Chats-chat-title">
              <div className="Chats-group-badge-icon">
                <FiUsers />
              </div>
              <div>
                <h2>{projectGroup.name} Chat</h2>
                <span className="Chats-group-subtitle">{projectGroup.category}</span>
              </div>
            </div>
            <div className="Chats-meta-stats">
              <FiUsers /> {projectGroup.members} Active Members
            </div>
          </div>

          {/* MESSAGES LOG */}
          <div className="Chats-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`Chats-msg-wrapper ${msg.isSelf ? "self" : "incoming"}`}
              >
                <img src={msg.avatar} alt={msg.sender} className="Chats-msg-avatar" />
                <div className="Chats-msg-body">
                  <div className="Chats-msg-meta">
                    <span className="Chats-msg-sender">{msg.sender}</span>
                    <span className="Chats-msg-time">{msg.time}</span>
                  </div>
                  <div className="Chats-msg-bubble">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* MESSAGE INPUT BAR */}
          <div className="Chats-input-bar">
            <input
              type="text"
              placeholder="Type a message to the team..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <div className="Chats-input-actions">
              <button className="Chats-action-btn" title="Attach Document">
                <FiPaperclip />
              </button>
              <button className="Chats-action-btn" title="Insert Emoji">
                <FiSmile />
              </button>
              <button className="Chats-send-btn" onClick={handleSendMessage}>
                <span>Send</span>
                <FiSend />
              </button>
            </div>
          </div>
        </section>

        {/* PROJECT FILES TABLE SECTION */}
        <section className="Chats-files-section">
          <div className="Chats-files-header">
            <div>
              <h3>Project Files & Uploads</h3>
              <p>Download and review files shared across the team</p>
            </div>
            <div className="Chats-files-controls">
              <div className="Chats-search-box small">
                <FiSearch className="Chats-search-icon" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={fileSearch}
                  onChange={(e) => setFileSearch(e.target.value)}
                />
              </div>
              <button className="Chats-upload-btn">
                <FiPaperclip /> Upload File
              </button>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="Chats-table-wrapper">
            <table className="Chats-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Uploaded By</th>
                  <th>Date</th>
                  <th>Download</th>
                  <th className="text-right">Preview</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file, index) => (
                    <tr key={file.id}>
                      <td className="Chats-cell-index">{index + 1}</td>
                      <td className="Chats-cell-filename">
                        <FiFileText className="Chats-file-icon" />
                        <span>{file.name}</span>
                      </td>
                      <td>
                        <span className="Chats-type-pill">{file.type}</span>
                      </td>
                      <td className="Chats-cell-muted">{file.size}</td>
                      <td>
                        <div className="Chats-uploader">
                          <img src={file.avatar} alt={file.uploadedBy} />
                          <span>{file.uploadedBy}</span>
                        </div>
                      </td>
                      <td className="Chats-cell-muted">{file.date}</td>
                      <td>
                        <button
                          className="Chats-download-btn"
                          title="Download File"
                          onClick={() => handleDownloadFile(file.name)}
                        >
                          <FiDownload /> Download
                        </button>
                      </td>
                      <td className="text-right">
                        <div className="Chats-row-actions">
                          <button className="Chats-icon-btn view" title="Preview">
                            <FiEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="Chats-empty-table">
                      No files uploaded to this workspace yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chats;