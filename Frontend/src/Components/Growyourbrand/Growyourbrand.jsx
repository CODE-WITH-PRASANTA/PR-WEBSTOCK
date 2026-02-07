import React, { useState, useRef, useEffect } from "react";
import "./Growyourbrand.css";

import auditIcon from "../../assets/10.webp";
import competitorIcon from "../../assets/11.webp";
import platformIcon from "../../assets/12n.webp";
import calendarIcon from "../../assets/13.webp";
import campaignIcon from "../../assets/14.webp";
import optimizeIcon from "../../assets/15.webp";

const steps = [
  {
    img: auditIcon,
    title: "Social media audit & goal setting",
    desc: "We begin with a complete review of your current social presence...",
  },
  {
    img: competitorIcon,
    title: "Competitor & audience analysis",
    desc: "We analyze competitors and audience behavior...",
  },
  {
    img: platformIcon,
    title: "Platform selection & strategy blueprint",
    desc: "Choosing the right platform...",
  },
  {
    img: calendarIcon,
    title: "Content calendar & design production",
    desc: "We create a structured content calendar...",
  },
  {
    img: campaignIcon,
    title: "Campaign execution & monitoring",
    desc: "We manage everything and monitor performance...",
  },
  {
    img: optimizeIcon,
    title: "Optimization & monthly reporting",
    desc: "We track engagement and show monthly improvements...",
  },
];

const Growyourbrand = () => {
  const [active, setActive] = useState(0);
  const rowRef = useRef(null);
  const itemRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);

  /* Scroll to active item when dot clicked */
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

  /* Detect active while scrolling manually */
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !rowRef.current) return;

    const rowRect = rowRef.current.getBoundingClientRect();
    const centerX = rowRect.left + rowRect.width / 2;

    let closestIndex = active;
    let minDistance = Infinity;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - itemCenter);

      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    });

    if (closestIndex !== active) {
      setActive(closestIndex);
    }
  };

  return (
    <div className="grow-pagination">

      <div className="process-heading">
        <h2>How we strategically<br/>grow your brand on social media</h2>
        <span className="heading-line"></span>
      </div>

      <div className="process-row" ref={rowRef} onScroll={handleScroll}>
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`process-step ${active === index ? "active" : ""}`}
          >
            <div className="process-circle">
              <img src={step.img} alt={step.title} />
            </div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
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

export default Growyourbrand;
