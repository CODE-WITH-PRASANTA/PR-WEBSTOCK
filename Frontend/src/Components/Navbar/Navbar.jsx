import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

// Icons
import { AiFillHeart } from "react-icons/ai";
import { FaUserCircle, FaShoppingCart,FaEnvelope,FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdCategory, MdLocalOffer } from "react-icons/md";
import { FaHome, FaBlog, FaFire } from "react-icons/fa";

import logo from "../../assets/PR WEBSTOCK.webp";
import image from "../../assets/PR WEBSTOCK.webp";

import "./Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [openCat, setOpenCat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("main"); // "main" or "categories"
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
        setActiveTab("main");
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
    setActiveTab("main");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Portal content for overlay + panel
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

          <div className="quote-info-logo">
            <img src={logo} alt="Logo" />
          </div>

          <p className="quote-info-desc">
            We provide fast & reliable quotes for temple decor, brass idols, handicrafts and more.
            Reach out anytime — we’re happy to help.
          </p>

          <h3 className="quote-info-title">Get In Touch</h3>

          <ul className="quote-info-list">
            <li>
              <span className="quote-info-icon"><FaEnvelope /></span>
              <div>
                <p className="muted">Email</p>
                <p>support@yourdomain.com</p>
              </div>
            </li>
            <li>
              <span className="quote-info-icon"><FaPhone /></span>
              <div>
                <p className="muted">Phone</p>
                <p>+91 98765 43210</p>
              </div>
            </li>
          </ul>

          <h3 className="quote-info-title">Latest News</h3>

          <div className="quote-news-list">
            <div className="quote-news-item">
              <img src={image} alt="news 1" />
              <div>
                <span className="quote-news-date">December 3, 2023</span>
                <p className="quote-news-text">A very warm welcome to our new Treasurer</p>
              </div>
            </div>

            <div className="quote-news-item">
              <img src={image} alt="news 2" />
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
          {/* --- TOP ROW: logo (left) + mobile icons (right) --- */}
          <div className="navbar-top-row">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={logo} alt="Brand Logo" />
            </Link>

            {/* mobile-only right bar (visible on smaller screens) */}
            <div className="navbar-right-bar navbar-right-bar--mobile">
              <button
                className="topbar-hamburger"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>

              <Link to="/wishlist" className="icon-link" aria-label="Wishlist">
                <AiFillHeart />
              </Link>
              <Link to="/account" className="icon-link" aria-label="Account">
                <FaUserCircle />
              </Link>
              <Link to="/cart" className="icon-link" aria-label="Cart">
                <FaShoppingCart />
              </Link>
            </div>
          </div>

          {/* --- SEARCH (center on desktop, below top-row on mobile) --- */}
          <form
            className="navbar-search"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("search:", query);
            }}
            role="search"
            aria-label="Site search"
          >
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" aria-label="Search button">
              <FiSearch />
            </button>
          </form>

          {/* --- Desktop-only right bar (placed in its own column on desktop) --- */}
          <div className="navbar-right-bar navbar-right-bar--desktop">
            <button
              className="topbar-hamburger"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/wishlist" className="icon-link" aria-label="Wishlist">
              <AiFillHeart />
            </Link>
            <Link to="/account" className="icon-link" aria-label="Account">
              <FaUserCircle />
            </Link>
            <Link to="/cart" className="icon-link" aria-label="Cart">
              <FaShoppingCart />
            </Link>
          </div>
        </div>

        <hr className="navbar-divider" />

        {/* BOTTOM NAV */}
        <div className="navbar-bottom navbar-container">
          {/* Category Button */}
          <button
            ref={catBtnRef}
            className={`navbar-category-btn ${openCat ? "open" : ""}`}
            onClick={() => setOpenCat(!openCat)}
            aria-haspopup="true"
            aria-expanded={openCat}
          >
            <FaBars /> &nbsp; Categories
          </button>

          {/* Links */}
          <nav className="navbar-links" aria-label="Primary">
            <Link to="/"><FaHome /> Home</Link>
            <Link to="/shop"><MdCategory /> Shop</Link>
            <Link to="/blog"><FaBlog /> Blog</Link>
            <Link to="/best-sellers"><FaFire /> Best Sellers</Link>
            <Link to="/sale"><MdLocalOffer /> Sale</Link>
            <Link to="/about"><FaUserCircle /> About</Link>
            <Link to="/contact"><AiFillHeart /> Contact</Link>
          </nav>

          {/* Quote Button */}
          <div className="quote-box-wrapper">
            <button
              className="quote-box-icon-btn"
              onClick={() => setOpenQuotePanel(true)}
              aria-label="Open info panel"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
                <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
                <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>

            <Link to="/get-quote" className="navbar-quote-btn">
              Get Free Quotes
            </Link>
          </div>
        </div>

        {/* CATEGORY DROPDOWN */}
        <div
          ref={dropdownRef}
          className={`navbar-category-dropdown ${openCat ? "show" : ""}`}
        >
          <ul>
            <li><a href="/category/statues">God Murtis</a></li>
            <li><a href="/category/pooja">Pooja Items</a></li>
            <li><a href="/category/brass">Brass Idols</a></li>
            <li><a href="/category/handicraft">Handicraft</a></li>
            <li><a href="/category/temple">Temple Decor</a></li>
            <li><a href="/category/jewelry">Spiritual Jewelry</a></li>
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

            <div className="drawer-search">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button aria-label="Search"><FiSearch /></button>
              </form>
            </div>

            {/* Tab Navigation */}
            <div className="drawer-tabs">
              <button
                className={`drawer-tab ${activeTab === "main" ? "active" : ""}`}
                onClick={() => handleTabClick("main")}
              >
                Main Menu
              </button>
              <button
                className={`drawer-tab ${activeTab === "categories" ? "active" : ""}`}
                onClick={() => handleTabClick("categories")}
              >
                Categories
              </button>
            </div>

            {/* Tab Content */}
            <div className="drawer-content">
              {/* Main Menu Content */}
              <div className={`drawer-tab-pane ${activeTab === "main" ? "active" : ""}`}>
                <nav className="drawer-links">
                  <Link to="/" onClick={closeMobileMenu}><FaHome /> Home</Link>
                  <Link to="/shop" onClick={closeMobileMenu}><MdCategory /> Shop</Link>
                  <Link to="/blog" onClick={closeMobileMenu}><FaBlog /> Blog</Link>
                  <Link to="/best-sellers" onClick={closeMobileMenu}><FaFire /> Best Sellers</Link>
                  <Link to="/sale" onClick={closeMobileMenu}><MdLocalOffer /> Sale</Link>
                  <Link to="/about" onClick={closeMobileMenu}><FaUserCircle /> About</Link>
                  <Link to="/contact" onClick={closeMobileMenu}><AiFillHeart /> Contact</Link>

                  <Link to="/get-quote" className="drawer-quote" onClick={closeMobileMenu}>Get Free Quotes</Link>
                </nav>
              </div>

              {/* Categories Content */}
              <div className={`drawer-tab-pane ${activeTab === "categories" ? "active" : ""}`}>
                <nav className="drawer-links">
                  <Link to="/category/statues" onClick={closeMobileMenu}>God Murtis</Link>
                  <Link to="/category/pooja" onClick={closeMobileMenu}>Pooja Items</Link>
                  <Link to="/category/brass" onClick={closeMobileMenu}>Brass Idols</Link>
                  <Link to="/category/handicraft" onClick={closeMobileMenu}>Handicraft</Link>
                  <Link to="/category/temple" onClick={closeMobileMenu}>Temple Decor</Link>
                  <Link to="/category/jewelry" onClick={closeMobileMenu}>Spiritual Jewelry</Link>

                  <Link to="/get-quote" className="drawer-quote" onClick={closeMobileMenu}>Get Free Quotes</Link>
                </nav>
              </div>
            </div>

            <div className="drawer-footer">
              <Link to="/wishlist" aria-label="Wishlist" onClick={closeMobileMenu}><AiFillHeart /></Link>
              <Link to="/account" aria-label="Account" onClick={closeMobileMenu}><FaUserCircle /></Link>
              <Link to="/cart" aria-label="Cart" onClick={closeMobileMenu}><FaShoppingCart /></Link>
            </div>
          </div>

          {/* scrim to close drawer when clicking outside (mobile) */}
          <button
            className="drawer-scrim"
            onClick={closeMobileMenu}
            aria-hidden={!mobileMenuOpen}
          />
        </aside>
      </header>

      {/* render the overlay + panel into document.body via portal for bulletproof stacking */}
      {portalNode ? ReactDOM.createPortal(panel, portalNode) : null}
    </>
  );
};

export default Navbar;
