import React, { useState, useMemo } from 'react';
import './PerformanceReviews.css';

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Doe', reviewer: 'Admin', date: '2026-01-10', period: 'Q4 2025', score: 85, status: 'Published', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60', comments: 'Great performance overall.' },
  { id: 2, name: 'Sarah Smith', reviewer: 'John Doe', date: '2026-01-12', period: 'Q4 2025', score: 70, status: 'Draft', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 3, name: 'Michael Brown', reviewer: 'Admin', date: '2025-12-20', period: 'Annual 2025', score: 95, status: 'Published', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 4, name: 'Emily Davis', reviewer: 'Michael Brown', date: '2026-01-15', period: 'Q4 2025', score: 88, status: 'In Review', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 5, name: 'Robert Wilson', reviewer: 'Admin', date: '2026-01-18', period: 'Q4 2025', score: 65, status: 'Published', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 6, name: 'Jennifer Lee', reviewer: 'John Doe', date: '2026-01-22', period: 'Q4 2025', score: 92, status: 'Published', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 7, name: 'David Miller', reviewer: 'Admin', date: '2026-01-25', period: 'Q4 2025', score: 78, status: 'Draft', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 8, name: 'Lisa Wang', reviewer: 'Michael Brown', date: '2026-01-28', period: 'Q4 2025', score: 85, status: 'In Review', avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 9, name: 'Kevin Jones', reviewer: 'Admin', date: '2026-02-01', period: 'Annual 2025', score: 90, status: 'Published', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 10, name: 'Amy Chen', reviewer: 'John Doe', date: '2026-02-05', period: 'Q4 2025', score: 82, status: 'Published', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 11, name: 'James Wilson', reviewer: 'Admin', date: '2026-02-10', period: 'Q4 2025', score: 79, status: 'Draft', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 12, name: 'Olivia Martinez', reviewer: 'Lisa Wang', date: '2026-02-12', period: 'Q4 2025', score: 87, status: 'Published', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 13, name: 'William Taylor', reviewer: 'Admin', date: '2026-02-15', period: 'Q4 2025', score: 91, status: 'In Review', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 14, name: 'Sophia Anderson', reviewer: 'Sarah Smith', date: '2026-02-18', period: 'Annual 2025', score: 73, status: 'Draft', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60', comments: '' },
  { id: 15, name: 'Liam Thomas', reviewer: 'Admin', date: '2026-02-22', period: 'Q4 2025', score: 84, status: 'Published', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60', comments: '' }
];

const PerformanceReviews = () => {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isItemsDropdownOpen, setIsItemsDropdownOpen] = useState(false);

  // Column Show/Hide States
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    id: false,
    employeeName: true,
    reviewer: true,
    reviewDate: true,
    reviewPeriod: true,
    score: true,
    status: true,
    actions: true
  });

  // Modal States
  const [reviewModal, setReviewModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, data: null });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Form States & Errors
  const [formData, setFormData] = useState({ name: '', reviewer: '', date: '', period: '', score: '0', status: '', comments: '', avatar: '' });
  const [formErrors, setFormErrors] = useState({});

  // Filtered & Paginated items
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [employees, searchTerm]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  // Dynamic Item Range Text
  const itemsRangeText = useMemo(() => {
    if (filteredEmployees.length === 0) return '0 - 0 of 0';
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredEmployees.length);
    return `${start} - ${end} of ${filteredEmployees.length}`;
  }, [filteredEmployees, currentPage, itemsPerPage]);

  // Global Checkbox Selection Handlers
  const handleSelectAll = () => {
    const currentIds = currentTableData.map(e => e.id);
    const allSelected = currentIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !currentIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...currentIds])]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // CRUD Actions
  const openAddModal = () => {
    setFormData({ name: '', reviewer: '', date: '', period: '', score: '0', status: '', comments: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' });
    setFormErrors({});
    setReviewModal({ isOpen: true, mode: 'add', data: null });
  };

  const openEditModal = (employee) => {
    setFormData({ ...employee });
    setFormErrors({});
    setReviewModal({ isOpen: true, mode: 'edit', data: employee });
  };

  const handleFormSave = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Employee Name is required';
    if (!formData.reviewer) errors.reviewer = 'Reviewer is required';
    if (!formData.date) errors.date = 'Review date is required';
    if (!formData.period) errors.period = 'Review Period is required';
    if (!formData.status) errors.status = 'Status is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (reviewModal.mode === 'add') {
      const newReview = { ...formData, id: Date.now(), score: Number(formData.score) };
      setEmployees([newReview, ...employees]);
    } else {
      setEmployees(employees.map(e => e.id === reviewModal.data.id ? { ...formData, score: Number(formData.score) } : e));
    }
    setReviewModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleDeleteConfirm = () => {
    setEmployees(employees.filter(e => e.id !== deleteModal.data.id));
    setDeleteModal({ isOpen: false, data: null });
  };

  return (
    <div className="PerformanceReviews-container">
      {/* Header Breadcrumbs Navigation */}
      <div className="PerformanceReviews-header-top">
        <h2 className="PerformanceReviews-title">Performance Reviews</h2>
        <div className="PerformanceReviews-breadcrumbs">
          <svg className="PerformanceReviews-home-icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span className="PerformanceReviews-separator">&gt;</span>
          <span>Performance</span>
          <span className="PerformanceReviews-separator">&gt;</span>
          <span className="PerformanceReviews-active-crumb">Review</span>
        </div>
      </div>

      {/* Main Table Container Box */}
      <div className="PerformanceReviews-card">
        <div className="PerformanceReviews-toolbar">
          <div className="PerformanceReviews-toolbar-left">
            <span className="PerformanceReviews-list-title">Performance Reviews List</span>
            <div className="PerformanceReviews-search-box">
              <svg className="PerformanceReviews-search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              />
            </div>
          </div>

          <div className="PerformanceReviews-toolbar-right">
            {/* Show / Hide Column Action Button */}
            <div className="PerformanceReviews-action-wrapper">
              <button 
                className={`PerformanceReviews-tool-btn ${isColumnDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
                data-tooltip="show/hide column"
              >
                <svg viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
              </button>
              
              {isColumnDropdownOpen && (
                <div className="PerformanceReviews-columns-popup">
                  <div className="PerformanceReviews-popup-header">Show/Hide Column</div>
                  <div className="PerformanceReviews-popup-scrollable">
                    {Object.keys(visibleColumns).map((col) => (
                      <label key={col} className="PerformanceReviews-popup-label">
                        <input 
                          type="checkbox" 
                          checked={visibleColumns[col]} 
                          onChange={() => setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }))} 
                        />
                        <span className="PerformanceReviews-custom-cb"></span>
                        <span className="PerformanceReviews-capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add Review Action Button */}
            <button className="PerformanceReviews-tool-btn green-btn" onClick={openAddModal} data-tooltip="add">
              <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>

            {/* Refresh Action Button */}
            <button className="PerformanceReviews-tool-btn" onClick={() => setEmployees(INITIAL_EMPLOYEES)} data-tooltip="refersh">
              <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
            </button>

            {/* Excel Download Action Button with standard layout design */}
            <div className="PerformanceReviews-action-wrapper">
              <button className="PerformanceReviews-tool-btn blue-btn" data-tooltip="Xlsx Downlod">
                <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table Element */}
        <div className="PerformanceReviews-table-wrapper">
          <table className="PerformanceReviews-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th style={{ width: '50px' }}>
                    <label className="PerformanceReviews-table-checkbox">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={currentTableData.length > 0 && currentTableData.every(e => selectedIds.includes(e.id))}
                      />
                      <span className="PerformanceReviews-custom-cb"></span>
                    </label>
                  </th>
                )}
                {visibleColumns.id && <th>ID</th>}
                {visibleColumns.employeeName && <th>Employee Name</th>}
                {visibleColumns.reviewer && <th>Reviewer</th>}
                {visibleColumns.reviewDate && <th>Review Date</th>}
                {visibleColumns.reviewPeriod && <th>Review Period</th>}
                {visibleColumns.score && <th>Score</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((emp) => (
                <tr key={emp.id} className={selectedIds.includes(emp.id) ? 'row-selected' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <label className="PerformanceReviews-table-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(emp.id)}
                          onChange={() => handleSelectRow(emp.id)}
                        />
                        <span className="PerformanceReviews-custom-cb"></span>
                      </label>
                    </td>
                  )}
                  {visibleColumns.id && <td>{emp.id}</td>}
                  {visibleColumns.employeeName && (
                    <td>
                      <div className="PerformanceReviews-emp-cell">
                        <img src={emp.avatar} alt={emp.name} className="PerformanceReviews-avatar" />
                        <span className="PerformanceReviews-emp-name">{emp.name}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.reviewer && <td>{emp.reviewer}</td>}
                  {visibleColumns.reviewDate && (
                    <td>
                      <div className="PerformanceReviews-date-cell">
                        <svg className="PerformanceReviews-inline-cal" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                        <span>{new Date(emp.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.reviewPeriod && <td>{emp.period}</td>}
                  {visibleColumns.score && <td>{emp.score}</td>}
                  {visibleColumns.status && (
                    <td>
                      <span className={`PerformanceReviews-status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                        {emp.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td>
                      <div className="PerformanceReviews-actions-cell">
                        <button className="PerformanceReviews-row-action-btn edit-icon" onClick={() => openEditModal(emp)}>
                          <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                        </button>
                        <button className="PerformanceReviews-row-action-btn delete-icon" onClick={() => setDeleteModal({ isOpen: true, data: emp })}>
                          <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Professional Pagination Architecture Layout Section */}
        <div className="PerformanceReviews-pagination-container">
          <div className="PerformanceReviews-pagination-right">
            <span className="PerformanceReviews-ipp-text">Items per page:</span>
            <div className="PerformanceReviews-ipp-dropdown-wrapper">
              <button 
                className="PerformanceReviews-ipp-select" 
                onClick={() => setIsItemsDropdownOpen(!isItemsDropdownOpen)}
              >
                <span>{itemsPerPage}</span>
                <svg className={isItemsDropdownOpen ? 'flipped' : ''} viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
              </button>
              {isItemsDropdownOpen && (
                <ul className="PerformanceReviews-ipp-options">
                  {[5, 10, 25, 100].map(num => (
                    <li 
                      key={num} 
                      className={itemsPerPage === num ? 'selected' : ''}
                      onClick={() => { setItemsPerPage(num); setCurrentPage(1); setIsItemsDropdownOpen(false); }}
                    >
                      {num}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <span className="PerformanceReviews-page-range">{itemsRangeText}</span>

            <button 
              className="PerformanceReviews-pag-nav-btn" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              data-tooltip="previous page"
            >
              <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
            </button>
            <button 
              className={`PerformanceReviews-pag-nav-btn circle-next ${currentPage < totalPages ? 'active-next' : ''}`}
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              data-tooltip="next page"
            >
              <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Form Modal Module */}
      {reviewModal.isOpen && (
        <div className="PerformanceReviews-modal-overlay">
          <div className="PerformanceReviews-modal-box">
            <div className="PerformanceReviews-modal-header">
              <div className="PerformanceReviews-modal-title-layout">
                <img src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60'} alt="Form Context Avatar" className="PerformanceReviews-modal-avatar"/>
                <span>{reviewModal.mode === 'add' ? 'New Review' : formData.name}</span>
              </div>
              <button className="PerformanceReviews-modal-close" onClick={() => setReviewModal({ isOpen: false, mode: 'add', data: null })}>
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
            
            <div className="PerformanceReviews-modal-body">
              <div className="PerformanceReviews-form-grid">
                
                {/* Employee Name Input Form Field */}
                <div className={`PerformanceReviews-form-field ${formErrors.name ? 'field-error' : ''}`}>
                  <label className={formData.name ? 'shrink' : ''}>Employee Name*</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors(p => ({ ...p, name: '' })); }}
                  />
                  <svg className="field-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z"/></svg>
                  {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                </div>

                {/* Reviewer Input Form Field */}
                <div className={`PerformanceReviews-form-field ${formErrors.reviewer ? 'field-error' : ''}`}>
                  <label className={formData.reviewer ? 'shrink' : ''}>Reviewer*</label>
                  <input 
                    type="text" 
                    value={formData.reviewer} 
                    onChange={(e) => { setFormData({ ...formData, reviewer: e.target.value }); setFormErrors(p => ({ ...p, reviewer: '' })); }}
                  />
                  <svg className="field-icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  {formErrors.reviewer && <span className="error-text">{formErrors.reviewer}</span>}
                </div>

                {/* Interactive Review Date Calendar Form Field */}
                <div className={`PerformanceReviews-form-field ${formErrors.date ? 'field-error' : ''}`}>
                  <label className="shrink">Review Date*</label>
                  <div className="PerformanceReviews-date-input-container" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                    <input type="text" readOnly value={formData.date} placeholder="YYYY-MM-DD" />
                    <svg className="field-icon blue-calendar" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                  </div>
                  {formErrors.date && <span className="error-text">{formErrors.date}</span>}
                  
                  {isDatePickerOpen && (
                    <div className="PerformanceReviews-custom-datepicker">
                      <div className="dp-header">
                        <span>2026 JUL</span>
                        <div className="dp-arrows"><span>&lt;</span><span>&gt;</span></div>
                      </div>
                      <div className="dp-weekdays">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                      </div>
                      <div className="dp-days">
                        <span className="empty"></span><span className="empty"></span><span className="empty"></span>
                        {['1','2','3'].map(d => <span key={d} onClick={() => { setFormData({...formData, date: `2026-07-0${d}`}); setIsDatePickerOpen(false); setFormErrors(p => ({ ...p, date: '' })); }}>{d}</span>)}
                        <span className="selected-day" onClick={() => { setFormData({...formData, date: '2026-07-04'}); setIsDatePickerOpen(false); setFormErrors(p => ({ ...p, date: '' })); }}>4</span>
                        {Array.from({length: 27}, (_, i) => i + 5).map(d => (
                          <span key={d} onClick={() => { setFormData({...formData, date: `2026-07-${d}`}); setIsDatePickerOpen(false); setFormErrors(p => ({ ...p, date: '' })); }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Review Period Input Form Field */}
                <div className={`PerformanceReviews-form-field ${formErrors.period ? 'field-error' : ''}`}>
                  <label className={formData.period ? 'shrink' : ''}>Review Period*</label>
                  <input 
                    type="text" 
                    value={formData.period} 
                    onChange={(e) => { setFormData({ ...formData, period: e.target.value }); setFormErrors(p => ({ ...p, period: '' })); }}
                  />
                  <svg className="field-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                  {formErrors.period && <span className="error-text">{formErrors.period}</span>}
                </div>

                {/* Score Input Form Field with outline legends */}
                <div className="PerformanceReviews-form-field score-fieldset">
                  <span className="fieldset-legend">Score (0-100)*</span>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={formData.score} 
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  />
                  <svg className="field-icon" viewBox="0 0 24 24"><path d="M5 9.2h14V11H5zM5 5h14v1.8H5zm0 8.4h14v1.8H5zM5 17h14v1.8H5z"/></svg>
                </div>

                {/* Status Dropdown Selection Field */}
                <div className={`PerformanceReviews-form-field select-field ${formErrors.status ? 'field-error' : ''}`}>
                  <label className={formData.status ? 'shrink' : ''}>Status*</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => { setFormData({ ...formData, status: e.target.value }); setFormErrors(p => ({ ...p, status: '' })); }}
                  >
                    <option value=""></option>
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <svg className="field-icon dropdown-chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                  {formErrors.status && <span className="error-text">{formErrors.status}</span>}
                </div>

                {/* Comments Multiline Textarea Form Component Row */}
                <div className="PerformanceReviews-form-field full-width">
                  <label className={formData.comments ? 'shrink' : ''}>Comments</label>
                  <textarea 
                    rows="3" 
                    value={formData.comments} 
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  />
                  <svg className="field-icon text-area-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                </div>
              </div>

              {/* Form Action Controls Row */}
              <div className="PerformanceReviews-form-actions">
                <button className="PerformanceReviews-btn-save" onClick={handleFormSave}>Save</button>
                <button className="PerformanceReviews-btn-cancel" onClick={() => setReviewModal({ isOpen: false, mode: 'add', data: null })}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Small Delete Prompt Dialog Window Box */}
      {deleteModal.isOpen && (
        <div className="PerformanceReviews-modal-overlay">
          <div className="PerformanceReviews-delete-box">
            <h3>Are you sure?</h3>
            <div className="PerformanceReviews-delete-details">
              <p><strong>Employee Name:</strong> {deleteModal.data?.name}</p>
              <p><strong>Reviewer:</strong> {deleteModal.data?.reviewer}</p>
              <p><strong>Period:</strong> {deleteModal.data?.period}</p>
            </div>
            <div className="PerformanceReviews-delete-actions">
              <button className="PerformanceReviews-btn-delete-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="PerformanceReviews-btn-cancel-confirm" onClick={() => setDeleteModal({ isOpen: false, data: null })}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceReviews;