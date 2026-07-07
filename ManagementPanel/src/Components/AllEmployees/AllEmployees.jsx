import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRotateCw, 
  FiEdit, FiTrash2, FiUser, FiBriefcase, FiFlag, 
  FiBookOpen, FiPhone, FiMail, FiCalendar, FiMapPin, 
  FiX, FiLoader
} from 'react-icons/fi';
import './AllEmployees.css';
import API from "../../api/axios"; // Your pre-configured axios instance

const AllEmployees = () => {

  
  // Server-driven state
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Query, Filter, and Pagination conditions
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Layout UI states
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // Columns visibility toggles
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, 
    employeeId: true, 
    name: true, 
    role: true, 
    department: true, 
    mobile: true, 
    joiningDate: true, 
    email: true,    
    gender: true,   
    address: true,  
    status: true, 
    actions: true
  });

  // Modal contexts
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Form Initial Blueprint
  const initialFormState = {
    name: '', department: '', role: '', degree: '', mobile: '', email: '',
    birthDate: '', gender: '', address: '', joiningDate: '', 
    salary: '', lastPromotionDate: '', employeeStatus: 'Active', workLocation: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch Employees from backend
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/employees', {
        params: {
          page: currentPage,
          limit: limit,
          search: searchTerm,
          status: statusFilter
        }
      });
      if (response.data.success) {
        setEmployees(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalEmployees(response.data.totalEmployees);
      }
    } catch (err) {
      console.error("Fetch implementation error: ", err);
      setError(err.response?.data?.message || "Failed to load employee directory records.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchTerm, statusFilter]);

  // Debounced effect for live tracking search query updates
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEmployees();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchEmployees]);

  // Helper parsing for date inputs
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString.substring(0, 10);
  };

  // Mass selection mechanics
  const handleSelectAll = () => {
    if (selectedIds.length === employees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(employees.map(emp => emp._id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // Open Modal triggers
  const openAddModal = () => {
    setFormData(initialFormState);
    setModalType('add');
  };

  const openEditModal = (emp) => {
    setCurrentEmployee(emp);
    setFormData({
      name: emp.name || '',
      department: emp.department || '',
      role: emp.role || '',
      degree: emp.degree || '',
      mobile: emp.mobile || '',
      email: emp.email || '',
      birthDate: formatDateForInput(emp.birthDate),
      gender: emp.gender || '',
      address: emp.address || '',
      joiningDate: formatDateForInput(emp.joiningDate),
      salary: emp.salary ?? 0,
      lastPromotionDate: formatDateForInput(emp.lastPromotionDate),
      employeeStatus: emp.employeeStatus || 'Active', 
      workLocation: emp.workLocation || ''
    });
    setModalType('edit');
  };

  const openDeleteModal = (emp) => {
    setCurrentEmployee(emp);
    setModalType('delete');
  };

  // Create / Update execution block
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedFormData = { ...formData };
    if (!cleanedFormData.employeeId || cleanedFormData.employeeId === "") {
      delete cleanedFormData.employeeId;
    }

    if (cleanedFormData.gender === "") cleanedFormData.gender = "";
    if (cleanedFormData.workLocation === "") cleanedFormData.workLocation = "";
    if (cleanedFormData.birthDate === "") delete cleanedFormData.birthDate;
    if (cleanedFormData.joiningDate === "") delete cleanedFormData.joiningDate;
    if (cleanedFormData.lastPromotionDate === "") delete cleanedFormData.lastPromotionDate;
    
    if (cleanedFormData.salary === "" || cleanedFormData.salary === null) {
      cleanedFormData.salary = 0;
    } else {
      cleanedFormData.salary = Number(cleanedFormData.salary);
    }

    try {
      if (modalType === 'add') {
        const response = await API.post('/employees/create', cleanedFormData); 
        if (response.data.success && response.data.data) {
          const newEmployee = response.data.data;
          setEmployees(prev => [newEmployee, ...prev].slice(0, limit));
          setTotalEmployees(prev => prev + 1);
          alert(`Employee added successfully! Generated ID: ${newEmployee.employeeId}`);
        }
      } else if (modalType === 'edit') {
        const response = await API.put(`/employees/${currentEmployee._id}`, cleanedFormData);
        if (response.data.success && response.data.data) {
          const updatedEmployee = response.data.data;
          setEmployees(prev => prev.map(emp => emp._id === updatedEmployee._id ? updatedEmployee : emp));
        }
      }
      setModalType(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Operation failed. Please review values.");
    } finally {
      setLoading(false);
    }
  };

  // Delete execution block
  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await API.delete(`/employees/${currentEmployee._id}`);
      setModalType(null);
      if (employees.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchEmployees();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove employee record.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setSearchTerm("");
    setStatusFilter("");
    setSelectedIds([]);
    setCurrentPage(1);
    try {
      setLoading(true);
      const response = await API.get("/employees", {
        params: { page: 1, limit, search: "", status: "" }
      });
      if (response.data.success) {
        setEmployees(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalEmployees(response.data.totalEmployees);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to refresh employees.");
    } finally {
      setLoading(false);
    }
  };

  const activeColumnsCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <div className="All-Emp-container">
      {/* Top Header Breadcrumb */}
      <div className="All-Emp-header">
        <h2 className="All-Emp-title">Employee Management</h2>
        <div className="All-Emp-breadcrumb">
          <span className="All-Emp-breadcrumb-home">🏠</span> &gt; Employees &gt; <span className="All-Emp-breadcrumb-active">All Records</span>
        </div>
      </div>

      {/* Control Actions Bar */}
      <div className="All-Emp-toolbar">
        <div className="All-Emp-toolbar-left">
          <span className="All-Emp-tab-active">Active Staff ({totalEmployees})</span>
          <div className="All-Emp-search-container">
            <FiSearch className="All-Emp-search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, department, role..." 
              className="All-Emp-search-input"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <select 
            className="All-Emp-status-filter-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        
        <div className="All-Emp-toolbar-right">
          <button className="All-Emp-icon-btn All-Emp-filter-btn" title="Toggle Columns" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
            <FiFilter />
          </button>
          
          {showFilterDropdown && (
            <div className="All-Emp-column-dropdown">
              <div className="All-Emp-dropdown-title">Display Columns</div>
              <div className="All-Emp-dropdown-list All-Emp-custom-scrollbar">
                {Object.keys(visibleColumns).map((col) => (
                  <label key={col} className="All-Emp-dropdown-item">
                    <input 
                      type="checkbox" 
                      checked={visibleColumns[col]} 
                      onChange={() => toggleColumn(col)} 
                    />
                    <span className="All-Emp-capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button className="All-Emp-icon-btn All-Emp-add-btn" title="Add Employee" onClick={openAddModal}>
            <FiPlus />
          </button>
          <button
            className="All-Emp-icon-btn All-Emp-refresh-btn"
            title="Refresh Employees"
            onClick={handleRefresh}
            disabled={loading}
          >
            <FiRotateCw className={loading ? "All-Emp-spin-animation" : ""} />
          </button>
        </div>
      </div>

      {error && <div className="All-Emp-error-banner-overlay">{error}</div>}

      {/* Table Section */}
      <div className="All-Emp-table-responsive-container All-Emp-custom-scrollbar">
        <table className="All-Emp-table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th width="40px">
                  <input 
                    type="checkbox" 
                    checked={employees.length > 0 && selectedIds.length === employees.length} 
                    onChange={handleSelectAll} 
                  />
                </th>
              )}
              {visibleColumns.employeeId && <th>Employee ID</th>}
              {visibleColumns.name && <th>Name</th>}
              {visibleColumns.role && <th>Role</th>}
              {visibleColumns.department && <th>Department</th>}
              {visibleColumns.mobile && <th>Mobile</th>}
              {visibleColumns.joiningDate && <th>Joining Date</th>}
              {visibleColumns.email && <th>Email</th>}
              {visibleColumns.gender && <th>Gender</th>}
              {visibleColumns.address && <th>Address</th>}
              {visibleColumns.status && <th>Employee Status</th>}
              {visibleColumns.actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading && employees.length === 0 ? (
              <tr>
                <td colSpan={activeColumnsCount} className="All-Emp-table-loader-cell">
                  <FiLoader className="All-Emp-spin-animation All-Emp-loader-icon" /> Processing directory...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={activeColumnsCount} className="All-Emp-table-empty-cell">No matching employee logs discovered.</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id} className={selectedIds.includes(emp._id) ? 'All-Emp-row-selected' : ''}>
                  {visibleColumns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(emp._id)} 
                        onChange={() => handleSelectRow(emp._id)} 
                      />
                    </td>
                  )}
                  {visibleColumns.employeeId && <td className="All-Emp-text-bold">{emp.employeeId || 'Generating...'}</td>}
                  {visibleColumns.name && (
                    <td className="All-Emp-cell-name">
                      <div className="All-Emp-avatar-placeholder">{emp.name?.charAt(0).toUpperCase()}</div>
                      <span>{emp.name}</span>
                    </td>
                  )}
                  {visibleColumns.role && <td>{emp.role}</td>}
                  {visibleColumns.department && <td>{emp.department}</td>}
                  {visibleColumns.mobile && (
                    <td className="All-Emp-cell-icon All-Emp-text-muted"><FiPhone className="All-Emp-cell-inline-icon All-Emp-text-green" /> {emp.mobile}</td>
                  )}
                  {visibleColumns.joiningDate && (
                    <td className="All-Emp-cell-icon"><FiCalendar className="All-Emp-cell-inline-icon All-Emp-text-orange" /> {emp.joiningDate ? new Date(emp.joiningDate).toLocaleDateString() : 'N/A'}</td>
                  )}
                  {visibleColumns.email && (
                    <td className="All-Emp-cell-icon"><FiMail className="All-Emp-cell-inline-icon All-Emp-text-red" /> <span className="All-Emp-truncated-text">{emp.email}</span></td>
                  )}
                  {visibleColumns.gender && (
                    <td>
                      <span className={`All-Emp-badge-gender ${(emp.gender || 'unspecified').toLowerCase()}`}>
                        {emp.gender || 'Unspecified'}
                      </span>
                    </td>
                  )}
                  {visibleColumns.address && (
                    <td className="All-Emp-cell-icon"><FiMapPin className="All-Emp-cell-inline-icon All-Emp-text-blue" /> <span className="All-Emp-truncated-text">{emp.address || 'N/A'}</span></td>
                  )}
                  {visibleColumns.status && (
                    <td>
                      <span className={`All-Emp-badge-status ${(emp.employeeStatus || 'active').toLowerCase().replace(" ", "")}`}>
                        {emp.employeeStatus}
                      </span>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td>
                      <div className="All-Emp-action-buttons">
                        <button className="All-Emp-action-edit" title="Edit Profile" onClick={() => openEditModal(emp)}><FiEdit /></button>
                        <button className="All-Emp-action-delete" title="Remove Record" onClick={() => openDeleteModal(emp)}><FiTrash2 /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="All-Emp-footer">
        <div className="All-Emp-pagination-right">
          <span>Items per page:</span>
          <select 
            className="All-Emp-items-select" 
            value={limit} 
            onChange={(e) => { setLimit(parseInt(e.target.value, 10)); setCurrentPage(1); }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          <span className="All-Emp-pagination-count">
            Showing {employees.length === 0 ? 0 : (currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, totalEmployees)} of {totalEmployees}
          </span>
          <button 
            className="All-Emp-page-nav-btn" 
            disabled={currentPage === 1 || loading} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            &lt;
          </button>
          <button 
            className="All-Emp-page-nav-btn" 
            disabled={currentPage === totalPages || totalPages === 0 || loading} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* ================= ADD / EDIT MODAL WORKFLOWS ================= */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="All-Emp-modal-overlay">
          <div className="All-Emp-modal-container All-Emp-scrollable-modal">
            <div className="All-Emp-modal-header-bar">
              <div className="All-Emp-modal-title-layout">
                <div className="All-Emp-modal-header-avatar">👤</div>
                <h3>{modalType === 'add' ? 'New Employee Entry' : `Modify Profile: ${currentEmployee?.name}`}</h3>
              </div>
              <button className="All-Emp-modal-close-btn" onClick={() => setModalType(null)}><FiX /></button>
            </div>
            
            <form onSubmit={handleSave} className="All-Emp-modal-form-body All-Emp-custom-scrollbar">
              <div className="All-Emp-form-grid">
                <div className="All-Emp-form-field">
                  <label>Name*</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <FiUser className="All-Emp-input-field-icon" />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Department*</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="text" required value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                    <FiBriefcase className="All-Emp-input-field-icon" />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Role*</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                    <FiFlag className="All-Emp-input-field-icon" />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Degree</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="text" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} />
                    <FiBookOpen className="All-Emp-input-field-icon" />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Mobile*</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="text" required value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                    <FiPhone className="All-Emp-input-field-icon" />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Email*</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <FiMail className="All-Emp-input-field-icon" />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Birth Date</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="date" value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="All-Emp-form-field All-Emp-full-width">
                  <label>Address</label>
                  <textarea rows="2" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Full residential location status..."></textarea>
                </div>

                <div className="All-Emp-form-field">
                  <label>Joining Date</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="date" value={formData.joiningDate} onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Salary</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="number" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Last Promotion Date</label>
                  <div className="All-Emp-input-wrapper">
                    <input type="date" value={formData.lastPromotionDate} onChange={(e) => setFormData({...formData, lastPromotionDate: e.target.value})} />
                  </div>
                </div>

                <div className="All-Emp-form-field">
                  <label>Employee Status*</label>
                  <select value={formData.employeeStatus} onChange={(e) => setFormData({...formData, employeeStatus: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="All-Emp-form-field All-Emp-full-width">
                  <label>Work Location</label>
                  <select value={formData.workLocation} onChange={(e) => setFormData({...formData, workLocation: e.target.value})}>
                    <option value="">Select Operational Hub</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="All-Emp-modal-actions-footer">
                <button type="submit" className="All-Emp-btn-save" disabled={loading}>
                  {loading ? 'Processing...' : 'Save Database Entry'}
                </button>
                <button type="button" className="All-Emp-btn-cancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {modalType === 'delete' && (
        <div className="All-Emp-modal-overlay">
          <div className="All-Emp-confirmation-dialog">
            <h3>Confirm Record Destruction</h3>
            <p className="All-Emp-warn-text">Warning: This action breaks local indices and completely purges the collection document metadata permanently.</p>
            <div className="All-Emp-confirmation-details">
              <p><strong>Target Name:</strong> {currentEmployee?.name}</p>
              <p><strong>Department:</strong> {currentEmployee?.department}</p>
              <p><strong>Employee ID:</strong> {currentEmployee?.employeeId || 'N/A'}</p>
            </div>
            <div className="All-Emp-confirmation-actions">
              <button className="All-Emp-btn-delete-confirm" onClick={handleDeleteConfirm} disabled={loading}>
                {loading ? 'Dropping...' : 'Confirm Disconnect'}
              </button>
              <button className="All-Emp-btn-cancel-confirm" onClick={() => setModalType(null)}>Retain Log</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;