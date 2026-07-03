import React, { useState, useEffect, useRef } from "react";
import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlusCircle, 
  FiRefreshCw, FiDownload, FiCalendar, FiX, FiEdit2, FiClipboard, FiDollarSign, FiKey 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./ClientPayments.css";

const initialPaymentsData = [
  { id: "1", paymentId: "PAY-101", invoiceNo: "INV-001", paymentDate: "2023-01-20", amount: "5,000", method: "PayPal", status: "Completed" },
  { id: "2", paymentId: "PAY-102", invoiceNo: "INV-004", paymentDate: "2023-06-25", amount: "1,200", method: "Credit Card", status: "Completed" },
  { id: "3", paymentId: "PAY-103", invoiceNo: "INV-006", paymentDate: "2023-08-10", amount: "900", method: "Bank Transfer", status: "Completed" },
  { id: "4", paymentId: "PAY-104", invoiceNo: "INV-009", paymentDate: "2023-11-20", amount: "3,200", method: "PayPal", status: "Completed" },
  { id: "5", paymentId: "PAY-105", invoiceNo: "INV-011", paymentDate: "2023-12-25", amount: "4,500", method: "Credit Card", status: "Completed" },
  { id: "6", paymentId: "PAY-106", invoiceNo: "INV-002", paymentDate: "2023-03-15", amount: "3,500", method: "PayPal", status: "Pending" },
  { id: "7", paymentId: "PAY-107", invoiceNo: "INV-005", paymentDate: "2023-07-25", amount: "4,100", method: "Bank Transfer", status: "Pending" },
  { id: "8", paymentId: "PAY-108", invoiceNo: "INV-007", paymentDate: "2023-09-20", amount: "6,500", method: "Credit Card", status: "Failed" },
  { id: "9", paymentId: "PAY-109", invoiceNo: "INV-003", paymentDate: "2023-05-25", amount: "2,800", method: "PayPal", status: "Pending" },
  { id: "10", paymentId: "PAY-110", invoiceNo: "INV-008", paymentDate: "2023-10-15", amount: "2,000", method: "Bank Transfer", status: "Failed" }
];

const ClientPayments = () => {
  const [data, setData] = useState(initialPaymentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal Control States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  // Form Field Binder
  const [formFields, setFormFields] = useState({
    id: "", paymentId: "", invoiceNo: "", paymentDate: "", amount: "", method: "PayPal", status: "Completed"
  });

  // Column Visibility Configuration (image_6171d7.png matching setup)
  const [columns, setColumns] = useState({
    checkbox: true, id: false, paymentId: true, invoiceNo: true, paymentDate: true, amount: true, method: true, status: true, actions: true
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setColumnMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOpenAdd = () => {
    setFormFields({
      id: String(Date.now()), paymentId: `PAY-${Math.floor(Math.random() * 900) + 101}`, 
      invoiceNo: "", paymentDate: "2026-07-02", amount: "", method: "PayPal", status: "Completed"
    });
    setFormMode("add");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormFields({ ...item });
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (formMode === "add") {
      setData([formFields, ...data]);
    } else {
      setData(data.map(item => item.id === formFields.id ? formFields : item));
    }
    setIsFormOpen(false);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setData(initialPaymentsData);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handleDownloadCSV = () => {
    const headers = ["Payment ID", "Invoice No", "Payment Date", "Amount", "Method", "Status"];
    const rows = data.map(i => [i.paymentId, i.invoiceNo, i.paymentDate, `$${i.amount}`, i.method, i.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "client_payments_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map(i => i.id));
    }
  };

  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(r => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Keyword Data filtering
  const filteredData = data.filter(item => 
    item.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination bounds logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;

  const formatDateString = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="pay-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="pay-breadcrumb-header-strip">
        <div className="pay-crumb-left">
          <h2>Client Payments</h2>
        </div>
        <div className="pay-crumb-right">
          <FiHome className="pay-home-icon-node" />
          <span className="pay-separator-node">&gt;</span>
          <span className="pay-dim-node">Clients</span>
          <span className="pay-separator-node">&gt;</span>
          <span className="pay-active-node">Payments</span>
        </div>
      </div>

      {/* ================= DATAGRID CARD LAYER ================= */}
      <div className="pay-main-table-panel">
        
        {/* PANEL BAR INTERACTION ROW */}
        <div className="pay-panel-toolbar-row">
          <div className="pay-toolbar-left">
            <span className="pay-panel-tab-title">Client Payments</span>
            <div className="pay-search-input-field">
              <FiSearch className="pay-search-inside-ico" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="pay-toolbar-right" ref={dropdownRef}>
            <button className="pay-tool-act-btn color-red" onClick={() => { setData(data.filter(i => !selectedRows.includes(i.id))); setSelectedRows([]); }} disabled={selectedRows.length === 0} title="Delete Selected Items">
              <FiTrash2 />
            </button>
            <button className="pay-tool-act-btn color-blue" onClick={() => setColumnMenuOpen(!columnMenuOpen)} title="Show/Hide Columns">
              <FiFilter />
            </button>
            <button className="pay-tool-act-btn color-green" onClick={handleOpenAdd} title="Add New Payment">
              <FiPlusCircle />
            </button>
            <button className="pay-tool-act-btn color-gray" onClick={handleRefresh} title="Reset Grid View">
              <FiRefreshCw />
            </button>
            <button className="pay-tool-act-btn color-blue" onClick={handleDownloadCSV} title="Export Report CSV">
              <FiDownload />
            </button>

            {/* TOGGLE OPTIONS PANEL (image_616e1b.png dropdown matching layout) */}
            {columnMenuOpen && (
              <div className="pay-columns-dropdown-popup">
                <div className="pay-popup-header-label">Show/Hide Column</div>
                <div className="pay-popup-scroll-area">
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="pay-popup-row-item">
                      <input 
                        type="checkbox" 
                        checked={columns[key]} 
                        onChange={() => setColumns(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                      <span className="pay-checkbox-visual-node"></span>
                      <span className="pay-checkbox-txt-label">
                        {key === "id" ? "ID" : key === "paymentId" ? "Payment ID" : key === "invoiceNo" ? "Invoice No" : key === "paymentDate" ? "Payment Date" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SWIPABLE INTERNAL SLIDER WRAPPER */}
        <div className="pay-table-viewport-slider">
          <table className="pay-custom-data-table-node">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th className="pay-cell-checkbox-dimension">
                    <input 
                      type="checkbox" 
                      checked={currentItems.length > 0 && selectedRows.length === currentItems.length} 
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.paymentId && <th>Payment ID</th>}
                {columns.invoiceNo && <th>Invoice No ↑</th>}
                {columns.paymentDate && <th>Payment Date</th>}
                {columns.amount && <th>Amount</th>}
                {columns.method && <th>Method</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="text-center-aligned">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? "pay-row-highlighted-active" : ""}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id)}
                      />
                    </td>
                  )}
                  {columns.id && <td>{item.id}</td>}
                  {columns.paymentId && <td className="pay-id-field-txt">{item.paymentId}</td>}
                  {columns.invoiceNo && <td>{item.invoiceNo}</td>}
                  {columns.paymentDate && (
                    <td>
                      <div className="pay-date-cell-flex-node"><FiCalendar className="pay-calendar-brown-ico"/> {formatDateString(item.paymentDate)}</div>
                    </td>
                  )}
                  {columns.amount && <td className="pay-amount-weight-node">${item.amount}</td>}
                  {columns.method && <td>{item.method}</td>}
                  {columns.status && (
                    <td>
                      <span className={`pay-status-pill-badge tag-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="pay-actions-flex-holder">
                        <button className="pay-action-row-btn btn-edit-tint" onClick={() => handleOpenEdit(item)}>
                          <FiEdit2 />
                        </button>
                        <button className="pay-action-row-btn btn-delete-tint" onClick={() => { setTargetItem(item); setIsDeleteOpen(true); }}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="9" className="pay-empty-fallback-message">No records found matching tracking limit queries.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TRACKBAR PAGINATION BAR FOOTER PANEL */}
        <div className="pay-pagination-footer-row-layout">
          <div className="pay-pagination-right-cluster">
            <span className="pay-footer-dim-label">Items per page:</span>
            <div className="pay-select-native-box-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span className="pay-footer-range-label">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="pay-footer-navigation-arrows">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                <MdKeyboardArrowLeft />
              </button>
              <button disabled={indexOfLastItem >= totalItems} onClick={() => setCurrentPage(prev => prev + 1)}>
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ================= BIG MODAL FIELDSET INLINE ENTRY OVERLAY FORM (image_61721e.png layout) ================= */}
      {isFormOpen && (
        <div className="pay-fullscreen-form-overlay">
          <div className="pay-large-card-form-modal">
            <div className="pay-form-modal-header-banner">
              <h3>{formMode === "add" ? "New Payment" : "Edit Payment Properties"}</h3>
              <button className="pay-form-close-x-btn" onClick={() => setIsFormOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSaveForm} className="pay-modal-form-body-wrapper">
              <div className="pay-form-inputs-two-col-grid">
                
                <div className="pay-fieldset-input-node">
                  <legend>Payment ID*</legend>
                  <div className="pay-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.paymentId} onChange={e => setFormFields({...formFields, paymentId: e.target.value})} />
                    <FiKey className="pay-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="pay-fieldset-input-node">
                  <legend>Invoice No*</legend>
                  <div className="pay-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.invoiceNo} onChange={e => setFormFields({...formFields, invoiceNo: e.target.value})} />
                    <FiClipboard className="pay-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="pay-fieldset-input-node">
                  <legend>Payment Date*</legend>
                  <div className="pay-input-icon-rel-wrapper">
                    <input type="date" required value={formFields.paymentDate} onChange={e => setFormFields({...formFields, paymentDate: e.target.value})} />
                  </div>
                </div>

                <div className="pay-fieldset-input-node">
                  <legend>Amount*</legend>
                  <div className="pay-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.amount} onChange={e => setFormFields({...formFields, amount: e.target.value})} />
                    <FiDollarSign className="pay-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="pay-fieldset-input-node">
                  <legend>Payment Method*</legend>
                  <select value={formFields.method} onChange={e => setFormFields({...formFields, method: e.target.value})}>
                    <option value="PayPal">PayPal</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="pay-fieldset-input-node active-blue-border-outline">
                  <legend className="active-blue-legend">Status*</legend>
                  <select value={formFields.status} onChange={e => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

              </div>

              <div className="pay-form-action-footer-buttons">
                <button type="submit" className="pay-form-btn-node btn-save-blue">Save</button>
                <button type="button" className="pay-form-btn-node btn-cancel-red" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DISMISS PROMPT DELETION VERIFICATION (image_617501.png layout) ================= */}
      {isDeleteOpen && targetItem && (
        <div className="pay-delete-alert-backdrop-modal">
          <div className="pay-alert-box-card-node">
            <h4>Are you sure?</h4>
            <div className="pay-alert-details-body">
              <p>Payment ID: {targetItem.paymentId}</p>
              <p>Invoice No: {targetItem.invoiceNo}</p>
              <p>Amount: ${targetItem.amount}</p>
            </div>
            <div className="pay-alert-footer-action-row">
              <button className="pay-alert-btn btn-confirm-danger" onClick={() => { setData(data.filter(i => i.id !== targetItem.id)); setIsDeleteOpen(false); }}>Delete</button>
              <button className="pay-alert-btn btn-cancel-blue" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientPayments;