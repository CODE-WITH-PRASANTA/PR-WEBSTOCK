import React, { useEffect, useState } from "react";
import "./Admin.css";
import API, { IMG_URL } from "../../api/axios"; // Dynamic base URL
import { FiCalendar, FiArrowUpRight, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to safely format blog image URLs dynamically
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/600x400?text=No+Image+Provided";
    }

    const trimmed = imagePath.trim();

    // Strip legacy local server strings if saved in database
    let cleanPath = trimmed.replace(/http:\/\/localhost:(5000|6013)/g, "");

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

  // Helper to strip HTML tags for clean text previews
  const getExcerpt = (htmlContent, length = 120) => {
    if (!htmlContent) return "No preview description available.";
    const cleanText = htmlContent.replace(/<[^>]+>/g, "");
    return cleanText.length > length
      ? cleanText.substring(0, length) + "..."
      : cleanText;
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs");

      const blogData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="Blog-Sec_Status">
        <div className="Blog-Sec_Spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <section className="Blog-Sec_Section">
      <div className="Blog-Sec_Container">
        
        {blogs.length === 0 ? (
          <div className="Blog-Sec_Empty">
            <h3>No Articles Found</h3>
            <p>Publish your first blog post to see it listed here.</p>
          </div>
        ) : (
          <div className="Blog-Sec_Grid">
            {blogs.map((blog) => (
              <article className="Blog-Sec_Card" key={blog._id || blog.id}>
                
                {/* COVER IMAGE CONTAINER */}
                <div className="Blog-Sec_ImageWrap">
                  <img
                    src={getImageUrl(blog.image || blog.coverImage)}
                    alt={blog.title || "Blog Post"}
                    onError={(e) => {
                      if (e.target.src.includes("placehold.co")) return;
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x400?text=Image+Unavailable";
                    }}
                  />
                  {blog.category && (
                    <span className="Blog-Sec_Badge">{blog.category}</span>
                  )}
                </div>

                {/* CARD BODY CONTENT */}
                <div className="Blog-Sec_Content">
                  
                  {/* METADATA BAR */}
                  <div className="Blog-Sec_Meta">
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      alt={blog.adminName || "Admin"}
                      className="Blog-Sec_Avatar"
                    />

                    <span className="Blog-Sec_Author">
                      <FiUser className="Blog-Sec_MetaIcon" />
                      {blog.adminName || blog.author || "Admin"}
                    </span>

                    <span className="Blog-Sec_Dot">•</span>

                    <span className="Blog-Sec_Date">
                      <FiCalendar className="Blog-Sec_MetaIcon" />
                      {blog.publishDate || blog.createdAt
                        ? new Date(
                            blog.publishDate || blog.createdAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                    </span>
                  </div>

                  {/* ARTICLE TITLE */}
                  <h2 className="Blog-Sec_Title">
                    {blog.title || "Untitled Article"}
                  </h2>

                  {/* DECORATIVE LINE */}
                  <div className="Blog-Sec_Divider"></div>

                  {/* TEXT EXCERPT */}
                  <p className="Blog-Sec_Excerpt">
                    {getExcerpt(blog.description || blog.content)}
                  </p>

                  {/* READ MORE BUTTON */}
                  <Link
                    to={`/blog/${blog._id || blog.id}`}
                    className="Blog-Sec_Btn"
                  >
                    <span>Read Article</span>
                    <FiArrowUpRight className="Blog-Sec_BtnIcon" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;