import React, { useState } from 'react';
import './AttendanceAtten.css';

const AttendanceAtten = () => {
  // Mock data representing the structure of the team attendance sheet
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('January');

  const teamData = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=33',
      attendance: ['absent', 'absent', 'absent', 'present', 'present', 'halfday', 'present', 'absent', 'holiday', 'halfday', 'holiday', 'present', 'absent', 'present', 'present', 'present', 'absent', 'present', 'absent', 'present', 'halfday', 'present', 'present', 'present', 'absent', 'halfday', 'present', 'present', 'absent', 'holiday']
    },
    {
      id: 2,
      name: 'Sarah Smith',
      avatar: 'https://i.pravatar.cc/150?img=47',
      attendance: ['present', 'present', 'halfday', 'present', 'present', 'present', 'halfday', 'present', 'halfday', 'present', 'present', 'present', 'present', 'present', 'absent', 'present', 'halfday', 'holiday', 'absent', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'halfday', 'present', 'present', 'present']
    },
    {
      id: 3,
      name: 'Mike Ross',
      avatar: 'https://i.pravatar.cc/150?img=12',
      attendance: ['present', 'halfday', 'holiday', 'present', 'holiday', 'holiday', 'present', 'present', 'present', 'halfday', 'present', 'holiday', 'present', 'absent', 'present', 'holiday', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'holiday', 'halfday', 'present']
    },
    {
      id: 4,
      name: 'Emily Blunt',
      avatar: 'https://i.pravatar.cc/150?img=49',
      attendance: ['present', 'present', 'present', 'present', 'present', 'present', 'absent', 'holiday', 'holiday', 'absent', 'holiday', 'present', 'present', 'present', 'present', 'halfday', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present', 'halfday', 'present', 'absent', 'present', 'present', 'present']
    },
    {
      id: 5,
      name: 'Deepak Rao',
      avatar: 'https://i.pravatar.cc/150?img=11',
      attendance: ['present', 'present', 'present', 'present', 'present', 'present', 'holiday', 'absent', 'present', 'present', 'present', 'absent', 'present', 'halfday', 'present', 'present', 'present', 'present', 'halfday', 'holiday', 'present', 'present', 'holiday', 'halfday', 'present', 'holiday', 'present', 'present', 'halfday', 'present']
    }
  ];

  // Generate day columns from 1 to 30
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <span className="status-icon status-present">✔</span>;
      case 'absent':
        return <span className="status-icon status-absent">✖</span>;
      case 'halfday':
        return <span className="status-icon status-halfday"></span>;
      case 'holiday':
        return <span className="status-icon status-holiday">★</span>;
      default:
        return null;
    }
  };

  return (
    <div className="attendance-container">
      {/* Breadcrumb Header */}
      <div className="attendance-header">
        <h1 className="main-title">Team Attendance</h1>
        <div className="breadcrumb">
          <span className="home-icon">🏠</span> &gt; My Team &gt; <span className="active-breadcrumb">Attendance</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="attendance-card">
        <h2 className="card-title">Team Attendance Sheet</h2>
        
        {/* Filter Controls Wrapper */}
        <div className="filters-wrapper">
          <div className="filter-group">
            <label className="filter-label label-year">Year</label>
            <select 
              className="filter-select" 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>

          <div className="filter-group group-month">
            <label className="filter-label label-month">Month</label>
            <select 
              className="filter-select select-month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <button className="search-btn">Search</button>
        </div>

        {/* Responsive Table View Wrapper */}
        <div className="table-responsive-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th className="header-member">Member Name</th>
                {days.map(day => (
                  <th key={day} className="day-header">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamData.map((member) => (
                <tr key={member.id} className="table-row">
                  <td className="member-cell">
                    <img src={member.avatar} alt={member.name} className="member-avatar" />
                    <span className="member-name">{member.name}</span>
                  </td>
                  {member.attendance.map((status, index) => (
                    <td key={index} className="status-cell">
                      {renderStatusIcon(status)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAtten;