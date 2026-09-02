import React, { useState, useEffect } from 'react';
import './TrainingTestimonial.css';

// Asset Imports (adjust relative paths as needed)
import testimonialImg1 from '../../assets/TrainingTestimonial1.png';
import testimonialImg2 from '../../assets/TrainingTestimonial2.png';
import partnerImg1 from '../../assets/TrainingPartner1.png';
import partnerImg2 from '../../assets/TrainingPartner2.png';
import partnerImg3 from '../../assets/TrainingPartner3.png';

// 8 Testimonials across 4 slides (2 cards per slide)
const TESTIMONIAL_SLIDES = [
  [
    {
      id: 1,
      name: 'Shahid Quraishi',
      role: 'Expert Student',
      avatar: testimonialImg1,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Anjelina Watson',
      role: 'UI/UX Designer',
      avatar: testimonialImg2,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
  ],
  [
    {
      id: 3,
      name: 'David Miller',
      role: 'Frontend Developer',
      avatar: testimonialImg1,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Sophia Reynolds',
      role: 'Lead Instructor',
      avatar: testimonialImg2,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
  ],
  [
    {
      id: 5,
      name: 'Michael Chang',
      role: 'Data Scientist',
      avatar: testimonialImg1,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Emma Roberts',
      role: 'Product Strategist',
      avatar: testimonialImg2,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
  ],
  [
    {
      id: 7,
      name: 'Alexander Lee',
      role: 'Full Stack Engineer',
      avatar: testimonialImg1,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
    {
      id: 8,
      name: 'Clara Bennett',
      role: 'Creative Director',
      avatar: testimonialImg2,
      text: 'edulax the ultimate destination for knowledge seekers educators we are committed to transforing special education attractive ompliant systems learning opinions.',
      rating: 5,
    },
  ],
];

const PARTNERS = [
  { id: 1, name: 'Palo Alto Networks', logo: partnerImg1 },
  { id: 2, name: 'Databricks', logo: partnerImg2 },
  { id: 3, name: 'Walmart', logo: partnerImg3 },
];

const TrainingTestimonial = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TESTIMONIAL_SLIDES.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <section className="TrainingTestimonial-section">
      <div className="TrainingTestimonial-inner-container">
        {/* Top Header */}
        <div className="TrainingTestimonial-header">
          <div className="TrainingTestimonial-badge">
            <span className="TrainingTestimonial-badge-square"></span>
            <span className="TrainingTestimonial-badge-text">TESTIMONIAL</span>
          </div>
          <h2 className="TrainingTestimonial-title">What Our Students Think</h2>
        </div>

        {/* Carousel Viewport (2 Cards Per Slide) */}
        <div className="TrainingTestimonial-carousel-viewport">
          <div
            className="TrainingTestimonial-slider-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {TESTIMONIAL_SLIDES.map((slidePair, slideIdx) => (
              <div key={slideIdx} className="TrainingTestimonial-slide-group">
                {slidePair.map((item) => (
                  <div key={item.id} className="TrainingTestimonial-card">
                    {/* Top row: Avatar + Quote Text */}
                    <div className="TrainingTestimonial-card-top">
                      <div className="TrainingTestimonial-avatar-wrap">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="TrainingTestimonial-avatar-img"
                        />
                      </div>
                      <p className="TrainingTestimonial-quote-text">{item.text}</p>
                    </div>

                    <div className="TrainingTestimonial-card-divider"></div>

                    {/* Bottom row: Name & Large Gold Stars */}
                    <div className="TrainingTestimonial-card-bottom">
                      <div className="TrainingTestimonial-author-meta">
                        <h4 className="TrainingTestimonial-author-name">{item.name}</h4>
                        <span className="TrainingTestimonial-author-role">{item.role}</span>
                      </div>

                      <div className="TrainingTestimonial-rating-stars">
                        {'★'.repeat(item.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4 Interactive Clickable Pagination Dots with outer circle on active */}
        <div className="TrainingTestimonial-pagination">
          {TESTIMONIAL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`TrainingTestimonial-dot-btn ${
                activeSlide === idx ? 'TrainingTestimonial-dot-btn--active' : ''
              }`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="TrainingTestimonial-dot-inner"></span>
            </button>
          ))}
        </div>

        {/* Bottom Section: Our Trusted Partners */}
        <div className="TrainingTestimonial-partners-row">
          <div className="TrainingTestimonial-partners-heading">
            <div className="TrainingTestimonial-badge">
              <span className="TrainingTestimonial-badge-square"></span>
              <span className="TrainingTestimonial-badge-text">OUR PARTNERS</span>
            </div>
            <h3 className="TrainingTestimonial-partners-title">Our Trusted Partners</h3>
          </div>

          <div className="TrainingTestimonial-partners-grid">
            {PARTNERS.map((partner) => (
              <div key={partner.id} className="TrainingTestimonial-partner-card">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="TrainingTestimonial-partner-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingTestimonial;