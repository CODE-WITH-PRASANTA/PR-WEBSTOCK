import React, { useState } from 'react';
import { 
  Home, Edit, MessageSquare, Activity, 
  ThumbsUp, Heart, Paperclip, FileText 
} from 'lucide-react';
import './TicketDetails.css'; // Importing custom stylesheet below

// Mock Data matching the UI Images
const SIDEBAR_INFO = {
  ticketId: "#289",
  ticketUser: "User",
  ticketCategory: "Support",
  ticketPriority: "High",
  assignedTo: "Admin",
  openDate: "12-01-2021 11:30AM",
  repliedDate: "15-01-2021 04:12PM",
  status: "Active"
};

const MAIN_PROJECT_INFO = {
  id: "#5264",
  title: "Wordpress Website",
  status: "Active",
  createdBy: "Jayesh Patel",
  messagesCount: 277,
  commitsCount: 175,
  version: "v2.5.2",
  lastUpdated: "22-08-2021 12:15:57",
  createdDate: "17-05-2020",
  deadline: "22-09-2021",
  projectStatusProgress: 60,
  team: [
    { name: "Airi", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" },
    { name: "Jayesh", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    { name: "Cara", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" }
  ]
};

const MESSAGES_DATA = [
  {
    id: 1,
    author: "Airi Satou",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    actionText: "posted message on ",
    target: "Ashton Cox",
    scope: "site.",
    timeAgo: "2h ago",
    dateMeta: "Today 11:10 pm - 15/04/2021",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  },
  {
    id: 2,
    author: "Cara Stevens",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    actionText: "add 1 photo on ",
    target: "Ashton Cox",
    scope: ".",
    timeAgo: "3h ago",
    dateMeta: "2 days ago at 9:47am",
    content: ""
  },
  {
    id: 3,
    author: "Angelica Ramos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    actionText: "started following ",
    target: "Ashton Cox",
    scope: ".",
    timeAgo: "5h ago",
    dateMeta: "Yesterday 2:21 pm - 18/04/2021",
    content: "",
    hasInteractions: true
  },
  {
    id: 4,
    author: "Jens Brincker",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    actionText: "posted message on ",
    target: "Angelica Ramos",
    scope: "site.",
    timeAgo: "2h ago",
    dateMeta: "Yesterday 10:20 pm - 12/06/2021",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  }
];

const SECURITY_ACTIVITIES = [
  { id: 1, status: "Completed", title: "Create project in webapp", start: "15-06-2021 11:25:07", end: "19-06-2021 10:38:15", comments: "Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable." },
  { id: 2, status: "Accepted", title: "Various versions", start: "15-06-2021 11:25:07", end: "19-06-2021 10:38:15", comments: "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." },
  { id: 3, status: "Sent", title: "There are many variations", start: "15-06-2021 11:25:07", end: "19-06-2021 10:38:15", comments: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which" },
  { id: 4, status: "Reported", title: "Latin words", start: "15-06-2021 11:25:07", end: "19-06-2021 10:38:15", comments: "Latin words, combined with a handful of model sentence structures" }
];

const TicketDetails = () => {
  const [activeTab, setActiveTab] = useState('messages'); // Toggles 'messages' or 'activity'

  return (
    <div className="ticket-details-view">
      
      {/* Top Breadcrumb Navigation */}
      <div className="ticket-details-view__header">
        <h1 className="ticket-details-view__title">Ticket Details</h1>
        <div className="ticket-details-view__breadcrumbs">
          <Home size={14} className="crumb-home-icon" />
          <span className="crumb">Home</span> &gt; 
          <span className="crumb">Tickets</span> &gt; 
          <span className="crumb active">Ticket Details</span>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="ticket-details-view__layout">
        
        {/* Left Column Section: Attributes Summary & File Meta lists */}
        <div className="ticket-details-view__sidebar">
          
          {/* Attributes Card */}
          <div className="detail-meta-card">
            <table className="detail-meta-card__table">
              <tbody>
                <tr><td>Ticket ID</td><td>:</td><td className="bold-data">{SIDEBAR_INFO.ticketId}</td></tr>
                <tr><td>Ticket User</td><td>:</td><td>{SIDEBAR_INFO.ticketUser}</td></tr>
                <tr><td>Ticket Category</td><td>:</td><td>{SIDEBAR_INFO.ticketCategory}</td></tr>
                <tr><td>Ticket Priority</td><td>:</td><td><span className="priority-marker">{SIDEBAR_INFO.ticketPriority}</span></td></tr>
                <tr><td>Assigned To</td><td>:</td><td>{SIDEBAR_INFO.assignedTo}</td></tr>
                <tr><td>Open Date</td><td>:</td><td className="datetime-string">{SIDEBAR_INFO.openDate}</td></tr>
                <tr><td>Replied Date</td><td>:</td><td className="datetime-string">{SIDEBAR_INFO.repliedDate}</td></tr>
                <tr><td>Status</td><td>:</td><td><span className="status-badge status-badge--active">{SIDEBAR_INFO.status}</span></td></tr>
              </tbody>
            </table>
          </div>

          {/* Client Details Profile Card */}
          <div className="client-info-card">
            <h3 className="client-info-card__title">Client Details</h3>
            <ul className="client-info-card__list">
              <li><strong>Client:</strong> xyz pvt.ltd</li>
              <li><strong>Date:</strong> 25.07.2021</li>
              <li><strong>Contact Person:</strong> John Doe</li>
              <li><strong>Country:</strong> USA</li>
              <li><strong>Budget:</strong> $500</li>
            </ul>
          </div>

          {/* Project Tags Component */}
          <div className="tags-card">
            <h3 className="tags-card__title">Project tags</h3>
            <div className="tags-card__flex">
              <span className="tag-pill tag-pill--angular">Angular</span>
              <span className="tag-pill tag-pill--typescript">Typescript</span>
              <span className="tag-pill tag-pill--scss">SCSS</span>
              <span className="tag-pill tag-pill--git">Git</span>
              <span className="tag-pill tag-pill--admin">Admin</span>
              <span className="tag-pill tag-pill--project">Project</span>
              <span className="tag-pill tag-pill--photoshop">Photoshop</span>
              <span className="tag-pill tag-pill--material">Material</span>
            </div>
          </div>

          {/* Uploaded Files Attachments Component */}
          <div className="files-card">
            <h3 className="files-card__title">Project files</h3>
            <div className="files-card__item">
              <div className="files-card__icon-box files-card__icon-box--pdf">
                <FileText size={18} />
              </div>
              <div className="files-card__meta">
                <span className="file-name">Project_document.pdf</span>
                <span className="file-size">Size: 4.3Mb</span>
              </div>
            </div>
            <div className="files-card__item">
              <div className="files-card__icon-box files-card__icon-box--word">
                <FileText size={18} />
              </div>
              <div className="files-card__meta">
                <span className="file-name">error_log_47859657458.docx</span>
                <span className="file-size">Size: 2.7Mb</span>
              </div>
            </div>
            <div className="files-card__item">
              <div className="files-card__icon-box files-card__icon-box--img">
                <FileText size={18} />
              </div>
              <div className="files-card__meta">
                <span className="file-name">screenshots.jpeg</span>
                <span className="file-size">Size: 2.0Mb</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Section: Content Panel Area */}
        <div className="ticket-details-view__main-content">
          
          {/* Upper Summary Banner Metadata Group */}
          <div className="ticket-summary-banner">
            <span className="ticket-summary-banner__id">Ticket {MAIN_PROJECT_INFO.id}</span>
            
            <div className="ticket-summary-banner__header-row">
              <h2 className="ticket-summary-banner__title">{MAIN_PROJECT_INFO.title}</h2>
              <button className="ticket-summary-banner__edit-btn">
                <Edit size={14} /> Edit project
              </button>
            </div>

            <div className="ticket-summary-banner__badge-line">
              <span className="status-badge status-badge--active">{MAIN_PROJECT_INFO.status}</span>
            </div>

            {/* Matrix Data Columns Grid */}
            <div className="ticket-summary-banner__metrics-grid">
              <div className="metric-group">
                <p><strong>Created by:</strong> {MAIN_PROJECT_INFO.createdBy}</p>
                <p><strong>Messages:</strong> {MAIN_PROJECT_INFO.messagesCount}</p>
                <p><strong>Commits:</strong> {MAIN_PROJECT_INFO.commitsCount}</p>
                <p><strong>Version:</strong> {MAIN_PROJECT_INFO.version}</p>
              </div>
              <div className="metric-group">
                <p><strong>Last Updated:</strong> {MAIN_PROJECT_INFO.lastUpdated}</p>
                <p><strong>Created:</strong> {MAIN_PROJECT_INFO.createdDate}</p>
                <p><strong>Deadline:</strong> {MAIN_PROJECT_INFO.deadline}</p>
                <div className="team-avatar-row">
                  <strong>Team:</strong>
                  <div className="avatar-stack">
                    {MAIN_PROJECT_INFO.team.map((member, idx) => (
                      <img key={idx} src={member.img} alt={member.name} className="stacked-avatar" />
                    ))}
                    <div className="avatar-stack__plus-more">+4</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Percentage Bar */}
            <div className="ticket-summary-banner__progress-section">
              <span className="progress-label">Project Status:</span>
              <div className="progress-bar-wrapper">
                <div className="progress-bar-fill" style={{ width: `${MAIN_PROJECT_INFO.projectStatusProgress}%` }}></div>
              </div>
              <span className="progress-percentage-text"><strong>{MAIN_PROJECT_INFO.projectStatusProgress}%</strong> Project completed.</span>
            </div>
          </div>

          {/* Interactive Navigation Segment Tab Toolbar Control */}
          <div className="ticket-tab-toolbar">
            <button 
              className={`ticket-tab-toolbar__btn ${activeTab === 'messages' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare size={16} /> Messages
            </button>
            <button 
              className={`ticket-tab-toolbar__btn ${activeTab === 'activity' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity size={16} /> Last Activity
            </button>
          </div>

          {/* Switchable Interactive Display Panels Viewport */}
          <div className="ticket-tab-viewport">
            
            {/* Tab Panel A: Interactive Messages Stream View */}
            {activeTab === 'messages' && (
              <div className="messages-stream">
                {MESSAGES_DATA.map((msg) => (
                  <div key={msg.id} className="message-node">
                    <img src={msg.avatar} alt={msg.author} className="message-node__avatar" />
                    
                    <div className="message-node__body">
                      <div className="message-node__header">
                        <div className="message-node__user-info">
                          <span className="author-name">{msg.author}</span>
                          <span className="action-phrase"> {msg.actionText} <strong>{msg.target}</strong> {msg.scope}</span>
                        </div>
                        <span className="time-stamp-label">{msg.timeAgo}</span>
                      </div>
                      
                      <div className="message-node__meta-date">{msg.dateMeta}</div>
                      
                      {msg.content && (
                        <div className="message-node__bubble-content">
                          {msg.content}
                        </div>
                      )}

                      {msg.hasInteractions && (
                        <div className="message-node__reactions">
                          <button className="reaction-btn reaction-btn--like"><ThumbsUp size={14} /> Like</button>
                          <button className="reaction-btn reaction-btn--love"><Heart size={14} /> Love</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab Panel B: Security Logs System Grid View */}
            {activeTab === 'activity' && (
              <div className="security-activity-log">
                <h3 className="security-activity-log__title">Security Settings</h3>
                <div className="activity-table-wrapper">
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Title</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SECURITY_ACTIVITIES.map((act) => (
                        <tr key={act.id}>
                          <td>
                            <span className={`activity-status-pill activity-status-pill--${act.status.toLowerCase()}`}>
                              {act.status}
                            </span>
                          </td>
                          <td className="activity-title-cell">{act.title}</td>
                          <td className="activity-time-cell">{act.start}</td>
                          <td className="activity-time-cell">{act.end}</td>
                          <td className="activity-comments-cell">{act.comments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default TicketDetails;