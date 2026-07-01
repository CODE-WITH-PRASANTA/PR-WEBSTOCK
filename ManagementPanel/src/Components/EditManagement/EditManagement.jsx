import React, { useState } from "react";
import "./EditManagement.css";

const EditManagement = () => {
  const [formData, setFormData] = useState({
    firstName: "Pooja",
    lastName: "Sarma",
    gender: "Female",
    mobile: "123456789",
    password: "...",
    rePassword: "...",
    designation: "Sr. Employee",
    department: "Designing",
    address: "101, Elanxa, New York",
    email: "test@example.com",
    dob: "1987-02-17",
    education: "M.C.A.",
    salary: "50000"
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted Successfully:", formData, selectedFile);
    alert("Management details updated successfully!");
  };

  return (
    <div className="management-container">
      {/* Dynamic Header & Breadcrumbs matching your requirement */}
      <div className="management-header-row">
        <h1 className="management-main-title">Edit Management</h1>
        <div className="management-breadcrumbs">
          <span>🏠</span> <span>&gt; Management &gt; Edit Management</span>
        </div>
      </div>

      {/* Main White Card Content Box */}
      <div className="form-card-box">
        <h2 className="card-inside-title">Edit Management</h2>

        <form onSubmit={handleSubmit} className="management-native-form">
          {/* Row 1 */}
          <div className="form-flex-row">
            <div className="fieldset-input-container">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>First name*</label>
            </div>

            <div className="fieldset-input-container">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Last name</label>
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-flex-row">
            <div className="fieldset-input-container">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label>Gender*</label>
            </div>

            <div className="fieldset-input-container">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Mobile*</label>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-flex-row">
            <div className="fieldset-input-container">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Password*</label>
            </div>

            <div className="fieldset-input-container">
              <input
                type="password"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Re-Enter Password*</label>
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-flex-row">
            <div className="fieldset-input-container">
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Designation</label>
            </div>

            <div className="fieldset-input-container">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="Development">Development</option>
                <option value="Designing">Designing</option>
                <option value="Testing">Testing</option>
                <option value="HR">HR</option>
              </select>
              <label>Select Department*</label>
            </div>
          </div>

          {/* Row 5 - Full Width Address Textarea */}
          <div className="form-full-row">
            <div className="fieldset-input-container">
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Address</label>
            </div>
          </div>

          {/* Row 6 (From Image 2 reference) */}
          <div className="form-flex-row">
            <div className="fieldset-input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Email*</label>
            </div>

            <div className="fieldset-input-container">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <label>Date Of Birth*</label>
            </div>
          </div>

          {/* Row 7 - Education Textarea (From Image 2 reference) */}
          <div className="form-full-row">
            <div className="fieldset-input-container">
              <textarea
                name="education"
                rows="2"
                value={formData.education}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Education</label>
            </div>
          </div>

          {/* Row 8 - Drag and Drop Upload Image Section */}
          <div className="upload-image-section">
            <p className="upload-title">Upload Image</p>
            <div className="drag-drop-dashed-box">
              <label className="file-choose-label-btn">
                Choose file
                <input type="file" onChange={handleFileChange} accept="image/*" />
              </label>
              <span className="drag-drop-text">
                {selectedFile ? selectedFile.name : "or drag and drop file here"}
              </span>
            </div>
          </div>

          {/* Row 9 - Salary Input */}
          <div className="form-full-row" style={{ marginTop: "20px" }}>
            <div className="fieldset-input-container">
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Salary*</label>
            </div>
          </div>

          {/* Form Action Footer Buttons */}
          <div className="form-action-buttons-strip">
            <button type="submit" className="action-btn-node submit-blue-btn">Submit</button>
            <button type="button" className="action-btn-node cancel-red-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditManagement;