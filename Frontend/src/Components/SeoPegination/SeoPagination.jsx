
import React, { useState, useEffect } from "react";
import "./SeoPagination.css";
import {
  FaCogs,
  FaMobileAlt,
  FaRocket,
  FaSearch,
  FaPenFancy,
  FaKey,
  FaLink,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "SEO Audit",
    desc: "Identify growth opportunities.",
  },
  {
    icon: <FaKey />,
    title: "Keyword Research",
    desc: "Target valuable keywords.",
  },
  {
    icon: <FaPenFancy />,
    title: "Content Optimization",
    desc: "Improve content visibility.",
  },
  {
    icon: <FaLink />,
    title: "Link Building",
    desc: "Build website authority.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile SEO",
    desc: "Optimize mobile experience.",
  },
  {
    icon: <FaRocket />,
    title: "Page Speed",
    desc: "Improve website performance.",
  },
  {
    icon: <FaCogs />,
    title: "Technical SEO",
    desc: "Enhance indexing and crawling.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics",
    desc: "Track traffic growth.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Performance Review",
    desc: "Measure SEO success.",
  },
];

const SeoPagination = () => {
  const [active, setActive] = useState(0);

  /* Auto Play Every 2 Seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="seo-pagination">
      {/* Heading */}
      <div className="process-heading">
        <h2>
          PR WEBSTOCK SEO Process in Bhubaneswar, Odisha
        </h2>

        <p className="process-description">
          PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve search
          rankings, increase organic traffic, and generate quality leads
          through proven SEO strategies tailored for long-term growth.
        </p>

        <span className="heading-line"></span>
      </div>

      {/* Slider */}
      <div className="slider-container">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${active * 320}px)`,
            transition: "transform 0.8s ease",
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`process-step ${
                active === index ? "active" : ""
              }`}
            >
              <div className="process-circle">
                {step.icon}
              </div>

              <h4>{step.title}</h4>

              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="dot-pagination">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`dot ${
              active === index ? "active" : ""
            }`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default SeoPagination;

