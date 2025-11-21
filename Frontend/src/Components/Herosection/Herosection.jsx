import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-section">
      {/* Slides Container */}
      <div className="slides-container">
        {/* Slide 1 */}
        <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                EXPERTISE YOU CAN TRUST
              </h1>
              <h2 className="hero-subtitle">
                Empowering your brand in the digital universe
              </h2>
              <p className="hero-description">
                Join us as we carve a path to success, driven by passion, powered by innovation, and fueled by the collective spirit of our team. we believe in the power of bold ideas, and we're here to turn them into reality.
              </p>
              <button className="hero-cta-button">
                Free Consultation
              </button>
            </div>
            <div className="hero-image-section">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Digital team collaboration and technology" 
                  className="hero-image"
                />
                <div className="review-overlay">
                  <div className="review-card">
                    <div className="review-header">
                      <div className="stars">★★★★★</div>
                      <div className="review-platform">
                        <span className="google-icon">G</span>
                        Google
                      </div>
                    </div>
                    <div className="review-count">50 reviews</div>
                    <div className="review-label">Review On</div>
                  </div>
                </div>
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                INNOVATION THAT DRIVES RESULTS
              </h1>
              <h2 className="hero-subtitle">
                Transforming ideas into digital excellence
              </h2>
              <p className="hero-description">
                Our team of experts combines creativity with technical prowess to deliver solutions that exceed expectations. We're committed to pushing boundaries and setting new standards in the digital landscape.
              </p>
              <button className="hero-cta-button">
                Get Started
              </button>
            </div>
            <div className="hero-image-section">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team collaboration and innovation" 
                  className="hero-image"
                />
                <div className="review-overlay">
                  <div className="review-card">
                    <div className="review-header">
                      <div className="stars">★★★★★</div>
                      <div className="review-platform">
                        <span className="google-icon">G</span>
                        Google
                      </div>
                    </div>
                    <div className="review-count">45 reviews</div>
                    <div className="review-label">Review On</div>
                  </div>
                </div>
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                YOUR SUCCESS IS OUR MISSION
              </h1>
              <h2 className="hero-subtitle">
                Building tomorrow's digital experiences today
              </h2>
              <p className="hero-description">
                With a proven track record of delivering exceptional results, we partner with you to create meaningful digital experiences that drive growth and create lasting impact for your business.
              </p>
              <button className="hero-cta-button">
                Learn More
              </button>
            </div>
            <div className="hero-image-section">
              <div className="image-container">
                <img 
                  src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Success and growth strategy" 
                  className="hero-image"
                />
                <div className="review-overlay">
                  <div className="review-card">
                    <div className="review-header">
                      <div className="stars">★★★★★</div>
                      <div className="review-platform">
                        <span className="google-icon">G</span>
                        Google
                      </div>
                    </div>
                    <div className="review-count">60 reviews</div>
                    <div className="review-label">Review On</div>
                  </div>
                </div>
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="slide-dots">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HeroSection;