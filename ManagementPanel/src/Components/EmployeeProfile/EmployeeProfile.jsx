import React, { useState } from 'react';
import { 
  FaUserAlt, 
  FaCog, 
  FaSearch, 
  FaHome, 
  FaChevronRight, 
  FaPhoneAlt 
} from 'react-icons/fa';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="employee-profile-container">
      
      {/* TOP HEADER & SEARCH BAR */}
      <div className="profile-top-header">
        <div className="breadcrumb-nav">
          <span className="breadcrumb-title">Profile</span>
          <FaHome className="icon-home" />
          <FaChevronRight className="icon-arrow" />
          <span>Employees</span>
          <FaChevronRight className="icon-arrow" />
          <span className="breadcrumb-active">Profile</span>
        </div>
        
        <div className="search-box-wrapper">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <FaSearch className="icon-search" />
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="profile-main-grid">
        
        {/* LEFT SIDEBAR */}
        <div className="profile-left-sidebar">
          
          {/* Main Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>DR. John Smith</h2>
              <p className="sub-title">Senior Employee</p>
              <div className="avatar-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                  alt="Avatar" 
                  className="avatar-img"
                />
              </div>
            </div>
            
            <div className="profile-card-body">
              <p>456, Estern avenue, Courtage area,</p>
              <p>New York</p>
              <p className="phone-line">
                <FaPhoneAlt /> 264-625-2583
              </p>
            </div>

            <div className="profile-card-stats">
              <div className="stat-item">
                <span className="stat-num">564</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">18k</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">565</span>
                <span className="stat-label">Post</span>
              </div>
            </div>
          </div>

          {/* Mini About Card */}
          <div className="mini-about-card">
            <div className="mini-tab-header">
              <button className="mini-tab-btn active">About</button>
              <button className="mini-tab-btn">Skills</button>
            </div>
            <p className="mini-about-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
            <div className="mini-about-details">
              <div className="detail-group">
                <span className="detail-label">Email address:</span>
                <span className="detail-value">john@gmail.com</span>
              </div>
              <div className="detail-group">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">+91 1234567890</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="profile-right-content">
          
          {/* Main Tabs Navigation */}
          <div className="main-tabs-nav">
            <button 
              onClick={() => setActiveTab('about')}
              className={`tab-nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            >
              <FaUserAlt /> About Me
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`tab-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <FaCog /> Settings
            </button>
          </div>

          {/* Dynamic Tab Content */}
          <div className="tab-content-panel">
            
            {/* ABOUT ME TAB */}
            {activeTab === 'about' && (
              <div className="about-tab-panel">
                <div className="section-block">
                  <h3 className="section-title">About</h3>
                  <div className="info-grid-four-cols">
                    <div>
                      <span className="info-label">Full Name</span>
                      <p className="info-text">Emily Smith</p>
                    </div>
                    <div>
                      <span className="info-label">Mobile</span>
                      <p className="info-text">(123) 456 7890</p>
                    </div>
                    <div>
                      <span className="info-label">Email</span>
                      <p className="info-text">johndeo@example.com</p>
                    </div>
                    <div>
                      <span className="info-label">Location</span>
                      <p className="info-text">India</p>
                    </div>
                  </div>
                  <div className="about-paragraphs">
                    <p>Completed my graduation in Arts from the well known and renowned institution of India - SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranker in University exams from the same university from 1996-01.</p>
                    <p>Worked as Professor and Head of the department at Sarda Collage, Rajkot, Gujarat from 2003-2015</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                  </div>
                </div>

                <div className="section-block separator-top">
                  <h3 className="section-title">Education</h3>
                  <ul className="text-list">
                    <li>M.B.B.S.,Gujarat University, Ahmedabad,India.</li>
                    <li>M.S.,Gujarat University, Ahmedabad, India.</li>
                    <li>SPINAL FELLOWSHIP Dr. John Adam, Allegmeines Krakenhaus, Schwerin, Germany.</li>
                    <li>Fellowship in Endoscopic Spine Surgery Phoenix, USA.</li>
                  </ul>
                </div>

                <div className="section-block separator-top">
                  <h3 className="section-title">Experience</h3>
                  <ul className="text-list">
                    <li>One year rotatory internship from April-2009 to march-2010 at B. J. Medical College, Ahmedabad.</li>
                    <li>Three year residency at V.S. General Hospital as a resident in orthopedics from April - 2008 to April - 2011.</li>
                    <li>I have worked as a part time physiotherapist in Apang manav mandal from 1st june 2004 to 31st jan 2005.</li>
                    <li>Clinical and Research fellowship in Scoliosis at Shaurashtra University and Medical Centre (KUMC) , Krishna Hospital , Rajkot from April 2013 to June 2013.</li>
                    <li>2.5 Years Worked at Mahatma Gandhi General Hospital, Surendranagar.</li>
                    <li>Consultant Orthopedics Surgeon Jalna 2 years.</li>
                  </ul>
                </div>

                <div className="section-block separator-top">
                  <h3 className="section-title">Conferences, Cources & Workshop Attended</h3>
                  <div className="about-paragraphs">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="settings-tab-panel">
                
                {/* Security Settings */}
                <div className="settings-section">
                  <h3 className="section-title">Security Settings</h3>
                  <div className="form-group">
                    <label className="input-label">Username</label>
                    <input type="text" defaultValue="admin" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Current Password</label>
                    <input type="password" defaultValue="••••••••" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="input-label">New Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <button className="btn-primary-sm">Save</button>
                </div>

                {/* Account Settings */}
                <div className="settings-section separator-top">
                  <h3 className="section-title">Account Settings</h3>
                  
                  <div className="form-grid-two-cols">
                    <div className="form-group">
                      <label className="input-label">First Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Last Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="form-grid-three-cols">
                    <div className="form-group">
                      <label className="input-label">City</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Email</label>
                      <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Country</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Address</label>
                    <textarea rows="3" className="form-control textarea-control"></textarea>
                  </div>

                  <div className="checkbox-list">
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>Profile Visibility For Everyone</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>New task notifications</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" />
                      <span>New friend request notifications</span>
                    </label>
                  </div>

                  <button className="btn-primary-md">Save Changes</button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeProfile;