import React, { useState, useEffect } from "react";
import axios from "axios"; // or import API from "../../api/axios" if you have a custom instance
import "./EditManagement.css";

const API_BASE_URL = "http://localhost:5000/api/addemployees"; // Adjust port based on your server settings

const EditManagement = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    mobile: "",
    password: "",
    rePassword: "",
    designation: "",
    department: "Development",
    address: "",
    email: "",
    dob: "",
    education: "",
    salary: ""
  });

  // 1. Fetch initial master list for select dropdown on mount
  useEffect(() => {
    fetchInitialEmployeeDropdown();
  }, []);

  const fetchInitialEmployeeDropdown = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      if (response.data && response.data.data) {
        setEmployeeList(response.data.data);
      }
    } catch (err) {
      console.error("Failed to load drop-down database items:", err);
      alert("Error reading employee list from database server.");
    }
  };

  // 2. Fetch profile payload details when a dropdown item is picked
  useEffect(() => {
    const loadEmployeeDetails = async () => {
      if (!selectedEmployee) {
        handleFormReset();
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/employees/${selectedEmployee}`);
        if (response.data && response.data.data) {
          const emp = response.data.data;

          // Split full name safely back into separate UI fields
          const nameParts = emp.name ? emp.name.trim().split(" ") : ["", ""];
          const fName = nameParts[0] || "";
          const lName = nameParts.slice(1).join(" ") || "";

          // Extract standard ISO date string format (YYYY-MM-DD) for HTML5 input field compatibility
          const formattedDate = emp.birthDate ? emp.birthDate.split("T")[0] : "";

          setFormData({
            firstName: fName,
            lastName: lName,
            gender: emp.gender || "Male",
            mobile: emp.mobile || "",
            password: "", // Keep blank for security until update is explicitly required
            rePassword: "",
            designation: emp.role || "",
            department: emp.department || "Development",
            address: emp.address || "",
            email: emp.email || "",
            dob: formattedDate,
            education: emp.degree || "",
            salary: emp.salary || "0"
          });
        }
      } catch (err) {
        console.error("Error retrieving individual employee data:", err);
        alert("Failed to pull profile data payload for this employee.");
      }
    };

    loadEmployeeDetails();
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormReset = () => {
    setSelectedEmployee("");
    setSelectedFile(null);
    setFormData({
      firstName: "",
      lastName: "",
      gender: "Male",
      mobile: "",
      password: "",
      rePassword: "",
      designation: "",
      department: "Development",
      address: "",
      email: "",
      dob: "",
      education: "",
      salary: ""
    });
  };

  // 3. Construct and process Multipart Submission Form matching your Backend Schemas
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      alert("Please choose an employee to edit first.");
      return;
    }

    if (formData.password && formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const submissionForm = new FormData();

      // Merge text configurations into matching backend targets
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      submissionForm.append("name", fullName);
      submissionForm.append("gender", formData.gender);
      submissionForm.append("mobile", formData.mobile);
      submissionForm.append("role", formData.designation); // maps to 'role' on Schema
      submissionForm.append("department", formData.department);
      submissionForm.append("address", formData.address);
      submissionForm.append("email", formData.email);
      submissionForm.append("birthDate", formData.dob);
      submissionForm.append("degree", formData.education); // maps to 'degree' on Schema
      submissionForm.append("salary", formData.salary);

      // Append optional properties only when explicitly modified
      if (formData.password) {
        submissionForm.append("password", formData.password);
      }
      if (selectedFile) {
        // Matches upload.single("uploadedFile") parameter string inside router declaration
        submissionForm.append("uploadedFile", selectedFile);
      }

      const response = await axios.put(
        `${API_BASE_URL}/employees/${selectedEmployee}`, 
        submissionForm, 
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        alert("Employee details updated successfully!");
        
        // Refresh master select layout menu list dynamically to replicate state change
        await fetchInitialEmployeeDropdown();
      }
    } catch (error) {
      console.error("Submission processing error:", error);
      alert(error.response?.data?.message || "An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <div className="management-search-filter-section">
        <div className="management-filter-box">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="management-filter-select"
          >
            <option value="">Select Employee</option>
            {employeeList.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId} - {emp.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="management-container">
        <div className="management-header-row">
          <h1 className="management-main-title">Edit Management</h1>
          <div className="management-breadcrumbs">
            <span>🏠</span> <span>&gt; Management &gt; Edit Management</span>
          </div>
        </div>

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
                  <option value="Other">Other</option>
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
                />
                <label>Password (Leave blank to keep unchanged)</label>
              </div>

              <div className="fieldset-input-container">
                <input
                  type="password"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>Re-Enter Password</label>
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
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
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

            {/* Row 6 */}
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

            {/* Row 7 - Education Textarea */}
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
              <button type="button" className="action-btn-node cancel-red-btn" onClick={handleFormReset}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditManagement;