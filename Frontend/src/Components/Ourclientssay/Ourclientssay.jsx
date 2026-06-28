import React, { useState, useEffect } from 'react';
import API, { IMG_URL } from "../../api/axios"; // Uses pre-configured Axios instance and base assets directory
import "./Ourclientssay.css";

export default function OurClientsSay() {
  const [testimonials, setTestimonials] = useState([]);
  const [start, setStart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH: Dynamic backend client data ingestion pipeline
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await API.get("/testimonial/all");
      
      console.log("CLIENT TESTIMONIALS GET RESPONSE", response.data);

      if (response.data && response.data.success) {
        setTestimonials(response.data.data || []);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Testimonial Fetch Error:", err);
      setError("Failed to fetch client testimonials.");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Gracefully handle data-loading and empty database query edge cases
  if (loading) {
    return (
      <section className="ocs-section">
        <div className="ocs-container" style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ opacity: 0.7 }}>Loading wonderful client words...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="ocs-section">
        <div className="ocs-container" style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ opacity: 0.7 }}>No testimonials available at this moment.</p>
        </div>
      </section>
    );
  }

  // DYNAMIC CALCULATED SLIDE ROW MATRIX
  // Ensures safety even if total dataset contains less items than the layout design window length (3)
  const visible = [];
  const itemsToRender = Math.min(3, testimonials.length);
  for (let i = 0; i < itemsToRender; i++) {
    visible.push(testimonials[(start + i) % testimonials.length]);
  }

  const prev = () => {
    if (isAnimating || testimonials.length <= 1) return;
    setIsAnimating(true);
    setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const next = () => {
    if (isAnimating || testimonials.length <= 1) return;
    setIsAnimating(true);
    setStart((s) => (s + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="ocs-section">
      <div className="ocs-container">
        <h2 className="ocs-title">
          What our <span className="ocs-title-highlight">clients say</span>
        </h2>
        <p className="ocs-subtitle">Trusted by businesses worldwide</p>

        <div className="ocs-cards-wrapper">
          {visible.map((t, idx) => {
            // Mapping schema attributes accurately to match controller responses safely
            const resolvedName = t.name || "Anonymous";
            const resolvedCompany = t.company || t.designation || "Partner";
            const resolvedText = t.feedback || t.text || "";
            const resolvedStars = Number(t.rating || t.stars || 5);
            const resolvedImage = t.profileImage || t.photo;

            return (
              <div 
                className={`ocs-card ${isAnimating ? 'ocs-card-transition' : ''}`} 
                key={idx}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="ocs-card-header">
                  <div>
                    <div className="ocs-avatar-placeholder" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {resolvedImage ? (
                        <img 
                          src={`${IMG_URL}${resolvedImage}`} 
                          alt={`${resolvedName} avatar`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            // Text fallback if network fetch breaks
                            e.target.parentNode.innerText = resolvedName.charAt(0);
                          }}
                        />
                      ) : (
                        resolvedName.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="ocs-name">{resolvedName}</h3>
                      <p className="ocs-company">{resolvedCompany}</p>
                    </div>
                  </div>

                  <div className="ocs-rating-container">
                    <div className="ocs-stars">
                      {Array.from({ length: resolvedStars }).map((_, i) => (
                        <span key={i} className="ocs-star">★</span>
                      ))}
                    </div>
                    <img
                      src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
                      alt="Google"
                      className="ocs-logo"
                    />
                  </div>
                </div>

                <p className="ocs-text">{resolvedText}</p>
                <div className="ocs-quote-mark">"</div>
              </div>
            );
          })}
        </div>

        <div className="ocs-nav">
          <button className="ocs-btn ocs-btn-prev" onClick={prev} aria-label="Previous testimonial">
            ←
          </button>
          <div className="ocs-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`ocs-dot ${idx === start % testimonials.length ? 'ocs-dot-active' : ''}`}
                onClick={() => setStart(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          <button className="ocs-btn ocs-btn-next" onClick={next} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}