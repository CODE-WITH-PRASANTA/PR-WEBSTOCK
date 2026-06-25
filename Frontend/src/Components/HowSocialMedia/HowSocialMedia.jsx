import React, { useState, useEffect } from "react";
import "./HowSocialMedia.css";

import img1 from "../../assets/sm1.jpeg";
import img2 from "../../assets/sm2.jpeg";
import img3 from "../../assets/sm1.jpeg";
import img4 from "../../assets/sm2.jpeg"
import img5 from "../../assets/sm1.jpeg";
import img6 from "../../assets/sm2.jpeg";

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
    },
    {
      img: img6,
      title: "Build Strong Customer Support",
      text: "Social media allows businesses to respond quickly, improve customer satisfaction, and maintain better communication with their audience.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <section className="social-media-section">

      <div className="social-heading">
        <span className="social-tag">
          PR WEBSTOCK SOCIAL MEDIA MARKETING
        </span>

        <h1 className="social-title">
          Grow Your Business Through
          <span> Powerful Social Media Marketing</span>
        </h1>

        <p className="social-subtitle">
          PR WEBSTOCK helps businesses increase brand awareness,
          attract quality leads, improve customer engagement, and
          achieve measurable growth through strategic social media
          marketing campaigns.
        </p>
      </div>

      <div className="slider-container">

        {/* LEFT IMAGE */}
        <div className="slider-img-wrapper">
          <div className="slider-image-box fade-animation">
            <img
              src={sections[activeIndex].img}
              alt={sections[activeIndex].title}
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="slider-content">
          {sections.map((sec, index) => (
            <div
              key={index}
              className={`slider-text-block ${
                index === activeIndex ? "active" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <h2>{sec.title}</h2>

              <div
                className={`slider-description ${
                  index === activeIndex ? "show" : ""
                }`}
              >
                <p>{sec.text}</p>
              </div>

              <div className="divider"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}