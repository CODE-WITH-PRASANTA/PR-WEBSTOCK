import React, { useState, useMemo } from 'react';
import './EmployeeDocuments.css'; // Importing custom presentation architecture styles

// --- STATIC INITIALIZED DOCUMENT MOCK RECORDS ARRAY ---
const INITIAL_RECORDS = [
  { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', fileName: 'passport.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Admin', date: '01/15/2023', status: 'Approved' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', fileName: 'offer_letter.pdf', type: 'DOCX', size: '1.2 MB', uploadedBy: 'John Deo', date: '02/10/2023', status: 'Pending' },
  { id: 3, name: 'Robert J...', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', fileName: 'cv_v2.pdf', type: 'PDF', size: '3.1 MB', uploadedBy: 'Sarah Smith', date: '01/20/2023', status: 'Approved' },
  { id: 4, name: 'Michael ...', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', fileName: 'certificates.zip', type: 'ZIP', size: '15.5 MB', uploadedBy: 'Admin', date: '03/05/2023', status: 'Rejected' },
  { id: 5, name: 'Emily Da...', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', fileName: 'license.jpg', type: 'JPG', size: '800 KB', uploadedBy: 'Emily Davis', date: '04/12/2023', status: 'Approved' },
  { id: 6, name: 'William ...', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', fileName: 'agreement.pdf', type: 'PDF', size: '1.8 MB', uploadedBy: 'John Deo', date: '05/18/2023', status: 'Pending' },
  { id: 7, name: 'Jessica T.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', fileName: 'resume_final.pdf', type: 'PDF', size: '2.9 MB', uploadedBy: 'Admin', date: '06/22/2023', status: 'Approved' },
  { id: 8, name: 'David An...', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', fileName: 'project_files.zip', type: 'ZIP', size: '45.2 MB', uploadedBy: 'Sarah Smith', date: '07/30/2023', status: 'Approved' },
  { id: 9, name: 'Linda Th...', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150', fileName: 'voter_id.pdf', type: 'PDF', size: '1.5 MB', uploadedBy: 'Admin', date: '08/14/2023', status: 'Pending' },
  { id: 10, name: 'James J...', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', fileName: 'confidentiality.docx', type: 'DOCX', size: '950 KB', uploadedBy: 'John Deo', date: '09/01/2023', status: 'Approved' },
];

const COLUMNS_SCHEMA = [
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'id', label: 'ID' },
  { id: 'employeeName', label: 'Employee Name' },
  { id: 'fileName', label: 'File Name' },
  { id: 'type', label: 'Type' },
  { id: 'size', label: 'Size' },
  { id: 'uploadedBy', label: 'Uploaded By' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' },
  { id: 'download', label: 'Download' },
  { id: 'actions', label: 'Actions' }
];

const EmployeeDocuments = () => {
  // --- APPLICATION REACT CORE STATES ---
  const [documents, setDocuments] = useState(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Header Columns Mapping Toggle State
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, employeeName: true, fileName: true, type: true,
    size: true, uploadedBy: true, date: true, status: true, download: true, actions: true
  });

  // UI Interactive Dropdowns Toggles
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  
  // Pagination State Configuration parameters
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Form Management Modals Layout Status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formState, setFormState] = useState({
    id: null, name: '', fileName: '', type: '', size: '', uploadedBy: '', date: '2026-07-01', status: 'Approved'
  });

  // --- RENDERING FILTER SEARCH PIPELINES ---
  const currentFilteredDocs = useMemo(() => {
    return documents.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const activePagePaginatedDocs = useMemo(() => {
    const calculatedStartIndex = (currentPage - 1) * itemsPerPage;
    return currentFilteredDocs.slice(calculatedStartIndex, calculatedStartIndex + itemsPerPage);
  }, [currentFilteredDocs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(currentFilteredDocs.length / itemsPerPage);

  // --- ACTIONS & EXECUTION LOGIC HANDLERS ---
  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentFilteredDocs.map(doc => doc.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectSingleRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteRowItem = (id) => {
    if (window.confirm("Are you sure you want to delete this document record?")) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  // NATIVE FILE DOWNLOAD SIMULATION
  const handleDownloadFileAsset = (fileName, fileType = "application/pdf") => {
    try {
      const standardDummyPayload = `Mock binary content placeholder for your asset container stream: "${fileName}"`;
      const generatedBlob = new Blob([standardDummyPayload], { type: fileType });
      const temporaryAnchorElement = document.createElement('a');
      
      temporaryAnchorElement.href = URL.createObjectURL(generatedBlob);
      temporaryAnchorElement.download = fileName;
      document.body.appendChild(temporaryAnchorElement);
      temporaryAnchorElement.click();
      
      document.body.removeChild(temporaryAnchorElement);
      URL.revokeObjectURL(temporaryAnchorElement.href);
    } catch (err) {
      console.error("Critical lifecycle error running file download initialization pipeline: ", err);
    }
  };

  // COMPREHENSIVE DATASET DATA GROUP EXPORT (CSV)
  const handleExportDatasetCSV = () => {
    if (documents.length === 0) {
      alert("No data records found available inside current dynamic memory mapping stores to safely compile CSV document sheets.");
      return;
    }

    const compiledHeadersRow = ["Record ID", "Employee Name", "Target File Asset", "Extension Type", "Memory Payload Size", "Uploader Identity", "Validation Date", "Lifecycle Workflow Status"];
    
    const serializedRows = documents.map(doc => [
      `"${doc.id}"`,
      `"${doc.name.replace(/"/g, '""')}"`,
      `"${doc.fileName.replace(/"/g, '""')}"`,
      `"${doc.type}"`,
      `"${doc.size}"`,
      `"${doc.uploadedBy.replace(/"/g, '""')}"`,
      `"${doc.date}"`,
      `"${doc.status}"`
    ]);

    const structuredCsvStringifiedOutput = [compiledHeadersRow.join(","), ...serializedRows.map(row => row.join(","))].join("\n");
    const generatedBlob = new Blob([structuredCsvStringifiedOutput], { type: 'text/csv;charset=utf-8;' });
    const temporaryAnchorElement = document.createElement('a');
    
    temporaryAnchorElement.href = URL.createObjectURL(generatedBlob);
    temporaryAnchorElement.download = `Employee_Documents_Dataset_Export_${Date.now()}.csv`;
    document.body.appendChild(temporaryAnchorElement);
    temporaryAnchorElement.click();
    
    document.body.removeChild(temporaryAnchorElement);
    URL.revokeObjectURL(temporaryAnchorElement.href);
  };

  // STORES INTERFACE AND SEARCH RECOVERY REFRESH PIPELINE
  const handleResetAndRefreshInterfaceStore = () => {
    setDocuments(INITIAL_RECORDS);
    setSearchQuery('');
    setSelectedRows([]);
    setCurrentPage(1);
    setItemsPerPage(5);
    setShowColumnDropdown(false);
    setShowPageSizeDropdown(false);
  };

  const triggerOpenAddModal = () => {
    setModalMode('add');
    setFormState({
      id: null, name: '', fileName: '', type: '', size: '', uploadedBy: '', date: '2026-07-01', status: 'Approved'
    });
    setIsModalOpen(true);
  };

  const triggerOpenEditModal = (doc) => {
    setModalMode('edit');
    let nativeInputDateFormat = '2026-07-01';
    if (doc.date.includes('/')) {
      const [m, d, y] = doc.date.split('/');
      nativeInputDateFormat = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    setFormState({
      id: doc.id,
      name: doc.name,
      fileName: doc.fileName,
      type: doc.type,
      size: doc.size,
      uploadedBy: doc.uploadedBy,
      date: nativeInputDateFormat,
      status: doc.status,
      avatar: doc.avatar
    });
    setIsModalOpen(true);
  };

  const handleFormSubmissionSubmit = (e) => {
    e.preventDefault();
    const [y, m, d] = formState.date.split('-');
    const formattedUIDate = `${m}/${d}/${y}`;

    if (modalMode === 'add') {
      const generatedNewRecord = {
        id: Date.now(),
        name: formState.name || 'Unknown Employee',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        fileName: formState.fileName || 'document_file.pdf',
        type: formState.type.toUpperCase() || 'PDF',
        size: formState.size || '1.5 MB',
        uploadedBy: formState.uploadedBy || 'Admin',
        date: formattedUIDate,
        status: formState.status
      };
      setDocuments([generatedNewRecord, ...documents]);
    } else {
      setDocuments(prev => prev.map(item => 
        item.id === formState.id 
          ? { ...item, name: formState.name, fileName: formState.fileName, type: formState.type.toUpperCase(), size: formState.size, uploadedBy: formState.uploadedBy, date: formattedUIDate, status: formState.status }
          : item
      ));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="employee-doc-container">
      {/* Top Header Navigation Trail Block */}
      <div className="doc-breadcrumb-bar">
        <div className="breadcrumb-left">Employee Documents</div>
        <div className="breadcrumb-right">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001.1 1h2a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
          <span>&gt;</span>
          <span>Employees</span>
          <span>&gt;</span>
          <span style={{color: '#a0aec0'}}>Documents</span>
        </div>
      </div>

      {/* Main Structural Wrapper Grid */}
      <div className="doc-main-wrapper">
        
        {/* Core Controls Filter Bar Panel Element */}
        <div className="doc-control-panel">
          <div className="control-left-block">
            <span className="panel-title-text">Employee Documents</span>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                className="search-input-field"
                placeholder="Search documents, employees..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              <svg className="search-icon-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <div className="control-right-block">
            {/* Show/Hide column configuration action list button trigger */}
            <div style={{position: 'relative'}}>
              <button 
                className={`action-icon-btn btn-col-filter ${showColumnDropdown ? 'btn-active' : ''}`}
                onClick={() => { setShowColumnDropdown(!showColumnDropdown); setShowPageSizeDropdown(false); }}
                title="Toggle Columns Layout"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M4 9h16M7 14h10M10 19h4" /></svg>
              </button>

              {/* Smooth dynamic checklist drop card container panel */}
              {showColumnDropdown && (
                <div className="column-visibility-dropdown">
                  <div className="dropdown-header-label">Show/Hide Column</div>
                  <div className="dropdown-list-scroll">
                    {COLUMNS_SCHEMA.map(col => (
                      <label key={col.id} className="column-toggle-row">
                        <input 
                          type="checkbox"
                          checked={visibleColumns[col.id]}
                          disabled={col.id === 'employeeName' || col.id === 'actions'} 
                          onChange={() => setVisibleColumns(prev => ({ ...prev, [col.id]: !prev[col.id] }))}
                        />
                        <span>{col.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add Record dynamic input overlay trigger button */}
            <button className="action-icon-btn btn-add-rec" onClick={triggerOpenAddModal} title="Add New Entry Record">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </button>
            
            {/* Refresh/Reset system configuration button */}
            <button className="action-icon-btn btn-reset-view" onClick={handleResetAndRefreshInterfaceStore} title="Refresh & Reset Store Data">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" /></svg>
            </button>

            {/* Data Export Button Trigger */}
            <button className="action-icon-btn btn-export-csv" onClick={handleExportDatasetCSV} title="Download Excel Sheet CSV Data">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
          </div>
        </div>

        {/* Primary Screen Scrollable Data Table Panel Section */}
        <div className="table-scrollable-container">
          <table className="doc-data-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th className="th-checkbox">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAllRows}
                      checked={currentFilteredDocs.length > 0 && selectedRows.length === currentFilteredDocs.length}
                      style={{accentColor: '#5542f6', cursor: 'pointer'}}
                    />
                  </th>
                )}
                {visibleColumns.id && <th className="th-id">ID</th>}
                {visibleColumns.employeeName && <th>Employee Name</th>}
                {visibleColumns.fileName && <th>File Name</th>}
                {visibleColumns.type && <th>Type</th>}
                {visibleColumns.size && <th>Size</th>}
                {visibleColumns.uploadedBy && <th>Uploaded By</th>}
                {visibleColumns.date && <th>Date</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.download && <th className="th-download">Download</th>}
                {visibleColumns.actions && <th className="th-actions">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {activePagePaginatedDocs.length > 0 ? (
                activePagePaginatedDocs.map((doc) => (
                  <tr key={doc.id} className={`table-row-item ${selectedRows.includes(doc.id) ? 'row-selected' : ''}`}>
                    {visibleColumns.checkbox && (
                      <td className="td-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(doc.id)}
                          onChange={() => handleSelectSingleRow(doc.id)}
                          style={{accentColor: '#5542f6', cursor: 'pointer'}}
                        />
                      </td>
                    )}
                    {visibleColumns.id && <td className="td-id">{doc.id}</td>}
                    {visibleColumns.employeeName && (
                      <td>
                        <div className="employee-profile-cell">
                          <img src={doc.avatar} alt="" className="employee-avatar-img" />
                          <span className="employee-name-text">{doc.name}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.fileName && <td className="file-name-mono">{doc.fileName}</td>}
                    {visibleColumns.type && <td style={{color:'#718096'}}><span className="type-badge">{doc.type}</span></td>}
                    {visibleColumns.size && <td style={{color:'#718096'}}>{doc.size}</td>}
                    {visibleColumns.uploadedBy && <td>{doc.uploadedBy}</td>}
                    {visibleColumns.date && (
                      <td>
                        <div className="date-badge-wrapper">
                          <svg className="calendar-icon-amber" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span>{doc.date}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td>
                        <span className={`status-pill ${doc.status.toLowerCase()}`}>
                          {doc.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.download && (
                      <td className="td-download">
                        <button className="action-inner-btn btn-download-row" onClick={() => handleDownloadFileAsset(doc.fileName)} title={`Download ${doc.fileName}`}>
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </button>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="td-actions">
                        <div style={{display: 'flex', gap: '0.25rem', justifyContent: 'center'}}>
                          <button className="action-inner-btn btn-edit-row" onClick={() => triggerOpenEditModal(doc)} title="Modify Data Element">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button className="action-inner-btn btn-delete-row" onClick={() => handleDeleteRowItem(doc.id)} title="Remove Data Element">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="empty-state-row">No document records found matching parameters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Responsive Footer Info Control Bar Section */}
        <div className="pagination-footer-panel">
          <div className="items-per-page-selector">
          </div>

          <div className="pagination-nav-block">
            <span className="pagination-info-text">
              {currentFilteredDocs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, currentFilteredDocs.length)} of {currentFilteredDocs.length}
            </span>
            <div style={{display: 'flex', gap: '0.25rem'}}>
              <button 
                className="pagination-arrow-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                className="pagination-arrow-btn" 
                disabled={currentPage >= totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD & EDIT RECORD INTERACTIVE FORM MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay-backdrop">
          <div className="modal-content-card">
            
            {/* Modal Box Banner Header */}
            <div className="modal-header-banner">
              <div className="modal-header-left">
                {modalMode === 'edit' && formState.avatar && (
                  <img src={formState.avatar} alt="" style={{width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover'}} />
                )}
                <h3 className="modal-title-text">
                  {modalMode === 'edit' ? `Modify Entry: ${formState.fileName}` : 'Create New Document Record'}
                </h3>
              </div>
              <button className="modal-close-top-btn" onClick={() => setIsModalOpen(false)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Form Input Frame Context Layout */}
            <form className="modal-interactive-form" onSubmit={handleFormSubmissionSubmit}>
              <div className="form-fields-grid">
                
                <div className="form-input-group">
                  <label className="form-field-label">Employee Name*</label>
                  <div className="form-relative-input">
                    <input 
                      type="text" required 
                      value={formState.name}
                      placeholder="e.g. Jane Doe"
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                    <svg className="form-inner-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-field-label">File Name*</label>
                  <div className="form-relative-input">
                    <input 
                      type="text" required 
                      value={formState.fileName}
                      placeholder="e.g. passport_revised.pdf"
                      onChange={(e) => setFormState({...formState, fileName: e.target.value})}
                    />
                    <svg className="form-inner-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-field-label">File Type*</label>
                  <input 
                    type="text" required placeholder="e.g. PDF, ZIP, DOCX"
                    className="flat-text-input"
                    value={formState.type}
                    onChange={(e) => setFormState({...formState, type: e.target.value})}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-field-label">File Size*</label>
                  <input 
                    type="text" required placeholder="e.g. 3.2 MB"
                    className="flat-text-input"
                    value={formState.size}
                    onChange={(e) => setFormState({...formState, size: e.target.value})}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-field-label">Uploaded By*</label>
                  <div className="form-relative-input">
                    <input 
                      type="text" required 
                      value={formState.uploadedBy}
                      placeholder="e.g. Admin Manager"
                      onChange={(e) => setFormState({...formState, uploadedBy: e.target.value})}
                    />
                    <svg className="form-inner-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-field-label">Uploaded Date*</label>
                  <input 
                    type="date" required 
                    value={formState.date}
                    onChange={(e) => setFormState({...formState, date: e.target.value})}
                    style={{cursor: 'pointer'}}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-field-label">Workflow Status*</label>
                  <select 
                    value={formState.status}
                    onChange={(e) => setFormState({...formState, status: e.target.value})}
                    style={{cursor: 'pointer'}}
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Graphical File Selection Box Drag Mockup zone */}
              <div className="form-mock-upload-zone">
                <div className="upload-zone-flex">
                  <div className="upload-zone-icon-box">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <p className="upload-main-text">Drag and drop file data here or <span className="upload-highlight-link">browse computer system</span></p>
                  <p className="upload-sub-text">Supported formats: PDF, DOCX, ZIP, PNG, JPG up to 10MB total size</p>
                </div>
              </div>

              {/* Form Action Controls Trigger row panel */}
              <div className="form-action-footer-row">
                <button type="submit" className="btn-form-submit">Save Record</button>
                <button type="button" className="btn-form-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDocuments;