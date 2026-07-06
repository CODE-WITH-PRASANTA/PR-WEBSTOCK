import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Leads.css';

// --- Icons (SVG Inline representations matching layout specifications) ---
const IconHome = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconFilter = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5c59cc" strokeWidth="2.5"><path d="M4 6h16M6 12h12M9 18h6"/></svg>;
const IconAdd = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>;
const IconRefresh = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0522d" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19"/></svg>;
const IconDownload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4D77FF" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
const IconEmail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e04f1a" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconPhone = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IconEdit = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7e5bef" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconDelete = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;

// --- Form Group Field Icons ---
const FieldIconUser = () => <span className="field-icon-glyph">👤</span>;
const FieldIconDept = () => <span className="field-icon-glyph">💼</span>;
const FieldIconRole = () => <span className="field-icon-glyph">🏳️</span>;
const FieldIconProj = () => <span className="field-icon-glyph">🔍</span>;
const FieldIconPhoneInput = () => <span className="field-icon-glyph">📞</span>;
const FieldIconMailInput = () => <span className="field-icon-glyph">✉️</span>;

const INITIAL_DATA = [
  { id: 1, name: 'John Doe', email: 'test@email.com', role: 'Project Manager', mobile: '1234567890', department: 'Java', project: 'Hospital Management', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
  { id: 2, name: 'Sarah Smith', email: 'test@email.com', role: 'Team Leader', mobile: '1234567890', department: 'Designing', project: 'Android Shopping App', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
  { id: 3, name: 'Rajesh', email: 'test@email.com', role: 'Team Leader', mobile: '1234567890', department: 'Marketing', project: 'School Website', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 4, name: 'Jay Soni', email: 'test@email.com', role: 'Project Manager', mobile: '1234567890', department: 'Java', project: 'iOS Chatting App', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 5, name: 'Rajesh Kumar', email: 'test@email.com', role: 'Team Leader', mobile: '1234567890', department: 'Accounting', project: 'Java Software', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 6, name: 'Jane Doe', email: 'test@email.com', role: 'Team Leader', mobile: '1234567890', department: 'Developing', project: 'Bootstrap Template', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 7, name: 'Cara Stevens', email: 'test@email.com', role: 'Project Manager', mobile: '1234567890', department: 'Testing', project: 'PHP Website', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { id: 8, name: 'Jay Soni', email: 'test@email.com', role: 'Team Leader', mobile: '1234567890', department: 'Testing', project: 'Dating Website', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 9, name: 'Angelica Ramos', email: 'test@email.com', role: 'Project Manager', mobile: '1234567890', department: 'Java', project: 'Vegetable Shop App', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150' },
  { id: 10, name: 'Airi Satou', email: 'test@email.com', role: 'Team Leader', mobile: '1234567890', department: 'Designing', project: 'Accounting Software', avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150' },
  { id: 11, name: 'Ashton Cox', email: 'ashton@email.com', role: 'Developer', mobile: '9876543210', department: 'Developing', project: 'E-Commerce Framework', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
  { id: 12, name: 'Bradley Greer', email: 'bradley@email.com', role: 'UI Engineer', mobile: '4561237890', department: 'Designing', project: 'Figma to Code Converter', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150' },
  { id: 13, name: 'Brenden Wagner', email: 'brenden@email.com', role: 'QA Lead', mobile: '7891234560', department: 'Testing', project: 'Automation Testsuite', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
];

const COLUMNS_DEFINITION = [
  { key: 'checkbox', label: 'Checkbox' },
  { key: 'name', label: 'Employee Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'department', label: 'Department' },
  { key: 'project', label: 'Project' },
  { key: 'actions', label: 'Actions' }
];

export default function Leads() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, name: true, email: true, role: true, mobile: true, department: true, project: true, actions: true
  });

  const [modalMode, setModalMode] = useState(null); 
  const [formState, setFormState] = useState({ id: null, name: '', department: '', role: '', project: '', mobile: '', email: '' });

  const filterMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideInteraction(e) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setShowColumnsMenu(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideInteraction);
    return () => document.removeEventListener('mousedown', handleOutsideInteraction);
  }, []);

  const filteredRows = useMemo(() => {
    return data.filter(row => {
      const targetString = `${row.name} ${row.email} ${row.role} ${row.department} ${row.project} ${row.mobile}`.toLowerCase();
      return targetString.includes(search.toLowerCase());
    });
  }, [data, search]);

  const totalCount = filteredRows.length;
  const maxPageCount = Math.ceil(totalCount / itemsPerPage) || 1;
  
  const pagedRecords = useMemo(() => {
    const skipOffset = (currentPage - 1) * itemsPerPage;
    return filteredRows.slice(skipOffset, skipOffset + itemsPerPage);
  }, [filteredRows, currentPage, itemsPerPage]);

  const offsetStart = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const offsetEnd = Math.min(currentPage * itemsPerPage, totalCount);

  const isAllPageSelected = useMemo(() => {
    if (pagedRecords.length === 0) return false;
    return pagedRecords.every(r => selectedRowIds[r.id]);
  }, [pagedRecords, selectedRowIds]);

  const handleTogglePageMasterSelect = () => {
    const nextState = { ...selectedRowIds };
    if (isAllPageSelected) {
      pagedRecords.forEach(r => { nextState[r.id] = false; });
    } else {
      pagedRecords.forEach(r => { nextState[r.id] = true; });
    }
    setSelectedRowIds(nextState);
  };

  const handleToggleSingleRowSelect = (id) => {
    setSelectedRowIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const execRefreshGrid = () => {
    setSearch('');
    setCurrentPage(1);
    setData(INITIAL_DATA);
    setSelectedRowIds({});
  };

  const execSpreadsheetDownload = () => {
    alert(`Initiating download stream for ${totalCount} operational lead rows successfully.`);
  };

  const launchCreateModal = () => {
    setFormState({ id: null, name: '', department: '', role: '', project: '', mobile: '', email: '' });
    setModalMode('create');
  };

  const launchEditModal = (record) => {
    setFormState({ ...record });
    setModalMode('edit');
  };

  const handleCommitFormChanges = (e) => {
    e.preventDefault();
    if (modalMode === 'edit') {
      setData(prev => prev.map(item => item.id === formState.id ? { ...item, ...formState } : item));
    } else {
      const uniqueId = Date.now();
      const mockAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
      setData(prev => [{ id: uniqueId, avatar: mockAvatar, ...formState }, ...prev]);
    }
    setModalMode(null);
  };

  const handleRemoveRecord = (id) => {
    if (window.confirm("Are you sure you want to drop this record row?")) {
      setData(prev => prev.filter(r => r.id !== id));
    }
  };

  const isFormValid = formState.name && formState.department && formState.role && formState.project && formState.mobile && formState.email;

  return (
    <div className="ld-workspace-wrapper">
      <div className="ld-structural-crumb-line">
        <h2 className="ld-main-heading">Leads</h2>
        <div className="ld-trail-box">
          <IconHome />
          <span className="ld-chevron-char">&gt;</span>
          <span className="ld-node-text">Admin</span>
          <span className="ld-chevron-char">&gt;</span>
          <span className="ld-node-text active-node">Leads</span>
        </div>
      </div>

      <div className="ld-board-surface">
        <div className="ld-action-toolbar-row">
          <div className="ld-toolbar-left-dock">
            <span className="ld-badge-label">Leads</span>
            <div className="ld-input-lens-wrapper">
              <IconSearch />
              <input 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="ld-search-element"
              />
            </div>
          </div>

          <div className="ld-toolbar-right-dock">
            <div className="ld-dropdown-anchor" ref={filterMenuRef}>
              <button 
                className={`ld-circle-icon-btn ${showColumnsMenu ? 'active-control' : ''}`}
                onClick={() => setShowColumnsMenu(!showColumnsMenu)}
                title="Show/Hide Column Layout"
              >
                <IconFilter />
              </button>

              <div className={`ld-filter-popover-card ${showColumnsMenu ? 'popover-open' : ''}`}>
                <div className="ld-popover-title">Show/Hide Column</div>
                <div className="ld-popover-body-scroller">
                  {COLUMNS_DEFINITION.map(col => (
                    <label key={col.key} className="ld-popover-checkbox-row">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col.key]}
                        onChange={() => setVisibleColumns(prev => ({ ...prev, [col.key]: !prev[col.key] }))}
                      />
                      <span className="ld-popover-label-text">{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button className="ld-circle-icon-btn color-add" onClick={launchCreateModal} title="Create New Lead">
              <IconAdd />
            </button>
            
            <button className="ld-circle-icon-btn color-refresh" onClick={execRefreshGrid} title="Refresh Table State">
              <IconRefresh />
            </button>
            
            <button className="ld-circle-icon-btn color-download" onClick={execSpreadsheetDownload} title="Export Xlsx Data Sheet">
              <IconDownload />
            </button>
          </div>
        </div>

        <div className="ld-table-responsive-scroller">
          <table className="ld-table-engine">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th className="ld-th-checkbox-cell">
                    <label className="ld-table-checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={isAllPageSelected}
                        onChange={handleTogglePageMasterSelect}
                      />
                      <span className="ld-styled-checkbox-node"></span>
                    </label>
                  </th>
                )}
                {visibleColumns.name && <th>Employee Name</th>}
                {visibleColumns.email && <th>Email</th>}
                {visibleColumns.role && <th>Role</th>}
                {visibleColumns.mobile && <th>Mobile</th>}
                {visibleColumns.department && <th>Department</th>}
                {visibleColumns.project && <th>Project</th>}
                {visibleColumns.actions && <th className="ld-th-actions-cell">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {pagedRecords.length > 0 ? (
                pagedRecords.map((row) => (
                  <tr key={row.id} className={selectedRowIds[row.id] ? 'ld-row-selected-state' : ''}>
                    {visibleColumns.checkbox && (
                      <td>
                        <label className="ld-table-checkbox-container">
                          <input 
                            type="checkbox" 
                            checked={!!selectedRowIds[row.id]}
                            onChange={() => handleToggleSingleRowSelect(row.id)}
                          />
                          <span className="ld-styled-checkbox-node"></span>
                        </label>
                      </td>
                    )}

                    {visibleColumns.name && (
                      <td>
                        <div className="ld-identity-flex-cell">
                          <div className="ld-avatar-hover-wrapper">
                            <img src={row.avatar} alt={row.name} className="ld-identity-avatar-img" />
                            <div className="ld-avatar-hover-tooltip">{row.name}</div>
                          </div>
                          <span className="ld-identity-name-string">{row.name}</span>
                        </div>
                      </td>
                    )}

                    {visibleColumns.email && (
                      <td>
                        <div className="ld-icon-text-flex-cell">
                          <IconEmail />
                          <span className="ld-cell-value-text">{row.email}</span>
                        </div>
                      </td>
                    )}

                    {visibleColumns.role && <td><span className="ld-cell-value-text">{row.role}</span></td>}

                    {visibleColumns.mobile && (
                      <td>
                        <div className="ld-icon-text-flex-cell">
                          <IconPhone />
                          <span className="ld-cell-value-text">{row.mobile}</span>
                        </div>
                      </td>
                    )}

                    {visibleColumns.department && <td><span className="ld-cell-value-text">{row.department}</span></td>}

                    {visibleColumns.project && <td><span className="ld-cell-value-text">{row.project}</span></td>}

                    {visibleColumns.actions && (
                      <td>
                        <div className="ld-actions-cluster-flex">
                          <button className="ld-action-inline-trigger text-edit" onClick={() => launchEditModal(row)} title="Modify Row">
                            <IconEdit />
                          </button>
                          <button className="ld-action-inline-trigger text-delete" onClick={() => handleRemoveRecord(row.id)} title="Purge Row">
                            <IconDelete />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMNS_DEFINITION.filter(c => visibleColumns[c.key]).length} className="ld-empty-fallback-cell">
                    No matching operational leads records located.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="ld-pagination-footer-dock">
          <div className="ld-pagination-controls-cluster">
            <span className="ld-pagination-text-tag">Items per page:</span>
            <div className="ld-select-element-wrapper">
              <select 
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="ld-footer-select-native"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>

            <span className="ld-pagination-range-string">
              {offsetStart} – {offsetEnd} of {totalCount}
            </span>

            <div className="ld-arrow-nav-group">
              <button 
                className="ld-arrow-nav-trigger"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <button 
                className="ld-arrow-nav-trigger"
                onClick={() => setCurrentPage(p => Math.min(p + 1, maxPageCount))}
                disabled={currentPage === maxPageCount}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalMode && (
        <div className="ld-dialog-backdrop-layer">
          <div className="ld-dialog-window-box">
            <div className="ld-dialog-title-banner">
              <div className="ld-dialog-header-identity-left">
                {modalMode === 'edit' ? (
                  <>
                    <img src={formState.avatar} alt="" className="ld-dialog-avatar-thumb" />
                    <h3>Edit Leads: {formState.name}</h3>
                  </>
                ) : (
                  <>
                    <div className="ld-dialog-avatar-fallback">👤</div>
                    <h3>New Leads</h3>
                  </>
                )}
              </div>
              <button className="ld-dialog-close-cross-btn" onClick={() => setModalMode(null)}>&times;</button>
            </div>

            <form onSubmit={handleCommitFormChanges} className="ld-dialog-form-body">
              <div className="ld-form-fields-grid-engine">
                <div className="ld-floating-form-group">
                  <div className="ld-field-input-box-row">
                    <input 
                      type="text" 
                      placeholder=" " 
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <label>Name*</label>
                    <FieldIconUser />
                  </div>
                </div>

                <div className="ld-floating-form-group">
                  <div className="ld-field-input-box-row">
                    <input 
                      type="text" 
                      placeholder=" " 
                      value={formState.department}
                      onChange={(e) => setFormState(prev => ({ ...prev, department: e.target.value }))}
                      required
                    />
                    <label>Department*</label>
                    <FieldIconDept />
                  </div>
                </div>

                <div className="ld-floating-form-group">
                  <div className="ld-field-input-box-row">
                    <input 
                      type="text" 
                      placeholder=" " 
                      value={formState.role}
                      onChange={(e) => setFormState(prev => ({ ...prev, role: e.target.value }))}
                      required
                    />
                    <label>Role*</label>
                    <FieldIconRole />
                  </div>
                </div>

                <div className="ld-floating-form-group">
                  <div className="ld-field-input-box-row">
                    <input 
                      type="text" 
                      placeholder=" " 
                      value={formState.project}
                      onChange={(e) => setFormState(prev => ({ ...prev, project: e.target.value }))}
                      required
                    />
                    <label>Project*</label>
                    <FieldIconProj />
                  </div>
                </div>

                <div className="ld-floating-form-group">
                  <div className="ld-field-input-box-row">
                    <input 
                      type="text" 
                      placeholder=" " 
                      value={formState.mobile}
                      onChange={(e) => setFormState(prev => ({ ...prev, mobile: e.target.value }))}
                      required
                    />
                    <label>Mobile*</label>
                    <FieldIconPhoneInput />
                  </div>
                </div>

                <div className="ld-floating-form-group">
                  <div className="ld-field-input-box-row">
                    <input 
                      type="email" 
                      placeholder=" " 
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    <label>Email*</label>
                    <FieldIconMailInput />
                  </div>
                </div>
              </div>

              <div className="ld-dialog-actions-footer">
                <button 
                  type="submit" 
                  className={`ld-btn-action-trigger state-save ${!isFormValid ? 'disabled-save-btn' : ''}`}
                  disabled={!isFormValid}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="ld-btn-action-trigger state-cancel" 
                  onClick={() => setModalMode(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}