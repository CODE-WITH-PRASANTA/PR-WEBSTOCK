import React, { useState, useEffect } from 'react';
import { FiHome, FiChevronRight, FiLoader } from 'react-icons/fi';
import './MonthlyAttendance.css';
import API from "../../api/axios"; // Your pre-configured Axios instance

const MonthlyAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState({ Present: 0, Absent: 0, Late: 0, "Half Day": 0 });

  // Fallback to current year/month context automatically
  const currentYear = new Date().getFullYear(); 
  const currentMonthNum = String(new Date().getMonth() + 1).padStart(2, '0'); 
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' }); 

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/attendance/monthly-history`, {
          params: { year: currentYear, month: currentMonthNum }
        });
        
        setAttendanceData(response.data.days);
        setSummary(response.data.summary);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load attendance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [currentYear, currentMonthNum]);

  const getBoxStatusClass = (status) => {
    switch (status) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'halfday': return 'status-halfday';
      default: return 'status-default';
    }
  };

  if (loading) {
    return (
      <div className="attendance-loading">
        <FiLoader className="spinner" size={32} />
        <p>Loading your calendar metrics...</p>
      </div>
    );
  }

  if (error) {
    return <div className="attendance-error-msg">{error}</div>;
  }

  return (
    <div className="attendance-container">
      
      {/* Header & Breadcrumbs Area */}
      <div className="attendance-header">
        <h1>Monthly Attendance</h1>
        <div className="breadcrumbs">
          <FiHome className="home-icon" size={14} />
          <FiChevronRight className="separator" />
          <span className="link">Attendance</span>
          <FiChevronRight className="separator" />
          <span className="current-page">Monthly Attendance</span>
        </div>
      </div>

      {/* Dynamic Statistical Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card card-present">
          <p>Total Present</p>
          <p className="stat-number">{summary.Present}</p>
        </div>
        <div className="stat-card card-absent">
          <p>Total Absent</p>
          <p className="stat-number">{summary.Absent}</p>
        </div>
        <div className="stat-card card-late">
          <p>Late Arrivals</p>
          <p className="stat-number">{summary.Late}</p>
        </div>
        <div className="stat-card card-halfday">
          <p>Half Days</p>
          <p className="stat-number">{summary["Half Day"]}</p>
        </div>
      </div>

      {/* Main Calendar Panel */}
      <div className="calendar-panel">
        <h2>{currentMonthName} {currentYear}</h2>
        
        {/* Date Box Grid */}
        <div className="calendar-grid">
          {attendanceData.map((item) => (
            <div 
              key={item.day} 
              className={`date-box ${getBoxStatusClass(item.status)}`}
              title={item.data ? `Worked: ${item.data.totalWorkingMinutes} mins` : "No Record"}
            >
              {item.day}
            </div>
          ))}
        </div>

        {/* Legend Footnote */}
        <div className="legend-container">
          <div className="legend-item"><span className="legend-dot dot-present" /><span>Present</span></div>
          <div className="legend-item"><span className="legend-dot dot-absent" /><span>Absent</span></div>
          <div className="legend-item"><span className="legend-dot dot-late" /><span>Late</span></div>
          <div className="legend-item"><span className="legend-dot dot-halfday" /><span>Half Day</span></div>
        </div>

      </div>
    </div>
  );
};

export default MonthlyAttendance;