import React from "react";
import "./IndustryHowWeDo.css";

import icon1 from "../../assets/about-feature-card-icon1.webp";
import icon2 from "../../assets/about-feature-card-icon2.webp";
import icon3 from "../../assets/about-feature-card-icon3.webp";
import icon4 from "../../assets/about-feature-card-icon4.webp";

const items = [
  {
    icon: icon1,
    title: "Expertise and Innovation",
    text: "We pride ourselves staying at the front of innovation, constantly pushing boundaries and redefining what's possible."
  },
  {
    icon: icon2,
    title: "Transparent Process",
    text: "Our transparent process is designed to demystify the journey from concept to delivery."
  },
  {
    icon: icon3,
    title: "Client-Centric Approach",
    text: "Our dedicated team takes the time to listen and collaborate, making every interaction a step towards your success."
  },
  {
    icon: icon4,
    title: "Cost-Effective",
    text: "Our commitment to providing cost-effective solutions is ingrained in our mission."
  }
];

export default function HowWeDo() {
  return (
    <section className="howwe-section">
      <div className="howwe-container">
        {/* Header */}
        <div className="howwe-header">
          <div className="howwe-badge">
            <span className="howwe-badge-dot" />
            <span className="howwe-badge-text">How We Do</span>
            <span className="howwe-badge-dot" />
          </div>

          <h2 className="howwe-title">How to Find an Industry Expertise</h2>
          <p className="howwe-subtitle">for IT Professionals.</p>
        </div>

        {/* Feature grid */}
        <div className="howwe-grid">
          {items.map((item) => (
            <div className="howwe-card" key={item.title}>
              <div className="howwe-icon-wrap">
                <img src={item.icon} alt={item.title} className="howwe-icon" />
              </div>
              <h3 className="howwe-card-title">{item.title}</h3>
              <p className="howwe-card-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
