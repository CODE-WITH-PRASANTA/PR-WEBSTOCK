import React from "react";
import "./Growth.css";

const Growth = () => {
  const blogs = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
      title: "How to Boost Your Business Growth in 2025",
      description:
        "Learn proven strategies that will help your business grow faster and stay ahead in today's competitive market.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      title: "Top Digital Marketing Trends to Watch",
      description:
        "Discover the emerging marketing trends that will shape the future of online brand engagement.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200",
      title: "Mindset Secrets of Successful Entrepreneurs",
      description:
        "Get inspired by the habits and mindset techniques that top entrepreneurs use to achieve lasting success.",
    },
  ];

  return (
    <section className="growth-section">
      <div className="growth-container">
        {blogs.map((blog) => (
          <div className="growth-card" key={blog.id}>
            <div className="growth-image">
              <img src={blog.image} alt={blog.title} />
            </div>

            <div className="growth-content">
              <h3>{blog.title}</h3>

              <p>{blog.description}</p>

              <button className="growth-btn">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Growth;