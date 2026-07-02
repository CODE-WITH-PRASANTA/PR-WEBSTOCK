import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiHome, FiChevronRight, FiSettings } from 'react-icons/fi';
import './EditHoliday.css';

const EditHoliday = () => {
  // Form States
  const [holidayNo, setHolidayNo] = useState('01');
  const [holidayName, setHolidayName] = useState('World Aids Day');
  const [holidayDate, setHolidayDate] = useState('2021-12-10');
  const [location, setLocation] = useState('All Locations');
  const [shift, setShift] = useState('All Shifts');
  const [details, setDetails] = useState('This festival is celebrate for.');

  // Calendar UI States
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  // Hardcoded calendar data matching your 2026 JUL reference image
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const calendarDays = [
    { day: '', current: false }, { day: '', current: false }, 
    { day: 1, current: false }, { day: 2, current: true }, 
    { day: 3, current: false }, { day: 4, current: false },
    { day: 5, current: false }, { day: 6, current: false }, 
    { day: 7, current: false }, { day: 8, current: false }, 
    { day: 9, current: false }, { day: 10, current: false }, 
    { day: 11, current: false }, { day: 12, current: false }, 
    { day: 13, current: false }, { day: 14, current: false }, 
    { day: 15, current: false }, { day: 16, current: false }, 
    { day: 17, current: false }, { day: 18, current: false }, 
    { day: 19, current: false }, { day: 20, current: false }, 
    { day: 21, current: false }, { day: 22, current: false }, 
    { day: 23, current: false }, { day: 24, current: false }, 
    { day: 25, current: false }, { day: 26, current: false }, 
    { day: 27, current: false }, { day: 28, current: false }, 
    { day: 29, current: false }, { day: 30, current: false }, 
    { day: 31, current: false }
  ];

  // Close calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form submission check
  const isFormValid = holidayNo && holidayName && holidayDate && location && shift && details;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert(`Form Submitted successfully!\nHoliday: ${holidayName}\nDate: ${holidayDate}`);
    }
  };

  const handleCancel = () => {
    alert('Action cancelled');
  };

  const handleDaySelect = (dayNum) => {
    if (dayNum) {
      // Formats selected day to 2026-07-XX for demo purposes
      const formattedDay = dayNum < 10 ? `0${dayNum}` : dayNum;
      setHolidayDate(`2026-07-${formattedDay}`);
      setShowCalendar(false);
    }
  };

  return (
    <div className="EditHoliday-container">
      {/* Top Header & Breadcrumb */}
      <div className="EditHoliday-header">
        <h1 className="EditHoliday-title">Edit Holiday</h1>
        <div className="EditHoliday-breadcrumb">
          <FiHome className="EditHoliday-breadcrumb-icon" />
          <FiChevronRight className="EditHoliday-breadcrumb-arrow" />
          <span>Holidays</span>
          <FiChevronRight className="EditHoliday-breadcrumb-arrow" />
          <span className="EditHoliday-breadcrumb-active">Edit Holiday</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="EditHoliday-card">
        {/* Floating Settings Gear Icon */}
        

        <h2 className="EditHoliday-card-title">Edit Holiday</h2>
        
        <form onSubmit={handleSubmit} className="EditHoliday-form">
          
          {/* Holiday No */}
          <div className="EditHoliday-fieldset">
            <label className="EditHoliday-label">Holiday No*</label>
            <input 
              type="text" 
              className="EditHoliday-input" 
              value={holidayNo} 
              onChange={(e) => setHolidayNo(e.target.value)}
              required
            />
          </div>

          {/* Holiday Name */}
          <div className="EditHoliday-fieldset">
            <label className="EditHoliday-label">Holiday Name*</label>
            <input 
              type="text" 
              className="EditHoliday-input" 
              value={holidayName} 
              onChange={(e) => setHolidayName(e.target.value)}
              required
            />
          </div>

          {/* Holiday Date with Custom Calendar Picker */}
          <div className="EditHoliday-fieldset EditHoliday-date-wrapper" ref={calendarRef}>
            <label className="EditHoliday-label">Holiday Date*</label>
            <div className="EditHoliday-input-with-icon" onClick={() => setShowCalendar(!showCalendar)}>
              <input 
                type="text" 
                className="EditHoliday-input" 
                value={holidayDate} 
                readOnly
                required
              />
              <FaCalendarAlt className="EditHoliday-calendar-icon" />
            </div>

            {/* Custom Smooth Calendar Dropdown */}
            <div className={`EditHoliday-calendar-dropdown ${showCalendar ? 'open' : ''}`}>
              <div className="EditHoliday-cal-header">
                <span className="EditHoliday-cal-month-year">2026 JUL <span className="EditHoliday-cal-arrow-down">▼</span></span>
                <div className="EditHoliday-cal-nav">
                  <span>&lt;</span>
                  <span>&gt;</span>
                </div>
              </div>
              
              <div className="EditHoliday-cal-weekdays">
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="EditHoliday-cal-weekday">{day}</div>
                ))}
              </div>

              <div className="EditHoliday-cal-days">
                {calendarDays.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`EditHoliday-cal-day ${item.current ? 'active' : ''} ${item.day ? 'clickable' : ''}`}
                    onClick={() => handleDaySelect(item.day)}
                  >
                    {item.day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="EditHoliday-fieldset">
            <label className="EditHoliday-label">Location*</label>
            <input 
              type="text" 
              className="EditHoliday-input" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Shift */}
          <div className="EditHoliday-fieldset">
            <label className="EditHoliday-label">Shift*</label>
            <input 
              type="text" 
              className="EditHoliday-input" 
              value={shift} 
              onChange={(e) => setShift(e.target.value)}
              required
            />
          </div>

          {/* Details */}
          <div className="EditHoliday-fieldset">
            <label className="EditHoliday-label">Details*</label>
            <textarea 
              className="EditHoliday-textarea" 
              value={details} 
              onChange={(e) => setDetails(e.target.value)}
              rows="3"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="EditHoliday-actions">
            <button 
              type="submit" 
              className={`EditHoliday-btn-submit ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
            <button 
              type="button" 
              className="EditHoliday-btn-cancel" 
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditHoliday;