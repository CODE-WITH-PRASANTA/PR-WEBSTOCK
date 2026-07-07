import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, RotateCw, Download, 
  Calendar, Edit2, Trash2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import './ProjectTask.css';

const ProjectTask = () => {
  // --- 1. Framework Base Core Source Mock Dataset ---
  const initialTasksDataset = [
    { id: 1, name: 'Setup Development Environment', status: 'Completed', priority: 'High', date: '01/15/2024', assignee: 'John Smith' },
    { id: 2, name: 'Database Schema Design', status: 'Completed', priority: 'High', date: '01/20/2024', assignee: 'Jane Doe' },
    { id: 3, name: 'Implement Authentication', status: 'In Progress', priority: 'Medium', date: '02/10/2024', assignee: 'Mike Johnson' },
    { id: 4, name: 'UI Integration', status: 'Pending', priority: 'Medium', date: '02/25/2024', assignee: 'Sarah Williams' },
    { id: 5, name: 'API Documentation', status: 'On Hold', priority: 'Low', date: '03/05/2024', assignee: 'Robert Brown' },
    { id: 6, name: 'Code Quality Audit', status: 'Pending', priority: 'High', date: '03/12/2024', assignee: 'Alice Green' },
    { id: 7, name: 'Configure CI/CD Pipelines', status: 'In Progress', priority: 'High', date: '03/18/2024', assignee: 'David Miller' },
    { id: 8, name: 'Unit Testing Strategy', status: 'Completed', priority: 'Medium', date: '03/22/2024', assignee: 'Emily Davis' }
  ];

  const [tasks, setTasks] = useState(initialTasksDataset);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- 2. Element Toggle Flyout Popover UI Hooks ---
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

  // --- 3. Dynamic Interactive Column Visibility Mapping ---
  const [visibleColumns, setVisibleColumns] = useState({
    taskName: true,
    status: true,
    priority: true,
    dueDate: true,
    assignee: true,
  });

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  // --- 4. Responsive Data Control Pagination Settings Framework ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- 5. Data Mutations & Text Filtering Rules Configuration ---
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const totalItemsCount = filteredTasks.length;
  const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage) || 1;
  
  const pagePaginatedTasks = useMemo(() => {
    const startOffsetIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(startOffsetIndex, startOffsetIndex + itemsPerPage);
  }, [filteredTasks, currentPage]);

  const recordStartIndex = totalItemsCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const recordEndIndex = Math.min(currentPage * itemsPerPage, totalItemsCount);

  // --- 6. Core Toolbar Action Handler Operations ---
  const executeDataViewRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setTasks([...initialTasksDataset]);
    alert('Dashboard operational tables refreshed successfully!');
  };

  const handleDatasetCSVExport = () => {
    const csvHeaderRow = 'Task Name,Status,Priority,Due Date,Assignee\n';
    const csvContentLines = tasks.map(t => `"${t.name}","${t.status}","${t.priority}","${t.date}","${t.assignee}"`).join('\n');
    
    const operationalBlobNode = new Blob([csvHeaderRow + csvContentLines], { type: 'text/csv;charset=utf-8;' });
    const virtualDownloadAnchor = document.createElement('a');
    virtualDownloadAnchor.href = URL.createObjectURL(operationalBlobNode);
    virtualDownloadAnchor.setAttribute('download', 'Project_Tasks_Report.csv');
    document.body.appendChild(virtualDownloadAnchor);
    virtualDownloadAnchor.click();
    document.body.removeChild(virtualDownloadAnchor);
  };

  const handleRowItemDelete = (taskId) => {
    if (window.confirm(`Are you sure you want to remove Task #${taskId}?`)) {
      setTasks(prev => prev.filter(item => item.id !== taskId));
    }
  };

  return (
    <div className="tasks-dashboard-container">
      
      {/* Top Breadcrumb Header Route Tracker Map */}
      <div className="tasks-breadcrumb">
        <span>🏠</span>
        <span>&gt;</span>
        <a href="#projects" className="tasks-breadcrumb-link">Projects</a>
        <span>&gt;</span>
        <span className="tasks-breadcrumb-active">Tasks</span>
      </div>

      <h1 className="tasks-main-headline">Project Tasks</h1>

      {/* CORE PANEL CARD BLOCK ENTRY */}
      <div className="tasks-core-panel-card">
        
        {/* ACTION / CONTROL TOOLBAR STRIP PANEL */}
        <div className="tasks-control-action-bar">
          <div className="tasks-bar-left-segment">
            <span className="tasks-panel-subtitle">Project Task List</span>
            <div className="tasks-search-input-wrapper">
              <Search size={16} className="tasks-search-icon-embed" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="tasks-search-input-field" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="tasks-bar-right-segment">
            {/* Show/Hide Target Column View Selection Framework Trigger Toggle */}
            <button 
              className="tasks-action-icon-trigger-btn" 
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              title="Toggle Columns visibility"
            >
              <SlidersHorizontal size={18} />
            </button>

            {/* Dynamic Column Management Dropdown List Overlay */}
            {isColumnMenuOpen && (
              <div className="tasks-popover-column-menu">
                <div className="tasks-popover-menu-header">Show/Hide Column</div>
                <div className="tasks-column-checkbox-row" onClick={() => toggleColumnVisibility('taskName')}>
                  <input type="checkbox" checked={visibleColumns.taskName} readOnly className="tasks-custom-checkbox-native" />
                  <span className="tasks-checkbox-row-label">Task Name</span>
                </div>
                <div className="tasks-column-checkbox-row" onClick={() => toggleColumnVisibility('status')}>
                  <input type="checkbox" checked={visibleColumns.status} readOnly className="tasks-custom-checkbox-native" />
                  <span className="tasks-checkbox-row-label">Status</span>
                </div>
                <div className="tasks-column-checkbox-row" onClick={() => toggleColumnVisibility('priority')}>
                  <input type="checkbox" checked={visibleColumns.priority} readOnly className="tasks-custom-checkbox-native" />
                  <span className="tasks-checkbox-row-label">Priority</span>
                </div>
                <div className="tasks-column-checkbox-row" onClick={() => toggleColumnVisibility('dueDate')}>
                  <input type="checkbox" checked={visibleColumns.dueDate} readOnly className="tasks-custom-checkbox-native" />
                  <span className="tasks-checkbox-row-label">Due Date</span>
                </div>
                <div className="tasks-column-checkbox-row" onClick={() => toggleColumnVisibility('assignee')}>
                  <input type="checkbox" checked={visibleColumns.assignee} readOnly className="tasks-custom-checkbox-native" />
                  <span className="tasks-checkbox-row-label">Assignee</span>
                </div>
              </div>
            )}

            <button className="tasks-action-icon-trigger-btn" onClick={executeDataViewRefresh} title="Refresh Table"><RotateCw size={18} /></button>
            <button className="tasks-action-icon-trigger-btn" onClick={handleDatasetCSVExport} title="Download CSV"><Download size={18} /></button>
          </div>
        </div>

        {/* RESPONSIVE SCROLL GRID LAYER CONTAINER */}
        <div className="tasks-grid-responsive-scroller">
          <table className="tasks-data-table-node">
            <thead>
              <tr>
                {visibleColumns.taskName && <th>Task Name</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.priority && <th>Priority</th>}
                {visibleColumns.dueDate && <th>Due Date</th>}
                {visibleColumns.assignee && <th>Assignee</th>}
                <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagePaginatedTasks.length > 0 ? (
                pagePaginatedTasks.map((task) => (
                  <tr key={task.id}>
                    {visibleColumns.taskName && (
                      <td className="tasks-text-cell-bold">{task.name}</td>
                    )}
                    {visibleColumns.status && (
                      <td>
                        <span className={`tasks-badge-status-pill ${
                          task.status === 'Completed' ? 'badge-completed' :
                          task.status === 'In Progress' ? 'badge-inprogress' :
                          task.status === 'Pending' ? 'badge-pending' : 'badge-onhold'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.priority && <td>{task.priority}</td>}
                    {visibleColumns.dueDate && (
                      <td>
                        <div className="tasks-date-cell-container">
                          <Calendar size={15} className="tasks-date-icon-embed" />
                          <span>{task.date}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.assignee && <td>{task.assignee}</td>}
                    <td style={{ textAlign: 'center' }}>
                      {/* Side-by-Side Static Inline Action Buttons */}
                      <div className="tasks-row-inline-actions">
                        <button 
                          className="tasks-inline-action-btn edit-btn" 
                          onClick={() => alert(`Editing item #${task.id}`)}
                          title="Edit Task"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          className="tasks-inline-action-btn delete-btn" 
                          onClick={() => handleRowItemDelete(task.id)}
                          title="Delete Task"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="tasks-empty-fallback-row">
                    No active tasks match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER TRAY */}
        <div className="tasks-pagination-footer-tray">
          <div className="tasks-pagination-dropdown-block">
            <span>Items per page:</span>
            <select className="tasks-pagination-select-native" defaultValue="5" disabled>
              <option value="5">5</option>
            </select>
          </div>

          <div className="tasks-pagination-record-index-summary">
            {recordStartIndex} – {recordEndIndex} of {totalItemsCount}
          </div>

          <div className="tasks-pagination-nav-arrow-cluster">
            <button 
              className="tasks-pagination-nav-arrow-btn" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="tasks-pagination-nav-arrow-btn" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPagesCount))}
              disabled={currentPage === totalPagesCount}
              title="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectTask;