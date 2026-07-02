import React, { useState } from "react";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Download handler for featured files
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...`);
    // Real download logic can be integrated here: 
    // window.open(`url_to_file/${fileName}`);
  };

  return (
    <div className="project-details-container">
      {/* Top Header Breadcrumbs */}
      <div className="project-header-row">
        <h1 className="project-main-title">Project Details</h1>
        <div className="project-breadcrumbs">
          <span>🏠</span> <span>&gt; Projects &gt; Overview</span>
        </div>
      </div>

      {/* Hero Banner Area (Image 1 Blue Part) */}
      <div className="project-hero-banner">
        <div className="hero-left-content">
          <span className="badge-in-progress">IN PROGRESS</span>
          <h2 className="hero-project-title">PR Webstock Admin Dashboard Redesign</h2>
          <div className="hero-meta-info">
            <span>📁 Development</span>
            <span style={{ marginLeft: "15px" }}>👤 Sarah Smith</span>
          </div>
        </div>
        
        {/* Progress Arc Simulation */}
        <div className="hero-right-progress">
          <div className="progress-semi-circle">
            <span className="progress-percentage-text">75%</span>
          </div>
        </div>

        {/* Action Buttons inside Hero */}
        <div className="hero-action-buttons">
          <button className="hero-btn edit-btn">📝 Edit Project</button>
          <button className="hero-btn share-btn">🔗 Share</button>
        </div>
      </div>

      {/* Custom Search Bar Section below the Blue Hero Banner */}
      <div className="project-search-wrapper">
        <div className="search-box-inner">
          <span className="search-icon-lens">🔍</span>
          <input 
            type="text" 
            placeholder="Search inside project components..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-control"
          />
        </div>
      </div>

      {/* 4 Summary Mini Cards Grid Row */}
      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="card-icon icon-blue">📈</div>
          <div className="card-info">
            <span className="card-label">Overall Progress</span>
            <span className="card-value">75%</span>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon icon-green"> ✅</div>
          <div className="card-info">
            <span className="card-label">Tasks Completed</span>
            <span className="card-value">36/48</span>
            <span className="card-subtext">75% Efficiency</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon icon-orange">💰</div>
          <div className="card-info">
            <span className="card-label">Total Budget</span>
            <span className="card-value">$20,000.00</span>
            <span className="card-subtext">Allocated: $15,500.00</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon icon-red">⚠️</div>
          <div className="card-info">
            <span className="card-label">Active Risks</span>
            <span className="card-value text-danger">2</span>
            <span className="card-subtext text-danger-sub">Requires Attention</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout Columns Split */}
      <div className="main-layout-split-grid">
        
        {/* Left Side Container: Dynamic Tabs & Details View */}
        <div className="left-content-panel">
          {/* Tabs Navigation Strip Header */}
          <div className="tabs-navigation-strip">
            <button 
              className={`tab-toggle-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              📄 Overview
            </button>
            <button 
              className={`tab-toggle-btn ${activeTab === "team" ? "active" : ""}`}
              onClick={() => setActiveTab("team")}
            >
              👥 Team Members
            </button>
            <button 
              className={`tab-toggle-btn ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              🕒 Live Activity
            </button>
          </div>

          {/* Tab Content Display Dynamic Render Box */}
          <div className="tab-body-display-box">
            
            {/* 1. Overview Component View (Image 1 Content) */}
            {activeTab === "overview" && (
              <div className="tab-view-animate animate-fade-in">
                <h3 className="content-block-title">Description</h3>
                <p className="project-description-text">
                  This project involves a complete overhaul of the existing Kuber Admin Dashboard. 
                  The goal is to modernize the UI/UX, improve performance, and add advanced data 
                  visualization features. We are currently in the implementation phase of the core modules.
                </p>

                <h3 className="content-block-title" style={{ marginTop: "30px" }}>Key Milestones</h3>
                <div className="milestones-vertical-list">
                  <div className="milestone-item">
                    <span className="milestone-check">✓</span>
                    <div className="milestone-meta">
                      <h4>Project Kickoff</h4>
                      <p>Oct 15, 2023</p>
                    </div>
                    <span className="status-badge-completed">Completed</span>
                  </div>

                  <div className="milestone-item">
                    <span className="milestone-check">✓</span>
                    <div className="milestone-meta">
                      <h4>Design Finalization</h4>
                      <p>Nov 10, 2023</p>
                    </div>
                    <span className="status-badge-completed">Completed</span>
                  </div>

                  <div className="milestone-item">
                    <span className="milestone-check">✓</span>
                    <div className="milestone-meta">
                      <h4>Backend API Integration</h4>
                      <p>Dec 20, 2023</p>
                    </div>
                    <span className="status-badge-completed">Completed</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Team Members Component View (Image 3 Content) */}
            {activeTab === "team" && (
              <div className="tab-view-animate animate-fade-in">
                <div className="team-members-grid-layout">
                  <div className="member-profile-card">
                    <div className="member-avatar placeholder-avatar-1">👩‍💼</div>
                    <div className="member-details">
                      <h4>Sarah Smith</h4>
                      <p>Project Manager</p>
                    </div>
                    <button className="chat-bubble-btn">💬</button>
                  </div>

                  <div className="member-profile-card">
                    <div className="member-avatar placeholder-avatar-2">👨‍💻</div>
                    <div className="member-details">
                      <h4>John Deo</h4>
                      <p>Full Stack Developer</p>
                    </div>
                    <button className="chat-bubble-btn">💬</button>
                  </div>

                  <div className="member-profile-card">
                    <div className="member-avatar placeholder-avatar-3">👩‍🎨</div>
                    <div className="member-details">
                      <h4>Pankaj Patel</h4>
                      <p>UI/UX Designer</p>
                    </div>
                    <button className="chat-bubble-btn">💬</button>
                  </div>

                  <div className="member-profile-card">
                    <div className="member-avatar placeholder-avatar-4">👩‍🔬</div>
                    <div className="member-details">
                      <h4>Pooja Sharma</h4>
                      <p>QA Engineer</p>
                    </div>
                    <button className="chat-bubble-btn">💬</button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Live Activity Timeline Component View (Image 4 Content) */}
            {activeTab === "activity" && (
              <div className="tab-view-animate animate-fade-in">
                <div className="timeline-activity-flow">
                  <div className="timeline-log-node">
                    <div className="timeline-time-meta">2h ago</div>
                    <div className="timeline-badge-icon icon-blue-bg">📄</div>
                    <div className="timeline-text-body">
                      <strong>Airi Satou</strong> uploaded 3 new design files to <span className="highlight-text">Draft Assets</span>.
                    </div>
                  </div>

                  <div className="timeline-log-node">
                    <div className="timeline-time-meta">5h ago</div>
                    <div className="timeline-badge-icon icon-green-bg">✓</div>
                    <div className="timeline-text-body">
                      <strong>John Deo</strong> marked <span className="highlight-text">Feature: User Auth</span> as completed.
                    </div>
                  </div>

                  <div className="timeline-log-node">
                    <div className="timeline-time-meta">Yesterday</div>
                    <div className="timeline-badge-icon icon-orange-bg">💬</div>
                    <div className="timeline-text-body">
                      <strong>Pooja Sharma</strong> commented on <span className="highlight-text">Mobile UI Bug</span>.
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Side Container: Consolidated Info Panels (Image 1 + 2 Combine) */}
        <div className="right-sidebar-panel">
          
          {/* Client Details Card Box */}
          <div className="sidebar-card-widget">
            <h3 className="sidebar-widget-title">Client Details</h3>
            <div className="client-branding-block">
              <div className="client-logo-box">🏢</div>
              <div className="client-name-meta">
                <h4>NexGen Technologies</h4>
                <p>Partner since 2021</p>
              </div>
            </div>
            <div className="client-info-fields-list">
              <p><strong>Contact:</strong> John Doe (CEO)</p>
              <p><strong>Country:</strong> United States</p>
              <p><strong>Industry:</strong> Technology</p>
            </div>
          </div>

          {/* Project Dates Card Box */}
          <div className="sidebar-card-widget">
            <h3 className="sidebar-widget-title">Project Dates</h3>
            <div className="project-dates-flex-strip">
              <div className="date-node">
                <span className="date-lbl">Start Date</span>
                <span className="date-val">2023-10-15</span>
              </div>
              <div className="date-arrow-indicator">➔</div>
              <div className="date-node text-right-node">
                <span className="date-lbl">Due Date</span>
                <span className="date-val">2024-03-20</span>
              </div>
            </div>
          </div>

          {/* Tags & Technologies Card Box (Moved here according to your guidelines) */}
          <div className="sidebar-card-widget">
            <h3 className="sidebar-widget-title">Tags & Technologies</h3>
            <div className="technologies-badges-flex-wrap">
              <span className="tech-badge">Angular</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">SCSS</span>
              <span className="tech-badge">ApexCharts</span>
              <span className="tech-badge">Material Design</span>
            </div>
          </div>

          {/* Featured Files Card Box with working download triggers */}
          <div className="sidebar-card-widget">
            <h3 className="sidebar-widget-title">Featured Files</h3>
            <div className="featured-files-vertical-list">
              <div className="file-item-row">
                <div className="file-icon-type red-pdf">PDF</div>
                <div className="file-name-size-meta">
                  <span className="f-name">Project_Scope.pdf</span>
                  <span className="f-size">4.3 MB</span>
                </div>
                <button 
                  onClick={() => handleDownload("Project_Scope.pdf")}
                  className="file-download-action-btn"
                  title="Download File"
                >
                  📥
                </button>
              </div>

              <div className="file-item-row">
                <div className="file-icon-type blue-doc">DOCX</div>
                <div className="file-name-size-meta">
                  <span className="f-name">Requirements.docx</span>
                  <span className="f-size">2.1 MB</span>
                </div>
                <button 
                  onClick={() => handleDownload("Requirements.docx")}
                  className="file-download-action-btn"
                  title="Download File"
                >
                  📥
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;