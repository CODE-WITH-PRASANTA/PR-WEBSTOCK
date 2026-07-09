import React, { useState } from 'react';
import './CreateTicket.css';

const CreateTicket = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'Low',
    description: ''
  });

  const categories = ['Technical Issue', 'Billing & Invoice', 'Project Related', 'Other Queries'];
  
  // Form validation logic
  const isFormValid = formData.subject.trim() !== '' && 
                      formData.category !== '' && 
                      formData.description.trim() !== '';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="ticket-card">
      <header className="ticket-header">
        <h2 className="ticket-title">Create Ticket</h2>
        <div className="ticket-breadcrumb">🏠 Support &gt; New Ticket</div>
      </header>

      <form className="ticket-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="ticket-fieldset">
          <legend className="ticket-legend">Ticket Information</legend>
          
          <div className="ticket-form-row">
            <div className="ticket-form-field">
              <label>Subject*</label>
              <input type="text" name="subject" placeholder="Enter subject" className="ticket-input" onChange={handleInputChange} />
            </div>
            <div className="ticket-form-field">
              <label>Category*</label>
              <div className="ticket-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="dropdown-selected">{formData.category || 'Select category'}<span>▼</span></div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    {categories.map((cat) => (
                      <li key={cat} onClick={() => { setFormData({ ...formData, category: cat }); setIsDropdownOpen(false); }}>{cat}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="ticket-form-row">
            <div className="ticket-form-field">
              <label>Priority*</label>
              <select name="priority" className="ticket-input" onChange={handleInputChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="ticket-form-field">
            <label>Description*</label>
            <textarea name="description" className="ticket-input ticket-textarea" rows="5" placeholder="Enter details..." onChange={handleInputChange} />
          </div>
        </fieldset>

        <div className="ticket-actions">
          <button type="submit" className={`ticket-btn btn-raise ${isFormValid ? 'active' : ''}`} disabled={!isFormValid}>
            Raise Ticket
          </button>
          <button type="button" className="ticket-btn btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;