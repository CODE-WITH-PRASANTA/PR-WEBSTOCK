import React, { useState, useEffect } from 'react';
import './AllProjects.css';
import API from "../../Api/axios";

// Match exact values from Mongoose workStatus enum
const COLUMNS = ['Not Started', 'Pending', 'Running', 'Active', 'Completed', 'Canceled'];

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Fetch projects from the backend via the custom API instance
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await API.get('/addprojects');
      
      if (response.data && response.data.success) {
        setProjects(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.message || 'Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // Handle deletion using MongoDB _id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await API.delete(`/addprojects/${id}`);
      
      if (response.data && response.data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert(err.response?.data?.message || 'Failed to delete project.');
    } finally {
      setActiveMenuId(null);
    }
  };

  // Filter projects by column status
  const getProjectsByColumn = (statusColumn) => {
    return projects.filter((p) => p.workStatus === statusColumn);
  };

  // Helper to safely format ISO Date strings
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) return <div className="ap-loading">Loading projects...</div>;
  if (error) return <div className="ap-error">{error}</div>;

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
          {COLUMNS.map((column) => {
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
                  {columnProjects.map((project) => (
                    <div key={project._id} className="ap-project-card">
                      <div className="ap-card-top">
                        <div className="ap-card-title-area">
                          <span className="ap-checkmark-icon">✓</span>
                          <h3 className="ap-card-title">{project.projectTitle}</h3>
                        </div>
                        <div className="ap-action-menu-wrapper">
                          <button
                            className="ap-three-dots"
                            onClick={(e) => toggleMenu(project._id, e)}
                          >
                            ⋮
                          </button>
                          {activeMenuId === project._id && (
                            <div className="ap-dropdown-menu">
                              <button
                                className="ap-delete-btn"
                                onClick={() => handleDelete(project._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ap-card-meta-row">
                        <span className="ap-open-tasks">ID: {project.projectId}</span>
                        {project.projectType && (
                          <span className="ap-tag">{project.projectType}</span>
                        )}
                      </div>

                      <p className="ap-card-description">{project.projectDescription}</p>

                      <div className="ap-details-grid">
                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Start Date:</span>
                          <span className="ap-detail-value">📅 {formatDate(project.startDate)}</span>
                        </div>

                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Deadline:</span>
                          <span className="ap-detail-value">📅 {formatDate(project.endDate)}</span>
                        </div>

                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Manager:</span>
                          <span className="ap-detail-value-text">{project.projectManager}</span>
                        </div>

                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Client:</span>
                          <span className="ap-detail-value-text">{project.client}</span>
                        </div>

                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Priority:</span>
                          <span className={`ap-detail-value priority-${project.projectPriority?.toLowerCase()}`}>
                            {project.projectPriority === 'High' ? '▲ ' : '▼ '}
                            {project.projectPriority}
                          </span>
                        </div>

                        <div className="ap-detail-item">
                          <span className="ap-detail-label">Budget:</span>
                          <span className="ap-detail-value-num">${project.budget}</span>
                        </div>

                        {/* Team Members */}
                        <div className="ap-detail-item ap-team-row">
                          <span className="ap-detail-label">Team ({project.team?.length || 0}):</span>
                          <div className="ap-team-avatars">
                            {project.team?.slice(0, 3).map((member, index) => (
                              <div key={index} className="ap-avatar" title={member}>
                                👤
                              </div>
                            ))}
                            {project.team?.length > 3 && (
                              <div className="ap-avatar-plus">+{project.team.length - 3}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Display Progress bar for Completed status */}
                      {project.workStatus === 'Completed' && (
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;