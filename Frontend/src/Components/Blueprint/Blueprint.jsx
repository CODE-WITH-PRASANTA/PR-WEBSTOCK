import React, { useState } from "react";
import "./Blueprint.css";

const cardsData = [
  {
    title: "Understanding Your Vision",
    lead:
      "PR WEBSTOCK begins with a deep discovery process to understand your business objectives, audience behavior, and brand personality — ensuring the foundation of a high-performance digital product.",
    items: [
      "In-depth requirement analysis",
      "Brand tone & audience research",
      "Goal-oriented project strategy"
    ],
    icon: "vision"
  },

  {
    title: "Budget Finalization & Legal Agreement",
    lead:
      "Before development starts, we ensure complete transparency by finalizing budget, project milestones, and deliverables under a legally compliant agreement for your confidence and security.",
    items: [
      "Transparent pricing structure",
      "Legally compliant project documentation",
      "Defined scope, timeline & responsibilities"
    ],
    icon: "contract"
  },

  {
    title: "Collaborative Planning",
    lead:
      "Our expert team crafts a strategic project roadmap that aligns design, development, and deployment workflows — enabling smooth execution and timely delivery.",
    items: [
      "Strategic workflow planning",
      "Task delegation & team coordination",
      "Detailed end-to-end project roadmap"
    ],
    icon: "collab"
  },

  {
    title: "Customized UI/UX & Brand-Focused Design",
    lead:
      "We design visually appealing, user-centric, and conversion-driven UI/UX that enhances your brand identity and provides a premium digital experience across all devices.",
    items: [
      "Custom UI/UX wireframes & prototypes",
      "Brand-aligned color scheme & typography",
      "High-converting layout design"
    ],
    icon: "design"
  },

  {
    title: "Backend Development & API Integration",
    lead:
      "Our developers build a powerful, scalable, and secure backend architecture — integrating APIs and databases to ensure smooth functionality and exceptional product performance.",
    items: [
      "Scalable & secure backend architecture",
      "Optimized database structure",
      "Custom API creation & third-party integration"
    ],
    icon: "backend"
  },

  {
    title: "Admin Panel & Centralized Project Control",
    lead:
      "We provide an advanced, user-friendly admin dashboard that allows complete control over content, users, analytics, and data with enterprise-grade security.",
    items: [
      "Role-based admin access",
      "Centralized content & data management",
      "Real-time analytics & reporting"
    ],
    icon: "admin"
  },

  {
    title: "Final Delivery, Hosting & Priority Support",
    lead:
      "After quality testing and final approval, we deploy your project on secure hosting infrastructure and provide ongoing support with complimentary 1-year maintenance.",
    items: [
      "Optimized hosting & seamless deployment",
      "Full project testing & quality validation",
      "24/7 technical support + 1-year free maintenance"
    ],
    icon: "delivery"
  }
];


export default function Blueprint() {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(33.33);


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

  React.useEffect(() => {
  const updateWidth = () => {
    if (window.innerWidth <= 576) {
      setCardWidth(100);      // mobile : 1 card
    } else if (window.innerWidth <= 1024) {
      setCardWidth(50);       // tablet : 2 cards
    } else {
      setCardWidth(33.33);    // desktop : 3 cards
    }
  };

  updateWidth();  

  window.addEventListener("resize", updateWidth);
  return () => window.removeEventListener("resize", updateWidth);
}, []);


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
            transform: `translateX(-${index * cardWidth}%)`
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

