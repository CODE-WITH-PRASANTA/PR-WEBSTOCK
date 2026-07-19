import React, { useState, useEffect, useCallback } from 'react';
import './AttendanceAtten.css';
import API from "../../api/axios";

const AttendanceAtten = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const monthMap = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const monthNum = monthMap[selectedMonth];
      const response = await API.get(`/attendance/admin/monthly-report?year=${selectedYear}&month=${monthNum}`);
      setAttendanceData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => { fetchAttendance(); }, [fetchAttendance]);

  const daysInMonth = new Date(selectedYear, monthMap[selectedMonth], 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);


const renderStatus = (status) => {
    // The keys MUST match the strings returned by your backend API
    const statusMap = {
      'present': { char: '✔', class: 'present' },
      'absent': { char: '✖', class: 'absent' },
      'halfday': { char: '½', class: 'half' }, // Changed from 'half day' to 'halfday'
      'late': { char: 'L', class: 'late' }
    };
    
    // Normalize string
    const normalizedStatus = status ? status.toString().toLowerCase().trim() : '';
    const s = statusMap[normalizedStatus] || { char: '-', class: 'empty' };
    
    return <div className={`status-pill ${s.class}`}>{s.char}</div>;
};
  return (
    <div className="attendance-dashboard">
      <header className="dashboard-header">
        <h1>Team Attendance</h1>
        <div className="controls">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2026">2026</option>
          </select>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {Object.keys(monthMap).map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button className="btn-primary" onClick={fetchAttendance} disabled={loading}>
            {loading ? 'Refreshing...' : 'Apply Filters'}
          </button>
        </div>
      </header>

      <section className="attendance-grid-container">
        {attendanceData.length > 0 ? (
          <div className="grid-table">
            <div className="grid-header">
              <div className="sticky-col header-cell">Employee</div>
              {daysArray.map(d => <div key={d} className="date-cell">{d}</div>)}
            </div>
            
            <div className="grid-body">
              {attendanceData.map((member) => (
                <div key={member.employeeId} className="grid-row">
                  <div className="sticky-col emp-name">{member.name}</div>
                  {member.days.map((d, i) => (
                    <div key={i} className="status-cell">{renderStatus(d.status)}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">No attendance records found for this period.</div>
        )}
      </section>
    </div>
  );
};

export default AttendanceAtten;