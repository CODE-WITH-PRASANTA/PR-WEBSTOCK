import React, { useState, useEffect, useRef } from 'react';
import './OurFeatures.css';

// Asset paths (replace with your local paths)
import featureHeroImg from '../../assets/feature-student.png';
import waveIcon from '../../assets/wave-icon.png';

const STATS_DATA = [
  { id: 1, endVal: 15000, label: 'Students Enrolled', variant: 'green' },
  { id: 2, endVal: 180, label: 'Solution Experts', variant: 'blue' },
  { id: 3, endVal: 899, label: 'Top Instructors', variant: 'lime' },
  { id: 4, endVal: 668, label: 'Students Awards', variant: 'peach' },
];

const OurFeatures = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [counts, setCounts] = useState(STATS_DATA.map(() => 0));
  const [hasCounted, setHasCounted] = useState(false);
  const statsSectionRef = useRef(null);

  // Animated Counter on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          const duration = 2000;
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out deceleration curve
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS_DATA.map((stat) => Math.floor(easeOut * stat.endVal))
            );

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts(STATS_DATA.map((stat) => stat.endVal));
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasCounted]);

  return (
    <div className="OurFeatures-root">
      {/* SECTION 1: Top White Background (Extra-Large Image + Info) */}
      <section className="OurFeatures-top-section">
        <div className="OurFeatures-inner-container">
          <div className="OurFeatures-main-row">
            {/* Left Media Column - Enlarged */}
            <div className="OurFeatures-media-col">
              <div className="OurFeatures-image-wrapper">
                <img
                  src={featureHeroImg}
                  alt="Student studying with headphones"
                  className="OurFeatures-main-image"
                />

                {/* Overlapping Play Button with Inner Thumbnail Image */}
                <button
                  type="button"
                  className="OurFeatures-play-button"
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Play video"
                >
                  <div className="OurFeatures-play-dashed-ring"></div>
                  <div className="OurFeatures-play-inner-disc">
                    <img
                      src={featureHeroImg}
                      alt="Video preview"
                      className="OurFeatures-play-bg-img"
                    />
                    <div className="OurFeatures-play-glass-overlay">
                      <span className="OurFeatures-play-text">PLAY</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="OurFeatures-info-col">
              <div className="OurFeatures-badge-wrapper">
                <span className="OurFeatures-badge-square"></span>
                <span className="OurFeatures-badge-text">OUR FEATURES</span>
              </div>

              <h2 className="OurFeatures-title">
                Upgrade Your Skills with the Newest Trends
              </h2>

              <p className="OurFeatures-description">
                Combining a rich history cutting-edge technology this fostering
                academic and personal Conveniently architect meta-services
                through whiteboard world-class
              </p>

              {/* Checklist */}
              <ul className="OurFeatures-checklist">
                <li className="OurFeatures-checklist-item">
                  <span className="OurFeatures-check-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="OurFeatures-check-text">
                    Flexible Courses to Match Your Unique Needs
                  </span>
                </li>

                <li className="OurFeatures-checklist-item">
                  <span className="OurFeatures-check-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="OurFeatures-check-text">
                    Learning with Multimedia &amp; Interactivity
                  </span>
                </li>

                <li className="OurFeatures-checklist-item">
                  <span className="OurFeatures-check-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </span>
                  <span className="OurFeatures-check-text">
                    Performance Tracking Tools
                  </span>
                </li>
              </ul>

              {/* CTA Row with Right-Aligned Wave */}
              <div className="OurFeatures-cta-row">
                <button type="button" className="OurFeatures-get-started-btn">
                  <span className="OurFeatures-btn-text">
                    GET STARTED <span className="OurFeatures-btn-arrow">&rarr;</span>
                  </span>
                </button>

                <div className="OurFeatures-wave-container">
                  <img
                    src={waveIcon}
                    alt="Decorative wave"
                    className="OurFeatures-wave-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Separate Mint-Green Background Section for Stat Cards */}
      <section ref={statsSectionRef} className="OurFeatures-bottom-stats-section">
        <div className="OurFeatures-inner-container">
          <div className="OurFeatures-stats-grid">
            {STATS_DATA.map((item, index) => (
              <div
                key={item.id}
                className={`OurFeatures-stat-card OurFeatures-stat-card--${item.variant}`}
              >
                <h3 className="OurFeatures-stat-number">{counts[index]}+</h3>
                <p className="OurFeatures-stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Modal */}
      {isVideoOpen && (
        <div
          className="OurFeatures-modal-backdrop"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="OurFeatures-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="OurFeatures-modal-close"
              onClick={() => setIsVideoOpen(false)}
            >
              &times;
            </button>
            <div className="OurFeatures-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Educational Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurFeatures;