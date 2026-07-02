import React, { useState, useEffect, useRef } from "react";
import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlusCircle, 
  FiRefreshCw, FiDownload, FiPhone, FiMail, FiX, FiEdit2, FiBriefcase 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./ClientContacts.css";

const mockContacts = [
  { id: "1", name: "John Doe", mobile: "1234567890", email: "john@example.com", designation: "CEO", status: "Active", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "2", name: "Sarah Smith", mobile: "9876543210", email: "sarah@example.com", designation: "Project Manager", status: "Active", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "Robert Johnson", mobile: "5554443332", email: "robert@example.com", designation: "CTO", status: "Inactive", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: "4", name: "Emily Davis", mobile: "4443332221", email: "emily@example.com", designation: "Marketing Head", status: "Active", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: "5", name: "Michael Brown", mobile: "3332221110", email: "michael@example.com", designation: "Product Designer", status: "Active", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: "6", name: "Jessica Wilson", mobile: "2221110009", email: "jessica@example.com", designation: "HR Manager", status: "Active", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
  { id: "7", name: "David Miller", mobile: "1110009998", email: "david@example.com", designation: "Lead Developer", status: "Inactive", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
  { id: "8", name: "Linda Moore", mobile: "9998887776", email: "linda@example.com", designation: "Financial Analyst", status: "Active", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
  { id: "9", name: "James Taylor", mobile: "8887776665", email: "james@example.com", designation: "QA Lead", status: "Active", avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
  { id: "10", name: "Barbara Anderson", mobile: "7776665554", email: "barbara@example.com", designation: "Operations Manager", status: "Active", avatar: "https://randomuser.me/api/portraits/men/10.jpg" }
];

const ClientContacts = () => {
  const [data, setData] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modals Visibility
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  // Form Field Binder State
  const [formFields, setFormFields] = useState({
    id: "", name: "", mobile: "", email: "", designation: "", status: "Active", avatar: ""
  });

  // Columns visibility dictionary
  const [columns, setColumns] = useState({
    checkbox: true, id: false, name: true, mobile: true, email: true, designation: true, status: true, actions: true
  });

  const menuDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOpenAdd = () => {
    setFormFields({
      id: String(Date.now()), name: "", mobile: "", email: "", designation: "", status: "Active",
      avatar: `https://randomuser.me/api/portraits/thumb/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
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
    setData(mockContacts);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handleDownloadCSV = () => {
    const headers = ["Name", "Mobile", "Email", "Designation", "Status"];
    const rows = data.map(i => [i.name, i.mobile, i.email, i.designation, i.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "client_contacts.csv");
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

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;

  return (
    <div className="client-contacts-layout-root">
      
      {/* ================= BREADCRUMB STRIP ================= */}
      <div className="client-breadcrumb-wrapper">
        <div className="crumb-left">
          <h2>Client Contacts</h2>
        </div>
        <div className="crumb-right">
          <FiHome className="crumb-home-ico" />
          <span className="crumb-arrow">&gt;</span>
          <span className="crumb-dim">Clients</span>
          <span className="crumb-arrow">&gt;</span>
          <span className="crumb-active">Contacts</span>
        </div>
      </div>

      {/* ================= DATAGRID CARD LAYER ================= */}
      <div className="client-main-panel">
        
        {/* TOP TOOLBAR ROW */}
        <div className="client-panel-toolbar">
          <div className="toolbar-left-side">
            <span className="panel-tab-title">Client Contacts</span>
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

          <div className="toolbar-right-side" ref={menuDropdownRef}>
            <button className="tool-act-btn col-red" onClick={() => { setData(data.filter(i => !selectedRows.includes(i.id))); setSelectedRows([]); }} disabled={selectedRows.length === 0} title="Delete Selected Rows">
              <FiTrash2 />
            </button>
            <button className="tool-act-btn col-blue" onClick={() => setDropdownOpen(!dropdownOpen)} title="Show/Hide Columns">
              <FiFilter />
            </button>
            <button className="tool-act-btn col-green" onClick={handleOpenAdd} title="Add New Contact">
              <FiPlusCircle />
            </button>
            <button className="tool-act-btn col-gray" onClick={handleRefresh} title="Reset Data Table">
              <FiRefreshCw />
            </button>
            <button className="tool-act-btn col-blue" onClick={handleDownloadCSV} title="Export Report CSV">
              <FiDownload />
            </button>

            {/* SHOW HIDE COLUMN DROPDOWN (image_5f94a3.png layout) */}
            {dropdownOpen && (
              <div className="column-toggle-popup-box">
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
                        {colKey === "id" ? "ID" : colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESPONSIVE SCROLL GRID OVERVIEW */}
        <div className="client-table-scroll-slider">
          <table className="client-custom-data-table">
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
                {columns.name && <th>Name</th>}
                {columns.mobile && <th>Mobile</th>}
                {columns.email && <th>Email</th>}
                {columns.designation && <th>Designation</th>}
                {columns.status && <th>Status</th>}
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
                  {columns.name && (
                    <td>
                      <div className="profile-cell-flex-wrapper">
                        <img src={item.avatar} alt={item.name} className="cell-avatar-circle" />
                        <span className="cell-bold-profile-name">{item.name}</span>
                      </div>
                    </td>
                  )}
                  {columns.mobile && (
                    <td>
                      <div className="cell-flex-meta-row"><FiPhone className="meta-ico-ph"/> {item.mobile}</div>
                    </td>
                  )}
                  {columns.email && (
                    <td>
                      <div className="cell-flex-meta-row"><FiMail className="meta-ico-ml"/> {item.email}</div>
                    </td>
                  )}
                  {columns.designation && <td>{item.designation}</td>}
                  {columns.status && (
                    <td>
                      <span className={`status-badge-node tag-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="actions-flex-container">
                        <button className="action-row-btn btn-edit-tint" onClick={() => handleOpenEdit(item)}>
                          <FiEdit2 />
                        </button>
                        <button className="action-row-btn btn-delete-tint" onClick={() => { setTargetItem(item); setIsDeleteOpen(true); }}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8" className="empty-fallback-row">No records match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM PAGINATION CONTROLS */}
        <div className="client-pagination-footer-row">
          <div className="pagination-flex-right-cluster">
            <span className="footer-dim-lbl">Items per page:</span>
            <div className="select-native-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
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

      {/* ================= BIG SMOOTH ADD/EDIT FORM MODAL (image_5f9539.png layout) ================= */}
      {isFormOpen && (
        <div className="fullscreen-form-overlay">
          <div className="large-card-form-modal">
            <div className="form-modal-header-banner">
              <div className="form-title-with-avatar">
                {formMode === "edit" && <img src={formFields.avatar} alt="thumb" className="modal-header-thumb" />}
                <h3>{formMode === "add" ? "New Contact" : `Edit Contact: ${formFields.name}`}</h3>
              </div>
              <button className="form-close-x-btn" onClick={() => setIsFormOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSaveForm} className="modal-form-body-wrapper">
              <div className="form-inputs-two-col-grid">
                
                <div className="fieldset-input-node">
                  <legend>Name*</legend>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.name} onChange={e => setFormFields({...formFields, name: e.target.value})} />
                    <span className="embedded-form-input-ico font-avatar-icon">☺</span>
                  </div>
                </div>

                <div className="fieldset-input-node">
                  <legend>Designation*</legend>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.designation} onChange={e => setFormFields({...formFields, designation: e.target.value})} />
                    <FiBriefcase className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="fieldset-input-node">
                  <legend>Mobile*</legend>
                  <div className="input-icon-rel-wrapper">
                    <input type="text" required value={formFields.mobile} onChange={e => setFormFields({...formFields, mobile: e.target.value})} />
                    <FiPhone className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="fieldset-input-node">
                  <legend>Email*</legend>
                  <div className="input-icon-rel-wrapper">
                    <input type="email" required value={formFields.email} onChange={e => setFormFields({...formFields, email: e.target.value})} />
                    <FiMail className="embedded-form-input-ico" />
                  </div>
                </div>

                <div className="fieldset-input-node full-row-width-dropdown">
                  <legend>Status*</legend>
                  <select value={formFields.status} onChange={e => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

              </div>

              <div className="form-action-footer-buttons">
                <button type="submit" className="form-btn-node btn-save-blue">Save</button>
                <button type="button" className="form-btn-node btn-cancel-red" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONFIRMATION MODAL DELETE (image_600219.png layout) ================= */}
      {isDeleteOpen && targetItem && (
        <div className="delete-alert-backdrop-modal">
          <div className="alert-box-card-node">
            <h4>Are you sure?</h4>
            <div className="alert-details-body">
              <p>Name: {targetItem.name}</p>
              <p>Designation: {targetItem.designation}</p>
              <p>Mobile: {targetItem.mobile}</p>
            </div>
            <div className="alert-footer-action-row">
              <button className="alert-btn btn-confirm-danger" onClick={() => { setData(data.filter(i => i.id !== targetItem.id)); setIsDeleteOpen(false); }}>Delete</button>
              <button className="alert-btn btn-cancel-blue" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientContacts;