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
    title: "Experienced Digital Marketing Team",
    desc: "PR WEBSTOCK brings years of expertise in digital marketing, helping businesses in Bhubaneswar and across Odisha build a strong online presence through effective social media strategies and audience-focused campaigns.",
    icon: ExpIcon,
    color: "#003F55",
  },
  {
    title: "Proven Campaign Success",
    desc: "We create and manage high-performing social media campaigns that improve brand visibility, increase engagement, and generate quality leads for businesses across multiple industries.",
    icon: CampaignIcon,
    color: "#FD4237",
  },
  {
    title: "Trusted by Growing Businesses",
    desc: "Our commitment to quality service, transparent communication, and measurable results has made PR WEBSTOCK a trusted digital marketing partner for businesses looking to grow online.",
    icon: RatingIcon,
    color: "#FF7176",
  },
  {
    title: "Results-Driven Marketing Solutions",
    desc: "Every campaign is designed with clear business goals in mind. We focus on increasing reach, improving customer engagement, and delivering real growth through strategic social media marketing.",
    icon: GuaranteeIcon,
    color: "#0B2E68",
  },
  {
    title: "Helping Businesses Grow Online",
    desc: "From local startups to established companies, we help businesses strengthen their digital presence, connect with the right audience, and build long-term brand value.",
    icon: GlobeIcon,
    color: "#1FA36A",
  },
  {
    title: "Creative & Strategic Approach",
    desc: "Our team combines creative content, audience insights, and data-driven strategies to deliver social media marketing solutions that support sustainable business growth.",
    icon: StrategyIcon,
    color: "#7227D5",
  },
];
  

  return (
    <div className="wm-section">
      <h1 className="wm-title">
  Why Choose PR WEBSTOCK For Social Media Marketing In Bhubaneswar?
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



