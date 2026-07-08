import React, { useState, useMemo, useRef, useEffect } from 'react';
import './LeaveReport.css';

// 13 Dummy Data Items to accurately represent the pagination metadata (e.g., 1-10 of 13)
const INITIAL_LEAVE_DATA = [
  { id: '1', name: 'John Deo', date: '02/12/2022', department: 'Tesing', leaveType: 'Medical Leave', days: '05', remaining: '06', totalLeaves: '20', totalTaken: '4', carryOver: '5', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: '2', name: 'Sarah Smith', date: '02/15/2022', department: 'Designing', leaveType: 'Maternity Leave', days: '02', remaining: '12', totalLeaves: '20', totalTaken: '14', carryOver: '10', avatar: 'https://i.pravatar.cc/150?img=49' },
  { id: '3', name: 'Edna Gilbert', date: '02/18/2022', department: 'Web Developing', leaveType: 'Casual Leave', days: '01', remaining: '18', totalLeaves: '20', totalTaken: '5', carryOver: '4', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '4', name: 'Shelia Ost...', date: '02/19/2022', department: 'Tesing', leaveType: 'Emergency Leave', days: '06', remaining: '10', totalLeaves: '20', totalTaken: '8', carryOver: '9', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '5', name: 'Barbara G...', date: '02/22/2022', department: 'Accounting', leaveType: 'Emergency Leave', days: '02', remaining: '12', totalLeaves: '20', totalTaken: '7', carryOver: '3', avatar: 'https://i.pravatar.cc/150?img=28' },
  { id: '6', name: 'Sarah Smith', date: '03/12/2022', department: 'Web Developing', leaveType: 'Casual Leave', days: '06', remaining: '15', totalLeaves: '20', totalTaken: '14', carryOver: '4', avatar: 'https://i.pravatar.cc/150?img=45' },
  { id: '7', name: 'Marie Bro...', date: '03/25/2022', department: 'Designing', leaveType: 'Medical Leave', days: '01', remaining: '18', totalLeaves: '20', totalTaken: '8', carryOver: '10', avatar: 'https://i.pravatar.cc/150?img=35' },
  { id: '8', name: 'Kara Tho...', date: '04/10/2022', department: 'Tesing', leaveType: 'Maternity Leave', days: '02', remaining: '12', totalLeaves: '20', totalTaken: '10', carryOver: '5', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: '9', name: 'Joseph Nye', date: '04/15/2022', department: 'Accounting', leaveType: 'Casual Leave', days: '04', remaining: '15', totalLeaves: '20', totalTaken: '7', carryOver: '4', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '10', name: 'Ricardo W...', date: '05/05/2022', department: 'Web Developing', leaveType: 'Emergency Leave', days: '05', remaining: '10', totalLeaves: '20', totalTaken: '8', carryOver: '9', avatar: 'https://i.pravatar.cc/150?img=60' },
  { id: '11', name: 'Alice Alex', date: '05/12/2022', department: 'Tesing', leaveType: 'Casual Leave', days: '03', remaining: '17', totalLeaves: '20', totalTaken: '3', carryOver: '2', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '12', name: 'Bob Johnson', date: '06/01/2022', department: 'Accounting', leaveType: 'Medical Leave', days: '02', remaining: '18', totalLeaves: '20', totalTaken: '2', carryOver: '0', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '13', name: 'Charlie Ray', date: '06/14/2022', department: 'Designing', leaveType: 'Emergency Leave', days: '04', remaining: '16', totalLeaves: '20', totalTaken: '4', carryOver: '1', avatar: 'https://i.pravatar.cc/150?img=8' }
];

const COLUMNS_CONFIG = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'date', label: 'Date' },
  { key: 'department', label: 'Department' },
  { key: 'leaveType', label: 'Leave Type' },
  { key: 'days', label: 'Number of Days' },
  { key: 'remaining', label: 'Remaining Leaves' },
  { key: 'totalLeaves', label: 'Total Leaves' },
  { key: 'totalTaken', label: 'Total Taken' },
  { key: 'carryOver', label: 'Carry Over' }
];

