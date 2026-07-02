import React, { useState, useRef, useEffect } from "react";
import "./LeaveTypes.css";

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

const dummyData = [
  {
    id: 1,
    leaveName: "Work From Home",
    leaveType: "Paid",
    leaveUnit: "Days",
    status: "Inactive",
    duration: 5,
    createdBy: "HR Department",
    notification: "48 hours prior",
    maxLeaves: 25,
    maxLimit: 5,
  },
  {
    id: 2,
    leaveName: "Casual Leave",
    leaveType: "Unpaid",
    leaveUnit: "Hours",
    status: "Active",
    duration: 8,
    createdBy: "HR Department",
    notification: "24 hours prior",
    maxLeaves: 18,
    maxLimit: 3,
  },
  {
    id: 3,
    leaveName: "Emergency Leave",
    leaveType: "Paid",
    leaveUnit: "Days",
    status: "Active",
    duration: 3,
    createdBy: "HR Department",
    notification: "Immediate",
    maxLeaves: 10,
    maxLimit: 2,
  },
  {
    id: 4,
    leaveName: "Family Leave",
    leaveType: "Paid",
    leaveUnit: "Hours",
    status: "Inactive",
    duration: 12,
    createdBy: "HR Department",
    notification: "48 hours prior",
    maxLeaves: 20,
    maxLimit: 4,
  },
  {
    id: 5,
    leaveName: "Sick Leave",
    leaveType: "Paid",
    leaveUnit: "Days",
    status: "Active",
    duration: 10,
    createdBy: "HR Department",
    notification: "48 hours prior",
    maxLeaves: 30,
    maxLimit: 6,
  },
    {
    id: 6,
    leaveName: "Work From Home",
    leaveType: "Paid",
    leaveUnit: "Days",
    status: "Inactive",
    duration: 5,
    createdBy: "HR Department",
    notification: "48 hours prior",
    maxLeaves: 25,
    maxLimit: 5,
  },
  {
    id: 7,
    leaveName: "Casual Leave",
    leaveType: "Unpaid",
    leaveUnit: "Hours",
    status: "Active",
    duration: 8,
    createdBy: "HR Department",
    notification: "24 hours prior",
    maxLeaves: 18,
    maxLimit: 3,
  },
  {
    id: 8,
    leaveName: "Emergency Leave",
    leaveType: "Paid",
    leaveUnit: "Days",
    status: "Active",
    duration: 3,
    createdBy: "HR Department",
    notification: "Immediate",
    maxLeaves: 10,
    maxLimit: 2,
  },
  {
    id: 9,
    leaveName: "Family Leave",
    leaveType: "Paid",
    leaveUnit: "Hours",
    status: "Inactive",
    duration: 12,
    createdBy: "HR Department",
    notification: "48 hours prior",
    maxLeaves: 20,
    maxLimit: 4,
  },
  {
    id: 10,
    leaveName: "Sick Leave",
    leaveType: "Paid",
    leaveUnit: "Days",
    status: "Active",
    duration: 10,
    createdBy: "HR Department",
    notification: "48 hours prior",
    maxLeaves: 30,
    maxLimit: 6,
  },
];

const LeaveTypes = () => {
  const [tableData, setTableData] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Column Filter
  const [columns, setColumns] = useState(defaultColumns);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowColumnMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  // Search Filter
  const filteredData = tableData.filter((item) =>
    item.leaveName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentRows = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Checkbox
  const handleCheckbox = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((row) => row.id));
    }
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this Leave Type?")) {
      setTableData(tableData.filter((item) => item.id !== id));
    }
  };

  const handleDeleteSelected = () => {
    setTableData(
      tableData.filter((item) => !selectedRows.includes(item.id))
    );

    setSelectedRows([]);
  };

  // Refresh
  const handleRefresh = () => {
    setSearch("");
    setSelectedRows([]);
    setColumns(defaultColumns);
    setTableData(dummyData);
    setPage(1);
  };

  // CSV Download
  const handleDownload = () => {
    const headers = [
      "Leave Name",
      "Leave Type",
      "Leave Unit",
      "Status",
      "Duration",
      "Created By",
      "Notification",
      "Max Leaves",
      "Annual Limit",
    ];

    const csv = [
      headers.join(","),
      ...tableData.map((item) =>
        [
          item.leaveName,
          item.leaveType,
          item.leaveUnit,
          item.status,
          item.duration,
          item.createdBy,
          item.notification,
          item.maxLeaves,
          item.maxLimit,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "LeaveTypes.csv";
    link.click();
  };

  // Column Toggle
  const toggleColumn = (key) => {
    setColumns({
      ...columns,
      [key]: !columns[key],
    });
  };

  return (
    <div className="leaveTypes">

      {/* Header */}

      <div className="leaveTypes__header">

        <h2 className="leaveTypes__title">
          Leave Types
        </h2>

        <div className="leaveTypes__toolbar">

          {/* Search */}

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

          {/* Delete Selected */}

          {selectedRows.length > 0 && (
            <button
              className="leaveTypes__icon delete"
              onClick={handleDeleteSelected}
              title="Delete Selected"
            >
              <FaTrash />
            </button>
          )}

          {/* Column Filter */}

          <div
            className="leaveTypes__menu"
            ref={menuRef}
          >
            <button
              className="leaveTypes__icon"
              onClick={() =>
                setShowColumnMenu(!showColumnMenu)
              }
              title="Show / Hide Columns"
            >
              <FaFilter />
            </button>

            {showColumnMenu && (
              <div className="leaveTypes__dropdown">

                <h4>Show / Hide Columns</h4>

                {Object.keys(columns).map((key) => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      checked={columns[key]}
                      onChange={() => toggleColumn(key)}
                    />

                    {key}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Add */}

          <button
            className="leaveTypes__icon add"
            title="Add Leave Type"
            onClick={() => {
              setEditingData(null);
              setShowPopup(true);
            }}
          >
            <FaPlusCircle />
          </button>

          {/* Refresh */}

          <button
            className="leaveTypes__icon refresh"
            title="Refresh"
            onClick={handleRefresh}
          >
            <FaSyncAlt />
          </button>

          {/* Download */}

          <button
            className="leaveTypes__icon download"
            title="Download CSV"
            onClick={handleDownload}
          >
            <FaDownload />
          </button>

        </div>
      </div>
            {/* ================= TABLE ================= */}

      <div className="leaveTypes__tableWrapper">
        <table className="leaveTypes__table">

          <thead>
            <tr>

              {columns.checkbox && (
                <th>
                  <input
                    type="checkbox"
                    checked={
                      currentRows.length > 0 &&
                      selectedRows.length === currentRows.length
                    }
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
                <td
                  colSpan="11"
                  className="leaveTypes__empty"
                >
                  No Leave Types Found
                </td>
              </tr>

            ) : (

              currentRows.map((item) => (

                <tr key={item.id}>

                  {columns.checkbox && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleCheckbox(item.id)}
                      />
                    </td>
                  )}

                  {columns.leaveName && (
                    <td>{item.leaveName}</td>
                  )}

                  {columns.leaveType && (
                    <td>{item.leaveType}</td>
                  )}

                  {columns.leaveUnit && (
                    <td>{item.leaveUnit}</td>
                  )}

                  {columns.status && (
                    <td>
                      <span
                        className={
                          item.status === "Active"
                            ? "leaveTypes__status active"
                            : "leaveTypes__status inactive"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  )}

                  {columns.duration && (
                    <td>{item.duration}</td>
                  )}

                  {columns.createdBy && (
                    <td>{item.createdBy}</td>
                  )}

                  {columns.notification && (
                    <td>{item.notification}</td>
                  )}

                  {columns.maxLeaves && (
                    <td>{item.maxLeaves}</td>
                  )}

                  {columns.maxLimit && (
                    <td>{item.maxLimit}</td>
                  )}

                  {columns.action && (
                    <td>

                      <div className="leaveTypes__actions">

                        <button
                          className="leaveTypes__actionBtn edit"
                          title="Edit"
                          onClick={() => {
                            setEditingData(item);
                            setShowPopup(true);
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="leaveTypes__actionBtn delete"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash />
                        </button>

                        <button
                          className="leaveTypes__actionBtn menu"
                          title="More"
                        >
                          <FaEllipsisV />
                        </button>

                      </div>

                    </td>
                  )}

                </tr>

              ))

            )}

          </tbody>

        </table>
      </div>

      {/* ================= PAGINATION ================= */}

      <div className="leaveTypes__pagination">

        <div className="leaveTypes__paginationLeft">

          <span>
            Showing{" "}
            <strong>
              {(page - 1) * rowsPerPage + 1}
            </strong>

            {" - "}

            <strong>
              {Math.min(
                page * rowsPerPage,
                filteredData.length
              )}
            </strong>

            {" of "}

            <strong>{filteredData.length}</strong>

            entries
          </span>

        </div>

        <div className="leaveTypes__paginationRight">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <FaChevronLeft />
          </button>

          <span className="leaveTypes__pageNo">
            {page}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            <FaChevronRight />
          </button>

        </div>

      </div>

      {/* ================= NEW POPUP ================= */}

      {showPopup && (

        <div className="leaveTypes__modal">

          <div className="leaveTypes__modalContent">

            <div className="leaveTypes__modalHeader">

              <h2>
                {editingData
                  ? "Edit Leave Type"
                  : "New Leave Type"}
              </h2>

              <button
                className="leaveTypes__close"
                onClick={() => setShowPopup(false)}
              >
                <FaTimes />
              </button>

            </div>
                        <form className="leaveTypes__form">

              <div className="leaveTypes__formGrid">

                {/* Leave Name */}

                <div className="leaveTypes__field">
                  <label>Leave Name *</label>

                  <div className="leaveTypes__inputIcon">

                    <input
                      type="text"
                      placeholder="Enter Leave Name"
                      defaultValue={editingData?.leaveName || ""}
                    />

                    <FaRegSmile className="fieldIcon" />

                  </div>
                </div>

                {/* Leave Type */}

                <div className="leaveTypes__field">
                  <label>Leave Type *</label>

                  <select
                    defaultValue={editingData?.leaveType || ""}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>

                {/* Leave Unit */}

                <div className="leaveTypes__field">
                  <label>Leave Unit *</label>

                  <select
                    defaultValue={editingData?.leaveUnit || ""}
                  >
                    <option value="">Select Unit</option>
                    <option>Days</option>
                    <option>Hours</option>
                  </select>
                </div>

                {/* Status */}

                <div className="leaveTypes__field">
                  <label>Status</label>

                  <select
                    defaultValue={editingData?.status || "Active"}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                {/* Note */}

                <div className="leaveTypes__field full">
                  <label>Note</label>

                  <textarea
                    rows="4"
                    placeholder="Write note..."
                  />
                </div>

                {/* Duration */}

                <div className="leaveTypes__field">
                  <label>Duration *</label>

                  <input
                    type="number"
                    placeholder="0"
                    defaultValue={editingData?.duration || 0}
                  />
                </div>

                {/* Created By */}

                <div className="leaveTypes__field">
                  <label>Created By *</label>

                  <input
                    type="text"
                    defaultValue={
                      editingData?.createdBy ||
                      "HR Department"
                    }
                  />
                </div>

                {/* Carry Over */}

                <div className="leaveTypes__field">
                  <label>Carry Over</label>

                  <select>

                    <option>Not allowed</option>
                    <option>Allowed</option>

                  </select>
                </div>

                {/* Notification */}

                <div className="leaveTypes__field">
                  <label>Notification Period</label>

                  <select
                    defaultValue={
                      editingData?.notification ||
                      "24 hours prior"
                    }
                  >
                    <option>Immediate</option>
                    <option>12 hours prior</option>
                    <option>24 hours prior</option>
                    <option>48 hours prior</option>
                  </select>
                </div>

                {/* Max Leaves */}

                <div className="leaveTypes__field">
                  <label>Max Leaves *</label>

                  <input
                    type="number"
                    placeholder="0"
                    defaultValue={
                      editingData?.maxLeaves || 0
                    }
                  />
                </div>

                {/* Annual Limit */}

                <div className="leaveTypes__field">
                  <label>Annual Limit *</label>

                  <input
                    type="number"
                    placeholder="0"
                    defaultValue={
                      editingData?.maxLimit || 0
                    }
                  />
                </div>

              </div>

              {/* Footer Buttons */}

              <div className="leaveTypes__buttons">

                <button
                  type="submit"
                  className="leaveTypes__save"
                >
                  Save
                </button>

                <button
                  type="button"
                  className="leaveTypes__cancel"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
};

export default LeaveTypes;