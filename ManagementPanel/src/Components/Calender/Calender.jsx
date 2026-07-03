import React, { useState } from 'react';
import './Calender.css';

const Calender = () => {
  // State for tracking the currently displayed month/year view
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Default initialized to July 2026
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Calendar Checkbox Filters State
  const [calendars, setCalendars] = useState({
    work: true,
    personal: true,
    important: true,
    travel: true,
    friends: true
  });

  // Event Form State variables matching image layout specifications
  const [eventForm, setEventForm] = useState({
    title: '',
    category: '',
    startDate: '2026-07-03',
    startTime: '14:39',
    endDate: '2026-07-03',
    endTime: '14:39',
    details: ''
  });

  // Array of events for rendering directly on the grid view layers
  const [eventsList, setEventsList] = useState([
    { title: 'Project sync', date: 3, category: 'work' }
  ]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Core Calendar Navigation Handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date(2026, 6, 1)); // Returns view context frame to July 2026
  };

  const handleCheckboxToggle = (key) => {
    setCalendars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({ ...prev, [name]: value }));
  };

  // Click handler assigned directly to functional active layout cells 
  const handleDayClick = (cell) => {
    if (!cell.isCurrentMonth) return;

    const year = currentDate.getFullYear();
    // Months are 0-indexed in JS, pad start string with zero for input[type="date"] format compliance
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(cell.dayNumber).padStart(2, '0');
    const formattedSelectedDate = `${year}-${month}-${day}`;

    setEventForm(prev => ({
      ...prev,
      startDate: formattedSelectedDate,
      endDate: formattedSelectedDate
    }));
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    const eventDay = new Date(eventForm.startDate).getDate();
    const newEvent = {
      title: eventForm.title,
      date: eventDay,
      category: eventForm.category.toLowerCase() || 'work'
    };
    setEventsList([...eventsList, newEvent]);
    setIsModalOpen(false);
    
    // Reset form values
    setEventForm({
      title: '', category: '', startDate: '2026-07-03', startTime: '14:39', endDate: '2026-07-03', endTime: '14:39', details: ''
    });
  };

  // Logic to build matrix dates for the active month view grid
  const getDaysInMonthMatrix = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const totalDaysLastMonth = new Date(year, month, 0).getDate();
    
    const cells = [];
    
    // Previous Month padding items
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({ dayNumber: totalDaysLastMonth - i, isCurrentMonth: false });
    }
    
    // Active Month structural content grid
    for (let i = 1; i <= totalDays; i++) {
      cells.push({ dayNumber: i, isCurrentMonth: true });
    }
    
    // Next Month trailing filler blocks
    const totalRemainingCells = 42 - cells.length; // Lock matrix layout view to 6 row blocks
    for (let i = 1; i <= totalRemainingCells; i++) {
      cells.push({ dayNumber: i, isCurrentMonth: false });
    }
    
    return cells;
  };

  const gridCells = getDaysInMonthMatrix();

  return (
    <div className="cal-main-dashboard">
      {/* Upper Path Breadcrumb Navigation Component */}
      <div className="cal-top-routing-header">
        <h2 className="cal-module-title-text">Calendar</h2>
        <div className="cal-breadcrumbs-bar">
          <span>🏠</span> <span className="cal-breadcrumb-separator">›</span>
          <span className="cal-breadcrumb-terminal">Calendar</span>
        </div>
      </div>

      {/* Main Structural Board View Wrapper */}
      <div className="cal-app-board-container">
        
        {/* Left Side Active Filters Column Container panel */}
        <aside className="cal-sidebar-filter-column">
          <button className="cal-add-event-action-button" onClick={() => setIsModalOpen(true)}>
            Add Event
          </button>
          
          <div className="cal-filter-group-wrapper">
            <h4 className="cal-filter-heading-text">My Calendars</h4>
            
            <label className="cal-filter-checkbox-row">
              <input type="checkbox" checked={calendars.work} onChange={() => handleCheckboxToggle('work')} />
              <span className="cal-custom-checkbox-label">Work</span>
            </label>

            <label className="cal-filter-checkbox-row">
              <input type="checkbox" checked={calendars.personal} onChange={() => handleCheckboxToggle('personal')} />
              <span className="cal-custom-checkbox-label">Personal</span>
            </label>

            <label className="cal-filter-checkbox-row">
              <input type="checkbox" checked={calendars.important} onChange={() => handleCheckboxToggle('important')} />
              <span className="cal-custom-checkbox-label">Important</span>
            </label>

            <label className="cal-filter-checkbox-row">
              <input type="checkbox" checked={calendars.travel} onChange={() => handleCheckboxToggle('travel')} />
              <span className="cal-custom-checkbox-label">Travel</span>
            </label>

            <label className="cal-filter-checkbox-row">
              <input type="checkbox" checked={calendars.friends} onChange={() => handleCheckboxToggle('friends')} />
              <span className="cal-custom-checkbox-label">Friends</span>
            </label>
          </div>
        </aside>

        {/* Right Main Interactive Work Grid View Calendar */}
        <main className="cal-grid-viewport-main-panel">
          
          {/* Header Action Control Bar Strip */}
          <div className="cal-grid-controls-strip">
            <div className="cal-navigation-arrows-block">
              <button className="cal-nav-arrow-btn" onClick={handlePrevMonth}>‹</button>
              <button className="cal-nav-arrow-btn" onClick={handleNextMonth}>›</button>
              <button className="cal-nav-today-btn" onClick={handleGoToToday}>today</button>
            </div>
            
            <h3 className="cal-month-heading-title-label">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <div className="cal-grid-header-right-placeholder"></div>
          </div>

          {/* Core Monthly Layout Matrix Table Box */}
          <div className="cal-matrix-grid-frame-box">
            <div className="cal-matrix-weekdays-header-strip">
              {daysOfWeek.map((day) => (
                <div key={day} className="cal-matrix-weekday-cell-label">{day}</div>
              ))}
            </div>

            <div className="cal-matrix-days-cells-wrapper">
              {gridCells.map((cell, index) => {
                const isTargetHighlight = currentDate.getFullYear() === 2026 && 
                                          currentDate.getMonth() === 6 && 
                                          cell.dayNumber === 3 && 
                                          cell.isCurrentMonth;

                return (
                  <div 
                    key={index} 
                    onClick={() => handleDayClick(cell)}
                    className={`cal-matrix-day-cell-block ${!cell.isCurrentMonth ? 'cal-day-muted-out-state' : 'cal-day-interactive-clickable'}`}
                  >
                    <span className={`cal-matrix-cell-day-number ${isTargetHighlight ? 'cal-cell-day-badge-highlight' : ''}`}>
                      {cell.dayNumber}
                    </span>
                    
                    {/* Render active saved calendar items inside layout */}
                    {cell.isCurrentMonth && eventsList
                      .filter(e => e.date === cell.dayNumber && calendars[e.category])
                      .map((e, idx) => (
                        <div key={idx} className={`cal-embedded-event-tag cat-type-${e.category}`}>
                          {e.title}
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Persistent DOM element wrapped with state-based active classes to support transition animations */}
      <div className={`cal-modal-overlay-backdrop ${isModalOpen ? 'active' : ''}`}>
        <div className="cal-modal-window-box">
          <div className="cal-modal-header-banner">
            <h3 className="cal-modal-header-headline-text">New Event</h3>
            <button type="button" className="cal-modal-header-close-dismissal-cross-btn" onClick={() => setIsModalOpen(false)}>×</button>
          </div>

          <form onSubmit={handleSaveEvent} className="cal-modal-form-scrollable-body">
            
            <div className="cal-modal-form-input-row">
              <div className="cal-modal-form-input-element-group">
                <label>Title*</label>
                <div className="cal-modal-input-field-relative-wrapper">
                  <input type="text" name="title" value={eventForm.title} onChange={handleFormChange} placeholder="Title" required />
                  <span className="cal-modal-input-embedded-right-icon">🔖</span>
                </div>
              </div>
            </div>

            <div className="cal-modal-form-input-row">
              <div className="cal-modal-form-input-element-group">
                <label>Category*</label>
                <div className="cal-modal-input-field-relative-wrapper">
                  <select name="category" value={eventForm.category} onChange={handleFormChange} required>
                    <option value="">Category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Important">Important</option>
                    <option value="Travel">Travel</option>
                    <option value="Friends">Friends</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="cal-modal-form-dual-inputs-split-row">
              <div className="cal-modal-form-input-element-group cal-field-width-half">
                <label>Start date</label>
                <div className="cal-modal-input-field-relative-wrapper">
                  <input type="date" name="startDate" value={eventForm.startDate} onChange={handleFormChange} />
                </div>
              </div>

              <div className="cal-modal-form-input-element-group cal-field-width-half">
                <label>Start time</label>
                <div className="cal-modal-input-field-relative-wrapper">
                  <input type="time" name="startTime" value={eventForm.startTime} onChange={handleFormChange} />
                </div>
              </div>
            </div>

            <div className="cal-modal-form-dual-inputs-split-row">
              <div className="cal-modal-form-input-element-group cal-field-width-half">
                <label>End date</label>
                <div className="cal-modal-input-field-relative-wrapper">
                  <input type="date" name="endDate" value={eventForm.endDate} onChange={handleFormChange} />
                </div>
              </div>

              <div className="cal-modal-form-input-element-group cal-field-width-half">
                <label>End time</label>
                <div className="cal-modal-input-field-relative-wrapper">
                  <input type="time" name="endTime" value={eventForm.endTime} onChange={handleFormChange} />
                </div>
              </div>
            </div>

            <div className="cal-modal-form-input-row">
              <div className="cal-modal-form-input-element-group">
                <label>Event Details</label>
                <textarea name="details" value={eventForm.details} onChange={handleFormChange} rows="3" placeholder="Event Details" />
              </div>
            </div>

            <div className="cal-modal-form-action-buttons-strip">
              <button type="submit" className="cal-modal-btn-submit-save">Save</button>
              <button type="button" className="cal-modal-btn-cancel-dismiss" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calender;