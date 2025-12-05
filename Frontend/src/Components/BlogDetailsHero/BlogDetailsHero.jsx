// BlogDetailsHero.jsx
import React from 'react';
import './BlogDetailsHero.css';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';
import { FaRegClock, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // optional — replace or remove if not using react-router

// hero image (use exactly this import path)
import heroImg from '../../assets/hero.webp';
import avatarImg from '../../assets/comment2.webp'; // small circular avatar — reuse existing image as in your project

const BlogDetailsHero = () => {
  return (
    <section className="BlogDetails-hero">
      <div className="hero-inner">
        {/* category badge — top-left over image */}
        <span className="hero-badge" aria-hidden>Creative</span>

        {/* hero image */}
        <div className="hero-media">
          <img src={heroImg} alt="Hero visual" className="hero-media-img" />
        </div>

        {/* author + meta row beneath the image */}
        <div className="hero-meta-row">
          <div className="author-block">
            <img src={avatarImg} alt="Author avatar" className="author-avatar" />
            <div className="author-info">
              <span className="by-label">By,</span>
              {/* If you don't use react-router replace Link with <a href="#">Cooper Jogan</a> */}
              <Link to="#" className="author-name">Cooper Jogan</Link>
            </div>
          </div>

          <div className="post-stats" aria-hidden>
            <span className="stat">
              <FaRegClock className="stat-icon" /> <span className="stat-text">5 Jan, 2022</span>
            </span>

            <span className="stat-sep" aria-hidden>│</span>

            <span className="stat">
              <FaFire className="stat-icon" /> <span className="stat-text">3.9K View</span>
            </span>

            <span className="stat-sep" aria-hidden>│</span>

            <span className="stat">
              <HiOutlineChatAlt2 className="stat-icon" /> <span className="stat-text">840 Comment</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHero;
