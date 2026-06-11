import React from "react";
import "./DigimarkOfficialgoogle.css";

// Import FULL Google Partner Image (logo + arrow + badge)
import googlePartnerFull from "../../assets/Google-Partner.webp";

const GooglePartnerSection = () => {
  return (
    <section className="google-partner-section">
      <div className="google-partner-container">

        {/* Left Content */}
        <div className="google-partner-text">
          <h2>Official Google partner agency</h2>
          <p>
            Google trusts us, and so can you! As an official Google Partner, we
            bring top-tier expertise, smarter ads, and better ROI for your
            business. Get smarter, data-driven marketing with a team recognized
            by Google itself!
          </p>
        </div>

        {/* Right Image */}
        <div className="google-partner-image">
          <img
            src={googlePartnerFull}
            alt="Google Partner"
          />
        </div>

      </div>
    </section>
  );
};

export default GooglePartnerSection;
