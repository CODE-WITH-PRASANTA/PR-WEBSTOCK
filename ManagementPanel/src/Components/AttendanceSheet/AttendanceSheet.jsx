import React, { useState } from 'react';
import './AttendanceSheet.css';

// Mock Data representing employee records matching the layout of your reference images
const ATTENDANCE_MOCK_DATA = [
  {
    id: 1,
    firstName: "Jacob",
    lastName: "Ryan",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: ["P", "P", "W", "H", "P", "P", "W", "P", "L", "P", "P", "W", "W", "P", "P", "P", "L", "W", "W", "P", "P", "P", "H", "P", "W", "W", "P", "W", "W", "P", "P"]
  },
  {
    id: 2,
    firstName: "Angelica",
    lastName: "Ramos",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: ["P", "P", "W", "P", "L", "P", "W", "P", "P", "H", "P", "W", "W", "P", "P", "P", "P", "W", "W", "P", "L", "P", "P", "P", "W", "W", "H", "P", "W", "P", "P"]
  },
  {
    id: 3,
    firstName: "Jens",
    lastName: "Brincker",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: ["P", "L", "W", "P", "P", "P", "W", "H", "P", "P", "L", "W", "W", "P", "P", "P", "P", "W", "W", "H", "P", "P", "P", "L", "W", "W", "P", "P", "W", "P", "H"]
  },
  {
    id: 4,
    firstName: "Mark",
    lastName: "Hay",
    avatar: "https://i.pravatar.cc/150?img=59",
    status: ["H", "P", "W", "P", "P", "L", "W", "P", "P", "P", "P", "W", "W", "H", "P", "L", "P", "W", "W", "P", "P", "P", "P", "H", "W", "W", "P", "P", "W", "P", "P"]
  },
  {
    id: 5,
    firstName: "Cara",
    lastName: "Stevens",
    avatar: "https://i.pravatar.cc/150?img=31",
    status: ["P", "P", "W", "H", "L", "P", "W", "P", "P", "P", "H", "W", "W", "P", "P", "P", "L", "W", "W", "P", "P", "H", "P", "P", "W", "W", "P", "P", "W", "P", "P"]
  },
  {
    id: 6,
    firstName: "John",
    lastName: "Doe",
    avatar: "https://i.pravatar.cc/150?img=68",
    status: ["P", "H", "W", "P", "P", "P", "W", "L", "P", "P", "P", "W", "W", "H", "P", "P", "P", "W", "W", "L", "P", "P", "H", "P", "W", "W", "P", "P", "W", "P", "P"]
  },
  {
    id: 7,
    firstName: "Ashton",
    lastName: "Cox",
    avatar: "https://i.pravatar.cc/150?img=8",
    status: ["L", "P", "W", "P", "H", "P", "W", "P", "P", "L", "P", "W", "W", "P", "H", "P", "P", "W", "W", "P", "P", "L", "P", "P", "W", "W", "H", "P", "W", "P", "P"]
  }
];

