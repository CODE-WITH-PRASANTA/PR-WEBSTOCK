import React, { useState } from "react";
import "./IndustryCard.css";

// Import images
import financeImg from "../../assets/industry-01.webp";
import retailImg from "../../assets/industry-02.webp";
import manufacturingImg from "../../assets/industry-03.webp";
import educationImg from "../../assets/industry-04.webp";
import telecomImg from "../../assets/industry-05.webp";
import energyImg from "../../assets/industry-06.webp";
import nonprofitImg from "../../assets/industry-07.webp";
import industryImg from "../../assets/industry-08.webp";
import logisticsImg from "../../assets/industry-09.webp";
import healthcareImg from "../../assets/industry-10.webp";
import banksImg from "../../assets/industry-11.webp";
import consultingImg from "../../assets/industry-12.webp";

const items = [
  { title: "Finance and Banking", image: financeImg },
  { title: "Retail and E-commerce", image: retailImg },
  { title: "Manufacturing", image: manufacturingImg },
  { title: "Education", image: educationImg },
  { title: "Telecommunications", image: telecomImg },
  { title: "Energy and Utilities", image: energyImg },
  { title: "Nonprofit and NGOs", image: nonprofitImg },
  { title: "Industry Manufacturing", image: industryImg },
  { title: "Transportation Logistics", image: logisticsImg },
  { title: "Healthcare", image: healthcareImg },
  { title: "Banks & Insurance", image: banksImg },
  { title: "Consulting Providers", image: consultingImg },
];

export default function IndustryGrid() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="industry-grid-wrapper">
      
      <div className="industry-grid">
        {displayedItems.map((item) => (
          <button key={item.title} className="industry-card">
            <div className="industry-card-image-wrapper">
              <img src={item.image} alt={item.title} className="industry-card-image" />
            </div>

            <div className="industry-card-content">
              <span className="industry-card-title">{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-wrapper">
        <button
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => changePage(currentPage - 1)}
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`pagination-number ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => changePage(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
