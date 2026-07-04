import React, { useState, useRef, useEffect } from 'react';
import './Appraisals.css';

// Initial Mock Data (15 Employees)
const initialEmployees = [
  { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", department: "Engineering", designation: "Software Engineer", date: "2025-12-15", type: "Annual", status: "Completed", rating: "4 Star" },
  { id: 2, name: "Sarah Smith", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60", department: "Infrastructure", designation: "System Admin", date: "2025-11-20", type: "Quarterly", status: "In Progress", rating: "1 Star" },
  { id: 3, name: "Michael ...", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60", department: "R&D", designation: "Researcher", date: "2025-10-10", type: "Annual", status: "Pending", rating: "-" },
  { id: 4, name: "Emily Da...", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60", department: "Software Devel...", designation: "Tech Lead", date: "2025-09-05", type: "Quarterly", status: "Completed", rating: "5 Star" },
  { id: 5, name: "Robert ...", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", department: "Data Science", designation: "Data Analyst", date: "2025-08-15", type: "Annual", status: "Completed", rating: "2 Star" },
  { id: 6, name: "Jennifer ...", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60", department: "Marketing", designation: "Marketing Spe...", date: "2025-07-10", type: "Quarterly", status: "Completed", rating: "4 Star" },
  { id: 7, name: "David Mi...", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60", department: "Sales", designation: "Sales Executive", date: "2025-06-20", type: "Annual", status: "In Progress", rating: "3 Star" },
  { id: 8, name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=60", department: "Finance", designation: "Accountant", date: "2025-05-15", type: "Quarterly", status: "Pending", rating: "-" },
  { id: 9, name: "Kevin Jo...", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=60", department: "HR", designation: "HR Manager", date: "2025-04-10", type: "Annual", status: "Completed", rating: "5 Star" },
  { id: 10, name: "Amy Chen", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=60", department: "Operations", designation: "Operations An...", date: "2025-03-05", type: "Quarterly", status: "Completed", rating: "4 Star" },
  { id: 11, name: "James Wil...", avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=80&auto=format&fit=crop&q=60", department: "Engineering", designation: "Frontend Dev", date: "2025-02-12", type: "Annual", status: "Completed", rating: "4 Star" },
  { id: 12, name: "Rachel Green", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", department: "Marketing", designation: "PR Manager", date: "2025-01-20", type: "Quarterly", status: "In Progress", rating: "3 Star" },
  { id: 13, name: "Chris Evans", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60", department: "R&D", designation: "Lead Scientist", date: "2025-01-10", type: "Annual", status: "Pending", rating: "-" },
  { id: 14, name: "Jessica Al...", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60", department: "Sales", designation: "Regional Head", date: "2025-03-24", type: "Semi-Annual", status: "Completed", rating: "5 Star" },
  { id: 15, name: "Bruce Wayne", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", department: "Executive", designation: "CEO", date: "2025-06-30", type: "Annual", status: "Completed", rating: "5 Star" },
];

const Appraisals = () => {
  // Core List State
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Column Visibility Control
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    employeeName: true,
    department: true,
    designation: true,
    appraisalDate: true,
    appraisalType: true,
    status: true,
    rating: true,
    actions: true,
  });

  // Modal Window System
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [targetEmployee, setTargetEmployee] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '', department: '', designation: '', type: '', date: '', status: '', rating: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);

  const dropdownRef = useRef(null);

  // Close visibility drop-menu outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.closest('.Appraisals-btn-col')) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Sync validation error corrections immediately on typing
  const handleInputChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    if (value.trim() !== '') {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Master Checkbox Logic
  const filteredData = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = () => {
    const currentItemIds = currentItems.map(item => item.id);
    const allSelected = currentItemIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !currentItemIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...currentItemIds])]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item.id !== id) : [...prev, id]
    );
  };

  // Action Launchers
  const openAddModal = () => {
    setFormValues({ name: '', department: '', designation: '', type: '', date: '', status: '', rating: '' });
    setFormErrors({});
    setModalMode('add');
  };

  const openEditModal = (emp) => {
    setTargetEmployee(emp);
    setFormValues({
      name: emp.name,
      department: emp.department,
      designation: emp.designation,
      type: emp.type,
      date: emp.date,
      status: emp.status,
      rating: emp.rating
    });
    setFormErrors({});
    setModalMode('edit');
  };

  const openDeleteModal = (emp) => {
    setTargetEmployee(emp);
    setModalMode('delete');
  };

  // Processing Submissions
  const validateForm = () => {
    let errors = {};
    if (!formValues.name) errors.name = "Employee Name is required";
    if (!formValues.department) errors.department = "Department is required";
    if (!formValues.designation) errors.designation = "Designation is required";
    if (!formValues.type) errors.type = "Appraisal Type is required";
    if (!formValues.date) errors.date = "Appraisal Date is required";
    if (!formValues.status) errors.status = "Status is required";
    if (!formValues.rating) errors.rating = "Rating is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAppraisal = () => {
    if (!validateForm()) return;

    if (modalMode === 'add') {
      const newEntry = {
        id: Date.now(),
        name: formValues.name,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=60",
        department: formValues.department,
        designation: formValues.designation,
        date: formValues.date,
        type: formValues.type,
        status: formValues.status,
        rating: formValues.rating
      };
      setEmployees([newEntry, ...employees]);
    } else if (modalMode === 'edit') {
      setEmployees(employees.map(emp => emp.id === targetEmployee.id ? { ...emp, ...formValues } : emp));
    }
    setModalMode(null);
  };

  const handleDeleteConfirm = () => {
    setEmployees(employees.filter(emp => emp.id !== targetEmployee.id));
    setModalMode(null);
  };

  return (
    <div className="Appraisals-container">
      {/* Breadcrumb Header Line */}
      <div className="Appraisals-header">
        <h2>Appraisal</h2>
        <div className="Appraisals-breadcrumb">
          <span className="Appraisals-home-icon">🏠</span> 
          <span className="Appraisals-arrow">&gt;</span> Performance 
          <span className="Appraisals-arrow">&gt;</span> Appraisal
        </div>
      </div>

      {/* Main Table Card Shell */}
      <div className="Appraisals-card">
        {/* Search and Action Icon Header Group */}
        <div className="Appraisals-toolbar">
          <div className="Appraisals-search-box">
            <span className="Appraisals-title-label">Appraisal List</span>
            <div className="Appraisals-search-input-wrapper">
              <span className="Appraisals-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="Appraisals-action-buttons">
            <div className="Appraisals-tooltip-container">
              <button className="Appraisals-btn-col" onClick={() => setShowColumnDropdown(!showColumnDropdown)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm5 7h8v-2H8v2z"/></svg>
              </button>
              <span className="Appraisals-tooltiptext">show/hide column</span>
            </div>

            <div className="Appraisals-tooltip-container">
              <button className="Appraisals-btn-add" onClick={openAddModal}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </button>
              <span className="Appraisals-tooltiptext">add</span>
            </div>

            <div className="Appraisals-tooltip-container">
              <button className="Appraisals-btn-refresh" onClick={() => setEmployees(initialEmployees)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              </button>
              <span className="Appraisals-tooltiptext">refersh</span>
            </div>

            <div className="Appraisals-tooltip-container">
              <button className="Appraisals-btn-download">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              </button>
              <span className="Appraisals-tooltiptext">Xlsx Downlod</span>
            </div>

            {/* Managed Column Visibility Overlay List */}
            {showColumnDropdown && (
              <div className="Appraisals-col-dropdown" ref={dropdownRef}>
                <div className="Appraisals-dropdown-header">Show/Hide Column</div>
                <div className="Appraisals-dropdown-body">
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="Appraisals-dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col]} 
                        onChange={() => setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }))}
                      />
                      <span>{col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Presentation View Grid */}
        <div className="Appraisals-table-wrapper">
          <table className="Appraisals-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th style={{ width: '50px' }}>
                    <input 
                      type="checkbox" 
                      checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(item.id))}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {visibleColumns.employeeName && <th>Employee Name</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.designation && <th>Designation</th>}
                {visibleColumns.appraisalDate && <th>Appraisal Date</th>}
                {visibleColumns.appraisalType && <th>Appraisal Type</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.rating && <th>Rating</th>}
                {visibleColumns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((emp) => (
                <tr key={emp.id} className={selectedIds.includes(emp.id) ? 'selected-row' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(emp.id)} 
                        onChange={() => handleSelectRow(emp.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.employeeName && (
                    <td>
                      <div className="Appraisals-profile-cell">
                        <img src={emp.avatar} alt={emp.name} className="Appraisals-avatar" />
                        <span>{emp.name}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.department && <td>{emp.department}</td>}
                  {visibleColumns.designation && <td>{emp.designation}</td>}
                  {visibleColumns.appraisalDate && (
                    <td>
                      <span className="Appraisals-date-badge">📅 {emp.date}</span>
                    </td>
                  )}
                  {visibleColumns.appraisalType && <td>{emp.type}</td>}
                  {visibleColumns.status && (
                    <td>
                      <span className={`Appraisals-status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                        {emp.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.rating && <td>{emp.rating}</td>}
                  {visibleColumns.actions && (
                    <td>
                      <div className="Appraisals-row-actions">
                        <button className="Appraisals-action-edit" onClick={() => openEditModal(emp)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="Appraisals-action-delete" onClick={() => openDeleteModal(emp)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Operational Grid Pagination Controls */}
        <div className="Appraisals-pagination-bar">
          <div className="Appraisals-items-per-page">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="Appraisals-pagination-info">
            <span>{`${startIndex + 1} – ${Math.min(startIndex + itemsPerPage, filteredData.length)} of ${filteredData.length}`}</span>
            <div className="Appraisals-pagination-arrows">
              <div className="Appraisals-tooltip-container">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span className="Appraisals-tooltiptext">previous page</span>
              </div>
              <div className="Appraisals-tooltip-container">
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
                <span className="Appraisals-tooltiptext">next page</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Appraisal Form Window overlay */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="Appraisals-modal-overlay">
          <div className="Appraisals-modal-box">
            <div className="Appraisals-modal-header">
              <div className="Appraisals-modal-title">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" alt="Avatar" className="Appraisals-modal-avatar" />
                <span>New Appraisal</span>
              </div>
              <button className="Appraisals-modal-close" onClick={() => setModalMode(null)}>&times;</button>
            </div>
            
            <div className="Appraisals-modal-body">
              <div className="Appraisals-form-grid">
                
                <div className={`Appraisals-form-group ${formErrors.name ? 'has-error' : ''}`}>
                  <label>Employee Name*</label>
                  <div className="Appraisals-input-icon-wrapper">
                    <input 
                      type="text" 
                      value={formValues.name} 
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <span className="Appraisals-field-icon">👤</span>
                  </div>
                  {formErrors.name && <span className="Appraisals-error-msg">{formErrors.name}</span>}
                </div>

                <div className={`Appraisals-form-group ${formErrors.department ? 'has-error' : ''}`}>
                  <label>Department*</label>
                  <div className="Appraisals-input-icon-wrapper">
                    <input 
                      type="text" 
                      value={formValues.department} 
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                    <span className="Appraisals-field-icon">🏢</span>
                  </div>
                  {formErrors.department && <span className="Appraisals-error-msg">{formErrors.department}</span>}
                </div>

                <div className={`Appraisals-form-group ${formErrors.designation ? 'has-error' : ''}`}>
                  <label>Designation*</label>
                  <div className="Appraisals-input-icon-wrapper">
                    <input 
                      type="text" 
                      value={formValues.designation} 
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                    />
                    <span className="Appraisals-field-icon">💼</span>
                  </div>
                  {formErrors.designation && <span className="Appraisals-error-msg">{formErrors.designation}</span>}
                </div>

                <div className={`Appraisals-form-group ${formErrors.type ? 'has-error' : ''}`}>
                  <label>Appraisal Type*</label>
                  <div className="Appraisals-select-wrapper">
                    <select 
                      value={formValues.type} 
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Annual">Annual</option>
                      <option value="Semi-Annual">Semi-Annual</option>
                      <option value="Quarterly">Quarterly</option>
                    </select>
                  </div>
                  {formErrors.type && <span className="Appraisals-error-msg">{formErrors.type}</span>}
                </div>

                <div className={`Appraisals-form-group ${formErrors.date ? 'has-error' : ''}`}>
                  <label>Appraisal Date*</label>
                  <div className="Appraisals-input-icon-wrapper" onClick={() => setShowCustomCalendar(!showCustomCalendar)}>
                    <input 
                      type="text" 
                      value={formValues.date} 
                      readOnly 
                      placeholder="YYYY-MM-DD"
                    />
                    <span className="Appraisals-field-icon">📅</span>
                    
                    {showCustomCalendar && (
                      <div className="Appraisals-custom-calendar" onClick={(e) => e.stopPropagation()}>
                        <div className="Appraisals-calendar-header">
                          <span>2026 JUL</span>
                          <div>
                            <button>&lt;</button>
                            <button>&gt;</button>
                          </div>
                        </div>
                        <div className="Appraisals-calendar-days-grid">
                          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="calendar-day-head">{d}</div>)}
                          {[...Array(3)].map((_, i) => <div key={`empty-${i}`}></div>)}
                          {[...Array(31)].map((_, i) => (
                            <div 
                              key={i+1} 
                              className={`calendar-day-cell ${i+1 === 4 ? 'active-day' : ''}`}
                              onClick={() => {
                                handleInputChange('date', `2026-07-0${i+1}`);
                                setShowCustomCalendar(false);
                              }}
                            >
                              {i+1}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {formErrors.date && <span className="Appraisals-error-msg">{formErrors.date}</span>}
                </div>

                <div className={`Appraisals-form-group ${formErrors.status ? 'has-error' : ''}`}>
                  <label>Status*</label>
                  <div className="Appraisals-select-wrapper">
                    <select 
                      value={formValues.status} 
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  {formErrors.status && <span className="Appraisals-error-msg">{formErrors.status}</span>}
                </div>

                <div className={`Appraisals-form-group full-width ${formErrors.rating ? 'has-error' : ''}`}>
                  <label>Rating*</label>
                  <div className="Appraisals-select-wrapper">
                    <select 
                      value={formValues.rating} 
                      onChange={(e) => handleInputChange('rating', e.target.value)}
                    >
                      <option value=""></option>
                      <option value="1 Star">1 Star</option>
                      <option value="2 Star">2 Star</option>
                      <option value="3 Star">3 Star</option>
                      <option value="4 Star">4 Star</option>
                      <option value="5 Star">5 Star</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  {formErrors.rating && <span className="Appraisals-error-msg">{formErrors.rating}</span>}
                </div>

              </div>

              <div className="Appraisals-modal-footer">
                <button className="Appraisals-modal-btn-save" onClick={handleSaveAppraisal}>Save</button>
                <button className="Appraisals-modal-btn-cancel" onClick={() => setModalMode(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Delete Pop window overlay */}
      {modalMode === 'delete' && (
        <div className="Appraisals-modal-overlay">
          <div className="Appraisals-delete-box">
            <h3>Are you sure?</h3>
            <div className="Appraisals-delete-body-details">
              <p><strong>Employee Name:</strong> {targetEmployee?.name}</p>
              <p><strong>Department:</strong> {targetEmployee?.department}</p>
              <p><strong>Appraisal Type:</strong> {targetEmployee?.type}</p>
            </div>
            <div className="Appraisals-delete-footer-buttons">
              <button className="Appraisals-delete-btn-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="Appraisals-delete-btn-cancel" onClick={() => setModalMode(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appraisals;