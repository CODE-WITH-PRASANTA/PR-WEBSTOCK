import React, { useState, useEffect } from 'react';
import './Leave.css';
import API from "../../api/axios"; // Uses your pre-configured Axios instance

const Leave = () => {
  const [formData, setFormData] = useState({
    applicationDate: new Date().toISOString().split('T')[0],
    leaveType: '',
    fromDate: '',
    toDate: '',
    halfDay: 'No',
    reason: ''
  });

  // State to hold dynamic leave types fetched from the backend
  const [leaveOptions, setLeaveOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingOptions, setFetchingOptions] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch leave types from backend on component mount
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const token = localStorage.getItem('employeeToken');
        
        // Fetching your leave types using the base endpoint connected to leaveTypeRoutes
        const response = await API.get('/leave-types', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data && response.data.success) {
          // Filter out Inactive leaves if desired, otherwise use response.data.data
          const activeLeaves = response.data.data.filter(leave => leave.status === 'Active');
          setLeaveOptions(activeLeaves);
        }
      } catch (err) {
        console.error("Error fetching leave types:", err);
        setMessage({ 
          type: 'error', 
          text: 'Failed to load available leave categories. Please reload.' 
        });
      } finally {
        setFetchingOptions(false);
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('employeeToken'); 
      if (!token) {
        throw new Error('Authentication token missing. Please log in again.');
      }

      await API.post('/leaves', {
        leaveType: formData.leaveType, // This will now send either the selected _id or leaveName string based on your selection below
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        halfDay: formData.halfDay,
        reason: formData.reason
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMessage({ type: 'success', text: 'Leave Application Submitted Successfully!' });
      
      setFormData({
        applicationDate: new Date().toISOString().split('T')[0],
        leaveType: '',
        fromDate: '',
        toDate: '',
        halfDay: 'No',
        reason: ''
      });

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.leaveType && formData.fromDate && formData.toDate && formData.reason.trim();

  return (
    <div className="leave-app">
      <div className="leave-app__header">
        <h1 className="leave-app__title">Apply Leave</h1>
      </div>
      <div className="leave-app__card">
        {message.text && (
          <div style={{
            padding: '12px', marginBottom: '15px', borderRadius: '6px',
            color: message.type === 'success' ? '#2b8a3e' : '#c92a2a',
            backgroundColor: message.type === 'success' ? '#ebfbee' : '#fff5f5',
            fontWeight: '600'
          }}>
            {message.text}
          </div>
        )}
        <form className="leave-app__form" onSubmit={handleSubmit}>
          <div className="leave-app__form-row leave-app__form-row--two-cols">
            <div className="leave-app__input-group">
              <label className="leave-app__label">Application Date</label>
              <input type="date" name="applicationDate" value={formData.applicationDate} disabled className="leave-app__input" />
            </div>
            <div className="leave-app__input-group">
              <label className="leave-app__label">Leave Type*</label>
              <select 
                name="leaveType" 
                value={formData.leaveType} 
                onChange={handleChange} 
                className="leave-app__select" 
                required
                disabled={fetchingOptions}
              >
                <option value="" disabled hidden>
                  {fetchingOptions ? "Loading options..." : "Select Leave Type"}
                </option>
                {leaveOptions.map((leave) => (
                  // Use leave.leaveName as value if your '/leaves' API expects a string description
                  // Use leave.id or leave._id if your '/leaves' API expects a MongoDB reference ID
                  <option key={leave.id || leave._id} value={leave.leaveName}>
                    {leave.leaveName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="leave-app__form-row leave-app__form-row--two-cols">
            <div className="leave-app__input-group">
              <label className="leave-app__label">From Date*</label>
              <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className="leave-app__input" required />
            </div>
            <div className="leave-app__input-group">
              <label className="leave-app__label">To Date*</label>
              <input type="date" name="toDate" min={formData.fromDate} value={formData.toDate} onChange={handleChange} className="leave-app__input" required />
            </div>
          </div>
          <div className="leave-app__form-row">
            <div className="leave-app__input-group">
              <label className="leave-app__label">Half Day*</label>
              <select name="halfDay" value={formData.halfDay} onChange={handleChange} className="leave-app__select">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
          <div className="leave-app__form-row">
            <div className="leave-app__input-group">
              <label className="leave-app__label">Reason for Leave*</label>
              <textarea name="reason" value={formData.reason} onChange={handleChange} className="leave-app__textarea" rows="4" required></textarea>
            </div>
          </div>
          <div className="leave-app__actions">
            <button type="submit" className={`leave-app__btn ${isFormValid && !loading ? 'leave-app__btn--submit-active' : 'leave-app__btn--submit'}`} disabled={!isFormValid || loading}>
              {loading ? 'Submitting...' : 'Apply Leave'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leave;