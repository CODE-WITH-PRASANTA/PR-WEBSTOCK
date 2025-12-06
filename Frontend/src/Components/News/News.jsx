import React from "react";
import "./News.css";

const News = () => {
 const items = [
  "TOP-RATED SOFTWARE DEVELOPMENT COMPANY IN BHUBANESWAR",
  "WE HELP STARTUPS GROW WITH MODERN DIGITAL SOLUTIONS",
  "DELIVERING WORLD-CLASS WEBSITES, APPS & CRM SYSTEMS",
  "TRUSTED BY BRANDS FOR QUALITY, RELIABILITY & RESULTS",
  "24/7 CUSTOMER SUPPORT FOR YOUR BUSINESS NEEDS",
  "YOUR SUCCESS IS OUR PRIORITY — ALWAYS",
  "POWERING BUSINESSES WITH TECHNOLOGY & INNOVATION",
  "WE BUILD DIGITAL EXPERIENCES THAT DRIVE REAL GROWTH",
];

  return (
    <div className="news-wrapper">
      <div className="news-marquee">
        {items.map((text, index) => (
          <div key={index} className="news-item">
            {text}
            <span className="news-dot">•</span>
          </div>
        ))}
        {/* Duplicate for seamless infinite loop */}
        {items.map((text, index) => (
          <div key={`dup-${index}`} className="news-item">
            {text}
            <span className="news-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
