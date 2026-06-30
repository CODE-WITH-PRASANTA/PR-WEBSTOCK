import React, { useState, useRef } from 'react';
import './Calender.css';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar, 
  FiClock, 
  FiBookmark, 
  FiChevronDown, 
  FiChevronUp, 
  FiX, 
  FiHome 
} from 'react-icons/fi';

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
  
  // Inline Dropdown Toggle States
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('16:31');
  const [selectedEndTime, setSelectedEndTime] = useState('17:43');

  // Ref hook to clear ongoing async delays if users double-click other cells rapidly
  const clickDelayRef = useRef(null);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const categories = ['Work', 'Personal', 'Important', 'Travel', 'Friends'];
  const timeOptions = ['00:00', '00:30', '01:00', '01:30', '02:00', '16:31', '17:43'];
  const [calendars, setCalendars] = useState({ work: true, personal: true, important: true, travel: true, friends: true });

  const handleCheckboxChange = (key) => setCalendars(prev => ({ ...prev, [key]: !prev[key] }));

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setSelectedDayIndex(null); // Instantly clears background color highlight when page closes
      setShowCategoryDropdown(false);
      setShowStartDatePicker(false);
      setShowStartTimeDropdown(false);
      setShowEndDatePicker(false);
      setShowEndTimeDropdown(false);
    }, 300);
  };

  const handleDayClick = (e, index) => {
    e.stopPropagation();
    if (clickDelayRef.current) clearTimeout(clickDelayRef.current);
    
    setSelectedDayIndex(index); // 1. Add background color instantly
    
    // 2. Exact 0.4 seconds (400 milliseconds) countdown delay before popup opens
    clickDelayRef.current = setTimeout(() => {
      setShowModal(true);
    }, 400);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const totalDaysPrevMonth = new Date(year, month, 0).getDate();
    const daysArray = [];

    for (let i = firstDayIndex; i > 0; i--) {
      daysArray.push({ dayNum: totalDaysPrevMonth - i + 1, isCurrentMonth: false });
    }
    for (let j = 1; j <= totalDays; j++) {
      daysArray.push({ dayNum: j, isCurrentMonth: true });
    }
    const remainingCells = 42 - daysArray.length;
    for (let k = 1; k <= remainingCells; k++) {
      daysArray.push({ dayNum: k, isCurrentMonth: false });
    }
    return daysArray;
  };

  return (
    <div className="cr-app-viewport">
      <header className="cr-dashboard-top-bar">
        <h1 className="cr-dashboard-main-heading">Calendar</h1>
        <div className="cr-dashboard-nav-breadcrumbs">
          <FiHome className="cr-nav-home-icon" />
          <FiChevronRight className="cr-nav-arrow-divider" />
          <span>Calendar</span>
        </div>
      </header>

      <div className="cr-calendar-card-workspace">
        <div className="cr-workspace-action-toolbar">
          <div className="cr-toolbar-left-actions-group">
            <button className="cr-add-event-action-trigger-btn" onClick={() => setShowModal(true)}>Add Event</button>
            <div className="cr-navigation-arrows-container">
              <button className="cr-nav-arrow-control-btn" onClick={() => { setCurrentDate(p => new Date(p.getFullYear(), p.getMonth() - 1, 1)); setSelectedDayIndex(null); }}><FiChevronLeft /></button>
              <button className="cr-nav-arrow-control-btn" onClick={() => { setCurrentDate(p => new Date(p.getFullYear(), p.getMonth() + 1, 1)); setSelectedDayIndex(null); }}><FiChevronRight /></button>
            </div>
            <button className="cr-nav-today-indicator-btn" onClick={() => { setCurrentDate(new Date()); setSelectedDayIndex(null); }}>today</button>
          </div>
          <h2 className="cr-toolbar-current-view-title">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <div className="cr-toolbar-fixed-view-selectors"><button className="cr-view-btn-month active">month</button></div>
        </div>

        <div className="cr-calendar-workspace-split-body">
          <aside className="cr-calendar-sidebar-panel">
            <h3 className="cr-sidebar-group-labels-title">My Calendars</h3>
            <div className="cr-sidebar-checkbox-stack-list">
              {Object.keys(calendars).map((key) => (
                <label key={key} className="cr-checkbox-interactive-row">
                  <input type="checkbox" checked={calendars[key]} onChange={() => handleCheckboxChange(key)} />
                  <span className="cr-custom-checkbox-box"></span>
                  <span className="cr-checkbox-label-text-element">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>
          </aside>

          <main className="cr-calendar-grid-display-pane">
            <div className="cr-month-grid-cells-layout-container">
              {weekDays.map((day) => <div key={day} className="cr-month-grid-day-header-cell">{day}</div>)}
              {getDaysInMonth().map((cell, index) => (
                <div 
                  key={index} 
                  className={`cr-month-grid-date-box-square-cell ${selectedDayIndex === index ? 'is-selected' : ''}`}
                  onClick={(e) => handleDayClick(e, index)}
                >
                  <span className={`cr-date-number-label-text ${!cell.isCurrentMonth ? 'cr-dimmed-label-out-of-month' : ''}`}>
                    {cell.dayNum}
                  </span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {showModal && (
        <div className={`cr-modal-layer-dim-backdrop ${isClosing ? 'cr-fade-out' : ''}`} onClick={handleCloseModal}>
          <div className={`cr-add-event-dialog-card ${isClosing ? 'cr-scale-down' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="cr-dialog-header-banner">
              <h2 className="cr-dialog-header-title-text">New Event</h2>
              <button className="cr-dialog-dismiss-circle-btn" onClick={handleCloseModal}><FiX /></button>
            </div>

            <form className="cr-dialog-input-elements-form" onSubmit={(e) => e.preventDefault()}>
              <div className="cr-form-interactive-input-row">
                <input type="text" placeholder="Title*" className="cr-form-text-input-field" />
                <FiBookmark className="cr-input-trailing-icon-element" />
              </div>

              <div className="cr-form-interactive-input-row custom-dropdown-wrapper">
                <div className={`cr-form-select-surrogate-field ${showCategoryDropdown ? 'dropdown-active-borders' : ''}`} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                  <span className={selectedCategory ? 'selected-txt' : 'placeholder-txt'}>{selectedCategory || 'Category*'}</span>
                  {showCategoryDropdown ? <FiChevronUp className="cr-input-trailing-icon-element" /> : <FiChevronDown className="cr-input-trailing-icon-element" />}
                </div>
                {showCategoryDropdown && (
                  <ul className="cr-dropdown-floating-options-list">
                    {categories.map((cat) => (
                      <li key={cat} className={`cr-dropdown-option-item ${selectedCategory === cat ? 'active-item' : ''}`} onClick={() => { setSelectedCategory(cat); setShowCategoryDropdown(false); }}>{cat}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="cr-form-split-columns-inline-group">
                <div className="cr-form-fieldset-input-block-container">
                  <label className="cr-fieldset-top-floating-label">Start date</label>
                  <input type="text" readOnly value="30/06/2026" className="cr-fieldset-data-input-field" />
                  <FiCalendar className="cr-fieldset-trailing-icon-element clickable" onClick={() => { setShowStartDatePicker(!showStartDatePicker); setShowEndDatePicker(false); }} />
                  {showStartDatePicker && (
                    <div className="cr-micro-datepicker-floating-card-panel">
                      <div className="cr-micro-dp-header">
                        <div className="cr-micro-dp-month-select-row"><span>JUN 2026</span><FiChevronDown /></div>
                        <div className="cr-micro-dp-nav-arrows"><FiChevronLeft /><FiChevronRight /></div>
                      </div>
                      <div className="cr-micro-dp-week-days-labels-grid"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                      <p className="cr-micro-dp-month-tag">JUN</p>
                      <div className="cr-micro-dp-days-grid-matrix">
                        {Array.from({ length: 30 }).map((_, dIdx) => (
                          <span key={dIdx} className={`cr-micro-dp-day-cell ${dIdx + 1 === 30 ? 'active-highlighted-day' : ''}`}>{dIdx + 1}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="cr-form-fieldset-input-block-container">
                  <label className="cr-fieldset-top-floating-label">Start time</label>
                  <input type="text" readOnly value={selectedStartTime} className="cr-fieldset-data-input-field" />
                  <FiClock className="cr-fieldset-trailing-icon-element clickable" onClick={() => { setShowStartTimeDropdown(!showStartTimeDropdown); setShowEndTimeDropdown(false); }} />
                  {showStartTimeDropdown && (
                    <ul className="cr-micro-timepicker-floating-dropdown-menu">
                      {timeOptions.map((time) => (
                        <li key={time} className={`cr-time-option-item ${selectedStartTime === time ? 'active-time' : ''}`} onClick={() => { setSelectedStartTime(time); setShowStartTimeDropdown(false); }}>{time}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="cr-form-split-columns-inline-group">
                <div className="cr-form-fieldset-input-block-container">
                  <label className="cr-fieldset-top-floating-label">End date</label>
                  <input type="text" readOnly value="30/06/2026" className="cr-fieldset-data-input-field" />
                  <FiCalendar className="cr-fieldset-trailing-icon-element clickable" onClick={() => { setShowEndDatePicker(!showEndDatePicker); setShowStartDatePicker(false); }} />
                  {showEndDatePicker && (
                    <div className="cr-micro-datepicker-floating-card-panel">
                      <div className="cr-micro-dp-header">
                        <div className="cr-micro-dp-month-select-row"><span>JUN 2026</span><FiChevronDown /></div>
                        <div className="cr-micro-dp-nav-arrows"><FiChevronLeft /><FiChevronRight /></div>
                      </div>
                      <div className="cr-micro-dp-week-days-labels-grid"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                      <p className="cr-micro-dp-month-tag">JUN</p>
                      <div className="cr-micro-dp-days-grid-matrix">
                        {Array.from({ length: 30 }).map((_, dIdx) => (
                          <span key={dIdx} className={`cr-micro-dp-day-cell ${dIdx + 1 === 30 ? 'active-highlighted-day' : ''}`}>{dIdx + 1}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="cr-form-fieldset-input-block-container">
                  <label className="cr-fieldset-top-floating-label">End time</label>
                  <input type="text" readOnly value={selectedEndTime} className="cr-fieldset-data-input-field" />
                  <FiClock className="cr-fieldset-trailing-icon-element clickable" onClick={() => { setShowEndTimeDropdown(!showEndTimeDropdown); setShowStartTimeDropdown(false); }} />
                  {showEndTimeDropdown && (
                    <ul className="cr-micro-timepicker-floating-dropdown-menu">
                      {timeOptions.map((time) => (
                        <li key={time} className={`cr-time-option-item ${selectedEndTime === time ? 'active-time' : ''}`} onClick={() => { setSelectedEndTime(time); setShowEndTimeDropdown(false); }}>{time}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="cr-form-interactive-input-row">
                <textarea placeholder="Event Details" className="cr-form-textarea-input-field" rows="3"></textarea>
              </div>

              <div className="cr-form-action-buttons-footer-panel-row">
                <button type="submit" className="cr-action-save-submit-btn">Save</button>
                <button type="button" className="cr-action-cancel-dismiss-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;