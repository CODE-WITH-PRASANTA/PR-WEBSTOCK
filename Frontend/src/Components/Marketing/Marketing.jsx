import React from "react";
import "./Marketing.css";

import HeroImg from "../../assets/Why-social-media-marketing.webp";

const Marketing = () => {
  return (
    <section className="sm-wrapper">
      <div className="sm-content">
        {/* Heading */}
        <h1 className="sm-heading">
          Why Social Media Marketing Matters
          <br />
          For Modern Businesses
        </h1>

        {/* Hero Image */}
        <div className="hero-section">
          <img
            src={HeroImg}
            alt="Social Media Marketing Services in Bhubaneswar"
          />
        </div>

        {/* Description */}
       <div className="desc-card">
  <p>
    Social media has become one of the most effective ways for businesses to
    connect with customers, build trust, and increase brand visibility. A
    strong presence on platforms like Facebook, Instagram, LinkedIn, and
    YouTube helps businesses reach the right audience and stay ahead of the
    competition.
  </p>

  <p>
    At <strong>PR WEBSTOCK</strong>, we provide professional Social Media
    Marketing Services in Bhubaneswar, Odisha, helping businesses grow their
    online presence through engaging content, targeted campaigns, and
    result-driven strategies. Our goal is to increase brand awareness,
    generate quality leads, and drive long-term business growth.
  </p>
</div>
      </div>
    </section>
  );
};

export default Marketing;