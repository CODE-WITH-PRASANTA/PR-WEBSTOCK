import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/PR-WEB-LOGO.png";
import "./Navbar.css";

const Navbar = () => {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // Close dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  // Handle click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesDropdownOpen]);

  // Lock scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const servicesList = [
    { name: "Web Development", path: "/services/web-development" },
    { name: "App Development", path: "/services/app-development" },
    { name: "Social Media Management", path: "/services/socialmedia-management" },
    { name: "SEO", path: "/services/seo" },
    { name: "Digital Marketing", path: "/services/digital-marketing" },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo-container">
          <img src={logo} alt="PR Webstock Logo" className="navbar-logo-img" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <Link to="/" className="navbar-nav-link">Home</Link>
          <Link to="/about" className="navbar-nav-link">About</Link>
          <Link to="/industry-work" className="navbar-nav-link">Industry Work</Link>
          <Link to="/project" className="navbar-nav-link">Project</Link>
          <Link to="/career" className="navbar-nav-link">Career</Link>
          <Link to="/blog" className="navbar-nav-link">Blog</Link>
          <Link to="/contact" className="navbar-nav-link">Contact</Link>
        </nav>

        {/* DESKTOP SERVICES BUTTON + CTA */}
        <div className="navbar-actions">
          {/* Main Desktop Services Button Trigger */}
          <div className="navbar-dropdown-wrapper">
            <button
              ref={buttonRef}
              className={`navbar-services-toggle-btn ${servicesDropdownOpen ? "active" : ""}`}
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              aria-expanded={servicesDropdownOpen}
            >
              <FaBars className="navbar-services-bars-icon" /> Services
            </button>

            {/* Desktop Dropdown Panel */}
            {servicesDropdownOpen && (
              <ul ref={dropdownRef} className="navbar-dropdown-menu">
                {servicesList.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path} className="navbar-dropdown-item">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/get-quote" className="navbar-cta-btn">
            Get Free Demo
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE DRAWER SIDEBAR */}
      <div className={`navbar-mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}>
        {/* Scrim Overlay */}
        <div className="navbar-drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
        
        <div className="navbar-drawer-content">
          <div className="navbar-drawer-header">
            <img src={logo} alt="PR Webstock Logo" className="navbar-drawer-logo" />
            <button className="navbar-drawer-close" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <nav className="navbar-drawer-nav">
            <Link to="/" className="navbar-drawer-link">Home</Link>
            <Link to="/about" className="navbar-drawer-link">About</Link>
            
            {/* Mobile Collapsible Services Accordion */}
            <div className="navbar-drawer-accordion">
              <button 
                className={`navbar-drawer-accordion-btn ${mobileServicesOpen ? "is-expanded" : ""}`}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services <FaChevronDown className="navbar-accordion-chevron" />
              </button>
              <div className={`navbar-drawer-accordion-panel ${mobileServicesOpen ? "is-open" : ""}`}>
                {servicesList.map((service, index) => (
                  <Link key={index} to={service.path} className="navbar-drawer-accordion-link">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/industry-work" className="navbar-drawer-link">Industry Work</Link>
            <Link to="/project" className="navbar-drawer-link">Project</Link>
            <Link to="/career" className="navbar-drawer-link">Career</Link>
            <Link to="/blog" className="navbar-drawer-link">Blog</Link>
            <Link to="/contact" className="navbar-drawer-link">Contact</Link>
          </nav>

          <div className="navbar-drawer-footer">
            <Link to="/get-quote" className="navbar-drawer-cta">
              Get Free Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;