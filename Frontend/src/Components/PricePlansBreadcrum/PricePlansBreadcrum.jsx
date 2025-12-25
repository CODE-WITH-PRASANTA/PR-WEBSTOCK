import React from "react";
import "./PricePlansBreadcrum.css";
// optional: import your background image
import PricingBanner from "../../assets/Breadcrum.webp";

const PricingHero = ({ onArrowClick }) => {
  return (
    <section
      className="pricing-hero"
      // if you use an image, uncomment this:
      style={{ backgroundImage: `url(${PricingBanner})` }}
    >
      <div className="pricing-hero-overlay" />

      <div className="pricing-hero-content">
        <div className="pricing-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">PRICING</span>
        </div>

        <h1 className="pricing-hero-title">Our Smart Pricing, Better Value</h1>
      </div>

      <button
        className="pricing-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="pricing-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default PricingHero;
