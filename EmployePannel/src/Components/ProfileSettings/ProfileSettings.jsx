import React, { useState } from "react";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    address: "123 Main St, New York, NY",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile Updated Successfully!\n\nName: ${formData.firstName} ${formData.lastName}`);
    console.log("Updated Profile Data:", formData);
  };

  return (
    <div className="profile-settings-container">
      {/* Top Header Row */}
      <div className="profile-settings-header">
        <h2>Profile Settings</h2>
        <div className="breadcrumb">
          {/* Home Icon */}
          <svg className="home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="breadcrumb-arrow">&gt;</span>
          <span>Settings</span>
          <span className="breadcrumb-arrow">&gt;</span>
          <span className="active">Profile</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="profile-card">
        <form onSubmit={handleSubmit}>
          <h3 className="section-title">Personal Information</h3>

          {/* Form Grid */}
          <div className="form-grid">
            
            {/* First Name */}
            <div className="input-group">
              <fieldset>
                <legend>First Name*</legend>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  {/* User Icon */}
                  <svg className="field-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </fieldset>
            </div>

            {/* Last Name */}
            <div className="input-group">
              <fieldset>
                <legend>Last Name*</legend>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  {/* User Icon */}
                  <svg className="field-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </fieldset>
            </div>

            {/* Email Address */}
            <div className="input-group">
              <fieldset>
                <legend>Email Address*</legend>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {/* Mail Icon */}
                  <svg className="field-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
              </fieldset>
            </div>

            {/* Phone Number */}
            <div className="input-group">
              <fieldset>
                <legend>Phone Number</legend>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {/* Phone Icon */}
                  <svg className="field-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
              </fieldset>
            </div>

            {/* Address (Full Width Row) */}
            <div className="input-group full-width">
              <fieldset>
                <legend>Address</legend>
                <div className="input-wrapper textarea-wrapper">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                  />
                  {/* House Icon */}
                  <svg className="field-icon textarea-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
              </fieldset>
            </div>

          </div>

          {/* Action Button */}
          <div className="form-actions">
            <button type="submit" className="btn-update">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;