import React from "react";
import "./SeoDigitalproducts.css";

import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";
import img3 from "../../assets/img3.svg";
import img4 from "../../assets/img4.svg";
import img5 from "../../assets/img5.svg";
import img6 from "../../assets/img6.svg";
import img7 from "../../assets/img7.svg";
import img8 from "../../assets/img8.svg";
import img9 from "../../assets/img9.svg";

const SeoDigitalproducts = () => {
  const cards = [
    {
      title: "Keyword Optimization",
      icon: img1,
      hoverColor: "#ef2f2f",
      points: [
        "Research high-intent keywords.",
        "Optimize pages and content.",
        "Increase organic traffic.",
      ],
    },
    {
      title: "Product Descriptions",
      icon: img2,
      hoverColor: "#003d4f",
      points: [
        "Create engaging product content.",
        "Highlight key benefits.",
        "Improve conversions.",
      ],
    },
    {
      title: "Technical SEO",
      icon: img3,
      hoverColor: "#f64a68",
      points: [
        "Improve website speed.",
        "Enhance security and performance.",
        "Boost user experience.",
      ],
    },
    {
      title: "Social Proof",
      icon: img4,
      hoverColor: "#1f3e7b",
      points: [
        "Show customer reviews.",
        "Build trust and credibility.",
        "Increase purchase confidence.",
      ],
    },
    {
      title: "Video Marketing",
      icon: img5,
      hoverColor: "#1a7d55",
      points: [
        "Showcase product features.",
        "Increase user engagement.",
        "Support sales growth.",
      ],
    },
    {
      title: "Enhanced Visibility",
      icon: img6,
      hoverColor: "#6836b3",
      points: [
        "Improve search rankings.",
        "Increase online exposure.",
        "Reach potential customers.",
      ],
    },
    {
      title: "Conversion Funnel",
      icon: img7,
      hoverColor: "#f47d35",
      points: [
        "Attract targeted visitors.",
        "Improve user journeys.",
        "Increase conversions.",
      ],
    },
    {
      title: "Trust & Authority",
      icon: img8,
      hoverColor: "#a030b5",
      points: [
        "Build brand credibility.",
        "Strengthen online authority.",
        "Gain customer trust.",
      ],
    },
    {
      title: "Competitive Advantage",
      icon: img9,
      hoverColor: "#2893bd",
      points: [
        "Outperform competitors.",
        "Capture more opportunities.",
        "Grow your online presence.",
      ],
    },
  ];

  return (
    <section className="feature-cards-section">
      <div className="heading">
        <h1>
          SEO Strategies for Digital Product Growth by PR WEBSTOCK
        </h1>

        <p>
          PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve search
          rankings, increase organic traffic, and grow digital product sales.
          Our SEO experts in Bhubaneswar create strategies that improve
          visibility, attract customers, and support long-term business growth.
        </p>
      </div>

      <div className="feature-cards-grid">
        {cards.map((card, i) => (
          <div
            className="feature-card"
            key={i}
            style={{ "--hover-color": card.hoverColor }}
          >
            <div className="feature-card-header">
              <h3>{card.title}</h3>

              <img
                src={card.icon}
                alt={`${card.title} - PR WEBSTOCK SEO Services`}
              />
            </div>

            <ul>
              {card.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <div className="color-box"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeoDigitalproducts;