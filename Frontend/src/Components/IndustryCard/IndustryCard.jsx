import React, {
  useEffect,
  useState,
} from "react";

import "./IndustryCard.css";

import api, {
  IMG_URL,
} from "../../api/axios";

const IndustryCard = () => {
  const itemsPerPage = 8;

  const [industries, setIndustries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  // =============================
  // Fetch Industries
  // =============================

  const fetchIndustries = async () => {
    try {
      setLoading(true);

      const res =
        await api.get("/industries");

      setIndustries(
        res.data.data || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // =============================
  // Pagination
  // =============================

  const totalPages = Math.ceil(
    industries.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const displayedItems =
    industries.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  const changePage = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
  <section className="industry-grid-wrapper">

    {loading ? (

      <div className="industry-loading">
        <h2>Loading Industries...</h2>
      </div>

    ) : (

      <>
        <div className="industry-grid">

          {displayedItems.length > 0 ? (

            displayedItems.map((item) => (

              <div
                key={item._id}
                className="industry-card"
              >

                <div className="industry-card-image-wrapper">

                  <img
                    src={`${IMG_URL}${item.image}`}
                    alt={item.industryName}
                    className="industry-card-image"
                  />

                </div>

                <div className="industry-card-content">

                  <h3 className="industry-card-title">
                    {item.industryName}
                  </h3>

                  <div className="industry-meta">

                    <span className="industry-category">
                      {item.category}
                    </span>

                    <span className="industry-location">
                      📍 {item.location}
                    </span>

                  </div>

                  <p className="industry-description">
                    {item.description}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="industry-empty">
              <h2>No Industries Found</h2>
            </div>

          )}

        </div>

        {/* ================= Pagination ================= */}

        {totalPages > 1 && (

          <div className="pagination-wrapper">

            <button
              className={`pagination-btn ${
                currentPage === 1
                  ? "disabled"
                  : ""
              }`}
              disabled={currentPage === 1}
              onClick={() =>
                changePage(currentPage - 1)
              }
            >
              ‹
            </button>

            {[...Array(totalPages)].map(
              (_, index) => (
                <button
                  key={index}
                  className={`pagination-number ${
                    currentPage ===
                    index + 1
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    changePage(index + 1)
                  }
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              className={`pagination-btn ${
                currentPage === totalPages
                  ? "disabled"
                  : ""
              }`}
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                changePage(currentPage + 1)
              }
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