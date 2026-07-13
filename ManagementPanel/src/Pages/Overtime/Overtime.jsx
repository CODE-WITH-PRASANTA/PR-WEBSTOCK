import React, { useMemo, useState, useRef, useEffect } from 'react';
import { 
  Search, Filter, Plus, RefreshCw, Download, Edit2, Trash2, X, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import API from "../../api/axios"; // Ensure this path is correct
import './Overtime.css';


/* --- Static Config --- */
const COLUMN_DEFS = [
  { key: 'checkbox', label: 'Checkbox', alwaysOn: true },
  { key: 'name', label: 'Employee Name' },
  { key: 'date', label: 'Date' },
  { key: 'hours', label: 'OT Hours' },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status' },
  { key: 'approvedBy', label: 'Approved By' },
  { key: 'actions', label: 'Actions' },
];

const STATUS_OPTIONS = ['Pending', 'Approved', 'Rejected'];
const EMPTY_FORM = { name: '', date: '', hours: '', status: 'Pending', approvedBy: '', reason: '' };

const initials = (name) => name ? name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() : 'EMP';
const statusClass = (status) => {
  if (status === 'Approved') return 'overtime-badge--approved';
  if (status === 'Rejected') return 'overtime-badge--rejected';
  return 'overtime-badge--pending';
};

const Overtime = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [visibleCols, setVisibleCols] = useState(Object.fromEntries(COLUMN_DEFS.map((c) => [c.key, true])));
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [modalMode, setModalMode] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const filterRef = useRef(null);

 const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await API.get('/overtime/admin/all');
      
      // Sort data so the newest records show on top
      const sortedData = res.data.data.sort((a, b) => {
        // Use createdAt if available, otherwise fallback to the overtime date
        const dateA = new Date(a.createdAt || a.date).getTime();
        const dateB = new Date(b.createdAt || b.date).getTime();
        return dateB - dateA; // Descending order (latest first)
      });

      setRows(sortedData);
    } catch (err) {
      console.error("Failed to fetch:", err);
      alert("Could not load overtime requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowColumnMenu(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // --- Data Processing & Pagination ---

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => [r.name, r.reason, r.status, r.approvedBy].join(' ').toLowerCase().includes(q));
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  // Use MongoDB _id instead of id
  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.includes(r._id));
  const someOnPageSelected = pageRows.some((r) => selected.includes(r._id)) && !allOnPageSelected;

  // --- Handlers ---

  const toggleColumn = (key) => setVisibleCols((v) => ({ ...v, [key]: !v[key] }));
  
  const toggleSelectAllOnPage = () => {
    if (allOnPageSelected) {
      setSelected((s) => s.filter((id) => !pageRows.some((r) => r._id === id)));
    } else {
      setSelected((s) => Array.from(new Set([...s, ...pageRows.map((r) => r._id)])));
    }
  };

  const toggleSelectRow = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  
  const openAddModal = () => { 
    setForm(EMPTY_FORM); 
    setFormErrors({}); 
    setEditingId(null); 
    setModalMode('add'); 
  };
  
  const openEditModal = (row) => { 
    // Format date for HTML input (YYYY-MM-DD)
    const formattedDate = row.date ? new Date(row.date).toISOString().split('T')[0] : '';
    setForm({ ...row, date: formattedDate }); 
    setFormErrors({}); 
    setEditingId(row._id); 
    setModalMode('edit'); 
  };
  
  const closeModal = () => setModalMode(null);

  const validate = (f) => {
    const errs = {};
    if (!f.name?.trim()) errs.name = 'Employee name is required';
    if (!f.date) errs.date = 'Date is required';
    if (f.hours === '' || Number(f.hours) <= 0) errs.hours = 'Enter valid hours';
    if (!f.reason?.trim()) errs.reason = 'Reason is required';
    return errs;
  };

  const handleSave = async () => {
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const payload = { ...form, hours: Number(form.hours) };
      
      // Note: If your Mongoose model strict requires employeeId, ensure it's passed here or handled in backend
      if (modalMode === 'add') {
        await API.post('/overtime/add', payload);
      } else if (modalMode === 'edit') {
        await API.put(`/overtime/admin/update/${editingId}`, payload);
      }
      
      closeModal();
      fetchRequests(); // Refresh data from database
    } catch (err) {
      console.error(err);
      alert("Error saving request. Please check console.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this request?')) {
      try {
        await API.delete(`/overtime/delete/${id}`);
        setSelected((s) => s.filter((x) => x !== id));
        fetchRequests();
      } catch (err) {
        alert("Error deleting request");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selected.length} selected request(s)?`)) {
      try {
        // Run all delete promises concurrently
        await Promise.all(selected.map(id => API.delete(`/overtime/delete/${id}`)));
        setSelected([]);
        fetchRequests();
      } catch (err) {
        alert("Error during bulk delete");
      }
    }
  };

  const handleRefresh = () => { 
    fetchRequests(); 
    setSearch(''); 
    setSelected([]); 
    setPage(1); 
  };

 const handleExport = () => {
    const header = ['Employee Name', 'Date', 'OT Hours', 'Reason', 'Status', 'Approved By'];
    
    const csvRows = filtered.map((r) => [
      r.name, 
      r.date ? new Date(r.date).toLocaleDateString() : '', 
      r.hours, 
      r.reason, 
      r.status, 
      r.approvedBy || ''
    ]);
    
    const csvContent = [header, ...csvRows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    // Add BOM (\uFEFF) to force Excel to read it as UTF-8 properly
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href = url; 
    a.download = 'Overtime_Requests.csv'; 
    document.body.appendChild(a); // Required for Firefox
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up memory
  };

  const updateForm = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="overtime-container">
      <div className="overtime-card">
        <div className="overtime-toolbar">
          <span className="overtime-toolbar__title">Overtime Requests</span>
          <div className="overtime-search">
            <span className="overtime-search__icon"><Search size={16} /></span>
            <input 
              className="overtime-search__input" 
              placeholder="Search..." 
              value={search} 
              onChange={(e) => { setSearch(e.target.value); setPage(1); }} 
            />
          </div>
          <div className="overtime-toolbar__actions">
        <div style={{ position: 'relative' }} ref={filterRef}>
  <button 
    className={`overtime-icon-btn ${showColumnMenu ? 'overtime-icon-btn--active' : ''}`} 
    onClick={() => setShowColumnMenu(!showColumnMenu)} 
    title="Filter Columns"
  >
    <Filter size={17} />
  </button>
  
  {showColumnMenu && (
    <div className="overtime-column-menu">
      <div className="overtime-column-menu__header">Visible Columns</div>
      {COLUMN_DEFS.map((col) => (
        <label key={col.key} className="overtime-column-menu__label">
          <input 
            type="checkbox" 
            checked={visibleCols[col.key]} 
            onChange={() => toggleColumn(col.key)} 
            disabled={col.alwaysOn} 
            className="overtime-column-menu__checkbox"
          />
          {col.label}
        </label>
      ))}
    </div>
  )}
</div>
            <button className="overtime-icon-btn" onClick={handleRefresh} title="Refresh"><RefreshCw size={16} /></button>
            <button className="overtime-icon-btn" onClick={handleExport} title="Export CSV"><Download size={16} /></button>
            <button className="overtime-icon-btn overtime-icon-btn--primary" onClick={openAddModal} title="Add Request"><Plus size={18} /></button>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="overtime-selection-bar">
            <span>{selected.length} selected</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="overtime-selection-bar__delete" onClick={handleBulkDelete}><Trash2 size={15} /> Delete</button>
              <button className="overtime-selection-bar__clear" onClick={() => setSelected([])}>Clear</button>
            </div>
          </div>
        )}

        <div className="overtime-table-scroll">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
          ) : (
            <table className="overtime-table">
              <thead>
                <tr>
                  {visibleCols.checkbox && <th className="overtime-table__th overtime-table__th--checkbox"><input type="checkbox" checked={allOnPageSelected} ref={(el) => el && (el.indeterminate = someOnPageSelected)} onChange={toggleSelectAllOnPage} /></th>}
                  {visibleCols.name && <th className="overtime-table__th">Employee Name</th>}
                  {visibleCols.date && <th className="overtime-table__th">Date</th>}
                  {visibleCols.hours && <th className="overtime-table__th">OT Hours</th>}
                  {visibleCols.reason && <th className="overtime-table__th">Reason</th>}
                  {visibleCols.status && <th className="overtime-table__th">Status</th>}
                  {visibleCols.approvedBy && <th className="overtime-table__th">Approved By</th>}
                  {visibleCols.actions && <th className="overtime-table__th">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No records found.</td></tr>
                ) : (
                  pageRows.map((row) => (
                    <tr key={row._id}>
                      {visibleCols.checkbox && <td><input type="checkbox" checked={selected.includes(row._id)} onChange={() => toggleSelectRow(row._id)} /></td>}
                      {visibleCols.name && <td><span className="overtime-avatar"><span className="overtime-avatar__initial">{initials(row.name)}</span>{row.name}</span></td>}
                      {visibleCols.date && <td>{row.date ? new Date(row.date).toLocaleDateString() : '—'}</td>}
                      {visibleCols.hours && <td>{row.hours}</td>}
                      {visibleCols.reason && <td>{row.reason}</td>}
                      {visibleCols.status && <td><span className={`overtime-badge ${statusClass(row.status)}`}>{row.status}</span></td>}
                      {visibleCols.approvedBy && <td>{row.approvedBy || '—'}</td>}
                      {visibleCols.actions && (
                        <td>
                          <button onClick={() => openEditModal(row)} style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none' }}><Edit2 size={15}/></button>
                          <button onClick={() => handleDelete(row._id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}><Trash2 size={15}/></button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {modalMode && (
          <div className="overtime-modal-overlay">
            <div className="overtime-modal">
              <div className="overtime-modal__header">
                <h3>{modalMode === 'add' ? 'New Request' : 'Edit Request'}</h3>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <div className="overtime-modal__body">
                <input placeholder="Name" value={form.name} onChange={(e) => updateForm('name', e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
                {formErrors.name && <span className="error" style={{ color: 'red', display: 'block', fontSize: '12px', marginBottom: '10px' }}>{formErrors.name}</span>}
                
                <input type="date" value={form.date} onChange={(e) => updateForm('date', e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
                {formErrors.date && <span className="error" style={{ color: 'red', display: 'block', fontSize: '12px', marginBottom: '10px' }}>{formErrors.date}</span>}

                <input type="number" placeholder="Hours" value={form.hours} onChange={(e) => updateForm('hours', e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
                {formErrors.hours && <span className="error" style={{ color: 'red', display: 'block', fontSize: '12px', marginBottom: '10px' }}>{formErrors.hours}</span>}

                <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px' }}>
                  {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>

                <textarea placeholder="Reason" value={form.reason} onChange={(e) => updateForm('reason', e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px', minHeight: '80px' }} />
                {formErrors.reason && <span className="error" style={{ color: 'red', display: 'block', fontSize: '12px', marginBottom: '10px' }}>{formErrors.reason}</span>}
              </div>
              <div className="overtime-modal__footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button onClick={closeModal} style={{ padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
                <button onClick={handleSave} className="primary" style={{ padding: '8px 16px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Save</button>
              </div>
            </div>
          </div>
        )}

        <div className="overtime-footer">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
            <ChevronLeft size={15}/>
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} style={{ cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>
            <ChevronRight size={15}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overtime;