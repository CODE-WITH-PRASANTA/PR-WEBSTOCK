import React, { useState } from 'react';
import { 
  FiHome, 
  FiChevronRight, 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiClock, 
  FiDollarSign, 
  FiBriefcase, 
  FiLinkedin, 
  FiGlobe, 
  FiAward 
} from 'react-icons/fi';
import { FaSquareBehance } from 'react-icons/fa6';
import './CandidateProfile.css';

const CandidateProfile = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const contactInfo = [
    { label: 'Email:', value: 'sarah.jennifer@example.com', icon: <FiMail /> },
    { label: 'Phone:', value: '+1 234 567 8901', icon: <FiPhone /> },
    { label: 'Availability:', value: 'Immediate', isBadge: true, badgeType: 'availability' },
    { label: 'Exp. Salary:', value: '$130k - $150k', icon: <FiDollarSign /> },
    { label: 'Status:', value: 'Interviewing', isBadge: true, badgeType: 'status' },
  ];

  const keySkills = [
    { name: 'Figma', level: 95 },
    { name: 'Adobe XD', level: 90 },
    { name: 'Sketch', level: 85 },
    { name: 'HTML/CSS', level: 80 },
    { name: 'React', level: 60 }
  ];

  const languages = ['English (Native)', 'Spanish (Professional)', 'French (Basic)'];

  const certifications = [
    { title: 'Google UX Design Certificate', issuer: 'Coursera - 2022' },
    { title: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance - 2020' }
  ];

  const experiences = [
    {
      role: 'Lead Product Designer',
      company: 'Innovate Tech Solutions',
      period: '2021 - Present',
      description: 'Leading a team of 5 designers to revamp the core SaaS product. Improved user retention by 25% through enhanced UX workflows. Established a comprehensive design system used across 3 product lines.'
    },
    {
      role: 'Senior UI/UX Designer',
      company: 'Creative Agency XYZ',
      period: '2017 - 2021',
      description: 'Collaborated with cross-functional teams to deliver diverse web and mobile projects. Conducted user research and usability testing to validate design decisions. Mentored junior designers.'
    }
  ];

  return (
    <div className="CandidateProfile-container">
      
      {/* Header Breadcrumb Navigation */}
      <div className="CandidateProfile-header-row">
        <h1 className="CandidateProfile-main-title">Candidate Profile</h1>
        <div className="CandidateProfile-breadcrumb">
          <FiHome className="CandidateProfile-breadcrumb-icon" />
          <FiChevronRight className="CandidateProfile-breadcrumb-arrow" /> 
          <span>Jobs</span> 
          <FiChevronRight className="CandidateProfile-breadcrumb-arrow" /> 
          <span>Candidates</span> 
          <FiChevronRight className="CandidateProfile-breadcrumb-arrow" /> 
          <span className="CandidateProfile-breadcrumb-active">Profile</span>
        </div>
      </div>

      {/* Responsive Structural View Matrix */}
      <div className="CandidateProfile-grid-layout">
        
        {/* Left Aspect Metrics & Demographics Sidebar Column */}
        <div className="CandidateProfile-left-sidebar">
          
          {/* Card 1: Main Headshot Portrait Info */}
          <div className="CandidateProfile-card CandidateProfile-hero-card">
            <div className="CandidateProfile-avatar-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Sarah Jennifer" 
                className="CandidateProfile-avatar-img"
              />
              <span className="CandidateProfile-online-indicator"></span>
            </div>
            
            <h2 className="CandidateProfile-candidate-name">Sarah Jennifer</h2>
            <p className="CandidateProfile-candidate-title">Senior UI/UX Designer</p>
            
            <div className="CandidateProfile-location-row">
              <FiMapPin className="CandidateProfile-geo-icon" />
              <span>San Francisco, CA</span>
            </div>

            <div className="CandidateProfile-hero-actions">
              <button className="CandidateProfile-btn-primary">Schedule Interview</button>
              <button className="CandidateProfile-btn-outline">Message</button>
            </div>

            <div className="CandidateProfile-socials-row">
              <a href="#linkedin" className="CandidateProfile-social-link"><FiLinkedin /></a>
              <a href="#behance" className="CandidateProfile-social-link"><FaSquareBehance /></a>
              <a href="#portfolio" className="CandidateProfile-social-link"><FiGlobe /></a>
            </div>

            <hr className="CandidateProfile-divider" />

            {/* Core Direct Contact Data Matrix */}
            <div className="CandidateProfile-contact-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="CandidateProfile-contact-item">
                  <span className="CandidateProfile-contact-label">{info.label}</span>
                  {info.isBadge ? (
                    <span className={`CandidateProfile-badge CandidateProfile-badge-${info.badgeType}`}>
                      {info.value}
                    </span>
                  ) : (
                    <span className="CandidateProfile-contact-value">{info.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Key Skills Bar Framework */}
          <div className="CandidateProfile-card">
            <h3 className="CandidateProfile-card-title">Key Skills</h3>
            <div className="CandidateProfile-skills-list">
              {keySkills.map((skill, index) => (
                <div key={index} className="CandidateProfile-skill-item">
                  <div className="CandidateProfile-skill-header">
                    <span className="CandidateProfile-skill-name">{skill.name}</span>
                    <span className="CandidateProfile-skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="CandidateProfile-progress-bg">
                    <div 
                      className="CandidateProfile-progress-fill" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Languages Badges */}
          <div className="CandidateProfile-card">
            <h3 className="CandidateProfile-card-title">Languages</h3>
            <div className="CandidateProfile-languages-flex">
              {languages.map((lang, index) => (
                <span key={index} className="CandidateProfile-lang-pill">{lang}</span>
              ))}
            </div>
          </div>

          {/* Card 4: Certifications List */}
          <div className="CandidateProfile-card">
            <h3 className="CandidateProfile-card-title">Certifications</h3>
            <div className="CandidateProfile-certs-list">
              {certifications.map((cert, index) => (
                <div key={index} className="CandidateProfile-cert-row">
                  <div className="CandidateProfile-cert-icon-box">
                    <FiAward />
                  </div>
                  <div className="CandidateProfile-cert-meta">
                    <span className="CandidateProfile-cert-name">{cert.title}</span>
                    <span className="CandidateProfile-cert-issuer">{cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Aspect Professional History Column Layout */}
        <div className="CandidateProfile-main-content">
          
          {/* Summary Abstract Container */}
          <div className="CandidateProfile-card">
            <h3 className="CandidateProfile-card-title-large">About Candidate</h3>
            <p className="CandidateProfile-body-text">
              Creative and detail-oriented Senior UI/UX Designer with over 8 years of experience in crafting intuitive and inclusive digital experiences. Proven track record of leading design teams and delivering user-centric solutions for enterprise-scale applications. Expert in design systems, prototyping, and user research.
            </p>
          </div>

          {/* Detailed Tabbed History Panel Group */}
          <div className="CandidateProfile-card CandidateProfile-tabs-container">
            <div className="CandidateProfile-tabs-nav">
              <button 
                className={`CandidateProfile-tab-btn ${activeTab === 'experience' ? 'CandidateProfile-tab-active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <FiBriefcase className="CandidateProfile-tab-icon" /> Experience
              </button>
              <button 
                className={`CandidateProfile-tab-btn ${activeTab === 'education' ? 'CandidateProfile-tab-active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <FiAward className="CandidateProfile-tab-icon" /> Education
              </button>
              <button 
                className={`CandidateProfile-tab-btn ${activeTab === 'resume' ? 'CandidateProfile-tab-active' : ''}`}
                onClick={() => setActiveTab('resume')}
              >
                <FiBriefcase className="CandidateProfile-tab-icon" /> Resume
              </button>
              <button 
                className={`CandidateProfile-tab-btn ${activeTab === 'history' ? 'CandidateProfile-tab-active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <FiClock className="CandidateProfile-tab-icon" /> Interview History
              </button>
            </div>

            <div className="CandidateProfile-tab-body">
              {activeTab === 'experience' && (
                <div className="CandidateProfile-timeline">
                  {experiences.map((exp, index) => (
                    <div key={index} className="CandidateProfile-timeline-item">
                      <div className="CandidateProfile-timeline-icon">
                        <FiBriefcase />
                      </div>
                      <div className="CandidateProfile-timeline-content">
                        <div className="CandidateProfile-timeline-header">
                          <div>
                            <h4 className="CandidateProfile-timeline-role">{exp.role}</h4>
                            <span className="CandidateProfile-timeline-company">{exp.company}</span>
                          </div>
                          <span className="CandidateProfile-timeline-period">{exp.period}</span>
                        </div>
                        <p className="CandidateProfile-timeline-desc">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab !== 'experience' && (
                <div className="CandidateProfile-tab-placeholder">
                  Content for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view area configuration.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CandidateProfile;