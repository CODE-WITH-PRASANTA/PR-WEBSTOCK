import React, { useState, useEffect } from 'react';
import API, { IMG_URL } from "../../api/axios"; // Uses pre-configured Axios instance and base assets directory
import './Clientstories.css';

const ClientStoriesRoot = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH: Sync component state with real-time database entries
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await API.get("/testimonial/all");
      
      console.log("CLIENT STORIES GET RESPONSE", response.data);

      if (response.data && response.data.success) {
        setTestimonials(response.data.data || []);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Client Stories Fetch Error:", err);
      setError("Failed to fetch client stories.");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // CAROUSEL AUTOMATION TIMEOUT EFFECT
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setCurrentTestimonial(index);
  };

  // Gracefully handle loading, missing data, or empty array returns
  if (loading) {
    return (
      <section className="cs-root" aria-label="Client stories section">
        <div className="cs-container" style={{ justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
          <p style={{ color: "inherit", opacity: 0.7 }}>Loading wonderful client stories...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="cs-root" aria-label="Client stories section">
        <div className="cs-container" style={{ justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
          <p style={{ color: "inherit", opacity: 0.7 }}>No testimonials available at this moment.</p>
        </div>
      </section>
    );
  }

  // Safely grab the current slide row reference
  const data = testimonials[currentTestimonial];

  // Map database response parameters dynamically
  const resolvedName = data.name || "Anonymous";
  const resolvedDesignation = data.designation || "Client";
  const resolvedFeedback = data.feedback || "";
  const resolvedRating = Number(data.rating || 0);
  const resolvedImage = data.profileImage || data.photo;

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
                  <span key={i} className={`cs-star ${i < resolvedRating ? 'cs-star-filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            <blockquote className="cs-quote">“{resolvedFeedback}”</blockquote>

            <div className="cs-card-footer">
              <div className="cs-author">
                {resolvedImage ? (
                  <img 
                    className="cs-avatar" 
                    src={`${IMG_URL}${resolvedImage}`} 
                    alt={`${resolvedName} avatar`} 
                    onError={(e) => {
                      e.target.onerror = null;
                      // Safe vector icon fallback if a static production upload goes missing
                      e.target.src = "https://cdn-images.mailchimp.com/icons/social-block/color-link-128.png";
                    }}
                  />
                ) : (
                  <div className="cs-avatar" style={{ backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
                    {resolvedName.charAt(0)}
                  </div>
                )}
                <div className="cs-author-meta">
                  <div className="cs-author-name">{resolvedName}</div>
                  <div className="cs-author-role">{resolvedDesignation}</div>
                </div>
              </div>

              <div className="cs-quote-mark">“”</div>

              <div className="cs-company-logo" aria-hidden>
                {/* Fallback to initials if company-specific text tracking was omitted */}
                {data.company || resolvedName.split(' ').map(n => n[0]).join('').toUpperCase()}
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

export default ClientStoriesRoot;