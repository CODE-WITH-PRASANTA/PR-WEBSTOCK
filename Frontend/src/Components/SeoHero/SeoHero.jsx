import React from 'react';
import seohero from "../../assets/seo-hero.mp4";
import "./SeoHero.css";

const SeoHero = () => {
  return (
    <section className="SeoHero-video-container">
      <video
        className="SeoHero-video-element"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={seohero} type="video/mp4" />
      </video>

      <div className="SeoHero-video-content">
        <h1>
          SEO Company in Bhubaneswar That Delivers Real Results
        </h1>

        <p>
          PR WEBSTOCK is a trusted SEO company in Bhubaneswar, Odisha,
          helping businesses improve Google rankings, increase organic traffic,
          and generate quality leads. Our SEO experts create customized
          strategies that help your website grow and attract more customers.
        </p>

        <h2>
          12+ Years Experience | 100+ Projects Delivered | Trusted Across
          Bhubaneswar, Odisha
        </h2>

        <button className="cta-btn">
          Talk to Our Experts <span>↗</span>
        </button>
      </div>
    </section>
  );
};

export default SeoHero;