import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  FaSearch, FaFilter, FaSync, FaDownload, 
  FaRegEdit, FaRegTrashAlt, FaCheck, FaBriefcase, 
  FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt, 
  FaPaperclip, FaTasks, FaTimes, FaReply, FaCommentDots, FaLock 
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './TaskList.css';
import TaskHeader from '../TaskHeader/TaskHeader';
import API, { SERVER_URL } from "../../api/axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // UI & Filter Controls
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState({ today: false, thisWeek: false, thisMonth: false });
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'delete' | null
  
  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Form State
  const [currentTask, setCurrentTask] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  // 1. Fetch User Tasks from Backend
  const fetchMyTasks = useCallback(async () => {
    setLoading(true);
    try {
      const employeeId = localStorage.getItem('employeeId');

      if (!employeeId) {
        console.warn('No employeeId found in localStorage. Fetching all tasks instead.');
        const response = await API.get('/tasks');
        if (response.data.success) {
          setTasks(response.data.data);
        }
        return;
      }

      const response = await API.get(`/tasks/my-tasks/${employeeId}`);
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]);

  // Handle Multi-Select Rows
  const handleSelectTask = (id) => {
    setSelectedTasks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(t => t._id));
    }
  };

  // Modal Open Handlers
  const openEditModal = (task) => {
    setCurrentTask({ 
      ...task, 
      date: task.date ? new Date(task.date).toISOString().split('T')[0] : '',
      notes: task.notes ? [...task.notes] : [],
      attachments: task.attachments ? [...task.attachments] : []
    });
    setNewNote('');
    setActiveModal('edit');
  };

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setActiveModal('delete');
  };

  // Quick Action Status Update
  const handleStatusDecision = (newStatus) => {
    if (!currentTask) return;
    let newProgress = currentTask.progress;
    if (newStatus === 'Completed') newProgress = 100;
    if (newStatus === 'Rejected') newProgress = 0;

    setCurrentTask({
      ...currentTask,
      status: newStatus,
      progress: newProgress,
    });
  };

  // Add Comment / Note Thread
  const handleAddNote = async () => {
    if (!newNote.trim() || !currentTask) return;

    try {
      const response = await API.put(`/tasks/${currentTask._id}`, {
        newNote: newNote.trim(),
        noteAuthor: localStorage.getItem('employeeName') || 'Employee',
      });

      if (response.data.success) {
        setCurrentTask(response.data.data);
        setTasks(prev => prev.map(t => t._id === currentTask._id ? response.data.data : t));
        setNewNote('');
      }
    } catch (err) {
      console.error('Failed to append feedback note:', err);
    }
  };

  // Save Task Changes to MongoDB
  const handleSave = async () => {
    if (!currentTask) return;
    
    try {
      const response = await API.put(`/tasks/${currentTask._id}`, {
        status: currentTask.status,
        progress: currentTask.progress,
      });

      if (response.data.success) {
        setTasks(prev => prev.map(t => t._id === currentTask._id ? response.data.data : t));
        setActiveModal(null);
      }
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  // Delete Task Handler
  const handleDeleteConfirm = async () => {
    if (!currentTask) return;
    try {
      const response = await API.delete(`/tasks/${currentTask._id}`);
      if (response.data.success) {
        setTasks(prev => prev.filter(t => t._id !== currentTask._id));
        setActiveModal(null);
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // FIXED: Reliable Cross-Origin File Download Handler
 // 2. Updated handleDownloadAttachment function inside TaskList component
const handleDownloadAttachment = async (file, index) => {
  const fileId = file._id || file.id || index;
  setDownloadingFileId(fileId);

  try {
    let fileBlob;

    // Resolve path: check if file.url is a relative path like "/uploads/file.pdf"
    const isRelative = file.url.startsWith('/');
    const fullFileUrl = isRelative ? `${SERVER_URL}${file.url}` : file.url;

    if (isRelative) {
      // Internal relative file path: fetch blob using full backend URL via API/Axios
      const response = await API.get(fullFileUrl, { responseType: 'blob' });
      fileBlob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/octet-stream' 
      });
    } else {
      // External storage link (e.g., S3, Cloudinary): fetch direct blob
      const res = await fetch(fullFileUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed to fetch external file');
      fileBlob = await res.blob();
    }

    // Trigger dynamic browser download using created Blob object
    const downloadUrl = window.URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', file.name || `attachment_${index + 1}`);
    document.body.appendChild(link);
    link.click();

    // Cleanup object URL and DOM node
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading file via Blob:', error);

    // Fallback: Open file in a new browser tab with full URL
    const fullFallbackUrl = file.url.startsWith('/') ? `${SERVER_URL}${file.url}` : file.url;
    const a = document.createElement('a');
    a.href = fullFallbackUrl;
    a.target = '_blank';
    a.download = file.name || 'attachment';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    setDownloadingFileId(null);
  }
};

  // Export Tasks to CSV
  const exportToCSV = () => {
    const headers = ['ID,Task Name,Project,Priority,Status,Progress,Due Date\n'];
    const rows = tasks.map(t => 
      `"${t._id}","${t.name}","${t.project}","${t.priority}","${t.status}","${t.progress}%","${t.date}"`
    );
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Employee_Tasks_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // Filter Logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (t.project || '').toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterPeriod.today || filterPeriod.thisWeek || filterPeriod.thisMonth) {
        const taskDate = new Date(t.date);
        const today = new Date();

        if (filterPeriod.today) {
          return taskDate.toDateString() === today.toDateString();
        }
        if (filterPeriod.thisWeek) {
          const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          return taskDate >= startOfWeek;
        }
        if (filterPeriod.thisMonth) {
          return taskDate.getMonth() === new Date().getMonth() && 
                 taskDate.getFullYear() === new Date().getFullYear();
        }
      }

      return true;
    });
  }, [tasks, searchTerm, filterPeriod]);

  return (
    <>
      <TaskHeader />
      <div className="task-dashboard">
        <div className="task-dashboard__main">
          
          {/* Header Controls Bar */}
          <div className="task-toolbar">
            <div className="task-toolbar__section task-toolbar__section--left">
              <h2 className="task-toolbar__title">My Workspace Tasks</h2>
              <div className="task-search">
                <FaSearch className="task-search__icon" />
                <input 
                  type="text" 
                  placeholder="Search tasks or projects..." 
                  className="task-search__input" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="task-toolbar__section task-toolbar__section--right">
              <div className="task-filter">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)} 
                  className={`task-btn task-btn--icon ${showFilterDropdown ? 'task-btn--active' : ''}`}
                  title="Filter Tasks"
                >
                  <FaFilter />
                </button>
                
                {showFilterDropdown && (
                  <div className="task-filter__dropdown">
                    {['today', 'thisWeek', 'thisMonth'].map((period) => (
                      <label key={period} className="task-filter__option">
                        <input 
                          type="checkbox" 
                          checked={filterPeriod[period]} 
                          onChange={() => setFilterPeriod({
                            today: false, thisWeek: false, thisMonth: false,
                            [period]: !filterPeriod[period]
                          })}
                          className="task-filter__checkbox"
                        />
                        <span className="task-filter__label">
                          {period === 'today' ? 'Due Today' : period === 'thisWeek' ? 'Due This Week' : 'Due This Month'}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={fetchMyTasks} className="task-btn task-btn--icon" title="Refresh Task List">
                <FaSync />
              </button>
              <button onClick={exportToCSV} className="task-btn task-btn--icon" title="Export CSV">
                <FaDownload />
              </button>
            </div>
          </div>

          {/* Task Grid Table */}
          <div className="task-table-wrapper">
            <table className="task-table">
              <thead className="task-table__head">
                <tr>
                  <th className="task-table__th task-table__th--checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0} 
                      onChange={handleSelectAll}
                      className="task-table__checkbox"
                    />
                  </th>
                  <th className="task-table__th">Task Name</th>
                  <th className="task-table__th">Project</th>
                  <th className="task-table__th">Priority</th>
                  <th className="task-table__th">Status</th>
                  <th className="task-table__th">Progress</th>
                  <th className="task-table__th">Due Date</th>
                  <th className="task-table__th task-table__th--actions">Actions</th>
                </tr>
              </thead>
              <tbody className="task-table__body">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="task-table__empty">Loading tasks...</td>
                  </tr>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task._id} className="task-table__row">
                      <td className="task-table__td task-table__td--checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedTasks.includes(task._id)}
                          onChange={() => handleSelectTask(task._id)}
                          className="task-table__checkbox"
                        />
                      </td>
                      <td className="task-table__td">
                        <div className="task-info">
                          <span className="task-info__title">{task.name}</span>
                          <div className="task-info__meta">
                            {task.attachments?.length > 0 && (
                              <span className="task-badge task-badge--indicator" title={`${task.attachments.length} file(s)`}>
                                <FaPaperclip /> {task.attachments.length}
                              </span>
                            )}
                            {task.notes?.length > 0 && (
                              <span className="task-badge task-badge--indicator" title={`${task.notes.length} note(s)`}>
                                <FaCommentDots /> {task.notes.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="task-table__td">{task.project}</td>
                      <td className="task-table__td">
                        <span className={`task-badge task-badge--priority-${task.priority?.toLowerCase()}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="task-table__td">
                        <span className={`task-badge task-badge--status-${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="task-table__td">
                        <div className="task-progress">
                          <div className="task-progress__track">
                            <div 
                              className="task-progress__fill" 
                              style={{ width: `${task.progress || 0}%` }}
                            />
                          </div>
                          <span className="task-progress__value">{task.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="task-table__td">
                        <div className="task-date">
                          <FaRegCalendarAlt className="task-date__icon" />
                          <span>{task.date ? new Date(task.date).toLocaleDateString('en-US') : 'N/A'}</span>
                        </div>
                      </td>
                      <td className="task-table__td task-table__td--actions">
                        <div className="task-actions">
                          <button onClick={() => openEditModal(task)} className="task-btn task-btn--action task-btn--edit" title="Update Status & Feedback">
                            <FaRegEdit />
                          </button>
                          <button onClick={() => openDeleteModal(task)} className="task-btn task-btn--action task-btn--delete" title="Delete Task">
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="task-table__empty">
                      No tasks found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="task-pagination">
            <div className="task-pagination__per-page">
              <span className="task-pagination__label">Items per page:</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))} 
                className="task-pagination__select"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <span className="task-pagination__info">1 – {filteredTasks.length} of {tasks.length}</span>
            <div className="task-pagination__nav">
              <button className="task-btn task-btn--nav"><FaChevronLeft /></button>
              <button className="task-btn task-btn--nav"><FaChevronRight /></button>
            </div>
          </div>
        </div>

        {/* Modal Layer */}
        {activeModal && (
          <div className="task-modal-overlay" onClick={() => setActiveModal(null)}>
            
            {activeModal === 'edit' && (
              <div className="task-modal" onClick={(e) => e.stopPropagation()}>
                <div className="task-modal__header">
                  <h3 className="task-modal__title">Update Task Status & Feedback</h3>
                  <button onClick={() => setActiveModal(null)} className="task-modal__close-btn">
                    <MdClose />
                  </button>
                </div>

                <div className="task-modal__body">
                  <div className="task-workflow">
                    <span className="task-workflow__label">Quick Status Actions:</span>
                    <div className="task-workflow__actions">
                      <button 
                        type="button" 
                        className="task-btn task-btn--status task-btn--accept" 
                        onClick={() => handleStatusDecision('Accepted')}
                      >
                        <FaCheck /> Accept
                      </button>
                      <button 
                        type="button" 
                        className="task-btn task-btn--status task-btn--reject" 
                        onClick={() => handleStatusDecision('Rejected')}
                      >
                        <FaTimes /> Reject
                      </button>
                      <button 
                        type="button" 
                        className="task-btn task-btn--status task-btn--complete" 
                        onClick={() => handleStatusDecision('Completed')}
                      >
                        <FaCheck /> Mark Completed
                      </button>
                    </div>
                  </div>

                  <div className="task-form-grid">
                    <div className="task-field">
                      <label className="task-field__label"><FaLock className="task-field__lock" /> Task Name</label>
                      <div className="task-field__input-wrapper">
                        <input 
                          type="text" 
                          className="task-field__input task-field__input--disabled"
                          value={currentTask?.name || ''} 
                          disabled
                        />
                        <FaTasks className="task-field__icon" />
                      </div>
                    </div>

                    <div className="task-field">
                      <label className="task-field__label"><FaLock className="task-field__lock" /> Project Title</label>
                      <div className="task-field__input-wrapper">
                        <input 
                          type="text" 
                          className="task-field__input task-field__input--disabled"
                          value={currentTask?.project || ''} 
                          disabled
                        />
                        <FaBriefcase className="task-field__icon" />
                      </div>
                    </div>

                    <div className="task-field">
                      <label className="task-field__label task-field__label--active">Status (Editable)*</label>
                      <div className="task-field__input-wrapper">
                        <select 
                          className="task-field__select"
                          value={currentTask?.status || 'Pending'} 
                          onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Running">Running</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <FaChevronDown className="task-field__select-arrow" />
                      </div>
                    </div>

                    <div className="task-field">
                      <label className="task-field__label"><FaLock className="task-field__lock" /> Priority</label>
                      <div className="task-field__input-wrapper">
                        <input 
                          type="text" 
                          className="task-field__input task-field__input--disabled"
                          value={currentTask?.priority || ''} 
                          disabled
                        />
                      </div>
                    </div>

                    <div className="task-field">
                      <label className="task-field__label"><FaLock className="task-field__lock" /> Due Date</label>
                      <input 
                        type="date" 
                        className="task-field__input task-field__input--disabled"
                        value={currentTask?.date || ''} 
                        disabled
                      />
                    </div>

                    <div className="task-field">
                      <label className="task-field__label"><FaLock className="task-field__lock" /> Progress: {currentTask?.progress || 0}%</label>
                      <input 
                        type="range" 
                        className="task-field__range task-field__range--disabled"
                        min="0" 
                        max="100" 
                        value={currentTask?.progress || 0} 
                        disabled
                      />
                    </div>
                  </div>

                  <div className="task-field task-field--full">
                    <label className="task-field__label"><FaLock className="task-field__lock" /> Description</label>
                    <textarea 
                      rows={3} 
                      className="task-field__textarea task-field__textarea--disabled"
                      value={currentTask?.description || ''} 
                      disabled
                    />
                  </div>

                  <div className="task-attachments-block">
                    <label className="task-field__label">
                      <FaPaperclip /> Attached Documents
                    </label>
                    <div className="task-attachments-block__list">
                      {currentTask?.attachments && currentTask.attachments.length > 0 ? (
                        currentTask.attachments.map((file, idx) => {
                          const fileId = file._id || file.id || idx;
                          const isDownloading = downloadingFileId === fileId;

                          return (
                            <div key={fileId} className="task-attachment-item">
                              <span className="task-attachment-item__name">
                                <FaPaperclip className="task-attachment-item__icon" /> {file.name || `Attachment #${idx + 1}`}
                              </span>
                              <button 
                                type="button"
                                onClick={() => handleDownloadAttachment(file, idx)} 
                                disabled={isDownloading}
                                className="task-btn task-btn--download"
                                title="Download File"
                              >
                                <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p className="task-attachments-block__empty">No file attachments associated with this task.</p>
                      )}
                    </div>
                  </div>

                  {/* Feedback System Thread */}
                  <div className="task-feedback">
                    <h4 className="task-feedback__title"><FaCommentDots /> Notes & Feedback Thread</h4>
                    
                    <div className="task-feedback__composer">
                      <textarea 
                        rows={2} 
                        className="task-feedback__textarea"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write updates, questions, or progress notes..."
                      />
                      <button type="button" onClick={handleAddNote} className="task-btn task-btn--post-note">
                        <FaReply /> Post Note
                      </button>
                    </div>

                    <div className="task-feedback__list">
                      {currentTask?.notes && currentTask.notes.length > 0 ? (
                        currentTask.notes.map((note, index) => (
                          <div key={note._id || index} className="task-note-card">
                            <div className="task-note-card__header">
                              <span className="task-note-card__author">{note.author}</span>
                              <span className="task-note-card__time">
                                {new Date(note.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="task-note-card__message">{note.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="task-feedback__empty">No notes or comments submitted yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="task-modal__footer">
                  <button onClick={() => setActiveModal(null)} className="task-btn task-btn--secondary">Cancel</button>
                  <button onClick={handleSave} className="task-btn task-btn--primary">Save Task Changes</button>
                </div>
              </div>
            )}

            {activeModal === 'delete' && (
              <div className="task-modal task-modal--small" onClick={(e) => e.stopPropagation()}>
                <div className="task-modal__header">
                  <h3 className="task-modal__title">Delete Task Confirmation</h3>
                  <button onClick={() => setActiveModal(null)} className="task-modal__close-btn">
                    <MdClose />
                  </button>
                </div>
                <div className="task-modal__body">
                  <p>Are you sure you want to delete <strong>"{currentTask?.name}"</strong>? This action cannot be undone.</p>
                </div>
                <div className="task-modal__footer">
                  <button onClick={() => setActiveModal(null)} className="task-btn task-btn--secondary">Cancel</button>
                  <button onClick={handleDeleteConfirm} className="task-btn task-btn--danger">Delete Task</button>
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