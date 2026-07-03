import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRefreshCw, FiDownload, 
  FiEdit3, FiTrash2, FiX, FiCalendar, FiUser, FiDollarSign 
} from 'react-icons/fi';
import './AccPayments.css';

const initialData = [
  { id: '201', clientId: 'C101', name: 'Alice Johnson', invoiceId: 'INV001', date: '2023-09-01', amount: '150', method: 'Credit Card', txId: 'TXN12345', status: 'Completed', currency: 'USD', description: 'Payment for consulting services' },
  { id: '202', clientId: 'C102', name: 'Bob Smith', invoiceId: 'INV002', date: '2023-09-02', amount: '200', method: 'Bank Transfer', txId: 'TXN12346', status: 'Pending', currency: 'USD', description: '' },
  { id: '203', clientId: 'C103', name: 'Charlie Davis', invoiceId: 'INV003', date: '2023-09-03', amount: '350', method: 'PayPal', txId: 'TXN12347', status: 'Completed', currency: 'USD', description: '' },
  { id: '204', clientId: 'C104', name: 'Dana Lee', invoiceId: 'INV004', date: '2023-09-04', amount: '250', method: 'Credit Card', txId: 'TXN12348', status: 'Failed', currency: 'USD', description: '' },
  { id: '205', clientId: 'C105', name: 'Evan White', invoiceId: 'INV005', date: '2023-09-05', amount: '180', method: 'Debit Card', txId: 'TXN12349', status: 'Completed', currency: 'USD', description: '' },
  { id: '206', clientId: 'C106', name: 'Fiona Green', invoiceId: 'INV006', date: '2023-09-06', amount: '220', method: 'PayPal', txId: 'TXN12350', status: 'Completed', currency: 'USD', description: '' },
  { id: '207', clientId: 'C107', name: 'George Harris', invoiceId: 'INV007', date: '2023-09-07', amount: '300', method: 'Credit Card', txId: 'TXN12351', status: 'Completed', currency: 'USD', description: '' },
  { id: '208', clientId: 'C108', name: 'Hannah Brown', invoiceId: 'INV008', date: '2023-09-08', amount: '275', method: 'Bank Transfer', txId: 'TXN12352', status: 'Completed', currency: 'USD', description: '' },
  { id: '209', clientId: 'C109', name: 'Ian Miller', invoiceId: 'INV009', date: '2023-09-09', amount: '400', method: 'Credit Card', txId: 'TXN12353', status: 'Completed', currency: 'USD', description: '' },
  { id: '210', clientId: 'C110', name: 'Julia Wilson', invoiceId: 'INV010', date: '2023-09-10', amount: '500', method: 'PayPal', txId: 'TXN12354', status: 'Completed', currency: 'USD', description: '' }
];

const AccPayments = () => {
  const [payments, setPayments] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Column visibility state (Matches Ref Images 2 & 3)
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true,
    paymentId: true,
    clientId: true,
    clientName: true,
    invoiceId: true,
    paymentDate: true,
    paymentAmount: true,
    paymentMethod: true,
    transactionId: true,
    paymentStatus: true,
    currency: false,
    description: false,
    createdAt: false,
    updatedAt: false,
    actions: true
  });

  // Modal Control States
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [activePayment, setActivePayment] = useState(null);

  // Form Fields State
  const [formFields, setFormFields] = useState({
    name: '', invoiceId: '', date: '', amount: '', method: '', txId: '', status: '', currency: 'USD', description: ''
  });

  // Search Logic
  const filteredPayments = payments.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.includes(searchQuery) ||
    p.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Checkbox Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredPayments.map(p => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleColumn = (colName) => {
    setColumns(prev => ({ ...prev, [colName]: !prev[colName] }));
  };

  // Open Actions Modals
  const openAddModal = () => {
    setFormFields({ name: '', invoiceId: '', date: '', amount: '', method: '', txId: '', status: '', currency: 'USD', description: '' });
    setModalType('add');
  };

  const openEditModal = (payment) => {
    setActivePayment(payment);
    setFormFields({
      name: payment.name, invoiceId: payment.invoiceId, date: payment.date,
      amount: payment.amount, method: payment.method, txId: payment.txId,
      status: payment.status, currency: payment.currency || 'USD', description: payment.description || ''
    });
    setModalType('edit');
  };

  const openDeleteModal = (payment) => {
    setActivePayment(payment);
    setModalType('delete');
  };

  // Crud Action Handlers
  const handleSave = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newPayment = {
        id: String(200 + payments.length + 1),
        clientId: `C${100 + payments.length + 1}`,
        ...formFields
      };
      setPayments([...payments, newPayment]);
    } else if (modalType === 'edit') {
      setPayments(payments.map(p => p.id === activePayment.id ? { ...p, ...formFields } : p));
    }
    setModalType(null);
  };

  const handleDelete = () => {
    setPayments(payments.filter(p => p.id !== activePayment.id));
    setModalType(null);
  };

  return (
    <div className="AccPayments-container">
      {/* Top Header Breadcrumb */}
      <div className="AccPayments-header-nav">
        <span className="AccPayments-title">Client Payment</span>
        <div className="AccPayments-breadcrumb">
          <span>🏠</span> &gt; <span>Accounts</span> &gt; <span className="AccPayments-active-crumb">Client Payment</span>
        </div>
      </div>

      {/* Main Container Wrapper */}
      <div className="AccPayments-card">
        {/* Table Top Controls Banner */}
        <div className="AccPayments-toolbar">
          <div className="AccPayments-search-wrapper">
            <span className="AccPayments-search-label">Client Payment</span>
            <div className="AccPayments-search-input-box">
              <FiSearch className="AccPayments-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="AccPayments-action-icons">
            <div className="AccPayments-filter-dropdown-container">
              <button className="AccPayments-icon-btn" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                <FiFilter />
              </button>
              
              {/* Filter Popup Window (Ref Image 2 & 3) */}
              {showFilterMenu && (
                <div className="AccPayments-filter-menu">
                  <h3>Show/Hide Column</h3>
                  <div className="AccPayments-filter-scroll">
                    {Object.keys(columns).map((colKey) => (
                      <label key={colKey} className="AccPayments-filter-item">
                        <input 
                          type="checkbox" 
                          checked={columns[colKey]} 
                          onChange={() => toggleColumn(colKey)}
                        />
                        <span className="AccPayments-checkbox-custom"></span>
                        <span className="AccPayments-filter-text">
                          {colKey.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="AccPayments-icon-btn AccPayments-add-btn" onClick={openAddModal}>
              <FiPlus />
            </button>
            <button className="AccPayments-icon-btn" onClick={() => setPayments(initialData)}><FiRefreshCw /></button>
            <button className="AccPayments-icon-btn"><FiDownload /></button>
          </div>
        </div>

        {/* Responsive Layout Table Wrapper */}
        <div className="AccPayments-table-responsive">
          <table className="AccPayments-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th>
                    <label className="AccPayments-table-checkbox">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={filteredPayments.length > 0 && selectedRows.length === filteredPayments.length}
                      />
                      <span className="AccPayments-checkbox-custom"></span>
                    </label>
                  </th>
                )}
                {columns.paymentId && <th>Payment ID</th>}
                {columns.clientId && <th>Client ID</th>}
                {columns.clientName && <th>Client Name</th>}
                {columns.invoiceId && <th>Invoice ID</th>}
                {columns.paymentDate && <th>Payment Date</th>}
                {columns.paymentAmount && <th>Payment Amount</th>}
                {columns.paymentMethod && <th>Payment Method</th>}
                {columns.transactionId && <th>Transaction ID</th>}
                {columns.paymentStatus && <th>Payment Status</th>}
                {columns.currency && <th>Currency</th>}
                {columns.description && <th>Description</th>}
                {columns.createdAt && <th>Created At</th>}
                {columns.updatedAt && <th>Updated At</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((row) => (
                <tr key={row.id}>
                  {columns.checkbox && (
                    <td>
                      <label className="AccPayments-table-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                        />
                        <span className="AccPayments-checkbox-custom"></span>
                      </label>
                    </td>
                  )}
                  {columns.paymentId && <td>{row.id}</td>}
                  {columns.clientId && <td>{row.clientId}</td>}
                  {columns.clientName && <td>{row.name}</td>}
                  {columns.invoiceId && <td>{row.invoiceId}</td>}
                  {columns.paymentDate && (
                    <td>
                      <div className="AccPayments-date-cell">
                        <FiCalendar className="AccPayments-cell-cal-icon" />
                        {row.date.split('-').reverse().join('/')}
                      </div>
                    </td>
                  )}
                  {columns.paymentAmount && <td>{row.amount}</td>}
                  {columns.paymentMethod && <td>{row.method}</td>}
                  {columns.transactionId && <td>{row.txId}</td>}
                  {columns.paymentStatus && (
                    <td>
                      <span className={`AccPayments-status-badge ${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {columns.currency && <td>{row.currency || 'USD'}</td>}
                  {columns.description && <td>{row.description || 'N/A'}</td>}
                  {columns.createdAt && <td>-</td>}
                  {columns.updatedAt && <td>-</td>}
                  {columns.actions && (
                    <td>
                      <div className="AccPayments-actions-cell">
                        <button className="AccPayments-action-edit" onClick={() => openEditModal(row)}>
                          <FiEdit3 />
                        </button>
                        <button className="AccPayments-action-delete" onClick={() => openDeleteModal(row)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Layout Pagination Controls */}
        <div className="AccPayments-footer">
          <div className="AccPayments-pagination-size">
            <span>Items per page:</span>
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="AccPayments-pagination-info">
            <span>1 - {filteredPayments.length} of 15</span>
            <div className="AccPayments-pagination-arrows">
              <button disabled>&lt;</button>
              <button disabled>&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CONTAINER: Handle Add and Edit Operations (Ref Image 4 & 5) */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="AccPayments-modal-overlay">
          <div className="AccPayments-form-modal">
            <div className="AccPayments-modal-header">
              <h2>{modalType === 'add' ? 'New Client Payment' : `Edit Payment for ${activePayment?.name}`}</h2>
              <button className="AccPayments-modal-close" onClick={() => setModalType(null)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSave} className="AccPayments-modal-body">
              <div className="AccPayments-form-grid">
                <div className="AccPayments-form-group">
                  <label>Client Name*</label>
                  <div className="AccPayments-input-wrapper">
                    <input 
                      type="text" required value={formFields.name}
                      onChange={(e) => setFormFields({...formFields, name: e.target.value})}
                    />
                    <FiUser className="AccPayments-input-icon" />
                  </div>
                </div>
                <div className="AccPayments-form-group">
                  <label>Invoice ID*</label>
                  <input 
                    type="text" required value={formFields.invoiceId}
                    onChange={(e) => setFormFields({...formFields, invoiceId: e.target.value})}
                  />
                </div>
                <div className="AccPayments-form-group">
                  <label>Payment Date*</label>
                  <div className="AccPayments-input-wrapper">
                    <input 
                      type="date" required value={formFields.date}
                      onChange={(e) => setFormFields({...formFields, date: e.target.value})}
                    />
                    <FiCalendar className="AccPayments-input-icon" />
                  </div>
                </div>
                <div className="AccPayments-form-group">
                  <label>Payment Amount*</label>
                  <div className="AccPayments-input-wrapper">
                    <input 
                      type="number" required value={formFields.amount}
                      onChange={(e) => setFormFields({...formFields, amount: e.target.value})}
                    />
                    <FiDollarSign className="AccPayments-input-icon" />
                  </div>
                </div>
                <div className="AccPayments-form-group">
                  <label>Payment Method*</label>
                  <input 
                    type="text" required value={formFields.method}
                    onChange={(e) => setFormFields({...formFields, method: e.target.value})}
                  />
                </div>
                <div className="AccPayments-form-group">
                  <label>Transaction ID</label>
                  <input 
                    type="text" value={formFields.txId}
                    onChange={(e) => setFormFields({...formFields, txId: e.target.value})}
                  />
                </div>
                <div className="AccPayments-form-group">
                  <label>Payment Status*</label>
                  <input 
                    type="text" required value={formFields.status}
                    onChange={(e) => setFormFields({...formFields, status: e.target.value})}
                  />
                </div>
                <div className="AccPayments-form-group">
                  <label>Currency*</label>
                  <input 
                    type="text" required value={formFields.currency}
                    onChange={(e) => setFormFields({...formFields, currency: e.target.value})}
                  />
                </div>
              </div>
              <div className="AccPayments-form-group full-width">
                <label>Description</label>
                <textarea 
                  rows="3" value={formFields.description}
                  onChange={(e) => setFormFields({...formFields, description: e.target.value})}
                ></textarea>
              </div>
              <div className="AccPayments-modal-actions">
                <button type="submit" className="AccPayments-btn-save">Save</button>
                <button type="button" className="AccPayments-btn-cancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONTAINER: Handle Confirmation Delete Pop-up (Ref Image 6) */}
      {modalType === 'delete' && (
        <div className="AccPayments-modal-overlay">
          <div className="AccPayments-delete-modal">
            <h2>Are you sure?</h2>
            <div className="AccPayments-delete-details">
              <p><strong>Client Name:</strong> {activePayment?.name}</p>
              <p><strong>Payment Date:</strong> {activePayment?.date}T10:30:00Z</p>
              <p><strong>Payment Amount:</strong> {activePayment?.amount}</p>
            </div>
            <div className="AccPayments-delete-actions">
              <button className="AccPayments-btn-confirm-delete" onClick={handleDelete}>Delete</button>
              <button className="AccPayments-btn-confirm-cancel" onClick={() => setModalType(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccPayments;