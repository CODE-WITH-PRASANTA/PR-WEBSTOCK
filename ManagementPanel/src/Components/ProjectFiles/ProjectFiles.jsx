import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import { MdChevronRight, MdFileDownload, MdOutlineCloudUpload } from 'react-icons/md';
import { FiFilter, FiPlus, FiRefreshCw, FiCalendar, FiUser } from 'react-icons/fi';
import { LuSquarePen } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import './ProjectFiles.css';
import API from "../../Api/axios";

const ProjectFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals Visibility State
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [targetFile, setTargetFile] = useState(null);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Column Visibility List State (Added sNo)
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    sNo: true,
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

  // Fetch Files from Backend API
  const fetchFiles = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await API.get('/project-files');
      if (response.data.success) {
        setFiles(response.data.data);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to fetch project files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

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
      setSelectedIds(files.map(f => f._id));
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

  // File Selection Helper
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Auto-populate input details if blank
      if (!formData.name) setFormData(prev => ({ ...prev, name: file.name }));
    }
  };

  // Trigger Add Modal
  const openAddModal = () => {
    setFormData({ name: '', type: '', size: '', uploadedBy: '', date: new Date().toISOString().split('T')[0] });
    setSelectedFile(null);
    setActiveModal('add');
  };

  // Submit Add Action
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please attach a file.');
      return;
    }

    try {
      const data = new FormData();
      data.append('file', selectedFile);
      if (formData.name) data.append('name', formData.name);
      if (formData.type) data.append('type', formData.type);
      if (formData.size) data.append('size', formData.size);
      if (formData.uploadedBy) data.append('uploadedBy', formData.uploadedBy);
      if (formData.date) data.append('date', formData.date);

      const response = await API.post('/project-files', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setFiles([response.data.data, ...files]);
        setActiveModal(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload file.');
    }
  };

  // Trigger Edit Modal
  const openEditModal = (file) => {
    setTargetFile(file);
    const formattedDate = file.date ? new Date(file.date).toISOString().split('T')[0] : '';
    setFormData({
      name: file.name || '',
      type: file.type || '',
      size: file.size || '',
      uploadedBy: file.uploadedBy || '',
      date: formattedDate
    });
    setSelectedFile(null);
    setActiveModal('edit');
  };

  // Submit Edit Action
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (selectedFile) data.append('file', selectedFile);
      data.append('name', formData.name);
      data.append('type', formData.type);
      data.append('size', formData.size);
      data.append('uploadedBy', formData.uploadedBy);
      data.append('date', formData.date);

      const response = await API.put(`/project-files/${targetFile._id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setFiles(files.map(f => f._id === targetFile._id ? response.data.data : f));
        setActiveModal(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update file.');
    }
  };

  // Trigger Delete Modal
  const openDeleteModal = (file) => {
    setTargetFile(file);
    setActiveModal('delete');
  };

  // Confirm Delete Action
  const handleDeleteConfirm = async () => {
    try {
      const response = await API.delete(`/project-files/${targetFile._id}`);
      if (response.data.success) {
        setFiles(files.filter(f => f._id !== targetFile._id));
        setSelectedIds(selectedIds.filter(id => id !== targetFile._id));
        setActiveModal(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete file.');
    }
  };

  // Single File Download Action
  const handleDownload = async (file) => {
    try {
      const response = await API.get(`/project-files/download/${file._id}`, {
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/octet-stream' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Use filename from server to preserve extension, fallback to stored file.filename
      link.setAttribute('download', file.filename || file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Could not download file from server.');
    }
  };

  // Batch Selected Download Action
  const handleDownloadSelected = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one file to download.');
      return;
    }
    const selectedFiles = files.filter(f => selectedIds.includes(f._id));
    selectedFiles.forEach(file => handleDownload(file));
  };

  // Format Date View string safely
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const filteredFiles = files.filter(f => 
    (f.name && f.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (f.uploadedBy && f.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <button className="ProjectFiles-tool-btn text-dark" onClick={fetchFiles} title="Refresh Data">
              <FiRefreshCw />
            </button>
            <button className="ProjectFiles-tool-btn text-blue-light" onClick={handleDownloadSelected} title="Download Selected">
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
                      {colKey === 'checkbox' 
                        ? 'Checkbox' 
                        : colKey === 'sNo' 
                        ? 'S.No.' 
                        : colKey.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {errorMsg && <div className="ProjectFiles-alert-error" style={{ padding: '12px', color: 'red' }}>{errorMsg}</div>}

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
                {visibleColumns.sNo && <th width="60">S.No.</th>}
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
              {loading ? (
                <tr>
                  <td colSpan="9" className="ProjectFiles-empty-state">Loading files...</td>
                </tr>
              ) : filteredFiles.map((file, index) => (
                <tr key={file._id} className={selectedIds.includes(file._id) ? 'row-selected' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <input 
                        type="checkbox"
                        checked={selectedIds.includes(file._id)}
                        onChange={() => handleSelectRow(file._id)}
                        className="ProjectFiles-custom-checkbox"
                      />
                    </td>
                  )}
                  {visibleColumns.sNo && <td className="font-medium">{index + 1}</td>}
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
                      <button className="ProjectFiles-action-icon-btn gray-btn" onClick={() => handleDownload(file)}>
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
              {!loading && filteredFiles.length === 0 && (
                <tr>
                  <td colSpan="9" className="ProjectFiles-empty-state">No matching project files found.</td>
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

      {/* 1. ADD MODAL WINDOW */}
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
                <label>File Type (Optional)</label>
                <input type="text" placeholder="e.g. PDF, PNG" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
              </div>
              <div className="ProjectFiles-input-field-group">
                <label>File Size (Optional)</label>
                <input type="text" placeholder="Auto calculated if empty" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
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

            {/* Drag & Drop / Input Dropzone Area */}
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <div 
              className="ProjectFiles-upload-dropzone" 
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: 'pointer' }}
            >
              <MdOutlineCloudUpload className="ProjectFiles-dropzone-cloud" />
              <p>
                {selectedFile ? `Selected: ${selectedFile.name}` : <>Drag & drop a file here or <span className="browse-link">browse</span></>}
              </p>
              <span className="formats-note">Supported formats: PDF, DOCX, ZIP, PNG (Max 10MB)</span>
            </div>

            <div className="ProjectFiles-modal-footer">
              <button type="submit" className="ProjectFiles-btn bg-save">Save</button>
              <button type="button" className="ProjectFiles-btn bg-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. EDIT MODAL WINDOW */}
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

            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <div 
              className="ProjectFiles-upload-dropzone" 
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: 'pointer' }}
            >
              <MdOutlineCloudUpload className="ProjectFiles-dropzone-cloud" />
              <p>
                {selectedFile ? `Selected New File: ${selectedFile.name}` : <>Click to replace existing physical file or <span className="browse-link">browse</span></>}
              </p>
              <span className="formats-note">Supported formats: PDF, DOCX, ZIP, PNG (Max 10MB)</span>
            </div>

            <div className="ProjectFiles-modal-footer">
              <button type="submit" className="ProjectFiles-btn bg-save-active">Save</button>
              <button type="button" className="ProjectFiles-btn bg-cancel" onClick={() => setActiveModal(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. DELETE CONFIRMATION MODAL WINDOW */}
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