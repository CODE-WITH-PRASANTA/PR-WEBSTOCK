import React, { useState, useMemo } from 'react';
import './Deductions.css';

// Exact mock dataset extracted from Screenshot 2026-07-02 194308.png
const INITIAL_DEDUCTIONS = [
  { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', type: 'Tax', amount: 2000, date: '2023-10-25', description: 'TDS Deduction', status: 'Deducted' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', type: 'Loan Repayment', amount: 5000, date: '2023-10-25', description: 'Personal Loan Install...', status: 'Deducted' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', type: 'Advance', amount: 3000, date: '2023-10-25', description: 'Salary Advance Recov...', status: 'Deducted' },
  { id: 4, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', type: 'Tax', amount: 1500, date: '2023-10-25', description: 'TDS Deduction', status: 'Deducted' },
  { id: 5, name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', type: 'Other', amount: 1000, date: '2023-10-25', description: 'Damage recovery', status: 'Pending' },
  { id: 6, name: 'Jessica Brown', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', type: 'Tax', amount: 2500, date: '2023-10-25', description: 'TDS Deduction', status: 'Deducted' },
  { id: 7, name: 'Daniel Taylor', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', type: 'Loan Repayment', amount: 4000, date: '2023-10-25', description: 'Car Loan', status: 'Deducted' },
  { id: 8, name: 'Laura Miller', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', type: 'Tax', amount: 1800, date: '2023-10-25', description: 'TDS Deduction', status: 'Deducted' },
  { id: 9, name: 'Kevin Anderson', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', type: 'Advance', amount: 5000, date: '2023-10-25', description: 'Festival Advance', status: 'Pending' },
  { id: 10, name: 'Emma Thomas', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150', type: 'Tax', amount: 1200, date: '2023-10-25', description: 'TDS Deduction', status: 'Deducted' },
  { id: 11, name: 'Robert Fox', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150', type: 'Other', amount: 800, date: '2023-11-01', description: 'Uniform fees', status: 'Deducted' },
  { id: 12, name: 'Jane McCoy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', type: 'Advance', amount: 2000, date: '2023-11-15', description: 'Emergency Advance', status: 'Pending' }
];

const Deductions = () => {
  // Operational Component States
  const [deductionsData, setDeductionsData] = useState(INITIAL_DEDUCTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // Pagination Engine State Metrics (Screenshot 2026-07-02 194515.png)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Column Dropdown Toggle Architecture State (Screenshot 2026-07-02 194411.png)
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    checkbox: true,
    id: false,
    employeeName: true,
    deductionType: true,
    amount: true,
    date: true,
    description: true,
    status: true,
    actions: true
  });

  // Structural Pop-up Overlay Configuration State (Screenshot 2026-07-02 194346.png / Screenshot 2026-07-02 194445.png)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [formPayload, setFormPayload] = useState({
    id: null, name: '', avatar: '', type: '', amount: 0, date: '2026-07-02', description: '', status: 'Pending'
  });

  // Client-Side Searching Computations
  const filteredRecords = useMemo(() => {
    return deductionsData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [deductionsData, searchTerm]);

  // Compute Active Pagination Rows
  const totalRecordsCount = filteredRecords.length;
  const maxPageCount = Math.ceil(totalRecordsCount / itemsPerPage);
  const paginatedDataSet = useMemo(() => {
    const startOffset = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(startOffset, startOffset + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  // Row Selection Managers
  const toggleMasterCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(paginatedDataSet.map(row => row.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const toggleRowCheckbox = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(rowId => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  // Launch Form for Entry Addition (Screenshot 2026-07-02 194445.png)
  const openAddRecordForm = () => {
    setFormMode('add');
    setFormPayload({
      id: null,
      name: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      type: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      description: '',
      status: 'Pending'
    });
    setIsModalOpen(true);
  };

  // Launch Form for Entry Updaters (Screenshot 2026-07-02 194346.png)
  const openEditRecordForm = (record) => {
    setFormMode('edit');
    setFormPayload({ ...record });
    setIsModalOpen(true);
  };

  // Field Input Mutation Engine
  const mutateField = (property, value) => {
    setFormPayload(prev => ({
      ...prev,
      [property]: property === 'amount' ? Number(value) : value
    }));
  };

  // Commit Submission Dispatchers
  const dispatchFormSubmission = (e) => {
    e.preventDefault();
    if (!formPayload.name.trim()) return;

    if (formMode === 'add') {
      const generatedEntry = {
        ...formPayload,
        id: Date.now()
      };
      setDeductionsData([generatedEntry, ...deductionsData]);
    } else {
      setDeductionsData(deductionsData.map(entry => entry.id === formPayload.id ? formPayload : entry));
    }
    setIsModalOpen(false);
  };

  // Operational Action Dispatches
  const executeRowDeletion = (id) => {
    if (confirm('Proceed with deleting this deduction item?')) {
      setDeductionsData(deductionsData.filter(item => item.id !== id));
      setSelectedRowIds(selectedRowIds.filter(rowId => rowId !== id));
    }
  };

  const dispatchSystemRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    alert('System operational datagrids fully re-synchronized.');
  };

  const dispatchDataExport = () => {
    alert('Beginning secure CSV binary layout pipeline sequence transmission.');
  };

  return (
    <div className="deductions-view-wrapper">
      {/* Top Application Breadcrumbs */}
      <div className="view-navigation-header">
        <h1>Deductions</h1>
        <div className="navigation-trail-node">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>&nbsp;&gt;&nbsp;Payroll&nbsp;&gt;&nbsp;<span className="current-node-active">Deductions</span></span>
        </div>
      </div>

      {/* Main Structural Layout Content Frame */}
      <div className="deductions-layout-frame">
        {/* Upper Table Action Bar */}
        <div className="layout-control-toolbar">
          <div className="toolbar-left-cluster">
            <span className="grid-component-identity">Deductions</span>
            <div className="input-search-field-frame">
              <svg className="embedded-search-vector" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              />
            </div>
          </div>

          <div className="toolbar-right-cluster">
            {/* Show/Hide Column Dropdown Popover Anchor */}
            <div className="dropdown-popover-context">
              <button className="toolbar-action-trigger" title="Toggle Columns" onClick={() => setColumnMenuOpen(!columnMenuOpen)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
              </button>

              {columnMenuOpen && (
                <div className="column-visibility-popover-box">
                  <div className="popover-title-bar">Show/Hide Column</div>
                  <div className="popover-checkbox-container">
                    {Object.keys(columnVisibility).map((columnKey) => (
                      <label key={columnKey} className="popover-checkbox-row">
                        <input 
                          type="checkbox" 
                          checked={columnVisibility[columnKey]} 
                          onChange={(e) => setColumnVisibility({...columnVisibility, [columnKey]: e.target.checked})} 
                        />
                        <span className="popover-item-text-normalize">{columnKey.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="toolbar-action-trigger add-record-highlight" title="Add Deduction" onClick={openAddRecordForm}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button className="toolbar-action-trigger" title="Refresh Table" onClick={dispatchSystemRefresh}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
            <button className="toolbar-action-trigger" title="Download Excel/CSV" onClick={dispatchDataExport}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>

        {/* Dynamic Responsive Datagrid Container */}
        <div className="responsive-table-scroll-shield">
          <table className="deductions-core-datagrid">
            <thead>
              <tr>
                {columnVisibility.checkbox && (
                  <th width="40">
                    <input 
                      type="checkbox" 
                      onChange={toggleMasterCheckbox}
                      checked={paginatedDataSet.length > 0 && selectedRowIds.length === paginatedDataSet.length}
                    />
                  </th>
                )}
                {columnVisibility.id && <th>ID</th>}
                {columnVisibility.employeeName && <th>Employee Name</th>}
                {columnVisibility.deductionType && <th>Deduction Type</th>}
                {columnVisibility.amount && <th>Amount</th>}
                {columnVisibility.date && <th>Date</th>}
                {columnVisibility.description && <th>Description</th>}
                {columnVisibility.status && <th>Status</th>}
                {columnVisibility.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedDataSet.length > 0 ? (
                paginatedDataSet.map((item) => (
                  <tr key={item.id} className={selectedRowIds.includes(item.id) ? 'row-state-highlighted' : ''}>
                    {columnVisibility.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedRowIds.includes(item.id)} 
                          onChange={() => toggleRowCheckbox(item.id)} 
                        />
                      </td>
                    )}
                    {columnVisibility.id && <td>{item.id}</td>}
                    {columnVisibility.employeeName && (
                      <td>
                        <div className="employee-identity-block">
                          <img src={item.avatar} alt={item.name} className="identity-avatar-circle" />
                          <span className="identity-display-name">{item.name}</span>
                        </div>
                      </td>
                    )}
                    {columnVisibility.deductionType && <td>{item.type}</td>}
                    {columnVisibility.amount && <td className="numeric-amount-item-val">{item.amount}</td>}
                    {columnVisibility.date && (
                      <td>
                        <div className="grid-calendar-capsule">
                          <svg className="embedded-calendar-vector" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                          <span>{new Date(item.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</span>
                        </div>
                      </td>
                    )}
                    {columnVisibility.description && <td className="grid-description-truncate">{item.description}</td>}
                    {columnVisibility.status && (
                      <td>
                        <span className={`status-badge-capsule state-${item.status.toLowerCase()}`}>{item.status}</span>
                      </td>
                    )}
                    {columnVisibility.actions && (
                      <td>
                        <div className="row-interactive-actions">
                          <button className="action-row-trigger trigger-edit" onClick={() => openEditRecordForm(item)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </button>
                          <button className="action-row-trigger trigger-delete" onClick={() => executeRowDeletion(item.id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="datagrid-blankstate-notice">No record datasets matching current criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Operational Footer Navigation Module (Screenshot 2026-07-02 194515.png) */}
        <div className="layout-datagrid-pagination-footer">
          <div className="footer-dropdown-selector-group">
            <span>Items per page:</span>
            <div className="native-select-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
          <div className="footer-navigator-buttons-track">
            <span className="navigator-index-display">
              {totalRecordsCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, totalRecordsCount)} of {totalRecordsCount}
            </span>
            <button 
              className="navigator-arrow-btn" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(idx => Math.max(idx - 1, 1))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button 
              className="navigator-arrow-btn" 
              disabled={currentPage >= maxPageCount} 
              onClick={() => setCurrentPage(idx => Math.min(idx + 1, maxPageCount))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Shared Smooth Pop-up Modal Architectural Overlay (Screenshot 2026-07-02 194346.png / Screenshot 2026-07-02 194445.png) */}
      {isModalOpen && (
        <div className="modal-viewport-backdrop-curtain">
          <div className="modal-dialog-surface-card">
            <div className="modal-surface-header-gradient">
              <div className="modal-header-profile-cluster">
                <img src={formPayload.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt="Form Avatar Context" className="modal-avatar-circle-frame" />
                <h2>{formMode === 'edit' ? `Edit ${formPayload.name}` : 'New Deduction'}</h2>
              </div>
              <button className="modal-dismissal-cross-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={dispatchFormSubmission} className="modal-dialog-form-body">
              <div className="modal-form-inputs-matrix-grid">
                {/* Employee Name Input */}
                <div className="material-input-layout-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={formPayload.name} 
                    onChange={(e) => mutateField('name', e.target.value)} 
                  />
                  <label>Employee Name*</label>
                  <span className="material-field-suffix-vector">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                </div>

                {/* Deduction Type Input */}
                <div className="material-input-layout-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={formPayload.type} 
                    onChange={(e) => mutateField('type', e.target.value)} 
                  />
                  <label>Deduction Type*</label>
                  <span className="material-field-suffix-vector">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </span>
                </div>

                {/* Amount Input */}
                <div className="material-input-layout-group">
                  <input 
                    type="number" 
                    required 
                    placeholder=" "
                    value={formPayload.amount || ''} 
                    onChange={(e) => mutateField('amount', e.target.value)} 
                  />
                  <label>Amount*</label>
                  <span className="material-field-suffix-vector typographical-symbol-icon">$</span>
                </div>

                {/* Date Input Calendar Box */}
                <div className="material-input-layout-group">
                  <input 
                    type="date" 
                    required
                    value={formPayload.date} 
                    onChange={(e) => mutateField('date', e.target.value)} 
                  />
                  <label>Date*</label>
                </div>

                {/* Description Input Container */}
                <div className="material-input-layout-group">
                  <input 
                    type="text" 
                    placeholder=" "
                    value={formPayload.description} 
                    onChange={(e) => mutateField('description', e.target.value)} 
                  />
                  <label>Description</label>
                  <span className="material-field-suffix-vector">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                  </span>
                </div>

                {/* Status Selection Dropdown */}
                <div className="material-input-layout-group">
                  <select 
                    value={formPayload.status} 
                    onChange={(e) => mutateField('status', e.target.value)}
                  >
                    <option value="Deducted">Deducted</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <label>Status*</label>
                </div>
              </div>

              {/* Action Operations Commit Row */}
              <div className="modal-dialog-commit-actions-row">
                <button type="submit" className="dialog-action-btn variant-save">Save</button>
                <button type="button" className="dialog-action-btn variant-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deductions;