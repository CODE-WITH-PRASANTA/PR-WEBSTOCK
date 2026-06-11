import React from "react";
import "./DigitalMarketingService.css";
import {
  FaSearch,
  FaMousePointer,
  FaChartLine,
  FaBullhorn,
  FaPenNib,
  FaEnvelope,
  FaShoppingCart,
  FaMobileAlt,
  FaVideo,
} from "react-icons/fa";

const services = [
  {
    title: "SEARCH ENGINE OPTIMIZATION (SEO)",
    desc: "We improve your website rankings on search engines to attract organic traffic and build credibility.",
    icon: <FaSearch />,
    color: "#0b3c49",
  },
  {
    title: "PAY PER CLICK (PPC)",
    desc: "Targeted PPC campaigns to put your brand in front of the right audience with maximum ROI.",
    icon: <FaMousePointer />,
    color: "#e63946",
  },
  {
    title: "SOCIAL MEDIA MARKETING",
    desc: "Engage your audience across social platforms and convert followers into customers.",
    icon: <FaChartLine />,
    color: "#ff006e",
  },
  {
    title: "BRAND PROMOTION",
    desc: "Build brand awareness and trust with strategic promotional campaigns.",
    icon: <FaBullhorn />,
    color: "#6a4c93",
  },
  {
    title: "CONTENT MARKETING",
    desc: "High-quality content that strengthens your brand authority.",
    icon: <FaPenNib />,
    color: "#2a9d8f",
  },
  {
    title: "EMAIL MARKETING",
    desc: "Personalized email campaigns to nurture leads and increase conversions.",
    icon: <FaEnvelope />,
    color: "#264653",
  },
  {
    title: "E-COMMERCE MARKETING",
    desc: "Optimized strategies to drive traffic and boost online sales.",
    icon: <FaShoppingCart />,
    color: "#ff7a00",
  },
  {
    title: "MOBILE MARKETING",
    desc: "Reach users effectively through mobile-first campaigns.",
    icon: <FaMobileAlt />,
    color: "#8338ec",
  },
  {
    title: "VIDEO MARKETING",
    desc: "Engaging videos that capture attention and improve brand recall.",
    icon: <FaVideo />,
    color: "#3a86ff",
  },
];

const DigitalMarketingServices = () => {
  return (
    <section className="dmm-services">
      <h2 className="dmm-title">Digital marketing services we offer</h2>

      <div className="dmm-grid">
        {services.map((item, index) => (
          <div
            className="dmm-card"
            key={index}
            style={{ "--accent": item.color }}
          >
            <span className="dmm-bar"></span>

            <div className="dmm-icon">{item.icon}</div>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalMarketingServices;
