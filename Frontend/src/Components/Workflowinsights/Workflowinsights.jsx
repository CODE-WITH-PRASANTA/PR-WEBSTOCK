// WorkflowInsights.jsx - Complete Premium Version (primary color #2d6df6, unique class names)
import React from 'react';
import './WorkflowInsights.css';

const WorkflowInsights = () => {
  // Online images from Unsplash - business/tech themed
  const stepImages = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Discovery
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Planning
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Design
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'  // Quality
  ];

  const steps = [
    {
      id: 1,
      title: 'Discovery & Consultation',
      subtitle: 'STEP 01',
      bullets: [
        { 
          bold: 'Brainstorming:', 
          text: ' Collaborate to generate and refine innovative ideas.' 
        },
        { 
          bold: 'Problem Identification:', 
          text: ' Identify market gaps and challenges for your startup.' 
        }
      ],
      description: 'Forensic case studies based on crucial insights that capture the attention of your audience.'
    },
    {
      id: 2,
      title: 'Planning and Strategy',
      subtitle: 'STEP 02',
      bullets: [
        { 
          bold: 'Collaborating:', 
          text: ' Work together to produce and improve creative concepts.' 
        },
        { 
          bold: 'Resource Allocation:', 
          text: ' Optimize planning by efficiently allocating resources and budgeting.' 
        }
      ],
      description: 'Strategic planning for optimal results in a concise, effective approach.'
    },
    {
      id: 3,
      title: 'Design & Development',
      subtitle: 'STEP 03',
      bullets: [
        { 
          bold: 'Generating Ideas:', 
          text: ' Come up with and work through creative ideas together.' 
        },
        { 
          bold: 'Prototyping Excellence:', 
          text: ' Transform ideas into tangible prototypes and user-centric designs.' 
        }
      ],
      description: 'Crafting seamless experiences through innovative design and development.'
    },
    {
      id: 4,
      title: 'Quality Assurance',
      subtitle: 'STEP 04',
      bullets: [
        { 
          bold: 'Idea Generation:', 
          text: ' Collaborate together to generate and develop creative ideas.' 
        },
        { 
          bold: 'Continuous Testing:', 
          text: ' Rigorous quality assurance through ongoing testing ensures excellence.' 
        }
      ],
      description: 'Ensuring excellence through meticulous testing and validation processes.'
    }
  ];

  return (
    <section className="workflowinsights-container" id="workflow">
      <div className="workflowinsights-header">
        {/* <p className="workflowinsights-subtitle">WORKFLOW INSIGHTS</p> */}
        <h2 className="workflowinsights-title">The Zenfy Approach</h2>
      </div>

      {/* Circular Images Row */}
      <div className="workflowinsights-top">
        {steps.map((step, index) => (
          <div 
            key={`image-${step.id}`} 
            className="workflowinsights-image-wrapper"
            data-step={step.id}
          >
            <img 
              src={stepImages[index]} 
              alt={`${step.title} Process`}
              className="workflowinsights-image"
              loading="lazy"
              onError={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.src = '';
              }}
            />
          </div>
        ))}
      </div>

      {/* Cards Row */}
      <div className="workflowinsights-cards">
        {steps.map((step) => (
          <div 
            key={`card-${step.id}`} 
            className="workflowinsights-card"
            data-step={step.id}
          >
            <span className="workflowinsights-step">{step.subtitle}</span>
            <h3 className="workflowinsights-card-title">{step.title}</h3>
            
            {/* Optional: Add description if needed */}            
            <ul className="workflowinsights-list">
              {step.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>
                  <strong>{bullet.bold}</strong>
                  {bullet.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Optional: Add connecting lines for desktop view */}
      <div className="workflowinsights-connectors">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="workflowinsights-connector" style={{ left: `${(i + 1) * 25}%` }}></div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowInsights;
