import React, { useState, useEffect } from 'react';
import "./Ourclientssay.css";

const testimonials = [
  {
    name: "Ram Prakash",
    company: "Mirabelle",
    stars: 5,
    text: `I had a great experience working with the webomindapps. They completed our website with utmost patience and professionalism. Throughout the process, they were extremely helpful — not just in development, but also supported in SEO and advertising. Highly recommend.`,
  },
  {
    name: "Saravanan",
    company: "5 Star Advertising",
    stars: 5,
    text: `I am truly inspired by this team with the quality service they provide. They coordinate at their best to satisfy clients. More than 5 years of experience with Webomindapps in development, branding, SEO, and marketing.`,
  },
  {
    name: "Kiran Patil",
    company: "Airowire",
    stars: 5,
    text: `We are truly delighted with the experience of working with Webomindapps on Airowire's website. Perfect blend of creativity, professionalism, and genuine commitment. Highly recommended.`,
  },
];

export default function OurClientsSay() {
  const [start, setStart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const visible = [];
  for (let i = 0; i < 3; i++) {
    visible.push(testimonials[(start + i) % testimonials.length]);
  }

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const next = () => {
    if (isAnimating) return;
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
          {visible.map((t, idx) => (
            <div 
              className={`ocs-card ${isAnimating ? 'ocs-card-transition' : ''}`} 
              key={idx}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="ocs-card-header">
                <div>
                  <div className="ocs-avatar-placeholder">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="ocs-name">{t.name}</h3>
                    <p className="ocs-company">{t.company}</p>
                  </div>
                </div>

                <div className="ocs-rating-container">
                  <div className="ocs-stars">
                    {Array.from({ length: t.stars }).map((_, i) => (
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

              <p className="ocs-text">{t.text}</p>
              <div className="ocs-quote-mark">"</div>
            </div>
          ))}
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