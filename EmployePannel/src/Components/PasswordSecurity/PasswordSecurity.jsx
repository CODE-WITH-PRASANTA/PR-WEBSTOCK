import React, { useState } from "react";
import "./PasswordSecurity.css";

const PasswordSecurity = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!formData.currentPassword) {
      currentErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      currentErrors.newPassword = "New password is required";
    }
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      currentErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
    } else {
      alert("Password updated successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  return (
    <div className="security-page-container">
      {/* Top Header Row */}
      <div className="security-header-row">
        <h2>Password & Security</h2>
        <div className="security-breadcrumb">
          <svg className="breadcrumb-home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="breadcrumb-separator">&gt;</span>
          <span>Settings</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="active-crumb">Security</span>
        </div>
      </div>

      {/* Change Password Panel */}
      <div className="security-card-panel">
        <h3 className="panel-title-text">Change Password</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="fields-stack-layout">
            
            {/* Current Password Field */}
            <div className={`input-fieldset-wrapper ${errors.currentPassword ? "has-validation-error" : ""}`}>
              <fieldset>
                <legend>Current Password*</legend>
                <div className="interactive-input-row">
                  <input
                    type={visibility.current ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="visibility-toggle-trigger" onClick={() => toggleVisibility("current")}>
                    {visibility.current ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="eye-icon-svg">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="eye-icon-svg">
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </fieldset>
              {errors.currentPassword && <p className="field-error-helper">{errors.currentPassword}</p>}
            </div>

            {/* New Password Field */}
            <div className={`input-fieldset-wrapper ${errors.newPassword ? "has-validation-error" : ""}`}>
              <fieldset>
                <legend>New Password*</legend>
                <div className="interactive-input-row">
                  <input
                    type={visibility.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="visibility-toggle-trigger" onClick={() => toggleVisibility("new")}>
                    {visibility.new ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="eye-icon-svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="eye-icon-svg"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                    )}
                  </button>
                </div>
              </fieldset>
              {errors.newPassword && <p className="field-error-helper">{errors.newPassword}</p>}
            </div>

            {/* Confirm New Password Field */}
            <div className={`input-fieldset-wrapper ${errors.confirmPassword ? "has-validation-error" : ""}`}>
              <fieldset>
                <legend>Confirm New Password*</legend>
                <div className="interactive-input-row">
                  <input
                    type={visibility.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="visibility-toggle-trigger" onClick={() => toggleVisibility("confirm")}>
                    {visibility.confirm ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="eye-icon-svg"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="eye-icon-svg"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.74-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                    )}
                  </button>
                </div>
              </fieldset>
              {errors.confirmPassword && <p className="field-error-helper">{errors.confirmPassword}</p>}
            </div>

          </div>

          <div className="action-button-group">
            <button type="submit" className="primary-submit-pill" disabled={!formData.currentPassword && !formData.newPassword}>
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Account Security Panel */}
      <div className="security-card-panel extra-margin-top">
        <h3 className="panel-section-label">Account Security</h3>
        
        <div className="security-option-row">
          <div className="option-metadata">
            <h4>Two-Factor Authentication</h4>
            <p>Enhance your account security by enabling two-factor authentication.</p>
          </div>
          <button type="button" className="action-toggle-button">
            Enable
          </button>
        </div>

        <div className="security-option-row">
          <div className="option-metadata">
            <h4>Active Sessions</h4>
            <p>Manage and monitor your active sessions on other devices.</p>
          </div>
          <button type="button" className="action-toggle-button">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurity;