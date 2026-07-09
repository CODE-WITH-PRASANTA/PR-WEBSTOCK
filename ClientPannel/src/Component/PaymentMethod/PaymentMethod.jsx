import React, { useState, useEffect, useRef } from 'react';
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
  FaTimes,
  FaCheckCircle,
  FaTrashAlt,
  FaCheck
} from 'react-icons/fa';
import './PaymentMethod.css';

const PaymentMethod = () => {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('edit'); 
  const [paymentType, setPaymentType] = useState('credit');
  const [isDefault, setIsDefault] = useState(true);

  // Active targeted card for operations
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Dropdown UI dynamic anchor state
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  
  // Ref array container to handle clicks outside context menus
  const dropdownRefs = useRef({});

  // Mock array mapping of items
  const [cards, setCards] = useState([
    { id: 1, type: 'visa', name: 'Visa', number: '•••• •••• •••• 4242', holder: 'Global Tech Solutions', expiry: '12/26', isDefault: true },
    { id: 2, type: 'mastercard', name: 'Mastercard', number: '•••• •••• •••• 5555', holder: 'Global Tech Solutions', expiry: '08/25', isDefault: false },
    { id: 3, type: 'bank', name: 'Bank Account', number: 'Chase Bank (...9012)', holder: 'Global Tech Solutions', expiry: '', isDefault: false },
  ]);

  // Handle auto-closing open dropdown blocks when window registers unexpected click handlers
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (activeDropdownId !== null) {
        const currentRef = dropdownRefs.current[activeDropdownId];
        if (currentRef && !currentRef.contains(event.target)) {
          setActiveDropdownId(null);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeDropdownId]);

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  const openModal = (type, card = null) => {
    setModalType(type);
    if (card) {
      setSelectedCardId(card.id);
      setPaymentType(card.type === 'bank' ? 'bank' : 'credit');
      setIsDefault(card.isDefault);
    } else {
      setSelectedCardId(null);
      setPaymentType('credit');
      setIsDefault(false);
    }
    setIsModalOpen(true);
    setActiveDropdownId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSetDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
    setActiveDropdownId(null);
  };

  const handleRemoveCard = (id) => {
    if (window.confirm("Are you sure you want to remove this payment method?")) {
      setCards(cards.filter(card => card.id !== id));
    }
    setActiveDropdownId(null);
  };

  const getBrandIcon = (type) => {
    switch (type) {
      case 'visa': return <FaCcVisa />;
      case 'mastercard': return <FaCcMastercard />;
      case 'bank': return <FaUniversity />;
      default: return <FaRegCreditCard />;
    }
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
              <FaPlus /> <span className="btn-text">Add New Method</span>
            </button>
          </div>

          {/* Core Panel Content Cards Grid */}
          <div className="cards-grid">
            {cards.map((card) => (
              <div key={card.id} className={`payment-card ${card.isDefault ? 'default-card' : ''}`}>
                <div className="card-upper-block">
                  <div className="card-top-row">
                    <div className={`brand-icon-wrapper ${card.type}-bg`}>
                      {getBrandIcon(card.type)}
                    </div>
                    
                    {/* Interactive Dropdown Wrapper container */}
                    <div 
                      className="dropdown-anchor-wrapper"
                      ref={el => dropdownRefs.current[card.id] = el}
                    >
                      <button className="btn-options" onClick={(e) => toggleDropdown(card.id, e)}>
                        <FaEllipsisV />
                      </button>

                      {/* Dynamic Action Context Popover Panel matching reference exactly */}
                      {activeDropdownId === card.id && (
                        <div className="context-menu-popover">
                          <button className="menu-action-item" onClick={() => openModal('edit', card)}>
                            <FaPencilAlt className="menu-action-icon" />
                            <span className="menu-action-text">Edit</span>
                          </button>
                          
                          <button className="menu-action-item" onClick={() => handleSetDefault(card.id)}>
                            <FaCheckCircle className="menu-action-icon" />
                            <span className="menu-action-text">Set as Default</span>
                          </button>
                          
                          <button className="menu-action-item remove-item" onClick={() => handleRemoveCard(card.id)}>
                            <FaTrashAlt className="menu-action-icon text-danger" />
                            <span className="menu-action-text text-danger">Remove</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                  <div className="card-middle">
                    {card.isDefault && <span className="badge-default">★ Default</span>}
                    <h3 className="card-name">{card.name}</h3>
                    <p className="card-number-hidden">{card.number}</p>
                  </div>
                </div>
                <div className="card-lower-block">
                  <div className="card-bottom-meta">
                    <div>
                      <p className="meta-label">Holder</p>
                      <p className="meta-value">{card.holder}</p>
                    </div>
                    {card.expiry && (
                      <div>
                        <p className="meta-label">Expires</p>
                        <p className="meta-value">{card.expiry}</p>
                      </div>
                    )}
                  </div>
                  <button className="btn-card-edit" onClick={() => openModal('edit', card)}>
                    <FaPencilAlt /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- Overlay Form Center Screen Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-window-box" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div className="modal-header-left">
                <FaPencilAlt className="modal-header-icon" />
                <h2 className="modal-title">
                  {modalType === 'edit' ? 'Edit Payment Method' : 'Add Payment Method'}
                </h2>
              </div>
              <button className="btn-modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-section">
                <span className="section-label">Payment Type</span>
                <div className="payment-type-grid">
                  <label className={`type-option-label ${paymentType === 'credit' ? 'selected-type' : ''}`}>
                    <input type="radio" name="paymentType" className="type-option-input" checked={paymentType === 'credit'} onChange={() => setPaymentType('credit')} />
                    <div className="custom-circle-radio">
                      <div className="circle-radio-dot"></div>
                    </div>
                    <FaRegCreditCard className="type-option-icon" />
                    <span className="type-option-text">Credit Card</span>
                  </label>
                  <label className={`type-option-label ${paymentType === 'debit' ? 'selected-type' : ''}`}>
                    <input type="radio" name="paymentType" className="type-option-input" checked={paymentType === 'debit'} onChange={() => setPaymentType('debit')} />
                    <div className="custom-circle-radio">
                      <div className="circle-radio-dot"></div>
                    </div>
                    <FaRegCreditCard className="type-option-icon" />
                    <span className="type-option-text">Debit Card</span>
                  </label>
                  <label className={`type-option-label ${paymentType === 'bank' ? 'selected-type' : ''}`}>
                    <input type="radio" name="paymentType" className="type-option-input" checked={paymentType === 'bank'} onChange={() => setPaymentType('bank')} />
                    <div className="custom-circle-radio">
                      <div className="circle-radio-dot"></div>
                    </div>
                    <FaUniversity className="type-option-icon" />
                    <span className="type-option-text">Bank Account</span>
                  </label>
                </div>
              </div>

              <div className="form-fields-stack">
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

                <div className="floating-field-box">
                  <span className="field-label">Card Number*</span>
                  <div className="field-inner-wrap">
                    <input type="text" placeholder="•••• •••• •••• ••••" className="field-input font-code" />
                    <FaRegCreditCard className="field-icon" />
                  </div>
                </div>

                <div className="input-group-row">
                  <div className="floating-field-box">
                    <span className="field-label">Expiry Month*</span>
                    <input type="text" placeholder="Expiry Month*" className="field-input" />
                  </div>
                  <div className="floating-field-box">
                    <span className="field-label">Expiry Year*</span>
                    <input type="text" placeholder="Expiry Year*" className="field-input" />
                  </div>
                  <div className="floating-field-box">
                    <span className="field-label">CVV*</span>
                    <input type="password" placeholder="••••" className="field-input font-code error-border" />
                  </div>
                </div>

                <div className="floating-field-box">
                  <span className="field-label">Cardholder / Account Holder Name*</span>
                  <div className="field-inner-wrap">
                    <input type="text" defaultValue="Global Tech Solutions" className="field-input" />
                    <FaUser className="field-icon" style={{ fontSize: '11px' }} />
                  </div>
                </div>
              </div>

              {/* Styled Default Selector Section matched to your reference image */}
              <div className="default-selection-row">
                <label className="custom-circle-checkbox-container">
                  <input type="checkbox" className="type-option-input" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
                  <div className={`custom-outer-circle ${isDefault ? 'checked' : ''}`}>
                    <div className="circle-radio-dot"></div>
                  </div>
                </label>

                <div className="default-toggle-card">
                  <div className="toggle-left-check-icon">
                    <FaCheck />
                  </div>
                  <div className="toggle-text-container">
                    <h4 className="toggle-title">Set as Default</h4>
                    <p className="toggle-desc">Use this method for future payments</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-submit">
                {modalType === 'edit' ? 'Update Method' : 'Save Method'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentMethod;