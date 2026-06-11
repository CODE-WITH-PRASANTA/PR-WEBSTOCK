import "./DigimarketingProcess.css";
import React, { useEffect, useRef } from "react";
import "./DigimarketingProcess.css";

const steps = [
  {
    title: "Understanding Your Business Needs",
    desc: "We analyze your goals, audience, competitors, and industry trends.",
    icon: "/icons/target.png",
  },
  {
    title: "Customized Strategy Development",
    desc: "We design a ROI-focused digital marketing strategy.",
    icon: "/icons/search.png",
  },
  {
    title: "Website & SEO Optimization",
    desc: "We improve speed, UX, SEO, and conversions.",
    icon: "./assets/chart-bar.png",
  },
  {
    title: "Content & Social Media Marketing",
    desc: "We build trust and engagement through content.",
    icon: "/icons/brand-instagram.svg",
  },
  {
    title: "Data-Driven Refinement",
    desc: "Continuous tracking and optimization for growth.",
    icon: "/icons/database.png",
  },
];

const DigitalProcess = () => {
  const sliderRef = useRef(null);
  const progressRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    sliderRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  const updateProgress = () => {
    const el = sliderRef.current;
    const progress =
      (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    progressRef.current.style.width = `${progress}%`;
  };

  return (
    <section className="process-section">
      <h2 className="process-title">
        Our Top Rated Digital Marketing Process
      </h2>

      <div className="process-container">
        <button className="arrow left" onClick={() => scroll("left")}>
          ‹
        </button>

        <div
          className="process-slider"
          ref={sliderRef}
          onScroll={updateProgress}
        >
          {steps.map((step, index) => (
            <div className="process-card" key={index}>
              <div className="circle-wrapper">
                <div className="process-circle">
                  <img src={step.icon} alt={step.title} />
                </div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>

      {/* Progress line */}
      <div className="progress-bar">
        <span ref={progressRef}></span>
      </div>
    </section>
  );
};

export default DigitalProcess;
