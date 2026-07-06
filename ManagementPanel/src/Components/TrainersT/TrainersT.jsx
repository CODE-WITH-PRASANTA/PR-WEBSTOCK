import React, { useState, useEffect, useRef } from 'react';
import './TrainersT.css';

const initialTrainers = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "+1 (555) 234-5678", expertise: "Leadership Development", status: "Active", address: "New York, USA", qualification: "MBA in HR", joinDate: "2024-03-15", performance: "Excellent" },
  { id: 2, name: "Sarah Smith", email: "sarah.smith@example.com", phone: "+1 (555) 876-5432", expertise: "Advanced Data Analytics", status: "Active", address: "London, UK", qualification: "Ph.D. in Data Science", joinDate: "2023-11-01", performance: "Outstanding" },
  { id: 3, name: "Michael Brown", email: "m.brown@example.com", phone: "+1 (555) 345-6789", expertise: "Sales & Negotiation", status: "Inactive", address: "Chicago, USA", qualification: "B.A. in Marketing", joinDate: "2025-01-10", performance: "Good" },
  { id: 4, name: "Emily Davis", email: "emily.d@example.com", phone: "+1 (555) 765-4321", expertise: "Cybersecurity Frameworks", status: "Active", address: "Austin, USA", qualification: "M.S. in Information Security", joinDate: "2024-08-22", performance: "Excellent" },
  { id: 5, name: "Robert Wilson", email: "r.wilson@example.com", phone: "+1 (555) 456-7890", expertise: "Backend Cloud Infrastructure", status: "Active", address: "San Francisco, USA", qualification: "B.S. in Computer Science", joinDate: "2024-05-19", performance: "Outstanding" },
  { id: 6, name: "Jessica Taylor", email: "j.taylor@example.com", phone: "+1 (555) 987-6543", expertise: "UI/UX Product Design", status: "Active", address: "Seattle, USA", qualification: "B.FA in Graphic Design", joinDate: "2024-01-15", performance: "Excellent" },
  { id: 7, name: "David Miller", email: "d.miller@example.com", phone: "+1 (555) 765-1234", expertise: "DevOps & Kubernetes", status: "Inactive", address: "Denver, USA", qualification: "M.S. in Software Engineering", joinDate: "2023-06-20", performance: "Good" },
  { id: 8, name: "Amanda Green", email: "amanda.g@example.com", phone: "+1 (555) 321-7654", expertise: "Agile Project Scrum", status: "Active", address: "Boston, USA", qualification: "PMP Certified", joinDate: "2025-02-11", performance: "Outstanding" },
  { id: 9, name: "James Anderson", email: "j.anderson@example.com", phone: "+1 (555) 654-9870", expertise: "Machine Learning Ops", status: "Active", address: "Los Angeles, USA", qualification: "Ph.D. in AI Systems", joinDate: "2024-10-05", performance: "Excellent" },
  { id: 10, name: "Megan Thomas", email: "m.thomas@example.com", phone: "+1 (555) 123-9876", expertise: "Frontend React Architectures", status: "Active", address: "Miami, USA", qualification: "B.S. in Information Tech", joinDate: "2025-05-18", performance: "Outstanding" },
  { id: 11, name: "William White", email: "w.white@example.com", phone: "+1 (555) 432-1098", expertise: "Blockchain Engineering", status: "Inactive", address: "Phoenix, USA", qualification: "M.S. in Cryptography", joinDate: "2023-09-14", performance: "Good" }
];

const TrainersT = () => {
  // --- Core State Management ---
  const [trainersList, setTrainersList] = useState(initialTrainers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // --- Layout Toggles & Popovers Hooks ---
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);
  const [showColFilter, setShowColFilter] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- Dynamic Form State Schema ---
  const [formData, setFormData] = useState({
    id: null, name: '', email: '', phone: '', expertise: '', status: 'Active',
    address: '', qualification: '', joinDate: '2026-07-04', performance: 'Excellent'
  });

  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, name: true, email: true, phone: true, expertise: true, status: true, actions: true
  });

  const actionMenuRef = useRef(null);
  const colDropdownRef = useRef(null);

  // --- Close Menus on External Clicks ---
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setActiveActionMenuId(null);
      }
      if (colDropdownRef.current && !colDropdownRef.current.contains(e.target)) {
        setShowColFilter(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // --- Utility Toolbar Actions ---
  const handleRefresh = () => {
    setTrainersList(initialTrainers);
    setSearchQuery("");
    setSelectedRowIds([]);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trainersList, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "trainers_report.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  // --- Multi-Row Checkbox Toggles ---
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(activePageData.map(item => item.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const toggleRowSelect = (id, e) => {
    e.stopPropagation();
    setSelectedRowIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // --- Core Row Mutation Engines (Delete / Form Triggers) ---
  const handleSingleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to permanently delete this trainer profile?")) {
      setTrainersList(prev => prev.filter(item => item.id !== id));
      setSelectedRowIds(prev => prev.filter(item => item !== id));
      setActiveActionMenuId(null);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete all ${selectedRowIds.length} checked profiles?`)) {
      setTrainersList(prev => prev.filter(item => !selectedRowIds.includes(item.id)));
      setSelectedRowIds([]);
    }
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData({
      id: null, name: '', email: '', phone: '', expertise: '', status: 'Active',
      address: '', qualification: '', joinDate: '2026-07-04', performance: 'Excellent'
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (trainer, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setFormData({ ...trainer });
    setIsFormModalOpen(true);
    setActiveActionMenuId(null);
  };

  const handleOpenDetails = (trainer) => {
    setSelectedTrainer(trainer);
    setIsDetailModalOpen(true);
    setActiveActionMenuId(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTrainersList(prev => prev.map(item => item.id === formData.id ? formData : item));
    } else {
      const newEntry = { ...formData, id: Date.now() };
      setTrainersList([newEntry, ...trainersList]);
    }
    setIsFormModalOpen(false);
  };

  // --- Search Filtering & Dynamic Pagination Math ---
  const filteredData = trainersList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const activePageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="tt-workspace-context-wrapper">
      
      {/* Upper Navigation Map trail */}
      <div className="tt-breadcrumb-trail-row">
        <h1 className="tt-main-viewport-title">Trainers</h1>
        <div className="tt-path-indicator-chain">
          <span>🏠</span>
          <span className="tt-delimiter">&gt;</span>
          <span>Communication</span>
          <span className="tt-delimiter">&gt;</span>
          <span className="tt-active-destination">Trainers</span>
        </div>
      </div>

      {/* Main Control Toolbar Block */}
      <div className="tt-control-actions-panel">
        <div className="tt-search-composite-hull">
          <span className="tt-search-badge">Trainers List</span>
          <span className="tt-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search trainers..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="tt-utility-button-cluster">
          {selectedRowIds.length > 0 && (
            <button onClick={handleBulkDelete} className="tt-bulk-delete-trigger-btn">
              <span>🗑️ Global Delete Checked ({selectedRowIds.length})</span>
            </button>
          )}

          {/* Visibility Controls Dropdown */}
          <div className="tt-popover-anchor-shell" ref={colDropdownRef}>
            <button onClick={() => setShowColFilter(!showColFilter)} className={`tt-utility-icon-btn ${showColFilter ? 'tt-state-on' : ''}`}>
              ⚙️
            </button>
            {showColFilter && (
              <div className="tt-columns-manager-popover">
                <div className="tt-popover-title">Toggle Columns</div>
                <div className="tt-popover-scroller unique-scrollbar">
                  {Object.keys(visibleColumns).map((colKey) => (
                    <label key={colKey} className="tt-popover-checkbox-line">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[colKey]} 
                        onChange={() => setVisibleColumns({...visibleColumns, [colKey]: !visibleColumns[colKey]})}
                      />
                      <span className="tt-checkbox-label-text">{colKey}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={handleOpenAddModal} className="tt-utility-icon-btn tt-additive-theme-btn">➕</button>
          <button onClick={handleRefresh} className="tt-utility-icon-btn">🔄</button>
          <button onClick={handleDownload} className="tt-utility-icon-btn tt-download-theme-btn">📥</button>
        </div>
      </div>

      {/* Primary Data Responsive Grid Engine */}
      <div className="tt-table-viewport-canvas unique-scrollbar">
        <table className="tt-structured-data-table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th className="tt-col-width-checkbox">
                  <input 
                    type="checkbox" 
                    onChange={toggleSelectAll} 
                    checked={activePageData.length > 0 && selectedRowIds.length === activePageData.length}
                  />
                </th>
              )}
              {visibleColumns.id && <th className="tt-col-width-id">ID</th>}
              {visibleColumns.name && <th>Trainer Name</th>}
              {visibleColumns.email && <th>Email Address</th>}
              {visibleColumns.phone && <th>Phone Number</th>}
              {visibleColumns.expertise && <th>Expertise Field</th>}
              {visibleColumns.status && <th>Status</th>}
              {visibleColumns.actions && <th className="tt-col-width-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {activePageData.length > 0 ? (
              activePageData.map((row) => (
                <tr key={row.id} onClick={() => handleOpenDetails(row)} className="tt-interactive-table-row">
                  {visibleColumns.checkbox && (
                    <td className="tt-col-width-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRowIds.includes(row.id)} 
                        onChange={(e) => toggleRowSelect(row.id, e)}
                      />
                    </td>
                  )}
                  {visibleColumns.id && <td className="tt-cell-id">{row.id}</td>}
                  {visibleColumns.name && <td className="tt-cell-bold-text">{row.name}</td>}
                  {visibleColumns.email && <td>{row.email}</td>}
                  {visibleColumns.phone && <td className="tt-text-dimmed">{row.phone}</td>}
                  {visibleColumns.expertise && <td><span className="tt-expertise-tag">{row.expertise}</span></td>}
                  {visibleColumns.status && (
                    <td>
                      <span className={`tt-status-pill ${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="tt-col-width-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="tt-row-flex-controls-container">
                        
                        {/* Task Requirement: Contextual immediate Inline Row Delete if Row Checkbox is True */}
                        {selectedRowIds.includes(row.id) && (
                          <button 
                            className="tt-checkbox-revealed-row-delete-btn"
                            onClick={(e) => handleSingleDelete(row.id, e)}
                            title="Delete Row Entry"
                          >
                            🗑️
                          </button>
                        )}

                        {/* Anchor relative points for Popover dropdown menus */}
                        <div className="tt-row-relative-menu-anchor" ref={activeActionMenuId === row.id ? actionMenuRef : null}>
                          <button 
                            onClick={() => setActiveActionMenuId(activeActionMenuId === row.id ? null : row.id)}
                            className="tt-three-dots-trigger-btn"
                          >
                            ⋮
                          </button>
                          
                          {activeActionMenuId === row.id && (
                            <div className="tt-action-dropdown-popover-menu">
                              <button onClick={() => handleOpenDetails(row)} className="tt-dropdown-action-line-item">
                                👁️ View Profile Details
                              </button>
                              <button onClick={(e) => handleOpenEditModal(row, e)} className="tt-dropdown-action-line-item blue-edit">
                                📝 Edit Item Parameters
                              </button>
                              <hr className="tt-dropdown-divider" />
                              <button onClick={(e) => handleSingleDelete(row.id, e)} className="tt-dropdown-action-line-item red-delete">
                                🗑️ Purge Records
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="tt-empty-table-fallback">
                  No tracking trainers matches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stepper Grid Footer Row */}
      <div className="tt-pagination-footer-panel">
        <div className="tt-items-per-page-selector">
          <span>Items per page:</span>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="tt-pagination-stepper">
          <span>
            {filteredData.length === 0 ? 0 : startIndex + 1} – {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}
          </span>
          <div className="tt-stepper-arrows-flex">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>❮</button>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>❯</button>
          </div>
        </div>
      </div>

      {/* --- MODAL BOX 1: ADD OR EDIT SYSTEM PROFILE FORM --- */}
      {isFormModalOpen && (
        <div className="tt-modal-backdrop-blur">
          <div className="tt-modal-window-box">
            <div className="tt-modal-header-banner">
              <h2>{isEditing ? "Modify Trainer Record Parameters" : "Create New Trainer Registry Profile"}</h2>
              <button className="tt-modal-dismiss-cross" onClick={() => setIsFormModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="tt-modal-scrollable-body custom-scrollbar">
              <div className="tt-form-css-grid">
                <div className="tt-input-field-hull">
                  <label>Full Name *</label>
                  <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="tt-input-field-hull">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="name@domain.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="tt-input-field-hull">
                  <label>Phone Number *</label>
                  <input type="text" required placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="tt-input-field-hull">
                  <label>Skills Field Matrix *</label>
                  <input type="text" required placeholder="e.g. FullStack Architecture" value={formData.expertise} onChange={(e) => setFormData({...formData, expertise: e.target.value})} />
                </div>
                <div className="tt-input-field-hull">
                  <label>Academic Qualification Certification</label>
                  <input type="text" placeholder="e.g. Master of Engineering" value={formData.qualification} onChange={(e) => setFormData({...formData, qualification: e.target.value})} />
                </div>
                <div className="tt-input-field-hull">
                  <label>Status Allocation Mode</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="tt-input-field-hull tt-grid-span-full">
                  <label>Permanent Mailing Address Location</label>
                  <input type="text" placeholder="City, State, Country Base" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>

              <div className="tt-modal-footer-action-row">
                <button type="submit" className="tt-action-btn-save">Commit Changes</button>
                <button type="button" className="tt-action-btn-cancel" onClick={() => setIsFormModalOpen(false)}>Cancel Drop</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL BOX 2: VIEW RECORD COMPREHENSIVE VIEW PROFILE PANEL --- */}
      {isDetailModalOpen && selectedTrainer && (
        <div className="tt-modal-backdrop-blur">
          <div className="tt-modal-window-box detail-theme">
            <div className="tt-modal-header-banner detail-header">
              <div className="tt-detail-title-flex">
                <div className="tt-avatar-fallback-placeholder">{selectedTrainer.name.charAt(0)}</div>
                <div>
                  <h2>{selectedTrainer.name}</h2>
                  <p className="tt-sub-text-header">{selectedTrainer.expertise}</p>
                </div>
              </div>
              <button className="tt-modal-dismiss-cross" onClick={() => setIsDetailModalOpen(false)}>✕</button>
            </div>

            <div className="tt-modal-scrollable-body custom-scrollbar">
              <div className="tt-detail-grid-section">
                <div className="tt-detail-card-item">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Email Handle</span>
                    <span className="tt-detail-val">{selectedTrainer.email}</span>
                  </div>
                </div>
                <div className="tt-detail-card-item">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Direct Line Contact</span>
                    <span className="tt-detail-val">{selectedTrainer.phone}</span>
                  </div>
                </div>
                <div className="tt-detail-card-item">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Assigned Core Matrix</span>
                    <span className="tt-detail-val">{selectedTrainer.expertise}</span>
                  </div>
                </div>
                <div className="tt-detail-card-item">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Verification Credentials</span>
                    <span className="tt-detail-val">{selectedTrainer.qualification || "Not Disclosed"}</span>
                  </div>
                </div>
                <div className="tt-detail-card-item">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Registry Onboarding Date</span>
                    <span className="tt-detail-val">📅 {selectedTrainer.joinDate}</span>
                  </div>
                </div>
                <div className="tt-detail-card-item">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Performance Metric Evaluator</span>
                    <span className="tt-detail-val">{selectedTrainer.performance}</span>
                  </div>
                </div>
                <div className="tt-detail-card-item tt-grid-span-full">
                  <div className="tt-detail-text-block">
                    <span className="tt-detail-label">Primary Assigned Base Site</span>
                    <span className="tt-detail-val">📍 {selectedTrainer.address || "Global / Remote Base Node Location"}</span>
                  </div>
                </div>
              </div>

              <div className="tt-modal-footer-action-row">
                <button type="button" className="tt-action-btn-save" onClick={() => setIsDetailModalOpen(false)}>Acknowledge Records</button>
                <button type="button" className="tt-action-btn-cancel" onClick={() => setIsDetailModalOpen(false)}>Dismiss Panel</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrainersT;