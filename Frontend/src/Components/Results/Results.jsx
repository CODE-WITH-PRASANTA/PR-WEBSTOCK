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
    title: "Stronger Customer Relationships",
    desc: "PR WEBSTOCK helps businesses in Bhubaneswar build trust and long-term customer relationships through engaging social media content and consistent brand communication."
  },
  {
    icon: icon2,
    title: "Higher Audience Engagement",
    desc: "Our social media marketing strategies increase likes, shares, comments, and interactions, helping your business connect with the right audience."
  },
  {
    icon: icon3,
    title: "More Leads & Business Growth",
    desc: "Through targeted campaigns and strategic content, we help generate quality leads, increase inquiries, and improve conversion opportunities."
  },
  {
    icon: icon4,
    title: "Improved Brand Visibility",
    desc: "We help businesses strengthen their online presence, reach more potential customers, and grow their brand across major social media platforms."
  },
  {
    icon: icon5,
    title: "Transparent Reporting & ROI",
    desc: "Track campaign performance with detailed reporting, actionable insights, and measurable results that support your business objectives."
  }
];
  return (
    <section className="results-wrapper">
      <h2 className="results-title"> Social Media Marketing Results For Businesses In Bhubaneswar</h2>

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
