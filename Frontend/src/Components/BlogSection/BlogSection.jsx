// BlogSection.jsx — full file (function name & class names preserved)
// Pagination updated to show "01 02 03 NXT →" as requested
import React from 'react';
import './BlogSection.css';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineLinkedin, AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF, FaBullhorn, FaPaintBrush, FaCode, FaMobileAlt, FaRegNewspaper } from 'react-icons/fa';
import { GiPencilRuler } from 'react-icons/gi';
import { AiOutlineLayout } from 'react-icons/ai';

// Adjust paths as needed
import img1 from '../../assets/blog-1.webp';
import img2 from '../../assets/blog-1.webp';
import img3 from '../../assets/blog-1.webp';
import img4 from '../../assets/blog-1.webp';
import img5 from '../../assets/blog-1.webp';
import img6 from '../../assets/blog-1.webp';

import pp1 from '../../assets/pp1.webp';
import pp2 from '../../assets/pp2.webp';
import pp3 from '../../assets/pp3.webp';


const posts = [
  { id: 1, image: img1, day: '15', month: 'January', category: 'Development', comments: 20, title: 'Decoding the Cloud — A Deep Dive into SaaS Trends.' },
  { id: 2, image: img2, day: '20', month: 'April', category: 'Cyber Security', comments: 12, title: 'Mastering Eficiency Tips and Tricks with our Zenfy.' },
  { id: 3, image: img3, day: '25', month: 'May', category: 'UI/UX', comments: 8, title: 'Design Systems that Scale — Practical Advice' },
  { id: 4, image: img4, day: '20', month: 'June', category: 'Web Dev', comments: 5, title: 'Modern Frontend Patterns for Performant Apps' },
  { id: 5, image: img5, day: '12', month: 'July', category: 'Marketing', comments: 14, title: 'Content Strategies that Actually Convert' },
  { id: 6, image: img6, day: '03', month: 'August', category: 'App Dev', comments: 9, title: 'Building Offline-First Mobile Experiences' },
];

// Popular posts shown in sidebar (3 items)
const popular = [
  { id: 'p1', thumb: pp1, date: '20 January, 2024', title: 'Looking Inspiration Traveling The World.' },
  { id: 'p2', thumb: pp2, date: '12 January, 2024', title: 'Challenges creating a multi-brand system.' },
  { id: 'p3', thumb: pp3, date: '04 January, 2024', title: 'Decoding the Cloud And Deep Dive Creative.' },
];

const tags = ['Creative','Web Design','Software','Industry','Marketing','Product','Optimization','Graphic','Natural'];

const categoriesList = [
  { key: 'digital', icon: <FaBullhorn />, label: 'Digital Marketing', count: 20 },
  { key: 'creative', icon: <FaPaintBrush />, label: 'Creative Agency', count: 15 },
  { key: 'webdesign', icon: <AiOutlineLayout />, label: 'Web Design', count: 25 },
  { key: 'webdev', icon: <FaCode />, label: 'Web Development', count: 30 },
  { key: 'content', icon: <FaRegNewspaper />, label: 'Content Marketing', count: 32 },
  { key: 'app', icon: <FaMobileAlt />, label: 'App Development', count: 35 },
  { key: 'uiux', icon: <GiPencilRuler />, label: 'UI/UX Design', count: 38 },
];

const BlogSection = () => {
  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="posts-column">
          <div className="posts-grid">
            {posts.map((p) => (
              <article key={p.id} className="post-card">
                <div className="post-media">
                  <img src={p.image} alt={p.title} className="post-image" />
                  <div className="date-bubble" aria-hidden>
                    <div className="date-day">{p.day}</div>
                    <div className="date-month">{p.month}</div>
                  </div>
                </div>

                <div className="post-body">
                  <div className="post-meta">
                    <a href="#" className="post-category">{p.category}</a>
                    <span className="meta-sep">|</span>
                    <span className="post-comments">
                      <HiOutlineChatAlt2 aria-hidden /> Comment ({p.comments})
                    </span>
                  </div>

                  <h3 className="post-title">{p.title}</h3>

                  <a href="#" className="read-more">
                    Read More <FiChevronRight className="icon-arrow" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination styled to match the screenshot: "01 02 03  NXT →" */}
          <div className="pagination" role="navigation" aria-label="Pagination">
            <button className="page-number active" aria-current="page" aria-label="Page 1">01</button>
            <button className="page-number" aria-label="Page 2">02</button>
            <button className="page-number" aria-label="Page 3">03</button>
            <button className="page-btn" aria-label="Next page">NXT <FiChevronRight /></button>
          </div>
        </div>

        <aside className="sidebar" aria-label="Sidebar">
          <div className="search-box">
            <h4>Search Here</h4>
            <div className="search-input">
              <input type="text" placeholder="Search Here" aria-label="search" />
              <button aria-label="search button" title="Search"><BiSearch size={18} /></button>
            </div>
          </div>

          <div className="categories">
            <h4>Category</h4>

            <ul className="cat-list">
              {categoriesList.map((c) => (
                <li key={c.key} className="category-item">
                  <button className="cat-btn" type="button" aria-label={`filter ${c.label}`}>
                    <span className="cat-icon" aria-hidden>{c.icon}</span>
                    <span className="cat-label">{c.label}</span>
                    <span className="cat-count">({c.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Popular Post ---------- */}
          <div className="sidebar-card popular-posts">
            <h4>Popular Post</h4>
            <div className="popular-list">
              {popular.map((p) => (
                <div className="popular-item" key={p.id}>
                  <img src={p.thumb} alt={p.title} className="popular-thumb" />
                  <div className="popular-content">
                    <div className="popular-date">{p.date}</div>
                    <a href="#" className="popular-title">{p.title}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- New Tags ---------- */}
          <div className="sidebar-card new-tags">
            <h4>New Tags</h4>
            <div className="tag-list">
              {tags.map((t) => (
                <button type="button" className="tag" key={t}>{t}</button>
              ))}
            </div>
          </div>

          {/* ---------- Social Share ---------- */}
          <div className="sidebar-card social-share">
            <h4>Social Share</h4>
            <div className="social-list">
              <a href="#" className="social-item" aria-label="share to LinkedIn">
                <span className="s-icon"><AiOutlineLinkedin /></span>
                <span className="s-label">LinkedIn</span>
              </a>
              <a href="#" className="social-item" aria-label="share to Facebook">
                <span className="s-icon"><FaFacebookF /></span>
                <span className="s-label">Facebook</span>
              </a>
              <a href="#" className="social-item" aria-label="share to Twitter">
                <span className="s-icon"><AiOutlineTwitter /></span>
                <span className="s-label">Twitter</span>
              </a>
              <a href="#" className="social-item" aria-label="share to Instagram">
                <span className="s-icon"><AiOutlineInstagram /></span>
                <span className="s-label">Instagram</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogSection;
