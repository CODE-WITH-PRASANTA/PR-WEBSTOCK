import React from "react";
import "./IndustryService.css";

// import your exact icons here
import iconTechnical from "../../assets/Technical.webp";
import iconHelpdesk from "../../assets/help-desk.webp";
import iconManaged from "../../assets/IT-services.webp";
import iconConsulting from "../../assets/IT-consulting.webp";
import iconNetwork from "../../assets/Support.webp";

const features = [
  {
    icon: iconTechnical,
    title: "Technical Implementation",
    text: "Seamless integration of cutting-edge solutions. Our technical implementation ensures robust systems, and optimal performance in every detail."
  },
  {
    icon: iconHelpdesk,
    title: "IT Helpdesk Support",
    text: "Responsive IT helpdesk support ensuring seamless operations, resolving issues promptly, and maximizing user productivity with expertise."
  },
  {
    icon: iconManaged,
    title: "Managed IT Services",
    text: "Efficient, proactive, and secure IT solutions tailored to optimize your business operations with our managed IT services."
  },
  {
    icon: iconConsulting,
    title: "IT Consulting",
    text: "Strategic IT Consulting tailored solutions to optimize performance, enhance security, and drive innovation for business success."
  },
  {
    icon: iconNetwork,
    title: "Network Support",
    text: "Reliable network support ensuring seamless connectivity and optimizing performance for uninterrupted business operations."
  }
];

export default function ServiceFeatures() {
  return (
    <section className="sf-section">
      <div className="sf-container">
        {/* LEFT SIDE */}
        <div className="sf-left">
          <div className="sf-badge">
            <span className="sf-badge-dot" />
            <span className="sf-badge-text">Service Features</span>
            <span className="sf-badge-dot" />
          </div>

          <h2 className="sf-title">
            Edge tools Drive That
            <br />
            <span className="sf-title-light">performance.</span>
          </h2>

          <p className="sf-description">
            Feel free adapt this based on the specific managed services, features, and
            unique selling points your IT service company provides.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="sf-right">
          {features.map((item) => (
            <div className="sf-item" key={item.title}>
              <div className="sf-icon-wrap">
                <img src={item.icon} alt={item.title} className="sf-icon" />
              </div>
              <div className="sf-item-text">
                <h3 className="sf-item-title">{item.title}</h3>
                <p className="sf-item-desc">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
