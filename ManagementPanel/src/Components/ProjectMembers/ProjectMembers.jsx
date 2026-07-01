import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { FaUser, FaRegCommentDots } from 'react-icons/fa';
import './ProjectMembers.css';

const ProjectMembers = () => {
  // Mock Projects List based on the 2nd reference image
  const projects = [
    'Kuber Admin',
    'Autohub App',
    'Healthcare System',
    'E-commerce Portal',
    'CRM System'
  ];

  // Team Members Data based on the 1st reference image
  const membersData = [
    {
      name: 'Sarah Smith',
      role: 'PROJECT MANAGER',
      email: 'sarah@example.com',
      projectsCount: 12,
      tasksCount: 45,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'John Deo',
      role: 'SOFTWARE ENGINEER',
      email: 'john@example.com',
      projectsCount: 8,
      tasksCount: 30,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Pankaj Patel',
      role: 'UI/UX DESIGNER',
      email: 'pankaj@example.com',
      projectsCount: 5,
      tasksCount: 20,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Pooja Sharma',
      role: 'QA ENGINEER',
      email: 'pooja@example.com',
      projectsCount: 10,
      tasksCount: 55,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  const [selectedProject, setSelectedProject] = useState('Kuber Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown smoothly when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="ProjectMembers-container">
      
      {/* Top Breadcrumb Header */}
      <div className="ProjectMembers-header">
        <h2 className="ProjectMembers-title">Project Members</h2>
        <div className="ProjectMembers-breadcrumb">
          <HiOutlineHome className="ProjectMembers-home-icon" />
          <MdChevronRight className="ProjectMembers-arrow-icon" />
          <span className="ProjectMembers-link">Projects</span>
          <MdChevronRight className="ProjectMembers-arrow-icon" />
          <span className="ProjectMembers-current">Members</span>
        </div>
      </div>

      {/* Project Selector Section */}
      <div className="ProjectMembers-selector-card">
        <div className="ProjectMembers-dropdown-wrapper" ref={dropdownRef}>
          <label className="ProjectMembers-label">Select Project</label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="ProjectMembers-dropdown-btn"
          >
            <span>{selectedProject}</span>
            <MdKeyboardArrowDown className={`ProjectMembers-dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
          </button>

          {/* Smooth Dropdown Options View */}
          <div className={`ProjectMembers-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            {projects.map((project) => (
              <div
                key={project}
                onClick={() => {
                  setSelectedProject(project);
                  setIsDropdownOpen(false);
                }}
                className={`ProjectMembers-dropdown-item ${selectedProject === project ? 'selected' : ''}`}
              >
                <span>{project}</span>
                {selectedProject === project && <span className="ProjectMembers-checkmark">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout Cards Section */}
      <div className="ProjectMembers-grid">
        {membersData.map((member, index) => (
          <div key={index} className="ProjectMembers-card">
            
            {/* Upper Profile Gradient Header */}
            <div className="ProjectMembers-card-banner">
              <div className="ProjectMembers-avatar-wrapper">
                <img src={member.image} alt={member.name} className="ProjectMembers-avatar" />
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="ProjectMembers-card-body">
              <h3 className="ProjectMembers-name">{member.name}</h3>
              <p className="ProjectMembers-role">{member.role}</p>
              
              <div className="ProjectMembers-email">
                <AiOutlineMail className="ProjectMembers-mail-icon" />
                <span>{member.email}</span>
              </div>

              {/* Counts Split Panel */}
              <div className="ProjectMembers-stats-row">
                <div className="ProjectMembers-stat-col border-right">
                  <span className="ProjectMembers-stat-num">{member.projectsCount}</span>
                  <span className="ProjectMembers-stat-label">Projects</span>
                </div>
                <div className="ProjectMembers-stat-col">
                  <span className="ProjectMembers-stat-num">{member.tasksCount}</span>
                  <span className="ProjectMembers-stat-label">Tasks</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ProjectMembers-actions">
                <button className="ProjectMembers-btn-profile">
                  <FaUser className="ProjectMembers-btn-icon-user" /> Profile
                </button>
                <button className="ProjectMembers-btn-chat">
                  <FaRegCommentDots className="ProjectMembers-btn-icon-chat" /> Chat
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProjectMembers;