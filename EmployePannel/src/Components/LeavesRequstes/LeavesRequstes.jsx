import React, { useState, useMemo, useEffect } from 'react';
import './LeavesRequstes.css';
import API from "../../api/axios"; 

const LeavesRequstes = () => {
  // Master Core States
  const [leaves, setLeaves] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all'); // Values: 'all', 'week', 'month', '3months'
  
  // Dynamic Leave Types list fetched from backend
  const [leaveTypesList, setLeaveTypesList] = useState([]);
  
  // App Mechanics States
  const [loading, setLoading] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dropdown & Modal UI Toggles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null); 
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

  // Dynamic Column Visibility States
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    applyDate: true,
    fromDate: true,
    toDate: true,
    halfDay: true,
    type: true,
    status: true,
    reason: true,
    actions: true
  });

  // Modal Input State
  const [formData, setFormData] = useState({
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    halfDay: 'No',
    leaveType: '', // Initialized empty to enforce system selection validation
    reason: ''
  });

  // Simplified Native Date Formatter helper
  const formatDateForDisplay = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const formatDateForInput = (isoString) => {
    if (!isoString) return '';
    return isoString.split('T')[0];
  };

  // --- API INTEGRATION METHOD PIPELINES ---

  // 1. Fetch Leaves Types from backend
  const fetchLeaveTypesOptions = async () => {
    setFetchingTypes(true);
    try {
      const token = localStorage.getItem('employeeToken');
      const response = await API.get('/leave-types', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.success) {
        // Keeps only structural Active variants
        const activeTypes = response.data.data.filter(item => item.status === 'Active');
        setLeaveTypesList(activeTypes);
        
        // Sets a default value for fallback matching
        if (activeTypes.length > 0 && !formData.leaveType) {
          setFormData(prev => ({ ...prev, leaveType: activeTypes[0].leaveName }));
        }
      }
    } catch (err) {
      console.error("Error pulling database leave types system names:", err);
    } finally {
      setFetchingTypes(false);
    }
  };

  // 2. Fetch User Leaves records
  const fetchEmployeeLeaves = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('employeeToken');
      if (!token) throw new Error('Authentication token missing. Please log in again.');

      const response = await API.get('/leaves/my-leaves', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLeaves(response.data.data || []);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to sync leaves dataset.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger setup configuration requests on initialization
  useEffect(() => {
    fetchEmployeeLeaves();
    fetchLeaveTypesOptions();
  }, []);

  const handleRefresh = () => {
    setSelectedIds([]);
    setSearchQuery('');
    setTimeFilter('all');
    setCurrentPage(1);
    setIsColumnDropdownOpen(false);
    setEditingItemId(null);
    fetchEmployeeLeaves();
    fetchLeaveTypesOptions();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('employeeToken');
      if (!token) throw new Error('Authentication token missing.');

      if (editingItemId !== null) {
        await API.put(`/leaves/${editingItemId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await API.post('/leaves', {
          leaveType: formData.leaveType,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          halfDay: formData.halfDay,
          reason: formData.reason
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setIsModalOpen(false);
      setEditingItemId(null);
      fetchEmployeeLeaves(); 
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Error executing request submit changes.');
    } finally {
      setLoading(false);
    }
  };

  // --- LOCAL UI INTERACTION LOGICS ---

  const handleDownload = () => {
    alert("Exporting data view down to 'Leaves_Report_2026.xlsx' spreadsheet layout file.");
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentPagedItems.map(item => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenEditDialog = (item) => {
    setEditingItemId(item._id);
    setFormData({
      fromDate: formatDateForInput(item.fromDate),
      toDate: formatDateForInput(item.toDate),
      halfDay: item.halfDay,
      leaveType: item.leaveType,
      reason: item.reason
    });
    setIsModalOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setEditingItemId(null);
    setFormData({
      fromDate: new Date().toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
      halfDay: 'No',
      leaveType: leaveTypesList.length > 0 ? leaveTypesList[0].leaveName : '',
      reason: ''
    });
    setIsModalOpen(true);
  };

  // --- ADVANCED SEARCH, TIMEFRAME FILTERING, & SORT PROCESSING ---
  const filteredLeaves = useMemo(() => {
    const now = new Date();

    const processedItems = leaves.filter(item => {
      const matchesSearch = 
        item.leaveType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reason?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      const itemDate = new Date(item.applicationDate || item.createdAt);
      if (isNaN(itemDate.getTime())) return true; 

      const differenceInTime = now.getTime() - itemDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (timeFilter === 'week') return differenceInDays <= 7;
      if (timeFilter === 'month') return differenceInDays <= 30;
      if (timeFilter === '3months') return differenceInDays <= 90;

      return true; 
    });

    return processedItems.sort((a, b) => {
      const dateA = new Date(a.applicationDate || a.createdAt);
      const dateB = new Date(b.applicationDate || b.createdAt);
      return dateB - dateA; 
    });

  }, [leaves, searchQuery, timeFilter]);

  const currentPagedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLeaves.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeaves, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage) || 1;

  return (
    <div className="lv-dashboard-container" onClick={() => { setIsColumnDropdownOpen(false); }}>
      <header className="lv-header">
        <h1 className="lv-main-title">My Leaves</h1>
      </header>

      <main className="lv-card-wrapper">
        
        {errorMessage && (
          <div style={{ padding: '12px', marginBottom: '15px', color: '#c92a2a', backgroundColor: '#fff5f5', borderRadius: '6px', fontWeight: '600' }}>
            {errorMessage}
          </div>
        )}

        <div className="lv-toolbar">
          <div className="lv-toolbar-left" style={{ gap: '12px' }}>
            <div className="lv-search-box">
              <span className="lv-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="lv-time-filter-wrapper">
              <select 
                className="lv-time-select-dropdown"
                value={timeFilter}
                onChange={(e) => { setTimeFilter(e.target.value); setCurrentPage(1); }}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', outline: 'none', cursor: 'pointer', height: '36px', fontWeight: '500' }}
              >
                <option value="all">All History</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="3months">Past 3 Months</option>
              </select>
            </div>
          </div>

          <div className="lv-toolbar-right">
            <div className="lv-dropdown-anchor" onClick={(e) => e.stopPropagation()}>
              <button 
                className="lv-icon-btn" 
                title="Show/Hide Column"
                onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
              >
                <span className="lv-filter-lines">≡</span>
              </button>
              
              {isColumnDropdownOpen && (
                <div className="lv-column-picker-dropdown">
                  <div className="lv-picker-header">Show/Hide Column</div>
                  <div className="lv-picker-divider"></div>
                  <div className="lv-picker-scroll-area">
                    {Object.keys(visibleColumns).map((colKey) => (
                      <label key={colKey} className="lv-picker-item">
                        <input 
                          type="checkbox"
                          checked={visibleColumns[colKey]}
                          onChange={(e) => setVisibleColumns({ ...visibleColumns, [colKey]: e.target.checked })}
                        />
                        <span className="lv-custom-check-box"></span>
                        <span className="lv-picker-text">{colKey.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="lv-icon-btn lv-add-btn" title="Add New Leave" onClick={(e) => { e.stopPropagation(); handleOpenCreateDialog(); }}>
              <span className="lv-plus-symbol">+</span>
            </button>
            
            <button className="lv-icon-btn" title="Refresh Board" onClick={handleRefresh} disabled={loading}>
              <span className="lv-refresh-symbol">↻</span>
            </button>
            
            <button className="lv-icon-btn" title="Xlsx Download" onClick={handleDownload}>
              <span className="lv-download-symbol">⬇</span>
            </button>
          </div>
        </div>

        <div className="lv-table-scroller">
          <table className="lv-data-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th className="lv-th-checkbox">
                    <input 
                      type="checkbox" 
                      className="lv-native-checkbox"
                      onChange={handleSelectAll}
                      checked={currentPagedItems.length > 0 && selectedIds.length === currentPagedItems.length}
                    />
                  </th>
                )}
                {visibleColumns.applyDate && <th>Application Date</th>}
                {visibleColumns.fromDate && <th>From Date</th>}
                {visibleColumns.toDate && <th>To Date</th>}
                {visibleColumns.halfDay && <th>Half Day</th>}
                {visibleColumns.type && <th>Leave Type</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.reason && <th>Reason</th>}
                {visibleColumns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="lv-no-data-cell">Loading active employee leave datasets...</td>
                </tr>
              ) : currentPagedItems.length === 0 ? (
                <tr>
                  <td colSpan="9" className="lv-no-data-cell">No active leave records matching system criteria.</td>
                </tr>
              ) : (
                currentPagedItems.map((item) => (
                  <tr key={item._id} className={selectedIds.includes(item._id) ? 'lv-row-selected' : ''}>
                    {visibleColumns.checkbox && (
                      <td className="lv-td-checkbox">
                        <input 
                          type="checkbox" 
                          className="lv-native-checkbox"
                          checked={selectedIds.includes(item._id)}
                          onChange={() => handleSelectRow(item._id)}
                        />
                      </td>
                    )}
                    {visibleColumns.applyDate && (
                      <td>
                        <span className="lv-cell-calendar-icon">📅</span> {formatDateForDisplay(item.applicationDate || item.createdAt)}
                      </td>
                    )}
                    {visibleColumns.fromDate && (
                      <td>
                        <span className="lv-cell-calendar-icon">📅</span> {formatDateForDisplay(item.fromDate)}
                      </td>
                    )}
                    {visibleColumns.toDate && (
                      <td>
                        <span className="lv-cell-calendar-icon">📅</span> {formatDateForDisplay(item.toDate)}
                      </td>
                    )}
                    {visibleColumns.halfDay && <td>{item.halfDay}</td>}
                    {visibleColumns.type && <td style={{ textTransform: 'capitalize' }}>{item.leaveType} Leave</td>}
                    {visibleColumns.status && (
                      <td>
                        <span className={`lv-status-badge ${item.status?.toLowerCase()}`}>{item.status}</span>
                      </td>
                    )}
                    {visibleColumns.reason && <td className="lv-cell-reason" title={item.reason}>{item.reason}</td>}
                    {visibleColumns.actions && (
                      <td className="lv-cell-actions">
                        <button className="lv-action-edit-btn" title="Edit request details" onClick={() => handleOpenEditDialog(item)}>📝</button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer className="lv-pagination-bar">
          <div className="lv-pagination-right-group">
            <span className="lv-pag-label">Items per page:</span>
            <div className="lv-page-select-wrapper">
              <select 
                value={itemsPerPage} 
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            
            <span className="lv-pagination-summary">
              {filteredLeaves.length === 0 ? '0 - 0' : `${(currentPage - 1) * itemsPerPage + 1} – ${Math.min(currentPage * itemsPerPage, filteredLeaves.length)}`} of {filteredLeaves.length}
            </span>

            <div className="lv-pagination-nav-arrows">
              <button 
                className="lv-nav-arrow" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                &lt;
              </button>
              <button 
                className="lv-nav-arrow" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* CREATE & EDIT FORM MODAL */}
      {isModalOpen && (
        <div className="lv-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="lv-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="lv-modal-header">
              <h2>{editingItemId !== null ? 'Edit Leave Request' : 'New Leave Request'}</h2>
              <button className="lv-modal-close-cross" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleFormSubmit} className="lv-modal-body">
              <div className="lv-form-grid">

                {/* From Date */}
                <div className="lv-form-group">
                  <label>From Date *</label>
                  <input
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    required
                  />
                </div>

                {/* To Date */}
                <div className="lv-form-group">
                  <label>To Date *</label>
                  <input
                    type="date"
                    min={formData.fromDate}
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                    required
                  />
                </div>

                {/* Half Day */}
                <div className="lv-form-group">
                  <label>Half Day *</label>
                  <select
                    value={formData.halfDay}
                    onChange={(e) => setFormData({ ...formData, halfDay: e.target.value })}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* Dynamic Leave Type Dropdown */}
                <div className="lv-form-group">
                  <label>Leave Type *</label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                    required
                    disabled={fetchingTypes}
                  >
                    {fetchingTypes ? (
                      <option value="">Loading types...</option>
                    ) : leaveTypesList.length === 0 ? (
                      <option value="">No configurations found</option>
                    ) : (
                      leaveTypesList.map((type) => (
                        <option key={type.id || type._id} value={type.leaveName}>
                          {type.leaveName}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div className="lv-form-group full-width">
                <label>Reason *</label>
                <textarea
                  rows={4}
                  placeholder="Write your structural reason details..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </div>

              <div className="lv-modal-footer">
                <button type="submit" className="lv-save-btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" className="lv-cancel-btn" onClick={() => setIsModalOpen(false)}>
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

export default LeavesRequstes;