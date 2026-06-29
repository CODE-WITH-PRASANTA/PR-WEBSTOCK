import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Innovationdiaries.css";
import API, { IMG_URL } from "../../api/axios";

export default function InnovationDiaries() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const stripHtml = (html) => {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");

  return doc.body.textContent || "";
};

const getShortDescription = (html) => {
  const text = stripHtml(html);

  return text.length > 130 ? text.substring(0, 130) + "..." : text;
};

const getAuthorInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "A";
};

  const fetchBlogs = async () => {
    try {
      const { data } = await API.get("/blogs");

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (loading) {
    return (
      <section className="innovation-diaries-wrap">
        <div
          style={{
            padding: "100px 0",
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Loading Latest Blogs...
        </div>
      </section>
    );
  }

  return (
    <section className="innovation-diaries-wrap">
      <div className="innovation-container">
        <h2 className="innovation-section-title">
          <span>Latest Updates & Blogs</span>
        </h2>

        <p className="innovation-subtitle">
          Stay updated with our latest insights, industry trends, expert
          opinions, and practical guides covering technology, digital
          innovation, and business growth.
        </p>

        <div className="innovation-posts-grid">
          {posts.length > 0 ? (
         posts.map((post) => (
  <article
    key={post._id}
    className="innovation-post-card"
    onMouseEnter={() => handleMouseEnter(post._id)}
    onMouseLeave={handleMouseLeave}
  >
    {/* IMAGE */}
    <div className="innovation-post-image">
      <img
        src={
          post.image
            ? post.image.startsWith("http")
              ? post.image
              : `${IMG_URL}${post.image}`
            : "https://placehold.co/700x450?text=No+Image"
        }
        alt={post.title}
      />

      {/* Overlay */}
      <div className="innovation-post-image-overlay">
        <h4>Article Overview</h4>

        <div className="innovation-overlay-stats">
          <div className="innovation-overlay-stat">
            <div className="innovation-overlay-stat-value">
              {post.tags?.length || 0}
            </div>
            <div className="innovation-overlay-stat-label">
              Tags
            </div>
          </div>

          <div className="innovation-overlay-stat">
            <div className="innovation-overlay-stat-value">
              {post.adminName}
            </div>

            <div className="innovation-overlay-stat-label">
              Author
            </div>
          </div>

          <div className="innovation-overlay-stat">
            <div className="innovation-overlay-stat-value">
              {formatDate(post.publishDate)}
            </div>

            <div className="innovation-overlay-stat-label">
              Published
            </div>
          </div>
        </div>
      </div>

      <span className="innovation-date-badge">
        {formatDate(post.publishDate)}
      </span>
    </div>

    {/* META */}
    <div className="innovation-post-meta">
      <span className="innovation-post-category">
        {post.category}
      </span>

      <span className="innovation-post-comments">
        {post.tags?.join(", ") || "General"}
      </span>
    </div>

            {/* TITLE */}
            <h3 className="innovation-post-title">
              {post.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="innovation-post-excerpt">
              {getShortDescription(post.description)}
            </p>

            {/* BUTTON */}
            <Link
              className="innovation-read-more"
              to={`/blog/${post._id}`}
            >
              Read Full Article
            </Link>
          </article>
        ))
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "80px",
                fontSize: "20px",
              }}
            >
              No Blogs Found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}