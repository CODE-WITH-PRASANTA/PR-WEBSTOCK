import React, { useState } from 'react';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaUniversity, 
  FaPlus, 
  FaEllipsisV, 
  FaPencilAlt, 
  FaHome, 
  FaChevronRight, 
  FaRegCreditCard, 
  FaUser, 
  FaTimes 
} from 'react-icons/fa';
import './PaymentMethod.css'; // Importing the style sheet

const PaymentMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('edit'); 
  const [paymentType, setPaymentType] = useState('credit');
  const [isDefault, setIsDefault] = useState(true);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="payment-method-container">
      <div className="max-w-wrapper">
        
        {/* Breadcrumb Header Bar */}
        <div className="header-row">
          <h1 className="header-title">Payment Methods</h1>
          <div className="breadcrumbs">
            <FaHome className="breadcrumb-item" />
            <FaChevronRight className="breadcrumb-arrow" />
            <span className="breadcrumb-item">Billing</span>
            <FaChevronRight className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Methods</span>
          </div>
        </div>

        {/* Card Canvas Core Container */}
        <div className="main-card">
          
          {/* Banner Dashboard Header */}
          <div className="purple-banner">
            <div className="banner-left">
              <div className="banner-icon-box">
                <FaRegCreditCard />
              </div>
              <div>
                <h2 className="banner-title">Payment Methods</h2>
                <p className="banner-subtitle">Manage your saved payment methods</p>
              </div>
            </div>
            <button className="btn-add-method" onClick={() => openModal('add')}>
              <FaPlus /> Add New Method
            </button>
          </div>

          {/* Core Panel Content Cards Grid */}
          <div className="cards-grid">
            
            {/* Card Object 1: Visa (Active Default setup) */}
            <div className="payment-card default-card">
              <div>
                <div className="card-top-row">
                  <div className="brand-icon-wrapper visa-bg">
                    <FaCcVisa />
                  </div>
                  <button className="btn-options"><FaEllipsisV /></button>
                </div>
                <div className="card-middle">
                  <span className="badge-default">★ Default</span>
                  <h3 className="card-name">Visa</h3>
                  <p className="card-number-hidden">**** **** **** 4242</p>
                </div>
              </div>
              <div>
                <div className="card-bottom-meta">
                  <div>
                    <p className="meta-label">Holder</p>
                    <p className="meta-value">Global Tech Solutions</p>
                  </div>
                  <div>
                    <p className="meta-label">Expires</p>
                    <p className="meta-value">12/26</p>
                  </div>
                </div>
                <button className="btn-card-edit" onClick={() => openModal('edit')}>
                  <FaPencilAlt /> Edit
                </button>
              </div>
            </div>

            {/* Card Object 2: Mastercard */}
            <div className="payment-card">
              <div>
                <div className="card-top-row">
                  <div className="brand-icon-wrapper mastercard-bg">
                    <FaCcMastercard />
                  </div>
                  <button className="btn-options"><FaEllipsisV /></button>
                </div>
                <div className="card-middle">
                  <h3 className="card-name">Mastercard</h3>
                  <p className="card-number-hidden">**** **** **** 5555</p>
                </div>
              </div>
              <div>
                <div className="card-bottom-meta">
                  <div>
                    <p className="meta-label">Holder</p>
                    <p className="meta-value">Global Tech Solutions</p>
                  </div>
                  <div>
                    <p className="meta-label">Expires</p>
                    <p className="meta-value">08/25</p>
                  </div>
                </div>
                <button className="btn-card-edit" onClick={() => openModal('edit')}>
                  <FaPencilAlt /> Edit
                </button>
              </div>
            </div>

            {/* Card Object 3: Bank Checking Option */}
            <div className="payment-card">
              <div>
                <div className="card-top-row">
                  <div className="brand-icon-wrapper bank-bg">
                    <FaUniversity />
                  </div>
                  <button className="btn-options"><FaEllipsisV /></button>
                </div>
                <div className="card-middle">
                  <h3 className="card-name">Bank Account</h3>
                  <p className="card-number-hidden">Chase Bank (...9012)</p>
                </div>
              </div>
              <div>
                <div className="card-bottom-meta">
                  <div>
                    <p className="meta-label">Holder</p>
                    <p className="meta-value">Global Tech Solutions</p>
                  </div>
                </div>
                <button className="btn-card-edit" onClick={() => openModal('edit')}>
                  <FaPencilAlt /> Edit
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- Overlay Form Center Screen Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-window-box" onClick={(e) => e.stopPropagation()}>
            
            {/* Form Top Control Panel Row */}
            <div className="modal-header">
              <div className="modal-header-left">
                <FaPencilAlt className="modal-header-icon" />
                <h2 className="modal-title">
                  {modalType === 'edit' ? 'Edit Payment Method' : 'Add New Payment Method'}
                </h2>
              </div>
              <button className="btn-modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            {/* Core Inputs Form Shell */}
            <div className="modal-body">
              
              {/* Radial Type Pick Group */}
              <div>
                <span className="section-label">Payment Type</span>
                <div className="payment-type-grid">
                  
                  <label className={`type-option-label ${paymentType === 'credit' ? 'selected-type' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentType" 
                      className="type-option-input"
                      checked={paymentType === 'credit'}
                      onChange={() => setPaymentType('credit')}
                    />
                    <FaRegCreditCard className="type-option-icon" />
                    <span className="type-option-text">Credit Card</span>
                  </label>

                  <label className={`type-option-label ${paymentType === 'debit' ? 'selected-type' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentType" 
                      className="type-option-input"
                      checked={paymentType === 'debit'}
                      onChange={() => setPaymentType('debit')}
                    />
                    <FaRegCreditCard className="type-option-icon" />
                    <span className="type-option-text">Debit Card</span>
                  </label>

                  <label className={`type-option-label ${paymentType === 'bank' ? 'selected-type' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentType" 
                      className="type-option-input"
                      checked={paymentType === 'bank'}
                      onChange={() => setPaymentType('bank')}
                    />
                    <FaUniversity className="type-option-icon" />
                    <span className="type-option-text">Bank Account</span>
                  </label>

                </div>
              </div>

              {/* Data Fields Collection */}
              <div className="form-fields-stack">
                <span className="section-label">Card Details</span>
                
                {/* Brand Selector Group */}
                <div className="floating-field-box">
                  <span className="field-label">Card Brand*</span>
                  <div className="field-inner-wrap">
                    <select className="field-select">
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                    <FaRegCreditCard className="field-icon" />
                  </div>
                </div>

                {/* Account/Card Number Group */}
                <div className="floating-field-box">
                  <span className="field-label">Card Number*</span>
                  <div className="field-inner-wrap">
                    <input type="text" placeholder="**** **** **** ****" className="field-input font-code" />
                    <FaRegCreditCard className="field-icon" />
                  </div>
                </div>

                {/* Inline Expiration Parameters & Marked CVV */}
                <div className="input-group-row">
                  <div className="floating-field-box">
                    <span className="field-label">Expiry Month*</span>
                    <input type="text" placeholder="MM" className="field-input" />
                  </div>
                  <div className="floating-field-box">
                    <span className="field-label">Expiry Year*</span>
                    <input type="text" placeholder="YY" className="field-input" />
                  </div>
                  <div className="floating-field-box error-box">
                    <span className="field-label">CVV*</span>
                    <input type="password" placeholder="••••" className="field-input font-code" />
                  </div>
                </div>

                {/* Cardholder Input Frame */}
                <div className="floating-field-box">
                  <span className="field-label">Cardholder / Account Holder Name*</span>
                  <div className="field-inner-wrap">
                    <input type="text" defaultValue="Global Tech Solutions" className="field-input" />
                    <FaUser className="field-icon" style={{ fontSize: '11px' }} />
                  </div>
                </div>

              </div>

              {/* Toggle Switch Selector Container */}
              <label className="default-toggle-card">
                <input 
                  type="checkbox" 
                  className="checkbox-element" 
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                />
                <div>
                  <h4 className="toggle-title">Set as Default</h4>
                  <p className="toggle-desc">Use this method for future payments</p>
                </div>
              </label>

            </div>

            {/* Lower Form Commit Buttons */}
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-submit">Update Method</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentMethod;