import React from "react";
import "./BlogBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const blog = ({ onArrowClick }) => {
  return (
    <section
      className="blog-hero"
      style={{ backgroundImage: `url(${PricingBanner})` }}
    >
      <div className="blog-hero-overlay" />

      <div className="blog-hero-content">
        <div className="blog-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">blog</span>
        </div>

        <h1 className="blog-hero-title">Latest News Blog & Article.</h1>
      </div>

      <button
        className="blog-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="blog-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default blog;
