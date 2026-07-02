import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './AddClient.css';

const AddClient = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    mobile: '',
    date: '',
    currency: '',
    billingMethod: '',
    image: null
  });

  // Errors State
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calendar Picker UI State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed: July is 6
  
  const calendarRef = useRef(null);
  const fileInputRef = useRef(null);

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Please enter name';
    if (!formData.companyName.trim()) tempErrors.companyName = 'Please enter company name';
    if (!formData.email.trim()) tempErrors.email = 'Please enter email';
    if (!formData.mobile.trim()) tempErrors.mobile = 'Please enter mobile number';
    if (!formData.date) tempErrors.date = 'Please select date';
    if (!formData.currency.trim()) tempErrors.currency = 'Please enter currency';
    if (!formData.billingMethod) tempErrors.billingMethod = 'Please select billing method';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted Successfully:', formData);
      alert('Form Submitted Successfully!');
      setIsSubmitted(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      companyName: '',
      email: '',
      mobile: '',
      date: '',
      currency: '',
      billingMethod: '',
      image: null
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Calendar logic helpers
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleDateSelect = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const selectedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;
    
    setFormData(prev => ({ ...prev, date: selectedDate }));
    setErrors(prev => ({ ...prev, date: '' }));
    setShowCalendar(false);
  };

  // Render calendar grid days
  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const dayElements = [];

    // Blank cells before first day
    for (let i = 0; i < firstDay; i++) {
      dayElements.push(<div key={`empty-${i}`} className="AddClient-calendar-day empty"></div>);
    }

    // Days setup
    for (let day = 1; day <= totalDays; day++) {
      const isSelected = formData.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isTodayMock = currentYear === 2026 && currentMonth === 6 && day === 2; // Matches image state

      dayElements.push(
        <div
          key={`day-${day}`}
          className={`AddClient-calendar-day ${isSelected ? 'selected' : ''} ${isTodayMock ? 'today' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </div>
      );
    }
    return dayElements;
  };

  // Check if form is complete to toggle submit button viability
  const isFormFilled = formData.name && formData.companyName && formData.email && formData.mobile && formData.date && formData.currency && formData.billingMethod;

  return (
    <div className="AddClient-container">
      {/* Breadcrumb Header */}
      <div className="AddClient-header">
        <h2>Add Client</h2>
        <div className="AddClient-breadcrumb">
          <span>🏠</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span>Clients</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-active">Add Client</span>
        </div>
      </div>

      {/* Main Content Form Card */}
      <div className="AddClient-card">
        <h3 className="AddClient-card-title">Add Client</h3>
        
        <form onSubmit={handleSubmit} className="AddClient-form">
          <div className="AddClient-form-grid">
            
            {/* Input fields row 1 */}
            <div className={`AddClient-form-group ${errors.name ? 'error' : ''}`}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name*"
              />
              {errors.name && <span className="AddClient-error-text">{errors.name}</span>}
            </div>

            <div className={`AddClient-form-group ${errors.companyName ? 'error' : ''}`}>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Company Name*"
              />
              {errors.companyName && <span className="AddClient-error-text">{errors.companyName}</span>}
            </div>

            {/* Input fields row 2 */}
            <div className={`AddClient-form-group ${errors.email ? 'error' : ''}`}>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email*"
              />
              {errors.email && <span className="AddClient-error-text">{errors.email}</span>}
            </div>

            <div className={`AddClient-form-group ${errors.mobile ? 'error' : ''}`}>
              <input 
                type="text" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                placeholder="Mobile*"
              />
              {errors.mobile && <span className="AddClient-error-text">{errors.mobile}</span>}
            </div>

            {/* Custom Date Picker Group */}
            <div className={`AddClient-form-group date-picker-group ${errors.date ? 'error' : ''}`} ref={calendarRef}>
              <div className="AddClient-input-with-icon" onClick={() => setShowCalendar(!showCalendar)}>
                <input 
                  type="text" 
                  name="date" 
                  value={formData.date ? formData.date : ''} 
                  placeholder="Date*"
                  readOnly
                />
                <FaCalendarAlt className="AddClient-input-icon" />
              </div>
              {errors.date && <span className="AddClient-error-text">Please select date</span>}

              {/* Exact Custom Calendar Dropdown matching ref image */}
              {showCalendar && (
                <div className="AddClient-calendar-dropdown">
                  <div className="AddClient-calendar-header">
                    <div className="AddClient-calendar-month-year">
                      <span>{currentYear} {months[currentMonth]}</span>
                      <FaChevronDown className="dropdown-arrow-small" />
                    </div>
                    <div className="AddClient-calendar-nav">
                      <button type="button" onClick={handlePrevMonth}><FaChevronLeft /></button>
                      <button type="button" onClick={handleNextMonth}><FaChevronRight /></button>
                    </div>
                  </div>
                  
                  <div className="AddClient-calendar-weekdays">
                    {daysOfWeek.map(day => <div key={day} className="weekday-label">{day}</div>)}
                  </div>

                  <div className="AddClient-calendar-grid">
                    <div className="AddClient-calendar-month-label">{months[currentMonth]}</div>
                    {renderCalendarDays()}
                  </div>
                </div>
              )}
            </div>

            <div className={`AddClient-form-group ${errors.currency ? 'error' : ''}`}>
              <input 
                type="text" 
                name="currency" 
                value={formData.currency} 
                onChange={handleChange} 
                placeholder="Currency*"
              />
              {errors.currency && <span className="AddClient-error-text">{errors.currency}</span>}
            </div>
          </div>

          {/* Full width row layout for billing method dropdown */}
          <div className={`AddClient-form-group full-width ${errors.billingMethod ? 'error' : ''}`}>
            <div className="AddClient-select-wrapper">
              <select name="billingMethod" value={formData.billingMethod} onChange={handleChange}>
                <option value="" disabled hidden>Billing Method*</option>
                <option value="Hourly">Hourly</option>
                <option value="Fixed Rate">Fixed Rate</option>
                <option value="Monthly Retainer">Monthly Retainer</option>
              </select>
              <FaChevronDown className="AddClient-select-icon" />
            </div>
            {errors.billingMethod && <span className="AddClient-error-text">{errors.billingMethod}</span>}
          </div>

          {/* File Upload Region */}
          <div className="AddClient-upload-section">
            <label className="AddClient-upload-label">Upload Image</label>
            <div 
              className="AddClient-upload-dropzone"
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
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
              <button type="button" className="AddClient-upload-btn">Choose file</button>
              <span className="AddClient-upload-text">
                {formData.image ? formData.image.name : 'or drag and drop file here'}
              </span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="AddClient-actions">
            <button 
              type="submit" 
              className={`AddClient-btn-submit ${isFormFilled ? 'active' : 'disabled'}`}
              disabled={!isFormFilled}
            >
              Submit
            </button>
            <button type="button" className="AddClient-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;