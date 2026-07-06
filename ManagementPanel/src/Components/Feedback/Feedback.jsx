import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Plus,
  RefreshCw,
  Download,
  X,
  Calendar,
  Pencil,
  Trash2,
  User,
  Users,
  MessageSquare,
  UserPlus,
} from 'lucide-react';
import './Feedback.css';

/* ------------------------------------------------------------------ */
/*  Static config                                                      */
/* ------------------------------------------------------------------ */

const COLUMN_CONFIG = [
  { key: 'checkbox', label: 'Checkbox', defaultVisible: true },
  { key: 'id', label: 'ID', defaultVisible: false },
  { key: 'employeeName', label: 'Employee Name', defaultVisible: true },
  { key: 'reviewer', label: 'Reviewer', defaultVisible: true },
  { key: 'feedbackDate', label: 'Feedback Date', defaultVisible: true },
  { key: 'feedbackType', label: 'Feedback Type', defaultVisible: true },
  { key: 'rating', label: 'Rating', defaultVisible: true },
  { key: 'status', label: 'Status', defaultVisible: true },
  { key: 'actions', label: 'Actions', defaultVisible: true },
];

const RATING_OPTIONS = ['Excellent', 'Good', 'Average', 'Poor'];
const TYPE_OPTIONS = ['Peer', 'Manager', 'Self'];
const STATUS_OPTIONS = ['Active', 'Archived'];
const PAGE_SIZE_OPTIONS = [5, 10, 25, 100];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

const AVATAR_PALETTE = [
  '4f46e5', '0ea5e9', '16a34a', 'db2777', 'ea580c',
  '7c3aed', '0891b2', 'ca8a04', 'be123c', '059669',
  '2563eb', '9333ea', '65a30d', 'e11d48', '0d9488',
];

const avatarUrl = (name, color) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&bold=true&size=64`;

const NAMES = [
  'John Doe', 'Sarah Smith', 'Michael Brown', 'Emily Davis', 'Robert Wilson',
  'Jennifer Lee', 'David Miller', 'Lisa Wang', 'Kevin Jones', 'Amy Chen',
  'Olivia Turner', 'Daniel Kim', 'Priya Patel', 'Mark Johnson', 'Grace Lee',
];
const REVIEWERS = [
  'Sarah Smith', 'Michael Brown', 'Emily Davis', 'Robert Wilson', 'John Doe',
  'Sarah Smith', 'Michael Brown', 'Emily Davis', 'Robert Wilson', 'John Doe',
  'Sarah Smith', 'Michael Brown', 'Emily Davis', 'Robert Wilson', 'John Doe',
];
const DATES = [
  '2026-01-05', '2026-01-08', '2025-12-28', '2026-01-12', '2026-01-15',
  '2026-01-18', '2026-01-20', '2026-01-22', '2026-01-25', '2026-01-28',
  '2026-01-30', '2026-02-02', '2026-02-04', '2026-02-06', '2026-02-08',
];
const TYPES = [
  'Peer', 'Manager', 'Peer', 'Manager', 'Peer',
  'Manager', 'Peer', 'Manager', 'Peer', 'Manager',
  'Peer', 'Manager', 'Peer', 'Manager', 'Peer',
];
const RATINGS = [
  'Excellent', 'Good', 'Excellent', 'Average', 'Excellent',
  'Good', 'Average', 'Excellent', 'Good', 'Excellent',
  'Good', 'Excellent', 'Average', 'Good', 'Excellent',
];
const STATUSES = [
  'Active', 'Active', 'Archived', 'Active', 'Active',
  'Active', 'Active', 'Active', 'Active', 'Active',
  'Active', 'Active', 'Archived', 'Active', 'Active',
];
const CONTENTS = [
  'Always helpful and proactive.',
  'Delivers consistent, high quality work.',
  'Great collaborator, needs more initiative.',
  'Meets expectations most of the time.',
  'Excellent communicator across teams.',
  'Positive attitude, dependable teammate.',
  'Solid performance, room to grow.',
  'Goes above and beyond on every task.',
  'Reliable and detail oriented.',
  'Outstanding leadership on recent project.',
  'Adapts quickly to changing priorities.',
  'Consistently exceeds sprint goals.',
  'Needs closer follow up on deadlines.',
  'Strong mentor to newer team members.',
  'Very responsive and easy to work with.',
];

const INITIAL_DATA = NAMES.map((name, i) => ({
  id: i + 1,
  name,
  avatar: avatarUrl(name, AVATAR_PALETTE[i % AVATAR_PALETTE.length]),
  reviewer: REVIEWERS[i],
  feedbackDate: DATES[i],
  feedbackType: TYPES[i],
  rating: RATINGS[i],
  status: STATUSES[i],
  content: CONTENTS[i],
}));

const EMPTY_FORM = {
  employeeName: '',
  reviewer: '',
  feedbackDate: '',
  feedbackType: '',
  rating: '',
  status: '',
  content: '',
};

const FIELD_LABELS = {
  employeeName: 'Employee name',
  reviewer: 'Reviewer',
  feedbackDate: 'Feedback date',
  feedbackType: 'Feedback type',
  rating: 'Rating',
  status: 'Status',
  content: 'Content',
};

function formatDisplayDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

/* ------------------------------------------------------------------ */
/*  Small reusable pieces                                              */
/* ------------------------------------------------------------------ */

function IconButton({ className, tooltip, onClick, children }) {
  return (
    <div className="Feedback-tooltip-container">
      <button type="button" className={className} onClick={onClick} aria-label={tooltip}>
        {children}
      </button>
     
    </div>
  );
}

function MiniCalendar({ value, onSelect, onClose }) {
  const base = value ? new Date(`${value}T00:00:00`) : new Date();
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [viewMonth, setViewMonth] = useState(base.getMonth());
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDayIndex; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  let selectedDay = null;
  if (value) {
    const sel = new Date(`${value}T00:00:00`);
    if (sel.getFullYear() === viewYear && sel.getMonth() === viewMonth) {
      selectedDay = sel.getDate();
    }
  }

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };
  const pick = (d) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    onSelect(`${viewYear}-${mm}-${dd}`);
  };

  return (
    <div className="Feedback-custom-calendar" ref={ref}>
      <div className="Feedback-calendar-header">
        <span>{viewYear} {MONTHS[viewMonth]}</span>
        <div className="Feedback-calendar-nav">
          <button type="button" onClick={goPrev} aria-label="Previous month">
            <ChevronLeft size={14} />
          </button>
          <button type="button" onClick={goNext} aria-label="Next month">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="Feedback-calendar-days-grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="Feedback-calendar-day-head">{w}</div>
        ))}
        {cells.map((d, i) =>
          d ? (
            <div
              key={i}
              className={`Feedback-calendar-day-cell${d === selectedDay ? ' active-day' : ''}`}
              onClick={() => pick(d)}
            >
              {d}
            </div>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const Feedback = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const [columnsVisible, setColumnsVisible] = useState(
    COLUMN_CONFIG.reduce((acc, c) => ({ ...acc, [c.key]: c.defaultVisible }), {})
  );
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const columnMenuRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------------- close column dropdown on outside click --------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (columnMenuRef.current && !columnMenuRef.current.contains(e.target)) {
        setShowColumnMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------------- search + pagination ----------------------------- */
  const filteredData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      [row.name, row.reviewer, row.feedbackType, row.rating, row.status]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [data, searchTerm]);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const rangeStart = totalItems === 0 ? 0 : startIndex + 1;
  const rangeEnd = Math.min(startIndex + itemsPerPage, totalItems);

  /* ---------------- selection ---------------------------------------- */
  const allOnPageSelected =
    paginatedData.length > 0 && paginatedData.every((row) => selectedIds.has(row.id));

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        paginatedData.forEach((row) => next.delete(row.id));
      } else {
        paginatedData.forEach((row) => next.add(row.id));
      }
      return next;
    });
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* ---------------- refresh -------------------------------------------- */
  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchTerm('');
    setSelectedIds(new Set());
    setCurrentPage(1);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  /* ---------------- xlsx export (client-side CSV as a drop-in stand-in) */
  const handleDownload = () => {
    const visibleCols = COLUMN_CONFIG.filter(
      (c) => columnsVisible[c.key] && c.key !== 'checkbox' && c.key !== 'actions'
    );
    const header = visibleCols.map((c) => c.label).join(',');
    const rows = filteredData.map((row) =>
      visibleCols
        .map((c) => {
          if (c.key === 'id') return row.id;
          if (c.key === 'employeeName') return row.name;
          if (c.key === 'feedbackDate') return formatDisplayDate(row.feedbackDate);
          return row[c.key] ?? '';
        })
        .join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'feedback-list.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------- modal (add / edit) --------------------------------- */
  const openAddModal = () => {
    setModalMode('add');
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setErrors({});
    setShowCalendar(false);
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setModalMode('edit');
    setEditingId(row.id);
    setFormData({
      employeeName: row.name,
      reviewer: row.reviewer,
      feedbackDate: row.feedbackDate,
      feedbackType: row.feedbackType,
      rating: row.rating,
      status: row.status,
      content: row.content,
    });
    setErrors({});
    setShowCalendar(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setShowCalendar(false);
  };

  const setField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const isFormComplete = Object.values(formData).every((v) => v && v.trim() !== '');

  const validate = () => {
    const nextErrors = {};
    Object.keys(EMPTY_FORM).forEach((key) => {
      if (!formData[key] || !formData[key].trim()) {
        nextErrors[key] = `${FIELD_LABELS[key]} is required`;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (modalMode === 'add') {
      const nextId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      const color = AVATAR_PALETTE[nextId % AVATAR_PALETTE.length];
      setData((prev) => [
        ...prev,
        {
          id: nextId,
          name: formData.employeeName,
          avatar: avatarUrl(formData.employeeName, color),
          reviewer: formData.reviewer,
          feedbackDate: formData.feedbackDate,
          feedbackType: formData.feedbackType,
          rating: formData.rating,
          status: formData.status,
          content: formData.content,
        },
      ]);
    } else {
      setData((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? {
                ...row,
                name: formData.employeeName,
                avatar: avatarUrl(formData.employeeName, AVATAR_PALETTE[row.id % AVATAR_PALETTE.length]),
                reviewer: formData.reviewer,
                feedbackDate: formData.feedbackDate,
                feedbackType: formData.feedbackType,
                rating: formData.rating,
                status: formData.status,
                content: formData.content,
              }
            : row
        )
      );
    }
    closeModal();
  };

  /* ---------------- delete ---------------------------------------------- */
  const requestDelete = (row) => setDeleteTarget(row);
  const cancelDelete = () => setDeleteTarget(null);
  const confirmDelete = () => {
    setData((prev) => prev.filter((row) => row.id !== deleteTarget.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(deleteTarget.id);
      return next;
    });
    setDeleteTarget(null);
  };

  const col = (key) => columnsVisible[key];

  return (
    <div className="Feedback-container">
      {/* Header */}
      <div className="Feedback-header">
        <h2>Feedback</h2>
        <div className="Feedback-breadcrumb">
          <Home size={16} />
          <ChevronRight size={14} className="Feedback-arrow" />
          <span>Performance</span>
          <ChevronRight size={14} className="Feedback-arrow" />
          <span>Feedback</span>
        </div>
      </div>

      <div className="Feedback-card">
        {/* Toolbar */}
        <div className="Feedback-toolbar">
          <div className="Feedback-search-box">
            <span className="Feedback-title-label">Feedback List</span>
            <div className="Feedback-search-input-wrapper">
              <Search size={14} className="Feedback-search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="Feedback-action-buttons" ref={columnMenuRef}>
            <IconButton
              className="Feedback-btn-col"
              tooltip="Show/Hide column"
              onClick={() => setShowColumnMenu((s) => !s)}
            >
              <SlidersHorizontal size={18} />
            </IconButton>

            <IconButton className="Feedback-btn-add" tooltip="Add" onClick={openAddModal}>
              <Plus size={20} />
            </IconButton>

            <IconButton className="Feedback-btn-refresh" tooltip="Refresh" onClick={handleRefresh}>
              <RefreshCw size={17} className={isRefreshing ? 'Feedback-spin' : ''} />
            </IconButton>

            <IconButton className="Feedback-btn-download" tooltip="Xlsx Download" onClick={handleDownload}>
              <Download size={17} />
            </IconButton>

            {showColumnMenu && (
              <div className="Feedback-col-dropdown">
                <div className="Feedback-dropdown-header">Show/Hide Column</div>
                <div className="Feedback-dropdown-body">
                  {COLUMN_CONFIG.map((c) => (
                    <label className="Feedback-dropdown-item" key={c.key}>
                      <input
                        type="checkbox"
                        checked={columnsVisible[c.key]}
                        onChange={() =>
                          setColumnsVisible((prev) => ({ ...prev, [c.key]: !prev[c.key] }))
                        }
                      />
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="Feedback-table-wrapper">
          <table className="Feedback-table">
            <thead>
              <tr>
                {col('checkbox') && (
                  <th style={{ width: 40 }}>
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={toggleSelectAll}
                      aria-label="Select all rows on this page"
                    />
                  </th>
                )}
                {col('id') && <th>ID</th>}
                {col('employeeName') && <th>Employee Name</th>}
                {col('reviewer') && <th>Reviewer</th>}
                {col('feedbackDate') && <th>Feedback Date</th>}
                {col('feedbackType') && <th>Feedback Type</th>}
                {col('rating') && <th>Rating</th>}
                {col('status') && <th>Status</th>}
                {col('actions') && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id} className={selectedIds.has(row.id) ? 'Feedback-row-selected' : ''}>
                  {col('checkbox') && (
                    <td data-label="">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => toggleSelectRow(row.id)}
                        aria-label={`Select ${row.name}`}
                      />
                    </td>
                  )}
                  {col('id') && <td data-label="ID">{row.id}</td>}
                  {col('employeeName') && (
                    <td data-label="Employee Name">
                      <div className="Feedback-profile-cell">
                        <img src={row.avatar} alt={row.name} className="Feedback-avatar" />
                        <span>{row.name}</span>
                      </div>
                    </td>
                  )}
                  {col('reviewer') && <td data-label="Reviewer">{row.reviewer}</td>}
                  {col('feedbackDate') && (
                    <td data-label="Feedback Date">
                      <span className="Feedback-date-badge">
                        <Calendar size={12} />
                        {formatDisplayDate(row.feedbackDate)}
                      </span>
                    </td>
                  )}
                  {col('feedbackType') && <td data-label="Feedback Type">{row.feedbackType}</td>}
                  {col('rating') && <td data-label="Rating">{row.rating}</td>}
                  {col('status') && (
                    <td data-label="Status">
                      <span
                        className={`Feedback-status-badge ${row.status === 'Active' ? 'active' : 'archived'
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  )}
                  {col('actions') && (
                    <td data-label="Actions">
                      <div className="Feedback-row-actions">
                        <button
                          type="button"
                          className="Feedback-action-edit"
                          onClick={() => openEditModal(row)}
                          aria-label={`Edit ${row.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          className="Feedback-action-delete"
                          onClick={() => requestDelete(row)}
                          aria-label={`Delete ${row.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={COLUMN_CONFIG.length} style={{ textAlign: 'center', padding: '32px' }}>
                    No feedback records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="Feedback-pagination-bar">
          <div className="Feedback-items-per-page">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="Feedback-pagination-info">
            <span>{rangeStart} – {rangeEnd} of {totalItems}</span>
            <div className="Feedback-pagination-arrows">
              <IconButton
                className=""
                tooltip="Previous page"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <span style={{ opacity: currentPage === 1 ? 0.4 : 1, pointerEvents: currentPage === 1 ? 'none' : 'auto' }}>
                  <ChevronLeft size={16} />
                </span>
              </IconButton>
              <IconButton
                className=""
                tooltip="Next page"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <span style={{ opacity: currentPage === totalPages ? 0.4 : 1, pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}>
                  <ChevronRight size={16} />
                </span>
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <div className="Feedback-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="Feedback-modal-box">
            <div className="Feedback-modal-header">
              <div className="Feedback-modal-title">
                {modalMode === 'edit' ? (
                  <img
                    src={data.find((d) => d.id === editingId)?.avatar}
                    alt=""
                    className="Feedback-modal-avatar"
                  />
                ) : (
                  <span className="Feedback-modal-icon-avatar">
                    <UserPlus size={15} />
                  </span>
                )}
                <span>{modalMode === 'edit' ? formData.employeeName : 'New Feedback'}</span>
              </div>
              <button type="button" className="Feedback-modal-close" onClick={closeModal} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="Feedback-modal-body">
              <div className="Feedback-form-grid">
                <div className={`Feedback-form-group${errors.employeeName ? ' has-error' : ''}`}>
                  <label>Employee Name*</label>
                  <div className="Feedback-input-icon-wrapper">
                    <input
                      type="text"
                      placeholder="Employee Name*"
                      value={formData.employeeName}
                      onChange={(e) => setField('employeeName', e.target.value)}
                    />
                    <User size={16} className="Feedback-field-icon" />
                  </div>
                  {errors.employeeName && <span className="Feedback-error-msg">{errors.employeeName}</span>}
                </div>

                <div className={`Feedback-form-group${errors.reviewer ? ' has-error' : ''}`}>
                  <label>Reviewer*</label>
                  <div className="Feedback-input-icon-wrapper">
                    <input
                      type="text"
                      placeholder="Reviewer*"
                      value={formData.reviewer}
                      onChange={(e) => setField('reviewer', e.target.value)}
                    />
                    <Users size={16} className="Feedback-field-icon" />
                  </div>
                  {errors.reviewer && <span className="Feedback-error-msg">{errors.reviewer}</span>}
                </div>

                <div className={`Feedback-form-group${errors.feedbackDate ? ' has-error' : ''}`}>
                  <label>Feedback Date*</label>
                  <div className="Feedback-input-icon-wrapper">
                    <input
                      type="text"
                      readOnly
                      placeholder="Feedback Date*"
                      value={formData.feedbackDate}
                      onClick={() => setShowCalendar((s) => !s)}
                    />
                    <Calendar
                      size={16}
                      className="Feedback-field-icon Feedback-field-icon-clickable"
                      onClick={() => setShowCalendar((s) => !s)}
                    />
                  </div>
                  {showCalendar && (
                    <MiniCalendar
                      value={formData.feedbackDate}
                      onSelect={(iso) => {
                        setField('feedbackDate', iso);
                        setShowCalendar(false);
                      }}
                      onClose={() => setShowCalendar(false)}
                    />
                  )}
                  {errors.feedbackDate && <span className="Feedback-error-msg">{errors.feedbackDate}</span>}
                </div>

                <div className={`Feedback-form-group${errors.feedbackType ? ' has-error' : ''}`}>
                  <label>Feedback Type*</label>
                  <div className="Feedback-select-wrapper">
                    <select
                      value={formData.feedbackType}
                      onChange={(e) => setField('feedbackType', e.target.value)}
                    >
                      <option value="" disabled>Feedback Type*</option>
                      {TYPE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="Feedback-field-icon" />
                  </div>
                  {errors.feedbackType && <span className="Feedback-error-msg">{errors.feedbackType}</span>}
                </div>

                <div className={`Feedback-form-group${errors.rating ? ' has-error' : ''}`}>
                  <label>Rating*</label>
                  <div className="Feedback-select-wrapper">
                    <select value={formData.rating} onChange={(e) => setField('rating', e.target.value)}>
                      <option value="" disabled>Rating*</option>
                      {RATING_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="Feedback-field-icon" />
                  </div>
                  {errors.rating && <span className="Feedback-error-msg">{errors.rating}</span>}
                </div>

                <div className={`Feedback-form-group${errors.status ? ' has-error' : ''}`}>
                  <label>Status*</label>
                  <div className="Feedback-select-wrapper">
                    <select value={formData.status} onChange={(e) => setField('status', e.target.value)}>
                      <option value="" disabled>Status*</option>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="Feedback-field-icon" />
                  </div>
                  {errors.status && <span className="Feedback-error-msg">{errors.status}</span>}
                </div>

                <div className={`Feedback-form-group full-width${errors.content ? ' has-error' : ''}`}>
                  <label>Content*</label>
                  <div className="Feedback-input-icon-wrapper">
                    <textarea
                      placeholder="Content*"
                      rows={3}
                      value={formData.content}
                      onChange={(e) => setField('content', e.target.value)}
                    />
                    <MessageSquare size={16} className="Feedback-field-icon Feedback-field-icon-top" />
                  </div>
                  {errors.content && <span className="Feedback-error-msg">{errors.content}</span>}
                </div>
              </div>

              <div className="Feedback-modal-footer">
                <button
                  type="button"
                  className={`Feedback-modal-btn-save${isFormComplete ? ' is-active' : ''}`}
                  onClick={handleSave}
                >
                  Save
                </button>
                <button type="button" className="Feedback-modal-btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="Feedback-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && cancelDelete()}>
          <div className="Feedback-delete-box">
            <h3>Are you sure?</h3>
            <div className="Feedback-delete-body-details">
              <p><strong>Employee Name:</strong> {deleteTarget.name}</p>
              <p><strong>Reviewer:</strong> {deleteTarget.reviewer}</p>
              <p><strong>Feedback Type:</strong> {deleteTarget.feedbackType}</p>
            </div>
            <div className="Feedback-delete-footer-buttons">
              <button type="button" className="Feedback-delete-btn-confirm" onClick={confirmDelete}>
                Delete
              </button>
              <button type="button" className="Feedback-delete-btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
