import React, { useState, useMemo } from 'react';
import './BonusesIncentives.css';

// Exact reference dataset from Screenshot 2026-07-02 192456.png
const INITIAL_BONUS_DATA = [
  { id: 1, name: 'Chris Evans', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', type: 'Holiday', amount: 1000, date: '2023-12-25', description: 'Christmas Bonus', status: 'Pending' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', type: 'Festival', amount: 2000, date: '2023-10-20', description: 'Diwali Bonus', status: 'Paid' },
  { id: 3, name: 'Daniel Taylor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', type: 'Deepavali', amount: 2000, date: '2023-10-20', description: 'Festival Bonus', status: 'Paid' },
  { id: 4, name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', type: 'Referral', amount: 3000, date: '2023-09-15', description: 'Referred a senior dev...', status: 'Paid' },
  { id: 5, name: 'Emma Thomas', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150', type: 'Performance', amount: 4000, date: '2023-10-15', description: 'Good performance', status: 'Pending' },
  { id: 6, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', type: 'Performance', amount: 4500, date: '2023-10-15', description: 'Met sales targets', status: 'Approved' },
  { id: 7, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', type: 'Performance', amount: 5000, date: '2023-10-15', description: 'Excellent performanc...', status: 'Approved' },
  { id: 8, name: 'Laura Miller', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', type: 'Performance', amount: 5500, date: '2023-10-15', description: 'Excellent client feedb...', status: 'Approved' },
  { id: 9, name: 'Jessica Brown', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', type: 'Performance', amount: 6000, date: '2023-10-15', description: 'Project completion bo...', status: 'Approved' },
  { id: 10, name: 'Olivia Martin', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', type: 'Performance', amount: 7000, date: '2023-10-15', description: 'Exceptional performa...', status: 'Approved' },
  { id: 11, name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', type: 'Referral', amount: 2500, date: '2023-11-02', description: 'Referral incentive', status: 'Paid' },
  { id: 12, name: 'Sophia Smith', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', type: 'Holiday', amount: 1200, date: '2023-12-24', description: 'Year end celebration', status: 'Pending' }
];

const BonusesIncentives = () => {
  // State Variables
  const [data, setData] = useState(INITIAL_BONUS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Sorting State
  const [sortAscending, setSortAscending] = useState(true);

  // Pagination Configuration State (Screenshot 2026-07-02 193542.png)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Column Dropdown Show/Hide Management State (Screenshot 2026-07-02 192832.png)
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    id: false,
    employeeName: true,
    bonusType: true,
    amount: true,
    date: true,
    description: true,
    status: true,
    actions: true
  });

  // Modal Structure Configurations (Screenshot 2026-07-02 192540.png / Screenshot 2026-07-02 193301.png)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentRecord, setCurrentRecord] = useState({
    id: null, name: '', avatar: '', type: '', amount: 0, date: '2026-07-02', description: '', status: 'Pending'
  });

  // Filter Search & Sorting Engine
  const processedData = useMemo(() => {
    let filtered = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dynamic sorting by Amount column as indicated by row arrow indicator
    return filtered.sort((a, b) => {
      return sortAscending ? a.amount - b.amount : b.amount - a.amount;
    });
  }, [data, searchTerm, sortAscending]);

  // Compute Active Pagination Slices
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, currentPage, itemsPerPage]);

  // Bulk Selection Row Methods
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
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

  // Triggers for Add Popup (Screenshot 2026-07-02 193301.png)
  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentRecord({
      id: null,
      name: '',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      type: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      description: '',
      status: 'Pending'
    });
    setModalOpen(true);
  };

  // Triggers for Edit Popup (Screenshot 2026-07-02 192540.png)
  const handleOpenEditModal = (record) => {
    setModalMode('edit');
    setCurrentRecord({ ...record });
    setModalOpen(true);
  };

  // Form Input Mutators
  const handleInputChange = (field, value) => {
    setCurrentRecord(prev => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) : value
    }));
  };

  // Form Commit Handlers
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!currentRecord.name.trim()) return alert('Please input Employee Name');

    if (modalMode === 'add') {
      const addedRecord = {
        ...currentRecord,
        id: Date.now()
      };
      setData([addedRecord, ...data]);
    } else {
      setData(data.map(item => item.id === currentRecord.id ? currentRecord : item));
    }
    setModalOpen(false);
  };

  // Row Delete Actions
  const handleDeleteRow = (id) => {
    if (window.confirm('Confirm delete operation for this entry?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // Navigation / Toolbar Trigger Shells
  const triggerRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    alert('System tables components refreshed');
  };

  const triggerDownload = () => {
    alert('Exporting localized dataset streams...');
  };

  return (
    <div className="bonuses-container">
      {/* Top Breadcrumb Navigation Module */}
      <div className="bonuses-breadcrumb-header">
        <h2>Bonuses & Incentives</h2>
        <div className="breadcrumb-trail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>&nbsp;&gt;&nbsp;Payroll&nbsp;&gt;&nbsp;<span className="active-trail-item">Bonuses & Incentives</span></span>
        </div>
      </div>

      {/* Primary Data Card Frame */}
      <div className="bonuses-card-body">
        {/* Table Filter Actions Bar Header */}
        <div className="table-actions-toolbar">
          <div className="toolbar-left-group">
            <span className="table-group-title">Bonuses & Incentives</span>
            <div className="search-bar-container">
              <svg className="search-embedded-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              />
            </div>
          </div>

          <div className="toolbar-right-group">
            {/* Column Hide/Show Dropdown Popover */}
            <div className="popover-wrapper">
              <button className="toolbar-action-btn" title="Toggle Columns" onClick={() => setShowColumnDropdown(!showColumnDropdown)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
              </button>

              {showColumnDropdown && (
                <div className="columns-popover-box">
                  <div className="popover-header-title">Show/Hide Column</div>
                  <div className="popover-scroll-list">
                    {Object.keys(visibleColumns).map((columnKey) => (
                      <label key={columnKey} className="popover-row-item">
                        <input 
                          type="checkbox" 
                          checked={visibleColumns[columnKey]} 
                          onChange={(e) => setVisibleColumns({...visibleColumns, [columnKey]: e.target.checked})} 
                        />
                        <span className="normalize-label-txt">{columnKey.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="toolbar-action-btn create-record-trigger" title="Add New Record" onClick={handleOpenAddModal}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button className="toolbar-action-btn" title="Refresh Board" onClick={triggerRefresh}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
            <button className="toolbar-action-btn" title="Export CSV" onClick={triggerDownload}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>

        {/* Viewport Dynamic Responsive Table Shell */}
        <div className="table-overflow-adapter">
          <table className="bonuses-data-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="40">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                    />
                  </th>
                )}
                {visibleColumns.id && <th>ID</th>}
                {visibleColumns.employeeName && <th>Employee Name</th>}
                {visibleColumns.bonusType && <th>Bonus Type</th>}
                {visibleColumns.amount && (
                  <th className="sortable-column-header" onClick={() => setSortAscending(!sortAscending)}>
                    Amount {sortAscending ? '▲' : '▼'}
                  </th>
                )}
                {visibleColumns.date && <th>Date</th>}
                {visibleColumns.description && <th>Description</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <tr key={row.id} className={selectedRows.includes(row.id) ? 'active-highlight-row' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)} 
                          onChange={() => handleSelectRow(row.id)} 
                        />
                      </td>
                    )}
                    {visibleColumns.id && <td>{row.id}</td>}
                    {visibleColumns.employeeName && (
                      <td>
                        <div className="employee-profile-cell">
                          <img src={row.avatar} alt={row.name} className="row-profile-avatar" />
                          <span className="row-profile-name">{row.name}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.bonusType && <td>{row.type}</td>}
                    {visibleColumns.amount && <td className="amount-numeric-val">{row.amount}</td>}
                    {visibleColumns.date && (
                      <td>
                        <div className="calendar-date-cell">
                          <svg className="table-calendar-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                          <span>{new Date(row.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.description && <td className="description-text-cell">{row.description}</td>}
                    {visibleColumns.status && (
                      <td>
                        <span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td>
                        <div className="row-actions-container">
                          <button className="action-trigger edit-btn-color" onClick={() => handleOpenEditModal(row)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </button>
                          <button className="action-trigger delete-btn-color" onClick={() => handleDeleteRow(row.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="table-empty-notice">No record entry datasets matched search guidelines.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Unified Table Pagination Bar (Screenshot 2026-07-02 193542.png) */}
        <div className="table-pagination-footer">
          <div className="footer-per-page-selector">
            <span>Items per page:</span>
            <div className="select-dropdown-container">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
          <div className="footer-navigation-track">
            <span className="track-index-counter">
              {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </span>
            <button 
              className="track-arrow-btn" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              className="track-arrow-btn" 
              disabled={currentPage >= totalPages} 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Shared Smooth Pop-up Modal Form Architecture */}
      {modalOpen && (
        <div className="modal-view-overlay">
          <div className="modal-form-card">
            <div className="modal-header-accent-bar">
              <div className="modal-title-identity">
                <img src={currentRecord.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'} alt="Form Context Avatar" className="modal-header-avatar" />
                <h3>{modalMode === 'edit' ? `Edit ${currentRecord.name}` : 'New Bonus Record'}</h3>
              </div>
              <button className="modal-dismiss-cross" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form-body">
              <div className="modal-inputs-grid">
                {/* Employee Name */}
                <div className="input-field-relative-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={currentRecord.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                  />
                  <label>Employee Name*</label>
                  <span className="field-embedded-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                </div>

                {/* Bonus Type */}
                <div className="input-field-relative-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={currentRecord.type} 
                    onChange={(e) => handleInputChange('type', e.target.value)} 
                  />
                  <label>Bonus Type*</label>
                  <span className="field-embedded-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                  </span>
                </div>

                {/* Amount */}
                <div className="input-field-relative-group">
                  <input 
                    type="number" 
                    required 
                    placeholder=" "
                    value={currentRecord.amount || ''} 
                    onChange={(e) => handleInputChange('amount', e.target.value)} 
                  />
                  <label>Amount*</label>
                  <span className="field-embedded-icon typography-style-icon">$</span>
                </div>

                {/* Date Selection Box */}
                <div className="input-field-relative-group">
                  <input 
                    type="date" 
                    required
                    value={currentRecord.date} 
                    onChange={(e) => handleInputChange('date', e.target.value)} 
                  />
                  <label>Date*</label>
                </div>

                {/* Description Input Container */}
                <div className="input-field-relative-group">
                  <input 
                    type="text" 
                    placeholder=" "
                    value={currentRecord.description} 
                    onChange={(e) => handleInputChange('description', e.target.value)} 
                  />
                  <label>Description</label>
                  <span className="field-embedded-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </span>
                </div>

                {/* Status Selection Dropdown */}
                <div className="input-field-relative-group">
                  <select 
                    value={currentRecord.status} 
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Approved">Approved</option>
                  </select>
                  <label>Status*</label>
                </div>
              </div>

              {/* Action Controls Commit Footer */}
              <div className="modal-commit-action-bar">
                <button type="submit" className="action-confirm-btn base-save">Save</button>
                <button type="button" className="action-confirm-btn base-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default BonusesIncentives;