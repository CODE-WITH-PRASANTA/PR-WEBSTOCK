import React, { useEffect, useState } from "react";
import "./Bench.css";
import {
  FiSearch,
  FiCalendar,
  FiUser,
  FiTag,
  FiMessageSquare,
} from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import api, { IMG_URL } from "../../api/axios"; // Imported dynamic base URL

const Bench = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to safely format relative or absolute image paths
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/800x450?text=No+Image+Available";
    }

    const trimmed = imagePath.trim();

    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("data:")
    ) {
      return trimmed;
    }

    let cleanPath = trimmed.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/${id}`);
      
      // Support variations in response payloads (res.data vs res.data.data)
      const data = res.data?.data || res.data;
      setBlog(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching article details:", err);
      setError("Failed to load article. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bench-loading">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bench-error">
        <h2>Article Not Found</h2>
        <p>{error || "The requested blog post could not be loaded."}</p>
        <Link to="/blogs" className="back-btn">
          Back to Articles
        </Link>
      </div>
    );
  }

  // Safely normalize tags into an Array whether stored as Array or CSV String
  const normalizedTags = Array.isArray(blog.tags)
    ? blog.tags
    : typeof blog.tags === "string" && blog.tags.trim() !== ""
    ? blog.tags.split(",").map((t) => t.trim())
    : [];

  return (
    <main className="bench-page">
      <div className="bench-container">
        
        {/* MAIN ARTICLE CONTENT */}
        <article className="bench-content">
          
          {/* ARTICLE HEADER */}
          <header className="article-header">
            {blog.category && (
              <span className="category-badge">{blog.category}</span>
            )}

            <h1 className="article-title">{blog.title || "Untitled Post"}</h1>

            <div className="article-meta">
              <span className="meta-item">
                <FiUser /> {blog.adminName || blog.author || "Admin"}
              </span>
              <span className="meta-dot">•</span>
              <span className="meta-item">
                <FiCalendar />{" "}
                {blog.publishDate || blog.createdAt
                  ? new Date(blog.publishDate || blog.createdAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </span>
            </div>
          </header>

          {/* MAIN COVER IMAGE */}
          {(blog.image || blog.coverImage) && (
            <figure className="featured-image">
              <img
                src={getImageUrl(blog.image || blog.coverImage)}
                alt={blog.title || "Blog cover image"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x450?text=Image+Unavailable";
                }}
              />
            </figure>
          )}

          {/* ARTICLE DESCRIPTION / BODY */}
          <section
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: blog.description || blog.content || "",
            }}
          />

          {/* IN-BODY MEDIA IMAGE */}
          {blog.media && (
            <figure className="media-image">
              <img
                src={getImageUrl(blog.media)}
                alt={blog.title || "Additional media asset"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x450?text=Media+Unavailable";
                }}
              />
            </figure>
          )}

          {/* QUOTE BLOCK */}
          {blog.quote && (
            <blockquote className="quote-box">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <p>{blog.quote}</p>
            </blockquote>
          )}

          <hr className="divider" />

          {/* COMMENTS SECTION */}
          <section className="comments-section">
            <h3>
              <FiMessageSquare /> Comments
            </h3>
          </section>

          {/* COMMENT FORM */}
          <section className="reply-form">
            <h3>Leave a Reply</h3>
            <p className="form-note">
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                />
              </div>

              <textarea
                rows="6"
                placeholder="Write your comment..."
                required
              />

              <button type="submit" className="submit-btn">
                Post Comment
              </button>
            </form>
          </section>
        </article>

        {/* SIDEBAR */}
        <aside className="sidebar">
          
          {/* SEARCH BAR */}
          <div className="sidebar-card search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              aria-label="Search articles"
            />
          </div>

          {/* CATEGORIES */}
          <div className="sidebar-card">
            <h3>Categories</h3>
            <ul className="category-list">
              <li>
                <Link to={`/blogs?category=${encodeURIComponent(blog.category || "General")}`}>
                  {blog.category || "General"}
                </Link>
              </li>
            </ul>
          </div>

          {/* TAGS */}
          <div className="sidebar-card">
            <h3>
              <FiTag /> Tags
            </h3>
            <div className="tags">
              {normalizedTags.length > 0 ? (
                normalizedTags.map((tag, index) => (
                  <span className="tag-item" key={index}>
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="no-tags">No tags assigned</p>
              )}
            </div>
          </div>

          {/* SIDEBAR BANNER IMAGE */}
          {(blog.image || blog.media) && (
            <div className="sidebar-card ad-banner">
              <img
                src={getImageUrl(blog.image || blog.media)}
                alt={blog.title || "Featured banner"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x300?text=Banner+Unavailable";
                }}
              />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default Bench;