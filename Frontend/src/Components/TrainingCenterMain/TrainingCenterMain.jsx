import React, { useState, useEffect } from "react";
import "./TrainingCenterMain.css";

// Assets imported directly from src/assets/
import heroBg1 from "../../assets/hero-bg5.png";
import heroBg2 from "../../assets/hero-bg52.png";
import heroArrow from "../../assets/hero-arrow5.png";
import heroScrollCenter from "../../assets/hero-scrool.png";
import aboutShape1 from "../../assets/about-shape51.png";
import aboutShape2 from "../../assets/about-shape52.png";
import aboutShape3 from "../../assets/about-shape53.png";
import aboutThumb from "../../assets/about-thumb5.png";

const SLIDES_DATA = [
  {
    id: 1,
    tag: "WELCOME TO EDULAX",
    title: "Unlock Career\nOpportunities with Our\nPrograms",
    bgImage: heroBg1,
  },
  {
    id: 2,
    tag: "WELCOME TO EDULAX",
    title: "Empowering Minds\nThrough Practical\nEducation",
    bgImage: heroBg2,
  },
  {
    id: 3,
    tag: "WELCOME TO EDULAX",
    title: "Transform Your Skills\nWith Modern Tech\nTraining",
    bgImage: heroBg1,
  },
];

const TrainingCenterMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const scrollToAbout = () => {
    const section = document.getElementById("TrainingCenterMain-about-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="TrainingCenterMain-wrapper">
      {/* ================= HERO SECTION ================= */}
      <section className="TrainingCenterMain-hero">
        {SLIDES_DATA.map((slide, idx) => (
          <div
            key={slide.id}
            className={`TrainingCenterMain-hero-bg ${
              currentSlide === idx ? "TrainingCenterMain-hero-bg-active" : ""
            }`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}

        <div className="TrainingCenterMain-hero-overlay" />

        {/* Left Side Numbers */}
        <div className="TrainingCenterMain-slider-nav">
          {SLIDES_DATA.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleSlideChange(idx)}
              className={`TrainingCenterMain-slider-btn ${
                currentSlide === idx ? "TrainingCenterMain-slider-btn-active" : ""
              }`}
            >
              <span>{`0${slide.id}`}</span>
            </button>
          ))}
        </div>

        {/* Center Animated Content */}
        <div className="TrainingCenterMain-hero-content" key={currentSlide}>
          <div className="TrainingCenterMain-hero-tag">
            {SLIDES_DATA[currentSlide].tag}
          </div>

          <h1 className="TrainingCenterMain-hero-title">
            {SLIDES_DATA[currentSlide].title}
          </h1>

          <div className="TrainingCenterMain-hero-actions">
            <button className="TrainingCenterMain-btn-primary">
              <span className="TrainingCenterMain-btn-text">GET STARTED &rarr;</span>
            </button>

            <a href="#find-course" className="TrainingCenterMain-btn-link">
              FIND COURSE &rarr;
            </a>

            <div className="TrainingCenterMain-arrow-pointer">
              <img
                src={heroArrow}
                alt="Green Arrow"
                className="TrainingCenterMain-arrow-img"
              />
            </div>
          </div>
        </div>

        {/* Smooth Transition Curve */}
        <div className="TrainingCenterMain-curved-transition">
          <svg
            className="TrainingCenterMain-curve-svg"
            viewBox="0 0 1440 180"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,180 L0,120 Q720,-30 1440,120 L1440,180 Z"
              fill="#ffffff"
            />
          </svg>

          {/* Centered Rotating Scroll Badge */}
          <div className="TrainingCenterMain-scroll-badge" onClick={scrollToAbout}>
            <svg
              className="TrainingCenterMain-rotating-text"
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="TrainingCenterMain-circle-path"
                  d="M 100, 100 m -68, 0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
                />
              </defs>
              <text fontSize="14" fontWeight="600" letterSpacing="3.5">
                <textPath href="#TrainingCenterMain-circle-path">
                  SCROLL DOUN HERE ••• SCROLL DOWN HERE •••
                </textPath>
              </text>
            </svg>

            <div className="TrainingCenterMain-mouse-pill">
              <img
                src={heroScrollCenter}
                alt="Scroll center icon"
                className="TrainingCenterMain-scrool-center-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section
        className="TrainingCenterMain-about"
        id="TrainingCenterMain-about-section"
      >
        {/* Top-Right Decorative Line (about-shape51.png) */}
        <div className="TrainingCenterMain-wave-shape">
          <img
            src={aboutShape1}
            alt="Wave Decor"
            className="TrainingCenterMain-wave-img"
          />
        </div>

        <div className="TrainingCenterMain-container">
          <div className="TrainingCenterMain-grid">
            {/* Left Image Section */}
            <div className="TrainingCenterMain-image-col">
              <div className="TrainingCenterMain-blob-bg">
                <img src={aboutShape2} alt="Background Blob" />
              </div>

              <div className="TrainingCenterMain-main-img-wrapper">
                <img
                  src={aboutThumb}
                  alt="Training Session"
                  className="TrainingCenterMain-main-img"
                />
              </div>

              {/* Floating Contact Card */}
              <div className="TrainingCenterMain-call-card">
                <div className="TrainingCenterMain-call-icon-wrap">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="TrainingCenterMain-call-info">
                  <span className="TrainingCenterMain-call-label">Call Us:</span>
                  <span className="TrainingCenterMain-call-number">+88089335473</span>
                </div>
              </div>
            </div>

            {/* Right Information Section */}
            <div className="TrainingCenterMain-content-col">
              <div className="TrainingCenterMain-section-badge">
                <span className="TrainingCenterMain-badge-dot" />
                ABOUT OUR PLATFORM
              </div>

              <h2 className="TrainingCenterMain-heading">
                An Affordable Education Training Center
              </h2>

              <p className="TrainingCenterMain-description">
                Combining a rich history cutting-edge technology this fostering
                academic and personal Conveniently architect meta-services through
                whiteboard world-class
              </p>

              <ul className="TrainingCenterMain-features">
                <li>
                  <div className="TrainingCenterMain-check-icon">&#10003;</div>
                  <span>Expert Teacher</span>
                </li>
                <li>
                  <div className="TrainingCenterMain-check-icon">&#10003;</div>
                  <span>Educational Psychology</span>
                </li>
                <li>
                  <div className="TrainingCenterMain-check-icon">&#10003;</div>
                  <span>Lifelong Learning</span>
                </li>
              </ul>

              <div className="TrainingCenterMain-about-actions">
                <button className="TrainingCenterMain-btn-primary">
                  <span className="TrainingCenterMain-btn-text">GET STARTED &rarr;</span>
                </button>
              </div>

              {/* 3D Student Character */}
              <div className="TrainingCenterMain-hanging-illustration">
                <img
                  src={aboutShape3}
                  alt="Student Mascot"
                  className="TrainingCenterMain-char-img"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="TrainingCenterMain-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          &#94;
        </button>
      </section>
    </div>
  );
};

export default TrainingCenterMain;