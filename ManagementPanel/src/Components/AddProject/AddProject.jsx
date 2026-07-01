import React, { useState } from 'react';
import { FiHome, FiFolder, FiChevronRight, FiCalendar } from 'react-icons/fi';
import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaCode, FaQuoteRight, FaListUl, FaListOl, 
  FaHeading, FaLink, FaImage, FaFont, FaPaintBrush,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify 
} from 'react-icons/fa';
import './AddProject.css';

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    projectTitle: '',
    department: '',
    projectPriority: '',
    client: '',
    price: '',
    startDate: '',
    endDate: '',
    team: '',
    workStatus: 'Running', // matches the checked option in snapshot
    projectDescription: '',
    budget: '',
    projectManager: '',
    projectType: '',
    richDescription: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({ ...prev, workStatus: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Data Submitted Safely:', formData);
  };

  return (
    <div className="AddProject-container">
      {/* Upper Navigation Header Bar Section */}
      <div className="AddProject-header-bar">
        <h2 className="AddProject-title">Add Projects</h2>
        <div className="AddProject-breadcrumb">
          <FiHome className="breadcrumb-home-icon" /> <FiChevronRight /> Projects <FiChevronRight /> <span className="breadcrumb-current">Add Projects</span>
        </div>
      </div>

      {/* Main Structural Card Context Component Wrapper */}
      <div className="AddProject-card-layout">
        <div className="AddProject-card-header">
          <h3>Add Projects</h3>
        </div>

        <form onSubmit={handleSubmit} className="AddProject-form">
          <div className="AddProject-form-grid">
            
            {/* Project ID */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="text" 
                  name="projectId" 
                  required 
                  placeholder=" "
                  value={formData.projectId}
                  onChange={handleChange}
                />
                <label>Project ID*</label>
              </div>
            </div>

            {/* Project Title */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="text" 
                  name="projectTitle" 
                  required 
                  placeholder=" "
                  value={formData.projectTitle}
                  onChange={handleChange}
                />
                <label>Project Title*</label>
              </div>
            </div>

            {/* Department Dropdown Select */}
            <div className="AddProject-form-field">
              <div className="input-container select-container">
                <select 
                  name="department" 
                  required 
                  value={formData.department} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  <option value="Java">Java</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Management">Management</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
                <label className={formData.department ? "shrink" : ""}>Department*</label>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            {/* Project Priority Dropdown Select */}
            <div className="AddProject-form-field">
              <div className="input-container select-container">
                <select 
                  name="projectPriority" 
                  required 
                  value={formData.projectPriority} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <label className={formData.projectPriority ? "shrink" : ""}>Project Priority*</label>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            {/* Client */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="text" 
                  name="client" 
                  required 
                  placeholder=" "
                  value={formData.client}
                  onChange={handleChange}
                />
                <label>Client*</label>
              </div>
            </div>

            {/* Price */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="text" 
                  name="price" 
                  required 
                  placeholder=" "
                  value={formData.price}
                  onChange={handleChange}
                />
                <label>Price*</label>
              </div>
            </div>

            {/* Project Start Date */}
            <div className="AddProject-form-field">
              <div className="input-container date-container">
                <input 
                  type="date" 
                  name="startDate" 
                  required 
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <label className="always-shrink">Project Start Date*</label>
              </div>
            </div>

            {/* Project End Date */}
            <div className="AddProject-form-field">
              <div className="input-container date-container">
                <input 
                  type="date" 
                  name="endDate" 
                  required 
                  value={formData.endDate}
                  onChange={handleChange}
                />
                <label className="always-shrink">Project End Date*</label>
              </div>
            </div>

            {/* Team Dropdown Selector - Full Row block spanned line width */}
            <div className="AddProject-form-field full-width-row">
              <div className="input-container select-container">
                <select 
                  name="team" 
                  required 
                  value={formData.team} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  <option value="Alpha Team">Alpha Team</option>
                  <option value="Beta Team">Beta Team</option>
                  <option value="Dev Team 1">Dev Team 1</option>
                </select>
                <label className={formData.team ? "shrink" : ""}>Team*</label>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            {/* Work Status Inline Radio Selector row */}
            <div className="AddProject-form-field full-width-row">
              <div className="work-status-container">
                <span className="work-status-label">Work Status:</span>
                <div className="work-status-options-group">
                  {['Active', 'Completed', 'Running', 'Pending', 'Not Started', 'Canceled'].map((status) => (
                    <label key={status} className="radio-option-item">
                      <input 
                        type="radio" 
                        name="workStatus" 
                        value={status} 
                        checked={formData.workStatus === status} 
                        onChange={() => handleStatusChange(status)}
                      />
                      <span className="custom-radio-indicator"></span>
                      <span className="radio-text-label">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Description Textarea entry field */}
            <div className="AddProject-form-field full-width-row">
              <div className="input-container textarea-container">
                <textarea 
                  name="projectDescription" 
                  required
                  placeholder=" "
                  rows="1"
                  value={formData.projectDescription}
                  onChange={handleChange}
                ></textarea>
                <label>Project Description*</label>
              </div>
            </div>

            {/* Budget */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="text" 
                  name="budget" 
                  required 
                  placeholder=" "
                  value={formData.budget}
                  onChange={handleChange}
                />
                <label>Budget*</label>
              </div>
            </div>

            {/* Project Manager */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="text" 
                  name="projectManager" 
                  required 
                  placeholder=" "
                  value={formData.projectManager}
                  onChange={handleChange}
                />
                <label>Project Manager*</label>
              </div>
            </div>

            {/* Project Type Dropdown block spanning full line */}
            <div className="AddProject-form-field full-width-row">
              <div className="input-container select-container">
                <select 
                  name="projectType" 
                  required 
                  value={formData.projectType} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                </select>
                <label className={formData.projectType ? "shrink" : ""}>Project Type*</label>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            {/* Descriptions Text Block with Toolbar Context Editor layout styles */}
            <div className="AddProject-form-field full-width-row">
              <span className="editor-outer-title">Descriptions:</span>
              <div className="AddProject-rich-editor-box">
                <div className="editor-toolbar-row">
                  <button type="button" className="toolbar-btn font-bold"><FaBold /></button>
                  <button type="button" className="toolbar-btn"><FaItalic /></button>
                  <button type="button" className="toolbar-btn"><FaUnderline /></button>
                  <button type="button" className="toolbar-btn"><FaStrikethrough /></button>
                  <span className="toolbar-divider"></span>
                  <button type="button" className="toolbar-btn"><FaCode /></button>
                  <button type="button" className="toolbar-btn"><FaQuoteRight /></button>
                  <span className="toolbar-divider"></span>
                  <button type="button" className="toolbar-btn"><FaListUl /></button>
                  <button type="button" className="toolbar-btn"><FaListOl /></button>
                  <span className="toolbar-divider"></span>
                  <div className="toolbar-select-mock">Heading <span className="arrow">▼</span></div>
                  <span className="toolbar-divider"></span>
                  <button type="button" className="toolbar-btn"><FaLink /></button>
                  <button type="button" className="toolbar-btn"><FaImage /></button>
                  <span className="toolbar-divider"></span>
                  <button type="button" className="toolbar-btn"><FaFont /></button>
                  <button type="button" className="toolbar-btn"><FaPaintBrush /></button>
                  <span className="toolbar-divider"></span>
                  <button type="button" className="toolbar-btn"><FaAlignLeft /></button>
                  <button type="button" className="toolbar-btn"><FaAlignCenter /></button>
                  <button type="button" className="toolbar-btn"><FaAlignRight /></button>
                  <button type="button" className="toolbar-btn"><FaAlignJustify /></button>
                </div>
                <textarea 
                  className="editor-textarea-body"
                  placeholder="Type here..."
                  name="richDescription"
                  value={formData.richDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Custom File Interactive Upload Drag Box Area section */}
            <div className="AddProject-form-field full-width-row">
              <label className="upload-outer-label">Upload Image</label>
              <div className="AddProject-file-dropzone">
                <input type="file" id="dropzone-file-project" className="hidden-file-input" />
                <label htmlFor="dropzone-file-project" className="dropzone-label">
                  <span className="choose-file-btn">Choose file</span>
                  <span className="dropzone-text-hint">or drag and drop file here</span>
                </label>
              </div>
            </div>

          </div>

          {/* Bottom Execution Action triggers block formatting layout */}
          <div className="AddProject-actions-row">
            <button type="submit" className="btn-submit-action">Submit</button>
            <button type="button" className="btn-cancel-action">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;