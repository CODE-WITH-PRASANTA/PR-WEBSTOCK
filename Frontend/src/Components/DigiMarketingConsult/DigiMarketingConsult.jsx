import React from "react";
import "./DigiMarketingConsult.css";
import bgImage from "../../assets/DigitalMarketingConsult.jpeg";

const ConsultSection = () => {
  return (
    <section
      className="consult-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
        
      <div className="overlay"></div>

      <div className="consult-card">
        <h2>Consult with our professionals</h2>

        <form className="consult-form">
          <input type="text" placeholder="Name *" required />
          <input type="email" placeholder="Email *" required />
          <input type="tel" placeholder="Phone *" required />
          <textarea placeholder="Your Message *" rows="4"></textarea>

          <button type="submit">
            Get free consultation →
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConsultSection;
