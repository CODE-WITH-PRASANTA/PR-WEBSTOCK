import React, { useState, useEffect } from "react";
import "./Image.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import API from "../../api/axios"; // Uses your configured base import path

const Image = () => {
  // ==========================================
  // STATES & DATA INITIALIZATION
  // ==========================================
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dynamic Pagination items per page based on screen width
  const [imagesPerPage, setImagesPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal Lightbox States
  const [activeIndex, setActiveIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

  // ==========================================
  // BACKEND RECONCILIATION & RESOLUTION UTILITIES
  // ==========================================
  const getBaseUrl = () => {
    if (API.defaults.baseURL) {
      // Strips trailing /api context to expose root static assets folder safely
      return API.defaults.baseURL.replace(/\/api\/?$/, "");
    }
    return "http://localhost:5000";
  };

  const extractImagePath = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    return item.image || item.imageUrl || item.photo || item.filePath || item.url || "";
  };

  const resolveImageSrc = (item) => {
    const imagePath = extractImagePath(item);
    
    if (!imagePath) return "https://placehold.co/600x400?text=No+Image+Found";
    if (/^https?:\/\//i.test(imagePath)) return imagePath;
    if (/^data:image\//i.test(imagePath)) return imagePath; 

    const normalizedPath = imagePath.replace(/\\/g, "/").replace(/^\//, "");
    return `${getBaseUrl()}/${normalizedPath}`;
  };

  // ==========================================
  // FETCH IMAGES FROM API
  // ==========================================
  const fetchGalleryData = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/gallery/all");
      
      // Clean target mapping arrays dynamically based on your controller patterns
      let rawData = [];
      if (Array.isArray(res.data)) {
        rawData = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        rawData = res.data.data;
      } else if (res.data && Array.isArray(res.data.gallery)) {
        rawData = res.data.gallery;
      }

      // Convert database items into clean, resolved image URLs
      const resolvedUrls = rawData.map(item => resolveImageSrc(item));
      setGalleryImages(resolvedUrls);
    } catch (error) {
      console.error("Error connecting with dynamic gallery routes:", error);
      setGalleryImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Responsive Screen Listener Execution
  useEffect(() => {
    fetchGalleryData();

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImagesPerPage(1); // 1-by-1 pagination on mobile view
      } else {
        setImagesPerPage(3); // 3 cards layout on laptop view
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ==========================================
  // PAGINATION MATHEMATICS
  // ==========================================
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, startIndex + imagesPerPage);

  // ==========================================
  // LIGHTBOX VIEWER ACTIONS
  // ==========================================
  const openViewer = (globalIndex) => {
    setActiveIndex(globalIndex);
    setShowViewer(true);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <section className="cb-gallery-section">
      <div className="cb-gallery-container">
        
        {/* 1st: Premium SEO Header Section */}
        <div className="cb-gallery-seo-header">
          <span className="cb-gallery-tag">Captured Special Moments</span>
          <h2>PR WEBSTOCK Gallery - Bhubaneswar, Odisha</h2>
          
          <div className="cb-gallery-description-block">
            <p>
              Welcome to the official gallery of <strong>PR WEBSTOCK</strong>, a leading
              digital solutions company located in <strong>Bhubaneswar, Odisha</strong>.
              Our gallery showcases memorable moments, team celebrations, project milestones,
              and special events.
            </p>
            <p>
              At <strong>PR WEBSTOCK in Bhubaneswar, Odisha</strong>, we believe every 
              successful project is built through collaboration, creativity, and dedication.
            </p>
            <p>
              As a trusted company in <strong>Bhubaneswar, Odisha</strong>, PR WEBSTOCK 
              specializes in web development, software solutions, digital marketing, 
              UI/UX design, and branding services.
            </p>
            <p>
              The <strong>PR WEBSTOCK Gallery</strong> highlights the teamwork, innovation, and
              achievements that define our organization in <strong>Bhubaneswar, Odisha</strong>.
            </p>
          </div>
        </div>

        {/* Loading and Empty State Layer */}
        {isLoading ? (
          <div className="cb-gallery-loading-state">
            <FaSpinner className="cb-gallery-spin" />
            <p>Loading PR WEBSTOCK Gallery Assets...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="cb-gallery-empty-state">
            <p>No images uploaded to the gallery section yet.</p>
          </div>
        ) : (
          <>
            {/* 2nd: Eye-Catching Interactive Image Grid */}
            <div className="cb-gallery-grid-wrapper">
              <div className="cb-gallery-grid">
                {currentImages.map((image, index) => {
                  const globalIndex = startIndex + index;
                  return (
                    <div
                      key={globalIndex}
                      className="cb-gallery-card"
                      onClick={() => openViewer(globalIndex)}
                    >
                      <div className="cb-gallery-image-wrapper">
                        <img
                          src={image}
                          alt={`PR WEBSTOCK Gallery Image ${globalIndex + 1}`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/600x400?text=Image+Inaccessible";
                          }}
                        />
                        <div className="cb-gallery-overlay">
                          <div className="cb-gallery-glass-btn">
                            <span>View Image</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3rd: Minimalist Active Pagination Strip */}
            {totalPages > 1 && (
              <div className="cb-gallery-pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`cb-page-btn ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                    aria-label={`Go to page ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

      </div>

      {/* Premium System Lightbox Modal Overlay */}
      {showViewer && galleryImages.length > 0 && (
        <div className="cb-gallery-modal" role="dialog" aria-modal="true">
          <button
            className="cb-gallery-close"
            onClick={() => setShowViewer(false)}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          <button
            className="cb-gallery-arrow left"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div className="cb-gallery-modal-content">
            <div className="cb-gallery-main-image-frame">
              <img
                src={galleryImages[activeIndex]}
                alt="PR WEBSTOCK Presentation Mode"
                className="cb-gallery-main-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x600?text=Asset+Inaccessible";
                }}
              />
            </div>

            {/* Dynamic Thumbnails Strip */}
            <div className="cb-gallery-thumbnails">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`cb-gallery-thumb-wrapper ${activeIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail view ${idx + 1}`}
                    className="cb-gallery-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100?text=Error";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="cb-gallery-arrow right"
            onClick={nextImage}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Image;