import React, { useEffect, useState } from "react";
import "./Admin.css";
import API from "../../api/axios";
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");

      const blogData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setBlogs(blogData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="admin-section">
      <div className="admin-container">

        {blogs.map((blog) => (
          <article
            className="admin-card"
            key={blog._id}
          >
            <div className="admin-image">
              <img
                src={
                  blog.image
                    ? `http://localhost:5000${blog.image}`
                    : "https://via.placeholder.com/600x400"
                }
                alt={blog.title}
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
                  {blog.adminName}
                </span>

                <span className="admin-dot">
                  •
                </span>

                <span className="admin-date">
                  <FiCalendar />
                  {new Date(
                    blog.publishDate
                  ).toLocaleDateString()}
                </span>
              </div>

              <h2>{blog.title}</h2>

              <div className="admin-line"></div>

              <p
                dangerouslySetInnerHTML={{
                  __html:
                    blog.description?.slice(
                      0,
                      150
                    ) + "...",
                }}
              />

              <Link
                to={`/blog/${blog._id}`}
                className="admin-btn"
              >
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