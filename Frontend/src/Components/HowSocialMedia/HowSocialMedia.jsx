import React, { useState, useEffect } from "react";
import "./HowSocialMedia.css";

import img1 from "../../assets/10.webp";
import img2 from "../../assets/11.webp";
import img3 from "../../assets/12n.webp";
import img4 from "../../assets/13.webp";
import img5 from "../../assets/14.webp";
import img6 from "../../assets/15.webp";

export default function HowSocialMedia() {
 const sections = [
  {
    img: img1,
    title: "Boost Brand Awareness",
    text: "PR WEBSTOCK helps businesses in Bhubaneswar build a strong social media presence that increases visibility, credibility, and brand recognition.",
  },
  {
    img: img2,
    title: "Drive Website Traffic",
    text: "Our social media marketing strategies attract the right audience and drive quality traffic to your website for better business growth.",
    highlight: true,
  },
  {
    img: img3,
    title: "Increase Customer Engagement",
    text: "We create engaging content that encourages audience interaction, strengthens relationships, and builds long-term customer loyalty.",
  },
  {
    img: img4,
    title: "Generate Quality Leads",
    text: "Targeted campaigns help businesses reach potential customers, generate qualified leads, and improve conversion opportunities.",
  },
  {
    img: img5,
    title: "Track Performance & Insights",
    text: "Our data-driven approach helps monitor campaign performance and optimize strategies for maximum return on investment.",
    highlight: true,
  },
  {
    img: img6,
    title: "Build Strong Customer Support",
    text: "Social media allows businesses to respond quickly, improve customer satisfaction, and maintain better communication with their audience.",
    highlight: true,
  },
];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider-container">

      {/* LEFT IMAGE SLIDER */}
      <div className="slider-img-wrapper">
        <div className="slider-image-box fade-animation">
          <img src={sections[activeIndex].img} alt="slider-img" />
          <span className="pink-bar"></span>
        </div>
      </div>

      {/* RIGHT TEXT CONTENT */}
      <div className="slider-content">
        {sections.map((sec, index) => (
          <div
            key={index}
            className={`slider-text-block ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <h2 className={sec.highlight ? "highlight-title" : ""}>
              {sec.title}
            </h2>

            {index === activeIndex && <p className="active-text">{sec.text}</p>}

            {/* Divider Line */}
            <div className="divider"></div>
          </div>
        ))}
      </div>

    </section>
  );
}

