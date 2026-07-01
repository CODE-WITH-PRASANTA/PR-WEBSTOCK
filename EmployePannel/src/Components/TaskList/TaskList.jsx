import React, { useState } from 'react';
import { 
  FaSearch, FaFilter, FaPlus, FaSync, FaDownload, 
  FaRegEdit, FaRegTrashAlt, FaCheck, FaBriefcase, 
  FaUser, FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt 
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './TaskList.css';
import TaskHeader from '../TaskHeader/TaskHeader';

const initialTasks = [
  { id: 'TASK-01', project: 'PHP Website', client: 'Cara Stevens', status: 'Completed', type: 'Development', priority: 'Medium', executor: 'Cara Stevens', date: '2018-03-22', details: 'wrong data received' },
  { id: 'TASK-14', project: 'IOS App', client: 'Airi Satou', status: 'Completed', type: 'Bug', priority: 'Medium', executor: 'Airi Satou', date: '2018-10-12', details: '' },
  { id: 'TASK-25', project: 'ERP System', client: 'Angelica Ramos', status: 'Pending', type: 'Error', priority: 'High', executor: 'Angelica Ramos', date: '2018-01-14', details: '' },
  { id: 'TASK-17', project: 'Angular Admin', client: 'Ashton Cox', status: 'Cancelled', type: 'Bug', priority: 'Low', executor: 'John Doe', date: '2018-04-17', details: '' },
  { id: 'TASK-16', project: 'PHP Website', client: 'Airi Satou', status: 'In Progress', type: 'Development', priority: 'Medium', executor: 'Ashton Cox', date: '2018-05-20', details: '' },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  // Interface State Control
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState({ today: false, thisWeek: false, thisMonth: false });
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [currentTask, setCurrentTask] = useState(null);

  const handleSelectTask = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(item => item !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.id));
    }
  };

  const openAddModal = () => {
    setCurrentTask({ id: `TASK-${Math.floor(Math.random() * 90) + 10}`, project: '', client: '', status: 'In Progress', type: 'Development', priority: 'Medium', executor: '', date: '2026-06-30', details: '' });
    setActiveModal('add');
  };

  const openEditModal = (task) => {
    setCurrentTask({ ...task });
    setActiveModal('edit');
  };

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setActiveModal('delete');
  };

  const handleSave = () => {
    if (activeModal === 'add') {
      setTasks([...tasks, currentTask]);
    } else if (activeModal === 'edit') {
      setTasks(tasks.map(t => t.id === currentTask.id ? currentTask : t));
    }
    setActiveModal(null);
  };

  const handleDeleteConfirm = () => {
    setTasks(tasks.filter(t => t.id !== currentTask.id));
    setActiveModal(null);
  };

  return (

    <>
    <TaskHeader />
    <div className="TaskList dashboard-container">
      <div className="main-panel">
        
        {/* Header Action Controls */}
        <div className="action-bar">
          <div className="search-side">
            <span className="title">My Tasks</span>
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search" className="search-input" />
            </div>
          </div>
          
          <div className="tools-side">
            <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="icon-btn">
              <FaFilter />
            </button>
            
            {showFilterDropdown && (
              <div className="filter-dropdown">
                {['today', 'thisWeek', 'thisMonth'].map((period) => (
                  <label key={period} className="checkbox-row">
                    <input 
                      type="checkbox" 
                      checked={filterPeriod[period]} 
                      onChange={() => setFilterPeriod({...filterPeriod, [period]: !filterPeriod[period]})}
                    />
                    {period.replace(/([A-Z])/g, ' $1')}
                  </label>
                ))}
              </div>
            )}

            <button onClick={openAddModal} className="icon-btn add-btn"><FaPlus /></button>
            <button className="icon-btn"><FaSync /></button>
            <button className="icon-btn"><FaDownload /></button>
          </div>
        </div>

        {/* Data Grid Table */}
        <div className="table-responsive-wrapper">
          <table className="task-grid-table">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={selectedTasks.length === tasks.length && tasks.length > 0} 
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Task Number</th>
                <th>Project</th>
                <th>Client</th>
                <th>Status</th>
                <th>Task Type</th>
                <th>Priority</th>
                <th>Executor</th>
                <th>Task Date</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="checkbox-col">
                    <input 
                      type="checkbox" 
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleSelectTask(task.id)}
                    />
                  </td>
                  <td className="task-id-text">{task.id}</td>
                  <td>{task.project}</td>
                  <td>{task.client}</td>
                  <td>
                    <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.type}</td>
                  <td>
                    <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.executor}</td>
                  <td className="date-cell">
                    <FaRegCalendarAlt className="calendar-icon" />
                    {task.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')}
                  </td>
                  <td>
                    <div className="action-cell-buttons">
                      <button onClick={() => openEditModal(task)} className="edit-action"><FaRegEdit /></button>
                      <button onClick={() => openDeleteModal(task)} className="delete-action"><FaRegTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Area */}
        <div className="table-footer-pagination">
          <div className="items-per-page-selector">
            <span>Items per page:</span>
            <select>
              <option>10</option>
              <option>25</option>
            </select>
          </div>
          <span className="pagination-text">1 – {tasks.length} of 16</span>
          <div className="arrow-controls">
            <button><FaChevronLeft /></button>
            <button><FaChevronRight /></button>
          </div>
        </div>
      </div>

      {/* Modal Handling Overlays */}
      {activeModal && (
        <div className="modal-backdrop-layer" onClick={() => setActiveModal(null)}>
          
          {(activeModal === 'add' || activeModal === 'edit') && (
            <div className="form-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-banner">
                <h3>{activeModal === 'add' ? 'New Task' : currentTask?.id}</h3>
                <button onClick={() => setActiveModal(null)} className="close-modal-btn"><MdClose /></button>
              </div>

              <div className="modal-scroll-form-body">
                <div className="form-inputs-grid">
                  {activeModal === 'edit' && (
                    <div className="floating-input-container disabled-field">
                      <span className="input-label">Task No*</span>
                      <input type="text" value={currentTask?.id || ''} disabled />
                      <FaCheck className="field-icon" />
                    </div>
                  )}
                  <div className="floating-input-container">
                    <span className="input-label">Project*</span>
                    <input type="text" value={currentTask?.project || ''} onChange={(e) => setCurrentTask({...currentTask, project: e.target.value})} />
                    <FaBriefcase className="field-icon" />
                  </div>
                  <div className="floating-input-container">
                    <span className="input-label">Client*</span>
                    <input type="text" value={currentTask?.client || ''} onChange={(e) => setCurrentTask({...currentTask, client: e.target.value})} />
                    <FaUser className="field-icon" />
                  </div>
                  <div className="floating-input-container">
                    <span className="input-label">Status*</span>
                    <select value={currentTask?.status || ''} onChange={(e) => setCurrentTask({...currentTask, status: e.target.value})}>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Cancelled</option>
                    </select>
                    <FaChevronDown className="select-arrow-icon" />
                  </div>
                  <div className="floating-input-container">
                    <span className="input-label">Priority*</span>
                    <select value={currentTask?.priority || ''} onChange={(e) => setCurrentTask({...currentTask, priority: e.target.value})}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <FaChevronDown className="select-arrow-icon" />
                  </div>
                  <div className="floating-input-container">
                    <span className="input-label">Type*</span>
                    <select value={currentTask?.type || ''} onChange={(e) => setCurrentTask({...currentTask, type: e.target.value})}>
                      <option>Development</option>
                      <option>Bug</option>
                      <option>Error</option>
                    </select>
                    <FaChevronDown className="select-arrow-icon" />
                  </div>
                  <div className="floating-input-container">
                    <span className="input-label">Executor*</span>
                    <input type="text" value={currentTask?.executor || ''} onChange={(e) => setCurrentTask({...currentTask, executor: e.target.value})} />
                    <FaUser className="field-icon" />
                  </div>
                  <div className="floating-input-container">
                    <span className="input-label">Date*</span>
                    <input type="date" value={currentTask?.date || ''} onChange={(e) => setCurrentTask({...currentTask, date: e.target.value})} />
                  </div>
                </div>
                <div className="floating-input-container text-area-block">
                  <span className="input-label">Details*</span>
                  <textarea rows={3} value={currentTask?.details || ''} onChange={(e) => setCurrentTask({...currentTask, details: e.target.value})} />
                </div>
              </div>

              <div className="modal-footer-actions">
                <button onClick={handleSave} className="save-action-btn">
                  Save
                </button>
                <button onClick={() => setActiveModal(null)} className="cancel-action-btn">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeModal === 'delete' && (
            <div className="delete-alert-card" onClick={(e) => e.stopPropagation()}>
              <h3>Are you sure?</h3>
              <div className="alert-details-box">
                <p><span>Task No:</span> {currentTask?.id}</p>
                <p><span>Project:</span> {currentTask?.project}</p>
                <p><span>Status:</span> {currentTask?.status}</p>
              </div>
              <div className="alert-buttons-row">
                <button onClick={handleDeleteConfirm} className="confirm-delete">Delete</button>
                <button onClick={() => setActiveModal(null)} className="cancel-delete">Cancel</button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
    </>
  );
};

export default TaskList;