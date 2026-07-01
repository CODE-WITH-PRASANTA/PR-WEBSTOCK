import React, { useState } from 'react';
import { 
  FiSearch, FiFilter, FiPlus, FiRotateCw, FiDownload, 
  FiEdit, FiTrash2, FiX, FiCheck, FiChevronRight, FiChevronLeft
} from 'react-icons/fi';
import './EmployeeShift.css';

// Exact mock data values parsed directly from snapshot context
const initialShifts = [
  { id: 1, name: "John Doe", department: "Java", shift: "Morning", minStartTime: "07:30:00", startTime: "08:00:00", maxStartTime: "08:30:00", minEndTime: "16:30:00", endTime: "17:00:00", maxEndTime: "17:30:00" },
  { id: 2, name: "Jane Smith", department: "UI/UX", shift: "Evening", minStartTime: "15:30:00", startTime: "16:00:00", maxStartTime: "16:30:00", minEndTime: "23:30:00", endTime: "00:00:00", maxEndTime: "00:30:00" },
  { id: 3, name: "Mike Johnson", department: "Management", shift: "Night", minStartTime: "23:30:00", startTime: "00:00:00", maxStartTime: "00:30:00", minEndTime: "07:30:00", endTime: "08:00:00", maxEndTime: "08:30:00" },
  { id: 4, name: "Lisa Wang", department: "Quality Assurance", shift: "Morning", minStartTime: "07:30:00", startTime: "08:00:00", maxStartTime: "08:30:00", minEndTime: "16:30:00", endTime: "17:00:00", maxEndTime: "17:30:00" },
  { id: 5, name: "Alex Brown", department: "Operations", shift: "Evening", minStartTime: "15:30:00", startTime: "16:00:00", maxStartTime: "16:30:00", minEndTime: "23:30:00", endTime: "00:00:00", maxEndTime: "00:30:00" }
];

const EmployeeShift = () => {
  const [shifts, setShifts] = useState(initialShifts);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  
  // Columns visibilities mapped directly to 2nd reference layout state
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    checkbox: true, id: false, name: true, department: true, shift: true,
    minStartTime: true, startTime: true, maxStartTime: true,
    minEndTime: true, endTime: true, maxEndTime: true, actions: true
  });

  // Flow controllers ('add' or 'edit' or 'delete')
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [workflowPage, setWorkflowPage] = useState(1); // 1 or 2 as verified via image 3/4 & 5/6
  const [selectedShiftRow, setSelectedShiftRow] = useState(null);

  // Unified Multi-step Form State Matrix
  const [formData, setFormData] = useState({
    name: '', department: '', shift: '',
    minStartTime: '', startTime: '', maxStartTime: '',
    minEndTime: '', endTime: '', maxEndTime: ''
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredShifts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredShifts.map(s => s.id));
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

  // Launch handlers
  const openAddWorkflow = () => {
    setFormData({
      name: '', department: '', shift: '',
      minStartTime: '00:00:00', startTime: '00:00:00', maxStartTime: '00:00:00',
      minEndTime: '00:00:00', endTime: '00:00:00', maxEndTime: '00:00:00'
    });
    setWorkflowPage(1);
    setActiveWorkflow('add');
  };

  const openEditWorkflow = (row) => {
    setSelectedShiftRow(row);
    setFormData({ ...row });
    setWorkflowPage(1);
    setActiveWorkflow('edit');
  };

  const openDeleteWorkflow = (row) => {
    setSelectedShiftRow(row);
    setActiveWorkflow('delete');
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (activeWorkflow === 'add') {
      const freshRecord = { ...formData, id: Date.now() };
      setShifts([...shifts, freshRecord]);
    } else if (activeWorkflow === 'edit') {
      setShifts(shifts.map(s => s.id === selectedShiftRow.id ? { ...formData } : s));
    }
    setActiveWorkflow(null);
  };

  const confirmDeleteExecution = () => {
    setShifts(shifts.filter(s => s.id !== selectedShiftRow.id));
    setActiveWorkflow(null);
  };

  const filteredShifts = shifts.filter(s => 
    s.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    s.department.toLowerCase().includes(searchVal.toLowerCase()) ||
    s.shift.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="EmployeeShift-container">
      {/* Structural Breadcrumb Layout Header */}
      <div className="EmployeeShift-header">
        <h2 className="EmployeeShift-title">Employee Shift</h2>
        <div className="EmployeeShift-breadcrumb">
          <span className="home-icon">🏠</span> &gt; Employees &gt; <span className="current-node">Employee Shift</span>
        </div>
      </div>

      {/* Control Action Toolbar Bar */}
      <div className="EmployeeShift-toolbar">
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

          {/* Collapsible Grid Visibility Filter Checkboxes Panel (Reference Image 2) */}
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

          <button className="control-action-btn create-trigger-btn" onClick={openAddWorkflow}>
            <FiPlus />
          </button>
          <button className="control-action-btn refresh-trigger-btn" onClick={() => setShifts(initialShifts)}>
            <FiRotateCw />
          </button>
          <button className="control-action-btn export-trigger-btn">
            <FiDownload />
          </button>
        </div>
      </div>

      {/* Main Responsive Table Scroller Grid */}
      <div className="table-overflow-adapter custom-scrollbar-layout">
        <table className="EmployeeShift-table">
          <thead>
            <tr>
              {visibleCols.checkbox && (
                <th width="40px">
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
              {visibleCols.actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredShifts.map((s) => (
              <tr key={s.id} className={selectedIds.includes(s.id) ? 'row-selected-highlight' : ''}>
                {visibleCols.checkbox && (
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(s.id)} 
                      onChange={() => handleSelectRow(s.id)} 
                    />
                  </td>
                )}
                {visibleCols.id && <td>{s.id}</td>}
                {visibleCols.name && (
                  <td className="identity-cell-layout">
                    <div className="avatar-placeholder-circle">{s.name.charAt(0)}</div>
                    <span className="profile-name-span">{s.name}</span>
                  </td>
                )}
                {visibleCols.department && <td>{s.department}</td>}
                {visibleCols.shift && (
                  <td>
                    <span className={`shift-tag-badge ${s.shift.toLowerCase()}`}>{s.shift}</span>
                  </td>
                )}
                {visibleCols.minStartTime && <td className="time-string-cell">{s.minStartTime}</td>}
                {visibleCols.startTime && <td className="time-string-cell">{s.startTime}</td>}
                {visibleCols.maxStartTime && <td className="time-string-cell">{s.maxStartTime}</td>}
                {visibleCols.minEndTime && <td className="time-string-cell">{s.minEndTime}</td>}
                {visibleCols.endTime && <td className="time-string-cell">{s.endTime}</td>}
                {visibleCols.maxEndTime && <td className="time-string-cell">{s.maxEndTime}</td>}
                {visibleCols.actions && (
                  <td>
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
      </div>

      {/* Table Pagination Footer */}
      <div className="EmployeeShift-footer">
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

      {/* ================= MULTI-PAGE WORKFLOW SLIDER SLIDE (ADD & EDIT) ================= */}
      {(activeWorkflow === 'add' || activeWorkflow === 'edit') && (
        <div className="workflow-modal-overlay">
          <div className="workflow-modal-card animate-slide-in">
            <div className="workflow-modal-header">
              <div className="modal-title-layout-group">
                <div className="avatar-header-icon">👥</div>
                <h3>{activeWorkflow === 'add' ? 'New Shift Profile' : `Modify Shift Profile: ${selectedShiftRow?.name}`}</h3>
              </div>
              <button className="modal-dismiss-cross" onClick={() => setActiveWorkflow(null)}><FiX /></button>
            </div>

            <form onSubmit={handleFormSubmission} className="workflow-form-wrapper">
              
              {/* PAGE STEP 1: Basic Metadata Inputs (Reference Image 3 & 5) */}
              {workflowPage === 1 && (
                <div className="workflow-form-page-body custom-scrollbar-layout">
                  <div className="input-field-block">
                    <label>Employee Name*</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div className="input-field-block">
                    <label>Department*</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.department} 
                      onChange={(e) => setFormData({...formData, department: e.target.value})} 
                      placeholder="e.g. Java, UI/UX"
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

              {/* PAGE STEP 2: Precise Time Ranges Config (Reference Image 4 & 6) */}
              {workflowPage === 2 && (
                <div className="workflow-form-page-body custom-scrollbar-layout">
                  <div className="form-inputs-inline-row">
                    <div className="input-field-block">
                      <label>Min Start Time*</label>
                      <input type="text" required value={formData.minStartTime} onChange={(e) => setFormData({...formData, minStartTime: e.target.value})} />
                    </div>
                    <div className="input-field-block">
                      <label>Start Time*</label>
                      <input type="text" required value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
                    </div>
                    <div className="input-field-block">
                      <label>Max Start Time*</label>
                      <input type="text" required value={formData.maxStartTime} onChange={(e) => setFormData({...formData, maxStartTime: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-inputs-inline-row">
                    <div className="input-field-block">
                      <label>Min End Time*</label>
                      <input type="text" required value={formData.minEndTime} onChange={(e) => setFormData({...formData, minEndTime: e.target.value})} />
                    </div>
                    <div className="input-field-block">
                      <label>End Time*</label>
                      <input type="text" required value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} />
                    </div>
                    <div className="input-field-block">
                      <label>Max End Time*</label>
                      <input type="text" required value={formData.maxEndTime} onChange={(e) => setFormData({...formData, maxEndTime: e.target.value})} />
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

      {/* ================= RECORD DELETE VERIFICATION (Reference Image 7) ================= */}
      {activeWorkflow === 'delete' && (
        <div className="workflow-modal-overlay">
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