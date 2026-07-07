import React, { useState, useMemo, useRef, useEffect } from 'react';
import './Contact.css';

// Professional dataset containing 20 distinct mock entries
const INITIAL_RECORDS = [
  { id: 1, name: "John Deo", email: "test@email.com", birthDate: "2018-02-25", mobile: "1234567890", address: "God creature is sixth row house building No. 4", note: "Sample descriptive management metadata pipeline parameters.", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 2, name: "Sarah Smith", email: "test@email.com", birthDate: "1985-04-14", mobile: "1234567890", address: "Celeste Slater 606-3727 Ullamcorper. Street Roseville NH 11523", note: "Winged lights seed don't to him.", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Edna Gilbert", email: "test@email.com", birthDate: "1983-11-08", mobile: "1234567890", address: "Hiroko Potter P.O. Box 732, 9831 Cruis St.", note: "Note information data storage text entry for test details.", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 4, name: "Shelia Osterberg", email: "test@email.com", birthDate: "1988-05-20", mobile: "1234567890", address: "881 Beechwood St. Mableton, GA 30126", note: "Prior corporate contact relations manager profile system entry.", avatar: "https://i.pravatar.cc/150?img=30" },
  { id: 5, name: "Barbara Garland", email: "test@email.com", birthDate: "1987-04-18", mobile: "1234567890", address: "107 Ashley Ave Lakewood, NJ 08701", note: "Regular account evaluation updates tracking details logs.", avatar: "https://i.pravatar.cc/150?img=28" },
  { id: 6, name: "Sarah Smith", email: "test@email.com", birthDate: "1983-11-08", mobile: "1234567890", address: "Shanti Nagar Bldg No 3, Mumbai, MH", note: "Alternative address information card indexing record details.", avatar: "https://i.pravatar.cc/150?img=23" },
  { id: 7, name: "Marie Brodsky", email: "test@email.com", birthDate: "1983-11-08", mobile: "1234567890", address: "D-178/2, Ttc Industrial Area, MIDC, Navi Mumbai", note: "Commercial client interface operational status.", avatar: "https://i.pravatar.cc/150?img=20" },
  { id: 8, name: "Kara Thompson", email: "test@email.com", birthDate: "1987-04-18", mobile: "1234567890", address: "H-6, 1st Fl., Omkar, Mumbai 400018", note: "Client contact notes for scheduling delivery logistics.", avatar: "https://i.pravatar.cc/150?img=31" },
  { id: 9, name: "Joseph Nye", email: "test@email.com", birthDate: "1988-05-20", mobile: "1234567890", address: "26, 2nd Flr, Nariman Point, Mumbai", note: "Executive director administration systems support validation profile.", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 10, name: "Ricardo Wendler", email: "test@email.com", birthDate: "1985-04-14", mobile: "1234567890", address: "1st Floor P.o. Box North Tower Complex", note: "International dispatch monitoring notes portfolio updates.", avatar: "https://i.pravatar.cc/150?img=60" },
  { id: 11, name: "Amelia Earhart", email: "amelia@domain.com", birthDate: "1991-07-24", mobile: "9876543210", address: "Harbor Line Viewway Suite 4, California", note: "Aviation logistics coordination representative details data card.", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 12, name: "David Miller", email: "miller@test.com", birthDate: "1994-12-05", mobile: "1122334455", address: "788 Pinecrest Road, Atlanta, GA", note: "Engineering support resource assignment reference log database standard.", avatar: "https://i.pravatar.cc/150?img=68" },
  { id: 13, name: "Elena Rostova", email: "elena@world.net", birthDate: "1989-09-15", mobile: "5566778899", address: "Red Square Court Block B, Moscow", note: "Strategic alignment international relations consulting team lead.", avatar: "https://i.pravatar.cc/150?img=34" },
  { id: 14, name: "Marcus Aurelius", email: "emperor@rome.edu", birthDate: "1980-04-26", mobile: "4433221100", address: "Palatine Hill Estates, Rome, Italy", note: "Philosophical research data alignment and system engineering manager.", avatar: "https://i.pravatar.cc/150?img=67" },
  { id: 15, name: "Chloe Bennett", email: "chloe@shield.gov", birthDate: "1992-04-18", mobile: "8899001122", address: "The Playground Base, Secret Location", note: "Operations field agent data sync status profile configuration checklist.", avatar: "https://i.pravatar.cc/150?img=49" },
  { id: 16, name: "Robert Downey", email: "tony@stark.com", birthDate: "1975-04-04", mobile: "3300449922", address: "10880 Malibu Point, California", note: "Principal hardware architect and development technology supervisor card.", avatar: "https://i.pravatar.cc/150?img=59" },
  { id: 17, name: "Bruce Banner", email: "hulk@labs.edu", birthDate: "1979-12-18", mobile: "7766554433", address: "Gamma Radiation Isolation Chamber, NM", note: "Bio-chemical engineering expert analysis tracking framework details.", avatar: "https://i.pravatar.cc/150?img=53" },
  { id: 18, name: "Natasha Romanoff", email: "nat@spy.org", birthDate: "1984-11-22", mobile: "9911882277", address: "Apartment 4A, Stalingrad Complex", note: "Global records safety compliance auditing system representative profile.", avatar: "https://i.pravatar.cc/150?img=27" },
  { id: 19, name: "Thor Odinson", email: "thor@asgard.io", birthDate: "1982-08-11", mobile: "2288440077", address: "Royal Palace Grounds, New Asgard", note: "Renewable power resources atmospheric generation research systems lead.", avatar: "https://i.pravatar.cc/150?img=69" },
  { id: 20, name: "Wanda Maximoff", email: "wanda@hex.net", birthDate: "1989-02-10", mobile: "6611330099", address: "616 Sherwood Drive, Westview, NJ", note: "Reality metrics engineering calibration diagnostic team controller database.", avatar: "https://i.pravatar.cc/150?img=45" }
];

const Contact = () => {
  const [contacts, setContacts] = useState(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // Visibility Controls dropdown state
  const [showHideOpen, setShowHideOpen] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true, name: true, email: true, birthDate: true, mobile: true, address: true, actions: true
  });

  // Custom Reference Style Pagination Engine States
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeDropdownOpen, setPageSizeDropdownOpen] = useState(false);

  // Modal workflows tracking
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetContact, setTargetContact] = useState(null);

  // Dialog Form Input Bindings
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', birthDate: '', address: '', note: '' });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const columnMenuRef = useRef(null);
  const selectTriggerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (columnMenuRef.current && !columnMenuRef.current.contains(e.target)) setShowHideOpen(false);
      if (selectTriggerRef.current && !selectTriggerRef.current.contains(e.target)) setPageSizeDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filtering Matrix Logic
  const filteredContacts = useMemo(() => {
    return contacts.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.includes(searchQuery)
    );
  }, [contacts, searchQuery]);

  // Compute Active Pagination Parameters
  const totalItems = filteredContacts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  
  const paginatedContacts = useMemo(() => {
    return filteredContacts.slice(startIndex, startIndex + pageSize);
  }, [filteredContacts, startIndex, pageSize]);

  // Bulk Names Row Toggles Selection Systems
  const handleSelectAllToggle = () => {
    const visibleIds = paginatedContacts.map(c => c.id);
    const allSelectedOnPage = visibleIds.every(id => selectedIds.includes(id));
    if (allSelectedOnPage) {
      setSelectedIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleRowSelectToggle = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // Add / Edit Context Hooks
  const triggerAddModal = () => {
    setFormData({ name: '', email: '', mobile: '', birthDate: '2026-07-06', address: '', note: '' });
    setAddModalOpen(true);
  };

  const executeCreateContact = (e) => {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      ...formData,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    setContacts(prev => [newRecord, ...prev]);
    setAddModalOpen(false);
  };

  const triggerEditModal = (contact) => {
    setTargetContact(contact);
    setFormData({ ...contact });
    setEditModalOpen(true);
  };

  const executeUpdateContact = (e) => {
    e.preventDefault();
    setContacts(prev => prev.map(item => item.id === targetContact.id ? { ...item, ...formData } : item));
    setEditModalOpen(false);
  };

  const triggerDeleteModal = (contact) => {
    setTargetContact(contact);
    setDeleteModalOpen(true);
  };

  const executeDeleteContact = () => {
    setContacts(prev => prev.filter(item => item.id !== targetContact.id));
    setSelectedIds(prev => prev.filter(id => id !== targetContact.id));
    setDeleteModalOpen(false);
  };

  const handleRefreshGrid = () => {
    setSearchQuery("");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleExportToExcel = () => {
    const headers = "Name,Email,Birth Date,Mobile,Address,Notes\n";
    const dataRows = contacts.map(c => `"${c.name}","${c.email}","${c.birthDate}","${c.mobile}","${c.address}","${c.note}"`).join("\n");
    const blob = new Blob([headers + dataRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "contacts_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="contacts-container">
      {/* Structural Header and Breadcrumbs */}
      <div className="contacts-header">
        <h2>Contacts</h2>
        <div className="breadcrumb">
          <a href="#home" className="breadcrumb-home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </a>
          <span>&gt;</span>
          <span>Apps</span>
          <span>&gt;</span>
          <span style={{ color: '#111827', fontWeight: 500 }}>Contacts</span>
        </div>
      </div>

      {/* Main Container Card View */}
      <div className="contacts-card">
        
        {/* Upper Control Bar Elements */}
        <div className="toolbar">
          <div className="search-box">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="action-buttons">
            {/* 1. Show/Hide Menu Action Dropdown */}
            <div className="tooltip-wrapper" ref={columnMenuRef}>
              <button className="icon-btn" onClick={() => setShowHideOpen(!showHideOpen)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              </button>
              <div className="custom-tooltip-box">Show/Hide Column</div>
              
              {showHideOpen && (
                <div className="column-toggle-menu">
                  <div className="column-toggle-header">Show/Hide Column</div>
                  {Object.keys(columns).map((colKey) => (
                    <label key={colKey} className="column-toggle-item">
                      <input 
                        type="checkbox" 
                        checked={columns[colKey]} 
                        onChange={() => setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }))}
                      />
                      <span style={{ textTransform: 'capitalize' }}>{colKey === 'birthDate' ? 'Birth Date' : colKey}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Add New Action Button */}
            <div className="tooltip-wrapper">
              <button className="icon-btn" style={{ borderColor: '#22c55e', color: '#22c55e' }} onClick={triggerAddModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <div className="custom-tooltip-box">Add</div>
            </div>

            {/* 3. Refresh Action Button */}
            <div className="tooltip-wrapper">
              <button className="icon-btn" onClick={handleRefreshGrid}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              </button>
              <div className="custom-tooltip-box">Refresh</div>
            </div>

            {/* 4. Download Export XLSX Action Button */}
            <div className="tooltip-wrapper">
              <button className="icon-btn" onClick={handleExportToExcel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
              <div className="custom-tooltip-box">Download</div>
            </div>
          </div>
        </div>

        {/* Dense Professional Table Layout */}
        <div className="table-responsive">
          <table className="contacts-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: '48px' }}>
                    <input 
                      type="checkbox" 
                      className="row-checkbox"
                      checked={paginatedContacts.length > 0 && paginatedContacts.every(c => selectedIds.includes(c.id))}
                      onChange={handleSelectAllToggle}
                    />
                  </th>
                )}
                {columns.name && <th>Name</th>}
                {columns.email && <th>Email</th>}
                {columns.birthDate && <th>Birth Date</th>}
                {columns.mobile && <th>Mobile</th>}
                {columns.address && <th>Address</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedContacts.length > 0 ? (
                paginatedContacts.map((contact) => {
                  const isSelected = selectedIds.includes(contact.id);
                  return (
                    <tr key={contact.id} className={isSelected ? "selected-row" : ""}>
                      {columns.checkbox && (
                        <td>
                          <input 
                            type="checkbox" 
                            className="row-checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelectToggle(contact.id)}
                          />
                        </td>
                      )}
                      
                      {columns.name && (
                        <td>
                          <div className="profile-cell hover-preview-wrapper">
                            <img src={contact.avatar} alt={contact.name} className="avatar" />
                            <span style={{ fontWeight: '500', color: '#111827' }}>{contact.name}</span>
                            <div className="hover-preview-card">{contact.name}</div>
                          </div>
                        </td>
                      )}

                      {columns.email && (
                        <td>
                          <div className="cell-content-with-icon hover-preview-wrapper">
                            <span className="cell-icon" style={{ color: '#ef4444' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </span>
                            <span>{contact.email}</span>
                            <div className="hover-preview-card">{contact.email}</div>
                          </div>
                        </td>
                      )}

                      {columns.birthDate && (
                        <td>
                          <div className="cell-content-with-icon">
                            <span className="cell-icon" style={{ color: '#b45309' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </span>
                            <span>{contact.birthDate}</span>
                          </div>
                        </td>
                      )}

                      {columns.mobile && (
                        <td>
                          <div className="cell-content-with-icon hover-preview-wrapper">
                            <span className="cell-icon" style={{ color: '#10b981' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </span>
                            <span>{contact.mobile}</span>
                            <div className="hover-preview-card">{contact.mobile}</div>
                          </div>
                        </td>
                      )}

                      {columns.address && (
                        <td>
                          <div className="cell-content-with-icon hover-preview-wrapper">
                           
                            <span style={{ maxWidth: '180px', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {contact.address}
                            </span>
                            <div className="hover-preview-card">{contact.address}</div>
                          </div>
                        </td>
                      )}

                      {columns.actions && (
                        <td>
                          <div className="actions-cell">
                            <button className="btn-action-trigger edit-type" onClick={() => triggerEditModal(contact)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
                            </button>
                            <button className="btn-action-trigger delete-type" onClick={() => triggerDeleteModal(contact)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                    No matching records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Standardized Reference Pagination Footer Section */}
        <div className="pagination-container">
          <div className="items-per-page-selector">
            <span>Items per page:</span>
            <div className={`custom-select-container ${pageSizeDropdownOpen ? 'open' : ''}`} ref={selectTriggerRef}>
              <div className="custom-select-trigger" onClick={() => setPageSizeDropdownOpen(!pageSizeDropdownOpen)}>
                <span>{pageSize}</span>
                <span style={{ fontSize: '9px', color: '#64748b' }}>▼</span>
              </div>
              
              {pageSizeDropdownOpen && (
                <div className="dropdown-options-box">
                  {[5, 10, 25, 50, 100].map((size) => (
                    <div 
                      key={size} 
                      className={`dropdown-opt ${pageSize === size ? 'selected' : ''}`}
                      onClick={() => {
                        setPageSize(size);
                        setCurrentPage(1);
                        setPageSizeDropdownOpen(false);
                      }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pagination-navigation">
            <span>
              {totalItems > 0 ? `${startIndex + 1}–${Math.min(startIndex + pageSize, totalItems)}` : '0'} of {totalItems}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="tooltip-wrapper">
                <button 
                  className="pagination-arrow-btn" 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div className="custom-tooltip-box" style={{ bottom: '-38px' }}>Previous page</div>
              </div>

              <div className="tooltip-wrapper">
                <button 
                  className="pagination-arrow-btn" 
                  disabled={currentPage === totalPages || totalItems === 0} 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div className="custom-tooltip-box" style={{ bottom: '-38px' }}>Next page</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Entry Modals Platform (Add & Edit workflows) */}
      {(addModalOpen || editModalOpen) && (
        <div className="modal-backdrop">
          <div className="modal-window">
            <div className="modal-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {addModalOpen ? 'New Contact' : 'Edit Contact'}
              </h3>
              <button className="modal-close-btn" onClick={() => { setAddModalOpen(false); setEditModalOpen(false); setCalendarOpen(false); }}>×</button>
            </div>
            
            <form onSubmit={addModalOpen ? executeCreateContact : executeUpdateContact}>
              <div className="modal-form-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name*</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} 
                      />
                      <span className="input-field-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email*</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                      />
                      <span className="input-field-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Mobile*</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        required 
                        value={formData.mobile} 
                        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))} 
                      />
                      <span className="input-field-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Birth date*</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        required 
                        readOnly
                        value={formData.birthDate} 
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span className="input-field-icon" style={{ cursor: 'pointer' }} onClick={() => setCalendarOpen(!calendarOpen)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </span>
                    </div>

                    {/* Styled Reference Calendar Panel Component */}
                    {calendarOpen && (
                      <div className="custom-datepicker-container">
                        <div className="calendar-header-switch">
                          <div className="calendar-header-title">
                            <span>2026 JUL</span>
                            <span style={{ fontSize: '8px' }}>▼</span>
                          </div>
                          <div className="calendar-arrows">
                            <span>&lt;</span>
                            <span>&gt;</span>
                          </div>
                        </div>
                        <div className="calendar-grid-days">
                          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="calendar-day-label">{d}</div>)}
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <div 
                              key={day} 
                              className={`calendar-clickable-day ${day === 6 ? 'active-day' : ''}`}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, birthDate: `2026-07-${day < 10 ? '0' + day : day}` }));
                                setCalendarOpen(false);
                              }}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group form-group-full">
                  <label>Address</label>
                  <div className="input-with-icon-wrapper">
                    <textarea 
                      value={formData.address} 
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} 
                    />
                  </div>
                </div>

                <div className="form-group form-group-full">
                  <label>Note</label>
                  <div className="input-with-icon-wrapper">
                    <textarea 
                      value={formData.note} 
                      onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))} 
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions-footer">
                <button type="button" className="btn-secondary" onClick={() => { setAddModalOpen(false); setEditModalOpen(false); setCalendarOpen(false); }}>Cancel</button>
                <button type="submit" className="btn-submit-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Window Context Engine (Delete Dialog Box Layout) */}
      {deleteModalOpen && (
        <div className="modal-backdrop">
          <div className="confirm-modal-window">
            <h4 className="confirm-title">Are you sure?</h4>
            <div className="confirm-details">
              <div>Name: {targetContact?.name}</div>
              <div>Email: {targetContact?.email}</div>
              <div>Mobile: {targetContact?.mobile}</div>
            </div>
            <div className="confirm-footer-btns">
              <button className="btn-confirm-delete" onClick={executeDeleteContact}>Delete</button>
              <button className="btn-confirm-cancel" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;