import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// Icons (React Icons)
import { AiFillHeart } from "react-icons/ai";
import {
  FaUserCircle,
  FaShoppingCart,
  FaEnvelope,
  FaPhone,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdCategory, MdLocalOffer } from "react-icons/md";
import { FaHome, FaBlog, FaFire } from "react-icons/fa";

import logo from "../../assets/PR WEBSTOCK.webp";
// use the uploaded file path provided in conversation
const uploadedImagePath = "/mnt/data/457bd679-da27-477c-9f1d-af23a1543f78.png";

import "./Navbar.css";

const Navbar = () => {
  const [openCat, setOpenCat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Lock body scroll when mobile menu OR quote panel open
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

  // Close mobile menu on resize > breakpoint
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
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
          <img src={logo} alt="Logo" />
        </div>

        {/* Description */}
        <p className="quote-info-desc">
          We provide fast & reliable quotes for temple decor, brass idols, handicrafts, pooja items and more.
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
              <p>+91 63725 45244</p>
            </div>
          </li>
        </ul>

        {/* Blog Section */}
        <h3 className="quote-info-title">Latest Blog</h3>

        <div className="quote-news-list">
          <div className="quote-news-item">
            <img src={uploadedImagePath} alt="blog-1" />
            <div>
              <span className="quote-news-date">December 3, 2023</span>
              <p className="quote-news-text">A very warm welcome to our new Treasurer</p>
            </div>
          </div>

          <div className="quote-news-item">
            <img src={uploadedImagePath} alt="blog-2" />
            <div>
              <span className="quote-news-date">February 15, 2023</span>
              <p className="quote-news-text">German kinder and garten mean child</p>
            </div>
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
              <img src={logo} alt="Brand Logo" />
            </Link>

            {/* mobile-only right bar (icons + mobile socials) */}
            <div className="navbar-right-bar navbar-right-bar--mobile">
              <button
                className="topbar-hamburger"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* mobile social icons (visible on small screens) */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/916372545244"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div
            className="navbar-contact"
            role="region"
            aria-label="Contact information"
            data-uploaded-img={uploadedImagePath}
          >
            <a
              className="contact-item contact-phone"
              href="tel:+916372545244"
              aria-label="Call +91-6372-545-244"
            >
              <FaPhone className="contact-svg" aria-hidden="true" style={{ transform: "rotate(90deg)" }} />
              <span className="contact-text">+91-6372 545 244</span>
            </a>

            <a
              className="contact-item contact-email"
              href="mailto:prwebstock.com@gmail.com"
              aria-label="Email prwebstock.com at gmail"
            >
              <FaEnvelope className="contact-svg" aria-hidden="true" />
              <span className="contact-text">prwebstock.com@gmail.com</span>
            </a>

            <div className="contact-item contact-location" aria-label="Office location">
              <FaMapMarkerAlt className="contact-svg" aria-hidden="true" />
              <address className="contact-text">#721 , Nexus Esplanade , Bhubaneswar</address>
            </div>
          </div>

          {/* Desktop-only Social Media Bar */}
          <div className="navbar-right-bar navbar-right-bar--desktop social-bar">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-icon"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/916372545244"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="social-icon"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-icon"
            >
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
            <Link to="/product"> Industry Work</Link>
            <Link to="/pricing"> Pricing</Link>
            <Link to="/career">Career</Link>
            <Link to="/sale">Blog</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Restore Get Free Demo button for desktop (hidden on mobile by CSS) */}
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

            {/* THIS is the Get Free Demo button visible on desktop/laptop */}
            <Link to="/get-quote" className="navbar-quote-btn">
              Get Free Demo
            </Link>
          </div>
        </div>

        {/* CATEGORY DROPDOWN */}
        <div ref={dropdownRef} className={`navbar-category-dropdown ${openCat ? "show" : ""}`}>
          <ul>
            <li><a href="/services/web-development">Web Development</a></li>
            <li><a href="/services/app-development">App Development</a></li>
            <li><a href="/services/crm">CRM Software</a></li>
            <li><a href="/services/seo">Seo</a></li>
            <li><a href="/services/digital-marketing">Digital Marketing</a></li>
            
          </ul>
        </div>

        {/* MOBILE SIDEDRAWER */}
        <aside className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`} aria-hidden={!mobileMenuOpen}>
          <div className="drawer-inner">
            <div className="drawer-top">
              <Link to="/" onClick={closeMobileMenu} className="drawer-logo">
                <img src={logo} alt="Logo" />
              </Link>
              <button className="drawer-close" onClick={closeMobileMenu} aria-label="Close menu"><FaTimes /></button>
            </div>

            {/* Mobile drawer: direct nav links (no tabs, no "Main" text) */}
            <nav className="drawer-links" style={{ marginTop: 12 }}>
              <Link to="/" onClick={closeMobileMenu}> Home</Link>
              <Link to="/about" onClick={closeMobileMenu}> About</Link>
              <Link to="/industry-work" onClick={closeMobileMenu}> Industry Work</Link>
              <Link to="/pricing" onClick={closeMobileMenu}> Pricing</Link>
              <Link to="/career" onClick={closeMobileMenu}> Career</Link>
              <Link to="/sale" onClick={closeMobileMenu}> Blog</Link>
              <Link to="/contact" onClick={closeMobileMenu}> Contact</Link>
            </nav>

            {/* social icons with stagger animation */}
            <div className="drawer-footer drawer-footer--social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon" onClick={closeMobileMenu}><FaFacebookF /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon" onClick={closeMobileMenu}><FaInstagram /></a>
              <a href="https://wa.me/916372545244" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon" onClick={closeMobileMenu}><FaWhatsapp /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon" onClick={closeMobileMenu}><FaLinkedinIn /></a>
            </div>
          </div>

          {/* scrim to close drawer when clicking outside (mobile) */}
          <button className="drawer-scrim" onClick={closeMobileMenu} aria-hidden={!mobileMenuOpen} />
        </aside>
      </header>

      {portalNode ? ReactDOM.createPortal(panel, portalNode) : null}
    </>
  );
};

export default Navbar;
