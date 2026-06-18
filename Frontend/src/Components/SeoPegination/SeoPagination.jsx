import React from "react";
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
];

const SeoPagination = () => {
  return (
    <section className="seo-pagination">
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

      <div className="process-grid">
        {steps.map((step, index) => (
          <div className="seo-pagination" key={index}>
            <div className="process-circle">
              {step.icon}
            </div>

            <h4>{step.title}</h4>

            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeoPagination;