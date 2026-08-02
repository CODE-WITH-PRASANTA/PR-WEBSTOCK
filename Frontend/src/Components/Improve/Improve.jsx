import React, { useEffect, useState } from "react";
import "./Improve.css";
import { FiUser, FiCalendar, FiFolder } from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import api, { IMG_URL } from "../../api/axios"; // Imported dynamic base URL

const Improve = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to safely format image paths across environments
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/1200x600?text=No+Banner+Image";
    }

    const trimmed = imagePath.trim();

    // Remove legacy local domain strings if saved in database
    let cleanPath = trimmed.replace(/http:\/\/localhost:(5000|6013)/g, "");

    // If it's already an absolute HTTP/HTTPS URL or base64 string
    if (
      cleanPath.startsWith("http://") ||
      cleanPath.startsWith("https://") ||
      cleanPath.startsWith("data:")
    ) {
      return cleanPath;
    }

    cleanPath = cleanPath.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/${id}`);
      
      // Handle both res.data and res.data.data structures
      const blogData = res.data?.data || res.data;
      setBlog(blogData);
      setError(null);
    } catch (err) {
      console.error("Error fetching article details:", err);
      setError("Failed to load the article. Please try again later.");
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
      <div className="improve-loading">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="improve-error">
        <h2>Article Not Found</h2>
        <p>{error || "The article you are looking for does not exist."}</p>
        <Link to="/blogs" className="back-btn">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <section className="improve-section">
      <div className="improve-container">
        
        {/* Featured Banner Image */}
        <div className="improve-banner">
          <img
            src={getImageUrl(blog.image || blog.coverImage)}
            alt={blog.title || "Blog Post Banner"}
            onError={(e) => {
              if (e.target.src.includes("placehold.co")) return;
              e.target.onerror = null;
              e.target.src = "https://placehold.co/1200x600?text=Banner+Unavailable";
            }}
          />
        </div>

        {/* Post Title */}
        <h1 className="improve-title">
          {blog.title || "Untitled Article"}
        </h1>

        {/* Metadata Bar */}
        <div className="improve-meta">
          <div className="meta-item">
            <FiUser className="meta-icon" />
            <span>{blog.adminName || blog.author || "Admin"}</span>
          </div>

          <span className="meta-dot">•</span>

          <div className="meta-item">
            <FiCalendar className="meta-icon" />
            <span>
              {blog.publishDate || blog.createdAt
                ? new Date(blog.publishDate || blog.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </span>
          </div>

          {blog.category && (
            <>
              <span className="meta-dot">•</span>
              <div className="meta-item">
                <FiFolder className="meta-icon" />
                <span>{blog.category}</span>
              </div>
            </>
          )}
        </div>

        {/* Optional Description / Body Output */}
        {blog.description && (
          <article
            className="improve-content"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        )}
      </div>
    </section>
  );
};

export default Improve;