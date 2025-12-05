import React from "react";
import "./ContactBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const Contact = ({ onArrowClick }) => {
  return (
    <section
      className="contact-hero"
      style={{ backgroundImage: `url(${PricingBanner})` }}
    >
      <div className="contact-hero-overlay" />

      <div className="contact-hero-content">
        <div className="contact-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">CONTACT</span>
        </div>

        <h1 className="contact-hero-title">Let's Connecting With Us</h1>
      </div>

      <button
        className="contact-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="contact-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default Contact;
