import React, { useState } from 'react';
import { 
  BiSearch, 
  BiFilterAlt, 
  BiPlusCircle, 
  BiRefresh, 
  BiDownload, 
  BiEdit, 
  BiTrash, 
  BiCalendar,
  BiChevronLeft,
  BiChevronRight,
  BiBriefcaseAlt2,
  BiFlag,
  BiGroup,
  BiChevronDown,
  BiFileBlank
} from 'react-icons/bi';
import './JobsList.css';

const initialJobsData = [
  { id: 1, title: 'Java Developer 2+ Yeaers of experience', status: 'Open', date: '2022-02-10', role: 'Android Developer', vacancies: 6, department: 'Java', type: 'Full Time' },
  { id: 2, title: 'Android Developer 4+ ...', status: 'Cancelled', date: '2022-02-12', role: 'Java Developer', vacancies: 4, department: 'Designing', type: 'Part Time' },
  { id: 3, title: 'Web Designer Fresher', status: 'Open', date: '2022-03-18', role: 'IOS Developer', vacancies: 7, department: 'Marketing', type: 'Internship' },
  { id: 4, title: 'Tester with 1+ years of...', status: 'Closed', date: '2022-03-05', role: 'Android Developer', vacancies: 9, department: 'Java', type: 'Other' },
  { id: 5, title: 'PHP Developer Fresher', status: 'Closed', date: '2022-02-27', role: 'Web Designer', vacancies: 6, department: 'Accounting', type: 'Full Time' },
  { id: 6, title: 'IOS Developer with 2+ ...', status: 'Open', date: '2022-04-17', role: 'Tester', vacancies: 4, department: 'Developing', type: 'Full Time' },
  { id: 7, title: 'Angular developer fres...', status: 'Cancelled', date: '2022-01-11', role: 'Web Designer', vacancies: 7, department: 'Tesing', type: 'Full Time' },
  { id: 8, title: 'Android Developer Fre...', status: 'Closed', date: '2022-02-07', role: 'Android Developer', vacancies: 10, department: 'Tesing', type: 'Part Time' },
  { id: 9, title: 'Java Developer 7+ Yea...', status: 'Open', date: '2022-03-21', role: 'Web Designer', vacancies: 6, department: 'Java', type: 'Part Time' },
  { id: 10, title: 'Java Team Leader', status: 'Closed', date: '2022-02-26', role: 'Tester', vacancies: 1, department: 'Designing', type: 'Part Time' }
];

const JobsList = () => {
  // Core States
  const [jobs, setJobs] = useState(initialJobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  
  // Filtering Columns Visibility State
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    jobTitle: true,
    status: true,
    datePosted: true,
    role: true,
    vacancies: true,
    department: true,
    jobType: true,
    actions: true,
  });

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [currentJob, setCurrentJob] = useState(null);

  // Pagination States
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Form Field States (Add / Edit)
  const [formData, setFormData] = useState({
    title: '', department: '', role: '', type: 'Full Time', vacancies: '', status: 'Open', date: '2026-07-06'
  });

  // Checkbox Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedJobIds(jobs.map(j => j.id));
    } else {
      setSelectedJobIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedJobIds.includes(id)) {
      setSelectedJobIds(selectedJobIds.filter(item => item !== id));
    } else {
      setSelectedJobIds([...selectedJobIds, id]);
    }
  };

  // Action Triggers
  const openAddModal = () => {
    setFormData({ title: '', department: '', role: '', type: 'Full Time', vacancies: '', status: 'Open', date: '2026-07-06' });
    setActiveModal('add');
  };

  const openEditModal = (job) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      role: job.role,
      type: job.type,
      vacancies: job.vacancies,
      status: job.status,
      date: job.date
    });
    setActiveModal('edit');
  };

  const openDeleteModal = (job) => {
    setCurrentJob(job);
    setActiveModal('delete');
  };

  const closeModal = () => {
    setActiveModal(null);
    setCurrentJob(null);
  };

  // Form Submissions
  const handleSaveAdd = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      title: formData.title,
      status: formData.status,
      date: formData.date,
      role: formData.role,
      vacancies: Number(formData.vacancies) || 0,
      department: formData.department,
      type: formData.type
    };
    setJobs([newJob, ...jobs]);
    closeModal();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setJobs(jobs.map(j => j.id === currentJob.id ? { ...j, ...formData, vacancies: Number(formData.vacancies) } : j));
    closeModal();
  };

  const handleDeleteConfirm = () => {
    setJobs(jobs.filter(j => j.id !== currentJob.id));
    setSelectedJobIds(selectedJobIds.filter(id => id !== currentJob.id));
    closeModal();
  };

  // Global Actions (Refresh & Download)
  const handleRefresh = () => {
    setSearchTerm('');
    setJobs(initialJobsData);
    setSelectedJobIds([]);
  };

  const handleDownloadCSV = () => {
    const headers = ['Job Title', 'Status', 'Date Posted', 'Role', 'Vacancies', 'Department', 'Job Type'];
    const csvRows = [headers.join(',')];
    
    jobs.forEach(job => {
      const values = [
        `"${job.title}"`,
        `"${job.status}"`,
        `"${job.date}"`,
        `"${job.role}"`,
        job.vacancies,
        `"${job.department}"`,
        `"${job.type}"`
      ];
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'JobsList_Report.csv');
    a.click();
  };

  // Toggle visible columns
  const toggleColumnVisibility = (colKey) => {
    setColumns({ ...columns, [colKey]: !columns[colKey] });
  };

  // Filter & Search computation
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="JobsList-container">
      {/* Breadcrumb Header Line */}
      <div className="JobsList-breadcrumb">
        <span className="JobsList-breadcrumb-home">🏠</span> &gt; Jobs &gt; <span className="JobsList-breadcrumb-active">Jobs List</span>
      </div>

      <div className="JobsList-card">
        {/* Actions Bar Panel */}
        <div className="JobsList-actionbar">
          <div className="JobsList-actionbar-left">
            <h2 className="JobsList-title">Jobs List</h2>
            <div className="JobsList-search-box">
              <BiSearch className="JobsList-search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="JobsList-actionbar-right">
            {/* Filter Toggle Trigger Button */}
            <div className="JobsList-filter-wrapper">
              <button 
                className="JobsList-btn-icon" 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                title="Column Visibility"
              >
                <BiFilterAlt />
              </button>
              
              {showFilterDropdown && (
                <div className="JobsList-dropdown">
                  <div className="JobsList-dropdown-title">Show/Hide Column</div>
                  <div className="JobsList-dropdown-scroll">
                    {Object.keys(columns).map((key) => (
                      <label key={key} className="JobsList-dropdown-item">
                        <input 
                          type="checkbox" 
                          checked={columns[key]} 
                          onChange={() => toggleColumnVisibility(key)}
                        />
                        <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="JobsList-btn-icon JobsList-btn-add" onClick={openAddModal} title="Add Job"><BiPlusCircle /></button>
            <button className="JobsList-btn-icon" onClick={handleRefresh} title="Refresh Table"><BiRefresh /></button>
            <button className="JobsList-btn-icon JobsList-btn-download" onClick={handleDownloadCSV} title="Download CSV"><BiDownload /></button>
          </div>
        </div>

        {/* Dynamic Responsive Data Table */}
        <div className="JobsList-table-responsive">
          <table className="JobsList-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={jobs.length > 0 && selectedJobIds.length === jobs.length}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.jobTitle && <th>Job Title</th>}
                {columns.status && <th>Status</th>}
                {columns.datePosted && <th>Date Posted</th>}
                {columns.role && <th>Role</th>}
                {columns.vacancies && <th>Vacancies</th>}
                {columns.department && <th>Department</th>}
                {columns.jobType && <th>Job Type</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="10" className="JobsList-no-data">No jobs found matches the criteria.</td>
                </tr>
              ) : (
                filteredJobs.slice(0, itemsPerPage).map((job) => (
                  <tr key={job.id} className={selectedJobIds.includes(job.id) ? 'JobsList-row-selected' : ''}>
                    {columns.checkbox && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedJobIds.includes(job.id)}
                          onChange={() => handleSelectRow(job.id)}
                        />
                      </td>
                    )}
                    {columns.id && <td>{job.id}</td>}
                    {columns.jobTitle && <td className="JobsList-cell-title">{job.title}</td>}
                    {columns.status && (
                      <td>
                        <span className={`JobsList-badge badge-${job.status.toLowerCase()}`}>
                          {job.status}
                        </span>
                      </td>
                    )}
                    {columns.datePosted && (
                      <td className="JobsList-cell-date">
                        <BiCalendar className="JobsList-cell-icon" /> {job.date.split('-').reverse().join('/')}
                      </td>
                    )}
                    {columns.role && <td>{job.role}</td>}
                    {columns.vacancies && <td>{job.vacancies}</td>}
                    {columns.department && <td>{job.department}</td>}
                    {columns.jobType && <td>{job.type}</td>}
                    {columns.actions && (
                      <td>
                        <div className="JobsList-actions-cell">
                          <button className="JobsList-action-btn edit" onClick={() => openEditModal(job)}><BiEdit /></button>
                          <button className="JobsList-action-btn delete" onClick={() => openDeleteModal(job)}><BiTrash /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Desktop View Table Pagination controls */}
        <div className="JobsList-pagination">
          <div className="JobsList-pagination-left">
            <span>Items per page:</span>
            <div className="JobsList-select-wrapper">
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <BiChevronDown className="JobsList-select-chevron" />
            </div>
          </div>
          <div className="JobsList-pagination-right">
            <span>1 - {Math.min(itemsPerPage, filteredJobs.length)} of {filteredJobs.length}</span>
            <button className="JobsList-page-arrow" disabled><BiChevronLeft /></button>
            <button className="JobsList-page-arrow" disabled><BiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* --- ADD NEW JOB MODAL (4th Reference Image Style) --- */}
      {activeModal === 'add' && (
        <div className="JobsList-modal-overlay">
          <div className="JobsList-modal-card">
            <div className="JobsList-modal-header">
              <h3>New Job</h3>
              <button className="JobsList-modal-close-x" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSaveAdd} className="JobsList-modal-form">
              <div className="JobsList-form-group full-width">
                <label>Job Title*</label>
                <div className="JobsList-input-icon-wrapper">
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <BiFileBlank className="JobsList-input-icon" />
                </div>
              </div>

              <div className="JobsList-form-row">
                <div className="JobsList-form-group">
                  <label>department*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="text" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
                    <BiBriefcaseAlt2 className="JobsList-input-icon" />
                  </div>
                </div>
                <div className="JobsList-form-group">
                  <label>role*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                    <BiFlag className="JobsList-input-icon" />
                  </div>
                </div>
              </div>

              <div className="JobsList-form-row">
                <div className="JobsList-form-group">
                  <label>Job Type*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Other">Other</option>
                    </select>
                    <BiChevronDown className="JobsList-input-icon select-arrow" />
                  </div>
                </div>
                <div className="JobsList-form-group">
                  <label>Vacancies</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="number" value={formData.vacancies} onChange={e => setFormData({...formData, vacancies: e.target.value})} />
                    <BiGroup className="JobsList-input-icon" />
                  </div>
                </div>
              </div>

              <div className="JobsList-form-row">
                <div className="JobsList-form-group">
                  <label>Status*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <BiChevronDown className="JobsList-input-icon select-arrow" />
                  </div>
                </div>
                <div className="JobsList-form-group">
                  <label>Expire date*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="JobsList-modal-footer">
                <button type="submit" className="JobsList-btn-save shadow-save">Save</button>
                <button type="button" className="JobsList-btn-cancel" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT JOB MODAL (5th Reference Image Style) --- */}
      {activeModal === 'edit' && (
        <div className="JobsList-modal-overlay">
          <div className="JobsList-modal-card">
            <div className="JobsList-modal-header">
              <h3>Edit Job: {currentJob?.title}</h3>
              <button className="JobsList-modal-close-x" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSaveEdit} className="JobsList-modal-form">
              <div className="JobsList-form-group full-width variant-focused">
                <label className="floating-label">Job Title*</label>
                <div className="JobsList-input-icon-wrapper">
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <BiFileBlank className="JobsList-input-icon" />
                </div>
              </div>

              <div className="JobsList-form-row">
                <div className="JobsList-form-group variant-focused">
                  <label className="floating-label">department*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="text" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
                    <BiBriefcaseAlt2 className="JobsList-input-icon" />
                  </div>
                </div>
                <div className="JobsList-form-group variant-focused">
                  <label className="floating-label">role*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                    <BiFlag className="JobsList-input-icon" />
                  </div>
                </div>
              </div>

              <div className="JobsList-form-row">
                <div className="JobsList-form-group variant-focused">
                  <label className="floating-label">Job Type*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Other">Other</option>
                    </select>
                    <BiChevronDown className="JobsList-input-icon select-arrow" />
                  </div>
                </div>
                <div className="JobsList-form-group variant-focused">
                  <label className="floating-label">Vacancies</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="number" value={formData.vacancies} onChange={e => setFormData({...formData, vacancies: e.target.value})} />
                    <BiGroup className="JobsList-input-icon" />
                  </div>
                </div>
              </div>

              <div className="JobsList-form-row">
                <div className="JobsList-form-group variant-focused">
                  <label className="floating-label">Status*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <BiChevronDown className="JobsList-input-icon select-arrow" />
                  </div>
                </div>
                <div className="JobsList-form-group variant-focused">
                  <label className="floating-label">Expire date*</label>
                  <div className="JobsList-input-icon-wrapper">
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="JobsList-modal-footer">
                <button type="submit" className="JobsList-btn-save-blue">Save</button>
                <button type="button" className="JobsList-btn-cancel" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE MODAL (6th Reference Image Style) --- */}
      {activeModal === 'delete' && (
        <div className="JobsList-modal-overlay">
          <div className="JobsList-delete-modal-card">
            <h2>Are you sure?</h2>
            <div className="JobsList-delete-details">
              <p><strong>Job Title:</strong> {currentJob?.title}</p>
              <p><strong>Department:</strong> {currentJob?.department}</p>
              <p><strong>Vacancies:</strong> {currentJob?.vacancies}</p>
            </div>
            <div className="JobsList-delete-actions">
              <button className="JobsList-btn-delete-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="JobsList-btn-cancel-confirm" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsList;