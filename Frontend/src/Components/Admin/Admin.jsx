import React from "react";
import "./Admin.css";
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Admin = () => {
  const blogs = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "The 5 Ways To Improve Your Credibility Working From Home",
      description:
        "As a small-business owner, it's important to find high-quality information and educational resources you can trust to...",
      path: "/working",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Fintech Startup Will Finance The Women-Owned Businesses",
      description:
        "As a small-business owner, it's important to find high-quality information and educational resources you can trust to...",
      path: "/working",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "4 Ways Businesses Can Conduct Productive Time Management",
      description:
        "As a small-business owner, it's important to find high-quality information and educational resources you can trust to...",
      path: "/timemanagement",
    },
  ];

  return (
    <section className="admin-section">
      <div className="admin-container">
        {blogs.map((blog) => (
          <article className="admin-card" key={blog.id}>
            <div className="admin-image">
              <img src={blog.image} alt={blog.title} />
            </div>

            <div className="admin-content">
              <div className="admin-meta">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Admin"
                  className="admin-avatar"
                />

                <span className="admin-name">ADMIN</span>

                <span className="admin-dot">•</span>

                <span className="admin-date">
                  <FiCalendar />
                  MARCH 1, 2023
                </span>
              </div>

              <h2>{blog.title}</h2>

              <div className="admin-line"></div>

              <p>{blog.description}</p>

              <Link to={blog.path} className="admin-btn">
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