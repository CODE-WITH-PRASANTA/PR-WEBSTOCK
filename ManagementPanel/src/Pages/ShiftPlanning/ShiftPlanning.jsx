import React, { useState, useRef, useEffect, useMemo } from 'react';
import './ShiftPlanning.css';
import API from "../../api/axios"; // Uses your pre-configured Axios instance

/* ---------------------------------- Icons ---------------------------------- */
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconFilter = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M4 5h16M7 12h10M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const IconRefresh = ({ spinning }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`icon ${spinning ? 'icon--spin' : ''}`}>
    <path d="M4 12a8 8 0 0 1 14.2-5M20 12a8 8 0 0 1-14.2 5M4 4v5h5M20 20v-5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <rect x="3.5" y="5" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <rect x="4" y="3" width="10" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
    <path d="M14 8h6v13h-6M7 7h.01M11 7h.01M7 11h.01M11 11h.01M7 15h.01M11 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" className="icon">
    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------- Constants -------------------------------- */
const SHIFT_TYPES = ['Morning', 'Evening', 'Night'];

const DEPARTMENTS = [
  'Internship',
  'Full stack devloper',
  'Mern Stack Devloper',
  'Frontend Devloper',
  'Sales',
  'Business Devlopement Executive',
  'Managment',
  'Students',
  'Social media Manaagement',
  'Digital marketing staff'
];

const STATUSES = ['Active', 'In-Active'];

const COLUMN_CONFIG = [
  { key: 'checkbox', label: 'Checkbox' },
  { key: 'employeeName', label: 'Employee Name' },
  { key: 'shiftType', label: 'Shift Type' },
  { key: 'startTime', label: 'Start Time' },
  { key: 'endTime', label: 'End Time' },
  { key: 'date', label: 'Date' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

const EMPTY_FORM = { employeeId: '', shiftType: '', startTime: '', endTime: '', fromDate: '', toDate: '', date: '', department: '', status: 'Active' };

/* ------------------------------ Components ------------------------------ */
const StatusBadge = ({ status }) => (
  <span className={`sp-badge sp-badge--${(status || 'Active').toLowerCase().replace(/[^a-z0-9]/g, '')}`}>{status}</span>
);

const TimeField = ({ label, icon: Icon, value, onChange, required }) => {
  const ref = useRef(null);
  return (
    <div className="sp-field">
      <label className="sp-field__label">{label}{required && <span className="sp-field__req">*</span>}</label>
      <div className="sp-field__control">
        <input
          ref={ref}
          type="time"
          className="sp-field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="button" className="sp-field__icon-btn" tabIndex={-1}
          onClick={() => { try { ref.current.showPicker(); } catch { ref.current.focus(); } }}>
          <Icon />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------ Shift Modal -------------------------------- */
const ShiftModal = ({ title, initialData, onSave, onClose, accent, isEdit, employees, shifts }) => {
  const [form, setForm] = useState(initialData);

  const isValid = useMemo(() => {
    return (
      form.employeeId &&
      form.shiftType &&
      form.startTime &&
      form.endTime &&
      form.department &&
      form.status &&
      (isEdit ? form.date : form.fromDate && form.toDate)
    );
  }, [form, isEdit]);

  // Helper logic to generate an array of dates between two dates (inclusive)
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];
    while (start <= end) {
      dateArray.push(start.toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }
    return dateArray;
  };

  // Warning Detection Hook for overlapping dates
  const overlappingDatesWarning = useMemo(() => {
    if (!form.employeeId) return null;

    // Get conflicting dates based on current mode
    let targetDatesToCheck = [];
    if (isEdit && form.date) {
      targetDatesToCheck = [form.date.split('T')[0]];
    } else if (!isEdit && form.fromDate && form.toDate) {
      if (new Date(form.fromDate) > new Date(form.toDate)) return null;
      targetDatesToCheck = getDatesInRange(form.fromDate, form.toDate);
    }

    if (targetDatesToCheck.length === 0) return null;

    // Find if employee already has an entry on any of these target dates
    const conflictingShifts = shifts.filter(shift => {
      // Exclude the current shift record if we are editing it
      if (isEdit && shift._id === form._id) return false;

      const shiftEmpId = shift.employee?._id || shift.employeeId;
      if (String(shiftEmpId) !== String(form.employeeId)) return false;

      const shiftDateCleaned = shift.date ? shift.date.split('T')[0] : '';
      return targetDatesToCheck.includes(shiftDateCleaned);
    });

    if (conflictingShifts.length > 0) {
      const datesString = conflictingShifts.map(s => s.date?.split('T')[0]).filter(Boolean).join(', ');
      return `Warning: This employee already has a shift assigned on: ${datesString}`;
    }

    return null;
  }, [form.employeeId, form.fromDate, form.toDate, form.date, shifts, isEdit, form._id]);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleEmployeeChange = (empId) => {
    setForm(prev => {
      const selectedEmp = employees.find(e => e._id === empId);
      return {
        ...prev,
        employeeId: empId,
        department: selectedEmp ? selectedEmp.department : prev.department
      };
    });
  };

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  return (
    <div className="sp-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sp-modal" role="dialog" aria-modal="true">
        <div className={`sp-modal__header ${accent ? 'sp-modal__header--accent' : ''}`}>
          <h2 className="sp-modal__title">{title}</h2>
          <button className="sp-modal__close" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>

        <div className="sp-modal__body">
          {/* Render Warning Box if a duplicate entry date is detected */}
          {overlappingDatesWarning && (
            <div className="sp-alert sp-alert--warning" style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '14px', borderLeft: '4px solid #ffc107' }}>
              <strong>⚠️ Alert:</strong> {overlappingDatesWarning}
            </div>
          )}

          <div className="sp-grid">
            
            <div className="sp-field">
              <label className="sp-field__label">Employee Name<span className="sp-field__req">*</span></label>
              <div className="sp-field__control">
                <select
                  className="sp-field__input sp-field__select"
                  value={form.employeeId}
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                  disabled={isEdit}
                >
                  <option value="" disabled>Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>
                <span className="sp-field__icon sp-field__icon--static"><IconChevron /></span>
              </div>
            </div>

            <div className="sp-field">
              <label className="sp-field__label">Shift Type<span className="sp-field__req">*</span></label>
              <div className="sp-field__control">
                <select
                  className="sp-field__input sp-field__select"
                  value={form.shiftType}
                  onChange={(e) => set('shiftType')(e.target.value)}
                >
                  <option value="" disabled>Select shift type</option>
                  {SHIFT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <span className="sp-field__icon sp-field__icon--static"><IconChevron /></span>
              </div>
            </div>

            <TimeField label="Start Time" icon={IconClock} value={form.startTime} onChange={set('startTime')} required />
            <TimeField label="End Time" icon={IconClock} value={form.endTime} onChange={set('endTime')} required />

            {isEdit ? (
              <div className="sp-field">
                <label className="sp-field__label">Date<span className="sp-field__req">*</span></label>
                <div className="sp-field__control">
                  <input
                    type="date"
                    className="sp-field__input"
                    value={form.date || ''}
                    onChange={(e) => set('date')(e.target.value)}
                  />
                  <span className="sp-field__icon sp-field__icon--static"><IconCalendar /></span>
                </div>
              </div>
            ) : (
              <>
                <div className="sp-field">
                  <label className="sp-field__label">From Date<span className="sp-field__req">*</span></label>
                  <div className="sp-field__control">
                    <input
                      type="date"
                      className="sp-field__input"
                      value={form.fromDate || ''}
                      onChange={(e) => set('fromDate')(e.target.value)}
                    />
                    <span className="sp-field__icon sp-field__icon--static"><IconCalendar /></span>
                  </div>
                </div>
                <div className="sp-field">
                  <label className="sp-field__label">To Date<span className="sp-field__req">*</span></label>
                  <div className="sp-field__control">
                    <input
                      type="date"
                      className="sp-field__input"
                      value={form.toDate || ''}
                      onChange={(e) => set('toDate')(e.target.value)}
                    />
                    <span className="sp-field__icon sp-field__icon--static"><IconCalendar /></span>
                  </div>
                </div>
              </>
            )}

            <div className="sp-field">
              <label className="sp-field__label">Department<span className="sp-field__req">*</span></label>
              <div className="sp-field__control">
                <select
                  className="sp-field__input sp-field__select"
                  value={form.department}
                  onChange={(e) => set('department')(e.target.value)}
                >
                  <option value="" disabled>Select department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="sp-field__icon sp-field__icon--static"><IconBuilding /></span>
              </div>
            </div>

            <div className="sp-field">
              <label className="sp-field__label">Status<span className="sp-field__req">*</span></label>
              <div className="sp-field__control">
                <select
                  className="sp-field__input sp-field__select"
                  value={form.status}
                  onChange={(e) => set('status')(e.target.value)}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="sp-field__icon sp-field__icon--static"><IconChevron /></span>
              </div>
            </div>
          </div>
        </div>

        <div className="sp-modal__footer">
          <button className="sp-btn sp-btn--primary" disabled={!isValid} onClick={handleSave}>Save Plan</button>
          <button className="sp-btn sp-btn--danger" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------- Main Component ------------------------------------ */
const ShiftPlanning = () => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');

  const [visibleColumns, setVisibleColumns] = useState(
    COLUMN_CONFIG.reduce((acc, c) => ({ ...acc, [c.key]: true }), {})
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [toast, setToast] = useState(null);

  const filterRef = useRef(null);

  useEffect(() => {
    fetchEmployees();
    fetchShifts();
  }, [filterFromDate, filterToDate, search]);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilter(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  // API Call: Fetch Dropdown Selection Employees
  const fetchEmployees = async () => {
    try {
      const response = await API.get('/shifts/employees');
      if (response.data.success) {
        setEmployees(response.data.data);
      }
    } catch (err) {
      console.error('Error getting employees list:', err.message);
    }
  };

  // API Call: Get Shifts with Range Querying Filters
  const fetchShifts = async () => {
    try {
      const params = {};
      if (filterFromDate) params.fromDate = filterFromDate;
      if (filterToDate) params.toDate = filterToDate;
      if (search) params.search = search;

      const response = await API.get('/shifts', { params });
      if (response.data.success) {
        setShifts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching shifts database data:', err.message);
    }
  };

  const totalPages = Math.max(1, Math.ceil(shifts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * itemsPerPage;
  const pageRows = shifts.slice(pageStart, pageStart + itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search, filterFromDate, filterToDate, itemsPerPage]);

  const toggleColumn = (key) => setVisibleColumns((v) => ({ ...v, [key]: !v[key] }));

  const toggleSelectAll = () => {
    const pageIds = pageRows.map((r) => r._id);
    const allSelected = pageIds.every((id) => selectedRows.includes(id));
    setSelectedRows((prev) =>
      allSelected ? prev.filter((id) => !pageIds.includes(id)) : [...new Set([...prev, ...pageIds])]
    );
  };

  const toggleSelectRow = (id) =>
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

  // API Integration: Create Shift Range Database entries
  const handleAddShift = async (form) => {
    try {
      const response = await API.post('/shifts', form);
      if (response.data.success) {
        setShowAddModal(false);
        setToast(response.data.message || 'Shifts created successfully');
        fetchShifts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating shift entries');
    }
  };

  // API Integration: Update Single Entry Cell
  const handleUpdateShift = async (form) => {
    try {
      const response = await API.put(`/shifts/${editingShift._id}`, form);
      if (response.data.success) {
        setEditingShift(null);
        setToast('Shift updated successfully');
        fetchShifts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating target cell');
    }
  };

  // API Integration: Delete Row Record
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this shift? This action cannot be undone.')) return;
    try {
      const response = await API.delete(`/shifts/${id}`);
      if (response.data.success) {
        setSelectedRows((prev) => prev.filter((r) => r !== id));
        setToast('Shift deleted successfully');
        fetchShifts();
      }
    } catch (err) {
      alert('Failed to erase record from system database.');
    }
  };

  const handleRefresh = () => {
    setSpinning(true);
    setSearch('');
    setFilterFromDate('');
    setFilterToDate('');
    setSelectedRows([]);
    fetchShifts();
    setTimeout(() => setSpinning(false), 650);
  };

  const handleDownloadExcel = () => {
    const cols = COLUMN_CONFIG.filter((c) => visibleColumns[c.key] && c.key !== 'checkbox' && c.key !== 'actions');
    let tsvContent = cols.map(c => c.label).join('\t') + '\n';

    shifts.forEach((shift) => {
      const rowData = cols.map(c => {
        if (c.key === 'employeeName') return shift.employee?.name || 'N/A';
        if (c.key === 'date' && shift.date) return shift.date.split('T')[0];
        return shift[c.key] || '';
      });
      tsvContent += rowData.join('\t') + '\n';
    });

    const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Shift_Plan_Export.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pageIds = pageRows.map((r) => r._id);
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedRows.includes(id));

  // Truncate timestamp strings to target YYYY-MM-DD compatibility hooks
  const startEditing = (shift) => {
    const sanitizedDate = shift.date ? shift.date.split('T')[0] : '';
    setEditingShift({ 
      ...shift, 
      employeeId: shift.employee?._id,
      date: sanitizedDate 
    });
  };

  return (
    <div className="sp">
      {toast && <div className="sp-toast">{toast}</div>}

      {/* Header Panel */}
      <div className="sp-header">
        <div className="sp-header__title">
          <span className="sp-header__icon"><IconCalendar /></span>
          <h1>Shift Planning</h1>
        </div>

        {/* Global Search Input */}
        <div className="sp-header__search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Dynamic Date Selection From-To Filter Block */}
        <div className="sp-header__range-filters">
          <div className="sp-range-box">
            <span className="sp-range-label">From:</span>
            <input 
              type="date" 
              value={filterFromDate} 
              onChange={(e) => setFilterFromDate(e.target.value)}
              className="sp-range-input"
            />
          </div>
          <div className="sp-range-box">
            <span className="sp-range-label">To:</span>
            <input 
              type="date" 
              value={filterToDate} 
              onChange={(e) => setFilterToDate(e.target.value)}
              className="sp-range-input"
            />
          </div>
        </div>

        <div className="sp-header__actions">
          <div className="sp-filter" ref={filterRef}>
            <button
              className={`sp-icon-btn ${showFilter ? 'sp-icon-btn--active' : ''}`}
              onClick={() => setShowFilter((v) => !v)}
              aria-label="Filter columns"
            >
              <IconFilter />
            </button>
            {showFilter && (
              <div className="sp-filter__panel">
                <div className="sp-filter__title">Show/Hide Column</div>
                <div className="sp-filter__divider" />
                <div className="sp-filter__list">
                  {COLUMN_CONFIG.map((c) => (
                    <label key={c.key} className="sp-filter__item">
                      <span
                        className={`sp-checkbox ${visibleColumns[c.key] ? 'sp-checkbox--checked' : ''}`}
                        onClick={() => toggleColumn(c.key)}
                      >
                        {visibleColumns[c.key] && <IconCheck />}
                      </span>
                      <span onClick={() => toggleColumn(c.key)}>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="sp-icon-btn sp-icon-btn--primary" onClick={() => setShowAddModal(true)} aria-label="Add shift range">
            <IconPlus />
          </button>
          <button className="sp-icon-btn" onClick={handleRefresh} aria-label="Refresh">
            <IconRefresh spinning={spinning} />
          </button>
          <button className="sp-icon-btn" onClick={handleDownloadExcel} aria-label="Download Excel Schedule">
            <IconDownload />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="sp-table-wrapper">
        <table className="sp-table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th className="sp-table__checkbox-col">
                  <span
                    className={`sp-checkbox ${allPageSelected ? 'sp-checkbox--checked' : ''}`}
                    onClick={toggleSelectAll}
                  >
                    {allPageSelected && <IconCheck />}
                  </span>
                </th>
              )}
              {visibleColumns.employeeName && <th>Employee Name</th>}
              {visibleColumns.shiftType && <th>Shift Type</th>}
              {visibleColumns.startTime && <th>Start Time</th>}
              {visibleColumns.endTime && <th>End Time</th>}
              {visibleColumns.date && <th>Date</th>}
              {visibleColumns.department && <th>Department</th>}
              {visibleColumns.status && <th>Status</th>}
              {visibleColumns.actions && <th className="sp-table__actions-col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={9} className="sp-table__empty">No active shifts found inside this range criteria.</td>
              </tr>
            )}
            {pageRows.map((s) => (
              <tr key={s._id} className="sp-row">
                {visibleColumns.checkbox && (
                  <td className="sp-table__checkbox-col">
                    <span
                      className={`sp-checkbox ${selectedRows.includes(s._id) ? 'sp-checkbox--checked' : ''}`}
                      onClick={() => toggleSelectRow(s._id)}
                    >
                      {selectedRows.includes(s._id) && <IconCheck />}
                    </span>
                  </td>
                )}
                {visibleColumns.employeeName && (
                  <td>
                    <button className="sp-row__name" onClick={() => startEditing(s)}>
                      {s.employee?.name || 'Unknown Employee'}
                    </button>
                  </td>
                )}
                {visibleColumns.shiftType && <td>{s.shiftType}</td>}
                {visibleColumns.startTime && <td>{s.startTime}</td>}
                {visibleColumns.endTime && <td>{s.endTime}</td>}
                {visibleColumns.date && <td>{s.date ? s.date.split('T')[0] : ''}</td>}
                {visibleColumns.department && <td>{s.department}</td>}
                {visibleColumns.status && (
                  <td><StatusBadge status={s.status} /></td>
                )}
                {visibleColumns.actions && (
                  <td className="sp-table__actions-col">
                    <div className="sp-row-actions">
                      <button className="sp-row-actions__btn sp-row-actions__btn--edit" onClick={() => startEditing(s)} aria-label="Edit">
                        <IconEdit />
                      </button>
                      <button className="sp-row-actions__btn sp-row-actions__btn--delete" onClick={() => handleDelete(s._id)} aria-label="Delete">
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="sp-footer">
        <div className="sp-footer__perpage">
          <span>Items per page:</span>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="sp-footer__range">
          {shifts.length === 0 ? '0 of 0' : `${pageStart + 1} – ${Math.min(pageStart + itemsPerPage, shifts.length)} of ${shifts.length}`}
        </div>
        <div className="sp-footer__nav">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>

      {/* Modals Handling */}
      {showAddModal && (
        <ShiftModal
          title="Create Shifts"
          initialData={EMPTY_FORM}
          onSave={handleAddShift}
          onClose={() => setShowAddModal(false)}
          employees={employees}
          shifts={shifts} // Passed state down for verification
          isEdit={false}
        />
      )}

      {editingShift && (
        <ShiftModal
          title="Edit Shift"
          initialData={editingShift}
          onSave={handleUpdateShift}
          onClose={() => setEditingShift(null)}
          employees={employees}
          shifts={shifts} // Passed state down for verification
          isEdit={true}
          accent
        />
      )}
    </div>
  );
};

export default ShiftPlanning;