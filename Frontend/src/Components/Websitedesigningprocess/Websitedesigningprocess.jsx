import React from 'react';
import './Websitedesigningprocess.css';

const Websitedesigningprocess = () => {
  const steps = [
    {
      title: 'Start-off',
      icon: '💬',
      text: 'An in-depth session where we gather clients’ needs, expectations, and preferences to set the project foundation effectively.',
    },
    {
      title: 'Crafting vision',
      icon: '👁️',
      text: 'We engage in research-driven discussions with our team to craft a minimalistic design that aligns with the client’s vision.',
    },
    {
      title: 'Wireframe',
      icon: '📐',
      text: 'This stage involves creating a structured layout by carefully designing the images and text layout to ensure precision.',
    },
    {
      title: 'UI/UX Design',
      icon: '📱',
      text: 'The wireframe is transformed into a visually captivating design with meticulous placement of all elements.',
    },
    {
      title: 'Design Review',
      icon: '📝',
      text: 'Before proceeding further, the design is presented to the client for approval and fine-tuning.',
    },
    {
      title: 'Web Designing',
      icon: '💻',
      text: 'The design evolves into a functional website as our developers translate UI/UX elements into code.',
    },
    {
      title: 'Website Testing',
      icon: '🧪',
      text: 'Testing ensures every element, such as buttons and links, works perfectly and the site meets quality standards.',
    },
  ];

  const rows = [
    [steps[0], steps[1], steps[2]],
    [steps[3], steps[4], steps[5]],
    [steps[6]]
  ];

  return (
    <section className="websitedesigningprocess">
      <div className="websitedesigningprocess__container">
        <div className="websitedesigningprocess__header">
          <span className="websitedesigningprocess__subtitle">Our Methodology</span>
          <h2 className="websitedesigningprocess__title">Website Designing Process</h2>
          <p className="websitedesigningprocess__description">
            A seamless journey from concept to launch, ensuring every detail aligns with your vision
          </p>
        </div>

        <div className="websitedesigningprocess__timeline">
          {rows.map((row, rowIndex) => (
            <div 
              className={`websitedesigningprocess__row ${row.length === 1 ? 'websitedesigningprocess__row--single' : ''}`} 
              key={rowIndex}
            >
              {row.map((step, stepIndex) => (
                <div 
                  className="websitedesigningprocess__step" 
                  key={step.title}
                  data-aos="fade-up"
                  data-aos-delay={(rowIndex * 100) + (stepIndex * 100)}
                >
                  <div className="websitedesigningprocess__step-inner">
                    <div className="websitedesigningprocess__circle-container">
                      <div className="websitedesigningprocess__circle-background"></div>
                      <div className="websitedesigningprocess__circle">
                        <span className="websitedesigningprocess__circle-icon">{step.icon}</span>
                        <div className="websitedesigningprocess__circle-pulse"></div>
                      </div>
                      {rowIndex < rows.length - 1 && stepIndex === row.length - 1 && (
                        <div className="websitedesigningprocess__connector websitedesigningprocess__connector--vertical"></div>
                      )}
                      {stepIndex < row.length - 1 && (
                        <div className="websitedesigningprocess__connector websitedesigningprocess__connector--horizontal"></div>
                      )}
                    </div>
                    
                    <div className="websitedesigningprocess__content">
                      <div className="websitedesigningprocess__step-number">
                        0{rowIndex * 3 + stepIndex + 1}
                      </div>
                      <h3 className="websitedesigningprocess__step-title">{step.title}</h3>
                      <p className="websitedesigningprocess__step-text">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="websitedesigningprocess__footer">
          <div className="websitedesigningprocess__badge">
            <span className="websitedesigningprocess__badge-text">7 Steps</span>
            <span className="websitedesigningprocess__badge-text">•</span>
            <span className="websitedesigningprocess__badge-text">Guaranteed Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Websitedesigningprocess;