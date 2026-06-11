import React, { useState } from "react";
import "./Reviews.css";

import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      text: "Webomindapps is serving our company 'Homecare Solutions' for the last 2 years. I am so happy with the excellent social media marketing service they provide including day-to-day posting on Facebook, Twitter, LinkedIn, Instagram & many other social media pages of our company. Hats off to you guys for your dedication to promoting us online.",
      author: "Hoor Unnisa"
    },
    {
      text: "Webomindapps helped our business to grow tremendously through consistent content and marketing strategies. Highly recommend their professional team!",
      author: "Rohit Kumar"
    },
    {
      text: "Amazing service with fast delivery and creative ideas. Perfect for brands who want to scale their online presence!",
      author: "Sana Patel"
    }
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((index + 1) % reviews.length);
  };

  const prevSlide = () => {
    setIndex((index - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="testimonials-wrapper">
      <h2 className="testimonials-title">
        Social media marketing <br /> reviews from satisfied clients
      </h2>

      <div className="testimonials-content">
        <div className="quote-icon">
          <FaQuoteLeft />
        </div>

        <p className="review-text">{reviews[index].text}</p>

        <p className="review-author">- {reviews[index].author}</p>
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
