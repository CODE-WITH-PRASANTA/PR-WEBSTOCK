import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSearch, FiSliders, FiPlusCircle, FiRefreshCw, 
  FiDownload, FiEdit, FiTrash2, FiX, FiChevronDown, 
  FiChevronLeft, FiChevronRight, FiFileText, FiHash, FiList
} from 'react-icons/fi';
import './AccInvoiceDetails.css';

const initialData = [
  { id: 1, itemNo: 'INV-001', item: 'Web Design', description: 'Homepage redesign...', unitCost: 1500, quantity: 1, tax: 150, amount: 1500, total: 1650, status: 'Completed' },
  { id: 2, itemNo: 'INV-002', item: 'Hosting', description: 'Annual server hosting...', unitCost: 120, quantity: 1, tax: 12, amount: 120, total: 132, status: 'Paid' },
  { id: 3, itemNo: 'INV-003', item: 'Domain', description: 'Domain renewal', unitCost: 15, quantity: 2, tax: 3, amount: 30, total: 33, status: 'Paid' },
  { id: 4, itemNo: 'INV-004', item: 'Consulting', description: 'Business strategy...', unitCost: 200, quantity: 5, tax: 100, amount: 1000, total: 1100, status: 'Pending' },
  { id: 5, itemNo: 'INV-005', item: 'SEO', description: 'Monthly SEO optimization...', unitCost: 500, quantity: 3, tax: 150, amount: 1500, total: 1650, status: 'Completed' },
  { id: 6, itemNo: 'INV-006', item: 'Maintenance', description: 'Monthly website update...', unitCost: 100, quantity: 12, tax: 120, amount: 1200, total: 1320, status: 'Pending' },
  { id: 7, itemNo: 'INV-007', item: 'Logo Design', description: 'New company logo...', unitCost: 300, quantity: 1, tax: 30, amount: 300, total: 330, status: 'Completed' },
  { id: 8, itemNo: 'INV-008', item: 'Brochure', description: 'Marketing brochure...', unitCost: 250, quantity: 2, tax: 50, amount: 500, total: 550, status: 'Paid' },
  { id: 9, itemNo: 'INV-009', item: 'Ad Campaign', description: 'Google Ads management...', unitCost: 1000, quantity: 1, tax: 100, amount: 1000, total: 1100, status: 'Pending' },
  { id: 10, itemNo: 'INV-010', item: 'Content Writing', description: 'Blog posts (5)', unitCost: 50, quantity: 5, tax: 25, amount: 250, total: 275, status: 'Completed' },
];

const AccInvoiceDetails = () => {
  // Main Data States
  const [data, setData] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive UI Action Visibility States
  const [showFilters, setShowFilters] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [activeItem, setActiveItem] = useState(null);

  // Column Visibility Mapping States
  const [columns, setColumns] = useState({
    checkbox: true,
    itemNo: true,
    item: true,
    description: true,
    unitCost: true,
    quantity: true,
    tax: true,
    amount: true,
    total: true,
    status: true,
    actions: true
  });

  // Modal Input Management States
  const [formInputs, setFormInputs] = useState({
    item: '', itemNo: 'INV-000', unitCost: 0, tax: 0, quantity: 0, status: 'Pending', description: ''
  });

  const filterRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Selection Checkbox Logic handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(data.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemIds => itemIds !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Visibility Column Config Toggler
  const toggleColumn = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  // Action Panel Form Launch Event Triggers
  const openAddModal = () => {
    setFormInputs({ item: '', itemNo: `INV-0${data.length + 1}`, unitCost: 0, tax: 0, quantity: 0, status: 'Pending', description: '' });
    setModalType('add');
  };

  const openEditModal = (item) => {
    setActiveItem(item);
    setFormInputs({ ...item });
    setModalType('edit');
  };

  const openDeleteModal = (item) => {
    setActiveItem(item);
    setModalType('delete');
  };

  // Active Action Submission Closures
  const handleSave = (e) => {
    e.preventDefault();
    const calculatedAmount = Number(formInputs.unitCost) * Number(formInputs.quantity);
    const calculatedTotal = calculatedAmount + Number(formInputs.tax);
    
    if (modalType === 'add') {
      const newItem = {
        ...formInputs,
        id: Date.now(),
        amount: calculatedAmount,
        total: calculatedTotal
      };
      setData([...data, newItem]);
    } else if (modalType === 'edit') {
      setData(data.map(item => item.id === activeItem.id ? { 
        ...formInputs, amount: calculatedAmount, total: calculatedTotal 
      } : item));
    }
    setModalType(null);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter(item => item.id !== activeItem.id));
    setSelectedIds(selectedIds.filter(id => id !== activeItem.id));
    setModalType(null);
  };

  // Search filter query application
  const filteredData = data.filter(row => 
    row.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.itemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="AccInvoiceDetails-container">
      {/* Top Breadcrumb Navigation */}
      <div className="AccInvoiceDetails-header-nav">
        <span className="AccInvoiceDetails-title">Invoice Details</span>
        <div className="AccInvoiceDetails-breadcrumb">
          <span>🏠</span> &gt; <span>Accounts</span> &gt; <span className="AccInvoiceDetails-active-crumb">Invoice Details</span>
        </div>
      </div>

      {/* Main Grid Table Dynamic Container View Card */}
      <div className="AccInvoiceDetails-card">
        
        {/* Table Top Action Settings Subheader Toolbar Strip */}
        <div className="AccInvoiceDetails-toolbar">
          <div className="AccInvoiceDetails-toolbar-left">
            <span className="AccInvoiceDetails-panel-label">Invoice Details</span>
            <div className="AccInvoiceDetails-search-wrapper">
              <FiSearch className="AccInvoiceDetails-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="AccInvoiceDetails-toolbar-right">
            {/* Filter Toggle Action */}
            <div className="AccInvoiceDetails-filter-dropdown-container" ref={filterRef}>
              <button 
                className={`AccInvoiceDetails-tool-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiSliders />
              </button>
              
              {showFilters && (
                <div className="AccInvoiceDetails-filter-dropdown-menu">
                  <div className="AccInvoiceDetails-filter-dropdown-header">Show/Hide Column</div>
                  <div className="AccInvoiceDetails-filter-dropdown-list">
                    {Object.keys(columns).map((colKey) => (
                      <label key={colKey} className="AccInvoiceDetails-filter-checkbox-item">
                        <input 
                          type="checkbox" 
                          checked={columns[colKey]} 
                          onChange={() => toggleColumn(colKey)}
                        />
                        <span className="AccInvoiceDetails-custom-checkbox-label">
                          {colKey === 'itemNo' ? 'Item No.' : colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="AccInvoiceDetails-tool-btn text-green" onClick={openAddModal}><FiPlusCircle /></button>
            <button className="AccInvoiceDetails-tool-btn" onClick={() => setData(initialData)}><FiRefreshCw /></button>
            <button className="AccInvoiceDetails-tool-btn"><FiDownload /></button>
          </div>
        </div>

        {/* Dynamic Responsive Tabular Presentation Surface Grid */}
        <div className="AccInvoiceDetails-table-wrapper">
          <table className="AccInvoiceDetails-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={selectedIds.length === data.length && data.length > 0}
                    />
                  </th>
                )}
                {columns.itemNo && <th>Item No.</th>}
                {columns.item && <th>Item</th>}
                {columns.description && <th>Description</th>}
                {columns.unitCost && <th>Unit Cost</th>}
                {columns.quantity && <th>Quantity</th>}
                {columns.tax && <th>Tax</th>}
                {columns.amount && <th>Amount</th>}
                {columns.total && <th>Total</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className={selectedIds.includes(row.id) ? 'selected-row' : ''}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </td>
                  )}
                  {columns.itemNo && <td>{row.itemNo}</td>}
                  {columns.item && <td className="font-weight-medium">{row.item}</td>}
                  {columns.description && <td className="text-muted text-truncate-cell">{row.description}</td>}
                  {columns.unitCost && <td>{row.unitCost}</td>}
                  {columns.quantity && <td>{row.quantity}</td>}
                  {columns.tax && <td>{row.tax}</td>}
                  {columns.amount && <td>{row.amount}</td>}
                  {columns.total && <td>{row.total}</td>}
                  {columns.status && (
                    <td>
                      <span className={`AccInvoiceDetails-badge status-${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="AccInvoiceDetails-action-cell-triggers">
                        <button className="AccInvoiceDetails-action-icon-btn edit-btn" onClick={() => openEditModal(row)}>
                          <FiEdit />
                        </button>
                        <button className="AccInvoiceDetails-action-icon-btn delete-btn" onClick={() => openDeleteModal(row)}>
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

        {/* Dynamic Static Table Footer Pagination bar display */}
        <div className="AccInvoiceDetails-pagination-bar">
          <div className="AccInvoiceDetails-pagination-right">
            <span className="AccInvoiceDetails-pagination-label">Items per page:</span>
            <div className="AccInvoiceDetails-pagination-select-wrapper">
              <select defaultValue="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
              <FiChevronDown className="select-arrow-icon" />
            </div>
            <span className="AccInvoiceDetails-pagination-range">1 – 10 of 14</span>
            <div className="AccInvoiceDetails-pagination-actions">
              <button disabled className="AccInvoiceDetails-pagination-arrow"><FiChevronLeft /></button>
              <button className="AccInvoiceDetails-pagination-arrow"><FiChevronRight /></button>
            </div>
          </div>
        </div>

      </div>

      {/* CRUD Core Function Context Dialog Overlays Backdrop Window Layer */}
      {modalType && (
        <div className="AccInvoiceDetails-modal-overlay">
          
          {/* Modal Architecture Block Option: Add / Edit Form Panel */}
          {(modalType === 'add' || modalType === 'edit') && (
            <div className="AccInvoiceDetails-modal-card">
              <div className="AccInvoiceDetails-modal-header">
                <h3>{modalType === 'add' ? 'New Item' : `Edit Item: ${activeItem?.item}`}</h3>
                <button className="AccInvoiceDetails-modal-close" onClick={() => setModalType(null)}><FiX /></button>
              </div>
              
              <form onSubmit={handleSave} className="AccInvoiceDetails-modal-form">
                <div className="AccInvoiceDetails-form-grid">
                  
                  <div className="AccInvoiceDetails-input-group">
                    <label>Item*</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <input 
                        type="text" required value={formInputs.item}
                        onChange={(e) => setFormInputs({...formInputs, item: e.target.value})}
                      />
                      <span className="inner-input-icon"><FiFileText /></span>
                    </div>
                  </div>

                  <div className="AccInvoiceDetails-input-group">
                    <label>Unit Cost*</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <input 
                        type="number" required value={formInputs.unitCost}
                        onChange={(e) => setFormInputs({...formInputs, unitCost: Number(e.target.value)})}
                      />
                      <span className="inner-input-icon font-symbol">$</span>
                    </div>
                  </div>

                  <div className="AccInvoiceDetails-input-group">
                    <label>Item Number*</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <input 
                        type="text" required value={formInputs.itemNo}
                        onChange={(e) => setFormInputs({...formInputs, itemNo: e.target.value})}
                      />
                      <span className="inner-input-icon"><FiHash /></span>
                    </div>
                  </div>

                  <div className="AccInvoiceDetails-input-group">
                    <label>Tax (%)*</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <input 
                        type="number" required value={formInputs.tax}
                        onChange={(e) => setFormInputs({...formInputs, tax: Number(e.target.value)})}
                      />
                      <span className="inner-input-icon font-symbol">%</span>
                    </div>
                  </div>

                  <div className="AccInvoiceDetails-input-group">
                    <label>Quantity*</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <input 
                        type="number" required value={formInputs.quantity}
                        onChange={(e) => setFormInputs({...formInputs, quantity: Number(e.target.value)})}
                      />
                      <span className="inner-input-icon"><FiList /></span>
                    </div>
                  </div>

                  <div className="AccInvoiceDetails-input-group">
                    <label>Status*</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <select 
                        value={formInputs.status}
                        onChange={(e) => setFormInputs({...formInputs, status: e.target.value})}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                      <FiChevronDown className="inner-select-arrow" />
                    </div>
                  </div>

                  <div className="AccInvoiceDetails-input-group full-row-span">
                    <label>Description</label>
                    <div className="AccInvoiceDetails-input-field-icon-wrapper">
                      <textarea 
                        rows="3" placeholder="Description" value={formInputs.description}
                        onChange={(e) => setFormInputs({...formInputs, description: e.target.value})}
                      ></textarea>
                      <span className="inner-input-icon text-area-mode"><FiFileText /></span>
                    </div>
                  </div>

                </div>

                <div className="AccInvoiceDetails-modal-footer-actions">
                  <button type="submit" className="AccInvoiceDetails-btn-confirm-save">Save</button>
                  <button type="button" className="AccInvoiceDetails-btn-cancel-operation" onClick={() => setModalType(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Modal Architecture Block Option: Delete Dialog Box Prompt */}
          {modalType === 'delete' && (
            <div className="AccInvoiceDetails-dialog-mini-card">
              <h3>Are you sure?</h3>
              <div className="AccInvoiceDetails-dialog-content">
                <p>Item: {activeItem?.item}</p>
                <p>Status: {activeItem?.status}</p>
              </div>
              <div className="AccInvoiceDetails-dialog-footer-actions">
                <button className="AccInvoiceDetails-btn-dialog-delete" onClick={handleDeleteConfirm}>Delete</button>
                <button className="AccInvoiceDetails-btn-dialog-cancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AccInvoiceDetails;