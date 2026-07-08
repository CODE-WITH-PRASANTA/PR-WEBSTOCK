import React, { useState } from 'react';
import { MessageSquare, Bookmark, ThumbsUp, Heart } from 'lucide-react';
import './ProjectDetails.css';

const ProjectDetails = () => {
  // --- Operational State to Switch Between Tabs ('messages' vs 'activity') ---
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div className="details-dashboard-container">
      
      {/* Top Breadcrumb Header Row Route Map */}
      <div className="details-breadcrumb">
        <span>🏠</span>
        <span>&gt;</span>
        <a href="#home" className="details-breadcrumb-link">Home</a>
        <span>&gt;</span>
        <a href="#projects" className="details-breadcrumb-link">Projects</a>
        <span>&gt;</span>
        <span className="details-breadcrumb-active">Project Details</span>
      </div>

      {/* Main Structural Twin-Column Responsive Layout Grid */}
      <div className="details-main-layout-grid">
        
        {/* ================= LEFT MAIN BLOCK COLUMN ================= */}
        <div>
          
          {/* Core Target Metrics Card Segment */}
          <div className="details-base-card">
            <div className="details-header-row">
              <div>
                <h1 className="details-title-heading">Wordpress Website</h1>
                <div className="details-status-line">
                  <span>Status:</span>
                  <span className="details-badge-active">Active</span>
                </div>
              </div>
              <button className="details-edit-link-btn">Edit project</button>
            </div>

            {/* Primary Attributes Information Field Grid Block Layout */}
            <div className="details-metadata-fields-grid">
              <div className="details-meta-item-box">
                <span className="details-meta-label">Created by:</span>
                <span className="details-meta-value">Jayesh Patel</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Last Updated:</span>
                <span className="details-meta-value">22-08-2021 12:15:57</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Messages:</span>
                <span className="details-meta-value">277</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Created:</span>
                <span className="details-meta-value">17-05-2020</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Commits:</span>
                <span className="details-meta-value">175</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Deadline:</span>
                <span className="details-meta-value">22-09-2021</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Version:</span>
                <span className="details-meta-value">v2.5.2</span>
              </div>
              <div className="details-meta-item-box">
                <span className="details-meta-label">Team:</span>
                <div className="details-team-avatar-pile">
                  <img src="https://i.pravatar.cc/150?img=33" alt="Member" className="details-member-avatar" />
                  <img src="https://i.pravatar.cc/150?img=12" alt="Member" className="details-member-avatar" />
                  <img src="https://i.pravatar.cc/150?img=47" alt="Member" className="details-member-avatar" />
                  <div className="details-member-avatar-plus">+4</div>
                </div>
              </div>
            </div>

            {/* Horizontal Line Graphical Progress Track Segment Bar */}
            <div className="details-progress-matrix-row">
              <span className="details-meta-label" style={{ margin: 0, textAlign: 'left', width: 'auto' }}>Project Status:</span>
              <div className="details-progress-track-bg">
                <div className="details-progress-bar-fill" style={{ width: '60%' }}></div>
              </div>
              <span className="details-progress-metric-label">60% Project completed.</span>
            </div>
          </div>

          {/* Tab Selection Headings Row Strip Layout (Matches Image 3 Controls) */}
          <div className="details-tabs-nav-bar">
            <button 
              className={`details-tab-trigger-btn ${activeTab === 'messages' ? 'tab-state-active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare size={16} /> Messages
            </button>
            <button 
              className={`details-tab-trigger-btn ${activeTab === 'activity' ? 'tab-state-active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Bookmark size={16} /> Last Activity
            </button>
          </div>

          {/* DYNAMIC CONTENT SWITCH HOOK BLOCK LAYER */}
          <div className="details-base-card" style={{ padding: '8px 24px' }}>
            
            {/* OPTION BLOCK 1 VIEW: Messages Tab Layer Panel Layout (Image 3) */}
            {activeTab === 'messages' && (
              <div>
                {/* Message Node 1 */}
                <div className="msg-stream-node">
                  <img src="https://i.pravatar.cc/150?img=12" alt="Airi" className="msg-sender-photo" />
                  <div className="msg-body-wrapper">
                    <div className="msg-meta-header-line">
                      <span className="msg-sender-name">Airi Satou <span>posted message on <strong>Ashton Cox</strong> site.</span></span>
                      <span className="msg-timestamp-label">2h ago</span>
                    </div>
                    <div className="msg-content-bubble-card">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>
                    <div className="msg-interactive-actions-bar">
                      <button className="msg-action-reaction-btn"><ThumbsUp size={14} /> Like</button>
                      <button className="msg-action-reaction-btn" style={{ color: '#d93025' }}><Heart size={14} /> Love</button>
                    </div>
                  </div>
                </div>

                {/* Message Node 2 */}
                <div className="msg-stream-node">
                  <img src="https://i.pravatar.cc/150?img=47" alt="Cara" className="msg-sender-photo" />
                  <div className="msg-body-wrapper">
                    <div className="msg-meta-header-line">
                      <span className="msg-sender-name">Cara Stevens <span>add 1 photo on <strong>Ashton Cox</strong>.</span></span>
                      <span className="msg-timestamp-label">3h ago</span>
                    </div>
                  </div>
                </div>

                {/* Message Node 3 */}
                <div className="msg-stream-node">
                  <img src="https://i.pravatar.cc/150?img=33" alt="Angelica" className="msg-sender-photo" />
                  <div className="msg-body-wrapper">
                    <div className="msg-meta-header-line">
                      <span className="msg-sender-name">Angelica Ramos <span>started following <strong>Ashton Cox</strong>.</span></span>
                      <span className="msg-timestamp-label">5h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OPTION BLOCK 2 VIEW: Last Activity Tab Layer Panel Layout (Image 4) */}
            {activeTab === 'activity' && (
              <div className="activity-matrix-scroll-layer">
                <table className="activity-data-table">
                  <thead>
                    <tr>
                      <th className="activity-th-cell">Status</th>
                      <th className="activity-th-cell">Title</th>
                      <th className="activity-th-cell">Start Time</th>
                      <th className="activity-th-cell">End Time</th>
                      <th className="activity-th-cell">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="activity-td-cell"><span className="activity-status-badge act-bg-completed">Completed</span></td>
                      <td className="activity-td-cell" style={{ fontWeight: '600' }}>Create project in webapp</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>15-06-2021 11:25:07</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>19-06-2021 10:38:15</td>
                      <td className="activity-td-cell">Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable.</td>
                    </tr>
                    <tr>
                      <td className="activity-td-cell"><span className="activity-status-badge act-bg-accepted">Accepted</span></td>
                      <td className="activity-td-cell" style={{ fontWeight: '600' }}>Various versions</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>15-06-2021 11:25:07</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>19-06-2021 10:38:15</td>
                      <td className="activity-td-cell">Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</td>
                    </tr>
                    <tr>
                      <td className="activity-td-cell"><span className="activity-status-badge act-bg-sent">Sent</span></td>
                      <td className="activity-td-cell" style={{ fontWeight: '600' }}>There are many variations</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>15-06-2021 11:25:07</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>19-06-2021 10:38:15</td>
                      <td className="activity-td-cell">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which</td>
                    </tr>
                    <tr>
                      <td className="activity-td-cell"><span className="activity-status-badge act-bg-reported">Reported</span></td>
                      <td className="activity-td-cell" style={{ fontWeight: '600' }}>Latin words</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>15-06-2021 11:25:07</td>
                      <td className="activity-td-cell" style={{ whiteSpace: 'nowrap' }}>19-06-2021 10:38:15</td>
                      <td className="activity-td-cell">Latin words, combined with a handful of model sentence structures</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>

        {/* ================= RIGHT SIDEBAR WIDGETS COLUMN ================= */}
        <div>
          
          {/* Section widget 1: Description Card */}
          <div className="details-base-card">
            <h3 className="sidecard-section-heading">Project description</h3>
            <p className="sidecard-narrative-paragraph">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <p className="sidecard-narrative-paragraph">
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>

          {/* Section widget 2: Client Details Parameters Card */}
          <div className="details-base-card">
            <h3 className="sidecard-section-heading">Client Details</h3>
            <div className="sidecard-meta-list">
              <div className="sidecard-meta-row-node">
                <span className="sidecard-meta-label">Client:</span> <span className="sidecard-meta-value">xyz pvt.ltd</span>
              </div>
              <div className="sidecard-meta-row-node">
                <span className="sidecard-meta-label">Date:</span> <span className="sidecard-meta-value">25.07.2021</span>
              </div>
              <div className="sidecard-meta-row-node">
                <span className="sidecard-meta-label">Contact Person:</span> <span className="sidecard-meta-value">John Doe</span>
              </div>
              <div className="sidecard-meta-row-node">
                <span className="sidecard-meta-label">Country:</span> <span className="sidecard-meta-value">USA</span>
              </div>
              <div className="sidecard-meta-row-node">
                <span className="sidecard-meta-label">Budget:</span> <span className="sidecard-meta-value">$500</span>
              </div>
            </div>
          </div>

          {/* Section widget 3: Project Tags Meta Box */}
          <div className="details-base-card">
            <h3 className="sidecard-section-heading">Project tags</h3>
            <div className="sidecard-tags-flex-cloud">
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#2e7d32' }}>Angular</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#ef6c00' }}>Typescript</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#00b0ff' }}>SCSS</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#4caf50' }}>Git</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#e53935' }}>Admin</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#ffb300' }}>Project</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#43a047' }}>Photoshop</span>
              <span className="sidecard-tag-pill" style={{ backgroundColor: '#1e88e5' }}>Material</span>
            </div>
          </div>

          {/* Section widget 4: File Documents Explorer Component */}
          <div className="details-base-card">
            <h3 className="sidecard-section-heading">Project files</h3>
            <div className="sidecard-files-list-stack">
              
              <div className="sidecard-file-item-row">
                <div className="sidecard-file-icon-box" style={{ backgroundColor: '#e53935' }}>PDF</div>
                <div className="sidecard-file-details-box">
                  <span className="sidecard-filename-text">Project_document.pdf</span>
                  <span className="sidecard-filesize-text">Size: 4.3Mb</span>
                </div>
              </div>

              <div className="sidecard-file-item-row">
                <div className="sidecard-file-icon-box" style={{ backgroundColor: '#1e88e5' }}>DOCX</div>
                <div className="sidecard-file-details-box">
                  <span className="sidecard-filename-text">error_log_47859657458.docx</span>
                  <span className="sidecard-filesize-text">Size: 2.7Mb</span>
                </div>
              </div>

              <div className="sidecard-file-item-row">
                <div className="sidecard-file-icon-box" style={{ backgroundColor: '#43a047' }}>IMG</div>
                <div className="sidecard-file-details-box">
                  <span className="sidecard-filename-text">screenshots.jpeg</span>
                  <span className="sidecard-filesize-text">Size: 2.0Mb</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;