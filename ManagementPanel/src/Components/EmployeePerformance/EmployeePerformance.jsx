import React, { useState, useMemo } from 'react';
import './EmployeePerformance.css';

// Initial dummy data matching your image view
const INITIAL_DATA = [
  { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=33', period: '2023 Q1', rating: 4, reviewer: 'Emily Davis', status: 'Completed' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?img=12', period: '2023 Q1', rating: 5, reviewer: 'Michael Brown', status: 'Completed' },
  { id: 3, name: 'Robert Johnson', avatar: 'https://i.pravatar.cc/150?img=8', period: '2023 Q1', rating: 3, reviewer: 'Emily Davis', status: 'In Review' },
  { id: 4, name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=53', period: '2023 Q2', rating: 4, reviewer: 'Sarah Smith', status: 'Completed' },
  { id: 5, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=47', period: '2023 Q2', rating: 5, reviewer: 'John Doe', status: 'Draft' },
  { id: 6, name: 'William Wilson', avatar: 'https://i.pravatar.cc/150?img=60', period: '2023 Q2', rating: 3, reviewer: 'Michael Brown', status: 'Completed' },
  { id: 7, name: 'Jessica Taylor', avatar: 'https://i.pravatar.cc/150?img=45', period: '2023 Q3', rating: 4, reviewer: 'Sarah Smith', status: 'In Review' },
  { id: 8, name: 'David Anderson', avatar: 'https://i.pravatar.cc/150?img=54', period: '2023 Q3', rating: 2, reviewer: 'Emily Davis', status: 'Completed' },
  { id: 9, name: 'Linda Thomas', avatar: 'https://i.pravatar.cc/150?img=35', period: '2023 Q3', rating: 5, reviewer: 'John Doe', status: 'Completed' },
  { id: 10, name: 'James Jackson', avatar: 'https://i.pravatar.cc/150?img=59', period: '2023 Q4', rating: 4, reviewer: 'Michael Brown', status: 'Draft' },
  { id: 11, name: 'Patricia White', avatar: 'https://i.pravatar.cc/150?img=32', period: '2023 Q4', rating: 3, reviewer: 'Linda Thomas', status: 'In Review' },
  { id: 12, name: 'Christopher Martin', avatar: 'https://i.pravatar.cc/150?img=68', period: '2023 Q4', rating: 5, reviewer: 'Jessica Taylor', status: 'Completed' },
];

const EmployeePerformance = () => {
  // Data State
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Column Visibility Popover State
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    id: false,
    name: true,
    period: true,
    rating: true,
    reviewer: true,
    status: true,
    actions: true
  });

  // Modal Control States
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [currentRecord, setCurrentRecord] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '', period: '2023 Q1', rating: '3 - Good', reviewer: '', status: 'Draft'
  });

  // Filter Data via Search
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.reviewer.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.period.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Paginated Segment
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle Global Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Open forms safely
  const openAddModal = () => {
    setFormData({ name: '', period: '2023 Q1', rating: '3 - Good', reviewer: '', status: 'Draft' });
    setModalMode('add');
  };

  const openEditModal = (record) => {
    setCurrentRecord(record);
    const ratingLabel = record.rating === 5 ? '5 - Excellent' : record.rating === 4 ? '4 - Very Good' : record.rating === 3 ? '3 - Good' : '2 - Fair';
    setFormData({
      name: record.name,
      period: record.period,
      rating: ratingLabel,
      reviewer: record.reviewer,
      status: record.status
    });
    setModalMode('edit');
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    const cleanRating = parseInt(formData.rating.split(' ')[0], 10) || 3;

    if (modalMode === 'add') {
      const newRow = {
        id: Date.now(),
        name: formData.name || 'New Employee',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        period: formData.period,
        rating: cleanRating,
        reviewer: formData.reviewer || 'Assignee Pending',
        status: formData.status
      };
      setData([newRow, ...data]);
    } else if (modalMode === 'edit') {
      setData(data.map(item => item.id === currentRecord.id ? { ...item, ...formData, rating: cleanRating } : item));
    }
    setModalMode(null);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this row?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const triggerReset = () => {
    setData(INITIAL_DATA);
    setSearch('');
    setCurrentPage(1);
  };

  const triggerDownload = () => {
    alert("Exporting table data structure into CSV format layout...");
  };

  return (
    <div className="perf-dashboard-container">
      {/* Header Breadcrumbs Section */}
      <div className="perf-header">
        <h2>Employee Performance</h2>
        <div className="perf-breadcrumbs">
          <span className="home-icon">🏠</span> <span>&gt;</span> Employees <span>&gt;</span> <span className="active-crumb">Performance</span>
        </div>
      </div>

      {/* Main Table Wrapper Box */}
      <div className="perf-card">
        {/* Table Filter Operations Utility Bar */}
        <div className="perf-toolbar">
          <div className="toolbar-left">
            <span className="summary-title">Performance Summary</span>
            <div className="search-box-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
          <div className="toolbar-right">
            <button className="tool-btn filter-toggle" onClick={() => setShowColumnDropdown(!showColumnDropdown)}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="currentColor"/></svg>
            </button>
            <button className="tool-btn add-record-btn" onClick={openAddModal}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/></svg>
            </button>
            <button className="tool-btn refresh-btn" onClick={triggerReset}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/></svg>
            </button>
            <button className="tool-btn download-btn" onClick={triggerDownload}>
              <svg viewBox="0 0 24 24" width="20" height="20"><path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" fill="currentColor"/></svg>
            </button>

            {/* Show/Hide Target Column Context Window */}
            {showColumnDropdown && (
              <div className="column-dropdown-popover">
                <div className="dropdown-header">Show/Hide Column</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-list">
                  {Object.keys(visibleColumns).map((colKey) => (
                    <label key={colKey} className="dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[colKey]} 
                        onChange={(e) => setVisibleColumns({...visibleColumns, [colKey]: e.target.checked})}
                      />
                      <span>{colKey.charAt(0).toUpperCase() + colKey.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Matrix Table Frame Layout */}
        <div className="table-responsive-scroller">
          <table className="perf-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th style={{ width: '50px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={paginatedData.length > 0 && selectedIds.length === paginatedData.length}
                    />
                  </th>
                )}
                {visibleColumns.id && <th>ID</th>}
                {visibleColumns.name && <th>Employee Name</th>}
                {visibleColumns.period && <th>Review Period</th>}
                {visibleColumns.rating && <th>Rating</th>}
                {visibleColumns.reviewer && <th>Reviewer</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <tr key={row.id} className={selectedIds.includes(row.id) ? 'row-selected' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(row.id)} 
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </td>
                    )}
                    {visibleColumns.id && <td>{row.id}</td>}
                    {visibleColumns.name && (
                      <td>
                        <div className="employee-cell">
                          <img src={row.avatar} alt={row.name} className="emp-avatar" />
                          <span className="emp-name">{row.name}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.period && <td>{row.period}</td>}
                    {visibleColumns.rating && (
                      <td>
                        <span className="rating-score">{row.rating}</span>
                      </td>
                    )}
                    {visibleColumns.reviewer && <td>{row.reviewer}</td>}
                    {visibleColumns.status && (
                      <td>
                        <span className={`status-badge badge-${row.status.toLowerCase().replace(' ', '-')}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td>
                        <div className="actions-cell-buttons">
                          <button className="action-btn edit-icon-btn" onClick={() => openEditModal(row)} title="Edit Record">
                            🖊️
                          </button>
                          <button className="action-btn delete-icon-btn" onClick={() => handleDelete(row.id)} title="Delete Record">
                            🗑️
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>No records match search parameters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Matrix Control Section */}
        <div className="perf-pagination">
          <div className="pagination-controls-right">
            <span className="items-per-page-label">Items per page:</span>
            <div className="select-dropdown-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value, 10)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span className="pagination-count-summary">
              {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} – {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <div className="pagination-arrow-buttons">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                className="arrow-btn"
              >
                &lt;
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="arrow-btn"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Overlay Form Modals View */}
      {modalMode && (
        <div className="modal-overlay-backdrop">
          <div className="modal-window-box animate-popup">
            <div className="modal-banner-header">
              <div className="modal-header-left-title">
                {modalMode === 'edit' && currentRecord ? (
                  <>
                    <img src={currentRecord.avatar} className="modal-header-avatar" alt="" />
                    <span>Edit Performance: {currentRecord.name}</span>
                  </>
                ) : (
                  <>
                    <div className="modal-header-avatar-placeholder">👤</div>
                    <span>New Performance Review</span>
                  </>
                )}
              </div>
              <button className="modal-close-cross-btn" onClick={() => setModalMode(null)}>&times;</button>
            </div>
            
            <form onSubmit={handleFormSave} className="modal-body-form">
              <div className="form-grid-row">
                <div className="fieldset-input-wrapper">
                  <label>Employee Name*</label>
                  <div className="input-with-inner-icon">
                    <input 
                      type="text" 
                      required
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      placeholder="Enter Name"
                    />
                    <span className="inner-field-icon">👦</span>
                  </div>
                </div>

                <div className="fieldset-input-wrapper">
                  <label>Review Period*</label>
                  <select 
                    value={formData.period} 
                    onChange={(e) => setFormData({...formData, period: e.target.value})}
                  >
                    <option value="2023 Q1">2023 Q1</option>
                    <option value="2023 Q2">2023 Q2</option>
                    <option value="2023 Q3">2023 Q3</option>
                    <option value="2023 Q4">2023 Q4</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-row">
                <div className="fieldset-input-wrapper">
                  <label>Rating*</label>
                  <select 
                    value={formData.rating} 
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  >
                    <option value="5 - Excellent">5 - Excellent</option>
                    <option value="4 - Very Good">4 - Very Good</option>
                    <option value="3 - Good">3 - Good</option>
                    <option value="2 - Fair">2 - Fair</option>
                  </select>
                </div>

                <div className="fieldset-input-wrapper">
                  <label>Reviewer*</label>
                  <div className="input-with-inner-icon">
                    <input 
                      type="text" 
                      required
                      value={formData.reviewer} 
                      onChange={(e) => setFormData({...formData, reviewer: e.target.value})} 
                      placeholder="Reviewer Name"
                    />
                    <span className="inner-field-icon">👤</span>
                  </div>
                </div>
              </div>

              <div className="form-grid-row full-width-row">
                <div className="fieldset-input-wrapper">
                  <label>Status*</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer-action-row">
                <button type="submit" className="footer-btn action-save-btn">Save</button>
                <button type="button" className="footer-btn action-cancel-btn" onClick={() => setModalMode(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePerformance;