import React, { useState, useEffect, useRef } from "react";
import "./LeaveBalance.css";
import API from "../../api/axios"; // Uses your pre-configured Axios instance
import * as XLSX from "xlsx";

import {
  FaSearch,
  FaSyncAlt,
  FaDownload,
  FaEdit,
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const defaultColumns = {
  checkbox: true,
  employee: true,
  previous: true,
  current: true,
  total: true,
  used: true,
  accepted: true,
  rejected: true,
  expired: true,
  carry: true,
  action: true,
};

const LeaveBalance = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState(defaultColumns);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  const menuRef = useRef();

  const fetchLeaveBalances = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get("/leaves/balances"); 
      
      if (response.data && response.data.success) {
        setTableData(response.data.data);
      } else {
        setError("Failed to process leave layout data.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveBalances();
  }, []);

  // Dropdown closing monitor
  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowColumnMenu(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filteredData = tableData.filter((item) =>
    item.employee?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
      setSelectedRows(currentRows.map((x) => x.id || x._id));
    }
  };

  const handleEdit = (item) => {
    setEditingData(item);
    setShowPopup(true);
  };

  const handleRefresh = () => {
    setSearch("");
    setSelectedRows([]);
    setColumns(defaultColumns);
    fetchLeaveBalances();
  };

  // Helper data parser to handle both selected rows vs entire datasets
  const getExportData = () => {
    const dataToExport = selectedRows.length > 0 
      ? tableData.filter(item => selectedRows.includes(item.id || item._id))
      : tableData;

    return dataToExport.map((item) => ({
      "Employee Name": item.employee,
      "Previous Balance": item.previous,
      "Current Balance": item.current,
      "Total Balance": item.total,
      "Used Leave": item.used,
      "Accepted Leave": item.accepted,
      "Rejected Leave": item.rejected,
      "Expired Leave": item.expired,
      "Carry Over": item.carry,
    }));
  };

  // EXCEL EXPORT ENGINE
  const handleDownloadExcel = () => {
    const formattedData = getExportData();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Balances");

    // Auto-fit column widths elegantly
    const maxProps = [
      { wch: 25 }, // Employee Name
      { wch: 15 }, // Previous Balance
      { wch: 15 }, // Current Balance
      { wch: 15 }, // Total Balance
      { wch: 12 }, // Used Leave
      { wch: 12 }, // Accepted Leave
      { wch: 12 }, // Rejected Leave
      { wch: 12 }, // Expired Leave
      { wch: 12 }  // Carry Over
    ];
    worksheet["!cols"] = maxProps;

    XLSX.writeFile(workbook, "Leave_Balances_Report.xlsx");
  };

  const toggleColumn = (key) => {
    setColumns({
      ...columns,
      [key]: !columns[key],
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  return (
    <div className="leaveBalance">
      {/* Header */}
      <div className="leaveBalance__header">
        <h2>Leave Balance</h2>
        <div className="leaveBalance__toolbar">
          <div className="leaveBalance__search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search Employee"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="leaveBalance__menu" ref={menuRef}>
            <button
              className="leaveBalance__icon"
              onClick={() => setShowColumnMenu(!showColumnMenu)}
            >
              <FaFilter />
            </button>
            {showColumnMenu && (
              <div className="leaveBalance__dropdown">
                <h4>Show / Hide Columns</h4>
                {Object.keys(columns).map((key) => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      checked={columns[key]}
                      onChange={() => toggleColumn(key)}
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            className="leaveBalance__icon refresh"
            onClick={handleRefresh}
          >
            <FaSyncAlt />
          </button>
          
          {/* DIRECT EXCEL DOWNLOAD BUTTON */}
          <button
            className="leaveBalance__icon download"
            onClick={handleDownloadExcel}
            title="Download Excel Report"
          >
            <FaDownload />
          </button>
        </div>
      </div>

      {/* Loading / Error States */}
      {loading ? (
        <div className="leaveBalance__infoMessage">Loading leave balances...</div>
      ) : error ? (
        <div className="leaveBalance__errorMessage">{error}</div>
      ) : (
        <>
          {/* ===================== TABLE ===================== */}
          <div className="leaveBalance__tableWrapper">
            <table className="leaveBalance__table">
              <thead>
                <tr>
                  {columns.checkbox && (
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === currentRows.length &&
                          currentRows.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  {columns.employee && <th>Employee Name</th>}
                  {columns.previous && <th>Previous Balance</th>}
                  {columns.current && <th>Current Balance</th>}
                  {columns.total && <th>Total Balance</th>}
                  {columns.used && <th>Used Leave</th>}
                  {columns.accepted && <th>Accepted Leave</th>}
                  {columns.rejected && <th>Rejected Leave</th>}
                  {columns.expired && <th>Expired Leave</th>}
                  {columns.carry && <th>Carry Over</th>}
                  {columns.action && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="leaveBalance__empty">
                      No Employee Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((item) => (
                    <tr key={item.id || item._id}>
                      {columns.checkbox && (
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id || item._id)}
                            onChange={() => handleCheckbox(item.id || item._id)}
                          />
                        </td>
                      )}
                      {columns.employee && (
                        <td>
                          <div className="leaveBalance__employee">
                            <span>{item.employee}</span>
                          </div>
                        </td>
                      )}
                      {columns.previous && <td>{item.previous}</td>}
                      {columns.current && <td>{item.current}</td>}
                      {columns.total && <td>{item.total}</td>}
                      {columns.used && <td>{item.used}</td>}
                      {columns.accepted && <td>{item.accepted}</td>}
                      {columns.rejected && <td>{item.rejected}</td>}
                      {columns.expired && <td>{item.expired}</td>}
                      {columns.carry && <td>{item.carry}</td>}
                      {columns.action && (
                        <td>
                          <div className="leaveBalance__actions">
                            <button
                              className="editBtn"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
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

          {/* ===================== PAGINATION ===================== */}
          <div className="leaveBalance__pagination">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} -{" "}
              {Math.min(page * rowsPerPage, filteredData.length)} of{" "}
              {filteredData.length}
            </span>
            <div className="leaveBalance__pageBtns">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <FaChevronLeft />
              </button>
              <span>{page}</span>
              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===================== POPUP ===================== */}
      {showPopup && editingData && (
        <div className="leaveBalance__modal">
          <div className="leaveBalance__modalContent leaveBalance__modalLarge">
            <div className="leaveBalance__popupHeader">
              <div className="leaveBalance__userInfo">
                <h3>Update Balance Limits: {editingData.employee}</h3>
              </div>
              <button className="closeBtn" onClick={() => setShowPopup(false)}>
                <FaTimes />
              </button>
            </div>

            <form className="leaveBalance__popupForm" onSubmit={handleFormSubmit}>
              <div className="leaveBalance__popupGrid">
                <div className="floatingField">
                  <label>Total Allocated Allowance</label>
                  <input type="number" defaultValue={editingData.total ?? 25} />
                </div>
                <div className="floatingField">
                  <label>Previous Carryover Balance</label>
                  <input type="number" defaultValue={editingData.previous ?? 0} />
                </div>
              </div>

              <div className="leaveBalance__popupButtons">
                <button type="submit" className="saveBtn">
                  Save Adjustments
                </button>
                <button
                  type="button"
                  className="cancelBtn"
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

export default LeaveBalance;