import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHome, 
  FaChevronRight, 
  FaSearch, 
  FaFilter, 
  FaSyncAlt, 
  FaDownload, 
  FaRegCalendarAlt, 
  FaChevronLeft,
  FaTrashAlt
} from 'react-icons/fa';
import './PaymentHistroy.css';

const initialTransactions = [
  { id: 'TXN-90123', invoice: 'INV-001', amount: 5000.00, method: 'Visa (4242)', date: '01/10/2024', status: 'Success' },
  { id: 'TXN-90125', invoice: 'INV-003', amount: 2200.00, method: 'Mastercard (5555)', date: '12/15/2023', status: 'Success' },
  { id: 'TXN-90128', invoice: 'INV-005', amount: 1500.00, method: 'Bank Transfer', date: '01/20/2024', status: 'Pending' },
  { id: 'TXN-90130', invoice: 'INV-008', amount: 500.00, method: 'Visa (4242)', date: '11/20/2023', status: 'Failed' },
  { id: 'TXN-90131', invoice: 'INV-009', amount: 1200.00, method: 'Mastercard (5555)', date: '02/14/2024', status: 'Success' },
  { id: 'TXN-90132', invoice: 'INV-012', amount: 3100.00, method: 'Bank Transfer', date: '03/02/2024', status: 'Pending' },
];

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Show/Hide Column Popover State
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [visibleColumns, setVisibleColumns] = useState({
    transactionId: true,
    invoiceNo: true,
    amount: true,
    method: true,
    paymentDate: true,
    status: true,
    actions: true
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter column dropdown auto-closer overlay hook
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(txn => 
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredTransactions.length;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startRange = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const endRange = indexOfLastItem > totalItems ? totalItems : indexOfLastItem;

  // Calculate visible columns count for proper fallback row rendering
  const activeColumnsCount = Object.values(visibleColumns).filter(Boolean).length;

  // Reset page when criteria updates
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  // Actions
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTransactions(initialTransactions);
      setSearchQuery('');
      setIsRefreshing(false);
    }, 600);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete transaction ${id}?`)) {
      setTransactions(prevTransactions => prevTransactions.filter(txn => txn.id !== id));
    }
  };

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const handleDownloadCSV = () => {
    if (transactions.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Transaction ID", "Invoice No", "Amount ($)", "Method", "Payment Date", "Status"];
    const rows = transactions.map(txn => [
      txn.id,
      txn.invoice,
      txn.amount,
      `"${txn.method}"`,
      txn.date,
      txn.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `payment_history_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="payment-history-container">
      <div className="payment-history-wrapper">
        
        {/* Top Header Dashboard Row */}
        <div className="payment-history-header">
          <h1 className="payment-history-title">Payment History</h1>
          <div className="payment-history-breadcrumbs">
            <FaHome className="breadcrumb-icon" />
            <FaChevronRight className="breadcrumb-arrow" />
            <span className="breadcrumb-link">Billing</span>
            <FaChevronRight className="breadcrumb-arrow" />
            <span className="breadcrumb-current">History</span>
          </div>
        </div>

        {/* Core Table Canvas Panel Container */}
        <div className="payment-history-card">
          
          {/* Action Toolbar Header Container */}
          <div className="payment-history-toolbar">
            <div className="toolbar-left-group">
              <span className="toolbar-segment-title">Recent Transactions</span>
              <div className="toolbar-search-box">
                <FaSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="search-input" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="toolbar-right-group" ref={dropdownRef}>
              {/* Show/Hide Filter Dropdown Popover Button */}
              <div className="dropdown-anchor-wrapper">
                <button 
                  className={`toolbar-btn ${showColumnDropdown ? 'active-btn' : ''}`} 
                  onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                  title="Show/Hide Columns"
                >
                  <FaFilter />
                </button>

                {showColumnDropdown && (
                  <div className="column-menu-popover">
                    <div className="popover-arrow"></div>
                    <div className="popover-header">Toggle Columns</div>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.transactionId} onChange={() => toggleColumn('transactionId')} />
                      <span>Transaction ID</span>
                    </label>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.invoiceNo} onChange={() => toggleColumn('invoiceNo')} />
                      <span>Invoice No</span>
                    </label>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.amount} onChange={() => toggleColumn('amount')} />
                      <span>Amount</span>
                    </label>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.method} onChange={() => toggleColumn('method')} />
                      <span>Method</span>
                    </label>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.paymentDate} onChange={() => toggleColumn('paymentDate')} />
                      <span>Payment Date</span>
                    </label>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.status} onChange={() => toggleColumn('status')} />
                      <span>Status</span>
                    </label>
                    <label className="popover-item">
                      <input type="checkbox" checked={visibleColumns.actions} onChange={() => toggleColumn('actions')} />
                      <span>Actions Control</span>
                    </label>
                  </div>
                )}
              </div>

              <button 
                className={`toolbar-btn ${isRefreshing ? 'spinning-loader' : ''}`} 
                onClick={handleRefresh}
                title="Refresh records"
                disabled={isRefreshing}
              >
                <FaSyncAlt />
              </button>
              
              <button 
                className="toolbar-btn" 
                onClick={handleDownloadCSV} 
                title="Download CSV Statement"
              >
                <FaDownload />
              </button>
            </div>
          </div>

          {/* Core Table Visual Display Layout Frame */}
          <div className="payment-history-table-responsive">
            <table className="payment-history-table">
              <thead>
                <tr>
                  {visibleColumns.transactionId && <th>Transaction ID</th>}
                  {visibleColumns.invoiceNo && <th>Invoice No</th>}
                  {visibleColumns.amount && <th>Amount</th>}
                  {visibleColumns.method && <th>Method</th>}
                  {visibleColumns.paymentDate && <th>Payment Date</th>}
                  {visibleColumns.status && <th>Status</th>}
                  {visibleColumns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((txn) => (
                    <tr key={txn.id}>
                      {visibleColumns.transactionId && <td className="txt-bold">{txn.id}</td>}
                      {visibleColumns.invoiceNo && <td>{txn.invoice}</td>}
                      {visibleColumns.amount && <td>${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>}
                      {visibleColumns.method && <td>{txn.method}</td>}
                      {visibleColumns.paymentDate && (
                        <td>
                          <div className="date-cell-align">
                            <FaRegCalendarAlt className="date-icon" />
                            <span>{txn.date}</span>
                          </div>
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td>
                          <span className={`status-badge badge-${txn.status.toLowerCase()}`}>
                            {txn.status}
                          </span>
                        </td>
                      )}
                      {visibleColumns.actions && (
                        <td>
                          <div className="action-cell-align">
                            <button 
                              className="row-delete-btn" 
                              onClick={() => handleDelete(txn.id)}
                              title="Delete record row"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeColumnsCount} className="table-empty-fallback-row">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Lower Engine Pagination Interface Block */}
          <div className="payment-history-pagination">
            <div className="pagination-config-row">
              <span className="pagination-label">Items per page:</span>
              <div className="pagination-dropdown-wrapper">
                <select 
                  className="pagination-select" 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="pagination-navigation-controls">
              <span className="pagination-counter-text">
                {startRange} – {endRange} of {totalItems}
              </span>
              <div className="pagination-btn-group">
                <button 
                  className="pagination-nav-arrow" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <FaChevronLeft />
                </button>
                <button 
                  className="pagination-nav-arrow" 
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;