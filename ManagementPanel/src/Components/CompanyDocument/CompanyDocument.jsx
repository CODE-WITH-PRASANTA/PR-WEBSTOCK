import React, { useState } from 'react';
import './CompanyDocument.css';

// Mock initial data schema matching corporate file repository styles
const initialDocumentData = [
  { id: 1, name: 'Employee Handbook', type: 'PDF', size: '2.4 MB', uploadedBy: 'HR Department', dateAdded: 'Oct 12, 2023', status: 'Active' },
  { id: 2, name: 'Nondisclosure Agreement (NDA)', type: 'DOCX', size: '450 KB', uploadedBy: 'Legal Team', dateAdded: 'Sep 28, 2023', status: 'Active' },
  { id: 3, name: 'Q3 Financial Review', type: 'XLSX', size: '5.1 MB', uploadedBy: 'Finance Dept', dateAdded: 'Nov 02, 2023', status: 'Review' },
  { id: 4, name: 'Company Logo Assets', type: 'ZIP', size: '14.8 MB', uploadedBy: 'Design Lead', dateAdded: 'Aug 15, 2023', status: 'Active' },
  { id: 5, name: 'IT Security Compliance Protocol', type: 'PDF', size: '1.8 MB', uploadedBy: 'IT Security', dateAdded: 'Oct 24, 2023', status: 'Expired' },
  { id: 6, name: 'Remote Work Policy Guidelines', type: 'PDF', size: '920 KB', uploadedBy: 'HR Department', dateAdded: 'Jul 19, 2023', status: 'Active' },
  { id: 7, name: 'Health Insurance Plan Perks', type: 'DOCX', size: '1.2 MB', uploadedBy: 'HR Department', dateAdded: 'Jan 05, 2023', status: 'Active' },
  { id: 8, name: 'Office Lease Extension 2024', type: 'PDF', size: '3.4 MB', uploadedBy: 'Operations', dateAdded: 'Dec 11, 2023', status: 'Review' },
  { id: 9, name: 'Brand Guideline Blueprint', type: 'PDF', size: '8.7 MB', uploadedBy: 'Marketing Team', dateAdded: 'Feb 20, 2023', status: 'Active' },
  { id: 10, name: 'Vendor Master Agreement Template', type: 'DOCX', size: '620 KB', uploadedBy: 'Legal Team', dateAdded: 'May 14, 2023', status: 'Active' },
  { id: 11, name: 'Emergency Evacuation Map Blueprint', type: 'PNG', size: '4.2 MB', uploadedBy: 'Facilities', dateAdded: 'Mar 09, 2023', status: 'Active' },
];

const CompanyDocument = () => {
  // Operational Data Management State
  const [data, setData] = useState(initialDocumentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Interactive UI triggers
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Form State Control Structure
  const [formData, setFormData] = useState({
    name: '', type: 'PDF', size: '', uploadedBy: '', dateAdded: '', status: 'Active'
  });

  // Dynamic Toggle Columns Visibility Map Configuration
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    name: true,
    type: true,
    size: true,
    uploadedBy: true,
    dateAdded: true,
    status: true,
    actions: true
  });

  // Multi-row tracking checkbox operations
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

  // Live Query Searching Filtering
  const filteredData = data.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Range Slicing logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemIds = currentItems.map(item => item.id);

  // CSV Exporter engine trigger task 
  const handleDownloadCSV = () => {
    const headers = ['Document Name', 'Format Type', 'File Size', 'Uploaded By', 'Date Added', 'Status\n'];
    const rows = data.map(doc => [doc.name, doc.type, doc.size, doc.uploadedBy, doc.dateAdded, doc.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "company_documents_ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Core Data Actions
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to completely delete this file entry?")) {
      setData(data.filter(doc => doc.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  // Checkbox conditional dynamic removal trigger (Bulk Task Action Handler)
  const handleBulkDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to wipe out the ${selectedRows.length} checked document assets?`)) {
      setData(data.filter(doc => !selectedRows.includes(doc.id)));
      setSelectedRows([]);
    }
  };

  // Overlay Popups management
  const openFormModal = (doc = null) => {
    if (doc) {
      setEditRecord(doc);
      setFormData({
        name: doc.name, type: doc.type, size: doc.size,
        uploadedBy: doc.uploadedBy, dateAdded: doc.dateAdded, status: doc.status
      });
    } else {
      setEditRecord(null);
      setFormData({ name: '', type: 'PDF', size: '', uploadedBy: '', dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editRecord) {
      setData(data.map(doc => doc.id === editRecord.id ? { ...doc, ...formData } : doc));
    } else {
      const newDoc = { id: Date.now(), ...formData };
      setData([newDoc, ...data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="doc-container">
      {/* Dynamic Header Path Indicator */}
      <div className="doc-breadcrumb-wrapper">
        <h2 className="doc-title">Company Document</h2>
        <div className="doc-breadcrumb">
          <span>🏠</span> <span className="doc-separator">›</span>
          <span>Payroll</span> <span className="doc-separator">›</span>
          <span className="doc-active">Company Document</span>
        </div>
      </div>

      {/* Main Base Card Board Container */}
      <div className="doc-card">
        {/* Core Control Action Bar */}
        <div className="doc-toolbar">
          <div className="doc-search-box">
            <span className="doc-search-icon">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <div className="doc-action-buttons">
            {/* Conditional Checkbox Task Deletion Ribbon Button */}
            {selectedRows.length > 0 && (
              <button className="doc-btn-bulk-delete" onClick={handleBulkDeleteSelected} title="Delete Selected Items">
                🗑️ Delete Selected ({selectedRows.length})
              </button>
            )}

            {/* Column Selector Toggle Dot System Dropdown */}
            <div className="doc-dropdown-wrapper">
              <button className="doc-icon-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Show/Hide Columns">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="doc-column-dropdown">
                  <div className="doc-dropdown-title">Show/Hide Column</div>
                  <hr />
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="doc-dropdown-item">
                      <input 
                        type="checkbox" checked={columns[key]} 
                        onChange={() => setColumns({ ...columns, [key]: !columns[key] })}
                      />
                      <span className="doc-capitalize">
                        {key === 'name' ? 'Document Name' : key === 'uploadedBy' ? 'Uploaded By' : key === 'dateAdded' ? 'Date Added' : key}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Popup Instantiation Trigger Plus Button Icon */}
            <button className="doc-icon-btn doc-btn-add" onClick={() => openFormModal(null)} title="Upload Document File">➕</button>
            {/* CSV Download stream button trigger action */}
            <button className="doc-icon-btn doc-btn-download" onClick={handleDownloadCSV} title="Export Documents List Ledger">📥</button>
          </div>
        </div>

        {/* Adaptive Layout Responsive Table Data Section */}
        <div className="doc-table-responsive">
          <table className="doc-table">
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
                {columns.id && <th>ID</th>}
                {columns.name && <th>Document Name</th>}
                {columns.type && <th>Format Type</th>}
                {columns.size && <th>File Size</th>}
                {columns.uploadedBy && <th>Uploaded By</th>}
                {columns.dateAdded && <th>Date Added</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="doc-text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((doc) => (
                  <tr key={doc.id} className={selectedRows.includes(doc.id) ? 'doc-selected-row' : ''}>
                    {columns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(doc.id)} onChange={() => handleSelectRow(doc.id)} />
                      </td>
                    )}
                    {columns.id && <td>{doc.id}</td>}
                    {columns.name && (
                      <td>
                        <div className="doc-profile-cell">
                          <span className="doc-file-icon">📄</span>
                          <span className="doc-emp-name">{doc.name}</span>
                        </div>
                      </td>
                    )}
                    {columns.type && <td><span className={`doc-type-tag tag-${doc.type.toLowerCase()}`}>{doc.type}</span></td>}
                    {columns.size && <td>{doc.size}</td>}
                    {columns.uploadedBy && <td>{doc.uploadedBy}</td>}
                    {columns.dateAdded && <td>{doc.dateAdded}</td>}
                    {columns.status && (
                      <td>
                        <span className={`doc-status-badge doc-badge-${doc.status.toLowerCase()}`}>
                          {doc.status}
                        </span>
                      </td>
                    )}
                    {columns.actions && (
                      <td className="doc-text-center doc-actions-cell">
                        <button className="doc-action-edit" onClick={() => openFormModal(doc)}>📝</button>
                        <button className="doc-action-delete" onClick={() => handleDelete(doc.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="doc-text-center doc-no-data">No documents found matching criteria query parameters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area Page Controls Section */}
        <div className="doc-pagination-footer">
          <div className="doc-per-page-container">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          
          <div className="doc-info-controls">
            <span className="doc-counter">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="doc-nav-arrows">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="doc-arrow-btn">‹</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="doc-arrow-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic PopUp Modal Form Overlay View */}
      {isModalOpen && (
        <div className="doc-modal-overlay">
          <div className="doc-modal-card">
            <div className="doc-modal-header">
              <div className="doc-modal-profile">
                <span className="doc-modal-avatar-placeholder">📁</span>
                <h3 className="doc-modal-title">{editRecord ? 'Edit Document Configuration' : 'New Document Registration'}</h3>
              </div>
              <button className="doc-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleFormSubmit} className="doc-modal-form">
              <div className="doc-form-row doc-split-two">
                <div className="doc-input-group">
                  <label>Document Name*</label>
                  <div className="doc-input-wrapper">
                    <input type="text" name="name" value={formData.name} onChange={handleFormInputChange} required />
                    <span className="doc-input-icon">✏️</span>
                  </div>
                </div>
                <div className="doc-input-group">
                  <label>File Extension Type*</label>
                  <div className="doc-input-wrapper">
                    <select name="type" value={formData.type} onChange={handleFormInputChange} className="doc-select-input">
                      <option value="PDF">PDF Document</option>
                      <option value="DOCX">Word DOCX</option>
                      <option value="XLSX">Excel Spreadsheet</option>
                      <option value="ZIP">ZIP Compression Archive</option>
                      <option value="PNG">PNG Image Asset</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="doc-form-row doc-split-two">
                <div className="doc-input-group">
                  <label>File Size Summary (e.g. 2.4 MB)*</label>
                  <div className="doc-input-wrapper">
                    <input type="text" name="size" value={formData.size} onChange={handleFormInputChange} placeholder="e.g. 1.5 MB" required />
                    <span className="doc-input-icon">💾</span>
                  </div>
                </div>
                <div className="doc-input-group">
                  <label>Department / Uploaded By*</label>
                  <div className="doc-input-wrapper">
                    <input type="text" name="uploadedBy" value={formData.uploadedBy} onChange={handleFormInputChange} required />
                    <span className="doc-input-icon">🏢</span>
                  </div>
                </div>
              </div>

              <div className="doc-form-row doc-split-two">
                <div className="doc-input-group">
                  <label>Date Added Ledger</label>
                  <div className="doc-input-wrapper">
                    <input type="text" name="dateAdded" value={formData.dateAdded} onChange={handleFormInputChange} />
                    <span className="doc-input-icon">📅</span>
                  </div>
                </div>
                <div className="doc-input-group">
                  <label>Asset Status*</label>
                  <div className="doc-input-wrapper">
                    <select name="status" value={formData.status} onChange={handleFormInputChange} className="doc-select-input">
                      <option value="Active">Active</option>
                      <option value="Review">In Review</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="doc-modal-footer">
                <button type="submit" className="doc-btn-save">Save Assets</button>
                <button type="button" className="doc-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDocument;