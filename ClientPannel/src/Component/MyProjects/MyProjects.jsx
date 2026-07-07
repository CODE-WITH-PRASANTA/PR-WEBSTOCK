import React, { useState } from 'react';
import { 
  Plus, RotateCw, Download, Trash2, Edit3, 
  Search, SlidersHorizontal, ChevronLeft, ChevronRight, X,
  Briefcase, Bookmark, CheckSquare, User
} from 'lucide-react';
import './MyProjects.css';

// --- Production Mock Dataset Index ---
const INITIAL_DATA = [
  { id: 1, name: 'Chat App', type: 'Software', openTasks: 5, lead: 'Angelica Ramos', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 2, name: 'Jasper Report', type: 'Software', openTasks: 15, lead: 'Airi Satou', status: 'New', created: '2020-02-25', modified: '2020-02-25' },
  { id: 3, name: 'Java Project', type: 'Software', openTasks: 11, lead: 'Jens Brincker', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 4, name: 'Testing Website', type: 'Software', openTasks: 0, lead: 'John Doe', status: 'Hold', created: '2020-02-25', modified: '2020-02-25' },
  { id: 5, name: 'Website SEO', type: 'Software', openTasks: 22, lead: 'Cara Stevens', status: 'Closed', created: '2020-02-25', modified: '2020-02-25' },
  { id: 6, name: 'Jasper Report', type: 'Software', openTasks: 10, lead: 'Airi Satou', status: 'New', created: '2020-02-25', modified: '2020-02-25' },
  { id: 7, name: 'Java Project', type: 'Software', openTasks: 15, lead: 'Angelica Ramos', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 8, name: 'Testing Website', type: 'Software', openTasks: 7, lead: 'John Doe', status: 'Active', created: '2020-02-25', modified: '2020-02-25' },
  { id: 9, name: 'Jasper Report', type: 'Software', openTasks: 0, lead: 'Cara Stevens', status: 'Closed', created: '2020-02-25', modified: '2020-02-25' },
  { id: 10, name: 'PHP website', type: 'Software', openTasks: 19, lead: 'Jens Brincker', status: 'New', created: '2020-02-25', modified: '2020-02-25' },
  { id: 11, name: 'Analytics Dashboard', type: 'Software', openTasks: 3, lead: 'Sarah Jenkins', status: 'Active', created: '2026-07-06', modified: '2026-07-06' }
];

const MyProjects = () => {
  // --- State Setup ---
  const [projects, setProjects] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- Visibility Toggle states ---
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, projectName: true, projectType: true, 
    openTasks: true, leadName: true, status: true,
    createdDate: true, lastModified: true, actions: true
  });

  // --- Modal Form control states ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    id: null, name: '', type: '', openTasks: '', lead: '', status: 'New', created: '2026-07-06', modified: '2026-07-06'
  });

  // --- Action Logic Controllers ---
  const handleResetData = () => {
    setProjects(INITIAL_DATA);
    setSearchTerm('');
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleExportJSON = () => {
    const fileData = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(projects, null, 2))}`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', fileData);
    linkElement.setAttribute('download', 'My_Projects_Report.json');
    document.body.appendChild(linkElement);
    linkElement.click();
    linkElement.remove();
  };

  const handleSingleDelete = (id) => {
    if(window.confirm("Permanently delete this project from row index?")) {
      setProjects(projects.filter(p => p.id !== id));
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleBulkDelete = () => {
    if(window.confirm(`Permanently delete all ${selectedIds.length} selected project records?`)) {
      setProjects(projects.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleSelectAllToggle = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentPagedItems.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleRowCheckboxToggle = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode('add');
    setFormData({ id: null, name: '', type: '', openTasks: '', lead: '', status: 'New', created: '2026-07-06', modified: '2026-07-06' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setModalMode('edit');
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const addedItem = {
        ...formData,
        id: Date.now(),
        openTasks: parseInt(formData.openTasks) || 0
      };
      setProjects([addedItem, ...projects]);
    } else {
      setProjects(projects.map(p => p.id === formData.id ? { ...formData, openTasks: parseInt(formData.openTasks) || 0 } : p));
    }
    setIsModalOpen(false);
  };

  // --- Computation & Filter Calculations ---
  const activeFilteredList = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxPagesPossible = Math.ceil(activeFilteredList.length / itemsPerPage) || 1;
  const indexBoundLast = currentPage * itemsPerPage;
  const indexBoundFirst = indexBoundLast - itemsPerPage;
  const currentPagedItems = activeFilteredList.slice(indexBoundFirst, indexBoundLast);

  const parseBadgeClassName = (status) => {
    if (status === 'Active') return 'status-badge badge-active';
    if (status === 'New') return 'status-badge badge-new';
    if (status === 'Hold') return 'status-badge badge-hold';
    return 'status-badge badge-closed';
  };

  return (
    <div className="project-dashboard">
      
      {/* Structural Breadcrumb Route Navigation line */}
      <div className="breadcrumb-nav">
        <span>🏠</span>
        <span>&gt;</span>
        <span>Client</span>
        <span>&gt;</span>
        <span className="breadcrumb-active">My Projects</span>
      </div>

      {/* Main Framework Frame Card layout */}
      <div className="dashboard-card">
        
        {/* Upper Dashboard Sub-Header Toolbar Section */}
        <div className="toolbar-row">
          <div className="toolbar-left">
            <h2 className="toolbar-title">My Projects</h2>
            
            <div className="search-input-container">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="search-field"
              />
            </div>
          </div>

          <div className="toolbar-right">
            
            {/* Multi-Selection Context Action Button */}
            {selectedIds.length > 0 && (
              <button onClick={handleBulkDelete} className="bulk-delete-btn">
                <Trash2 size={14} /> Delete Selected ({selectedIds.length})
              </button>
            )}

            {/* Column Target Management Dropdown Anchor field */}
            <div className="dropdown-container">
              <button 
                className="action-btn"
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                style={{ backgroundColor: showColumnDropdown ? '#e8f0fe' : '#ffffff', borderColor: showColumnDropdown ? '#1a73e8' : '#e0e0e0' }}
              >
                <SlidersHorizontal size={16} style={{ color: showColumnDropdown ? '#1a73e8' : '#5f6368' }} />
              </button>

              {showColumnDropdown && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setShowColumnDropdown(false)} />
                  <div className="dropdown-box">
                    <div className="dropdown-header">Show/Hide Column</div>
                    <div className="dropdown-scroller">
                      {Object.keys(visibleColumns).map((colKey) => (
                        <label key={colKey} className="dropdown-item icon-trigger">
                          <input 
                            type="checkbox" 
                            checked={visibleColumns[colKey]} 
                            onChange={(e) => setVisibleColumns({...visibleColumns, [colKey]: e.target.checked})}
                            style={{ cursor: 'pointer', accentColor: '#1a73e8' }}
                          />
                          <span>{colKey.replace(/([A-Z])/g, ' $1')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Interactive Control Panel Buttons mapping */}
            <button className="action-btn" onClick={handleOpenCreateModal} style={{ color: '#2e7d32' }} title="Create Record"><Plus size={16} /></button>
            <button className="action-btn" onClick={handleResetData} style={{ color: '#5f6368' }} title="Sync Component Layout"><RotateCw size={16} /></button>
            <button className="action-btn" onClick={handleExportJSON} style={{ color: '#1a73e8' }} title="Download Report JSON"><Download size={16} /></button>
          </div>
        </div>

        {/* Outer Data Table Scroll Wrapper view layer */}
        <div className="table-scroll-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th className="th-cell" style={{ width: '48px', textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAllToggle}
                      checked={currentPagedItems.length > 0 && currentPagedItems.every(p => selectedIds.includes(p.id))}
                      style={{ cursor: 'pointer', accentColor: '#1a73e8' }}
                    />
                  </th>
                )}
                {visibleColumns.projectName && <th className="th-cell">Project Name</th>}
                {visibleColumns.projectType && <th className="th-cell">Project Type</th>}
                {visibleColumns.openTasks && <th className="th-cell">Open Tasks</th>}
                {visibleColumns.leadName && <th className="th-cell">Lead Name</th>}
                {visibleColumns.status && <th className="th-cell">Status</th>}
                {visibleColumns.createdDate && <th className="th-cell">Created Date</th>}
                {visibleColumns.lastModified && <th className="th-cell">Last Modified</th>}
                {visibleColumns.actions && <th className="th-cell" style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentPagedItems.length > 0 ? (
                currentPagedItems.map((project) => (
                  <tr key={project.id} className="tr-data-row" style={{ backgroundColor: selectedIds.includes(project.id) ? '#f8fafc' : 'transparent' }}>
                    {visibleColumns.checkbox && (
                      <td className="td-cell" style={{ textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(project.id)}
                          onChange={() => handleRowCheckboxToggle(project.id)}
                          style={{ cursor: 'pointer', accentColor: '#1a73e8' }}
                        />
                      </td>
                    )}
                    {visibleColumns.projectName && <td className="td-cell" style={{ color: '#202124', fontWeight: '600' }}>{project.name}</td>}
                    {visibleColumns.projectType && <td className="td-cell" style={{ color: '#5f6368' }}>{project.type}</td>}
                    {visibleColumns.openTasks && <td className="td-cell">{project.openTasks}</td>}
                    {visibleColumns.leadName && <td className="td-cell">{project.lead}</td>}
                    {visibleColumns.status && (
                      <td className="td-cell">
                        <span className={parseBadgeClassName(project.status)}>{project.status}</span>
                      </td>
                    )}
                    {visibleColumns.createdDate && <td className="td-cell" style={{ color: '#5f6368' }}>📅 {project.created}</td>}
                    {visibleColumns.lastModified && <td className="td-cell" style={{ color: '#5f6368' }}>📅 {project.modified}</td>}
                    {visibleColumns.actions && (
                      <td className="td-cell">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                          <button className="icon-trigger" onClick={() => handleOpenEditModal(project)} style={{ color: '#1a73e8' }} title="Modify Project"><Edit3 size={15} /></button>
                          <button className="icon-trigger" onClick={() => handleSingleDelete(project.id)} style={{ color: '#d93025' }} title="Remove Project"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '36px', color: '#80868b' }}>
                    No matching client project data logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Segment Footer section layout */}
        <div className="pagination-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Items per page:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
              className="page-select-dropdown"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>
              {activeFilteredList.length > 0 ? indexBoundFirst + 1 : 0} – {Math.min(indexBoundLast, activeFilteredList.length)} of {activeFilteredList.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="nav-arrow-btn"
                style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.35 : 1 }}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, maxPagesPossible))}
                disabled={currentPage === maxPagesPossible}
                className="nav-arrow-btn"
                style={{ cursor: currentPage === maxPagesPossible ? 'not-allowed' : 'pointer', opacity: currentPage === maxPagesPossible ? 0.35 : 1 }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Action Popup Dialog Window Modal Segment (Images 3 & 4) --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-window">
            
            <div className="modal-header">
              <h3>{modalMode === 'add' ? 'New Project' : formData.name}</h3>
              <X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="modal-form-grid">
                
                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Project Name*</span>
                  <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-input-field"
                  />
                  <Briefcase size={16} className="input-context-icon" />
                </div>

                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Project Type*</span>
                  <input 
                    type="text" required value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="form-input-field"
                  />
                  <Bookmark size={16} className="input-context-icon" />
                </div>

                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Open task*</span>
                  <input 
                    type="number" min="0" required value={formData.openTasks}
                    onChange={(e) => setFormData({...formData, openTasks: e.target.value})}
                    className="form-input-field"
                  />
                  <CheckSquare size={16} className="input-context-icon" />
                </div>

                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Lead name*</span>
                  <input 
                    type="text" required value={formData.lead}
                    onChange={(e) => setFormData({...formData, lead: e.target.value})}
                    className="form-input-field"
                  />
                  <User size={16} className="input-context-icon" />
                </div>

                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Status*</span>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="form-input-field"
                    style={{ paddingRight: '36px', appearance: 'none', background: '#ffffff', cursor: 'pointer' }}
                  >
                    <option value="New">New</option>
                    <option value="Active">Active</option>
                    <option value="Hold">Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#666', pointerEvents: 'none' }}>▼</span>
                </div>

                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Last modify date*</span>
                  <input 
                    type="date" value={formData.modified}
                    onChange={(e) => setFormData({...formData, modified: e.target.value})}
                    className="form-input-field"
                  />
                </div>

                <div className="fieldset-input-wrapper">
                  <span className="fieldset-legend">Create date*</span>
                  <input 
                    type="date" value={formData.created}
                    onChange={(e) => setFormData({...formData, created: e.target.value})}
                    className="form-input-field"
                  />
                </div>

                <div className="modal-actions-row">
                  <button type="submit" className="modal-btn-save">Save</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="modal-btn-cancel">Cancel</button>
                </div>

              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyProjects;