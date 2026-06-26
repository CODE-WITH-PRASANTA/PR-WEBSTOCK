import React, { useEffect, useState } from "react";
import "./Technology.css";
import { FiArrowUpRight } from "react-icons/fi";
import API, { IMG_URL } from "../../api/axios";

const Technology = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;

  const indexOfLastCard =
    currentPage * cardsPerPage;

  const indexOfFirstCard =
    indexOfLastCard - cardsPerPage;

  const currentProjects =
    projects.slice(
      indexOfFirstCard,
      indexOfLastCard
    );

  const totalPages = Math.ceil(
    projects.length / cardsPerPage
  );

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.error(
        "Project Fetch Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getProjectLink = (link) => {
    if (!link) return "#";

    const cleanLink = link.trim();

    return cleanLink.startsWith("http")
      ? cleanLink
      : `https://${cleanLink}`;
  };

  return (
    <section className="technology-section">
      <div className="technology-wrapper">
        {loading ? (
          <div className="technology-loading">
            <h2 className="loading-text">
              Loading Projects...
            </h2>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="technology-container">
              {currentProjects.map((item) => (
                <div
                  className="technology-card"
                  key={item._id}
                >
                  <div className="technology-image-wrapper">
                    <img
                      src={`${IMG_URL}${item.image}`}
                      alt={item.projectName}
                      className="technology-image"
                    />

                    <div className="technology-overlay"></div>

                    {item.projectLink && (
                      <a
                        href={getProjectLink(
                          item.projectDomain
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="technology-arrow"
                      >
                        <FiArrowUpRight />
                      </a>
                    )}
                  </div>

                  <div className="technology-content">
                    <div className="technology-heading">
                      <h3 className="technology-title">
                        {item.projectName}
                      </h3>
                   
                   <h5 className="technology-domain">
                      {item.projectDomain && (
                       <a
                          href={getProjectLink(item.projectDomain)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="visit-website-link"
                        >
                          Visit Website <FiArrowUpRight />
                        </a>
                      )}
                    </h5>
                    
                    </div>

                    <div className="technology-owner">
                      <p className="owner-name">
                        <span className="owner-label">
                          DIRECTOR / FOUNDER :
                        </span>{" "}
                        {item.ownerName}
                      </p>
                    </div>

                    <div className="technology-description">
                      <p className="project-desc">
                        {
                          item.projectDescription
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="technology-pagination">
                {[...Array(totalPages)].map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`page-btn ${
                        currentPage ===
                        index + 1
                          ? "active-page"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <div className="technology-empty">
            <h2 className="loading-text">
              No Projects Found
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default Technology;