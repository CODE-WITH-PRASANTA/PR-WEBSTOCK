import React from 'react';
import './GooglePartner.css';
import partnerOld from '/src/assets/Google-Partner.webp'; // works in Vite always

export default function GooglePartner() {
  return (
    <div className="gp-container">
      <div className="gp-text-section">
        <h1 className="gp-title">Official Google partner agency</h1>
        <p className="gp-description">
          Google trusts us, and so can you! As an official Google Partner, we bring top-tier expertise, smarter ads, and
          better ROI for your business. Get smarter, data-driven marketing with a team recognized by Google itself!
        </p>
      </div>

      <div className="gp-image-section">
        <img src={partnerOld} alt="Old Google Partner Logo" className="gp-img old" />
        <div className="gp-arrow"></div>
      </div>
    </div>
  );
}
