import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRefreshCw, FiDownload, 
  FiEdit, FiTrash2, FiX, FiChevronLeft, FiChevronRight,
  FiCalendar, FiUser, FiHome, FiBriefcase, FiMenu, FiDollarSign
} from 'react-icons/fi';
import './Expenses.css';

// Initial data from the reference image
const initialExpenses = [
  { id: 1, item: 'Office Supplies', department: 'HR', project: 'N/A', orderBy: 'John Doe', from: 'Amazon', date: '2023-01-15', amount: 150, note: 'Monthly supplies', status: 'Approved', paidBy: 'Credit Card' },
  { id: 2, item: 'Team Lunch', department: 'Sales', project: 'Q1 Sales', orderBy: 'Sarah Smith', from: 'Pizza Hut', date: '2023-01-20', amount: 85.5, note: 'Team bonding', status: 'Completed', paidBy: 'Cash' },
  { id: 3, item: 'Software License', department: 'IT', project: 'Infrastructure', orderBy: 'Mike Ross', from: 'Adobe', date: '2023-02-01', amount: 350, note: 'Annual license', status: 'Approved', paidBy: 'Paypal' },
  { id: 4, item: 'Travel', department: 'HR', project: 'Recruitment', orderBy: 'John Doe', from: 'Uber', date: '2023-02-05', amount: 45, note: 'Interview commute', status: 'Pending', paidBy: 'Credit Card' },
  { id: 5, item: 'Stationery', department: 'Marketing', project: 'Branding', orderBy: 'Emily Blunt', from: 'Office Depot', date: '2023-02-10', amount: 55.2, note: '', status: 'Completed', paidBy: 'Cash' },
  { id: 6, item: 'Hotel Stay', department: 'IT', project: 'Conference', orderBy: 'Mike Ross', from: 'Marriott', date: '2023-02-15', amount: 450, note: '2 nights', status: 'Approved', paidBy: 'Credit Card' },
  { id: 7, item: 'Conference Fee', department: 'Sales', project: 'Training', orderBy: 'Sarah Smith', from: 'Tech Conf', date: '2023-02-20', amount: 200, note: 'Early bird', status: 'Pending', paidBy: 'Paypal' },
  { id: 8, item: 'Client Dinner', department: 'HR', project: 'Partnership', orderBy: 'John Doe', from: 'Steakhouse', date: '2023-02-25', amount: 180, note: 'With ABC Corp', status: 'Completed', paidBy: 'Credit Card' },
  { id: 9, item: 'Internet Bill', department: 'Admin', project: 'N/A', orderBy: 'Admin', from: 'ISP Provider', date: '2023-03-01', amount: 80, note: 'March 2023', status: 'Approved', paidBy: 'Bank Transfer' },
  { id: 10, item: 'Coffee', department: 'Sales', project: 'Meeting', orderBy: 'Team', from: 'Starbucks', date: '2023-03-05', amount: 25, note: 'Client meeting', status: 'Completed', paidBy: 'Cash' }
];

const Expenses = () => {
  // Core state variables
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Dropdown column visibility settings
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    calculatedItem: true,
    department: true,
    project: true,
    orderBy: true,
    from: true,
    date: true,
    amount: true,
    note: true,
    status: true,
    paidBy: true,
    actions: true
  });

  // Modal Control States
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [currentExpense, setCurrentExpense] = useState(null);

  // Form Management State
  const [formData, setFormData] = useState({
    item: '', orderBy: '', from: '', date: '', amount: 0,
    paidBy: 'Cash', department: 'General', project: 'N/A', note: '', status: 'Pending'
  });

  // --- Filtering & Handlers ---
  const handleColumnToggle = (columnKey) => {
    setVisibleColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredExpenses.map(exp => exp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- Modal Launchers ---
  const openAddModal = () => {
    setFormData({
      item: '', orderBy: '', from: '', date: '', amount: 0,
      paidBy: 'Cash', department: 'General', project: 'N/A', note: '', status: 'Pending'
    });
    setModalType('add');
  };

  const openEditModal = (expense) => {
    setCurrentExpense(expense);
    setFormData({ ...expense });
    setModalType('edit');
  };

  const openDeleteModal = (expense) => {
    setCurrentExpense(expense);
    setModalType('delete');
  };

  // --- CRUD Event Handlers ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newExpense = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount) || 0
      };
      setExpenses([newExpense, ...expenses]);
    } else if (modalType === 'edit') {
      setExpenses(expenses.map(exp => 
        exp.id === currentExpense.id ? { ...formData, amount: parseFloat(formData.amount) || 0 } : exp
      ));
    }
    setModalType(null);
  };

  const handleDeleteConfirm = () => {
    setExpenses(expenses.filter(exp => exp.id !== currentExpense.id));
    setSelectedIds(selectedIds.filter(id => id !== currentExpense.id));
    setModalType(null);
  };

  const filteredExpenses = expenses.filter(exp =>
    exp.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.orderBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Expenses-container">
      {/* Breadcrumb Header */}
      <div className="Expenses-header-nav">
        <h2>Expenses</h2>
        <div className="Expenses-breadcrumb">
          <FiHome size={14} /> <span>Accounts</span> &gt; <span className="active">Expenses</span>
        </div>
      </div>

      {/* Control Action Sub-bar */}
      <div className="Expenses-toolbar">
        <div className="Expenses-search-wrapper">
          <FiSearch className="Expenses-search-icon" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="Expenses-actions-right">
          <div className="Expenses-filter-dropdown-container">
            <button className="Expenses-btn icon-btn filter-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
              <FiFilter />
            </button>
            {showFilterDropdown && (
              <div className="Expenses-filter-menu">
                <div className="Expenses-filter-title">Show/Hide Column</div>
                <div className="Expenses-filter-options-scroll">
                  {Object.keys(visibleColumns).map((colKey) => (
                    <label key={colKey} className="Expenses-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[colKey]} 
                        onChange={() => handleColumnToggle(colKey)} 
                      />
                      <span className="Expenses-custom-checkbox"></span>
                      <span className="Expenses-label-text">
                        {colKey === 'calculatedItem' ? 'Calculated Item' : colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="Expenses-btn icon-btn add-btn" onClick={openAddModal}><FiPlus /></button>
          <button className="Expenses-btn icon-btn refresh-btn" onClick={() => setExpenses(initialExpenses)}><FiRefreshCw /></button>
          <button className="Expenses-btn icon-btn download-btn"><FiDownload /></button>
        </div>
      </div>

      {/* Desktop Responsive Table Wrapper */}
      <div className="Expenses-table-card">
        <div className="Expenses-table-responsive">
          <table className="Expenses-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="40">
                    <label className="Expenses-table-checkbox">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={filteredExpenses.length > 0 && selectedIds.length === filteredExpenses.length}
                      />
                      <span className="Expenses-custom-checkbox"></span>
                    </label>
                  </th>
                )}
                {visibleColumns.calculatedItem && <th>Calculated Item</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.project && <th>Project</th>}
                {visibleColumns.orderBy && <th>Order By</th>}
                {visibleColumns.from && <th>From</th>}
                {visibleColumns.date && <th>Date</th>}
                {visibleColumns.amount && <th>Amount</th>}
                {visibleColumns.note && <th>Note</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.paidBy && <th>Paid By</th>}
                {visibleColumns.actions && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className={selectedIds.includes(expense.id) ? 'row-selected' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <label className="Expenses-table-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(expense.id)}
                          onChange={() => handleSelectRow(expense.id)}
                        />
                        <span className="Expenses-custom-checkbox"></span>
                      </label>
                    </td>
                  )}
                  {visibleColumns.calculatedItem && <td><strong>{expense.item}</strong></td>}
                  {visibleColumns.department && <td>{expense.department}</td>}
                  {visibleColumns.project && <td>{expense.project}</td>}
                  {visibleColumns.orderBy && <td>{expense.orderBy}</td>}
                  {visibleColumns.from && <td>{expense.from}</td>}
                  {visibleColumns.date && (
                    <td className="Expenses-date-cell">
                      <FiCalendar className="cell-icon" /> {expense.date.replace(/-/g, '/')}
                    </td>
                  )}
                  {visibleColumns.amount && <td>{expense.amount}</td>}
                  {visibleColumns.note && <td className="Expenses-truncate-text">{expense.note || '—'}</td>}
                  {visibleColumns.status && (
                    <td>
                      <span className={`Expenses-badge badge-${expense.status.toLowerCase()}`}>
                        {expense.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.paidBy && <td>{expense.paidBy}</td>}
                  {visibleColumns.actions && (
                    <td className="Expenses-action-buttons text-center">
                      <button className="Expenses-action-btn edit-action" onClick={() => openEditModal(expense)}>
                        <FiEdit />
                      </button>
                      <button className="Expenses-action-btn delete-action" onClick={() => openDeleteModal(expense)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="Expenses-pagination">
          <div className="Expenses-pagination-left">
            <span>Items per page:</span>
            <select className="Expenses-page-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="Expenses-pagination-right">
            <span>1 – {filteredExpenses.length} of {expenses.length}</span>
            <button className="Expenses-pager-btn" disabled><FiChevronLeft /></button>
            <button className="Expenses-pager-btn" disabled><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* --- ADD / EDIT EXPENSE DOCK MODAL --- */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="Expenses-modal-overlay">
          <div className="Expenses-modal-card">
            <div className="Expenses-modal-header">
              <h3>{modalType === 'add' ? 'New Expense' : `Edit Expense: ${currentExpense?.item}`}</h3>
              <button className="Expenses-modal-close" onClick={() => setModalType(null)}><FiX /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="Expenses-modal-form">
              <div className="Expenses-form-grid">
                <div className="Expenses-form-group">
                  <label>Item*</label>
                  <div className="Expenses-input-wrapper">
                    <input type="text" required value={formData.item} onChange={(e) => setFormData({...formData, item: e.target.value})} />
                    <FiMenu className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group">
                  <label>Order By*</label>
                  <div className="Expenses-input-wrapper">
                    <input type="text" required value={formData.orderBy} onChange={(e) => setFormData({...formData, orderBy: e.target.value})} />
                    <FiUser className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group">
                  <label>From*</label>
                  <div className="Expenses-input-wrapper">
                    <input type="text" required value={formData.from} onChange={(e) => setFormData({...formData, from: e.target.value})} />
                    <FiHome className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group">
                  <label>Date*</label>
                  <div className="Expenses-input-wrapper">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    <FiCalendar className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group">
                  <label>Amount*</label>
                  <div className="Expenses-input-wrapper">
                    <input type="number" step="0.01" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                    <FiDollarSign className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group">
                  <label>Paid By*</label>
                  <select value={formData.paidBy} onChange={(e) => setFormData({...formData, paidBy: e.target.value})}>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <div className="Expenses-form-group">
                  <label>Department</label>
                  <div className="Expenses-input-wrapper">
                    <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                    <FiHome className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group">
                  <label>Project</label>
                  <div className="Expenses-input-wrapper">
                    <input type="text" value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} />
                    <FiBriefcase className="input-icon" />
                  </div>
                </div>
                <div className="Expenses-form-group full-width">
                  <label>Note</label>
                  <textarea rows="3" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})}></textarea>
                </div>
                <div className="Expenses-form-group full-width">
                  <label>Status*</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="Expenses-form-actions">
                <button type="submit" className="Expenses-btn btn-save">Save</button>
                <button type="button" className="Expenses-btn btn-cancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE MODAL --- */}
      {modalType === 'delete' && (
        <div className="Expenses-modal-overlay">
          <div className="Expenses-delete-card">
            <h3>Are you sure?</h3>
            <div className="Expenses-delete-details">
              <p>Item: {currentExpense?.item}</p>
              <p>Status: {currentExpense?.status}</p>
            </div>
            <div className="Expenses-delete-actions">
              <button className="Expenses-btn btn-delete-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="Expenses-btn btn-cancel-confirm" onClick={() => setModalType(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;