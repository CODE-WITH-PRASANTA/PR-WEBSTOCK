import React, { useState, useRef, useEffect } from 'react';
import { 
  BriefcaseBusiness, 
  Building2, 
  Clock3, 
  MapPin, 
  Users2, 
  GraduationCap, 
  Flag, 
  ChevronDown,
  Check,
  ChevronRight,
  Home,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code2,
  Quote,
  List,
  ListOrdered,
  Link2,
  Image,
  Type,
  PaintBucket,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react';
import './AddJob.css';

const AddJob = () => {
  // Form Control States
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [description, setDescription] = useState('');

  // Dropdown Selections
  const [jobType, setJobType] = useState('Full Time');
  const [experienceLevel, setExperienceLevel] = useState('Fresher');
  const [status, setStatus] = useState('Open');
  const [department, setDepartment] = useState('Development');

  // Toggle Menus
  const [openDropdown, setOpenDropdown] = useState(null); 

  const jobTypeOptions = ['Full Time', 'Part Time', 'Contract', 'Internship'];
  const experienceOptions = ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'];
  const statusOptions = ['Open', 'Closed', 'Draft'];
  const departmentOptions = ['Development', 'Design', 'Marketing', 'HR', 'Sales'];

  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleSelectOption = (type, value) => {
    if (type === 'type') setJobType(value);
    if (type === 'exp') setExperienceLevel(value);
    if (type === 'status') setStatus(value);
    if (type === 'dept') setDepartment(value);
    setOpenDropdown(null);
  };

  // Functional formatting injection into Textarea Selection Positions
  const formatText = (styleType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(startPos, endPos);

    let openingTag = '';
    let closingTag = '';

    switch (styleType) {
      case 'bold':
        openingTag = '**'; closingTag = '**';
        break;
      case 'italic':
        openingTag = '*'; closingTag = '*';
        break;
      case 'underline':
        openingTag = '<u>'; closingTag = '</u>';
        break;
      case 'strike':
        openingTag = '~~'; closingTag = '~~';
        break;
      default:
        return;
    }

    const modifiedText = 
      currentText.substring(0, startPos) + 
      openingTag + (selectedText || "text") + closingTag + 
      currentText.substring(endPos);

    setDescription(modifiedText);

    // Refocus and re-select tracking updates
    setTimeout(() => {
      textarea.focus();
      const offset = openingTag.length;
      textarea.setSelectionRange(startPos + offset, startPos + offset + (selectedText || "text").length);
    }, 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobTitle || !location || !vacancies) return;

    const payload = { jobTitle, department, jobType, location, vacancies, experienceLevel, status, description };
    console.log('Submitted Job:', payload);
    alert('Job posted successfully!');
    
    setJobTitle(''); setLocation(''); setVacancies(''); setDescription('');
    setJobType('Full Time'); setExperienceLevel('Fresher'); setStatus('Open'); setDepartment('Development');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      setJobTitle(''); setLocation(''); setVacancies(''); setDescription('');
      setJobType('Full Time'); setExperienceLevel('Fresher'); setStatus('Open'); setDepartment('Development');
    }
  };

  const isFormValid = jobTitle && location && vacancies;

  return (
    <div className="AddJob-container" ref={containerRef}>
      
      {/* Top Header Row with Left title and Right Breadcrumbs */}
      <div className="AddJob-header-row">
        <h1 className="AddJob-main-title">Add Job</h1>
        <div className="AddJob-breadcrumb">
          <Home size={14} className="AddJob-breadcrumb-home-icon" />
          <ChevronRight size={12} className="AddJob-breadcrumb-arrow" /> 
          <span>Jobs</span> 
          <ChevronRight size={12} className="AddJob-breadcrumb-arrow" /> 
          <span className="AddJob-breadcrumb-active">Add Job</span>
        </div>
      </div>

      <div className="AddJob-card">
        <div className="AddJob-card-header">
          <h2 className="AddJob-card-subtitle">Post a New Job</h2>
        </div>

        <form onSubmit={handleSubmit} className="AddJob-form-layout">
          
          {/* Row 1: Title & Department */}
          <div className="AddJob-form-row">
            <div className="AddJob-form-group">
              <label className="AddJob-floating-label">Job Title*</label>
              <div className="AddJob-input-wrapper">
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder=" "
                  required 
                />
                <BriefcaseBusiness size={18} className="AddJob-field-icon" />
              </div>
            </div>

            <div className="AddJob-form-group">
              <label className="AddJob-floating-label">Department*</label>
              <div className="AddJob-input-wrapper select-box" onClick={() => toggleDropdown('dept')}>
                <div className="AddJob-selected-text">{department}</div>
                <div className="AddJob-right-icons">
                  <ChevronDown size={18} className={`AddJob-arrow-icon ${openDropdown === 'dept' ? 'rotated' : ''}`} />
                  <Building2 size={18} className="AddJob-field-icon-select" />
                </div>
                {openDropdown === 'dept' && (
                  <div className="AddJob-custom-dropdown open-smooth">
                    {departmentOptions.map((opt) => (
                      <div 
                        key={opt} 
                        className={`AddJob-dropdown-option ${department === opt ? 'active-item' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleSelectOption('dept', opt); }}
                      >
                        <span>{opt}</span>
                        {department === opt && <Check size={16} className="AddJob-check-icon" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Job Type & Location */}
          <div className="AddJob-form-row">
            <div className="AddJob-form-group">
              <label className="AddJob-floating-label">Job Type*</label>
              <div className="AddJob-input-wrapper select-box" onClick={() => toggleDropdown('type')}>
                <div className="AddJob-selected-text">{jobType}</div>
                <div className="AddJob-right-icons">
                  <ChevronDown size={18} className={`AddJob-arrow-icon ${openDropdown === 'type' ? 'rotated' : ''}`} />
                  <Clock3 size={18} className="AddJob-field-icon-select" />
                </div>
                {openDropdown === 'type' && (
                  <div className="AddJob-custom-dropdown open-smooth">
                    {jobTypeOptions.map((opt) => (
                      <div 
                        key={opt} 
                        className={`AddJob-dropdown-option ${jobType === opt ? 'active-item' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleSelectOption('type', opt); }}
                      >
                        <span>{opt}</span>
                        {jobType === opt && <Check size={16} className="AddJob-check-icon" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="AddJob-form-group">
              <label className="AddJob-floating-label">Location*</label>
              <div className="AddJob-input-wrapper">
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder=" "
                  required 
                />
                <MapPin size={18} className="AddJob-field-icon" />
              </div>
            </div>
          </div>

          {/* Row 3: Vacancies, Experience Level & Status */}
          <div className="AddJob-form-grid-three">
            <div className="AddJob-form-group">
              <label className="AddJob-floating-label">No of Vacancies*</label>
              <div className="AddJob-input-wrapper">
                <input 
                  type="number" 
                  value={vacancies}
                  onChange={(e) => setVacancies(e.target.value)}
                  placeholder=" "
                  required 
                />
                <Users2 size={18} className="AddJob-field-icon" />
              </div>
            </div>

            <div className="AddJob-form-group">
              <label className="AddJob-floating-label">Experience Level*</label>
              <div className="AddJob-input-wrapper select-box" onClick={() => toggleDropdown('exp')}>
                <div className="AddJob-selected-text">{experienceLevel}</div>
                <div className="AddJob-right-icons">
                  <ChevronDown size={18} className={`AddJob-arrow-icon ${openDropdown === 'exp' ? 'rotated' : ''}`} />
                  <GraduationCap size={18} className="AddJob-field-icon-select" />
                </div>
                {openDropdown === 'exp' && (
                  <div className="AddJob-custom-dropdown open-smooth">
                    {experienceOptions.map((opt) => (
                      <div 
                        key={opt} 
                        className={`AddJob-dropdown-option ${experienceLevel === opt ? 'active-item' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleSelectOption('exp', opt); }}
                      >
                        <span>{opt}</span>
                        {experienceLevel === opt && <Check size={16} className="AddJob-check-icon" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="AddJob-form-group status-group-container">
              <fieldset className="AddJob-fieldset-wrapper">
                <legend className="AddJob-fieldset-legend">Status*</legend>
                <div className="AddJob-input-wrapper select-box status-select-box" onClick={() => toggleDropdown('status')}>
                  <div className="AddJob-selected-text">{status}</div>
                  <div className="AddJob-right-icons">
                    <ChevronDown size={18} className={`AddJob-arrow-icon ${openDropdown === 'status' ? 'rotated' : ''}`} />
                    <Flag size={18} className="AddJob-field-icon-select" />
                  </div>
                  {openDropdown === 'status' && (
                    <div className="AddJob-custom-dropdown open-smooth">
                      {statusOptions.map((opt) => (
                        <div 
                          key={opt} 
                          className={`AddJob-dropdown-option ${status === opt ? 'active-item' : ''}`}
                          onClick={(e) => { e.stopPropagation(); handleSelectOption('status', opt); }}
                        >
                          <span>{opt}</span>
                          {status === opt && <Check size={16} className="AddJob-check-icon" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Job Description WYSIWYG Panel Area */}
          <div className="AddJob-description-section">
            <span className="AddJob-description-heading">Job Description</span>
            <div className="AddJob-wysiwyg-box">
              <div className="AddJob-wysiwyg-toolbar">
                <button type="button" className="tool-btn" onClick={() => formatText('bold')} title="Bold"><Bold size={14} /></button>
                <button type="button" className="tool-btn" onClick={() => formatText('italic')} title="Italic"><Italic size={14} /></button>
                <button type="button" className="tool-btn" onClick={() => formatText('underline')} title="Underline"><Underline size={14} /></button>
                <button type="button" className="tool-btn" onClick={() => formatText('strike')} title="Strikethrough"><Strikethrough size={14} /></button>
                <span className="tool-divider">|</span>
                <button type="button" className="tool-btn"><Code2 size={14} /></button>
                <button type="button" className="tool-btn"><Quote size={14} /></button>
                <span className="tool-divider">|</span>
                <button type="button" className="tool-btn"><List size={14} /></button>
                <button type="button" className="tool-btn"><ListOrdered size={14} /></button>
                <span className="tool-divider">|</span>
                <div className="tool-select-container">
                  <select className="tool-select" defaultValue="Heading">
                    <option>Heading</option>
                    <option>Paragraph</option>
                  </select>
                </div>
                <span className="tool-divider">|</span>
                <button type="button" className="tool-btn"><Link2 size={14} /></button>
                <button type="button" className="tool-btn"><Image size={14} /></button>
                <span className="tool-divider">|</span>
                <button type="button" className="tool-btn"><Type size={14} /></button>
                <button type="button" className="tool-btn"><PaintBucket size={14} /></button>
                <span className="tool-divider">|</span>
                <button type="button" className="tool-btn"><AlignLeft size={14} /></button>
                <button type="button" className="tool-btn"><AlignCenter size={14} /></button>
                <button type="button" className="tool-btn"><AlignRight size={14} /></button>
                <button type="button" className="tool-btn"><AlignJustify size={14} /></button>
              </div>
              <textarea 
                ref={textareaRef}
                className="AddJob-textarea-input" 
                placeholder="Type here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="AddJob-form-footer">
            <button 
              type="submit" 
              className={`AddJob-btn-submit ${isFormValid ? 'ready-to-submit' : ''}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
            <button type="button" className="AddJob-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddJob;