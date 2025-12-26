import React from "react";
import "./IndustryHowWeDo.css";

import icon1 from "../../assets/about-feature-card-icon1.webp";
import icon2 from "../../assets/about-feature-card-icon2.webp";
import icon3 from "../../assets/about-feature-card-icon3.webp";
import icon4 from "../../assets/about-feature-card-icon4.webp";

const items = [
  {
    icon: icon1,
    title: "Expertise & Innovation",
    text: "PR Webstock stands apart by combining deep industry expertise with continuous innovation. While others deliver basic solutions, we engineer scalable, future-ready software that adapts to your business growth."
  },
  {
    icon: icon2,
    title: "Transparent & Reliable Process",
    text: "Most agencies keep clients in the dark — but PR Webstock follows a clear, transparent workflow with real-time updates, structured communication, and milestone-based delivery you can trust."
  },
  {
    icon: icon3,
    title: "Client-First Development Approach",
    text: "Unlike companies that force pre-built templates, PR Webstock builds solutions tailored to your unique vision. We listen, understand, and collaborate to deliver software that elevates your brand and business goals."
  },
  {
    icon: icon4,
    title: "Cost-Effective, High-Value Solutions",
    text: "Others may offer low cost but compromise on quality. PR Webstock provides affordable development without sacrificing performance, security, or user experience — ensuring maximum value for every investment."
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

         <h2 className="howwe-title">How PR Webstock Delivers Better Results Than Others !</h2>
        <p className="howwe-subtitle">A client-focused, transparent, and innovation-driven IT process.</p>

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
