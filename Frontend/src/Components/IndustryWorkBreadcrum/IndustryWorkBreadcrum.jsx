import React from "react";
import "./IndustryWorkBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const IndustryWorkBreadcrum = ({ onArrowClick }) => {
  return (
    <section className="product-hero">
      {/* LCP IMAGE */}
      <img
        src={PricingBanner}
        alt="Industry-Ready Web & App Solutions"
        className="product-hero-image"
        fetchPriority="high"
        decoding="async"
      />

      <div className="product-hero-overlay" />

      <div className="product-hero-content">
        <div className="product-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">IndustryWork</span>
        </div>

        <h1 className="product-hero-title">
          Industry-Ready Web & App Solutions
        </h1>
      </div>

      <button
        className="product-scroll-indicator"
        type="button"
        onClick={onArrowClick}
        aria-label="Scroll to next section"
      >
        <span className="product-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default IndustryWorkBreadcrum;