const AttendanceSheet = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const years = ['2023', '2024', '2025'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generates columns for 1 to 31 days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Helper to render the custom modern icon designs matching your image templates
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'P':
        return (
          <div className="AttendanceSheet__icon-wrapper AttendanceSheet__icon-wrapper--present">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        );
      case 'W':
        return (
          <div className="AttendanceSheet__icon-wrapper AttendanceSheet__icon-wrapper--weekend">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
        );
      case 'L':
        return (
          <div className="AttendanceSheet__icon-wrapper AttendanceSheet__icon-wrapper--leave">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        );
      case 'H':
        return (
          <div className="AttendanceSheet__icon-wrapper AttendanceSheet__icon-wrapper--holiday">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="AttendanceSheet">
      {/* Breadcrumb Navigation Header */}
      <div className="AttendanceSheet__top-header">
        <h2 className="AttendanceSheet__main-title">Attendance Sheet</h2>
        <div className="AttendanceSheet__breadcrumbs">
          <span className="AttendanceSheet__breadcrumb-home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </span>
          <span className="AttendanceSheet__breadcrumb-arrow">&gt;</span>
          <span className="AttendanceSheet__breadcrumb-link">Attendance</span>
          <span className="AttendanceSheet__breadcrumb-arrow">&gt;</span>
          <span className="AttendanceSheet__breadcrumb-active">Sheet</span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="AttendanceSheet__container">
        <h3 className="AttendanceSheet__card-title">Attendance Sheet</h3>
        
        {/* Controls and Select Fields */}
        <div className="AttendanceSheet__filters">
          
          {/* Custom Select Year Container */}
          <div className="AttendanceSheet__select-group">
            <label className="AttendanceSheet__select-label">Select Year*</label>
            <div className={`AttendanceSheet__custom-select ${isYearOpen ? 'AttendanceSheet__custom-select--active' : ''}`}>
              <div className="AttendanceSheet__select-trigger" onClick={() => { setIsYearOpen(!isYearOpen); setIsMonthOpen(false); }}>
                <span>{selectedYear}</span>
                <span className={`AttendanceSheet__select-caret ${isYearOpen ? 'AttendanceSheet__select-caret--up' : ''}`}></span>
              </div>
              {isYearOpen && (
                <div className="AttendanceSheet__dropdown-portal">
                  {years.map((year) => (
                    <div 
                      key={year} 
                      className={`AttendanceSheet__dropdown-option ${selectedYear === year ? 'AttendanceSheet__dropdown-option--selected' : ''}`}
                      onClick={() => { setSelectedYear(year); setIsYearOpen(false); }}
                    >
                      <span>{year}</span>
                      {selectedYear === year && <span className="AttendanceSheet__option-check">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Custom Select Month Container */}
          <div className="AttendanceSheet__select-group">
            <label className="AttendanceSheet__select-label">Select Month*</label>
            <div className={`AttendanceSheet__custom-select ${isMonthOpen ? 'AttendanceSheet__custom-select--active' : ''}`}>
              <div className="AttendanceSheet__select-trigger" onClick={() => { setIsMonthOpen(!isMonthOpen); setIsYearOpen(false); }}>
                <span>{selectedMonth}</span>
                <span className={`AttendanceSheet__select-caret ${isMonthOpen ? 'AttendanceSheet__select-caret--up' : ''}`}></span>
              </div>
              {isMonthOpen && (
                <div className="AttendanceSheet__dropdown-portal AttendanceSheet__dropdown-portal--scrollable">
                  {months.map((month) => (
                    <div 
                      key={month} 
                      className={`AttendanceSheet__dropdown-option ${selectedMonth === month ? 'AttendanceSheet__dropdown-option--selected' : ''}`}
                      onClick={() => { setSelectedMonth(month); setIsMonthOpen(false); }}
                    >
                      <span>{month}</span>
                      {selectedMonth === month && <span className="AttendanceSheet__option-check">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Action Button */}
          <button className="AttendanceSheet__search-btn">Search</button>
        </div>

        {/* Legend Map and Sub-Info */}
        <div className="AttendanceSheet__meta-row">
          <div className="AttendanceSheet__filter-indicator">
            Filtered by: Year: {selectedYear} | Month: {selectedMonth}
          </div>
          <div className="AttendanceSheet__legend-container">
            <div className="AttendanceSheet__legend-item">
              {renderStatusIcon('W')} <span className="AttendanceSheet__legend-text">Weekend</span>
            </div>
            <div className="AttendanceSheet__legend-item">
              {renderStatusIcon('P')} <span className="AttendanceSheet__legend-text">Present</span>
            </div>
            <div className="AttendanceSheet__legend-item">
              {renderStatusIcon('L')} <span className="AttendanceSheet__legend-text">Leave</span>
            </div>
            <div className="AttendanceSheet__legend-item">
              {renderStatusIcon('H')} <span className="AttendanceSheet__legend-text">Holiday</span>
            </div>
          </div>
        </div>

        {/* Professional Scrollable Responsive Table Wrapper Structure */}
        <div className="AttendanceSheet__scroll-engine">
          <table className="AttendanceSheet__table">
            <thead>
              <tr>
                <th className="AttendanceSheet__th AttendanceSheet__th--sticky">Employee Name</th>
                {days.map((day) => (
                  <th key={day} className="AttendanceSheet__th AttendanceSheet__th--day">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_MOCK_DATA.map((employee) => (
                <tr key={employee.id} className="AttendanceSheet__tr">
                  <td className="AttendanceSheet__td AttendanceSheet__td--sticky">
                    <div className="AttendanceSheet__profile-container">
                      <img src={employee.avatar} alt={`${employee.firstName}`} className="AttendanceSheet__avatar" />
                      <div className="AttendanceSheet__name-stack">
                        <span className="AttendanceSheet__first-name">{employee.firstName}</span>
                        <span className="AttendanceSheet__last-name">{employee.lastName}</span>
                      </div>
                    </div>
                  </td>
                  {days.map((day, indexedDay) => (
                    <td key={day} className="AttendanceSheet__td AttendanceSheet__td--center">
                      {renderStatusIcon(employee.status[indexedDay % employee.status.length])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Design Component System Settings Badge Gear */}
      <div className="AttendanceSheet__floating-gear">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
    </div>
  );
};

export default AttendanceSheet;