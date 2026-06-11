import React, { useState, useRef, useEffect } from 'react';
import './Frequentlyaskedquestion.css';

const FAQ_ITEMS = [
  {
    q: 'How long does it take for a mock design & project completion?',
    a: 'At PR WEBSTOCK, the mock design usually takes 5–7 working days, depending on project complexity and requirements. Complete website development timelines typically range from 2 to 6 weeks. Since we focus on fully code-based web design, we prioritize quality, performance, and scalability over rushed delivery.',
  },
  {
    q: 'Do you provide free maintenance for websites?',
    a: 'Yes. As part of our service, PR WEBSTOCK offers limited free maintenance after launch, which includes minor fixes and support. For long-term needs, we also provide affordable maintenance plans covering updates, security checks, and performance monitoring on Cloud / VPS hosting.',
  },
  {
    q: 'Does your website design respond to desktop, mobile, and tablet?',
    a: 'Absolutely. Every website we build is fully responsive and optimized for desktop, mobile, and tablet devices. Our mobile-first, MERN Stack development approach ensures smooth performance and a consistent user experience across all screen sizes.',
  },
  {
    q: 'How much does it cost to design a website?',
    a: 'Website design costs vary based on your business needs, design complexity, number of pages, and required features. At PR WEBSTOCK, we offer customized pricing after understanding your goals, ensuring you pay only for what your website actually needs.',
  },
  {
    q: 'When can I expect delivery of the complete design work?',
    a: 'Project delivery timelines are clearly defined before development begins. Most projects are delivered within the agreed milestones, ensuring transparency and on-time completion. Whether it’s a business website or a custom platform, PR WEBSTOCK ensures quality delivery without unnecessary delays.',
  },
];

const Frequentlyaskedquestion = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [heights, setHeights] = useState([]);
  const contentRefs = useRef([]);

  // Measure heights AFTER render
  useEffect(() => {
    const newHeights = contentRefs.current.map(
      (el) => (el ? el.scrollHeight : 0)
    );
    setHeights(newHeights);
  }, []);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(index);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % FAQ_ITEMS.length;
      document.querySelectorAll('.faq-item-button')[next]?.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length;
      document.querySelectorAll('.faq-item-button')[prev]?.focus();
    }
  };

  return (
    <section className="faq-wrap" aria-label="Frequently asked questions">
      <h2 className="faq-title">Frequently Asked Questions (FAQ)</h2>

      <div className="faq-list" role="list">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = index === openIndex;

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'is-open' : ''}`}
              role="listitem"
            >
              <button
                type="button"
                className="faq-item-button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                onClick={() => toggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="faq-question">{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                className="faq-panel"
                style={{
                  maxHeight: isOpen ? `${heights[index]}px` : '0px',
                }}
              >
                <div
                  className="faq-panel-inner"
                  ref={(el) => (contentRefs.current[index] = el)}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Frequentlyaskedquestion;
