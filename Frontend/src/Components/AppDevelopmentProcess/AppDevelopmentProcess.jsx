import React, { useState } from "react";
import "./AppDevelopmentProcess.css";

/** CHANGE THIS TO 2, 3, 4, ETC */
const STEPS_PER_PAGE = 3;

const steps = [
  {
    id: 1,
    title: "Project Discussion",
    text: "After signing up, we will connect with you to finalize your thoughts before diving into the first phase of development.",
    icon: "discussion",
  },
  {
    id: 2,
    title: "Wireframing & Designing",
    text: "We'll give you screen designs of your app, helping you visualize and understand it better.",
    icon: "wireframe",
  },
  {
    id: 3,
    title: "Development Stage",
    text: "During the development stage, our skilled developers bring your idea to life, turning it into a tangible reality.",
    icon: "dev",
  },
  {
    id: 4,
    title: "Testing & Quality Assurance",
    text: "Our advanced testing technology ensures thorough quality checks, eliminating errors before launch.",
    icon: "qa",
  },
  {
    id: 5,
    title: "Service and Support",
    text: "We work closely with our clients to offer support and maintenance services for their apps even after launch.",
    icon: "support",
  },
];

const ProcessTimelinePaginated = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(steps.length / STEPS_PER_PAGE);
  const startIndex = (page - 1) * STEPS_PER_PAGE;
  const visibleSteps = steps.slice(startIndex, startIndex + STEPS_PER_PAGE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <section className="ptp-section">
      <h2 className="ptp-title">
        Mobile app development process: A clear path to success
      </h2>

      <p className="ptp-subtitle">
        At Webomindapps, we follow a well-defined and structured approach to mobile app
        development. Our streamlined process ensures transparency, efficiency, and superior
        outcomes for our clients. From ideation to deployment, we guide you through every step,
        delivering exceptional mobile app solutions that meet your business objectives.
      </p>

      {/* TIMELINE ROW (CURRENT PAGE) */}
      <div className="ptp-row">
        {visibleSteps.map((step) => (
          <div className="ptp-item" key={step.id}>
            <div className="ptp-node">
              <div className="ptp-circle">{renderIcon(step.icon)}</div>
            </div>
            <h3 className="ptp-item-title">{step.title}</h3>
            <p className="ptp-item-text">{step.text}</p>
          </div>
        ))}
      </div>

      {/* DOT PAGINATION */}
      <div className="ptp-dots">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const p = idx + 1;
          return (
            <button
              key={p}
              className={`ptp-dot ${p === page ? "active" : ""}`}
              onClick={() => goToPage(p)}
              aria-label={`Go to step page ${p}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProcessTimelinePaginated;

/* ---------- ICONS ---------- */

function renderIcon(type) {
  switch (type) {
    case "discussion":
      return (
        <svg viewBox="0 0 64 64">
          <rect
            x="16"
            y="18"
            width="32"
            height="22"
            rx="2"
            ry="2"
            fill="none"
            strokeWidth="2.2"
          />
          <circle cx="24" cy="34" r="3" strokeWidth="2.2" fill="none" />
          <path d="M22 26h12M22 30h8" strokeWidth="2.2" fill="none" />
          <path d="M20 42c0-4 3-7 8-7" strokeWidth="2.2" fill="none" />
        </svg>
      );
    case "wireframe":
      return (
        <svg viewBox="0 0 64 64">
          <rect
            x="14"
            y="16"
            width="36"
            height="24"
            rx="2"
            ry="2"
            fill="none"
            strokeWidth="2.2"
          />
          <rect
            x="18"
            y="20"
            width="20"
            height="16"
            rx="1"
            ry="1"
            fill="none"
            strokeWidth="2.2"
          />
          <path d="M18 20l20 16M38 20L18 36" strokeWidth="2.2" fill="none" />
        </svg>
      );
    case "dev":
      return (
        <svg viewBox="0 0 64 64">
          <rect
            x="16"
            y="18"
            width="32"
            height="22"
            rx="2"
            ry="2"
            fill="none"
            strokeWidth="2.2"
          />
          <circle cx="32" cy="30" r="7" fill="none" strokeWidth="2.2" />
          <path d="M32 24v3l2 2" strokeWidth="2.2" fill="none" />
        </svg>
      );
    case "qa":
      return (
        <svg viewBox="0 0 64 64">
          <rect
            x="18"
            y="14"
            width="20"
            height="30"
            rx="3"
            ry="3"
            fill="none"
            strokeWidth="2.2"
          />
          <circle cx="28" cy="34" r="7" fill="none" strokeWidth="2.2" />
          <line x1="33" y1="39" x2="38" y2="44" strokeWidth="2.2" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="28" r="10" fill="none" strokeWidth="2.2" />
          <path d="M32 22v4l3 3" strokeWidth="2.2" fill="none" />
          <path
            d="M18 40c2 3 7 6 14 6s12-3 14-6"
            strokeWidth="2.2"
            fill="none"
          />
        </svg>
      );
    default:
      return null;
  }
}
