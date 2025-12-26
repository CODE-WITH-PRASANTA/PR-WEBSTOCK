import React, { useEffect, useState } from "react";
import "./IndustryProcessSteps.css";

const steps = [
  {
    step: "01",
    title: "Client Requirement Consultation",
    text: "PR Webstock begins every digital marketing project with a deep discussion to understand your business goals, target audience, budget, and current online presence. This helps us create a strategy tailored to your brand."
  },
  {
    step: "02",
    title: "Strategy & Funnel Planning",
    text: "Our team develops a complete marketing roadmap — including audience segmentation, buyer journey mapping, ad funnel creation, and KPI planning to ensure every step is measurable and impactful."
  },
  {
    step: "03",
    title: "Market & Competitor Research",
    text: "We perform detailed research on industry trends, competitors, and customer behavior to identify opportunities. PR Webstock uses real data to plan campaigns that outperform your competition."
  },
  {
    step: "04",
    title: "Creative & Ad Campaign Setup",
    text: "Our experts design high-converting creatives, captions, landing pages, and ad copies. We then launch targeted Social Media Ads & Google Ads campaigns for maximum visibility and conversions."
  },
  {
    step: "05",
    title: "Monitoring & Performance Optimization",
    text: "PR Webstock continuously tracks ad performance, adjusts targeting, optimizes budgets, improves CTR, and scales winning ads to achieve the best ROI for your business."
  }
];

export default function ProcessSteps() {
  const getVisibleCount = () => (window.innerWidth <= 768 ? 1 : 4);

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [startIndex, setStartIndex] = useState(0);

  // Update visible count on window resize
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slider every 4s
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

  // Visible steps logic (dynamic count)
  const visibleSteps = Array.from({ length: visibleCount }, (_, i) => {
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
        <h2 className="process-title">Our Digital Marketing Process</h2>
        <p className="process-subtitle">How PR Webstock Drives Business Growth!</p>

        {/* Timeline */}
        <div className="process-timeline">
          <div className="process-line" />

          {/* Restart animation on slide */}
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
