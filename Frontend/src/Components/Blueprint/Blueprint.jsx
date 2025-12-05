// Updated Blueprint.jsx: Heading and Next/Previous on the same line
import React from "react";
import "./Blueprint.css";

const cardsData = [
  {
    title: "Understanding Your Vision",
    lead:
      "Unlocking insights, shaping solutions — comprehend complex ideas effortlessly with our vision for clarity and innovation.",
    items: [
      "Sustainability and Responsibility",
      "Customer-Centric Approach",
      "Businesses can partner with affiliates",
    ],
    icon: "vision",
  },
  {
    title: "Collaborative Planning",
    lead:
      "Streamline teamwork with Collaborative Planning, fostering efficiency and synergy in achieving shared goals seamlessly.",
    items: [
      "Sustainability and Responsibility",
      "Customer-Centric Approach",
      "Businesses can partner with affiliates",
    ],
    icon: "collab",
  },
  {
    title: "Customized Solutions",
    lead:
      "Tailored solutions for your unique needs, delivering personalized results that elevate your experience and surpass expectations.",
    items: [
      "Sustainability and Responsibility",
      "Customer-Centric Approach",
      "Businesses can partner with affiliates",
    ],
    icon: "custom",
  },
];

export default function Blueprint() {
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
        <div className="bpx-controls" role="group" aria-label="Controls">
          <button className="bpx-circle" aria-label="Previous">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="bpx-circle" aria-label="Next">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bpx-grid">
        <div className="bpx-cards">
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
  if (name === "vision") {
    return (
      <svg className="bpx-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2a6 6 0 00-4 10.7V14a2 2 0 002 2h4a2 2 0 002-2v-1.3A6 6 0 0012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "collab") {
    return (
      <svg className="bpx-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 12l5 5 13-13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </svg>
    );
  }
  return (
    <svg className="bpx-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 5l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
    </svg>
  );
}
