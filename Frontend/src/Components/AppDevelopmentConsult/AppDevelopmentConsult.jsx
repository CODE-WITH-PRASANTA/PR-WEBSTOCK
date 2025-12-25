import React from "react";
import "./AppDevelopmentConsult.css";
import consultBg from "../../assets/consult-img.webp"; // <= your full background image

const ConsultSection = () => {
  return (
    <section
      className="consult-section"
      style={{ backgroundImage: `url(${consultBg})` }}
    >
      <div className="consult-container">
        <div className="consult-card">
          <h2 className="consult-title">Consult with our professionals</h2>

          {/* Row 1 */}
          <div className="consult-row">
            <div className="consult-field">
              <label>Name *</label>
              <input type="text" />
            </div>

            <div className="consult-field">
              <label>Phone *</label>
              <input type="text" />
            </div>
          </div>

          {/* Email */}
          <div className="consult-row">
            <div className="consult-field full">
              <label>Email *</label>
              <input type="email" />
            </div>
          </div>

          {/* Message */}
          <div className="consult-row">
            <div className="consult-field full">
              <label>Your Message *</label>
              <textarea rows="4"></textarea>
            </div>
          </div>

          {/* Button */}
          <button className="consult-btn">
            Get free consultation
            <span className="btn-arrow">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultSection;
