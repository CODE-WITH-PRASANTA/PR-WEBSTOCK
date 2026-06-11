import React from "react";
import "./Webomind.css";

// Imported WebP icons you provided
import ExpIcon from "../../assets/12-years.webp";
import CampaignIcon from "../../assets/successful-campaigns.webp";
import RatingIcon from "../../assets/5.webp";
import GuaranteeIcon from "../../assets/SOCIAL-VALIDATION-AND-TESTIMONIALS.webp";
import GlobeIcon from "../../assets/Serving-countries.webp";
import StrategyIcon from "../../assets/Strategic-creative.webp";

const Webomind = () => {
  const items = [
    {
      title: "12+ years of experience in digital marketing",
      desc: "Over the past 12+ years, our team of digital marketing experts has been supporting brands in building a strong digital presence. We understand what works and how to stay ahead in a constantly changing digital space.",
      icon: ExpIcon,
      color: "#003F55",
    },
    {
      title: "2000+ successful campaigns",
      desc: "With more than 2000+ campaigns delivered successfully across different platforms and industries, we help you increase engagement, boost visibility, and deliver real, impactful results.",
      icon: CampaignIcon,
      color: "#FD4237",
    },
    {
      title: "Google rating 4.9, on clutch & goodfirms 5/5",
      desc: "Our high performing websites and reliable support post-development have earned us 4.8★ Google rating and 5★ Reviews on Clutch and GoodFirms.",
      icon: RatingIcon,
      color: "#FF7176",
    },
    {
      title: "100% satisfaction guarantee",
      desc: "We’re committed to your success. Our 100% satisfaction guarantee assures you get the value and performance you expect every single time.",
      icon: GuaranteeIcon,
      color: "#0B2E68",
    },
    {
      title: "Serving 25+ countries",
      desc: "From local startups to global brands, we’ve delivered results to clients across 25+ countries, making us a trusted social media marketing agency in Bangalore with global reach.",
      icon: GlobeIcon,
      color: "#1FA36A",
    },
    {
      title: "Strategic, creative, and performance-focused approach",
      desc: "Our social media marketing services are built to meet the requirements of your brand, using the right combination of strategy, content, and data insights.",
      icon: StrategyIcon,
      color: "#7227D5",
    },
  ];

  return (
    <div className="wm-section">
      <h1 className="wm-title">
        Why choose PR WEBSTOCK for social media marketing in bangalore?
      </h1>

      <div className="wm-grid">
        {items.map((box, index) => (
          <div className="wm-card" key={index}>
            <img src={box.icon} alt="icon" className="wm-icon" />
            <h2 className="wm-card-title">{box.title}</h2>
            <p className="wm-card-desc">{box.desc}</p>

            {/* Right pagination color bar */}
            <span
              className="wm-tab"
              style={{ backgroundColor: box.color }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webomind;



