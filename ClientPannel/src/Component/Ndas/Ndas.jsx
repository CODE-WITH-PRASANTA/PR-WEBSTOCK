import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Plus, RotateCw, Download, ChevronLeft, 
  ChevronRight, Calendar, Edit2, Trash2, ChevronDown, X, Upload, FileText, List
} from 'lucide-react';
import './Ndas.css';

// Initial Mock NDA Registry List state setup matching image datasets
const baselineMockRegistry = [
  { id: 'NDA-001', title: 'Mutual Non-Disclosure Agreement', signedDate: '2024-01-15', expiryDate: '2026-01-15', status: 'Active' },
  { id: 'NDA-002', title: 'Unilateral NDA - Project Genesis', signedDate: '2023-11-20', expiryDate: '2025-11-20', status: 'Active' },
  { id: 'NDA-003', title: 'Employee NDA Statement', signedDate: '2022-06-01', expiryDate: '2024-06-01', status: 'Expired' },
  { id: 'NDA-004', title: 'Vendor NDA - Cloud Services Integration', signedDate: '', expiryDate: '2026-12-31', status: 'Pending Signature' },
  { id: 'NDA-005', title: 'Strategic Partner Master Agreement', signedDate: '2025-04-10', expiryDate: '2027-04-10', status: 'Active' }
];

/* ============================================================================
   SUB-COMPONENT: SCROLLABLE POPUP FORM MODAL (Third Image UI Layout)
   ============================================================================ */
const NDAsFormModal = ({ isOpen, onClose, onSave, targetEditRecord }) => {
  const [fields, setFields] = useState({
    title: '', status: 'Pending Signature', signedDate: '', expiryDate: '', fileSize: '', fileType: ''
  });

  useEffect(() => {
    if (targetEditRecord) {
      setFields(targetEditRecord);
    } else {
      setFields({ title: '', status: 'Pending Signature', signedDate: '', expiryDate: '', fileSize: '', fileType: '' });
    }
  }, [targetEditRecord, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onSave(fields);
    onClose();
  };

  return (
    <div className="ndas-modal-overlay-container">
      <div className="ndas-modal-window-frame">
        {/* Header Block Section */}
        <div className="ndas-modal-top-header">
          <h2 className="ndas-modal-header-text">{targetEditRecord ? 'Edit NDA Details' : 'New NDA'}</h2>
          <button type="button" onClick={onClose} className="ndas-modal-close-header-btn">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body Container */}
        <form onSubmit={handleFormSubmission} className="ndas-modal-scrollable-form">
          <div className="ndas-form-input-wrapper">
            <label className="ndas-form-input-label">NDA Title*</label>
            <div className="ndas-form-input-relative-housing">
              <input 
                type="text" required placeholder="NDA Title*" value={fields.title}
                onChange={(e) => setFields({...fields, title: e.target.value})}
                className="ndas-form-input-element has-right-icon"
              />
              <FileText size={16} className="ndas-form-input-embedded-icon" />
            </div>
          </div>

          <div className="ndas-form-input-wrapper">
            <label className="ndas-form-input-label">Status*</label>
            <select 
              value={fields.status} 
              onChange={(e) => setFields({...fields, status: e.target.value})}
              className="ndas-form-select-element"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Pending Signature">Pending Signature</option>
            </select>
          </div>

          <div className="ndas-form-input-grid-split">
            <div className="ndas-form-input-wrapper">
              <label className="ndas-form-input-label">Signed Date</label>
              <input 
                type="date" value={fields.signedDate}
                onChange={(e) => setFields({...fields, signedDate: e.target.value})}
                className="ndas-form-input-element"
              />
            </div>
            <div className="ndas-form-input-wrapper">
              <label className="ndas-form-input-label">Expiry Date</label>
              <input 
                type="date" value={fields.expiryDate}
                onChange={(e) => setFields({...fields, expiryDate: e.target.value})}
                className="ndas-form-input-element"
              />
            </div>
          </div>

          {/* Drag & Drop Upload Space */}
          <div className="ndas-file-drag-upload-panel" onClick={() => alert('File system browser invoked')}>
            <Upload size={32} color="#5873e8" />
            <p className="ndas-upload-info-message">
              Drag & Drop file here or <span className="ndas-upload-browse-action-link">Browse</span>
            </p>
          </div>

          <div className="ndas-form-input-grid-split">
            <div className="ndas-form-input-relative-housing">
              <input 
                type="text" placeholder="File Size" value={fields.fileSize || ''}
                onChange={(e) => setFields({...fields, fileSize: e.target.value})}
                className="ndas-form-input-element has-right-icon"
              />
              <List size={16} className="ndas-form-input-embedded-icon" />
            </div>
            <div className="ndas-form-input-relative-housing">
              <input 
                type="text" placeholder="File Type" value={fields.fileType || ''}
                onChange={(e) => setFields({...fields, fileType: e.target.value})}
                className="ndas-form-input-element has-right-icon"
              />
              <FileText size={16} className="ndas-form-input-embedded-icon" />
            </div>
          </div>

          {/* Modal Buttons Row */}
          <div className="ndas-modal-action-footer-row">
            <button type="submit" className="ndas-form-control-btn confirm-save">Save</button>
            <button type="button" onClick={onClose} className="ndas-form-control-btn dismiss-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ============================================================================
   MAIN RUNTIME OBJECT: NDAS INTERACTIVE DATA MANAGER
   ============================================================================ */
const Ndas = () => {
  const [dataCollection, setDataCollection] = useState(baselineMockRegistry);
  const [searchText, setSearchText] = useState('');
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  
  // Pagination Tracking Logic Matrix (Hardcapped 5 Items Per Page Target layout)
  const [pageIndex, setPageIndex] = useState(1);
  const [recordsCountPerPage, setRecordsCountPerPage] = useState(5);

  // Column Visibility Controls Layer
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const [columnsDisplayState, setColumnsDisplayState] = useState({
    checkbox: true, ndaId: true, title: true, signedDate: true, expiryDate: true, status: true, download: true, actions: true
  });

  // Global Popup Toggle Hooks
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeMutationTarget, setActiveMutationTarget] = useState(null);

  const columnDropdownRef = useRef(null);

  // Outside click intercept hooks
  useEffect(() => {
    const handleOutsideClickIntercept = (e) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target)) {
        setColumnDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClickIntercept);
    return () => document.removeEventListener('mousedown', handleOutsideClickIntercept);
  }, []);

  // Text Filtering Logic
  const filteredOutputArray = dataCollection.filter(record => 
    record.title.toLowerCase().includes(searchText.toLowerCase()) ||
    record.id.toLowerCase().includes(searchText.toLowerCase())
  );

  // Dynamic Pagination Splice Parameters
  const grossRecordsTotal = filteredOutputArray.length;
  const maximalPageBound = Math.ceil(grossRecordsTotal / recordsCountPerPage);
  const traceEndOffset = pageIndex * recordsCountPerPage;
  const traceStartOffset = traceEndOffset - recordsCountPerPage;
  const paginatedDisplayChunk = filteredOutputArray.slice(traceStartOffset, traceEndOffset);

  // Batch Checkbox Row Toggle Matrix Handlers
  const toggleSelectAllItemsOnCurrentPage = (e) => {
    if (e.target.checked) {
      setSelectedItemIds(paginatedDisplayChunk.map(row => row.id));
    } else {
      setSelectedItemIds([]);
    }
  };

  const toggleIndividualItemSelection = (id) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter(itemId => itemId !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  // Operational System Triggers
  const resetDataToDefaultRegistry = () => {
    setDataCollection(baselineMockRegistry);
    setSelectedItemIds([]);
    setSearchText('');
    setPageIndex(1);
  };

  const processBulkDeletion = () => {
    setDataCollection(dataCollection.filter(item => !selectedItemIds.includes(item.id)));
    setSelectedItemIds([]);
    setPageIndex(1);
  };

  const processRowDeletion = (id) => {
    setDataCollection(dataCollection.filter(item => item.id !== id));
    setSelectedItemIds(selectedItemIds.filter(selectedId => selectedId !== id));
  };

  const beginRowMutationEditFlow = (record) => {
    setActiveMutationTarget(record);
    setIsModalActive(true);
  };

  const persistFormMutationChanges = (formFields) => {
    if (activeMutationTarget) {
      setDataCollection(dataCollection.map(record => record.id === activeMutationTarget.id ? { ...record, ...formFields } : record));
    } else {
      const computedId = `NDA-00${dataCollection.length + 1}`;
      setDataCollection([...dataCollection, { id: computedId, ...formFields }]);
    }
    setActiveMutationTarget(null);
  };

  const triggerDocumentBlobDownload = (record) => {
    const rawCSVFormatPayload = `NDA ID,Title,Signed Date,Expiry Date,Status\n${record.id},${record.title},${record.signedDate},${record.expiryDate},${record.status}`;
    const outputBlob = new Blob([rawCSVFormatPayload], { type: 'text/csv' });
    const dynamicURLString = URL.createObjectURL(outputBlob);
    const virtualAnchor = document.createElement('a');
    virtualAnchor.href = dynamicURLString;
    virtualAnchor.download = `Document_${record.id}.csv`;
    virtualAnchor.click();
  };

  const reverseColumnDisplayVisibility = (key) => {
    setColumnsDisplayState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const normalizeDateFormatting = (dateValue) => {
    if (!dateValue) return '';
    const [year, month, day] = dateValue.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="ndas-dashboard-container">
      {/* Top Application Breadcrumbs Track */}
      <div className="ndas-header-section">
        <h1 className="ndas-main-title">NDAs</h1>
        <div className="ndas-breadcrumb-trail">
          <span className="ndas-breadcrumb-link">🏠</span>
          <span>&gt;</span>
          <span className="ndas-breadcrumb-link">Documents</span>
          <span>&gt;</span>
          <span className="ndas-breadcrumb-link active">NDAs</span>
        </div>
      </div>

      {/* Auto-Triggered Checkbox Select Bulk Delete Alert Banner */}
      {selectedItemIds.length > 0 && (
        <div className="ndas-bulk-alert-banner">
          <span>{selectedItemIds.length} file targets chosen for simultaneous configuration adjustments.</span>
          <button type="button" onClick={processBulkDeletion} className="ndas-bulk-delete-btn">
            <Trash2 size={14} />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* Primary Data Card Frame holding Toolbar and Layout Viewports */}
      <div className="ndas-table-card">
        {/* Dynamic Navigation Toolbar Interface */}
        <div className="ndas-table-toolbar">
          <div className="ndas-toolbar-left-panel">
            <h3 className="ndas-toolbar-heading">NDAs List</h3>
            <div className="ndas-search-input-box">
              <input 
                type="text" placeholder="Search" value={searchText}
                onChange={(e) => setSearchText(e.target.value)} className="ndas-search-field"
              />
              <Search size={14} className="ndas-search-field-icon" />
            </div>
          </div>

          <div className="ndas-toolbar-right-panel">
            {/* Show/Hide Target Column Dropdown Section */}
            <div className="ndas-column-dropdown-anchor" ref={columnDropdownRef}>
              <button type="button" onClick={() => setColumnDropdownOpen(!columnDropdownOpen)} className="ndas-icon-action-button col-visibility">
                <SlidersHorizontal size={16} />
              </button>
              
              {columnDropdownOpen && (
                <div className="ndas-column-selection-menu">
                  <p className="ndas-column-dropdown-heading">Show/Hide Column</p>
                  <div className="ndas-column-checkbox-list">
                    {Object.keys(columnsDisplayState).map((colKey) => (
                      <label key={colKey} className="ndas-column-label-row">
                        <input 
                          type="checkbox" checked={columnsDisplayState[colKey]} 
                          onChange={() => reverseColumnDisplayVisibility(colKey)} className="ndas-column-checkbox-input"
                        />
                        <span className="capitalize">{colKey.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Global Context Control Buttons */}
            <button type="button" onClick={() => { setActiveMutationTarget(null); setIsModalActive(true); }} className="ndas-icon-action-button create-trigger">
              <Plus size={18} />
            </button>
            <button type="button" onClick={resetDataToDefaultRegistry} className="ndas-icon-action-button refresh-trigger">
              <RotateCw size={16} />
            </button>
            <button type="button" onClick={() => alert('Full dataset processing pipeline completed successfully')} className="ndas-icon-action-button download-trigger">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Responsive Table Structure Workspace */}
        <div className="ndas-responsive-table-view">
          <table className="ndas-core-data-table">
            <thead>
              <tr>
                {columnsDisplayState.checkbox && (
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" onChange={toggleSelectAllItemsOnCurrentPage}
                      checked={paginatedDisplayChunk.length > 0 && selectedItemIds.length === paginatedDisplayChunk.length}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                )}
                {columnsDisplayState.ndaId && <th>NDA ID</th>}
                {columnsDisplayState.title && <th>Title</th>}
                {columnsDisplayState.signedDate && <th>Signed Date</th>}
                {columnsDisplayState.expiryDate && <th>Expiry Date</th>}
                {columnsDisplayState.status && <th>Status</th>}
                {columnsDisplayState.download && <th style={{ textAlign: 'center' }}>Download</th>}
                {columnsDisplayState.actions && <th style={{ textAlign: 'right', minWidth: '100px' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedDisplayChunk.length > 0 ? (
                paginatedDisplayChunk.map((row) => (
                  <tr key={row.id} className={`ndas-row-element ${selectedItemIds.includes(row.id) ? 'active-selected' : ''}`}>
                    {columnsDisplayState.checkbox && (
                      <td>
                        <input 
                          type="checkbox" checked={selectedItemIds.includes(row.id)}
                          onChange={() => toggleIndividualItemSelection(row.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                    )}
                    {columnsDisplayState.ndaId && <td className="ndas-id-bold-field">{row.id}</td>}
                    {columnsDisplayState.title && <td><div className="ndas-title-truncated-text" title={row.title}>{row.title}</div></td>}
                    {columnsDisplayState.signedDate && (
                      <td>
                        <div className="ndas-calendar-cell-alignment">
                          <Calendar size={14} color="#94a3b8" />
                          <span>{normalizeDateFormatting(row.signedDate) || '—'}</span>
                        </div>
                      </td>
                    )}
                    {columnsDisplayState.expiryDate && (
                      <td>
                        <div className="ndas-calendar-cell-alignment">
                          <Calendar size={14} color="#94a3b8" />
                          <span>{normalizeDateFormatting(row.expiryDate) || '—'}</span>
                        </div>
                      </td>
                    )}
                    {columnsDisplayState.status && (
                      <td>
                        <span className={`ndas-status-badge-pill ${row.status.toLowerCase().replace(" ", "-")}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {columnsDisplayState.download && (
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" onClick={() => triggerDocumentBlobDownload(row)} className="ndas-row-action-icon-button download-icon">
                          <Download size={15} />
                        </button>
                      </td>
                    )}
                    {columnsDisplayState.actions && (
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end', width: '100%' }}>
                          {/* Exposed Inline Action Buttons */}
                          <button 
                            type="button" 
                            title="Edit Document"
                            onClick={() => beginRowMutationEditFlow(row)} 
                            className="ndas-row-action-icon-button edit-icon"
                            style={{ padding: '4px', cursor: 'pointer' }}
                          >
                            <Edit2 size={15} />
                          </button>
                          
                          <button 
                            type="button" 
                            title="Remove Row"
                            onClick={() => processRowDeletion(row.id)} 
                            className="ndas-row-action-icon-button delete-icon"
                            style={{ padding: '4px', cursor: 'pointer', color: '#ef4444' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="ndas-table-empty-fallback">No records matching specified inputs located.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Action Footer Controls Layout (Strict 5 items configuration) */}
        <div className="ndas-pagination-footer-bar">
          <div className="ndas-pagination-items-per-page">
            <span>Items per page:</span>
            <div className="ndas-page-dropdown-container">
              <select 
                value={recordsCountPerPage} 
                onChange={(e) => { setRecordsCountPerPage(Number(e.target.value)); setPageIndex(1); }}
                className="ndas-page-size-selector"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown size={12} className="ndas-page-selector-chevron" />
            </div>
          </div>

          <div className="ndas-pagination-controls-block">
            <span>
              {grossRecordsTotal === 0 ? 0 : traceStartOffset + 1} – {Math.min(traceEndOffset, grossRecordsTotal)} of {grossRecordsTotal}
            </span>
            <div className="ndas-pagination-navigation-arrows">
              <button 
                type="button" disabled={pageIndex === 1} onClick={() => setPageIndex(prev => prev - 1)} 
                className="ndas-pagination-arrow-btn"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" disabled={pageIndex === maximalPageBound || maximalPageBound === 0} 
                onClick={() => setPageIndex(prev => prev + 1)} className="ndas-pagination-arrow-btn"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth internal scrolling pop-up input form instance layout */}
      <NDAsFormModal 
        isOpen={isModalActive} onClose={() => { setIsModalActive(false); setActiveMutationTarget(null); }}
        onSave={persistFormMutationChanges} targetEditRecord={activeMutationTarget}
      />
    </div>
  );
};

export default Ndas;