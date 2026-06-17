import React from 'react';
import './GooglePartner.css';
import partnerOld from '/src/assets/Google-Partner.webp'; // works in Vite always

export default function GooglePartner() {
  return (
    <div className="gp-container">
      <div className="gp-text-section">
  <h1 className="gp-title">
    Google Partner Digital Marketing Agency In Bhubaneswar
  </h1>

  <p className="gp-description">
    PR WEBSTOCK helps businesses grow through strategic digital marketing,
    Google Ads management, and performance-driven advertising campaigns. As a
    trusted Google Partner agency, we provide expert solutions designed to
    increase brand visibility, drive targeted traffic, generate qualified
    leads, and support long-term business growth in Bhubaneswar, Odisha, and
    beyond.
  </p>
</div>

      <div className="gp-image-section">
        <img src={partnerOld} alt="Old Google Partner Logo" className="gp-img old" />
        <div className="gp-arrow"></div>
      </div>
    </div>
  );
}
