import React, { useState } from 'react';
import './LatestBlog.css';

// Asset Imports
import blogImg1 from '../../assets/latest-blog.png';
import blogImg2 from '../../assets/latest-blog1.png';
import blogImg3 from '../../assets/latest-blog2.png';

const BLOG_POSTS = [
  {
    id: 1,
    date: '28 JAN',
    category: 'Business',
    author: 'By - John Alex',
    title: 'Potential with Expert Training & Education',
    image: blogImg1,
    theme: 'cyan',
  },
  {
    id: 2,
    date: '29 JAN',
    category: 'Business',
    author: 'Anjelina Watson',
    title: 'Professional Skill Development Training Center',
    image: blogImg2,
    theme: 'mint',
  },
  {
    id: 3,
    date: '30 JAN',
    category: 'Business',
    author: 'David X. Barmer',
    title: 'New Skills with Our Expert Training Guides',
    image: blogImg3,
    theme: 'orange',
  },
];

const LatestBlog = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed successfully with ${email}`);
      setEmail('');
    }
  };

  return (
    <section className="LatestBlog-section">
      <div className="LatestBlog-inner-container">
        {/* Top Header Row */}
        <div className="LatestBlog-header-row">
          <div className="LatestBlog-heading-badge-col">
            <div className="LatestBlog-badge">
              <span className="LatestBlog-badge-square"></span>
              <span className="LatestBlog-badge-text">LATEST BLOG</span>
            </div>
            <div className="LatestBlog-header-line"></div>
          </div>

          <h2 className="LatestBlog-main-title">
            Interactive Online Learning <br className="LatestBlog-title-br" />
            Portals Virtual Classroom
          </h2>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="LatestBlog-cards-grid">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="LatestBlog-card">
              {/* Image with Flower-Bloom Hover */}
              <div className="LatestBlog-card-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title}
                  className="LatestBlog-card-image"
                />
                <span className={`LatestBlog-date-badge LatestBlog-date-badge--${post.theme}`}>
                  {post.date}
                </span>
              </div>

              {/* Card Body */}
              <div className="LatestBlog-card-body">
                <div className="LatestBlog-meta-info">
                  <span className={`LatestBlog-category-dot LatestBlog-category-dot--${post.theme}`}></span>
                  <span className="LatestBlog-category-name">{post.category}</span>
                  <span className="LatestBlog-author-name">{post.author}</span>
                </div>

                <h3 className="LatestBlog-card-title">{post.title}</h3>

                <div className="LatestBlog-card-divider"></div>

                {/* Continue Reading Button */}
                <div className="LatestBlog-btn-wrapper">
                  <button
                    type="button"
                    className={`LatestBlog-read-btn LatestBlog-read-btn--${post.theme}`}
                  >
                    <span className="LatestBlog-btn-text">Continue Reading</span>
                    <span className="LatestBlog-btn-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 16 16 12 12 8"></polyline>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Newsletter Section: Guaranteed Single-Line Form */}
      <div className="LatestBlog-newsletter-section">
        <div className="LatestBlog-inner-container">
          <div className="LatestBlog-newsletter-wrapper">
            <h3 className="LatestBlog-newsletter-title">
              Subscribe Our Newsletter For <br />
              Regular Updates
            </h3>

            <form onSubmit={handleSubscribe} className="LatestBlog-newsletter-form">
              <div className="LatestBlog-input-container">
                <span className="LatestBlog-mail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="LatestBlog-input-field"
                  required
                />
              </div>

              <button type="submit" className="LatestBlog-subscribe-btn">
                <span className="LatestBlog-subscribe-btn-text">Subscribe Now</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;