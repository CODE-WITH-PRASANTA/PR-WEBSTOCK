import React, { useState } from "react";
import "./ProjectBudget.css";

// Initial Mock Data matching Image 1
const initialTransactions = [
  { id: 1, description: "Server Hosting", category: "Infrastructure", amount: 1200, date: "2024-05-01", status: "Approved" },
  { id: 2, description: "UI/UX Design Tools", category: "Software", amount: 450, date: "2024-10-01", status: "Approved" },
  { id: 3, description: "External Consultant", category: "Services", amount: 5000, date: "2024-15-01", status: "Pending" },
  { id: 4, description: "API Subscription", category: "Software", amount: 200, date: "2024-20-01", status: "Approved" },
  { id: 5, description: "Hardware Upgrade", category: "Infrastructure", amount: 3500, date: "2024-25-01", status: "Rejected" },
  { id: 6, description: "SSL Certificate", category: "Software", amount: 150, date: "2024-28-01", status: "Approved" },
  { id: 7, description: "Project Management Tool", category: "Software", amount: 600, date: "2024-01-02", status: "Approved" },
  { id: 8, description: "Team Offsite", category: "General", amount: 2500, date: "2024-05-02", status: "Pending" },
  { id: 9, description: "Google Cloud Platform", category: "Infrastructure", amount: 800, date: "2024-10-02", status: "Approved" },
  { id: 10, description: "Legal Documentation", category: "Services", amount: 1500, date: "2024-12-02", status: "Approved" },
];

const ProjectBudget = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Modals and Dropdowns visibility state
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Form & Editing state
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [currentTx, setCurrentTx] = useState({ id: "", description: "", category: "", amount: "", date: "", status: "Approved" });
  const [txToDelete, setTxToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  // Pagination and Column Visibility states
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columns, setColumns] = useState({ checkbox: true, description: true, category: true, amount: true, date: true, status: true });

  // Format Date from YYYY-MM-DD to DD/MM/YYYY for table rendering
  const formatDateForTable = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // Search Filter
  const filteredData = transactions.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Checkbox Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Validation before Save
  const validateForm = () => {
    let tempErrors = {};
    if (!currentTx.description) tempErrors.description = "Description is required";
    if (!currentTx.date) tempErrors.date = "Please select date";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Save Add / Edit Form (Image 3)
  const handleSaveTransaction = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (modalType === "add") {
      const newTx = { ...currentTx, id: Date.now() };
      setTransactions([newTx, ...transactions]);
    } else {
      setTransactions(transactions.map((t) => (t.id === currentTx.id ? currentTx : t)));
    }
    setIsModalOpen(false);
    setCurrentTx({ id: "", description: "", category: "", amount: "", date: "", status: "Approved" });
  };

  // Open Add Modal
  const openAddModal = () => {
    setModalType("add");
    setCurrentTx({ id: "", description: "", category: "", amount: "", date: "", status: "Approved" });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open Edit Modal (Image 3 Structure)
  const openEditModal = (tx) => {
    setModalType("edit");
    setCurrentTx(tx);
    setErrors({});
    setIsModalOpen(true);
  };

  // Open Delete Modal (Image 4)
  const openDeleteModal = (tx) => {
    setTxToDelete(tx);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setTransactions(transactions.filter((t) => t.id !== txToDelete.id));
    setIsDeleteModalOpen(false);
    setTxToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setTransactions(transactions.filter((t) => !selectedIds.includes(t.id)));
    setSelectedIds([]);
  };

  return (
    <div className="budget-container">
      {/* Top Breadcrumb Header Row */}
      <div className="budget-header-row">
        <h1 className="budget-main-title">Project Budget</h1>
        <div className="budget-breadcrumbs">
          <span>🏠</span> <span>&gt; Projects &gt; Budget</span>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="kpi-cards-grid">
        <div className="kpi-card bg-blue">
          <div className="kpi-info">
            <span className="kpi-title">Total Budget</span>
            <span className="kpi-value">$50,000.00</span>
            <span className="kpi-sub">Allocated budget</span>
          </div>
          <div className="kpi-icon">📇</div>
        </div>

        <div className="kpi-card bg-green">
          <div className="kpi-info">
            <span className="kpi-title">Used Budget</span>
            <span className="kpi-value">$32,500.00</span>
            <span className="kpi-sub">65% of total</span>
          </div>
          <div className="kpi-icon">🛒</div>
        </div>

        <div className="kpi-card bg-orange">
          <div className="kpi-info">
            <span className="kpi-title">Remaining</span>
            <span className="kpi-value">$17,500.00</span>
            <span className="kpi-sub">Available funds</span>
          </div>
          <div className="kpi-icon">💰</div>
        </div>

        <div className="kpi-card bg-redstar-orange">
          <div className="kpi-info">
            <span className="kpi-title">Health</span>
            <span className="kpi-value">Stable</span>
            <span className="kpi-sub">Budget status</span>
          </div>
          <div className="kpi-icon">❤️</div>
        </div>
      </div>

      {/* Main Table Card Box Container */}
      <div className="budget-table-card">
        {/* Table Controls Header Utility Bar */}
        <div className="table-utility-bar">
          <div className="utility-left">
            <span className="section-label">Budget Transactions</span>
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-field"
              />
            </div>
          </div>

          <div className="utility-right">
            <button onClick={handleBulkDelete} className="tool-btn text-danger" title="Delete Selected" disabled={selectedIds.length === 0}>🗑️</button>
            <button onClick={() => setShowColumnDropdown(!showColumnDropdown)} className="tool-btn" title="Show/Hide Columns">⚙️</button>
            <button onClick={openAddModal} className="tool-btn text-success" title="Add Transaction">➕</button>
            <button onClick={() => setTransactions(initialTransactions)} className="tool-btn" title="Refresh">🔄</button>
            <button className="tool-btn" title="Download All">📥</button>

            {/* Show/Hide Column Popover (Image 2) */}
            {showColumnDropdown && (
              <div className="column-dropdown-popover">
                <div className="dropdown-title">Show/Hide Column</div>
                <div className="dropdown-list">
                  {Object.keys(columns).map((col) => (
                    <label key={col} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={columns[col]}
                        onChange={() => setColumns({ ...columns, [col]: !columns[col] })}
                        className="checkbox-input"
                      />
                      <span className="column-label-name">{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Table Layout */}
        <div className="table-responsive-wrapper">
          <table className="budget-data-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: "40px" }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={filteredData.length > 0 && selectedIds.length === filteredData.length}
                    />
                  </th>
                )}
                {columns.description && <th>Description</th>}
                {columns.category && <th>Category</th>}
                {columns.amount && <th>Amount</th>}
                {columns.date && <th>Date ↑</th>}
                {columns.status && <th>Status</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className={selectedIds.includes(row.id) ? "selected-row" : ""}>
                    {columns.checkbox && (
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </td>
                    )}
                    {columns.description && <td className="desc-cell">{row.description}</td>}
                    {columns.category && <td>{row.category}</td>}
                    {columns.amount && <td>{row.amount}</td>}
                    {columns.date && <td>📅 {formatDateForTable(row.date)}</td>}
                    {columns.status && (
                      <td>
                        <span className={`status-badge ${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    <td>
                      <div className="actions-cell-btns">
                        <button onClick={() => openEditModal(row)} className="action-btn edit" title="Edit">📝</button>
                        <button onClick={() => openDeleteModal(row)} className="action-btn delete" title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-records">No records found matching search query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="table-pagination-footer">
          <div className="items-per-page-block">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="pagination-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="pagination-controls-right">
            <span>1 – {filteredData.length} of {filteredData.length}</span>
            <div className="pagination-arrows">
              <button className="arrow-nav-btn" disabled>&lt;</button>
              <button className="arrow-nav-btn" disabled>&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD / EDIT TRANSACTION MODAL WINDOW (Image 3) --- */}
      {isModalOpen && (
        <div className="modal-backdrop-overlay">
          <div className="transaction-modal-box">
            <div className="modal-header-bar">
              <h3>{modalType === "add" ? "New Transaction" : "Edit Transaction"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-x-btn">✕</button>
            </div>
            <form onSubmit={handleSaveTransaction} className="modal-form-layout">
              <div className="form-grid-columns">
                {/* Left Form Inputs */}
                <div className="form-column">
                  <div className={`form-group-field ${errors.description ? "has-error" : ""}`}>
                    <label>Description*</label>
                    <input
                      type="text"
                      value={currentTx.description}
                      onChange={(e) => setCurrentTx({ ...currentTx, description: e.target.value })}
                    />
                    {errors.description && <span className="error-msg-text">{errors.description}</span>}
                  </div>

                  <div className="form-group-field">
                    <label>Amount*</label>
                    <div className="amount-input-wrapper">
                      <input
                        type="number"
                        value={currentTx.amount}
                        onChange={(e) => setCurrentTx({ ...currentTx, amount: e.target.value })}
                      />
                      <span className="currency-symbol">$</span>
                    </div>
                  </div>

                  <div className={`form-group-field ${errors.date ? "has-error" : ""}`}>
                    <label>Date*</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        value={currentTx.date}
                        onChange={(e) => setCurrentTx({ ...currentTx, date: e.target.value })}
                      />
                    </div>
                    {errors.date && <span className="error-msg-text">{errors.date}</span>}
                  </div>
                </div>

                {/* Right Form Inputs */}
                <div className="form-column">
                  <div className="form-group-field">
                    <label>Category*</label>
                    <input
                      type="text"
                      value={currentTx.category}
                      onChange={(e) => setCurrentTx({ ...currentTx, category: e.target.value })}
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Status*</label>
                    <select
                      value={currentTx.status}
                      onChange={(e) => setCurrentTx({ ...currentTx, status: e.target.value })}
                      className="status-dropdown-select"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons Container */}
              <div className="form-actions-footer">
                <button type="submit" className="form-btn save">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="form-btn cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE MODAL WINDOW (Image 4) --- */}
      {isDeleteModalOpen && txToDelete && (
        <div className="modal-backdrop-overlay">
          <div className="delete-modal-confirmation-box">
            <h3 className="delete-title">Are you sure?</h3>
            <div className="delete-meta-info">
              <p><strong>Description:</strong> {txToDelete.description}</p>
              <p><strong>Amount:</strong> {txToDelete.amount}</p>
            </div>
            <div className="delete-modal-actions">
              <button onClick={confirmDelete} className="del-btn confirm">Delete</button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="del-btn cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBudget;