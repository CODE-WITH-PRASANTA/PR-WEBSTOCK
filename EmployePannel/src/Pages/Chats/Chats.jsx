import React, { useState, useEffect, useRef, useCallback } from "react";
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
  FiSend,
  FiLoader,
  FiAlertCircle
} from "react-icons/fi";
import API from "../../api/axios";

// Default Workspace Constants matching backend default schema
const DEFAULT_GROUP_ID = "PR_WEBSTOCK_CORE";

const projectGroup = {
  id: DEFAULT_GROUP_ID,
  name: "Prwebstock Project Hub",
  members: 12,
  category: "Development Workspace",
};

// Helper: Ensure persistent sender identity across sessions
const getOrCreateSenderId = () => {
  let senderId = localStorage.getItem("chat_sender_id");
  if (!senderId) {
    senderId = `user_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
    localStorage.setItem("chat_sender_id", senderId);
  }
  return senderId;
};

const Chats = () => {
  // Search & Messaging States
  const [fileSearch, setFileSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  
  // Project Files State
  const [fileList, setFileList] = useState([]);
  const [isFilesLoading, setIsFilesLoading] = useState(true);
  const [filesError, setFilesError] = useState(null);

  // Chat Async & UI Status States
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState(null);

  const messagesEndRef = useRef(null);
  const senderId = useRef(getOrCreateSenderId()).current;

  // Auto-scroll to bottom of chat feed
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch project files from backend (`GET /api/project-files`)
  const fetchProjectFiles = useCallback(async () => {
    setIsFilesLoading(true);
    try {
      const response = await API.get("/project-files");
      if (response.data && response.data.success) {
        const rawFiles = response.data.data;

        // Transform MongoDB schema objects for frontend UI table display
        const transformedFiles = rawFiles.map((file) => ({
          id: file._id,
          name: file.name,
          filename: file.filename,
          type: file.type,
          size: file.size,
          uploadedBy: file.uploadedBy,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
            file.uploadedBy
          )}`,
          date: new Date(file.date || file.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          filePath: file.filePath,
        }));

        setFileList(transformedFiles);
        setFilesError(null);
      }
    } catch (err) {
      console.error("Error fetching project files:", err);
      setFilesError(
        err.response?.data?.message || "Failed to load project files from server."
      );
    } finally {
      setIsFilesLoading(false);
    }
  }, []);

  // Fetch messages from backend (`GET /api/chat/messages/:groupId`)
  const fetchMessages = useCallback(async (showLoading = false) => {
    if (showLoading) setIsChatLoading(true);
    try {
      const response = await API.get(`/chat/messages/${DEFAULT_GROUP_ID}`);
      
      if (response.data && response.data.success) {
        const rawMessages = response.data.data;
        
        // Transform backend DB objects to UI representation
        const transformedMessages = rawMessages.map((msg) => {
          const isSelf = msg.senderId === senderId;
          const shortId = msg.senderId ? msg.senderId.slice(-4) : "User";
          
          return {
            id: msg._id,
            sender: isSelf ? "You" : `Member (${shortId})`,
            avatar: isSelf
              ? "https://randomuser.me/api/portraits/men/32.jpg"
              : `https://api.dicebear.com/7.x/identicon/svg?seed=${msg.senderId}`,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            text: msg.text,
            isSelf: isSelf,
            pending: false,
          };
        });

        setMessages(transformedMessages);
        setChatError(null);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      if (showLoading) {
        setChatError(
          err.response?.data?.message || "Failed to load messages from server."
        );
      }
    } finally {
      if (showLoading) setIsChatLoading(false);
    }
  }, [senderId]);

  // Initial loads and chat polling setup
  useEffect(() => {
    fetchMessages(true);
    fetchProjectFiles();

    // Poll every 3 seconds for chat updates
    const pollInterval = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [fetchMessages, fetchProjectFiles]);

  // Post message to backend (`POST /api/chat/messages`)
  const handleSendMessage = async () => {
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage || isSending) return;

    setIsSending(true);

    // Optimistic UI update
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      id: tempId,
      sender: "You",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: trimmedMessage,
      isSelf: true,
      pending: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageInput("");

    try {
      const response = await API.post("/chat/messages", {
        text: trimmedMessage,
        senderId: senderId,
        groupId: DEFAULT_GROUP_ID,
      });

      if (response.data && response.data.success) {
        const createdMsg = response.data.data;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? {
                  id: createdMsg._id,
                  sender: "You",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                  time: new Date(createdMsg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  text: createdMsg.text,
                  isSelf: true,
                  pending: false,
                }
              : msg
          )
        );
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      alert("Failed to send message. Please check your network connection.");
    } finally {
      setIsSending(false);
    }
  };

  // Build full server static asset URL
  const getFullFileUrl = (filePath) => {
    if (!filePath) return "#";
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    const baseURL = API.defaults.baseURL
      ? API.defaults.baseURL.replace(/\/api\/?$/, "")
      : "";
    return `${baseURL}/${filePath.replace(/^\//, "")}`;
  };

  const handleDownloadFile = (file) => {
    const fileUrl = getFullFileUrl(file.filePath);
    if (fileUrl !== "#") {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", file.filename || file.name);
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Unable to locate download link for ${file.name}`);
    }
  };

  const handlePreviewFile = (file) => {
    const fileUrl = getFullFileUrl(file.filePath);
    if (fileUrl !== "#") {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    } else {
      alert(`Preview unavailable for ${file.name}`);
    }
  };

  const filteredFiles = fileList.filter(
    (file) =>
      file.name.toLowerCase().includes(fileSearch.toLowerCase()) ||
      file.uploadedBy.toLowerCase().includes(fileSearch.toLowerCase())
  );

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
            {isChatLoading ? (
              <div className="Chats-status-state">
                <FiLoader className="Chats-spin-icon" />
                <span>Loading conversation...</span>
              </div>
            ) : chatError ? (
              <div className="Chats-status-state error">
                <FiAlertCircle />
                <span>{chatError}</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="Chats-status-state">
                <span>No messages found. Send the first message below!</span>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`Chats-msg-wrapper ${msg.isSelf ? "self" : "incoming"} ${
                    msg.pending ? "pending" : ""
                  }`}
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
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* MESSAGE INPUT BAR */}
          <div className="Chats-input-bar">
            <input
              type="text"
              placeholder="Type a message to the team..."
              value={messageInput}
              disabled={isChatLoading}
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
              <button 
                className="Chats-send-btn" 
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || isSending || isChatLoading}
              >
                <span>{isSending ? "Sending..." : "Send"}</span>
                {isSending ? <FiLoader className="Chats-spin-icon" /> : <FiSend />}
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
                {isFilesLoading ? (
                  <tr>
                    <td colSpan="8" className="Chats-empty-table">
                      <div className="Chats-status-state">
                        <FiLoader className="Chats-spin-icon" />
                        <span>Loading project files...</span>
                      </div>
                    </td>
                  </tr>
                ) : filesError ? (
                  <tr>
                    <td colSpan="8" className="Chats-empty-table">
                      <div className="Chats-status-state error">
                        <FiAlertCircle />
                        <span>{filesError}</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredFiles.length > 0 ? (
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
                          onClick={() => handleDownloadFile(file)}
                        >
                          <FiDownload /> Download
                        </button>
                      </td>
                      <td className="text-right">
                        <div className="Chats-row-actions">
                          <button
                            className="Chats-icon-btn view"
                            title="Preview"
                            onClick={() => handlePreviewFile(file)}
                          >
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