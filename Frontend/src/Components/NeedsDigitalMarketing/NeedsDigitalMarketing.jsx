import React from "react";
import "./NeedsDigitalMarketing.css";
import {
  FaDollarSign,
  FaGlobe,
  FaDice,
  FaCogs,
} from "react-icons/fa";

const DigitalMarketing = () => {
  return (
    <section className="dm-section">
      <h2 className="dm-title">Why Your Business Needs Digital Marketing</h2>

      <div className="dm-cards">
        <div className="dm-card">
          <FaDollarSign className="dm-icon" />
          <h3>Cost-effective marketing</h3>
          <p>
            In digital marketing, you decide how much you spend, reach people
            who are more likely to buy your product, and track results in real
            time. This makes digital marketing cost-effective.
          </p>
        </div>

        <div className="dm-card">
          <FaGlobe className="dm-icon" />
          <h3>Outgrow reach</h3>
          <p>
            Digital marketing allows your brand to reach customers globally
            without stores. You can attract the right audience using SEO,
            social media, and paid ads.
          </p>
        </div>

        <div className="dm-card">
          <FaDice className="dm-icon" />
          <h3>Unlocking PR possibilities</h3>
          <p>
            Digital marketing helps build credibility, tell your brand story,
            and engage with media and influencers online.
          </p>
        </div>

        <div className="dm-card">
          <FaCogs className="dm-icon" />
          <h3>Multimedia integration</h3>
          <p>
            Share text, images, videos, and podcasts across multiple platforms
            to increase engagement and brand recall.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketing;
