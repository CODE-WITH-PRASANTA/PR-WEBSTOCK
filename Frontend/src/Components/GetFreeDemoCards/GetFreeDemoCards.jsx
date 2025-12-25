import React from "react";
import "./GetFreeDemoCards.css";

const ContactCards = () => {
  return (
    <section className="contact-cards-section">

      {/* Address Card */}
      <div className="contact-card">
        <div className="contact-icon">
          <svg className="icon-svg" viewBox="0 0 64 64">
            <path d="M32 6C22.6 6 15 13.6 15 23c0 11.1 13 25 17 29.4 4-4.4 17-18.3 17-29.4C49 13.6 41.4 6 32 6z"
              fill="none" strokeWidth="3" />
            <circle cx="32" cy="23" r="7" fill="none" strokeWidth="3" />
          </svg>
        </div>

        <h3 className="contact-title">Address Line</h3>
        <p className="contact-text">
          Bowery St, New York, 37 USA <br />
          NY 10013, USA
        </p>
      </div>

      {/* Phone Card */}
      <div className="contact-card">
        <div className="contact-icon">
          <svg className="icon-svg" viewBox="0 0 64 64">
            <path
              d="M22 10l6 10-4 4c2.5 5 6.5 9 11.5 11.5l4-4 10 6-2.5 7.5c-.7 2-2.4 3.5-4.4 3.5C30 48 16 34 15.5 20.4c0-2 1.4-3.7 3.4-4.4L22 10z"
              fill="none" strokeWidth="3"
            />
          </svg>
        </div>

        <h3 className="contact-title">Phone Number</h3>
        <p className="contact-text">
          +1255 - 568 - 6523 4374-221 <br />
          +1255 - 568 - 6523
        </p>
      </div>

      {/* Email Card */}
      <div className="contact-card">
        <div className="contact-icon">
          <svg className="icon-svg" viewBox="0 0 64 64">
            <rect x="10" y="16" width="44" height="32" fill="none" strokeWidth="3" />
            <path d="M10 18l22 18L54 18" fill="none" strokeWidth="3" />
          </svg>
        </div>

        <h3 className="contact-title">Mail Address</h3>
        <p className="contact-text">
          email@example.com <br />
          info@yourdomain.com
        </p>
      </div>

    </section>
  );
};

export default ContactCards;
