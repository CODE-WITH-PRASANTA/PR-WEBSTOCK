import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaSyncAlt, 
  FaDownload, 
  FaEdit, 
  FaTrash, 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight,
  FaBuilding,
  FaBriefcase,
  FaRegCalendarAlt,
  FaUser,
  FaIdCard,
  FaReceipt
} from 'react-icons/fa';
import './Reimbursements.css';

const initialData = [
  { id: 1, empId: 'EMP-001', name: 'John Doe', claimId: 'CLM-1001', department: 'IT', project: 'Ops', amount: 150, date: '2023-01-15', note: 'Medical', status: 'Pending' },
  { id: 2, empId: 'EMP-002', name: 'Sarah Smith', claimId: 'CLM-1002', department: 'Sales', project: 'Travel', amount: 85.5, date: '2023-01-18', note: 'Food', status: 'Approved' },
  { id: 3, empId: 'EMP-003', name: 'Mike Ross', claimId: 'CLM-1003', department: 'IT', project: 'Dev', amount: 499, date: '2023-01-20', note: 'Cert', status: 'Rejected' },
  { id: 4, empId: 'EMP-004', name: 'Emily Blunt', claimId: 'CLM-1004', department: 'Admin', project: 'Office', amount: 120, date: '2023-01-22', note: 'Supplies', status: 'Paid' },
  { id: 5, empId: 'EMP-001', name: 'John Doe', claimId: 'CLM-1005', department: 'IT', project: 'Ops', amount: 350, date: '2023-01-25', note: 'Travel', status: 'Pending' },
  { id: 6, empId: 'EMP-002', name: 'Sarah Smith', claimId: 'CLM-1006', department: 'Sales', project: 'Client', amount: 45, date: '2023-01-28', note: 'Taxi', status: 'Completed' },
  { id: 7, empId: 'EMP-003', name: 'Mike Ross', claimId: 'CLM-1007', department: 'Engineering', project: 'Team', amount: 200, date: '2023-02-01', note: 'Lunch', status: 'Pending' },
  { id: 8, empId: 'EMP-004', name: 'Emily Blunt', claimId: 'CLM-1008', department: 'Design', project: 'UI', amount: 180, date: '2023-02-03', note: 'Soft', status: 'Approved' },
  { id: 9, empId: 'EMP-005', name: 'Admin', claimId: 'CLM-1009', department: 'HR', project: 'Recruit', amount: 80, date: '2023-02-05', note: 'Ads', status: 'Paid' },
  { id: 10, empId: 'EMP-006', name: 'Team Lead', claimId: 'CLM-1010', department: 'Dev', project: 'Agile', amount: 60, date: '2023-02-10', note: 'Books', status: 'Approved' },
];

const Reimbursements = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Dropdown / Modal Toggles
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [activeItem, setActiveItem] = useState(null);

  // Column Visibility State
  const [columns, setColumns] = useState({
    checkbox: true,
    empId: true,
    name: true,
    claimId: true,
    department: true,
    project: true,
    amount: true,
    date: true,
    note: true,
    status: true,
    actions: true,
  });

  // Form Fields State
  const [formData, setFormData] = useState({
    empId: '', name: '', claimId: '', department: 'General', project: 'N/A', amount: 0, date: '', note: '', status: 'Pending'
  });

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.claimId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Checkbox Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredData.map(item => item.id));
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

  // Column Visibility Toggle
  const handleColumnToggle = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  // Actions Logic
  const openAddModal = () => {
    setFormData({ empId: '', name: '', claimId: '', department: 'General', project: 'N/A', amount: 0, date: '', note: '', status: 'Pending' });
    setModalType('add');
  };

  const openEditModal = (item) => {
    setActiveItem(item);
    setFormData({ ...item });
    setModalType('edit');
  };

  const openDeleteModal = (item) => {
    setActiveItem(item);
    setModalType('delete');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newItem = { ...formData, id: Date.now() };
      setData([newItem, ...data]);
    } else if (modalType === 'edit') {
      setData(data.map(item => item.id === activeItem.id ? { ...formData } : item));
    }
    setModalType(null);
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== activeItem.id));
    setModalType(null);
  };

  const handleRefresh = () => {
    setData(initialData);
    setSearchTerm('');
    setSelectedRows([]);
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'reimbursements.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="ReimbursementsContainer">
      {/* Breadcrumb Header */}
      <div className="ReimbursementsHeader">
        <h2>Reimbursements</h2>
        <div className="ReimbursementsBreadcrumb">
          <span className="BreadcrumbHome">🏠</span> &gt; Accounts &gt; <span className="BreadcrumbActive">Reimbursements</span>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <div className="ReimbursementsCard">
        
        {/* Table Controls Panel */}
        <div className="ReimbursementsControls">
          <div className="ReimbursementsSearchWrapper">
            <FaSearch className="SearchIcon" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={handleSearch} 
              className="ReimbursementsSearchInput"
            />
          </div>

          <div className="ReimbursementsActionButtons">
            {/* Filter Toggle */}
            <div className="FilterDropdownWrapper">
              <button className="ControlBtn FilterBtn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                <FaFilter />
              </button>
              {showFilterDropdown && (
                <div className="ColumnToggleDropdown">
                  <div className="DropdownHeader">Show/Hide Column</div>
                  <hr />
                  {Object.keys(columns).map((colKey) => (
                    <label key={colKey} className="DropdownItem">
                      <input 
                        type="checkbox" 
                        checked={columns[colKey]} 
                        onChange={() => handleColumnToggle(colKey)}
                      />
                      <span>{colKey.charAt(0).toUpperCase() + colKey.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button className="ControlBtn AddBtn" onClick={openAddModal}><FaPlus /></button>
            <button className="ControlBtn RefreshBtn" onClick={handleRefresh}><FaSyncAlt /></button>
            <button className="ControlBtn DownloadBtn" onClick={handleDownload}><FaDownload /></button>
          </div>
        </div>

        {/* Responsive Table View */}
        <div className="ReimbursementsTableWrapper">
          <table className="ReimbursementsTable">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: '50px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                    />
                  </th>
                )}
                {columns.empId && <th>Emp ID</th>}
                {columns.name && <th>Name</th>}
                {columns.claimId && <th>Claim ID</th>}
                {columns.department && <th>Department</th>}
                {columns.project && <th>Project</th>}
                {columns.amount && <th>Amount</th>}
                {columns.date && <th>Date</th>}
                {columns.note && <th>Note</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? 'SelectedRow' : ''}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(item.id)} 
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </td>
                  )}
                  {columns.empId && <td>{item.empId}</td>}
                  {columns.name && <td className="TextBold">{item.name}</td>}
                  {columns.claimId && <td>{item.claimId}</td>}
                  {columns.department && <td>{item.department}</td>}
                  {columns.project && <td>{item.project}</td>}
                  {columns.amount && <td>{item.amount}</td>}
                  {columns.date && (
                    <td className="DateCell">
                      <FaRegCalendarAlt className="RowDateIcon" /> {item.date.replace(/-/g, '/')}
                    </td>
                  )}
                  {columns.note && <td className="TextMuted">{item.note || 'N/A'}</td>}
                  {columns.status && (
                    <td>
                      <span className={`StatusBadge Status-${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="RowActionIcons">
                        <button className="ActionBtnEdit" onClick={() => openEditModal(item)}><FaEdit /></button>
                        <button className="ActionBtnDelete" onClick={() => openDeleteModal(item)}><FaTrash /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Layout */}
        <div className="ReimbursementsFooter">
          <div className="ItemsPerPageWrapper">
            <span>Items per page:</span>
            <select className="ItemsSelect">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="PaginationInfo">
            <span>1 - {filteredData.length} of 14</span>
            <div className="PaginationArrows">
              <button className="ArrowBtn" disabled><FaChevronLeft /></button>
              <button className="ArrowBtn"><FaChevronRight /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Dialog Modal (Add & Edit) */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            <div className="ModalHeader bg-primary">
              <h3>{modalType === 'add' ? 'New Reimbursement' : `Edit Reimbursement: ${formData.claimId}`}</h3>
              <button className="CloseModalBtn" onClick={() => setModalType(null)}><FaTimes /></button>
            </div>
            <form onSubmit={handleSave} className="ModalBody">
              <div className="FormRow">
                <div className="FormGroup">
                  <label>Emp ID*</label>
                  <div className="InputIconWrapper">
                    <input type="text" required value={formData.empId} onChange={(e) => setFormData({...formData, empId: e.target.value})} />
                    <FaIdCard className="FieldIcon" />
                  </div>
                </div>
                <div className="FormGroup">
                  <label>Name*</label>
                  <div className="InputIconWrapper">
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <FaUser className="FieldIcon" />
                  </div>
                </div>
              </div>

              <div className="FormRow">
                <div className="FormGroup">
                  <label>Claim ID*</label>
                  <div className="InputIconWrapper">
                    <input type="text" required value={formData.claimId} onChange={(e) => setFormData({...formData, claimId: e.target.value})} />
                    <FaReceipt className="FieldIcon" />
                  </div>
                </div>
                <div className="FormGroup">
                  <label>Amount*</label>
                  <div className="InputIconWrapper">
                    <input type="number" step="any" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})} />
                    <span className="FieldIcon text-muted">$</span>
                  </div>
                </div>
              </div>

              <div className="FormRow">
                <div className="FormGroup">
                  <label>Date*</label>
                  <div className="InputIconWrapper">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
                <div className="FormGroup">
                  <label>Status*</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="FormSelect">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Paid">Paid</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="FormRow">
                <div className="FormGroup">
                  <label>Department</label>
                  <div className="InputIconWrapper">
                    <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                    <FaBuilding className="FieldIcon" />
                  </div>
                </div>
                <div className="FormGroup">
                  <label>Project</label>
                  <div className="InputIconWrapper">
                    <input type="text" value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} />
                    <FaBriefcase className="FieldIcon" />
                  </div>
                </div>
              </div>

              <div className="FormGroup FullWidth">
                <label>Note</label>
                <textarea rows="3" value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="Add note details..."></textarea>
              </div>

              <div className="FormActionFooter">
                <button type="submit" className="BtnSave">Save</button>
                <button type="button" className="BtnCancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Prompt Dialog */}
      {modalType === 'delete' && (
        <div className="ModalOverlay">
          <div className="DeleteDialogContent">
            <h2>Are you sure?</h2>
            <div className="DeleteMeta">
              <p><strong>Claim ID:</strong> {activeItem?.claimId}</p>
              <p><strong>Name:</strong> {activeItem?.name}</p>
            </div>
            <div className="DeleteActionButtons">
              <button className="BtnDeleteConfirm" onClick={handleDelete}>Delete</button>
              <button className="BtnDeleteCancel" onClick={() => setModalType(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reimbursements;