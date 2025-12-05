import React from "react";
import { FaStar } from "react-icons/fa";
import "./CompanyShowcase.css";

import teamImg from "../../assets/why-choose.webp";

const CompanyShowcase = () => {
  return (
    <section className="company-section">
      {/* Top heading */}
      <div className="company-hero">
        <div className="company-badge">
          <FaStar className="company-badge-star" />
          <span>DISCOVER THE ADVANTAGE</span>
          <FaStar className="company-badge-star" />
        </div>

        <h1 className="company-title">
          We are a <span className="company-title-strong">IT service Company working with</span>
          <br />
          <span className="company-title-highlight">talents</span> on delivering unique ideas.
        </h1>

        <p className="company-subtext">
          Where innovation meets passion in a journey that started with a simple idea and a shared dora Founded in recent year we embarked on a mission told bring the new innovation and introduct the technology. From humble beginnings to our current aspirations.
        </p>
      </div>

      {/* Main content block */}
      <div className="company-main">
        <div className="company-left">
          <div className="company-image-wrap">
            <img src={teamImg} alt="team" className="company-image" />
          </div>
        </div>

        <div className="company-right">
          <p className="company-right-text">
            Where innovation meets passion in a journey that started with a simple idea and a shared dora Founded in recent year we embarked on a mission told bring the new innovation and introduct the technology. From humble beginnings to our current aspirations.
          </p>

          <div className="company-stats-grid">
            <div className="company-stat">
              <div className="company-stat-number">30</div>
              <div className="company-stat-label">Project Completed</div>
            </div>

            <div className="company-stat">
              <div className="company-stat-number">1K</div>
              <div className="company-stat-label">Awesome clients</div>
            </div>

            <div className="company-stat">
              <div className="company-stat-number">6</div>
              <div className="company-stat-label">Years of Experience</div>
            </div>

            <div className="company-stat">
              <div className="company-stat-number">19</div>
              <div className="company-stat-label">Awards Winning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyShowcase;
