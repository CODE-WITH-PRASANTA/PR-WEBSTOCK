import React, { useState } from "react";
import "./Image.css";

import img1 from "../../assets/12n.webp";
import img2 from "../../assets/13.webp";
import img3 from "../../assets/10.webp";
import img4 from "../../assets/14.webp";
import img5 from "../../assets/18.webp";
import img6 from "../../assets/16.webp";

import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

const Image = () => {
  const galleryImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
  ];

  // Pagination
  const imagesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    galleryImages.length / imagesPerPage
  );

  const startIndex =
    (currentPage - 1) * imagesPerPage;

  const currentImages = galleryImages.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  // Modal State
  const [activeIndex, setActiveIndex] =
    useState(0);
  const [showViewer, setShowViewer] =
    useState(false);

  // Open Modal
  const openViewer = (index) => {
    setActiveIndex(index);
    setShowViewer(true);
  };

  // Next Image
  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1
        ? 0
        : prev + 1
    );
  };

  // Previous Image
  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? galleryImages.length - 1
        : prev - 1
    );
  };

  return (
    <section className="cb-gallery-section">
      {/* Header */}

      <div className="cb-gallery-header">
        <span className="cb-gallery-tag">
          CAPTURED SPECIAL MOMENTS
        </span>

        <h1 className="cb-gallery-title">
          Our <span>Beautiful Gallery</span>
        </h1>

        <p>
          Explore memorable moments, celebrations,
          achievements, and workplace culture at
          PR WEBSTOCK.
        </p>
      </div>

      {/* Gallery */}

      <div className="cb-gallery-scroll-wrapper">
        <div className="cb-gallery-track">
          {currentImages.map((image, index) => (
            <div
              key={index}
              className="cb-gallery-card"
              onClick={() =>
                openViewer(startIndex + index)
              }
            >
              <img
                src={image}
                alt={`PR WEBSTOCK Gallery Image ${
                  startIndex + index + 1
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}

      <div className="cb-gallery-pagination">
        {[...Array(totalPages)].map(
          (_, index) => (
            <button
              key={index}
              className={`cb-page-btn ${
                currentPage === index + 1
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* SEO Content */}

      <div className="cb-gallery-seo">
        <h2>
          PR WEBSTOCK Gallery - Bhubaneswar,
          Odisha
        </h2>

        <p>
          Welcome to the official gallery of
          <strong> PR WEBSTOCK</strong>, a leading
          digital solutions company located in
          <strong> Bhubaneswar, Odisha</strong>.
          Our gallery showcases memorable moments,
          team celebrations, project milestones,
          and special events.
        </p>

        <p>
          At
          <strong>
            {" "}
            PR WEBSTOCK in Bhubaneswar, Odisha
          </strong>
          , we believe every successful project is
          built through collaboration, creativity,
          and dedication.
        </p>

        <p>
          As a trusted company in
          <strong> Bhubaneswar, Odisha</strong>,
          PR WEBSTOCK specializes in web
          development, software solutions, digital
          marketing, UI/UX design, and branding
          services.
        </p>

        <p>
          The
          <strong> PR WEBSTOCK Gallery</strong>
          highlights the teamwork, innovation, and
          achievements that define our organization
          in <strong>Bhubaneswar, Odisha</strong>.
        </p>
      </div>

      {/* Modal */}

      {showViewer && (
        <div className="cb-gallery-modal">
          {/* Close Button */}

          <button
            className="cb-gallery-close"
            onClick={() =>
              setShowViewer(false)
            }
          >
            <FaTimes />
          </button>

          {/* Previous */}

          <button
            className="cb-gallery-arrow left"
            onClick={prevImage}
          >
            <FaChevronLeft />
          </button>

          {/* Main Image */}

          <div className="cb-gallery-modal-content">
            <img
              src={galleryImages[activeIndex]}
              alt="PR WEBSTOCK Gallery"
              className="cb-gallery-main-image"
            />

           {/* Thumbnails */}
 
            <div className="cb-gallery-thumbnails">
              {galleryImages.map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`cb-gallery-thumb ${
                      activeIndex === idx
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveIndex(idx)
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* Next */}

          <button
            className="cb-gallery-arrow right"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Image;