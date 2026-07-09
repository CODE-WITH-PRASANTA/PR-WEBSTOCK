import React from 'react';
import { 
  FaHome, 
  FaChevronRight, 
  FaFileInvoice, 
  FaPrint, 
  FaDownload, 
  FaBuilding, 
  FaCalendarAlt, 
  FaFolder, 
  FaCheckCircle, 
  FaListAlt 
} from 'react-icons/fa';
import './InvoiceDetails.css';

const InvoiceDetails = () => {
  // Mock structured invoice data
  const invoiceData = {
    invoiceNo: '#INV-001',
    projectTitle: 'E-Commerce Platform Expansion',
    billingDate: 'Jan 10, 2024',
    dueDate: 'Jan 25, 2024',
    status: 'Paid',
    client: {
      company: 'Global Tech Solutions',
      address: '123 Business Ave, Suite 400, New York, NY 10001'
    },
    items: [
      { id: 1, description: 'Frontend Development (Sprint 1-2)', qty: 80, rate: 50.00 },
      { id: 2, description: 'UI/UX Design Consultation', qty: 10, rate: 80.00 },
      { id: 3, description: 'Project Management Fee', qty: 1, rate: 200.00 },
    ],
    taxRate: 0.08 // 8%
  };

  // Calculations
  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const taxAmount = subtotal * invoiceData.taxRate;
  const totalAmount = subtotal + taxAmount;

  // Print and PDF Generation Handler via Native Window Print Context
  const handlePrintOrPDF = () => {
    window.print();
  };

  return (
    <div className="InvoiceDetails-container">
      <div className="InvoiceDetails-wrapper">
        
        {/* Top Header Dashboard Breadcrumbs - Hidden during print */}
        <div className="InvoiceDetails-header no-print">
          <h1 className="InvoiceDetails-title">Invoice Details</h1>
          <div className="InvoiceDetails-breadcrumbs">
            <FaHome className="InvoiceDetails-breadcrumb-icon" />
            <FaChevronRight className="InvoiceDetails-breadcrumb-arrow" />
            <span className="InvoiceDetails-breadcrumb-link">Billing</span>
            <FaChevronRight className="InvoiceDetails-breadcrumb-arrow" />
            <span className="InvoiceDetails-breadcrumb-link">Invoices</span>
            <FaChevronRight className="InvoiceDetails-breadcrumb-arrow" />
            <span className="InvoiceDetails-breadcrumb-current">Details</span>
          </div>
        </div>

        {/* Printable Canvas Card wrapper */}
        <div className="InvoiceDetails-card">
          
          {/* Main Top Banner */}
          <div className="InvoiceDetails-banner">
            <div className="InvoiceDetails-banner-left">
              <div className="InvoiceDetails-logo-wrapper">
                <FaFileInvoice />
              </div>
              <div>
                <h2>INVOICE</h2>
                <p>{invoiceData.invoiceNo}</p>
              </div>
            </div>
            
            {/* Interactive Functional Controls - Hidden during print */}
            <div className="InvoiceDetails-banner-actions no-print">
              <button className="InvoiceDetails-btn-secondary" onClick={handlePrintOrPDF}>
                <FaPrint /> Print
              </button>
              <button className="InvoiceDetails-btn-primary" onClick={handlePrintOrPDF}>
                <FaDownload /> Download PDF
              </button>
            </div>
          </div>

          {/* Info Blocks Metadata Matrix */}
          <div className="InvoiceDetails-meta-grid">
            
            {/* Client Container */}
            <div className="InvoiceDetails-meta-block">
              <div className="InvoiceDetails-block-title">
                <FaBuilding /> BILLED TO
              </div>
              <div className="InvoiceDetails-block-content">
                <h3>{invoiceData.client.company}</h3>
                <p>{invoiceData.client.address}</p>
              </div>
            </div>

            {/* Timestamps Container */}
            <div className="InvoiceDetails-meta-block">
              <div className="InvoiceDetails-block-title">
                <FaCalendarAlt /> INVOICE DETAILS
              </div>
              <div className="InvoiceDetails-block-content date-matrix">
                <div className="date-matrix-row">
                  <span className="label">Billing Date:</span>
                  <span className="val bold-text">{invoiceData.billingDate}</span>
                </div>
                <div className="date-matrix-row">
                  <span className="label">Due Date:</span>
                  <span className="val bold-text">{invoiceData.dueDate}</span>
                </div>
                <div className="date-matrix-row">
                  <span className="label">Status:</span>
                  <span className="val">
                    <span className={`status-pill pill-${invoiceData.status.toLowerCase()}`}>
                      <FaCheckCircle /> {invoiceData.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Project References Row */}
          <div className="InvoiceDetails-project-panel">
            <div className="InvoiceDetails-block-title">
              <FaFolder /> Project Details
            </div>
            <div className="InvoiceDetails-project-name">
              {invoiceData.projectTitle}
            </div>
          </div>

          {/* Items Ledger Table Area */}
          <div className="InvoiceDetails-items-panel">
            <div className="InvoiceDetails-block-title panel-title-spacing">
              <FaListAlt /> Invoice Items
            </div>
            
            <div className="InvoiceDetails-table-responsive">
              <table className="InvoiceDetails-table">
                <thead>
                  <tr>
                    <th>DESCRIPTION</th>
                    <th className="text-center">QTY</th>
                    <th className="text-right">RATE</th>
                    <th className="text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.id}>
                      <td className="item-desc">{item.description}</td>
                      <td className="text-center item-qty">{item.qty}</td>
                      <td className="text-right item-rate">
                        ${item.rate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-right item-amount bold-text">
                        ${(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Financial Disclosures Frame */}
          <div className="InvoiceDetails-financial-summary">
            
            <div className="financial-summary-left">
              <h4>Payment Information</h4>
              <p>Please make payment within 15 days of invoice date.</p>
              <p>Thank you for your business!</p>
            </div>

            <div className="financial-summary-right">
              <div className="calculation-breakdown-card">
                <div className="calc-row">
                  <span>Subtotal</span>
                  <span className="bold-text">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="calc-row border-under">
                  <span>Tax (8%)</span>
                  <span className="bold-text">${taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="calc-row total-row">
                  <span>Total Amount</span>
                  <span className="total-highlight-value">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;