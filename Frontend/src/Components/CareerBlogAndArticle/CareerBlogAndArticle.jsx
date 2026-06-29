import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import API, { IMG_URL } from "../../api/axios";
import "./CareerBlogAndArticle.css";

const CareerBlogAndArticle = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");

      const blogsData = res?.data?.data || [];

      setBlogs(blogsData.slice(0, 3));
    } catch (error) {
      console.error("Blog Fetch Error:", error);
      setBlogs([]);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return {
        day: "--",
        month: "---",
      };
    }

    const d = new Date(date);

    return {
      day: d.getDate(),
      month: d.toLocaleString("default", {
        month: "short",
      }),
    };
  };

  return (
    <section className="careerblog">
      <div className="careerblog-header">
        <h2>Latest Blogs & Articles</h2>

        <p>
          Explore career tips, technology insights, web development,
          app development, digital marketing trends, and professional
          growth articles from PR WEBSTOCK.
        </p>
      </div>

      <div className="careerblog-grid">
        {blogs.length > 0 ? (
          blogs.map((blog) => {
            const { day, month } = formatDate(
              blog.publishDate || blog.createdAt
            );

            return (
              <div
                className="careerblog-card"
                key={blog._id}
              >
                <div className="careerblog-imgwrap">
                  <img
                    src={
                      blog.image
                        ? blog.image.startsWith("http")
                          ? blog.image
                          : `${IMG_URL}${blog.image}`
                        : "https://via.placeholder.com/600x400"
                    }
                    alt={blog.title}
                  />

                  <div className="careerblog-date">
                    <span className="day">{day}</span>
                    <span className="month">{month}</span>
                  </div>

                  <div className="careerblog-date-corner"></div>
                </div>

                <div className="careerblog-body">
                  <h3>
                    {blog.title?.length > 45
                      ? `${blog.title.substring(0, 45)}...`
                      : blog.title}
                  </h3>

                  <p>
                    {blog.description
                      ?.replace(/<[^>]*>/g, "")
                      ?.substring(0, 130)}
                    ...
                  </p>

                  <Link
                    to={`/blog/${blog._id}`}
                    className="careerblog-btn"
                  >
                    <FiArrowRight />
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="careerblog-empty">
            <h3>No Blogs Available</h3>
            <p>New articles will appear here soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerBlogAndArticle;