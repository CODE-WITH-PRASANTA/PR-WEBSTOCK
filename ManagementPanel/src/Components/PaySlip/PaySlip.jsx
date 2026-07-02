import React from "react";
import { FaHome, FaChevronRight, FaPrint, FaRegBuilding } from "react-icons/fa";
import "./PaySlip.css";

const PaySlip = () => {
  // Hardcoded matching data from your uploaded image sample
  const slipData = {
    monthYear: "JUNE 2022",
    slipNo: "859654",
    paymentDate: "Jul 02, 2022 - 12:30 am",
    company: {
      name: "Einfosoft Technology",
      address: "52, Titanium software hub, Gift city, Gandhinagar, India",
      email: "hr@einfosoft.com",
    },
    employee: {
      name: "Sarah Smith",
      address: "A 507 Parimal Hights, Near Shyamal Cross, Ahmedabad, India",
      email: "sarah@einfosoft.com",
    },
    earnings: [
      { label: "Basic", amount: 8568 },
      { label: "HRA", amount: 125 },
      { label: "DA", amount: 87 },
      { label: "Special Allowance", amount: 50 },
      { label: "Bonus", amount: 75 },
    ],
    deductions: [
      { label: "Provident Fund", amount: 10 },
      { label: "Professional Tax", amount: 20 },
      { label: "ESI", amount: 0 },
      { label: "Home Loan", amount: 210 },
      { label: "TDS", amount: 113 },
    ],
    totalEarnings: 8905,
    totalDeductions: 353,
    netPay: 8552,
    netPayWords: "Eight Thousand Five Hundred Fifty Two Only",
    signatory: "Priya Jain",
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="payslip-view__container">
      {/* Top Breadcrumb Navigation Header */}
      <div className="payslip-view__header no-print">
        <div className="payslip-view__title">Payslip</div>
        <div className="payslip-view__breadcrumbs">
          <FaHome /> <span>Home</span> <FaChevronRight size={10} /> <span>Payroll</span> <FaChevronRight size={10} /> <strong>Payslip</strong>
        </div>
      </div>

      {/* Main Payslip White Document Wrapper */}
      <div className="payslip-view__card">
        <div className="payslip-view__card-label no-print">Payslip</div>
        
        {/* Main Document Title */}
        <h2 className="payslip-view__doc-title">
          PAYSLIP FOR THE MONTH OF {slipData.monthYear}
        </h2>

        {/* Metadata Row */}
        <div className="payslip-view__meta-row">
          <div className="payslip-view__meta-item">
            <strong>Payslip No.:</strong>
            <span>{slipData.slipNo}</span>
          </div>
          <div className="payslip-view__meta-item payslip-view__meta-item--right">
            <strong>Payment Date:</strong>
            <span>{slipData.paymentDate}</span>
          </div>
        </div>

        <hr className="payslip-view__divider" />

        {/* Addresses / Party Details Flex Row */}
        <div className="payslip-view__parties">
          <div className="payslip-view__company-side">
            <div className="payslip-view__logo-placeholder">
              <FaRegBuilding /> <span>Company Logo</span>
            </div>
            <h3 className="payslip-view__party-name">{slipData.company.name}</h3>
            <p className="payslip-view__party-text">{slipData.company.address}</p>
            <p className="payslip-view__party-text">
              Email: <a href={`mailto:${slipData.company.email}`}>{slipData.company.email}</a>
            </p>
          </div>

          <div className="payslip-view__employee-side">
            <div className="payslip-view__payment-to-label">Payment To: {slipData.employee.name}</div>
            <p className="payslip-view__party-text">{slipData.employee.address}</p>
            <p className="payslip-view__party-text">
              Email: <a href={`mailto:${slipData.employee.email}`}>{slipData.employee.email}</a>
            </p>
          </div>
        </div>

        {/* Salary Ledger Split Grid Blocks */}
        <div className="payslip-view__ledger-grid">
          {/* Earnings Panel Container */}
          <div className="payslip-view__ledger-block">
            <div className="payslip-view__ledger-header">Earnings</div>
            <div className="payslip-view__ledger-table">
              {slipData.earnings.map((item, idx) => (
                <div key={idx} className="payslip-view__ledger-row">
                  <span className="payslip-view__item-label">{item.label}</span>
                  <span className="payslip-view__item-val">${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="payslip-view__ledger-row payslip-view__ledger-row--total-earnings">
                <span className="payslip-view__item-label">Total Earnings</span>
                <span className="payslip-view__item-val">${slipData.totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Deductions Panel Container */}
          <div className="payslip-view__ledger-block">
            <div className="payslip-view__ledger-header">Deductions</div>
            <div className="payslip-view__ledger-table">
              {slipData.deductions.map((item, idx) => (
                <div key={idx} className="payslip-view__ledger-row">
                  <span className="payslip-view__item-label">{item.label}</span>
                  <span className="payslip-view__item-val">${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="payslip-view__ledger-row payslip-view__ledger-row--total-deductions">
                <span className="payslip-view__item-label">Total Deductions</span>
                <span className="payslip-view__item-val">${slipData.totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay Core Callout Banner Summary */}
        <div className="payslip-view__summary-block">
          <div className="payslip-view__net-amount">
  Net Pay: $
  {slipData.netPay.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</div>
          <div className="payslip-view__net-words">
            {slipData.netPayWords}
          </div>
        </div>

        {/* Signatory Footer Context Block */}
        <div className="payslip-view__signature-block">
          <div className="payslip-view__sign-title">For {slipData.signatory}</div>
          <div className="payslip-view__sign-subtitle">Authorised Signatory</div>
        </div>

        {/* Interaction Print Controller Option Elements */}
        <div className="payslip-view__actions-wrapper no-print">
          <button className="payslip-view__print-btn" onClick={handlePrint}>
            <FaPrint /> Print this receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaySlip;