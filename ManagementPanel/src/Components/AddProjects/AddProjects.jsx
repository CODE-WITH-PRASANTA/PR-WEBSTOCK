import React, { useState, useRef, useEffect } from 'react';
import './AddProjects.css';

const AddProjects = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', gender: '', mobile: '',
    password: '', reEnterPassword: '', designation: '',
    department: '', address: '', email: '', dob: '',
    education: '', salary: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isYearGridView, setIsYearGridView] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June
  const [selectedDay, setSelectedDay] = useState(30);
  const [yearGridStart, setYearGridStart] = useState(2016);

  const fileInputRef = useRef(null);
  const calendarRef = useRef(null);

  const monthsArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (year, month) => new Date(year, month, 1).getDay();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const requiredFields = [
      'firstName', 'gender', 'mobile', 'password', 
      'reEnterPassword', 'department', 'email', 'dob', 'salary'
    ];
    const allRequiredFilled = requiredFields.every(field => formData[field] && formData[field].toString().trim() !== '');
    const passwordsMatch = formData.password === formData.reEnterPassword;
    setIsFormValid(allRequiredFilled && passwordsMatch);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const incrementMobile = () => {
    setFormData(prev => {
      const currentNum = parseInt(prev.mobile, 10) || 0;
      return { ...prev, mobile: (currentNum + 1).toString() };
    });
  };

  const decrementMobile = () => {
    setFormData(prev => {
      const currentNum = parseInt(prev.mobile, 10) || 0;
      return { ...prev, mobile: (currentNum - 1).toString() };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleFormSubmitTrigger = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (isFormValid) alert('Form submitted completely.');
  };

  const getValidationClass = (fieldName) => {
    const value = formData[fieldName];
    if (isSubmitted && (!value || value.toString().trim() === '')) return 'is-invalid-empty';
    return value ? 'has-value' : '';
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-container">
        <h2 className="main-title">Add Employee</h2>
        <div className="breadcrumbs"><span className="home-icon">🏠</span> &gt; Employees &gt; Add Employee</div>
      </div>

     <div className="form-card">
  <h3 className="card-title">Add Employee</h3>

  <form onSubmit={handleFormSubmitTrigger} className="employee-form">

    {/* Basic Information */}
    <div className="form-section">
      <div className="form-grid">

        <div className={`form-group AddProject-input-group ${getValidationClass("firstName")}`}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <label>First Name *</label>
        </div>

        <div className={`form-group AddProject-input-group ${formData.lastName ? "has-value" : ""}`}>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <label>Last Name</label>
        </div>

        <div className={`form-group AddProject-input-group custom-select-wrapper ${getValidationClass("gender")} ${isGenderOpen ? "is-open" : ""}`}>
          <div
            className="custom-select-trigger"
            onClick={() => setIsGenderOpen(!isGenderOpen)}
          >
            {formData.gender || "Select Gender"}
            <span className="arrow-icon">▼</span>
          </div>

          <label>Select Gender *</label>

          {isGenderOpen && (
            <div className="custom-options">
              <div
                className="option"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, gender: "Male" }));
                  setIsGenderOpen(false);
                }}
              >
                Male
              </div>

              <div
                className="option"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, gender: "Female" }));
                  setIsGenderOpen(false);
                }}
              >
                Female
              </div>
            </div>
          )}
        </div>

        <div className={`form-group AddProject-input-group mobile-group ${getValidationClass("mobile")}`}>
          <input
            type="number"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          <label>Mobile *</label>

          <div className="mobile-spin-buttons">
            <button type="button" className="spin-up" onClick={incrementMobile}>
              ▲
            </button>

            <button type="button" className="spin-down" onClick={decrementMobile}>
              ▼
            </button>
          </div>
        </div>

        <div className={`form-group AddProject-input-group ${getValidationClass("password")}`}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <label>Password *</label>
        </div>

        <div className={`form-group AddProject-input-group ${getValidationClass("reEnterPassword")}`}>
          <input
            type="password"
            name="reEnterPassword"
            value={formData.reEnterPassword}
            onChange={handleInputChange}
            required
          />
          <label>Re-enter Password *</label>
        </div>

        <div className={`form-group AddProject-input-group ${formData.designation ? "has-value" : ""}`}>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          />
          <label>Designation</label>
        </div>

        <div className={`form-group AddProject-input-group custom-select-wrapper ${getValidationClass("department")} ${isDeptOpen ? "is-open" : ""}`}>
          <div
            className="custom-select-trigger"
            onClick={() => setIsDeptOpen(!isDeptOpen)}
          >
            {formData.department || "Select Department"}
            <span className="arrow-icon">▼</span>
          </div>

          <label>Select Department *</label>

          {isDeptOpen && (
            <div className="custom-options">
              <div className="option" onClick={() => {
                setFormData((prev) => ({ ...prev, department: "Development" }));
                setIsDeptOpen(false);
              }}>Development</div>

              <div className="option" onClick={() => {
                setFormData((prev) => ({ ...prev, department: "Designing" }));
                setIsDeptOpen(false);
              }}>Designing</div>

              <div className="option" onClick={() => {
                setFormData((prev) => ({ ...prev, department: "Testing" }));
                setIsDeptOpen(false);
              }}>Testing</div>

              <div className="option" onClick={() => {
                setFormData((prev) => ({ ...prev, department: "HR" }));
                setIsDeptOpen(false);
              }}>HR</div>
            </div>
          )}
        </div>

      </div>
    </div>

    {/* Address */}
    <div className="form-section">
      <div className="form-group full-width-group">
        <div className={`AddProject-input-group textarea-group ${formData.address ? "has-value" : ""}`}>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label>Address</label>
        </div>
      </div>
    </div>

    {/* Contact */}
    <div className="form-section">
      <div className="form-grid">

        <div className={`form-group AddProject-input-group ${getValidationClass("email")}`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label>Email *</label>
        </div>
        <div className={`form-group AddProject-input-group ${getValidationClass("dob")}`}>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />

          <label>Date of Birth *</label>
        </div>

      </div>
    </div>

    {/* Education */}
    <div className="form-section">
      <div className="form-group full-width-group">
        <div className={`AddProject-input-group textarea-group ${formData.education ? "has-value" : ""}`}>
          <textarea
            name="education"
            rows="3"
            value={formData.education}
            onChange={handleInputChange}
          />
          <label>Education</label>
        </div>
      </div>
    </div>

    {/* Upload */}
    <div className="form-section">
      <div className="file-upload-section">
        <p className="upload-label">Upload Image</p>

        <div
          className="file-drop-zone"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <button type="button" className="choose-file-btn">
            Choose File
          </button>

          <span className="drop-zone-text">
            {uploadedFile
              ? uploadedFile.name
              : "Drag & Drop or Click to Upload"}
          </span>
        </div>
      </div>
    </div>

    {/* Salary */}
    <div className="form-section">
      <div className="form-group full-width-group">
        <div className={`AddProject-input-group ${getValidationClass("salary")}`}>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
          <label>Salary *</label>
        </div>
      </div>
    </div>

    {/* Buttons */}
    <div className="form-actions">
      <button
        type="submit"
        className={`submit-btn ${isFormValid ? "active" : "disabled"}`}
      >
        Submit
      </button>

      <button
        type="button"
        className="cancel-btn"
        onClick={() => window.location.reload()}
      >
        Cancel
      </button>
    </div>

  </form>
</div>
    </div>
  );
};

export default AddProjects;