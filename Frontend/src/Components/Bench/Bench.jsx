import React, {
  useEffect,
  useState,
} from "react";
import "./Bench.css";
import {
  FiSearch,
  FiCornerUpLeft,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const Bench = () => {
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
    return <h2>Loading...</h2>;
  }

  return (
    <section className="bench-page">
      <div className="bench-container">

        {/* LEFT CONTENT */}

        <div className="bench-content">

          {/* DESCRIPTION */}

          <div
            dangerouslySetInnerHTML={{
              __html:
                blog.description,
            }}
          />

          {/* MEDIA IMAGE */}

          {blog.media && (
            <div className="featured-image">
              <img
                src={`http://localhost:5000${blog.media}`}
                alt={blog.title}
              />
            </div>
          )}

          {/* QUOTE */}

          {blog.quote && (
            <div className="quote-box">
              <span className="quote-mark">
                ❝
              </span>

              <p>{blog.quote}</p>
            </div>
          )}

          <hr />

          {/* COMMENTS SECTION */}

          <div className="comments-section">
            <h3>Comments</h3>
          </div>

          {/* COMMENT FORM */}

          <div className="reply-form">
            <h3>Leave a Reply</h3>

            <p>
              Your email address
              will not be
              published.
            </p>

            <div className="input-row">
              <input
                type="text"
                placeholder="Name"
              />

              <input
                type="email"
                placeholder="Email"
              />
            </div>

            <textarea
              rows="8"
              placeholder="Comment..."
            />

            <button>
              Post Comment
            </button>
          </div>

        </div>

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="sidebar-card search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search"
            />
          </div>

          {/* CATEGORY */}

          <div className="sidebar-card">
            <h3>Category</h3>

            <ul>
              <li>
                {blog.category}
              </li>
            </ul>
          </div>

          {/* TAGS */}

          <div className="sidebar-card">
            <h3>Tags</h3>

            <div className="tags">
              {blog.tags?.map(
                (tag, index) => (
                  <span
                    key={index}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* FEATURED IMAGE */}

          <div className="sidebar-card ad-banner">
            <img
              src={`http://localhost:5000${blog.image}`}
              alt={
                blog.title
              }
            />
          </div>

        </aside>
      </div>
    </section>
  );
};

export default Bench;