import React, { useState } from 'react';
import './DocumentTemplates.css';

// Initial data array built from image_dd0f84.png metrics
const initialTemplates = [
  { id: 1, name: 'Offer Letter', type: 'HR', department: 'HR', size: '1.2 MB', fileType: 'DOCX' },
  { id: 2, name: 'NDA Agreement', type: 'Legal', department: 'Legal', size: '850 KB', fileType: 'PDF' },
  { id: 3, name: 'Performance Review', type: 'HR', department: 'HR', size: '500 KB', fileType: 'XLSX' },
  { id: 4, name: 'Employee Resignation', type: 'HR', department: 'HR', size: '450 KB', fileType: 'DOCX' },
  { id: 5, name: 'Promotion Letter', type: 'HR', department: 'HR', size: '600 KB', fileType: 'PDF' },
  { id: 6, name: 'Security Access', type: 'IT', department: 'IT', size: '300 KB', fileType: 'PDF' },
  { id: 7, name: 'Software Request', type: 'IT', department: 'IT', size: '750 KB', fileType: 'DOCX' },
  { id: 8, name: 'Expense Report', type: 'Finance', department: 'Finance', size: '1.1 MB', fileType: 'XLSX' },
  { id: 9, name: 'Budget Allocation', type: 'Finance', department: 'Finance', size: '2.5 MB', fileType: 'XLSX' },
  { id: 10, name: 'Partnership Agreement', type: 'Legal', department: 'Legal', size: '1.8 MB', fileType: 'PDF' },
  { id: 11, name: 'Vendor Policy Framework', type: 'Legal', department: 'Legal', size: '920 KB', fileType: 'PDF' }
];

const DocumentTemplates = () => {
  // Functional Master States
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Overlay Component Viewport States 
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Interactive Form Inputs Model (derived from image_dd12ea.png properties)
  const [formData, setFormData] = useState({
    name: '', type: 'HR', department: 'HR', tags: '', description: ''
  });

  // Structural column visibility layout options state toggles from image_dd128f.png
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    templateName: true,
    type: true,
    department: true,
    fileSize: true,
    fileType: true,
    download: true,
    actions: true
  });

  // Row Selection Methods
  const handleToggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleToggleSelectAll = (visibleIds) => {
    const allCheckedOnCurrentPage = visibleIds.every(id => selectedRows.includes(id));
    if (allCheckedOnCurrentPage) {
      setSelectedRows(selectedRows.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedRows([...new Set([...selectedRows, ...visibleIds])]);
    }
  };

  // Searching filter computation
  const filteredItems = templates.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Window Slice calculations
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const activeItemsSlice = filteredItems.slice(indexOfFirstRow, indexOfLastRow);
  const activeRowIds = activeItemsSlice.map(item => item.id);

  // Row Data Manipulations 
  const handleTriggerDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this template entry?")) {
      setTemplates(templates.filter(item => item.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleExecuteBulkDelete = () => {
    if (window.confirm(`Are you sure you want to remove all ${selectedRows.length} selected template objects?`)) {
      setTemplates(templates.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
      setCurrentPage(1);
    }
  };

  const handleDownloadAsset = (filename, extension) => {
    alert(`Downloading requested template payload profile: ${filename}.${extension.toLowerCase()}`);
  };

  // Dialog Window Lifecycle Actions
  const handleOpenFormModal = (targetItem = null) => {
    if (targetItem) {
      setEditingItem(targetItem);
      setFormData({
        name: targetItem.name, type: targetItem.type, department: targetItem.department,
        tags: targetItem.tags || '', description: targetItem.description || ''
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', type: 'HR', department: 'HR', tags: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFormSubmission = (e) => {
    e.preventDefault();
    if (editingItem) {
      setTemplates(templates.map(t => t.id === editingItem.id ? { ...t, ...formData } : t));
    } else {
      const generatedTemplate = {
        id: Date.now(),
        ...formData,
        size: '450 KB', 
        fileType: formData.type === 'HR' ? 'DOCX' : 'PDF'
      };
      setTemplates([generatedTemplate, ...templates]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="tmpl-dashboard-view">
      {/* Structural Path Breadcrumbs Header Bar */}
      <div className="tmpl-dashboard-header-path">
        <h2 className="tmpl-dashboard-view-title">Document Templates</h2>
        <div className="tmpl-dashboard-breadcrumbs-trail">
          <span>🏠</span> <span className="tmpl-dashboard-trail-arrow">›</span>
          <span>Documents</span> <span className="tmpl-dashboard-trail-arrow">›</span>
          <span className="tmpl-dashboard-trail-current">Templates</span>
        </div>
      </div>

      {/* Main Framework Board Layout view wrapper */}
      <div className="tmpl-dashboard-main-card">
        
        {/* Core Controls Action Filtering Workspace Panel Toolbar */}
        <div className="tmpl-dashboard-toolbar">
          <div className="tmpl-dashboard-search-block">
            <span className="tmpl-dashboard-search-lens-icon">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="tmpl-dashboard-toolbar-actions-cluster">
            {/* Contextual checkbox deletion processing visibility target */}
            {selectedRows.length > 0 && (
              <button className="tmpl-dashboard-action-bulk-delete" onClick={handleExecuteBulkDelete}>
                🗑️ Delete Selected ({selectedRows.length})
              </button>
            )}

            {/* Column Layout Filtering Selection Box menu trigger container */}
            <div className="tmpl-dashboard-popover-anchor">
              <button className="tmpl-dashboard-control-button" onClick={() => setShowColumnConfig(!showColumnConfig)} title="Display Settings">
                🎛️
              </button>
              {showColumnConfig && (
                <div className="tmpl-dashboard-popover-panel-menu">
                  <div className="tmpl-dashboard-popover-panel-header">Show/Hide Column</div>
                  <hr className="tmpl-dashboard-popover-panel-line-break" />
                  {Object.keys(visibleColumns).map((colName) => (
                    <label key={colName} className="tmpl-dashboard-popover-panel-row-item">
                      <input 
                        type="checkbox" checked={visibleColumns[colName]}
                        onChange={() => setVisibleColumns({ ...visibleColumns, [colName]: !visibleColumns[colName] })}
                      />
                      <span className="tmpl-dashboard-popover-item-label-text">
                        {colName.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Plus Icon Action Control Button to trigger creation model workflow overlay */}
            <button className="tmpl-dashboard-control-button tmpl-dashboard-btn-create" onClick={() => handleOpenFormModal(null)} title="Create Layout Template">➕</button>
            
            {/* System State Refresh Reset button */}
            <button className="tmpl-dashboard-control-button" onClick={() => { setSearchQuery(''); setSelectedRows([]); }} title="Reset Display Metrics">🔄</button>
            
            {/* Bulk download data processing layout trigger */}
            <button className="tmpl-dashboard-control-button tmpl-dashboard-btn-download-all" onClick={() => alert("Packaging workspace assets template portfolio...")} title="Download Template Master Repository Collection">📥</button>
          </div>
        </div>

        {/* Data Grid Matrix Responsive Container Layer Table */}
        <div className="tmpl-dashboard-table-viewport-scroller">
          <table className="tmpl-dashboard-data-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="42px">
                    <input 
                      type="checkbox" 
                      checked={activeRowIds.length > 0 && activeRowIds.every(id => selectedRows.includes(id))}
                      onChange={() => handleToggleSelectAll(activeRowIds)}
                    />
                  </th>
                )}
                {visibleColumns.templateName && <th>Template Name</th>}
                {visibleColumns.type && <th>Type</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.fileSize && <th>File Size</th>}
                {visibleColumns.fileType && <th>File Type</th>}
                {visibleColumns.download && <th className="tmpl-dashboard-column-centered">Download</th>}
                {visibleColumns.actions && <th className="tmpl-dashboard-column-centered">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {activeItemsSlice.length > 0 ? (
                activeItemsSlice.map((item) => (
                  <tr key={item.id} className={selectedRows.includes(item.id) ? 'tmpl-dashboard-row-selected-highlight' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleToggleRow(item.id)} />
                      </td>
                    )}
                    {visibleColumns.templateName && <td className="tmpl-dashboard-cell-text-bold">{item.name}</td>}
                    {visibleColumns.type && <td>{item.type}</td>}
                    {visibleColumns.department && <td>{item.department}</td>}
                    {visibleColumns.fileSize && <td>{item.size}</td>}
                    {visibleColumns.fileType && (
                      <td>
                        <span className={`tmpl-dashboard-file-badge-pill file-type-${item.fileType.toLowerCase()}`}>
                          {item.fileType}
                        </span>
                      </td>
                    )}
                    {visibleColumns.download && (
                      <td className="tmpl-dashboard-column-centered">
                        <button className="tmpl-dashboard-row-action-download-icon" onClick={() => handleDownloadAsset(item.name, item.fileType)}>📥</button>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="tmpl-dashboard-column-centered tmpl-dashboard-cell-row-actions-block">
                        <button className="tmpl-dashboard-row-action-edit-icon" onClick={() => handleOpenFormModal(item)}>📝</button>
                        <button className="tmpl-dashboard-row-action-delete-icon" onClick={() => handleTriggerDelete(item.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="tmpl-dashboard-empty-table-placeholder">No document layout data records match search criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Footer Workspace Controls - Fixed 10 pagination limits per layout */}
        <div className="tmpl-dashboard-pagination-footer-bar">
          <div className="tmpl-dashboard-items-per-page-selector-block">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="tmpl-dashboard-pagination-navigation-controls">
            <span className="tmpl-dashboard-pagination-counter-display">
              {totalItems === 0 ? 0 : indexOfFirstRow + 1} – {Math.min(indexOfLastRow, totalItems)} of {totalItems}
            </span>
            <div className="tmpl-dashboard-pagination-arrows-wrapper">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="tmpl-dashboard-pagination-arrow">‹</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="tmpl-dashboard-pagination-arrow">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Creation and Modification Dialog Overlay Window - Matches layout specs from image_dd12ea.png */}
      {isModalOpen && (
        <div className="tmpl-modal-overlay">
          <div className="tmpl-modal-container-box">
            <div className="tmpl-modal-header-banner">
              <h3 className="tmpl-modal-header-title-text">{editingItem ? 'Edit Template' : 'New Template'}</h3>
              <button className="tmpl-modal-header-close-button-cross" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveFormSubmission} className="tmpl-modal-form-scroller-body">
              
              {/* Top Drag and Drop file box context layout system from image_dd12ea.png */}
              <div className="tmpl-modal-drag-drop-zone-box">
                <span className="tmpl-modal-drag-drop-cloud-icon">☁️</span>
                <p className="tmpl-modal-drag-drop-text-prompt">Drag and drop file here or <span className="tmpl-modal-drag-drop-browse-highlight">click to browse</span></p>
              </div>

              <div className="tmpl-modal-form-input-row">
                <div className="tmpl-modal-form-input-group full-width-row">
                  <label>Template Name*</label>
                  <div className="tmpl-modal-input-icon-wrapper-frame">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Template Name" required />
                    <span className="tmpl-modal-input-embedded-icon">📋</span>
                  </div>
                </div>
              </div>

              <div className="tmpl-modal-form-input-row">
                <div className="tmpl-modal-form-input-group half-width-split">
                  <label>Type*</label>
                  <div className="tmpl-modal-input-icon-wrapper-frame">
                    <select name="type" value={formData.type} onChange={handleInputChange} className="tmpl-modal-form-select-tag">
                      <option value="HR">HR</option>
                      <option value="Legal">Legal</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>

                <div className="tmpl-modal-form-input-group half-width-split">
                  <label>Department*</label>
                  <div className="tmpl-modal-input-icon-wrapper-frame">
                    <select name="department" value={formData.department} onChange={handleInputChange} className="tmpl-modal-form-select-tag">
                      <option value="HR">HR</option>
                      <option value="Legal">Legal</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="tmpl-modal-form-input-row">
                <div className="tmpl-modal-form-input-group full-width-row">
                  <label>Tags</label>
                  <div className="tmpl-modal-input-icon-wrapper-frame">
                    <select name="tags" value={formData.tags} onChange={handleInputChange} className="tmpl-modal-form-select-tag">
                      <option value="">Select Tags</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Financial">Financial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="tmpl-modal-form-input-group full-width-row">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Description" className="tmpl-modal-form-textarea-tag" />
              </div>

              {/* Form Operation Triggers Action Layout Container */}
              <div className="tmpl-modal-form-action-buttons-strip">
                <button type="submit" className="tmpl-modal-action-btn-submit">Save</button>
                <button type="button" className="tmpl-modal-action-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTemplates;