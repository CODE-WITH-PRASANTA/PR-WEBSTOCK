import React, { useState, useEffect, useRef } from 'react';
import './EditProjects.css';
import API from '../../Api/axios';

const EditProjects = () => {
  // Master list of projects & employees fetched from API
  const [projectsList, setProjectsList] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]); // Dynamic employee list
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial Form State
  const emptyForm = {
    _id: '',
    projectId: '',
    projectTitle: '',
    department: 'Development',
    projectPriority: 'Medium',
    client: '',
    price: '',
    budget: '',
    startDate: '',
    endDate: '',
    team: [],
    workStatus: 'Running',
    projectDescription: '',
    projectType: 'Web Development',
    projectManager: '',
    richDescription: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [openDropdown, setOpenDropdown] = useState(null);
  const richTextRef = useRef(null);

  // Schema Enums / Dropdown Configs
  const departments = ['Development', 'Sales', 'Marketing', 'Social Media'];
  const priorities = ['Low', 'Medium', 'High'];
  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Frontend Development',
    'E-Commerce Development',
    'Custom Web Application',
    'ERP / CRM Development',
    'API Development & Integration',
    'Database Development',
    'Digital Marketing & SEO',
    'Graphic Design & Branding',
    'Domain & Hosting Setup',
    'Technical Support',
  ];
  const workStatuses = ['Active', 'Completed', 'Running', 'Pending', 'Not Started', 'Canceled'];

  // Format ISO Date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Populate form with project details
  const populateForm = (project) => {
    setFormData({
      ...project,
      startDate: formatDateForInput(project.startDate),
      endDate: formatDateForInput(project.endDate),
      team: Array.isArray(project.team) ? project.team : [],
    });
  };

  // Fetch initial data: Projects and Employees
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      // Concurrent fetching for projects and employees
      const [projectsRes, employeesRes] = await Promise.all([
        API.get('/addprojects'),
        API.get('/addemployees/employees'),
      ]);

      const fetchedProjects = projectsRes.data.data || [];
      const fetchedEmployees = employeesRes.data.data || [];

      setProjectsList(fetchedProjects);
      setTeamMembers(fetchedEmployees);

      if (fetchedProjects.length > 0) {
        populateForm(fetchedProjects[0]);
      }
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectProject = (project) => {
    populateForm(project);
    setOpenDropdown(null);
  };

  // Toggle member selection by identifier (e.g. employee.name or employee.employeeId)
  const toggleTeamMember = (memberName) => {
    setFormData((prev) => {
      const currentTeam = prev.team.includes(memberName)
        ? prev.team.filter((m) => m !== memberName)
        : [...prev.team, memberName];
      return { ...prev, team: currentTeam };
    });
  };

  const handleToolbarClick = (syntaxBefore, syntaxAfter = '') => {
    const textarea = richTextRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end);
    const replacement = `${syntaxBefore}${selectedText}${syntaxAfter}`;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    setFormData((prev) => ({ ...prev, richDescription: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + syntaxBefore.length,
        start + syntaxBefore.length + selectedText.length
      );
    }, 0);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData._id) {
      alert('Please select a valid project to update.');
      return;
    }

    if (formData.team.length === 0) {
      alert('At least one team member must be assigned.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await API.put(`/addprojects/${formData._id}`, {
        ...formData,
        price: Number(formData.price),
        budget: Number(formData.budget),
      });

      alert(response.data.message || 'Project updated successfully!');
      await fetchData();
    } catch (err) {
      console.error('Error updating project:', err);
      alert(err.response?.data?.message || 'Failed to update project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Discard unsaved changes?')) {
      const currentProject = projectsList.find((p) => p._id === formData._id);
      if (currentProject) populateForm(currentProject);
    }
  };

  const closeAllDropdowns = () => setOpenDropdown(null);

  if (loading) {
    return (
      <div className="edit-projects-bg" style={{ display: 'grid', placeItems: 'center', minHeight: '300px' }}>
        <h3>Loading data...</h3>
      </div>
    );
  }

  return (
    <div className="edit-projects-bg" onClick={closeAllDropdowns}>
      <div className="max-page-wrapper">
        <div className="header-breadcrumb-row">
          <h1>Edit Projects</h1>
          <div className="breadcrumbs-container">
            <span className="breadcrumb-item-link">🏠</span>
            <span className="breadcrumb-divider">&gt;</span>
            <span className="breadcrumb-item-link">Projects</span>
            <span className="breadcrumb-divider">&gt;</span>
            <span className="breadcrumb-item-active">Edit Projects</span>
          </div>
        </div>

        {errorMsg && (
          <div style={{ color: '#d32f2f', backgroundColor: '#fde8e8', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
            {errorMsg}
          </div>
        )}

        <div className="form-card-container" onClick={(e) => e.stopPropagation()}>
          <div className="form-card-header">Edit Project Details</div>

          {projectsList.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              No projects found in database. Create one first!
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="edit-project-form">
              
              {/* PROJECT SELECTION DROPDOWN */}
              <div className="form-spacing-stack dropdown-relative-container">
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'projectSelect' ? null : 'projectSelect')}
                  className={`mat-select-trigger-box ${openDropdown === 'projectSelect' ? 'opened-active' : ''}`}
                  style={{ minHeight: '48px', cursor: 'pointer' }}
                >
                  <label className="mat-notch-label persistent-label">Select Project*</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold', color: '#1976d2' }}>[{formData.projectId}]</span>
                    <span>{formData.projectTitle}</span>
                  </div>
                  <span className="dropdown-indicator-caret">▼</span>
                </div>

                {openDropdown === 'projectSelect' && (
                  <div className="mat-popup-dropdown-panel" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {projectsList.map((proj) => (
                      <div
                        key={proj._id}
                        onClick={() => handleSelectProject(proj)}
                        className={`mat-dropdown-list-item ${formData._id === proj._id ? 'selected-active' : ''}`}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '600', color: '#333' }}>
                            <strong style={{ color: '#1976d2', marginRight: '6px' }}>{proj.projectId}</strong>
                            — {proj.projectTitle}
                          </span>
                          <span style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                            Client: {proj.client} | Status: {proj.workStatus}
                          </span>
                        </div>
                        {formData._id === proj._id && <span className="check-icon">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '20px 0' }} />

              {/* INPUT FIELDS GRID */}
              <div className="inputs-grid-layout">
                <div className="mat-outline-wrapper">
                  <input
                    type="text"
                    name="projectId"
                    placeholder=" "
                    value={formData.projectId}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field"
                  />
                  <label className="mat-notch-label">Project ID*</label>
                </div>

                <div className="mat-outline-wrapper">
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder=" "
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field"
                  />
                  <label className="mat-notch-label">Project Title*</label>
                </div>

                {/* DEPARTMENT */}
                <div className="dropdown-relative-container">
                  <div
                    onClick={() => setOpenDropdown(openDropdown === 'dept' ? null : 'dept')}
                    className={`mat-select-trigger-box ${openDropdown === 'dept' ? 'opened-active' : ''}`}
                  >
                    <label className="mat-notch-label persistent-label">Department*</label>
                    <span>{formData.department}</span>
                    <span className="dropdown-indicator-caret">▼</span>
                  </div>
                  {openDropdown === 'dept' && (
                    <div className="mat-popup-dropdown-panel">
                      {departments.map((dept) => (
                        <div
                          key={dept}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, department: dept }));
                            setOpenDropdown(null);
                          }}
                          className={`mat-dropdown-list-item ${formData.department === dept ? 'selected-active' : ''}`}
                        >
                          <span>{dept}</span>
                          {formData.department === dept && <span className="check-icon">✓</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PRIORITY */}
                <div className="dropdown-relative-container">
                  <div
                    onClick={() => setOpenDropdown(openDropdown === 'priority' ? null : 'priority')}
                    className={`mat-select-trigger-box ${openDropdown === 'priority' ? 'opened-active' : ''}`}
                  >
                    <label className="mat-notch-label persistent-label">Project Priority*</label>
                    <span className={`priority-badge badge-${formData.projectPriority?.toLowerCase()}`}>
                      {formData.projectPriority}
                    </span>
                    <span className="dropdown-indicator-caret">▼</span>
                  </div>
                  {openDropdown === 'priority' && (
                    <div className="mat-popup-dropdown-panel">
                      {priorities.map((prio) => (
                        <div
                          key={prio}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, projectPriority: prio }));
                            setOpenDropdown(null);
                          }}
                          className={`mat-dropdown-list-item ${formData.projectPriority === prio ? 'selected-active' : ''}`}
                        >
                          <span>{prio}</span>
                          {formData.projectPriority === prio && <span className="check-icon">✓</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CLIENT & PRICE */}
                <div className="mat-outline-wrapper">
                  <input
                    type="text"
                    name="client"
                    placeholder=" "
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field"
                  />
                  <label className="mat-notch-label">Client*</label>
                </div>

                <div className="mat-outline-wrapper">
                  <input
                    type="number"
                    name="price"
                    placeholder=" "
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field"
                  />
                  <label className="mat-notch-label">Price ($)*</label>
                </div>

                {/* DATES */}
                <div className="mat-outline-wrapper">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field date-input"
                  />
                  <label className="mat-notch-label persistent-label">Project Start Date*</label>
                </div>

                <div className="mat-outline-wrapper">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field date-input"
                  />
                  <label className="mat-notch-label persistent-label">Project End Date*</label>
                </div>
              </div>

              {/* DYNAMIC TEAM SELECTION */}
              <div className="form-spacing-stack dropdown-relative-container">
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'team' ? null : 'team')}
                  className={`mat-select-trigger-box ${openDropdown === 'team' ? 'opened-active' : ''}`}
                >
                  <label className="mat-notch-label persistent-label">Team*</label>
                  <div className="team-chips-wrapper">
                    {formData.team.length > 0 ? (
                      formData.team.map((member) => (
                        <span key={member} className="team-member-chip">
                          {member}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTeamMember(member);
                            }}
                            className="remove-chip-btn"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="placeholder-text">Select Team Members...</span>
                    )}
                  </div>
                  <span className="dropdown-indicator-caret">▼</span>
                </div>

                {openDropdown === 'team' && (
                  <div className="mat-popup-dropdown-panel" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    {teamMembers.length === 0 ? (
                      <div style={{ padding: '10px', color: '#888', fontSize: '13px' }}>
                        No employees found
                      </div>
                    ) : (
                      teamMembers.map((emp) => {
                        const isSelected = formData.team.includes(emp.name);
                        return (
                          <div
                            key={emp._id || emp.employeeId}
                            onClick={() => toggleTeamMember(emp.name)}
                            className={`mat-dropdown-list-item ${isSelected ? 'selected-active' : ''}`}
                          >
                            <div className="team-checkbox-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                readOnly
                                className="team-checkbox-input"
                              />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '500' }}>{emp.name}</span>
                                <span style={{ fontSize: '11px', color: '#666' }}>
                                  ID: {emp.employeeId} | {emp.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* WORK STATUS */}
              <div className="form-spacing-stack radio-group-block">
                <span className="radio-group-title">Work Status*</span>
                <div className="radio-items-inline-wrap">
                  {workStatuses.map((status) => (
                    <label key={status} className={`radio-item-label ${formData.workStatus === status ? 'radio-selected' : ''}`}>
                      <input
                        type="radio"
                        name="workStatus"
                        value={status}
                        checked={formData.workStatus === status}
                        onChange={handleInputChange}
                        className="radio-native-input"
                      />
                      <span className="custom-radio-circle"></span>
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-spacing-stack mat-outline-wrapper">
                <textarea
                  name="projectDescription"
                  rows="3"
                  placeholder=" "
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  required
                  className="mat-input-field textarea-field"
                />
                <label className="mat-notch-label">Project Description*</label>
              </div>

              {/* BUDGET & MANAGER */}
              <div className="inputs-grid-layout form-spacing-stack">
                <div className="mat-outline-wrapper">
                  <input
                    type="number"
                    name="budget"
                    placeholder=" "
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field"
                  />
                  <label className="mat-notch-label">Budget ($)*</label>
                </div>

                <div className="mat-outline-wrapper">
                  <input
                    type="text"
                    name="projectManager"
                    placeholder=" "
                    value={formData.projectManager}
                    onChange={handleInputChange}
                    required
                    className="mat-input-field"
                  />
                  <label className="mat-notch-label">Project Manager*</label>
                </div>
              </div>

              {/* PROJECT TYPE */}
              <div className="form-spacing-stack dropdown-relative-container">
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                  className={`mat-select-trigger-box ${openDropdown === 'type' ? 'opened-active' : ''}`}
                >
                  <label className="mat-notch-label persistent-label">Project Type*</label>
                  <span>{formData.projectType}</span>
                  <span className="dropdown-indicator-caret">▼</span>
                </div>
                {openDropdown === 'type' && (
                  <div className="mat-popup-dropdown-panel" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {projectTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, projectType: type }));
                          setOpenDropdown(null);
                        }}
                        className={`mat-dropdown-list-item ${formData.projectType === type ? 'selected-active' : ''}`}
                      >
                        <span>{type}</span>
                        {formData.projectType === type && <span className="check-icon">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RICH TEXT EDITOR */}
              <div className="form-spacing-stack">
                <label className="editor-group-title">Descriptions:</label>
                <div className="editor-main-border-box">
                  <div className="editor-horizontal-toolbar">
                    <button type="button" title="Bold" className="editor-action-btn font-weight-b" onClick={() => handleToolbarClick('**', '**')}>B</button>
                    <button type="button" title="Italic" className="editor-action-btn font-style-i" onClick={() => handleToolbarClick('*', '*')}>I</button>
                    <button type="button" title="Underline" className="editor-action-btn text-deco-u" onClick={() => handleToolbarClick('<u>', '</u>')}>U</button>
                    <button type="button" title="Strikethrough" className="editor-action-btn text-deco-s" onClick={() => handleToolbarClick('~~', '~~')}>S</button>
                    <div className="editor-toolbar-divider" />
                    <button type="button" title="Code Block" className="editor-action-btn code-brackets" onClick={() => handleToolbarClick('```\n', '\n```')}>&lt;&gt;</button>
                    <button type="button" title="Blockquote" className="editor-action-btn quote-marks" onClick={() => handleToolbarClick('> ')}>”</button>
                    <div className="editor-toolbar-divider" />
                    <button type="button" title="Numbered List" className="editor-action-btn list-num" onClick={() => handleToolbarClick('1. ')}>
                      <span className="num-stack">1<br />2</span>
                      <span className="line-stack">＝<br />＝</span>
                    </button>
                    <button type="button" title="Bullet List" className="editor-action-btn list-bullet" onClick={() => handleToolbarClick('- ')}>
                      <span className="bullet-stack">•<br />•</span>
                      <span className="line-stack">＝<br />＝</span>
                    </button>
                    <div className="editor-toolbar-divider" />
                    <button type="button" title="Insert Link" className="editor-action-btn action-link" onClick={() => handleToolbarClick('[', '](url)')}>🔗</button>
                    <button type="button" title="Insert Image" className="editor-action-btn action-image" onClick={() => handleToolbarClick('![alt text](', ')')}>🖼️</button>
                  </div>

                  <textarea
                    ref={richTextRef}
                    name="richDescription"
                    placeholder="Type here..."
                    value={formData.richDescription}
                    onChange={handleInputChange}
                    className="editor-textarea-input"
                  />
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="form-actions-footer-row">
                <button type="submit" disabled={isSubmitting} className="action-btn-pill-update">
                  {isSubmitting ? 'Updating...' : 'Update Project'}
                </button>
                <button type="button" onClick={handleCancel} disabled={isSubmitting} className="action-btn-pill-cancel">
                  Cancel
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProjects;