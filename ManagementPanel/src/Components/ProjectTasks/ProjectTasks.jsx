import React, { useState, useRef, useEffect } from 'react';
import './ProjectTasks.css';

const INITIAL_TASKS = [
  { id: 1, name: 'Design Homepage', assignee: 'Sarah Smith', priority: 'High', status: 'Completed', date: '2024-01-15', progress: 100 },
  { id: 2, name: 'Develop API', assignee: 'John Deo', priority: 'Medium', status: 'Running', date: '2024-02-10', progress: 75 },
  { id: 3, name: 'Testing Phase', assignee: 'Pankaj Patel', priority: 'Low', status: 'Pending', date: '2024-03-01', progress: 0 },
  { id: 4, name: 'Client Review', assignee: 'Pooja Sharma', priority: 'High', status: 'Running', date: '2024-01-20', progress: 15 },
  { id: 5, name: 'Setup Database', assignee: 'Jayesh Patel', priority: 'High', status: 'Completed', date: '2024-01-05', progress: 100 },
  { id: 6, name: 'Fix Login Bugs', assignee: 'Rohan Sharma', priority: 'Medium', status: 'Running', date: '2024-01-25', progress: 60 },
  { id: 7, name: 'Product Documentation', assignee: 'Emily Clark', priority: 'Low', status: 'Pending', date: '2024-03-15', progress: 5 },
  { id: 8, name: 'CI/CD Pipeline', assignee: 'Michael Ross', priority: 'High', status: 'Running', date: '2024-02-05', progress: 40 },
  { id: 9, name: 'UI Refactoring', assignee: 'Pankaj Patel', priority: 'Medium', status: 'Pending', date: '2024-02-28', progress: 2 },
  { id: 10, name: 'User Feedback Analysis', assignee: 'Sarah Smith', priority: 'Low', status: 'Completed', date: '2024-01-10', progress: 100 }
];

const ProjectTasks = () => {
  // Core Component State
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Column Show/Hide Dropdown State
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true,
    taskName: true,
    assignedTo: true,
    priority: true,
    status: true,
    dueDate: true,
    progress: true,
    actions: true
  });

  // Modal State handling
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'add', taskData: null });
  
  // Controlled Form State matching image schema definitions
  const [formFields, setFormFields] = useState({ name: '', assignee: '', priority: 'Medium', status: 'Pending', date: '', progress: 0 });

  const dropdownRef = useRef(null);

  // Close visibility dropdown on clicking outside bounds
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Sync structural data fields when switching to 'edit' mode
  useEffect(() => {
    if (modalConfig.isOpen && modalConfig.type === 'edit' && modalConfig.taskData) {
      setFormFields({ ...modalConfig.taskData });
    } else {
      setFormFields({ name: '', assignee: '', priority: 'Medium', status: 'Pending', date: '', progress: 0 });
    }
  }, [modalConfig]);

  // Handle Global Selection Checkbox toggling
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTasks(visibleTasks.map(t => t.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedTasks(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // Form Submission Strategy (Both Add and Edit Operations)
  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formFields.name || !formFields.assignee || !formFields.date) {
      alert("Please fill in all mandatory fields flagged with an asterisk (*).");
      return;
    }

    if (modalConfig.type === 'add') {
      const newTask = { ...formFields, id: Date.now() };
      setTasks([newTask, ...tasks]);
    } else if (modalConfig.type === 'edit') {
      setTasks(tasks.map(t => t.id === modalConfig.taskData.id ? { ...formFields } : t));
    }
    setModalConfig({ isOpen: false, type: 'add', taskData: null });
  };

  // Inline Record Deletion Handler
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this task item?")) {
      setTasks(tasks.filter(t => t.id !== id));
      setSelectedTasks(prev => prev.filter(itemId => itemId !== id));
    }
  };

  // Header Toolbar Functionality implementations
  const handleRefreshBoard = () => {
    setTasks(INITIAL_TASKS);
    setSearchQuery('');
    setSelectedTasks([]);
    alert("Board dataset refreshed to defaults.");
  };

  const handleDownloadDataset = () => {
    const headers = "Task Name,Assigned To,Priority,Status,Due Date,Progress\n";
    const csvContent = tasks.map(t => `"${t.name}","${t.assignee}","${t.priority}","${t.status}","${t.date}",${t.progress}%`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Project_Tasks_Report.csv');
    a.click();
  };

  // Sorting/Filtering Strategy Computation
  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItemsCount = filteredTasks.length;
  const visibleTasks = filteredTasks.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="pt-workspace-shell">
      

      {/* Main Grid Application Dashboard (Image 2 & 3) */}
      <div className="pt-dashboard-surface">
        
        {/* Core Nav and Filter Action Bar */}
        <div className="pt-action-bar">
          <div className="pt-left-nav-group">
            <span className="pt-board-title">Project Tasks</span>
            <div className="pt-search-input-wrapper">
              <span className="pt-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="pt-right-nav-group">
            {/* View Layer Visibility Management Trigger (Image 4) */}
            <div className="pt-dropdown-anchor" ref={dropdownRef}>
              <button 
                type="button" 
                className="pt-icon-action-btn" 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                title="Show/Hide Columns"
              >
                ⚡ Filter Columns
              </button>
              
              {showColumnDropdown && (
                <div className="pt-column-toggle-dropdown animate-fade-in">
                  <div className="pt-dropdown-header">Show/Hide Column</div>
                  <div className="pt-dropdown-body-scroll">
                    {Object.keys(columns).map((colKey) => (
                      <label key={colKey} className="pt-dropdown-checkbox-row">
                        <input 
                          type="checkbox" 
                          checked={columns[colKey]} 
                          onChange={(e) => setColumns({ ...columns, [colKey]: e.target.checked })}
                        />
                        <span className="pt-custom-checkbox-lbl">
                          {colKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Core Action Suite */}
            <button type="button" className="pt-icon-action-btn success-variant" onClick={() => setModalConfig({ isOpen: true, type: 'add', taskData: null })} title="Add New Task">✚</button>
            <button type="button" className="pt-icon-action-btn" onClick={handleRefreshBoard} title="Refresh Table Board">🔄</button>
            <button type="button" className="pt-icon-action-btn" onClick={handleDownloadDataset} title="Download Table Dataset">📥</button>
          </div>
        </div>

        {/* Data Grid Table View System Container */}
        <div className="pt-table-responsive-scroll">
          <table className="pt-data-grid">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={visibleTasks.length > 0 && selectedTasks.length === visibleTasks.length}
                    />
                  </th>
                )}
                {columns.taskName && <th>Task Name</th>}
                {columns.assignedTo && <th>Assigned To</th>}
                {columns.priority && <th>Priority</th>}
                {columns.status && <th>Status</th>}
                {columns.dueDate && <th>Due Date</th>}
                {columns.progress && <th>Progress</th>}
                {columns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {visibleTasks.map((task) => (
                <tr key={task.id} className={selectedTasks.includes(task.id) ? 'row-selected' : ''}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => handleSelectRow(task.id)}
                      />
                    </td>
                  )}
                  {columns.taskName && <td className="font-weight-medium">{task.name}</td>}
                  {columns.assignedTo && <td>{task.assignee}</td>}
                  {columns.priority && (
                    <td>
                      <span className={`pt-priority-lbl priority-${task.priority.toLowerCase()}`}>
                        <span className="pt-arrow-icon">{task.priority === 'High' ? '▲' : task.priority === 'Medium' ? '▲' : '▼'}</span>
                        {task.priority}
                      </span>
                    </td>
                  )}
                  {columns.status && (
                    <td>
                      <span className={`pt-status-pill status-${task.status.toLowerCase()}`}>
                        {task.status}
                      </span>
                    </td>
                  )}
                  {columns.dueDate && (
                    <td>
                      <span className="pt-date-cell-view">📅 {task.date}</span>
                    </td>
                  )}
                  {columns.progress && (
                    <td>
                      {/* Linear Progress Container rendering inline value tooltip on hover */}
                      <div className="pt-slider-progress-module">
                        <div className="pt-slider-bar-track">
                          <div className="pt-slider-bar-fill" style={{ width: `${task.progress}%` }}>
                            <span className="pt-slider-value-tooltip">{task.progress}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="pt-actions-flex-cell">
                        <button type="button" className="pt-cell-action-btn edit-trigger" onClick={() => setModalConfig({ isOpen: true, type: 'edit', taskData: task })} title="Modify Entry">✏️</button>
                        <button type="button" className="pt-cell-action-btn delete-trigger" onClick={() => handleDeleteTask(task.id)} title="Purge Entry">🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {visibleTasks.length === 0 && (
                <tr>
                  <td colSpan={Object.values(columns).filter(Boolean).length} className="pt-table-empty-fallback">
                    No records found matching current system context criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dense Pagination Control Footer Component Block */}
        <div className="pt-table-pagination-footer">
          <div className="pt-pagination-right-block">
            <span className="pt-pagination-label">Items per page:</span>
            <select 
              className="pt-pagination-select" 
              value={rowsPerPage} 
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span className="pt-pagination-range-text">
              {totalItemsCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} – {Math.min(currentPage * rowsPerPage, totalItemsCount)} of {totalItemsCount}
            </span>
            <div className="pt-pagination-arrow-group">
              <button 
                type="button" 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="pt-pag-nav-btn"
              >
                ‹
              </button>
              <button 
                type="button" 
                disabled={currentPage * rowsPerPage >= totalItemsCount} 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="pt-pag-nav-btn"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Overlay System for Modals (Images 5 & 6) */}
      {modalConfig.isOpen && (
        <div className="pt-modal-overlay">
          <div className="pt-modal-window animate-scale-up">
            
            <div className="pt-modal-header">
              <span className="pt-modal-title">
                {modalConfig.type === 'add' ? 'New Task' : `Edit Task: ${modalConfig.taskData?.name}`}
              </span>
              <button 
                type="button" 
                className="pt-modal-close-cross" 
                onClick={() => setModalConfig({ isOpen: false, type: 'add', taskData: null })}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="pt-modal-form-body">
              <div className="pt-form-row-grid">
                
                <div className="pt-input-field-group">
                  <label className="pt-floating-label">Task Name*</label>
                  <input 
                    type="text" 
                    className="pt-form-control-input"
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    required
                  />
                </div>

                <div className="pt-input-field-group icon-input">
                  <label className="pt-floating-label">Assigned To*</label>
                  <input 
                    type="text" 
                    className="pt-form-control-input"
                    value={formFields.assignee}
                    onChange={(e) => setFormFields({ ...formFields, assignee: e.target.value })}
                    required
                  />
                  <span className="pt-field-inner-icon">👤</span>
                </div>

                <div className="pt-input-field-group">
                  <label className="pt-floating-label">Priority*</label>
                  <select 
                    className="pt-form-control-select"
                    value={formFields.priority}
                    onChange={(e) => setFormFields({ ...formFields, priority: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="pt-input-field-group">
                  <label className="pt-floating-label">Status*</label>
                  <select 
                    className="pt-form-control-select"
                    value={formFields.status}
                    onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Running">Running</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="pt-input-field-group">
                  <label className="pt-floating-label">Due Date*</label>
                  <input 
                    type="date" 
                    className="pt-form-control-input"
                    value={formFields.date}
                    onChange={(e) => setFormFields({ ...formFields, date: e.target.value })}
                    required
                  />
                </div>

                <div className="pt-input-field-group label-fieldset">
                  <fieldset className="pt-fieldset-wrapper">
                    <legend className="pt-fieldset-legend">Progress (%)*</legend>
                    <input 
                      type="number" 
                      min="0" 
                      max="100"
                      className="pt-fieldset-input"
                      value={formFields.progress}
                      onChange={(e) => setFormFields({ ...formFields, progress: Math.min(100, Math.max(0, Number(e.target.value))) })}
                      required
                    />
                  </fieldset>
                </div>

              </div>

              <div className="pt-form-actions-footer">
                <button 
                  type="submit" 
                  className={`pt-modal-btn btn-save-action ${modalConfig.type === 'edit' ? 'edit-variant-style' : ''}`}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="pt-modal-btn btn-cancel-action"
                  onClick={() => setModalConfig({ isOpen: false, type: 'add', taskData: null })}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectTasks;