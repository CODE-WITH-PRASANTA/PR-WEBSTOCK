import React, { useState } from 'react';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import './HiringPipeline.css';

// Initial placeholder avatar images mapping to the candidates in the reference image
const initialPipelineData = {
  newCandidates: {
    title: 'New Candidates',
    count: 2,
    colorClass: 'HiringPipeline-column-new',
    items: [
      { id: 1, name: 'John Doe', role: 'Angular Dev', avatar: 'https://i.pravatar.cc/150?img=33' },
      { id: 2, name: 'Sarah Smith', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=49' }
    ]
  },
  screening: {
    title: 'Screening',
    count: 2,
    colorClass: 'HiringPipeline-column-screening',
    items: [
      { id: 3, name: 'Michael Brown', role: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 4, name: 'Emily Davis', role: 'HR Manager', avatar: 'https://i.pravatar.cc/150?img=47' }
    ]
  },
  interview: {
    title: 'Interview',
    count: 1,
    colorClass: 'HiringPipeline-column-interview',
    items: [
      { id: 5, name: 'David Lee', role: 'Sales', avatar: 'https://i.pravatar.cc/150?img=68' }
    ]
  },
  offered: {
    title: 'Offered',
    count: 1,
    colorClass: 'HiringPipeline-column-offered',
    items: [
      { id: 6, name: 'Robert Taylor', role: 'Backend', avatar: 'https://i.pravatar.cc/150?img=11' }
    ]
  },
  hired: {
    title: 'Hired',
    count: 1,
    colorClass: 'HiringPipeline-column-hired',
    items: [
      { id: 7, name: 'William Anderson', role: 'Project Mgr', avatar: 'https://i.pravatar.cc/150?img=53' }
    ]
  }
};

const HiringPipeline = () => {
  const [pipeline] = useState(initialPipelineData);

  return (
    <div className="HiringPipeline">
      {/* Top Breadcrumb Header Row */}
      <div className="HiringPipeline-top-bar">
        <h1 className="HiringPipeline-main-title">Hiring Pipeline</h1>
        <div className="HiringPipeline-breadcrumb">
          <FiHome className="HiringPipeline-breadcrumb-home-icon" />
          <span className="HiringPipeline-breadcrumb-link">Jobs</span>
          <FiChevronRight className="HiringPipeline-breadcrumb-separator" />
          <span className="HiringPipeline-breadcrumb-current">Hiring Pipeline</span>
        </div>
      </div>

      {/* Main Board Grid System Component Container */}
      <div className="HiringPipeline-board">
        {Object.keys(pipeline).map((key) => {
          const column = pipeline[key];
          return (
            <div key={key} className="HiringPipeline-column">
              {/* Dynamic Column Title Bar Badge Header */}
              <div className={`HiringPipeline-column-header ${column.colorClass}`}>
                {column.title} ({column.count})
              </div>
              
              {/* Column Body Lane for Cards */}
              <div className="HiringPipeline-column-lane">
                {column.items.map((candidate) => (
                  <div key={candidate.id} className="HiringPipeline-card">
                    <div className="HiringPipeline-card-avatar-wrapper">
                      <img 
                        src={candidate.avatar} 
                        alt={candidate.name} 
                        className="HiringPipeline-card-avatar"
                        onError={(e) => {
                          // Fallback fallback if network avatars miss matching exactly
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                    <div className="HiringPipeline-card-info">
                      <h3 className="HiringPipeline-card-name">{candidate.name}</h3>
                      <p className="HiringPipeline-card-role">{candidate.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HiringPipeline;