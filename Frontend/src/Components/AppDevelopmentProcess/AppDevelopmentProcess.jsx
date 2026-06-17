import React, { useState } from "react";
import "./AppDevelopmentProcess.css";

/** CHANGE THIS TO 2, 3, 4, ETC */
const STEPS_PER_PAGE = 3;

const steps = [
  {
    id: 1,
    title: "Project Discussion",
    text: "At PR WEBSTOCK, Bhubaneswar, Odisha, we start every mobile app project with a detailed consultation to understand your business goals, target audience, and project requirements.",
    icon: "discussion",
  },
  {
    id: 2,
    title: "Wireframing & Designing",
    text: "Our design team creates intuitive wireframes and engaging UI/UX designs that help clients visualize their applications before development begins.",
    icon: "wireframe",
  },
  {
    id: 3,
    title: "Development Stage",
    text: "PR WEBSTOCK develops secure, scalable, and high-performance Android, iOS, and cross-platform mobile applications using modern technologies and industry best practices.",
    icon: "dev",
  },
  {
    id: 4,
    title: "Testing & Quality Assurance",
    text: "Our quality assurance specialists conduct comprehensive testing to ensure every mobile application delivers excellent performance, security, and reliability.",
    icon: "qa",
  },
  {
    id: 5,
    title: "Service and Support",
    text: "Based in Bhubaneswar, Odisha, PR WEBSTOCK provides ongoing maintenance, updates, and technical support to keep your mobile application running smoothly after launch.",
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
           Mobile App Development Process at PR WEBSTOCK, Bhubaneswar, Odisha
      </h2>


      <p className="ptp-subtitle">
        PR WEBSTOCK follows a streamlined mobile app development process to deliver 
        high-quality Android, iOS, and cross-platform applications. Based in Bhubaneswar, Odisha, our team focuses on innovation, transparency, and performance,
         helping businesses transform ideas into successful mobile solutions with reliable development and ongoing support.
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
