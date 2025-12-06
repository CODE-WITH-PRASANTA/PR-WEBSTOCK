import React, { useState, useEffect, useRef } from 'react';
import { 
  FiFileText, 
  FiSmartphone, 
  FiZap, 
  FiRefreshCw, 
  FiDroplet, 
  FiMapPin, 
  FiSquare,
  FiChevronDown,
  FiCheck
} from 'react-icons/fi';
import './Servicesweoffer.css';

const designTypes = [
  {
    id: 1,
    title: 'Static Design',
    description: 'Fixed layouts with predetermined content. Elements remain static regardless of screen size.',
    icon: FiFileText,
    color: '#4F46E5',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%)',
    features: [
      'Fixed layout structure',
      'Simple development',
      'Fast loading times',
      'Easy maintenance',
      'Consistent appearance'
    ]
  },
  {
    id: 2,
    title: 'Responsive Design',
    description: 'Adapts layout across all devices for optimal user experience.',
    icon: FiSmartphone,
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    features: [
      'Fluid grid layouts',
      'Flexible media',
      'CSS media queries',
      'Cross-device compatibility',
      'Mobile-first approach'
    ]
  },
  {
    id: 3,
    title: 'Dynamic Design',
    description: 'Content updates from both front and back end with personalized experiences.',
    icon: FiZap,
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    features: [
      'Database-driven content',
      'User-specific experiences',
      'Real-time updates',
      'Interactive elements',
      'Personalized recommendations'
    ]
  },
  {
    id: 4,
    title: 'Adaptive Design',
    description: 'Multiple fixed layouts served based on device detection.',
    icon: FiRefreshCw,
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    features: [
      'Multiple layout versions',
      'Device-specific optimization',
      'Faster performance',
      'Targeted experiences',
      'Design control'
    ]
  },
  {
    id: 5,
    title: 'Liquid Design',
    description: 'Elements scale proportionally based on screen size.',
    icon: FiDroplet,
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    features: [
      'Percentage-based widths',
      'Scalable typography',
      'Relative sizing',
      'Smooth transitions',
      'Window adaptation'
    ]
  },
  {
    id: 6,
    title: 'Single Page Design',
    description: 'Seamless experience within one page without reloads.',
    icon: FiMapPin,
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    features: [
      'No page reloads',
      'Fast navigation',
      'Smooth animations',
      'Progressive loading',
      'App-like experience'
    ]
  },
  {
    id: 7,
    title: 'Fixed Design',
    description: 'Pixel-perfect positioning across all devices.',
    icon: FiSquare,
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    features: [
      'Pixel precision',
      'Consistent layout',
      'Predictable rendering',
      'Designer control',
      'Traditional approach'
    ]
  }
];

const Servicesweoffer = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section className="servicesweoffer" ref={containerRef} aria-label="Web Design Services">
      <div className="servicesweoffer-container">
        {/* Header Section */}
        <header className="servicesweoffer-header">
          
          
          <h1 className="servicesweoffer-title">
            Different Types of <span className="servicesweoffer-title-accent">Web Design</span>
          </h1>
          
          <p className="servicesweoffer-subtitle">
            Explore various web design approaches to find the perfect solution 
            that matches your business needs and target audience requirements.
          </p>
          
          <div className="servicesweoffer-header-decoration">
            <div className="servicesweoffer-decoration-line"></div>
            <div className="servicesweoffer-decoration-dot"></div>
            <div className="servicesweoffer-decoration-line"></div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="servicesweoffer-grid">
          {designTypes.map((design, index) => {
            const Icon = design.icon;
            return (
              <article
                key={design.id}
                className={`
                  servicesweoffer-card 
                  ${isVisible ? 'servicesweoffer-card--visible' : ''}
                  ${activeCard === design.id ? 'servicesweoffer-card--active' : ''}
                `}
                style={{ 
                  '--card-delay': `${index * 80}ms`,
                  '--card-color': design.color,
                  '--card-gradient': design.gradient 
                }}
                onClick={() => handleCardClick(design.id)}
                onMouseEnter={() => setActiveCard(design.id)}
                onMouseLeave={() => activeCard === design.id && setActiveCard(null)}
                role="button"
                tabIndex={0}
                aria-expanded={activeCard === design.id}
              >
                {/* Card Background Effects */}
                <div 
                  className="servicesweoffer-card-bg" 
                  style={{ background: design.gradient }}
                ></div>
                
                {/* Card Content */}
                <div className="servicesweoffer-card-content">
                  <div className="servicesweoffer-card-header">
                    <div 
                      className="servicesweoffer-card-icon"
                      style={{ background: design.gradient }}
                      aria-hidden="true"
                    >
                      <div className="servicesweoffer-card-icon-inner">
                        <Icon className="servicesweoffer-card-icon-svg" />
                      </div>
                      <div className="servicesweoffer-card-icon-glow"></div>
                    </div>
                    
                    <div className="servicesweoffer-card-title-wrapper">
                      <h3 className="servicesweoffer-card-title">{design.title}</h3>
                      <div className="servicesweoffer-card-indicator">
                        <FiChevronDown className="servicesweoffer-card-indicator-icon" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="servicesweoffer-card-body">
                    <p className="servicesweoffer-card-description">{design.description}</p>
                    
                    <div 
                      className={`
                        servicesweoffer-card-features 
                        ${activeCard === design.id ? 'servicesweoffer-card-features--expanded' : ''}
                      `}
                    >
                      <div className="servicesweoffer-features-content">
                        <h4 className="servicesweoffer-features-title">Key Features:</h4>
                        <ul className="servicesweoffer-features-list">
                          {design.features.map((feature, idx) => (
                            <li key={idx} className="servicesweoffer-feature-item">
                              <span className="servicesweoffer-feature-marker">
                                <FiCheck className="servicesweoffer-feature-check" />
                              </span>
                              <span className="servicesweoffer-feature-text">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="servicesweoffer-card-footer">
                    <span className="servicesweoffer-card-label">
                      {activeCard === design.id ? 'Click to collapse' : 'Click to expand'}
                      <FiChevronDown className="servicesweoffer-card-label-icon" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default Servicesweoffer;