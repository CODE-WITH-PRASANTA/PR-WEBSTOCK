import React, { useState } from "react";
import "./ProjectRiskIssue.css";

// Initial Mock Data matching Image 1
const initialItems = [
  { id: 1, description: "Budget overruns on software licenses", type: "Risk", impact: "High", probability: "Medium", status: "Open", owner: "Jayesh Patel" },
  { id: 2, description: "Delayed API response from gateway", type: "Issue", impact: "Medium", probability: "N/A", status: "Open", owner: "Rohan Sharma" },
  { id: 3, description: "Scope creep due to new requirements", type: "Risk", impact: "High", probability: "High", status: "Mitigated", owner: "Sarah Smith" },
  { id: 4, description: "Server downtime during migration", type: "Risk", impact: "High", probability: "Low", status: "Open", owner: "Michael Ross" },
  { id: 5, description: "Missing documentation for legacy code", type: "Issue", impact: "Low", probability: "N/A", status: "Closed", owner: "John Deo" },
  { id: 6, description: "Integration issues with third party", type: "Issue", impact: "High", probability: "N/A", status: "Open", owner: "Pooja Sharma" },
  { id: 7, description: "Potential shortage of skilled resources", type: "Risk", impact: "Medium", probability: "Medium", status: "Open", owner: "Sarah Smith" },
  { id: 8, description: "User data privacy compliance risk", type: "Risk", impact: "High", probability: "Low", status: "Mitigated", owner: "Emily Clark" },
  { id: 9, description: "Slow performance on mobile devices", type: "Issue", impact: "Medium", probability: "N/A", status: "Open", owner: "Pankaj Patel" },
  { id: 10, description: "Unexpected license fee increase", type: "Risk", impact: "Medium", probability: "Low", status: "Open", owner: "Jayesh Patel" },
  { id: 11, description: "Database indexing latency issue", type: "Issue", impact: "High", probability: "N/A", status: "Open", owner: "Rohan Sharma" },
  { id: 12, description: "Cloud storage cost optimization shortfall", type: "Risk", impact: "Low", probability: "High", status: "Closed", owner: "Michael Ross" }
];

const ProjectRiskIssue = () => {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Dropdown & Modal Visibility States
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Form and Data manipulation states
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [currentItem, setCurrentItem] = useState({ id: "", description: "", type: "Risk", impact: "High", probability: "Medium", status: "Open", owner: "" });
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Column visibility map matching Image 2
  const [columns, setColumns] = useState({
    checkbox: true,
    description: true,
    type: true,
    impact: true,
    probability: true,
    status: true,
    owner: true
  });

  // Search filter implementation
  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- PAGINATION LOGIC CALCULATIONS ---
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPaginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // ड्रॉपडाउन बदलने पर वापस पहले पेज पर जाएँ
  };

  // Checkbox logic handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentPaginatedItems.map(item => item.id));
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

  // Triggered when Save is clicked inside Modal (Image 3)
  const handleSave = (e) => {
    e.preventDefault();
    if (!currentItem.description.trim()) return;

    if (modalType === "add") {
      const newItem = { ...currentItem, id: Date.now() };
      setItems([newItem, ...items]);
    } else {
      setItems(items.map(item => item.id === currentItem.id ? currentItem : item));
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalType("add");
    setCurrentItem({ id: "", description: "", type: "Risk", impact: "High", probability: "Medium", status: "Open", owner: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalType("edit");
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setItems(items.filter(item => item.id !== itemToDelete.id));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
    setSelectedIds(selectedIds.filter(id => id !== itemToDelete.id));
  };

  const handleBulkDelete = () => {
    setItems(items.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const renderImpactChevron = (impact) => {
    if (impact === "High") return <span className="chevron-up-red">▲</span>;
    if (impact === "Medium") return <span className="chevron-up-orange">▲</span>;
    return <span className="chevron-down-green">▼</span>;
  };

  return (
    <div className="risk-container">
      {/* Top Breadcrumb Navigation */}
      <div className="risk-breadcrumb-row">
        <h1 className="risk-main-title">Project Risks & Issues</h1>
        <div className="risk-breadcrumbs">
          <span>🏠</span> <span>&gt; Projects &gt; Risks & Issues</span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="risk-table-card">
        
        {/* Table Management Utility Toolbar */}
        <div className="risk-utility-bar">
          <div className="utility-left">
            <span className="section-label">Risks & Issues</span>
            <div className="search-field-box">
              <span className="search-icon-svg">🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="search-input"
              />
            </div>
          </div>

          <div className="utility-right">
            {selectedIds.length > 0 && (
              <button onClick={handleBulkDelete} className="icon-action-btn text-danger" title="Delete Selected">🗑️</button>
            )}
            <button onClick={() => setShowColumnDropdown(!showColumnDropdown)} className="icon-action-btn" title="Show/Hide Columns">⚙️</button>
            <button onClick={openAddModal} className="icon-action-btn text-success" title="Add New">➕</button>
            <button onClick={() => { setItems(initialItems); setCurrentPage(1); }} className="icon-action-btn" title="Refresh">🔄</button>
            <button className="icon-action-btn" title="Download All">📥</button>

            {/* Column Selector Dropdown Menu (Image 2) */}
            {showColumnDropdown && (
              <div className="column-dropdown-box">
                <div className="dropdown-header-title">Show/Hide Column</div>
                <div className="dropdown-scroll-area">
                  {Object.keys(columns).map((col) => (
                    <label key={col} className="dropdown-checkbox-row">
                      <input
                        type="checkbox"
                        checked={columns[col]}
                        onChange={() => setColumns({ ...columns, [col]: !columns[col] })}
                        className="native-checkbox"
                      />
                      <span className="checkbox-text-label">{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Table Wrapper */}
        <div className="table-responsive-scroll">
          <table className="risk-data-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: "40px" }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={currentPaginatedItems.length > 0 && selectedIds.length === currentPaginatedItems.length}
                    />
                  </th>
                )}
                {columns.description && <th>Description</th>}
                {columns.type && <th>Type</th>}
                {columns.impact && <th>Impact</th>}
                {columns.probability && <th>Probability</th>}
                {columns.status && <th>Status</th>}
                {columns.owner && <th>Owner</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPaginatedItems.length > 0 ? (
                currentPaginatedItems.map((row) => (
                  <tr key={row.id} className={selectedIds.includes(row.id) ? "row-checked" : ""}>
                    {columns.checkbox && (
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </td>
                    )}
                    {columns.description && <td className="description-cell">{row.description}</td>}
                    {columns.type && <td>{row.type}</td>}
                    {columns.impact && (
                      <td className="impact-cell-data">
                        {renderImpactChevron(row.impact)} {row.impact}
                      </td>
                    )}
                    {columns.probability && <td>{row.probability}</td>}
                    {columns.status && (
                      <td>
                        <span className={`status-pill pill-${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {columns.owner && <td>{row.owner}</td>}
                    <td>
                      <div className="row-actions-flex">
                        <button onClick={() => openEditModal(row)} className="btn-inline edit" title="Edit row">📝</button>
                        <button onClick={() => openDeleteModal(row)} className="btn-inline remove" title="Delete row">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-table-placeholder">No record data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="table-pagination-row">
          <div className="pagination-selector-block">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="select-native-footer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="pagination-info-navigation">
            <span>
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {indexOfLastItem > totalItems ? totalItems : indexOfLastItem} of {totalItems}
            </span>
            <div className="arrow-buttons-wrap">
              <button 
                className="footer-arrow" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <button 
                className="footer-arrow" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages || totalPages === 0}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- ADD / EDIT RISK DIALOG MODAL (Image 3) --- */}
      {/* 'show' क्लास कंडीशनल लगाई गई है ताकि स्मूथ CSS ट्रांजिशन काम कर सके */}
      <div className={`backdrop-modal-overlay ${isModalOpen ? "show" : ""}`}>
        <div className="risk-modal-window">
          <div className="modal-top-banner">
            <h3>{modalType === "add" ? "New Risk/Issue" : "Edit Risk/Issue"}</h3>
            <button onClick={() => setIsModalOpen(false)} className="modal-banner-close">✕</button>
          </div>
          
          <form onSubmit={handleSave} className="modal-padded-form">
            <div className="full-width-form-group">
              <label>Description*</label>
              <textarea
                rows="3"
                value={currentItem.description}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                required
              />
            </div>

            <div className="form-two-column-grid">
              <div className="input-field-group">
                <label>Type*</label>
                <select
                  value={currentItem.type}
                  onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                >
                  <option value="Risk">Risk</option>
                  <option value="Issue">Issue</option>
                </select>
              </div>

              <div className="input-field-group">
                <label>Impact*</label>
                <select
                  value={currentItem.impact}
                  onChange={(e) => setCurrentItem({ ...currentItem, impact: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="input-field-group">
                <label>Probability*</label>
                <select
                  value={currentItem.probability}
                  onChange={(e) => setCurrentItem({ ...currentItem, probability: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>

              <div className="input-field-group">
                <label>Status*</label>
                <select
                  value={currentItem.status}
                  onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                >
                  <option value="Open">Open</option>
                  <option value="Mitigated">Mitigated</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="form-two-column-grid" style={{ marginTop: "12px" }}>
              <div className="input-field-group">
                <label>Owner*</label>
                <div className="owner-input-wrapper">
                  <input
                    type="text"
                    value={currentItem.owner}
                    onChange={(e) => setCurrentItem({ ...currentItem, owner: e.target.value })}
                    required
                  />
                  <span className="owner-badge-icon">👤</span>
                </div>
              </div>
            </div>

            <div className="modal-form-actions">
              <button type="submit" className="form-action-btn submit-save-btn">Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="form-action-btn dismiss-cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* --- REUSE DIALOG MODAL FOR REMOVE CONFIRMATION (Image 4) --- */}
      <div className={`backdrop-modal-overlay ${isDeleteModalOpen && itemToDelete ? "show" : ""}`}>
        {itemToDelete && (
          <div className="confirmation-danger-box">
            <h3 className="confirm-header-title">Are you sure?</h3>
            <div className="confirm-body-text">
              <p>Description: {itemToDelete.description}</p>
            </div>
            <div className="confirmation-action-row">
              <button onClick={confirmDelete} className="action-pill-btn confirm-red">Delete</button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="action-pill-btn cancel-blue">Cancel</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProjectRiskIssue;