import React from "react";
import "./BlogShowcase.css";

const BlogShowcase = () => {
  const entries = [
    {
      id: 1,
      date: { day: 15, month: "January" },
      category: "Development",
      comments: 20,
      title: "Decoding the Cloud — A Deep Dive into SaaS Trends.",
      img: "https://picsum.photos/seed/deskA/900/600"
    },
    {
      id: 2,
      date: { day: 20, month: "April" },
      category: "Cyber Security",
      comments: 22,
      title: "Mastering Efficacy Tips and Tricks with our Zenfy.",
      img: "https://picsum.photos/seed/deskB/900/600"
    },
    {
      id: 3,
      date: { day: 25, month: "April" },
      category: "Consulting",
      comments: 30,
      title: "From Ideas — How Xtore Transforms Workflows.",
      img: "https://picsum.photos/seed/deskC/900/600"
    }
  ];

  return (
    <div className="bgx-container">
      {/* ---------------- HEADER ---------------- */}
      <header className="bgx-hero hero-fixed">

        {/* ⭐ UPDATED BADGE ⭐ */}
        <div className="bgx-badge">
          <span className="star">★</span>
          BLOG & ARTICLE
          <span className="star">★</span>
        </div>

        <div className="hero-col hero-col-left">
          <h1 className="hero-title">Tech Tips and Trends</h1>
          <h2 className="hero-sub">Article Unveiled.</h2>
        </div>

        <div className="hero-col hero-col-center">
          <p className="hero-desc">
            Feel free to adapt this based on the specific managed services, 
            features, and unique selling points your IT service company provides.
          </p>
        </div>

        <div className="hero-col hero-col-right">
          <a className="hero-circle" href="#">
            <div className="hero-circle-text">
              View All Blog ↗
              <span className="hero-circle-underline"></span>
            </div>
          </a>
        </div>
      </header>

      {/* BLOG LIST */}
      <section className="bgx-grid">
        {entries.map((e) => (
          <article className="bgx-card" key={e.id}>
            <div className="bgx-image-wrap">
              <img className="bgx-image" src={e.img} alt={e.title} />
              <time className="bgx-date-bubble">
                <span className="bgx-day">{e.date.day}</span>
                <span className="bgx-month">{e.date.month}</span>
              </time>
            </div>

            <div className="bgx-meta">
              <a className="bgx-category" href="#">{e.category}</a>
              <span className="bgx-divider">|</span>
              <span className="bgx-comments">Comment ({e.comments})</span>
            </div>

            <h3 className="bgx-title">{e.title}</h3>
            <a className="bgx-read" href="#">Read More ↗</a>
          </article>
        ))}
      </section>
    </div>
  );
};

export default BlogShowcase;
