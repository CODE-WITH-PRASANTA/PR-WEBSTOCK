import React, { useState } from 'react';
import { 
  FiHome, FiChevronRight, FiFilter, FiPlus, FiRotateCw, 
  FiDownload, FiSearch, FiEdit, FiTrash2, FiCalendar, 
  FiUser, FiBriefcase, FiClock, FiLayers, FiAlertCircle 
} from 'react-icons/fi';
import './Resumes.css';

// Exact match text datasets from the 1st reference image table layout
const initialResumesData = [
  { id: 1, candidateName: 'John Doe', jobTitle: 'Angular Developer', interviewer: 'Sarah Smith', date: '2023-11-01', time: '10:00 AM', round: 'Technical Round 1', status: 'Scheduled' },
  { id: 2, candidateName: 'Michael Brown', jobTitle: 'UX Designer', interviewer: 'Emily Davis', date: '2023-11-02', time: '11:00 AM', round: 'Screening', status: 'Completed' },
  { id: 3, candidateName: 'Emma Wilson', jobTitle: 'Marketing Specialist', interviewer: 'David Lee', date: '2023-11-03', time: '02:00 PM', round: 'HR Round', status: 'Scheduled' },
  { id: 4, candidateName: 'James Miller', jobTitle: 'Project Manager', interviewer: 'Robert Taylor', date: '2023-11-04', time: '09:00 AM', round: 'Managerial Round', status: 'Pending' },
  { id: 5, candidateName: 'Olivia Moore', jobTitle: 'Data Analyst', interviewer: 'William Anderson', date: '2023-11-05', time: '03:00 PM', round: 'Technical Round 2', status: 'Rescheduled' },
  { id: 6, candidateName: 'William Jackson', jobTitle: 'Backend Developer', interviewer: 'Richard Thomas', date: '2023-11-06', time: '11:30 AM', round: 'Technical Round 1', status: 'Completed' },
  { id: 7, candidateName: 'Sophia White', jobTitle: 'Content Writer', interviewer: 'Patricia Martinez', date: '2023-11-07', time: '10:30 AM', round: 'Screening', status: 'Scheduled' },
  { id: 8, candidateName: 'Alexander Harris', jobTitle: 'DevOps Engineer', interviewer: 'Charles Clark', date: '2023-11-08', time: '04:00 PM', round: 'Technical Round 2', status: 'Cancelled' },
  { id: 9, candidateName: 'Charlotte Clark', jobTitle: 'Sales Executive', interviewer: 'Susan Lewis', date: '2023-11-09', time: '01:00 PM', round: 'HR Round', status: 'Scheduled' },
  { id: 10, candidateName: 'Benjamin Lewis', jobTitle: 'Customer Support', interviewer: 'Joseph Robinson', date: '2023-11-10', time: '12:00 PM', round: 'Screening', status: 'Completed' }
];

const Resumes = () => {
  // Core Operational States
  const [data, setData] = useState(initialResumesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Interactive Filter Toggles (Ref Image 2 & 3)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [columnsVisibility, setColumnsVisibility] = useState({
    checkbox: true,
    id: false, // Hidden default matched to Reference image 2
    candidateName: true,
    jobTitle: true,
    interviewer: true,
    date: true,
    time: true,
    round: true,
    status: true,
    actions: true
  });

  // Modals Framework Configurations
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [activeItem, setActiveItem] = useState(null);
  
  // Form input controllers binding
  const [formData, setFormData] = useState({
    candidateName: '', jobTitle: '', interviewer: '', 
    date: '2026-07-06', time: '', round: 'Screening', status: 'Scheduled'
  });

  // Pagination setups placeholders
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Formatting utilities matching template dates safely
  const formatTableDate = (dateString) => {
    if(!dateString) return '';
    const parts = dateString.split('-');
    if(parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}`; // MM/DD/YYYY to match Reference View 1
    }
    return dateString;
  };

  // Global Actions Operations
  const handleRefresh = () => {
    setData(initialResumesData);
    setSearchQuery('');
    setSelectedRows([]);
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'interview_schedule_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Row selection handler controls
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Modal Lifecycle Interactions
  const openAddModal = () => {
    setFormData({
      candidateName: '', jobTitle: '', interviewer: '', 
      date: '2026-07-06', time: '', round: 'Screening', status: 'Scheduled'
    });
    setModalType('add');
  };

  const openEditModal = (item) => {
    setActiveItem(item);
    setFormData({ ...item });
    setModalType('edit');
  };

  const openDeleteModal = (item) => {
    setActiveItem(item);
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setActiveItem(null);
  };

  // Form Submissions Methods
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newEntry = {
        id: Date.now(),
        ...formData
      };
      setData([newEntry, ...data]);
    } else if (modalType === 'edit') {
      setData(data.map(item => item.id === activeItem.id ? { ...item, ...formData } : item));
    }
    closeModal();
  };

  const handleDeleteConfirm = () => {
    setData(data.filter(item => item.id !== activeItem.id));
    setSelectedRows(selectedRows.filter(id => id !== activeItem.id));
    closeModal();
  };

  const toggleColumn = (colName) => {
    setColumnsVisibility({ ...columnsVisibility, [colName]: !columnsVisibility[colName] });
  };

  // Dynamic Query Filter Evaluation Pipeline
  const filteredData = data.filter(item => {
    const search = searchQuery.toLowerCase();
    return (
      item.candidateName.toLowerCase().includes(search) ||
      item.jobTitle.toLowerCase().includes(search) ||
      item.interviewer.toLowerCase().includes(search) ||
      item.round.toLowerCase().includes(search) ||
      item.status.toLowerCase().includes(search)
    );
  });

  return (
    <div className="Resumes">
      {/* Top Header Section */}
      <div className="Resumes-header-bar">
        <h1 className="Resumes-main-title">Interview Schedule</h1>
        <div className="Resumes-breadcrumb">
          <FiHome className="Resumes-breadcrumb-home" />
          <span className="Resumes-breadcrumb-link">Jobs</span>
          <FiChevronRight className="Resumes-breadcrumb-arrow" />
          <span className="Resumes-breadcrumb-current">Interview Schedule</span>
        </div>
      </div>

      {/* Control Action Toolbar */}
      <div className="Resumes-table-controls">
        <div className="Resumes-search-wrapper">
          <FiSearch className="Resumes-search-icon" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="Resumes-search-input"
          />
        </div>

        <div className="Resumes-action-buttons">
          {/* Column Show/Hide Filter Dropdown Anchor */}
          <div className="Resumes-filter-container">
            <button 
              className={`Resumes-btn-icon ${showFilterDropdown ? 'active' : ''}`}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              title="Show/Hide Columns"
            >
              <FiFilter />
            </button>
            
            {showFilterDropdown && (
              <div className="Resumes-column-dropdown">
                <div className="Resumes-column-dropdown-title">Show/Hide Column</div>
                <div className="Resumes-column-dropdown-divider"></div>
                <div className="Resumes-column-dropdown-list">
                  {Object.keys(columnsVisibility).map((colKey) => (
                    <label key={colKey} className="Resumes-column-dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={columnsVisibility[colKey]} 
                        onChange={() => toggleColumn(colKey)}
                        className="Resumes-custom-checkbox-input"
                      />
                      <span className="Resumes-column-dropdown-label-text">
                        {colKey === 'candidateName' ? 'Candidate Name' :
                         colKey === 'jobTitle' ? 'Job Title' :
                         colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="Resumes-btn-icon Resumes-btn-add" onClick={openAddModal} title="Add New"><FiPlus /></button>
          <button className="Resumes-btn-icon" onClick={handleRefresh} title="Refresh Table"><FiRotateCw /></button>
          <button className="Resumes-btn-icon" onClick={handleDownload} title="Export CSV Data"><FiDownload /></button>
        </div>
      </div>

      {/* Primary Data Table Display */}
      <div className="Resumes-table-container">
        <table className="Resumes-table">
          <thead>
            <tr>
              {columnsVisibility.checkbox && (
                <th className="Resumes-th-checkbox">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                    className="Resumes-custom-checkbox-input"
                  />
                </th>
              )}
              {columnsVisibility.id && <th>ID</th>}
              {columnsVisibility.candidateName && <th>Candidate Name</th>}
              {columnsVisibility.jobTitle && <th>Job Title</th>}
              {columnsVisibility.interviewer && <th>Interviewer</th>}
              {columnsVisibility.date && <th>Date</th>}
              {columnsVisibility.time && <th>Time</th>}
              {columnsVisibility.round && <th>Round</th>}
              {columnsVisibility.status && <th>Status</th>}
              {columnsVisibility.actions && <th className="Resumes-th-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id} className={selectedRows.includes(row.id) ? 'Resumes-tr-selected' : ''}>
                  {columnsVisibility.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="Resumes-custom-checkbox-input"
                      />
                    </td>
                  )}
                  {columnsVisibility.id && <td>{row.id}</td>}
                  {columnsVisibility.candidateName && <td className="Resumes-td-highlight">{row.candidateName}</td>}
                  {columnsVisibility.jobTitle && <td>{row.jobTitle}</td>}
                  {columnsVisibility.interviewer && <td>{row.interviewer}</td>}
                  {columnsVisibility.date && (
                    <td>
                      <div className="Resumes-date-cell">
                        <FiCalendar className="Resumes-cell-icon-calendar" />
                        <span>{formatTableDate(row.date)}</span>
                      </div>
                    </td>
                  )}
                  {columnsVisibility.time && <td>{row.time}</td>}
                  {columnsVisibility.round && <td>{row.round}</td>}
                  {columnsVisibility.status && (
                    <td>
                      <span className={`Resumes-status-badge Resumes-status-${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {columnsVisibility.actions && (
                    <td>
                      <div className="Resumes-actions-cell-wrapper">
                        <button className="Resumes-action-edit-btn" onClick={() => openEditModal(row)}><FiEdit /></button>
                        <button className="Resumes-action-delete-btn" onClick={() => openDeleteModal(row)}><FiTrash2 /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="Resumes-table-empty">No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Info Footer */}
      <div className="Resumes-pagination-bar">
        <div className="Resumes-pagination-size-selector">
          <span>Items per page:</span>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="Resumes-pagination-info-range">
          1 - {filteredData.length} of {data.length}
          <div className="Resumes-pagination-navigation-arrows">
            <button disabled>&lt;</button>
            <button disabled>&gt;</button>
          </div>
        </div>
      </div>

      {/* ================= MODAL OVERLAYS INJECTION LAYER ================= */}
      
      {/* ADD / EDIT MODALS FRAMEWORK (Ref Image 4 & 5) */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="Resumes-modal-backdrop">
          <div className="Resumes-form-modal-card">
            <div className="Resumes-form-modal-header">
              <h2>{modalType === 'add' ? 'New Interview Schedule' : 'Edit Interview'}</h2>
              <button className="Resumes-form-modal-close-x" onClick={closeModal}>&times;</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="Resumes-modal-form-element">
              <div className="Resumes-form-grid-layout">
                <div className="Resumes-form-input-group">
                  <label>Candidate Name*</label>
                  <div className="Resumes-form-input-icon-wrapper">
                    <input 
                      type="text" 
                      required
                      placeholder="Candidate Name"
                      value={formData.candidateName}
                      onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
                    />
                    <FiUser className="Resumes-form-field-icon" />
                  </div>
                </div>

                <div className="Resumes-form-input-group">
                  <label>Job Title*</label>
                  <div className="Resumes-form-input-icon-wrapper">
                    <input 
                      type="text" 
                      required
                      placeholder="Job Title"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    />
                    <FiBriefcase className="Resumes-form-field-icon" />
                  </div>
                </div>

                <div className="Resumes-form-input-group">
                  <label>Interviewer*</label>
                  <div className="Resumes-form-input-icon-wrapper">
                    <input 
                      type="text" 
                      required
                      placeholder="Interviewer"
                      value={formData.interviewer}
                      onChange={(e) => setFormData({...formData, interviewer: e.target.value})}
                    />
                    <FiUser className="Resumes-form-field-icon" />
                  </div>
                </div>

                <div className="Resumes-form-input-group float-label-mode">
                  <span className="Resumes-floating-top-label">Date*</span>
                  <div className="Resumes-form-input-icon-wrapper">
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="Resumes-form-input-group">
                  <label>Time*</label>
                  <div className="Resumes-form-input-icon-wrapper">
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 10:00 AM"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                    <FiClock className="Resumes-form-field-icon" />
                  </div>
                </div>

                <div className="Resumes-form-input-group float-label-mode">
                  <span className="Resumes-floating-top-label">Round*</span>
                  <div className="Resumes-form-input-icon-wrapper">
                    <select 
                      value={formData.round}
                      onChange={(e) => setFormData({...formData, round: e.target.value})}
                    >
                      <option value="Screening">Screening</option>
                      <option value="Technical Round 1">Technical Round 1</option>
                      <option value="Technical Round 2">Technical Round 2</option>
                      <option value="HR Round">HR Round</option>
                      <option value="Managerial Round">Managerial Round</option>
                    </select>
                    <FiLayers className="Resumes-form-field-icon select-down-fix" />
                  </div>
                </div>
              </div>

              <div className="Resumes-form-input-group full-width float-label-mode">
                <span className="Resumes-floating-top-label">Status*</span>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="Resumes-form-actions-row">
                <button 
                  type="submit" 
                  className={`Resumes-form-btn-submit ${modalType === 'edit' ? 'edit-blue' : ''}`}
                >
                  Save
                </button>
                <button type="button" className="Resumes-form-btn-cancel" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL OVERLAY (Ref Image 6) */}
      {modalType === 'delete' && activeItem && (
        <div className="Resumes-modal-backdrop flex-center-mode">
          <div className="Resumes-delete-alert-box">
            <h2 className="Resumes-delete-title-prompt">Are you sure?</h2>
            <p className="Resumes-delete-subtitle-prompt">Are you sure you want to delete this interview schedule?</p>
            
            <div className="Resumes-delete-item-spec-sheet">
              <div className="Resumes-delete-spec-line">Candidate: <strong>{activeItem.candidateName}</strong></div>
              <div className="Resumes-delete-spec-line">Date: <strong>{activeItem.date}</strong></div>
            </div>

            <div className="Resumes-delete-actions-footer">
              <button className="Resumes-delete-btn-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="Resumes-delete-btn-cancel" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resumes;