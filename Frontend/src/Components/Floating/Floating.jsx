import React, { useEffect, useState } from "react";
import "./Floating.css";
import { FaPhoneAlt, FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Floating = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;

          setShowTop(scrollPosition > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <aside className="floating-container" aria-label="Quick Actions">
      {/* Call Button */}
      <a
        href="tel:+917789801327"
        className="floating-btn floating-btn--phone"
        aria-label="Call Now"
      >
        <span className="floating-tooltip">Call Now</span>
        <FaPhoneAlt />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917789801327?text=Hello%20PR-WEBSTOCK!%20I%20want%20a%20professional%20website%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn--whatsapp"
        aria-label="WhatsApp"
      >
        <span className="floating-tooltip">WhatsApp</span>
        <FaWhatsapp />
      </a>

      {/* Back To Top Button */}
      {showTop && (
        <button
          type="button"
          className="floating-btn floating-btn--top"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <span className="floating-tooltip">Back to Top</span>
          <FaArrowUp />
        </button>
      )}
    </aside>
  );
};

export default Floating;