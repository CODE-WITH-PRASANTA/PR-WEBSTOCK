import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, PlusCircle, RefreshCw, Download, 
  ChevronLeft, ChevronRight, SquarePen, Trash2, X, ChevronDown 
} from 'lucide-react';
import './TodayAttendance.css';
import API from "../../api/axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const GENERATED_TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const min = i % 2 === 0 ? "00" : "30";
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const padHour = displayHour < 10 ? `0${displayHour}` : displayHour;
  return `${padHour}:${min} ${ampm}`;
});

const AttendanceReport = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formName, setFormName] = useState("");
  const [formStatus, setFormStatus] = useState("Present");

  const [columns, setColumns] = useState({
    checkbox: true, date: true, employeeName: true, firstIn: true,
    break: true, lastOut: true, totalHours: true, status: true, shift: true, actions: true
  });

  const toggleColumnVisibility = (key) => setColumns(prev => ({ ...prev, [key]: !prev[key] }));

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(`/attendance/admin/daily-report`); 
      if (response.data.success) {
        const formattedData = response.data.data.map(item => ({
          id: item._id,
          date: item.date || "N/A",
          name: item.employeeName || item.name, 
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.employeeName || item.name)}&background=random`,
          firstIn: item.punchInTime ? new Date(item.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-",
          break: item.totalBreakMinutes ? `${Math.round(item.totalBreakMinutes)}m` : "0m",
          lastOut: item.punchOutTime ? new Date(item.punchOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-",
          totalHours: `${Math.floor((item.totalWorkingMinutes || 0) / 60)}h ${Math.floor((item.totalWorkingMinutes || 0) % 60)}m`,
          status: item.dayStatus ? item.dayStatus.toLowerCase().replace(' ', '-') : "pending",
          displayStatus: item.dayStatus || "Pending", 
          shift: "General"
        }));
        setEmployees(formattedData);
      }
    } catch (err) {
      setError("Unable to fetch attendance report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchAttendance(); 
  }, []);

  const openEditModal = (emp) => {
    setSelectedEmployee(emp);
    setFormName(emp.name);
    // Standardize matching database display strings perfectly to form values
    setFormStatus(emp.displayStatus); 
    setIsEntryModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/attendance/admin/update/${selectedEmployee.id}`, {
        dayStatus: formStatus,
      });
      setIsEntryModalOpen(false);
      fetchAttendance(); 
    } catch (err) {
      alert("Failed to update status record.");
    }
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => emp.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [employees, searchText]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const computedCurrentPage = Math.min(currentPage, totalPages) || 1;
  
  const paginatedEmployees = useMemo(() => {
    const startIndex = (computedCurrentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEmployees, computedCurrentPage, itemsPerPage]);

  const handleRowCheckboxChange = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };



const exportToExcel = () => {
  // 1. Prepare data (Map only the fields you want in the Excel file)
  const dataToExport = filteredEmployees.map(emp => ({
    "Date": emp.date,
    "Employee Name": emp.name,
    "First In": emp.firstIn,
    "Break": emp.break,
    "Last Out": emp.lastOut,
    "Total Hours": emp.totalHours,
    "Status": emp.displayStatus,
    "Shift": emp.shift
  }));

  // 2. Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // 3. Create a workbook and append the sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

  // 4. Generate buffer and trigger download
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  saveAs(blob, "Attendance_Report.xlsx");
};

  return (
    <div className="attendance-container">
      <div className="attendance-header-section">
        <div className="attendance-title">Attendance Report</div>
        <div className="attendance-breadcrumbs">
          <HomeIcon size={16} /> <span>&gt;</span> Attendance <span>&gt;</span> <strong>History</strong>
        </div>
      </div>

      <div className="attendance-card">
        <div className="attendance-toolbar">
          <div className="attendance-search-box">
            <Search className="attendance-search-icon" size={18} />
            <input 
              type="text" 
              className="attendance-search-input" 
              placeholder="Search by name" 
              value={searchText} 
              onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }} 
            />
          </div>
          <div className="attendance-action-buttons">
            <button className="attendance-icon-btn" onClick={() => setShowColumnToggle(!showColumnToggle)}><SlidersHorizontal size={20} /></button>
            <button className="attendance-icon-btn" onClick={fetchAttendance}><RefreshCw size={20} /></button>
           <button className="attendance-icon-btn" onClick={exportToExcel}>
                  <Download size={20} color="#3b82f6" />
                </button>
          </div>
          {showColumnToggle && (
            <div className="column-toggle-dropdown">
              <div className="column-toggle-title">Toggle Columns</div>
              {Object.keys(columns).map((colKey) => (
                <label key={colKey} className="column-toggle-item">
                  <input type="checkbox" checked={columns[colKey]} onChange={() => toggleColumnVisibility(colKey)} />
                  <span>{colKey.charAt(0).toUpperCase() + colKey.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="attendance-table-container">
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading records...</div>
          ) : error ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>{error}</div>
          ) : (
            <table className="attendance-main-table">
              <thead>
                <tr>
                  {columns.checkbox && (
                    <th>
                      <input 
                        type="checkbox" 
                        className="attendance-checkbox-input"
                        checked={paginatedEmployees.length > 0 && paginatedEmployees.every(e => selectedIds.includes(e.id))}
                        onChange={(e) => setSelectedIds(e.target.checked ? filteredEmployees.map(e => e.id) : [])} 
                      />
                    </th>
                  )}
                  {columns.date && <th>Date</th>}
                  {columns.employeeName && <th>Employee Name</th>}
                  {columns.firstIn && <th>First In</th>}
                  {columns.break && <th>Break</th>}
                  {columns.lastOut && <th>Last Out</th>}
                  {columns.totalHours && <th>Total Hours</th>}
                  {columns.status && <th>Status</th>}
                  {columns.shift && <th>Shift</th>}
                  {columns.actions && <th>Actions</th>} 
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={Object.values(columns).filter(Boolean).length} style={{ textAlign: 'center', padding: '24px' }}>
                      No matching employee records found.
                    </td>
                  </tr>
                ) : (
                  paginatedEmployees.map((emp) => (
                    <tr key={emp.id}>
                      {columns.checkbox && (
                        <td>
                          <input 
                            type="checkbox" 
                            className="attendance-checkbox-input"
                            checked={selectedIds.includes(emp.id)} 
                            onChange={() => handleRowCheckboxChange(emp.id)} 
                          />
                        </td>
                      )}
                      {columns.date && <td>{emp.date}</td>}
                      {columns.employeeName && (
                        <td>
                          <div className="attendance-profile-cell">
                            <img src={emp.avatar} alt={emp.name} className="attendance-avatar" /> 
                            <span>{emp.name}</span>
                          </div>
                        </td>
                      )}
                      {columns.firstIn && <td>{emp.firstIn}</td>}
                      {columns.break && <td>{emp.break}</td>}
                      {columns.lastOut && <td>{emp.lastOut}</td>}
                      {columns.totalHours && <td>{emp.totalHours}</td>}
                      {columns.status && (
                        <td>
                          <span className={`status-badge ${emp.status}`}>
                            {emp.displayStatus}
                          </span>
                        </td>
                      )}
                      {columns.shift && <td>{emp.shift}</td>}
                      {columns.actions && (
                        <td className="action-cell">
                          <button className="row-edit-btn" onClick={() => openEditModal(emp)}>
                            <SquarePen size={18} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Toolbar */}
        <div className="attendance-pagination-bar">
          <div className="items-per-page-selector">
            <span>Rows per page:</span>
            <div className="items-dropdown-trigger" onClick={() => setShowItemsDropdown(!showItemsDropdown)}>
              {itemsPerPage} <ChevronDown size={14} />
            </div>
            {showItemsDropdown && (
              <div className="items-custom-menu">
                {[5, 10, 20, 50].map((num) => (
                  <div 
                    key={num} 
                    className={`items-custom-option ${itemsPerPage === num ? 'selected-opt' : ''}`}
                    onClick={() => { setItemsPerPage(num); setCurrentPage(1); setShowItemsDropdown(false); }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span>Showing {filteredEmployees.length ? (computedCurrentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(computedCurrentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length}</span>
          <div className="pagination-navigation">
            <button className="pagination-arrow-btn" disabled={computedCurrentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
              <ChevronLeft size={18} />
            </button>
            <button className="pagination-arrow-btn" disabled={computedCurrentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Entry Modal Layer - Outside Table, Fully Linked to Provided CSS classes */}
      {isEntryModalOpen && (
        <div className="modal-overlay">
          <div className="entry-modal-box">
            <div className="entry-modal-header">
              <div className="entry-modal-title-wrapper">
                <h3>Edit Attendance Record</h3>
              </div>
              <button className="entry-modal-close" onClick={() => setIsEntryModalOpen(false)}>
                <X size={20}/>
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="entry-modal-body-form">
              <div className="form-grid-layout" style={{ gridTemplateColumns: '1fr' }}>
                <div className="form-input-field-group">
                  <span className="form-input-label-tag">Employee Name</span>
                  <input 
                    type="text" 
                    className="form-interactive-input" 
                    value={formName} 
                    disabled 
                    style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#666' }}
                  />
                </div>

                <div className="form-input-field-group" style={{ marginTop: '10px' }}>
                  <span className="form-input-label-tag">Attendance Status</span>
                  <select 
                    className="form-interactive-input"
                    value={formStatus} 
                    onChange={(e) => setFormStatus(e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </div>
              </div>

              <div className="form-action-footer-buttons" style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="form-cancel-dismiss-btn" onClick={() => setIsEntryModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="form-save-submit-btn">
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const HomeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

export default AttendanceReport;