import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRefreshCw, FiDownload, 
  FiEdit3, FiTrash2, FiCalendar, FiMapPin, FiX, FiCheckSquare, FiSquare 
} from 'react-icons/fi';
import './AllHolidays.css';

const AllHolidays = () => {
  // Initial Table Data
  const [holidays, setHolidays] = useState([
    { id: 1, name: 'New Year', shift: 'All Shifts', date: '12/31/2021', type: 'National', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 2, name: 'World Aids Day', shift: 'Day Shifts', date: '12/10/2021', type: 'Awareness', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 3, name: 'World Milk Day', shift: 'Night Shifts', date: '06/01/2021', type: 'Awareness', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 4, name: 'Diwali', shift: 'All Shifts', date: '11/04/2021', type: 'Religious', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 5, name: 'Global Family Day', shift: 'Night Shifts', date: '01/01/2021', type: 'Cultural', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Rejected', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 6, name: 'Earth Hour', shift: 'All Shifts', date: '03/27/2021', type: 'Environmental', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 7, name: 'World Book Day', shift: 'All Shifts', date: '04/23/2021', type: 'Cultural', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Rejected', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 8, name: 'International Yoga Day', shift: 'Night Shifts', date: '06/21/2021', type: 'Health', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 9, name: 'Eid', shift: 'Day Shifts', date: '04/11/2021', type: 'Religious', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' },
    { id: 10, name: 'Holi', shift: 'Night Shifts', date: '07/25/2021', type: 'Religious', createdBy: 'Admin', creationDate: '11/01/2021', status: 'Approved', details: 'This festival is celebr...', location: 'All Locations' }
  ]);

  // UI Control States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // Column Visibility State
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    holidayName: true,
    shift: true,
    date: true,
    location: false,
    holidayType: true,
    createdBy: true,
    creationDate: true,
    approvalStatus: true,
    details: true,
    actions: true
  });

  // Modal Control States
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [activeHoliday, setActiveHoliday] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '', date: '2026-07-02', location: '', shift: '', details: '', type: '', createdBy: '', creationDate: '2026-07-02', status: ''
  });

  // Checkbox Selection Logics
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(holidays.map(h => h.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Column Visibility Toggle
  const toggleColumn = (colName) => {
    setColumns(prev => ({ ...prev, [colName]: !prev[colName] }));
  };

  // Modal Open Triggers
  const openAddModal = () => {
    setFormData({
      name: '', date: '2026-07-02', location: '', shift: '', details: '', type: '', createdBy: '', creationDate: '2026-07-02', status: ''
    });
    setModalType('add');
  };

  const openEditModal = (holiday) => {
    setActiveHoliday(holiday);
    // Convert date format from MM/DD/YYYY to YYYY-MM-DD for standard inputs if needed
    const parts = holiday.date.split('/');
    const formattedDate = parts.length === 3 ? `${parts[2]}-${parts[0]}-${parts[1]}` : holiday.date;
    const cParts = holiday.creationDate.split('/');
    const formattedCDate = cParts.length === 3 ? `${cParts[2]}-${cParts[0]}-${cParts[1]}` : holiday.creationDate;

    setFormData({
      name: holiday.name,
      date: formattedDate,
      location: holiday.location || 'All Locations',
      shift: holiday.shift,
      details: holiday.details,
      type: holiday.type,
      createdBy: holiday.createdBy,
      creationDate: formattedCDate,
      status: holiday.status
    });
    setModalType('edit');
  };

  const openDeleteModal = (holiday) => {
    setActiveHoliday(holiday);
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setActiveHoliday(null);
  };

  // Form Action Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Format utility for display dates (YYYY-MM-DD -> MM/DD/YYYY)
    const formatDateForView = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      return parts.length === 3 ? `${parts[1]}/${parts[2]}/${parts[0]}` : dateStr;
    };

    if (modalType === 'add') {
      const newHoliday = {
        id: Date.now(),
        name: formData.name,
        shift: formData.shift || 'All Shifts',
        date: formatDateForView(formData.date),
        type: formData.type || 'National',
        createdBy: formData.createdBy || 'Admin',
        creationDate: formatDateForView(formData.creationDate),
        status: formData.status || 'Approved',
        details: formData.details || 'This festival is celebr...',
        location: formData.location || 'All Locations'
      };
      setHolidays([newHoliday, ...holidays]);
    } else if (modalType === 'edit') {
      setHolidays(holidays.map(h => h.id === activeHoliday.id ? {
        ...h,
        name: formData.name,
        shift: formData.shift,
        date: formatDateForView(formData.date),
        type: formData.type,
        createdBy: formData.createdBy,
        creationDate: formatDateForView(formData.creationDate),
        status: formData.status,
        details: formData.details,
        location: formData.location
      } : h));
    }
    closeModal();
  };

  const handleDeleteConfirm = () => {
    setHolidays(holidays.filter(h => h.id !== activeHoliday.id));
    closeModal();
  };

  // Filter items matching the search box query
  const filteredHolidays = holidays.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="AllHolidays">
      {/* Top Header Breadcrumbs */}
      <div className="AllHolidays-breadcrumb">
        <span>All Holidays</span>
        <div className="AllHolidays-breadcrumb-path">
          <span>🏠</span> &gt; <span>Holidays</span> &gt; <span className="active">All Holidays</span>
        </div>
      </div>

      {/* Control Actions Panel */}
      <div className="AllHolidays-toolbar">
        <div className="AllHolidays-search-container">
          <span className="AllHolidays-search-label">All Holidays</span>
          <div className="AllHolidays-search-input-wrapper">
            <FiSearch className="AllHolidays-search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="AllHolidays-actions-group">
          <div className="AllHolidays-filter-wrapper">
            <button 
              className={`AllHolidays-icon-btn ${showFilterDropdown ? 'active' : ''}`}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              title="Column Filter"
            >
              <FiFilter />
            </button>
            
            {/* 2nd Reference Image: Column Selector */}
            {showFilterDropdown && (
              <div className="AllHolidays-filter-dropdown">
                <div className="AllHolidays-dropdown-title">Show/Hide Column</div>
                <div className="AllHolidays-dropdown-list">
                  {Object.keys(columns).map((colKey) => (
                    <label key={colKey} className="AllHolidays-dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={columns[colKey]} 
                        onChange={() => toggleColumn(colKey)}
                      />
                      <span className="AllHolidays-custom-checkbox">
                        {columns[colKey] ? <FiCheckSquare className="checked" /> : <FiSquare />}
                      </span>
                      <span className="AllHolidays-checkbox-label">
                        {colKey === 'holidayName' ? 'Holiday Name' : 
                         colKey === 'holidayType' ? 'Holiday Type' :
                         colKey === 'createdBy' ? 'Created By' :
                         colKey === 'creationDate' ? 'Creation Date' :
                         colKey === 'approvalStatus' ? 'Approval Status' :
                         colKey.charAt(0).toUpperCase() + colKey.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="AllHolidays-icon-btn add" onClick={openAddModal} title="Add Holiday">
            <FiPlus />
          </button>
          <button className="AllHolidays-icon-btn" onClick={() => setSearchTerm('')} title="Refresh">
            <FiRefreshCw />
          </button>
          <button className="AllHolidays-icon-btn" title="Download">
            <FiDownload />
          </button>
        </div>
      </div>

      {/* Main Holidays Table Grid */}
      <div className="AllHolidays-table-container">
        <table className="AllHolidays-table">
          <thead>
            <tr>
              {columns.checkbox && (
                <th width="40">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={filteredHolidays.length > 0 && selectedIds.length === filteredHolidays.length}
                  />
                </th>
              )}
              {columns.id && <th>ID</th>}
              {columns.holidayName && <th>Holiday Name</th>}
              {columns.shift && <th>Shift</th>}
              {columns.date && <th>Date</th>}
              {columns.location && <th>Location</th>}
              {columns.holidayType && <th>Holiday Type</th>}
              {columns.createdBy && <th>Created By</th>}
              {columns.creationDate && <th>Creation Date</th>}
              {columns.approvalStatus && <th>Approval Status</th>}
              {columns.details && <th>Details</th>}
              {columns.actions && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredHolidays.map((holiday) => (
              <tr key={holiday.id} className={selectedIds.includes(holiday.id) ? 'selected-row' : ''}>
                {columns.checkbox && (
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(holiday.id)}
                      onChange={() => handleSelectRow(holiday.id)}
                    />
                  </td>
                )}
                {columns.id && <td>{holiday.id}</td>}
                {columns.holidayName && <td className="AllHolidays-primary-text">{holiday.name}</td>}
                {columns.shift && <td>{holiday.shift}</td>}
                {columns.date && (
                  <td>
                    <span className="AllHolidays-date-cell">
                      <FiCalendar className="cell-icon" /> {holiday.date}
                    </span>
                  </td>
                )}
                {columns.location && <td>{holiday.location}</td>}
                {columns.holidayType && <td>{holiday.type}</td>}
                {columns.createdBy && <td>{holiday.createdBy}</td>}
                {columns.creationDate && (
                  <td>
                    <span className="AllHolidays-date-cell">
                      <FiCalendar className="cell-icon" /> {holiday.creationDate}
                    </span>
                  </td>
                )}
                {columns.approvalStatus && (
                  <td>
                    <span className={`AllHolidays-status-badge ${holiday.status.toLowerCase()}`}>
                      {holiday.status}
                    </span>
                  </td>
                )}
                {columns.details && <td className="AllHolidays-details-cell">{holiday.details}</td>}
                {columns.actions && (
                  <td className="AllHolidays-actions-cell text-center">
                    <button className="AllHolidays-row-btn edit" onClick={() => openEditModal(holiday)}>
                      <FiEdit3 />
                    </button>
                    <button className="AllHolidays-row-btn delete" onClick={() => openDeleteModal(holiday)}>
                      <FiTrash2 />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="AllHolidays-pagination">
        <div className="AllHolidays-pagination-per-page">
          <span>Items per page:</span>
          <select defaultValue="10">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="AllHolidays-pagination-info">
          1 - {filteredHolidays.length} of {holidays.length}
          <button className="pagination-arrow" disabled>&lt;</button>
          <button className="pagination-arrow" disabled>&gt;</button>
        </div>
      </div>

      {/* Dynamic Modals Section (Smooth fade-in layouts) */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="AllHolidays-modal-overlay">
          <div className="AllHolidays-modal-card">
            <div className="AllHolidays-modal-header">
              <h3>{modalType === 'add' ? 'New Holiday' : formData.name || 'Edit Holiday'}</h3>
              <button className="AllHolidays-modal-close" onClick={closeModal}><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="AllHolidays-modal-form">
              <div className="AllHolidays-form-grid">
                
                <div className="AllHolidays-form-group">
                  <label>Holiday Name*</label>
                  <div className="AllHolidays-input-icon-wrapper">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    <span className="field-icon">📝</span>
                  </div>
                </div>

                <div className="AllHolidays-form-group">
                  <label>Date*</label>
                  <div className="AllHolidays-input-icon-wrapper">
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="AllHolidays-form-group">
                  <label>Location</label>
                  <div className="AllHolidays-input-icon-wrapper">
                    <input type="text" name="location" value={formData.location} placeholder="All Locations" onChange={handleInputChange} />
                    <span className="field-icon"><FiMapPin /></span>
                  </div>
                </div>

                <div className="AllHolidays-form-group">
                  <label>Shift</label>
                  <select name="shift" value={formData.shift} onChange={handleInputChange}>
                    <option value="">Select Shift</option>
                    <option value="All Shifts">All Shifts</option>
                    <option value="Day Shifts">Day Shifts</option>
                    <option value="Night Shifts">Night Shifts</option>
                  </select>
                </div>

                <div className="AllHolidays-form-group full-width">
                  <label>Details</label>
                  <textarea name="details" rows="3" value={formData.details} onChange={handleInputChange}></textarea>
                </div>

                <div className="AllHolidays-form-group">
                  <label>Holiday Type</label>
                  <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
                </div>

                <div className="AllHolidays-form-group">
                  <label>Created By</label>
                  <input type="text" name="createdBy" value={formData.createdBy} onChange={handleInputChange} />
                </div>

                <div className="AllHolidays-form-group">
                  <label>Creation Date</label>
                  <div className="AllHolidays-input-icon-wrapper">
                    <input type="date" name="creationDate" value={formData.creationDate} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="AllHolidays-form-group">
                  <label>Approval Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

              </div>
              <div className="AllHolidays-modal-footer">
                <button type="submit" className={`AllHolidays-btn-save ${modalType === 'add' ? 'disabled-style' : ''}`} disabled={modalType === 'add' && !formData.name}>Save</button>
                <button type="button" className="AllHolidays-btn-cancel" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5th Reference Image: Delete Confirmation Modal Dialog */}
      {modalType === 'delete' && (
        <div className="AllHolidays-modal-overlay">
          <div className="AllHolidays-confirm-card">
            <h3>Are you sure?</h3>
            <div className="AllHolidays-confirm-details">
              <p>Holiday Name: <span>{activeHoliday?.name}</span></p>
              <p>Location: <span>{activeHoliday?.location || 'All Locations'}</span></p>
              <p>Date: <span>{activeHoliday?.date}</span></p>
            </div>
            <div className="AllHolidays-confirm-footer">
              <button className="AllHolidays-btn-delete-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="AllHolidays-btn-cancel-confirm" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllHolidays;