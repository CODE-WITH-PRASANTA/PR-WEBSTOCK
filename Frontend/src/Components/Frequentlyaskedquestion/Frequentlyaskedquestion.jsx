import React, { useState, useRef, useEffect } from 'react';
import './Frequentlyaskedquestion.css';

const FAQ_ITEMS = [
  {
    q: 'How long does it take for a mock design & project completion?',
    a: `Project completion depends on its magnitude and complexity. The time needed to finish a mock design and project depends on variables like project scope, designing work, resources, and feedback. Simple projects may take 2 to 4 days for designing and 10 to 15 days for completion, while larger ones may take weeks or even months.`,
  },
  {
    q: 'Do you provide free maintenance for websites?',
    a: `We offer maintenance packages and limited complimentary support depending on the agreement. For long-term support and regular updates we recommend one of our maintenance plans — get in touch and we'll provide options tailored to your needs.`,
  },
  {
    q: 'Does your website design responsive to various devices (desktop/mobile/tablet)?',
    a: `Yes — every design we deliver is responsive and tested across common screen sizes and browsers so your site looks great on desktop, tablet and mobile.`,
  },
  {
    q: 'How much does it cost to design a website?',
    a: `Cost depends on features, number of pages, integrations and complexity. We provide quotes after understanding requirements; contact us for a free estimate.`,
  },
  {
    q: 'When can I expect delivery of the complete design work?',
    a: `Delivery timeline is agreed during project scoping and depends on approvals and revision cycles. Typical delivery windows are shared in the proposal.`,
  },
];

export default function Frequentlyaskedquestion() {
  const [openIndex, setOpenIndex] = useState(-1);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, FAQ_ITEMS.length);
  }, []);

  const toggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx));
  };

  const onKey = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(idx);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % FAQ_ITEMS.length;
      const btn = document.querySelectorAll('.faq-item-button')[next];
      btn?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length;
      const btn = document.querySelectorAll('.faq-item-button')[prev];
      btn?.focus();
    }
  };

  return (
    <section className="faq-wrap" aria-label="Frequently asked questions">
      <h2 className="faq-title">Frequently asked question (FAQ)</h2>

      <div className="faq-list" role="list">
        {FAQ_ITEMS.map((it, idx) => {
          const isOpen = idx === openIndex;
          return (
            <div
              className={`faq-item ${isOpen ? 'is-open' : ''}`}
              key={idx}
              role="listitem"
            >
              <div className="faq-item-head" onClick={() => toggle(idx)}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  id={`faq-button-${idx}`}
                  className="faq-item-button"
                  onKeyDown={(e) => onKey(e, idx)}
                >
                  <span className="faq-question">{it.q}</span>

                  <span className="faq-icon" aria-hidden>
                    {isOpen ? (
                      // minus icon
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    ) : (
                      // plus icon
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>

              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-button-${idx}`}
                className="faq-panel"
                ref={(el) => (contentRefs.current[idx] = el)}
                style={
                  isOpen
                    ? { maxHeight: contentRefs.current[idx]?.scrollHeight ?? 300 }
                    : { maxHeight: 0 }
                }
              >
                <div className="faq-panel-inner">
                  <p>{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}