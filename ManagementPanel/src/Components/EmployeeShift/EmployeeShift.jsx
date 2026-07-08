import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRotateCw, FiDownload, 
  FiEdit, FiTrash2, FiX, FiCheck, FiChevronRight, FiChevronLeft
} from 'react-icons/fi';
import './EmployeeShift.css';
import API from "../../api/axios"; // Pre-configured axios instance

const EmployeeShift = () => {
  // Database Connected Dynamic State Matrices
  const [shifts, setShifts] = useState([]);
  const [masterEmployeeRoster, setMasterEmployeeRoster] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedIds, setSelectedIds] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    checkbox: true, id: false, name: true, department: true, shift: true,
    minStartTime: true, startTime: true, maxStartTime: true,
    minEndTime: true, endTime: true, maxEndTime: true, actions: true
  });

  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [workflowPage, setWorkflowPage] = useState(1); 
  const [selectedShiftRow, setSelectedShiftRow] = useState(null);

  const [formData, setFormData] = useState({
    employeeId: '', 
    department: '', 
    shift: '',
    minStartTime: '00:00:00', startTime: '00:00:00', maxStartTime: '00:00:00',
    minEndTime: '00:00:00', endTime: '00:00:00', maxEndTime: '00:00:00'
  });

  // Fetch all assigned shifts from backend records
  const fetchShiftsData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await API.get('/employee-shifts');
      if (response.data && response.data.success) {
        setShifts(response.data.data);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to download shift logs.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch master unassigned roster choices
  const fetchRosterDropdown = async () => {
    try {
      const response = await API.get('/employee-shifts/employees');
      if (response.data && response.data.success) {
        setMasterEmployeeRoster(response.data.data);
      }
    } catch (err) {
      console.error('Failed to read master employees roster values:', err);
    }
  };

  useEffect(() => {
    fetchShiftsData();
    fetchRosterDropdown();
  }, []);

  // Professional Native PDF Export Engine
  const handleExportPDF = () => {
    const originalTitle = document.title;
    const today = new Date().toISOString().split('T')[0];
    
    // Set custom clean filename for the PDF save print dialog
    document.title = `Employee_Shift_Report_${today}`;
    window.print();
    document.title = originalTitle;
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredShifts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredShifts.map(s => s._id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleColumnVisibility = (colKey) => {
    setVisibleCols(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  const openAddWorkflow = () => {
    setFormData({
      employeeId: '', department: '', shift: '',
      minStartTime: '00:00:00', startTime: '00:00:00', maxStartTime: '00:00:00',
      minEndTime: '00:00:00', endTime: '00:00:00', maxEndTime: '00:00:00'
    });
    setWorkflowPage(1);
    setActiveWorkflow('add');
  };

  const openEditWorkflow = (row) => {
    setSelectedShiftRow(row);
    setFormData({
      employeeId: row.employee?._id || row.employeeId,
      department: row.department,
      shift: row.shift,
      minStartTime: row.minStartTime,
      startTime: row.startTime,
      maxStartTime: row.maxStartTime,
      minEndTime: row.minEndTime,
      endTime: row.endTime,
      maxEndTime: row.maxEndTime
    });
    setWorkflowPage(1);
    setActiveWorkflow('edit');
  };

  const openDeleteWorkflow = (row) => {
    setSelectedShiftRow(row);
    setActiveWorkflow('delete');
  };

  const handleEmployeeSelectionChange = (e) => {
    const targetMongoId = e.target.value; 
    const matchingEmployee = masterEmployeeRoster.find(emp => emp._id === targetMongoId);

    if (matchingEmployee) {
      setFormData({
        ...formData,
        employeeId: targetMongoId,
        department: matchingEmployee.department 
      });
    } else {
      setFormData({ ...formData, employeeId: '', department: '' });
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (activeWorkflow === 'add') {
        const response = await API.post('/employee-shifts', formData);
        if (response.data && response.data.success) {
          setActiveWorkflow(null);
          fetchShiftsData(); 
        }
      } else if (activeWorkflow === 'edit') {
        const response = await API.put(`/employee-shifts/${selectedShiftRow._id}`, formData);
        if (response.data && response.data.success) {
          setActiveWorkflow(null);
          fetchShiftsData();
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Transaction could not be verified on schema parameters.');
    }
  };

  const confirmDeleteExecution = async () => {
    try {
      const response = await API.delete(`/employee-shifts/${selectedShiftRow._id}`);
      if (response.data && response.data.success) {
        setActiveWorkflow(null);
        setSelectedIds(selectedIds.filter(id => id !== selectedShiftRow._id));
        fetchShiftsData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Deletion processing error caught.');
    }
  };

  const filteredShifts = shifts.filter(s => 
    (s.name || '').toLowerCase().includes(searchVal.toLowerCase()) ||
    (s.department || '').toLowerCase().includes(searchVal.toLowerCase()) ||
    (s.shift || '').toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="EmployeeShift-container Printable-Report-Root">
      {/* Structural Breadcrumb Layout Header */}
      <div className="EmployeeShift-header Print-Hide">
        <h2 className="EmployeeShift-title">Employee Shift</h2>
        <div className="EmployeeShift-breadcrumb">
          <span className="home-icon">🏠</span> &gt; Employees &gt; <span className="current-node">Employee Shift</span>
        </div>
      </div>

      {/* Corporate PDF Header Branding — Visible ONLY during print generation */}
      <div className="Print-Only-Header">
        <h1>PR WEBSTOCK ( OPC ) PVT LTD </h1>
        <p className="Print-Sub-Field">Generated on: {new Date().toLocaleDateString()} | Total Records: {filteredShifts.length}</p>
      </div>

      {/* Control Action Toolbar Bar */}
      <div className="EmployeeShift-toolbar Print-Hide">
        <div className="toolbar-section-left">
          <span className="active-tab-title">Employee Shift</span>
          <div className="search-field-wrapper">
            <FiSearch className="search-embedded-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              className="search-control"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
        </div>

        <div className="toolbar-section-right">
          <button className="control-action-btn filter-toggle-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
            <FiFilter />
          </button>

          {showFilterDropdown && (
            <div className="column-visibility-dropdown">
              <div className="dropdown-panel-header">Show/Hide Column</div>
              <div className="dropdown-scroll-body custom-scrollbar-layout">
                {Object.keys(visibleCols).map((colKey) => (
                  <label key={colKey} className="visibility-checkbox-row">
                    <input 
                      type="checkbox" 
                      checked={visibleCols[colKey]} 
                      onChange={() => toggleColumnVisibility(colKey)} 
                    />
                    <span className="column-label-text">{colKey.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button className="control-action-btn create-trigger-btn" onClick={openAddWorkflow} title="Add Shift">
            <FiPlus />
          </button>
          <button className="control-action-btn refresh-trigger-btn" onClick={fetchShiftsData} title="Refresh Table">
            <FiRotateCw />
          </button>
          <button className="control-action-btn export-trigger-btn" onClick={handleExportPDF} title="Download Report PDF">
            <FiDownload />
          </button>
        </div>
      </div>

      {errorMessage && <div className="error-banner-alert Print-Hide" style={{color: 'red', padding: '10px'}}>{errorMessage}</div>}

      {/* Main Responsive Table Scroller Grid */}
      <div className="table-overflow-adapter custom-scrollbar-layout">
        {isLoading ? (
          <div style={{textAlign: 'center', padding: '40px'}}>Processing Roster Profiles...</div>
        ) : (
          <table className="EmployeeShift-table">
            <thead>
              <tr>
                {visibleCols.checkbox && (
                  <th width="40px" className="Print-Hide">
                    <input 
                      type="checkbox" 
                      checked={filteredShifts.length > 0 && selectedIds.length === filteredShifts.length} 
                      onChange={handleSelectAll} 
                    />
                  </th>
                )}
                {visibleCols.id && <th>ID</th>}
                {visibleCols.name && <th>Name</th>}
                {visibleCols.department && <th>Department</th>}
                {visibleCols.shift && <th>Shift</th>}
                {visibleCols.minStartTime && <th>Min Start Time</th>}
                {visibleCols.startTime && <th>Start Time</th>}
                {visibleCols.maxStartTime && <th>Max Start Time</th>}
                {visibleCols.minEndTime && <th>Min End Time</th>}
                {visibleCols.endTime && <th>End Time</th>}
                {visibleCols.maxEndTime && <th>Max End Time</th>}
                {visibleCols.actions && <th className="Print-Hide">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((s) => (
                <tr key={s._id} className={selectedIds.includes(s._id) ? 'row-selected-highlight' : ''}>
                  {visibleCols.checkbox && (
                    <td className="Print-Hide">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(s._id)} 
                        onChange={() => handleSelectRow(s._id)} 
                      />
                    </td>
                  )}
                  {visibleCols.id && <td>{s._id}</td>}
                  {visibleCols.name && (
                    <td className="identity-cell-layout">
                      <div className="avatar-placeholder-circle Print-Hide">{(s.name || 'E').charAt(0)}</div>
                      <div className="profile-identity-block">
                        <span className="profile-name-span">{s.name}</span>
                        <small className="profile-empid-caption" style={{ display: 'block', color: '#888', fontSize: '11px' }}>
                          {s.employeeId || 'N/A'}
                        </small>
                      </div>
                    </td>
                  )}
                  {visibleCols.department && <td>{s.department}</td>}
                  {visibleCols.shift && (
                    <td>
                      <span className={`shift-tag-badge ${(s.shift || '').toLowerCase()}`}>{s.shift}</span>
                    </td>
                  )}
                  {visibleCols.minStartTime && <td className="time-string-cell">{s.minStartTime}</td>}
                  {visibleCols.startTime && <td className="time-string-cell">{s.startTime}</td>}
                  {visibleCols.maxStartTime && <td className="time-string-cell">{s.maxStartTime}</td>}
                  {visibleCols.minEndTime && <td className="time-string-cell">{s.minEndTime}</td>}
                  {visibleCols.endTime && <td className="time-string-cell">{s.endTime}</td>}
                  {visibleCols.maxEndTime && <td className="time-string-cell">{s.maxEndTime}</td>}
                  {visibleCols.actions && (
                    <td className="Print-Hide">
                      <div className="table-inline-actions">
                        <button className="action-button-edit" onClick={() => openEditWorkflow(s)}><FiEdit /></button>
                        <button className="action-button-delete" onClick={() => openDeleteWorkflow(s)}><FiTrash2 /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Table Pagination Footer */}
      <div className="EmployeeShift-footer Print-Hide">
        <div className="pagination-controls-block">
          <span>Items per page:</span>
          <select className="items-per-page-selector" defaultValue="10">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          <span className="pagination-index-readout">1 - {filteredShifts.length} of {shifts.length}</span>
          <button className="pagination-nav-arrow" disabled><FiChevronLeft /></button>
          <button className="pagination-nav-arrow" disabled><FiChevronRight /></button>
        </div>
      </div>

      {/* ================= MULTI-PAGE WORKFLOW MODAL (ADD & EDIT) ================= */}
      {(activeWorkflow === 'add' || activeWorkflow === 'edit') && (
        <div className="workflow-modal-overlay Print-Hide">
          <div className="workflow-modal-card animate-slide-in">
            <div className="workflow-modal-header">
              <div className="modal-title-layout-group">
                <div className="avatar-header-icon">👥</div>
                <h3>{activeWorkflow === 'add' ? 'New Shift Profile' : `Modify Shift Profile: ${selectedShiftRow?.name}`}</h3>
              </div>
              <button className="modal-dismiss-cross" onClick={() => setActiveWorkflow(null)}><FiX /></button>
            </div>

            <form onSubmit={handleFormSubmission} className="workflow-form-wrapper">
              {workflowPage === 1 && (
                <div className="workflow-form-page-body custom-scrollbar-layout">
                  <div className="input-field-block">
                    <label>Select Employee*</label>
                    <select 
                      required
                      disabled={activeWorkflow === 'edit'} 
                      value={formData.employeeId}
                      onChange={handleEmployeeSelectionChange}
                    >
                      <option value="">Choose Employee</option>
                      {masterEmployeeRoster.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                          {emp.employeeId} - {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-field-block">
                    <label>Department*</label>
                    <input 
                      type="text" 
                      required 
                      readOnly 
                      value={formData.department} 
                      placeholder="Select employee to set department"
                    />
                  </div>
                  <div className="input-field-block">
                    <label>Shift Period Label*</label>
                    <select 
                      required 
                      value={formData.shift} 
                      onChange={(e) => setFormData({...formData, shift: e.target.value})}
                    >
                      <option value="">Select Shift</option>
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                  
                  <div className="workflow-step-indicators-footer">
                    <button type="button" className="btn-action-primary-step" onClick={() => setWorkflowPage(2)}>Next Step <FiChevronRight /></button>
                    <button type="button" className="btn-action-cancel-step" onClick={() => setActiveWorkflow(null)}>Cancel</button>
                  </div>
                </div>
              )}

              {workflowPage === 2 && (
                <div className="workflow-form-page-body custom-scrollbar-layout">
                  <div className="form-inputs-inline-row">
                    <div className="input-field-block">
                      <label>Min Start Time*</label>
                      <input 
                        type="time" 
                        step="1" 
                        required 
                        value={formData.minStartTime} 
                        onChange={(e) => setFormData({...formData, minStartTime: e.target.value})} 
                      />
                    </div>
                    <div className="input-field-block">
                      <label>Start Time*</label>
                      <input 
                        type="time" 
                        step="1" 
                        required 
                        value={formData.startTime} 
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                      />
                    </div>
                    <div className="input-field-block">
                      <label>Max Start Time*</label>
                      <input 
                        type="time" 
                        step="1" 
                        required 
                        value={formData.maxStartTime} 
                        onChange={(e) => setFormData({...formData, maxStartTime: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="form-inputs-inline-row">
                    <div className="input-field-block">
                      <label>Min End Time*</label>
                      <input 
                        type="time" 
                        step="1" 
                        required 
                        value={formData.minEndTime} 
                        onChange={(e) => setFormData({...formData, minEndTime: e.target.value})} 
                      />
                    </div>
                    <div className="input-field-block">
                      <label>End Time*</label>
                      <input 
                        type="time" 
                        step="1" 
                        required 
                        value={formData.endTime} 
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
                      />
                    </div>
                    <div className="input-field-block">
                      <label>Max End Time*</label>
                      <input 
                        type="time" 
                        step="1" 
                        required 
                        value={formData.maxEndTime} 
                        onChange={(e) => setFormData({...formData, maxEndTime: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="workflow-step-indicators-footer">
                    <button type="button" className="btn-action-secondary-step" onClick={() => setWorkflowPage(1)}><FiChevronLeft /> Back</button>
                    <button type="submit" className="btn-action-primary-step">Save Configuration <FiCheck /></button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ================= RECORD DELETE VERIFICATION ================= */}
      {activeWorkflow === 'delete' && (
        <div className="workflow-modal-overlay Print-Hide">
          <div className="delete-confirmation-dialog-box animate-pop-in">
            <h3>Are you sure?</h3>
            <div className="deleted-row-context-summary">
              <p>You are about to remove the shift log for <strong>{selectedShiftRow?.name}</strong>.</p>
              <span className="warning-text-muted-caption">Department: {selectedShiftRow?.department} | Shift: {selectedShiftRow?.shift}</span>
            </div>
            <div className="delete-dialog-action-row">
              <button className="btn-confirm-destruction" onClick={confirmDeleteExecution}>Delete</button>
              <button className="btn-abort-destruction" onClick={() => setActiveWorkflow(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeShift;