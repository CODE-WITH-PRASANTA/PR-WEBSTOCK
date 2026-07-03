import React, { useState } from 'react';
import './ESignatures.css';

// Exact mock database records parsed from your image_dd7140.png dataset grid
const initialSignatureRequests = [
  { id: 1, document: 'Employment Contract', recipient: 'Alice Williams', department: 'HR', sentDate: '2025-01-10', size: '1.2 MB', type: 'PDF', status: 'Signed' },
  { id: 2, document: 'Policy Acknowledgment', recipient: 'Mark Thompson', department: 'Compliance', sentDate: '2025-01-12', size: '0.5 MB', type: 'PDF', status: 'Pending' },
  { id: 3, document: 'Bonus Agreement', recipient: 'Sarah Davis', department: 'Finance', sentDate: '2025-01-05', size: '0.8 MB', type: 'PDF', status: 'Declined' },
  { id: 4, document: 'NDA Update', recipient: 'James Wilson', department: 'Legal', sentDate: '2024-12-15', size: '1.1 MB', type: 'PDF', status: 'Expired' },
  { id: 5, document: 'Promotion Letter', recipient: 'Kevin Hart', department: 'HR', sentDate: '2025-02-01', size: '0.9 MB', type: 'PDF', status: 'Signed' },
  { id: 6, document: 'Equipment Lease', recipient: 'Jennifer Lopez', department: 'IT', sentDate: '2025-02-10', size: '0.6 MB', type: 'PDF', status: 'Pending' },
  { id: 7, document: 'Training Agreement', recipient: 'Will Smith', department: 'Operations', sentDate: '2025-01-20', size: '1.3 MB', type: 'PDF', status: 'Signed' },
  { id: 8, document: 'Salary Revision', recipient: 'Tom Cruise', department: 'Finance', sentDate: '2025-03-05', size: '0.4 MB', type: 'PDF', status: 'Pending' },
  { id: 9, document: 'Resignation Acceptance', recipient: 'Brad Pitt', department: 'HR', sentDate: '2025-02-25', size: '1.5 MB', type: 'PDF', status: 'Signed' },
  { id: 10, document: 'Loan Agreement', recipient: 'Angelina Jolie', department: 'Finance', sentDate: '2025-03-10', size: '2.2 MB', type: 'PDF', status: 'Declined' },
  { id: 11, document: 'Vendor Agreement Framework', recipient: 'Robert Downey', department: 'Legal', sentDate: '2025-03-12', size: '1.7 MB', type: 'PDF', status: 'Signed' }
];

const ESignatures = () => {
  // Centralized Application Datastore State
  const [requests, setRequests] = useState(initialSignatureRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Pagination State Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Layout View Dropdowns & Drawer Modals Toggles
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  // Form Fields State (Matched to image_dd7448.png Properties)
  const [formData, setFormData] = useState({
    document: '', recipient: '', department: 'HR', status: 'Pending', tags: '', description: ''
  });

  // Dynamic Visibility Settings Control Map (Derived from image_dd7408.png)
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    document: true,
    recipient: true,
    department: true,
    sentDate: true,
    size: true,
    type: true,
    download: true,
    status: true,
    actions: true
  });

  // Multiselect Row Handlers
  const handleSelectRowToggle = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllVisibleToggle = (visibleIds) => {
    const isAllCheckedOnPage = visibleIds.every(id => selectedRows.includes(id));
    if (isAllCheckedOnPage) {
      setSelectedRows(selectedRows.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedRows([...new Set([...selectedRows, ...visibleIds])]);
    }
  };

  // Searching Filter Computation Logic
  const filteredData = requests.filter(item => 
    item.document.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Window Slice Computations (Fixed to 10 Rows)
  const totalItemsCount = filteredData.length;
  const maxPageCount = Math.ceil(totalItemsCount / itemsPerPage);
  const lastIndexOnPage = currentPage * itemsPerPage;
  const firstIndexOnPage = lastIndexOnPage - itemsPerPage;
  const standardPageSlice = filteredData.slice(firstIndexOnPage, lastIndexOnPage);
  const pageSliceRowIds = standardPageSlice.map(item => item.id);

  // Asset Row Operational Action Logic
  const handleSingleRowDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this e-signature record?")) {
      setRequests(requests.filter(item => item.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleBulkSelectedDelete = () => {
    if (window.confirm(`Are you sure you want to remove all ${selectedRows.length} selected signature records?`)) {
      setRequests(requests.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
      setCurrentPage(1);
    }
  };

  const handleTriggerFileDownload = (documentTitle, fileFormat) => {
    alert(`Initiating verified payload download for: ${documentTitle}.${fileFormat.toLowerCase()}`);
  };

  // Modal Lifecycle Interceptors
  const handleOpenFormDialogue = (targetItem = null) => {
    if (targetItem) {
      setEditingRequest(targetItem);
      setFormData({
        document: targetItem.document, recipient: targetItem.recipient, department: targetItem.department,
        status: targetItem.status, tags: targetItem.tags || '', description: targetItem.description || ''
      });
    } else {
      setEditingRequest(null);
      setFormData({ document: '', recipient: '', department: 'HR', status: 'Pending', tags: '', description: '' });
    }
    setIsFormModalOpen(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFormSubmission = (e) => {
    e.preventDefault();
    if (editingRequest) {
      setRequests(requests.map(r => r.id === editingRequest.id ? { ...r, ...formData } : r));
    } else {
      const freshNewRecord = {
        id: Date.now(),
        ...formData,
        sentDate: new Date().toISOString().split('T')[0],
        size: '1.1 MB', 
        type: 'PDF'
      };
      setRequests([freshNewRecord, ...requests]);
    }
    setIsFormModalOpen(false);
  };

  return (
    <div className="esig-view-container">
      {/* Route Breadcrumb Information Path Header Bar Section */}
      <div className="esig-path-navigation-header">
        <h2 className="esig-workspace-main-title">E-Signatures</h2>
        <div className="esig-breadcrumbs-trail">
          <span>🏠</span> <span className="esig-trail-divider">›</span>
          <span>Documents</span> <span className="esig-trail-divider">›</span>
          <span className="esig-trail-active-node">E-Signatures</span>
        </div>
      </div>

      {/* Main Container Card Framework Layer */}
      <div className="esig-workspace-board-card">
        
        {/* Upper Functional Configuration Action Filter Toolbar */}
        <div className="esig-action-filter-toolbar">
          <div className="esig-search-input-field-frame">
            <span className="esig-search-lens-vector">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="esig-toolbar-actions-cluster-strip">
            {/* Contextual Bulk Action Deletion Module Button */}
            {selectedRows.length > 0 && (
              <button className="esig-action-bulk-delete-trigger" onClick={handleBulkSelectedDelete}>
                🗑️ Delete Selected ({selectedRows.length})
              </button>
            )}

            {/* Layout Column Visibility Setup Dropdown Anchor Element */}
            <div className="esig-popover-menu-wrapper-context">
              <button className="esig-functional-control-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Toggle Columns Screen View">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="esig-popover-panel-dropdown-box">
                  <div className="esig-popover-panel-heading-title">Show/Hide Column</div>
                  <hr className="esig-popover-panel-horizontal-break-line" />
                  {Object.keys(visibleColumns).map((colKey) => (
                    <label key={colKey} className="esig-popover-checkbox-row-item">
                      <input 
                        type="checkbox" checked={visibleColumns[colKey]}
                        onChange={() => setVisibleColumns({ ...visibleColumns, [colKey]: !visibleColumns[colKey] })}
                      />
                      <span className="esig-popover-checkbox-label-text">
                        {colKey.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Add Record Trigger Action Command Button */}
            <button className="esig-functional-control-btn esig-btn-trigger-creation-modal" onClick={() => handleOpenFormDialogue(null)} title="Create New Signature Registry Request">➕</button>
            
            {/* Local State Refresh Controller Anchor */}
            <button className="esig-functional-control-btn" onClick={() => { setSearchQuery(''); setSelectedRows([]); }} title="Refresh Component Repositories">🔄</button>
            
            {/* System Batch Export Payload Button */}
            <button className="esig-functional-control-btn esig-btn-trigger-bulk-download" onClick={() => alert("Packaging verification files data repository packages...")} title="Download Encrypted Workspace Package Collection">📥</button>
          </div>
        </div>

        {/* Data Matrix Responsive View Grid Scroll Window */}
        <div className="esig-table-viewport-scroller-frame">
          <table className="esig-data-grid-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="42px">
                    <input 
                      type="checkbox" 
                      checked={pageSliceRowIds.length > 0 && pageSliceRowIds.every(id => selectedRows.includes(id))}
                      onChange={() => handleSelectAllVisibleToggle(pageSliceRowIds)}
                    />
                  </th>
                )}
                {visibleColumns.document && <th>Document</th>}
                {visibleColumns.recipient && <th>Recipient</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.sentDate && <th>Sent Date</th>}
                {visibleColumns.size && <th>Size</th>}
                {visibleColumns.type && <th>Type</th>}
                {visibleColumns.download && <th className="esig-column-centered-align">Download</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.actions && <th className="esig-column-centered-align">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {standardPageSlice.length > 0 ? (
                standardPageSlice.map((item) => (
                  <tr key={item.id} className={selectedRows.includes(item.id) ? 'esig-row-selected-highlight-state' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleSelectRowToggle(item.id)} />
                      </td>
                    )}
                    {visibleColumns.document && <td className="esig-cell-text-prominent-bold">{item.document}</td>}
                    {visibleColumns.recipient && <td>{item.recipient}</td>}
                    {visibleColumns.department && <td>{item.department}</td>}
                    {visibleColumns.sentDate && <td>{item.sentDate}</td>}
                    {visibleColumns.size && <td>{item.size}</td>}
                    {visibleColumns.type && <td>{item.type}</td>}
                    {visibleColumns.download && (
                      <td className="esig-column-centered-align">
                        <button className="esig-row-action-download-vector-btn" onClick={() => handleTriggerFileDownload(item.document, item.type)}>📥</button>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td>
                        <span className={`esig-status-badge-capsule-pill esig-badge-status-${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="esig-column-centered-align esig-row-actions-cell-block-cluster">
                        <button className="esig-row-action-btn-edit" onClick={() => handleOpenFormDialogue(item)}>📝</button>
                        <button className="esig-row-action-btn-delete" onClick={() => handleSingleRowDelete(item.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="esig-empty-grid-placeholder-cell">No matching e-signature configuration tracks found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Control Strip Footer Block Component */}
        <div className="esig-pagination-footer-panel">
          <div className="esig-items-per-page-dropdown-container">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="esig-pagination-navigation-actions-cluster">
            <span className="esig-pagination-numerical-counter">
              {totalItemsCount === 0 ? 0 : firstIndexOnPage + 1} – {Math.min(lastIndexOnPage, totalItemsCount)} of {totalItemsCount}
            </span>
            <div className="esig-pagination-vector-arrows-box">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="esig-pagination-arrow-button-control">‹</button>
              <button disabled={currentPage === maxPageCount || maxPageCount === 0} onClick={() => setCurrentPage(p => p + 1)} className="esig-pagination-arrow-button-control">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Dialog Overlay Modal Window Panel - (Matches design metrics from image_dd7448.png) */}
      {isFormModalOpen && (
        <div className="esig-modal-fixed-overlay-backdrop">
          <div className="esig-modal-container-window-box">
            <div className="esig-modal-header-banner-strip">
              <h3 className="esig-modal-header-headline-text">{editingRequest ? 'Edit E-Signature Request' : 'New E-Signature Request'}</h3>
              <button className="esig-modal-header-close-dismissal-cross-btn" onClick={() => setIsFormModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveFormSubmission} className="esig-modal-form-scrollable-body-wrapper">
              
              <div className="esig-modal-form-input-layout-row">
                <div className="esig-modal-form-input-element-group esig-field-width-full">
                  <label>Document Name*</label>
                  <div className="esig-modal-input-field-relative-icon-wrapper">
                    <input type="text" name="document" value={formData.document} onChange={handleFormInputChange} placeholder="Document Name" required />
                    <span className="esig-modal-input-embedded-right-side-icon">📄</span>
                  </div>
                </div>
              </div>

              <div className="esig-modal-form-input-layout-row">
                <div className="esig-modal-form-input-element-group esig-field-width-full">
                  <label>Recipient*</label>
                  <div className="esig-modal-input-field-relative-icon-wrapper">
                    <input type="text" name="recipient" value={formData.recipient} onChange={handleFormInputChange} placeholder="Recipient email or identity handle" required />
                    <span className="esig-modal-input-embedded-right-side-icon">👤</span>
                  </div>
                </div>
              </div>

              <div className="esig-modal-form-input-layout-row">
                <div className="esig-modal-form-input-element-group esig-field-width-half">
                  <label>Department*</label>
                  <div className="esig-modal-input-field-relative-icon-wrapper">
                    <select name="department" value={formData.department} onChange={handleFormInputChange} className="esig-modal-select-field-native-tag">
                      <option value="HR">HR</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Finance">Finance</option>
                      <option value="Legal">Legal</option>
                      <option value="IT">IT</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div className="esig-modal-form-input-element-group esig-field-width-half">
                  <label>Status*</label>
                  <div className="esig-modal-input-field-relative-icon-wrapper">
                    <select name="status" value={formData.status} onChange={handleFormInputChange} className="esig-modal-select-field-native-tag">
                      <option value="Pending">Pending</option>
                      <option value="Signed">Signed</option>
                      <option value="Declined">Declined</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="esig-modal-form-input-layout-row">
                <div className="esig-modal-form-input-element-group esig-field-width-full">
                  <label>Tags</label>
                  <div className="esig-modal-input-field-relative-icon-wrapper">
                    <select name="tags" value={formData.tags} onChange={handleFormInputChange} className="esig-modal-select-field-native-tag">
                      <option value="">Select Tags</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Executive review">Executive review</option>
                    </select>
                    <span className="esig-modal-input-embedded-right-side-icon">🏷️</span>
                  </div>
                </div>
              </div>

              <div className="esig-modal-form-input-element-group esig-field-width-full">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleFormInputChange} rows="3" placeholder="Provide signature execution description data details..." className="esig-modal-textarea-field-native-tag" />
              </div>

              {/* Verified Drag Drop Upload Component Area System View */}
              <div className="esig-modal-drag-drop-zone-canvas">
                <span className="esig-modal-drag-drop-cloud-vector-icon">☁️</span>
                <p className="esig-modal-drag-drop-text-instructions">Drag & Drop file here or <span className="esig-modal-drag-drop-browse-action-link">Browse</span></p>
              </div>

              {/* Form Operation Action Control Triggers Section Footer Strip */}
              <div className="esig-modal-form-action-buttons-strip-container">
                <button type="submit" className="esig-modal-submit-execution-btn">Save</button>
                <button type="button" className="esig-modal-cancel-dismissal-btn" onClick={() => setIsFormModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ESignatures;