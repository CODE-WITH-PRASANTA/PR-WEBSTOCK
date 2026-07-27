import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Estimates.css";
import API from "../../Api/axios";

import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlus, 
  FiRefreshCw, FiDownload, FiX, FiEdit2, FiLoader,
  FiPhone, FiMail, FiCalendar
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdChevronRight } from "react-icons/md";

// Helper Functions
const formatDateForDisplay = (dateString) => {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

const INITIAL_FORM_STATE = {
  id: "",
  eId: "",
  clientName: "",
  mobile: "",
  email: "",
  eDate: "",
  expDate: "",
  country: "USA",
  amount: "",
  status: "Sent",
  details: ""
};

const Estimates = () => {
  // Main Data States
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination & Filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Selection & UI Controls
  const [selectedRows, setSelectedRows] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const columnDropdownRef = useRef(null);

  // Modals State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" | "edit"
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);
  const [formFields, setFormFields] = useState(INITIAL_FORM_STATE);

  // Column Visibility Toggle
  const [columns, setColumns] = useState({
    checkbox: true,
    eId: true,
    clientName: true,
    mobile: true,
    email: true,
    eDate: true,
    expDate: true,
    country: true,
    amount: true,
    status: true,
    details: true,
    actions: true
  });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Handle outside clicks for dropdown menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Fetch Estimates Data
  const fetchEstimates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        ...(debouncedSearch && { search: debouncedSearch })
      };

      const response = await API.get("/estimates", { params });

      if (response.data?.success) {
        setEstimates(response.data.data || []);
        setTotalItems(response.data.total || 0);
        setTotalPages(response.data.pages || 1);
      } else {
        const fallbackData = Array.isArray(response.data) ? response.data : [];
        setEstimates(fallbackData);
        setTotalItems(fallbackData.length);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching estimates:", err);
      setError(err.response?.data?.message || "Failed to load estimates.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch]);

  useEffect(() => {
    fetchEstimates();
  }, [fetchEstimates]);

  // Form Handlers
  const handleOpenAdd = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormFields({
      ...INITIAL_FORM_STATE,
      eId: `EST-${Math.floor(1000 + Math.random() * 9000)}`,
      eDate: today,
      expDate: today
    });
    setFormMode("add");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormFields({
      id: item._id || item.id,
      eId: item.eId || "",
      clientName: item.clientName || "",
      mobile: item.mobile || "",
      email: item.email || "",
      eDate: formatDateForInput(item.eDate),
      expDate: formatDateForInput(item.expDate),
      country: item.country || "USA",
      amount: item.amount || "",
      status: item.status || "Sent",
      details: item.details || ""
    });
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formFields,
      amount: Number(formFields.amount)
    };

    try {
      if (formMode === "add") {
        await API.post("/estimates", payload);
      } else {
        await API.put(`/estimates/${formFields.id}`, payload);
      }
      setIsFormOpen(false);
      await fetchEstimates();
    } catch (err) {
      console.error("Error saving estimate:", err);
      setError(err.response?.data?.message || "Failed to save estimate.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Handlers
  const handleOpenDelete = (item) => {
    setTargetItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!targetItem) return;
    setLoading(true);
    try {
      const targetId = targetItem._id || targetItem.id;
      await API.delete(`/estimates/${targetId}`);
      setIsDeleteOpen(false);
      setTargetItem(null);
      await fetchEstimates();
    } catch (err) {
      console.error("Error deleting estimate:", err);
      setError(err.response?.data?.message || "Failed to delete estimate.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm(`Delete ${selectedRows.length} selected lead(s)?`)) return;

    setLoading(true);
    try {
      await API.post("/estimates/bulk-delete", { ids: selectedRows });
      setSelectedRows([]);
      await fetchEstimates();
    } catch (err) {
      console.error("Error performing bulk delete:", err);
      setError(err.response?.data?.message || "Bulk delete failed.");
    } finally {
      setLoading(false);
    }
  };

  // Utility Actions
  const handleRefresh = () => {
    setSearchTerm("");
    setSelectedRows([]);
    setCurrentPage(1);
    fetchEstimates();
  };

  // ==========================================
  // EXCEL EXPORT FUNCTION (Replaces CSV)
  // ==========================================
  const handleDownloadExcel = async () => {
    try {
      const response = await API.get("/estimates/export/excel", { 
        responseType: "blob" 
      });
      
      const blob = new Blob([response.data], { 
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = `estimates_report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Excel Export Failed:", err);
      setError("Failed to export Excel report.");
    }
  };

  // Selection Logic
  const toggleSelectAll = () => {
    if (selectedRows.length === estimates.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(estimates.map(i => i._id || i.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="estimates-layout-root">
      
      {/* Header & Breadcrumbs */}
      <div className="estimates-breadcrumb-section">
        <div className="estimates-breadcrumb-container">
          <div className="estimates-crumb-left">
            <h2 className="estimates-crumb-heading">Lead Estimates</h2>
          </div>
          <div className="estimates-crumb-right">
            <span className="estimates-crumb-home-ico"><FiHome /></span>
            <span className="estimates-crumb-arrow"><MdChevronRight /></span>
            <span className="estimates-crumb-dim">Projects</span>
            <span className="estimates-crumb-arrow"><MdChevronRight /></span>
            <span className="estimates-crumb-active">Estimates</span>
          </div>
        </div>
      </div>

      {error && <div className="estimates-error-banner">{error}</div>}

      {/* Main Panel */}
      <div className="estimates-main-panel-section">
        <div className="estimates-main-panel">
          
          {/* Panel Toolbar */}
          <div className="estimates-panel-toolbar">
            <div className="estimates-toolbar-left-side">
              <div className="estimates-panel-search-field">
                <FiSearch className="estimates-search-embedded-ico" />
                <input 
                  className="estimates-search-input"
                  type="text" 
                  placeholder="Search client, ID, email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="estimates-toolbar-right-side" ref={columnDropdownRef}>
              <button 
                className="estimates-tool-act-btn estimates-btn-col-red" 
                onClick={handleBulkDelete} 
                disabled={selectedRows.length === 0 || loading}
                title="Delete Selected"
              >
                <FiTrash2 />
              </button>

              <button 
                className="estimates-tool-act-btn estimates-btn-col-gray" 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                title="Filter Columns"
              >
                <FiFilter />
              </button>

              <button 
                className="estimates-tool-act-btn estimates-btn-col-gray" 
                onClick={handleRefresh} 
                disabled={loading}
                title="Refresh Table"
              >
                <FiRefreshCw className={loading ? "estimates-spin-anim" : ""} />
              </button>

              {/* Updated Button to Export Excel */}
              <button 
                className="estimates-tool-act-btn estimates-btn-col-green" 
                onClick={handleDownloadExcel} 
                title="Export Excel (.xlsx)"
              >
                <FiDownload />
              </button>

              <button 
                className="estimates-btn-cta-primary" 
                onClick={handleOpenAdd} 
                title="Add Estimate"
              >
                <FiPlus /> <span>Add New</span>
              </button>

              {/* Column Filter Popup */}
              {dropdownOpen && (
                <div className="estimates-col-toggle-popup-box">
                  <div className="estimates-toggle-box-title">Toggle Visibility</div>
                  <div className="estimates-toggle-scroll-viewport">
                    {Object.keys(columns).map((colKey) => (
                      <label key={colKey} className="estimates-toggle-row-item">
                        <input 
                          type="checkbox" 
                          className="estimates-toggle-checkbox"
                          checked={columns[colKey]} 
                          onChange={() => setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }))}
                        />
                        <span>{colKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="estimates-table-scroll-slider">
            <table className="estimates-custom-data-table">
              <thead>
                <tr>
                  {columns.checkbox && (
                    <th className="estimates-cell-checkbox-width">
                      <input 
                        type="checkbox" 
                        className="estimates-table-header-checkbox"
                        checked={estimates.length > 0 && selectedRows.length === estimates.length} 
                        onChange={toggleSelectAll}
                      />
                    </th>
                  )}
                  {columns.eId && <th>E. ID</th>}
                  {columns.clientName && <th>Client</th>}
                  {columns.mobile && <th>Mobile</th>}
                  {columns.email && <th>Email</th>}
                  {columns.eDate && <th>Date</th>}
                  {columns.expDate && <th>Expiry</th>}
                  {columns.country && <th>Country</th>}
                  {columns.amount && <th>Amount</th>}
                  {columns.status && <th>Status</th>}
                  {columns.details && <th>Details</th>}
                  {columns.actions && <th className="estimates-text-center">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {loading && estimates.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="estimates-empty-state-cell">
                      <FiLoader className="estimates-spin-anim" />
                      <span>Loading estimates data...</span>
                    </td>
                  </tr>
                ) : estimates.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="estimates-empty-state-cell">
                      No estimate records found.
                    </td>
                  </tr>
                ) : (
                  estimates.map((item) => {
                    const itemId = item._id || item.id;
                    const isSelected = selectedRows.includes(itemId);
                    return (
                      <tr key={itemId} className={isSelected ? "estimates-row-highlighted" : ""}>
                        {columns.checkbox && (
                          <td className="estimates-cell-checkbox-width">
                            <input 
                              type="checkbox" 
                              className="estimates-table-row-checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectRow(itemId)}
                            />
                          </td>
                        )}
                        {columns.eId && (
                          <td><span className="estimates-id-badge">{item.eId}</span></td>
                        )}
                        {columns.clientName && (
                          <td><div className="estimates-font-weight-medium">{item.clientName}</div></td>
                        )}
                        {columns.mobile && (
                          <td>
                            <div className="estimates-cell-flex-meta-row">
                              <FiPhone className="estimates-meta-ico-ph" />
                              <span>{item.mobile || "N/A"}</span>
                            </div>
                          </td>
                        )}
                        {columns.email && (
                          <td>
                            <div className="estimates-cell-flex-meta-row">
                              <FiMail className="estimates-meta-ico-ml" />
                              <span>{item.email || "N/A"}</span>
                            </div>
                          </td>
                        )}
                        {columns.eDate && (
                          <td>
                            <div className="estimates-cell-flex-meta-row">
                              <FiCalendar className="estimates-meta-ico-cal" />
                              <span>{formatDateForDisplay(item.eDate)}</span>
                            </div>
                          </td>
                        )}
                        {columns.expDate && <td>{formatDateForDisplay(item.expDate)}</td>}
                        {columns.country && <td>{item.country || "USA"}</td>}
                        {columns.amount && (
                         <td>
                                  <span className="estimates-amount-tag">
                                    ₹{Number(item.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                  </span>
                                </td>
                        )}
                        {columns.status && (
                          <td>
                            <span className={`estimates-badge estimates-badge-${(item.status || "draft").toLowerCase()}`}>
                              {item.status}
                            </span>
                          </td>
                        )}
                        {columns.details && (
                          <td>
                            <div className="estimates-text-truncated-node" title={item.details}>
                              {item.details || "—"}
                            </div>
                          </td>
                        )}
                        {columns.actions && (
                          <td className="estimates-text-center">
                            <div className="estimates-action-row-wrap">
                              <button 
                                className="estimates-action-btn estimates-act-edit" 
                                onClick={() => handleOpenEdit(item)}
                                title="Edit"
                              >
                                <FiEdit2 />
                              </button>
                              <button 
                                className="estimates-action-btn estimates-act-delete" 
                                onClick={() => handleOpenDelete(item)}
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls Footer */}
          <div className="estimates-pagination-footer">
            <div className="estimates-pagination-info">
              <span>Items per page:</span>
              <select 
                className="estimates-select-items-page"
                value={itemsPerPage} 
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="estimates-page-range-txt">
                {totalItems === 0 ? 0 : startRecord} – {endRecord} of {totalItems}
              </span>
            </div>

            <div className="estimates-pagination-controls">
              <button 
                className="estimates-page-nav-btn"
                disabled={currentPage === 1 || loading} 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <MdKeyboardArrowLeft />
              </button>
              <span className="estimates-page-indicator">{currentPage} / {totalPages}</span>
              <button 
                className="estimates-page-nav-btn"
                disabled={currentPage >= totalPages || loading} 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Dialog: Add / Edit Estimate */}
      {isFormOpen && (
        <div className="estimates-modal-backdrop">
          <div className="estimates-modal-card">
            <div className="estimates-modal-header">
              <h3>{formMode === "add" ? "Create New Estimate" : "Edit Estimate Details"}</h3>
              <button className="estimates-modal-close-ico" onClick={() => setIsFormOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveForm}>
              <div className="estimates-form-grid-layout">
                <div className="estimates-form-field-group">
                  <label>Estimate ID *</label>
                  <input 
                    type="text" 
                    required 
                    value={formFields.eId} 
                    onChange={e => setFormFields({...formFields, eId: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Client Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formFields.clientName} 
                    onChange={e => setFormFields({...formFields, clientName: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formFields.mobile} 
                    onChange={e => setFormFields({...formFields, mobile: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formFields.email} 
                    onChange={e => setFormFields({...formFields, email: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Estimate Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={formFields.eDate} 
                    onChange={e => setFormFields({...formFields, eDate: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Expiry Date *</label>
                  <input 
                    type="date" 
                    required 
                    value={formFields.expDate} 
                    onChange={e => setFormFields({...formFields, expDate: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Country</label>
                  <input 
                    type="text" 
                    value={formFields.country} 
                    onChange={e => setFormFields({...formFields, country: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Amount ($) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required 
                    value={formFields.amount} 
                    onChange={e => setFormFields({...formFields, amount: e.target.value})} 
                  />
                </div>

                <div className="estimates-form-field-group">
                  <label>Status</label>
                  <select 
                    value={formFields.status} 
                    onChange={e => setFormFields({...formFields, status: e.target.value})}
                  >
                    <option value="Sent">Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="estimates-form-field-group estimates-col-span-full">
                  <label>Details / Notes</label>
                  <textarea 
                    rows="3" 
                    value={formFields.details} 
                    onChange={e => setFormFields({...formFields, details: e.target.value})}
                  />
                </div>
              </div>

              <div className="estimates-modal-footer">
                <button 
                  type="button" 
                  className="estimates-modal-btn-cancel" 
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="estimates-modal-btn-submit" 
                  disabled={loading}
                >
                  {loading ? <FiLoader className="estimates-spin-anim" /> : "Save Estimate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="estimates-modal-backdrop">
          <div className="estimates-modal-card estimates-modal-card-sm">
            <div className="estimates-modal-header">
              <h3>Confirm Deletion</h3>
              <button className="estimates-modal-close-ico" onClick={() => setIsDeleteOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="estimates-delete-confirm-body">
              <p>
                Are you sure you want to permanently remove estimate <strong>{targetItem?.eId}</strong>?
              </p>
            </div>
            <div className="estimates-modal-footer">
              <button 
                className="estimates-modal-btn-cancel" 
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="estimates-modal-btn-delete" 
                onClick={confirmDelete} 
                disabled={loading}
              >
                {loading ? <FiLoader className="estimates-spin-anim" /> : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Estimates;