import React, { useState, useMemo } from 'react';
import './EmployeeExit.css';
 
// Initial dummy records matching Screenshot 2026-07-03 125121.png
const INITIAL_DATA = [
  { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=49', exitDate: '2023-12-31', exitType: 'Resignation', reason: 'Career Growth', status: 'Completed' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?img=47', exitDate: '2023-11-15', exitType: 'Retirement', reason: 'Old Age', status: 'Completed' },
  { id: 3, name: 'Robert Johnson', avatar: 'https://i.pravatar.cc/150?img=12', exitDate: '2024-01-10', exitType: 'Termination', reason: 'Performance', status: 'In Progress' },
  { id: 4, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=53', exitDate: '2023-10-05', exitType: 'Resignation', reason: 'Better Offer', status: 'Completed' },
  { id: 5, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=32', exitDate: '2024-02-20', exitType: 'Resignation', reason: 'Personal', status: 'Pending' },
  { id: 6, name: 'William Wilson', avatar: 'https://i.pravatar.cc/150?img=60', exitDate: '2023-09-18', exitType: 'Termination', reason: 'Policy Violation', status: 'Completed' },
  { id: 7, name: 'Jessica Taylor', avatar: 'https://i.pravatar.cc/150?img=45', exitDate: '2024-03-15', exitType: 'Resignation', reason: 'Relocation', status: 'Pending' },
  { id: 8, name: 'David Anderson', avatar: 'https://i.pravatar.cc/150?img=59', exitDate: '2023-08-30', exitType: 'End of Contract', reason: 'Project End', status: 'Completed' },
  { id: 9, name: 'Linda Thomas', avatar: 'https://i.pravatar.cc/150?img=41', exitDate: '2023-07-14', exitType: 'Resignation', reason: 'Health Issues', status: 'Completed' },
  { id: 10, name: 'James Jackson', avatar: 'https://i.pravatar.cc/150?img=8', exitDate: '2024-04-01', exitType: 'Resignation', reason: 'Entrepreneurship', status: 'Pending' },
  { id: 11, name: 'Patricia White', avatar: 'https://i.pravatar.cc/150?img=5', exitDate: '2024-05-12', exitType: 'Resignation', reason: 'Personal Reasons', status: 'Completed' },
  { id: 12, name: 'Michael Harris', avatar: 'https://i.pravatar.cc/150?img=11', exitDate: '2024-06-01', exitType: 'Termination', reason: 'Attendance', status: 'In Progress' }
];

const EXIT_TYPES = ['Resignation', 'Retirement', 'Termination', 'End of Contract'];
const STATUS_OPTIONS = ['Completed', 'In Progress', 'Pending'];

const EmployeeExit = () => {
  // State variables
  const [data, setData] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal / Dropdown visibility states
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [formModal, setFormModal] = useState({ isOpen: false, type: 'add', targetId: null });

  // Column Visibility state matching Screenshot 2026-07-03 125229.png
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    employeeName: true,
    exitDate: true,
    exitType: true,
    reason: true,
    status: true,
    actions: true
  });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    exitDate: '2026-07-03',
    exitType: 'Resignation',
    status: 'Pending',
    reason: ''
  });

  // Search Filter logic
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exitType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Handle master checkbox select/deselect
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentIds = currentItems.map(item => item.id);
      setSelectedRows(prev => [...new Set([...prev, ...currentIds])]);
    } else {
      const currentIds = currentItems.map(item => item.id);
      setSelectedRows(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(prev => prev.filter(item => item !== id));
    } else {
      setSelectedRows(prev => [...prev, id]);
    }
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this exit record?")) {
      setData(prev => prev.filter(item => item.id !== id));
      setSelectedRows(prev => prev.filter(item => item !== id));
    }
  };

  // Open Add popup modal matching Screenshot 2026-07-03 125306.png
  const openAddModal = () => {
    setFormData({
      name: '',
      exitDate: new Date().toISOString().split('T')[0],
      exitType: 'Resignation',
      status: 'Pending',
      reason: ''
    });
    setFormModal({ isOpen: true, type: 'add', targetId: null });
  };

  // Open Edit popup modal matching Screenshot 2026-07-03 125204.png
  const openEditModal = (item) => {
    setFormData({
      name: item.name,
      exitDate: item.exitDate,
      exitType: item.exitType,
      status: item.status,
      reason: item.reason
    });
    setFormModal({ isOpen: true, type: 'edit', targetId: item.id });
  };

  // Handle Form Submission
  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.reason.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    if (formModal.type === 'add') {
      const newRecord = {
        id: Date.now(),
        name: formData.name,
        avatar: 'https://i.pravatar.cc/150?img=68',
        exitDate: formData.exitDate,
        exitType: formData.exitType,
        reason: formData.reason,
        status: formData.status
      };
      setData([newRecord, ...data]);
    } else {
      setData(prev => prev.map(item => 
        item.id === formModal.targetId ? { ...item, ...formData, name: formData.name } : item
      ));
    }
    setFormModal({ isOpen: false, type: 'add', targetId: null });
  };

  // Refresh Table Button Action
  const handleRefresh = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setData(INITIAL_DATA);
    setSelectedRows([]);
  };

  // Export Download CSV logic
  const handleDownloadCSV = () => {
    const headers = ['Employee Name', 'Exit Date', 'Exit Type', 'Reason', 'Status\n'];
    const csvRows = data.map(item => `"${item.name}","${item.exitDate}","${item.exitType}","${item.reason}","${item.status}"\n`);
    const blob = new Blob([headers.join(','), ...csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Employee_Exit_Report.csv');
    a.click();
  };

  return (
    <div className="ee-app-container">
      {/* Top Breadcrumb Navigation Header */}
      <div className="ee-breadcrumb-wrapper">
        <h2 className="ee-main-title">Employee Exit</h2>
        <div className="ee-crumbs">
          <span className="ee-crumb-icon">⌂</span>
          <span className="ee-crumb-separator">&gt;</span>
          <span>Employees</span>
          <span className="ee-crumb-separator">&gt;</span>
          <span className="ee-crumb-active">Exit</span>
        </div>
      </div>

      {/* Main Table Interface Area Container */}
      <div className="ee-card-panel">
        
        {/* Toolbar Header section matching control layouts */}
        <div className="ee-toolbar">
          <div className="ee-toolbar-left">
            <span className="ee-section-label">Employee Exit</span>
            <div className="ee-search-input-wrapper">
              <span className="ee-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="ee-search-control"
              />
            </div>
          </div>

          <div className="ee-toolbar-right">
            {/* Show/Hide column filter button toggle */}
            <div className="ee-dropdown-container">
              <button className="ee-action-btn" onClick={() => setShowColumnMenu(!showColumnMenu)} title="Show/Hide Columns">
                <svg viewBox="0 0 24 24" className="ee-icon-svg filter-icon"><path d="M3 4h18v2H3V4zm3 7h12v2H6v-2zm3 7h6v2H9v-2z"/></svg>
              </button>
              
              {showColumnMenu && (
                <div className="ee-column-menu-dropdown">
                  <div className="ee-dropdown-header">Show/Hide Column</div>
                  <div className="ee-dropdown-divider"></div>
                  <div className="ee-dropdown-body">
                    {Object.keys(columns).map((key) => (
                      <label key={key} className="ee-dropdown-item-label">
                        <input 
                          type="checkbox" 
                          checked={columns[key]} 
                          onChange={(e) => setColumns({ ...columns, [key]: e.target.checked })} 
                        />
                        <span className="ee-capitalize-text">{key.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Add Action `+` trigger button */}
            <button className="ee-action-btn add-btn" onClick={openAddModal} title="Add New Record">
              <svg viewBox="0 0 24 24" className="ee-icon-svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>

            {/* Live Refresh dataset trigger icon */}
            <button className="ee-action-btn" onClick={handleRefresh} title="Refresh Table">
              <svg viewBox="0 0 24 24" className="ee-icon-svg"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
            </button>

            {/* Standard Data CSV Download Trigger report export icon */}
            <button className="ee-action-btn" onClick={handleDownloadCSV} title="Download Report">
              <svg viewBox="0 0 24 24" className="ee-icon-svg"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
            </button>
          </div>
        </div>

        {/* Master Response Table View container layout block */}
        <div className="ee-table-responsive-scroller">
          <table className="ee-data-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: '50px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={currentItems.length > 0 && currentItems.every(item => selectedRows.includes(item.id))}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.employeeName && <th>Employee Name</th>}
                {columns.exitDate && <th>Exit Date</th>}
                {columns.exitType && <th>Exit Type</th>}
                {columns.reason && <th>Reason</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((row) => (
                  <tr key={row.id} className={selectedRows.includes(row.id) ? 'ee-row-selected' : ''}>
                    {columns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)} 
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </td>
                    )}
                    {columns.id && <td>{row.id}</td>}
                    {columns.employeeName && (
                      <td>
                        <div className="ee-employee-profile-cell">
                          <img src={row.avatar} alt={row.name} className="ee-avatar-img" />
                          <span className="ee-emp-name-txt">{row.name}</span>
                        </div>
                      </td>
                    )}
                    {columns.exitDate && (
                      <td>
                        <div className="ee-date-cell-container">
                          <span className="ee-calendar-icon-inline">📅</span>
                          <span>{new Date(row.exitDate).toLocaleDateString('en-US')}</span>
                        </div>
                      </td>
                    )}
                    {columns.exitType && <td>{row.exitType}</td>}
                    {columns.reason && <td>{row.reason}</td>}
                    {columns.status && (
                      <td>
                        <span className={`ee-status-badge status-${row.status.toLowerCase().replace(' ', '-')}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {columns.actions && (
                      <td>
                        <div className="ee-actions-cell-flex">
                          <button className="ee-row-action-btn edit" onClick={() => openEditModal(row)} title="Edit Row">
                            <svg viewBox="0 0 24 24" className="ee-action-svg-icon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                          </button>
                          <button className="ee-row-action-btn delete" onClick={() => handleDelete(row.id)} title="Delete Row">
                            <svg viewBox="0 0 24 24" className="ee-action-svg-icon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="ee-no-records-fallback">No employee record match found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation Pagination Bar Controls matching Screenshot 2026-07-03 125333.png */}
        <div className="ee-pagination-footer-bar">
          <div className="ee-pagination-controls-right-side">
            <span className="ee-pagination-label-text">Items per page:</span>
            <div className="ee-select-page-dropdown-wrapper">
              <select 
                value={itemsPerPage} 
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="ee-native-page-selector"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <span className="ee-pagination-summary-counter">
              {totalItems === 0 ? 0 : startIndex + 1} – {endIndex} of {totalItems}
            </span>

            <div className="ee-pagination-arrow-buttons-cluster">
              <button 
                className="ee-pager-nav-arrow" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button 
                className="ee-pager-nav-arrow" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Smooth Overlay Modal Popups for Add and Edit actions */}
      {formModal.isOpen && (
        <div className="ee-modal-backdrop-overlay">
          <div className="ee-modal-card-surface animate-pop-up">
            
            {/* Header style matching purple background profile layout */}
            <div className="ee-modal-banner-header">
              <div className="ee-banner-left-flex">
                <img src="https://i.pravatar.cc/150?img=49" alt="User icon" className="ee-modal-banner-avatar" />
                <span className="ee-modal-title-text">
                  {formModal.type === 'edit' ? `Edit Exit: ${formData.name}` : 'New Exit / Offboarding'}
                </span>
              </div>
              <button className="ee-modal-close-x-btn" onClick={() => setFormModal({ isOpen: false, type: 'add', targetId: null })}>
                ×
              </button>
            </div>

            {/* Entry fields inside card container block */}
            <form onSubmit={handleSaveForm} className="ee-modal-form-body">
              <div className="ee-form-grid-row">
                
                {/* Employee Name Field Input Box */}
                <div className="ee-input-field-group-container">
                  <label className="ee-fieldset-outlined-label">Employee Name*</label>
                  <div className="ee-input-inner-addon-box">
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Employee Name"
                      required
                    />
                    <span className="ee-field-right-icon-indicator">🧑</span>
                  </div>
                </div>

                {/* Calendar Input Component */}
                <div className="ee-input-field-group-container">
                  <label className="ee-fieldset-outlined-label">Exit Date*</label>
                  <div className="ee-input-inner-addon-box">
                    <input 
                      type="date" 
                      value={formData.exitDate}
                      onChange={(e) => setFormData({ ...formData, exitDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="ee-form-grid-row">
                {/* Exit Type Dropdown Select menu */}
                <div className="ee-input-field-group-container">
                  <label className="ee-fieldset-outlined-label">Exit Type*</label>
                  <div className="ee-input-inner-addon-box">
                    <select 
                      value={formData.exitType} 
                      onChange={(e) => setFormData({ ...formData, exitType: e.target.value })}
                    >
                      {EXIT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>

                {/* Status Dropdown Options Select menu */}
                <div className="ee-input-field-group-container">
                  <label className="ee-fieldset-outlined-label">Status*</label>
                  <div className="ee-input-inner-addon-box">
                    <select 
                      value={formData.status} 
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Textarea Multi-line block layout wrapper */}
              <div className="ee-form-single-full-row">
                <div className="ee-input-field-group-container">
                  <label className="ee-fieldset-outlined-label">Reason*</label>
                  <textarea 
                    rows={3}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Reason"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Action buttons footer drawer strip layout */}
              <div className="ee-modal-form-actions-bar">
                <button 
                  type="submit" 
                  className={`ee-btn-primary save-action ${(!formData.name.trim() || !formData.reason.trim()) ? 'disabled-opacity' : ''}`}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="ee-btn-danger cancel-action"
                  onClick={() => setFormModal({ isOpen: false, type: 'add', targetId: null })}
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeExit;