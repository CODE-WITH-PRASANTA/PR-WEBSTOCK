import React, { useEffect, useState } from "react";
import "./Floating.css";
import { FaPhoneAlt, FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Floating = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
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
      <a href="tel:+919999999999" className="floating-btn phone">
        <span className="tooltip">Call Now</span>
        <FaPhoneAlt />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
      >
        <span className="tooltip">WhatsApp</span>
        <FaWhatsapp />
      </a>

      {/* Scroll Top */}
      {showTop && (
        <button
          className="floating-btn top"
          onClick={scrollToTop}
        >
          <span className="tooltip">Back to Top</span>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Floating;