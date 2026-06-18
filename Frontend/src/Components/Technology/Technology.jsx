import React, { useState } from "react";
import "./Technology.css";
import { FiArrowUpRight } from "react-icons/fi";

const Technology = () => {
  const projects = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      title: "Software Development",
      category: "Marketing, Software",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      title: "Health App Development",
      category: "Business",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
      title: "Marketing Agency Website",
      category: "Security",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
      title: "Financial Dashboard",
      category: "Finance, Analytics",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
      title: "Corporate Management Tool",
      category: "Business",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      title: "Data Analytics Platform",
      category: "Technology",
    },
  ];

  const [activePage, setActivePage] = useState(1);

  return (
    <section className="technology-section">
      <div className="technology-container">
        {projects.map((item) => (
          <div className="technology-card" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="technology-image"
            />

            <div className="technology-overlay"></div>

            <div className="technology-arrow">
              <FiArrowUpRight />
            </div>

            <div className="technology-content">
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="technology-pagination">
        <button
          className={activePage === 1 ? "active" : ""}
          onClick={() => setActivePage(1)}
        >
          1
        </button>

        <button
          className={activePage === 2 ? "active" : ""}
          onClick={() => setActivePage(2)}
        >
          2
        </button>
      </div>
    </section>
  );
};

export default Technology;