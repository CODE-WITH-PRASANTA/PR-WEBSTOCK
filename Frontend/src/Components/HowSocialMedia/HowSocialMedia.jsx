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
      title: "Boost brand awareness and authority",
      text: "With the right strategy...",
    },
    {
      img: img2,
      title: "Drive targeted website traffic",
      text: "Renowned as top social media marketing experts...",
      highlight: true,
    },
    {
      img: img3,
      title: "Increase customer engagement and loyalty",
      text: "Engaging regularly on social media helps...",
    },
    {
      img: img4,
      title: "Generate high-quality leads and conversions",
      text: "Targeted campaigns convert users...",
    },
    {
      img: img5,
      title: "Gain real-time insights with social analytics",
      text: "Analytics help you understand performance...",
      highlight: true,
    },
    {
      img: img6,
      title: "Deliver seamless 24/7 customer support",
      text: "Social media allows customers to reach anytime...",
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

