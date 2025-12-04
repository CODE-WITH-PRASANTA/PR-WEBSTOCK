import React from "react";
import "./Herosection.css";
import GoogleLogo from '../../assets/google.webp'

const rotatingText = "S T R A T E G Y  •  D E S I G N  •  S C A L E  •  ";

const HeroSection = () => {
  return (
    <section className="hero" role="region" aria-label="Hero - Empowering your brand">

      {/* ========== CENTER ROTATING RING + PLAY BUTTON ========== */}
      <div className="video-area" aria-hidden="false">
        <div className="badge-ring" aria-hidden="true">
          {rotatingText.split("").map((char, i) => (
            <span
              key={i}
              className="badge_char"
              style={{ "--char-rotate": `${i * (360 / rotatingText.length)}deg` }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="play-wrap">
          <button className="play-btn" aria-label="Play video">
            {/* You can replace this with an inline SVG or image if you prefer */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5z" fill="#444" />
            </svg>
          </button>
        </div>
      </div>

      {/* ========== LEFT CONTENT (1fr) ========== */}
      <div className="hero-left">
        <div className="badge">✨ EXPERTISE YOU CAN TRUST</div>

        <h1 className="hero-title">
          Empowering your brand in <br /> the digital universe
        </h1>

        <p className="hero-desc">
          Join us as we carve a path to success, driven by passion, powered by
          innovation, and fueled by the collective spirit of our team. We
          believe in the power of bold ideas—and we're here to turn them into
          reality.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" aria-label="Free Consultation">
            Free Consultation
          </button>

          {/* Google review card */}
          <div className="google-review" aria-label="Google review">
            <div className="gr-top">
              <span className="gr-label">Review On</span>
              <div className="gr-stars" aria-hidden="true">★★★★★</div>
            </div>

            <div className="gr-main">
              <img
                src={GoogleLogo}
                alt="Google logo"
                className="gr-logo"
                loading="lazy"
              />
              <div className="gr-meta">
                
                <div className="gr-count">(50 reviews)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== RIGHT IMAGE (1fr) ========== */}
      <div className="hero-right" aria-hidden="true">
        <img
          src="https://zenfy-next-js.vercel.app/assets/img/home1/banner-img1.jpg"
          alt="Office workspace"
          className="hero-image"
          loading="eager"
        />
        <div className="decor-circle" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HeroSection;
