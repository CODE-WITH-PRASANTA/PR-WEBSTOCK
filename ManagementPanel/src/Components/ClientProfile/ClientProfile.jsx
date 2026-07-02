import React, { useState } from 'react';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaClipboardList, 
  FaFileInvoiceDollar, 
  FaUserAlt, 
  FaStar, 
  FaBuilding, 
  FaEnvelope 
} from 'react-icons/fa';
import './ClientProfile.css';

const ClientProfile = () => {
  // Tab control: 'overview' or 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Form states for Account Settings
  const [settingsForm, setSettingsForm] = useState({
    companyName: 'EInfoSoft Solutions',
    primaryEmail: 'contact@einfosoftsolutions.com',
    address: '123 Business Way, Tech Park, San Francisco, CA',
    enableNotifications: false,
    automaticInvoice: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    alert('Changes saved successfully!');
    console.log('Saved Configuration State:', settingsForm);
  };

  const handleResetDefault = () => {
    setSettingsForm({
      companyName: 'EInfoSoft Solutions',
      primaryEmail: 'contact@einfosoftsolutions.com',
      address: '123 Business Way, Tech Park, San Francisco, CA',
      enableNotifications: false,
      automaticInvoice: false
    });
  };

  return (
    <div className="ClientProfile-container">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="ClientProfile-header">
        <h2>Client Profile</h2>
        <div className="ClientProfile-breadcrumb">
          <FaHome className="breadcrumb-home-icon" />
          <span className="breadcrumb-arrow">&gt;</span>
          <span>Clients</span>
          <span className="breadcrumb-arrow">&gt;</span>
          <span className="breadcrumb-active">Profile</span>
        </div>
      </div>

      {/* Main Dashboard Layout Grid */}
      <div className="ClientProfile-layout-grid">
        
        {/* Left Column Area: Hero & Quick Contact */}
        <div className="ClientProfile-left-column">
          
          {/* Card 1: Main Banner & Statistics */}
          <div className="ClientProfile-hero-card">
            <div className="ClientProfile-purple-banner">
              <h3>EINFOSOFT SOLUTIONS</h3>
              <p>Premium Enterprise Partner</p>
            </div>
            
            <div className="ClientProfile-avatar-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                alt="Client Representative" 
                className="ClientProfile-avatar-img"
              />
            </div>

            <div className="ClientProfile-hero-details">
              <p className="ClientProfile-hero-bio">
                A leading technology solution provider specializing in scalable cloud architectures and modern web ecosystems.
              </p>
              <div className="ClientProfile-geo-location">
                <FaMapMarkerAlt />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <hr className="ClientProfile-divider" />

            {/* Micro Counter Stats Grid Rows */}
            <div className="ClientProfile-stats-row">
              <div className="ClientProfile-stat-item">
                <div className="ClientProfile-icon-circle blue-circle">
                  <FaClipboardList />
                </div>
                <span className="ClientProfile-stat-num">12</span>
                <span className="ClientProfile-stat-label">Projects</span>
              </div>

              <div className="ClientProfile-stat-item">
                <div className="ClientProfile-icon-circle orange-circle">
                  <FaFileInvoiceDollar />
                </div>
                <span className="ClientProfile-stat-num">45</span>
                <span className="ClientProfile-stat-label">Invoices</span>
              </div>

              <div className="ClientProfile-stat-item">
                <div className="ClientProfile-icon-circle green-circle">
                  <FaUserAlt />
                </div>
                <span className="ClientProfile-stat-num">8</span>
                <span className="ClientProfile-stat-label">Contacts</span>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Contact Informational Area */}
          <div className="ClientProfile-contact-card">
            <h4>Quick Contact</h4>
            <div className="ClientProfile-contact-info-list">
              <div className="ClientProfile-contact-row">
                <span className="contact-label">Industry</span>
                <span className="contact-val highlight-blue">Information Technology</span>
              </div>
              <div className="ClientProfile-contact-row">
                <span className="contact-label">Website</span>
                <span className="contact-val highlight-blue-link">www.einfosoftsolutions.com</span>
              </div>
              <div className="ClientProfile-contact-row">
                <span className="contact-label">Phone</span>
                <span className="contact-val highlight-blue">(555) 123-4567</span>
              </div>
              <div className="ClientProfile-contact-row">
                <span className="contact-label">Email</span>
                <span className="contact-val highlight-blue-link">contact@einfosoftsolutions.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Area: Navigation Tabs Content Shell */}
        <div className="ClientProfile-right-column">
          <div className="ClientProfile-tabs-card">
            
            {/* Header Interactive Navigation Bars */}
            <div className="ClientProfile-tabs-header-bar">
              <button 
                type="button"
                className={`ClientProfile-tab-btn ${activeTab === 'overview' ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <FaBuilding className="tab-icon" />
                <span>Company Overview</span>
              </button>
              
              <button 
                type="button"
                className={`ClientProfile-tab-btn ${activeTab === 'settings' ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <FaUserAlt className="tab-icon" />
                <span>Account Settings</span>
              </button>
            </div>

            {/* Dynamic Interactive Render Windows */}
            <div className="ClientProfile-tab-view-window">
              
              {/* TAB CONTENT 1: Company Overview View Layout */}
              {activeTab === 'overview' && (
                <div className="ClientProfile-view-fadein">
                  <div className="ClientProfile-section-block">
                    <h3 className="ClientProfile-block-heading">Corporate Vision</h3>
                    <p className="ClientProfile-block-paragraph">
                      EInfoSoft Solutions has proven to be a reliable and innovative partner. Their commitment to quality and timeline adherence has been exceptional across all projects handled. We specialize in transforming complex business requirements into elegant, high-performance digital products.
                    </p>
                  </div>

                  {/* Badges Info Blocks */}
                  <div className="ClientProfile-badges-container">
                    <div className="ClientProfile-info-badge badge-purple">
                      <span className="badge-title">TAX ID</span>
                      <span className="badge-value">TX-998877</span>
                    </div>
                    
                    <div className="ClientProfile-info-badge badge-cyan">
                      <span className="badge-title">CLIENT SINCE</span>
                      <span className="badge-value">Jan 2021</span>
                    </div>

                    <div className="ClientProfile-info-badge badge-green">
                      <span className="badge-title">ACCOUNT STATUS</span>
                      <span className="badge-pill-status">Active</span>
                    </div>

                    <div className="ClientProfile-info-badge badge-yellow">
                      <span className="badge-title">PRIORITY</span>
                      <span className="badge-value font-weight-bold">High</span>
                    </div>
                  </div>

                  {/* Key Achievement Footer Component Section */}
                  <div className="ClientProfile-section-block">
                    <h3 className="ClientProfile-block-heading border-decoration">Key Achievement</h3>
                    <div className="ClientProfile-achievement-dashed-box">
                      <FaStar className="gold-star-icon" />
                      <div className="achievement-message">
                        <strong>Top Partner 2023</strong>
                        <p>Recognized for outstanding contribution in enterprise cloud solutions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: Account Settings Editor form area */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveChanges} className="ClientProfile-view-fadein ClientProfile-settings-form">
                  
                  {/* Row 1 inputs */}
                  <div className="ClientProfile-form-input-row">
                    <div className="ClientProfile-field-group">
                      <label className="ClientProfile-floating-label">Company Name —</label>
                      <div className="ClientProfile-input-with-icon-wrapper">
                        <input 
                          type="text" 
                          name="companyName"
                          value={settingsForm.companyName}
                          onChange={handleInputChange}
                        />
                        <FaBuilding className="field-adornment-icon" />
                      </div>
                    </div>

                    <div className="ClientProfile-field-group">
                      <label className="ClientProfile-floating-label">Primary Email —</label>
                      <div className="ClientProfile-input-with-icon-wrapper">
                        <input 
                          type="email" 
                          name="primaryEmail"
                          value={settingsForm.primaryEmail}
                          onChange={handleInputChange}
                        />
                        <FaEnvelope className="field-adornment-icon" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 Full-width input */}
                  <div className="ClientProfile-field-group full-row-width">
                    <label className="ClientProfile-floating-label">Address —</label>
                    <div className="ClientProfile-input-with-icon-wrapper">
                      <input 
                        type="text" 
                        name="address"
                        value={settingsForm.address}
                        onChange={handleInputChange}
                      />
                      <FaMapMarkerAlt className="field-adornment-icon placement-marker" />
                    </div>
                  </div>

                  {/* Row 3 Checkboxes preferences parameters options area */}
                  <div className="ClientProfile-checkboxes-row">
                    <label className="ClientProfile-checkbox-label">
                      <input 
                        type="checkbox" 
                        name="enableNotifications"
                        checked={settingsForm.enableNotifications}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-custom-text">Enable project notifications</span>
                    </label>

                    <label className="ClientProfile-checkbox-label">
                      <input 
                        type="checkbox" 
                        name="automaticInvoice"
                        checked={settingsForm.automaticInvoice}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-custom-text">Automatic invoice generation</span>
                    </label>
                  </div>

                  {/* Bottom Processing Control Execution Triggers */}
                  <div className="ClientProfile-settings-action-triggers">
                    <button type="submit" className="ClientProfile-btn-save">
                      Save Changes
                    </button>
                    <button type="button" className="ClientProfile-btn-reset" onClick={handleResetDefault}>
                      Reset Default
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientProfile;