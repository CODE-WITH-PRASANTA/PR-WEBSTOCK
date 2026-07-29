import React, { useState, useEffect, useCallback } from 'react';
import './AttendanceSheet.css';
import API from "../../api/axios";

const STATUS_CONFIG = {
  present: { char: '✓', className: 'status-present', label: 'Present' },
  absent: { char: '✕', className: 'status-absent', label: 'Absent' },
  halfday: { char: '◒', className: 'status-halfday', label: 'Half Day' },
  late: { char: '!', className: 'status-late', label: 'Late' },
  holiday: { char: '★', className: 'status-holiday', label: 'Holiday' },
  leave: { char: 'L', className: 'status-leave', label: 'Leave' },
  weekend: { char: '-', className: 'status-weekend', label: 'Weekend' },
  default: { char: '', className: '', label: 'Unmarked' }
};

const MONTHS = [
  { label: 'January', value: '01' }, { label: 'February', value: '02' },
  { label: 'March', value: '03' }, { label: 'April', value: '04' },
  { label: 'May', value: '05' }, { label: 'June', value: '06' },
  { label: 'July', value: '07' }, { label: 'August', value: '08' },
  { label: 'September', value: '09' }, { label: 'October', value: '10' },
  { label: 'November', value: '11' }, { label: 'December', value: '12' }
];

const AttendanceSheet = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('07');
  const [employeesData, setEmployeesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Expanded modal state to hold status, punch in, and punch out times
  const [editModal, setEditModal] = useState({
    isOpen: false,
    employeeId: null,
    employeeName: '',
    day: null,
    currentStatus: 'present',
    punchInTime: '',
    punchOutTime: ''
  });

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get('/attendance/admin/monthly-report', {
        params: { year: selectedYear, month: selectedMonth }
      });
      setEmployeesData(response.data.data || []);
    } catch (err) {
      console.error("Error fetching report:", err);
      setEmployeesData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const totalDays = employeesData.length > 0 && employeesData[0].days
    ? employeesData[0].days.length 
    : getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Populate times when opening modal
  const handleCellClick = (emp, dayIndex) => {
    const dayData = emp.days?.[dayIndex] || {};
    
    // Format ISO dates to HH:mm for time inputs if existing
    const formatTimeForInput = (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      return isNaN(date.getTime()) ? '' : date.toTimeString().slice(0, 5);
    };

    setEditModal({
      isOpen: true,
      employeeId: emp.employeeId,
      employeeName: emp.name,
      day: dayIndex + 1,
      currentStatus: dayData.status || 'absent',
      punchInTime: formatTimeForInput(dayData.punchInTime),
      punchOutTime: formatTimeForInput(dayData.punchOutTime)
    });
  };

  // Submit status along with custom or nullified punch times
  const handleStatusUpdate = async (overrideStatus) => {
    setUpdating(true);
    const targetStatus = overrideStatus || editModal.currentStatus;
    const dateStr = `${selectedYear}-${selectedMonth}-${String(editModal.day).padStart(2, '0')}`;

    // Construct full ISO strings for punch times if present
    const constructISOTime = (timeStr) => {
      if (!timeStr) return null;
      return new Date(`${dateStr}T${timeStr}:00`).toISOString();
    };

    const payload = {
      employeeId: editModal.employeeId,
      date: dateStr,
      status: targetStatus,
      punchInTime: targetStatus === 'absent' ? null : constructISOTime(editModal.punchInTime),
      punchOutTime: targetStatus === 'absent' ? null : constructISOTime(editModal.punchOutTime)
    };

    try {
      await API.post('/attendance/admin/manual-adjust', payload);

      // Optimistically update local view
      setEmployeesData(prev => prev.map(emp => {
        if (emp.employeeId === editModal.employeeId) {
          const updatedDays = [...emp.days];
          updatedDays[editModal.day - 1] = {
            ...updatedDays[editModal.day - 1],
            status: targetStatus,
            punchInTime: payload.punchInTime,
            punchOutTime: payload.punchOutTime
          };
          return { ...emp, days: updatedDays };
        }
        return emp;
      }));

      setEditModal(prev => ({ ...prev, isOpen: false }));
    } catch (err) {
      console.error("Failed to adjust attendance:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="attendance-page-container">
      <div className="page-header-row">
        <div>
          <h1 className="main-title">Attendance Register</h1>
          <p className="sub-title">View and manually adjust monthly employee attendance records.</p>
        </div>
      </div>

      <div className="attendance-card">
        <div className="controls-and-legend">
          <div className="controls-row">
            <div className="fieldset-input-group">
              <label className="fieldset-label">Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="custom-select">
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>

            <div className="fieldset-input-group">
              <label className="fieldset-label">Month</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="custom-select">
                {MONTHS.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            <button className="search-btn" onClick={fetchAttendance} disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Fetch Report'}
            </button>
          </div>

          <div className="attendance-legend">
            {Object.entries(STATUS_CONFIG)
              .filter(([key]) => key !== 'default')
              .map(([key, config]) => (
                <span key={key} className="legend-item" title={config.label}>
                  <span className={`status-indicator-icon ${config.className}`}>{config.char}</span>
                  <span className="legend-label">{config.label}</span>
                </span>
              ))}
          </div>
        </div>

        <hr className="divider-line" />

        <div className="table-scroll-axis-container">
          <div className="table-vertical-wrapper">
            <table className="attendance-grid-table">
              <thead>
                <tr>
                  <th className="sticky-col sticky-serial-header">#</th>
                  <th className="sticky-col sticky-employee-header">Employee Name</th>
                  {daysArray.map((day) => (
                    <th key={day} className="day-header-cell">
                      <span className="day-num">{day}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employeesData.length > 0 ? (
                  employeesData.map((emp, index) => (
                    <tr key={emp.employeeId || index} className="table-row">
                      <td className="sticky-col sticky-serial-col">{index + 1}</td>
                      <td className="sticky-col sticky-employee-col">
                        <div className="employee-info-cell">
                          <span className="avatar-circle">{emp.name?.charAt(0) || 'E'}</span>
                          <span className="employee-name-txt">{emp.name}</span>
                        </div>
                      </td>
                      {daysArray.map((_, dayIdx) => {
                        const dayObj = emp.days?.[dayIdx] || {};
                        const iconConfig = STATUS_CONFIG[dayObj.status] || STATUS_CONFIG.default;
                        return (
                          <td 
                            key={dayIdx} 
                            className="status-data-cell"
                            onClick={() => handleCellClick(emp, dayIdx)}
                            title={`Click to edit: Day ${dayIdx + 1} (${iconConfig.label})`}
                          >
                            <span className={`status-indicator-icon ${iconConfig.className}`}>
                              {iconConfig.char}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={totalDays + 2} className="no-data-msg">
                      {loading ? 'Fetching attendance records...' : 'No attendance records found for this selection.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced Manual Entry Modal with Time Inputs */}
      {editModal.isOpen && (
        <div className="modal-backdrop" onClick={() => setEditModal(prev => ({ ...prev, isOpen: false }))}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="Attendancesheet-header">
              <h3>Manual Adjustment</h3>
              <button className="close-btn" onClick={() => setEditModal(prev => ({ ...prev, isOpen: false }))}>&times;</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-details">
                <p><strong>Employee:</strong> {editModal.employeeName}</p>
                <p><strong>Date:</strong> {selectedYear}-{selectedMonth}-{String(editModal.day).padStart(2, '0')}</p>
              </div>

              <label className="fieldset-label">Select Attendance Status</label>
              <div className="status-selection-grid">
                {Object.entries(STATUS_CONFIG)
                  .filter(([key]) => key !== 'default')
                  .map(([statusKey, config]) => (
                    <button
                      key={statusKey}
                      type="button"
                      disabled={updating}
                      className={`status-option-btn ${config.className} ${editModal.currentStatus === statusKey ? 'selected' : ''}`}
                      onClick={() => setEditModal(prev => ({ ...prev, currentStatus: statusKey }))}
                    >
                      <span className="status-char">{config.char}</span>
                      <span>{config.label}</span>
                    </button>
                  ))}
              </div>

              {/* Punch In / Punch Out controls */}
              {editModal.currentStatus !== 'absent' && editModal.currentStatus !== 'holiday' && (
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label className="fieldset-label">Punch In Time</label>
                    <input 
                      type="time" 
                      value={editModal.punchInTime} 
                      onChange={(e) => setEditModal(prev => ({ ...prev, punchInTime: e.target.value }))}
                      className="custom-select"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="fieldset-label">Punch Out Time</label>
                    <input 
                      type="time" 
                      value={editModal.punchOutTime} 
                      onChange={(e) => setEditModal(prev => ({ ...prev, punchOutTime: e.target.value }))}
                      className="custom-select"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <button 
                  className="search-btn" 
                  onClick={() => handleStatusUpdate()} 
                  disabled={updating}
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceSheet;