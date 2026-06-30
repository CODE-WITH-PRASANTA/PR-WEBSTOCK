import React, { useEffect, useState } from "react";
import "./Technology.css";
import { FiArrowUpRight, FiX, FiZoomIn } from "react-icons/fi";
import API, { IMG_URL } from "../../api/axios";

// Reusable Expandable Description Component
const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 130; 

  if (!text) return null;

  // If text is short, just render it without buttons
  if (text.length <= characterLimit) {
    return <p className="project-desc">{text}</p>;
  }

  // Create a clean truncation at the end of a word
  const truncatedText = text.substring(0, characterLimit);
  const cleanTruncated = truncatedText.substring(0, Math.max(truncatedText.lastIndexOf(" "), 0));

  return (
    <div className="technology-description-wrapper">
      <p className="project-desc">
        {isExpanded ? text : `${cleanTruncated}...`}
        <button
          type="button"
          className="technology-read-more-inline-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? " Read Less" : " Read More"}
        </button>
      </p>
    </div>
  );
};

const Technology = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for the Image Modal Popup
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [activeModalTitle, setActiveModalTitle] = useState("");

  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProjects = projects.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.error("Project Fetch Error:", error);
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
    return cleanLink.startsWith("http") ? cleanLink : `https://${cleanLink}`;
  };

  const openImageModal = (imageSrc, title) => {
    setActiveModalImage(imageSrc);
    setActiveModalTitle(title);
  };

  const closeImageModal = () => {
    setActiveModalImage(null);
    setActiveModalTitle("");
  };

  return (
    <section className="technology-section">
      <div className="technology-wrapper">
        {loading ? (
          <div className="technology-loading">
            <div className="premium-spinner"></div>
            <h2 className="loading-text">Loading Projects...</h2>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="technology-container">
              {currentProjects.map((item) => (
                <div className="technology-card" key={item._id}>
                  {/* Image Wrapper with Popup Modal Click Action */}
                  <div 
                    className="technology-image-wrapper"
                    onClick={() => openImageModal(`${IMG_URL}${item.image}`, item.projectName)}
                    title="Click to expand image"
                  >
                    <img
                      src={`${IMG_URL}${item.image}`}
                      alt={item.projectName}
                      className="technology-image"
                    />
                    <div className="technology-overlay">
                      <span className="technology-zoom-icon">
                        <FiZoomIn />
                      </span>
                    </div>

                    {item.projectLink && (
                      <a
                        href={getProjectLink(item.projectDomain)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="technology-arrow"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiArrowUpRight />
                      </a>
                    )}
                  </div>

                  {/* Card Content Details */}
                  <div className="technology-content">
                    <div className="technology-heading">
                      <h3 className="technology-title">{item.projectName}</h3>
                      
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

                    {/* Integrated Expandable Text Description Component */}
                    <div className="technology-description">
                      <ExpandableDescription text={item.projectDescription} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="technology-pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${
                      currentPage === index + 1 ? "active-page" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="technology-empty">
            <h2 className="loading-text">No Projects Found</h2>
          </div>
        )}
      </div>

      {/* Premium Image Lightbox Modal Overlay */}
      {activeModalImage && (
        <div className="technology-modal-backdrop" onClick={closeImageModal}>
          <div className="technology-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="technology-modal-close" onClick={closeImageModal}>
              <FiX />
            </button>
            <div className="technology-modal-image-container">
              <img src={activeModalImage} alt={activeModalTitle} className="technology-modal-img" />
            </div>
            {activeModalTitle && (
              <div className="technology-modal-caption">
                <h4>{activeModalTitle}</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Technology;