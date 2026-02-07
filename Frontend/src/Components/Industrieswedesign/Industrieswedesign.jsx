import React from "react";
import "./Industrieswedesign.css";

const Industrieswedesign = () => {
  return (
    <section className="Industrieswedesign-section">
      <div className="Industrieswedesign-container">

        <h2 className="Industrieswedesign-title">
          Industries We Design Websites For – PR WEBSTOCK
        </h2>

        <p className="Industrieswedesign-subtitle">
          At PrWEBSTOCK, we design powerful, modern, and fully code-based websites that help businesses grow online. Based in Bhubaneswar, we proudly serve clients across India, delivering scalable web design and development solutions built for performance, security, and conversions.
        </p>

        {/* FIRST ROW */}
        <div className="Industrieswedesign-grid Industrieswedesign-grid-four">
          <div className="Industrieswedesign-card first-row first-item">
            <h3>eCommerce</h3>
            <p>
             We design fast, secure, and conversion-focused eCommerce websites that help you sell more. From product management to payment integration, we build smooth online stores optimized for both users and search engines.
            </p>
          </div>

          <div className="Industrieswedesign-card first-row">
            <h3>Healthcare</h3>
            <p>
              We develop secure healthcare websites for clinics, hospitals, and medical startups with features like appointment booking, responsive layouts, and strong data protection standards.
            </p>
          </div>

          <div className="Industrieswedesign-card first-row">
            <h3>Education & eLearning</h3>
            <p>
              Our education websites include LMS integration, mobile-friendly dashboards, and easy content management for schools, institutes, and online learning platforms.
            </p>
          </div>

          <div className="Industrieswedesign-card first-row last-item">
            <h3>Technology & SaaS</h3>
            <p>
              We build scalable SaaS and technology websites that highlight product features, improve conversions, and establish brand credibility with clean design and strong backend support.
            </p>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="Industrieswedesign-grid Industrieswedesign-grid-three">
          <div className="Industrieswedesign-card second-row">
            <h3>Real Estate</h3>
            <p>
              We design modern real estate websites with property listings, image galleries, virtual tours, and advanced search filters. Our code-based platforms make it easy for users to explore properties and for businesses to manage listings efficiently.
            </p>
          </div>

          <div className="Industrieswedesign-card second-row">
            <h3>Finance & Legal</h3>
            <p>
              For finance and legal professionals, we build secure and professional websites that focus on trust, clarity, and compliance. Clean design, fast performance, and structured content help establish credibility and improve client engagement.
            </p>
          </div>

          <div className="Industrieswedesign-card second-row">
            <h3>Hospitality & Travel</h3>
            <p>
              We create visually appealing, booking-focused websites for hotels, resorts, and travel brands. Strong storytelling, mobile-friendly layouts, and smooth booking experiences help convert visitors into customers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Industrieswedesign;
