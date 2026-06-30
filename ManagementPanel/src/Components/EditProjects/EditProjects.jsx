import React, { useState, useRef } from 'react';
import './EditProjects.css';

const EditProjects = () => {
  // Form State
  const [formData, setFormData] = useState({
    projectId: 'PROJ-001',
    projectTitle: 'Kuber Admin - Angular 18 Dashboard',
    department: 'Development',
    projectPriority: 'High',
    client: 'Sarah Smith',
    price: '15000',
    budget: '20000',
    startDate: '2024-01-10',
    endDate: '2024-06-30',
    team: ['Sarah Smith', 'John Deo'],
    workStatus: 'Active',
    projectDescription: 'Kuber is a modern material design based admin dashboard template...',
    projectType: 'Web Development',
    projectManager: 'Pooja Sharma',
    richDescription: ''
  });

  // Dropdown UI Toggle States
  const [openDropdown, setOpenDropdown] = useState(null); // 'dept', 'priority', 'team', 'type'

  // Ref for the rich text textarea to handle formatting injections
  const richTextRef = useRef(null);

  // Configuration Data for Dropdowns
  const departments = ['Designing', 'Development', 'Testing', 'Marketing', 'Accounts'];
  const priorities = ['Low', 'Medium', 'High'];
  const teamMembers = ['Sarah Smith', 'John Deo', 'Pankaj Patel', 'Pooja Sharma', 'Jayesh Patel'];
  const projectTypes = ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Backend Development'];
  const workStatuses = ['Active', 'Completed', 'Running', 'Pending', 'Not Started', 'Cancled'];

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleTeamMember = (member) => {
    setFormData(prev => {
      const currentTeam = prev.team.includes(member)
        ? prev.team.filter(m => m !== member)
        : [...prev.team, member];
      return { ...prev, team: currentTeam };
    });
  };

  // Helper to inject syntax into the rich text textarea
  const handleToolbarClick = (syntaxBefore, syntaxAfter = '') => {
    const textarea = richTextRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    const selectedText = text.substring(start, end);
    const replacement = `${syntaxBefore}${selectedText}${syntaxAfter}`;
    
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    
    setFormData(prev => ({ ...prev, richDescription: newValue }));
    
    // Reset focus and cursor placement
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, start + syntaxBefore.length + selectedText.length);
    }, 0);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Project updated successfully!\n' + JSON.stringify(formData, null, 2));
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      alert('Changes cancelled.');
    }
  };

  const closeAllDropdowns = () => setOpenDropdown(null);

  return (
    <div className="edit-projects-bg" onClick={closeAllDropdowns}>
      <div className="max-page-wrapper">
        
        {/* Breadcrumb Row */}
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

        {/* Main Form Container Card */}
        <div className="form-card-container" onClick={(e) => e.stopPropagation()}>
          <div className="form-card-header">Edit Project Details</div>
          
          <form onSubmit={handleUpdate} className="edit-project-form">
            
            {/* Grid Layout for Fields */}
            <div className="inputs-grid-layout">
              
              {/* Project ID */}
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

              {/* Project Title */}
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

              {/* Department Select */}
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
                    {departments.map(dept => (
                      <div 
                        key={dept} 
                        onClick={() => { setFormData(prev => ({...prev, department: dept})); setOpenDropdown(null); }}
                        className={`mat-dropdown-list-item ${formData.department === dept ? 'selected-active' : ''}`}
                      >
                        <span>{dept}</span>
                        {formData.department === dept && <span className="check-icon">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Priority Select */}
              <div className="dropdown-relative-container">
                <div 
                  onClick={() => setOpenDropdown(openDropdown === 'priority' ? null : 'priority')}
                  className={`mat-select-trigger-box ${openDropdown === 'priority' ? 'opened-active' : ''}`}
                >
                  <label className="mat-notch-label persistent-label">Project Priority*</label>
                  <span className={`priority-badge badge-${formData.projectPriority.toLowerCase()}`}>
                    {formData.projectPriority}
                  </span>
                  <span className="dropdown-indicator-caret">▼</span>
                </div>
                {openDropdown === 'priority' && (
                  <div className="mat-popup-dropdown-panel">
                    {priorities.map(prio => (
                      <div 
                        key={prio} 
                        onClick={() => { setFormData(prev => ({...prev, projectPriority: prio})); setOpenDropdown(null); }}
                        className={`mat-dropdown-list-item ${formData.projectPriority === prio ? 'selected-active' : ''}`}
                      >
                        <span>{prio}</span>
                        {formData.projectPriority === prio && <span className="check-icon">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Client */}
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

              {/* Price */}
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

              {/* Project Start Date */}
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

              {/* Project End Date */}
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

            {/* Team Multi-Select */}
            <div className="form-spacing-stack dropdown-relative-container">
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'team' ? null : 'team')}
                className={`mat-select-trigger-box ${openDropdown === 'team' ? 'opened-active' : ''}`}
              >
                <label className="mat-notch-label persistent-label">Team*</label>
                <div className="team-chips-wrapper">
                  {formData.team.length > 0 ? (
                    formData.team.map(member => (
                      <span key={member} className="team-member-chip">
                        {member}
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); toggleTeamMember(member); }}
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
                <div className="mat-popup-dropdown-panel">
                  {teamMembers.map(member => (
                    <div 
                      key={member} 
                      onClick={() => toggleTeamMember(member)}
                      className={`mat-dropdown-list-item ${formData.team.includes(member) ? 'selected-active' : ''}`}
                    >
                      <div className="team-checkbox-item">
                        <input 
                          type="checkbox" 
                          checked={formData.team.includes(member)} 
                          readOnly
                          className="team-checkbox-input"
                        />
                        <span>{member}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Work Status Radio Group */}
            <div className="form-spacing-stack radio-group-block">
              <span className="radio-group-title">Work Status*</span>
              <div className="radio-items-inline-wrap">
                {workStatuses.map(status => (
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

            {/* Project Description Textarea */}
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

            {/* Budget & Project Manager Grid */}
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

            {/* Project Type Custom Dropdown */}
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
                <div className="mat-popup-dropdown-panel">
                  {projectTypes.map(type => (
                    <div 
                      key={type} 
                      onClick={() => { setFormData(prev => ({...prev, projectType: type})); setOpenDropdown(null); }}
                      className={`mat-dropdown-list-item ${formData.projectType === type ? 'selected-active' : ''}`}
                    >
                      <span>{type}</span>
                      {formData.projectType === type && <span className="check-icon">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EXACT MATCH DESCRIPTION TOOLBAR */}
            <div className="form-spacing-stack">
              <label className="editor-group-title">Descriptions:</label>
              <div className="editor-main-border-box">
                <div className="editor-horizontal-toolbar">
                  {/* Text Styles */}
                  <button type="button" title="Bold" className="editor-action-btn font-weight-b" onClick={() => handleToolbarClick('**', '**')}>B</button>
                  <button type="button" title="Italic" className="editor-action-btn font-style-i" onClick={() => handleToolbarClick('*', '*')}>I</button>
                  <button type="button" title="Underline" className="editor-action-btn text-deco-u" onClick={() => handleToolbarClick('<u>', '</u>')}>U</button>
                  <button type="button" title="Strikethrough" className="editor-action-btn text-deco-s" onClick={() => handleToolbarClick('~~', '~~')}>S</button>
                  
                  <div className="editor-toolbar-divider" />
                  
                  {/* Code & Blockquote */}
                  <button type="button" title="Code Block" className="editor-action-btn code-brackets" onClick={() => handleToolbarClick('```\n', '\n```')}>&lt;&gt;</button>
                  <button type="button" title="Blockquote" className="editor-action-btn quote-marks" onClick={() => handleToolbarClick('> ')}>”</button>
                  
                  <div className="editor-toolbar-divider" />
                  
                  {/* Lists & Headings */}
                  <button type="button" title="Numbered List" className="editor-action-btn list-num" onClick={() => handleToolbarClick('1. ')}>
                    <span className="num-stack">1<br/>2</span>
                    <span className="line-stack">＝<br/>＝</span>
                  </button>
                  <button type="button" title="Bullet List" className="editor-action-btn list-bullet" onClick={() => handleToolbarClick('- ')}>
                    <span className="bullet-stack">•<br/>•</span>
                    <span className="line-stack">＝<br/>＝</span>
                  </button>
                  
                  <div className="editor-horizontal-dropdown-trigger">
                    <span className="heading-text">Heading</span>
                    <span className="heading-caret">▼</span>
                  </div>
                  
                  <div className="editor-toolbar-divider" />
                  
                  {/* Links & Media */}
                  <button type="button" title="Insert Link" className="editor-action-btn action-link" onClick={() => handleToolbarClick('[', '](url)')}>🔗</button>
                  <button type="button" title="Insert Image" className="editor-action-btn action-image" onClick={() => handleToolbarClick('![alt text](', ')')}>🖼️</button>
                  
                  <div className="editor-toolbar-divider" />
                  
                  {/* Colors & Alignment */}
                  <button type="button" title="Text Color" className="editor-action-btn text-color-a">A<div className="color-bar-indicator"/></button>
                  <button type="button" title="Background Color" className="editor-action-btn bg-fill-bucket">🪣<div className="color-bar-indicator bg-indicator"/></button>
                  
                  <div className="editor-toolbar-divider" />
                  
                  <button type="button" title="Align Left" className="editor-action-btn align-icon">⦚☰</button>
                  <button type="button" title="Align Center" className="editor-action-btn align-icon">☰</button>
                  <button type="button" title="Align Right" className="editor-action-btn align-icon text-right-icon">☰⦚</button>
                  <button type="button" title="Justify" className="editor-action-btn align-icon">⦚☰⦚</button>
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

            {/* Form Footer Action Row */}
            <div className="form-actions-footer-row">
              <button type="submit" className="action-btn-pill-update">
                Update Project
              </button>
              <button type="button" onClick={handleCancel} className="action-btn-pill-cancel">
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjects;