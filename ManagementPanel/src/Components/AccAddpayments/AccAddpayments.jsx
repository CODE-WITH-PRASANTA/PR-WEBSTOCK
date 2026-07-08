import React, { useState, useRef, useEffect } from 'react';
import { 
  FiCalendar, FiChevronLeft, FiChevronRight, FiChevronDown 
} from 'react-icons/fi';
import './AccAddpayments.css';

const AccAddpayments = () => {
  // Form State
  const [formData, setFormData] = useState({
    billNo: '',
    clientName: '',
    paymentDate: '',
    paymentAmount: '',
    paymentMethod: '',
    transactionId: '',
    paymentStatus: '',
    currency: '',
    description: ''
  });

  // UI Control States
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Calendar Engine States (Defaulted to July 2026 based on reference)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed: 6 is July

  // Dropdown Configurations from Reference Images
  const paymentMethods = ["Cash", "Cheque", "Credit Card", "Debit Card", "Net Banking", "Insurance"];
  const paymentStatuses = ["Complete", "Pending", "Partial"];
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Refs for closing elements when clicking outside
  const calendarRef = useRef(null);
  const methodRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false);
      if (methodRef.current && !methodRef.current.contains(event.target)) setShowMethodDropdown(false);
      if (statusRef.current && !statusRef.current.contains(event.target)) setShowStatusDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form Submission Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Submitted Data:", formData);
  };

  // Form Reset / Cancel Logic
  const handleCancel = () => {
    setFormData({
      billNo: '', clientName: '', paymentDate: '', paymentAmount: '',
      paymentMethod: '', transactionId: '', paymentStatus: '', currency: '', description: ''
    });
  };

  // Custom Calendar Generator Functions
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const generateDaysInMonth = () => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = [];

    // Pad initial blank spaces for alignment matching days of the week
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(day);
    }
    return daysArray;
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    setFormData({ ...formData, paymentDate: `${currentYear}-${formattedMonth}-${formattedDay}` });
    setShowCalendar(false);
  };

  return (
    <div className="AccAddpayments-container">
      {/* Top Breadcrumb Bar Component */}
      <div className="AccAddpayments-header-nav">
        <span className="AccAddpayments-title">Add Payments</span>
        <div className="AccAddpayments-breadcrumb">
          <span>🏠</span> &gt; <span>Accounts</span> &gt; <span className="AccAddpayments-active-crumb">Add Payments</span>
        </div>
      </div>

      {/* Main Base Interactive Workspace Form Card */}
      <div className="AccAddpayments-card">
        <div className="AccAddpayments-card-header">
          Add Payments
        </div>

        <form onSubmit={handleSubmit} className="AccAddpayments-form">
          
          {/* Row Field: Bill No */}
          <div className="AccAddpayments-form-group">
            <label>Bill No*</label>
            <input 
              type="text" 
              required 
              value={formData.billNo}
              onChange={(e) => setFormData({...formData, billNo: e.target.value})}
            />
          </div>

          {/* Row Field: Client Name */}
          <div className="AccAddpayments-form-group">
            <label>Client Name*</label>
            <input 
              type="text" 
              required 
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            />
          </div>

          {/* Row Field: Payment Date containing Custom Interactive Calendar Context Panel */}
          <div className="AccAddpayments-form-group" ref={calendarRef}>
            <label>Payment Date*</label>
            <div className="AccAddpayments-input-wrapper" onClick={() => setShowCalendar(!showCalendar)}>
              <input 
                type="text" 
                placeholder="YYYY-MM-DD"
                readOnly
                required
                value={formData.paymentDate}
              />
              <FiCalendar className="AccAddpayments-input-icon" />
            </div>

            {/* Custom Interactive Calendar Popup Window Layer */}
            {showCalendar && (
              <div className="AccAddpayments-calendar-popup">
                <div className="AccAddpayments-calendar-header">
                  <span className="AccAddpayments-calendar-month-year">
                    {currentYear} {monthNames[currentMonth]} <FiChevronDown />
                  </span>
                  <div className="AccAddpayments-calendar-nav-arrows">
                    <button type="button" onClick={handlePrevMonth}><FiChevronLeft /></button>
                    <button type="button" onClick={handleNextMonth}><FiChevronRight /></button>
                  </div>
                </div>
                <div className="AccAddpayments-calendar-weekdays">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div className="AccAddpayments-calendar-days">
                  {generateDaysInMonth().map((day, idx) => {
                    const isSelected = day && formData.paymentDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    return (
                      <span 
                        key={idx} 
                        className={`AccAddpayments-calendar-day-cell ${!day ? 'empty' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleDateSelect(day)}
                      >
                        {day === 1 ? `${monthNames[currentMonth]} 1` : day}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Row Field: Payment Amount */}
          <div className="AccAddpayments-form-group">
            <label>Payment Amount*</label>
            <input 
              type="number" 
              required 
              value={formData.paymentAmount}
              onChange={(e) => setFormData({...formData, paymentAmount: e.target.value})}
            />
          </div>

          {/* Row Field: Payment Method featuring Custom dropdown alignment view */}
          <div className="AccAddpayments-form-group" ref={methodRef}>
            <label>Payment Method*</label>
            <div className="AccAddpayments-input-wrapper" onClick={() => setShowMethodDropdown(!showMethodDropdown)}>
              <input 
                type="text" 
                placeholder="Select Payment Method"
                readOnly 
                required
                value={formData.paymentMethod}
              />
              <FiChevronDown className="AccAddpayments-input-icon dropdown-arrow" />
            </div>
            {showMethodDropdown && (
              <div className="AccAddpayments-custom-dropdown">
                {paymentMethods.map((method) => (
                  <div 
                    key={method} 
                    className={`AccAddpayments-dropdown-item ${formData.paymentMethod === method ? 'active' : ''}`}
                    onClick={() => {
                      setFormData({...formData, paymentMethod: method});
                      setShowMethodDropdown(false);
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Row Field: Transaction ID */}
          <div className="AccAddpayments-form-group">
            <label>Transaction ID</label>
            <input 
              type="text" 
              value={formData.transactionId}
              onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
            />
          </div>

          {/* Row Field: Payment Status featuring Custom drop list wrapper context */}
          <div className="AccAddpayments-form-group" ref={statusRef}>
            <label>Payment Status*</label>
            <div className="AccAddpayments-input-wrapper" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
              <input 
                type="text" 
                placeholder="Select Payment Status"
                readOnly 
                required
                value={formData.paymentStatus}
              />
              <FiChevronDown className="AccAddpayments-input-icon dropdown-arrow" />
            </div>
            {showStatusDropdown && (
              <div className="AccAddpayments-custom-dropdown">
                {paymentStatuses.map((status) => (
                  <div 
                    key={status} 
                    className={`AccAddpayments-dropdown-item ${formData.paymentStatus === status ? 'active' : ''}`}
                    onClick={() => {
                      setFormData({...formData, paymentStatus: status});
                      setShowStatusDropdown(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Row Field: Currency */}
          <div className="AccAddpayments-form-group">
            <label>Currency*</label>
            <input 
              type="text" 
              required 
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
            />
          </div>

          {/* Full-Width Row Field: Description */}
          <div className="AccAddpayments-form-group full-width">
            <label>Description</label>
            <textarea 
              rows="3" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          {/* Form Trigger Buttons Area Panel */}
          <div className="AccAddpayments-form-actions">
            <button type="submit" className="AccAddpayments-btn-submit">Submit</button>
            <button type="button" className="AccAddpayments-btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AccAddpayments;