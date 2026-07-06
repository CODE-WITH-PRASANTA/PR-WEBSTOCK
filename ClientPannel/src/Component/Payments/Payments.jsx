import React, { useState } from 'react';
import { 
  FaHome, 
  FaChevronRight, 
  FaCreditCard, 
  FaUniversity, 
  FaLock, 
  FaInfoCircle, 
  FaHistory, 
  FaCogs, 
  FaFileInvoiceDollar,
  FaChevronDown,
  FaRegListAlt
} from 'react-icons/fa';
import './Payments.css';

const Payments = () => {
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  // Mock invoice data for interaction
  const invoices = [
    { id: 'INV-001', amount: 2500.00 },
    { id: 'INV-002', amount: 2200.00 },
  ];

  const currentInvoiceData = invoices.find(inv => inv.id === selectedInvoice);
  const amountDue = currentInvoiceData ? currentInvoiceData.amount : 0;

  return (
    <div className="Payments-container">
      <div className="Payments-wrapper">
        
        {/* Top Header Row */}
        <div className="Payments-header">
          <h1 className="Payments-title">Make Payment</h1>
          <div className="Payments-breadcrumbs">
            <FaHome className="Payments-breadcrumb-icon" />
            <FaChevronRight className="Payments-breadcrumb-arrow" />
            <span className="Payments-breadcrumb-link">Billing</span>
            <FaChevronRight className="Payments-breadcrumb-arrow" />
            <span className="Payments-breadcrumb-current">Payments</span>
          </div>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="Payments-grid">
          
          {/* Left Column: Form Controls */}
          <div className="Payments-main-column">
            <div className="Payments-card">
              <div className="Payments-card-banner">
                <FaCreditCard className="Payments-banner-icon" />
                <div>
                  <h2>Make a Payment</h2>
                  <p>Complete your payment securely</p>
                </div>
              </div>

              <div className="Payments-card-body">
                {/* Step 1 */}
                <div className="Payments-step-section">
                  <div className="Payments-step-header">
                    <span className="Payments-step-number">1</span>
                    <div>
                      <h3>Select Invoice</h3>
                      <p>Choose the invoice you want to pay</p>
                    </div>
                  </div>
                  <div className="Payments-input-wrapper">
                    <select 
                      className="Payments-select-field"
                      value={selectedInvoice}
                      onChange={(e) => setSelectedInvoice(e.target.value)}
                    >
                      <option value="" disabled hidden>Invoice*</option>
                      {invoices.map(inv => (
                        <option key={inv.id} value={inv.id}>{inv.id} (${inv.amount.toLocaleString()})</option>
                      ))}
                    </select>
                    <FaRegListAlt className="Payments-select-right-icon" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="Payments-step-section">
                  <div className="Payments-step-header">
                    <span className="Payments-step-number">2</span>
                    <div>
                      <h3>Payment Amount</h3>
                      <p>Confirm the amount to pay</p>
                    </div>
                  </div>
                  <div className="Payments-amount-display-box">
                    <div className="Payments-amount-due-label">AMOUNT DUE</div>
                    <div className="Payments-amount-due-value">
                      ${amountDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="Payments-step-section">
                  <div className="Payments-step-header">
                    <span className="Payments-step-number">3</span>
                    <div>
                      <h3>Payment Method</h3>
                      <p>Select your preferred payment method</p>
                    </div>
                  </div>

                  <div className="Payments-methods-list">
                    {/* Method 1 */}
                    <label className={`Payments-method-item ${selectedMethod === 'visa' ? 'Payments-method-active' : ''}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="visa"
                        checked={selectedMethod === 'visa'}
                        onChange={() => setSelectedMethod('visa')}
                      />
                      <span className="Payments-radio-custom"></span>
                      <div className="Payments-method-icon-bg">
                        <FaCreditCard />
                      </div>
                      <div className="Payments-method-details">
                        <span className="Payments-method-name">Visa ending in 4242</span>
                        <span className="Payments-method-type">Credit Card</span>
                      </div>
                    </label>

                    {/* Method 2 */}
                    <label className={`Payments-method-item ${selectedMethod === 'mastercard' ? 'Payments-method-active' : ''}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="mastercard"
                        checked={selectedMethod === 'mastercard'}
                        onChange={() => setSelectedMethod('mastercard')}
                      />
                      <span className="Payments-radio-custom"></span>
                      <div className="Payments-method-icon-bg">
                        <FaCreditCard />
                      </div>
                      <div className="Payments-method-details">
                        <span className="Payments-method-name">Mastercard ending in 5555</span>
                        <span className="Payments-method-type">Credit Card</span>
                      </div>
                    </label>

                    {/* Method 3 */}
                    <label className={`Payments-method-item ${selectedMethod === 'chase' ? 'Payments-method-active' : ''}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="chase"
                        checked={selectedMethod === 'chase'}
                        onChange={() => setSelectedMethod('chase')}
                      />
                      <span className="Payments-radio-custom"></span>
                      <div className="Payments-method-icon-bg">
                        <FaUniversity />
                      </div>
                      <div className="Payments-method-details">
                        <span className="Payments-method-name">Chase Bank (...9012)</span>
                        <span className="Payments-method-type">Bank Account</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Footer Action Submission */}
                <div className="Payments-submit-zone">
                  <button 
                    className="Payments-submit-btn" 
                    disabled={!selectedInvoice || !selectedMethod}
                  >
                    <FaLock className="Payments-lock-icon" /> Proceed to Secure Payment
                  </button>
                  <p className="Payments-secure-info">
                    <FaLock /> Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Panels */}
          <div className="Payments-sidebar-column">
            
            {/* Billing Summary Panel */}
            <div className="Payments-summary-card">
              <div className="Payments-summary-header">
                <FaRegListAlt /> Billing Summary
              </div>
              <div className="Payments-summary-body">
                <div className="Payments-summary-row Payments-summary-main-row">
                  <span>Total Outstanding</span>
                  <span className="Payments-summary-highlight">$4,700.00</span>
                </div>
                <div className="Payments-summary-row">
                  <span>Unpaid Invoices</span>
                  <span className="Payments-bold-text">2</span>
                </div>
                <div className="Payments-summary-row">
                  <span>Last Payment</span>
                  <span className="Payments-bold-text">Jan 10, 2024</span>
                </div>
                <div className="Payments-summary-row">
                  <span>Next Due Date</span>
                  <span className="Payments-bold-text">Jan 30, 2024</span>
                </div>
              </div>
              <div className="Payments-summary-footer">
                <FaInfoCircle /> Pay early and save with our 2% discount on advance payments
              </div>
            </div>

            {/* Quick Links Panel */}
            <div className="Payments-links-card">
              <div className="Payments-links-header">Quick Links</div>
              <div className="Payments-links-list">
                <a href="#history" className="Payments-link-item">
                  <div className="Payments-link-left">
                    <FaHistory className="Payments-link-icon" />
                    <span>Payment History</span>
                  </div>
                  <FaChevronRight className="Payments-link-arrow" />
                </a>
                <a href="#methods" className="Payments-link-item">
                  <div className="Payments-link-left">
                    <FaCogs className="Payments-link-icon" />
                    <span>Manage Payment Methods</span>
                  </div>
                  <FaChevronRight className="Payments-link-arrow" />
                </a>
                <a href="#invoices" className="Payments-link-item">
                  <div className="Payments-link-left">
                    <FaFileInvoiceDollar className="Payments-link-icon" />
                    <span>View All Invoices</span>
                  </div>
                  <FaChevronRight className="Payments-link-arrow" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Payments;