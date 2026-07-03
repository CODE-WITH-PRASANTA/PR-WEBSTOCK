import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRefreshCw, FiDownload, 
  FiEdit, FiTrash2, FiX, FiChevronLeft, FiChevronRight,
  FiCalendar, FiUser, FiHome, FiBriefcase, FiMenu, FiDollarSign,
  FiChevronUp, FiChevronDown
} from 'react-icons/fi';
import './ExpenseApprovals.css';

// Initial Mock Dataset extracted directly from the reference layouts
const initialApprovals = [
  { id: 1, requestBy: 'John Doe', item: 'Laptop Repair', department: 'IT', project: 'Asset Maint', amount: 150, date: '2023-01-15', note: 'Screen cracked', priority: 'High', status: 'Pending' },
  { id: 2, requestBy: 'Sarah Smith', item: 'Client Lunch', department: 'Sales', project: 'Q1 Sales', amount: 85.5, date: '2023-01-18', note: 'With Leads', priority: 'Medium', status: 'Approved' },
  { id: 3, requestBy: 'Mike Ross', item: 'Software License', department: 'IT', project: 'Infrastructure', amount: 499, date: '2023-01-20', note: 'Too expensive', priority: 'High', status: 'Rejected' },
  { id: 4, requestBy: 'Emily Blunt', item: 'Office Chair', department: 'Admin', project: 'Facilities', amount: 120, date: '2023-01-22', note: 'Ergonomic', priority: 'Low', status: 'Pending' },
  { id: 5, requestBy: 'John Doe', item: 'Travel Expenses', department: 'Sales', project: 'Client Visit', amount: 350, date: '2023-01-25', note: 'Flight', priority: 'High', status: 'Approved' },
  { id: 6, requestBy: 'Sarah Smith', item: 'Printing', department: 'Has to be done', project: 'Marketing', amount: 45, date: '2023-01-28', note: 'Flyers', priority: 'Low', status: 'Completed' },
  { id: 7, requestBy: 'Mike Ross', item: 'Team Dinner', department: 'Engineering', project: 'Milestone', amount: 200, date: '2023-02-01', note: 'Celebration', priority: 'Medium', status: 'Pending' },
  { id: 8, requestBy: 'Emily Blunt', item: 'Monitor', department: 'Design', project: 'UI/UX', amount: 180, date: '2023-02-03', note: '4K Display', priority: 'High', status: 'Approved' },
  { id: 9, requestBy: 'Admin', item: 'Internet Bill', department: 'Admin', project: 'Utilities', amount: 80, date: '2023-02-05', note: 'Feb Bill', priority: 'Medium', status: 'Completed' },
  { id: 10, requestBy: 'Team Lead', item: 'Books', department: 'Learning', project: 'Training', amount: 60, date: '2023-02-10', note: 'Angular Books', priority: 'Low', status: 'Approved' }
];

const ExpenseApprovals = () => {
  // Primary Interactive State hooks
  const [approvals, setApprovals] = useState(initialApprovals);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Column Show/Hide Checklist visibility flags matching Reference 2 & 3
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    requestBy: true,
    item: true,
    department: true,
    project: true,
    amount: true,
    date: true,
    note: true,
    priority: true,
    status: true,
    actions: true
  });

  // Action Modal Overlay routing tracks
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [focusedApproval, setFocusedApproval] = useState(null);

  // Isolated Stateful Controlled Form fields payload
  const [formData, setFormData] = useState({
    requestBy: '', item: '', amount: 0, date: '', priority: 'Medium', status: 'Pending',
    department: '', project: '', note: ''
  });

  // --- Utility Actions handlers ---
  const toggleColumnVisibility = (colKey) => {
    setVisibleColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  const handleToggleSelectAllRows = (e) => {
    if (e.target.checked) {
      setSelectedIds(viewFilteredApprovals.map(app => app.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRowSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDownloadReport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(approvals, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'ExpenseApprovals_Export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // --- Trigger workflows launchers ---
  const launchAddModal = () => {
    setFormData({
      requestBy: '', item: '', amount: 0, date: '', priority: 'Medium', status: 'Pending',
      department: 'General', project: 'N/A', note: ''
    });
    setActiveModal('add');
  };

  const launchEditModal = (approval) => {
    setFocusedApproval(approval);
    setFormData({ ...approval });
    setActiveModal('edit');
  };

  const launchDeleteModal = (approval) => {
    setFocusedApproval(approval);
    setActiveModal('delete');
  };

  // --- CRUD Persistent State mutated submissions ---
  const executeFormSubmitWorkflow = (e) => {
    e.preventDefault();
    if (activeModal === 'add') {
      const generatedRecord = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount) || 0
      };
      setApprovals([generatedRecord, ...approvals]);
    } else if (activeModal === 'edit') {
      setApprovals(approvals.map(item => 
        item.id === focusedApproval.id ? { ...formData, amount: parseFloat(formData.amount) || 0 } : item
      ));
    }
    setActiveModal(null);
  };

  const executeDeleteWorkflowConfirmation = () => {
    setApprovals(approvals.filter(item => item.id !== focusedApproval.id));
    setSelectedIds(selectedIds.filter(id => id !== focusedApproval.id));
    setActiveModal(null);
  };

  // Dynamic downstream calculated runtime matching query pipeline
  const viewFilteredApprovals = approvals.filter(item =>
    item.requestBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPriorityIcon = (priority) => {
    if (priority === 'High') return <FiChevronUp className="Priority-icon-up" />;
    if (priority === 'Low') return <FiChevronDown className="Priority-icon-down" />;
    return <FiChevronUp className="Priority-icon-med" />;
  };

  return (
    <div className="ExpenseApprovals-container">
      {/* Top Breadcrumb Nav Bar Section */}
      <div className="ExpenseApprovals-header-nav">
        <h2>Expense Approvals</h2>
        <div className="ExpenseApprovals-breadcrumb">
          <FiHome size={14} /> <span>Accounts</span> &gt; <span className="active">Expense Approvals</span>
        </div>
      </div>

      {/* Main Table Interface Controller Panel */}
      <div className="ExpenseApprovals-toolbar">
        <div className="ExpenseApprovals-search-wrapper">
          <FiSearch className="ExpenseApprovals-search-icon" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ExpenseApprovals-actions-right">
          <div className="ExpenseApprovals-filter-dropdown-container">
            <button className="ExpenseApprovals-btn icon-btn filter-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
              <FiFilter />
            </button>
            {showFilterDropdown && (
              <div className="ExpenseApprovals-filter-menu">
                <div className="ExpenseApprovals-filter-title">Show/Hide Column</div>
                <div className="ExpenseApprovals-filter-options-scroll">
                  {Object.keys(visibleColumns).map((colKey) => (
                    <label key={colKey} className="ExpenseApprovals-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[colKey]} 
                        onChange={() => toggleColumnVisibility(colKey)} 
                      />
                      <span className="ExpenseApprovals-custom-checkbox"></span>
                      <span className="ExpenseApprovals-label-text">
                        {colKey === 'requestBy' ? 'Request By' : colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="ExpenseApprovals-btn icon-btn add-btn" onClick={launchAddModal}><FiPlus /></button>
          <button className="ExpenseApprovals-btn icon-btn refresh-btn" onClick={() => setApprovals(initialApprovals)}><FiRefreshCw /></button>
          <button className="ExpenseApprovals-btn icon-btn download-btn" onClick={handleDownloadReport}><FiDownload /></button>
        </div>
      </div>

      {/* Core Responsive Data Table Canvas Wrapper */}
      <div className="ExpenseApprovals-table-card">
        <div className="ExpenseApprovals-table-responsive">
          <table className="ExpenseApprovals-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="40">
                    <label className="ExpenseApprovals-table-checkbox">
                      <input 
                        type="checkbox" 
                        onChange={handleToggleSelectAllRows}
                        checked={viewFilteredApprovals.length > 0 && selectedIds.length === viewFilteredApprovals.length}
                      />
                      <span className="ExpenseApprovals-custom-checkbox"></span>
                    </label>
                  </th>
                )}
                {visibleColumns.requestBy && <th>Request By</th>}
                {visibleColumns.item && <th>Item</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.project && <th>Project</th>}
                {visibleColumns.amount && <th>Amount</th>}
                {visibleColumns.date && <th>Date</th>}
                {visibleColumns.note && <th>Note</th>}
                {visibleColumns.priority && <th>Priority</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {viewFilteredApprovals.map((approval) => (
                <tr key={approval.id} className={selectedIds.includes(approval.id) ? 'row-selected' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <label className="ExpenseApprovals-table-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(approval.id)}
                          onChange={() => handleToggleRowSelection(approval.id)}
                        />
                        <span className="ExpenseApprovals-custom-checkbox"></span>
                      </label>
                    </td>
                  )}
                  {visibleColumns.requestBy && <td>{approval.requestBy}</td>}
                  {visibleColumns.item && <td><strong>{approval.item}</strong></td>}
                  {visibleColumns.department && <td>{approval.department}</td>}
                  {visibleColumns.project && <td>{approval.project}</td>}
                  {visibleColumns.amount && <td>{approval.amount}</td>}
                  {visibleColumns.date && (
                    <td className="ExpenseApprovals-date-cell">
                      <FiCalendar className="cell-icon" /> {approval.date.replace(/-/g, '/')}
                    </td>
                  )}
                  {visibleColumns.note && <td className="ExpenseApprovals-truncate-text">{approval.note || '—'}</td>}
                  {visibleColumns.priority && (
                    <td className="ExpenseApprovals-priority-cell">
                      {renderPriorityIcon(approval.priority)} {approval.priority}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td>
                      <span className={`ExpenseApprovals-badge badge-${approval.status.toLowerCase()}`}>
                        {approval.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="ExpenseApprovals-action-buttons text-center">
                      <button className="ExpenseApprovals-action-btn edit-action" onClick={() => launchEditModal(approval)}>
                        <FiEdit />
                      </button>
                      <button className="ExpenseApprovals-action-btn delete-action" onClick={() => launchDeleteModal(approval)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dense Pagination Navigation Bar block footer */}
        <div className="ExpenseApprovals-pagination">
          <div className="ExpenseApprovals-pagination-left">
            <span>Items per page:</span>
            <select className="ExpenseApprovals-page-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="ExpenseApprovals-pagination-right">
            <span>1 – {viewFilteredApprovals.length} of {approvals.length}</span>
            <button className="ExpenseApprovals-pager-btn" disabled><FiChevronLeft /></button>
            <button className="ExpenseApprovals-pager-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* --- ADD / EDIT OPERATION POPUP MODAL (References 4 & 5) --- */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <div className="ExpenseApprovals-modal-overlay">
          <div className="ExpenseApprovals-modal-card">
            <div className="ExpenseApprovals-modal-header">
              <h3>{activeModal === 'add' ? 'New Approval' : `Edit Approval: ${focusedApproval?.item}`}</h3>
              <button className="ExpenseApprovals-modal-close" onClick={() => setActiveModal(null)}><FiX /></button>
            </div>
            <form onSubmit={executeFormSubmitWorkflow} className="ExpenseApprovals-modal-form">
              <div className="ExpenseApprovals-form-grid">
                <div className="ExpenseApprovals-form-group">
                  <label>Request By*</label>
                  <div className="ExpenseApprovals-input-wrapper">
                    <input type="text" required value={formData.requestBy} onChange={(e) => setFormData({...formData, requestBy: e.target.value})} />
                    <FiUser className="input-icon" />
                  </div>
                </div>
                <div className="ExpenseApprovals-form-group">
                  <label>Item*</label>
                  <div className="ExpenseApprovals-input-wrapper">
                    <input type="text" required value={formData.item} onChange={(e) => setFormData({...formData, item: e.target.value})} />
                    <FiMenu className="input-icon" />
                  </div>
                </div>
                <div className="ExpenseApprovals-form-group">
                  <label>Amount*</label>
                  <div className="ExpenseApprovals-input-wrapper">
                    <input type="number" step="0.01" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                    <FiDollarSign className="input-icon" />
                  </div>
                </div>
                <div className="ExpenseApprovals-form-group">
                  <label>Date*</label>
                  <div className="ExpenseApprovals-input-wrapper">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    <FiCalendar className="input-icon" />
                  </div>
                </div>
                <div className="ExpenseApprovals-form-group">
                  <label>Priority*</label>
                  <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="ExpenseApprovals-form-group">
                  <label>Status*</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="ExpenseApprovals-form-actions">
                <button type="submit" className="ExpenseApprovals-btn btn-save">Save</button>
                <button type="button" className="ExpenseApprovals-btn btn-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETION OVERLAY POPUP (Reference 6) --- */}
      {activeModal === 'delete' && (
        <div className="ExpenseApprovals-modal-overlay">
          <div className="ExpenseApprovals-delete-card">
            <h3>Are you sure?</h3>
            <div className="ExpenseApprovals-delete-details">
              <p>Request By: {focusedApproval?.requestBy}</p>
              <p>Item: {focusedApproval?.item}</p>
            </div>
            <div className="ExpenseApprovals-delete-actions">
              <button className="ExpenseApprovals-btn btn-delete-confirm" onClick={executeDeleteWorkflowConfirmation}>Delete</button>
              <button className="ExpenseApprovals-btn btn-cancel-confirm" onClick={() => setActiveModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseApprovals;