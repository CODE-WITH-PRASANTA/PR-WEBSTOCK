import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import { MdChevronRight, MdFileDownload, MdOutlineCloudUpload } from 'react-icons/md';
import { FiFilter, FiPlus, FiRefreshCw, FiCalendar, FiUser } from 'react-icons/fi';
import { LuSquarePen } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import './ProjectFiles.css';

const ProjectFiles = () => {
  // 5 Initial Dummy Data entries based on the reference images
  const initialFiles = [
    { id: 1, name: 'Project_Requirements.pdf', type: 'PDF', size: '2.5 MB', uploadedBy: 'Sarah Smith', date: '2024-01-05' },
    { id: 2, name: 'Design_Mockup.fig', type: 'Figma', size: '45.2 MB', uploadedBy: 'John Deo', date: '2024-01-12' },
    { id: 3, name: 'Budget_Report.xlsx', type: 'Excel', size: '1.8 MB', uploadedBy: 'Pankaj Patel', date: '2024-01-20' },
    { id: 4, name: 'Meeting_Notes.docx', type: 'Word', size: '500 KB', uploadedBy: 'Pooja Sharma', date: '2024-01-25' },
    { id: 5, name: 'Logo_Final.png', type: 'Image', size: '1.2 MB', uploadedBy: 'Pankaj Patel', date: '2024-01-30' }
  ];

  const [files, setFiles] = useState(initialFiles);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals Visibility State
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [targetFile, setTargetFile] = useState(null);

  // Column Visibility List State (3rd Reference Image)
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    fileName: true,
    type: true,
    size: true,
    uploadedBy: true,
    date: true,
    download: true,
    actions: true
  });
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Form Fields State for Modals
  const [formData, setFormData] = useState({ name: '', type: '', size: '', uploadedBy: '', date: '' });

  // Handle Click Outside Column Menu Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsColumnDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Checkbox Select All Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(files.map(f => f.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Trigger Add Modal
  const openAddModal = () => {
    setFormData({ name: '', type: '', size: '', uploadedBy: '', date: '' });
    setActiveModal('add');
  };

  // Submit Add Action
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    const newFile = {
      id: Date.now(),
      ...formData
    };
    setFiles([newFile, ...files]);
    setActiveModal(null);
  };

  // Trigger Edit Modal
  const openEditModal = (file) => {
    setTargetFile(file);
    setFormData({ ...file });
    setActiveModal('edit');
  };

  // Submit Edit Action
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setFiles(files.map(f => f.id === targetFile.id ? { ...f, ...formData } : f));
    setActiveModal(null);
  };

  // Trigger Delete Modal
  const openDeleteModal = (file) => {
    setTargetFile(file);
    setActiveModal('delete');
  };

  // Confirm Delete Action
  const handleDeleteConfirm = () => {
    setFiles(files.filter(f => f.id !== targetFile.id));
    setSelectedIds(selectedIds.filter(id => id !== targetFile.id));
    setActiveModal(null);
  };

  // Format Date View string safely
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[1]}/${parts[2]}/${parts[0]}`;
    return dateStr;
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ProjectFiles-container">
      
      {/* Top Header Section */}
      <div className="ProjectFiles-header">
        <h2 className="ProjectFiles-title">Project Files</h2>
        <div className="ProjectFiles-breadcrumb">
          <HiOutlineHome className="ProjectFiles-home-icon" />
          <MdChevronRight className="ProjectFiles-arrow-icon" />
          <span className="ProjectFiles-link">Projects</span>
          <MdChevronRight className="ProjectFiles-arrow-icon" />
          <span className="ProjectFiles-current">Files</span>
        </div>
      </div>

      {/* Main Container Workspace */}
      <div className="ProjectFiles-workspace-card">
        
        {/* Action Toolbar Header Row */}
        <div className="ProjectFiles-toolbar">
          <div className="ProjectFiles-left-tools">
            <span className="ProjectFiles-section-label">Project Files</span>
            <div className="ProjectFiles-search-box">
              <HiOutlineSearch className="ProjectFiles-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ProjectFiles-search-input"
              />
            </div>
          </div>
          
          <div className="ProjectFiles-right-tools" ref={dropdownRef}>
            {/* Filter Toggle Menu (Three Horizontal Lines icon) */}
            <button 
              className="ProjectFiles-tool-btn text-blue" 
              onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
              title="Show/Hide Columns"
            >
              <FiFilter />
            </button>
            <button className="ProjectFiles-tool-btn text-green" onClick={openAddModal} title="Add New File">
              <FiPlus />
            </button>
            <button className="ProjectFiles-tool-btn text-dark" onClick={() => setFiles(initialFiles)} title="Reset Data">
              <FiRefreshCw />
            </button>
            <button className="ProjectFiles-tool-btn text-blue-light" title="Download Selected">
              <MdFileDownload />
            </button>

            {/* Column Hide/Show Dropdown Popover View */}
            <div className={`ProjectFiles-column-dropdown ${isColumnDropdownOpen ? 'open' : ''}`}>
              <div className="ProjectFiles-dropdown-header">Show/Hide Column</div>
              <div className="ProjectFiles-dropdown-list">
                {Object.keys(visibleColumns).map((colKey) => (
                  <label key={colKey} className="ProjectFiles-dropdown-item">
                    <input 
                      type="checkbox" 
                      checked={visibleColumns[colKey]} 
                      onChange={(e) => setVisibleColumns({ ...visibleColumns, [colKey]: e.target.checked })}
                      className="ProjectFiles-custom-checkbox"
                    />
                    <span className="ProjectFiles-item-label">
                      {colKey === 'checkbox' ? 'Checkbox' : colKey.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Responsive Table Layout View */}
        <div className="ProjectFiles-table-wrapper">
          <table className="ProjectFiles-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="40">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={files.length > 0 && selectedIds.length === files.length}
                      className="ProjectFiles-custom-checkbox"
                    />
                  </th>
                )}
                {visibleColumns.fileName && <th>File Name</th>}
                {visibleColumns.type && <th>Type</th>}
                {visibleColumns.size && <th>Size</th>}
                {visibleColumns.uploadedBy && <th>Uploaded By</th>}
                {visibleColumns.date && <th>Date</th>}
                {visibleColumns.download && <th>Download</th>}
                {visibleColumns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className={selectedIds.includes(file.id) ? 'row-selected' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <input 
                        type="checkbox"
                        checked={selectedIds.includes(file.id)}
                        onChange={() => handleSelectRow(file.id)}
                        className="ProjectFiles-custom-checkbox"
                      />
                    </td>
                  )}
                  {visibleColumns.fileName && <td className="font-medium text-dark">{file.name}</td>}
                  {visibleColumns.type && <td>{file.type}</td>}
                  {visibleColumns.size && <td>{file.size}</td>}
                  {visibleColumns.uploadedBy && <td>{file.uploadedBy}</td>}
                  {visibleColumns.date && (
                    <td>
                      <div className="ProjectFiles-table-date">
                        <FiCalendar className="ProjectFiles-date-icon" />
                        <span>{formatDateDisplay(file.date)}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.download && (
                    <td>
                      <button className="ProjectFiles-action-icon-btn gray-btn">
                        <MdFileDownload />
                      </button>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td>
                      <div className="ProjectFiles-action-cell-flex">
                        <button className="ProjectFiles-action-icon-btn blue-btn" onClick={() => openEditModal(file)}>
                          <LuSquarePen />
                        </button>
                        <button className="ProjectFiles-action-icon-btn red-btn" onClick={() => openDeleteModal(file)}>
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filteredFiles.length === 0 && (
                <tr>
                  <td colSpan="8" className="ProjectFiles-empty-state">No matching project files found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Static Table Pagination Panel Footer */}
        <div className="ProjectFiles-pagination-bar">
          <div className="ProjectFiles-pagination-right">
            <span className="ProjectFiles-pagination-text">Items per page:</span>
            <div className="ProjectFiles-per-page-select">
              <select defaultValue="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
            </div>
            <span className="ProjectFiles-pagination-text-summary">
              1 - {filteredFiles.length} of {files.length}
            </span>
            <div className="ProjectFiles-pagination-arrows">
              <button disabled className="ProjectFiles-arrow-btn">‹</button>
              <button disabled className="ProjectFiles-arrow-btn">›</button>
            </div>
          </div>
        </div>

      </div>

      {/* --- MODAL DIALOGS OVERLAYS WRAPPERS --- */}

      {/* 1. ADD MODAL WINDOW (4th Reference Image View) */}
      <div className={`ProjectFiles-modal-overlay ${activeModal === 'add' ? 'show' : ''}`}>
        <div className="ProjectFiles-modal-card max-width-lg">
          <div className="ProjectFiles-modal-header bg-gradient-blue">
            <h3>New File</h3>
            <button className="ProjectFiles-modal-close" onClick={() => setActiveModal(null)}><IoClose /></button>
          </div>
          <form onSubmit={handleAddSubmit} className="ProjectFiles-modal-form">
            <div className="ProjectFiles-form-grid">
              <div className="ProjectFiles-input-field-group">
                <label>File Name*</label>
                <input type="text" required placeholder="File Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group">
                <label>File Type*</label>
                <input type="text" required placeholder="File Type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group">
                <label>File Size*</label>
                <input type="text" required placeholder="File Size" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group icon-inside-wrapper">
                <label>Uploaded By*</label>
                <input type="text" required placeholder="Uploaded By" value={formData.uploadedBy} onChange={(e) => setFormData({...formData, uploadedBy: e.target.value})} />
                <FiUser className="input-right-side-icon" />
              </div>
              <div className="ProjectFiles-input-field-group full-width">
                <label>Uploaded Date*</label>
                <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>

            {/* Drag & Drop Area Box */}
            <div className="ProjectFiles-upload-dropzone">
              <MdOutlineCloudUpload className="ProjectFiles-dropzone-cloud" />
              <p>Drag & drop a file here or <span className="browse-link">browse</span></p>
              <span className="formats-note">Supported formats: PDF, DOCX, ZIP, PNG (Max 10MB)</span>
            </div>

            <div className="ProjectFiles-modal-footer">
              <button type="submit" className="ProjectFiles-btn bg-save">Save</button>
              <button type="button" className="ProjectFiles-btn bg-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. EDIT MODAL WINDOW (2nd Reference Image View) */}
      <div className={`ProjectFiles-modal-overlay ${activeModal === 'edit' ? 'show' : ''}`}>
        <div className="ProjectFiles-modal-card max-width-lg">
          <div className="ProjectFiles-modal-header bg-gradient-blue">
            <h3>Edit File: {targetFile?.name}</h3>
            <button className="ProjectFiles-modal-close" onClick={() => setActiveModal(null)}><IoClose /></button>
          </div>
          <form onSubmit={handleEditSubmit} className="ProjectFiles-modal-form">
            <div className="ProjectFiles-form-grid">
              <div className="ProjectFiles-input-field-group">
                <label>File Name*</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group">
                <label>File Type*</label>
                <input type="text" required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group">
                <label>File Size*</label>
                <input type="text" required value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group icon-inside-wrapper">
                <label>Uploaded By*</label>
                <input type="text" required value={formData.uploadedBy} onChange={(e) => setFormData({...formData, uploadedBy: e.target.value})} />
                <FiUser className="input-right-side-icon" />
              </div>
              <div className="ProjectFiles-input-field-group full-width">
                <label>Uploaded Date*</label>
                <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>

            <div className="ProjectFiles-upload-dropzone">
              <MdOutlineCloudUpload className="ProjectFiles-dropzone-cloud" />
              <p>Drag & drop a file here or <span className="browse-link">browse</span></p>
              <span className="formats-note">Supported formats: PDF, DOCX, ZIP, PNG (Max 10MB)</span>
            </div>

            <div className="ProjectFiles-modal-footer">
              <button type="submit" className="ProjectFiles-btn bg-save-active">Save</button>
              <button type="button" className="ProjectFiles-btn bg-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. DELETE CONFIRMATION MODAL WINDOW (5th Reference Image View) */}
      <div className={`ProjectFiles-modal-overlay ${activeModal === 'delete' ? 'show' : ''}`}>
        <div className="ProjectFiles-modal-card max-width-sm text-align-left border-radius-sm p-24">
          <h2 className="ProjectFiles-delete-title">Are you sure?</h2>
          <div className="ProjectFiles-delete-body">
            <p><strong>File Name:</strong> {targetFile?.name}</p>
            <p><strong>Uploaded By:</strong> {targetFile?.uploadedBy}</p>
          </div>
          <div className="ProjectFiles-modal-footer flex-row-reverse-start gap-12 mt-24">
            <button type="button" className="ProjectFiles-btn bg-cancel text-white px-24 border-radius-round" onClick={() => setActiveModal(null)}>Cancel</button>
            <button type="button" className="ProjectFiles-btn bg-delete-red text-white px-24 border-radius-round" onClick={handleDeleteConfirm}>Delete</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectFiles;