import React, { useState } from 'react';
import {
  FiHome,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiPlusCircle,
  FiRefreshCw,
  FiDownload,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiBookmark,
  FiCreditCard,
  FiAlignLeft,
  FiChevronDown,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import './TaxReports.css';

const TaxReports = () => {
  // Initial Mock Data matching Reference 1
  const initialData = [
    { id: 1, ref: '#REF-001', name: 'Q1 GST Filing', year: '2023', period: 'Jan-Mar', type: 'GST', amount: 15000, method: 'Net Banking', due: '04/15/2023', note: 'Q1 Sales', status: 'Submitted' },
    { id: 2, ref: '#REF-002', name: 'Monthly TDS', year: '2023', period: 'January', type: 'TDS', amount: 8550, method: 'UPI', due: '02/07/2023', note: 'Salaries', status: 'Completed' },
    { id: 3, ref: '#REF-003', name: 'Annual IT Return', year: '2022', period: 'Annual', type: 'Income Tax', amount: 49900, method: 'Cheque', due: '07/31/2023', note: 'Audit Pending', status: 'Processing' },
    { id: 4, ref: '#REF-004', name: 'Q2 GST Filing', year: '2023', period: 'Apr-Jun', type: 'GST', amount: 12000, method: 'Bank Transfer', due: '07/15/2023', note: 'Q2 Review', status: 'Pending' },
    { id: 5, ref: '#REF-005', name: 'Monthly TDS', year: '2023', period: 'February', type: 'TDS', amount: 3500, method: 'Net Banking', due: '03/07/2023', note: 'Vendor Payment...', status: 'Submitted' },
    { id: 6, ref: '#REF-006', name: 'Advance Tax Q1', year: '2023', period: 'Q1', type: 'Income Tax', amount: 45000, method: 'UPI', due: '06/15/2023', note: 'Verified', status: 'Completed' },
    { id: 7, ref: '#REF-007', name: 'Advance Tax Q2', year: '2023', period: 'Q2', type: 'Income Tax', amount: 20000, method: 'Cheque', due: '09/15/2023', note: 'Estimated', status: 'Pending' },
    { id: 8, ref: '#REF-008', name: 'Monthly TDS', year: '2023', period: 'March', type: 'TDS', amount: 1800, method: 'Bank Transfer', due: '04/07/2023', note: 'Final', status: 'Completed' },
    { id: 9, ref: '#REF-009', name: 'Q3 GST Filing', year: '2023', period: 'Jul-Sep', type: 'GST', amount: 8000, method: 'Net Banking', due: '10/15/2023', note: 'Draft', status: 'Draft' },
    { id: 10, ref: '#REF-010', name: 'Monthly TDS', year: '2023', period: 'April', type: 'TDS', amount: 6000, method: 'UPI', due: '05/07/2023', note: 'Reviewed', status: 'Submitted' }
  ];

  // State Management
  const [reports, setReports] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Interactive Overlays toggles
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete'
  const [selectedReport, setSelectedReport] = useState(null);

  // Column Visibility Config (Reference 2 & 3)
  const [columns, setColumns] = useState({
    checkbox: true,
    reference: true,
    reportName: true,
    year: true,
    period: true,
    taxType: true,
    amount: true,
    paymentMethod: true,
    dueDate: true,
    note: true,
    status: true,
    actions: true
  });

  // Dynamic Form Templates State
  const [formData, setFormData] = useState({
    name: '', year: '', period: '', type: 'GST', amount: 0, due: '', ref: '#REF-000', method: 'Bank Transfer', note: '', status: 'Draft'
  });

  // Action Mechanics
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(reports.map(r => r.id));
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

  const toggleColumn = (col) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const triggerRefresh = () => {
    setReports([]);
    setTimeout(() => {
      setReports(initialData);
      alert('Tax records refreshed smoothly.');
    }, 400);
  };

  const triggerDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(reports, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'Tax_Reports_Export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleOpenAdd = () => {
    setFormData({ name: '', year: '', period: '', type: 'GST', amount: 0, due: '', ref: `#REF-0${reports.length + 1}`, method: 'Bank Transfer', note: '', status: 'Draft' });
    setActiveModal('add');
  };

  const handleOpenEdit = (report) => {
    setSelectedReport(report);
    setFormData({ ...report, name: report.name, year: report.year, period: report.period, type: report.type, amount: report.amount, due: report.due, ref: report.ref, method: report.method, note: report.note, status: report.status });
    setActiveModal('edit');
  };

  const handleOpenDelete = (report) => {
    setSelectedReport(report);
    setActiveModal('delete');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeModal === 'add') {
      const newRecord = { ...formData, id: Date.now() };
      setReports([newRecord, ...reports]);
    } else if (activeModal === 'edit') {
      setReports(reports.map(r => r.id === selectedReport.id ? { ...r, ...formData } : r));
    }
    setActiveModal(null);
  };

  const handleDeleteConfirm = () => {
    setReports(reports.filter(r => r.id !== selectedReport.id));
    setActiveModal(null);
  };

  const filteredReports = reports.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tax-reports-container">
      {/* Dynamic Header Block */}
      <div className="tax-reports-header">
        <h2>Tax Reports</h2>
        <div className="tax-reports-breadcrumb">
          <FiHome size={14} /> <FiChevronRight className="arrow-icon" /> <span>Accounts</span> <FiChevronRight className="arrow-icon" /> <span className="active-path">Tax Reports</span>
        </div>
      </div>

      {/* Main Core Functional Panel Grid */}
      <div className="tax-reports-panel">
        <div className="tax-reports-toolbar">
          <div className="toolbar-left-group">
            <span className="panel-title">Tax Reports</span>
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="toolbar-right-actions">
            {/* Filter Toggle Config Popover */}
            <div className="action-popover-anchor">
              <button className="icon-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)} title="Show/Hide Columns">
                <FiFilter />
              </button>
              {showFilterDropdown && (
                <div className="tax-reports-column-dropdown">
                  <div className="dropdown-header">Show/Hide Column</div>
                  <div className="dropdown-scroll-box">
                    {Object.keys(columns).map((key) => (
                      <label key={key} className="checkbox-item">
                        <input 
                          type="checkbox" 
                          checked={columns[key]} 
                          onChange={() => toggleColumn(key)} 
                        />
                        <span>{key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="icon-btn add-btn" onClick={handleOpenAdd} title="Create New Report">
              <FiPlusCircle />
            </button>
            <button className="icon-btn" onClick={triggerRefresh} title="Refresh Table Grid">
              <FiRefreshCw />
            </button>
            <button className="icon-btn" onClick={triggerDownload} title="Download Export Document">
              <FiDownload />
            </button>
          </div>
        </div>

        {/* Data Grid Responsive Wrapper Component */}
        <div className="tax-reports-table-wrapper">
          <table className="tax-reports-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th width="40">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={selectedIds.length === filteredReports.length && filteredReports.length > 0} 
                    />
                  </th>
                )}
                {columns.reference && <th>Reference</th>}
                {columns.reportName && <th>Report Name</th>}
                {columns.year && <th>Year</th>}
                {columns.period && <th>Period</th>}
                {columns.taxType && <th>Tax Type</th>}
                {columns.amount && <th>Amount</th>}
                {columns.paymentMethod && <th>Payment Method</th>}
                {columns.dueDate && <th>Due Date</th>}
                {columns.note && <th>Note</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="center-text">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className={selectedIds.includes(report.id) ? 'row-selected' : ''}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(report.id)} 
                        onChange={() => handleSelectRow(report.id)}
                      />
                    </td>
                  )}
                  {columns.reference && <td className="text-bold-ref">{report.ref}</td>}
                  {columns.reportName && <td>{report.name}</td>}
                  {columns.year && <td>{report.year}</td>}
                  {columns.period && <td>{report.period}</td>}
                  {columns.taxType && <td>{report.type}</td>}
                  {columns.amount && <td>{report.amount.toLocaleString()}</td>}
                  {columns.paymentMethod && <td>{report.method}</td>}
                  {columns.dueDate && (
                    <td>
                      <div className="date-cell-wrapper">
                        <FiCalendar size={13} className="inline-calendar-icon" />
                        {report.due}
                      </div>
                    </td>
                  )}
                  {columns.note && <td className="text-muted-notes">{report.note}</td>}
                  {columns.status && (
                    <td>
                      <span className={`status-pill pill-${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="action-buttons-flex">
                        <button className="action-row-btn edit-action" onClick={() => handleOpenEdit(report)}>
                          <FiEdit2 />
                        </button>
                        <button className="action-row-btn delete-action" onClick={() => handleOpenDelete(report)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Static Table Footer Context Data */}
        <div className="tax-reports-footer">
          <div className="items-per-page-selector">
            <span>Items per page:</span>
            <div className="inline-dropdown-view">
              10 <FiChevronDown size={12} />
            </div>
          </div>
          <div className="pagination-count-label">
            1 – {filteredReports.length} of {reports.length}
            <div className="pagination-arrows-disabled">
              <span className="arrow-nav-mock">‹</span>
              <span className="arrow-nav-mock">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL LIGHTBOX LAYOUT INTERFACES (Reference 4, 5, 6) */}
      {activeModal && (
        <div className="tax-reports-modal-overlay">
          
          {/* Create & Edit Modal Shared Structural Layout Form */}
          {(activeModal === 'add' || activeModal === 'edit') && (
            <div className="tax-reports-form-card">
              <div className="form-card-header">
                <h3>{activeModal === 'add' ? 'New Report' : `Edit Report: ${selectedReport?.name}`}</h3>
                <button className="close-modal-btn" onClick={() => setActiveModal(null)}><FiX /></button>
              </div>
              <form onSubmit={handleFormSubmit} className="form-card-body">
                <div className="form-input-grid-row">
                  <div className="floating-input-group">
                    <label>Report Name*</label>
                    <div className="field-icon-input">
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Q1 GST Filing" />
                      <FiFileText className="field-inner-icon" />
                    </div>
                  </div>
                  <div className="floating-input-group">
                    <label>Year*</label>
                    <div className="field-icon-input">
                      <input type="text" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2023" />
                      <FiCalendar className="field-inner-icon" />
                    </div>
                  </div>
                </div>

                <div className="form-input-grid-row">
                  <div className="floating-input-group">
                    <label>Period*</label>
                    <div className="field-icon-input">
                      <input type="text" required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} placeholder="Jan-Mar" />
                      <FiCalendar className="field-inner-icon" />
                    </div>
                  </div>
                  <div className="floating-input-group">
                    <label>Tax Type*</label>
                    <div className="field-icon-input">
                      <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="GST">GST</option>
                        <option value="TDS">TDS</option>
                        <option value="Income Tax">Income Tax</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-input-grid-row">
                  <div className="floating-input-group">
                    <label>Amount*</label>
                    <div className="field-icon-input">
                      <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: parseInt(e.target.value) || 0})} />
                      <FiDollarSign className="field-inner-icon" />
                    </div>
                  </div>
                  <div className="floating-input-group">
                    <label>Due Date*</label>
                    <div className="field-icon-input">
                      <input type="text" required value={formData.due} onChange={e => setFormData({...formData, due: e.target.value})} placeholder="2023-04-15" />
                      <FiCalendar className="field-inner-icon" />
                    </div>
                  </div>
                </div>

                <div className="form-input-grid-row">
                  <div className="floating-input-group">
                    <label>Reference</label>
                    <div className="field-icon-input">
                      <input type="text" value={formData.ref} onChange={e => setFormData({...formData, ref: e.target.value})} />
                      <FiBookmark className="field-inner-icon" />
                    </div>
                  </div>
                  <div className="floating-input-group">
                    <label>Payment Method</label>
                    <div className="field-icon-input">
                      <select value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})}>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="UPI">UPI</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                      <FiCreditCard className="field-inner-select-icon" />
                    </div>
                  </div>
                </div>

                <div className="floating-input-group full-width-field">
                  <label>Note</label>
                  <div className="field-icon-input">
                    <textarea rows="2" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} placeholder="Note description details..."></textarea>
                    <FiAlignLeft className="field-inner-icon area-icon-fix" />
                  </div>
                </div>

                <div className="floating-input-group full-width-field spacing-bottom-fix">
                  <label>Status*</label>
                  <div className="field-icon-input">
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Draft">Draft</option>
                      <option value="Pending">Pending</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Completed">Completed</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions-footer-row">
                  <button type="submit" className="form-submit-btn modal-blue-btn">Save</button>
                  <button type="button" className="form-cancel-btn modal-red-btn" onClick={() => setActiveModal(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Prompt Dialog Verification Prompt Layout Block (Reference 6) */}
          {activeModal === 'delete' && (
            <div className="tax-reports-delete-dialog">
              <h3>Are you sure?</h3>
              <p className="delete-info-line">Report Name: {selectedReport?.name}</p>
              <p className="delete-info-line">Year: {selectedReport?.year}</p>
              
              <div className="delete-dialog-actions">
                <button className="modal-red-btn" onClick={handleDeleteConfirm}>Delete</button>
                <button className="modal-blue-btn" onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default TaxReports;