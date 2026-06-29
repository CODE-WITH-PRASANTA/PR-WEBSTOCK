import React, { useEffect, useState } from "react";
import "./BlogShowcase.css";
import API from "../../api/axios"; // adjust path

const BlogShowcase = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");

      if (res.data.success) {
        setBlogs(res.data.data.slice(0, 3)); // latest 3 blogs
      }
    } catch (error) {
      console.error("Blog Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return {
      day: date.getDate(),
      month: date.toLocaleString("default", {
        month: "long",
      }),
    };
  };

  return (
    <div className="bgx-container">
      {/* HEADER */}
     <header className="bgx-hero hero-fixed">
        <div className="bgx-badge">
          <span className="star">★</span>
          BLOG & ARTICLE
          <span className="star">★</span>
        </div>

        {/* LEFT COLUMN */}
        <div className="hero-col hero-col-left">
          <h1 className="hero-title">
            Latest Updates & Exclusive Offers
          </h1>

          <h2 className="hero-sub">
            From PR WEBSTOCK — Stay Ahead with Tech Insights.
          </h2>
        </div>

        {/* CENTER COLUMN */}
        <div className="hero-col hero-col-center">
          <p className="hero-desc">
            Explore the latest updates, offers, and valuable insights from
            PR WEBSTOCK — your trusted partner in modern software
            development, digital marketing, and business growth technology.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hero-col hero-col-right">
          <a className="hero-circle" href="/blog">
            <div className="hero-circle-text">
              View All Blog ↗
              <span className="hero-circle-underline"></span>
            </div>
          </a>
        </div>
      </header>

      {/* BLOG LIST */}
      <section className="bgx-grid">
        {loading ? (
          <h3>Loading Blogs...</h3>
        ) : (
          blogs.map((blog) => {
            const date = formatDate(blog.publishDate);

            return (
              <article className="bgx-card" key={blog._id}>
             <div className="bgx-image-wrap">
                  <img
                    className="bgx-image"
                    src={
                      blog.image
                        ? `${API.defaults.baseURL.replace("/api", "")}${blog.image}`
                        : "/placeholder-blog.jpg"
                    }
                    alt={blog.title}
                    loading="lazy"
                  />

                  <time className="bgx-date-bubble">
                    <span className="bgx-day">{date.day}</span>
                    <span className="bgx-month">{date.month}</span>
                  </time>
                </div>

                <div className="bgx-meta">
                  <span className="bgx-category">
                    {blog.category}
                  </span>

                  <span className="bgx-divider">|</span>

                  <span className="bgx-comments">
                    By {blog.adminName}
                  </span>
                </div>

                <h3 className="bgx-title">{blog.title}</h3>

                <a
                  className="bgx-read"
                  href={`/blog/${blog._id}`}
                >
                  Read More ↗
                </a>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};

export default BlogShowcase;