import React, { useState } from 'react';
import './Estimates.css';

const INITIAL_ESTIMATES = [
  { id: 1, eId: '589', clientName: 'Sarah Smith', mobile: '1235443210', email: 'sarah.smith@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'India', amount: '142', status: 'Accepted', details: '' },
  { id: 2, eId: '784', clientName: 'John Doe', mobile: '1234567890', email: 'john.doe@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'USA', amount: '872', status: 'Declined', details: '' },
  { id: 3, eId: '658', clientName: 'Airi Satou', mobile: '2345678901', email: 'airi.satou@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'Australia', amount: '1542', status: 'Accepted', details: '' },
  { id: 4, eId: '285', clientName: 'Angelica Ramos', mobile: '3456789012', email: 'angelica.ramos@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'Sri Lanka', amount: '9574', status: 'Declined', details: '' },
  { id: 5, eId: '458', clientName: 'Ashton Cox', mobile: '4567890123', email: 'ashton.cox@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'India', amount: '10000', status: 'Sent', details: '' },
  { id: 6, eId: '958', clientName: 'Cara Stevens', mobile: '5678901234', email: 'cara.stevens@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'Bangladesh', amount: '578', status: 'Sent', details: '' },
  { id: 7, eId: '257', clientName: 'Jacob Ryan', mobile: '6789012345', email: 'jacob.ryan@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'Sri Lanka', amount: '479', status: 'Expired', details: '' },
  { id: 8, eId: '937', clientName: 'Pooja Sarma', mobile: '7890123456', email: 'pooja.sarma@example.com', eDate: '2024-12-02', expiredDate: '2024-12-02', country: 'India', amount: '1482', status: 'Accepted', details: '' }
];

const Estimates = () => {
  const [estimates, setEstimates] = useState(INITIAL_ESTIMATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Pagination Configuration
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Column Visibility States
  const [columns, setColumns] = useState({
    checkbox: true,
    eId: true,
    clientName: true,
    mobile: true,
    email: true,
    eDate: true,
    expiredDate: true,
    country: true,
    amount: true,
    status: true,
    actions: true
  });

  // Bulk Checkbox Row Selection States
  const [selectedRows, setSelectedRows] = useState([]);

  // Form Field State Management
  const [formData, setFormData] = useState({
    eId: '',
    clientName: '',
    mobile: '',
    email: '',
    eDate: '',
    expiredDate: '',
    country: '',
    amount: '',
    status: 'Sent',
    details: ''
  });

  const handleColumnToggle = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ eId: '', clientName: '', mobile: '', email: '', eDate: '', expiredDate: '', country: '', amount: '', status: 'Sent', details: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteRow = (id) => {
    if (window.confirm("Are you sure you want to delete this estimate record?")) {
      setEstimates(prev => prev.filter(item => item.id !== id));
      setSelectedRows(prev => prev.filter(rId => rId !== id));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEstimates(prev => prev.map(item => item.id === editingId ? { ...formData } : item));
    } else {
      const newRecord = {
        ...formData,
        id: Date.now()
      };
      setEstimates(prev => [newRecord, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(displayedEstimates.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(prev => prev.filter(rId => rId !== id));
    } else {
      setSelectedRows(prev => [...prev, id]);
    }
  };

  const handleRefreshGrid = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setEstimates(INITIAL_ESTIMATES);
  };

  const filteredEstimates = estimates.filter(est =>
    est.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    est.eId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    est.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredEstimates.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEstimates = filteredEstimates.slice(startIndex, startIndex + itemsPerPage);

  const getColumnLabel = (key) => {
    switch (key) {
      case 'checkbox': return 'Checkbox';
      case 'eId': return 'E.ID';
      case 'clientName': return 'Client Name';
      case 'mobile': return 'Mobile';
      case 'email': return 'Email';
      case 'eDate': return 'E.Date';
      case 'expiredDate': return 'Expiration Date';
      case 'country': return 'Country';
      case 'amount': return 'Amount';
      case 'status': return 'Status';
      default: return key;
    }
  };

  return (
    <div className="est-dashboard-container">
      {/* Top Header Section */}
      <div className="est-top-header">
        <h2 className="est-header-title">Estimates</h2>
        <div className="est-header-breadcrumb">
          <svg className="est-breadcrumb-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="est-breadcrumb-divider">&nbsp;&gt; Projects &gt; Estimates</span>
        </div>
      </div>

      {/* Main Container Card Area */}
      <div className="est-main-card">
        <div className="est-toolbar-action-bar">
          <div className="est-toolbar-title">Estimates</div>
          
          <div className="est-toolbar-controls">
            <div className="est-search-box-wrapper">
              <span className="est-search-box-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search" 
                className="est-search-box-input"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="est-popover-container">
              <button 
                className="est-action-icon-btn" 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)} 
                title="Show/Hide Columns"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="7" y1="12" x2="17" y2="12"></line>
                  <line x1="10" y1="18" x2="14" y2="18"></line>
                </svg>
              </button>

              {showColumnDropdown && (
                <div className="est-column-picker-dropdown">
                  <div className="est-picker-header">Show/Hide Column</div>
                  <div className="est-picker-scroll-view">
                    {Object.keys(columns).filter(k => k !== 'actions').map((key) => (
                      <label key={key} className="est-picker-row-item">
                        <input 
                          type="checkbox" 
                          className="est-picker-checkbox-node"
                          checked={columns[key]} 
                          onChange={() => handleColumnToggle(key)}
                        />
                        <span className="est-picker-label-text">
                          {getColumnLabel(key)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="est-action-icon-btn est-btn-add-trigger" onClick={openAddModal} title="Add New Estimate">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            
            <button className="est-action-icon-btn" onClick={handleRefreshGrid} title="Refresh Table Grid">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
            
            <button className="est-action-icon-btn" title="Download Export File">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Table Wrapper Display */}
        <div className="est-grid-scroll-container">
          <table className="est-ui-data-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={displayedEstimates.length > 0 && displayedEstimates.every(item => selectedRows.includes(item.id))}
                    />
                  </th>
                )}
                {columns.eId && <th>E.ID</th>}
                {columns.clientName && <th>Client Name</th>}
                {columns.mobile && <th>Mobile</th>}
                {columns.email && <th>Email</th>}
                {columns.eDate && <th>E.Date</th>}
                {columns.expiredDate && <th>Expiration Date</th>}
                {columns.country && <th>Country</th>}
                {columns.amount && <th>Amount</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayedEstimates.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? 'est-row-selected-highlight' : ''}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleRowSelect(item.id)}
                      />
                    </td>
                  )}
                  {columns.eId && <td className="est-cell-bold-text">{item.eId}</td>}
                  {columns.clientName && <td>{item.clientName}</td>}
                  
                  {columns.mobile && (
                    <td>
                      <div className="est-icon-cell-align">
                        <svg className="est-cell-media-icon est-phone-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span className="est-truncate-text-node">{item.mobile}</span>
                      </div>
                    </td>
                  )}
                  
                  {columns.email && (
                    <td>
                      <div className="est-icon-cell-align">
                        <svg className="est-cell-media-icon est-mail-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span className="est-truncate-text-node">{item.email}</span>
                      </div>
                    </td>
                  )}
                  
                  {columns.eDate && (
                    <td>
                      <div className="est-icon-cell-align">
                        <svg className="est-cell-media-icon est-calendar-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{item.eDate.split('-').reverse().join('/')}</span>
                      </div>
                    </td>
                  )}

                  {columns.expiredDate && (
                    <td>
                      <div className="est-icon-cell-align">
                        <svg className="est-cell-media-icon est-calendar-color" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{item.expiredDate.split('-').reverse().join('/')}</span>
                      </div>
                    </td>
                  )}
                  
                  {columns.country && <td>{item.country}</td>}
                  {columns.amount && <td className="est-cell-bold-text">${item.amount}</td>}
                  
                  {columns.status && (
                    <td>
                      <span className={`est-status-tag est-status-tag-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}

                  {columns.actions && (
                    <td>
                      <div className="est-actions-btn-group">
                        <button className="est-action-row-trigger-edit" onClick={() => openEditModal(item)} title="Edit Entry">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                          </svg>
                        </button>
                        <button className="est-action-row-trigger-delete" onClick={() => handleDeleteRow(item.id)} title="Delete Entry">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {displayedEstimates.length === 0 && (
                <tr>
                  <td colSpan={11} className="est-table-fallback-empty">No dynamic matching estimates records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Controlled Pagination System View */}
        <div className="est-footer-paginator-wrapper">
          <div className="est-paginator-items-dropdown">
            <span className="est-paginator-dropdown-label">Items per page:</span>
            <select 
              className="est-paginator-dropdown-select" 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
            </select>
          </div>

          <div className="est-paginator-control-group">
            <span className="est-paginator-counter-text">
              {totalItems > 0 ? `${startIndex + 1} – ${Math.min(startIndex + itemsPerPage, totalItems)}` : '0'} of {totalItems}
            </span>
            <div className="est-paginator-arrow-buttons">
              <button 
                className="est-paginator-arrow-node" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                className="est-paginator-arrow-node" 
                disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)} 
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Smoothly Animated Slide-down Form Popup Modal */}
      {isModalOpen && (
        <div className="est-modal-backdrop-layer">
          <div className="est-modal-viewport-card">
            <div className="est-modal-top-header">
              <h3 className="est-modal-top-title">{editingId ? 'Edit Estimate' : 'New Estimate'}</h3>
              <button className="est-modal-top-close-btn" onClick={() => setIsModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="est-modal-form-body">
              <div className="est-modal-grid-fields">
                
                <div className="est-form-field-wrapper">
                  <input 
                    type="text" name="eId" required placeholder=" "
                    className="est-form-field-input" value={formData.eId} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Estimate Id*</label>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="text" name="clientName" required placeholder=" "
                    className="est-form-field-input" value={formData.clientName} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Client Name*</label>
                  <span className="est-form-field-inner-icon">🧑‍🦲</span>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="tel" name="mobile" required placeholder=" "
                    className="est-form-field-input" value={formData.mobile} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Mobile*</label>
                  <span className="est-form-field-inner-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="email" name="email" required placeholder=" "
                    className="est-form-field-input" value={formData.email} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Email*</label>
                  <span className="est-form-field-inner-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="date" name="eDate" required placeholder=" "
                    className="est-form-field-input est-date-input-fix" value={formData.eDate} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Estimate Date*</label>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="date" name="expiredDate" required placeholder=" "
                    className="est-form-field-input est-date-input-fix" value={formData.expiredDate} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Expired Date*</label>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="text" name="country" placeholder=" "
                    className="est-form-field-input" value={formData.country} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Country</label>
                  <span className="est-form-field-inner-icon">🏳️</span>
                </div>

                <div className="est-form-field-wrapper">
                  <input 
                    type="number" name="amount" required placeholder=" "
                    className="est-form-field-input" value={formData.amount} onChange={handleInputChange}
                  />
                  <label className="est-form-field-label">Amount*</label>
                  <span className="est-form-field-inner-icon"><strong>$</strong></span>
                </div>

                <div className="est-form-field-wrapper">
                  <select 
                    name="status" required className="est-form-field-input est-select-input-fix"
                    value={formData.status} onChange={handleInputChange}
                  >
                    <option value="Sent">Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Expired">Expired</option>
                  </select>
                  <label className="est-form-field-label">Status*</label>
                </div>
              </div>

              <div className="est-form-field-wrapper est-field-full-width">
                <textarea 
                  name="details" placeholder=" " rows="3"
                  className="est-form-field-textarea" value={formData.details} onChange={handleInputChange}
                ></textarea>
                <label className="est-form-field-label">Details</label>
              </div>

              {/* Bottom Card Form Action Control Layer */}
              <div className="est-modal-bottom-actions">
                <button type="button" className="est-modal-btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="est-modal-btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estimates;