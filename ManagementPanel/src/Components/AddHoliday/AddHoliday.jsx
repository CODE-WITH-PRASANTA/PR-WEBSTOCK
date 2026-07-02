import React, { useState, useRef, useEffect } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './AddHoliday.css';

const AddHoliday = () => {
  // Form input fields state
  const [formData, setFormData] = useState({
    holidayNo: '',
    holidayName: '',
    holidayDate: '',
    location: '',
    shift: '',
    details: ''
  });

  // UI States
  const [showCalendar, setShowCalendar] = useState(false);
  const [isTouched, setIsTouched] = useState({ holidayDate: false });
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Defaulting to July 2026 based on ref image
  const calendarRef = useRef(null);

  // Field change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Set selected date from custom calendar picker
  const handleDateSelect = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    
    setFormData((prev) => ({
      ...prev,
      holidayDate: `${year}-${month}-${formattedDay}`
    }));
    setShowCalendar(false);
  };

  // Close custom calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert('Holiday Added Successfully:\n' + JSON.stringify(formData, null, 2));
      // Reset form
      setFormData({ holidayNo: '', holidayName: '', holidayDate: '', location: '', shift: '', details: '' });
      setIsTouched({ holidayDate: false });
    }
  };

  // Check validity to toggle active/disabled submit button state
  const isFormValid = 
    formData.holidayNo.trim() !== '' &&
    formData.holidayName.trim() !== '' &&
    formData.holidayDate.trim() !== '' &&
    formData.location.trim() !== '' &&
    formData.shift.trim() !== '' &&
    formData.details.trim() !== '';

  // Calendar Engine Core Metrics
  const monthsArr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return (
    <div className="AddHoliday">
      {/* Top Header Breadcrumbs */}
      <div className="AddHoliday-breadcrumb">
        <h2>Add Holiday</h2>
        <div className="AddHoliday-breadcrumb-path">
          <span>🏠</span> &gt; <span>Holidays</span> &gt; <span className="active">Add Holiday</span>
        </div>
      </div>

      {/* Main Container Card Box */}
      <div className="AddHoliday-card">
        <div className="AddHoliday-card-title">New Holiday</div>
        
        <form onSubmit={handleSubmit} className="AddHoliday-form">
          
          {/* Holiday No Field */}
          <div className="AddHoliday-form-group focused">
            <label>Holiday No*</label>
            <input 
              type="text" 
              name="holidayNo" 
              value={formData.holidayNo} 
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* Holiday Name Field */}
          <div className="AddHoliday-form-group">
            <label>Holiday Name*</label>
            <input 
              type="text" 
              name="holidayName" 
              value={formData.holidayName} 
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* Holiday Date Input Field Area with Custom Picker Dialog */}
          <div 
            className={`AddHoliday-form-group ${(!formData.holidayDate && isTouched.holidayDate) ? 'error-boundary' : ''}`}
            ref={calendarRef}
          >
            <label className={(!formData.holidayDate && isTouched.holidayDate) ? 'error-text' : ''}>
              Holiday Date*
            </label>
            <div className="AddHoliday-date-input-wrapper">
              <input 
                type="text" 
                name="holidayDate"
                placeholder="YYYY-MM-DD"
                value={formData.holidayDate}
                onClick={() => {
                  setShowCalendar(true);
                  setIsTouched({ holidayDate: true });
                }}
                readOnly
                required
              />
              <FiCalendar 
                className="AddHoliday-calendar-icon" 
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setIsTouched({ holidayDate: true });
                }}
              />
            </div>
            
            {/* Native Inline Validation Message */}
            {!formData.holidayDate && isTouched.holidayDate && (
              <span className="AddHoliday-error-message">Please select date</span>
            )}

            {/* Custom Interactive Calendar Dropdown Element */}
            {showCalendar && (
              <div className="AddHoliday-calendar-dropdown">
                <div className="AddHoliday-calendar-header">
                  <div className="AddHoliday-calendar-ym">
                    {currentDate.getFullYear()} {monthsArr[currentDate.getMonth()]} ▾
                  </div>
                  <div className="AddHoliday-calendar-arrows">
                    <button type="button" onClick={() => changeMonth(-1)}><FiChevronLeft /></button>
                    <button type="button" onClick={() => changeMonth(1)}><FiChevronRight /></button>
                  </div>
                </div>
                
                <div className="AddHoliday-calendar-weekdays">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => (
                    <div key={w} className="weekday-lbl">{w}</div>
                  ))}
                </div>

                <div className="AddHoliday-calendar-days-grid">
                  <div className="month-row-lbl">{monthsArr[currentDate.getMonth()]}</div>
                  {calendarDays.map((day, index) => {
                    const isSelected = formData.holidayDate === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    // Highlights July 2nd 2026 to stay visually faithful to original mock
                    const isTodayMock = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 6 && day === 2;
                    
                    return (
                      <div 
                        key={index} 
                        className={`calendar-day-cell ${!day ? 'empty' : ''} ${isSelected ? 'selected' : ''} ${isTodayMock ? 'today-highlight' : ''}`}
                        onClick={() => day && handleDateSelect(day)}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Location Field */}
          <div className="AddHoliday-form-group">
            <label>Location*</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* Shift Field */}
          <div className="AddHoliday-form-group">
            <label>Shift*</label>
            <input 
              type="text" 
              name="shift" 
              value={formData.shift} 
              onChange={handleInputChange}
              required 
            />
          </div>

          {/* Details Text Area Box */}
          <div className="AddHoliday-form-group full-width">
            <label>Details*</label>
            <textarea 
              name="details" 
              rows="4" 
              value={formData.details} 
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Action Operation Buttons */}
          <div className="AddHoliday-form-actions">
            <button 
              type="submit" 
              className={`AddHoliday-btn-submit ${isFormValid ? 'active' : 'disabled'}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
            <button 
              type="button" 
              className="AddHoliday-btn-cancel"
              onClick={() => setFormData({ holidayNo: '', holidayName: '', holidayDate: '', location: '', shift: '', details: '' })}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddHoliday;