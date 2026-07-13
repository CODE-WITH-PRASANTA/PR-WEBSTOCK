import React, { useState } from 'react';
import './History.css';

const History = () => {
  const [columns, setColumns] = useState({
    id: true, subject: true, category: true, status: true, priority: true, raised: true, resolved: true
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    { id: 'TKT-101', subject: 'Login Issue', category: 'Technical', status: 'Resolved', priority: 'High', raised: '01/05/2024', resolved: '01/06/2024' },
    { id: 'TKT-105', subject: 'Invoice Query', category: 'Billing', status: 'In Progress', priority: 'Medium', raised: '01/10/2024', resolved: '-' },
    { id: 'TKT-110', subject: 'API Documentation', category: 'Project', status: 'Resolved', priority: 'Low', raised: '01/15/2024', resolved: '01/16/2024' },
    { id: 'TKT-115', subject: 'Server Slowdown', category: 'Technical', status: 'Open', priority: 'Critical', raised: '01/20/2024', resolved: '-' },
    { id: 'TKT-120', subject: 'Wrong Billing Address', category: 'Billing', status: 'Closed', priority: 'Medium', raised: '12/20/2023', resolved: '12/22/2023' },
  ];

  const handleRefresh = () => window.location.reload();
  const handleDownload = () => alert("Downloading CSV Report...");

  return (
    <div className="history-container">
      <header className="history-header">
        <h2 className="history-title">Support Ticket History</h2>
        <div className="history-actions">
          <input type="text" placeholder="Search" className="history-search" />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>⋮</button>
          <button onClick={handleRefresh}>⟳</button>
          <button onClick={handleDownload}>⤓</button>
          
          {isMenuOpen && (
            <div className="column-dropdown">
              <p>Show/Hide Column</p>
              {Object.keys(columns).map(col => (
                <label key={col}>
                  <input type="checkbox" checked={columns[col]} onChange={() => setColumns({...columns, [col]: !columns[col]})} />
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </label>
              ))}
            </div>
          )}
        </div>
      </header>

      <table className="history-table">
        <thead>
          <tr>
            {columns.id && <th>Ticket ID</th>}
            {columns.subject && <th>Subject</th>}
            {columns.category && <th>Category</th>}
            {columns.status && <th>Status</th>}
            {columns.priority && <th>Priority</th>}
            {columns.raised && <th>Raised Date</th>}
            {columns.resolved && <th>Resolved Date</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {columns.id && <td>{row.id}</td>}
              {columns.subject && <td>{row.subject}</td>}
              {columns.category && <td>{row.category}</td>}
              {columns.status && <td><span className={`badge ${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>}
              {columns.priority && <td>{row.priority}</td>}
              {columns.raised && <td>{row.raised}</td>}
              {columns.resolved && <td>{row.resolved}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>Items per page: </span>
        <select value={itemsPerPage} disabled><option>5</option></select>
        <span>1 - 5 of 5</span>
        <button>&lt;</button> <button>&gt;</button>
      </div>
    </div>
  );
};

export default History;