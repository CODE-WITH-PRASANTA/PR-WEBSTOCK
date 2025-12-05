import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./CareerBlogAndArticle.css";

import BlogArticle1 from "../../assets/Blog&Article1.webp";
import BlogArticle2 from "../../assets/Blog&Article2.webp";
import BlogArticle3 from "../../assets/Blog&Article3.webp";

const CareerBlogAndArticle = () => {
  const items = [
    {
      img: BlogArticle1,
      title: "Unemployment has no room",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      img: BlogArticle2,
      title: "The potential in you",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
      img: BlogArticle3,
      title: "A successful career",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
  ];

  return (
    <section className="careerblog">
      <div className="careerblog-header">
        <h2>Blog & Article</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>

      <div className="careerblog-grid">
        {items.map((item, i) => (
          <div className="careerblog-card" key={i}>
            <div className="careerblog-imgwrap">
              <img src={item.img} alt={item.title} />

              {/* EXACT DATE BADGE */}
              <div className="careerblog-date">
                <span className="day">30</span>
                <span className="month">Mar</span>
              </div>

              {/* BACK RED SLANTED CORNER */}
              <div className="careerblog-date-corner"></div>
            </div>

            <div className="careerblog-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <button className="careerblog-btn">
                <FiArrowRight />
                <span>Learn more</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerBlogAndArticle;
