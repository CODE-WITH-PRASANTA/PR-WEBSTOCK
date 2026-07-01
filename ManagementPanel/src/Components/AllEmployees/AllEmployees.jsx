import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRotateCw, FiDownload, 
  FiEdit, FiTrash2, FiUser, FiBriefcase, FiFlag, 
  FiBookOpen, FiPhone, FiMail, FiCalendar, FiMapPin, 
  FiDollarSign, FiX, FiCheckSquare, FiSquare 
} from 'react-icons/fi';
import './AllEmployees.css';

// Initial Employee Data matching the reference image exactly
const initialEmployees = [
  { id: 1, name: "John Doe", role: "Developer", department: "Java", mobile: "1234567890", joiningDate: "2018-03-01", birthDate: "2018-02-25", email: "john.doe@email.com", gender: "Male", address: "123 Elm Street, City, State, 12345", salary: 70000, status: "On Leave", degree: "C.E." },
  { id: 2, name: "Jane Smith", role: "Designer", department: "UI/UX", mobile: "2345678901", joiningDate: "2019-05-20", birthDate: "1995-08-12", email: "jane.smith@email.com", gender: "Female", address: "456 Oak Ave...", salary: 65000, status: "Active", degree: "B.Des" },
  { id: 3, name: "Mike Johnson", role: "Project Manager", department: "Management", mobile: "3456789120", joiningDate: "2020-09-01", birthDate: "1988-04-23", email: "mike.johnson@email.com", gender: "Male", address: "789 Pine Roa...", salary: 95000, status: "Inactive", degree: "MBA" },
  { id: 4, name: "Lisa Wang", role: "Tester", department: "Quality Assurance", mobile: "4567890123", joiningDate: "2021-03-15", birthDate: "1996-11-02", email: "lisa.wang@email.com", gender: "Female", address: "321 Maple St...", salary: 55000, status: "On Leave", degree: "B.Tech" },
  { id: 5, name: "Alex Brown", role: "DevOps Engineer", department: "Operations", mobile: "5678901234", joiningDate: "2017-11-10", birthDate: "1992-01-30", email: "alex.brown@email.com", gender: "Male", address: "654 Cedar La...", salary: 85000, status: "Active", degree: "M.Tech" },
  { id: 6, name: "Emily Jones", role: "Data Scientist", department: "Data Analytics", mobile: "6789012345", joiningDate: "2022-01-25", birthDate: "1994-07-19", email: "emily.jones@email.com", gender: "Female", address: "987 Birch Bo...", salary: 90000, status: "Inactive", degree: "Ph.D" },
  { id: 7, name: "Charles Taylor", role: "System Administrator", department: "IT Support", mobile: "7891203456", joiningDate: "2019-08-01", birthDate: "1991-05-14", email: "charles.taylor@email.com", gender: "Male", address: "159 Spruce C...", salary: 60000, status: "On Leave", degree: "B.Sc" },
  { id: 8, name: "Sarah Miller", role: "Marketing Specialist", department: "Marketing", mobile: "8901234567", joiningDate: "2020-04-20", birthDate: "1993-09-05", email: "sarah.miller@email.com", gender: "Female", address: "258 Walnut S...", salary: 58000, status: "Active", degree: "BBA" },
  { id: 9, name: "Olivia White", role: "HR Manager", department: "Human Resources", mobile: "9012345678", joiningDate: "2018-12-10", birthDate: "1989-12-25", email: "olivia.white@email.com", gender: "Female", address: "369 Ash Driv...", salary: 72000, status: "Inactive", degree: "MSW" },
  { id: 10, name: "Noah Harris", role: "Sales Executive", department: "Sales", mobile: "0123456789", joiningDate: "2019-09-20", birthDate: "1995-03-11", email: "noah.harris@email.com", gender: "Male", address: "111 Market S...", salary: 50000, status: "On Leave", degree: "B.Com" }
];

const AllEmployees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Column Visibility State
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, name: true, birthDate: false, role: true, department: true, 
    mobile: true, joiningDate: true, email: true, gender: true, address: true, status: true, actions: true
  });

  // Modal Control States
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '', department: '', role: '', degree: '', mobile: '', email: '',
    birthDate: '2026-07-01', gender: '', address: '', joiningDate: '', 
    salary: '0', lastPromotionDate: '', employeeStatus: 'Active', workLocation: ''
  });

  // Select All Handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredEmployees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Visibility Filter Toggle
  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // Open Add/Edit/Delete workflows
  const openAddModal = () => {
    setFormData({
      name: '', department: '', role: '', degree: '', mobile: '', email: '',
      birthDate: '2026-07-01', gender: '', address: '', joiningDate: '', 
      salary: '0', lastPromotionDate: '', employeeStatus: 'Active', workLocation: ''
    });
    setModalType('add');
  };

  const openEditModal = (emp) => {
    setCurrentEmployee(emp);
    setFormData({ ...emp, employeeStatus: emp.status });
    setModalType('edit');
  };

  const openDeleteModal = (emp) => {
    setCurrentEmployee(emp);
    setModalType('delete');
  };

  // Actions
  const handleSave = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newEmp = {
        ...formData,
        id: Date.now(),
        status: formData.employeeStatus || 'Active'
      };
      setEmployees([...employees, newEmp]);
    } else if (modalType === 'edit') {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? { ...formData, status: formData.employeeStatus } : emp));
    }
    setModalType(null);
  };

  const handleDeleteConfirm = () => {
    setEmployees(employees.filter(emp => emp.id !== currentEmployee.id));
    setModalType(null);
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="AllEmployees-container">
      {/* Top Header Breadcrumb */}
      <div className="AllEmployees-header">
        <h2 className="AllEmployees-title">All Employees</h2>
        <div className="AllEmployees-breadcrumb">
          <span className="breadcrumb-home">🏠</span> &gt; Employees &gt; <span className="breadcrumb-active">All Employees</span>
        </div>
      </div>

      {/* Control Actions Bar */}
      <div className="AllEmployees-toolbar">
        <div className="toolbar-left">
          <span className="toolbar-tab-active">All Employees</span>
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="toolbar-right">
          <button className="icon-btn filter-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
            <FiFilter />
          </button>
          
          {/* Column Show/Hide Dropdown */}
          {showFilterDropdown && (
            <div className="column-dropdown">
              <div className="dropdown-title">Show/Hide Column</div>
              <div className="dropdown-list custom-scrollbar">
                {Object.keys(visibleColumns).map((col) => (
                  <label key={col} className="dropdown-item">
                    <input 
                      type="checkbox" 
                      checked={visibleColumns[col]} 
                      onChange={() => toggleColumn(col)} 
                    />
                    <span className="capitalize">{col}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button className="icon-btn add-btn" onClick={openAddModal}>
            <FiPlus />
          </button>
          <button className="icon-btn refresh-btn" onClick={() => setEmployees(initialEmployees)}>
            <FiRotateCw />
          </button>
          <button className="icon-btn download-btn">
            <FiDownload />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive-container custom-scrollbar">
        <table className="AllEmployees-table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th width="40px">
                  <input 
                    type="checkbox" 
                    checked={filteredEmployees.length > 0 && selectedIds.length === filteredEmployees.length} 
                    onChange={handleSelectAll} 
                  />
                </th>
              )}
              {visibleColumns.id && <th>ID</th>}
              {visibleColumns.name && <th>Name</th>}
              {visibleColumns.role && <th>Role</th>}
              {visibleColumns.department && <th>Department</th>}
              {visibleColumns.mobile && <th>Mobile</th>}
              {visibleColumns.joiningDate && <th>Joining Date</th>}
              {visibleColumns.birthDate && <th>Birth Date</th>}
              {visibleColumns.email && <th>Email</th>}
              {visibleColumns.gender && <th>Gender</th>}
              {visibleColumns.address && <th>Address</th>}
              {visibleColumns.status && <th>Employee Status</th>}
              {visibleColumns.actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className={selectedIds.includes(emp.id) ? 'row-selected' : ''}>
                {visibleColumns.checkbox && (
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(emp.id)} 
                      onChange={() => handleSelectRow(emp.id)} 
                    />
                  </td>
                )}
                {visibleColumns.id && <td>{emp.id}</td>}
                {visibleColumns.name && (
                  <td className="cell-name">
                    <div className="avatar-placeholder">{emp.name.charAt(0)}</div>
                    <span>{emp.name}</span>
                  </td>
                )}
                {visibleColumns.role && <td>{emp.role}</td>}
                {visibleColumns.department && <td>{emp.department}</td>}
                {visibleColumns.mobile && (
                  <td className="cell-icon text-muted"><FiPhone className="cell-inline-icon text-green" /> {emp.mobile}</td>
                )}
                {visibleColumns.joiningDate && (
                  <td className="cell-icon"><FiCalendar className="cell-inline-icon text-orange" /> {emp.joiningDate}</td>
                )}
                {visibleColumns.birthDate && <td>{emp.birthDate}</td>}
                {visibleColumns.email && (
                  <td className="cell-icon"><FiMail className="cell-inline-icon text-red" /> <span className="truncated-text">{emp.email}</span></td>
                )}
                {visibleColumns.gender && (
                  <td>
                    <span className={`badge-gender ${emp.gender.toLowerCase()}`}>
                      {emp.gender}
                    </span>
                  </td>
                )}
                {visibleColumns.address && (
                  <td className="cell-icon"><FiMapPin className="cell-inline-icon text-blue" /> <span className="truncated-text">{emp.address}</span></td>
                )}
                {visibleColumns.status && (
                  <td>
                    <span className={`badge-status ${emp.status.toLowerCase().replace(" ", "")}`}>
                      {emp.status}
                    </span>
                  </td>
                )}
                {visibleColumns.actions && (
                  <td>
                    <div className="action-buttons">
                      <button className="action-edit" onClick={() => openEditModal(emp)}><FiEdit /></button>
                      <button className="action-delete" onClick={() => openDeleteModal(emp)}><FiTrash2 /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Elements */}
      <div className="AllEmployees-footer">
        <div className="pagination-right">
          <span>Items per page:</span>
          <select className="items-select" defaultValue="10">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          <span className="pagination-count">1 - {filteredEmployees.length} of {employees.length}</span>
          <button className="page-nav-btn" disabled>&lt;</button>
          <button className="page-nav-btn" disabled>&gt;</button>
        </div>
      </div>

      {/* ================= ADD / EDIT MODAL WORKFLOWS ================= */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="modal-overlay">
          <div className="modal-container scrollable-modal">
            <div className="modal-header-bar">
              <div className="modal-title-layout">
                <div className="modal-header-avatar">👤</div>
                <h3>{modalType === 'add' ? 'New Employee' : `Edit Employee: ${currentEmployee?.name}`}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setModalType(null)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSave} className="modal-form-body custom-scrollbar">
              <div className="form-grid">
                <div className="form-field">
                  <label>Name*</label>
                  <div className="input-wrapper">
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <FiUser className="input-field-icon" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Department*</label>
                  <div className="input-wrapper">
                    <input type="text" required value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                    <FiBriefcase className="input-field-icon" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Role*</label>
                  <div className="input-wrapper">
                    <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                    <FiFlag className="input-field-icon" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Degree</label>
                  <div className="input-wrapper">
                    <input type="text" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} />
                    <FiBookOpen className="input-field-icon" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Mobile*</label>
                  <div className="input-wrapper">
                    <input type="text" required value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                    <FiPhone className="input-field-icon" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Email*</label>
                  <div className="input-wrapper">
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <FiMail className="input-field-icon" />
                  </div>
                </div>

                <div className="form-field">
                  <label>Birth Date*</label>
                  <div className="input-wrapper">
                    <input type="date" required value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-field full-width">
                  <label>Address</label>
                  <textarea rows="3" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Address"></textarea>
                </div>

                <div className="form-field">
                  <label>Joining Date*</label>
                  <div className="input-wrapper">
                    <input type="date" required value={formData.joiningDate} onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Salary*</label>
                  <div className="input-wrapper">
                    <input type="number" required value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Last Promotion Date</label>
                  <div className="input-wrapper">
                    <input type="date" value={formData.lastPromotionDate} onChange={(e) => setFormData({...formData, lastPromotionDate: e.target.value})} />
                  </div>
                </div>

                <div className="form-field">
                  <label>Employee Status*</label>
                  <select value={formData.employeeStatus} onChange={(e) => setFormData({...formData, employeeStatus: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-field full-width">
                  <label>Work Location*</label>
                  <select required value={formData.workLocation} onChange={(e) => setFormData({...formData, workLocation: e.target.value})}>
                    <option value="">Select Location</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions-footer">
                <button type="submit" className="btn-save">Save</button>
                <button type="button" className="btn-cancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {modalType === 'delete' && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <h3>Are you sure?</h3>
            <div className="confirmation-details">
              <p><strong>Name:</strong> {currentEmployee?.name}</p>
              <p><strong>Department:</strong> {currentEmployee?.department}</p>
              <p><strong>Mobile:</strong> {currentEmployee?.mobile}</p>
            </div>
            <div className="confirmation-actions">
              <button className="btn-delete-confirm" onClick={handleDeleteConfirm}>Delete</button>
              <button className="btn-cancel-confirm" onClick={() => setModalType(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;