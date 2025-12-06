import React, { useState, useEffect } from 'react';
import './Clientstories.css';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Flurance Miyagi',
    role: 'CEO at astra.com',
    company: 'YBC',
    quote:
      "The line's length and style can be changed to better fit your document's general layout and style. Stars, dashes, or even a graphical element are some other divider alternatives.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    company: 'TC',
    quote:
      "Zenfy's solutions transformed our workflow. Their team was professional, responsive, and delivered beyond expectations.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Product Manager at Innovate Inc',
    company: 'II',
    quote:
      'Outstanding consulting service! The implementation was seamless and our team adapted quickly to the new system.',
    rating: 4,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Director at Global Solutions',
    company: 'GS',
    quote:
      "The attention to detail and customer support has been exceptional. We've seen a 40% increase in productivity.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face'
  }
];

const CsClientStoriesRoot = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
  };

  const data = testimonials[currentTestimonial];

  return (
    <section className="cs-root" aria-label="Client stories section">
      <div className="cs-container">
        {/* LEFT */}
        <div className="cs-left">
          <div className="cs-subtitle">✶ CLIENT FEEDBACK ✶</div>

          <h1 className="cs-title">
            Happy Client Stories
          </h1>

          <p className="cs-desc">
            These voices echo the confidence and satisfaction of clients who've witnessed firsthand the impact of our
            solutions. At Zenfy, our clients aren't just partners.
          </p>

          <div className="cs-reviews" aria-hidden>
            <div className="cs-review-item">
              <div className="cs-review-on">Review On</div>
              <div className="cs-stars">★★★★☆</div>
              <div className="cs-platform">
                Clutch <span className="cs-count">(50 reviews)</span>
              </div>
            </div>

            <div className="cs-review-item cs-review-google">
              <div className="cs-review-on">Review On</div>
              <div className="cs-stars">★★★★★</div>
              <div className="cs-platform">
                Google <span className="cs-count">(50 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="cs-right">
          <div className="cs-card" role="region" aria-live="polite">
            <div className="cs-card-header">
              <h3 className="cs-card-title">Great Consulting!</h3>
              <div className="cs-rating" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`cs-star ${i < data.rating ? 'cs-star-filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <blockquote className="cs-quote">“{data.quote}”</blockquote>

            <div className="cs-card-footer">
              <div className="cs-author">
                <img className="cs-avatar" src={data.avatar} alt={`${data.name} avatar`} />
                <div className="cs-author-meta">
                  <div className="cs-author-name">{data.name}</div>
                  <div className="cs-author-role">{data.role}</div>
                </div>
              </div>

              <div className="cs-quote-mark">“”</div>

              <div className="cs-company-logo" aria-hidden>
                {data.company}
              </div>
            </div>

            {/* Navigation */}
            <div className="cs-navigation">
              <button
                type="button"
                className="cs-nav-btn cs-nav-prev"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                ‹
              </button>

              <div className="cs-dots" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`cs-dot ${idx === currentTestimonial ? 'cs-dot-active' : ''}`}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    aria-pressed={idx === currentTestimonial}
                  />
                ))}
              </div>

              <button
                type="button"
                className="cs-nav-btn cs-nav-next"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                ›
              </button>
            </div>

            
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default CsClientStoriesRoot;
