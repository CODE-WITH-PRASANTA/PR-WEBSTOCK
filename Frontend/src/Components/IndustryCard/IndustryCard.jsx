import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import "./IndustryCard.css";
import api, { IMG_URL } from "../../api/axios";

const IndustryCard = () => {
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Helper to safely format image URLs across environments
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/600x400?text=No+Image";
    }

    const trimmed = imagePath.trim();
    let cleanPath = trimmed.replace(/http:\/\/localhost:(5000|6013)/g, "");

    if (
      cleanPath.startsWith("http://") ||
      cleanPath.startsWith("https://") ||
      cleanPath.startsWith("data:")
    ) {
      return cleanPath;
    }

    cleanPath = cleanPath.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  // Truncate long descriptions to maintain uniform card heights
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "No description available for this industry.";
    const cleanText = text.replace(/<[^>]+>/g, "");
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  // Fetch Industries
  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const res = await api.get("/industries");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setIndustries(data);
    } catch (err) {
      console.error("Error fetching industries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(industries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = industries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (id) => {
    navigate(`/industry/${id}`);
  };

  return (
    <section className="industry-grid-wrapper">
      {loading ? (
        <div className="industry-loading">
          <div className="industry-spinner"></div>
          <h2>Loading Industries...</h2>
        </div>
      ) : (
        <>
          <div className="industry-grid">
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <article
                    key={itemId}
                    className="industry-card"
                    onClick={() => handleCardClick(itemId)}
                  >
                    <div className="industry-card-image-wrapper">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.industryName || "Industry"}
                        className="industry-card-image"
                        onError={(e) => {
                          if (e.target.src.includes("placehold.co")) return;
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/600x400?text=Image+Unavailable";
                        }}
                      />
                      {item.category && (
                        <span className="industry-category-badge">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="industry-card-content">
                      <h3 className="industry-card-title">
                        {item.industryName || "Untitled Industry"}
                      </h3>

                      {item.location && (
                        <div className="industry-meta">
                          <span className="industry-location">
                            <FiMapPin className="location-icon" />
                            {item.location}
                          </span>
                        </div>
                      )}

                      <p className="industry-description">
                        {truncateText(item.description)}
                      </p>

                      <button
                        className="industry-readmore"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(itemId);
                        }}
                      >
                        <span>Read More</span>
                        <FiArrowRight className="readmore-icon" />
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="industry-empty">
                <h2>No Industries Found</h2>
                <p>Check back later or try refreshing the page.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <button
                className={`pagination-btn ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                aria-label="Previous Page"
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagination-number ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`pagination-btn ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                aria-label="Next Page"
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default IndustryCard;