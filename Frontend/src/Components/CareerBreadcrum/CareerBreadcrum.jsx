import React from "react";
import "./CareerBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const career = ({ onArrowClick }) => {
  return (
    <section
      className="career-hero"
      style={{ backgroundImage: `url(${PricingBanner})` }}
    >
      <div className="career-hero-overlay" />

      <div className="career-hero-content">
        <div className="career-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">Career</span>
        </div>

        <h1 className="career-hero-title">Our reinvention starts with you.</h1>
      </div>

      <button
        className="career-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="career-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default career;
