import React, {
  useEffect,
  useState,
} from "react";
import "./Improve.css";
import {
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const Improve = () => {
  const { id } = useParams();

  const [blog, setBlog] =
    useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await api.get(
        `/blogs/${id}`
      );

      setBlog(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return (
      <div className="improve-loading">
        Loading...
      </div>
    );
  }

  return (
    <section className="improve-section">
      <div className="improve-container">
        {/* Featured Image */}

        <div className="improve-banner">
          <img
            src={`http://localhost:5000${blog.image}`}
            alt={blog.title}
          />
        </div>

        {/* Title */}

        <h1 className="improve-title">
          {blog.title}
        </h1>

        {/* Meta */}

        <div className="improve-meta">

          <div className="meta-item">
            <FiUser />
            <span>
              {blog.adminName}
            </span>
          </div>

          <span className="meta-dot">
            •
          </span>

          <div className="meta-item">
            <FiCalendar />

            <span>
              {new Date(
                blog.publishDate
              ).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>

          <span className="meta-dot">
            •
          </span>

          <div className="meta-item">
            <span>
              {blog.category}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Improve;