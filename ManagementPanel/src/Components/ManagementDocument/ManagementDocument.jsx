import React, { useState } from 'react';
import './ManagementDocument.css';

// Initial Mock Dataset mirroring the look and structures from image_dc1389.png
const initialDocumentData = [
  { id: 1, name: 'John Doe', documentType: 'Passport', department: 'Operations', uploadDate: '2024-01-10', expiryDate: '2029-01-10', size: '1.5 MB', type: 'PDF', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Jane Smith', documentType: 'Visa', department: 'HR', uploadDate: '2024-05-20', expiryDate: '2025-05-20', size: '0.8 MB', type: 'JPG', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Bob Johnson', documentType: 'Driving License', department: 'Logistics', uploadDate: '2023-03-15', expiryDate: '2023-03-15', size: '2.1 MB', type: 'PDF', status: 'Expired', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 4, name: 'Alice Williams', documentType: 'Degree Certificate', department: 'Finance', uploadDate: '2024-02-12', expiryDate: '', size: '3.4 MB', type: 'PDF', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, name: 'Charlie Brown', documentType: 'ID Card', department: 'Admin', uploadDate: '2025-01-05', expiryDate: '2030-01-05', size: '0.5 MB', type: 'PNG', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 6, name: 'Diana Prince', documentType: 'Medical Insurance', department: 'HR', uploadDate: '2025-01-01', expiryDate: '2025-12-31', size: '1.2 MB', type: 'PDF', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 7, name: 'Edward Norton', documentType: 'Contract', department: 'Legal', uploadDate: '2024-11-20', expiryDate: '', size: '4.8 MB', type: 'PDF', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=60' },
  { id: 8, name: 'Fiona Gallagher', documentType: 'Tax Form', department: 'Finance', uploadDate: '2025-03-01', expiryDate: '', size: '0.7 MB', type: 'PDF', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=45' },
  { id: 9, name: 'George Miller', documentType: 'Experience Letter', department: 'Operations', uploadDate: '2024-06-15', expiryDate: '', size: '1.9 MB', type: 'DOCX', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 10, name: 'Hannah Montana', documentType: 'Background Check', department: 'HR', uploadDate: '2024-09-10', expiryDate: '', size: '2.3 MB', type: 'PDF', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 11, name: 'Ian Malcolm', documentType: 'NDA', department: 'Legal', uploadDate: '2024-04-18', expiryDate: '', size: '1.1 MB', type: 'PDF', status: 'Verified', avatar: 'https://i.pravatar.cc/150?img=65' }
];

const ManagementDocument = () => {
  // Primary Core States
  const [data, setData] = useState(initialDocumentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Interactive Panel Dropdowns / Modal Toggles
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Form State Architecture (Mapping fields from layout image_dc143b.png)
  const [formData, setFormData] = useState({
    name: '', documentType: '', department: 'Operations', expiryDate: '', status: 'Pending', tags: '', description: ''
  });

  // Show/Hide Column Configuration States (image_dc13c4.png layout match)
  const [columns, setColumns] = useState({
    checkbox: true,
    name: true,
    documentType: true,
    department: true,
    uploadDate: true,
    expiryDate: true,
    size: true,
    type: true,
    download: true,
    status: true,
    actions: true
  });

  // Selection Checkbox Handler Math Methods
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (visibleIds) => {
    const allSelected = visibleIds.every(id => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows(selectedRows.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedRows(Array.from(new Set([...selectedRows, ...visibleIds])));
    }
  };

  // Searching Calculation
  const filteredData = data.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fixed Pagination Math Equations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemIds = currentItems.map(item => item.id);

  // Direct CSV Export Action
  const handleDownloadFullCSV = () => {
    const headers = ['Employee Name', 'Document Type', 'Department', 'Upload Date', 'Expiry Date', 'Size', 'Type', 'Status\n'];
    const rows = data.map(doc => [doc.name, doc.documentType, doc.department, doc.uploadDate, doc.expiryDate || 'N/A', doc.size, doc.type, doc.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Management_Documents_Ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulated Single File Download Feature
  const handleSingleFileDownload = (fileName) => {
    alert(`Downloading requested binary file asset stream for: ${fileName}`);
  };

  // Inline Delete
  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to permanently discard this file entry record?")) {
      setData(data.filter(doc => doc.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  // Bulk Multi-Checked Elements Action Triggered automatically via selection
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to drop all ${selectedRows.length} selected document items?`)) {
      setData(data.filter(doc => !selectedRows.includes(doc.id)));
      setSelectedRows([]);
    }
  };

  // Popup Management setup handlers
  const openFormModal = (doc = null) => {
    if (doc) {
      setEditRecord(doc);
      setFormData({
        name: doc.name, documentType: doc.documentType, department: doc.department,
        expiryDate: doc.expiryDate, status: doc.status, tags: doc.tags || '', description: doc.description || ''
      });
    } else {
      setEditRecord(null);
      setFormData({
        name: '', documentType: '', department: 'Operations', expiryDate: '', status: 'Pending', tags: '', description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (editRecord) {
      setData(data.map(doc => doc.id === editRecord.id ? { ...doc, ...formData } : doc));
    } else {
      const newDoc = {
        id: Date.now(),
        ...formData,
        uploadDate: todayStr,
        size: '1.2 MB',
        type: 'PDF',
        avatar: 'https://i.pravatar.cc/150?img=68'
      };
      setData([newDoc, ...data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="mgmt-doc-container">
      {/* Top Header Location Path Breadcrumb */}
      <div className="mgmt-doc-breadcrumb-wrapper">
        <h2 className="mgmt-doc-title">Employee Documents</h2>
        <div className="mgmt-doc-breadcrumb">
          <span>🏠</span> <span className="mgmt-doc-separator">›</span>
          <span>Documents</span> <span className="mgmt-doc-separator">›</span>
          <span className="mgmt-doc-active">Employee Documents</span>
        </div>
      </div>

      {/* Main Base Card Board Body Wrapper */}
      <div className="mgmt-doc-card">
        
        {/* Core Actions Top Action Bar Toolbar Section */}
        <div className="mgmt-doc-toolbar">
          <div className="mgmt-doc-search-box">
            <span className="mgmt-doc-search-icon">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <div className="mgmt-doc-action-buttons">
            {/* Dynamic Multi-Check Deletion option shown when user selects items */}
            {selectedRows.length > 0 && (
              <button className="mgmt-doc-btn-bulk-delete" onClick={handleBulkDelete}>
                🗑️ Delete Selected ({selectedRows.length})
              </button>
            )}

            {/* Column Selector Toggle Dot System Popover */}
            <div className="mgmt-doc-dropdown-wrapper">
              <button className="mgmt-doc-icon-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Show/Hide Columns">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="mgmt-doc-column-dropdown">
                  <div className="mgmt-doc-dropdown-title">Show/Hide Column</div>
                  <hr />
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="mgmt-doc-dropdown-item">
                      <input 
                        type="checkbox" checked={columns[key]} 
                        onChange={() => setColumns({ ...columns, [key]: !columns[key] })}
                      />
                      <span className="mgmt-doc-capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Popup Dialog Windows Instantiation Plus Trigger button */}
            <button className="mgmt-doc-icon-btn mgmt-doc-btn-add" onClick={() => openFormModal(null)} title="Upload Document File">➕</button>
            
            {/* CSV File generator action trigger */}
            <button className="mgmt-doc-icon-btn mgmt-doc-btn-download" onClick={handleDownloadFullCSV} title="Export CSV Data File">📥</button>
          </div>
        </div>

        {/* Matrix Grid Structural Table Field layout */}
        <div className="mgmt-doc-table-responsive">
          <table className="mgmt-doc-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th width="40px">
                    <input 
                      type="checkbox"
                      checked={currentItemIds.length > 0 && currentItemIds.every(id => selectedRows.includes(id))}
                      onChange={() => handleSelectAll(currentItemIds)}
                    />
                  </th>
                )}
                {columns.name && <th>Employee Name</th>}
                {columns.documentType && <th>Document Type</th>}
                {columns.department && <th>Department</th>}
                {columns.uploadDate && <th>Upload Date</th>}
                {columns.expiryDate && <th>Expiry Date</th>}
                {columns.size && <th>Size</th>}
                {columns.type && <th>Type</th>}
                {columns.download && <th className="mgmt-doc-text-center">Download</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="mgmt-doc-text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((doc) => (
                  <tr key={doc.id} className={selectedRows.includes(doc.id) ? 'mgmt-doc-selected-row' : ''}>
                    {columns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(doc.id)} onChange={() => handleSelectRow(doc.id)} />
                      </td>
                    )}
                    {columns.name && (
                      <td>
                        <div className="mgmt-doc-profile-cell">
                          <img src={doc.avatar} alt={doc.name} className="mgmt-doc-avatar" />
                          <span className="mgmt-doc-emp-name">{doc.name}</span>
                        </div>
                      </td>
                    )}
                    {columns.documentType && <td>{doc.documentType}</td>}
                    {columns.department && <td>{doc.department}</td>}
                    {columns.uploadDate && <td>{doc.uploadDate}</td>}
                    {columns.expiryDate && <td>{doc.expiryDate || '—'}</td>}
                    {columns.size && <td>{doc.size}</td>}
                    {columns.type && <td><span className={`mgmt-doc-type-badge type-${doc.type.toLowerCase()}`}>{doc.type}</span></td>}
                    {columns.download && (
                      <td className="mgmt-doc-text-center">
                        <button className="mgmt-doc-single-dl" onClick={() => handleSingleFileDownload(doc.documentType)}>📥</button>
                      </td>
                    )}
                    {columns.status && (
                      <td>
                        <span className={`mgmt-doc-status-badge badge-${doc.status.toLowerCase()}`}>
                          {doc.status}
                        </span>
                      </td>
                    )}
                    {columns.actions && (
                      <td className="mgmt-doc-text-center mgmt-doc-actions-cell">
                        <button className="mgmt-doc-action-edit" onClick={() => openFormModal(doc)}>📝</button>
                        <button className="mgmt-doc-action-delete" onClick={() => handleDeleteItem(doc.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="mgmt-doc-text-center mgmt-doc-no-data">No employee matching documents found asset registers.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area Page Configuration Sizing Slices */}
        <div className="mgmt-doc-pagination-footer">
          <div className="mgmt-doc-per-page-container">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          
          <div className="mgmt-doc-info-controls">
            <span className="mgmt-doc-counter">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="mgmt-doc-nav-arrows">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="mgmt-doc-arrow-btn">‹</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="mgmt-doc-arrow-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* PopUp Form Overlay Modal matching image_dc143b.png visual design fields */}
      {isModalOpen && (
        <div className="mgmt-doc-modal-overlay">
          <div className="mgmt-doc-modal-card">
            <div className="mgmt-doc-modal-header">
              <div className="mgmt-doc-modal-profile">
                <span className="mgmt-doc-modal-avatar-placeholder">👤</span>
                <h3 className="mgmt-doc-modal-title">{editRecord ? 'Update Document Details' : 'Upload New Document'}</h3>
              </div>
              <button className="mgmt-doc-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleFormSubmit} className="mgmt-doc-modal-form">
              <div className="mgmt-doc-input-group">
                <label>Employee Name*</label>
                <div className="mgmt-doc-input-wrapper">
                  <input type="text" name="name" value={formData.name} onChange={handleFormInputChange} required />
                  <span className="mgmt-doc-input-icon">👤</span>
                </div>
              </div>

              <div className="mgmt-doc-form-row mgmt-doc-split-two">
                <div className="mgmt-doc-input-group">
                  <label>Document Type*</label>
                  <div className="mgmt-doc-input-wrapper">
                    <input type="text" name="documentType" value={formData.documentType} onChange={handleFormInputChange} placeholder="e.g. Passport, Visa" required />
                    <span className="mgmt-doc-input-icon">📄</span>
                  </div>
                </div>
                <div className="mgmt-doc-input-group">
                  <label>Expiry Date</label>
                  <div className="mgmt-doc-input-wrapper">
                    <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleFormInputChange} className="mgmt-doc-date-picker" />
                  </div>
                </div>
              </div>

              <div className="mgmt-doc-form-row mgmt-doc-split-two">
                <div className="mgmt-doc-input-group">
                  <label>Department*</label>
                  <div className="mgmt-doc-input-wrapper">
                    <select name="department" value={formData.department} onChange={handleFormInputChange} className="mgmt-doc-select-input">
                      <option value="Operations">Operations</option>
                      <option value="HR">HR Department</option>
                      <option value="Finance">Finance</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Admin">Admin</option>
                      <option value="Legal">Legal Team</option>
                    </select>
                  </div>
                </div>
                <div className="mgmt-doc-input-group">
                  <label>Status*</label>
                  <div className="mgmt-doc-input-wrapper">
                    <select name="status" value={formData.status} onChange={handleFormInputChange} className="mgmt-doc-select-input">
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mgmt-doc-input-group">
                <label>Tags</label>
                <div className="mgmt-doc-input-wrapper">
                  <input type="text" name="tags" value={formData.tags} onChange={handleFormInputChange} placeholder="Enter relevant workflow tags" />
                  <span className="mgmt-doc-input-icon">🏷️</span>
                </div>
              </div>

              <div className="mgmt-doc-input-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleFormInputChange} rows="3" className="mgmt-doc-textarea" placeholder="Add custom notes description details..." />
              </div>

              {/* Drag and Drop Box Section */}
              <div className="mgmt-doc-uploader-box">
                <span className="uploader-cloud-icon">☁️</span>
                <p className="uploader-text">Drag & Drop file here or <span className="uploader-browse-btn">Browse</span></p>
              </div>

              <div className="mgmt-doc-modal-footer">
                <button type="submit" className="mgmt-doc-btn-save">Save Record</button>
                <button type="button" className="mgmt-doc-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementDocument;