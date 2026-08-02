import React, { useEffect, useState } from "react";
import "./Admin.css";
import API, { IMG_URL } from "../../api/axios"; // Import IMG_URL from axios instance
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);

  // Helper to format blog image URLs dynamically without hardcoded local addresses
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/600x400?text=No+Image+Provided";
    }

    const trimmed = imagePath.trim();

    // If already absolute or base64 data stream
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
      return trimmed;
    }

    // Normalize backslashes and strip leading public folder refs
    let cleanPath = trimmed.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");

      const blogData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="admin-section">
      <div className="admin-container">
        {blogs.map((blog) => (
          <article className="admin-card" key={blog._id || blog.id}>
            <div className="admin-image">
              <img
                src={getImageUrl(blog.image)}
                alt={blog.title || "Blog Post"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400?text=Image+Unavailable";
                }}
              />
            </div>

            <div className="admin-content">
              <div className="admin-meta">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Admin"
                  className="admin-avatar"
                />

                <span className="admin-name">
                  {blog.adminName || blog.author || "Admin"}
                </span>

                <span className="admin-dot">•</span>

                <span className="admin-date">
                  <FiCalendar />
                  {blog.publishDate || blog.createdAt
                    ? new Date(blog.publishDate || blog.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </span>
              </div>

              <h2>{blog.title || "Untitled Article"}</h2>

              <div className="admin-line"></div>

              <p
                dangerouslySetInnerHTML={{
                  __html: blog.description
                    ? blog.description.slice(0, 150) + "..."
                    : "No preview description available.",
                }}
              />

              <Link to={`/blog/${blog._id || blog.id}`} className="admin-btn">
                Read More
                <FiArrowUpRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Admin;