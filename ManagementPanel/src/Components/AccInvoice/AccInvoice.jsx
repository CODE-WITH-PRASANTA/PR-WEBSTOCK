import React from 'react';
import { FiCalendar, FiPrinter } from 'react-icons/fi';
// Import your PR WEBSTOCK logo here when available:
import prWebstockLogo from '../../assets/prwebstock_logo.png'; 
import './AccInvoice.css';

const AccInvoice = () => {
  // Line items exactly matching Screenshot 2026-07-03 112803.png
  const invoiceItems = [
    { id: 1, projectName: 'Angular App', details: 'Ecommerce app', workHours: 23, hourlyCharges: 20, total: 460 },
    { id: 2, projectName: 'Angular App', details: 'Ecommerce app', workHours: 23, hourlyCharges: 20, total: 460 },
    { id: 3, projectName: 'Angular App', details: 'Ecommerce app', workHours: 23, hourlyCharges: 20, total: 460 },
    { id: 4, projectName: 'Angular App', details: 'Ecommerce app', workHours: 23, hourlyCharges: 20, total: 460 },
    { id: 5, projectName: 'Angular App', details: 'Ecommerce app', workHours: 23, hourlyCharges: 20, total: 460 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="AccInvoice-container">
      {/* Breadcrumb Header Line */}
      <div className="AccInvoice-header-nav">
        <span className="AccInvoice-title">Invoice</span>
        <div className="AccInvoice-breadcrumb">
          <span>🏠</span> &gt; <span>Accounts</span> &gt; <span className="AccInvoice-active-crumb">Invoice</span>
        </div>
      </div>

      {/* Main Card Element Block */}
      <div className="AccInvoice-card">
        
        {/* Top Typography Row Header */}
        <div className="AccInvoice-top-row">
          <h1 className="AccInvoice-main-heading">INVOICE</h1>
          <span className="AccInvoice-number">#345766</span>
        </div>

        {/* Company and Client Billing Detailed Information Strip */}
        <div className="AccInvoice-billing-details">
          <div className="AccInvoice-vendor-side">
            <div className="AccInvoice-logo-wrapper">
              {/* Fallback geometric CSS logo resembling the original layout style */}
              <div className="AccInvoice-logo-placeholder">
                <div className="slice s1"></div>
                <div className="slice s2"></div>
                <div className="slice s3"></div>
                <div className="slice s4"></div>
              </div>
              <span className="AccInvoice-company-name">PR WEBSTOCK</span>
            </div>
            <address className="AccInvoice-address">
              D 103, Kuber Solutions,<br />
              Opp. Town Hall,<br />
              Sardar Patel Road,<br />
              Ahmedabad - 380015
            </address>
          </div>

          <div className="AccInvoice-client-side">
            <div className="AccInvoice-bill-to-label">BILL TO :</div>
            <div className="AccInvoice-client-name">Jayesh Patel</div>
            <address className="AccInvoice-address text-right">
              207, Prem Sagar Appt.,<br />
              Near Income Tax Office,<br />
              Ashram Road,<br />
              Ahmedabad - 380057
            </address>

            <div className="AccInvoice-metadata-block">
              <div className="AccInvoice-meta-item">
                <span className="AccInvoice-meta-label">Invoice Date :</span>
                <span className="AccInvoice-meta-val">
                  <FiCalendar className="AccInvoice-calendar-icon" /> 14th July 2017
                </span>
              </div>
              <div className="AccInvoice-meta-item">
                <span className="AccInvoice-meta-label">Status :</span>
                <span className="AccInvoice-status-badge">Success</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dense Table Layout of Line Items */}
        <div className="AccInvoice-table-responsive">
          <table className="AccInvoice-table">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Project Name</th>
                <th>Details</th>
                <th className="text-center">Work Hours</th>
                <th className="text-right">Hourly Charges</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.projectName}</td>
                  <td>{item.details}</td>
                  <td className="text-center">{item.workHours}</td>
                  <td className="text-right">${item.hourlyCharges}</td>
                  <td className="text-right">${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aggregated Total Calculations Segment Block */}
        <div className="AccInvoice-totals-section">
          <div className="AccInvoice-totals-row">
            <span className="AccInvoice-total-label">Sub - Total amount:</span>
            <span className="AccInvoice-total-value">$2600</span>
          </div>
          <div className="AccInvoice-totals-row">
            <span className="AccInvoice-total-label">Discount :</span>
            <span className="AccInvoice-total-value">$100</span>
          </div>
          <div className="AccInvoice-totals-row border-bottom-item">
            <span className="AccInvoice-total-label">vat (10%) :</span>
            <span className="AccInvoice-total-value">$160</span>
          </div>
          <div className="AccInvoice-final-row">
            <span className="AccInvoice-final-label">Total :</span>
            <span className="AccInvoice-final-value">$2760</span>
          </div>
        </div>

        {/* Action Panel Print Feature Container */}
        <div className="AccInvoice-actions-panel">
          <button className="AccInvoice-btn-print" onClick={handlePrint}>
            <FiPrinter className="AccInvoice-print-icon" /> Print
          </button>
        </div>

      </div>
    </div>
  );
};

export default AccInvoice;