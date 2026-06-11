import React from "react";
import "./PotentialDigiMarketing.css";
import mockupImg from "../../assets/cta-bannerDM.webp"; 
// replace with your actual image

const BusinessConsult = () => {
  return (
    <section className="consult-wrapper">
      <div className="consult-container">
        {/* LEFT IMAGE */}
        <div className="consult-image">
          <img src={mockupImg} alt="Business Mockup" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="consult-content">
          <h2>
            Unlock Your Business Potential <br />
            <span>with Webomindapps</span>
          </h2>

          <p className="subtitle">
            Step up your online presence with the proper utilization of digital assets.
          </p>

          <form className="consult-form">
            <div className="form-group">
              <input type="text" required />
              <label>Full Name</label>
            </div>

            <div className="form-group">
              <input type="tel" required />
              <label>Phone Number</label>
            </div>

            <div className="form-group">
              <input type="email" required />
              <label>Work Email</label>
            </div>

            <div className="form-group textarea">
              <textarea rows="4" required />
              <label>Your Message</label>
            </div>

            <button type="submit" className="consult-btn">
              Talk to our experts <span>↗</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BusinessConsult;
