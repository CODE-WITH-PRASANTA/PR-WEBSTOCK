import React, { useRef, useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GiRoundStar } from "react-icons/gi";
import "./WorkingProcess.css";

const steps = [
  {
    title: "Client Consultation",
    text:
      "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci.",
    number: "01",
  },
  {
    title: "Strategy Development",
    text:
      "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci.",
    number: "02",
  },
  {
    title: "Market Research",
    text:
      "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci.",
    number: "03",
  },
  {
    title: "Campaign Planning",
    text:
      "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci.",
    number: "04",
  },
  {
    title: "Optimize & Launch",
    text:
      "Sed accumsan sem cursus luctus porta. amem Phasellu du enim, efficitur quis velit ac, fringilla posuere leo fusci.",
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
          <h1 className="wp-title-line1">Bringing the best IT</h1>
          <h2 className="wp-title-line2">Vendors To You.</h2>
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
