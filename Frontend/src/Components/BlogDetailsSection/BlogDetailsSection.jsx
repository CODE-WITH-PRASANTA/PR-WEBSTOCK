// BlogDetailsSection.jsx
import React from 'react';
import './BlogDetailsSection.css';
import { FiChevronRight } from 'react-icons/fi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineLinkedin, AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookF, FaBullhorn, FaPaintBrush, FaCode, FaMobileAlt, FaRegNewspaper } from 'react-icons/fa';
import { GiPencilRuler } from 'react-icons/gi';
import { AiOutlineLayout } from 'react-icons/ai';
import { FiCornerUpLeft } from 'react-icons/fi';

// single image import as requested (used for hero, thumbs, avatars)
import img from '../../assets/blog-1.webp';
import cmnt1 from '../../assets/comment1.webp';
import cmnt2 from '../../assets/comment2.webp';
import cmnt3 from '../../assets/comment3.webp';
import cmnt4 from '../../assets/comment4.webp';
import cmnt5 from '../../assets/comment5.webp';
import la from '../../assets/la.webp';
import blogdetails from '../../assets/blogdetails1.webp';

import hero from '../../assets/hero.webp';
import pp1 from '../../assets/pp1.webp';
import pp2 from '../../assets/pp2.webp';
import pp3 from '../../assets/pp3.webp';







const popular = [
  { id: 'p1', thumb: pp1, date: '20 January, 2024', title: 'Looking Inspiration Traveling The World.' },
  { id: 'p2', thumb: pp2, date: '12 January, 2024', title: 'Challenges creating a multi-brand system.' },
  { id: 'p3', thumb: pp3, date: '04 January, 2024', title: 'Decoding the Cloud And Deep Dive Creative.' },
];

const tags = ['Industry', 'Marketing', 'Technology', 'Health Care'];

const comments = [
  {
    id: 1,
    avatar: cmnt1,
    name: 'Mr. Bowmik Haldar',
    date: '05 January, 2024',
    text: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replies: 2
  },
  {
    id: 2,
    avatar: cmnt2,
    name: 'Jacoline Juie',
    date: '05 January, 2024',
    text: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replies: 0
  },
  {
    id: 3,
    avatar: cmnt3,
    name: 'Robert Smith',
    date: '05 January, 2024',
    text: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replies: 0
  },
  {
    id: 4,
    avatar: cmnt4,
    name: 'Srileka Panday',
    date: '08 January, 2024',
    text: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replies: 2
  },
  {
    id: 5,
    avatar: cmnt5,
    name: 'Mr. Bowmik Haldar',
    date: '23 January, 2024',
    text: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replies: 0
  }
];

const categoriesList = [
  { key: 'digital', icon: <FaBullhorn />, label: 'Digital Marketing', count: 20 },
  { key: 'creative', icon: <FaPaintBrush />, label: 'Creative Agency', count: 15 },
  { key: 'webdesign', icon: <AiOutlineLayout />, label: 'Web Design', count: 25 },
  { key: 'webdev', icon: <FaCode />, label: 'Web Development', count: 30 },
  { key: 'content', icon: <FaRegNewspaper />, label: 'Content Marketing', count: 32 },
  { key: 'app', icon: <FaMobileAlt />, label: 'App Development', count: 35 },
  { key: 'uiux', icon: <GiPencilRuler />, label: 'UI/UX Design', count: 38 },
];

const BlogDetailsSection = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: wire up submission as needed
    // we'll keep this client-side-only by default
    alert('Thank you — your comment was received (demo).');
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* LEFT / DETAILS */}
        <div className="details-column">

          {/* INTRO + TESTIMONIAL */}
          <section className="intro-section" aria-label="Introduction">
            <p className="lead-welcome">
              <span className="lead-drop">W</span>elcome to our blog details page, your gateway to in-depth captivating narratives. Dive into thought-provoking
              articles, and engaging content that goes beyond the surface.
            </p>

            <p className="lead-paragraph">
              Whether you seek inspiration, industry trends, or informative guides, this is where knowledge meets curiosity. Explore, discover, and enrich
              your understanding as we navigate diverse topics, all tailored to ignite your intellect and keep you informed. Join us on this journey of
              exploration, where every click opens a new world of information, ideas, and inspiration. Embark on a journey of discovery as you delve into our
              blog's rich tapestry of content. From the latest trends to expert advice, we curate information that sparks curiosity and fuels your quest for knowledge.
            </p>

            <blockquote className="testimonial">
              <p className="testimonial-text">
                "I work with Alguneb Johnl on many projects, he always toldagona exceeds my expectations with his quality work and fastestopa tope service, very smooth and simple communication."
              </p>
            </blockquote>
          </section>

          {/* HERO */}
          <header className="hero-author" role="banner">
            <h1 className="author-name">Leslie Alexander</h1>
            <div className="hero-image-wrap">
              <img src={la} alt="Hero — Leslie Alexander project" className="hero-image" />
            </div>
          </header>

          {/* CONTENT BLOCKS */}
          <section className="details-block">
            <h2 className="details-heading">Unveiling Creative Journeys</h2>
            <p className="details-lead">
              Explore the dynamic stories behind our portfolio pieces on this blog details page. Each project is a testament to creativity, innovation,
              and collaboration. Immerse yourself in the narratives that shaped these creations, gain insights into our design philosophy, and discover
              the passion fueling our work.
            </p>

            <div className="project-grid">
              <article className="project-card">
                <img src={blogdetails} alt="Project 1" className="project-thumb" />
              </article>

              <article className="project-card">
                <img src={img} alt="Project 2" className="project-thumb" />
              </article>
            </div>
          </section>

          <section className="details-block">
            <h2 className="details-heading">Exploring Our Portfolio's Stories</h2>
            <p className="details-lead">
              Discover the intricate narratives behind our portfolio pieces on our blog details page. We offer a glimpse into the creative process and
              inspiration driving our projects, providing valuable insights and perspectives.
            </p>

            <div className="feature-list">
              <ul className="feature-col">
                <li>Nulla vestibulum vestibulum varius told this.</li>
                <li>Consequat congue sem. In convallis purus ut.</li>
                <li>Vitae efficitur risus molestie. Donec laoreet.</li>
              </ul>

              <ul className="feature-col">
                <li>Est vel feugiat dapibus. Quisque velit ullamcorper.</li>
                <li>Pharetra vitae, varius in dui. Cras et aliquam.</li>
                <li>Tortor eget vestibulum vestibulum, leo cursus.</li>
              </ul>
            </div>
          </section>

          {/* TAG / PREV-NEXT ROW */}
          <div className="tag-project-row">
            <div className="tag-line">
              <strong>Tag:</strong>
              <span className="tag-items">{tags.join(', ')}</span>
            </div>

            <hr className="thin-sep" />

            <div className="project-nav">
              <button className="proj-btn prev" aria-label="Previous project">
                <span className="proj-shape">⟲</span>
                <span className="proj-label">PRV PROJECT</span>
              </button>

              <div className="proj-mid">
                <p className="proj-desc">The complete gu unlocking your team’s power of our unique work.</p>
              </div>

              <button className="proj-btn next" aria-label="Next project">
                <span className="proj-label">NXT PROJECT</span>
                <span className="proj-shape">⟲</span>
              </button>
            </div>
          </div>

          {/* COMMENTS */}
          <section className="comments-section" aria-label="Comments">
            <h3 className="comments-heading">Comments (03)</h3>

            <div className="comments-list">
              {comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <img src={c.avatar} alt={c.name} className="comment-avatar" />
                  <div className="comment-body">
                    <div className="comment-head">
                      <span className="comment-name">{c.name},</span>
                      <span className="comment-date">{c.date}</span>
                    </div>

                    <p className="comment-text">{c.text}</p>

                    <div className="comment-actions">
                      <button className="reply-btn" aria-label={`Reply to ${c.name}`}><FiCornerUpLeft /> Reply {c.replies ? `(${String(c.replies).padStart(2, '0')})` : ''}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COMMENT FORM (NEW) */}
          <section className="comment-form-section" aria-label="Leave a comment">
            <form className="comment-form" onSubmit={handleSubmit}>
              <h2 className="form-heading">Leave Your Comment:</h2>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Your Name* :</label>
                  <input id="name" name="name" type="text" placeholder="Jackson Mile" required />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Your Email* :</label>
                  <input id="email" name="email" type="email" placeholder="example@gamil.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field full">
                  <label htmlFor="comment">Your Comments*</label>
                  <textarea id="comment" name="comment" rows="7" placeholder="Write Something..." required></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-post">Post Comment</button>
              </div>
            </form>
          </section>

        </div>

        {/* SIDEBAR (unchanged visual/ content) */}
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

          <div className="sidebar-card new-tags">
            <h4>New Tags</h4>
            <div className="tag-list">
              {tags.map((t) => (
                <button type="button" className="tag" key={t}>{t}</button>
              ))}
            </div>
          </div>

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

export default BlogDetailsSection;
