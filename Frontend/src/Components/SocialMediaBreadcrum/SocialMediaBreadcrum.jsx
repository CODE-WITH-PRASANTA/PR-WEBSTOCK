import React from "react";
import "./SocialMediaBreadcrum.css";

// Import your video + right image
import BannerVideo from "../../assets/WzIUjmVFMFgF.mp4";

export default function SocialBreadcrumb() {
  return (
    <section className="smm-hero">

      {/* Background Video */}
      <video className="smm-video" autoPlay muted loop playsInline>
        <source src={BannerVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="smm-overlay"></div>

      {/* Content Wrapper */}
      <div className="smm-content-wrapper">

        {/* LEFT CONTENT */}
        <div className="smm-left">
          <h1>
            Best social media marketing <br />
            company in Bangalore to build your <br />
            brand online
          </h1>

          <p className="smm-desc">
            Webomindapps – Your Trusted Social Media Partner.
            From startups to global brands, Webomindapps has delivered 2000+
            projects across 25+ countries, helping your brand grow,
            engage, and lead online. Ready to be the next?
          </p>

          <a href="#" className="smm-expert-btn">
            Talk to our experts <span>↗</span>
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="smm-right">
        </div>

      </div>
    </section>
  );
}
