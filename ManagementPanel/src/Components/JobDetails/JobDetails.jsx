import React from 'react';
import { 
  FiHome, 
  FiChevronRight, 
  FiBriefcase, 
  FiMapPin, 
  FiClock, 
  FiCalendar, 
  FiDollarSign,
  FiCheck
} from 'react-icons/fi';
import './JobDetails.css';

const JobDetails = () => {
  // Hardcoded demographic arrays based exactly on Screenshot 2026-07-06 105338.png
  const metadata = [
    { icon: <FiBriefcase />, text: 'Development' },
    { icon: <FiMapPin />, text: 'New York' },
    { icon: <FiClock />, text: 'Full Time' },
    { icon: <FiCalendar />, text: 'Posted: 2023-10-01' }
  ];

  const keySkills = ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'SCSS'];

  const benefits = [
    'Health Insurance',
    '401(k) Matching',
    'Remote Work Options',
    'Professional Development',
    'Gym Membership'
  ];

  const applicants = [
    {
      name: 'John Doe',
      time: 'Applied 2 days ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      name: 'Sarah Smith',
      time: 'Applied 3 days ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      name: 'Michael Brown',
      time: 'Applied 5 days ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120'
    }
  ];

  return (
    <div className="JobDetails-container">
      
      {/* Top Header Split Layout Navigation Area */}
      <div className="JobDetails-header-row">
        <h1 className="JobDetails-main-title">Job Details</h1>
        <div className="JobDetails-breadcrumb">
          <FiHome className="JobDetails-breadcrumb-home-icon" />
          <FiChevronRight className="JobDetails-breadcrumb-arrow" /> 
          <span>Jobs</span> 
          <FiChevronRight className="JobDetails-breadcrumb-arrow" /> 
          <span className="JobDetails-breadcrumb-active">Job Details</span>
        </div>
      </div>

      {/* Main Multi-Column Split Framework */}
      <div className="JobDetails-grid-layout">
        
        {/* Left Extended Panel Content Segment */}
        <div className="JobDetails-main-card">
          
          {/* Header Block Section */}
          <div className="JobDetails-card-header">
            <div className="JobDetails-title-badge-row">
              <h2 className="JobDetails-job-title">Senior Angular Developer</h2>
              <span className="JobDetails-status-badge">Open</span>
            </div>
            
            <div className="JobDetails-metadata-strip">
              {metadata.map((item, idx) => (
                <div key={idx} className="JobDetails-metadata-item">
                  <span className="JobDetails-meta-icon">{item.icon}</span>
                  <span className="JobDetails-meta-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Info Matrix Blocks */}
          <div className="JobDetails-info-row-grid">
            <div className="JobDetails-info-block">
              <h3 className="JobDetails-section-title">Salary Range</h3>
              <div className="JobDetails-salary-display">
                <FiDollarSign className="JobDetails-dollar-icon" />
                <span className="JobDetails-salary-text">$120,000 - $150,000</span>
              </div>
            </div>

            <div className="JobDetails-info-block">
              <h3 className="JobDetails-section-title">Schedule</h3>
              <div className="JobDetails-schedule-display">
                <FiClock className="JobDetails-clock-icon" />
                <span className="JobDetails-schedule-text">Day Shift, Monday to Friday</span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="JobDetails-body-section">
            <h3 className="JobDetails-section-title">Job Description</h3>
            <p className="JobDetails-paragraph-text">
              We are seeking a highly skilled Senior Angular Developer to join our dynamic team. 
              You will be responsible for building scalable web applications and ensuring high 
              performance and responsiveness.
            </p>
          </div>

          {/* Requirements Block */}
          <div className="JobDetails-body-section">
            <h3 className="JobDetails-section-title">Requirements</h3>
            <p className="JobDetails-paragraph-text">
              Strong proficiency in TypeScript, Angular 14+, RxJS, and NGRX. Experience with 
              RESTful APIs, Git, and Agile methodologies is required.
            </p>
          </div>

          {/* Key Skills Block */}
          <div className="JobDetails-body-section">
            <h3 className="JobDetails-section-title">Key Skills</h3>
            <div className="JobDetails-skills-flex">
              {keySkills.map((skill, index) => (
                <div key={index} className="JobDetails-skill-badge">
                  <FiCheck className="JobDetails-skill-check-icon" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dual Column Bottom Metadata Block Segment */}
          <div className="JobDetails-bottom-split-row">
            <div className="JobDetails-bottom-column">
              <h3 className="JobDetails-section-title">Benefits</h3>
              <ul className="JobDetails-benefits-list">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="JobDetails-benefit-item">
                    <div className="JobDetails-benefit-circle-check">
                      <FiCheck size={10} />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="JobDetails-bottom-column">
              <h3 className="JobDetails-section-title">About Company</h3>
              <p className="JobDetails-paragraph-text m-0">
                TechSol Inc. is a leading software solutions provider specializing in enterprise web 
                applications. We value innovation, collaboration, and continuous learning.
              </p>
            </div>
          </div>

          {/* Action Buttons Footer Frame */}
          <div className="JobDetails-action-footer">
            <button className="JobDetails-btn-action-outline">Edit Job</button>
            <button className="JobDetails-btn-action-outline">Close Job</button>
          </div>

        </div>

        {/* Right Metric Sidebar Blocks Segment Layout */}
        <div className="JobDetails-sidebar-layout">
          
          {/* Section 1: Statistics Matrix */}
          <div className="JobDetails-sidebar-card">
            <h3 className="JobDetails-sidebar-title">Job Statistics</h3>
            <hr className="JobDetails-divider" />
            
            <div className="JobDetails-stats-split-row">
              <div className="JobDetails-stat-item-box">
                <span className="JobDetails-stat-big-number">2</span>
                <span className="JobDetails-stat-label">Vacancies</span>
              </div>
              <div className="JobDetails-stat-vertical-divider" />
              <div className="JobDetails-stat-item-box">
                <span className="JobDetails-stat-big-number">45</span>
                <span className="JobDetails-stat-label">Applicants</span>
              </div>
            </div>
            
            <hr className="JobDetails-divider" />
            
            <div className="JobDetails-experience-box">
              <span className="JobDetails-experience-value">5+ Years</span>
              <span className="JobDetails-experience-label">Experience Required</span>
            </div>
          </div>

          {/* Section 2: Recent Applicants List panel */}
          <div className="JobDetails-sidebar-card">
            <h3 className="JobDetails-sidebar-title">Recent Applicants</h3>
            <div className="JobDetails-applicants-list">
              {applicants.map((applicant, idx) => (
                <div key={idx} className="JobDetails-applicant-row">
                  <img 
                    src={applicant.avatar} 
                    alt={applicant.name} 
                    className="JobDetails-applicant-avatar" 
                  />
                  <div className="JobDetails-applicant-meta">
                    <span className="JobDetails-applicant-name">{applicant.name}</span>
                    <span className="JobDetails-applicant-time">{applicant.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="JobDetails-view-all-wrapper">
              <button className="JobDetails-btn-view-all">View All Applicants</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetails;