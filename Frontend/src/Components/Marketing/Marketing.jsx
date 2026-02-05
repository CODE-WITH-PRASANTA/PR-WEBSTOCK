import React from "react";
import "./Marketing.css";
import HeroImg from "../../assets/Why-social-media-marketing.webp";

const Marketing = () => {
  return (
    <div className="sm-wrapper">

      {/* LEFT GRAPHIC (CIRCLE + DOT + LINE) */}
      <div className="left-graphic">
        <div className="circle"></div>
        <div className="dot"></div>
        <div className="line"></div>
      </div>

      {/* HEADING */}
      <h1 className="sm-heading">
        Why social media marketing <br /> matters for a business
      </h1>

      {/* HERO IMAGE */}
      <div className="hero-section">
        <img src={HeroImg} alt="Marketing hero" />
      </div>

      {/* DESCRIPTION */}
      <div className="desc-card">
        <p>
          Today, social media is much more than a place to share photos or updates; 
          it’s a powerful tool for business. With over 4.9 billion users worldwide 
          and 90% of them following brands, it’s the perfect place to connect with 
          your audience. Social media helps you build trust, attract more people 
          to your website, and grow your brand online.
        </p>

        <p>
          As a leading social media marketing company in Bangalore, 
          <span className="highlight"> WebomindApps </span> helps you create smart 
          and creative strategies to increase your brand visibility, boost engagement, 
          and turn followers into loyal customers.
        </p>
      </div>
    </div>
  );
};

export default Marketing;



