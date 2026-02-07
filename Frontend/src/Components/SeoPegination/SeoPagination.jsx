import React, { useState, useRef, useEffect } from "react";
import "./SeoPagination.css";
import {
  FaCogs,
  FaMobileAlt,
  FaRocket,
  FaSearch,
  FaPenFancy,
  FaKey,
  FaLink,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  { icon: <FaCogs />, title: "Schema Optimization", desc: "Finalize website optimization with schema markup." },
  { icon: <FaMobileAlt />, title: "Mobile Optimization", desc: "Optimize loading speed on mobile devices." },
  { icon: <FaRocket />, title: "Page Speed", desc: "Improve page load speed." },
  { icon: <FaSearch />, title: "SEO Audit", desc: "Identify SEO issues." },
  { icon: <FaPenFancy />, title: "Content Strategy", desc: "Plan SEO content." },
  { icon: <FaKey />, title: "Keyword Research", desc: "Find best keywords." },
  { icon: <FaLink />, title: "Link Building", desc: "Build authority links." },
  { icon: <FaChartLine />, title: "Analytics Setup", desc: "Track performance." },
  { icon: <FaCheckCircle />, title: "Performance Review", desc: "Optimize results." },
];

const SeoPagination = () => {
  const [active, setActive] = useState(0);
  const rowRef = useRef(null);
  const itemRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);

  /* Scroll to active item on dot click */
  useEffect(() => {
    const el = itemRefs.current[active];
    if (!el) return;

    isProgrammaticScroll.current = true;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  }, [active]);

  /* Detect active item while user scrolls */
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !rowRef.current) return;

    const rowRect = rowRef.current.getBoundingClientRect();
    const centerX = rowRect.left + rowRect.width / 2;

    let closestIndex = active;
    let minDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== active) {
      setActive(closestIndex);
    }
  };

  return (
    <div className="seo-pagination">

      {/* HEADING */}
      <div className="process-heading">
        <h2>Our Process</h2>
        <span className="heading-line"></span>
      </div>

      {/* SCROLLABLE ROW */}
      <div
        className="process-row"
        ref={rowRef}
        onScroll={handleScroll}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`process-step ${active === index ? "active" : ""}`}
          >
            <div className="process-circle">{step.icon}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      {/* DOT PAGINATION */}
      <div className="dot-pagination">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`dot ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>

    </div>
  );
};

export default SeoPagination;
