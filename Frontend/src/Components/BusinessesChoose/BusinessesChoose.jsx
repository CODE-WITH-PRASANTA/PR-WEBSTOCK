import React from "react";
import "./BusinessesChoose.css";

import {
  FaChartLine,
  FaTrophy,
  FaGlobeAsia,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";

const BusinessesChoose = () => {
  const items = [
    {
      icon: <FaChartLine />,
      title: "Performance-Driven Marketing Strategies",
      desc:
        "PR WEBSTOCK focuses on data-driven digital marketing strategies that help businesses in Bhubaneswar improve online visibility, generate qualified leads, and achieve sustainable business growth.",
    },
    {
      icon: <FaTrophy />,
      title: "Compete With Industry Leaders",
      desc:
        "Our SEO, Google Ads, social media marketing, and content strategies help businesses strengthen their digital presence and compete effectively within their industry.",
    },
    {
      icon: <FaGlobeAsia />,
      title: "Grow Your Brand Presence",
      desc:
        "We help businesses expand their reach through local SEO, digital advertising, and online marketing campaigns designed to attract customers from both local and wider markets.",
    },
    {
      icon: <FaShoppingCart />,
      title: "Increase Leads & Conversions",
      desc:
        "From website optimization to targeted marketing campaigns, we focus on improving user engagement and converting visitors into valuable customers.",
    },
    {
      icon: <FaUsers />,
      title: "Dedicated Digital Marketing Team",
      desc:
        "Our experienced team provides end-to-end digital marketing support, including SEO, PPC, social media marketing, content creation, and performance analysis.",
    },
  ];

  return (
    <section className="why-section">
      <h2 className="why-title">
        Why Businesses Choose PR WEBSTOCK In Bhubaneswar
      </h2>

      <div className="why-grid">
        {items.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">
              {item.icon}
            </div>

            <h3 className="why-card-title">
              {item.title}
            </h3>

            <p className="why-desc">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessesChoose;