import React, { useState, useEffect, useRef } from 'react';
import './Attendance.css'; 
import API from "../../api/axios"; 

const Attendance = () => {
  const [activeFilter, setActiveFilter] = useState('this-month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef(null);

  const filterLabels = {
    'this-week': 'This Week',
    'this-month': 'This Month',
    'three-months': '3 Months'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonthNum = String(now.getMonth() + 1).padStart(2, '0');

        const response = await API.get('/attendance/monthly-history', {
          params: { year: currentYear, month: currentMonthNum }
        });

        const dynamicDays = response.data.days.filter(item => item.status !== 'default');
        setAttendanceList(dynamicDays.reverse());
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load attendance history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [activeFilter]);

  // Helper: Format YYYY-MM-DD to Long Strings
  const formatLongDate = (dateStr) => {
    if (!dateStr) return "-";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj)) return dateStr;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper: Format ISO Timestamps
  const formatTimeStr = (isoString) => {
    if (!isoString) return "-";
    const dateObj = new Date(isoString);
    if (isNaN(dateObj)) return "-";
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

 // Helper: Format totalWorkingMinutes into a user-friendly string
const formatDuration = (totalMinutes) => {
  if (totalMinutes === undefined || totalMinutes === null || totalMinutes <= 0) return "-";
  
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  // Logic: Only show hours if they exist, otherwise just show minutes
  if (h > 0) {
    return `${h}h ${m > 0 ? `${m}m` : ''}`;
  }
  return `${m}m`;
};


  // Helper: Calculate total break time deduction from the array
  const calculateTotalBreakMinutes = (breaks) => {
    if (!breaks || breaks.length === 0) return 0;
    let totalMs = 0;
    breaks.forEach(b => {
      if (b.start && b.end) {
        totalMs += (new Date(b.end) - new Date(b.start));
      }
    });
    return Math.floor(totalMs / (1000 * 60));
  };

  const filteredData = attendanceList.filter(item => {
    const formattedDate = formatLongDate(item.dateStr).toLowerCase();
    const statusLabel = item.status.toLowerCase();
    const query = searchQuery.toLowerCase();
    return formattedDate.includes(query) || statusLabel.includes(query);
  });

  return (
    <div className="attendance-container">
      <header className="attendance-header">
        <h1 className="attendance-title">Attendance History</h1>
        <div className="attendance-breadcrumb">
          <span className="breadcrumb-icon">🏠</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span>Attendance</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-active">History</span>
        </div>
      </header>

      <div className="attendance-toolbar">
        <div className="search-box-wrapper">
          <input 
            type="text" 
            placeholder="Search Date or Status..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="toolbar-right">
          <div className="filter-dropdown-container" ref={dropdownRef}>
            <button 
              className="dropdown-trigger-btn" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              type="button"
            >
              <span>{filterLabels[activeFilter]}</span>
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu-list">
                {Object.entries(filterLabels).map(([key, label]) => (
                  <button 
                    key={key}
                    className={`dropdown-item ${activeFilter === key ? 'selected' : ''}`}
                    onClick={() => { setActiveFilter(key); setIsDropdownOpen(false); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="records-count">Showing {filteredData.length} records</span>
        </div>
      </div>

      {loading && (
        <div className="attendance-loading-state">
          <p>Syncing clock history profiles...</p>
        </div>
      )}

      {error && <div className="attendance-error-msg">{error}</div>}

      {!loading && !error && (
        <div className="attendance-timeline">
          {filteredData.length === 0 ? (
            <div className="no-records-fallback">No attendance records found for this period.</div>
          ) : (
            filteredData.map((item, index) => {
              const logData = item.data; 
              const displayStatus = item.status.charAt(0).toUpperCase() + item.status.slice(1);
              
              // Calculate breaks metrics dynamically to show as deductions footnote
              const breakMinutes = logData ? calculateTotalBreakMinutes(logData.breaks) : 0;

              return (
                <div key={item.dateStr || index} className="timeline-item">
                  <div className="timeline-node">
                    <div className="node-circle"></div>
                    {index !== filteredData.length - 1 && <div className="node-line"></div>}
                  </div>

                  <div className="attendance-card">
                    <div className="card-header">
                      <h3 className="card-date">{formatLongDate(item.dateStr)}</h3>
                      <span className={`status-badge badge-${item.status}`}>
                        {displayStatus === 'Halfday' ? 'Half Day' : displayStatus}
                      </span>
                    </div>

                    <div className="card-grid">
                      <div className="grid-col">
                        <span className="col-label">Check In</span>
                        <span className="col-value">{logData ? formatTimeStr(logData.punchInTime) : "-"}</span>
                      </div>
                      <div className="grid-col">
                        <span className="col-label">Check Out</span>
                        <span className="col-value">{logData ? formatTimeStr(logData.punchOutTime) : "-"}</span>
                      </div>
                      <div className="grid-col">
                        <span className="col-label">Net Work Duration</span>
                        {/* totalWorkingMinutes has breaks already subtracted on the backend */}
                        <span className="col-value">{logData ? formatDuration(logData.totalWorkingMinutes) : "-"}</span>
                      </div>
                      <div className="grid-col">
                        <span className="col-label">Shift</span>
                        <span className="col-value">General</span>
                      </div>
                    </div>

                    {/* Conditional Footnotes for Breaks or System Actions */}
                    {breakMinutes > 0 && (
                      <div className="card-footer-note break-deduction-info">
                        ☕ Total Break Deductions: <strong>{formatDuration(breakMinutes)}</strong> ({logData.breaks.length} breaks recorded)
                      </div>
                    )}

                    {logData && logData.status === 'Auto Punched Out' && (
                      <div className="card-footer-note system-alert">
                        ⚠️ Note: System Auto Punched Out due to Geofence boundary expiration limits.
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;