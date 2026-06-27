import React, { useState, useEffect } from "react";
import API from "../../api/axios"; // Uses pre-configured Axios instance pointing to your backend
import "./Reviews.css";

import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH: Sync component with real-time backend database entries
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await API.get("/testimonial/all");
      
      console.log("REVIEWS GET RESPONSE", response.data);

      if (response.data && response.data.success) {
        setReviews(response.data.data || []);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Reviews Fetch Error:", err);
      setError("Failed to fetch client reviews.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const nextSlide = () => {
    if (reviews.length === 0) return;
    setIndex((index + 1) % reviews.length);
  };

  const prevSlide = () => {
    if (reviews.length === 0) return;
    setIndex((index - 1 + reviews.length) % reviews.length);
  };

  // Safe fallback states to maintain visual cleanliness while API processes
  if (loading) {
    return (
      <section className="testimonials-wrapper" style={{ minHeight: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ opacity: 0.7 }}>Loading client reviews...</p>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="testimonials-wrapper" style={{ minHeight: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ opacity: 0.7 }}>No customer reviews are available right now.</p>
      </section>
    );
  }

  // Fallback mappings to match controller data safely
  const currentReview = reviews[index];
  const resolvedText = currentReview.feedback || currentReview.text || "";
  const resolvedAuthor = currentReview.name || "Anonymous";

  return (
    <section className="testimonials-wrapper">
      <h2 className="testimonials-title">
        Social media marketing <br /> reviews from satisfied clients
      </h2>

      <div className="testimonials-content">
        <div className="quote-icon">
          <FaQuoteLeft />
        </div>

        <p className="review-text">{resolvedText}</p>

        <p className="review-author">- {resolvedAuthor}</p>
      </div>

      <div className="testimonial-nav">
        <button onClick={prevSlide} className="nav-btn">
          <FaArrowLeft />
        </button>
        <button onClick={nextSlide} className="nav-btn">
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Reviews;