import React from 'react'
import seohero from "../../assets/seo-hero.mp4"
import './SeoHero.css';
const SeoHero = () => {
  return (
    <section className="video-container">
      <video
        className="video-element"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={seohero} type="video/mp4" />
      </video>

      <div className="video-content">
        <h1>
          SEO Company in Bhubaneswar that Delivers best Results
        </h1>

        <p>
          SEO is crucial in driving your website to a wider and organic audience. Webomindapps, as your trusted partner for all website needs, can make your website rank better through keyword research, on-page optimization, backlink building, and technical solutions.
        </p>

        <h2>12+ Years of experience | 100+projects completed | Trusted by clients | 4.8 google review</h2>

        <button className="cta-btn">
          Talk to our expert <span>↗</span>
        </button>
      </div>
    </section>
  )
}

export default SeoHero
