import React, { useState, useMemo, useRef, useEffect } from 'react';
import './ExpenseReport.css';

// 13 detailed records to properly fulfill the "1-10 of 13" condition from Screenshot 2026-07-03 140425.png
const DUMMY_EXPENSES = [
  { id: 'EXP-001', invoiceNo: '1008', date: '02/12/2022', expenseType: 'New Laptop', expenseBy: 'John Deo', amount: '$158', paymentMode: 'Cash', status: 'Paid', paidTo: 'Flipkart', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 'EXP-002', invoiceNo: '8965', date: '02/15/2022', expenseType: 'Advertising', expenseBy: 'Sarah Smith', amount: '$568', paymentMode: 'Cheque', status: 'Unpaid', paidTo: 'Anand Advertising', avatar: 'https://i.pravatar.cc/150?img=49' },
  { id: 'EXP-003', invoiceNo: '4587', date: '02/18/2022', expenseType: 'Insurance Premium', expenseBy: 'Edna Gilbert', amount: '$2458', paymentMode: 'Credit Card', status: 'Paid', paidTo: 'Max Life Premium', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 'EXP-004', invoiceNo: '5897', date: '02/19/2022', expenseType: 'Employee Salary', expenseBy: 'Shelia Osterb...', amount: '$12875', paymentMode: 'Cash', status: 'Paid', paidTo: 'Employee', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'EXP-005', invoiceNo: '2258', date: '02/22/2022', expenseType: 'Electricity Bill', expenseBy: 'Barbara Garla...', amount: '$365', paymentMode: 'Cheque', status: 'Paid', paidTo: 'Torrent Power', avatar: 'https://i.pravatar.cc/150?img=28' },
  { id: 'EXP-006', invoiceNo: '1236', date: '03/12/2022', expenseType: 'Transportation', expenseBy: 'Sarah Smith', amount: '$54', paymentMode: 'Cheque', status: 'Paid', paidTo: 'Bharat Travels', avatar: 'https://i.pravatar.cc/150?img=45' },
  { id: 'EXP-007', invoiceNo: '9517', date: '03/25/2022', expenseType: 'Postage and shippi...', expenseBy: 'Marie Brodsky', amount: '$412', paymentMode: 'Credit Card', status: 'Paid', paidTo: 'Abc Transport', avatar: 'https://i.pravatar.cc/150?img=35' },
  { id: 'EXP-008', invoiceNo: '7538', date: '04/10/2022', expenseType: 'Rent', expenseBy: 'Kara Thomps...', amount: '$228', paymentMode: 'Cash', status: 'Unpaid', paidTo: 'Rajesh Shukla', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: 'EXP-009', invoiceNo: '8569', date: '04/15/2022', expenseType: 'Business meals', expenseBy: 'Joseph Nye', amount: '$184', paymentMode: 'Credit Card', status: 'Paid', paidTo: 'Taj Hotel', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'EXP-010', invoiceNo: '2547', date: '05/05/2022', expenseType: 'Charitable contribut...', expenseBy: 'Ricardo Wen...', amount: '$149', paymentMode: 'Cash', status: 'Paid', paidTo: 'Kirti Oldage Home', avatar: 'https://i.pravatar.cc/150?img=60' },
  { id: 'EXP-011', invoiceNo: '3124', date: '05/18/2022', expenseType: 'Office Supplies', expenseBy: 'John Deo', amount: '$95', paymentMode: 'Cash', status: 'Paid', paidTo: 'Staples', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 'EXP-012', invoiceNo: '6641', date: '06/02/2022', expenseType: 'Software License', expenseBy: 'Edna Gilbert', amount: '$1200', paymentMode: 'Credit Card', status: 'Paid', paidTo: 'Adobe Inc', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 'EXP-013', invoiceNo: '7723', date: '06/20/2022', expenseType: 'Internet Bill', expenseBy: 'Sarah Smith', amount: '$89', paymentMode: 'Cash', status: 'Unpaid', paidTo: 'Verizon', avatar: 'https://i.pravatar.cc/150?img=49' }
];

const COLUMNS_MASTER = [
  { key: 'id', label: 'ID' },
  { key: 'invoiceNo', label: 'Invoice No' },
  { key: 'date', label: 'Date' },
  { key: 'expenseType', label: 'Expense Type' },
  { key: 'expenseBy', label: 'Expense By' },
  { key: 'amount', label: 'Amount' },
  { key: 'paymentMode', label: 'Payment Mode' },
  { key: 'status', label: 'Status' },
  { key: 'paidTo', label: 'Paid To' }
];

const ExpenseReport = () => {
  const [data, setData] = useState(DUMMY_EXPENSES);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  
  // Custom columns logic matching Screenshot 2026-07-03 140456.png (ID is unchecked/hidden by default)
  const [visibleColumns, setVisibleColumns] = useState({
    id: false,
    invoiceNo: true,
    date: true,
    expenseType: true,
    expenseBy: true,
    amount: true,
    paymentMode: true,
    status: true,
    paidTo: true
  });

  const dropdownRef = useRef(null);

  // Close visibility dropmenu when clicking outside boundaries
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Action Button Events
  const triggerRefresh = () => {
    setSearch('');
    setCurrentPage(1);
    setData(DUMMY_EXPENSES);
  };

  const triggerDownload = () => {
    alert('Exporting spreadsheet data via Xlsx Download pipeline...');
  };

  const handleToggleColumn = (colKey) => {
    setVisibleColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  // Searching computation matching multiple parameters
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.expenseType.toLowerCase().includes(search.toLowerCase()) ||
      item.expenseBy.toLowerCase().includes(search.toLowerCase()) ||
      item.invoiceNo.includes(search) ||
      item.paidTo.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Pagination bounds computations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const activePageData = useMemo(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(offset, offset + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const recordStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const recordEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="er-main-container">
      {/* Structural Path / Nav Header */}
      <div className="er-nav-header">
        <h2 className="er-main-title">Expense Report</h2>
        <div className="er-breadcrumbs">
          <span className="er-home-icon">🏠</span>
          <span className="er-divider">&gt;</span>
          <span>Reports</span>
          <span className="er-divider">&gt;</span>
          <span className="er-active-crumb">Expense Report</span>
        </div>
      </div>

      {/* Primary Data Grid Panel */}
      <div className="er-grid-panel">
        
        {/* Dynamic Action Header Toolbar */}
        <div className="er-action-toolbar">
          <div className="er-toolbar-left-group">
            <span className="er-section-heading">Expense Report</span>
            <div className="er-search-input-box">
              <span className="er-search-lens">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="er-native-input"
              />
            </div>
          </div>
          
          <div className="er-toolbar-right-group">
            {/* Show/Hide Columns Component Dropdown */}
            <div className="er-dropdown-anchor" ref={dropdownRef}>
              <button 
                className={`er-utility-btn ${isOpenDropdown ? 'er-active-btn' : ''}`}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                title="Show/Hide Columns"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5c59cc" strokeWidth="2">
                  <path d="M4 6h16M6 12h12M9 18h6"/>
                </svg>
              </button>

              {/* Popover Selection Box */}
              <div className={`er-column-popover ${isOpenDropdown ? 'er-popover-visible' : ''}`}>
                <div className="er-popover-header">Show/Hide Column</div>
                <div className="er-popover-scroller">
                  {COLUMNS_MASTER.map(col => (
                    <label key={col.key} className="er-checkbox-row">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col.key]} 
                        onChange={() => handleToggleColumn(col.key)} 
                      />
                      <span className="er-custom-check-box"></span>
                      <span className="er-checkbox-label">{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Record Insertion Control Button */}
            <button className="er-utility-btn" title="Add New Expense Row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00C851" strokeWidth="2"/>
                <path d="M12 7v10M7 12h10" stroke="#00C851" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Refresh Interactive Icon */}
            <button className="er-utility-btn" onClick={triggerRefresh} title="Reset Filter States">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5A2B" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19"/>
              </svg>
            </button>

            {/* Download Icon Wrapper with custom CSS Tooltip context layout */}
            <div className="er-tooltip-container">
              <button className="er-utility-btn" onClick={triggerDownload}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4D77FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </button>
              <div className="er-hover-tooltip">Xlsx Download</div>
            </div>
          </div>
        </div>

        {/* Content Table Responsive Scrolling Block */}
        <div className="er-table-scroll-viewport">
          <table className="er-data-table">
            <thead>
              <tr>
                {COLUMNS_MASTER.map(col => visibleColumns[col.key] && (
                  <th key={col.key} className={`er-th-${col.key}`}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activePageData.length > 0 ? (
                activePageData.map((row) => (
                  <tr key={row.id}>
                    {visibleColumns.id && <td className="er-bold-text">{row.id}</td>}
                    {visibleColumns.invoiceNo && <td>{row.invoiceNo}</td>}
                    {visibleColumns.date && (
                      <td>
                        <div className="er-date-layout-box">
                          <span className="er-calendar-glyph">📅</span>
                          <span>{row.date}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.expenseType && <td>{row.expenseType}</td>}
                    {visibleColumns.expenseBy && (
                      <td>
                        <div className="er-identity-cell-box">
                          <img src={row.avatar} alt={row.expenseBy} className="er-avatar-img" />
                          <span className="er-identity-name">{row.expenseBy}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.amount && <td className="er-bold-text">{row.amount}</td>}
                    {visibleColumns.paymentMode && <td>{row.paymentMode}</td>}
                    {visibleColumns.status && (
                      <td>
                        <span className={`er-badge ${row.status.toLowerCase() === 'paid' ? 'er-badge-paid' : 'er-badge-unpaid'}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.paidTo && <td>{row.paidTo}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMNS_MASTER.filter(c => visibleColumns[c.key]).length} className="er-empty-fallback-row">
                    No matching operational records could be pulled.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right Aligned Data Navigation Pagination Element */}
        <div className="er-pagination-container">
          <div className="er-pagination-right-dock">
            <span className="er-pagination-text-label">Items per page:</span>
            <div className="er-custom-select-box">
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="er-select-element"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>

            <span className="er-pagination-range-display">
              {recordStart} – {recordEnd} of {totalItems}
            </span>

            <div className="er-navigation-button-cluster">
              <button 
                className="er-nav-arrow-trigger" 
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button 
                className="er-nav-arrow-trigger" 
                onClick={() => setCurrentPage(p => Math.max(Math.min(p + 1, totalPages), 1))}
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

export default ExpenseReport;