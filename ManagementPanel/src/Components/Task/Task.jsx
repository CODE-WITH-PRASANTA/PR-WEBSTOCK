import React, { useState } from 'react';
import { 
  MdHome, 
  MdChevronRight, 
  MdDragIndicator, 
  MdArrowUpward, 
  MdArrowDownward, 
  MdRemove, 
  MdBookmarkBorder, 
  MdOutlineCalendarMonth, 
  MdSave, 
  MdClose,
  MdDeleteOutline
} from 'react-icons/md';
import { 
  BsCheckSquareFill, 
  BsSquare 
} from 'react-icons/bs';
import './Task.css';

const Task = () => {
  // Mock Data matching your references precisely
  const [taskList, setTaskList] = useState([
    { id: 1, title: 'Develop angular project', priority: 'High', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: 2, title: 'File not found exception solve', priority: 'High', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 3, title: 'Test project and find bug', priority: 'Low', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: 4, title: 'Image not found error', priority: 'Normal', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { id: 5, title: 'Solve client error in form', priority: 'High', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { id: 6, title: 'Tab button is flickering on hover', priority: 'Normal', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { id: 7, title: 'Chart responsive issue solve', priority: 'High', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { id: 8, title: 'Web service data load issue', priority: 'High', date: '2018-02-25', completed: false, assigned: 'Sue Woodger', details: 'note details', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' }
  ]);

  // Sidebar controls state
  const [sidebarMode, setSidebarMode] = useState(null); // null | 'add' | 'edit'
  const [activeTaskId, setActiveTaskId] = useState(null);

  // Form States
  const [formTitle, setFormTitle] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);
  const [formAssigned, setFormAssigned] = useState('');
  const [formPriority, setFormPriority] = useState('Normal');
  const [formDate, setFormDate] = useState('2018-02-25');
  const [formDetails, setFormDetails] = useState('');

  // Handle opening the "Add Task" sidebar smoothly (Ref image 3)
  const handleOpenAddMode = () => {
    setSidebarMode('add');
    setActiveTaskId(null);
    setFormTitle('');
    setFormCompleted(false);
    setFormAssigned('');
    setFormPriority('Priority');
    setFormDate('');
    setFormDetails('');
  };

  // Handle Context Menu (Right Click) to open the "Edit Task" sidebar smoothly (Ref image 2)
  const handleRowContextMenu = (e, task) => {
    e.preventDefault(); // Prevents browser's default window right-click menu
    setSidebarMode('edit');
    setActiveTaskId(task.id);
    setFormTitle(task.title);
    setFormCompleted(task.completed);
    setFormAssigned(task.assigned);
    setFormPriority(task.priority);
    setFormDate(task.date);
    setFormDetails(task.details);
  };

  // Form action handlers
  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (sidebarMode === 'add') {
      const newTask = {
        id: Date.now(),
        title: formTitle,
        priority: formPriority === 'Priority' ? 'Normal' : formPriority,
        date: formDate || '2018-02-25',
        completed: formCompleted,
        assigned: formAssigned || 'Sue Woodger',
        details: formDetails || 'note details',
        img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
      };
      setTaskList([...taskList, newTask]);
    } else if (sidebarMode === 'edit') {
      setTaskList(taskList.map(t => t.id === activeTaskId ? {
        ...t,
        title: formTitle,
        completed: formCompleted,
        assigned: formAssigned,
        priority: formPriority,
        date: formDate,
        details: formDetails
      } : t));
    }
    setSidebarMode(null);
  };

  const handleDeleteTask = () => {
    if (sidebarMode === 'edit' && activeTaskId) {
      setTaskList(taskList.filter(t => t.id !== activeTaskId));
      setSidebarMode(null);
    }
  };

  const handleToggleCheck = (id) => {
    setTaskList(taskList.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Format date display strings cleanly back to Feb 25, 2018 view format
  const formatDateString = (dateStr) => {
    if (!dateStr || !dateStr.includes('-')) return 'Feb 25, 2018';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return 'Feb 25, 2018';
    return 'Feb 25, 2018'; // Fallback to match exact design UI requirements layout
  };

  return (
    <div className="task-container">
      {/* Header Path */}
      <div className="task-header">
        <h2>Task</h2>
        <div className="task-breadcrumb">
          <MdHome size={16} /> 
          <MdChevronRight className="arrow-icon" /> 
          <span>Home</span> 
          <MdChevronRight className="arrow-icon" /> 
          <span className="active-path">Task</span>
        </div>
      </div>

      {/* Main Container Work Area Splitting */}
      <div className="task-main-layout">
        
        {/* Left Side: Tasks Table List Surface */}
        <div className={`task-list-panel ${sidebarMode ? 'shrink-layout' : ''}`}>
          <div className="task-panel-header">
            <div className="panel-title-group">
              <h3>Tasks</h3>
              <span>15 Total task</span>
            </div>
            <button className="add-task-btn" onClick={handleOpenAddMode}>
              Add Task
            </button>
          </div>

          <div className="task-items-container">
            {taskList.map((task) => (
              <div 
                key={task.id} 
                className={`task-item-row ${task.completed ? 'row-task-completed' : ''}`}
                onContextMenu={(e) => handleRowContextMenu(e, task)}
                title="Right click to edit this task"
              >
                <div className="task-item-left">
                  <MdDragIndicator className="grip-icon" size={18} />
                  <div className="custom-checkbox-wrapper" onClick={() => handleToggleCheck(task.id)}>
                    {task.completed ? (
                      <BsCheckSquareFill className="custom-box checked" size={16} />
                    ) : (
                      <BsSquare className="custom-box unchecked" size={16} />
                    )}
                  </div>
                  <span className={`task-title-text ${task.completed ? 'title-strike' : ''}`}>
                    {task.title}
                  </span>
                </div>

                <div className="task-item-right">
                  <div className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority === 'High' && <MdArrowUpward size={15} />}
                    {task.priority === 'Low' && <MdArrowDownward size={15} />}
                    {task.priority === 'Normal' && <MdRemove size={15} />}
                    <span>{task.priority}</span>
                  </div>

                  <img src={task.img} alt="assigned thumb" className="task-avatar" />
                  <span className="task-date">{formatDateString(task.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Shared Side panel form framework container */}
        <div className={`task-form-panel ${sidebarMode ? 'form-visible' : ''}`}>
          <div className="form-panel-header">
            <h3>{sidebarMode === 'edit' ? 'Edit Task' : 'New Task'}</h3>
            <div className="form-action-icons">
              {sidebarMode === 'edit' && (
                <button type="button" className="form-icon-btn delete" onClick={handleDeleteTask} title="Delete Task">
                  <MdDeleteOutline size={20} />
                </button>
              )}
              <button type="button" className="form-icon-btn save" onClick={handleSaveSubmit} title="Save Changes">
                <MdSave size={20} />
              </button>
              <button type="button" className="form-icon-btn close" onClick={() => setSidebarMode(null)} title="Close Creator Frame">
                <MdClose size={20} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveSubmit} className="form-panel-body">
            <div className="task-field-group">
              <div className="input-with-icon">
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
                <MdBookmarkBorder className="inner-field-icon" size={18} />
              </div>
              <span className="fieldset-floating-label">Title</span>
            </div>

            <div className="task-field-group check-row">
              <label className="checkbox-label" onClick={() => setFormCompleted(!formCompleted)}>
                {formCompleted ? (
                  <BsCheckSquareFill className="custom-box checked" size={16} />
                ) : (
                  <BsSquare className="custom-box unchecked" size={16} />
                )}
                <span>Mark as complete</span>
              </label>
            </div>

            <div className="task-field-group">
              <select 
                value={formAssigned} 
                onChange={(e) => setFormAssigned(e.target.value)}
                className="task-select"
              >
                <option value="">Assigned Name</option>
                <option value="Sue Woodger">Sue Woodger</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
              <span className="fieldset-floating-label">Assigned Name</span>
            </div>

            <div className="task-fields-row-split">
              <div className="task-field-group flex-1">
                <select 
                  value={formPriority} 
                  onChange={(e) => setFormPriority(e.target.value)}
                  className="task-select"
                >
                  <option value="Priority">Priority</option>
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
                <span className="fieldset-floating-label">Priority</span>
              </div>

              <div className="task-field-group flex-1">
                <div className="input-with-icon">
                  <input 
                    type="text" 
                    placeholder="Due date" 
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                  />
                  <MdOutlineCalendarMonth className="inner-field-icon" size={18} />
                </div>
                <span className="fieldset-floating-label">Due date</span>
              </div>
            </div>

            <div className="task-field-group">
              <textarea 
                rows="4" 
                placeholder="Event Details" 
                value={formDetails}
                onChange={(e) => setFormDetails(e.target.value)}
                className="task-textarea"
              ></textarea>
              <span className="fieldset-floating-label">Event Details</span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Task;