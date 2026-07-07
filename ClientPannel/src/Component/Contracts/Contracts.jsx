import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Plus, RotateCw, Download, 
  ChevronLeft, ChevronRight, Calendar, Edit2, Trash2, ChevronDown, X, Upload, FileText, List
} from 'lucide-react';
import './Contracts.css';

// Initial dataset mock configuration
const staticMockArray = [
  { id: 'NDA-001', title: 'Mutual Non-Disclosure Agreement', signedDate: '2024-01-15', expiryDate: '2026-01-15', status: 'Active' },
  { id: 'NDA-002', title: 'Unilateral NDA - Project Genesis', signedDate: '2023-11-20', expiryDate: '2025-11-20', status: 'Active' },
  { id: 'NDA-003', title: 'Employee NDA', signedDate: '2022-06-01', expiryDate: '2024-06-01', status: 'Expired' },
  { id: 'NDA-004', title: 'Vendor NDA - Cloud Services', signedDate: '', expiryDate: '2026-12-31', status: 'Pending Signature' },
  { id: 'NDA-005', title: 'Partner Agreement Expansion', signedDate: '2025-03-12', expiryDate: '2027-03-12', status: 'Active' },
  { id: 'NDA-006', title: 'Contractor IP Clauses', signedDate: '2023-05-19', expiryDate: '2025-05-19', status: 'Expired' }
];

/* ----------------------------------------------------
   SUB-COMPONENT: POPUP MODAL COMPONENT (Form Panel)
   ---------------------------------------------------- */
const NDAModalForm = ({ isOpen, onClose, onSave, editTargetData }) => {
  const [formFields, setFormFields] = useState({
    title: '', status: 'Pending Signature', signedDate: '', expiryDate: '', fileSize: '', fileType: ''
  });

  useEffect(() => {
    if (editTargetData) {
      setFormFields(editTargetData);
    } else {
      setFormFields({ title: '', status: 'Pending Signature', signedDate: '', expiryDate: '', fileSize: '', fileType: '' });
    }
  }, [editTargetData, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onSave(formFields);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-header">
          <h2>{editTargetData ? 'Edit NDA' : 'New NDA'}</h2>
          <button onClick={onClose} className="modal-close-icon"><X size={18} /></button>
        </div>

        <form onSubmit={handleFormSubmission} className="modal-form-body">
          <div className="form-group">
            <label className="form-label">NDA Title*</label>
            <div className="input-icon-container">
              <input 
                type="text" required placeholder="NDA Title*" value={formFields.title}
                onChange={(e) => setFormFields({...formFields, title: e.target.value})}
                className="form-input-field has-icon"
              />
              <FileText size={16} className="field-internal-icon" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status*</label>
            <select 
              value={formFields.status} 
              onChange={(e) => setFormFields({...formFields, status: e.target.value})}
              className="form-select-field"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Pending Signature">Pending Signature</option>
            </select>
          </div>

          <div className="form-grid-row">
            <div className="form-group">
              <label className="form-label">Signed Date</label>
              <input 
                type="date" value={formFields.signedDate}
                onChange={(e) => setFormFields({...formFields, signedDate: e.target.value})}
                className="form-input-field"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input 
                type="date" value={formFields.expiryDate}
                onChange={(e) => setFormFields({...formFields, expiryDate: e.target.value})}
                className="form-input-field"
              />
            </div>
          </div>

          <div className="drag-drop-zone">
            <Upload size={28} color="#64748b" />
            <p className="drag-drop-text">Drag & Drop file here or <span className="browse-link">Browse</span></p>
          </div>

          <div className="form-grid-row">
            <div className="input-icon-container">
              <input 
                type="text" placeholder="File Size" value={formFields.fileSize || ''}
                onChange={(e) => setFormFields({...formFields, fileSize: e.target.value})}
                className="form-input-field has-icon"
              />
              <List size={16} className="field-internal-icon" />
            </div>
            <div className="input-icon-container">
              <input 
                type="text" placeholder="File Type" value={formFields.fileType || ''}
                onChange={(e) => setFormFields({...formFields, fileType: e.target.value})}
                className="form-input-field has-icon"
              />
              <FileText size={16} className="field-internal-icon" />
            </div>
          </div>

          <div className="modal-footer-actions">
            <button type="submit" className="form-action-btn submit-save">Save</button>
            <button type="button" onClick={onClose} className="form-action-btn cancel-form">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   MAIN RUNTIME CORE COMPONENT: CONTRACTS VIEWPORT
   ---------------------------------------------------- */
const Contracts = () => {
  const [dataRegistry, setDataRegistry] = useState(staticMockArray);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedRowIds, setCheckedRowIds] = useState([]);
  
  // Pagination parameters
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Column Dropdown Toggle States
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [activeColumns, setActiveColumns] = useState({
    checkbox: true, ndaId: true, title: true, signedDate: true, expiryDate: true, status: true, download: true, actions: true
  });

  // Modal creation config variables
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  const trackingMenuRef = useRef(null);

  useEffect(() => {
    const catchOutsideClicks = (e) => {
      if (trackingMenuRef.current && !trackingMenuRef.current.contains(e.target)) {
        setIsColumnMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', catchOutsideClicks);
    return () => document.removeEventListener('mousedown', catchOutsideClicks);
  }, []);

  // Filter computations
  const computationalFilteredData = dataRegistry.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination bounds tracking
  const totalRecordsCount = computationalFilteredData.length;
  const maximalPageCount = Math.ceil(totalRecordsCount / rowsPerPage);
  const endingIndex = activePage * rowsPerPage;
  const startingIndex = endingIndex - rowsPerPage;
  const observablePaginatedSlice = computationalFilteredData.slice(startingIndex, endingIndex);

  // Checked row tracking configurations
  const triggerMasterSelection = (e) => {
    if (e.target.checked) {
      setCheckedRowIds(observablePaginatedSlice.map(item => item.id));
    } else {
      setCheckedRowIds([]);
    }
  };

  const triggerRowSelection = (id) => {
    if (checkedRowIds.includes(id)) {
      setCheckedRowIds(checkedRowIds.filter(item => item !== id));
    } else {
      setCheckedRowIds([...checkedRowIds, id]);
    }
  };

  // Operational event logic layers
  const refreshMainData = () => {
    setDataRegistry(staticMockArray);
    setCheckedRowIds([]);
    setSearchTerm('');
    setActivePage(1);
  };

  const executeBulkDelete = () => {
    setDataRegistry(dataRegistry.filter(item => !checkedRowIds.includes(item.id)));
    setCheckedRowIds([]);
    setActivePage(1);
  };

  const executeIndividualRowDelete = (id) => {
    setDataRegistry(dataRegistry.filter(item => item.id !== id));
    setCheckedRowIds(checkedRowIds.filter(checkedId => checkedId !== id));
  };

  const initRowEditFlow = (item) => {
    setSelectedEditItem(item);
    setModalOpen(true);
  };

  const persistFormRecordChanges = (fields) => {
    if (selectedEditItem) {
      setDataRegistry(dataRegistry.map(item => item.id === selectedEditItem.id ? { ...item, ...fields } : item));
    } else {
      const generatedId = `NDA-00${dataRegistry.length + 1}`;
      setDataRegistry([...dataRegistry, { id: generatedId, ...fields }]);
    }
    setSelectedEditItem(null);
  };

  const processRowDownload = (item) => {
    const fileOutputString = `NDA ID,Title,Signed Date,Expiry Date,Status\n${item.id},${item.title},${item.signedDate},${item.expiryDate},${item.status}`;
    const fileBlob = new Blob([fileOutputString], { type: 'text/csv' });
    const virtualURL = URL.createObjectURL(fileBlob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = virtualURL;
    downloadAnchor.download = `${item.id}_export.csv`;
    downloadAnchor.click();
  };

  const switchColumnVisibility = (key) => {
    setActiveColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const convertStandardDates = (rawDate) => {
    if (!rawDate) return '';
    const [year, month, day] = rawDate.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="nda-container">
      {/* Top Breadcrumb Navigation */}
      <div className="nda-header-trail">
        <h1 className="nda-title">NDAs</h1>
        <div className="nda-breadcrumb">
          <span className="nda-breadcrumb-item">🏠</span>
          <span>&gt;</span>
          <span className="nda-breadcrumb-item">Documents</span>
          <span>&gt;</span>
          <span className="nda-breadcrumb-item active">NDAs</span>
        </div>
      </div>

      {/* Auto-appearing checkbox bulk delete banner */}
      {checkedRowIds.length > 0 && (
        <div className="bulk-delete-banner">
          <span>{checkedRowIds.length} rows selected. Ready to process modifications.</span>
          <button onClick={executeBulkDelete} className="bulk-delete-btn">
            <Trash2 size={13} />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* Data Card Table Viewport Container */}
      <div className="table-card">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <span className="toolbar-title">NDAs List</span>
            <div className="search-wrapper">
              <input 
                type="text" placeholder="Search" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="search-input"
              />
              <Search size={14} className="search-icon" />
            </div>
          </div>

          <div className="toolbar-right">
            {/* Show/Hide Target Column Dropdown UI Trigger */}
            <div className="dropdown-wrapper" ref={trackingMenuRef}>
              <button onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)} className="action-icon-btn filter-btn">
                <SlidersHorizontal size={14} />
              </button>
              
              {isColumnMenuOpen && (
                <div className="column-dropdown-menu">
                  <p className="dropdown-title">Show/Hide Column</p>
                  <div className="dropdown-list">
                    {Object.keys(activeColumns).map((columnKey) => (
                      <label key={columnKey} className="dropdown-item">
                        <input 
                          type="checkbox" checked={activeColumns[columnKey]} 
                          onChange={() => switchColumnVisibility(columnKey)} className="dropdown-checkbox"
                        />
                        <span className="column-label-text">{columnKey}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => { setSelectedEditItem(null); setModalOpen(true); }} className="action-icon-btn add-btn">
              <Plus size={15} />
            </button>
            <button onClick={refreshMainData} className="action-icon-btn refresh-btn">
              <RotateCw size={14} />
            </button>
            <button onClick={() => alert('Download framework setup completed successfully.')} className="action-icon-btn download-all-btn">
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* Responsive Table Window Element */}
        <div className="table-viewport">
          <table className="nda-data-table">
            <thead>
              <tr>
                {activeColumns.checkbox && (
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" onChange={triggerMasterSelection}
                      checked={observablePaginatedSlice.length > 0 && checkedRowIds.length === observablePaginatedSlice.length}
                    />
                  </th>
                )}
                {activeColumns.ndaId && <th>NDA ID</th>}
                {activeColumns.title && <th>Title</th>}
                {activeColumns.signedDate && <th>Signed Date</th>}
                {activeColumns.expiryDate && <th>Expiry Date</th>}
                {activeColumns.status && <th>Status</th>}
                {activeColumns.download && <th style={{ textAlign: 'center' }}>Download</th>}
                {activeColumns.actions && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {observablePaginatedSlice.length > 0 ? (
                observablePaginatedSlice.map((row) => (
                  <tr key={row.id} className={`nda-table-row ${checkedRowIds.includes(row.id) ? 'selected' : ''}`}>
                    {activeColumns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" checked={checkedRowIds.includes(row.id)}
                          onChange={() => triggerRowSelection(row.id)}
                        />
                      </td>
                    )}
                    {activeColumns.ndaId && <td className="cell-bold-id">{row.id}</td>}
                    {activeColumns.title && <td><div className="cell-title-text">{row.title}</div></td>}
                    {activeColumns.signedDate && (
                      <td>
                        <div className="cell-date-block">
                          <Calendar size={13} />
                          <span>{convertStandardDates(row.signedDate) || '—'}</span>
                        </div>
                      </td>
                    )}
                    {activeColumns.expiryDate && (
                      <td>
                        <div className="cell-date-block">
                          <Calendar size={13} />
                          <span>{convertStandardDates(row.expiryDate) || '—'}</span>
                        </div>
                      </td>
                    )}
                    {activeColumns.status && (
                      <td>
                        <span className={`status-badge ${row.status.toLowerCase().replace(" ", "-")}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {activeColumns.download && (
                      <td style={{ textAlign: 'center' }}>
                        <button onClick={() => processRowDownload(row)} className="row-action-btn">
                          <Download size={14} />
                        </button>
                      </td>
                    )}
                    {activeColumns.actions && (
                      <td style={{ textAlign: 'right' }}>
                        <button onClick={() => initRowEditFlow(row)} className="row-action-btn edit-row">
                          <Edit2 size={13} />
                        </button>
                        <button onClick={() => executeIndividualRowDelete(row.id)} className="row-action-btn delete-row">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="empty-table-state">No matching NDA records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Configurable Pagination Footer section layout */}
        <div className="pagination-footer">
          <div className="items-per-page-selector">
            <span>Items per page:</span>
            <div className="selector-dropdown-container">
              <select 
                value={rowsPerPage} 
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setActivePage(1); }}
                className="page-size-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown size={12} className="select-chevron" />
            </div>
          </div>

          <div className="pagination-controls-right">
            <span>
              {totalRecordsCount === 0 ? 0 : startingIndex + 1} – {Math.min(endingIndex, totalRecordsCount)} of {totalRecordsCount}
            </span>
            <div className="page-arrows">
              <button 
                disabled={activePage === 1} onClick={() => setActivePage(prev => prev - 1)} 
                className="arrow-nav-btn"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={activePage === maximalPageCount || maximalPageCount === 0} 
                onClick={() => setActivePage(prev => prev + 1)} className="arrow-nav-btn"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smoothly animated popup form registration connector link element */}
      <NDAModalForm 
        isOpen={modalOpen} onClose={() => { setModalOpen(false); setSelectedEditItem(null); }}
        onSave={persistFormRecordChanges} editTargetData={selectedEditItem}
      />
    </div>
  );
};

export default Contracts;