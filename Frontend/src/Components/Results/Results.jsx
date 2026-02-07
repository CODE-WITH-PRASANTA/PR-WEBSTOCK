import React from "react";
import "./Result.css";

import icon1 from "../../assets/16.webp";
import icon2 from "../../assets/17.webp";
import icon3 from "../../assets/18.webp";
import icon4 from "../../assets/19.webp";
import icon5 from "../../assets/20.webp";

const Result = () => {
  const results = [
    {
      icon: icon1,
      title: "Stronger customer loyalty",
      desc: "Our content writers create meaningful content, helping your brand connect deeply and build loyal customer relationships over time."
    },
    {
      icon: icon2,
      title: "High engagement rates",
      desc: "We drive high engagement through likes, shares, comments, and direct interactions that keep your audience connected to your brand."
    },
    {
      icon: icon3,
      title: "More leads & conversions",
      desc: "With strategic content and smart ad placements, we help turn followers into leads and leads into paying customers."
    },
    {
      icon: icon4,
      title: "Increased brand visibility & followers",
      desc: "Your brand gets noticed by the right audience through consistent, engaging content and targeted strategies — leading to steady follower growth."
    },
    {
      icon: icon5,
      title: "Measurable ROI and transparent reporting",
      desc: "With full tracking and reporting, you get clear insights into campaign performance with complete transparency."
    }
  ];

  return (
    <section className="results-wrapper">
      <h2 className="results-title">Results you can expect</h2>

      <div className="results-grid">
        {results.map((item, index) => (
          <div className="results-card" key={index}>
            <img src={item.icon} alt={item.title} className="results-icon" />

            <h3 className="results-card-title">{item.title}</h3>
            <p className="results-card-desc">{item.desc}</p>

            {index !== results.length - 1 && (
              <div className="vertical-divider"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Result;
