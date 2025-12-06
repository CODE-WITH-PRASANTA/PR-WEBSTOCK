import React from "react";
import "./Herosection.css";
import GoogleLogo from '../../assets/google.webp'

const rotatingText = "S T R A T E G Y  •  D E S I G N  •  B U I L D  •  ";

const HeroSection = () => {
  return (
    <section className="herosec" role="region" aria-label="Hero - Digital Growth Solutions">

      {/* Rotating Badge */}
      <div className="video-area" aria-hidden="false">
        <div className="hero-badge-ring">
          {rotatingText.split("").map((char, i) => (
            <span
              key={i}
              className="hero-badge_char"
              style={{ "--char-rotate": `${i * (360 / rotatingText.length)}deg` }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="play-wrap">
          <button className="play-btn" aria-label="Play intro video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="#444" />
            </svg>
          </button>
        </div>
      </div>

      {/* Left Content */}
      <div className="hero-left">
        <div className="herosec-badge">✨ EXPERTISE YOU CAN TRUST</div>

        <h1 className="hero-sec-title">
          Empowering Startups & Businesses with<br />
          High-Performance Websites, Apps & Digital Growth Solutions
        </h1>

        <p className="hero-desc">
          At PR WEBSTOCK, we help startups and growing businesses build a powerful 
          digital presence with world-class Website Development, Mobile Applications, 
          CRM Solutions, SEO, Digital Marketing, and Social Media Management.  
          Our mission is to turn ideas into impactful digital products with 
          strategy-driven design, modern technology, and 24/7 dedicated support.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" aria-label="Free Consultation">
            Free Consultation
          </button>

          {/* Updated Google Review Card */}
         <div 
            className="google-review-card"
            aria-label="Google customer reviews"
            onClick={() => window.open("https://share.google/g1EaGINZXjs9j8qaO", "_blank")}
          >
            <div className="gr-header">
              <span className="gr-title">Trusted by Businesses</span>
              <span className="gr-stars">★★★★★</span>
            </div>

            <div className="gr-body">
              <img
                src={GoogleLogo}
                alt="Google rating badge"
                className="gr-logo"
                loading="lazy"
              />
              <div className="gr-info">
                <span className="gr-count">50+ Verified Google Reviews</span>
                <span className="gr-link">View on Google →</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Image */}
      <div className="hero-right">
        <img
          src="https://zenfy-next-js.vercel.app/assets/img/home1/banner-img1.jpg"
          alt="Digital workspace environment"
          className="herosec-img"
          loading="eager"
        />
        <div className="decor-circle" />
      </div>

    </section>

  );
};

export default HeroSection;
