import React, { useState } from 'react';
import { Rocket, ClipboardList, HardDrive, Code, Clock } from 'lucide-react';
import './ProjectTimeline.css';

const ProjectTimeline = () => {
  // --- Operational State Rules for Select Dropdown Menu Actions ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('E-Commerce Platform');

  const projectOptions = [
    'E-Commerce Platform',
    'HR Management System',
    'Mobile Banking App'
  ];

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsDropdownOpen(false);
  };

  return (
    <div className="timeline-dashboard-container">
      
      {/* Top Breadcrumb Route Map */}
      <div className="timeline-breadcrumb">
        <span>🏠</span>
        <span>&gt;</span>
        <a href="#projects" className="timeline-breadcrumb-link">Projects</a>
        <span>&gt;</span>
        <span className="timeline-breadcrumb-active">Timeline</span>
      </div>

      <div className="timeline-layout-wrapper">
        
        {/* UPPER CARD BLOCK: Select Project Panel Frame */}
        <div className="timeline-base-card" style={{ overflow: 'visible' }}>
          <h2 className="timeline-section-title">Select Project</h2>
          
          <div className="dropdown-control-wrapper">
            <span className="dropdown-field-label">Select Project *</span>
            <button 
              className="dropdown-trigger-box"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedProject}</span>
              <span className={`dropdown-arrow-icon ${isDropdownOpen ? 'arrow-rotated' : ''}`}></span>
            </button>

            {/* Custom Interactive Floating Menu Overlay View Layer (Image 3) */}
            {isDropdownOpen && (
              <ul className="dropdown-menu-overlay">
                {projectOptions.map((option) => (
                  <li 
                    key={option}
                    className={`dropdown-menu-item ${selectedProject === option ? 'item-state-selected' : ''}`}
                    onClick={() => handleProjectSelect(option)}
                  >
                    <span>{option}</span>
                    {selectedProject === option && <span className="dropdown-check-mark">✓</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* LOWER CARD BLOCK: Project Journey Alternating Node Graphic Track */}
        <div className="timeline-base-card">
          <h2 className="timeline-section-title">Project Journey</h2>

          <div className="journey-tree-axis-container">
            
            {/* Node Element 1: Left Card Row */}
            <div className="journey-node-row journey-node-left">
              <div className="journey-center-badge-sphere" style={{ backgroundColor: '#4caf50' }}>
                <Rocket size={18} />
              </div>
              <div className="journey-info-card-panel">
                <h3 className="journey-node-title">Project Kickoff</h3>
                <div className="journey-node-timestamp">
                  <Clock size={13} /> Jan 10, 2024
                </div>
                <p className="journey-node-narrative">
                  Initial meeting for {selectedProject}. Scope definition and stakeholder alignment.
                </p>
                <span className="journey-status-pill pill-bg-completed">Completed</span>
              </div>
            </div>

            {/* Node Element 2: Right Card Row */}
            <div className="journey-node-row journey-node-right">
              <div className="journey-center-badge-sphere" style={{ backgroundColor: '#00b0ff' }}>
                <ClipboardList size={18} />
              </div>
              <div className="journey-info-card-panel">
                <h3 className="journey-node-title">Requirement Gathering</h3>
                <div className="journey-node-timestamp">
                  <Clock size={13} /> Jan 20, 2024
                </div>
                <p className="journey-node-narrative">
                  Detailed feature list finalization, user persona generation, and technical specification architecture.
                </p>
                <span className="journey-status-pill pill-bg-completed">Completed</span>
              </div>
            </div>

            {/* Node Element 3: Left Card Row */}
            <div className="journey-node-row journey-node-left">
              <div className="journey-center-badge-sphere" style={{ backgroundColor: '#2979ff' }}>
                <HardDrive size={18} />
              </div>
              <div className="journey-info-card-panel">
                <h3 className="journey-node-title">UI/UX Design</h3>
                <div className="journey-node-timestamp">
                  <Clock size={13} /> Feb 05, 2024
                </div>
                <p className="journey-node-narrative">
                  Prototyping e-commerce flows, interface wireframes, high-fidelity mockups, and layout validation schemes.
                </p>
                <span className="journey-status-pill pill-bg-progress">In Progress</span>
              </div>
            </div>

            {/* Node Element 4: Right Card Row */}
            <div className="journey-node-row journey-node-right">
              <div className="journey-center-badge-sphere" style={{ backgroundColor: '#ff9100' }}>
                <Code size={18} />
              </div>
              <div className="journey-info-card-panel">
                <h3 className="journey-node-title">Backend Development</h3>
                <div className="journey-node-timestamp">
                  <Clock size={13} /> Mar 15, 2024
                </div>
                <p className="journey-node-narrative">
                  API routing configurations, core business logic creation, database relational structures, and storage setups.
                </p>
                <span className="journey-status-pill pill-bg-upcoming">Upcoming</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectTimeline;