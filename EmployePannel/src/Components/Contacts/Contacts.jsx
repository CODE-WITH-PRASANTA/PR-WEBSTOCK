import React, { useState, useEffect, useRef } from 'react';
import './Contacts.css';
import { 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiRotateCw, 
  FiDownload, 
  FiMail, 
  FiCalendar, 
  FiPhone, 
  FiMapPin, 
  FiEdit, 
  FiTrash2, 
  FiChevronDown, 
  FiChevronLeft, 
  FiChevronRight, 
  FiHome,
  FiX,
  FiUser,
  FiSmartphone,
  FiFileText,
  FiSmile
} from 'react-icons/fi';

const DUMMY_DATA = [
  { id: 1, name: 'John Deo', email: 'test@email.com', birthDate: '2018-02-25', mobile: '1234567890', address: 'God creature is sixth was ab...', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80', note: 'Sample note description for John Deo goes here.' },
  { id: 2, name: 'Sarah Smith', email: 'test@email.com', birthDate: '1985-04-14', mobile: '1234567890', address: 'Celeste Slater 606-3727 Ullamcorper. Street Roseville NH 11523', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&auto=format&q=80', note: 'Winged lights seed don\'t to him. Be day fish whose had that it him sea bearing abundantly greater. Behold midst had.\n\nBeginning whose man that earth, their can\'t first after which, isn\'t. Day from the.Self Promotion :)' },
  { id: 3, name: 'Edna Gilbert', email: 'test@email.com', birthDate: '1983-11-08', mobile: '1234567890', address: 'Hiroko Potter P.O. Box 887 2508 Dolor. Av. Muskegon KY 12482', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&auto=format&q=80', note: '' },
  { id: 4, name: 'Shelia Osterberg', email: 'test@email.com', birthDate: '1988-05-20', mobile: '1234567890', address: '881 Beechwood St.Beloit, WI...', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&fit=crop&auto=format&q=80', note: '' },
  { id: 5, name: 'Barbara Garland', email: 'test@email.com', birthDate: '1987-04-18', mobile: '1234567890', address: '107 Ashley Ave Lakewood, N...', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&auto=format&q=80', note: '' }
];

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  mobile: '',
  birthDate: '2026-07-01',
  address: '',
  note: ''
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Contacts = () => {
  const [contacts, setContacts] = useState(DUMMY_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedViewContact, setSelectedViewContact] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const dateInputRef = useRef(null);
  const editDateInputRef = useRef(null);

  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    name: true,
    email: true,
    birthDate: true,
    mobile: true,
    address: true,
    actions: true
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredContacts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [itemsPerPage, searchQuery, contacts, totalPages, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedContacts(paginatedContacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const handleCalendarClick = (ref) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === 'function') {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) return;

    if (editingContact) {
      setContacts(prev => prev.map(contact => 
        contact.id === editingContact.id ? { ...contact, ...formData } : contact
      ));
      setEditingContact(null);
    } else {
      const newContact = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        birthDate: formData.birthDate,
        mobile: formData.mobile,
        address: formData.address || 'N/A',
        note: formData.note || '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&auto=format&q=80'
      };
      setContacts([newContact, ...contacts]);
      setShowAddModal(false);
    }

    setFormData(INITIAL_FORM_STATE);
  };

  const handleStartEdit = (contact, e) => {
    e.stopPropagation();
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      mobile: contact.mobile,
      birthDate: contact.birthDate,
      address: contact.address,
      note: contact.note || ''
    });
  };

  const handleDeleteContact = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(prev => prev.filter(contact => contact.id !== id));
      setSelectedContacts(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete the ${selectedContacts.length} selected contact(s)?`)) {
      setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact.id)));
      setSelectedContacts([]);
    }
  };

  const handleRefreshData = () => {
    setContacts(DUMMY_DATA);
    setSearchQuery('');
    setSelectedContacts([]);
    setItemsPerPage(10); 
    setCurrentPage(1);
    setFormData(INITIAL_FORM_STATE);
    setShowColumnDropdown(false);
    setShowPageDropdown(false);
    setSelectedViewContact(null);
    setEditingContact(null);
    setVisibleColumns({
      checkbox: true,
      name: true,
      email: true,
      birthDate: true,
      mobile: true,
      address: true,
      actions: true
    });
  };

  const handleDownloadExcel = () => {
    if (contacts.length === 0) {
      alert("No data available to download.");
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Birth Date', 'Mobile', 'Address'];
    const rows = contacts.map(c => [c.id, c.name, c.email, c.birthDate, c.mobile, c.address]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "contacts_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`img-page-number-btn ${currentPage === i ? 'is-active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="img-app-workspace">
      <header className="img-header-strip">
        <h1 className="img-view-title">Contacts</h1>
        <div className="img-breadcrumb-trail">
          <FiHome className="img-icon-home" />
          <FiChevronRight className="img-crumb-arrow" />
          <span>Apps</span>
          <FiChevronRight className="img-crumb-arrow" />
          <span className="img-crumb-terminal">Contacts</span>
        </div>
      </header>

      <div className="img-data-surface">
        <div className="img-control-bar">
          <div className="img-search-tab-pill">
            <span className="img-active-pill-text">Contacts</span>
            <div className="img-input-container">
              <FiSearch className="img-search-inline-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                className="img-search-input-node"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="img-action-icon-row">
            {selectedContacts.length > 0 && (
              <button className="img-utility-btn red-accent" onClick={handleBulkDelete}>
                <FiTrash2 />
              </button>
            )}

            <div className="img-tooltip-parent-anchor">
              <button className="img-utility-btn blue-accent" onClick={() => setShowColumnDropdown(!showColumnDropdown)}>
                <FiFilter />
              </button>
              <div className="img-hover-badge-element">Filter</div>
              
              {showColumnDropdown && (
                <div className="img-column-manager-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="img-column-dropdown-header">Show/Hide Column</div>
                  <div className="img-column-dropdown-divider"></div>
                  <div className="img-column-scroll-wrapper">
                    <div className="img-scroll-arrow-up">▲</div>
                    <ul className="img-column-list-scroll">
                      {[
                        { key: 'checkbox', label: 'Checkbox' },
                        { key: 'name', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'birthDate', label: 'Birth Date' },
                        { key: 'mobile', label: 'Mobile' },
                        { key: 'address', label: 'Address' },
                        { key: 'actions', label: 'Actions' }
                      ].map((col) => (
                        <li key={col.key} className="img-column-item-node" onClick={() => toggleColumn(col.key)}>
                          <label className="img-custom-checkbox" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={visibleColumns[col.key]}
                              onChange={() => toggleColumn(col.key)}
                            />
                            <span className="img-box-checkmark"></span>
                          </label>
                          <span className="img-column-label-text">{col.label}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="img-scroll-arrow-down">▼</div>
                  </div>
                </div>
              )}
            </div>

            <div className="img-tooltip-parent-anchor">
              <button className="img-utility-btn green-accent" onClick={() => { setFormData(INITIAL_FORM_STATE); setShowAddModal(true); }}>
                <FiPlus />
              </button>
              <div className="img-hover-badge-element">Add</div>
            </div>

            <div className="img-tooltip-parent-anchor">
              <button className="img-utility-btn brown-accent" onClick={handleRefreshData}>
                <FiRotateCw />
              </button>
              <div className="img-hover-badge-element">Refresh</div>
            </div>

            <div className="img-tooltip-parent-anchor">
              <button className="img-utility-btn blue-accent" onClick={handleDownloadExcel}>
                <FiDownload />
              </button>
              <div className="img-hover-badge-element">Xlsx Download</div>
            </div>
          </div>
        </div>

        <div className="img-table-container">
          <table className="img-data-grid">
           <thead>
  <tr>
    {visibleColumns.checkbox && (
      <th className="th-checkbox">
        <label className="img-custom-checkbox">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={
              paginatedContacts.length > 0 &&
              selectedContacts.length === paginatedContacts.length
            }
          />
          <span className="img-box-checkmark"></span>
        </label>
      </th>
    )}

    {visibleColumns.name && <th>Name</th>}
    {visibleColumns.email && <th>Email</th>}
    {visibleColumns.birthDate && <th>Birth Date</th>}
    {visibleColumns.mobile && <th>Mobile</th>}
    {visibleColumns.address && <th>Address</th>}
    {visibleColumns.actions && (
      <th className="th-actions">Actions</th>
    )}
  </tr>
</thead>
            <tbody>
              {paginatedContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                    No contacts found.
                  </td>
                </tr>
              ) : (
                paginatedContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className={`clickable-row ${selectedContacts.includes(contact.id) ? 'row-selected-highlight' : ''}`}
                    onClick={() => setSelectedViewContact(contact)}
                  >
                    {visibleColumns.checkbox && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <label className="img-custom-checkbox">
                          <input 
                            type="checkbox" 
                            checked={selectedContacts.includes(contact.id)}
                            onChange={(e) => handleSelectRow(contact.id, e)}
                          />
                          <span className="img-box-checkmark"></span>
                        </label>
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td>
                        <div className="img-profile-cell-block img-table-tooltip-container">
                          <img src={contact.avatar} alt={contact.name} className="img-cell-avatar" />
                          <span className="img-cell-name-label">{contact.name}</span>
                          <div className="img-table-tooltip-text">{contact.name}</div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.email && (
                      <td>
                        <div className="img-info-cell-combo img-table-tooltip-container">
                          <FiMail className="img-field-icon variant-red" />
                          <span>{contact.email}</span>
                          <div className="img-table-tooltip-text">{contact.email}</div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.birthDate && (
                      <td>
                        <div className="img-info-cell-combo img-table-tooltip-container">
                          <FiCalendar className="img-field-icon variant-orange" />
                          <span>{contact.birthDate}</span>
                          <div className="img-table-tooltip-text">{formatDate(contact.birthDate)}</div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.mobile && (
                      <td>
                        <div className="img-info-cell-combo img-table-tooltip-container">
                          <FiPhone className="img-field-icon variant-green" />
                          <span>{contact.mobile}</span>
                          <div className="img-table-tooltip-text">{contact.mobile}</div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.address && (
                      <td>
                        <div className="img-info-cell-combo img-table-tooltip-container">
                          <FiMapPin className="img-field-icon variant-blue" />
                          <span className="img-clamped-address-text">{contact.address}</span>
                          <div className="img-table-tooltip-text">{contact.address}</div>
                        </div>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="img-action-buttons-wrap">
                          <button className="img-row-btn-action type-edit" onClick={(e) => handleStartEdit(contact, e)}><FiEdit /></button>
                          <button 
                            className="img-row-btn-action type-delete" 
                            onClick={(e) => handleDeleteContact(contact.id, e)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="img-pagination-footer-bar">
          <div className="img-per-page-selector-side">
            <span className="img-foot-label-text">Items per page:</span>
            <div className="img-dropdown-relative-anchor">
              <div className="img-dropdown-trigger" onClick={() => setShowPageDropdown(!showPageDropdown)}>
                <span>{itemsPerPage}</span>
                <FiChevronDown className="img-caret-down" />
              </div>
              {showPageDropdown && (
                <ul className="img-dropdown-absolute-menu">
                  {[5, 10, 25, 50].map((num) => (
                    <li 
                      key={num} 
                      className={`img-menu-item-node ${itemsPerPage === num ? 'is-active' : ''}`}
                      onClick={() => {
                        setItemsPerPage(num);
                        setCurrentPage(1);
                        setShowPageDropdown(false);
                      }}
                    >
                      {num}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="img-navigation-controls-side">
            <span className="img-page-counter-string">
              {totalItems === 0 ? '0 - 0' : `${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, totalItems)}`} of {totalItems}
            </span>
            <div className="img-navigation-arrow-cluster">
              <button 
                className="img-arrow-nav-trigger" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <FiChevronLeft />
              </button>
              
              <div className="img-numeric-page-container">
                {renderPageButtons()}
              </div>

              <button 
                className="img-arrow-nav-trigger" 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== ADD NEW CONTACT MODAL OVERLAY ==================== */}
      {showAddModal && (
        <div className="img-modal-blur-backdrop">
          <div className="img-contact-modal-window">
            <div className="img-modal-banner-header">
              <div className="img-modal-hdr-left">
                <div className="img-modal-avatar-placeholder">
                  <FiUser className="avatar-vector" />
                </div>
                <span className="img-modal-heading-text">New Contact</span>
              </div>
              <button className="img-modal-dismiss-btn" onClick={() => setShowAddModal(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="img-modal-form-body">
              <div className="img-form-row-twin">
                <div className="img-form-field-wrapper outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Name*</span>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="img-modal-input-element"
                  />
                  <FiUser className="img-input-trailing-icon" />
                </div>
                
                <div className="img-form-field-wrapper outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Email*</span>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="img-modal-input-element"
                  />
                  <FiMail className="img-input-trailing-icon" />
                </div>
              </div>

              <div className="img-form-row-twin">
                <div className="img-form-field-wrapper outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Mobile*</span>
                  <input 
                    type="tel" 
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleFormChange}
                    className="img-modal-input-element"
                  />
                  <FiSmartphone className="img-input-trailing-icon" />
                </div>

                <div className="img-form-field-wrapper outlined-labeled-box" onClick={() => handleCalendarClick(dateInputRef)}>
                  <span className="img-outline-fieldset-label">Birth date*</span>
                  <input 
                    type="date"
                    name="birthDate"
                    ref={dateInputRef}
                    value={formData.birthDate}
                    onChange={handleFormChange}
                    className="img-modal-input-element date-input-node"
                  />
                  <FiCalendar className="img-input-trailing-icon" />
                </div>
              </div>

              <div className="img-form-row-full">
                <div className="img-form-field-wrapper textarea-wrap outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Address</span>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="img-modal-textarea-element"
                    rows={3}
                  />
                </div>
              </div>

              <div className="img-form-row-full">
                <div className="img-form-field-wrapper textarea-wrap outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Note</span>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleFormChange}
                    className="img-modal-textarea-element"
                    rows={3}
                  />
                </div>
              </div>

              <div className="img-modal-footer-action-row legacy-footer">
                <button 
                  type="submit" 
                  className={`img-modal-action-btn-save ${(!formData.name || !formData.email || !formData.mobile) ? 'is-disabled' : ''}`}
                  disabled={!formData.name || !formData.email || !formData.mobile}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="img-modal-action-btn-cancel" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== EDIT CONTACT MODAL OVERLAY (MATCHING REFERENCE IMAGE) ==================== */}
      {editingContact && (
        <div className="img-modal-blur-backdrop">
          <div className="img-contact-modal-window reference-edit-modal">
            <div className="img-modal-banner-header reference-edit-header">
              <div className="img-modal-hdr-left">
                <img 
                  src={editingContact.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&auto=format&q=80'} 
                  alt={formData.name} 
                  className="reference-edit-avatar" 
                />
                <span className="img-modal-heading-text">Edit Contact: {editingContact.name}</span>
              </div>
              <button className="img-modal-dismiss-btn" onClick={() => setEditingContact(null)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="img-modal-form-body reference-edit-body">
              <div className="img-form-row-twin">
                <div className="img-form-field-wrapper outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Name*</span>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="img-modal-input-element"
                  />
                  <FiSmile className="img-input-trailing-icon reference-icon-color" />
                </div>
                
                <div className="img-form-field-wrapper outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Email*</span>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="img-modal-input-element"
                  />
                  <FiMail className="img-input-trailing-icon reference-icon-color" />
                </div>
              </div>

              <div className="img-form-row-twin">
                <div className="img-form-field-wrapper outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Mobile*</span>
                  <input 
                    type="tel" 
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleFormChange}
                    className="img-modal-input-element"
                  />
                  <FiSmartphone className="img-input-trailing-icon reference-icon-color" />
                </div>

                <div className="img-form-field-wrapper outlined-labeled-box" onClick={() => handleCalendarClick(editDateInputRef)}>
                  <span className="img-outline-fieldset-label">Birth date*</span>
                  <input 
                    type="date"
                    name="birthDate"
                    ref={editDateInputRef}
                    value={formData.birthDate}
                    onChange={handleFormChange}
                    className="img-modal-input-element date-input-node"
                  />
                  <FiCalendar className="img-input-trailing-icon reference-icon-color" />
                </div>
              </div>

              <div className="img-form-row-full">
                <div className="img-form-field-wrapper textarea-wrap outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Address</span>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="img-modal-textarea-element"
                    rows={3}
                  />
                </div>
              </div>

              <div className="img-form-row-full">
                <div className="img-form-field-wrapper textarea-wrap outlined-labeled-box">
                  <span className="img-outline-fieldset-label">Note</span>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleFormChange}
                    className="img-modal-textarea-element"
                    rows={3}
                  />
                </div>
              </div>

              <div className="reference-edit-footer-action-row">
                <button 
                  type="submit" 
                  className={`reference-btn-save ${(!formData.name || !formData.email || !formData.mobile) ? 'is-disabled' : ''}`}
                  disabled={!formData.name || !formData.email || !formData.mobile}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="reference-btn-cancel" 
                  onClick={() => setEditingContact(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== VIEW CONTACT DETAIL MODAL OVERLAY ==================== */}
      {selectedViewContact && !editingContact && (
        <div className="img-modal-blur-backdrop" onClick={() => setSelectedViewContact(null)}>
          <div className="screenshot-view-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="screenshot-view-header">
              <div className="screenshot-view-hdr-profile">
                <img 
                  src={selectedViewContact.avatar} 
                  alt={selectedViewContact.name} 
                  className="screenshot-view-avatar" 
                />
                <span className="screenshot-view-name">{selectedViewContact.name}</span>
              </div>
              <button className="screenshot-view-close-btn" onClick={() => setSelectedViewContact(null)}>
                <FiX />
              </button>
            </div>

            <div className="screenshot-view-body">
              <div className="screenshot-info-row">
                <FiMail className="screenshot-info-icon" />
                <span className="screenshot-info-text">{selectedViewContact.email}</span>
              </div>

              <div className="screenshot-info-row">
                <FiSmartphone className="screenshot-info-icon" />
                <span className="screenshot-info-text">{selectedViewContact.mobile}</span>
              </div>

              <div className="screenshot-info-row">
                <FiCalendar className="screenshot-info-icon" />
                <span className="screenshot-info-text">{formatDate(selectedViewContact.birthDate)}</span>
              </div>

              <div className="screenshot-info-row items-start">
                <FiMapPin className="screenshot-info-icon" />
                <span className="screenshot-info-text lh-relaxed">{selectedViewContact.address || 'N/A'}</span>
              </div>

              {selectedViewContact.note && (
                <div className="screenshot-info-row items-start note-alignment-box">
                  <FiFileText className="screenshot-info-icon" />
                  <div className="screenshot-note-paragraphs-wrap">
                    {selectedViewContact.note.split('\n\n').map((para, idx) => (
                      <p key={idx} className="screenshot-note-text-node">{para}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;