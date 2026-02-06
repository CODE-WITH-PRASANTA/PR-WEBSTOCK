import React from "react";
import "./DigitalMarketingBreadcrumb.css";
import bannerVideo from "../../assets/h0XYOFQ4RE0G.mp4";

const DigitalMarketingHero = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Digital Marketing" }
  ];

  return (
    <section className="hero-section">
      {/* Background Video */}
      <video
        className="hero-video"
        src={bannerVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <nav className="breadcrumb-container" aria-label="breadcrumb">
          <ul className="breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="breadcrumb-item">
                {item.link ? (
                  <a href={item.link}>{item.label}</a>
                ) : (
                  <span className="active">{item.label}</span>
                )}
                {index !== breadcrumbItems.length - 1 && (
                  <span className="separator">›</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <h1>Digital Marketing Company in Bangalore</h1>
        <p>
          More Leads, More Sales, More Growth – Scale Your Business with Us
        </p>

        <button className="cta-btn">Talk to Our Experts ↗</button>
      </div>
    </section>
  );
};

export default DigitalMarketingHero;
