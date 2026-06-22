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
<<<<<<< HEAD
      {/* Phone */}
      <a
        href="tel:+917789801327"
        className="floating-btn phone"
        aria-label="Call"
      >
=======
      {/* Call Button */}
      <a href="tel:+917789801327" className="floating-btn phone">
>>>>>>> 14bd068f06a0a8ba011dc0263b25c3a929c5a898
        <span className="tooltip">Call Now</span>
        <FaPhoneAlt />
      </a>

<<<<<<< HEAD
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
=======
      {/* WhatsApp Button */}
          <a
          href="https://wa.me/917789801327?text=Hello%20PR-WEBSTOCK!%20I%20want%20a%20professional%20website%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp"
>>>>>>> 14bd068f06a0a8ba011dc0263b25c3a929c5a898
        >
          <span className="tooltip">WhatsApp</span>
          <FaWhatsapp />
        </a>

      {/* Back To Top */}
      {showTop && (
        <button className="floating-btn top" onClick={scrollToTop}>
          <span className="tooltip">Back to Top</span>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Floating;