import React, { useState, useMemo } from 'react';
import './PayrollHistory.css';

// Initial Dummy Data
const INITIAL_PAYROLL_DATA = [
  { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', month: 'September', year: 2023, earnings: 85000, deductions: 5000, netSalary: 80000, date: '2023-09-30', status: 'Paid' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', month: 'September', year: 2023, earnings: 95000, deductions: 7000, netSalary: 88000, date: '2023-09-30', status: 'Paid' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', month: 'September', year: 2023, earnings: 65000, deductions: 3000, netSalary: 62000, date: '2023-09-30', status: 'Paid' },
  { id: 4, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', month: 'September', year: 2023, earnings: 110000, deductions: 10000, netSalary: 100000, date: '2023-09-30', status: 'Paid' },
  { id: 5, name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', month: 'September', year: 2023, earnings: 75000, deductions: 4000, netSalary: 71000, date: '2023-09-30', status: 'Paid' },
  { id: 6, name: 'Jessica Taylor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', month: 'August', year: 2023, earnings: 90000, deductions: 6000, netSalary: 84000, date: '2023-08-31', status: 'Paid' },
  { id: 7, name: 'Daniel Thomas', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', month: 'August', year: 2023, earnings: 70000, deductions: 3500, netSalary: 66500, date: '2023-08-31', status: 'Paid' },
  { id: 8, name: 'Laura Miller', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', month: 'August', year: 2023, earnings: 85000, deductions: 5000, netSalary: 80000, date: '2023-08-31', status: 'Paid' },
  { id: 9, name: 'Kevin Anderson', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', month: 'August', year: 2023, earnings: 105000, deductions: 9000, netSalary: 96000, date: '2023-08-31', status: 'Paid' },
  { id: 10, name: 'Emma Thompson', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150', month: 'July', year: 2023, earnings: 60000, deductions: 2500, netSalary: 57500, date: '2023-07-31', status: 'Paid' },
  { id: 11, name: 'James White', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', month: 'July', year: 2023, earnings: 82000, deductions: 4000, netSalary: 78000, date: '2023-07 White-31', status: 'Paid' },
  { id: 12, name: 'Olivia Harris', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', month: 'July', year: 2023, earnings: 91000, deductions: 5000, netSalary: 86000, date: '2023-07-31', status: 'Paid' }
];

const PayrollHistory = () => {
  // State variables
  const [data, setData] = useState(INITIAL_PAYROLL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Pagination State
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Column Show/Hide State
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    id: false,
    employeeName: true,
    month: true,
    year: true,
    totalEarnings: true,
    totalDeductions: true,
    netSalary: true,
    paymentDate: true,
    status: true,
    actions: true
  });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentRecord, setCurrentRecord] = useState({
    id: null, name: '', avatar: '', month: 'September', year: 2023, earnings: 0, deductions: 0, netSalary: 0, date: '2026-07-02', status: 'Paid'
  });

  // Filter logic based on search
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Paginated data logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Selection handlers
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

  // Open Add Record
  const openAddModal = () => {
    setModalMode('add');
    setCurrentRecord({
      id: null,
      name: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      month: 'September',
      year: 2023,
      earnings: 0,
      deductions: 0,
      netSalary: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid'
    });
    setModalOpen(true);
  };

  // Open Edit Record
  const openEditModal = (record) => {
    setModalMode('edit');
    setCurrentRecord({ ...record });
    setModalOpen(true);
  };

  // Handle Form Inputs dynamically updates net salary
  const handleInputChange = (field, value) => {
    setCurrentRecord(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'earnings' || field === 'deductions') {
        const earn = field === 'earnings' ? Number(value) : Number(prev.earnings);
        const ded = field === 'deductions' ? Number(value) : Number(prev.deductions);
        updated.netSalary = earn - ded;
      }
      return updated;
    });
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    if (!currentRecord.name) return alert('Please supply employee name.');

    if (modalMode === 'add') {
      const newRow = {
        ...currentRecord,
        id: Date.now(),
        earnings: Number(currentRecord.earnings),
        deductions: Number(currentRecord.deductions),
        netSalary: Number(currentRecord.netSalary)
      };
      setData([newRow, ...data]);
    } else {
      setData(data.map(item => item.id === currentRecord.id ? currentRecord : item));
    }
    setModalOpen(false);
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // Refresh and download actions
  const handleRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    alert('Table system refreshed.');
  };

  const handleDownload = () => {
    alert('Downloading data packet format (CSV/XLS)...');
  };

  return (
    <div className="payroll-container">
      {/* Dynamic Breadcrumbs Section */}
      <div className="payroll-breadcrumb-row">
        <h2>Payroll History</h2>
        <div className="breadcrumb-nav">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>&nbsp;&gt;&nbsp;Payroll&nbsp;&gt;&nbsp;<span className="active-crumb">Payroll History</span></span>
        </div>
      </div>

      {/* Main Feature Container */}
      <div className="payroll-card">
        {/* Actions bar header */}
        <div className="payroll-toolbar">
          <div className="toolbar-left">
            <span className="toolbar-title">Payroll History</span>
            <div className="search-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              />
            </div>
          </div>

          <div className="toolbar-right">
            {/* Show/Hide Column Activator */}
            <div className="column-popover-container">
              <button className="icon-btn" title="Show/Hide Columns" onClick={() => setShowColumnDropdown(!showColumnDropdown)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
              </button>
              
              {showColumnDropdown && (
                <div className="column-dropdown">
                  <div className="dropdown-header">Show/Hide Column</div>
                  <div className="dropdown-scroll-body">
                    {Object.keys(visibleColumns).map((colKey) => (
                      <label key={colKey} className="dropdown-item">
                        <input 
                          type="checkbox" 
                          checked={visibleColumns[colKey]} 
                          onChange={(e) => setVisibleColumns({...visibleColumns, [colKey]: e.target.checked})} 
                        />
                        <span className="capitalize-label">{colKey.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="icon-btn add-btn" title="Add Record" onClick={openAddModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button className="icon-btn" title="Refresh" onClick={handleRefresh}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
            <button className="icon-btn" title="Download" onClick={handleDownload}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>

        {/* Responsive Content Table */}
        <div className="table-responsive-wrapper">
          <table className="payroll-table">
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
                {visibleColumns.month && <th>Month</th>}
                {visibleColumns.year && <th>Year</th>}
                {visibleColumns.totalEarnings && <th>Total Earnings</th>}
                {visibleColumns.totalDeductions && <th>Total Deductions</th>}
                {visibleColumns.netSalary && <th>Net Salary</th>}
                {visibleColumns.paymentDate && <th>Payment Date</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected-row' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(item.id)} 
                          onChange={() => handleSelectRow(item.id)} 
                        />
                      </td>
                    )}
                    {visibleColumns.id && <td>{item.id}</td>}
                    {visibleColumns.employeeName && (
                      <td>
                        <div className="emp-cell">
                          <img src={item.avatar} alt={item.name} className="emp-avatar" />
                          <span className="emp-name">{item.name}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.month && <td>{item.month}</td>}
                    {visibleColumns.year && <td>{item.year}</td>}
                    {visibleColumns.totalEarnings && <td>{item.earnings}</td>}
                    {visibleColumns.totalDeductions && <td>{item.deductions}</td>}
                    {visibleColumns.netSalary && <td>{item.netSalary}</td>}
                    {visibleColumns.paymentDate && (
                      <td>
                        <div className="date-cell">
                          <svg className="calendar-inline-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                          <span>{new Date(item.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td>
                        <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td>
                        <div className="action-cell-buttons">
                          <button className="action-btn edit" onClick={() => openEditModal(item)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(item.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="empty-table-state">No matching data profiles records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Interactive Pagination Module */}
        <div className="payroll-pagination-footer">
          <div className="items-per-page-block">
            <span>Items per page:</span>
            <div className="custom-select-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
          <div className="pagination-controls">
            <span className="pagination-info">
              {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </span>
            <button 
              className="pagination-arrow" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              className="pagination-arrow" 
              disabled={currentPage >= totalPages} 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Shared Modular Popup Modal for Edit / Add Form */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-window-card">
            <div className="modal-header-bar">
              <div className="modal-header-left">
                <img src={currentRecord.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt="Profile preview" className="modal-title-avatar" />
                <h3>{modalMode === 'edit' ? `Edit ${currentRecord.name}` : 'New Payroll History Record'}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSave} className="modal-form-content">
              <div className="form-grid-layout">
                {/* Employee Name */}
                <div className="floating-input-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={currentRecord.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                  />
                  <label>Employee Name*</label>
                  <span className="input-inline-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                </div>

                {/* Payment Date */}
                <div className="floating-input-group">
                  <input 
                    type="date" 
                    required
                    value={currentRecord.date} 
                    onChange={(e) => handleInputChange('date', e.target.value)} 
                  />
                  <label>Payment Date*</label>
                </div>

                {/* Month Selector */}
                <div className="floating-input-group">
                  <select 
                    value={currentRecord.month} 
                    onChange={(e) => handleInputChange('month', e.target.value)}
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <label>Month*</label>
                </div>

                {/* Year */}
                <div className="floating-input-group">
                  <input 
                    type="number" 
                    required 
                    placeholder=" "
                    value={currentRecord.year} 
                    onChange={(e) => handleInputChange('year', e.target.value)} 
                  />
                  <label>Year*</label>
                  <span className="input-inline-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </span>
                </div>

                {/* Total Earnings */}
                <div className="floating-input-group">
                  <input 
                    type="number" 
                    required 
                    placeholder=" "
                    value={currentRecord.earnings} 
                    onChange={(e) => handleInputChange('earnings', e.target.value)} 
                  />
                  <label>Total Earnings*</label>
                  <span className="input-inline-icon font-icon">$</span>
                </div>

                {/* Total Deductions */}
                <div className="floating-input-group">
                  <input 
                    type="number" 
                    required 
                    placeholder=" "
                    value={currentRecord.deductions} 
                    onChange={(e) => handleInputChange('deductions', e.target.value)} 
                  />
                  <label>Total Deductions*</label>
                  <span className="input-inline-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34"></path></svg>
                  </span>
                </div>

                {/* Net Salary Calculation */}
                <div className="floating-input-group disabled-styled-input">
                  <input 
                    type="number" 
                    readOnly 
                    value={currentRecord.netSalary} 
                  />
                  <label>Net Salary*</label>
                  <span className="input-inline-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                  </span>
                </div>

                {/* Status Options */}
                <div className="floating-input-group">
                  <select 
                    value={currentRecord.status} 
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <label>Status*</label>
                </div>
              </div>

              {/* Save / Cancel controls bar */}
              <div className="modal-actions-footer">
                <button type="submit" className="modal-btn save-btn">Save</button>
                <button type="button" className="modal-btn cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default PayrollHistory;