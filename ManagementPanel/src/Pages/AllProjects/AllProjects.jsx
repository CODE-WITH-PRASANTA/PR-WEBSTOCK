import React, { useState } from 'react';
import './AllProjects.css';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'ERP System',
    status: 'New Projects',
    openTasks: 12,
    type: 'Testing',
    description: 'All the Lorem Ipsum generators on the Internet tend to repeat necessary, making this the first true generator on the Internet.',
    createdDate: '2020-01-11',
    teamLeader: 'Jens Brincker',
    priority: 'Low',
    deadline: '2021-04-17',
    comments: 10,
    bug: 5,
    progress: 40
  },
  {
    id: 2,
    title: 'Shopping Application',
    status: 'Running',
    openTasks: 22,
    type: 'Android',
    description: 'There are many variations of passages of Lorem Ipsum available, but suffered alteration in some form, by injected humour.',
    createdDate: '2021-08-25',
    teamLeader: 'Jay Soni',
    priority: 'High',
    deadline: '2024-03-13',
    comments: 14,
    bug: 10,
    progress: 75
  },
  {
    id: 3,
    title: 'J&K Sons Website',
    status: 'On Hold',
    openTasks: 9,
    type: 'Testing',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
    createdDate: '2020-09-12',
    teamLeader: 'Mark Hay',
    priority: 'Low',
    deadline: '2022-02-18',
    comments: 12,
    bug: 8,
    progress: 20
  },
  {
    id: 4,
    title: 'Food Delivery App',
    status: 'New Projects',
    openTasks: 2,
    type: 'Android',
    description: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
    createdDate: '2019-04-16',
    teamLeader: 'Jens Brincker',
    priority: 'Low',
    deadline: '2021-01-17',
    comments: 25,
    bug: 11,
    progress: 47
  },
  {
    id: 5,
    title: 'Video Streaming App',
    status: 'Finished',
    openTasks: 27,
    type: 'iPhone',
    description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
    createdDate: '2019-06-22',
    teamLeader: 'Airi Satou',
    priority: 'High',
    deadline: '2023-04-13',
    comments: 7,
    bug: 4,
    progress: 100
  }
];

const COLUMNS = ['New Projects', 'Running', 'On Hold', 'Finished'];

const EMPTY_FORM = {
  id: null,
  title: '',
  status: 'New Projects',
  openTasks: '',
  type: 'Website',
  description: '',
  createdDate: '',
  teamLeader: '',
  priority: 'Medium',
  deadline: '',
  comments: 0,
  bug: 0,
  progress: ''
};

const AllProjects = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const closeModals = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setActiveMenuId(null);
    setFormData(EMPTY_FORM);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenCreate = (column) => {
    setFormData({
      ...EMPTY_FORM,
      status: column || 'New Projects',
      createdDate: new Date().toISOString().split('T')[0]
    });
    setIsCreateOpen(true);
  };

  const handleSaveCreate = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newProj = {
      ...formData,
      id: Date.now(),
      openTasks: Number(formData.openTasks) || 0,
      comments: Math.floor(Math.random() * 20),
      bug: Math.floor(Math.random() * 10),
      progress: Number(formData.progress) || 0
    };

    setProjects([...projects, newProj]);
    closeModals();
  };

  const handleOpenEdit = (project) => {
    setFormData({ ...project });
    setIsEditOpen(true);
    setActiveMenuId(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setProjects(projects.map(p => p.id === formData.id
      ? { ...formData, openTasks: Number(formData.openTasks), progress: Number(formData.progress) }
      : p));
    closeModals();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
    setActiveMenuId(null);
  };

  const getProjectsByColumn = (col) => projects.filter(p => p.status === col);

  const renderFormFields = () => (
    <>
      <div className="ap-form-grid">
        <div className="ap-input-wrapper">
          <label>Project Title*</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          <span className="ap-field-icon">T</span>
        </div>

        <div className="ap-input-wrapper ap-select-wrapper">
          <label>Status*</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="ap-input-wrapper">
          <label>Team Leader</label>
          <input type="text" name="teamLeader" value={formData.teamLeader} onChange={handleInputChange} />
          <span className="ap-field-icon">👤</span>
        </div>

        <div className="ap-input-wrapper">
          <label>Deadline Of Project*</label>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} required />
        </div>

        <div className="ap-input-wrapper ap-select-wrapper">
          <label>Priority*</label>
          <select name="priority" value={formData.priority} onChange={handleInputChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="ap-input-wrapper">
          <label>Open Task</label>
          <input type="number" name="openTasks" value={formData.openTasks} onChange={handleInputChange} />
          <span className="ap-field-icon">✓</span>
        </div>

        <div className="ap-input-wrapper ap-select-wrapper">
          <label>Type*</label>
          <select name="type" value={formData.type} onChange={handleInputChange}>
            <option value="Website">Website</option>
            <option value="Android">Android</option>
            <option value="iPhone">iPhone</option>
            <option value="Testing">Testing</option>
          </select>
        </div>

        <div className="ap-input-wrapper">
          <label>Created Date*</label>
          <input type="date" name="createdDate" value={formData.createdDate} onChange={handleInputChange} required />
        </div>

        <div className="ap-input-wrapper">
          <label>Project Progress</label>
          <input type="number" name="progress" value={formData.progress} onChange={handleInputChange} placeholder="Project Progress" />
          <span className="ap-field-icon">%</span>
        </div>
      </div>

      <div className="ap-textarea-wrapper">
        <label>Descriptions Of The Project*</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" required></textarea>
      </div>
    </>
  );

  return (
    <div className="ap-dashboard-container" onClick={() => setActiveMenuId(null)}>
      <div className="ap-header-row">
        <h1 className="ap-main-title">All Projects</h1>
        <div className="ap-breadcrumb">
          <span className="ap-bc-home">🏠</span>
          <span className="ap-bc-arrow">&gt;</span>
          <span>Projects</span>
          <span className="ap-bc-arrow">&gt;</span>
          <span className="ap-bc-active">All Projects</span>
        </div>
      </div>

      <div className="ap-board-wrapper">
        <div className="ap-board-columns">
          {COLUMNS.map(column => {
            const columnProjects = getProjectsByColumn(column);
            return (
              <div key={column} className="ap-column">
                <div className="ap-column-header">
                  <h2 className="ap-column-title">{column}</h2>
                  <span className="ap-column-badge">
                    {columnProjects.length} {columnProjects.length === 1 ? 'project' : 'projects'}
                  </span>
                </div>

                <div className="ap-column-cards-container">
                  {columnProjects.map(project => (
                    <div key={project.id} className="ap-project-card">
                      <div className="ap-card-top">
                        <div className="ap-card-title-area">
                          <span className="ap-checkmark-icon">✓</span>
                          <h3 className="ap-card-title">{project.title}</h3>
                        </div>
                        <div className="ap-action-menu-wrapper">
                          <button className="ap-three-dots" onClick={(e) => toggleMenu(project.id, e)}>⋮</button>
                          {activeMenuId === project.id && (
                            <div className="ap-dropdown-menu">
                              <button onClick={() => handleOpenEdit(project)}>Edit</button>
                              <button className="ap-delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ap-card-meta-row">
                        <span className="ap-open-tasks">{project.openTasks} open tasks</span>
                        <span className={`ap-tag ap-tag-${project.type.toLowerCase()}`}>{project.type}</span>
                      </div>

                      <p className="ap-card-description">{project.description}</p>

                      <div className="ap-details-grid">
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Created:</span>
                          <span className="ap-detail-value">📅 {project.createdDate}</span>
                        </div>
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Team Leader:</span>
                          <span className="ap-detail-value-text">{project.teamLeader}</span>
                        </div>
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Priority:</span>
                          <span className={`ap-detail-value priority-${project.priority.toLowerCase()}`}>
                            {project.priority === 'High' ? '▲' : '▼'} {project.priority}
                          </span>
                        </div>
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Deadline:</span>
                          <span className="ap-detail-value">📅 {project.deadline}</span>
                        </div>
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Comments:</span>
                          <span className="ap-detail-value-num">{project.comments}</span>
                        </div>
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Bug:</span>
                          <span className="ap-detail-value-num">{project.bug}</span>
                        </div>
                        <div className="ap-detail-item ap-team-row">
                          <span className="ap-detail-label">Team:</span>
                          <div className="ap-team-avatars">
                            <div className="ap-avatar">👩‍💼</div>
                            <div className="ap-avatar">👨‍💼</div>
                            <div className="ap-avatar">🧑‍💻</div>
                            <div className="ap-avatar-plus">+4</div>
                          </div>
                        </div>
                      </div>

                      {project.status === 'Finished' && (
                        <div className="ap-progress-section">
                          <div className="ap-progress-text">
                            <span>Progress</span>
                            <span>100%</span>
                          </div>
                          <div className="ap-progress-bar-container">
                            <div className="ap-progress-bar-filled" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add button now sits in normal flow right under the last card of every column */}
                <button
                  className="ap-add-project-floating-btn"
                  onClick={() => handleOpenCreate(column)}
                >
                  <span className="ap-plus-sign">+</span> Add
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CREATE PROJECT MODAL --- */}
      {isCreateOpen && (
        <div className="ap-modal-overlay" onClick={closeModals}>
          <div className="ap-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ap-modal-header create-header">
              <h2>Create new project</h2>
              <button className="ap-modal-close" onClick={closeModals}>×</button>
            </div>
            <form onSubmit={handleSaveCreate} className="ap-modal-form">
              {renderFormFields()}
              <div className="ap-form-actions">
                <button type="submit" className="ap-btn-save" disabled={!formData.title.trim()}>Save</button>
                <button type="button" className="ap-btn-cancel" onClick={closeModals}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT PROJECT MODAL --- */}
      {isEditOpen && (
        <div className="ap-modal-overlay" onClick={closeModals}>
          <div className="ap-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ap-modal-header edit-header">
              <h2>Edit project</h2>
              <button className="ap-modal-close" onClick={closeModals}>×</button>
            </div>
            <form onSubmit={handleSaveEdit} className="ap-modal-form">
              {renderFormFields()}
              <div className="ap-form-actions">
                <button type="submit" className="ap-btn-save active-save">Save</button>
                <button type="button" className="ap-btn-cancel" onClick={closeModals}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;