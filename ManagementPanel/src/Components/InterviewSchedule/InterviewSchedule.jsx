import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRefreshCw, FiDownload, 
  FiEdit2, FiTrash2, FiUser, FiBriefcase, FiCalendar, 
  FiClock, FiX, FiCheck 
} from 'react-icons/fi';
import './InterviewSchedule.css';

const initialData = [
  { id: 1, name: 'John Doe', title: 'Angular Developer', interviewer: 'Sarah Smith', date: '2023-11-01', time: '10:00 AM', round: 'Technical Round 1', status: 'Scheduled' },
  { id: 2, name: 'Michael Brown', title: 'UX Designer', interviewer: 'Emily Davis', date: '2023-11-02', time: '11:00 AM', round: 'Screening', status: 'Completed' },
  { id: 3, name: 'Emma Wilson', title: 'Marketing Specialist', interviewer: 'David Lee', date: '2023-11-03', time: '02:00 PM', round: 'HR Round', status: 'Scheduled' },
  { id: 4, name: 'James Miller', title: 'Project Manager', interviewer: 'Robert Taylor', date: '2023-11-04', time: '09:00 AM', round: 'Managerial Round', status: 'Pending' },
  { id: 5, name: 'Olivia Moore', title: 'Data Analyst', interviewer: 'William Anderson', date: '2023-11-05', time: '03:00 PM', round: 'Technical Round 2', status: 'Rescheduled' },
  { id: 6, name: 'William Jackson', title: 'Backend Developer', interviewer: 'Richard Thomas', date: '2023-11-06', time: '11:30 AM', round: 'Technical Round 1', status: 'Completed' },
  { id: 7, name: 'Sophia White', title: 'Content Writer', interviewer: 'Patricia Martinez', date: '2023-11-07', time: '10:30 AM', round: 'Screening', status: 'Scheduled' },
  { id: 8, name: 'Alexander Harris', title: 'DevOps Engineer', interviewer: 'Charles Clark', date: '2023-11-08', time: '04:00 PM', round: 'Technical Round 2', status: 'Cancelled' },
  { id: 9, name: 'Charlotte Clark', title: 'Sales Executive', interviewer: 'Susan Lewis', date: '2023-11-09', time: '01:00 PM', round: 'HR Round', status: 'Scheduled' },
  { id: 10, name: 'Benjamin Lewis', title: 'Customer Support', interviewer: 'Joseph Robinson', date: '2023-11-10', time: '12:00 PM', round: 'Screening', status: 'Completed' },
];

const InterviewSchedule = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    candidateName: true,
    jobTitle: true,
    interviewer: true,
    date: true,
    time: true,
    round: true,
    status: true,
    actions: true
  });

  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', title: '', interviewer: '', date: '2026-07-06', time: '', round: 'Screening', status: 'Scheduled'
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
    item.interviewer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setData(initialData);
    setSearchQuery('');
    setSelectedRows([]);
  };

  const handleDownload = () => {
    const headers = ['Candidate Name', 'Job Title', 'Interviewer', 'Date', 'Time', 'Round', 'Status'];
    const rows = filteredData.map(item => [item.name, item.title, item.interviewer, item.date, item.time, item.round, item.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "interview_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openAddModal = () => {
    setFormData({ name: '', title: '', interviewer: '', date: '2026-07-06', time: '', round: 'Screening', status: 'Scheduled' });
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
        interviewer: formData.interviewer,
        date: formData.date,
        time: formData.time || '12:00 PM',
        round: formData.round,
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
    <div className="InterviewSchedule">
      {/* Outer Page Title and Breadcrumb Container */}
      <div className="InterviewSchedule-top-bar">
        <h1 className="InterviewSchedule-main-title">Interview Schedule</h1>
        <div className="InterviewSchedule-breadcrumb">
          <span className="InterviewSchedule-breadcrumb-root">🏠 Jobs</span> 
          <span className="InterviewSchedule-breadcrumb-separator">&gt;</span> 
          <span className="InterviewSchedule-breadcrumb-current">Interview Schedule</span>
        </div>
      </div>

      <div className="InterviewSchedule-container">
        {/* Table Inner Layout Header Bar */}
        <div className="InterviewSchedule-header">
          <div className="InterviewSchedule-header-left">
            <span className="InterviewSchedule-inner-label">Interview Schedule</span>
            <div className="InterviewSchedule-search-box">
              <FiSearch className="InterviewSchedule-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="InterviewSchedule-header-right">
            <div className="InterviewSchedule-filter-wrapper">
              <button className="InterviewSchedule-icon-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                <FiFilter />
              </button>
              {showFilterDropdown && (
                <div className="InterviewSchedule-dropdown">
                  <div className="InterviewSchedule-dropdown-title">Show/Hide Column</div>
                  <div className="InterviewSchedule-dropdown-scroll">
                    {Object.keys(columns).map((col) => (
                      <label key={col} className="InterviewSchedule-dropdown-item">
                        <input 
                          type="checkbox" 
                          checked={columns[col]} 
                          onChange={(e) => setColumns({...columns, [col]: e.target.checked})}
                        />
                        <span className="InterviewSchedule-custom-checkbox">
                          {columns[col] && <FiCheck />}
                        </span>
                        <span className="InterviewSchedule-dropdown-label">
                          {col === 'candidateName' ? 'Candidate Name' : col === 'jobTitle' ? 'Job Title' : col.charAt(0).toUpperCase() + col.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="InterviewSchedule-icon-btn InterviewSchedule-btn-add" onClick={openAddModal}>
              <FiPlus />
            </button>
            <button className="InterviewSchedule-icon-btn" onClick={handleRefresh}>
              <FiRefreshCw />
            </button>
            <button className="InterviewSchedule-icon-btn" onClick={handleDownload}>
              <FiDownload />
            </button>
          </div>
        </div>

        {/* Table Layout Container */}
        <div className="InterviewSchedule-table-wrapper">
          <table className="InterviewSchedule-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th width="40">
                    <label className="InterviewSchedule-table-checkbox">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                      />
                      <span className="InterviewSchedule-custom-checkbox">
                        {filteredData.length > 0 && selectedRows.length === filteredData.length && <FiCheck />}
                      </span>
                    </label>
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.candidateName && <th>Candidate Name</th>}
                {columns.jobTitle && <th>Job Title</th>}
                {columns.interviewer && <th>Interviewer</th>}
                {columns.date && <th>Date</th>}
                {columns.time && <th>Time</th>}
                {columns.round && <th>Round</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected-row' : ''}>
                  {columns.checkbox && (
                    <td>
                      <label className="InterviewSchedule-table-checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                        />
                        <span className="InterviewSchedule-custom-checkbox">
                          {selectedRows.includes(item.id) && <FiCheck />}
                        </span>
                      </label>
                    </td>
                  )}
                  {columns.id && <td>{item.id}</td>}
                  {columns.candidateName && <td className="font-medium">{item.name}</td>}
                  {columns.jobTitle && <td>{item.title}</td>}
                  {columns.interviewer && <td>{item.interviewer}</td>}
                  {columns.date && (
                    <td>
                      <div className="InterviewSchedule-cell-date">
                        <FiCalendar className="InterviewSchedule-cell-icon" /> {item.date}
                      </div>
                    </td>
                  )}
                  {columns.time && <td>{item.time}</td>}
                  {columns.round && <td>{item.round}</td>}
                  {columns.status && (
                    <td>
                      <span className={`InterviewSchedule-status badge-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="InterviewSchedule-actions">
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

        {/* Footer Area */}
        <div className="InterviewSchedule-footer">
          <div className="InterviewSchedule-footer-left">
            <span>Items per page:</span>
            <select className="InterviewSchedule-page-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="InterviewSchedule-footer-right">
            <span>1 - {filteredData.length} of {data.length}</span>
            <div className="InterviewSchedule-pagination-btns">
              <button disabled>&lt;</button>
              <button disabled>&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Overlay Forms */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="InterviewSchedule-modal-backdrop">
          <div className="InterviewSchedule-modal-card">
            <div className="InterviewSchedule-modal-header">
              <h3>{modalType === 'add' ? 'New Interview Schedule' : 'Edit Interview'}</h3>
              <button className="close-btn" onClick={() => setModalType(null)}><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="InterviewSchedule-modal-form">
              <div className="InterviewSchedule-form-grid">
                <div className="InterviewSchedule-form-group">
                  <label>Candidate Name*</label>
                  <div className="InterviewSchedule-input-wrapper">
                    <input 
                      type="text" 
                      required
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                    <FiUser className="input-icon" />
                  </div>
                </div>

                <div className="InterviewSchedule-form-group">
                  <label>Job Title*</label>
                  <div className="InterviewSchedule-input-wrapper">
                    <input 
                      type="text" 
                      required
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    />
                    <FiBriefcase className="input-icon" />
                  </div>
                </div>

                <div className="InterviewSchedule-form-group">
                  <label>Interviewer*</label>
                  <div className="InterviewSchedule-input-wrapper">
                    <input 
                      type="text" 
                      required
                      value={formData.interviewer} 
                      onChange={(e) => setFormData({...formData, interviewer: e.target.value})} 
                    />
                    <FiUser className="input-icon" />
                  </div>
                </div>

                <div className="InterviewSchedule-form-group relative-label">
                  <span className="floating-tag">Date*</span>
                  <div className="InterviewSchedule-input-wrapper">
                    <input 
                      type="date" 
                      required
                      value={formData.date} 
                      onChange={(e) => setFormData({...formData, date: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="InterviewSchedule-form-group">
                  <label>Time*</label>
                  <div className="InterviewSchedule-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="10:00 AM"
                      required
                      value={formData.time} 
                      onChange={(e) => setFormData({...formData, time: e.target.value})} 
                    />
                    <FiClock className="input-icon" />
                  </div>
                </div>

                <div className="InterviewSchedule-form-group relative-label">
                  <span className="floating-tag">Round*</span>
                  <select 
                    value={formData.round} 
                    onChange={(e) => setFormData({...formData, round: e.target.value})}
                    className="InterviewSchedule-select-field"
                  >
                    <option value="Screening">Screening</option>
                    <option value="Technical Round 1">Technical Round 1</option>
                    <option value="Technical Round 2">Technical Round 2</option>
                    <option value="Managerial Round">Managerial Round</option>
                    <option value="HR Round">HR Round</option>
                  </select>
                </div>

                <div className="InterviewSchedule-form-group relative-label full-width">
                  <span className="floating-tag">Status*</span>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="InterviewSchedule-select-field"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="InterviewSchedule-form-actions">
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

      {/* Delete Confirmation Overlay Modal */}
      {modalType === 'delete' && (
        <div className="InterviewSchedule-modal-backdrop">
          <div className="InterviewSchedule-delete-card">
            <h2>Are you sure?</h2>
            <p className="delete-subtitle">Are you sure you want to delete this interview schedule?</p>
            <div className="delete-info-box">
              <p>Candidate: {activeItem?.name}</p>
              <p>Date: {activeItem?.date}</p>
            </div>
            <div className="InterviewSchedule-delete-actions">
              <button className="btn-delete-confirm" onClick={handleDelete}>Delete</button>
              <button className="btn-cancel-confirm" onClick={() => setModalType(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;