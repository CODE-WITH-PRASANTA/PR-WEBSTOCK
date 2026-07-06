import React, { useState, useRef, useEffect } from 'react';
import { 
  LuSearch, 
  LuSlidersHorizontal, 
  LuRefreshCw, 
  LuDownload, 
  LuEye, 
  LuChevronLeft, 
  LuChevronRight 
} from 'react-icons/lu';
import { FiCalendar, FiHome } from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Invoices.css';

const INITIAL_DATA = [
  { id: "INV-001", project: "E-Commerce Pla...", amount: "$5,000.00", billingDate: "01/10/2024", dueDate: "01/25/2024", status: "Paid" },
  { id: "INV-005", project: "HR Management...", amount: "$3,500.00", billingDate: "01/15/2024", dueDate: "01/30/2024", status: "Unpaid" },
  { id: "INV-010", project: "Mobile Banking ...", amount: "$12,000.00", billingDate: "12/01/2023", dueDate: "12/15/2023", status: "Overdue" },
  { id: "INV-012", project: "E-Commerce Pla...", amount: "$1,200.00", billingDate: "02/01/2024", dueDate: "02/15/2024", status: "Unpaid" },
];

const Invoices = () => {
  const [invoices, setInvoices] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dropdownRef = useRef(null);
  const tableContainerRef = useRef(null);

  // Column Visibility States
  const [visibleColumns, setVisibleColumns] = useState({
    invoiceNo: true,
    project: true,
    amount: true,
    billingDate: true,
    dueDate: true,
    status: true,
    details: true,
    download: true
  });

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Refresh Table Action
  const handleRefresh = () => {
    setInvoices([]);
    setTimeout(() => {
      setInvoices(INITIAL_DATA);
      setCurrentPage(1);
    }, 400);
  };

  // 2. Clear & Robust Download PDF Functionality for Table Data Layout Only
  const handleDownloadPDF = () => {
    const element = tableContainerRef.current;
    
    html2canvas(element, {
      scale: 2,
      useCORS: true,
      ignoreElements: (el) => el.classList.contains('no-print')
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 size width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Invoices_Table_Report.pdf');
    });
  };

  const downloadSingleInvoice = (id) => {
    alert(`Downloading receipt document copy for: ${id}`);
  };

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // Filter Logic matching search input state strings
  const filteredInvoices = invoices.filter(item => 
    item.id.toLowerCase().includes(search.toLowerCase()) || 
    item.project.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic calculations
  const totalItems = filteredInvoices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  // Adjust current page window context if records shrink out of view bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);

  const startRange = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const endRange = Math.min(indexOfLastItem, totalItems);

  return (
    <div className="Invoices-page-wrapper">
      {/* Page Title & Breadcrumbs */}
      <div className="Invoices-top-bar">
        <h1 className="Invoices-title">Invoices</h1>
        <div className="Invoices-breadcrumb">
          <FiHome className="Invoices-bread-icon" />
          <span>&gt; Billing &gt; <span className="Invoices-active-bread">Invoices</span></span>
        </div>
      </div>

      {/* Main Container Layout wrapper */}
      <div className="Invoices-card" ref={tableContainerRef}>
        
        {/* Table Control Header Panel */}
        <div className="Invoices-control-header no-print">
          <div className="Invoices-left-controls">
            <span className="Invoices-list-title">Invoices List</span>
            <div className="Invoices-search-container">
              <LuSearch className="Invoices-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset page context window index lookup on typing
                }}
                className="Invoices-search-input"
              />
            </div>
          </div>

          <div className="Invoices-right-controls">
            {/* Column Hide/Show Button Component Trigger */}
            <div className="Invoices-dropdown-container" ref={dropdownRef}>
              <button className="Invoices-icon-btn" onClick={() => setShowDropdown(!showDropdown)}>
                <LuSlidersHorizontal />
              </button>

              {/* Reference UI Checkbox Popover Overlay Box Layout */}
              {showDropdown && (
                <div className="Invoices-col-dropdown">
                  <div className="Invoices-dropdown-header">Show/Hide Column</div>
                  <div className="Invoices-dropdown-body">
                    {Object.keys(visibleColumns).map((col) => (
                      <label key={col} className="Invoices-checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={visibleColumns[col]} 
                          onChange={() => toggleColumn(col)} 
                        />
                        <span className="Invoices-custom-checkbox"></span>
                        {col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="Invoices-icon-btn" onClick={handleRefresh} title="Refresh Table View Data">
              <LuRefreshCw />
            </button>
            <button className="Invoices-icon-btn Invoices-download-all" onClick={handleDownloadPDF} title="Download Complete Table PDF Data">
              <LuDownload />
            </button>
          </div>
        </div>

        {/* Dynamic Table Responsive Frame Structure Row map layout */}
        <div className="Invoices-table-responsive">
          <table className="Invoices-html-table">
            <thead>
              <tr>
                {visibleColumns.invoiceNo && <th>Invoice No</th>}
                {visibleColumns.project && <th>Project</th>}
                {visibleColumns.amount && <th>Amount</th>}
                {visibleColumns.billingDate && <th>Billing Date</th>}
                {visibleColumns.dueDate && <th>Due Date</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.details && <th>Details</th>}
                {visibleColumns.download && <th>Download</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((row) => (
                  <tr key={row.id}>
                    {visibleColumns.invoiceNo && <td className="Invoices-id-cell">{row.id}</td>}
                    {visibleColumns.project && <td>{row.project}</td>}
                    {visibleColumns.amount && <td className="Invoices-amount-cell">{row.amount}</td>}
                    {visibleColumns.billingDate && (
                      <td>
                        <div className="Invoices-date-wrapper">
                          <FiCalendar className="Invoices-cal-icon" /> {row.billingDate}
                        </div>
                      </td>
                    )}
                    {visibleColumns.dueDate && (
                      <td>
                        <div className="Invoices-date-wrapper">
                          <FiCalendar className="Invoices-cal-icon" /> {row.dueDate}
                        </div>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td>
                        <span className={`Invoices-status-badge Invoices-status-${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.details && (
                      <td>
                        <button className="Invoices-row-action-btn"><LuEye /></button>
                      </td>
                    )}
                    {visibleColumns.download && (
                      <td>
                        <button className="Invoices-row-action-btn" onClick={() => downloadSingleInvoice(row.id)}>
                          <LuDownload />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="Invoices-empty-table-cell">No record entries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Connected Functional Pagination Footer */}
        <div className="Invoices-footer-pagination no-print">
          <div className="Invoices-pagination-right">
            <span className="Invoices-page-text">Items per page:</span>
            <select 
              className="Invoices-page-select" 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            
            <span className="Invoices-page-range">
              {startRange} – {endRange} of {totalItems}
            </span>
            
            <div className="Invoices-page-nav-btns">
              <button 
                className="Invoices-nav-btn" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <LuChevronLeft />
              </button>
              <button 
                className="Invoices-nav-btn" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <LuChevronRight />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Invoices;