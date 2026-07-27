import React, { useState, useEffect } from 'react';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaCode, FaQuoteRight, FaListUl, FaListOl, 
  FaLink, FaImage, FaFont, FaPaintBrush,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify,
  FaCheckCircle, FaExclamationCircle, FaTrashAlt, FaTimes, FaChevronDown
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import './AddProject.css';
import API from "../../Api/axios";

const initialFormState = {
  projectId: '',
  projectTitle: '',
  department: '',
  projectPriority: '',
  client: '',
  price: '',
  startDate: '',
  endDate: '',
  team: [],
  workStatus: 'Running',
  projectDescription: '',
  budget: '',
  projectManager: '',
  projectType: '',
  richDescription: ''
};

const projectTypeOptions = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Frontend Development",
  "E-Commerce Development",
  "Custom Web Application",
  "ERP / CRM Development",
  "API Development & Integration",
  "Database Development",
  "Digital Marketing & SEO",
  "Graphic Design & Branding",
  "Domain & Hosting Setup",
  "Technical Support"
];

const AddProject = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [projectImage, setProjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  // State for dynamic employee list
  const [teamMembers, setTeamMembers] = useState([]);
  const [fetchingEmployees, setFetchingEmployees] = useState(false);

  // Status & Feedback States
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Fetch employees dynamically on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setFetchingEmployees(true);
      try {
        const response = await API.get('/addemployees/employees');
        if (response.data && response.data.success) {
          const formattedMembers = response.data.data.map(emp => 
            emp.role ? `${emp.name} (${emp.role})` : emp.name
          );
          setTeamMembers(formattedMembers);
        }
      } catch (err) {
        console.error("Failed to fetch employee list:", err);
      } finally {
        setFetchingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamSelect = (member) => {
    setFormData(prev => {
      const exists = prev.team.includes(member);
      const updatedTeam = exists 
        ? prev.team.filter(item => item !== member)
        : [...prev.team, member];
      return { ...prev, team: updatedTeam };
    });
  };

  const handleRemoveMember = (member, e) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter(item => item !== member)
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({ ...prev, workStatus: status }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFeedback({ type: 'error', message: 'Please upload a valid image file.' });
        return;
      }
      setProjectImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFeedback({ type: '', message: '' });
    }
  };

  const handleRemoveImage = () => {
    setProjectImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    handleRemoveImage();
    setIsTeamDropdownOpen(false);
    setFeedback({ type: '', message: '' });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Discard changes?",
      text: "Any unsaved form data will be cleared.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, discard",
      cancelButtonText: "Continue editing"
    }).then((result) => {
      if (result.isConfirmed) {
        handleReset();
        Swal.fire("Cleared!", "Form has been reset.", "info");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.team.length === 0) {
      setFeedback({ type: 'error', message: 'Please select at least one team member.' });
      return;
    }

    Swal.fire({
      title: "Do you want to save the project?",
      text: "Please confirm that all details are correct.",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setFeedback({ type: '', message: '' });

        try {
          const payload = new FormData();

          Object.keys(formData).forEach((key) => {
            if (key === 'team') {
              payload.append('team', formData.team.join(', '));
            } else {
              payload.append(key, typeof formData[key] === 'string' ? formData[key].trim() : formData[key]);
            }
          });

          if (projectImage) {
            payload.append('projectImage', projectImage);
          }

          const response = await API.post('/addprojects', payload);

          if (response.data.success) {
            Swal.fire("Saved!", response.data.message || "Project created successfully!", "success");
            setFeedback({
              type: 'success',
              message: response.data.message || 'Project created successfully!'
            });
            handleReset();
          }
        } catch (error) {
          const errorMsg = 
            error.response?.data?.error || 
            error.response?.data?.message || 
            'Failed to submit project. Please check backend input validation.';

          Swal.fire("Error!", errorMsg, "error");
          setFeedback({ type: 'error', message: errorMsg });
        } finally {
          setLoading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="AddProject-container">
      <div className="AddProject-header-bar">
        <h2 className="AddProject-title">Add Projects</h2>
        <div className="AddProject-breadcrumb">
          <FiHome className="breadcrumb-home-icon" /> <FiChevronRight /> Projects <FiChevronRight /> <span className="breadcrumb-current">Add Projects</span>
        </div>
      </div>

      <div className="AddProject-card-layout">
        <div className="AddProject-card-header">
          <h3>Add New Project</h3>
        </div>

        {feedback.message && (
          <div className={`form-feedback-alert ${feedback.type}`}>
            {feedback.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
            <span>{feedback.message}</span>
          </div>
        )}

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

            {/* Department */}
            <div className="AddProject-form-field">
              <div className="input-container select-container">
                <select 
                  name="department" 
                  required 
                  value={formData.department} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  <option value="Development">Development</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Social Media">Social Media</option>
                </select>
                <label className={formData.department ? "shrink" : ""}>Department*</label>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            {/* Priority */}
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
                  type="number" 
                  name="price" 
                  required 
                  placeholder=" "
                  value={formData.price}
                  onChange={handleChange}
                />
                <label>Price ($)*</label>
              </div>
            </div>

            {/* Start Date */}
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

            {/* End Date */}
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

            {/* Dynamic Multi-Select Team Members */}
            <div className="AddProject-form-field full-width-row">
              <div className="team-multi-select-wrapper">
                <label className="team-select-label">Assign Team Members*</label>
                
                <div 
                  className={`team-select-trigger ${isTeamDropdownOpen ? 'open' : ''}`}
                  onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                >
                  <div className="selected-chips-container">
                    {formData.team.length === 0 ? (
                      <span className="placeholder-text">Select team members...</span>
                    ) : (
                      formData.team.map((member) => (
                        <span key={member} className="team-member-chip">
                          {member}
                          <button 
                            type="button" 
                            className="chip-remove-btn"
                            onClick={(e) => handleRemoveMember(member, e)}
                          >
                            <FaTimes />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                  <FaChevronDown className="arrow-icon" />
                </div>

                {/* Dropdown Checklist Box */}
                {isTeamDropdownOpen && (
                  <div className="team-dropdown-menu">
                    {fetchingEmployees ? (
                      <div className="team-dropdown-item font-italic">Loading team members...</div>
                    ) : teamMembers.length === 0 ? (
                      <div className="team-dropdown-item font-italic">No team members found</div>
                    ) : (
                      teamMembers.map((member) => {
                        const isSelected = formData.team.includes(member);
                        return (
                          <div 
                            key={member} 
                            className={`team-dropdown-item ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleTeamSelect(member)}
                          >
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              readOnly
                            />
                            <span>{member}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Work Status Options */}
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

            {/* Project Description */}
            <div className="AddProject-form-field full-width-row">
              <div className="input-container textarea-container">
                <textarea 
                  name="projectDescription" 
                  required
                  placeholder=" "
                  rows="2"
                  value={formData.projectDescription}
                  onChange={handleChange}
                ></textarea>
                <label>Project Short Description*</label>
              </div>
            </div>

            {/* Budget */}
            <div className="AddProject-form-field">
              <div className="input-container">
                <input 
                  type="number" 
                  name="budget" 
                  required 
                  placeholder=" "
                  value={formData.budget}
                  onChange={handleChange}
                />
                <label>Budget ($)*</label>
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

            {/* Updated Project Type Dropdown */}
            <div className="AddProject-form-field full-width-row">
              <div className="input-container select-container">
                <select 
                  name="projectType" 
                  required 
                  value={formData.projectType} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  {projectTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <label className={formData.projectType ? "shrink" : ""}>Project Type*</label>
                <span className="dropdown-arrow">▼</span>
              </div>
            </div>

            {/* Rich Editor Description */}
            <div className="AddProject-form-field full-width-row">
              <span className="editor-outer-title">Detailed Descriptions:</span>
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
                  placeholder="Type full project specifications or guidelines here..."
                  name="richDescription"
                  value={formData.richDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="AddProject-form-field full-width-row">
              <label className="upload-outer-label">Upload Cover Image</label>
              
              {!imagePreview ? (
                <div className="AddProject-file-dropzone">
                  <input 
                    type="file" 
                    id="dropzone-file-project" 
                    className="hidden-file-input" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="dropzone-file-project" className="dropzone-label">
                    <span className="choose-file-btn">Choose file</span>
                    <span className="dropzone-text-hint">or drag and drop file here</span>
                  </label>
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Selected project cover preview" className="preview-image" />
                  <div className="preview-info">
                    <span>{projectImage?.name}</span>
                    <button type="button" className="btn-remove-preview" onClick={handleRemoveImage}>
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="AddProject-actions-row">
            <button type="submit" className="btn-submit-action" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" className="btn-cancel-action" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;