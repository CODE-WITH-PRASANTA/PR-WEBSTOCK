import React, { useState, useMemo } from "react";
import "./EmployeePerformance.css";
import {
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaSyncAlt,
  FaDownload,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
/* ===========================================
      DUMMY EMPLOYEE ASSET DATA
=========================================== */
const initialAssets = [
{ id: 1, employeeName: "John Doe", assetName: "MacBook Pro", category: "Laptop", serialNumber: "SN12345", status: "Assigned", assignedDate: "2023-01-10", checked: true, },
 { id: 2, employeeName: "Sarah Smith", assetName: "iPhone 13", category: "Mobile", serialNumber: "SN67890", status: "Assigned", assignedDate: "2023-02-15", checked: false, },
  { id: 3, employeeName: "Robert Johnson", assetName: "Dell Monitor", category: "Peripheral", serialNumber: "SN11223", status: "Returned", assignedDate: "2023-01-20", checked: true, }, 
  { id: 4, employeeName: "Michael Brown", assetName: "Samsung Tablet", category: "Tablet", serialNumber: "SN44556", status: "Assigned", assignedDate: "2023-03-05", checked: false, },
  { id: 5, employeeName: "Emily Davis", assetName: "Lenovo ThinkPad", category: "Laptop", serialNumber: "SN77889", status: "Repair", assignedDate: "2023-04-12", checked: true, }, 
  { id: 6, employeeName: "William Wilson", assetName: "Logitech Mouse", category: "Peripheral", serialNumber: "SN99001", status: "Assigned", assignedDate: "2023-05-18", checked: false, }, { id: 7, employeeName: "Jessica Taylor", assetName: "External HDD", category: "Storage", serialNumber: "SN22334", status: "Returned", assignedDate: "2023-06-22", checked: false, }, { id: 8, employeeName: "David Anderson", assetName: "iPad Air", category: "Tablet", serialNumber: "SN55667", status: "Damaged", assignedDate: "2023-07-30", checked: false, }, 
  { id: 9, employeeName: "Linda Thomas", assetName: "HP EliteBook", category: "Laptop", serialNumber: "SN88990", status: "Assigned", assignedDate: "2023-08-14", checked: false, }, 
  { id: 10, employeeName: "James Jackson", assetName: "Android Phone", category: "Mobile", serialNumber: "SN11122", status: "Assigned", assignedDate: "2023-09-01", checked: false, }, 
  { id: 11, employeeName: "Sophia Lee", assetName: "Canon Printer", category: "Printer", serialNumber: "SN44455", status: "Repair", assignedDate: "2023-09-15", checked: false, }, 
  { id: 12, employeeName: "Daniel Martin", assetName: "Apple Watch", category: "Wearable", serialNumber: "SN77788", status: "Assigned", assignedDate: "2023-10-02", checked: false, },
];
/* ===========================================
      CATEGORY OPTIONS
=========================================== */
const categoryOptions = [
  "Laptop",
  "Mobile",
  "Tablet",
  "Peripheral",
  "Storage",
  "Printer",
  "Wearable",
];
/* ===========================================
      STATUS OPTIONS
=========================================== */
const statusOptions = [
  "Assigned",
  "Returned",
  "Repair",
  "Damaged",
];
/* ===========================================
      TABLE COLUMNS
=========================================== */
const defaultColumns = {
  checkbox: true,
  employeeName: true,
  assetName: true,
  category: true,
  serialNumber: true,
  status: true,
  assignedDate: true,
  actions: true,
};
/* ===========================================
      EMPTY FORM
=========================================== */
const emptyForm = {
  employeeName: "",
  assetName: "",
  category: "",
  serialNumber: "",
  status: "",
  assignedDate: "",
};
/* ===========================================
      COMPONENT
=========================================== */
const EmployeePerformance = () => {
  /* ----------------------------
        MAIN DATA
  ----------------------------- */
  const [assets, setAssets] = useState(initialAssets);
  /* ----------------------------
        SEARCH
  ----------------------------- */
  const [search, setSearch] = useState("");
  /* ----------------------------
        PAGINATION
  ----------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  /* ----------------------------
        POPUPS
  ----------------------------- */
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  /* ----------------------------
        FORM
  ----------------------------- */
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  /* ----------------------------
        COLUMN DROPDOWN
  ----------------------------- */
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] =
    useState(defaultColumns);
  /* ----------------------------
        SELECT ALL
  ----------------------------- */
  const [selectAll, setSelectAll] = useState(false);
  /* ----------------------------
        FILTERED DATA
  ----------------------------- */
  const filteredAssets = useMemo(() => {
    return assets.filter((item) => {
      const keyword = search.toLowerCase();
      return (
        item.employeeName.toLowerCase().includes(keyword) ||
        item.assetName.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.serialNumber.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword)
      );
    });
  }, [assets, search]);
  /* ==========================================
      PAGINATION CALCULATIONS
  ========================================== */
  const totalPages = Math.ceil(
    filteredAssets.length / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  /* ==========================================
      SEARCH
  ========================================== */
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  /* ==========================================
      FORM INPUT CHANGE
  ========================================== */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  /* ==========================================
      SELECT SINGLE ROW
  ========================================== */
  const handleRowCheckbox = (id) => {
    setAssets((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              checked: !item.checked,
            }
          : item
      )
    );
  };
  /* ==========================================
      SELECT ALL
  ========================================== */
  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setAssets((prev) =>
      prev.map((item) => ({
        ...item,
        checked: newValue,
      }))
    );
  };
  /* ==========================================
      EDIT
  ========================================== */
  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData({
      employeeName: row.employeeName,
      assetName: row.assetName,
      category: row.category,
      serialNumber: row.serialNumber,
      status: row.status,
      assignedDate: row.assignedDate,
    });
    setShowEditPopup(true);
  };
  /* ==========================================
      DELETE
  ========================================== */
  const handleDelete = (id) => {
    if (window.confirm("Delete this asset?")) {
      setAssets((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };
  /* ==========================================
      OPEN ADD POPUP
  ========================================== */
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowAddPopup(true);
  };
  /* ==========================================
      SAVE NEW ASSET
  ========================================== */
  const handleSaveAdd = () => {
    if (
      !formData.employeeName ||
      !formData.assetName ||
      !formData.category
    ) {
      alert("Please fill all required fields.");
      return;
    }
    const newAsset = {
      id: Date.now(),
      ...formData,
      checked: false,
    };
    setAssets((prev) => [...prev, newAsset]);
    setShowAddPopup(false);
    setFormData(emptyForm);
  };
  /* ==========================================
      UPDATE ASSET
  ========================================== */
  const handleSaveEdit = () => {
    setAssets((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...formData,
            }
          : item
      )
    );
    setShowEditPopup(false);
    setEditingId(null);
    setFormData(emptyForm);
  };
  /* ==========================================
      CANCEL
  ========================================== */
  const handleCancel = () => {
    setShowAddPopup(false);
    setShowEditPopup(false);
    setEditingId(null);
    setFormData(emptyForm);
  };
  /* ==========================================
      REFRESH
  ========================================== */
  const handleRefresh = () => {
    setAssets(initialAssets);
    setSearch("");
    setCurrentPage(1);
    setItemsPerPage(10);
    setVisibleColumns(defaultColumns);
    setSelectAll(false);
    setShowColumnMenu(false);
  };
  /* ==========================================
      DOWNLOAD JSON
  ========================================== */
  const handleDownload = () => {
    const json = JSON.stringify(assets, null, 2);
    const blob = new Blob([json], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employee-assets.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  /* ==========================================
      SHOW / HIDE COLUMNS
  ========================================== */
  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };
  /* ==========================================
      PAGINATION
  ========================================== */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  /* ==========================================
      STATUS COLOR
  ========================================== */
  const getStatusClass = (status) => {
    switch (status) {
      case "Assigned":
        return "assigned";
      case "Returned":
        return "returned";
      case "Repair":
        return "repair";
      case "Damaged":
        return "damaged";
      default:
        return "";
    }
  };
return (
  <div className="ep-container">
    {/* ===============================
          PAGE HEADER
    =============================== */}
    <div className="ep-header">
      <div className="ep-header-left">
        <h2>Employee Asset Management</h2>
        <p>
          Manage employee assigned assets, update details and
          track asset status.
        </p>
      </div>
      <div className="ep-header-right">
        <div className="ep-user-profile">
          <FaUserCircle className="ep-user-icon" />
          <div>
            <h4>Administrator</h4>
            <span>HR Department</span>
          </div>
        </div>
      </div>
    </div>
    {/* ===============================
            TOOLBAR
    =============================== */}
    <div className="ep-toolbar">
      {/* Search */}
      <div className="ep-search-box">
        <FaSearch className="ep-search-icon" />
        <input
          type="text"
          placeholder="Search employee, asset, category..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {/* Right Side Buttons
         (Next section will add buttons here)
      */}
      <div className="ep-toolbar-actions">
      {/* Show / Hide Columns */}
      <div className="ep-column-wrapper">
        <button
          className="ep-btn ep-filter-btn"
          onClick={() => setShowColumnMenu(!showColumnMenu)}
        >
          <FaFilter />
          <span>Show / Hide Columns</span>
        </button>
        {showColumnMenu && (
          <div className="ep-column-dropdown">
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.employeeName}
                onChange={() => toggleColumn("employeeName")}
              />
              Employee Name
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.assetName}
                onChange={() => toggleColumn("assetName")}
              />
              Asset Name
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.category}
                onChange={() => toggleColumn("category")}
              />
              Asset Category
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.serialNumber}
                onChange={() => toggleColumn("serialNumber")}
              />
              Serial Number
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.status}
                onChange={() => toggleColumn("status")}
              />
              Status
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleColumns.assignedDate}
                onChange={() => toggleColumn("assignedDate")}
              />
              Assigned Date
            </label>
          </div>
        )}
      </div>
      {/* Add Asset */}
      <button
        className="ep-btn ep-add-btn"
        onClick={handleOpenAdd}
      >
        <FaPlusCircle />
        <span>Add Asset</span>
      </button>
      {/* Refresh */}
      <button
        className="ep-btn ep-refresh-btn"
        onClick={handleRefresh}
        title="Refresh"
      >
        <FaSyncAlt />
      </button>
      {/* Download */}
      <button
        className="ep-btn ep-download-btn"
        onClick={handleDownload}
        title="Download"
      >
        <FaDownload />
      </button>
    </div>
  </div>
  {/* ===============================
          TABLE WRAPPER
  =============================== */}
  <div className="ep-table-wrapper">
    <table className="ep-table">
      {/* ===============================
              TABLE HEADER
      =============================== */}
      <thead>
        <tr>
          {visibleColumns.checkbox && (
            <th className="ep-checkbox-col">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
          )}
          {visibleColumns.employeeName && (
            <th>Employee Name</th>
          )}
          {visibleColumns.assetName && (
            <th>Asset Name</th>
          )}
          {visibleColumns.category && (
            <th>Asset Category</th>
          )}
          {visibleColumns.serialNumber && (
            <th>Serial Number</th>
          )}
          {visibleColumns.status && (
            <th>Status</th>
          )}
          {visibleColumns.assignedDate && (
            <th>Assigned Date</th>
          )}
          {visibleColumns.actions && (
            <th className="ep-action-col">
              Action
            </th>
          )}
        </tr>
      </thead>
      {/* ===============================
              TABLE BODY
          Next Part Starts Here
      =============================== */}
      <tbody>
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <tr key={item.id}>
            {/* Checkbox */}
            {visibleColumns.checkbox && (
              <td className="ep-checkbox-col">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleRowCheckbox(item.id)}
                />
              </td>
            )}
            {/* Employee Name */}
            {visibleColumns.employeeName && (
              <td>
                <div className="ep-employee-cell">
                  <div className="ep-avatar">
                    {item.employeeName.charAt(0)}
                  </div>
                  <div className="ep-employee-info">
                    <span className="ep-employee-name">
                      {item.employeeName}
                    </span>
                    <small>ID : EMP-{item.id}</small>
                  </div>
                </div>
              </td>
            )}
            {/* Asset Name */}
            {visibleColumns.assetName && (
              <td>
                <div className="ep-asset-cell">
                  <span className="ep-asset-title">
                    {item.assetName}
                  </span>
                </div>
              </td>
            )}
            {/* Asset Category */}
            {visibleColumns.category && (
              <td>
                <span className="ep-category-chip">
                  {item.category}
                </span>
              </td>
            )}
            {/* Serial Number */}
            {visibleColumns.serialNumber && (
              <td>
                <span className="ep-serial-number">
                  {item.serialNumber}
                </span>
              </td>
            )}
            {/* Status */}
            {visibleColumns.status && (
              <td>
                <span
                  className={`ep-status-badge ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
            )}
            {/* Assigned Date */}
            {visibleColumns.assignedDate && (
              <td>
                <span className="ep-date">
                  {item.assignedDate}
                </span>
              </td>
            )}
            {/* Actions */}
            {visibleColumns.actions && (
              <td className="ep-action-col">
                <div className="ep-action-buttons">
                  <button
                    className="ep-icon-btn ep-edit-btn"
                    onClick={() => handleEdit(item)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="ep-icon-btn ep-delete-btn"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={Object.values(visibleColumns).filter(Boolean).length}
         className="ep-empty-row"

          >
            <div className="ep-empty-state">
              <h3>No Records Found</h3>
              <p>
                No employee assets match your search.
              </p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
);
};
export default EmployeePerformance;
