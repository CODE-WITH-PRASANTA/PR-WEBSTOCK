import React, { useState, useRef, useEffect } from "react";
import "./AddEmployee.css";
import API from "../../api/axios"; // Your pre-configured axios instance
import Swal from "sweetalert2";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    password: "",
    reEnterPassword: "",
    designation: "",
    department: "",
    address: "",
    email: "",
    dob: "",
    education: "",
    salary: "",
  });

  // 1. Dynamic state for fetched employees
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch your master employees list when the component mounts
  useEffect(() => {
    const fetchMasterEmployees = async () => {
      try {
        // Change this route matching your actual master employee endpoint
        const response = await API.get("/employees"); 
        if (response.data && response.data.data) {
          setEmployeeList(response.data.data);
        }
      } catch (error) {
          console.log("Status:", error.response?.status);
          console.log("Data:", error.response?.data);
          console.log(error);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Something went wrong.",
          });
        }
    };
    fetchMasterEmployees();
  }, []);

  const departmentList = [
    ...new Set(employeeList.map((emp) => emp.department)),
  ];

  const handleEmployeeSelect = (employeeId) => {
    const emp = employeeList.find((item) => item._id === employeeId);

    if (!emp) return;

    // Helper to format ISO dates (YYYY-MM-DD) for date picker input compatibility
    const formattedDob = emp.birthDate ? emp.birthDate.split("T")[0] : "";

    setFormData((prev) => ({
      ...prev,
     firstName: emp.name || "",
          gender: emp.gender || "",
          mobile: emp.mobile || "",
          designation: emp.role || emp.designation || "",
          department: emp.department || "",
          address: emp.address || "",
          email: emp.email || "",
          dob: formattedDob || "",
          education: emp.degree || emp.education || "",
          salary: emp.salary || "",
    }));
  };

  useEffect(() => {
    const requiredFields = [
      "firstName",
      "gender",
      "mobile",
      "password",
      "reEnterPassword",
      "department",
      "email",
      "dob",
      "salary",
    ];

    const filled = requiredFields.every(
      (field) => formData[field]?.toString().trim() !== ""
    );

    const passwordsMatch = formData.password === formData.reEnterPassword;

    setIsFormValid(filled && passwordsMatch);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const incrementMobile = () => {
    setFormData((prev) => ({
      ...prev,
      mobile: ((parseInt(prev.mobile) || 0) + 1).toString(),
    }));
  };

  const decrementMobile = () => {
    setFormData((prev) => ({
      ...prev,
      mobile: ((parseInt(prev.mobile) || 0) - 1).toString(),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  // 2. Updated integration function for submission
  const handleFormSubmitTrigger = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all required fields correctly before submitting.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      // Must use FormData format because of binary file attachments
      const submissionData = new FormData();
      
      // Your backend expects the raw master employee document's Object ID
      submissionData.append("employeeId", selectedEmployee); 
      submissionData.append("password", formData.password);

      // If you decide to send file uploads
      if (uploadedFile) {
        // Must match upload.single("uploadedFile") inside your router
        submissionData.append("uploadedFile", uploadedFile);
      }

      const response = await API.post("/addemployees/addemployees", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire({
            icon: "success",
            title: "Employee Account Created",
            text: "The employee login account has been created successfully.",
            confirmButtonColor: "#28a745",
            timer: 2500,
            showConfirmButton: false,
          });
        
        // Form resets
        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          mobile: "",
          password: "",
          reEnterPassword: "",
          designation: "",
          department: "",
          address: "",
          email: "",
          dob: "",
          education: "",
          salary: "",
        });
        setUploadedFile(null);
        setSelectedEmployee("");
        setIsSubmitted(false);
      }
    } catch (error) {

  const message =
    error.response?.data?.message || "Something went wrong.";

  if (message === "Employee account already created.") {

    Swal.fire({
      icon: "info",
      title: "Account Already Exists",
      html: `
        <div style="text-align:left">
          <p>
            A login account has already been created for this employee.
          </p>
          <br/>
          <b>Please select another employee.</b>
        </div>
      `,
      confirmButtonColor: "#3085d6",
    });

    return;
  }

  Swal.fire({
    icon: "error",
    title: "Submission Failed",
    text: message,
    confirmButtonColor: "#d33",
  });
}
  };

  const getValidationClass = (fieldName) => {
    const value = formData[fieldName];
    if (isSubmitted && (!value || value.toString().trim() === ""))
      return "is-invalid-empty";
    return value ? "has-value" : "";
  };

  return (
    <div className="page-container">
      <div className="breadcrumb-container">
        <h2 className="main-title">Add Employee</h2>
        <div className="breadcrumbs">
          <span className="home-icon">🏠</span> &gt; Employees &gt; Add Employee
        </div>
      </div>

      <div className="form-card">
        <h3 className="card-title">Add Employee</h3>

        <form onSubmit={handleFormSubmitTrigger} className="employee-form">
          <div className="form-section">
            <div className="form-grid">
              {/* Employee Dropdown */}
              <div
                className={`form-group AddProject-input-group custom-select-wrapper ${
                  selectedEmployee ? "has-value" : ""
                } ${isEmployeeOpen ? "is-open" : ""}`}
              >
                <div
                  className="custom-select-trigger"
                  onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
                >
                  {selectedEmployee
                    ? employeeList.find((e) => e._id === selectedEmployee)?.employeeId +
                      " - " +
                      employeeList.find((e) => e._id === selectedEmployee)?.name
                    : "Choose Employee"}
                  <span className="arrow-icon">▼</span>
                </div>

                <label>Select Employee *</label>

                {isEmployeeOpen && (
                  <div className="custom-options">
                    {employeeList.map((emp) => (
                      <div
                        key={emp._id}
                        className="option"
                        onClick={() => {
                          setSelectedEmployee(emp._id);
                          handleEmployeeSelect(emp._id);
                          setIsEmployeeOpen(false);
                        }}
                      >
                        <strong>{emp.employeeId}</strong>
                        <br />
                        <small>{emp.name}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div
                className={`form-group AddProject-input-group custom-select-wrapper ${getValidationClass(
                  "gender"
                )} ${isGenderOpen ? "is-open" : ""}`}
              >
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
                        setFormData((p) => ({ ...p, gender: "Male" }));
                        setIsGenderOpen(false);
                      }}
                    >
                      Male
                    </div>
                    <div
                      className="option"
                      onClick={() => {
                        setFormData((p) => ({ ...p, gender: "Female" }));
                        setIsGenderOpen(false);
                      }}
                    >
                      Female
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className={`form-group AddProject-input-group mobile-group ${getValidationClass("mobile")}`}>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <label>Mobile *</label>
                <div className="mobile-spin-buttons">
                  <button type="button" className="spin-up" onClick={incrementMobile}>▲</button>
                  <button type="button" className="spin-down" onClick={decrementMobile}>▼</button>
                </div>
              </div>

              {/* Password */}
              <div className={`form-group AddProject-input-group ${getValidationClass("password")}`}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label>Password *</label>
              </div>

              <div className={`form-group AddProject-input-group ${getValidationClass("reEnterPassword")}`}>
                <input
                  type="password"
                  name="reEnterPassword"
                  value={formData.reEnterPassword}
                  onChange={handleInputChange}
                />
                <label>Re-enter Password *</label>
              </div>

              {/* Designation */}
              <div className="form-group AddProject-input-group">
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
                <label>Designation</label>
              </div>

              {/* Department */}
              <div
                className={`form-group AddProject-input-group custom-select-wrapper ${getValidationClass(
                  "department"
                )} ${isDeptOpen ? "is-open" : ""}`}
              >
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
                    {departmentList.map((dept) => (
                      <div
                        key={dept}
                        className="option"
                        onClick={() => {
                          setFormData((p) => ({ ...p, department: dept }));
                          setIsDeptOpen(false);
                        }}
                      >
                        {dept}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-section">
            <div className="AddProject-input-group textarea-group">
              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <label>Address</label>
            </div>
          </div>

          {/* Email & DOB */}
          <div className="form-section">
            <div className="form-grid">
              <div className={`form-group AddProject-input-group ${getValidationClass("email")}`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label>Email *</label>
              </div>

              <div className={`form-group AddProject-input-group ${getValidationClass("dob")}`}>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <label>Date of Birth *</label>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="form-section">
            <div className="AddProject-input-group textarea-group">
              <textarea
                rows="3"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              />
              <label>Education</label>
            </div>
          </div>

          {/* Upload */}
          <div className="form-section">
            <div className="file-upload-section">
              <p className="upload-label">Upload Image</p>
              <div className="file-drop-zone" onClick={() => fileInputRef.current.click()}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
                <button type="button" className="choose-file-btn">Choose File</button>
                <span className="drop-zone-text">
                  {uploadedFile ? uploadedFile.name : "Drag & Drop or Click to Upload"}
                </span>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="form-section">
            <div className={`AddProject-input-group ${getValidationClass("salary")}`}>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
              />
              <label>Salary *</label>
            </div>
          </div>

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

export default AddEmployee;