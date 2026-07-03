import React, { useState } from 'react';
import './DocumentPolicies.css';

// Initial Mock Dataset matching image_dca24f.png
const initialPoliciesData = [
  { id: 1, name: 'Code of Conduct', category: 'General', department: 'HR', effectiveDate: '2025-01-01', lastRevision: '2024-12-15', size: '1.2 MB', type: 'PDF', status: 'Active' },
  { id: 2, name: 'Work From Home Policy', category: 'Remote Work', department: 'Operations', effectiveDate: '2025-02-01', lastRevision: '2025-01-10', size: '0.9 MB', type: 'PDF', status: 'Active' },
  { id: 3, name: 'Travel & Expense Policy', category: 'Finance', department: 'Finance', effectiveDate: '2024-06-01', lastRevision: '2024-05-20', size: '1.5 MB', type: 'PDF', status: 'In Review' },
  { id: 4, name: 'Anti-Harassment Policy', category: 'Compliance', department: 'HR', effectiveDate: '2025-01-01', lastRevision: '2024-11-30', size: '2.1 MB', type: 'PDF', status: 'Active' },
  { id: 5, name: 'Leave Policy', category: 'Benefits', department: 'HR', effectiveDate: '2025-01-01', lastRevision: '2024-12-20', size: '1.8 MB', type: 'PDF', status: 'Active' },
  { id: 6, name: 'IT Asset Policy', category: 'IT', department: 'IT', effectiveDate: '2025-03-01', lastRevision: '2025-02-15', size: '0.7 MB', type: 'DOCX', status: 'Active' },
  { id: 7, name: 'Data Privacy Policy', category: 'Compliance', department: 'Legal', effectiveDate: '2025-01-01', lastRevision: '2024-10-10', size: '3.2 MB', type: 'PDF', status: 'Active' },
  { id: 8, name: 'Performance Review', category: 'General', department: 'HR', effectiveDate: '2024-01-01', lastRevision: '2023-12-01', size: '1.1 MB', type: 'PDF', status: 'Active' },
  { id: 9, name: 'Overtime Policy', category: 'Compensation', department: 'Finance', effectiveDate: '2025-01-01', lastRevision: '2024-12-05', size: '0.5 MB', type: 'PDF', status: 'Active' },
  { id: 10, name: 'Dress Code Policy', category: 'General', department: 'HR', effectiveDate: '2024-08-01', lastRevision: '2024-07-15', size: '0.4 MB', type: 'PDF', status: 'Active' },
  { id: 11, name: 'Whistleblower Policy', category: 'Compliance', department: 'Legal', effectiveDate: '2025-05-01', lastRevision: '2025-04-12', size: '1.4 MB', type: 'PDF', status: 'In Review' }
];

const DocumentPolicies = () => {
  // Core Data States
  const [policies, setPolicies] = useState(initialPoliciesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Overlay UI Toggles
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Form State matching architecture seen in image_dca58e.png
  const [formData, setFormData] = useState({
    name: '', category: 'General', department: 'HR', effectiveDate: '', status: 'Active', tags: '', description: ''
  });

  // Dynamic Column visibility configuration state from image_dca2a5.png
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    policyName: true,
    category: true,
    department: true,
    effectiveDate: true,
    lastRevision: true,
    size: true,
    type: true,
    download: true,
    status: true,
    actions: true
  });

  // Checkbox Row Selections handlers
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (visibleItemIds) => {
    const isAllSelected = visibleItemIds.every(id => selectedRows.includes(id));
    if (isAllSelected) {
      setSelectedRows(selectedRows.filter(id => !visibleItemIds.includes(id)));
    } else {
      setSelectedRows([...new Set([...selectedRows, ...visibleItemIds])]);
    }
  };

  // Searching filter method
  const filteredPolicies = policies.filter(policy => 
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Math calculations
  const totalItems = filteredPolicies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPolicies.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemIds = currentItems.map(item => item.id);

  // Simulated CSV Master Ledger Exporter Button Handler
  const handleBulkDownloadCSV = () => {
    const headers = ["Policy Name,Category,Department,Effective Date,Last Revision,Size,Type,Status"];
    const rows = policies.map(p => `"${p.name}","${p.category}","${p.department}","${p.effectiveDate}","${p.lastRevision}","${p.size}","${p.type}","${p.status}"`);
    const csvBlob = new Blob([[headers, ...rows].join("\n")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "HR_Policies_Inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIndividualDownload = (policyName) => {
    alert(`Initializing localized encrypted secure data transfer for asset standard: "${policyName}"`);
  };

  // Row Item Deletions
  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this policy specification record?")) {
      setPolicies(policies.filter(p => p.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  // Dynamic Multi-Checkbox selected elements bulk execution
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to permanently erase all ${selectedRows.length} selected policy protocols?`)) {
      setPolicies(policies.filter(p => !selectedRows.includes(p.id)));
      setSelectedRows([]);
      setCurrentPage(1);
    }
  };

  // Popup Management handlers
  const handleOpenModal = (record = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        name: record.name, category: record.category, department: record.department,
        effectiveDate: record.effectiveDate, status: record.status, tags: record.tags || '', description: record.description || ''
      });
    } else {
      setEditingRecord(null);
      setFormData({
        name: '', category: 'General', department: 'HR', effectiveDate: '', status: 'Active', tags: '', description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const currentDateStr = new Date().toISOString().split('T')[0];

    if (editingRecord) {
      setPolicies(policies.map(p => p.id === editingRecord.id ? { ...p, ...formData, lastRevision: currentDateStr } : p));
    } else {
      const newPolicy = {
        id: Date.now(),
        ...formData,
        lastRevision: currentDateStr,
        size: '1.0 MB',
        type: 'PDF'
      };
      setPolicies([newPolicy, ...policies]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="doc-policies-container">
      {/* Structural Breadcrumb Header bar */}
      <div className="doc-policies-breadcrumb-area">
        <h2 className="doc-policies-main-title">HR Policies</h2>
        <div className="doc-policies-breadcrumbs">
          <span>🏠</span> <span className="doc-policies-slash">›</span>
          <span>Documents</span> <span className="doc-policies-slash">›</span>
          <span className="doc-policies-active-route">HR Policies</span>
        </div>
      </div>

      {/* Primary Workspace Board Card block */}
      <div className="doc-policies-card">
        
        {/* Actions Toolbar Controls Area Layout */}
        <div className="doc-policies-toolbar">
          <div className="doc-policies-search-wrapper">
            <span className="doc-policies-search-icon">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="doc-policies-action-buttons">
            {/* Multi-Checkbox Dynamic Deletion Action Button Element */}
            {selectedRows.length > 0 && (
              <button className="doc-policies-bulk-delete-btn" onClick={handleBulkDelete}>
                🗑️ Delete Selected ({selectedRows.length})
              </button>
            )}

            {/* Column Configuration Show/Hide Dropdown system */}
            <div className="doc-policies-popover-wrapper">
              <button className="doc-policies-tool-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Toggle Column Layouts">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="doc-policies-columns-dropdown">
                  <div className="doc-policies-dropdown-header">Show/Hide Column</div>
                  <hr className="doc-policies-dropdown-divider" />
                  {Object.keys(visibleColumns).map((columnKey) => (
                    <label key={columnKey} className="doc-policies-dropdown-item">
                      <input 
                        type="checkbox" checked={visibleColumns[columnKey]}
                        onChange={() => setVisibleColumns({ ...visibleColumns, [columnKey]: !visibleColumns[columnKey] })}
                      />
                      <span className="doc-policies-col-text">
                        {columnKey.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Popup Instantiation Controls Plus Trigger Button Icon */}
            <button className="doc-policies-tool-btn doc-policies-btn-add" onClick={() => handleOpenModal(null)} title="Create New Policy Specification">➕</button>
            
            {/* Refresh Sim Reset System Trigger */}
            <button className="doc-policies-tool-btn" onClick={() => { setSearchTerm(''); setSelectedRows([]); }} title="Reset Filters">🔄</button>
            
            {/* CSV Export Action Button */}
            <button className="doc-policies-tool-btn doc-policies-btn-download" onClick={handleBulkDownloadCSV} title="Download Master Inventory CSV">📥</button>
          </div>
        </div>

        {/* Data Matrix Grid Table Framework */}
        <div className="doc-policies-table-responsive">
          <table className="doc-policies-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="40px">
                    <input 
                      type="checkbox" 
                      checked={currentItemIds.length > 0 && currentItemIds.every(id => selectedRows.includes(id))}
                      onChange={() => handleSelectAll(currentItemIds)}
                    />
                  </th>
                )}
                {visibleColumns.policyName && <th>Policy Name</th>}
                {visibleColumns.category && <th>Category</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.effectiveDate && <th>Effective Date</th>}
                {visibleColumns.lastRevision && <th>Last Revision</th>}
                {visibleColumns.size && <th>Size</th>}
                {visibleColumns.type && <th>Type</th>}
                {visibleColumns.download && <th className="doc-policies-center-text">Download</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th className="doc-policies-center-text">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((policy) => (
                  <tr key={policy.id} className={selectedRows.includes(policy.id) ? 'doc-policies-highlight-row' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(policy.id)} onChange={() => handleSelectRow(policy.id)} />
                      </td>
                    )}
                    {visibleColumns.policyName && <td className="doc-policies-primary-cell">{policy.name}</td>}
                    {visibleColumns.category && <td>{policy.category}</td>}
                    {visibleColumns.department && <td>{policy.department}</td>}
                    {visibleColumns.effectiveDate && <td>{policy.effectiveDate}</td>}
                    {visibleColumns.lastRevision && <td>{policy.lastRevision}</td>}
                    {visibleColumns.size && <td>{policy.size}</td>}
                    {visibleColumns.type && (
                      <td>
                        <span className={`doc-policies-file-badge type-${policy.type.toLowerCase()}`}>
                          {policy.type}
                        </span>
                      </td>
                    )}
                    {visibleColumns.download && (
                      <td className="doc-policies-center-text">
                        <button className="doc-policies-dl-action-icon" onClick={() => handleIndividualDownload(policy.name)}>📥</button>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td>
                        <span className={`doc-policies-status-pill status-${policy.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {policy.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="doc-policies-center-text doc-policies-actions-cell">
                        <button className="doc-policies-edit-icon" onClick={() => handleOpenModal(policy)}>📝</button>
                        <button className="doc-policies-delete-icon" onClick={() => handleDeleteItem(policy.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="doc-policies-no-records">No HR policy definitions matching filter metrics.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area Pagination Navigation System - Fixed per 10 items view window */}
        <div className="doc-policies-footer-pagination">
          <div className="doc-policies-per-page-selector">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="doc-policies-nav-controls">
            <span className="doc-policies-range-counter">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="doc-policies-arrow-wrapper">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="doc-policies-arrow-nav">‹</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="doc-policies-arrow-nav">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Dialog Form Element Architecture - Matches details from image_dca58e.png */}
      {isModalOpen && (
        <div className="doc-policies-modal-overlay">
          <div className="doc-policies-modal-wrapper">
            <div className="doc-policies-modal-header">
              <h3 className="doc-policies-modal-title">{editingRecord ? 'Edit HR Policy' : 'New HR Policy'}</h3>
              <button className="doc-policies-modal-close-cross" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleFormSubmit} className="doc-policies-modal-form-body">
              
              <div className="doc-policies-form-group">
                <label>Policy Name*</label>
                <div className="doc-policies-interactive-input">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Policy Name" required />
                  <span className="doc-policies-input-inner-icon">🛡️</span>
                </div>
              </div>

              <div className="doc-policies-form-row">
                <div className="doc-policies-form-group split-half">
                  <label>Category*</label>
                  <div className="doc-policies-interactive-input">
                    <select name="category" value={formData.category} onChange={handleInputChange} className="doc-policies-select">
                      <option value="General">General</option>
                      <option value="Remote Work">Remote Work</option>
                      <option value="Finance">Finance</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Benefits">Benefits</option>
                      <option value="IT">IT</option>
                      <option value="Compensation">Compensation</option>
                    </select>
                  </div>
                </div>

                <div className="doc-policies-form-group split-half">
                  <label>Effective Date</label>
                  <div className="doc-policies-interactive-input">
                    <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleInputChange} className="doc-policies-date" />
                  </div>
                </div>
              </div>

              <div className="doc-policies-form-row">
                <div className="doc-policies-form-group split-half">
                  <label>Department*</label>
                  <div className="doc-policies-interactive-input">
                    <select name="department" value={formData.department} onChange={handleInputChange} className="doc-policies-select">
                      <option value="HR">HR</option>
                      <option value="Operations">Operations</option>
                      <option value="Finance">Finance</option>
                      <option value="IT">IT</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                </div>

                <div className="doc-policies-form-group split-half">
                  <label>Status*</label>
                  <div className="doc-policies-interactive-input">
                    <select name="status" value={formData.status} onChange={handleInputChange} className="doc-policies-select">
                      <option value="Active">Active</option>
                      <option value="In Review">In Review</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="doc-policies-form-group">
                <label>Tags</label>
                <div className="doc-policies-interactive-input">
                  <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags" />
                  <span className="doc-policies-input-inner-icon">🏷️</span>
                </div>
              </div>

              <div className="doc-policies-form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Description" className="doc-policies-textarea" />
              </div>

              {/* Drag and Drop Box Upload Region */}
              <div className="doc-policies-drag-upload-container">
                <span className="doc-policies-cloud-upload-icon">☁️</span>
                <p className="doc-policies-upload-text-prompt">Drag & Drop file here or <span className="doc-policies-highlight-browse">Browse</span></p>
              </div>

              <div className="doc-policies-modal-actions">
                <button type="submit" className="doc-policies-modal-submit-btn">Save Policy</button>
                <button type="button" className="doc-policies-modal-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPolicies;