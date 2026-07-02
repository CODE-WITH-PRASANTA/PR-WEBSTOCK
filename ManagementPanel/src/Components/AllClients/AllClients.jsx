import React, { useState } from 'react';
import './AllClients.css';
import { 
  FaSearch, FaFilter, FaPlus, FaSync, FaDownload, 
  FaPhoneAlt, FaEnvelope, FaChevronLeft, FaChevronRight,
  FaEdit, FaTrashAlt, FaTimes
} from 'react-icons/fa';

const AllClients = () => {
  // --- Initial Clean Dataset ---
  const [clients, setClients] = useState([
    { id: 1, name: 'Ashton Cox', mobile: '1234567890', email: 'test@email.com', company: 'ABC Infotech', currency: 'euro', billing: 'Hourly User Rate', contactPerson: 'John Doe', contactPhone: '1234567892', status: 'Active', contract: true, address: '123 Main St, Cityville, ST' },
    { id: 2, name: 'Sarah Smith', mobile: '1234567890', email: 'test@email.com', company: 'xyz software', currency: 'euro', billing: 'Fixed Price', contactPerson: 'Jane Smith', contactPhone: '2345678901', status: 'Inactive', contract: false, address: '456 Elm St, Townsville, ST' },
    { id: 3, name: 'Airi Satou', mobile: '1234567890', email: 'test@email.com', company: 'Hello It Solution', currency: 'rupee', billing: 'Hourly Job Rate', contactPerson: 'Tom Brown', contactPhone: '3456789012', status: 'Active', contract: false, address: '789 Oak St, Village, ST' },
    { id: 4, name: 'Jay Soni', mobile: '1234567890', email: 'test@email.com', company: 'Jk prime', currency: 'dollar', billing: 'Hourly Job Rate', contactPerson: 'Lisa White', contactPhone: '4567890123', status: 'Active', contract: false, address: '321 Pine St, Metropolis, ST' },
    { id: 5, name: 'Rajesh', mobile: '1234567890', email: 'test@email.com', company: 'JR Infra', currency: 'dollar', billing: 'Hourly User Rate', contactPerson: 'Raj Kumar', contactPhone: '5678901234', status: 'Active', contract: false, address: '654 Maple St, Capital, ST' }
  ]);

  // --- UI Control States ---
  const [selectedClients, setSelectedClients] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals Core State Toggle
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  // Modular Form States
  const [formFields, setFormFields] = useState({
    name: '', mobile: '', email: '', company: '', currency: 'dollar',
    billing: 'Fixed Price', contactPerson: '', contactPhone: '',
    status: 'Active', contract: '', notes: '', address: ''
  });

  // --- Dynamic Column Visibility Registry (Direct Mirror of Image 2) ---
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    id: false,
    clientName: true,
    mobile: true,
    email: true,
    companyName: true,
    currency: true,
    billingMethod: true,
    contactPerson: true,
    contactPhone: true,
    status: true,
    contract: true,
    address: true,
    actions: true
  });

  const columnsFriendlyNames = {
    checkbox: 'Checkbox',
    id: 'ID',
    clientName: 'Client Name',
    mobile: 'Mobile',
    email: 'Email',
    companyName: 'Company Name',
    currency: 'Currency',
    billingMethod: 'Billing Method',
    contactPerson: 'Contact Person',
    contactPhone: 'Contact Phone',
    status: 'Status',
    contract: 'Contract',
    address: 'Address',
    actions: 'Actions'
  };

  // --- Action Event Handlers ---
  const toggleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(c => c.id));
    }
  };

  const toggleSelectRow = (id) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter(item => item !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const toggleColumn = (key) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenAdd = () => {
    setFormFields({
      name: '', mobile: '', email: '', company: '', currency: 'dollar',
      billing: 'Fixed Price', contactPerson: '', contactPhone: '',
      status: 'Active', contract: '', notes: '', address: ''
    });
    setShowAddModal(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setClients([...clients, { id: Date.now(), ...formFields, contract: !!formFields.contract }]);
    setShowAddModal(false);
  };

  const handleOpenEdit = (client) => {
    setCurrentClient(client);
    setFormFields({ ...client, contract: client.contract ? 'contract1.pdf' : '' });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setClients(clients.map(c => c.id === currentClient.id ? { ...c, ...formFields, contract: !!formFields.contract } : c));
    setShowEditModal(false);
  };

  const handleOpenDelete = (client) => {
    setCurrentClient(client);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setClients(clients.filter(c => c.id !== currentClient.id));
    setSelectedClients(selectedClients.filter(id => id !== currentClient.id));
    setShowDeleteModal(false);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="AllClients-container">
      
      {/* Header Path Navigation Row */}
      <div className="AllClients-header-row">
        <h1 className="AllClients-title">All Clients</h1>
        <div className="AllClients-breadcrumbs">
          <span className="AllClients-home-icon">🏠</span>
          <span className="AllClients-arrow">&gt;</span>
          <span>Clients</span>
          <span className="AllClients-arrow">&gt;</span>
          <span className="AllClients-active-path">All Clients</span>
        </div>
      </div>

      {/* Main Table Interface Board Card */}
      <div className="AllClients-board-card">
        
        {/* Upper Functional Action Sub-Header */}
        <div className="AllClients-top-bar">
          <div className="AllClients-bar-left">
            <button className="AllClients-tag-pill">All Clients</button>
            <div className="AllClients-search-box">
              <FaSearch className="AllClients-search-lens" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="AllClients-bar-right">
            {/* Filter Toggle Control Switch */}
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)} 
              className={`AllClients-tool-btn ${showFilterDropdown ? 'active' : ''}`}
            >
              <FaFilter />
            </button>

            {/* HIGH-ACCURACY DROP-DOWN BOX - REPLICATED FROM IMAGE 2 */}
            {showFilterDropdown && (
              <div className="AllClients-column-filter-popup">
                <div className="AllClients-popup-title">Show/Hide Column</div>
                <div className="AllClients-popup-scroll-area">
                  {Object.keys(visibleColumns).map((colKey) => (
                    <label key={colKey} className="AllClients-popup-row">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[colKey]} 
                        onChange={() => toggleColumn(colKey)}
                      />
                      <span className="AllClients-popup-text">{columnsFriendlyNames[colKey]}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleOpenAdd} className="AllClients-tool-btn AllClients-btn-green">
              <FaPlus />
            </button>
            <button onClick={() => setSearchTerm('')} className="AllClients-tool-btn">
              <FaSync />
            </button>
            <button className="AllClients-tool-btn">
              <FaDownload />
            </button>
          </div>
        </div>

        {/* Matrix Table Responsive Frame Viewports */}
        <div className="AllClients-responsive-grid">
          <table className="AllClients-data-matrix">
            <thead>
              <tr>
                {visibleColumns.checkbox && <th className="AllClients-col-cb"><input type="checkbox" checked={filteredClients.length > 0 && selectedClients.length === filteredClients.length} onChange={toggleSelectAll} /></th>}
                {visibleColumns.id && <th>ID</th>}
                {visibleColumns.clientName && <th>CLIENT NAME</th>}
                {visibleColumns.mobile && <th>MOBILE</th>}
                {visibleColumns.email && <th>EMAIL</th>}
                {visibleColumns.companyName && <th>COMPANY NAME</th>}
                {visibleColumns.currency && <th>CURRENCY</th>}
                {visibleColumns.billingMethod && <th>BILLING METHOD</th>}
                {visibleColumns.contactPerson && <th>CONTACT PERSON</th>}
                {visibleColumns.contactPhone && <th>CONTACT PHONE</th>}
                {visibleColumns.status && <th>STATUS</th>}
                {visibleColumns.contract && <th className="AllClients-center">CONTRACT</th>}
                {visibleColumns.address && <th>ADDRESS</th>}
                {visibleColumns.actions && <th className="AllClients-center">ACTIONS</th>}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  {visibleColumns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedClients.includes(client.id)} 
                        onChange={() => toggleSelectRow(client.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.id && <td className="AllClients-id-text">{client.id}</td>}
                  {visibleColumns.clientName && (
                    <td>
                      <div className="AllClients-profile-pack">
                        <div className="AllClients-avatar-circle">{client.name.charAt(0)}</div>
                        <div className="AllClients-profile-name">{client.name}</div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.mobile && <td><div className="AllClients-cell-flex"><FaPhoneAlt className="AllClients-icon-green" /> {client.mobile}</div></td>}
                  {visibleColumns.email && <td><div className="AllClients-cell-flex"><FaEnvelope className="AllClients-icon-red" /> {client.email}</div></td>}
                  {visibleColumns.companyName && <td>{client.company}</td>}
                  {visibleColumns.currency && <td className="AllClients-capitalize">{client.currency}</td>}
                  {visibleColumns.billingMethod && <td>{client.billing}</td>}
                  {visibleColumns.contactPerson && <td>{client.contactPerson}</td>}
                  {visibleColumns.contactPhone && <td>{client.contactPhone}</td>}
                  {visibleColumns.status && (
                    <td>
                      <span className={`AllClients-badge ${client.status.toLowerCase()}`}>
                        {client.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.contract && (
                    <td className="AllClients-center">
                      {client.contract ? <FaDownload className="AllClients-download-trigger" /> : <span className="AllClients-dash-line">-</span>}
                    </td>
                  )}
                  {visibleColumns.address && <td className="AllClients-address-fade">{client.address}, ST</td>}
                  {visibleColumns.actions && (
                    <td>
                      <div className="AllClients-actions-block">
                        <button onClick={() => handleOpenEdit(client)} className="AllClients-act-btn AllClients-edit" title="Edit"><FaEdit /></button>
                        <button onClick={() => handleOpenDelete(client)} className="AllClients-act-btn AllClients-delete" title="Delete"><FaTrashAlt /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Matrix Footer Row */}
        <div className="AllClients-pagination-footer">
          <div>Showing 1 to {filteredClients.length} of {filteredClients.length} clients</div>
          <div className="AllClients-pagination-controls">
            <button className="AllClients-arrow-btn" disabled><FaChevronLeft /></button>
            <button className="AllClients-arrow-btn" disabled><FaChevronRight /></button>
          </div>
        </div>
      </div>

      {/* --- ADD CLIENT MODAL DIALOG POPUP --- */}
      {showAddModal && (
        <div className="AllClients-modal-overlay">
          <div className="AllClients-modal-container">
            <div className="AllClients-modal-banner AllClients-indigo">
              <div className="AllClients-modal-headline">
                <div className="AllClients-circle-avatar-placeholder">👤</div>
                <h3>New Client</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="AllClients-modal-close-cross"><FaTimes /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="AllClients-modal-inner-form">
              <div className="AllClients-inputs-double-grid">
                <div className="AllClients-field-set"><label>Name*</label><input type="text" required value={formFields.name} onChange={(e) => setFormFields({...formFields, name: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Mobile*</label><input type="text" required value={formFields.mobile} onChange={(e) => setFormFields({...formFields, mobile: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Email*</label><input type="email" required value={formFields.email} onChange={(e) => setFormFields({...formFields, email: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Company Name*</label><input type="text" required value={formFields.company} onChange={(e) => setFormFields({...formFields, company: e.target.value})} /></div>
                <div className="AllClients-field-set">
                  <label>Currency*</label>
                  <select value={formFields.currency} onChange={(e) => setFormFields({...formFields, currency: e.target.value})}>
                    <option value="dollar">dollar</option>
                    <option value="euro">euro</option>
                    <option value="rupee">rupee</option>
                  </select>
                </div>
                <div className="AllClients-field-set">
                  <label>Billing Method*</label>
                  <select value={formFields.billing} onChange={(e) => setFormFields({...formFields, billing: e.target.value})}>
                    <option value="Fixed Price">Fixed Price</option>
                    <option value="Hourly User Rate">Hourly User Rate</option>
                    <option value="Hourly Job Rate">Hourly Job Rate</option>
                  </select>
                </div>
                <div className="AllClients-field-set"><label>Contact Person*</label><input type="text" required value={formFields.contactPerson} onChange={(e) => setFormFields({...formFields, contactPerson: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Contact Phone*</label><input type="text" required value={formFields.contactPhone} onChange={(e) => setFormFields({...formFields, contactPhone: e.target.value})} /></div>
                <div className="AllClients-field-set">
                  <label>Status</label>
                  <select value={formFields.status} onChange={(e) => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="AllClients-field-set"><label>Contract Document</label><input type="text" value={formFields.contract} onChange={(e) => setFormFields({...formFields, contract: e.target.value})} /></div>
              </div>
              <div className="AllClients-field-set AllClients-full-row"><label>Notes</label><textarea rows="2" value={formFields.notes} onChange={(e) => setFormFields({...formFields, notes: e.target.value})} /></div>
              <div className="AllClients-field-set AllClients-full-row"><label>Address</label><textarea rows="2" value={formFields.address} onChange={(e) => setFormFields({...formFields, address: e.target.value})} /></div>
              <div className="AllClients-modal-footer-actions">
                <button type="submit" className="AllClients-modal-action-btn AllClients-save-blue">Save</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="AllClients-modal-action-btn AllClients-cancel-red">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT CLIENT MODAL DIALOG POPUP --- */}
      {showEditModal && (
        <div className="AllClients-modal-overlay">
          <div className="AllClients-modal-container">
            <div className="AllClients-modal-banner AllClients-indigo">
              <div className="AllClients-modal-headline">
                <div className="AllClients-circle-avatar-placeholder">{formFields.name ? formFields.name.charAt(0) : 'E'}</div>
                <h3>Edit {formFields.name}</h3>
              </div>
              <button onClick={() => setShowEditModal(false)} className="AllClients-modal-close-cross"><FaTimes /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="AllClients-modal-inner-form">
              <div className="AllClients-inputs-double-grid">
                <div className="AllClients-field-set"><label>Name*</label><input type="text" required value={formFields.name} onChange={(e) => setFormFields({...formFields, name: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Mobile*</label><input type="text" required value={formFields.mobile} onChange={(e) => setFormFields({...formFields, mobile: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Email*</label><input type="email" required value={formFields.email} onChange={(e) => setFormFields({...formFields, email: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Company Name*</label><input type="text" required value={formFields.company} onChange={(e) => setFormFields({...formFields, company: e.target.value})} /></div>
                <div className="AllClients-field-set">
                  <label>Currency*</label>
                  <select value={formFields.currency} onChange={(e) => setFormFields({...formFields, currency: e.target.value})}>
                    <option value="dollar">dollar</option>
                    <option value="euro">euro</option>
                    <option value="rupee">rupee</option>
                  </select>
                </div>
                <div className="AllClients-field-set">
                  <label>Billing Method*</label>
                  <select value={formFields.billing} onChange={(e) => setFormFields({...formFields, billing: e.target.value})}>
                    <option value="Fixed Price">Fixed Price</option>
                    <option value="Hourly User Rate">Hourly User Rate</option>
                    <option value="Hourly Job Rate">Hourly Job Rate</option>
                  </select>
                </div>
                <div className="AllClients-field-set"><label>Contact Person*</label><input type="text" required value={formFields.contactPerson} onChange={(e) => setFormFields({...formFields, contactPerson: e.target.value})} /></div>
                <div className="AllClients-field-set"><label>Contact Phone*</label><input type="text" required value={formFields.contactPhone} onChange={(e) => setFormFields({...formFields, contactPhone: e.target.value})} /></div>
                <div className="AllClients-field-set">
                  <label>Status</label>
                  <select value={formFields.status} onChange={(e) => setFormFields({...formFields, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="AllClients-field-set"><label>Contract Document</label><input type="text" value={formFields.contract} onChange={(e) => setFormFields({...formFields, contract: e.target.value})} /></div>
              </div>
              <div className="AllClients-field-set AllClients-full-row"><label>Notes</label><textarea rows="2" value={formFields.notes} onChange={(e) => setFormFields({...formFields, notes: e.target.value})} /></div>
              <div className="AllClients-field-set AllClients-full-row"><label>Address</label><textarea rows="2" value={formFields.address} onChange={(e) => setFormFields({...formFields, address: e.target.value})} /></div>
              <div className="AllClients-modal-footer-actions">
                <button type="submit" className="AllClients-modal-action-btn AllClients-save-blue">Save</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="AllClients-modal-action-btn AllClients-cancel-red">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETION CONFIRM OVERLAY --- */}
      {showDeleteModal && currentClient && (
        <div className="AllClients-modal-overlay">
          <div className="AllClients-alert-box animate-popup">
            <h3 className="AllClients-alert-heading">Are you sure?</h3>
            <div className="AllClients-alert-summary">
              <p><span>Name:</span> {currentClient.name}</p>
              <p><span>Company name:</span> {currentClient.company}</p>
              <p><span>Email:</span> {currentClient.email}</p>
            </div>
            <div className="AllClients-alert-buttons">
              <button onClick={handleDeleteConfirm} className="AllClients-pill-btn AllClients-confirm-bg-red">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="AllClients-pill-btn AllClients-cancel-bg-blue">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllClients;