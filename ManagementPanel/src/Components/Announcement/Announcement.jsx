import React, { useState } from 'react';
import { 
  Plus, RotateCw, Download, SlidersHorizontal, Search, 
  Trash2, Edit3, Calendar, User, Layers, Type, ChevronDown, 
  ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import './Announcement.css';

// --- INITIAL DUMMY RECORDS DATA SEED ---
const initialAnnouncements = [
  { id: 1, title: "Annual General Meeting 2026", category: "Corporate", publishedDate: "2026-01-15", expiryDate: "2026-02-15", status: "Published", author: "John Doe" },
  { id: 2, title: "New Health Insurance Plan", category: "Benefits", publishedDate: "2026-01-10", expiryDate: "2026-03-10", status: "Published", author: "Sarah Smith" },
  { id: 3, title: "Office Renovation Update", category: "Facility", publishedDate: "2026-01-05", expiryDate: "2026-01-20", status: "Draft", author: "Michael Brown" },
  { id: 4, title: "Q1 Training Schedule", category: "L&D", publishedDate: "2025-12-28", expiryDate: "2026-01-31", status: "Published", author: "Emily Davis" },
  { id: 5, title: "Data Security Workshop", category: "IT Security", publishedDate: "2025-12-20", expiryDate: "2026-01-15", status: "Archived", author: "Robert Wilson" },
  { id: 6, title: "New Project Kickoff", category: "Operations", publishedDate: "2026-01-18", expiryDate: "2026-02-18", status: "Published", author: "Jennifer Lee" },
  { id: 7, title: "Employee of the Month", category: "Recognition", publishedDate: "2026-01-02", expiryDate: "2026-01-31", status: "Published", author: "Sarah Smith" },
  { id: 8, title: "New Policy on Remote Work", category: "Policy", publishedDate: "2026-01-20", expiryDate: "2026-03-20", status: "Published", author: "John Doe" },
  { id: 9, title: "IT System Upgrade Notice", category: "IT Security", publishedDate: "2026-01-22", expiryDate: "2026-01-25", status: "Draft", author: "Robert Wilson" },
  { id: 10, title: "Annual Team Building Event", category: "Events", publishedDate: "2026-02-01", expiryDate: "2026-02-15", status: "Archived", author: "Sarah Smith" },
  { id: 11, title: "Q2 Financial Review", category: "Corporate", publishedDate: "2026-04-01", expiryDate: "2026-04-15", status: "Draft", author: "John Doe" },
  { id: 12, title: "Marketing Strategy Sync", category: "Operations", publishedDate: "2026-03-10", expiryDate: "2026-03-25", status: "Published", author: "Jennifer Lee" }
];

const Announcement = () => {
  // System State Management Layers
  const [data, setData] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Interactive UI Dropdown and Popup States
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [formModal, setFormModal] = useState({ isOpen: false, type: 'create', data: null });
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, title: true, category: true, publishedDate: true, expiryDate: true, status: true, author: true, actions: true
  });

  // Modal Context State Binding
  const [formData, setFormData] = useState({ title: '', category: '', publishedDate: '', expiryDate: '', author: '', status: 'Draft' });

  // --- ACTIONS SYSTEM CONTROLLERS ---
  const handleRefresh = () => {
    setData(initialAnnouncements);
    setSearchQuery("");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "announcements_report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this record?")) {
      setData(data.filter(item => item.id !== id));
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleBulkDelete = () => {
    if(confirm(`Are you sure you want to delete the ${selectedIds.length} selected items?`)) {
      setData(data.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = currentItems.map(item => item.id);
      setSelectedIds([...new Set([...selectedIds, ...pageIds])]);
    } else {
      const pageIds = currentItems.map(item => item.id);
      setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // --- POPUP SYSTEM WINCH METHODS ---
  const openCreateModal = () => {
    setFormData({ title: '', category: '', publishedDate: '', expiryDate: '', author: '', status: 'Draft' });
    setFormModal({ isOpen: true, type: 'create', data: null });
  };

  const openEditModal = (item, e) => {
    e.stopPropagation();
    setFormData(item);
    setFormModal({ isOpen: true, type: 'edit', data: item });
  };

  const openViewModal = (item) => {
    setFormData(item);
    setFormModal({ isOpen: true, type: 'view', data: item });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formModal.type === 'create') {
      const newItem = { id: Date.now(), ...formData };
      setData([newItem, ...data]);
    } else if (formModal.type === 'edit') {
      setData(data.map(item => item.id === formModal.data.id ? formData : item));
    }
    setFormModal({ isOpen: false, type: 'create', data: null });
  };

  // --- QUERY PIPELINES & DATA SPLITTING ---
  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="announcement-container">
      
      {/* --- BREADCRUMB ROUTER PRESETS --- */}
      <div className="breadcrumb-wrapper">
        <h1>Announcements</h1>
        <div>
          <span>🏠</span>
          <span>&gt;</span>
          <span>Communication</span>
          <span>&gt;</span>
          <span className="text-slate-800" style={{ fontWeight: 600, color: '#1e293b' }}>Announcements</span>
        </div>
      </div>

      {/* --- CONTROL UTILITY TOOLBAR --- */}
      <div className="controls-card">
        <div className="search-box-wrapper">
          <span>Announcements</span>
          <Search style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="action-buttons-wrapper">
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className="bulk-delete-btn">
              <Trash2 style={{ width: '16px', height: '16px' }} />
              <span>Delete Selected ({selectedIds.length})</span>
            </button>
          )}

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="icon-btn"
              title="Show/Hide Columns"
            >
              <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
            </button>
            
            {showColumnDropdown && (
              <div className="absolute right-0">
                <div className="border-b">Show/Hide Column</div>
                <div>
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col}>
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col]} 
                        onChange={() => setVisibleColumns({...visibleColumns, [col]: !visibleColumns[col]})}
                      />
                      {col}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={openCreateModal} className="icon-btn" title="Add New">
            <Plus style={{ width: '16px', height: '16px' }} />
          </button>
          <button onClick={handleRefresh} className="icon-btn" title="Refresh">
            <RotateCw style={{ width: '16px', height: '16px' }} />
          </button>
          <button onClick={handleDownload} className="icon-btn" title="Download JSON">
            <Download style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {/* --- VISUAL DATA MATRIX SYSTEM --- */}
      <div className="table-responsive-wrapper">
        <table>
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th style={{ width: '48px', textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(item.id))}
                  />
                </th>
              )}
              {visibleColumns.id && <th style={{ width: '64px' }}>ID</th>}
              {visibleColumns.title && <th>Title</th>}
              {visibleColumns.category && <th>Category</th>}
              {visibleColumns.publishedDate && <th>Published Date</th>}
              {visibleColumns.expiryDate && <th>Expiry Date</th>}
              {visibleColumns.status && <th>Status</th>}
              {visibleColumns.author && <th>Author</th>}
              {visibleColumns.actions && <th style={{ textAlign: 'center', width: '112px' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => openViewModal(item)}
                  className="cursor-pointer"
                >
                  {visibleColumns.checkbox && (
                    <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)} 
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.id && <td style={{ fontFamily: 'monospace', color: '#94a3b8' }}>{item.id}</td>}
                  {visibleColumns.title && <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</td>}
                  {visibleColumns.category && <td>{item.category}</td>}
                  {visibleColumns.publishedDate && (
                    <td>
                      <span className="inline-flex">
                        <Calendar style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> {item.publishedDate}
                      </span>
                    </td>
                  )}
                  {visibleColumns.expiryDate && (
                    <td>
                      <span className="inline-flex">
                        <Calendar style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> {item.expiryDate}
                      </span>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td>
                      <span className={`tracking-wide ${
                        item.status === 'Published' ? 'bg-emerald-50' :
                        item.status === 'Draft' ? 'bg-amber-50' : 'bg-rose-50'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.author && <td style={{ color: '#1e293b' }}>{item.author}</td>}
                  {visibleColumns.actions && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <button onClick={(e) => openEditModal(item, e)} className="text-indigo-500" title="Edit">
                          <Edit3 style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-rose-500" title="Delete">
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                  No records found matching your selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- FOOTER PAGINATION LOGIC CONTROLS --- */}
      <div className="pagination-footer">
        <div className="flex" style={{ gap: '12px' }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>Items per page:</span>
          <div style={{ position: 'relative' }}>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <ChevronDown style={{ width: '16px', height: '16px', color: '#64748b', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        <div className="flex" style={{ gap: '16px' }}>
          <span style={{ fontWeight: 500, color: '#64748b' }}>
            {indexOfFirstItem + 1} – {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
          </span>
          <div className="flex" style={{ gap: '4px' }}>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft style={{ width: '20px', height: '20px' }} />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        </div>
      </div>

      {/* --- FORM DIALOG DIALOG OVERLAY POPUP WINDOWS --- */}
      {formModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            
            <div className="modal-header">
              <h2>
                {formModal.type === 'create' && 'New Announcement'}
                {formModal.type === 'edit' && 'Edit Announcement'}
                {formModal.type === 'view' && formData.title}
              </h2>
              <button onClick={() => setFormModal({ isOpen: false, type: 'create', data: null })}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="grid-cols-1">
                
                <div className="input-group">
                  <label>Title *</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      required
                      disabled={formModal.type === 'view'}
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    <Type style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Category *</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      required
                      disabled={formModal.type === 'view'}
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    />
                    <Layers style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Published Date *</label>
                  <div className="flex">
                    <input 
                      type="date" 
                      required
                      disabled={formModal.type === 'view'}
                      value={formData.publishedDate} 
                      onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                    />
                    <Calendar style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Expiry Date *</label>
                  <div className="flex">
                    <input 
                      type="date" 
                      required
                      disabled={formModal.type === 'view'}
                      value={formData.expiryDate} 
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    />
                    <Calendar style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Author *</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      required
                      disabled={formModal.type === 'view'}
                      value={formData.author} 
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                    <User style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                  </div>
                </div>

                <div className="input-group">
                  <label>Status *</label>
                  <div className="flex" style={{ position: 'relative' }}>
                    <select 
                      disabled={formModal.type === 'view'}
                      value={formData.status} 
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      style={{ paddingRight: '24px' }}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                    <ChevronDown style={{ width: '16px', height: '16px', color: '#94a3b8', position: 'absolute', right: '12px', pointerEvents: 'none' }} />
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                {formModal.type !== 'view' ? (
                  <>
                    <button type="submit">Save</button>
                    <button 
                      type="button" 
                      onClick={() => setFormModal({ isOpen: false, type: 'create', data: null })}
                      className="bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => setFormModal({ isOpen: false, type: 'create', data: null })}
                    className="bg-slate-100"
                    style={{ marginLeft: 'auto' }}
                  >
                    Close View Window
                  </button>
                )}
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Announcement;