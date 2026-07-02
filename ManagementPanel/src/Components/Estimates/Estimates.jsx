import React, { useState, useEffect, useRef } from "react";
import "./Estimates.css";
import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlusCircle, 
  FiRefreshCw, FiDownload, FiCalendar, FiPhone, FiMail, 
  FiGlobe, FiDollarSign, FiUser, FiX, FiEdit2 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const mockInitialData = [
  { id: "101", eId: "589", clientName: "Sarah Smith", mobile: "1235443210", email: "sarah.smith@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "India", amount: "142", status: "Accepted", details: "Fowl darkness our ..." },
  { id: "102", eId: "784", clientName: "John Doe", mobile: "1234567890", email: "john.doe@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "USA", amount: "872", status: "Declined", details: "Fowl darkness our ..." },
  { id: "103", eId: "658", clientName: "Airi Satou", mobile: "2345678901", email: "airi.satou@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "Australia", amount: "1542", status: "Accepted", details: "Fowl darkness our ..." },
  { id: "104", eId: "285", clientName: "Angelica Ramos", mobile: "3456789012", email: "angelica.ramos@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "Sri Lanka", amount: "9574", status: "Declined", details: "Fowl darkness our ..." },
  { id: "105", eId: "458", clientName: "Ashton Cox", mobile: "4567890123", email: "ashton.cox@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "India", amount: "10000", status: "Sent", details: "Fowl darkness our ..." },
  { id: "106", eId: "958", clientName: "Cara Stevens", mobile: "5678901234", email: "cara.stevens@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "Bangladesh", amount: "578", status: "Sent", details: "Fowl darkness our ..." },
  { id: "107", eId: "257", clientName: "Jacob Ryan", mobile: "6789012345", email: "jacob.ryan@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "Sri Lanka", amount: "479", status: "Expired", details: "Fowl darkness our ..." },
  { id: "108", eId: "937", clientName: "Pooja Sarma", mobile: "7890123456", email: "pooja.sarma@email.com", eDate: "02/12/2018", expDate: "02/12/2018", country: "India", amount: "1482", status: "Accepted", details: "Fowl darkness our ..." }
];

const Estimates = () => {
  // Main Data State
  const [data, setData] = useState(mockInitialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Form Modals View Controls
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  // Form State Fields
  const [formFields, setFormFields] = useState({
    id: "", eId: "", clientName: "", mobile: "", email: "", 
    eDate: "", expDate: "", country: "", amount: "", status: "Accepted", details: ""
  });

  // Dynamic Column Visibility Setup (image_534e80.png layout)
  const [columns, setColumns] = useState({
    checkbox: true, id: true, eId: true, clientName: true, mobile: true,
    email: true, eDate: true, expDate: true, country: true, amount: true,
    status: true, details: true, actions: true
  });

  const columnDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Form management
  const handleOpenAdd = () => {
    setFormFields({
      id: String(Date.now()).slice(-3), eId: String(Math.floor(Math.random() * 900) + 100),
      clientName: "", mobile: "", email: "", eDate: "2018-12-02", expDate: "2018-12-02",
      country: "", amount: "", status: "Accepted", details: ""
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

  const handleOpenDelete = (item) => {
    setTargetItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== targetItem.id));
    setIsDeleteOpen(false);
    setTargetItem(null);
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setData(data.filter(item => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setData(mockInitialData);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handleDownloadCSV = () => {
    const headers = ["ID", "E.ID", "Client Name", "Mobile", "Email", "E.Date", "Expiration Date", "Country", "Amount", "Status"];
    const rows = data.map(i => [i.id, i.eId, i.clientName, i.mobile, i.email, i.eDate, i.expDate, i.country, i.amount, i.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "estimates_report.csv");
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

  // Search filter
  const filteredData = data.filter(item => 
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.includes(searchTerm) || item.eId.includes(searchTerm)
  );

  // Pagination bounds
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;

  return (
    <div className="estimates-layout-root">
      
      {/* ================= TOP RIGHT BREADCRUMB SHADE ================= */}
      <div className="est-breadcrumb-wrapper">
        <div className="crumb-left">
          <h2>Estimates</h2>
        </div>
        <div className="crumb-right">
          <FiHome className="crumb-home-ico" />
          <span className="crumb-arrow">&gt;</span>
          <span className="crumb-dim">Projects</span>
          <span className="crumb-arrow">&gt;</span>
          <span className="crumb-active">Estimates</span>
        </div>
      </div>

      {/* ================= DATAGRID COMPONENT PANEL ================= */}
      <div className="est-main-panel">
        
        {/* PANEL INTERACTIVE TOOLBAR ROW */}
        <div className="est-panel-toolbar">
          <div className="toolbar-left-side">
            <span className="panel-tab-title">Estimates</span>
            <div className="panel-search-field">
              <FiSearch className="search-embedded-ico" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="toolbar-right-side" ref={columnDropdownRef}>
            <button className="tool-act-btn col-red" onClick={handleBulkDelete} disabled={selectedRows.length === 0} title="Delete Selected Rows">
              <FiTrash2 />
            </button>
            <button className="tool-act-btn col-blue" onClick={() => setDropdownOpen(!dropdownOpen)} title="Show/Hide Columns">
              <FiFilter />
            </button>
            <button className="tool-act-btn col-green" onClick={handleOpenAdd} title="Add New Estimate">
              <FiPlusCircle />
            </button>
            <button className="tool-act-btn col-gray" onClick={handleRefresh} title="Reset Grid Data">
              <FiRefreshCw />
            </button>
            <button className="tool-act-btn col-blue" onClick={handleDownloadCSV} title="Export CSV Report">
              <FiDownload />
            </button>

            {/* DYNAMIC HIDE TOGGLE DRAWER (image_534e80.png layout) */}
            {dropdownOpen && (
              <div className="col-toggle-popup-box">
                <div className="toggle-box-title">Show/Hide Column</div>
                <div className="toggle-scroll-viewport">
                  {Object.keys(columns).map((colKey) => (
                    <label key={colKey} className="toggle-row-item">
                      <input 
                        type="checkbox" 
                        checked={columns[colKey]} 
                        onChange={() => setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }))}
                      />
                      <span className="checkbox-replacement-graphic"></span>
                      <span className="checkbox-text-lbl-node">
                        {colKey === "eId" ? "E.ID" : colKey === "eDate" ? "E.Date" : colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* HORIZONTAL SWIPABLE / SLIDABLE DATA CONTAINER GRID */}
        <div className="est-table-scroll-slider">
          <table className="est-custom-data-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th className="cell-checkbox-width">
                    <input 
                      type="checkbox" 
                      checked={currentItems.length > 0 && selectedRows.length === currentItems.length} 
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.eId && <th>E.ID</th>}
                {columns.clientName && <th>Client Name</th>}
                {columns.mobile && <th>Mobile</th>}
                {columns.email && <th>Email</th>}
                {columns.eDate && <th>E.Date</th>}
                {columns.expDate && <th>Expiration Date</th>}
                {columns.country && <th>Country</th>}
                {columns.amount && <th>Amount ↑</th>}
                {columns.status && <th>Status</th>}
                {columns.details && <th>Details</th>}
                {columns.actions && <th className="text-center-aligned">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? "row-highlighted" : ""}>
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
                  {columns.eId && <td>{item.eId}</td>}
                  {columns.clientName && <td>{item.clientName}</td>}
                  {columns.mobile && (
                    <td>
                      <div className="cell-flex-meta-row"><FiPhone className="meta-ico-ph"/> {item.mobile}</div>
                    </td>
                  )}
                  {columns.email && (
                    <td>
                      <div className="cell-flex-meta-row"><FiMail className="meta-ico-ml"/> <span className="text-truncated-node">{item.email}</span></div>
                    </td>
                  )}
                  {columns.eDate && (
                    <td>
                      <div className="cell-flex-meta-row"><FiCalendar className="meta-ico-cal"/> {item.eDate}</div>
                    </td>
                  )}
                  {columns.expDate && (
                    <td>
                      <div className="cell-flex-meta-row"><FiCalendar className="meta-ico-cal"/> {item.expDate}</div>
                    </td>
                  )}
                  {columns.country && <td>{item.country}</td>}
                  {columns.amount && <td className="font-weight-medium">${item.amount}</td>}
                  {columns.status && (
                    <td>
                      <span className={`status-badge-node tag-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.details && <td className="text-muted-details">{item.details}</td>}
                  {columns.actions && (
                    <td>
                      <div className="actions-flex-container">
                        <button className="action-row-btn btn-edit-tint" onClick={() => handleOpenEdit(item)}>
                          <FiEdit2 />
                        </button>
                        <button className="action-row-btn btn-delete-tint" onClick={() => handleOpenDelete(item)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="13" className="empty-fallback-row">No records match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM PAGINATION CONTROLS BAR */}
        <div className="est-pagination-footer-row">
          <div className="pagination-flex-right-cluster">
            <span className="footer-dim-lbl">Items per page:</span>
            <div className="select-native-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <span className="footer-range-lbl">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="footer-navigation-arrows">
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

      {/* ================= ADD/EDIT OVERLAY MODAL FORM (image_534f56.png) ================= */}
      {isFormOpen && (
        <div className="fullscreen-form-overlay">
          <div className="large-card-form-modal">
            <div className="form-modal-header-banner">
              <h3>{formMode === "add" ? "New Estimate" : "Edit Estimate"}</h3>
              <button className="form-close-x-btn" onClick={() => setIsFormOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSaveForm} className="modal-form-body-wrapper">
              <div className="form-inputs-two-col-grid">
                
                <div className="input-group-field-node">
                  <label>Estimate Id*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.eId} onChange={e => setFormFields({...formFields, eId: e.target.value})} />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Client Name*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.clientName} onChange={e => setFormFields({...formFields, clientName: e.target.value})} />
                    <FiUser className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Mobile*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.mobile} onChange={e => setFormFields({...formFields, mobile: e.target.value})} />
                    <FiPhone className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Email*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="email" required value={formFields.email} onChange={e => setFormFields({...formFields, email: e.target.value})} />
                    <FiMail className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Estimate Date*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.eDate} onChange={e => setFormFields({...formFields, eDate: e.target.value})} />
                    <FiCalendar className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Expired Date*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.expDate} onChange={e => setFormFields({...formFields, expDate: e.target.value})} />
                    <FiCalendar className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Country</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" value={formFields.country} onChange={e => setFormFields({...formFields, country: e.target.value})} />
                    <FiGlobe className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node">
                  <label>Amount*</label>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.amount} onChange={e => setFormFields({...formFields, amount: e.target.value})} />
                    <FiDollarSign className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="input-group-field-node full-row-width-dropdown">
                  <label>Status*</label>
                  <select value={formFields.status} onChange={e => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Sent">Sent</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                <div className="input-group-field-node full-row-width-textarea">
                  <label>Details</label>
                  <textarea rows="3" value={formFields.details} onChange={e => setFormFields({...formFields, details: e.target.value})}></textarea>
                </div>
              </div>

              <div className="form-action-footer-buttons">
                <button type="submit" className="form-btn-node btn-save-gray">Save</button>
                <button type="button" className="form-btn-node btn-cancel-red" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ARE YOU SURE CONFIRMATION MODAL (image_53bf73.png) ================= */}
      {isDeleteOpen && targetItem && (
        <div className="delete-alert-backdrop-modal">
          <div className="alert-box-card-node">
            <h4>Are you sure?</h4>
            <div className="alert-details-body">
              <p>Estimate ID: {targetItem.eId}</p>
              <p>Client Name: {targetItem.clientName}</p>
              <p>Status: {targetItem.status}</p>
            </div>
            <div className="alert-footer-action-row">
              <button className="alert-btn btn-confirm-danger" onClick={confirmDelete}>Delete</button>
              <button className="alert-btn btn-cancel-neutral" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Estimates;