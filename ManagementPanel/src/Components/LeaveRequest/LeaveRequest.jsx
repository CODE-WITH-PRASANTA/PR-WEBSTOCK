import React, { useState, useEffect, useMemo, useCallback } from 'react';
import API from "../../api/axios"; // Uses your pre-configured Axios instance
import Swal from 'sweetalert2'; // Beautiful & Smooth Alerts / Modals
import './LeaveRequest.css';

const AdminLeaveManager = () => {
  // Core Operational States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Date Filtering State Matrix
  const [dateRangeFilter, setDateRangeFilter] = useState('all'); // options: 'all', 'week', 'month', '3months'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // UI Interactive Toggle States
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

  // Column Filter Visibility Matrix
  const [columns, setColumns] = useState({
    serialNo: true,
    employeeName: true,
    leaveType: true,
    leaveFrom: true,
    leaveTo: true,
    duration: true,
    status: true,
    reason: true,
    requestedOn: true,
    actions: true
  });

  // --- Fetch All Admin Leave Data ---
  const fetchAllLeaves = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/leaves/all');
      if (response.data && response.data.data) {
        // Enforce chronological sorting right out of the API layer: Latest applicationDate on top
        const sortedData = response.data.data.sort((a, b) => {
          return new Date(b.applicationDate || 0) - new Date(a.applicationDate || 0);
        });
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching admin leave ledger:", error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Failed',
        text: error.response?.data?.message || "Failed to load comprehensive leave records.",
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Structural initial lifecycle pull
  useEffect(() => {
    fetchAllLeaves();
  }, [fetchAllLeaves]);

  // --- Admin Status Processing Modifiers (Approve / Reject / Reset) ---
  const handleStatusUpdate = async (recordId, newStatus) => {
    try {
      const response = await API.put(`/leaves/${recordId}`, { status: newStatus });
      if (response.data.success) {
        setData(prev => prev.map(item => item._id === recordId ? { ...item, status: newStatus } : item));
        
        Swal.fire({
          icon: 'success',
          title: `Record ${newStatus}!`,
          text: `The leave request status has updated successfully.`,
          timer: 1800,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Error',
        text: error.response?.data?.message || "Failed to update record status context.",
      });
    }
  };

  // --- Open Smooth Review Modal using SweetAlert2 HTML Rendering ---
  const openEditModal = (record) => {
    const formattedFromDate = record.fromDate ? record.fromDate.split('T')[0] : '';
    const formattedToDate = record.toDate ? record.toDate.split('T')[0] : '';
    const empName = record.employeeName || record.user?.name || '';

    Swal.fire({
      title: '<strong>Review Leave Request Ledger</strong>',
      icon: 'info',
      html: `
        <div class="swal-form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: left; margin-top: 15px;">
          <div style="display: flex; flex-direction: column;">
            <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">Employee Name</label>
            <input id="swal-emp-name" type="text" class="swal2-input" style="margin: 0; width: 100%; height: 38px; font-size: 14px;" value="${empName}" disabled />
          </div>
          <div style="display: flex; flex-direction: column;">
            <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">Leave Classification</label>
            <select id="swal-leave-type" class="swal2-input" style="margin: 0; width: 100%; height: 38px; font-size: 14px;">
              <option value="Casual Leave" ${record.leaveType === 'Casual Leave' ? 'selected' : ''}>Casual Leave</option>
              <option value="Medical Leave" ${record.leaveType === 'Medical Leave' ? 'selected' : ''}>Medical Leave</option>
              <option value="Sick Leave" ${record.leaveType === 'Sick Leave' ? 'selected' : ''}>Sick Leave</option>
              <option value="Maternity Leave" ${record.leaveType === 'Maternity Leave' ? 'selected' : ''}>Maternity Leave</option>
              <option value="Loss of Pay" ${record.leaveType === 'Loss of Pay' ? 'selected' : ''}>Loss of Pay</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column;">
            <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">From Date</label>
            <input id="swal-from-date" type="date" class="swal2-input" style="margin: 0; width: 100%; height: 38px; font-size: 14px;" value="${formattedFromDate}" />
          </div>
          <div style="display: flex; flex-direction: column;">
            <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">To Date</label>
            <input id="swal-to-date" type="date" class="swal2-input" style="margin: 0; width: 100%; height: 38px; font-size: 14px;" value="${formattedToDate}" />
          </div>
          <div style="display: flex; flex-direction: column;">
            <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">Duration Config</label>
            <select id="swal-half-day" class="swal2-input" style="margin: 0; width: 100%; height: 38px; font-size: 14px;">
              <option value="No" ${record.halfDay === 'No' ? 'selected' : ''}>Full Day</option>
              <option value="Yes" ${record.halfDay === 'Yes' ? 'selected' : ''}>Half Day</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column;">
            <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">Current State Audit</label>
            <select id="swal-status" class="swal2-input" style="margin: 0; width: 100%; height: 38px; font-size: 14px;">
              <option value="Pending" ${record.status === 'Pending' ? 'selected' : ''}>Pending Audit</option>
              <option value="Approved" ${record.status === 'Approved' ? 'selected' : ''}>Approved</option>
              <option value="Rejected" ${record.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; text-align: left; margin-top: 12px;">
          <label style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">Employee Declaration Reason</label>
          <textarea id="swal-reason" class="swal2-textarea" style="margin: 0; width: 100%; font-size: 14px;" rows="3">${record.reason || ''}</textarea>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Apply Matrix Override',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4e73df',
      cancelButtonColor: '#858796',
      preConfirm: () => {
        return {
          ...record,
          leaveType: document.getElementById('swal-leave-type').value,
          fromDate: document.getElementById('swal-from-date').value,
          toDate: document.getElementById('swal-to-date').value,
          halfDay: document.getElementById('swal-half-day').value,
          status: document.getElementById('swal-status').value,
          reason: document.getElementById('swal-reason').value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveChanges(result.value);
      }
    });
  };

  // --- Handle Save from Modal Edit ---
  const handleSaveChanges = async (updatedRecord) => {
    try {
      const response = await API.put(`/leaves/${updatedRecord._id}`, updatedRecord);
      if (response.data.success) {
        setData(prev => {
          const updatedList = prev.map(item => item._id === updatedRecord._id ? updatedRecord : item);
          return updatedList.sort((a, b) => new Date(b.applicationDate || 0) - new Date(a.applicationDate || 0));
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Overrides Applied!',
          text: 'The configuration alterations saved context changes successfully.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error("Error saving record alterations:", error);
      Swal.fire({
        icon: 'error',
        title: 'Save Modification Failed',
        text: error.response?.data?.message || "Failed to update record values.",
      });
    }
  };

  // --- Combined Chronological, Text Search & Date Range Filtering Logic ---
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const now = new Date();

    return data.filter(item => {
      // 1. Text Query Filter Evaluation
      const empName = item.employeeName || item.user?.name || '';
      const matchesSearch = (
        (item.leaveType || '').toLowerCase().includes(query) ||
        (item.reason || '').toLowerCase().includes(query) ||
        empName.toLowerCase().includes(query)
      );

      if (!matchesSearch) return false;

      // 2. Date Matrix Range Filter Evaluation
      if (dateRangeFilter === 'all') return true;

      const targetDate = item.applicationDate ? new Date(item.applicationDate) : null;
      if (!targetDate) return false;

      // Calculate the timestamp bounds
      if (dateRangeFilter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return targetDate >= oneWeekAgo;
      }
      
      if (dateRangeFilter === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return targetDate >= oneMonthAgo;
      }

      if (dateRangeFilter === '3months') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return targetDate >= threeMonthsAgo;
      }

      return true;
    });
  }, [data, searchQuery, dateRangeFilter]);

  // --- Pagination Matrix Computations ---
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableRows = useMemo(() => {
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfFirstItem, indexOfLastItem]);

  // --- UI Action Resets ---
  const handleRefresh = () => {
    setSearchQuery('');
    setDateRangeFilter('all');
    setCurrentPage(1);
    fetchAllLeaves();
  };

  const toggleColumn = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  return (
    <div className="admin-leave-container">
      {/* HEADER CONTROLS BAR */}
      <div className="admin-leave-header">
        <div className="admin-leave-header-left">
          <h2 className="admin-leave-title">Leave Administration Board</h2>
          <div className="admin-leave-controls-wrapper" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Text Input Search */}
            <div className="admin-leave-search-wrapper">
              <svg className="admin-leave-search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input 
                type="text" 
                placeholder="Filter by Employee, Type or Reason..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="admin-leave-search-input"
              />
            </div>

            {/* Professional Date Range Selector */}
            <div className="admin-leave-date-filter-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <select
                className="admin-leave-pagination-select"
                style={{ height: '38px', borderRadius: '6px', minWidth: '140px', padding: '0 8px', borderColor: '#e3e6f0', fontWeight: '500' }}
                value={dateRangeFilter}
                onChange={(e) => { setDateRangeFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">📅 All Timeline</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="3months">Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-leave-header-actions">
          {/* Column Configuration Dropdown */}
          <div className="admin-leave-dropdown-anchor">
            <button className="admin-leave-icon-btn" onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)} title="Configure Columns Visibility">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
            </button>
            {isColumnDropdownOpen && (
              <div className="admin-leave-column-dropdown">
                <div className="admin-leave-dropdown-title">Show/Hide Columns</div>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.serialNo} onChange={() => toggleColumn('serialNo')} /> S.No</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.employeeName} onChange={() => toggleColumn('employeeName')} /> Employee</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.leaveType} onChange={() => toggleColumn('leaveType')} /> Leave Type</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.leaveFrom} onChange={() => toggleColumn('leaveFrom')} /> Leave From</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.leaveTo} onChange={() => toggleColumn('leaveTo')} /> Leave To</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.duration} onChange={() => toggleColumn('duration')} /> Duration</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.status} onChange={() => toggleColumn('status')} /> Status</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.reason} onChange={() => toggleColumn('reason')} /> Reason</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.requestedOn} onChange={() => toggleColumn('requestedOn')} /> Requested On</label>
                <label className="admin-leave-dropdown-label"><input type="checkbox" checked={columns.actions} onChange={() => toggleColumn('actions')} /> Actions</label>
              </div>
            )}
          </div>
          
          <button className="admin-leave-icon-btn" onClick={handleRefresh} title="Sync/Reload Ledger Data">
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>
        </div>
      </div>

      {/* COMPREHENSIVE DATA TABLE VIEW */}
      <div className="admin-leave-table-responsive">
        {loading ? (
          <div className="admin-leave-loading">Fetching real-time company ledger...</div>
        ) : (
          <table className="admin-leave-table">
            <thead>
              <tr>
                {columns.serialNo && <th className="admin-leave-th-sno">S.No</th>}
                {columns.employeeName && <th>Employee</th>}
                {columns.leaveType && <th>Leave Type</th>}
                {columns.leaveFrom && <th>Leave From</th>}
                {columns.leaveTo && <th>Leave To</th>}
                {columns.duration && <th>Duration Type</th>}
                {columns.status && <th>Status</th>}
                {columns.reason && <th>Reason</th>}
                {columns.requestedOn && <th>Requested On</th>}
                {columns.actions && <th className="admin-leave-th-actions">Admin Action Controls Matrix</th>}
              </tr>
            </thead>
            <tbody>
              {currentTableRows.map((row, index) => (
                <tr key={row._id}>
                  {columns.serialNo && (
                    <td className="admin-leave-td-sno">
                      {indexOfFirstItem + index + 1}
                    </td>
                  )}
                  {columns.employeeName && (
                    <td className="admin-leave-td-empname">
                      {row.employeeName || row.user?.name || 'Unknown Reference'}
                    </td>
                  )}
                  {columns.leaveType && <td><span className="admin-leave-type-pill">{row.leaveType}</span></td>}
                  {columns.leaveFrom && (
                    <td>
                      <div className="admin-leave-date-cell">
                        {row.fromDate ? new Date(row.fromDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                  )}
                  {columns.leaveTo && (
                    <td>
                      <div className="admin-leave-date-cell">
                        {row.toDate ? new Date(row.toDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                  )}
                  {columns.duration && <td>{row.halfDay === 'Yes' ? 'Half Day' : 'Full Day'}</td>}
                  {columns.status && (
                    <td>
                      <span className={`admin-leave-badge status-${row.status ? row.status.toLowerCase() : 'pending'}`}>
                        {row.status || 'Pending'}
                      </span>
                    </td>
                  )}
                  {columns.reason && <td className="admin-leave-text-truncated" title={row.reason}>{row.reason}</td>}
                  {columns.requestedOn && (
                    <td>
                      <div className="admin-leave-date-cell">
                        {row.applicationDate ? new Date(row.applicationDate).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="admin-leave-action-buttons">
                        <button
                          onClick={() => openEditModal(row)}
                          className="admin-leave-action-btn edit"
                          title="Review or Modify Details"
                        >
                          ✏ Edit/View
                        </button>

                        <button
                          onClick={() => handleStatusUpdate(row._id, 'Approved')}
                          className="admin-leave-action-btn approve"
                          disabled={row.status === 'Approved'}
                        >
                          ✓ Approve
                        </button>
                        
                        <button
                          onClick={() => handleStatusUpdate(row._id, 'Rejected')}
                          className="admin-leave-action-btn reject"
                          disabled={row.status === 'Rejected'}
                        >
                          ✕ Reject
                        </button>

                        {row.status !== 'Pending' && (
                          <button
                            onClick={() => handleStatusUpdate(row._id, 'Pending')}
                            className="admin-leave-action-btn revert"
                            title="Revert back to Pending Audit State"
                          >
                            ⟲
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {currentTableRows.length === 0 && (
                <tr>
                  <td colSpan="10" className="admin-leave-no-data">
                    No global leave submission data corresponds with the specified filter query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* SYSTEM PAGINATION CONTROLS */}
      <div className="admin-leave-footer">
        <div className="admin-leave-footer-spacer"></div>
        <div className="admin-leave-pagination-controls">
          <span className="admin-leave-pagination-label">Items per page:</span>
          <select 
            className="admin-leave-pagination-select" 
            value={itemsPerPage} 
            onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          <span className="admin-leave-pagination-info">
            {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </span>
          <div className="admin-leave-pagination-arrows">
            <button className="admin-leave-arrow-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;</button>
            <button className="admin-leave-arrow-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveManager;