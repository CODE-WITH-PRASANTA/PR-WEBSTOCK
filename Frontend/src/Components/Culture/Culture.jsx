import React from "react";
import "./Culture.css";
import { FiCalendar } from "react-icons/fi";

const Culture = () => {
  const blogs = [
    {
      id: 1,
      title: "Why Remote Work Culture Is Here To Stay",
      date: "MARCH 10, 2023",
      description:
        "Remote work has transformed modern business operations, providing flexibility and productivity benefits...",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      title: "Top 10 Startup Trends To Watch In 2025",
      date: "MARCH 15, 2023",
      description:
        "Entrepreneurs are embracing AI, green technology, and lean strategies to stay ahead in 2025’s competitive market...",
      image: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 3,
      title: "How Digital Marketing Is Evolving Rapidly",
      date: "MARCH 20, 2023",
      description:
        "From influencer collaborations to immersive campaigns, marketing strategies continue to evolve for online engagement...",
      image: "https://i.pravatar.cc/150?img=18",
    },
  ];

  return (
    <section className="culture-section">
      <div className="culture-container">
        {blogs.map((blog) => (
          <div className="culture-card" key={blog.id}>
            <div className="culture-meta">
              <img
                src={blog.image}
                alt="author"
                className="culture-author-img"
              />

              <div className="culture-info">
                <span className="author-name">Admin</span>

                <span className="dot">-</span>

                <span className="blog-date">
                  <FiCalendar />
                  {blog.date}
                </span>
              </div>
            </div>

            <h2 className="culture-title">{blog.title}</h2>

            <div className="title-line"></div>

            <p className="culture-description">{blog.description}</p>

            <button className="read-btn">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Culture;