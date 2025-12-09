import React from "react";
import "./AboutBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const About = ({ onArrowClick }) => {
  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${PricingBanner})` }}
    >
      <div className="about-hero-overlay" />

      <div className="about-hero-content">
        <div className="about-breadcrumb-pill">
          <span className="crumb-active">Home</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">About Us</span>
        </div>

        <h1 className="about-hero-title">
         Leading Software & Digital Solutions
        </h1>
      </div>

      <button
        className="about-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="about-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default About;
