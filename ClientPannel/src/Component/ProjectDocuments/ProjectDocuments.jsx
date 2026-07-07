import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Plus, RotateCw, Download, 
  ChevronLeft, ChevronRight, Calendar, Edit2, Trash2, 
  ChevronDown, X, Upload, FileText, List, Clipboard
} from 'lucide-react';
import './ProjectDocuments.css';

// Initial mock data matching image 681fd8.png
const initialDocs = [
  { id: '1', name: 'Technical Specifications', project: 'E-Commerce Platform', type: 'PDF', date: '2024-01-20', size: '2.5 MB', status: 'Approved' },
  { id: '2', name: 'User Requirements', project: 'HR Management System', type: 'DOCX', date: '2024-01-18', size: '1.8 MB', status: 'Approved' },
  { id: '3', name: 'API Documentation', project: 'E-Commerce Platform', type: 'PDF', date: '2024-01-15', size: '3.2 MB', status: 'Pending Review' },
  { id: '4', name: 'Database Schema', project: 'HR Management System', type: 'PDF', date: '2024-01-10', size: '1.2 MB', status: 'Draft' },
  { id: '5', name: 'Project Timeline', project: 'Mobile App Development', type: 'XLSX', date: '2024-01-05', size: '0.8 MB', status: 'Approved' },
  { id: '6', name: 'Security Audit Report', project: 'Cloud Migration', type: 'PDF', date: '2023-12-20', size: '4.1 MB', status: 'Pending Review' }
];

/* =========================================================
   MODAL COMPONENT (Image 6822c4.png - Scrollable Form)
   ========================================================= */
const DocumentFormModal = ({ isOpen, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    name: '', project: '', status: 'Draft', date: '', size: '', type: ''
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({ name: '', project: '', status: 'Draft', date: '', size: '', type: '' });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="pd-modal-overlay">
      <div className="pd-modal-content">
        <div className="pd-modal-header">
          <h2>{editData ? 'Edit Project Document' : 'New Project Document'}</h2>
          <button type="button" onClick={onClose} className="pd-modal-close"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="pd-modal-body">
          <div className="pd-form-group">
            <div className="pd-input-with-icon">
              <input 
                type="text" required placeholder="Document Name*" 
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="pd-form-input"
              />
              <FileText size={18} className="pd-input-icon" />
            </div>
          </div>

          <div className="pd-form-row">
            <div className="pd-form-group">
              <div className="pd-input-with-icon">
                <input 
                  type="text" required placeholder="Project*" 
                  value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})}
                  className="pd-form-input"
                />
                <Clipboard size={18} className="pd-input-icon" />
              </div>
            </div>
            
            <div className="pd-form-group">
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="pd-form-select"
              >
                <option value="Draft">Draft</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>

          <div className="pd-drag-drop">
            <Upload size={32} color="#64748b" />
            <div className="pd-drag-drop-text">
              Drag & Drop file here or <span className="pd-browse-link">Browse</span>
            </div>
          </div>

          <div className="pd-form-row">
            <div className="pd-form-group">
              <div className="pd-input-with-icon">
                <input 
                  type="text" placeholder="File Size" 
                  value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="pd-form-input"
                />
                <List size={18} className="pd-input-icon" />
              </div>
            </div>
            <div className="pd-form-group">
              <div className="pd-input-with-icon">
                <input 
                  type="text" placeholder="File Type" 
                  value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="pd-form-input"
                />
                <FileText size={18} className="pd-input-icon" />
              </div>
            </div>
          </div>

          <div className="pd-modal-footer">
            <button type="submit" className="pd-btn pd-btn-save">Save</button>
            <button type="button" onClick={onClose} className="pd-btn pd-btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN DASHBOARD COMPONENT
   ========================================================= */
const ProjectDocuments = () => {
  const [documents, setDocuments] = useState(initialDocs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Pagination State (5 items per page requirement)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Column Toggle State (Image 681ffa.png)
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    checkbox: true, documentName: true, project: true, type: true, uploadDate: true, size: true, status: true, download: true, actions: true
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columnMenuRef = useRef(null);

  // Close column dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (columnMenuRef.current && !columnMenuRef.current.contains(e.target)) {
        setIsColumnMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter & Pagination Logic
  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRows = filteredDocs.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const endIndex = currentPage * rowsPerPage;
  const startIndex = endIndex - rowsPerPage;
  const currentTableData = filteredDocs.slice(startIndex, endIndex);

  // Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedIds(currentTableData.map(d => d.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(item => item !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  // Actions
  const refreshData = () => {
    setDocuments(initialDocs);
    setSelectedIds([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const deleteSelected = () => {
    setDocuments(documents.filter(doc => !selectedIds.includes(doc.id)));
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const deleteSingle = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  const handleEditOpen = (doc) => {
    setEditingItem(doc);
    setIsModalOpen(true);
  };

  const saveDocument = (data) => {
    if (editingItem) {
      setDocuments(documents.map(d => d.id === editingItem.id ? { ...d, ...data } : d));
    } else {
      const newDoc = { 
        id: Date.now().toString(), 
        date: new Date().toISOString().split('T')[0], 
        ...data 
      };
      setDocuments([...documents, newDoc]);
    }
    setEditingItem(null);
  };

  const downloadFile = (doc) => {
    alert(`Downloading ${doc.name}.${doc.type.toLowerCase()}`);
  };

  const toggleColumn = (key) => {
    setVisibleCols(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="pd-dashboard-wrapper">
      {/* Top Header */}
      <div className="pd-header-top">
        <h1 className="pd-page-title">Project Documents</h1>
        <div className="pd-breadcrumbs">
          <span>🏠</span> <span>&gt;</span> <span>Documents</span> <span>&gt;</span> <span className="pd-breadcrumb-active">Project Documents</span>
        </div>
      </div>

      {/* Bulk Delete Banner */}
      {selectedIds.length > 0 && (
        <div className="pd-bulk-action-banner">
          <span>{selectedIds.length} items selected.</span>
          <button onClick={deleteSelected} className="pd-btn-bulk-delete">
            <Trash2 size={14} /> Delete Selected
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <div className="pd-table-card">
        {/* Toolbar */}
        <div className="pd-toolbar">
          <div className="pd-toolbar-left">
            <h3 className="pd-toolbar-title">Project Documents List</h3>
            <div className="pd-search-container">
              <input 
                type="text" placeholder="Search" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="pd-search-input"
              />
              <Search size={14} className="pd-search-icon" />
            </div>
          </div>

          <div className="pd-toolbar-right">
            <div className="pd-dropdown-relative" ref={columnMenuRef}>
              <button onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)} className="pd-action-icon-btn pd-icon-filter">
                <SlidersHorizontal size={18} />
              </button>
              
              {isColumnMenuOpen && (
                <div className="pd-column-dropdown">
                  <h4 className="pd-dropdown-header">Show/Hide Column</h4>
                  <div className="pd-dropdown-list">
                    {Object.keys(visibleCols).map((col) => (
                      <label key={col} className="pd-dropdown-item">
                        <input 
                          type="checkbox" checked={visibleCols[col]} 
                          onChange={() => toggleColumn(col)} 
                        />
                        <span style={{textTransform: 'capitalize'}}>{col.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="pd-action-icon-btn pd-icon-add">
              <Plus size={20} />
            </button>
            <button onClick={refreshData} className="pd-action-icon-btn pd-icon-refresh">
              <RotateCw size={18} />
            </button>
            <button onClick={() => alert('Global Download Triggered')} className="pd-action-icon-btn pd-icon-download">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="pd-table-wrapper">
          <table className="pd-table">
            <thead>
              <tr>
                {visibleCols.checkbox && (
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" onChange={handleSelectAll}
                      checked={currentTableData.length > 0 && selectedIds.length === currentTableData.length}
                    />
                  </th>
                )}
                {visibleCols.documentName && <th>Document Name</th>}
                {visibleCols.project && <th>Project</th>}
                {visibleCols.type && <th>Type</th>}
                {visibleCols.uploadDate && <th>Upload Date</th>}
                {visibleCols.size && <th>Size</th>}
                {visibleCols.status && <th>Status</th>}
                {visibleCols.download && <th style={{textAlign: 'center'}}>Download</th>}
                {visibleCols.actions && <th style={{textAlign: 'right'}}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? currentTableData.map((row) => (
                <tr key={row.id} className={selectedIds.includes(row.id) ? 'selected' : ''}>
                  {visibleCols.checkbox && (
                    <td>
                      <input 
                        type="checkbox" checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectOne(row.id)}
                      />
                    </td>
                  )}
                  {visibleCols.documentName && <td style={{color: '#334155'}}>{row.name}</td>}
                  {visibleCols.project && <td>{row.project}</td>}
                  {visibleCols.type && <td>{row.type}</td>}
                  {visibleCols.uploadDate && (
                    <td>
                      <div className="pd-cell-flex">
                        <Calendar size={14} color="#94a3b8" />
                        {formatDate(row.date)}
                      </div>
                    </td>
                  )}
                  {visibleCols.size && <td>{row.size}</td>}
                  {visibleCols.status && (
                    <td>
                      <span className={`pd-badge ${row.status.toLowerCase().replace(" ", "-")}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {visibleCols.download && (
                    <td style={{textAlign: 'center'}}>
                      <button onClick={() => downloadFile(row)} className="pd-row-action-btn pd-icon-download">
                        <Download size={16} />
                      </button>
                    </td>
                  )}
                  {visibleCols.actions && (
                    <td style={{textAlign: 'right'}}>
                      <div className="pd-cell-flex" style={{justifyContent: 'flex-end'}}>
                        <button onClick={() => handleEditOpen(row)} className="pd-row-action-btn edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteSingle(row.id)} className="pd-row-action-btn delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )) : (
                <tr><td colSpan={9} style={{textAlign: 'center'}}>No documents found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pd-pagination">
          <div className="pd-page-size-selector">
            <span>Items per page:</span>
            <div className="pd-page-select-wrapper">
              <select 
                value={rowsPerPage} 
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="pd-page-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown size={14} className="pd-page-select-icon" />
            </div>
          </div>

          <div className="pd-page-controls">
            <span>
              {totalRows === 0 ? 0 : startIndex + 1} – {Math.min(endIndex, totalRows)} of {totalRows}
            </span>
            <button 
              disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} 
              className="pd-page-nav-btn"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} 
              className="pd-page-nav-btn"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay Setup */}
      <DocumentFormModal 
        isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        onSave={saveDocument} editData={editingItem}
      />
    </div>
  );
};

export default ProjectDocuments;