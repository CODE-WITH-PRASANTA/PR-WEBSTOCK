import React from "react";
import "./Industrieswedesign.css";

const Industrieswedesign = () => {
  return (
    <section className="Industrieswedesign-section">
      <div className="Industrieswedesign-container">

        <h2 className="Industrieswedesign-title">
          Industries We Design Websites For
        </h2>

        <p className="Industrieswedesign-subtitle">
          As a creative web design Bangalore agency, we craft custom website designs
          that help businesses across industries stand out and succeed online.
        </p>

        {/* FIRST ROW */}
        <div className="Industrieswedesign-grid Industrieswedesign-grid-four">
          <div className="Industrieswedesign-card first-row first-item">
            <h3>eCommerce</h3>
            <p>
              We build fast, mobile-responsive online stores that are optimized
              for sales, customer engagement, and smooth checkout process.
            </p>
          </div>

          <div className="Industrieswedesign-card first-row">
            <h3>Healthcare</h3>
            <p>
              Secure, accessible platforms for clinics, hospitals, and healthcare
              startups with appointment booking and HIPAA-compliant features.
            </p>
          </div>

          <div className="Industrieswedesign-card first-row">
            <h3>Education & eLearning</h3>
            <p>
              Intuitive learning portals with LMS integrations and mobile
              compatibility for students and educators.
            </p>
          </div>

          <div className="Industrieswedesign-card first-row last-item">
            <h3>Technology & SaaS</h3>
            <p>
              Scalable SaaS websites highlighting features, conversions, and
              product credibility.
            </p>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="Industrieswedesign-grid Industrieswedesign-grid-three">
          <div className="Industrieswedesign-card second-row">
            <h3>Real Estate</h3>
            <p>
              Property portals with image galleries, virtual tours, and advanced
              search filters.
            </p>
          </div>

          <div className="Industrieswedesign-card second-row">
            <h3>Finance & Legal</h3>
            <p>
              Secure professional websites that reinforce trust, credibility,
              and compliance.
            </p>
          </div>

          <div className="Industrieswedesign-card second-row">
            <h3>Hospitality & Travel</h3>
            <p>
              Booking-driven websites for hotels, resorts, and travel brands with
              strong storytelling.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Industrieswedesign;
