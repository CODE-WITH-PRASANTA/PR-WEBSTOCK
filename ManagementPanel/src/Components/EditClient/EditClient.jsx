import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import './EditClient.css';

const EditClient = () => {
  // Pre-filled initial data matching the reference image state
  const [formData, setFormData] = useState({
    name: 'Pooja Sarma',
    companyName: 'ABC Infotech',
    email: 'test@example.com',
    mobile: '123456789',
    date: '1987-02-17',
    currency: 'rupee',
    billingMethod: 'Fixed Price',
    image: null
  });

  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBillingDropdown, setShowBillingDropdown] = useState(false);

  // Calendar view states matching reference image 3
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 6 -> July

  const calendarRef = useRef(null);
  const billingRef = useRef(null);
  const fileInputRef = useRef(null);

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const billingOptions = ["Fixed Price", "Hourly User Rate", "Hourly Job Rate"];

  // Close overlays on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
      if (billingRef.current && !billingRef.current.contains(e.target)) {
        setShowBillingDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectBilling = (option) => {
    setFormData(prev => ({ ...prev, billingMethod: option }));
    setShowBillingDropdown(false);
    if (errors.billingMethod) setErrors(prev => ({ ...prev, billingMethod: '' }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.companyName.trim()) tempErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    if (!formData.mobile.trim()) tempErrors.mobile = 'Mobile is required';
    if (!formData.date) tempErrors.date = 'Date is required';
    if (!formData.currency.trim()) tempErrors.currency = 'Currency is required';
    if (!formData.billingMethod) tempErrors.billingMethod = 'Billing method is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Updated Form Saved Client Data:', formData);
      alert('Client information updated successfully!');
    }
  };

  const handleCancel = () => {
    alert('Edit process cancelled.');
  };

  // Calendar computation logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(p => p - 1);
    } else {
      setCurrentMonth(p => p - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(p => p + 1);
    } else {
      setCurrentMonth(p => p + 1);
    }
  };

  const handleDateSelect = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    setFormData(prev => ({ ...prev, date: `${currentYear}-${formattedMonth}-${formattedDay}` }));
    setShowCalendar(false);
  };

  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const dayCells = [];

    for (let i = 0; i < firstDay; i++) {
      dayCells.push(<div key={`empty-${i}`} className="EditClient-calendar-day empty"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const isTodayMock = currentYear === 2026 && currentMonth === 6 && d === 2;
      dayCells.push(
        <div
          key={`day-${d}`}
          className={`EditClient-calendar-day ${isTodayMock ? 'today' : ''}`}
          onClick={() => handleDateSelect(d)}
        >
          {d}
        </div>
      );
    }
    return dayCells;
  };

  const isFormFilled = formData.name && formData.companyName && formData.email && formData.mobile && formData.date && formData.currency && formData.billingMethod;

  return (
    <div className="EditClient-container">
      {/* Dynamic Upper Top Navigation Breadcrumb */}
      <div className="EditClient-header">
        <h2>Edit Client</h2>
        <div className="EditClient-breadcrumb">
          <span>🏠</span>
          <span className="breadcrumb-slash">&gt;</span>
          <span>Clients</span>
          <span className="breadcrumb-slash">&gt;</span>
          <span className="breadcrumb-current">Edit Client</span>
        </div>
      </div>

      {/* Primary Container Form Canvas */}
      <div className="EditClient-card">
        <h3 className="EditClient-card-title">Edit Client</h3>

        <form onSubmit={handleSubmit} className="EditClient-form">
          <div className="EditClient-form-grid">
            
            {/* Input Element 1: Name */}
            <div className="EditClient-form-group">
              <label className="EditClient-floating-label">Name*</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>

            {/* Input Element 2: Company Name */}
            <div className="EditClient-form-group">
              <label className="EditClient-floating-label">Company Name*</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
              />
            </div>

            {/* Input Element 3: Email */}
            <div className="EditClient-form-group">
              <label className="EditClient-floating-label">Email*</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            {/* Input Element 4: Mobile */}
            <div className="EditClient-form-group">
              <label className="EditClient-floating-label">Mobile*</label>
              <input 
                type="text" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
              />
            </div>

            {/* Input Element 5: Custom Date Picker Overlay Field */}
            <div className="EditClient-form-group" ref={calendarRef}>
              <label className="EditClient-floating-label">Date*</label>
              <div className="EditClient-input-with-icon" onClick={() => setShowCalendar(!showCalendar)}>
                <input 
                  type="text" 
                  name="date" 
                  value={formData.date} 
                  readOnly 
                />
                <FaCalendarAlt className="EditClient-field-icon" />
              </div>

              {showCalendar && (
                <div className="EditClient-calendar-overlay">
                  <div className="EditClient-calendar-topbar">
                    <div className="EditClient-calendar-selectors">
                      <span>{currentYear} {months[currentMonth]}</span>
                      <FaChevronDown className="arrow-down-mini" />
                    </div>
                    <div className="EditClient-calendar-arrows">
                      <button type="button" onClick={handlePrevMonth}><FaChevronLeft /></button>
                      <button type="button" onClick={handleNextMonth}><FaChevronRight /></button>
                    </div>
                  </div>
                  <div className="EditClient-calendar-weekdays">
                    {daysOfWeek.map(day => <div key={day} className="weekday-cell">{day}</div>)}
                  </div>
                  <div className="EditClient-calendar-daysgrid">
                    <div className="EditClient-calendar-background-text">{months[currentMonth]}</div>
                    {renderCalendarDays()}
                  </div>
                </div>
              )}
            </div>

            {/* Input Element 6: Currency */}
            <div className="EditClient-form-group">
              <label className="EditClient-floating-label">Currency*</label>
              <input 
                type="text" 
                name="currency" 
                value={formData.currency} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Full Width Row Layout Area for Custom Billing Select dropdown */}
          <div className="EditClient-form-group full-width" ref={billingRef}>
            <label className="EditClient-floating-label">Billing Method*</label>
            <div className="EditClient-custom-select-trigger" onClick={() => setShowBillingDropdown(!showBillingDropdown)}>
              <span>{formData.billingMethod || "Select Method"}</span>
              <FaChevronDown className="EditClient-select-dropdown-icon" />
            </div>

            {showBillingDropdown && (
              <div className="EditClient-billing-overlay-menu">
                {billingOptions.map((option) => {
                  const isSelected = formData.billingMethod === option;
                  return (
                    <div
                      key={option}
                      className={`EditClient-billing-item ${isSelected ? 'active-item' : ''}`}
                      onClick={() => handleSelectBilling(option)}
                    >
                      <span>{option}</span>
                      {isSelected && <FaCheck className="check-icon-marker" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Custom File Uploader Section Area */}
          <div className="EditClient-drag-drop-area">
            <label className="EditClient-upload-heading">Upload Image</label>
            <div 
              className="EditClient-dropzone-box"
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setFormData(prev => ({ ...prev, image: e.dataTransfer.files[0] }));
                }
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
                accept="image/*"
              />
              <button type="button" className="EditClient-choose-file-btn">Choose file</button>
              <span className="EditClient-filename-display">
                {formData.image ? formData.image.name : 'or drag and drop file here'}
              </span>
            </div>
          </div>

          {/* Action Trigger Buttons section */}
          <div className="EditClient-button-actions-row">
            <button 
              type="submit" 
              className={`EditClient-submit-trigger ${isFormFilled ? 'enabled-state' : 'disabled-state'}`}
              disabled={!isFormFilled}
            >
              Submit
            </button>
            <button type="button" className="EditClient-cancel-trigger" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClient;