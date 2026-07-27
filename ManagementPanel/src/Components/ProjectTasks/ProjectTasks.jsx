import React, { useState, useRef, useEffect } from 'react';
import './ProjectTasks.css';
import API, { IMG_URL } from "../../Api/axios";


const ProjectTasks = () => {
  // Tasks state (Fetched live from API)
  const [tasks, setTasks] = useState([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic projects state
  const [availableProjects, setAvailableProjects] = useState([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);

  // Dynamic Team Members State
  const [teamMembers, setTeamMembers] = useState([]);
  const [isEmployeesLoading, setIsEmployeesLoading] = useState(false);
  const [employeesError, setEmployeesError] = useState(null);

  // Column Show/Hide Dropdown State
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true,
    taskName: true,
    project: true,
    assignedTo: true,
    priority: true,
    status: true,
    dueDate: true,
    progress: true,
    actions: true
  });

  // Modal State handling
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'add', taskData: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formFields, setFormFields] = useState({
    name: '',
    project: '',
    assignees: [],
    priority: 'Medium',
    status: 'Pending',
    date: '',
    progress: 0,
    description: '',
    attachments: [] // Stores raw File objects and preview URLs
  });

  const dropdownRef = useRef(null);

  // 1. Fetch All Tasks from Backend
  const fetchBackendTasks = async () => {
    setIsTasksLoading(true);
    setTasksError(null);
    try {
      const response = await API.get('/tasks');
      if (response.data && response.data.success) {
        setTasks(response.data.data || []);
      } else if (Array.isArray(response.data)) {
        setTasks(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch tasks from backend:", err);
      setTasksError("Failed to load tasks from server.");
    } finally {
      setIsTasksLoading(false);
    }
  };

  // 2. Fetch Projects from MongoDB Backend API
  const fetchBackendProjects = async () => {
    setIsProjectsLoading(true);
    setProjectsError(null);
    try {
      const response = await API.get('/addprojects');
      if (response.data && response.data.success) {
        const fetchedList = response.data.data.map(p => p.projectTitle);
        setAvailableProjects(fetchedList);
      }
    } catch (err) {
      console.error("Failed to fetch projects from backend:", err);
      setProjectsError("Failed to load projects from server");
    } finally {
      setIsProjectsLoading(false);
    }
  };

  // 3. Fetch Employees/Team Members from Mongo Backend API
  const fetchBackendEmployees = async () => {
    setIsEmployeesLoading(true);
    setEmployeesError(null);
    try {
      const response = await API.get('/addemployees/employees');
      if (response.data && response.data.success) {
        setTeamMembers(response.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch employees from backend:", err);
      setEmployeesError("Failed to load team members");
    } finally {
      setIsEmployeesLoading(false);
    }
  };

  // Fetch initial datasets
  useEffect(() => {
    fetchBackendTasks();
    fetchBackendProjects();
    fetchBackendEmployees();
  }, []);

  // Close column dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Populate/Reset form state when modal toggles
  useEffect(() => {
    const defaultProject = availableProjects.length > 0 ? availableProjects[0] : '';
    
    if (modalConfig.isOpen && modalConfig.type === 'edit' && modalConfig.taskData) {
      const task = modalConfig.taskData;
      const assigneeIds = Array.isArray(task.assignees)
        ? task.assignees.map(a => typeof a === 'object' ? a._id : a)
        : [];

      const formattedDate = task.date ? new Date(task.date).toISOString().split('T')[0] : '';

      setFormFields({
        name: task.name || '',
        project: task.project || defaultProject,
        assignees: assigneeIds,
        priority: task.priority || 'Medium',
        status: task.status || 'Pending',
        date: formattedDate,
        progress: task.progress || 0,
        description: task.description || '',
        attachments: task.attachments || []
      });
    } else if (modalConfig.isOpen && modalConfig.type === 'add') {
      setFormFields({
        name: '',
        project: defaultProject,
        assignees: [],
        priority: 'Medium',
        status: 'Pending',
        date: '',
        progress: 0,
        description: '',
        attachments: []
      });
    }
  }, [modalConfig, availableProjects]);

  // Search filtering logic
  const filteredTasks = tasks.filter(task => {
    const query = searchQuery.toLowerCase();
    const nameMatch = task.name?.toLowerCase().includes(query);
    const projectMatch = task.project?.toLowerCase().includes(query);
    const assigneeMatch = Array.isArray(task.assignees) && task.assignees.some(member => {
      if (typeof member === 'object') {
        return member.name?.toLowerCase().includes(query) ||
               member.employeeId?.toLowerCase().includes(query);
      }
      return false;
    });

    return nameMatch || projectMatch || assigneeMatch;
  });

  // Auto-reset page pagination when filter/dataset size shrinks
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, rowsPerPage]);

  const totalItemsCount = filteredTasks.length;
  const visibleTasks = filteredTasks.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Checkbox handlers
  const handleSelectAll = (e) => {
    const visibleIds = visibleTasks.map(t => t._id);
    if (e.target.checked) {
      setSelectedTasks(prev => Array.from(new Set([...prev, ...visibleIds])));
    } else {
      setSelectedTasks(prev => prev.filter(id => !visibleIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedTasks(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  };

  const toggleTeamMember = (empId) => {
    setFormFields(prev => {
      const exists = prev.assignees.includes(empId);
      return {
        ...prev,
        assignees: exists
          ? prev.assignees.filter(id => id !== empId)
          : [...prev.assignees, empId]
      };
    });
  };

  // Attachment upload & Object URL cleanup
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      fileObject: file, // Keep native File instance for FormData submit
      name: file.name,
      url: URL.createObjectURL(file),
      fileType: file.type
    }));
    setFormFields(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
  };

  const removeAttachment = (index) => {
    setFormFields(prev => {
      const fileToRemove = prev.attachments[index];
      if (fileToRemove?.url && fileToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(fileToRemove.url); // Memory cleanup
      }
      return {
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== index)
      };
    });
  };

  // Submit Handler supporting standard JSON or Multipart Data
  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!formFields.name || !formFields.date || !formFields.project || formFields.assignees.length === 0) {
      alert("Please fill in all mandatory fields (*), including selecting a Project and at least one Team Member.");
      return;
    }

    setIsSubmitting(true);
    try {
      let payload;
      let headers = {};

      // Check if raw File instances need to be uploaded via Multipart
      const hasNewFiles = formFields.attachments.some(att => att.fileObject instanceof File);

      if (hasNewFiles) {
        payload = new FormData();
        payload.append('name', formFields.name);
        payload.append('project', formFields.project);
        payload.append('priority', formFields.priority);
        payload.append('status', formFields.status);
        payload.append('date', formFields.date);
        payload.append('progress', formFields.progress);
        payload.append('description', formFields.description);
        
        formFields.assignees.forEach(id => payload.append('assignees[]', id));
        formFields.attachments.forEach(att => {
          if (att.fileObject) {
            payload.append('files', att.fileObject);
          }
        });
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        payload = formFields;
      }

      if (modalConfig.type === 'add') {
        const response = await API.post('/tasks', payload, { headers });
        if (response.data && response.data.success) {
          setTasks(prev => [response.data.data, ...prev]);
        }
      } else if (modalConfig.type === 'edit') {
        const taskId = modalConfig.taskData._id;
        const response = await API.put(`/tasks/${taskId}`, payload, { headers });
        if (response.data && response.data.success) {
          setTasks(prev => prev.map(t => t._id === taskId ? response.data.data : t));
        }
      }

      // Cleanup local preview Object URLs
      formFields.attachments.forEach(att => {
        if (att.url && att.url.startsWith('blob:')) URL.revokeObjectURL(att.url);
      });

      setModalConfig({ isOpen: false, type: 'add', taskData: null });
    } catch (err) {
      console.error("Error saving task:", err);
      alert(err.response?.data?.message || "Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${id}`);
        setTasks(prev => prev.filter(t => t._id !== id));
        setSelectedTasks(prev => prev.filter(itemId => itemId !== id));
      } catch (err) {
        console.error("Error deleting task:", err);
        alert(err.response?.data?.message || "Failed to delete task from server.");
      }
    }
  };

  const handleRefreshBoard = () => {
    setSearchQuery('');
    setSelectedTasks([]);
    fetchBackendTasks();
    fetchBackendProjects();
    fetchBackendEmployees();
  };

  const handleDownloadDataset = () => {
    const headers = "Task Name,Project,Assigned To,Priority,Status,Due Date,Progress\n";
    const csvContent = tasks.map(t => {
      const assigneeNames = Array.isArray(t.assignees)
        ? t.assignees.map(a => typeof a === 'object' ? `${a.name || 'Emp'} (${a.employeeId || 'N/A'})` : a).join('; ')
        : '';
      const formattedDate = t.date ? new Date(t.date).toISOString().split('T')[0] : '';
      return `"${t.name}","${t.project}","${assigneeNames}","${t.priority}","${t.status}","${formattedDate}",${t.progress}%`;
    }).join("\n");

    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Project_Tasks_Report.csv');
    a.click();
    URL.revokeObjectURL(url);
  };

  const isAllVisibleSelected = visibleTasks.length > 0 && visibleTasks.every(t => selectedTasks.includes(t._id));

  return (
    <div className="ProjectTask-workspace-shell">
      <div className="ProjectTask-dashboard-surface">
        
        {/* Navigation Action Bar */}
        <div className="ProjectTask-action-bar">
          <div className="ProjectTask-left-nav-group">
            <h2 className="ProjectTask-board-title">Project Tasks</h2>
            <div className="ProjectTask-search-wrapper">
              <span className="ProjectTask-search-icon">🔍</span>
              <input 
                type="text" 
                className="ProjectTask-search-input"
                placeholder="Search task, project, or member..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="ProjectTask-right-nav-group">
            <div className="ProjectTask-dropdown-anchor" ref={dropdownRef}>
              <button 
                type="button" 
                className="ProjectTask-btn ProjectTask-btn-outline" 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              >
                ⚙️ Filter Columns
              </button>
              
              {showColumnDropdown && (
                <div className="ProjectTask-column-toggle-dropdown">
                  <div className="ProjectTask-dropdown-header">Toggle Columns</div>
                  <div className="ProjectTask-dropdown-body">
                    {Object.keys(columns).map((colKey) => (
                      <label key={colKey} className="ProjectTask-dropdown-checkbox-row">
                        <input 
                          type="checkbox" 
                          checked={columns[colKey]} 
                          onChange={(e) => setColumns({ ...columns, [colKey]: e.target.checked })}
                        />
                        <span>
                          {colKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="ProjectTask-btn ProjectTask-btn-primary" 
              onClick={() => setModalConfig({ isOpen: true, type: 'add', taskData: null })}
            >
              ➕ Create Task
            </button>
            <button type="button" className="ProjectTask-btn ProjectTask-btn-icon" onClick={handleRefreshBoard} title="Refresh Dataset & Backend Data">🔄</button>
            <button type="button" className="ProjectTask-btn ProjectTask-btn-icon" onClick={handleDownloadDataset} title="Export CSV">📥</button>
          </div>
        </div>

        {/* Data Grid Table View */}
        <div className="ProjectTask-table-container">
          <table className="ProjectTask-data-grid">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll} 
                      checked={isAllVisibleSelected}
                    />
                  </th>
                )}
                {columns.taskName && <th>Task Name</th>}
                {columns.project && <th>Project</th>}
                {columns.assignedTo && <th>Team Members</th>}
                {columns.priority && <th>Priority</th>}
                {columns.status && <th>Status</th>}
                {columns.dueDate && <th>Due Date</th>}
                {columns.progress && <th>Progress</th>}
                {columns.actions && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {isTasksLoading ? (
                <tr>
                  <td colSpan={Object.values(columns).filter(Boolean).length} className="ProjectTask-empty-row">
                    Loading tasks from backend...
                  </td>
                </tr>
              ) : tasksError ? (
                <tr>
                  <td colSpan={Object.values(columns).filter(Boolean).length} className="ProjectTask-empty-row" style={{ color: '#e53e3e' }}>
                    {tasksError}
                  </td>
                </tr>
              ) : visibleTasks.map((task) => (
                <tr key={task._id} className={selectedTasks.includes(task._id) ? 'ProjectTask-row-selected' : ''}>
                  {columns.checkbox && (
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedTasks.includes(task._id)}
                        onChange={() => handleSelectRow(task._id)}
                      />
                    </td>
                  )}
                  {columns.taskName && (
                    <td className="ProjectTask-font-semibold">
                      {task.name}
                      {task.attachments?.length > 0 && <span className="ProjectTask-attachment-indicator" title="Attachments included"> 📎</span>}
                    </td>
                  )}
                  {columns.project && (
                    <td>
                      <span className="ProjectTask-project-tag">{task.project}</span>
                    </td>
                  )}
                  {columns.assignedTo && (
                    <td>
                      <div className="ProjectTask-member-chips-cell">
                        {Array.isArray(task.assignees) && task.assignees.map((member, idx) => {
                          const displayLabel = typeof member === 'object'
                            ? `${member.name || 'Unknown'} (${member.employeeId || 'N/A'})`
                            : member;
                          return (
                            <span key={member._id || idx} className="ProjectTask-member-chip">
                              {displayLabel}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  )}
                  {columns.priority && (
                    <td>
                      <span className={`ProjectTask-priority-pill ProjectTask-priority-${task.priority?.toLowerCase()}`}>
                        {task.priority === 'High' ? '▲ ' : task.priority === 'Medium' ? '● ' : '▼ '}
                        {task.priority}
                      </span>
                    </td>
                  )}
                  {columns.status && (
                    <td>
                      <span className={`ProjectTask-status-pill ProjectTask-status-${task.status?.toLowerCase()}`}>
                        {task.status}
                      </span>
                    </td>
                  )}
                  {columns.dueDate && (
                    <td>{task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}</td>
                  )}
                  {columns.progress && (
                    <td>
                      <div className="ProjectTask-progress-bar-wrapper">
                        <div className="ProjectTask-progress-bar-track">
                          <div className="ProjectTask-progress-bar-fill" style={{ width: `${task.progress || 0}%` }}></div>
                        </div>
                        <span className="ProjectTask-progress-text">{task.progress || 0}%</span>
                      </div>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="ProjectTask-actions-cell">
                        <button type="button" className="ProjectTask-action-btn" onClick={() => setModalConfig({ isOpen: true, type: 'edit', taskData: task })} title="Edit Task">✏️</button>
                        <button type="button" className="ProjectTask-action-btn delete" onClick={() => handleDeleteTask(task._id)} title="Delete Task">🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {!isTasksLoading && visibleTasks.length === 0 && !tasksError && (
                <tr>
                  <td colSpan={Object.values(columns).filter(Boolean).length} className="ProjectTask-empty-row">
                    No matching task records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="ProjectTask-pagination-footer">
          <div className="ProjectTask-pagination-controls">
            <span className="ProjectTask-pagination-label">Rows per page:</span>
            <select 
              className="ProjectTask-pagination-select" 
              value={rowsPerPage} 
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span className="ProjectTask-pagination-range">
              {totalItemsCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} – {Math.min(currentPage * rowsPerPage, totalItemsCount)} of {totalItemsCount}
            </span>
            <button 
              type="button" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="ProjectTask-pag-nav-btn"
            >
              ‹
            </button>
            <button 
              type="button" 
              disabled={currentPage * rowsPerPage >= totalItemsCount} 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="ProjectTask-pag-nav-btn"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Modal View */}
      {modalConfig.isOpen && (
        <div className="ProjectTask-modal-overlay">
          <div className="ProjectTask-modal-window">
            <div className="ProjectTask-modal-header">
              <h3 className="ProjectTask-modal-title">
                {modalConfig.type === 'add' ? 'Create New Task' : 'Edit Task Details'}
              </h3>
              <button 
                type="button" 
                className="ProjectTask-modal-close" 
                onClick={() => setModalConfig({ isOpen: false, type: 'add', taskData: null })}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="ProjectTask-modal-form">
              <div className="ProjectTask-form-grid">
                
                {/* Task Name */}
                <div className="ProjectTask-form-group full-width">
                  <label className="ProjectTask-form-label">Task Name*</label>
                  <input 
                    type="text" 
                    className="ProjectTask-form-input"
                    placeholder="Enter descriptive task title..."
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    required
                  />
                </div>

                {/* Choose Project */}
                <div className="ProjectTask-form-group">
                  <label className="ProjectTask-form-label">Choose Project*</label>
                  <select 
                    className="ProjectTask-form-select"
                    value={formFields.project}
                    onChange={(e) => setFormFields({ ...formFields, project: e.target.value })}
                    required
                    disabled={isProjectsLoading}
                  >
                    {isProjectsLoading && <option value="">Loading projects...</option>}
                    {!isProjectsLoading && availableProjects.length === 0 && <option value="">No projects available</option>}
                    {!isProjectsLoading && availableProjects.map((projTitle, idx) => (
                      <option key={idx} value={projTitle}>{projTitle}</option>
                    ))}
                  </select>
                  {projectsError && (
                    <small style={{ color: '#e53e3e', fontSize: '11px', marginTop: '4px' }}>
                      {projectsError}
                    </small>
                  )}
                </div>

                {/* Priority */}
                <div className="ProjectTask-form-group">
                  <label className="ProjectTask-form-label">Priority*</label>
                  <select 
                    className="ProjectTask-form-select"
                    value={formFields.priority}
                    onChange={(e) => setFormFields({ ...formFields, priority: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Status */}
                <div className="ProjectTask-form-group">
                  <label className="ProjectTask-form-label">Status*</label>
                  <select 
                    className="ProjectTask-form-select"
                    value={formFields.status}
                    onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Running">Running</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                {/* Due Date */}
                <div className="ProjectTask-form-group">
                  <label className="ProjectTask-form-label">Due Date*</label>
                  <input 
                    type="date" 
                    className="ProjectTask-form-input"
                    value={formFields.date}
                    onChange={(e) => setFormFields({ ...formFields, date: e.target.value })}
                    required
                  />
                </div>

                {/* Team Members Selection */}
                <div className="ProjectTask-form-group full-width">
                  <label className="ProjectTask-form-label">
                    Assign Team Members (Name & ID)*
                  </label>
                  <div className="ProjectTask-team-selector-box">
                    {isEmployeesLoading && (
                      <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>
                        Loading team members...
                      </p>
                    )}

                    {!isEmployeesLoading && teamMembers.length === 0 && (
                      <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>
                        No employees found in database.
                      </p>
                    )}

                    {!isEmployeesLoading && teamMembers.map((emp) => {
                      const empId = emp._id;
                      const empName = emp.name || emp.employee?.name || 'Unknown';
                      const empCode = emp.employeeId || emp.employee?.employeeId || 'N/A';
                      const memberLabel = `${empName} (${empCode})`;
                      const isSelected = formFields.assignees.includes(empId);

                      return (
                        <button
                          key={empId}
                          type="button"
                          className={`ProjectTask-member-tag-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleTeamMember(empId)}
                        >
                          {isSelected ? '✓ ' : '+ '} {memberLabel}
                        </button>
                      );
                    })}
                  </div>
                  {employeesError && (
                    <small style={{ color: '#e53e3e', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                      {employeesError}
                    </small>
                  )}
                </div>

                {/* Progress Slider */}
                <div className="ProjectTask-form-group full-width">
                  <div className="ProjectTask-slider-header">
                    <label className="ProjectTask-form-label">Progress Percentage*</label>
                    <span className="ProjectTask-slider-value">{formFields.progress}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    className="ProjectTask-form-range"
                    value={formFields.progress}
                    onChange={(e) => setFormFields({ ...formFields, progress: Number(e.target.value) })}
                  />
                </div>

                {/* Description */}
                <div className="ProjectTask-form-group full-width">
                  <label className="ProjectTask-form-label">Description / Notes</label>
                  <textarea 
                    className="ProjectTask-form-textarea"
                    rows="3"
                    placeholder="Provide additional background or details for this task..."
                    value={formFields.description}
                    onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                  ></textarea>
                </div>

                {/* Attachments */}
                <div className="ProjectTask-form-group full-width">
                  <label className="ProjectTask-form-label">Upload Attachments / Images</label>
                  <div className="ProjectTask-file-upload-dropzone">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload} 
                      id="ProjectTask-file-input"
                      className="ProjectTask-hidden-file-input"
                    />
                    <label htmlFor="ProjectTask-file-input" className="ProjectTask-upload-trigger-label">
                      📁 Click to upload or drag & drop files here
                    </label>
                  </div>

          {formFields.attachments?.length > 0 && (
                  <div className="ProjectTask-attachment-preview-grid">
                    {formFields.attachments.map((file, idx) => {
                      // Determine the correct image source
                      const imageSrc = file.url?.startsWith('http') || file.url?.startsWith('blob')
                        ? file.url
                        : `${IMG_URL}${file.url?.startsWith('/') ? '' : '/'}${file.url}`;

                      return (
                        <div key={idx} className="ProjectTask-attachment-card">
                          {file.fileType?.startsWith('image/') || file.type?.startsWith('image/') ? (
                            <img 
                              src={imageSrc} 
                              alt="preview" 
                              className="ProjectTask-attachment-img" 
                            />
                          ) : (
                            <div className="ProjectTask-file-icon-placeholder">📄</div>
                          )}
                          <span className="ProjectTask-attachment-name" title={file.name}>{file.name}</span>
                          <button 
                            type="button" 
                            className="ProjectTask-remove-attachment-btn"
                            onClick={() => removeAttachment(idx)}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                </div>

              </div>

              {/* Actions */}
              <div className="ProjectTask-modal-actions">
                <button 
                  type="button" 
                  className="ProjectTask-btn ProjectTask-btn-outline"
                  onClick={() => setModalConfig({ isOpen: false, type: 'add', taskData: null })}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="ProjectTask-btn ProjectTask-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : modalConfig.type === 'add' ? 'Save Task' : 'Update Task'}
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