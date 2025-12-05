import React, { useEffect, useState } from "react";
import "./IndustryProcessSteps.css";

const steps = [
  {
    step: "01",
    title: "Client Consultation",
    text: "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci."
  },
  {
    step: "02",
    title: "Strategy Development",
    text: "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci."
  },
  {
    step: "03",
    title: "Market Research",
    text: "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci."
  },
  {
    step: "04",
    title: "Campaign Planning",
    text: "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci."
  },
  {
    step: "05",
    title: "Performance Review",
    text: "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci."
  }
];

const VISIBLE_COUNT = 4;

export default function ProcessSteps() {
  const [startIndex, setStartIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // 4 visible steps with wrap-around
  const visibleSteps = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    const index = (startIndex + i) % steps.length;
    return steps[index];
  });

  return (
    <section className="process-section">
      <div className="process-inner">
        {/* Badge */}
        <div className="process-badge">
          <span className="badge-dot" />
          <span className="badge-text">Working Process</span>
          <span className="badge-dot" />
        </div>

        {/* Heading */}
        <h2 className="process-title">Bringing the best IT</h2>
        <p className="process-subtitle">Vendors To You.</p>

        {/* Timeline */}
        <div className="process-timeline">
          <div className="process-line" />

          {/* key={startIndex} → restart stagger animation on each change */}
          <div className="process-timeline-inner" key={startIndex}>
            {visibleSteps.map((item) => (
              <div className="process-step step-horizontal-animated" key={item.step}>
                <div className="step-line" />
                <div className="step-circle">
                  <span className="step-label">Step</span>
                  <span className="step-number">{item.step}</span>
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="process-controls">
          <button type="button" className="control-btn" onClick={handlePrev}>
            ←
          </button>

          <div className="control-center-text">Overcome the IT Challenges</div>

          <button type="button" className="control-btn" onClick={handleNext}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