const LeaveReport = () => {
  // State variables
  const [data, setData] = useState(INITIAL_LEAVE_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: false, // Default hidden based on Screenshot 2026-07-03 134041.png
    name: true,
    date: true,
    department: true,
    leaveType: true,
    days: true,
    remaining: true,
    totalLeaves: true,
    totalTaken: true,
    carryOver: true
  });

  const dropdownRef = useRef(null);

  // Close visibility dropdown clicking outside smoothly
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Actions
  const handleRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setData(INITIAL_LEAVE_DATA);
  };

  const handleDownload = () => {
    alert('Simulating Xlsx Download structural export...');
  };

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Pagination Logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="lr-container">
      {/* Header Breadcrumb Nav Row */}
      <div className="lr-header-nav">
        <h2 className="lr-title">Leave Report</h2>
        <div className="lr-breadcrumb">
          <span className="lr-icon-home">🏠</span>
          <span className="lr-arrow">&gt;</span>
          <span>Reports</span>
          <span className="lr-arrow">&gt;</span>
          <span className="lr-active-crumb">Leave Report</span>
        </div>
      </div>

      {/* Main Table Panel container */}
      <div className="lr-panel">
        
        {/* Action Top Toolbar Section */}
        <div className="lr-toolbar">
          <div className="lr-toolbar-left">
            <span className="lr-panel-label">Leave Report</span>
            <div className="lr-search-wrapper">
              <span className="lr-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="lr-search-input"
              />
            </div>
          </div>
          
          <div className="lr-toolbar-right">
            {/* Columns Toggle Trigger Button */}
            <div className="lr-dropdown-container" ref={dropdownRef}>
              <button 
                className={`lr-action-btn lr-filter-toggle ${showColumnDropdown ? 'active' : ''}`}
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                title="Show/Hide Columns"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M6 12h12M9 18h6"/>
                </svg>
              </button>

              {/* Column visibility dropmenu dropdown */}
              <div className={`lr-column-dropdown ${showColumnDropdown ? 'open' : ''}`}>
                <div className="lr-dropdown-title">Show/Hide Column</div>
                <div className="lr-dropdown-list">
                  {COLUMNS_CONFIG.map(col => (
                    <label key={col.key} className="lr-dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col.key]} 
                        onChange={() => toggleColumn(col.key)} 
                      />
                      <span className="lr-checkbox-custom"></span>
                      <span className="lr-label-text">{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Add Record Dummy Button */}
            <button className="lr-action-btn lr-btn-add" title="Add Entry">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00C851" strokeWidth="2"/>
                <path d="M12 7v10M7 12h10" stroke="#00C851" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Refresh Action Trigger */}
            <button className="lr-action-btn lr-btn-refresh" onClick={handleRefresh} title="Refresh Table Data">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5A2B" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19"/>
              </svg>
            </button>

            {/* Excel Download Action Trigger with Interactive Tooltip context */}
            <div className="lr-tooltip-wrapper">
              <button className="lr-action-btn lr-btn-download" onClick={handleDownload}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4D77FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </button>
              <div className="lr-tooltip">Xlsx Download</div>
            </div>
          </div>
        </div>

        {/* Responsive Table Layout Wrapper container */}
        <div className="lr-table-scroll-container">
          <table className="lr-table">
            <thead>
              <tr>
                {COLUMNS_CONFIG.map(col => visibleColumns[col.key] && (
                  <th key={col.key} className={`th-${col.key}`}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map((row) => (
                  <tr key={row.id}>
                    {visibleColumns.id && <td>{row.id}</td>}
                    {visibleColumns.name && (
                      <td>
                        <div className="lr-user-cell">
                          <img src={row.avatar} alt={row.name} className="lr-avatar" />
                          <span className="lr-user-name">{row.name}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.date && (
                      <td>
                        <div className="lr-date-cell">
                          <span className="lr-calendar-icon">📅</span>
                          <span>{row.date}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.department && <td>{row.department}</td>}
                    {visibleColumns.leaveType && <td>{row.leaveType}</td>}
                    {visibleColumns.days && <td className="lr-txt-center">{row.days}</td>}
                    {visibleColumns.remaining && <td className="lr-txt-center">{row.remaining}</td>}
                    {visibleColumns.totalLeaves && <td className="lr-txt-center">{row.totalLeaves}</td>}
                    {visibleColumns.totalTaken && <td className="lr-txt-center">{row.totalTaken}</td>}
                    {visibleColumns.carryOver && <td className="lr-txt-center">{row.carryOver}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMNS_CONFIG.filter(c => visibleColumns[c.key]).length} className="lr-no-data">
                    No corresponding matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Responsive Right Aligned Pagination Component matching Screenshot 2026-07-03 134144.png */}
        <div className="lr-pagination-bar">
          <div className="lr-pagination-right-group">
            <span className="lr-pagination-label">Items per page:</span>
            <div className="lr-select-wrapper">
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="lr-page-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>

            <span className="lr-pagination-info">
              {rangeStart} – {rangeEnd} of {totalItems}
            </span>

            <div className="lr-pagination-actions">
              <button 
                className="lr-page-nav-btn" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button 
                className="lr-page-nav-btn" 
                onClick={() => setCurrentPage(prev => Math.max(Math.min(prev + 1, totalPages), 1))}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaveReport;