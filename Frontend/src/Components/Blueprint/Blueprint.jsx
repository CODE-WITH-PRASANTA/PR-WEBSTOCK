import React, { useState } from "react";
import "./Blueprint.css";

const cardsData = [
  {
    title: "Understanding Your Vision",
    lead:
      "PR WEBSTOCK begins every project by deeply understanding your business goals, brand identity, and expectations so we can deliver the perfect solution.",
    items: [
      "Clear project requirement discussion",
      "Understanding your brand identity",
      "Setting goals & expectations"
    ],
    icon: "vision"
  },
  {
    title: "Budget Finalization & Legal Agreement",
    lead:
      "Our legal & management team prepares a transparent agreement and finalizes budget, timeline, and project scope with absolute clarity.",
    items: [
      "Final budget approval",
      "Legal documentation",
      "Timeline & project scope confirmation"
    ],
    icon: "contract"
  },
  {
    title: "Collaborative Planning",
    lead:
      "Our team collaborates to create a smooth project roadmap, ensuring efficient workflow and perfect task distribution.",
    items: [
      "Strategic planning",
      "Task & resource allocation",
      "Full project roadmap creation"
    ],
    icon: "collab"
  },
  {
    title: "Customized UI/UX & Brand-Oriented Design",
    lead:
      "We design a clean, modern, brand-oriented UI/UX tailored exactly for your business and customer experience.",
    items: [
      "Custom UI/UX design",
      "Brand theme & color integration",
      "High-converting layout"
    ],
    icon: "design"
  },
  {
    title: "Backend Development & API Integration",
    lead:
      "We build a robust backend, connect databases, and integrate required APIs to bring the full functionality to life.",
    items: [
      "Fast & secure backend",
      "Database architecture",
      "API development & integration"
    ],
    icon: "backend"
  },
  {
    title: "Admin Panel & Project Control",
    lead:
      "We build a powerful admin dashboard that gives you full control of users, content, data, bookings, and more.",
    items: [
      "Secure admin account",
      "Project-wide control system",
      "Real-time data management"
    ],
    icon: "admin"
  },
  {
    title: "Final Delivery, Hosting & Support",
    lead:
      "Once testing is complete, we host your project and provide 24/7 support with 1-year free maintenance.",
    items: [
      "Secure hosting & deployment",
      "Final QC & approval",
      "24/7 support + free 1-year maintenance"
    ],
    icon: "delivery"
  }
];


export default function Blueprint() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) =>
      prev + 1 >= cardsData.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev - 1 < 0 ? cardsData.length - 1 : prev - 1
    );
  };

  return (
    <section className="bpx-wrap">
      {/* meta */}
      <div className="bpx-meta">
        <span className="bpx-star">✶</span>
        <a className="bpx-meta-link" href="#how">HOW WE DO</a>
        <span className="bpx-star">✶</span>
      </div>

      {/* title + controls inline */}
      <div className="bpx-title-row bpx-title-inline">
        <h1 className="bpx-title">Our Operational Blueprint</h1>
        <div className="bpx-controls">
          <button className="bpx-circle" onClick={prevSlide}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <button className="bpx-circle" onClick={nextSlide}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>

      {/* SLIDER CONTAINER */}
      <div className="bpx-grid">
        <div
          className="bpx-cards slider-track"
          style={{
            transform: `translateX(-${index * 33.33}%)`
          }}
        >
          {cardsData.map((c, idx) => (
            <article className="bpx-card" key={idx}>
              <div className="bpx-icon">{renderIcon(c.icon)}</div>

              <h3 className="bpx-card-title">{c.title}</h3>
              <p className="bpx-lead">{c.lead}</p>

              <ul className="bpx-checklist">
                {c.items.map((it, i) => (
                  <li key={i}>
                    <span className="bpx-checkmark">✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderIcon(name) {
  const iconProps = {
    width: 40,
    height: 40,
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none"
  };

  switch (name) {
    case "vision":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        </svg>
      );

    case "contract":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 12h6M8 17h5" />
        </svg>
      );

    case "collab":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M4 20c0-3 4-5 8-5s8 2 8 5" />
        </svg>
      );

    case "design":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M4 20h16" />
          <path d="M12 3l7 7-7 7-7-7 7-7z" />
        </svg>
      );

    case "backend":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10M7 12h7M7 16h5" />
        </svg>
      );

    case "admin":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="3" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      );

    case "delivery":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M3 7h13v10H3z" />
          <path d="M16 10h4l1 3v4h-5" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="17.5" cy="17.5" r="1.5" />
        </svg>
      );

    default:
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

