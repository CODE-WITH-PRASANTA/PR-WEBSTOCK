import React, { useState, useRef } from "react";
import "./Payslips.css";

// Mock Data matching your exact reference images
const initialPayslipsData = [
  { id: 1, monthYear: "December 2024", grossPay: 8905, deductions: 353, netPay: 8552, status: "Paid", payslipNo: "850655", paymentDate: "Jan 05, 2025 - 10:00 am" },
  { id: 2, monthYear: "November 2024", grossPay: 8905, deductions: 353, netPay: 8552, status: "Paid", payslipNo: "Dec 02, 2025 - 10:00 am" },
  { id: 3, monthYear: "October 2024", grossPay: 8905, deductions: 353, netPay: 8552, status: "Paid", payslipNo: "850653", paymentDate: "Jan 02, 2025 - 10:00 am" },
  { id: 4, monthYear: "September 2024", grossPay: 8905, deductions: 353, netPay: 8552, status: "Paid", payslipNo: "850652", paymentDate: "Oct 02, 2024 - 10:00 am" },
  { id: 5, monthYear: "August 2024", grossPay: 8905, deductions: 353, netPay: 8552, status: "Paid", payslipNo: "Sep 02, 2024 - 10:00 am" },
  { id: 6, monthYear: "July 2024", grossPay: 8905, deductions: 353, netPay: 8552, status: "Paid", payslipNo: "850650", paymentDate: "Aug 02, 2024 - 10:00 am" },
];

const Payslips = () => {
  const [data] = useState(initialPayslipsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Column Visibility State (Image 2)
  const [columns, setColumns] = useState({
    monthYear: true,
    grossPay: true,
    deductions: true,
    netPay: true,
    status: true,
    actions: true,
  });

  const printRef = useRef();

  // Search Filter
  const filteredData = data.filter((item) =>
    item.monthYear.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleColumn = (colName) => {
    setColumns({ ...columns, [colName]: !columns[colName] });
  };

  // Browser Print Trigger (Image 3)
  const handlePrint = () => {
    window.print();
  };

  // --- VIEW 2: Detailed View Layout (Image 3) ---
  if (selectedPayslip) {
    return (
      <div className="payslip-container-view">
        {/* Header Breadcrumbs */}
        <div className="payslip-header-row">
          <h1 className="payslip-main-title">Payslips</h1>
          <div className="payslip-breadcrumbs">
            <span>🏠</span> <span>&gt; Payroll &gt; Payslips</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="payslip-actions-nav">
          <button onClick={() => setSelectedPayslip(null)} className="back-btn">
            ← Back to List
          </button>
        </div>

        {/* Payslip Card Container */}
        <div className="detailed-card-box">
          <h2 className="detailed-sub-title">Payslip - {selectedPayslip.monthYear}</h2>
          
          {/* Printable Area */}
          <div ref={printRef} className="printable-payslip-area">
            <p className="payslip-meta-title-top">
              PAYSLIP FOR THE MONTH OF {selectedPayslip.monthYear.toUpperCase()}
            </p>

            {/* Payslip Meta Info */}
            <div className="payslip-meta-grid">
              <div>
                <strong>Payslip No.:</strong>
                <p>{selectedPayslip.payslipNo}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <strong>Payment Date:</strong>
                <p>{selectedPayslip.paymentDate}</p>
              </div>
            </div>

            {/* Company & Employee Details */}
            <div className="company-employee-details">
              <div>
                <div className="company-logo-area">
                  <div className="company-logo-circle">⭐</div>
                  <span className="company-name">Redstar Theme</span>
                </div>
                <p className="address-text">
                  123, Business Square<br />Tech City<br />India<br />Email: hr@example.com
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="employee-name">Payment To: Sarah Smith</p>
                <p className="address-text">
                  Home Address Line 1<br />Local Area<br />India<br />Email: sarah@example.com
                </p>
              </div>
            </div>

            {/* Earnings & Deductions Tables */}
            <div className="tables-split-grid">
              {/* Earnings Table */}
              <div>
                <h3 className="table-block-title">Earnings</h3>
                <table className="breakdown-table">
                  <tbody>
                    <tr className="bg-stripe"><td>Basic</td><td className="text-right">$8,568</td></tr>
                    <tr><td>HRA</td><td className="text-right">$125</td></tr>
                    <tr className="bg-stripe"><td>DA</td><td className="text-right">$87</td></tr>
                    <tr><td>Special Allowance</td><td className="text-right">$50</td></tr>
                    <tr className="bg-stripe"><td>Bonus</td><td className="text-right">$75</td></tr>
                    <tr className="bg-total-blue"><td><strong>Total Earnings</strong></td><td className="text-right"><strong>${selectedPayslip.grossPay}</strong></td></tr>
                  </tbody>
                </table>
              </div>

              {/* Deductions Table */}
              <div>
                <h3 className="table-block-title">Deductions</h3>
                <table className="breakdown-table">
                  <tbody>
                    <tr className="bg-stripe"><td>Provident Fund</td><td className="text-right">$10</td></tr>
                    <tr><td>Professional Tax</td><td className="text-right">$20</td></tr>
                    <tr className="bg-stripe"><td>TDS</td><td className="text-right">$323</td></tr>
                    <tr><td>&nbsp;</td><td className="text-right"></td></tr>
                    <tr className="bg-stripe"><td>&nbsp;</td><td className="text-right"></td></tr>
                    <tr className="bg-total-red"><td><strong>Total Deductions</strong></td><td className="text-right"><strong>${selectedPayslip.deductions}</strong></td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Net Pay Section */}
            <div className="net-pay-summary-block">
              <p className="net-pay-text">Net Pay: <span>${selectedPayslip.netPay}.00</span></p>
              <p className="net-pay-words">Eight Thousand Five Hundred Fifty Two Only</p>
            </div>

            {/* Signature */}
            <div className="signature-block">
              <p className="sig-company">For Redstar Theme</p>
              <p className="sig-title">Authorised Signatory</p>
            </div>
          </div>

          {/* Print Button */}
          <div className="print-btn-wrap">
            <button onClick={handlePrint} className="print-action-btn">
              🖨️ Print Payslip
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 1: Dashboard Main Layout (Image 1 & 2) ---
  return (
    <div className="payslip-container-view">
      
      {/* Top Header Row */}
      <div className="payslip-header-row">
        <h1 className="payslip-main-title">Payslips</h1>
        <div className="payslip-breadcrumbs">
          <span>🏠</span> <span>&gt; Payroll &gt; Payslips</span>
        </div>
      </div>

      {/* Main Table Container Box */}
      <div className="table-card-container">
        
        {/* Search & Utility Bar */}
        <div className="table-utility-bar">
          <div className="utility-left-side">
            <span className="section-label">My Payslips</span>
            
            {/* Search Input Box */}
            <div className="search-box-wrapper">
              <span className="search-icon-inside">🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-field"
              />
            </div>
          </div>

          {/* Action Tools Right Side */}
          <div className="utility-right-side">
            {/* Show/Hide Column Trigger */}
            <button onClick={() => setShowDropdown(!showDropdown)} className="icon-tool-btn" title="Show/Hide Columns">
              Tune ⚙️
            </button>
            <button className="icon-tool-btn" title="Refresh">🔄</button>
            <button className="icon-tool-btn" title="Download All">📥</button>

            {/* Dropdown Menu (Image 2 View) */}
            {showDropdown && (
              <div className="custom-dropdown-popover">
                <div className="dropdown-heading">Show/Hide Column</div>
                <div className="dropdown-options-list">
                  {Object.keys(columns).map((col) => (
                    <label key={col} className="dropdown-item-row">
                      <input
                        type="checkbox"
                        checked={columns[col]}
                        onChange={() => toggleColumn(col)}
                        className="checkbox-input"
                      />
                      <span className="column-name-label">
                        {col === 'monthYear' ? 'Month & Year' : 
                         col === 'grossPay' ? 'Gross Pay' : 
                         col === 'deductions' ? 'Deductions' : 
                         col === 'netPay' ? 'Net Pay' : col}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Data Table */}
        <div className="responsive-table-wrapper">
          <table className="main-data-table">
            <thead>
              <tr>
                {columns.monthYear && <th>Month & Year</th>}
                {columns.grossPay && <th>Gross Pay ↑</th>}
                {columns.deductions && <th>Deductions</th>}
                {columns.netPay && <th>Net Pay</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th style={{ textAlign: "center" }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id}>
                    {columns.monthYear && <td className="font-bold-cell">{row.monthYear}</td>}
                    {columns.grossPay && <td>{row.grossPay}</td>}
                    {columns.deductions && <td>{row.deductions}</td>}
                    {columns.netPay && <td className="font-bold-cell">{row.netPay}</td>}
                    {columns.status && (
                      <td>
                        <span className="status-badge-paid">{row.status}</span>
                      </td>
                    )}
                    {columns.actions && (
                      <td style={{ textAlign: "center" }}>
                        <button onClick={() => setSelectedPayslip(row)} className="action-edit-btn" title="View Details">
                          📝
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#999" }}>
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar Footer */}
        <div className="pagination-footer-bar">
          <div className="pagination-items-per-page">
            <span>Items per page:</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="select-pagination-dropdown"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          
          <div className="pagination-right-controls">
            <span>1 – {filteredData.length} of {filteredData.length}</span>
            <div className="pagination-nav-arrows">
              <button className="arrow-btn" disabled>&lt;</button>
              <button className="arrow-btn" disabled>&gt;</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payslips;