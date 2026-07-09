import React, { useState, useRef, useEffect } from "react";
import "./LeaveTypes.css";
import API from "../../api/axios"; 

import {
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaSyncAlt,
  FaDownload,
  FaTrash,
  FaEdit,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaRegSmile,
} from "react-icons/fa";

const defaultColumns = {
  checkbox: true,
  leaveName: true,
  leaveType: true,
  leaveUnit: true,
  status: true,
  duration: true,
  createdBy: true,
  notification: true,
  maxLeaves: true,
  maxLimit: true,
  action: true,
};

const initialFormState = {
  leaveName: "",
  leaveType: "",
  leaveUnit: "",
  status: "Active",
  note: "",
  duration: 0,
  createdBy: "HR Department",
  carryOver: "Not allowed",
  notification: "24 hours prior",
  maxLeaves: 0,
  maxLimit: 0,
};

const LeaveTypes = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingData, setEditingData] = useState(null);
  
  // Controlled Modal Form State
  const [formData, setFormData] = useState(initialFormState);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Column Filter
  const [columns, setColumns] = useState(defaultColumns);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const menuRef = useRef(null);

  // 1. Fetching data from the server
  const fetchLeaveTypes = async (searchQuery = "") => {
    setLoading(true);
    setError(null);
    try {
     const response = await API.get("/leave-types", { 
        params: searchQuery ? { search: searchQuery } : {},
      });
      
      const resData = response.data;
      if (resData.success) {
        setTableData(resData.data || []);
      } else {
        setError(resData.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Network connectivity failure.");
    } finally {
      setLoading(false);
    }
  };

  // Sync search input triggers
  useEffect(() => {
    fetchLeaveTypes(search);
  }, [search]);

  // Dropdown tracking configuration rules
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowColumnMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  // Update dynamic modal form defaults on popup states
  useEffect(() => {
    if (editingData) {
      setFormData({
        leaveName: editingData.leaveName || "",
        leaveType: editingData.leaveType || "",
        leaveUnit: editingData.leaveUnit || "",
        status: editingData.status || "Active",
        note: editingData.note || "",
        duration: editingData.duration || 0,
        createdBy: editingData.createdBy || "HR Department",
        carryOver: editingData.carryOver || "Not allowed",
        notification: editingData.notification || "24 hours prior",
        maxLeaves: editingData.maxLeaves || 0,
        maxLimit: editingData.maxLimit || 0,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingData, showPopup]);

  // Pagination bounds calculation parameters
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const currentRows = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Form Value Change Handler Logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Checkbox Select management handlers
  const handleCheckbox = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentIds = currentRows.map((row) => row.id || row._id);
    const allSelected = currentIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  // 2. Submit Actions (Create / Update handling via Axios)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const targetId = editingData?.id || editingData?._id;

        if (editingData) {
          response = await API.put(`/leave-types/${targetId}`, formData);
        } else {
          response = await API.post("/leave-types", formData);
        } 

      const data = response.data;
      if (data.success) {
        setShowPopup(false);
        setFormData(initialFormState);
        setEditingData(null);
        fetchLeaveTypes(search); 
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert(`Submission failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // 3. Single Item Deletion Processing Request Handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Leave Type?")) {
      try {
       const response = await API.delete(`/leave-types/${id}`);
        const data = response.data;
        if (data.success) {
          setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
          fetchLeaveTypes(search);
        } else {
          alert(`Delete Failed: ${data.message}`);
        }
      } catch (err) {
        alert(`Connection Error: ${err.message}`);
      }
    }
  };

  // 4. Bulk Items Selection Elimination Handler Request Logic
  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} items?`)) {
      try {
          const response = await API.post("/leave-types/bulk-delete", { ids: selectedRows });        const data = response.data;
        if (data.success) {
          setSelectedRows([]);
          fetchLeaveTypes(search);
        } else {
          alert(`Bulk Elimination Error: ${data.message}`);
        }
      } catch (err) {
        alert(`Network Processing Issue: ${err.message}`);
      }
    }
  };

  const handleRefresh = () => {
    setSearch("");
    setSelectedRows([]);
    setColumns(defaultColumns);
    setPage(1);
    fetchLeaveTypes("");
  };

  const handleDownload = () => {
    const headers = [
      "Leave Name", "Leave Type", "Leave Unit", "Status", 
      "Duration", "Created By", "Notification", "Max Leaves", "Annual Limit"
    ];

    const csv = [
      headers.join(","),
      ...tableData.map((item) =>
        [
          JSON.stringify(item.leaveName || ""),
          JSON.stringify(item.leaveType || ""),
          JSON.stringify(item.leaveUnit || ""),
          JSON.stringify(item.status || ""),
          item.duration || 0,
          JSON.stringify(item.createdBy || ""),
          JSON.stringify(item.notification || ""),
          item.maxLeaves || 0,
          item.maxLimit || 0
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "LeaveTypes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleColumn = (key) => {
    setColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="leaveTypes">
      {/* Header Element */}
      <div className="leaveTypes__header">
        <h2 className="leaveTypes__title">Leave Types</h2>
        <div className="leaveTypes__toolbar">
          <div className="leaveTypes__search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search Leave Type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {selectedRows.length > 0 && (
            <button className="leaveTypes__icon delete" onClick={handleDeleteSelected} title="Delete Selected">
              <FaTrash />
            </button>
          )}

          {/* Column Filter Component */}
          <div className="leaveTypes__menu" ref={menuRef}>
            <button className="leaveTypes__icon" onClick={() => setShowColumnMenu(!showColumnMenu)} title="Show / Hide Columns">
              <FaFilter />
            </button>
            {showColumnMenu && (
              <div className="leaveTypes__dropdown">
                <h4>Show / Hide Columns</h4>
                {Object.keys(columns).map((key) => (
                  <label key={key}>
                    <input type="checkbox" checked={columns[key]} onChange={() => toggleColumn(key)} />
                    {key}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button className="leaveTypes__icon add" title="Add Leave Type" onClick={() => { setEditingData(null); setShowPopup(true); }}>
            <FaPlusCircle />
          </button>

          <button className="leaveTypes__icon refresh" title="Refresh" onClick={handleRefresh}>
            <FaSyncAlt />
          </button>

          <button className="leaveTypes__icon download" title="Download CSV" onClick={handleDownload}>
            <FaDownload />
          </button>
        </div>
      </div>

      {error && <div className="leaveTypes__errorMsg">Error Encountered: {error}</div>}

      {/* ================= DATA TABLE VIEW ================= */}
      <div className="leaveTypes__tableWrapper">
        {loading ? (
          <div className="leaveTypes__loading">Retrieving system data array matrices...</div>
        ) : (
          <table className="leaveTypes__table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th>
                    <input
                      type="checkbox"
                      checked={currentRows.length > 0 && currentRows.every(row => selectedRows.includes(row.id || row._id))}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.leaveName && <th>Leave Name</th>}
                {columns.leaveType && <th>Leave Type</th>}
                {columns.leaveUnit && <th>Leave Unit</th>}
                {columns.status && <th>Status</th>}
                {columns.duration && <th>Duration</th>}
                {columns.createdBy && <th>Created By</th>}
                {columns.notification && <th>Notification</th>}
                {columns.maxLeaves && <th>Max Leaves</th>}
                {columns.maxLimit && <th>Annual Limit</th>}
                {columns.action && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan="11" className="leaveTypes__empty">No Leave Types Found</td>
                </tr>
              ) : (
                currentRows.map((item) => {
                  const itemId = item.id || item._id;
                  return (
                    <tr key={itemId}>
                      {columns.checkbox && (
                        <td>
                          <input type="checkbox" checked={selectedRows.includes(itemId)} onChange={() => handleCheckbox(itemId)} />
                        </td>
                      )}
                      {columns.leaveName && <td>{item.leaveName}</td>}
                      {columns.leaveType && <td>{item.leaveType}</td>}
                      {columns.leaveUnit && <td>{item.leaveUnit}</td>}
                      {columns.status && (
                        <td>
                          <span className={item.status === "Active" ? "leaveTypes__status active" : "leaveTypes__status inactive"}>
                            {item.status}
                          </span>
                        </td>
                      )}
                      {columns.duration && <td>{item.duration}</td>}
                      {columns.createdBy && <td>{item.createdBy}</td>}
                      {columns.notification && <td>{item.notification}</td>}
                      {columns.maxLeaves && <td>{item.maxLeaves}</td>}
                      {columns.maxLimit && <td>{item.maxLimit}</td>}
                      {columns.action && (
                        <td>
                          <div className="leaveTypes__actions">
                            <button className="leaveTypes__actionBtn edit" title="Edit" onClick={() => { setEditingData(item); setShowPopup(true); }}>
                              <FaEdit />
                            </button>
                            <button className="leaveTypes__actionBtn delete" title="Delete" onClick={() => handleDelete(itemId)}>
                              <FaTrash />
                            </button>
                            <button className="leaveTypes__actionBtn menu" title="More">
                              <FaEllipsisV />
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
        )}
      </div>

      {/* ================= PAGINATION LAYOUT ================= */}
      <div className="leaveTypes__pagination">
        <div className="leaveTypes__paginationLeft">
          <span>
            Showing <strong>{tableData.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}</strong> - <strong>{Math.min(page * rowsPerPage, tableData.length)}</strong> of <strong>{tableData.length}</strong> entries
          </span>
        </div>
        <div className="leaveTypes__paginationRight">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FaChevronLeft />
          </button>
          <span className="leaveTypes__pageNo">{page}</span>
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* ================= FORM MODAL ================= */}
      {showPopup && (
        <div className="leaveTypes__modal">
          <div className="leaveTypes__modalContent">
            <div className="leaveTypes__modalHeader">
              <h2>{editingData ? "Edit Leave Type" : "New Leave Type"}</h2>
              <button className="leaveTypes__close" onClick={() => setShowPopup(false)}>
                <FaTimes />
              </button>
            </div>
            <form className="leaveTypes__form" onSubmit={handleSubmit}>
              <div className="leaveTypes__formGrid">
                
                <div className="leaveTypes__field">
                  <label>Leave Name *</label>
                  <div className="leaveTypes__inputIcon">
                    <input
                      type="text"
                      name="leaveName"
                      required
                      placeholder="Enter Leave Name"
                      value={formData.leaveName}
                      onChange={handleInputChange}
                    />
                    <FaRegSmile className="fieldIcon" />
                  </div>
                </div>

                <div className="leaveTypes__field">
                  <label>Leave Type *</label>
                  <select name="leaveType" required value={formData.leaveType} onChange={handleInputChange}>
                    <option value="">Select Leave Type</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>

                <div className="leaveTypes__field">
                  <label>Leave Unit *</label>
                  <select name="leaveUnit" required value={formData.leaveUnit} onChange={handleInputChange}>
                    <option value="">Select Unit</option>
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                  </select>
                </div>

                <div className="leaveTypes__field">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="leaveTypes__field full">
                  <label>Note</label>
                  <textarea
                    rows="4"
                    name="note"
                    placeholder="Write note..."
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="leaveTypes__field">
                  <label>Duration *</label>
                  <input
                    type="number"
                    name="duration"
                    required
                    placeholder="0"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="leaveTypes__field">
                  <label>Created By *</label>
                  <input
                    type="text"
                    name="createdBy"
                    required
                    value={formData.createdBy}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="leaveTypes__field">
                  <label>Carry Over</label>
                  <select name="carryOver" value={formData.carryOver} onChange={handleInputChange}>
                    <option value="Not allowed">Not allowed</option>
                    <option value="Allowed">Allowed</option>
                  </select>
                </div>

                <div className="leaveTypes__field">
                  <label>Notification Period</label>
                  <select name="notification" value={formData.notification} onChange={handleInputChange}>
                    <option value="Immediate">Immediate</option>
                    <option value="12 hours prior">12 hours prior</option>
                    <option value="24 hours prior">24 hours prior</option>
                    <option value="48 hours prior">48 hours prior</option>
                  </select>
                </div>

                <div className="leaveTypes__field">
                  <label>Max Leaves *</label>
                  <input
                    type="number"
                    name="maxLeaves"
                    required
                    placeholder="0"
                    value={formData.maxLeaves}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="leaveTypes__field">
                  <label>Annual Limit *</label>
                  <input
                    type="number"
                    name="maxLimit"
                    required
                    placeholder="0"
                    value={formData.maxLimit}
                    onChange={handleInputChange}
                  />
                </div>

              </div>

              <div className="leaveTypes__buttons">
                <button type="submit" className="leaveTypes__save">Save</button>
                <button type="button" className="leaveTypes__cancel" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypes;