import React, { useState, useMemo } from 'react';
import './StatutoryCompliance.css';

// Complete precise mock dataset extracted from Screenshot 2026-07-02 195527.png
const INITIAL_COMPLIANCE_DATA = [
  { id: 1, type: 'PF', period: 'September 2023', amount: 45000, dueDate: '2023-10-15', paidDate: '2023-10-12', status: 'Paid' },
  { id: 2, type: 'ESI', period: 'September 2023', amount: 12000, dueDate: '2023-10-15', paidDate: '2023-10-12', status: 'Paid' },
  { id: 3, type: 'TDS', period: 'September 2023', amount: 85000, dueDate: '2023-10-07', paidDate: '2023-10-05', status: 'Paid' },
  { id: 4, type: 'Professional Tax', period: 'September 2023', amount: 5000, dueDate: '2023-10-31', paidDate: '2023-10-25', status: 'Paid' },
  { id: 5, type: 'GST', period: 'September 2023', amount: 150000, dueDate: '2023-10-20', paidDate: '', status: 'Pending' },
  { id: 6, type: 'PF', period: 'August 2023', amount: 44500, dueDate: '2023-09-15', paidDate: '2023-09-14', status: 'Paid' },
  { id: 7, type: 'ESI', period: 'August 2023', amount: 11800, dueDate: '2023-09-15', paidDate: '2023-09-14', status: 'Paid' },
  { id: 8, type: 'TDS', period: 'August 2023', amount: 82000, dueDate: '2023-09-07', paidDate: '2023-09-06', status: 'Paid' },
  { id: 9, type: 'Professional Tax', period: 'August 2023', amount: 5000, dueDate: '2023-10-01', paidDate: '', status: 'Overdue' },
  { id: 10, type: 'GST', period: 'August 2023', amount: 145000, dueDate: '2023-09-20', paidDate: '2023-09-19', status: 'Paid' },
  { id: 11, type: 'PF', period: 'July 2023', amount: 42000, dueDate: '2023-08-15', paidDate: '2023-08-14', status: 'Paid' },
  { id: 12, type: 'ESI', period: 'July 2023', amount: 11000, dueDate: '2023-08-15', paidDate: '2023-08-14', status: 'Paid' }
];

const StatutoryCompliance = () => {
  // Operational Reactive Framework States
  const [complianceRecords, setComplianceRecords] = useState(INITIAL_COMPLIANCE_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // Pagination Controller Engine State Metrics (Screenshot 2026-07-02 194515_2.png)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Column Visibility Selection Configuration Map (Screenshot 2026-07-02 195650.png)
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    checkbox: true,
    id: false,
    complianceType: true,
    period: true,
    amount: true,
    dueDate: true,
    paidDate: true,
    status: true,
    actions: true
  });

  // Modal Dynamic Transition States (Screenshot 2026-07-02 195610.png & 195718.png)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [formPayload, setFormPayload] = useState({
    id: null, type: '', period: '', amount: 0, dueDate: '2026-07-02', paidDate: '2026-07-02', status: 'Pending'
  });

  // Live Inline Data Filter Evaluator
  const filteredRecords = useMemo(() => {
    return complianceRecords.filter(item =>
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [complianceRecords, searchTerm]);

  // Compute Page Slicing Segments
  const totalRecordsCount = filteredRecords.length;
  const maxPageCount = Math.ceil(totalRecordsCount / itemsPerPage) || 1;
  const paginatedDataSet = useMemo(() => {
    const startOffset = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(startOffset, startOffset + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  // Checkbox Event Pipeline Listeners
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

  // Launch New Compliance Form Window Overlay (Screenshot 2026-07-02 195718.png)
  const openAddRecordForm = () => {
    setFormMode('add');
    setFormPayload({
      id: null,
      type: '',
      period: 'September 2023',
      amount: 0,
      dueDate: new Date().toISOString().split('T')[0],
      paidDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });
    setIsModalOpen(true);
  };

  // Launch Existing Update Form Window Overlay (Screenshot 2026-07-02 195610.png)
  const openEditRecordForm = (record) => {
    setFormMode('edit');
    setFormPayload({ ...record });
    setIsModalOpen(true);
  };

  // Controlled Payload Mutation Engine Hook
  const mutateField = (property, value) => {
    setFormPayload(prev => ({
      ...prev,
      [property]: property === 'amount' ? Number(value) : value
    }));
  };

  // Save/Update Commit Action Handlers
  const dispatchFormSubmission = (e) => {
    e.preventDefault();
    if (!formPayload.type.trim() || !formPayload.period.trim()) return;

    if (formMode === 'add') {
      const generatedEntry = { ...formPayload, id: Date.now() };
      setComplianceRecords([generatedEntry, ...complianceRecords]);
    } else {
      setComplianceRecords(complianceRecords.map(entry => entry.id === formPayload.id ? formPayload : entry));
    }
    setIsModalOpen(false);
  };

  // Row Entry Eraser Dispatches
  const executeRowDeletion = (id) => {
    if (confirm('Proceed with removing this compliance matrix record?')) {
      setComplianceRecords(complianceRecords.filter(item => item.id !== id));
      setSelectedRowIds(selectedRowIds.filter(rowId => rowId !== id));
    }
  };

  const dispatchSystemRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    alert('System datagrid successfully refreshed.');
  };

  const dispatchDataExport = () => {
    alert('Initiating operational audit pipeline download.');
  };

  // Format Dates safely for presentation layers
  const formatCellDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return dateString;
  };

  return (
    <div className="compliance-view-wrapper">
      {/* Structural Global Breadcrumb Context Head */}
      <div className="view-navigation-header">
        <h1>Statutory Compliance</h1>
        <div className="navigation-trail-node">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>&nbsp;&gt;&nbsp;Payroll&nbsp;&gt;&nbsp;<span className="current-node-active">Statutory Compliance</span></span>
        </div>
      </div>

      {/* Main Container Content Card */}
      <div className="compliance-layout-frame">
        {/* Actions Grid Toolbar */}
        <div className="layout-control-toolbar">
          <div className="toolbar-left-cluster">
            <span className="grid-component-identity">Statutory Compliance</span>
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
            {/* Show/Hide Columns Dropdown Assembly (Screenshot 2026-07-02 195650.png) */}
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

            <button className="toolbar-action-trigger add-record-highlight" title="Add Record" onClick={openAddRecordForm}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button className="toolbar-action-trigger" title="Refresh" onClick={dispatchSystemRefresh}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
            <button className="toolbar-action-trigger" title="Download Audit Binary Document" onClick={dispatchDataExport}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>

        {/* Responsive Scrolling Viewport Container Shield */}
        <div className="responsive-table-scroll-shield">
          <table className="compliance-core-datagrid">
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
                {columnVisibility.complianceType && <th>Compliance Type</th>}
                {columnVisibility.period && <th>Period</th>}
                {columnVisibility.amount && <th>Amount</th>}
                {columnVisibility.dueDate && <th>Due Date</th>}
                {columnVisibility.paidDate && <th>Paid Date</th>}
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
                    {columnVisibility.complianceType && <td className="compliance-type-bold">{item.type}</td>}
                    {columnVisibility.period && <td>{item.period}</td>}
                    {columnVisibility.amount && <td className="numeric-amount-item-val">{item.amount}</td>}
                    {columnVisibility.dueDate && (
                      <td>
                        <div className="grid-calendar-capsule">
                          <svg className="embedded-calendar-vector" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                          <span>{formatCellDate(item.dueDate)}</span>
                        </div>
                      </td>
                    )}
                    {columnVisibility.paidDate && (
                      <td>
                        {item.paidDate ? (
                          <div className="grid-calendar-capsule">
                            <svg className="embedded-calendar-vector" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                            <span>{formatCellDate(item.paidDate)}</span>
                          </div>
                        ) : (
                          <div className="grid-calendar-capsule empty-date-vector-cell">
                            <svg className="embedded-calendar-vector" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                          </div>
                        )}
                      </td>
                    )}
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
                  <td colSpan="9" className="datagrid-blankstate-notice">No statutory compliance metrics matching parameters found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginated Operations Footer Module Framework (Screenshot 2026-07-02 194515_2.png) */}
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

      {/* Pop-up Overlay Transitions Manager Frame (Screenshot 2026-07-02 195610.png & 195718.png) */}
      {isModalOpen && (
        <div className="modal-viewport-backdrop-curtain">
          <div className="modal-dialog-surface-card">
            <div className="modal-surface-header-gradient">
              <div className="modal-header-profile-cluster">
                <h2>{formMode === 'edit' ? `Edit ${formPayload.type}` : 'New Compliance Record'}</h2>
              </div>
              <button className="modal-dismissal-cross-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={dispatchFormSubmission} className="modal-dialog-form-body">
              <div className="modal-form-inputs-matrix-grid">
                {/* Compliance Type Input Box */}
                <div className="material-input-layout-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={formPayload.type} 
                    onChange={(e) => mutateField('type', e.target.value)} 
                  />
                  <label>Compliance Type*</label>
                  <span className="material-field-suffix-vector">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                  </span>
                </div>

                {/* Period Input Frame */}
                <div className="material-input-layout-group">
                  <input 
                    type="text" 
                    required 
                    placeholder=" "
                    value={formPayload.period} 
                    onChange={(e) => mutateField('period', e.target.value)} 
                  />
                  <label>Period*</label>
                  <span className="material-field-suffix-vector">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="18" y2="10"></line></svg>
                  </span>
                </div>

                {/* Amount Input Frame */}
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

                {/* Due Date Calendar Picker Input */}
                <div className="material-input-layout-group">
                  <input 
                    type="date" 
                    required
                    value={formPayload.dueDate} 
                    onChange={(e) => mutateField('dueDate', e.target.value)} 
                  />
                  <label>Due Date*</label>
                </div>

                {/* Paid Date Calendar Picker Input */}
                <div className="material-input-layout-group">
                  <input 
                    type="date" 
                    value={formPayload.paidDate} 
                    onChange={(e) => mutateField('paidDate', e.target.value)} 
                  />
                  <label>Paid Date</label>
                </div>

                {/* Status Options Selector Block */}
                <div className="material-input-layout-group">
                  <select 
                    value={formPayload.status} 
                    onChange={(e) => mutateField('status', e.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                  <label>Status*</label>
                </div>
              </div>

              {/* Interactive Operation Handles Bar */}
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

export default StatutoryCompliance;