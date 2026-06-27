import React, { useState, useEffect } from "react";
import "./Blueprint.css";

const cardsData = [
  {
    title: "Understanding Your Vision",
    lead: "PR WEBSTOCK begins with a deep discovery process to understand your business objectives, audience behavior, and brand personality — ensuring the foundation of a high-performance digital product.",
    items: [
      "In-depth requirement analysis",
      "Brand tone & audience research",
      "Goal-oriented project strategy"
    ],
    icon: "vision"
  },
  {
    title: "Budget Finalization & Legal Agreement",
    lead: "Before development starts, we ensure complete transparency by finalizing budget, project milestones, and deliverables under a legally compliant agreement for your confidence and security.",
    items: [
      "Transparent pricing structure",
      "Legally compliant project documentation",
      "Defined scope, timeline & responsibilities"
    ],
    icon: "contract"
  },
  {
    title: "Collaborative Planning",
    lead: "Our expert team crafts a strategic project roadmap that aligns design, development, and deployment workflows — enabling smooth execution and timely delivery.",
    items: [
      "Strategic workflow planning",
      "Task delegation & team coordination",
      "Detailed end-to-end project roadmap"
    ],
    icon: "collab"
  },
  {
    title: "Customized UI/UX & Brand-Focused Design",
    lead: "We design visually appealing, user-centric, and conversion-driven UI/UX that enhances your brand identity and provides a premium digital experience across all devices.",
    items: [
      "Custom UI/UX wireframes & prototypes",
      "Brand-aligned color scheme & typography",
      "High-converting layout design"
    ],
    icon: "design"
  },
  {
    title: "Backend Development & API Integration",
    lead: "Our developers build a powerful, scalable, and secure backend architecture — integrating APIs and databases to ensure smooth functionality and exceptional product performance.",
    items: [
      "Scalable & secure backend architecture",
      "Optimized database structure",
      "Custom API creation & third-party integration"
    ],
    icon: "backend"
  },
  {
    title: "Admin Panel & Centralized Project Control",
    lead: "We provide an advanced, user-friendly admin dashboard that allows complete control over content, users, analytics, and data with enterprise-grade security.",
    items: [
      "Role-based admin access",
      "Centralized content & data management",
      "Real-time analytics & reporting"
    ],
    icon: "admin"
  },
  {
    title: "Final Delivery, Hosting & Priority Support",
    lead: "After quality testing and final approval, we deploy your project on secure hosting infrastructure and provide ongoing support with complimentary 1-year maintenance.",
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
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(cardsData.length / cardsToShow);

  const goToPage = (pageIndex) => {
    setIndex(pageIndex);
  };

  return (
    <section className="bpx-wrap">
      {/* Top Meta Tag Pill */}
      <div className="bpx-meta">
        <span className="bpx-star">✦</span>
        <span className="bpx-meta-link">HOW WE DO</span>
        <span className="bpx-star">✦</span>
      </div>

      {/* Header Title Section (No Arrow Buttons Here) */}
      <div className="bpx-title-row bpx-title-inline">
        <h1 className="bpx-title">Our Operational Blueprint</h1>
      </div>

      {/* Slider Viewport Window */}
      <div className="bpx-grid">
        <div
          className="bpx-cards slider-track"
          style={{
            transform: `translateX(-${index * 100}%)`
          }}
        >
          {cardsData.map((c, idx) => (
            <div 
              className="bpx-card-slide-wrapper" 
              style={{ width: `${100 / cardsToShow}%` }}
              key={idx}
            >
              <article className="bpx-card">
                {/* Neumorphic Soft Inset Icon Shape Box */}
                <div className="bpx-icon">
                  {renderIcon(c.icon)}
                </div>

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
            </div>
          ))}
        </div>
      </div>

      {/* Reference Accurate Square-Numeric Pagination Section Below Cards */}
      <div className="bpx-pagination-numbers">
        {[...Array(totalPages)].map((_, pageIdx) => (
          <button
            key={pageIdx}
            className={`num-page-btn ${index === pageIdx ? "active" : ""}`}
            onClick={() => goToPage(pageIdx)}
          >
            {pageIdx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

function renderIcon(name) {
  const iconProps = {
    width: 24,
    height: 24,
    stroke: "#3B82F6", 
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (name) {
    case "vision":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        </svg>
      );
    case "contract":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "collab":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "design":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" />
          <path d="M6 14C6 11.2386 8.23858 9 11 9C13.7614 9 16 11.2386 16 14" />
        </svg>
      );
    case "backend":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
        </svg>
      );
    case "admin":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      );
    case "delivery":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
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