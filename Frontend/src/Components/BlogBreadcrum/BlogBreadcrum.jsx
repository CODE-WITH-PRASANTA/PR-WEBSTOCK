import React from "react";
import "./BlogBreadcrum.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const BlogBreadcrum = ({ onArrowClick }) => {
  return (
    <section className="blog-hero">
      {/* 1. Use native <img> with high fetch priority */}
      <img
        src={PricingBanner}
        alt="Hero Background"
        fetchPriority="high"
        decoding="sync"
        className="blog-hero-bg"
      />

      <div className="blog-hero-overlay" />

      <div className="blog-hero-content">
        <div className="blog-breadcrumb-pill">
          <span className="crumb-active">HOME</span>
          <span className="crumb-separator">—</span>
          <span className="crumb">BLOG</span>
        </div>

        <h1 className="blog-hero-title">Latest News Blog &amp; Article.</h1>
      </div>

      <button
        className="blog-scroll-indicator"
        type="button"
        onClick={onArrowClick}
      >
        <span className="blog-scroll-arrow">↓</span>
      </button>
    </section>
  );
};

export default BlogBreadcrum;