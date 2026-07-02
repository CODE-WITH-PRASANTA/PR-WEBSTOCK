import React, { useState, useEffect, useRef } from "react";
import { 
  FiHome, FiSearch, FiTrash2, FiFilter, FiPlusCircle, 
  FiRefreshCw, FiDownload, FiCalendar, FiUser, FiX, FiEdit2, FiClipboard, FiTrendingUp 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./ClientProjects.css";

const initialProjectsData = [
  { id: "1", projectName: "E-commerce Platform", manager: "Sarah Smith", startDate: "01/10/2023", deadline: "06/15/2023", status: "In Progress", progress: 65, description: "A comprehensive shopping ecosystem." },
  { id: "2", projectName: "Mobile App", manager: "John Doe", startDate: "02/20/2023", deadline: "08/30/2023", status: "In Progress", progress: 40, description: "Native iOS and Android utilities." },
  { id: "3", projectName: "CRM Redesign", manager: "Robert Johnson", startDate: "04/01/2023", deadline: "05/20/2023", status: "Completed", progress: 100, description: "Internal client management upgrade." },
  { id: "4", projectName: "Inventory System", manager: "David Miller", startDate: "03/15/2023", deadline: "07/15/2023", status: "In Progress", progress: 25, description: "Warehouse stock management panel." },
  { id: "5", projectName: "HR Portal", manager: "Jessica Wilson", startDate: "05/01/2023", deadline: "09/01/2023", status: "On Hold", progress: 10, description: "Employee onboarding tracking system." },
  { id: "6", projectName: "Analytics Dashboard", manager: "James Taylor", startDate: "06/10/2023", deadline: "11/30/2023", status: "In Progress", progress: 55, description: "Realtime data chart integrations." },
  { id: "7", projectName: "SEO Optimization", manager: "Emily Davis", startDate: "07/20/2023", deadline: "08/20/2023", status: "Completed", progress: 100, description: "Landing marketing structural cleanup." },
  { id: "8", projectName: "Cloud Migration", manager: "Michael Brown", startDate: "08/15/2023", deadline: "01/15/2024", status: "In Progress", progress: 30, description: "AWS servers cluster refactoring." },
  { id: "9", projectName: "Security Audit", manager: "James Taylor", startDate: "09/01/2023", deadline: "10/01/2023", status: "In Progress", progress: 70, description: "Vulnerability analysis protocols." },
  { id: "10", projectName: "Customer Support Bot", manager: "Sarah Smith", startDate: "10/15/2023", deadline: "02/28/2024", status: "In Progress", progress: 15, description: "AI generative customer agent workspace." }
];

const ClientProjects = () => {
  const [data, setData] = useState(initialProjectsData);
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

  // Form Fields Binding Object
  const [formFields, setFormFields] = useState({
    id: "", projectName: "", manager: "", startDate: "", deadline: "", status: "In Progress", progress: 0, description: ""
  });

  // Show/Hide Column State (Ref image_60f5bb.png)
  const [columns, setColumns] = useState({
    checkbox: true, id: false, projectName: true, manager: true, startDate: true, deadline: true, status: true, progress: true, actions: true
  });

  const columnDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target)) {
        setColumnMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOpenAdd = () => {
    setFormFields({
      id: String(Date.now()), projectName: "", manager: "", startDate: "2026-07-02", deadline: "", status: "In Progress", progress: 0, description: ""
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
    setData(initialProjectsData);
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handleDownloadCSV = () => {
    const headers = ["Project Name", "Manager", "Start Date", "Deadline", "Status", "Progress"];
    const rows = data.map(i => [i.projectName, i.manager, i.startDate, i.deadline, i.status, `${i.progress}%`]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "client_projects.csv");
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
    item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;

  return (
    <div className="cp-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="cp-breadcrumb-header-strip">
        <div className="cp-crumb-left">
          <h2>Client Projects</h2>
        </div>
        <div className="cp-crumb-right">
          <FiHome className="cp-home-icon-node" />
          <span className="cp-separator-node">&gt;</span>
          <span className="cp-dim-node">Clients</span>
          <span className="cp-separator-node">&gt;</span>
          <span className="cp-active-node">Projects</span>
        </div>
      </div>

      {/* ================= DATA CARD COMPONENT ================= */}
      <div className="cp-main-table-panel">
        
        {/* ACTION TOOLBAR STRIP */}
        <div className="cp-panel-toolbar-row">
          <div className="cp-toolbar-left">
            <span className="cp-panel-tab-title">Client Projects</span>
            <div className="cp-search-input-field">
              <FiSearch className="cp-search-inside-ico" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="cp-toolbar-right" ref={columnDropdownRef}>
            <button className="cp-tool-act-btn color-red" onClick={() => { setData(data.filter(i => !selectedRows.includes(i.id))); setSelectedRows([]); }} disabled={selectedRows.length === 0} title="Delete Selected Items">
              <FiTrash2 />
            </button>
            <button className="cp-tool-act-btn color-blue" onClick={() => setColumnMenuOpen(!columnMenuOpen)} title="Columns Filter Dropdown">
              <FiFilter />
            </button>
            <button className="cp-tool-act-btn color-green" onClick={handleOpenAdd} title="Create New Project Route">
              <FiPlusCircle />
            </button>
            <button className="cp-tool-act-btn color-gray" onClick={handleRefresh} title="Reset Table Grid">
              <FiRefreshCw />
            </button>
            <button className="cp-tool-act-btn color-blue" onClick={handleDownloadCSV} title="Export CSV Document File">
              <FiDownload />
            </button>

            {/* DYNAMIC SHOW HIDE COLUMN BOX OVERVIEW (image_60f5bb.png layout) */}
            {columnMenuOpen && (
              <div className="cp-columns-dropdown-popup">
                <div className="cp-popup-header-label">Show/Hide Column</div>
                <div className="cp-popup-scroll-area">
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="cp-popup-row-item">
                      <input 
                        type="checkbox" 
                        checked={columns[key]} 
                        onChange={() => setColumns(prev => ({ ...prev, [key]: !prev[key] }))}
                      />
                      <span className="cp-checkbox-visual-node"></span>
                      <span className="cp-checkbox-txt-label">
                        {key === "id" ? "ID" : key === "projectName" ? "Project Name" : key === "startDate" ? "Start Date" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COMPONENT SCROLLABLE TABLE FRAME */}
        <div className="cp-table-viewport-slider">
          <table className="cp-custom-data-table-node">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th className="cp-cell-checkbox-dimension">
                    <input 
                      type="checkbox" 
                      checked={currentItems.length > 0 && selectedRows.length === currentItems.length} 
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.projectName && <th>Project Name</th>}
                {columns.manager && <th>Manager</th>}
                {columns.startDate && <th>Start Date</th>}
                {columns.deadline && <th>Deadline</th>}
                {columns.status && <th>Status</th>}
                {columns.progress && <th>Progress</th>}
                {columns.actions && <th className="text-center-aligned">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? "cp-row-highlighted-active" : ""}>
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
                  {columns.projectName && <td className="cp-project-title-bold">{item.projectName}</td>}
                  {columns.manager && <td>{item.manager}</td>}
                  {columns.startDate && (
                    <td>
                      <div className="cp-date-cell-flex-node"><FiCalendar className="cp-calendar-orange-ico"/> {item.startDate}</div>
                    </td>
                  )}
                  {columns.deadline && (
                    <td>
                      <div className="cp-date-cell-flex-node"><FiCalendar className="cp-calendar-orange-ico"/> {item.deadline}</div>
                    </td>
                  )}
                  {columns.status && (
                    <td>
                      <span className={`cp-status-pill-badge tag-${item.status.toLowerCase().replace(/\s+/g, '')}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.progress && (
                    <td>
                      <div className="cp-progress-flex-align">
                        <div className="cp-track-bar-outer-frame">
                          <div className="cp-track-bar-inner-fill" style={{ width: `${item.progress}%` }}></div>
                        </div>
                        <span className="cp-progress-digit-metric">{item.progress}%</span>
                      </div>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="cp-actions-flex-holder">
                        <button className="cp-action-row-btn btn-edit-tint" onClick={() => handleOpenEdit(item)}>
                          <FiEdit2 />
                        </button>
                        <button className="cp-action-row-btn btn-delete-tint" onClick={() => { setTargetItem(item); setIsDeleteOpen(true); }}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="9" className="cp-empty-fallback-message">No projects found matching the query filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM NAVIGATION PAGINATION ROW FRAME */}
        <div className="cp-pagination-footer-row-layout">
          <div className="cp-pagination-right-cluster">
            <span className="cp-footer-dim-label">Items per page:</span>
            <div className="cp-select-native-box-wrapper">
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span className="cp-footer-range-label">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="cp-footer-navigation-arrows">
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

      {/* ================= SMOOTH ADD/EDIT MODAL SHEET VIEW (image_60fa14.png layout) ================= */}
      {isFormOpen && (
        <div className="cp-fullscreen-form-overlay">
          <div className="cp-large-card-form-modal">
            <div className="cp-form-modal-header-banner">
              <h3>{formMode === "add" ? "New Project" : `Edit Project: ${formFields.projectName}`}</h3>
              <button className="cp-form-close-x-btn" onClick={() => setIsFormOpen(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSaveForm} className="cp-modal-form-body-wrapper">
              <div className="cp-form-inputs-two-col-grid">
                
                <div className="cp-fieldset-input-node">
                  <legend>Project Name*</legend>
                  <div className="cp-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.projectName} onChange={e => setFormFields({...formFields, projectName: e.target.value})} />
                    <FiClipboard className="cp-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="cp-fieldset-input-node">
                  <legend>Manager*</legend>
                  <div className="cp-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.manager} onChange={e => setFormFields({...formFields, manager: e.target.value})} />
                    <FiUser className="cp-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="cp-fieldset-input-node">
                  <legend>Start Date*</legend>
                  <div className="cp-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.startDate} onChange={e => setFormFields({...formFields, startDate: e.target.value})} />
                    <FiCalendar className="cp-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="cp-fieldset-input-node">
                  <legend>Deadline*</legend>
                  <div className="cp-input-icon-rel-wrapper">
                    <input type="text" required value={formFields.deadline} onChange={e => setFormFields({...formFields, deadline: e.target.value})} />
                    <FiCalendar className="cp-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="cp-fieldset-input-node active-blue-border-outline">
                  <legend className="active-blue-legend">Status*</legend>
                  <select value={formFields.status} onChange={e => setFormFields({...formFields, status: e.target.value})}>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div className="cp-fieldset-input-node">
                  <legend>Progress (%)</legend>
                  <div className="cp-input-icon-rel-wrapper">
                    <input type="number" min="0" max="100" value={formFields.progress} onChange={e => setFormFields({...formFields, progress: Number(e.target.value)})} />
                    <FiTrendingUp className="cp-embedded-form-input-ico" />
                  </div>
                </div>

                <div className="cp-fieldset-input-node cp-full-row-width-textarea">
                  <legend>Description</legend>
                  <textarea rows="3" placeholder="Description" value={formFields.description} onChange={e => setFormFields({...formFields, description: e.target.value})}></textarea>
                </div>

              </div>

              <div className="cp-form-action-footer-buttons">
                <button type="submit" className="cp-form-btn-node btn-save-blue">Save</button>
                <button type="button" className="cp-form-btn-node btn-cancel-red" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CONFIRMATION MODAL DELETE ENGINE (image_60fd1f.png layout) ================= */}
      {isDeleteOpen && targetItem && (
        <div className="cp-delete-alert-backdrop-modal">
          <div className="cp-alert-box-card-node">
            <h4>Are you sure?</h4>
            <div className="cp-alert-details-body">
              <p>Project Name: {targetItem.projectName}</p>
              <p>Manager: {targetItem.manager}</p>
              <p>Start Date: {targetItem.startDate}</p>
            </div>
            <div className="cp-alert-footer-action-row">
              <button className="cp-alert-btn btn-confirm-danger" onClick={() => { setData(data.filter(i => i.id !== targetItem.id)); setIsDeleteOpen(false); }}>Delete</button>
              <button className="cp-alert-btn btn-cancel-blue" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientProjects;