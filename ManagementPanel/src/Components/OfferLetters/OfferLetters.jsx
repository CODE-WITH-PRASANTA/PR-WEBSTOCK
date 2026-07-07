import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRefreshCw, FiDownload, 
  FiEdit2, FiTrash2, FiUser, FiBriefcase, FiCalendar, 
  FiDollarSign, FiX, FiCheck 
} from 'react-icons/fi';
import './OfferLetters.css';

const initialData = [
  { id: 1, name: 'John Doe', title: 'Angular Developer', offerDate: '2023-10-15', joiningDate: '2023-11-01', ctc: '120000', status: 'Sent' },
  { id: 2, name: 'Sarah Smith', title: 'UX Designer', offerDate: '2023-10-16', joiningDate: '2023-11-05', ctc: '100000', status: 'Accepted' },
  { id: 3, name: 'Michael Brown', title: 'Marketing Specialist', offerDate: '2023-10-17', joiningDate: '2023-11-10', ctc: '80000', status: 'Rejected' },
  { id: 4, name: 'Emily Davis', title: 'HR Manager', offerDate: '2023-10-18', joiningDate: '2023-11-15', ctc: '95000', status: 'Draft' },
  { id: 5, name: 'David Lee', title: 'Sales Executive', offerDate: '2023-10-19', joiningDate: '2023-11-20', ctc: '75000', status: 'Sent' },
  { id: 6, name: 'Robert Taylor', title: 'Backend Developer', offerDate: '2023-10-20', joiningDate: '2023-11-25', ctc: '130000', status: 'Accepted' },
  { id: 7, name: 'William Anderson', title: 'Project Manager', offerDate: '2023-10-21', joiningDate: '2023-12-01', ctc: '140000', status: 'Sent' },
  { id: 8, name: 'Richard Thomas', title: 'Content Writer', offerDate: '2023-10-22', joiningDate: '2023-12-05', ctc: '60000', status: 'Draft' },
  { id: 9, name: 'Patricia Martinez', title: 'DevOps Engineer', offerDate: '2023-10-23', joiningDate: '2023-12-10', ctc: '150000', status: 'Accepted' },
  { id: 10, name: 'Charles Clark', title: 'Customer Support', offerDate: '2023-10-24', joiningDate: '2023-12-15', ctc: '50000', status: 'Rejected' },
];

const OfferLetters = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    candidateName: true,
    jobTitle: true,
    offerDate: true,
    joiningDate: true,
    ctc: true,
    status: true,
    actions: true
  });

  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', title: '', offerDate: '2026-07-06', joiningDate: '2026-07-06', ctc: '0', status: 'Draft'
  });

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

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setData(initialData);
    setSearchQuery('');
    setSelectedRows([]);
  };

  const handleDownload = () => {
    const headers = ['Candidate Name', 'Job Title', 'Offer Date', 'Joining Date', 'CTC', 'Status'];
    const rows = filteredData.map(item => [item.name, item.title, item.offerDate, item.joiningDate, item.ctc, item.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "offer_letters.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openAddModal = () => {
    setFormData({ name: '', title: '', offerDate: '2026-07-06', joiningDate: '2026-07-06', ctc: '0', status: 'Draft' });
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
      const newItem = {
        id: Date.now(),
        name: formData.name,
        title: formData.title,
        offerDate: formData.offerDate,
        joiningDate: formData.joiningDate,
        ctc: formData.ctc,
        status: formData.status
      };
      setData([newItem, ...data]);
    } else if (modalType === 'edit') {
      setData(data.map(item => item.id === activeItem.id ? { ...item, ...formData } : item));
    }
    setModalType(null);
  };

  const handleDelete = () => {
    setData(data.filter(item => item.id !== activeItem.id));
    setSelectedRows(selectedRows.filter(id => id !== activeItem.id));
    setModalType(null);
  };

  return (
    <div className="OfferLetters">
      {/* Top Banner section */}
      <div className="OfferLetters-top-bar">
        <h1 className="OfferLetters-main-title">Offer Letters</h1>
        <div className="OfferLetters-breadcrumb">
          <span className="OfferLetters-breadcrumb-root">🏠 Jobs</span> 
          <span className="OfferLetters-breadcrumb-separator">&gt;</span> 
          <span className="OfferLetters-breadcrumb-current">Offer Letters</span>
        </div>
      </div>

      <div className="OfferLetters-container">
        {/* Inside blue header bar container components */}
        <div className="OfferLetters-header">
          <div className="OfferLetters-header-left">
            <span className="OfferLetters-inner-label">Offer Letters</span>
            <div className="OfferLetters-search-box">
              <FiSearch className="OfferLetters-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="OfferLetters-header-right">
            <div className="OfferLetters-filter-wrapper">
              <button className="OfferLetters-icon-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                <FiFilter />
              </button>
              {showFilterDropdown && (
                <div className="OfferLetters-dropdown">
                  <div className="OfferLetters-dropdown-title">Show/Hide Column</div>
                  <div className="OfferLetters-dropdown-scroll">
                    {Object.keys(columns).map((col) => (
                      <label key={col} className="OfferLetters-dropdown-item">
                        <input 
                          type="checkbox" 
                          checked={columns[col]} 
                          onChange={(e) => setColumns({...columns, [col]: e.target.checked})}
                        />
                        <span className="OfferLetters-custom-checkbox">
                          {columns[col] && <FiCheck />}
                        </span>
                        <span className="OfferLetters-dropdown-label">
                          {col === 'candidateName' ? 'Candidate Name' : col === 'jobTitle' ? 'Job Title' : col === 'offerDate' ? 'Offer Date' : col === 'joiningDate' ? 'Joining Date' : col === 'ctc' ? 'CTC' : col.charAt(0).toUpperCase() + col.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="OfferLetters-icon-btn OfferLetters-btn-add" onClick={openAddModal}>
              <FiPlus />
            </button>
            <button className="OfferLetters-icon-btn" onClick={handleRefresh}>
              <FiRefreshCw />
            </button>
            <button className="OfferLetters-icon-btn" onClick={handleDownload}>
              <FiDownload />
            </button>
          </div>
        </div>

        {/* Dynamic Responsive Table Wrapper layout updates configuration */}
        <div className="OfferLetters-table-wrapper">
          <table className="OfferLetters-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th width="40">
                    <label className="OfferLetters-table-checkbox">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                      />
                      <span className="OfferLetters-custom-checkbox">
                        {filteredData.length > 0 && selectedRows.length === filteredData.length && <FiCheck />}
                      </span>
                    </label>
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.candidateName && <th>Candidate Name</th>}
                {columns.jobTitle && <th>Job Title</th>}
                {columns.offerDate && <th>Offer Date</th>}
                {columns.joiningDate && <th>Joining Date</th>}
                {columns.ctc && <th>CTC</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected-row' : ''}>
                  {columns.checkbox && (
                    <td>
                      <label className="OfferLetters-table-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                        />
                        <span className="OfferLetters-custom-checkbox">
                          {selectedRows.includes(item.id) && <FiCheck />}
                        </span>
                      </label>
                    </td>
                  )}
                  {columns.id && <td>{item.id}</td>}
                  {columns.candidateName && <td className="font-medium">{item.name}</td>}
                  {columns.jobTitle && <td>{item.title}</td>}
                  {columns.offerDate && (
                    <td>
                      <div className="OfferLetters-cell-date">
                        <FiCalendar className="OfferLetters-cell-icon" /> {item.offerDate}
                      </div>
                    </td>
                  )}
                  {columns.joiningDate && (
                    <td>
                      <div className="OfferLetters-cell-date">
                        <FiCalendar className="OfferLetters-cell-icon" /> {item.joiningDate}
                      </div>
                    </td>
                  )}
                  {columns.ctc && <td>{item.ctc}</td>}
                  {columns.status && (
                    <td>
                      <span className={`OfferLetters-status badge-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="OfferLetters-actions">
                        <button className="action-edit" onClick={() => openEditModal(item)}><FiEdit2 /></button>
                        <button className="action-delete" onClick={() => openDeleteModal(item)}><FiTrash2 /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info blocks sections pagination panels views logic */}
        <div className="OfferLetters-footer">
          <div className="OfferLetters-footer-left">
            <span>Items per page:</span>
            <select className="OfferLetters-page-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="OfferLetters-footer-right">
            <span>1 - {filteredData.length} of {data.length}</span>
            <div className="OfferLetters-pagination-btns">
              <button disabled>&lt;</button>
              <button disabled>&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add & Edit Operations Modal Component Layer structures */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="OfferLetters-modal-backdrop">
          <div className="OfferLetters-modal-card">
            <div className="OfferLetters-modal-header">
              <h3>{modalType === 'add' ? 'New Offer Letter' : 'Edit Offer Letter'}</h3>
              <button className="close-btn" onClick={() => setModalType(null)}><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="OfferLetters-modal-form">
              <div className="OfferLetters-form-grid">
                
                <div className="OfferLetters-form-group">
                  <label>Candidate Name*</label>
                  <div className="OfferLetters-input-wrapper">
                    <input 
                      type="text" 
                      required
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                    <FiUser className="input-icon" />
                  </div>
                </div>

                <div className="OfferLetters-form-group">
                  <label>Job Title*</label>
                  <div className="OfferLetters-input-wrapper">
                    <input 
                      type="text" 
                      required
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    />
                    <FiBriefcase className="input-icon" />
                  </div>
                </div>

                <div className="OfferLetters-form-group relative-label">
                  <span className="floating-tag">Offer Date*</span>
                  <div className="OfferLetters-input-wrapper">
                    <input 
                      type="date" 
                      required
                      value={formData.offerDate} 
                      onChange={(e) => setFormData({...formData, offerDate: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="OfferLetters-form-group relative-label">
                  <span className="floating-tag">Joining Date*</span>
                  <div className="OfferLetters-input-wrapper">
                    <input 
                      type="date" 
                      required
                      value={formData.joiningDate} 
                      onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="OfferLetters-form-group relative-label">
                  <span className="floating-tag">CTC*</span>
                  <div className="OfferLetters-input-wrapper">
                    <input 
                      type="text" 
                      required
                      value={formData.ctc} 
                      onChange={(e) => setFormData({...formData, ctc: e.target.value})} 
                    />
                    <FiDollarSign className="input-icon" />
                  </div>
                </div>

                <div className="OfferLetters-form-group relative-label">
                  <span className="floating-tag">Status*</span>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="OfferLetters-select-field"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

              </div>

              <div className="OfferLetters-form-actions">
                <button type="submit" className={`btn-save ${modalType === 'edit' ? 'btn-edit-blue' : ''}`}>
                  Save
                </button>
                <button type="button" className="btn-cancel" onClick={() => setModalType(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Overlay Confirmation Panel design code mapped exactly */}
      {modalType === 'delete' && (
        <div className="OfferLetters-modal-backdrop">
          <div className="OfferLetters-delete-card">
            <h2>Are you sure?</h2>
            <p className="delete-subtitle">Are you sure you want to delete this offer letter?</p>
            <div className="delete-info-box">
              <p>Candidate: {activeItem?.name}</p>
              <p>Job Title: {activeItem?.title}</p>
            </div>
            <div className="OfferLetters-delete-actions">
              <button className="btn-delete-confirm" onClick={handleDelete}>Delete</button>
              <button className="btn-cancel-confirm" onClick={() => setModalType(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferLetters;