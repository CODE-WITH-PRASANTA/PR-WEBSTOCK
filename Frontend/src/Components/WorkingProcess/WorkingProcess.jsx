import React, { useRef, useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GiRoundStar } from "react-icons/gi";
import "./WorkingProcess.css";


const steps = [
  {
    title: "Requirement Understanding",
    text:
      "We start with a simple conversation to understand what you need — your business goals, the purpose of the project, target users, and the features you expect. This helps us see your vision clearly before we begin.",
    number: "01",
  },
  {
    title: "Project Planning & Strategy",
    text:
      "Once we understand your idea, we prepare a clear plan — timeline, modules, technology stack, and estimated milestones. You always know what will happen, when it will happen, and how the project will move forward.",
    number: "02",
  },
  {
    title: "UI/UX & System Architecture",
    text:
      "We create simple, clean UI designs and map the user flow so your customers get an easy and smooth experience. Along with that, we plan the full system architecture to ensure the project remains fast, scalable, and secure.",
    number: "03",
  },
  {
    title: "Development & Integration",
    text:
      "Our development team starts building your website or application module by module. We integrate APIs, set up the database, and write clean, maintainable code. You can see the progress regularly and share feedback anytime.",
    number: "04",
  },
  {
    title: "Testing, Launch & Support",
    text:
      "After development, we thoroughly test everything — functionality, speed, UI, and security. Once everything is perfect, we launch the project and continue to support you with updates, improvements, and maintenance.",
    number: "05",
  },
];



const WorkingProcess = () => {
  const stepsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);

  useEffect(() => {
    function updateDims() {
      if (!stepsRef.current) return;
      const w = stepsRef.current.clientWidth;
      setStepWidth(w);
      // Snap to current active index after resize
      stepsRef.current.scrollTo({
        left: activeIndex * w,
        behavior: "smooth",
      });
    }

    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync index on scroll
  const onScroll = () => {
    if (!stepsRef.current || stepWidth === 0) return;
    const idx = Math.round(stepsRef.current.scrollLeft / stepWidth);
    setActiveIndex(idx);
  };

  const scrollToIndex = (idx) => {
    if (!stepsRef.current) return;
    const clamped = Math.max(0, Math.min(steps.length - 1, idx));
    stepsRef.current.scrollTo({
      left: clamped * stepWidth,
      behavior: "smooth",
    });
    setActiveIndex(clamped);
  };

  const prev = () => scrollToIndex(activeIndex - 1);
  const next = () => scrollToIndex(activeIndex + 1);

  // keyboard support for pill icons (left/right arrow keys)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, stepWidth]);

  return (
    <section className="wp-section">
      <div className="wp-container">
        <div className="wp-badge">
          <GiRoundStar className="wp-badge-star" />
          <span>WORKING PROCESS</span>
          <GiRoundStar className="wp-badge-star" />
        </div>

       <header className="wp-header">
          <h1 className="wp-title-line1">PR WEBSTOCK Working Process</h1>
          <h2 className="wp-title-line2">How We Turn Ideas Into Successful Digital Solutions</h2>
        </header>


        <div className="wp-timeline-wrap">
          <div className="wp-connector" />

          {/* STEPS SCROLLER */}
          <div
            className="wp-steps"
            ref={stepsRef}
            onScroll={onScroll}
            role="list"
            aria-label="Working process steps"
          >
            {steps.map((s, idx) => (
              <div
                className={`wp-step ${idx === activeIndex ? "active" : ""}`}
                key={s.number}
                role="listitem"
              >
                <div className="wp-step-circle">
                  <div className="wp-step-label">Step</div>
                  <div className="wp-step-number">{s.number}</div>
                </div>

                <h3 className="wp-step-title">{s.title}</h3>
                <p className="wp-step-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA PILL — left/right icons are interactive (prev/next) */}
        <div className="wp-cta">
          {/* NOTE: changed to div so inner icons can be interactive elements (no nested buttons) */}
          <div className="wp-cta-pill" role="group" aria-label="Working process controls">
            <button
              type="button"
              className="wp-cta-icon-btn wp-cta-icon-left"
              onClick={prev}
              aria-label="Previous step"
              disabled={activeIndex <= 0}
            >
              <FiArrowLeft className="wp-cta-icon" />
            </button>

            <span className="wp-cta-text" aria-hidden="true">
              Overcome the IT Challenges
            </span>

            <button
              type="button"
              className="wp-cta-icon-btn wp-cta-icon-right"
              onClick={next}
              aria-label="Next step"
              disabled={activeIndex >= steps.length - 1}
            >
              <FiArrowRight className="wp-cta-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
