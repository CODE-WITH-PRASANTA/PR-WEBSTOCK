import React, { useState } from 'react';
import './TeamPerformance.css';

const TeamPerformance = () => {
  const initialData = [
    { id: 1, name: 'John Doe', reviewPeriod: '2023 Q1', rating: 4, status: 'Completed', avatar: 'https://i.pravatar.cc/150?img=32' },
    { id: 2, name: 'Sarah Smith', reviewPeriod: '2023 Q1', rating: 5, status: 'Completed', avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: 3, name: 'Robert Johnson', reviewPeriod: '2023 Q1', rating: 3, status: 'In Review', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Michael Brown', reviewPeriod: '2023 Q2', rating: 4, status: 'Completed', avatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 5, name: 'Emily Davis', reviewPeriod: '2023 Q2', rating: 5, status: 'Draft', avatar: 'https://i.pravatar.cc/150?img=49' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    employee: true,
    reviewPeriod: true,
    rating: true,
    status: true
  });
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = initialData.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="performance-container">
      {/* Breadcrumbs */}
      <div className="breadcrumb-container">
        <h2 className="main-title">Team Performance</h2>
        <div className="breadcrumbs">
          <svg className="breadcrumb-home-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#5f6368"/>
          </svg>
          <span className="separator">&gt;</span>
          <span>My Team</span>
          <span className="separator">&gt;</span>
          <span className="active-breadcrumb">Performance</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="table-card">
        {/* Table Header Section */}
        <div className="table-header-actions">
          <div className="left-meta">
            <span className="section-title">Team Performance</span>
            <div className="search-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#5f6368"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="right-actions">
            {/* Filter Toggle */}
            <div className="action-dropdown-wrapper tooltip-wrapper">
              <button 
                className={`action-btn ${showColumnDropdown ? 'active' : ''}`}
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              >
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="#2b529a"/>
                </svg>
              </button>
              {!showColumnDropdown && <span className="custom-tooltip action-tooltip">Show/Hide Column</span>}
              
              {showColumnDropdown && (
                <div className="column-dropdown">
                  <div className="dropdown-title">Show/Hide Column</div>
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col]} 
                        onChange={() => toggleColumn(col)} 
                      />
                      <span className="custom-checkbox"></span>
                      {col === 'reviewPeriod' ? 'Review Period' : col.charAt(0).toUpperCase() + col.slice(1)}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Refresh */}
            <div className="tooltip-wrapper">
              <button className="action-btn" onClick={() => window.location.reload()}>
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="#6d4c41"/>
                </svg>
              </button>
              <span className="custom-tooltip action-tooltip">Refresh</span>
            </div>

            {/* Download Button - Tooltip configured to appear exclusively on pointing/hovering */}
            <div className="tooltip-wrapper">
              <button className="action-btn download-btn-style">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" fill="#1e88e5"/>
                </svg>
              </button>
              <span className="custom-tooltip action-tooltip">Xlsx Download</span>
            </div>
          </div>
        </div>

        {/* Table Content Container (Scrollbar removed) */}
        <div className="table-responsive-wrapper no-scrollbar">
          <table className="performance-table">
            <thead>
              <tr>
                {visibleColumns.employee && (
                  <th className="sortable-header">
                    <div className="header-content">
                      Employee
                      <svg className="sort-arrow" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="currentColor"/>
                      </svg>
                    </div>
                  </th>
                )}
                {visibleColumns.reviewPeriod && (
                  <th className="sortable-header">
                    <div className="header-content">
                      Review Period
                      <svg className="sort-arrow" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="currentColor"/>
                      </svg>
                    </div>
                  </th>
                )}
                {visibleColumns.rating && (
                  <th className="sortable-header">
                    <div className="header-content">
                      Rating
                      <svg className="sort-arrow" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="currentColor"/>
                      </svg>
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="sortable-header">
                    <div className="header-content">
                      Status
                      <svg className="sort-arrow" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="currentColor"/>
                      </svg>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="table-row-interactive">
                  {visibleColumns.employee && (
                    <td data-label="Employee">
                      <div className="employee-cell">
                        <img src={row.avatar} alt={row.name} className="avatar" />
                        <span className="employee-name">{row.name}</span>
                        <span className="custom-tooltip employee-tooltip">{row.name}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.reviewPeriod && <td data-label="Review Period">{row.reviewPeriod}</td>}
                  {visibleColumns.rating && <td data-label="Rating">{row.rating}</td>}
                  {visibleColumns.status && (
                    <td data-label="Status">
                      <span className={`status-badge ${row.status.toLowerCase().replace(' ', '-')}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="pagination-footer">
          <div className="items-per-page-selector">
            <span className="pagination-label">Items per page:</span>
            <div className="select-dropdown-wrapper">
              <button 
                className={`pagination-select-btn ${showPageDropdown ? 'active-select' : ''}`}
                onClick={() => setShowPageDropdown(!showPageDropdown)}
              >
                {itemsPerPage} <span className="arrow-indicator">{showPageDropdown ? '▲' : '▼'}</span>
              </button>
              {showPageDropdown && (
                <div className="select-dropdown-menu">
                  {[5, 10, 25, 100].map(num => (
                    <div 
                      key={num} 
                      className={`select-option ${itemsPerPage === num ? 'selected' : ''}`}
                      onClick={() => {
                        setItemsPerPage(num);
                        setShowPageDropdown(false);
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pagination-controls">
            <span className="pagination-info">1 – {filteredData.length} of {filteredData.length}</span>
            
            <button className="nav-arrow" type="button" aria-label="Previous page">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
              </svg>
            </button>

            <button className="nav-arrow" type="button" aria-label="Next page">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;