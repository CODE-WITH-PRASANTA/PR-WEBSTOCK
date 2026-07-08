import React from 'react';
import './ProjectStatusOverview.css';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaCheck, 
  FaStar, 
  FaRegStar 
} from 'react-icons/fa';

const ProjectStatusOverview = () => {
  // Mock data matching the reference image exactly
  const projects = [
    {
      id: 1,
      title: 'Website Redesign',
      client: 'ABC Corporation',
      description: 'Redesigning the corporate website with new branding and improved UX.',
      progress: 75,
      deadline: '2023-12-15',
      status: 'On Track',
      statusType: 'on-track'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'XYZ Inc.',
      description: 'Developing a cross-platform mobile application for customer engagement.',
      progress: 45,
      deadline: '2023-11-30',
      status: 'At Risk',
      statusType: 'at-risk'
    },
    {
      id: 3,
      title: 'E-commerce Integration',
      client: 'Global Retail',
      description: 'Integrating payment gateways and inventory management with the online store.',
      progress: 90,
      deadline: '2023-10-20',
      status: 'Completed',
      statusType: 'completed'
    }
  ];

  const feedbacks = [
    {
      id: 1,
      title: 'Website Redesign',
      date: '2023-06-15',
      rating: 4,
      comment: 'The redesign looks great! Very responsive and modern.',
      status: 'Reviewed',
      statusType: 'reviewed'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      date: '2023-07-22',
      rating: 5,
      comment: 'Excellent work on the mobile app. The UI is intuitive and performance is great.',
      status: 'Reviewed',
      statusType: 'reviewed'
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      date: '2023-08-10',
      rating: 3,
      comment: 'The platform works well but there are some minor issues with the checkout process.',
      status: 'Pending',
      statusType: 'pending'
    }
  ];

  // Helper function to render star ratings dynamically
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="pso-star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="pso-star-empty" />);
      }
    }
    return stars;
  };

  return (
    <div className="pso-container">
      {/* Left Column: Project Status Overview */}
      <div className="pso-card-panel">
        <h2 className="pso-panel-title">Project Status Overview</h2>
        <div className="pso-project-list">
          {projects.map((project) => (
            <div key={project.id} className="pso-project-item">
              <div className="pso-project-header">
                <div>
                  <h3 className="pso-item-title">{project.title}</h3>
                  <p className="pso-item-subtitle">{project.client}</p>
                </div>
                <span className={`pso-badge badge-${project.statusType}`}>
                  {project.statusType === 'on-track' && <FaCheckCircle className="pso-badge-icon" />}
                  {project.statusType === 'at-risk' && <FaExclamationTriangle className="pso-badge-icon" />}
                  {project.statusType === 'completed' && <FaCheck className="pso-badge-icon" />}
                  {project.status}
                </span>
              </div>
              
              <p className="pso-project-description">{project.description}</p>
              
              <div className="pso-progress-container">
                <div className="pso-progress-bar-bg">
                  <div 
                    className="pso-progress-bar-fill" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="pso-project-footer">
                <span>Progress: {project.progress}%</span>
                <span>Deadline: {project.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Previous Feedback */}
      <div className="pso-card-panel">
        <h2 className="pso-panel-title">Previous Feedback</h2>
        <div className="pso-feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="pso-feedback-item">
              <div className="pso-feedback-header">
                <h3 className="pso-feedback-title">{feedback.title}</h3>
                <span className="pso-feedback-date">{feedback.date}</span>
              </div>

              <div className="pso-stars-container">
                {renderStars(feedback.rating)}
              </div>

              <p className="pso-feedback-comment">{feedback.comment}</p>

              <div className="pso-feedback-footer">
                <span className={`pso-tag tag-${feedback.statusType}`}>
                  {feedback.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusOverview;