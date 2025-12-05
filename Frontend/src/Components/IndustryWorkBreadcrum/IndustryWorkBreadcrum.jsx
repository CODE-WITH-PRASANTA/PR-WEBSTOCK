import React from "react";
import "./IndustryWorkBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const product = ({ onArrowClick }) => {
  return (
    <section
      className="product-hero"
      style={{ backgroundImage: `url(${PricingBanner})` }}
    >
      <div className="product-hero-overlay" />

      <div className="product-hero-content">
        <div className="product-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">IndustryWork</span>
        </div>

        <h1 className="product-hero-title">Challenge In Every Industry</h1>
      </div>

      <button
        className="product-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="product-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default product;
