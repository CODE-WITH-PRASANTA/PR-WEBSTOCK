import React, { useState, useEffect, useRef } from "react";
import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlusCircle, 
  FiRefreshCw, FiDownload, FiCalendar, FiX, FiEdit2, FiClipboard, FiDollarSign 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./ClientInvoices.css";

const initialInvoicesData = [
  { id: "1", invoiceNo: "INV-001", projectName: "E-commerce Platform", invoiceDate: "2023-01-15", dueDate: "2023-02-15", amount: "5,000", status: "Paid" },
  { id: "2", invoiceNo: "INV-002", projectName: "Mobile App", invoiceDate: "2023-03-01", dueDate: "2023-04-01", amount: "3,500", status: "Sent" },
  { id: "3", invoiceNo: "INV-003", projectName: "CRM Redesign", invoiceDate: "2023-05-10", dueDate: "2023-06-10", amount: "2,800", status: "Overdue" },
  { id: "4", invoiceNo: "INV-004", projectName: "Inventory System", invoiceDate: "2023-06-20", dueDate: "2023-07-20", amount: "1,200", status: "Paid" },
  { id: "5", invoiceNo: "INV-005", projectName: "Analytics Dashboard", invoiceDate: "2023-07-15", dueDate: "2023-08-15", amount: "4,100", status: "Sent" },
  { id: "6", invoiceNo: "INV-006", projectName: "SEO Optimization", invoiceDate: "2023-08-05", dueDate: "2023-09-05", amount: "900", status: "Paid" },
  { id: "7", invoiceNo: "INV-007", projectName: "Cloud Migration", invoiceDate: "2023-09-10", dueDate: "2023-10-10", amount: "6,500", status: "Sent" },
  { id: "8", invoiceNo: "INV-008", projectName: "Security Audit", invoiceDate: "2023-10-01", dueDate: "2023-11-01", amount: "2,000", status: "Overdue" },
  { id: "9", invoiceNo: "INV-009", projectName: "HR Portal", invoiceDate: "2023-11-15", dueDate: "2023-12-15", amount: "3,200", status: "Paid" },
  { id: "10", invoiceNo: "INV-010", projectName: "AI Bot", invoiceDate: "2023-12-05", dueDate: "2024-01-05", amount: "1,800", status: "Sent" }
];

const ClientInvoices = () => {
  const [data, setData] = useState(initialInvoicesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal Visibility Controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  // Form Field Binding States
  const [formFields, setFormFields] = useState({
    id: "", invoiceNo: "", projectName: "", invoiceDate: "", dueDate: "", amount: "", status: "Sent"
  });

  // Column Mapping Dictionary (Ref image_6171d7.png)
  const [columns, setColumns] = useState({
    checkbox: true, id: false, invoiceNo: true, projectName: true, invoiceDate: true, dueDate: true, amount: true, status: true, actions: true
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
      id: String(Date.now()), invoiceNo: `INV-${Math.floor(Math.random() * 900) + 100}`, 
      projectName: "", invoiceDate: "2026-07-02", dueDate: "", amount: "", status: "Sent"
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
    setData(initialInvoicesData);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handleDownloadCSV = () => {
    const headers = ["Invoice No", "Project Name", "Invoice Date", "Due Date", "Amount", "Status"];
    const rows = data.map(i => [i.invoiceNo, i.projectName, i.invoiceDate, i.dueDate, `$${i.amount}`, i.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "client_invoices_report.csv");
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

  // Real-time keyword filtering 
  const filteredData = data.filter(item => 
    item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Bounds
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;

  // Formatting date visual utility strings (YYYY-MM-DD to MM/DD/YYYY)
  const formatDateString = (dateStr) => {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="ci-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="ci-breadcrumb-header-strip">
        <div className="ci-crumb-left">
          <h2>Client Invoices</h2>
        </div>
        <div className="ci-crumb-right">
          <FiHome className="ci-home-icon-node" />
          <span className="ci-separator-node">&gt;</span>
          <span className="ci-dim-node">Clients</span>
          <span className="ci-separator-node">&gt;</span>
          <span className="ci-active-node">Invoices</span>
        </div>
      </div>

      {/* ================= DATAGRID WORKSPACE ================= */}
      <div className="ci-main-table-panel">
        
        {/* PANEL ACTION TOOLBAR BAR */}
        <div className="ci-panel-toolbar-row">
          <div className="ci-toolbar-left">
            <span className="ci-panel-tab-title">Client Invoices</span>
            <div className="ci-search-input-field">
              <FiSearch className="ci-search-inside-ico" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="ci-toolbar-right" ref={dropdownRef}>
            <button className="ci-tool-act-btn color-red" onClick={() => { setData(data.filter(i => !selectedRows.includes(i.id))); setSelectedRows([]); }} disabled={selectedRows.length === 0} title="Delete Selected Items">
              <FiTrash2 />
            </button>
            <button className="ci-tool-act-btn color-blue" onClick={() => setColumnMenuOpen(!columnMenuOpen)} title="Show/Hide Columns">
              <FiFilter />
            </button>
            <button className="ci-tool-act-btn color-green" onClick={handleOpenAdd} title="Add New Invoice">
              <FiPlusCircle />
            </button>
            <button className="ci-tool-act-btn color-gray" onClick={handleRefresh} title="Refresh Table State">
              <FiRefreshCw />
            </button>
            <button className="ci-tool-act-btn color-blue" onClick={handleDownloadCSV} title="Export CSV Report">
              <FiDownload />
            </button>

            {/* TOGGLE COLUMN COMPONENT BOX (image_6171d7.png layout) */}
            {columnMenuOpen && (
              <div className="ci-columns-dropdown-popup">
                <div className="ci-popup-header-label">Show/Hide Column</div>
                <div className="ci-popup-scroll-area">
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="ci-popup-row-item">
                      <input 
                        type="checkbox" 
                        checked={columns[key]} 
                        onChange={() => setColumns(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                      <span className="ci-checkbox-visual-node"></span>
                      <span className="ci-checkbox-txt-label">
                        {key === "id" ? "ID" : key === "invoiceNo" ? "Invoice No" : key === "projectName" ? "Project Name" : key === "invoiceDate" ? "Invoice Date" : key === "dueDate" ? "Due Date" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESPONSIVE INTERNAL TABLE AREA */}
        <div className="ci-table-viewport-slider">
          <table className="ci-custom-data-table-node">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th className="ci-cell-checkbox-dimension">
                    <input 
                      type="checkbox" 
                      checked={currentItems.length > 0 && selectedRows.length === currentItems.length} 
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.invoiceNo && <th>Invoice No</th>}
                {columns.projectName && <th>Project Name</th>}
                {columns.invoiceDate && <th>Invoice Date</th>}
                {columns.dueDate && <th>Due Date</th>}
                {columns.amount && <th>Amount</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="text-center-aligned">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? "ci-row-highlighted-active" : ""}>
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
                  {columns.invoiceNo && <td className="ci-invoice-id-field-txt">{item.invoiceNo}</td>}
                  {columns.projectName && <td>{item.projectName}</td>}
                  {columns.invoiceDate && (
                    <td>
                      <div className="ci-date-cell-flex-node"><FiCalendar className="ci-calendar-brown-ico"/> {formatDateString(item.invoiceDate)}</div>
                    </td>
                  )}
                  {columns.dueDate && (
                    <td>
                      <div className="ci-date-cell-flex-node"><FiCalendar className="ci-calendar-brown-ico"/> {formatDateString(item.dueDate)}</div>
                    </td>
                  )}
                  {columns.amount && <td className="ci-amount-weight-node">${item.amount}</td>}
                  {columns.status && (
                    <td>
                      <span className={`ci-status-pill-badge tag-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="ci-actions-flex-holder">
                        <button className="ci-action-row-btn btn-edit-tint" onClick={() => handleOpenEdit(item)}>
                          <FiEdit2 />
                        </button>
                        <button className="ci-action-row-btn btn-delete-tint" onClick={() => { setTargetItem(item); setIsDeleteOpen(true); }}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="9" className="ci-empty-fallback-message">No invoice files located within data limits.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION INTERACTION TRACKBAR FOOTER */}
        <div className="ci-pagination-footer-row-layout">
          <div className="ci-pagination-right-cluster">
            <span className="ci-footer-dim-label">Items per page:</span>
            <div className="ci-select-native-box-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span className="ci-footer-range-label">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="ci-footer-navigation-arrows">
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

      {/* ================= MODAL FIELDSET INLINE CONTAINER OVERLAY FORM (image_61721e.png layout) ================= */}
      {isFormOpen && (
        <div className="ci-fullscreen-form-overlay">
          <div className="ci-large-card-form-modal">
            <div className="ci-form-modal-header-banner">
              <h3>{formMode === "add" ? "New Invoice" : "Edit Invoice Setup"}</h3>
              <button className="ci-form-close-x-btn" onClick={() => setIsFormOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSaveForm} className="ci-modal-form-body-wrapper">
              <div className="ci-form-inputs-two-col-grid">
                
                <div className="ci-fieldset-input-node">
                  <legend>Invoice No*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.invoiceNo} onChange={e => setFormFields({...formFields, invoiceNo: e.target.value})} />
                    <FiClipboard className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="ci-fieldset-input-node">
                  <legend>Project Name*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.projectName} onChange={e => setFormFields({...formFields, projectName: e.target.value})} />
                    <FiClipboard className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="ci-fieldset-input-node">
                  <legend>Invoice Date*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="date" required value={formFields.invoiceDate} onChange={e => setFormFields({...formFields, invoiceDate: e.target.value})} />
                  </div>
                </div>

                <div className="ci-fieldset-input-node">
                  <legend>Due Date*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="date" required value={formFields.dueDate} onChange={e => setFormFields({...formFields, dueDate: e.target.value})} />
                  </div>
                </div>

                <div className="ci-fieldset-input-node">
                  <legend>Amount*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.amount} onChange={e => setFormFields({...formFields, amount: e.target.value})} />
                    <FiDollarSign className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="ci-fieldset-input-node active-blue-border-outline">
                  <legend className="active-blue-legend">Status*</legend>
                  <select value={formFields.status} onChange={e => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Sent">Sent</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

              </div>

              <div className="ci-form-action-footer-buttons">
                <button type="submit" className="ci-form-btn-node btn-save-blue">Save</button>
                <button type="button" className="ci-form-btn-node btn-cancel-red" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETION VALIDATION DISMISSAL PROMPT (image_617501.png layout) ================= */}
      {isDeleteOpen && targetItem && (
        <div className="ci-delete-alert-backdrop-modal">
          <div className="ci-alert-box-card-node">
            <h4>Are you sure?</h4>
            <div className="ci-alert-details-body">
              <p>Invoice No: {targetItem.invoiceNo}</p>
              <p>Project Name: {targetItem.projectName}</p>
              <p>Amount: ${targetItem.amount}</p>
            </div>
            <div className="ci-alert-footer-action-row">
              <button className="ci-alert-btn btn-confirm-danger" onClick={() => { setData(data.filter(i => i.id !== targetItem.id)); setIsDeleteOpen(false); }}>Delete</button>
              <button className="ci-alert-btn btn-cancel-blue" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientInvoices;