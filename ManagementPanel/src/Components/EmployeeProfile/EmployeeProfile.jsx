import React, { useState } from 'react';
import { 
  FiSearch, FiSettings, FiGrid, FiList, FiHome, FiChevronRight,
  FiMail, FiPhone, FiCalendar, FiCheck, FiX, FiPlus, FiAlertCircle 
} from 'react-icons/fi';
import './EmployeeProfile.css';

// Exact parsed dataset pooling from Reference Images 1 and 2
const initialEmployees = [
  { id: 'LA-0215', name: 'John Doe', role: 'Java Developer', email: 'johndoe@example.com', phone: '9876543210', joinDate: '12 July 2023', initials: 'JD' },
  { id: 'LA-0216', name: 'Jane Smith', role: 'UI/UX Designer', email: 'janesmith@example.com', phone: '9876543211', joinDate: '05 Jan 2024', initials: 'JS' },
  { id: 'LA-0217', name: 'Alex Johnson', role: 'React Developer', email: 'alexj@example.com', phone: '9876543212', joinDate: '18 Aug 2022', initials: 'AJ' },
  { id: 'LA-0218', name: 'Sarah Miller', role: 'HR Manager', email: 'sarah.m@example.com', phone: '9876543213', joinDate: '22 Feb 2021', initials: 'SM' },
  { id: 'LA-0219', name: 'Michael Brown', role: 'DevOps Engineer', email: 'mbrown@example.com', phone: '9876543214', joinDate: '30 Nov 2023', initials: 'MB' },
  { id: 'LA-0220', name: 'Emily Davis', role: 'QA Engineer', email: 'emilyd@example.com', phone: '9876543215', joinDate: '14 May 2024', initials: 'ED' }
];

const EmployeeProfile = () => {
  const [employees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Interactive modal wizard manager state (Reference Image 3 & 4)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsStep, setSettingsStep] = useState(1);
  
  // Settings Form State Payload Management Model
  const [configSettings, setConfigSettings] = useState({
    denseLayout: 'Standard',
    showIdentityBadge: true,
    syncPeriod: '30mins',
    retryThreshold: 3
  });

  // Filter computation criteria
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Selection state matrix computation
  const handleSelectAllToggle = () => {
    if (filteredEmployees.length > 0 && selectedIds.length === filteredEmployees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleCardSelectionToggle = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSettingsCommit = (e) => {
    e.preventDefault();
    setIsSettingsOpen(false);
    setSettingsStep(1);
  };

  return (
    <div className="EmployeeProfile-container">
      {/* Structural Page Header and Breadcrumbs Section */}
      <div className="EmployeeProfile-header">
        <div>
          <h2 className="EmployeeProfile-main-heading">Employee</h2>
          <div className="EmployeeProfile-breadcrumb-wrapper">
            <FiHome className="EmployeeProfile-home-icon" /> 
            <span>Dashboard</span> 
            <FiChevronRight className="EmployeeProfile-separator" /> 
            <span>Employee</span> 
            <FiChevronRight className="EmployeeProfile-separator" /> 
            <span className="EmployeeProfile-active-node">Employee Profile</span>
          </div>
        </div>
        <button className="EmployeeProfile-add-action-btn"><FiPlus /> Add Employee</button>
      </div>

      {/* Main Filter, Embedded Search and View Actions Toolbar */}
      <div className="EmployeeProfile-toolbar">
        <div className="EmployeeProfile-toolbar-left">
          <div className="EmployeeProfile-search-box-container">
            <FiSearch className="EmployeeProfile-search-icon" />
            <input 
              type="text" 
              placeholder="Search employee name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="EmployeeProfile-search-control"
            />
          </div>
          <label className="EmployeeProfile-select-all-checkbox-label">
            <input 
              type="checkbox"
              checked={filteredEmployees.length > 0 && selectedIds.length === filteredEmployees.length}
              onChange={handleSelectAllToggle}
              className="EmployeeProfile-checkbox-element"
            />
            <span className="EmployeeProfile-select-all-caption">Select All</span>
          </label>
        </div>

        <div className="EmployeeProfile-toolbar-right">
          <button className="EmployeeProfile-layout-btn active"><FiGrid /></button>
          <button className="EmployeeProfile-layout-btn"><FiList /></button>
          <button className="EmployeeProfile-settings-trigger-btn" onClick={() => setIsSettingsOpen(true)}>
            <FiSettings className="EmployeeProfile-settings-gear-icon" /> Settings
          </button>
        </div>
      </div>

      {/* Responsive Core Dynamic Grid Integration Component Layout */}
      <div className="EmployeeProfile-cards-grid">
        {filteredEmployees.map((emp) => {
          const isSelected = selectedIds.includes(emp.id);
          return (
            <div key={emp.id} className={`EmployeeProfile-card-item ${isSelected ? 'selected' : ''}`}>
              <div className="EmployeeProfile-card-top-action-row">
                <input 
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCardSelectionToggle(emp.id)}
                  className="EmployeeProfile-checkbox-element"
                />
                <span className="EmployeeProfile-card-id-string">{emp.id}</span>
              </div>

              <div className="EmployeeProfile-card-profile-center">
                <div className="EmployeeProfile-card-avatar-bubble">{emp.initials}</div>
                <h3 className="EmployeeProfile-card-name-title">{emp.name}</h3>
                <span className="EmployeeProfile-card-role-subtitle">{emp.role}</span>
              </div>

              <div className="EmployeeProfile-card-divider-line"></div>

              <div className="EmployeeProfile-card-meta-list-block">
                <div className="EmployeeProfile-meta-row">
                  <FiMail className="EmployeeProfile-meta-glyph" />
                  <span className="EmployeeProfile-meta-text" title={emp.email}>{emp.email}</span>
                </div>
                <div className="EmployeeProfile-meta-row">
                  <FiPhone className="EmployeeProfile-meta-glyph" />
                  <span className="EmployeeProfile-meta-text">{emp.phone}</span>
                </div>
                <div className="EmployeeProfile-meta-row">
                  <FiCalendar className="EmployeeProfile-meta-glyph" />
                  <span className="EmployeeProfile-meta-text">Join Date: {emp.joinDate}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredEmployees.length === 0 && (
          <div className="EmployeeProfile-empty-fallback-wrapper">
            <FiAlertCircle className="EmployeeProfile-fallback-icon" />
            <p>No matching employee profiles discovered.</p>
          </div>
        )}
      </div>

      {/* ================= FUNCTIONAL INTERACTIVE WIZARD MODAL POPUP LAYER ================= */}
      {isSettingsOpen && (
        <div className="EmployeeProfile-modal-backdrop" onClick={() => { setIsSettingsOpen(false); setSettingsStep(1); }}>
          <div className="EmployeeProfile-modal-window transition-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="EmployeeProfile-modal-header-container">
              <div className="EmployeeProfile-modal-header-left">
                <FiSettings className="EmployeeProfile-modal-title-icon" />
                <h3 className="EmployeeProfile-modal-title">Settings Configurator</h3>
              </div>
              <button className="EmployeeProfile-modal-dismiss-btn" onClick={() => { setIsSettingsOpen(false); setSettingsStep(1); }}><FiX /></button>
            </div>

            {/* Configurator Wizard Progression Tabs Segment */}
            <div className="EmployeeProfile-modal-wizards-tabs">
              <button className={`EmployeeProfile-tab-link ${settingsStep === 1 ? 'active' : ''}`} onClick={() => setSettingsStep(1)}>Step 1: Layout Preferred</button>
              <button className={`EmployeeProfile-tab-link ${settingsStep === 2 ? 'active' : ''}`} onClick={() => setSettingsStep(2)}>Step 2: Sync Protocols</button>
            </div>

            <form onSubmit={handleSettingsCommit} className="EmployeeProfile-modal-form-wrapper">
              
              {/* STAGE VIEW 1: Visual Presentation Parameters (Reference Image 3) */}
              {settingsStep === 1 && (
                <div className="EmployeeProfile-form-step-view animate-fade-in-smooth">
                  <h4 className="EmployeeProfile-step-section-heading">Display Customization</h4>
                  
                  <div className="EmployeeProfile-form-group-block">
                    <label className="EmployeeProfile-input-field-label">Default Grid Layout Density</label>
                    <select 
                      value={configSettings.denseLayout}
                      onChange={(e) => setConfigSettings({...configSettings, denseLayout: e.target.value})}
                      className="EmployeeProfile-select-element"
                    >
                      <option value="Comfortable">Comfortable Viewports</option>
                      <option value="Standard">Standard Matrix Grid</option>
                      <option value="Compact">Compact Rows View</option>
                    </select>
                  </div>

                  <div className="EmployeeProfile-form-group-block layout-inline-toggle">
                    <label className="EmployeeProfile-switch-root">
                      <input 
                        type="checkbox" 
                        checked={configSettings.showIdentityBadge}
                        onChange={(e) => setConfigSettings({...configSettings, showIdentityBadge: e.target.checked})}
                        className="EmployeeProfile-switch-input"
                      />
                      <span className="EmployeeProfile-switch-slider-track"></span>
                    </label>
                    <span className="EmployeeProfile-switch-explanation-caption">Display structured Employee Registration Key tags</span>
                  </div>

                  <div className="EmployeeProfile-modal-actions-bar">
                    <button type="button" className="EmployeeProfile-btn-primary-wizard" onClick={() => setSettingsStep(2)}>Continue Next <FiChevronRight /></button>
                  </div>
                </div>
              )}

              {/* STAGE VIEW 2: Operational Synching Rules (Reference Image 4) */}
              {settingsStep === 2 && (
                <div className="EmployeeProfile-form-step-view animate-fade-in-smooth">
                  <h4 className="EmployeeProfile-step-section-heading">Data Ingestion Synchronization</h4>

                  <div className="EmployeeProfile-form-group-block">
                    <label className="EmployeeProfile-input-field-label">Automatic Profile Sync Interval</label>
                    <select 
                      value={configSettings.syncPeriod}
                      onChange={(e) => setConfigSettings({...configSettings, syncPeriod: e.target.value})}
                      className="EmployeeProfile-select-element"
                    >
                      <option value="realtime">Continuous Stream Sync</option>
                      <option value="30mins">Every 30 Minutes Polling</option>
                      <option value="daily">Daily Master Roll Re-sync</option>
                    </select>
                  </div>

                  <div className="EmployeeProfile-form-group-block">
                    <label className="EmployeeProfile-input-field-label">Network Request Retry Max Failure Threshold</label>
                    <input 
                      type="number" 
                      value={configSettings.retryThreshold}
                      onChange={(e) => setConfigSettings({...configSettings, retryThreshold: parseInt(e.target.value) || 0})}
                      className="EmployeeProfile-text-input-field" 
                      min="1" 
                      max="10"
                    />
                  </div>

                  <div className="EmployeeProfile-modal-actions-bar">
                    <button type="button" className="EmployeeProfile-btn-secondary-wizard" onClick={() => setSettingsStep(1)}>Go Back</button>
                    <button type="submit" className="EmployeeProfile-btn-success-wizard">Commit Framework Settings <FiCheck /></button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;