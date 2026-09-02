import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// React Icons
import {
  FaEnvelope,
  FaPhone,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
  FaChevronDown,
  FaLaptopCode,
  FaMobileAlt,
  FaHashtag,
  FaSearch,
  FaBullhorn,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";

import logo from "../../assets/PR-WEB-LOGO.webp";
import "./Navbar.css";

// Single source of truth for services
const SERVICES = [
  { label: "Web Development", href: "/services/web-development", icon: FaLaptopCode },
  { label: "App Development", href: "/services/app-development", icon: FaMobileAlt },
  { label: "Social media management", href: "/services/socialmedia-management", icon: FaHashtag },
  { label: "Seo", href: "/services/seo", icon: FaSearch },
  { label: "Digital Marketing", href: "/services/digital-marketing", icon: FaBullhorn },
];

const Navbar = () => {
  const [openCat, setOpenCat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [openQuotePanel, setOpenQuotePanel] = useState(false);

  const dropdownRef = useRef(null);
  const catBtnRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openCat &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        catBtnRef.current &&
        !catBtnRef.current.contains(e.target)
      ) {
        setOpenCat(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCat]);

  // Lock body scroll when mobile menu or quote panel is open
  useEffect(() => {
    if (mobileMenuOpen || openQuotePanel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, openQuotePanel]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close quote panel on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && openQuotePanel) setOpenQuotePanel(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openQuotePanel]);

  const toggleMobileMenu = () => setMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const portalNode = typeof document !== "undefined" ? document.body : null;

  const panel = (
    <>
      <div
        className={`quote-info-overlay ${openQuotePanel ? "show" : ""}`}
        onClick={() => setOpenQuotePanel(false)}
        aria-hidden={!openQuotePanel}
      />

      <aside
        className={`quote-info-panel ${openQuotePanel ? "open" : ""}`}
        aria-hidden={!openQuotePanel}
      >
        <div className="quote-info-inner">
          <button
            className="quote-info-close"
            onClick={() => setOpenQuotePanel(false)}
            aria-label="Close info panel"
          >
            <FaTimes />
          </button>

          {/* Logo */}
          <div className="quote-info-logo">
            <img 
              src={logo} 
              alt="Brand Logo" 
              width="155" 
              height="56" 
              loading="lazy" 
              decoding="async" 
            />
          </div>

          {/* Description */}
          <p className="quote-info-desc">
            We provide fast & reliable quotes for web development, software solutions, digital marketing, and IT consulting.
            Reach out anytime — we’re happy to help.
          </p>

          {/* Contact Section */}
          <h3 className="quote-info-title">Get In Touch</h3>

          <ul className="quote-info-list">
            <li>
              <span className="quote-info-icon"><FaEnvelope /></span>
              <div>
                <p className="muted">Email</p>
                <p>prwebstock.com@gmail.com</p>
              </div>
            </li>
            <li>
              <span className="quote-info-icon"><FaPhone /></span>
              <div>
                <p className="muted">Phone</p>
                <p>+91 77898 01327</p>
              </div>
            </li>
          </ul>

          {/* Office Hours */}
          <div className="quote-info-hours">
            <h3 className="quote-info-title">Office Hours</h3>

            <div className="quote-hours-item">
              <span>Monday - Saturday</span>
              <strong>09:00 AM - 05:00 PM</strong>
            </div>

            <div className="quote-hours-item">
              <span>Sunday</span>
              <strong>Closed</strong>
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <header className="navbar-header" role="banner">
        {/* TOP NAV */}
        <div className="navbar-top navbar-container">
          <div className="navbar-top-row">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img 
                src={logo} 
                alt="Brand Logo" 
                fetchPriority="high"
                width="155"
                height="56"
                decoding="async"
              />
            </Link>

            {/* mobile-only right bar (icons + hamburger) */}
            <div className="navbar-right-bar navbar-right-bar--mobile">
              <a
                href="https://www.facebook.com/share/1Bm8zM2E5g/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/prwebstock?igsh=MWs3em54aDl6NHNzcA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/917789801327"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/company/pr-webstock/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <FaLinkedinIn />
              </a>
              <button
                className="topbar-hamburger"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div
            className="navbar-contact"
            role="region"
            aria-label="Contact information"
          >
            <a
              className="contact-item contact-phone"
              href="tel:+917789801327"
              aria-label="Call +91-7789-801-327"
            >
              <FaPhone className="contact-svg" aria-hidden="true" style={{ transform: "rotate(90deg)" }} />
              <span className="navbar-contact-text">+91-7789 801 327</span>
            </a>

            <a
              className="contact-item contact-email"
              href="mailto:prwebstock.com@gmail.com"
              aria-label="Email prwebstock.com at gmail"
            >
              <FaEnvelope className="contact-svg" aria-hidden="true" />
              <span className="navbar-contact-text">prwebstock.com@gmail.com</span>
            </a>

            <div className="contact-item contact-location" aria-label="Office location">
              <FaMapMarkerAlt className="contact-svg" aria-hidden="true" />
              <address className="navbar-contact-text">608A, Grand Bazar, Phulnakhara – 754001</address>
            </div>
          </div>

          {/* Desktop-only Social Media Bar */}
          <div className="navbar-right-bar navbar-right-bar--desktop social-bar">
            <a href="https://www.facebook.com/share/1Bm8zM2E5g/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/prwebstock?igsh=MWs3em54aDl6NHNzcA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://wa.me/917789801327" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon">
              <FaWhatsapp />
            </a>
            <a href="https://www.linkedin.com/company/pr-webstock/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <hr className="navbar-divider" />

        {/* BOTTOM NAV */}
        <div className="navbar-bottom navbar-container">
          <button
            ref={catBtnRef}
            className={`navbar-category-btn ${openCat ? "open" : ""}`}
            onClick={() => setOpenCat(!openCat)}
            aria-haspopup="true"
            aria-expanded={openCat}
          >
            <FaBars /> &nbsp; Services
          </button>

          <nav className="navbar-links" aria-label="Primary">
            <Link to="/"> Home</Link>
            <Link to="/about"> About</Link>
            <Link to="/industry-work"> Industry Work</Link>
            <Link to="/project"> Project</Link>
            <Link to="/career">Career</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Get Free Demo button for desktop */}
          <div className="quote-box-wrapper">
            <button
              className="quote-box-icon-btn"
              onClick={() => setOpenQuotePanel(true)}
              aria-label="Open info panel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
                <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
                <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>

            <Link to="/get-quote" className="navbar-quote-btn">
              Get Free Demo
            </Link>
          </div>
        </div>

        {/* CATEGORY DROPDOWN (desktop) */}
        <div ref={dropdownRef} className={`navbar-category-dropdown ${openCat ? "show" : ""}`}>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link to={s.href} onClick={() => setOpenCat(false)}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE SIDEDRAWER */}
        <aside className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`} aria-hidden={!mobileMenuOpen}>
          <div className="drawer-inner">
            <div className="drawer-top">
              <Link to="/" onClick={closeMobileMenu} className="drawer-logo">
                <img 
                  src={logo} 
                  alt="Logo" 
                  width="155" 
                  height="56" 
                  loading="lazy" 
                  decoding="async" 
                />
              </Link>
              <button className="drawer-close" onClick={closeMobileMenu} aria-label="Close menu"><FaTimes /></button>
            </div>

            {/* Mobile drawer: direct nav links + collapsible Services */}
            <nav className="drawer-links" style={{ marginTop: 12 }}>
              <Link to="/" onClick={closeMobileMenu}>Home</Link>

              {/* Services accordion */}
              <button
                type="button"
                className={`drawer-services-btn ${mobileServicesOpen ? "open" : ""}`}
                onClick={() => setMobileServicesOpen((s) => !s)}
                aria-expanded={mobileServicesOpen}
                aria-controls="drawer-services-list"
              >
                <span className="drawer-services-btn-label">
                  <span className="drawer-services-btn-icon"><MdCategory /></span>
                  Services
                </span>
                <FaChevronDown className="drawer-services-chevron" aria-hidden="true" />
              </button>

              <div
                id="drawer-services-list"
                className={`drawer-services-list ${mobileServicesOpen ? "open" : ""}`}
              >
                <div className="drawer-services-list-inner">
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        to={s.href}
                        onClick={closeMobileMenu}
                        className="drawer-service-item"
                        style={{ "--i": i }}
                      >
                        <span className="drawer-service-icon">
                          <Icon />
                        </span>
                        <span className="drawer-service-label">{s.label}</span>
                        <span className="drawer-service-arrow">›</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link to="/about" onClick={closeMobileMenu}>About</Link>
              <Link to="/industry-work" onClick={closeMobileMenu}>Industry Work</Link>
              <Link to="/project" onClick={closeMobileMenu}>Project</Link>
              <Link to="/career" onClick={closeMobileMenu}>Career</Link>
              <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
              <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
              <Link to="/get-quote" onClick={closeMobileMenu} className="drawer-quote">
                Get Free Demo
              </Link>
            </nav>

            {/* Social icons */}
            <div className="drawer-footer drawer-footer--social">
              <a href="https://www.facebook.com/share/1Bm8zM2E5g/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon" onClick={closeMobileMenu}><FaFacebookF /></a>
              <a href="https://www.instagram.com/prwebstock?igsh=MWs3em54aDl6NHNzcA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon" onClick={closeMobileMenu}><FaInstagram /></a>
              <a href="https://wa.me/917789801327" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon" onClick={closeMobileMenu}><FaWhatsapp /></a>
              <a href="https://www.linkedin.com/company/pr-webstock/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon" onClick={closeMobileMenu}><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Backdrop scrim */}
          <button className="drawer-scrim" onClick={closeMobileMenu} aria-hidden={!mobileMenuOpen} />
        </aside>
      </header>

      {portalNode ? ReactDOM.createPortal(panel, portalNode) : null}
    </>
  );
};

export default Navbar;