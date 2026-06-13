import React, { useState, useEffect } from "react";
import "./Ourservice.css";

import icon1 from "../../assets/1.webp";
import icon2 from "../../assets/2.webp";
import icon3 from "../../assets/3.webp";
import icon4 from "../../assets/4.webp";
import icon5 from "../../assets/5n.webp";
import icon6 from "../../assets/6.webp";
import icon7 from "../../assets/7.webp";
import icon8 from "../../assets/8.webp";

export default function Ourservice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1);
      } else {
        setCardsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    {
      icon: icon1,
      title: "Social Media Strategy",
      desc: "PR WEBSTOCK develops customized social media strategies that help businesses in Bhubaneswar increase brand visibility and customer engagement.",
    },
    {
      icon: icon2,
      title: "Content Creation",
      desc: "We create engaging graphics, videos, and social media content that strengthen your brand identity and attract your target audience.",
    },
    {
      icon: icon3,
      title: "Facebook & Instagram Ads",
      desc: "Generate quality leads and increase conversions through highly targeted advertising campaigns across Meta platforms.",
    },
    {
      icon: icon4,
      title: "LinkedIn Marketing",
      desc: "Build professional credibility and generate valuable B2B leads with strategic LinkedIn marketing campaigns.",
    },
    {
      icon: icon5,
      title: "Profile Optimization",
      desc: "Improve your social media presence with professionally optimized profiles, branding, and audience-focused presentation.",
    },
    {
      icon: icon6,
      title: "Community Management",
      desc: "Strengthen customer relationships through active engagement, comment management, and audience interaction.",
    },
    {
      icon: icon7,
      title: "Influencer Marketing",
      desc: "Expand your reach and build trust through strategic collaborations with relevant influencers in your industry.",
    },
    {
      icon: icon8,
      title: "Analytics & Reporting",
      desc: "Monitor campaign performance with detailed reports and actionable insights to improve marketing ROI.",
    },
  ];

  const totalPages = Math.ceil(data.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = data.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="ss-wrapper">
      <div className="ss-header">
        <h1 className="ss-heading">
          Social Media Marketing Services in Bhubaneswar
        </h1>

        <p className="ss-subheading">
          PR WEBSTOCK helps businesses in Odisha grow online through strategic
          social media marketing, creative content, and performance-driven
          campaigns.
        </p>
      </div>

      <div className="ss-grid">
        {currentCards.map((item, index) => (
          <div className="ss-card" key={index}>
            <img src={item.icon} alt={item.title} className="ss-icon" />

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="ss-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          →
        </button>
      </div>
    </section>
  );
}