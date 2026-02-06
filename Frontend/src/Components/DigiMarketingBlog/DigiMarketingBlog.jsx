import React from "react";
import "./DigiMarketingBlog.css";

// Import images
import blog1 from "../../assets/seo vs aeo.webp";
import blog2 from "../../assets/High-Converting Landing Page.webp";
import blog3 from "../../assets/Top 10 Digital Marketing Trends For 2025.webp";

const blogData = [
  {
    date: "Jan 24, 2026",
    title: "SEO vs. AEO: Key Differences and Emerging Trends",
    image: blog1,
  },
  {
    date: "Jan 24, 2026",
    title: "10 Proven Strategies for Designing a High-Converting Landing Page",
    image: blog2,
  },
  {
    date: "Jan 11, 2026",
    title: "Top 10 Digital Marketing Trends For 2025",
    image: blog3,
  },
];

const BlogSection = () => {
  return (
    <section className="blog-section">
      {/* ===== Header ===== */}
      <div className="blog-header">
        <span className="blog-tag">Our blog</span>
        <h2>Recent blog & articles</h2>

        <div className="blog-desc">
          <span className="blog-line"></span>
          <p>
            Find out the latest technologies that are updating constantly at a
            rapid speed. Our blog feed keeps you in the loop about various
            technologies which go trending in our day-to-day life.
          </p>
        </div>
      </div>

      {/* ===== Blog Cards ===== */}
      <div className="blog-grid">
        {blogData.map((blog, index) => (
          <div className="blog-card" key={index}>
            <img src={blog.image} alt={blog.title} />

            <div className="blog-content">
              <span className="blog-date">{blog.date}</span>
              <h3>{blog.title}</h3>
              <hr />
              <a href="#" className="read-blog">
                Read Blog <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
