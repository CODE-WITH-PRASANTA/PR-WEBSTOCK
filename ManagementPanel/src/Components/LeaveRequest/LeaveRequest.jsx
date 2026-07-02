import React, { useState, useMemo } from 'react';
import './LeaveRequest.css';

// Master data set accurately mirroring your reference images
const initialLeaveData = [
  { id: '1', name: 'John Deo', empId: 'E123', dept: 'Human Resource', type: 'Medical Leave', from: '2026-04-10', to: '2026-02-25', days: 5, duration: 'Full-day', status: 'Approved', reason: 'God creature i...', requestedOn: '2026-01-15', approvedBy: 'Jane Smith', approvedDate: '2026-01-20', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', note: 'Medical certificate attached.' },
  { id: '2', name: 'Sarah Smith', empId: 'E124', dept: 'Finance', type: 'Maternity Leave', from: '2026-04-10', to: '2026-04-14', days: 4, duration: 'Half-day', status: 'Pending', reason: 'Celeste Slater...', requestedOn: '2026-01-16', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', note: '' },
  { id: '3', name: 'Edna Gilbert', empId: 'E125', dept: 'Marketing', type: 'Maternity Leave', from: '2026-04-10', to: '2026-11-08', days: 1, duration: 'Half-day', status: 'Rejected', reason: 'Hiroko Potter ...', requestedOn: '2026-01-17', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', note: 'Shortage of hands in marketing.' },
  { id: '4', name: 'Shelia Osterman', empId: 'E126', dept: 'IT', type: 'Medical Leave', from: '2026-04-10', to: '2026-05-20', days: 5, duration: 'Full-day', status: 'Approved', reason: '881 Beechwood...', requestedOn: '2026-01-18', approvedBy: 'Tom Johnson', approvedDate: '2026-01-22', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', note: '' },
  { id: '5', name: 'Barbara G.', empId: 'E127', dept: 'HR', type: 'Casual Leave', from: '2026-04-10', to: '2026-04-18', days: 3, duration: 'Full-day', status: 'Approved', reason: '107 Ashley A...', requestedOn: '2026-01-19', approvedBy: 'Lisa Grey', approvedDate: '2026-01-23', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', note: '' },
  { id: '6', name: 'Sarah Smith', empId: 'E124', dept: 'Finance', type: 'Medical Leave', from: '2026-04-10', to: '2026-11-08', days: 4, duration: 'Half-day', status: 'Pending', reason: 'Shanti Nagar ...', requestedOn: '2026-01-20', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', note: '' },
  { id: '7', name: 'Marie Brown', empId: 'E128', dept: 'Sales', type: 'Casual Leave', from: '2026-04-10', to: '2026-11-08', days: 1, duration: 'Half-day', status: 'Rejected', reason: 'D-178/2, Ttc I...', requestedOn: '2026-01-21', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150', note: '' },
  { id: '8', name: 'Kara Thomas', empId: 'E129', dept: 'Customer Serv...', type: 'Casual Leave', from: '2026-04-10', to: '2026-04-18', days: 5, duration: 'Full-day', status: 'Approved', reason: 'H-6, 1st Fl., O...', requestedOn: '2026-01-22', approvedBy: 'Anne White', approvedDate: '2026-01-25', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150', note: '' },
  { id: '9', name: 'Joseph Nye', empId: 'E130', dept: 'Engineering', type: 'Medical Leave', from: '2026-04-10', to: '2026-05-20', days: 5, duration: 'Half-day', status: 'Approved', reason: '26, 2nd Flr, N...', requestedOn: '2026-01-23', approvedBy: 'Mark Brown', approvedDate: '2026-01-27', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', note: '' },
  { id: '10', name: 'Ricardo W.', empId: 'E131', dept: 'Operations', type: 'Maternity Leave', from: '2026-04-10', to: '2026-04-14', days: 4, duration: 'Full-day', status: 'Rejected', reason: '1st Floor P.o. ...', requestedOn: '2026-01-24', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', note: '' },
  { id: '11', name: 'Alex Wong', empId: 'E132', dept: 'IT', type: 'Casual Leave', from: '2026-05-01', to: '2026-05-03', days: 2, duration: 'Full-day', status: 'Pending', reason: 'Personal work', requestedOn: '2026-04-15', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', note: '' },
  { id: '12', name: 'Emma Davis', empId: 'E133', dept: 'HR', type: 'Medical Leave', from: '2026-05-10', to: '2026-05-11', days: 1, duration: 'Half-day', status: 'Approved', reason: 'Dental checkup', requestedOn: '2026-04-18', approvedBy: 'Jane Smith', approvedDate: '2026-04-19', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', note: '' },
  { id: '13', name: 'Chris Evans', empId: 'E134', dept: 'Design', type: 'Casual Leave', from: '2026-06-01', to: '2026-06-05', days: 5, duration: 'Full-day', status: 'Pending', reason: 'Family trip', requestedOn: '2026-04-20', approvedBy: '', approvedDate: '', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', note: '' }
];

const LeaveRequest = () => {
  // Core Operational States
  const [data, setData] = useState(initialLeaveData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // UI Interactive Toggle States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);

  // Column Filter Visibility Matrix (Matches image 3 configuration)
  const [columns, setColumns] = useState({
    checkbox: true,
    idCol: false,
    empName: true,
    empId: true,
    department: true,
    leaveType: true,
    leaveFrom: true,
    leaveTo: true,
    numDays: true,
    duration: true,
    status: true,
    reason: true,
    requestedOn: true,
    approvedBy: true,
    approvalDate: true,
    actions: true
  });

  // Modal Interactive Input Bindings
  const [formData, setFormData] = useState({
    name: '', leaveType: 'Medical Leave', from: '2026-07-01', to: '2026-07-01',
    days: 1, status: 'Pending', empId: '', dept: '', duration: 'Full-day',
    requestedOn: '2026-07-01', reason: '', note: ''
  });

  // --- Filtering Logic ---
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dept.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // --- Pagination Slice Calculation ---
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  // Guard page range adjustments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableRows = useMemo(() => {
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfFirstItem, indexOfLastItem]);

  // --- Action Handlers ---
  const handleRefresh = () => {
    setData(initialLeaveData);
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "leave_requests_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentVisibleIds = currentTableRows.map(item => item.id);
      setSelectedIds(prev => [...new Set([...prev, ...currentVisibleIds])]);
    } else {
      const currentVisibleIds = currentTableRows.map(item => item.id);
      setSelectedIds(prev => prev.filter(id => !currentVisibleIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openAddModal = () => {
    setEditingRecordId(null);
    setFormData({
      name: '', leaveType: 'Medical Leave', from: '2026-07-01', to: '2026-07-01',
      days: 1, status: 'Pending', empId: '', dept: '', duration: 'Full-day',
      requestedOn: '2026-07-01', reason: '', note: ''
    });
    setIsFormOpen(true);
  };

  const openEditModal = (record) => {
    setEditingRecordId(record.id);
    setFormData({
      name: record.name, leaveType: record.type, from: record.from, to: record.to,
      days: record.days, status: record.status, empId: record.empId, dept: record.dept,
      duration: record.duration, requestedOn: record.requestedOn, reason: record.reason, note: record.note || ''
    });
    setIsFormOpen(true);
  };

  const handleDeleteRow = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(itemId => itemId !== id));
  };

  const handleBulkDelete = () => {
    setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingRecordId) {
      setData(prev => prev.map(item => item.id === editingRecordId ? {
        ...item,
        name: formData.name, type: formData.leaveType, from: formData.from, to: formData.to,
        days: parseInt(formData.days), status: formData.status, empId: formData.empId,
        dept: formData.dept, duration: formData.duration, requestedOn: formData.requestedOn,
        reason: formData.reason, note: formData.note
      } : item));
    } else {
      const newRecord = {
        id: Date.now().toString(),
        name: formData.name, empId: formData.empId, dept: formData.dept,
        type: formData.leaveType, from: formData.from, to: formData.to,
        days: parseInt(formData.days), duration: formData.duration, status: formData.status,
        reason: formData.reason || 'N/A', requestedOn: formData.requestedOn,
        approvedBy: formData.status === 'Approved' ? 'System HR' : '',
        approvedDate: formData.status === 'Approved' ? formData.requestedOn : '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        note: formData.note
      };
      setData(prev => [newRecord, ...prev]);
    }
    setIsFormOpen(false);
  };

  const toggleColumn = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  return (
    <div className="lr-container">
      {/* HEADER CONTROLS BAR */}
      <div className="lr-header">
        <div className="lr-header-left">
          <h2 className="lr-title">Leave Requests</h2>
          <div className="lr-search-wrapper">
            <svg className="lr-search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="lr-search-input"
            />
          </div>
        </div>

        <div className="lr-header-actions">
          {/* Contextual Bulk Delete button appears near actions row dropdown */}
          {selectedIds.length > 0 && (
            <button className="lr-btn-bulk-delete" onClick={handleBulkDelete} title="Delete Selected Rows">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          {/* Table Configuration Column Visibility Options Switcher */}
          <div className="lr-dropdown-anchor">
            <button className="lr-icon-btn" onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)} title="Show/Hide Columns">
              <svg viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
            </button>
            {isColumnDropdownOpen && (
              <div className="lr-column-dropdown">
                <div className="lr-dropdown-title">Show/Hide Column</div>
                <label><input type="checkbox" checked={columns.checkbox} onChange={() => toggleColumn('checkbox')} /> Checkbox</label>
                <label><input type="checkbox" checked={columns.idCol} onChange={() => toggleColumn('idCol')} /> ID</label>
                <label><input type="checkbox" checked={columns.empName} onChange={() => toggleColumn('empName')} /> Employee Name</label>
                <label><input type="checkbox" checked={columns.empId} onChange={() => toggleColumn('empId')} /> Employee ID</label>
                <label><input type="checkbox" checked={columns.department} onChange={() => toggleColumn('department')} /> Department</label>
                <label><input type="checkbox" checked={columns.leaveType} onChange={() => toggleColumn('leaveType')} /> Leave Type</label>
                <label><input type="checkbox" checked={columns.leaveFrom} onChange={() => toggleColumn('leaveFrom')} /> Leave From</label>
                <label><input type="checkbox" checked={columns.leaveTo} onChange={() => toggleColumn('leaveTo')} /> Leave To</label>
                <label><input type="checkbox" checked={columns.numDays} onChange={() => toggleColumn('numDays')} /> Number of Days</label>
                <label><input type="checkbox" checked={columns.duration} onChange={() => toggleColumn('duration')} /> Duration Type</label>
                <label><input type="checkbox" checked={columns.status} onChange={() => toggleColumn('status')} /> Status</label>
                <label><input type="checkbox" checked={columns.reason} onChange={() => toggleColumn('reason')} /> Reason</label>
                <label><input type="checkbox" checked={columns.requestedOn} onChange={() => toggleColumn('requestedOn')} /> Requested On</label>
                <label><input type="checkbox" checked={columns.approvedBy} onChange={() => toggleColumn('approvedBy')} /> Approved By</label>
                <label><input type="checkbox" checked={columns.approvalDate} onChange={() => toggleColumn('approvalDate')} /> Approval Date</label>
                <label><input type="checkbox" checked={columns.actions} onChange={() => toggleColumn('actions')} /> Actions</label>
              </div>
            )}
          </div>

          <button className="lr-icon-btn lr-btn-add" onClick={openAddModal} title="Add Leave Request">
            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </button>
          
          <button className="lr-icon-btn" onClick={handleRefresh} title="Refresh Table State">
            <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>

          <button className="lr-icon-btn" onClick={handleDownload} title="Export System Backup Data">
            <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>
          </button>
        </div>
      </div>

      {/* INTEGRATED DATA TABLE VIEW WITH SMOOTH SCROLLBAR LINK */}
      <div className="lr-table-responsive">
        <table className="lr-table">
          <thead>
            <tr>
              {columns.checkbox && (
                <th style={{ width: '45px' }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={currentTableRows.length > 0 && currentTableRows.every(row => selectedIds.includes(row.id))}
                  />
                </th>
              )}
              {columns.idCol && <th>ID</th>}
              {columns.empName && <th>Employee Name</th>}
              {columns.empId && <th>Employee ID</th>}
              {columns.department && <th>Department</th>}
              {columns.leaveType && <th>Leave Type</th>}
              {columns.leaveFrom && <th>Leave From</th>}
              {columns.leaveTo && <th>Leave To</th>}
              {columns.numDays && <th>Number of Days</th>}
              {columns.duration && <th>Duration Type</th>}
              {columns.status && <th>Status</th>}
              {columns.reason && <th>Reason</th>}
              {columns.requestedOn && <th>Requested On</th>}
              {columns.approvedBy && <th>Approved By</th>}
              {columns.approvalDate && <th>Approval Date</th>}
              {columns.actions && <th style={{ textAlign: 'center', width: '90px' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentTableRows.map((row) => (
              <tr key={row.id} className={selectedIds.includes(row.id) ? 'lr-row-selected' : ''}>
                {columns.checkbox && (
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                )}
                {columns.idCol && <td>{row.id}</td>}
                {columns.empName && (
                  <td>
                    <div className="lr-user-cell">
                      <img src={row.avatar} alt={row.name} className="lr-avatar" />
                      <span className="lr-emp-name" data-hover-label={row.name}>{row.name}</span>
                    </div>
                  </td>
                )}
                {columns.empId && <td>{row.empId}</td>}
                {columns.department && <td>{row.dept}</td>}
                {columns.leaveType && <td>{row.type}</td>}
                {columns.leaveFrom && (
                  <td>
                    <div className="lr-date-cell">
                      <svg className="lr-cell-cal-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                      {row.from.replace(/-/g, '/')}
                    </div>
                  </td>
                )}
                {columns.leaveTo && (
                  <td>
                    <div className="lr-date-cell">
                      <svg className="lr-cell-cal-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                      {row.to.replace(/-/g, '/')}
                    </div>
                  </td>
                )}
                {columns.numDays && <td>{row.days}</td>}
                {columns.duration && <td>{row.duration}</td>}
                {columns.status && (
                  <td>
                    <span className={`lr-badge status-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                )}
                {columns.reason && <td className="lr-text-truncated" title={row.reason}>{row.reason}</td>}
                {columns.requestedOn && (
                  <td>
                    <div className="lr-date-cell">
                      <svg className="lr-cell-cal-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                      {row.requestedOn.replace(/-/g, '/')}
                    </div>
                  </td>
                )}
                {columns.approvedBy && <td>{row.approvedBy || '-'}</td>}
                {columns.approvalDate && (
                  <td>
                    {row.approvedDate ? (
                      <div className="lr-date-cell">
                        <svg className="lr-cell-cal-icon" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                        {row.approvedDate.replace(/-/g, '/')}
                      </div>
                    ) : (
                      <div className="lr-date-cell"><svg className="lr-cell-cal-icon opacity-3" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg> --</div>
                    )}
                  </td>
                )}
                {columns.actions && (
                  <td>
                    <div className="lr-action-buttons">
                      <button className="lr-action-btn edit" onClick={() => openEditModal(row)} title="Modify Entry">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button className="lr-action-btn delete" onClick={() => handleDeleteRow(row.id)} title="Remove Entry">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {currentTableRows.length === 0 && (
              <tr>
                <td colSpan="16" className="lr-no-data">No data records currently available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SYSTEM PAGINATION CONTROLS (Set at 10 items per view) */}
      <div className="lr-footer">
        <div className="lr-footer-spacer"></div>
        <div className="lr-pagination-controls">
          <span className="lr-pagination-label">Items per page:</span>
          <div className="lr-select-wrapper">
            <select 
              className="lr-pagination-select" 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
          <span className="lr-pagination-info">
            {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </span>
          <div className="lr-pagination-arrows">
            <button 
              className="lr-arrow-btn" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>
            <button 
              className="lr-arrow-btn" 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* FULL SMOOTH TRANSITION MODAL OVERLAY */}
      <div className={`lr-modal-overlay ${isFormOpen ? 'active' : ''}`} onClick={() => setIsFormOpen(false)}>
        <div className={`lr-modal-content ${isFormOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          
          <div className="lr-modal-header">
            <div className="lr-modal-header-title">
              <div className="lr-modal-avatar-placeholder"></div>
              <span>{editingRecordId ? 'Edit Leave Request' : 'New Leave Request'}</span>
            </div>
           <div className="lr-modal-header">
  <div className="lr-modal-header-title">


   
  </div>

  {/* Close Button */}
  <button
    type="button"
    className="lr-modal-close"
    onClick={() => setIsFormOpen(false)}
  >
    ✕
  </button>
</div>
          </div >

         <div className="lr-modal-body-wrapper">
  <form onSubmit={handleFormSubmit} className="lr-modal-body">
            <div className="lr-form-grid">
              
              <div className="lr-form-group">
                <label className="lr-form-label">Name*</label>
                <input 
                  type="text" required className="lr-form-input-field"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Leave Type*</label>
                <select 
                  className="lr-form-select-field"
                  value={formData.leaveType} onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                >
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                </select>
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Leave From*</label>
                <input 
                  type="date" required className="lr-form-input-field"
                  value={formData.from} onChange={(e) => setFormData({...formData, from: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Leave To*</label>
                <input 
                  type="date" required className="lr-form-input-field"
                  value={formData.to} onChange={(e) => setFormData({...formData, to: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">No Of Days*</label>
                <input 
                  type="number" required min="1" className="lr-form-input-field"
                  value={formData.days} onChange={(e) => setFormData({...formData, days: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Status*</label>
                <select 
                  className="lr-form-select-field"
                  value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Employee ID*</label>
                <input 
                  type="text" required className="lr-form-input-field"
                  value={formData.empId} onChange={(e) => setFormData({...formData, empId: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Department*</label>
                <input 
                  type="text" required className="lr-form-input-field"
                  value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Duration Type*</label>
                <input 
                  type="text" required className="lr-form-input-field"
                  value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Requested On*</label>
                <input 
                  type="date" required className="lr-form-input-field"
                  value={formData.requestedOn} onChange={(e) => setFormData({...formData, requestedOn: e.target.value})}
                />
              </div>
            </div>

            {/* INTEGRATED FORM TEXT AREAS & BUTTON FOOTER ATTACHMENTS (Image 5 Matrix) */}
            <div className="lr-form-fullwidth">
              <div className="lr-form-group">
                <label className="lr-form-label">Reason</label>
                <textarea 
                  rows="2" className="lr-form-textarea" placeholder="Provide leave context..."
                  value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})}
                ></textarea>
              </div>

              <div className="lr-form-group">
                <label className="lr-form-label">Note</label>
                <textarea 
                  rows="2" className="lr-form-textarea" placeholder="Internal HR context notes..."
                  value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})}
                ></textarea>
              </div>
            </div>

                        <div className="lr-form-actions">
              <button type="submit" className="lr-btn-save">
                Save
              </button>

              <button
                type="button"
                className="lr-btn-cancel"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
    </div>
  );
};

export default LeaveRequest;