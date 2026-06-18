import React, { useState } from 'react';
import './Websitedesigningprocess.css';

const Websitedesigningprocess = () => {
  const steps = [
    {
      title: 'Start-off',
      icon: '💬',
      text: 'At PR WEBSTOCK, we begin every project with a detailed discussion to understand your business goals, target audience, and expectations. Based in Bhubaneswar and serving clients across India, this step helps us plan a clear direction for effective web design.',
    },
    {
      title: 'Crafting vision',
      icon: '👁️',
      text: 'In this stage, our team transforms ideas into a clear design vision. We analyze requirements, research industry trends, and define the visual direction to ensure the website reflects your brand identity and supports the best web design practices.',
    },
    {
      title: 'Wireframe',
      icon: '📐',
      text: 'We create a structured wireframe to plan the website layout and content flow. This step focuses on usability, clarity, and user experience, helping us build a strong foundation for a coding-based website solution that performs well across devices.',
    },
    {
      title: 'UI/UX Design',
      icon: '📱',
      text: 'At PR WEBSTOCK, we transform approved wireframes into visually appealing and user-friendly designs. Our focus is on layout, usability, and interaction, ensuring the website offers a smooth experience and follows the best web design practices.',
    },
    {
      title: 'Design Review',
      icon: '📝',
      text: 'Before moving forward, we share the design with you for feedback and approval. This step allows fine-tuning of visuals, structure, and user flow so the final website meets your expectations and business goals.',
    },
    {
      title: 'Web Designing',
      icon: '💻',
      text: 'Once the design is approved, our developers convert the UI/UX into a fully functional, coding-based website. From Bhubaneswar to clients all over India, PR WEBSTOCK delivers fast, secure, and scalable top website solutions built for performance.',
    },
    {
      title: 'Website Testing',
      icon: '🧪',
      text: 'At PR WEBSTOCK, we thoroughly test every website to ensure smooth performance, strong security, and a flawless user experience. From functionality and responsiveness to speed and browser compatibility, our testing process ensures your site meets high-quality standards before launch.',
    },
    {
      title: 'Website Launch',
      icon: '🚀',
      text: 'After final approval, we deploy your website on a secure server and ensure a smooth launch with performance monitoring and ongoing support.',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 4;
  const totalPages = Math.ceil(steps.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentSteps = steps.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="websitedesigningprocess">
      <div className="websitedesigningprocess__container">

        {/* Header */}
        <div className="websitedesigningprocess__header">
          <span className="websitedesigningprocess__subtitle">
            Website Designing
          </span>

          <h2 className="websitedesigningprocess__title">
            Website Designing Process at PR WEBSTOCK
          </h2>

          <p className="websitedesigningprocess__description">
            PR WEBSTOCK follows a structured website designing process to deliver
            coding-based, high-performance web design solutions from Bhubaneswar
            to clients across India.
          </p>
        </div>

        {/* 4 Cards In One Row */}
        <div className="websitedesigningprocess__row-cards">
          {currentSteps.map((step, index) => (
            <div
              className="websitedesigningprocess__step small-card"
              key={step.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="websitedesigningprocess__step-inner">

                <div className="websitedesigningprocess__circle-container">
                  <div className="websitedesigningprocess__circle-background"></div>

                  <div className="websitedesigningprocess__circle">
                    <span className="websitedesigningprocess__circle-icon">
                      {step.icon}
                    </span>

                    <div className="websitedesigningprocess__circle-pulse"></div>
                  </div>
                </div>

                <div className="websitedesigningprocess__content">

                  <div className="websitedesigningprocess__step-number">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="websitedesigningprocess__step-title">
                    {step.title}
                  </h3>

                  <p className="websitedesigningprocess__step-text">
                    {step.text}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="websitedesigningprocess__pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-btn ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="websitedesigningprocess__footer">
          <div className="websitedesigningprocess__badge">
            <span className="websitedesigningprocess__badge-text">
              8 Structured Steps
            </span>

            <span className="websitedesigningprocess__badge-text">
              •
            </span>

            <span className="websitedesigningprocess__badge-text">
              High-Quality Delivery
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Websitedesigningprocess;