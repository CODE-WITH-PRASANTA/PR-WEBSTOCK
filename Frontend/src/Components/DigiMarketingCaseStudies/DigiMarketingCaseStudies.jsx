import React from "react";
import "./DigiMarketingCaseStudies.css";

import case1 from "../../assets/case1.webp";
import case2 from "../../assets/case2.webp";
import case3 from "../../assets/case3.webp";

const caseStudies = [
  {
    title:
      "Enhancing Online Visibility and Lead Generation for Hair and Skin Clinic: An SEO Case Study",
    image: case1,
  },
  {
    title:
      "Boosting traffic with our SEO solutions: Achieving top SERP rankings",
    image: case2,
  },
  {
    title: "A Google Ads Campaign for Online Fragrance Store",
    image: case3,
  },
];

const CaseStudies = () => {
  return (
    <section className="case-section">
      {/* Header */}
      <div className="case-header">
        <span className="case-tag">Our Case Studies</span>
        <h2>Recent Case Studies</h2>

        <div className="case-desc">
          <span className="case-line"></span>
          <p>
            See how companies used smart online strategies to get more
            customers, boost sales, and grow their business.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="case-grid">
        {caseStudies.map((item, index) => (
          <div className="case-card" key={index}>
            <img src={item.image} alt={item.title} />

            <div className="case-content">
              <h3>{item.title}</h3>
              <hr />
              <a href="#" className="read-more">
                Read More <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
