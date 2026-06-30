import React, { useState } from 'react';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const milestones = [
    { id: 1, title: 'Project Kickoff', date: 'Oct 15, 2023', status: 'Completed', icon: '✓' },
    { id: 2, title: 'Design Finalization', date: 'Nov 10, 2023', status: 'Completed', icon: '✓' },
    { id: 3, title: 'Backend API Integration', date: 'Dec 20, 2023', status: 'Completed', icon: '✓' },
    { id: 4, title: 'Frontend Core Modules', date: 'Jan 25, 2024', status: 'In Progress', icon: '○' },
    { id: 5, title: 'UAT Testing', date: 'Feb 28, 2024', status: 'Pending', icon: '○' },
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Smith', role: 'Project Manager', initial: 'SS', avatarColor: '#fef3c7', textColor: '#d97706' },
    { id: 2, name: 'John Deo', role: 'Full Stack Developer', initial: 'JD', avatarColor: '#e0f2fe', textColor: '#0284c7' },
    { id: 3, name: 'Pankaj Patel', role: 'UI/UX Designer', initial: 'PP', avatarColor: '#dcfce7', textColor: '#16a34a' },
    { id: 4, name: 'Pooja Sharma', role: 'QA Engineer', initial: 'PS', avatarColor: '#f3e8ff', textColor: '#9333ea' },
  ];

  const liveActivities = [
    { id: 1, time: '2h ago', user: 'Airi Satou', text: 'uploaded 3 new design files to', highlight: 'Draft Assets.', actionType: 'upload', icon: '📁' },
    { id: 2, time: '5h ago', user: 'John Deo', text: 'marked', highlight: 'Feature: User Auth', suffix: 'as completed.', actionType: 'complete', icon: '✓' },
    { id: 3, time: 'Yesterday', user: 'Pooja Sharma', text: 'commented on', highlight: 'Mobile UI Bug.', actionType: 'comment', icon: '💬' },
  ];

  return (
    <div className="prd-container">
      {/* Top Banner Navigation Row */}
      <div className="prd-header-banner">
        <h2 className="prd-main-title">Project Details</h2>
        <div className="prd-breadcrumb">
          <span className="prd-home-icon">🏠</span>
          <span className="prd-breadcrumb-text">&nbsp;&gt; Projects &gt; Overview</span>
        </div>
      </div>

      {/* Hero Highlight Accent Frame */}
      <div className="prd-hero-card">
        <div className="prd-hero-left">
          <span className="prd-badge-in-progress">IN PROGRESS</span>
          <h1 className="prd-hero-title">Kuber Admin Dashboard Redesign</h1>
          <div className="prd-hero-meta">
            <span className="prd-meta-item">🏢 Development</span>
            <span className="prd-meta-item">👤 Sarah Smith</span>
          </div>
        </div>
        <div className="prd-hero-center">
          <div className="prd-progress-ring-wrapper">
            <div className="prd-progress-track"></div>
            <span className="prd-progress-text">75%</span>
          </div>
        </div>
        <div className="prd-hero-right">
          <button className="prd-btn-action prd-btn-edit">✏️ Edit Project</button>
          <button className="prd-btn-action prd-btn-share">🔗 Share</button>
        </div>
      </div>

      {/* Grid Summary Info Blocks */}
      <div className="prd-metrics-grid">
        <div className="prd-metric-card">
          <div className="prd-metric-icon-box prd-icon-blue">📈</div>
          <div className="prd-metric-info">
            <span className="prd-metric-label">Overall Progress</span>
            <div className="prd-metric-value">75%</div>
            <div className="prd-metric-progress-bar"><div className="prd-bar-fill-blue" style={{ width: '75%' }}></div></div>
          </div>
        </div>

        <div className="prd-metric-card">
          <div className="prd-metric-icon-box prd-icon-green">✅</div>
          <div className="prd-metric-info">
            <span className="prd-metric-label">Tasks Completed</span>
            <div className="prd-metric-value">36/48</div>
            <span className="prd-metric-subtext">75% Efficiency</span>
          </div>
        </div>

        <div className="prd-metric-card">
          <div className="prd-metric-icon-box prd-icon-orange">🪙</div>
          <div className="prd-metric-info">
            <span className="prd-metric-label">Total Budget</span>
            <div className="prd-metric-value">$20,000.00</div>
            <span className="prd-metric-subtext">Allocated: $15,500.00</span>
          </div>
        </div>

        <div className="prd-metric-card">
          <div className="prd-metric-icon-box prd-icon-red">⚠️</div>
          <div className="prd-metric-info">
            <span className="prd-metric-label">Active Risks</span>
            <div className="prd-metric-value prd-text-danger">2</div>
            <span className="prd-metric-subtext prd-text-danger">Requires Attention</span>
          </div>
        </div>
      </div>

      {/* Primary Workspace Content Grid */}
      <div className="prd-main-workspace-grid">
        
        {/* Left Interactive Interface Column */}
        <div className="prd-workspace-left">
          {/* Enhanced Nav Header Area with Expanded Tab Separation Gaps */}
          <div className="prd-tabs-navbar">
            <button 
              className={`prd-tab-btn ${activeTab === 'overview' ? 'prd-tab-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="prd-tab-icon">📄</span> Overview
            </button>
            <button 
              className={`prd-tab-btn ${activeTab === 'team' ? 'prd-tab-active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <span className="prd-tab-icon">👥</span> Team Members
            </button>
            <button 
              className={`prd-tab-btn ${activeTab === 'activity' ? 'prd-tab-active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <span className="prd-tab-icon">🕒</span> Live Activity
            </button>
          </div>

          {/* Subview Display Container Window */}
          <div className="prd-tab-window-content">
            
            {/* View Module 1: Overview */}
            {activeTab === 'overview' && (
              <div className="prd-fade-in-element">
                <h3 className="prd-section-heading">Description</h3>
                <p className="prd-description-paragraph">
                  This project involves a complete overhaul of the existing Kuber Admin Dashboard. The goal is to modernize the UI/UX,
                  improve performance, and add advanced data visualization features. We are currently in the implementation phase of the
                  core modules.
                </p>

                <h3 className="prd-section-heading prd-mt-spaced">Key Milestones</h3>
                <div className="prd-milestones-stack">
                  {milestones.map((item) => (
                    <div className="prd-milestone-row-card" key={item.id}>
                      <div className="prd-milestone-left">
                        <span className={`prd-milestone-indicator-circle prd-indicator-${item.status.toLowerCase().replace(' ', '-')}`}>
                          {item.icon}
                        </span>
                        <div className="prd-milestone-details">
                          <span className="prd-milestone-title">{item.title}</span>
                          <span className="prd-milestone-date">{item.date}</span>
                        </div>
                      </div>
                      <span className={`prd-status-tag prd-status-${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Module 2: Team Members Card Layout */}
            {activeTab === 'team' && (
              <div className="prd-fade-in-element">
                <div className="prd-team-grid-layout">
                  {teamMembers.map((member) => (
                    <div className="prd-team-member-card" key={member.id}>
                      <div className="prd-team-card-left">
                        <div 
                          className="prd-member-avatar-fallback" 
                          style={{ backgroundColor: member.avatarColor, color: member.textColor }}
                        >
                          {member.initial}
                        </div>
                        <div className="prd-member-credentials">
                          <span className="prd-member-name">{member.name}</span>
                          <span className="prd-member-role">{member.role}</span>
                        </div>
                      </div>
                      <button className="prd-chat-action-btn" title={`Message ${member.name}`}>💬</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Module 3: Live Timeline Activity Log */}
            {activeTab === 'activity' && (
              <div className="prd-fade-in-element">
                <div className="prd-timeline-vertical-stack">
                  {liveActivities.map((act) => (
                    <div className="prd-timeline-node" key={act.id}>
                      <div className="prd-timeline-left-column">
                        <div className={`prd-timeline-icon-badge prd-timeline-badge-${act.actionType}`}>
                          {act.icon}
                        </div>
                        <div className="prd-timeline-connector-line"></div>
                      </div>
                      <div className="prd-timeline-text-bubble">
                        <span className="prd-timeline-timestamp">{act.time}</span>
                        <p className="prd-timeline-narrative">
                          <strong>{act.user}</strong> {act.text} <span className="prd-timeline-inline-link">{act.highlight}</span> {act.suffix || ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Structural Metadata Parameter Panel Sidebar */}
        <div className="prd-workspace-right-sidebar">
          
          {/* Card Module A: Client Information Profile */}
          <div className="prd-sidebar-card">
            <h3 className="prd-sidebar-heading">Client Details</h3>
            <div className="prd-client-profile-box">
              <div className="prd-client-logo-avatar">🏢</div>
              <div>
                <h4 className="prd-client-company-title">NexGen Technologies</h4>
                <span className="prd-client-subtitle">Partner since 2021</span>
              </div>
            </div>
            <div className="prd-sidebar-list-properties">
              <div className="prd-property-item"><strong className="prd-prop-strong">Contact:</strong> <span>John Doe (CEO)</span></div>
              <div className="prd-property-item"><strong className="prd-prop-strong">Country:</strong> <span>United States</span></div>
              <div className="prd-property-item"><strong className="prd-prop-strong">Industry:</strong> <span>Technology</span></div>
            </div>
          </div>

          {/* Card Module B: Project Target Timeline Fields */}
          <div className="prd-sidebar-card">
            <h3 className="prd-sidebar-heading">Project Dates</h3>
            <div className="prd-date-arrow-container">
              <div className="prd-date-block">
                <span className="prd-date-label-text">Start Date</span>
                <span className="prd-date-numeric-value">2023-10-15</span>
              </div>
              <div className="prd-date-connector-arrow">➔</div>
              <div className="prd-date-block">
                <span className="prd-date-label-text">Due Date</span>
                <span className="prd-date-numeric-value">2024-03-20</span>
              </div>
            </div>
          </div>

          {/* Card Module C: Technology Tag Arrays */}
          <div className="prd-sidebar-card">
            <h3 className="prd-sidebar-heading">Tags & Technologies</h3>
            <div className="prd-tags-cloud-flex">
              {['Angular', 'TypeScript', 'SCSS', 'ApexCharts', 'Material Design'].map((tag, idx) => (
                <span className="prd-technology-pill" key={idx}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Card Module D: Attached Project Documents Node Grid */}
          <div className="prd-sidebar-card">
            <h3 className="prd-sidebar-heading">Featured Files</h3>
            <div className="prd-file-attachment-row">
              <div className="prd-file-left-node">
                <span className="prd-file-type-badge prd-pdf-color">PDF</span>
                <div className="prd-file-meta-info">
                  <span className="prd-file-name-string">Project_Scope.pdf</span>
                  <span className="prd-file-size-string">4.3 MB</span>
                </div>
              </div>
              <button className="prd-file-download-trigger">📥</button>
            </div>

            <div className="prd-file-attachment-row prd-mt-dense">
              <div className="prd-file-left-node">
                <span className="prd-file-type-badge prd-doc-color">DOCX</span>
                <div className="prd-file-meta-info">
                  <span className="prd-file-name-string">Requirements.docx</span>
                  <span className="prd-file-size-string">2.1 MB</span>
                </div>
              </div>
              <button className="prd-file-download-trigger">📥</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;