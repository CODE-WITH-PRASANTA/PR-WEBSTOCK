import React, { useState, useEffect, useMemo } from "react";
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
import API from "../../api/axios";

const TeamLeaves = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
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

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await API.get("/leaves/all");
      // Since backend sorts by createdAt: -1, the data is already latest-first
      const formattedData = response.data.data.map((item) => ({
        id: item._id,
        employee: item.employeeName,
        leaveType: item.leaveType,
        from: new Date(item.fromDate).toLocaleDateString(),
        to: new Date(item.toDate).toLocaleDateString(),
        status: item.status,
        reason: item.reason,
      }));
      setRows(formattedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch leave requests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

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
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleRefresh = () => {
    fetchLeaves();
    setSearch("");
    setPage(1);
  };

  const downloadCSV = () => {
    const headers = ["S.No", "Employee", "Leave Type", "From", "To", "Status", "Reason"];
    const csvRows = filteredRows.map((row, index) => [
      index + 1,
      row.employee,
      row.leaveType,
      row.from,
      row.to,
      row.status,
      row.reason,
    ]);
    const csvContent = [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TeamLeaves.csv";
    link.click();
  };

  return (
    <div className="team-leaves-page">
      <div className="team-leaves-header">
        <h2>Team Leaves</h2>
        <div className="breadcrumb">My Team &gt; Leaves</div>
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
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>

          <div className="toolbar-right">
            <button className="icon-btn" onClick={() => setShowColumns(true)} title="Show / Hide Columns"><FiFilter /></button>
            <button className="icon-btn" onClick={handleRefresh} title="Refresh"><FiRefreshCw /></button>
            <button className="icon-btn" onClick={downloadCSV} title="Download"><FiDownload /></button>
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
            <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>
          ) : error ? (
            <p style={{ color: "red", padding: "20px", textAlign: "center" }}>{error}</p>
          ) : (
            <table className="team-leaves-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  {columns.employee && <th>Employee</th>}
                  {columns.leaveType && <th>Leave Type</th>}
                  {columns.from && <th>From</th>}
                  {columns.to && <th>To</th>}
                  {columns.status && <th>Status</th>}
                  {columns.reason && <th>Reason</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{(page - 1) * rowsPerPage + index + 1}</td>
                    {columns.employee && <td>{row.employee}</td>}
                    {columns.leaveType && <td>{row.leaveType}</td>}
                    {columns.from && (<td><span className="date-cell"><FiCalendar /> {row.from}</span></td>)}
                    {columns.to && (<td><span className="date-cell"><FiCalendar /> {row.to}</span></td>)}
                    {columns.status && (
                      <td>
                        <span className={`status-badge ${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {columns.reason && <td>{row.reason}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="table-footer">
          <div className="items-per-page">
            <span>Items per page:</span>
            <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div className="pagination-info">
            {filteredRows.length > 0 ? `${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, filteredRows.length)} of ${filteredRows.length}` : "0 of 0"}
          </div>
          <div className="pagination-buttons">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}><FiChevronLeft /></button>
            <button disabled={page >= totalPages || totalPages === 0} onClick={() => setPage(page + 1)}><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {showColumns && (
        <>
          <div className="drawer-overlay" onClick={() => setShowColumns(false)} />
          <div className="column-drawer">
            <div className="drawer-header">
              <h3>Show/Hide Column</h3>
              <button onClick={() => setShowColumns(false)}><FiX /></button>
            </div>
            <div className="drawer-body">
              {Object.keys(columns).map((column) => (
                <label key={column} className="column-option">
                  <input type="checkbox" checked={columns[column]} onChange={() => toggleColumn(column)} />
                  <span>{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}</span>
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