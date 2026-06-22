import React, { useEffect, useState } from "react";
import "./Floating.css";
import { FaPhoneAlt, FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Floating = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-container">
      {/* Phone */}
      <a
        href="tel:+917789801327"
        className="floating-btn phone"
        aria-label="Call"
      >
        <span className="tooltip">Call Now</span>
        <FaPhoneAlt />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917789801327"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="WhatsApp"
      >
        <span className="tooltip">WhatsApp</span>
        <FaWhatsapp />
      </a>

      {/* Scroll to Top */}
      {showTop && (
        <button
          className="floating-btn top"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <span className="tooltip">Back to Top</span>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Floating;