import React, { useState, useEffect } from "react";
import "./Growyourbrand.css";

import auditIcon from "../../assets/10.webp";
import competitorIcon from "../../assets/11.webp";
import platformIcon from "../../assets/12n.webp";
import calendarIcon from "../../assets/13.webp";
import campaignIcon from "../../assets/14.webp";
import optimizeIcon from "../../assets/15.webp";

const steps = [
  {
    img: auditIcon,
    title: "Social Media Audit & Goal Setting",
    desc: "We analyze your current social media presence and define clear business goals.",
  },
  {
    img: competitorIcon,
    title: "Audience & Competitor Research",
    desc: "Understanding your audience and competitors helps create stronger campaigns.",
  },
  {
    img: platformIcon,
    title: "Strategy Development",
    desc: "We choose the right platforms and build a custom marketing roadmap.",
  },
  {
    img: calendarIcon,
    title: "Content Planning",
    desc: "Creative content calendars ensure consistent engagement and brand visibility.",
  },
  {
    img: campaignIcon,
    title: "Campaign Execution",
    desc: "Our team launches and manages campaigns while monitoring performance.",
  },
  {
    img: optimizeIcon,
    title: "Optimization & Reporting",
    desc: "Regular reporting and optimization help maximize results and ROI.",
  },
];

const Growyourbrand = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grow-pagination">
      <div className="process-heading">
        <h2>
          How We Strategically
          <br />
          Grow Your Brand On Social Media
        </h2>
      </div>

      <div className="carousel-wrapper">
        <div
          className="process-row"
          style={{
            transform: `translateX(calc(50% - ${
              active * 340 + 170
            }px))`,
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
                <img src={step.img} alt={step.title} />
              </div>

              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dot-pagination">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`dot ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Growyourbrand;