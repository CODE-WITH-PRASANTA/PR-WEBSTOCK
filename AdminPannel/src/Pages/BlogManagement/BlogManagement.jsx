import React, { useState, useEffect, useCallback } from "react";
import "./BlogManagement.css";
import API, { BASE_URL } from "../../api/axios"; // Imported BASE_URL directly

import {
  FaThLarge,
  FaList,
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogManagement = () => {
  const [view, setView] = useState("grid");
  const [activeMenu, setActiveMenu] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Helper to resolve images safely without local hardcodes
  const getImageUrl = (blog) => {
    if (!blog) return "https://placehold.co/400x250?text=No+Data";

    // 1. Target key possibilities
    let target = blog.image || blog.imageUrl || blog.img || blog.coverImage || blog.thumbnail || blog.cover;
    
    if (!target || typeof target !== "string" || target.trim() === "") {
      return "https://placehold.co/400x250?text=No+Image+Provided";
    }

    target = target.trim();

    // 2. If it's already an absolute URL or base64 data stream
    if (target.startsWith("http://") || target.startsWith("https://") || target.startsWith("data:")) {
      return target;
    }

    // 3. Normalize slash paths & strip local public prefix
    let cleanPath = target.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }
    
    // Use imported BASE_URL dynamically
    return `${BASE_URL}${cleanPath}`;
  };

  // Fetch blogs from backend
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/blogs");
      
      let data = [];
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (Array.isArray(response.data.blogs)) {
          data = response.data.blogs;
        } else if (Array.isArray(response.data.data)) {
          data = response.data.data;
        }
      }
      
      setBlogs(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please verify your server connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    if (activeMenu !== null) {
      document.addEventListener("click", closeMenu);
    }
    return () => document.removeEventListener("click", closeMenu);
  }, [activeMenu]);

  const handleEdit = (id) => {
    navigate(`/admin/blog-post/${id}`);
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await API.delete(`/blogs/${id}`);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => (blog._id || blog.id) !== id));
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete the blog post. Please try again.");
      } finally {
        setActiveMenu(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="BlogManagement_Status">
        <div className="spinner"></div>
        <p>Loading your articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="BlogManagement_Status error">
        <p>{error}</p>
        <button onClick={fetchBlogs} className="Retry_Btn">Try Again</button>
      </div>
    );
  }

  return (
    <div className="BlogManagement">
      <div className="BlogManagement_Header">
        <h2>Blog Management ({blogs.length})</h2>

        <div className="BlogManagement_ViewSwitch">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
            title="Grid View"
          >
            <FaThLarge />
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
            title="List View"
          >
            <FaList />
          </button>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="BlogManagement_Empty">
          <p>No blogs found. Start creating one!</p>
          <button
            onClick={() => navigate("/admin/blog-post")}
            className="Create_Btn"
          >
            Create First Post
          </button>
        </div>
      ) : view === "grid" ? (
        /* GRID VIEW */
        <div className="BlogManagement_Grid">
          {blogs.map((blog) => {
            const blogId = blog._id || blog.id;
            const imgSrc = getImageUrl(blog);
            
            return (
              <div className="BlogManagement_Card" key={blogId}>
                <div className="BlogManagement_ImageContainer">
                  <img 
                    src={imgSrc} 
                    alt={blog.title || "Blog post preview"} 
                    onError={(e) => {
                      if (e.target.src.includes("placehold.co")) return;
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/400x250?text=Image+Unavailable";
                    }}
                  />
                </div>

                <div className="BlogManagement_MenuWrap" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="BlogManagement_MenuBtn"
                    onClick={() => setActiveMenu(activeMenu === blogId ? null : blogId)}
                  >
                    <FaEllipsisV />
                  </button>

                  {activeMenu === blogId && (
                    <div className="BlogManagement_Menu">
                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          handleEdit(blogId);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>

                      <button onClick={(e) => handleDelete(blogId, e)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="BlogManagement_CardContent">
                  <span className="Category_Tag">{blog.category || "General"}</span>
                  <h3>{blog.title || "Untitled Post"}</h3>
                  <p>{blog.quote || blog.description || (blog.content ? blog.content.substring(0, 100) + "..." : "No preview text available.")}</p>
                  <div className="BlogManagement_Footer">
                    <small>{blog.admin || blog.author || "Admin"}</small>
                    <small>{blog.date ? new Date(blog.date).toLocaleDateString() : new Date().toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="BlogManagement_List">
          {blogs.map((blog) => {
            const blogId = blog._id || blog.id;
            const imgSrc = getImageUrl(blog);

            return (
              <div className="BlogManagement_ListItem" key={blogId}>
                <div className="BlogManagement_ListImageWrap">
                  <img 
                    src={imgSrc} 
                    alt={blog.title || "Blog post preview"} 
                    onError={(e) => {
                      if (e.target.src.includes("placehold.co")) return;
                      e.target.onerror = null; 
                      e.target.src = "https://placehold.co/150x150?text=Error";
                    }}
                  />
                </div>

                <div className="BlogManagement_ListContent">
                  <h3>{blog.title || "Untitled Post"}</h3>
                  <p>{blog.quote || blog.description || (blog.content ? blog.content.substring(0, 120) + "..." : "No preview text available.")}</p>
                  <div className="BlogManagement_ListMeta">
                    <span className="Category_Tag">{blog.category || "General"}</span>
                    <span>By {blog.admin || blog.author || "Admin"}</span>
                    <span>{blog.date ? new Date(blog.date).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="BlogManagement_MenuWrap" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="BlogManagement_MenuBtn"
                    onClick={() => setActiveMenu(activeMenu === blogId ? null : blogId)}
                  >
                    <FaEllipsisV />
                  </button>

                  {activeMenu === blogId && (
                    <div className="BlogManagement_Menu">
                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          handleEdit(blogId);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>

                      <button onClick={(e) => handleDelete(blogId, e)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;