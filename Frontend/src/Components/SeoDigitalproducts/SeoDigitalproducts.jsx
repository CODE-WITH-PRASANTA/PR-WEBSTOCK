import React, { useState } from "react";
import "./SeoDigitalproducts.css";

import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";
import img3 from "../../assets/img3.svg";
import img4 from "../../assets/img4.svg";
import img5 from "../../assets/img5.svg";
import img6 from "../../assets/img6.svg";
import img7 from "../../assets/img7.svg";
import img8 from "../../assets/img8.svg";
import img9 from "../../assets/img9.svg";

const SeoDigitalproducts = () => {
  const cards = [
    {
      title: "Keyword Optimization",
      icon: img1,
      hoverColor: "#ef2f2f",
      points: [
        "Research high-intent keywords.",
        "Optimize pages and content.",
        "Increase organic traffic.",
      ],
    },
    {
      title: "Product Descriptions",
      icon: img2,
      hoverColor: "#003d4f",
      points: [
        "Create engaging product content.",
        "Highlight key benefits.",
        "Improve conversions.",
      ],
    },
    {
      title: "Technical SEO",
      icon: img3,
      hoverColor: "#f64a68",
      points: [
        "Improve website speed.",
        "Enhance security and performance.",
        "Boost user experience.",
      ],
    },
    {
      title: "Social Proof",
      icon: img4,
      hoverColor: "#1f3e7b",
      points: [
        "Show customer reviews.",
        "Build trust and credibility.",
        "Increase purchase confidence.",
      ],
    },
    {
      title: "Video Marketing",
      icon: img5,
      hoverColor: "#1a7d55",
      points: [
        "Showcase product features.",
        "Increase user engagement.",
        "Support sales growth.",
      ],
    },
    {
      title: "Enhanced Visibility",
      icon: img6,
      hoverColor: "#6836b3",
      points: [
        "Improve search rankings.",
        "Increase online exposure.",
        "Reach potential customers.",
      ],
    },
    {
      title: "Conversion Funnel",
      icon: img7,
      hoverColor: "#f47d35",
      points: [
        "Attract targeted visitors.",
        "Improve user journeys.",
        "Increase conversions.",
      ],
    },
    {
      title: "Trust & Authority",
      icon: img8,
      hoverColor: "#a030b5",
      points: [
        "Build brand credibility.",
        "Strengthen online authority.",
        "Gain customer trust.",
      ],
    },

    // Duplicate for pagination demo
    {
      title: "SEO Audits",
      icon: img9,
      hoverColor: "#2893bd",
      points: [
        "Identify SEO issues.",
        "Improve website health.",
        "Increase performance.",
      ],
    },
    {
      title: "Local SEO",
      icon: img1,
      hoverColor: "#ef2f2f",
      points: [
        "Optimize Google listings.",
        "Increase local visibility.",
        "Drive nearby customers.",
      ],
    },
    {
      title: "Link Building",
      icon: img2,
      hoverColor: "#003d4f",
      points: [
        "Earn quality backlinks.",
        "Improve domain authority.",
        "Boost rankings.",
      ],
    },
    {
      title: "Content Strategy",
      icon: img3,
      hoverColor: "#f64a68",
      points: [
        "Create SEO content.",
        "Target customer intent.",
        "Increase engagement.",
      ],
    },
    {
      title: "Competitor Analysis",
      icon: img4,
      hoverColor: "#1f3e7b",
      points: [
        "Track competitors.",
        "Find opportunities.",
        "Improve market reach.",
      ],
    },
    {
      title: "Mobile SEO",
      icon: img5,
      hoverColor: "#1a7d55",
      points: [
        "Improve mobile speed.",
        "Enhance UX.",
        "Boost rankings.",
      ],
    },
    {
      title: "E-commerce SEO",
      icon: img6,
      hoverColor: "#6836b3",
      points: [
        "Optimize product pages.",
        "Increase sales.",
        "Improve visibility.",
      ],
    },
    {
      title: "Competitive Advantage",
      icon: img9,
      hoverColor: "#2893bd",
      points: [
        "Outperform competitors.",
        "Capture opportunities.",
        "Grow online presence.",
      ],
    },
  ];

  const cardsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="feature-cards-section">
      <div className="heading">
        <h1>SEO Strategies for Digital Product Growth by PR WEBSTOCK</h1>

        <p>
          PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve search
          rankings, increase organic traffic, and grow digital product sales.
          Our SEO experts in Bhubaneswar create strategies that improve
          visibility, attract customers, and support long-term business growth.
        </p>
      </div>

      <div className="feature-cards-grid">
        {currentCards.map((card, i) => (
          <div
            className="feature-card"
            key={i}
            style={{ "--hover-color": card.hoverColor }}
          >
            <div className="feature-card-header">
              <h3>{card.title}</h3>

              <img src={card.icon} alt={card.title} />
            </div>

            <ul>
              {card.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <div className="color-box"></div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={
              currentPage === index + 1 ? "active-page" : ""
            }
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SeoDigitalproducts;