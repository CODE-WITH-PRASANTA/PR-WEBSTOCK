import React, { useState, useEffect, useRef } from 'react';
import './Blueprint.css';

const blueprintData = [
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
    icon: "agreement"
  },
  {
    title: "Collaborative Planning",
    lead: "Our expert team crafts a strategic project roadmap that aligns design, development, and deployment workflows — enabling smooth execution and timely delivery.",
    items: [
      "Strategic workflow planning",
      "Task delegation & team coordination",
      "Detailed end-to-end project roadmap"
    ],
    icon: "planning"
  },
  {
    title: "Customized UI/UX & Brand-Focused Design",
    lead: "We design visually appealing, user-centric, and conversion-driven UI/UX that enhances your brand identity and provides a premium digital experience across all devices.",
    items: [
      "Custom UI/UX wireframes & prototypes",
      "Brand-aligned color scheme & typography",
      "High-converting layout design"
    ],
    icon: "uiux"
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

const Blueprint = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setItemsToShow(1); // 1 card on mobile
      } else if (window.innerWidth <= 1024) {
        setItemsToShow(2); // 2 cards on tablet
      } else {
        setItemsToShow(3); // 3 cards on desktop / laptop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade the section in once it enters the viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const totalPages = Math.ceil(blueprintData.length / itemsToShow);

  // Safeguard bounds when viewport transforms change mid-session
  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(totalPages - 1);
    }
  }, [itemsToShow, totalPages, currentIndex]);

  const handlePageClick = (pageIndex) => setCurrentIndex(pageIndex);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
  };

  const renderBlueprintIcon = (type) => {
    const iconProps = {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };

    switch (type) {
      case "vision":
        return (
          <svg {...iconProps}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case "agreement":
        return (
          <svg {...iconProps}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case "planning":
        return (
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "uiux":
        return (
          <svg {...iconProps}>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" />
            <path d="M6 14C6 11.2386 8.23858 9 11 9C13.7614 9 16 11.2386 16 14" />
            <circle cx="12" cy="2" r="1.4" fill="currentColor" stroke="none" />
          </svg>
        );
      case "backend":
        return (
          <svg {...iconProps}>
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      case "admin":
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>
        );
      case "delivery":
        return (
          <svg {...iconProps}>
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        );
      default:
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  const railProgress = totalPages > 1 ? (currentIndex / (totalPages - 1)) * 100 : 100;

  return (
    <section
      className={`premium-blueprint-container ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      {/* Blueprint corner marks — a small nod to schematic / drafting sheets */}
      <span className="bp-corner bp-corner--tl" aria-hidden="true" />
      <span className="bp-corner bp-corner--tr" aria-hidden="true" />

      {/* Header block: eyebrow label, headline, subtitle, arrow controls */}
      <div className="blueprint-header-panel">
        <div className="blueprint-header-copy">
          <span className="blueprint-eyebrow">
            <i className="blueprint-eyebrow-dash" aria-hidden="true" />
            Our Process
          </span>
          <h2 className="blueprint-main-title">Our Operational Blueprint</h2>
          <p className="blueprint-subtitle">
            A clear, step-by-step roadmap — from first conversation to final launch —
            engineered for transparency at every stage.
          </p>
        </div>

        <div className="blueprint-navigation-arrows">
          <button
            className="blueprint-arrow-btn prev"
            onClick={handlePrev}
            aria-label="Previous step"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="blueprint-arrow-btn next"
            onClick={handleNext}
            aria-label="Next step"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Route rail — literal "blueprint route" progress indicator */}
      <div className="blueprint-route-rail" aria-hidden="true">
        <span className="blueprint-route-rail-fill" style={{ width: `${railProgress}%` }} />
        {blueprintData.map((_, idx) => (
          <span
            key={idx}
            className={`blueprint-route-tick ${idx / (blueprintData.length - 1) * 100 <= railProgress + 0.01 ? 'is-passed' : ''}`}
            style={{ left: `${(idx / (blueprintData.length - 1)) * 100}%` }}
          />
        ))}
      </div>

      {/* Slider viewport / track */}
      <div
        className="blueprint-slider-viewport"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Operational blueprint steps"
        onKeyDown={handleKeyDown}
      >
        <div
          className="blueprint-cards-slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {blueprintData.map((card, idx) => (
            <div
              className="blueprint-card-slide-frame"
              style={{ width: `${100 / itemsToShow}%` }}
              key={idx}
            >
              <article
                className="blueprint-premium-card"
                style={{ transitionDelay: `${(idx % itemsToShow) * 90}ms` }}
              >
                <span className="blueprint-ghost-index" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="blueprint-icon-shield">
                  {renderBlueprintIcon(card.icon)}
                </div>

                <h3 className="blueprint-card-headline">{card.title}</h3>
                <p className="blueprint-card-body-lead">{card.lead}</p>

                <span className="blueprint-divider" aria-hidden="true" />
                <span className="blueprint-includes-label">What's Included</span>

                <ul className="blueprint-card-bullet-list">
                  {card.items.map((bulletText, bulletIdx) => (
                    <li key={bulletIdx} className="blueprint-bullet-item">
                      <span className="blueprint-check-indicator">
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.3 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="blueprint-bullet-text">{bulletText}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Numbered stepper pagination, styled as a connected schematic sequence */}
      <div className="blueprint-pagination-wrapper" role="tablist" aria-label="Blueprint pages">
        {[...Array(totalPages)].map((_, pageIdx) => (
          <React.Fragment key={pageIdx}>
            <button
              role="tab"
              aria-selected={currentIndex === pageIdx}
              aria-label={`Go to page ${pageIdx + 1}`}
              className={`blueprint-pagination-node-btn ${currentIndex === pageIdx ? 'is-active' : ''}`}
              onClick={() => handlePageClick(pageIdx)}
            >
              {pageIdx + 1}
            </button>
            {pageIdx < totalPages - 1 && <span className="blueprint-pagination-connector" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Blueprint;