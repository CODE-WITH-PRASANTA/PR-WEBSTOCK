import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlusCircle, 
  FiRefreshCw, FiDownload, FiCalendar, FiX, FiEdit2, 
  FiClipboard, FiUser, FiPhone, FiMail, FiCheckCircle, FiClock, FiList, FiArrowRightCircle
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./ClientInvoices.css";
import API from "../../api/axios";

// Helper: Formats numbers to Indian Rupee (₹ INR)
const formatINR = (amount) => {
  const numericValue = Number(amount) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(numericValue);
};

// Helper: Generates default 1st-of-the-month cycles
const getUpcomingBillingCycle = () => {
  const now = new Date();
  
  const invYear = now.getFullYear();
  const invMonth = now.getMonth();
  const invoiceDateObj = new Date(invYear, invMonth, 1);
  const formattedInvoiceDate = invoiceDateObj.toISOString().split("T")[0];

  const nextMonthYear = invMonth === 11 ? invYear + 1 : invYear;
  const nextMonthIndex = (invMonth + 1) % 12;
  const dueDateObj = new Date(nextMonthYear, nextMonthIndex, 1);
  const formattedDueDate = dueDateObj.toISOString().split("T")[0];

  return { formattedInvoiceDate, formattedDueDate };
};

const ClientInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Query & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal Controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  // Month-wise Installments Schedule Modal
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [activeEmiInvoice, setActiveEmiInvoice] = useState(null);

  // Form Field State
  const [formFields, setFormFields] = useState({
    _id: "",
    itemNo: "",
    clientName: "",
    mobile: "",
    email: "",
    projectName: "",
    projectCategory: "Website Development",
    invoiceDate: "",
    dueDate: "",
    totalCost: "",
    advanceCost: 0,
    emiMonths: 1,
    status: "Upcoming"
  });

  // Table Column Visibility
  const [columns, setColumns] = useState({
    checkbox: true,
    slNo: false,
    itemNo: true,
    clientName: true,
    mobile: true,
    projectName: true,
    invoiceDate: true,
    dueDate: true,
    totalCost: true,
    advanceCost: true,
    remainingBalance: true,
    perMonthEmi: true,
    activeDueMonth: true,
    monthWiseTracking: true,
    status: true,
    actions: true
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

  // Fetch all invoices
  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        status: statusFilter || undefined
      };

      const response = await API.get("/invoices", { params });
      if (response.data?.success) {
        setInvoices(response.data.data);
        setTotalRecords(response.data.totalRecords);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Open Modal in Add Mode
  const handleOpenAdd = () => {
    const { formattedInvoiceDate, formattedDueDate } = getUpcomingBillingCycle();
    const generatedInvoiceNo = `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

    setFormFields({
      _id: "",
      itemNo: generatedInvoiceNo,
      clientName: "",
      mobile: "",
      email: "",
      projectName: "",
      projectCategory: "Website Development",
      invoiceDate: formattedInvoiceDate,
      dueDate: formattedDueDate,
      totalCost: "",
      advanceCost: 0,
      emiMonths: 1,
      status: "Upcoming"
    });
    setFormMode("add");
    setIsFormOpen(true);
  };

  // Open Modal in Edit Mode
  const handleOpenEdit = (item) => {
    setFormFields({
      _id: item._id,
      itemNo: item.itemNo,
      clientName: item.clientName,
      mobile: item.mobile,
      email: item.email || "",
      projectName: item.projectName,
      projectCategory: item.projectCategory || "Website Development",
      invoiceDate: item.invoiceDate ? item.invoiceDate.split("T")[0] : "",
      dueDate: item.dueDate ? item.dueDate.split("T")[0] : "",
      totalCost: item.totalCost,
      advanceCost: item.advanceCost || 0,
      emiMonths: item.emiMonths || 1,
      status: item.status
    });
    setFormMode("edit");
    setIsFormOpen(true);
  };

  // Save / Update Invoice
  const handleSaveForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      if (formMode === "add") {
        await API.post("/invoices", formFields);
      } else {
        await API.put(`/invoices/${formFields._id}`, formFields);
      }
      setIsFormOpen(false);
      fetchInvoices();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  // Quick Inline Update for Due Date
  const handleInlineDueDateChange = async (id, newDueDate) => {
    try {
      await API.patch(`/invoices/${id}/due-date`, { dueDate: newDueDate });
      fetchInvoices();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update Due Date");
    }
  };

  // Month-wise Installment Status Update (Auto-progresses Due Date to next cycle and marks complete)
  const handleUpdateMonthInstallment = async (invoiceId, installmentNo, newStatus) => {
    try {
      const response = await API.patch(`/invoices/${invoiceId}/installments/${installmentNo}`, {
        status: newStatus
      });

      if (response.data?.success) {
        const updatedInvoice = response.data.data;
        
        // Update main table
        setInvoices((prev) =>
          prev.map((inv) => (inv._id === invoiceId ? updatedInvoice : inv))
        );

        // Update modal if open
        if (activeEmiInvoice && activeEmiInvoice._id === invoiceId) {
          setActiveEmiInvoice(updatedInvoice);
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update installment status");
    }
  };

  // Delete Single Invoice
  const handleConfirmDelete = async () => {
    if (!targetItem) return;
    try {
      await API.delete(`/invoices/${targetItem._id}`);
      setIsDeleteOpen(false);
      setTargetItem(null);
      fetchInvoices();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete invoice");
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm(`Delete ${selectedRows.length} selected invoices?`)) return;
    try {
      await API.post("/invoices/bulk-delete", { ids: selectedRows });
      setSelectedRows([]);
      fetchInvoices();
    } catch (err) {
      alert(err.response?.data?.message || "Bulk delete failed");
    }
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
    setSelectedRows([]);
    fetchInvoices();
  };

  const handleDownloadCSV = () => {
    const headers = ["Invoice No", "Client Name", "Mobile", "Project Name", "Invoice Date", "Current Due Date", "Total (INR)", "Advance (INR)", "Monthly EMI (INR)", "Tenure", "Status"];
    const rows = invoices.map(i => [
      i.itemNo,
      `"${i.clientName}"`,
      i.mobile,
      `"${i.projectName}"`,
      i.invoiceDate ? i.invoiceDate.split("T")[0] : "",
      i.dueDate ? i.dueDate.split("T")[0] : "",
      i.totalCost,
      i.advanceCost,
      i.perMonthEmi,
      `${i.emiMonths} Months`,
      i.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "client_invoices_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === invoices.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(invoices.map(i => i._id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const formatDateString = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
  };

  const startRecordIndex = (currentPage - 1) * itemsPerPage + 1;
  const endRecordIndex = Math.min(currentPage * itemsPerPage, totalRecords);

  return (
    <div className="ci-layout-root-container">
      {/* Breadcrumb Header */}
      <div className="ci-breadcrumb-header-strip">
        <div className="ci-crumb-left">
          <h2>Client Invoices & Auto Due Date Billing (INR ₹)</h2>
        </div>
        <div className="ci-crumb-right">
          <FiHome className="ci-home-icon-node" />
          <span className="ci-separator-node">&gt;</span>
          <span className="ci-dim-node">Clients</span>
          <span className="ci-separator-node">&gt;</span>
          <span className="ci-active-node">Upcoming Invoices</span>
        </div>
      </div>

      {/* Main Table Workspace */}
      <div className="ci-main-table-panel">
        
        {/* Toolbar */}
        <div className="ci-panel-toolbar-row">
          <div className="ci-toolbar-left">
            <span className="ci-panel-tab-title">Invoice Records</span>
            <div className="ci-search-input-field">
              <FiSearch className="ci-search-inside-ico" />
              <input 
                type="text" 
                placeholder="Search Invoice, Client, Phone..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="ci-toolbar-right" ref={dropdownRef}>
            <button className="ci-tool-act-btn color-red" onClick={handleBulkDelete} disabled={selectedRows.length === 0} title="Delete Selected">
              <FiTrash2 />
            </button>
            <button className="ci-tool-act-btn color-blue" onClick={() => setColumnMenuOpen(!columnMenuOpen)} title="Show/Hide Columns">
              <FiFilter />
            </button>
            <button className="ci-tool-act-btn color-green" onClick={handleOpenAdd} title="Generate Upcoming Month Bill">
              <FiPlusCircle />
            </button>
            <button className="ci-tool-act-btn color-gray" onClick={handleRefresh} title="Refresh Table">
              <FiRefreshCw />
            </button>
            <button className="ci-tool-act-btn color-blue" onClick={handleDownloadCSV} title="Export CSV Report">
              <FiDownload />
            </button>

            {columnMenuOpen && (
              <div className="ci-columns-dropdown-popup">
                <div className="ci-popup-header-label">Show/Hide Columns</div>
                <div className="ci-popup-scroll-area">
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="ci-popup-row-item">
                      <input 
                        type="checkbox" 
                        checked={columns[key]} 
                        onChange={() => setColumns(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                      <span className="ci-checkbox-txt-label">
                        {key === "itemNo" ? "Invoice No" : 
                         key === "slNo" ? "SL No" : 
                         key === "totalCost" ? "Total Cost (₹)" : 
                         key === "advanceCost" ? "Advance (₹)" :
                         key === "remainingBalance" ? "Balance (₹)" :
                         key === "perMonthEmi" ? "EMI / Month (₹)" : 
                         key === "activeDueMonth" ? "Pay Active Due Month" :
                         key === "monthWiseTracking" ? "All Months" :
                         key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {errorMessage && <div className="ci-error-banner">{errorMessage}</div>}

        {/* Table Viewport */}
        <div className="ci-table-viewport-slider">
          <table className="ci-custom-data-table-node">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th className="ci-cell-checkbox-dimension">
                    <input 
                      type="checkbox" 
                      checked={invoices.length > 0 && selectedRows.length === invoices.length} 
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.slNo && <th>#</th>}
                {columns.itemNo && <th>Invoice No</th>}
                {columns.clientName && <th>Client Name</th>}
                {columns.mobile && <th>Mobile</th>}
                {columns.projectName && <th>Project</th>}
                {columns.invoiceDate && <th>Invoice Date</th>}
                {columns.dueDate && <th>Next Due Date (1st)</th>}
                {columns.totalCost && <th>Total (INR)</th>}
                {columns.advanceCost && <th>Advance Paid</th>}
                {columns.remainingBalance && <th>Balance</th>}
                {columns.perMonthEmi && <th>Monthly EMI</th>}
                {columns.activeDueMonth && <th>Active Due Action</th>}
                {columns.monthWiseTracking && <th>Monthly Breakdown</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="text-center-aligned">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="16" className="ci-empty-fallback-message">Loading records...</td>
                </tr>
              ) : invoices.map((item) => {
                // Determine current unpaid installment corresponding to active due date
                const activeUnpaidInstallment = item.emiSchedule?.find(e => e.status !== "Paid");
                const allDone = item.status === "Completed" || (item.emiSchedule && item.emiSchedule.every(e => e.status === "Paid"));

                return (
                  <tr key={item._id} className={selectedRows.includes(item._id) ? "ci-row-highlighted-active" : ""}>
                    {columns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(item._id)} 
                          onChange={() => toggleSelectRow(item._id)}
                        />
                      </td>
                    )}
                    {columns.slNo && <td>{item.slNo || "-"}</td>}
                    {columns.itemNo && <td className="ci-invoice-id-field-txt">{item.itemNo}</td>}
                    {columns.clientName && <td className="ci-client-name-bold">{item.clientName}</td>}
                    {columns.mobile && <td className="ci-phone-txt">+91 {item.mobile}</td>}
                    {columns.projectName && <td>{item.projectName}</td>}
                    {columns.invoiceDate && (
                      <td>
                        <div className="ci-date-cell-flex-node">
                          <FiCalendar className="ci-calendar-brown-ico"/> {formatDateString(item.invoiceDate)}
                        </div>
                      </td>
                    )}
                    {columns.dueDate && (
                      <td>
                        <div className="ci-date-cell-flex-node ci-due-date-accent">
                          <FiCalendar className="ci-calendar-brown-ico"/> 
                          <input 
                            type="date"
                            className="ci-inline-date-input"
                            value={item.dueDate ? item.dueDate.split("T")[0] : ""}
                            onChange={(e) => handleInlineDueDateChange(item._id, e.target.value)}
                          />
                        </div>
                      </td>
                    )}
                    {columns.totalCost && <td className="ci-amount-weight-node inr-symbol">{formatINR(item.totalCost)}</td>}
                    {columns.advanceCost && <td>{formatINR(item.advanceCost || 0)}</td>}
                    {columns.remainingBalance && <td className="ci-balance-accent">{formatINR(item.remainingBalance || 0)}</td>}
                    {columns.perMonthEmi && (
                      <td>
                        <strong>{formatINR(item.perMonthEmi)}</strong> 
                        <span className="ci-tenure-subtext"> / mo ({item.emiMonths}M)</span>
                      </td>
                    )}

                    {/* Active Due Month Quick-Pay Trigger */}
                    {columns.activeDueMonth && (
                      <td>
                        {allDone ? (
                          <span className="ci-completed-badge-node">
                            <FiCheckCircle /> 100% Completed
                          </span>
                        ) : activeUnpaidInstallment ? (
                          <button
                            type="button"
                            className="ci-quick-pay-trigger-btn"
                            onClick={() => handleUpdateMonthInstallment(item._id, activeUnpaidInstallment.installmentNo, "Paid")}
                            title={`Pay Month ${activeUnpaidInstallment.installmentNo} (Auto-moves Due Date to next month)`}
                          >
                            <FiArrowRightCircle /> Pay M{activeUnpaidInstallment.installmentNo} Due
                          </button>
                        ) : (
                          <span className="ci-dim-node">—</span>
                        )}
                      </td>
                    )}

                    {/* Monthly Pills breakdown */}
                    {columns.monthWiseTracking && (
                      <td>
                        <div className="ci-installment-chips-container">
                          {item.emiSchedule && item.emiSchedule.length > 0 ? (
                            <>
                              <div className="ci-chips-scroll-strip">
                                {item.emiSchedule.map((emi) => (
                                  <button
                                    key={emi.installmentNo}
                                    type="button"
                                    className={`ci-month-chip tag-${emi.status.toLowerCase()}`}
                                    onClick={() => handleUpdateMonthInstallment(
                                      item._id, 
                                      emi.installmentNo, 
                                      emi.status === "Paid" ? "Upcoming" : "Paid"
                                    )}
                                    title={`Toggle Month ${emi.installmentNo} (Paid / Upcoming)`}
                                  >
                                    <span className="chip-month-no">M{emi.installmentNo}:</span>
                                    <span className="chip-month-status">{emi.status}</span>
                                  </button>
                                ))}
                              </div>
                              <button 
                                type="button" 
                                className="ci-manage-schedule-btn" 
                                onClick={() => { setActiveEmiInvoice(item); setIsEmiModalOpen(true); }}
                              >
                                <FiList /> Details
                              </button>
                            </>
                          ) : (
                            <span className="ci-dim-node">No EMIs</span>
                          )}
                        </div>
                      </td>
                    )}

                    {columns.status && (
                      <td>
                        <span className={`ci-status-pill-badge tag-${item.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {item.status}
                        </span>
                      </td>
                    )}
                    {columns.actions && (
                      <td>
                        <div className="ci-actions-flex-holder">
                          <button className="ci-action-row-btn btn-edit-tint" onClick={() => handleOpenEdit(item)} title="Edit Invoice">
                            <FiEdit2 />
                          </button>
                          <button className="ci-action-row-btn btn-delete-tint" onClick={() => { setTargetItem(item); setIsDeleteOpen(true); }} title="Delete">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
              {!loading && invoices.length === 0 && (
                <tr>
                  <td colSpan="16" className="ci-empty-fallback-message">No invoice records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
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
              {totalRecords === 0 ? 0 : startRecordIndex} – {endRecordIndex} of {totalRecords}
            </span>
            <div className="ci-footer-navigation-arrows">
              <button disabled={currentPage <= 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                <MdKeyboardArrowLeft />
              </button>
              <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Main Invoice Form Modal */}
      {isFormOpen && (
        <div className="ci-fullscreen-form-overlay">
          <div className="ci-large-card-form-modal">
            <div className="ci-form-modal-header-banner">
              <div className="ci-modal-title-wrap">
                <h3>{formMode === "add" ? "Generate Upcoming Month Bill (INR ₹)" : "Edit Invoice Setup"}</h3>
                <span className="ci-modal-subtitle">Auto-configured for 1st-of-the-month cycles and Indian Rupee billing</span>
              </div>
              <button className="ci-form-close-x-btn" onClick={() => setIsFormOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSaveForm} className="ci-modal-form-body-wrapper">
              <div className="ci-form-inputs-two-col-grid">
                
                {/* Invoice No */}
                <div className="ci-fieldset-input-node">
                  <legend>Invoice No*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.itemNo} onChange={e => setFormFields({...formFields, itemNo: e.target.value})} />
                    <FiClipboard className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                {/* Client Name */}
                <div className="ci-fieldset-input-node">
                  <legend>Client Full Name*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="text" placeholder="e.g. Ramesh Kumar" required value={formFields.clientName} onChange={e => setFormFields({...formFields, clientName: e.target.value})} />
                    <FiUser className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                {/* Mobile */}
                <div className="ci-fieldset-input-node">
                  <legend>Mobile (10 Digits)*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="tel" pattern="[0-9]{10}" placeholder="9876543210" required value={formFields.mobile} onChange={e => setFormFields({...formFields, mobile: e.target.value})} />
                    <FiPhone className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                {/* Email */}
                <div className="ci-fieldset-input-node">
                  <legend>Official Email*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="email" placeholder="billing@domain.in" required value={formFields.email} onChange={e => setFormFields({...formFields, email: e.target.value})} />
                    <FiMail className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                {/* Project Name */}
                <div className="ci-fieldset-input-node">
                  <legend>Project Name*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="text" placeholder="e.g. Mobile Application" required value={formFields.projectName} onChange={e => setFormFields({...formFields, projectName: e.target.value})} />
                    <FiClipboard className="ci-embedded-form-input-ico" />
                  </div>
                </div>

                {/* Project Category */}
                <div className="ci-fieldset-input-node">
                  <legend>Project Category*</legend>
                  <select value={formFields.projectCategory} onChange={e => setFormFields({...formFields, projectCategory: e.target.value})}>
                    <option value="Website Development">Website Development</option>
                    <option value="Application Development">Application Development</option>
                    <option value="Both Website and Application">Both Website and Application</option>
                    <option value="SEO Work">SEO Work</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Meta Ads">Meta Ads</option>
                  </select>
                </div>

                {/* Invoice Date */}
                <div className="ci-fieldset-input-node active-highlight">
                  <legend>Invoice Date (1st of Month)*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="date" required value={formFields.invoiceDate} onChange={e => setFormFields({...formFields, invoiceDate: e.target.value})} />
                  </div>
                </div>

                {/* Due Date */}
                <div className="ci-fieldset-input-node active-highlight">
                  <legend>Due Date (1st of Upcoming Month)*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="date" required value={formFields.dueDate} onChange={e => setFormFields({...formFields, dueDate: e.target.value})} />
                  </div>
                </div>

                {/* Total Cost */}
                <div className="ci-fieldset-input-node">
                  <legend>Total Cost (₹ INR)*</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="number" min="0" placeholder="150000" required value={formFields.totalCost} onChange={e => setFormFields({...formFields, totalCost: Number(e.target.value)})} />
                    <span className="ci-embedded-currency-symbol">₹</span>
                  </div>
                </div>

                {/* Advance Paid */}
                <div className="ci-fieldset-input-node">
                  <legend>Advance Paid (₹ INR)</legend>
                  <div className="ci-input-icon-rel-wrapper">
                    <input type="number" min="0" placeholder="50000" value={formFields.advanceCost} onChange={e => setFormFields({...formFields, advanceCost: Number(e.target.value)})} />
                    <span className="ci-embedded-currency-symbol">₹</span>
                  </div>
                </div>

                {/* EMI Months */}
                <div className="ci-fieldset-input-node">
                  <legend>EMI Tenure (Months)*</legend>
                  <input type="number" min="1" max="60" required value={formFields.emiMonths} onChange={e => setFormFields({...formFields, emiMonths: Number(e.target.value)})} />
                </div>

                {/* Status */}
                <div className="ci-fieldset-input-node active-blue-border-outline">
                  <legend className="active-blue-legend">Status*</legend>
                  <select value={formFields.status} onChange={e => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Paid">Paid</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

              </div>

              {/* Summary calculations */}
              <div className="ci-form-calc-summary-strip">
                <div>Balance: <strong>{formatINR(Math.max(0, (Number(formFields.totalCost) || 0) - (Number(formFields.advanceCost) || 0)))}</strong></div>
                <div>Per Month EMI: <strong>{formatINR(Math.max(0, (Number(formFields.totalCost) || 0) - (Number(formFields.advanceCost) || 0)) / (Number(formFields.emiMonths) || 1))}</strong></div>
              </div>

              <div className="ci-form-action-footer-buttons">
                <button type="submit" className="ci-form-btn-node btn-save-blue">
                  {formMode === "add" ? "Generate Bill" : "Update Invoice"}
                </button>
                <button type="button" className="ci-form-btn-node btn-cancel-red" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Month-Wise Detailed Schedule Modal */}
      {isEmiModalOpen && activeEmiInvoice && (
        <div className="ci-fullscreen-form-overlay">
          <div className="ci-large-card-form-modal ci-schedule-modal-card">
            <div className="ci-form-modal-header-banner">
              <div className="ci-modal-title-wrap">
                <h3>Month-Wise Installment Schedule: {activeEmiInvoice.itemNo}</h3>
                <span className="ci-modal-subtitle">
                  {activeEmiInvoice.clientName} &bull; Total Balance: {formatINR(activeEmiInvoice.remainingBalance)} &bull; Monthly: {formatINR(activeEmiInvoice.perMonthEmi)}
                </span>
              </div>
              <button className="ci-form-close-x-btn" onClick={() => setIsEmiModalOpen(false)}><FiX /></button>
            </div>
            
            <div className="ci-modal-form-body-wrapper">
              <div className="ci-schedule-table-wrapper">
                <table className="ci-custom-data-table-node">
                  <thead>
                    <tr>
                      <th>Month #</th>
                      <th>Scheduled Due Date</th>
                      <th>Amount (₹ INR)</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th>Paid On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeEmiInvoice.emiSchedule?.map((emi) => (
                      <tr key={emi.installmentNo}>
                        <td><strong>Month {emi.installmentNo}</strong></td>
                        <td>
                          <div className="ci-date-cell-flex-node">
                            <FiCalendar className="ci-calendar-brown-ico" />
                            {formatDateString(emi.dueDate)}
                          </div>
                        </td>
                        <td><strong className="ci-amount-weight-node">{formatINR(emi.amount)}</strong></td>
                        <td>
                          <span className={`ci-status-pill-badge tag-${emi.status.toLowerCase()}`}>
                            {emi.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`ci-pill-btn ${emi.status === "Paid" ? "btn-status-paid" : "btn-status-upcoming"}`}
                            onClick={() =>
                              handleUpdateMonthInstallment(
                                activeEmiInvoice._id,
                                emi.installmentNo,
                                emi.status === "Paid" ? "Upcoming" : "Paid"
                              )
                            }
                          >
                            {emi.status === "Paid" ? "Mark Unpaid" : "Mark Paid & Shift Due Date"}
                          </button>
                        </td>
                        <td>
                          {emi.paidDate ? (
                            <span className="ci-paid-date-label">
                              <FiCheckCircle className="text-green" /> {formatDateString(emi.paidDate)}
                            </span>
                          ) : (
                            <span className="ci-dim-node">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ci-form-action-footer-buttons">
                <button type="button" className="ci-form-btn-node btn-save-blue" onClick={() => setIsEmiModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && targetItem && (
        <div className="ci-delete-alert-backdrop-modal">
          <div className="ci-alert-box-card-node">
            <h4>Confirm Invoice Removal</h4>
            <div className="ci-alert-details-body">
              <p><strong>Invoice No:</strong> {targetItem.itemNo}</p>
              <p><strong>Client:</strong> {targetItem.clientName} (+91 {targetItem.mobile})</p>
              <p><strong>Project:</strong> {targetItem.projectName}</p>
              <p><strong>Total:</strong> {formatINR(targetItem.totalCost)}</p>
            </div>
            <div className="ci-alert-footer-action-row">
              <button className="ci-alert-btn btn-confirm-danger" onClick={handleConfirmDelete}>Delete</button>
              <button className="ci-alert-btn btn-cancel-blue" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientInvoices;