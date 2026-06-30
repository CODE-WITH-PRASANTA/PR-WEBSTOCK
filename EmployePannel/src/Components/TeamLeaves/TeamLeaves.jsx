import React, { useState, useMemo } from "react";
import "./TeamLeaves.css";
import {
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiX,
} from "react-icons/fi";

const initialData = [
  {
    id: 1,
    employee: "John Doe",
    leaveType: "Casual Leave",
    from: "01/20/2026",
    to: "01/21/2026",
    status: "Approved",
    reason: "Personal work",
  },
  {
    id: 2,
    employee: "Sarah Smith",
    leaveType: "Medical Leave",
    from: "01/25/2026",
    to: "01/25/2026",
    status: "Pending",
    reason: "Doctor appointment",
  },
  {
    id: 3,
    employee: "Mike Ross",
    leaveType: "Sick Leave",
    from: "01/12/2026",
    to: "01/12/2026",
    status: "Rejected",
    reason: "Fever",
  },
  {
    id: 4,
    employee: "Emma Watson",
    leaveType: "Annual Leave",
    from: "02/10/2026",
    to: "02/15/2026",
    status: "Approved",
    reason: "Family Trip",
  },
  {
    id: 5,
    employee: "David Miller",
    leaveType: "Sick Leave",
    from: "02/18/2026",
    to: "02/19/2026",
    status: "Pending",
    reason: "Health Issue",
  },
  {
    id: 6,
    employee: "Sophia Brown",
    leaveType: "Casual Leave",
    from: "03/01/2026",
    to: "03/02/2026",
    status: "Approved",
    reason: "Personal Work",
  },
  {
    id: 7,
    employee: "James Wilson",
    leaveType: "Medical Leave",
    from: "03/10/2026",
    to: "03/12/2026",
    status: "Rejected",
    reason: "Medical Reason",
  },
  {
    id: 8,
    employee: "Olivia Taylor",
    leaveType: "Annual Leave",
    from: "03/20/2026",
    to: "03/25/2026",
    status: "Approved",
    reason: "Vacation",
  },
];

const TeamLeaves = () => {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(initialData);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showColumns, setShowColumns] = useState(false);

  const [columns, setColumns] = useState({
    employee: true,
    leaveType: true,
    from: true,
    to: true,
    status: true,
    reason: true,
  });

  const filteredRows = useMemo(() => {
    return rows.filter(
      (item) =>
        item.employee.toLowerCase().includes(search.toLowerCase()) ||
        item.leaveType.toLowerCase().includes(search.toLowerCase()) ||
        item.reason.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const toggleColumn = (column) => {
    setColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleRefresh = () => {
    setRows(initialData);
    setSearch("");
    setPage(1);
  };

  const downloadCSV = () => {
    const headers = [
      "Employee",
      "Leave Type",
      "From",
      "To",
      "Status",
      "Reason",
    ];

    const csvRows = filteredRows.map((row) => [
      row.employee,
      row.leaveType,
      row.from,
      row.to,
      row.status,
      row.reason,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "TeamLeaves.csv";
    link.click();
  };

  return (
    <div className="team-leaves-page">
      <div className="team-leaves-header">
        <h2>Team Leaves</h2>

        <div className="breadcrumb">
          My Team &gt; Leaves
        </div>
      </div>

      <div className="team-leaves-card">
        <div className="team-leaves-toolbar">
          <div className="toolbar-left">
            <h3>Team Leave Requests</h3>

            <div className="search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="toolbar-right">
            <button
              className="icon-btn"
              onClick={() => setShowColumns(true)}
              title="Show / Hide Columns"
            >
              <FiFilter />
            </button>

            <button
              className="icon-btn"
              onClick={handleRefresh}
              title="Refresh"
            >
              <FiRefreshCw />
            </button>

            <button
              className="icon-btn"
              onClick={downloadCSV}
              title="Download"
            >
              <FiDownload />
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="team-leaves-table">
            <thead>
              <tr>
                {columns.employee && <th>Employee</th>}
                {columns.leaveType && <th>Leave Type</th>}
                {columns.from && <th>From</th>}
                {columns.to && <th>To</th>}
                {columns.status && <th>Status</th>}
                {columns.reason && <th>Reason</th>}
              </tr>
            </thead>

            <tbody>
              {paginatedRows.map((row) => (
                <tr key={row.id}>
                  {columns.employee && <td>{row.employee}</td>}

                  {columns.leaveType && <td>{row.leaveType}</td>}

                  {columns.from && (
                    <td>
                      <span className="date-cell">
                        <FiCalendar />
                        {row.from}
                      </span>
                    </td>
                  )}

                  {columns.to && (
                    <td>
                      <span className="date-cell">
                        <FiCalendar />
                        {row.to}
                      </span>
                    </td>
                  )}

                  {columns.status && (
                    <td>
                      <span
                        className={`status-badge ${row.status.toLowerCase()}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  )}

                  {columns.reason && <td>{row.reason}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="items-per-page">
            <span>Items per page:</span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="pagination-info">
            {(page - 1) * rowsPerPage + 1} -{" "}
            {Math.min(page * rowsPerPage, filteredRows.length)} of{" "}
            {filteredRows.length}
          </div>

          <div className="pagination-buttons">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <FiChevronLeft />
            </button>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {showColumns && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setShowColumns(false)}
          />

          <div className="column-drawer">
            <div className="drawer-header">
              <h3>Show/Hide Column</h3>

              <button
                onClick={() => setShowColumns(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="drawer-body">
              {Object.keys(columns).map((column) => (
                <label key={column} className="column-option">
                  <input
                    type="checkbox"
                    checked={columns[column]}
                    onChange={() => toggleColumn(column)}
                  />

                  <span>
                    {column
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) =>
                        str.toUpperCase()
                      )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamLeaves;