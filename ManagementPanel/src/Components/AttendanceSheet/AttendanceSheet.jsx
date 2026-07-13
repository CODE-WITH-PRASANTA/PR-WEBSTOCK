import React, { useState, useEffect } from 'react';
import './AttendanceSheet.css';
import API from "../../api/axios";

const STATUS_ICONS = {
  present: { char: '✓', className: 'status-present' },
  absent: { char: '✕', className: 'status-absent' },
  halfday: { char: '◒', className: 'status-halfday' },
  late: { char: '!', className: 'status-late' },
  holiday: { char: '★', className: 'status-holiday' },
  leave: { char: 'L', className: 'status-leave' },
  weekend: { char: '-', className: 'status-weekend' },
  default: { char: '', className: '' }
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

  const fetchAttendance = async () => {
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
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalDays = employeesData.length > 0 ? employeesData[0].days.length : 31;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="attendance-page-container">
      <div className="page-header-row">
        <h1 className="main-title">Attendance Sheet</h1>
      </div>

      <div className="attendance-card">
        <div className="attendance-legend">
          {Object.entries(STATUS_ICONS)
            .filter(([key]) => key !== 'default')
            .map(([key, config]) => (
              <span key={key} className="legend-item">
                <span className={`status-indicator-icon ${config.className}`}>{config.char}</span>
                <span className="legend-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </span>
            ))}
        </div>

        <div className="controls-row">
          <div className="fieldset-input-group">
            <label className="fieldset-label">Year</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="custom-select">
              <option value="2025">2025</option>
              <option value="2026">2026</option>
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
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        <hr className="divider-line" />

        <div className="table-scroll-axis-container">
          <div className="table-vertical-wrapper">
            <table className="attendance-grid-table">
              <thead>
                <tr>
                  <th className="sticky-serial-col header-cell">S.No</th>
                  <th className="sticky-employee-col header-cell">Employee Name</th>
                  {daysArray.map((day) => (
                    <th key={day} className="day-header-cell">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employeesData.length > 0 ? (
                  employeesData.map((emp, index) => (
                    <tr key={emp.employeeId}>
                      <td className="sticky-serial-col body-cell">{index + 1}</td>
                      <td className="sticky-employee-col body-cell">
                        <span className="employee-name-txt">{emp.name}</span>
                      </td>
                      {emp.days.map((dayObj, i) => {
                        const iconConfig = STATUS_ICONS[dayObj.status] || STATUS_ICONS.default;
                        return (
                          <td key={i} className="status-data-cell">
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
                    <td colSpan={totalDays + 2} className="no-data-msg">No attendance data found for this period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;