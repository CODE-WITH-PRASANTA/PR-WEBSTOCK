import React from "react";
import "./News.css";

const News = () => {
  const items = [
    "WELCOME TO INNOVATETECH SOLUTIONS",
    "WE THRIVE ON CREATIVITY",
    "YOUR SATISFACTION IS OUR PRIORITY",
  ];

  return (
    <div className="news-wrapper">
      <div className="news-marquee">
        {items.map((text, index) => (
          <div key={index} className="news-item">
            {text}
            <span className="dot">•</span>
          </div>
        ))}
        {/* Duplicate for seamless infinite loop */}
        {items.map((text, index) => (
          <div key={`dup-${index}`} className="news-item">
            {text}
            <span className="dot">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
