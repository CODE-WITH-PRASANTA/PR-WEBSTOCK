import React from "react";
import "./Industries.css";

const Industries = () => {
  const industries = [
    {
      title1: "Social media",
      title2: "Marketing for real estate",
      desc: "We craft industry-specific social media campaigns for real estate businesses that highlight property listings, virtual tours, and location-based targeting to attract serious buyers."
    },
    {
      title1: "SMM for",
      title2: "Ecommerce",
      desc: "Our SMM for e-commerce strategies include product-focused content, retargeting ads, and shoppable posts, driving more traffic and conversions through Instagram and Facebook."
    },
    {
      title1: "Social media",
      title2: "Agency for healthcare",
      desc: "As a leading social media agency for healthcare, we build campaigns that educate, inform, and engage patients while highlighting your services, experts, and credibility."
    },

    // SECOND ROW
    {
      title1: "Social media marketing",
      title2: "for small businesses",
      desc: "We help small businesses grow online with custom content and budget-friendly, industry-specific social media campaigns tailored to local audiences and niche markets."
    },
    {
      title1: "Social media",
      title2: "Marketing for education",
      desc: "We develop campaigns for educational institutions that highlight achievements, upcoming admissions, and faculty expertise, positioning your brand as a top learning destination."
    },
    {
      title1: "Social media",
      title2: "Marketing for restaurants",
      desc: "Our social campaigns for restaurants boost visibility with high-quality food imagery, Reels, local ads, and influencer shoutouts to increase customer visits and orders."
    }
  ];

  return (
    <section className="industry-wrapper">
      <h2 className="industry-main-title">
        Social media marketing success for all business industries
      </h2>

      <div className="industry-grid">
        {industries.map((item, index) => (
          <div className="industry-box" key={index}>
            <h3 className="industry-title">
              {item.title1} <br />
              <span>{item.title2}</span>
            </h3>

            <p className="industry-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Industries;
