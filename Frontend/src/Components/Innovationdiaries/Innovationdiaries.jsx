import React, { useState } from 'react';
import './InnovationDiaries.css';

const posts = [
  {
    id: 1,
    category: 'Development',
    comments: 20,
    likes: 142,
    date: '03 January, 2024',
    title: 'Building Scalable Startups: From Zero to Market Leader',
    excerpt: 'Discover the framework that helped 50+ startups scale from initial concept to market dominance using lean methodologies.',
    image: 'https://img.freepik.com/free-photo/hand-touching-digital-screen-with-data-visualization_23-2151964669.jpg?t=st=1764935226~exp=1764938826~hmac=0806ee4ce75bddc7a333abc1522592e213c103050975520cc431ce8b23b80778&w=1060',
    author: 'Alex Morgan',
    readTime: '5 min read',
    isPremium: true
  },
  {
    id: 2,
    category: 'Cyber Security',
    comments: 12,
    likes: 89,
    date: '05 January, 2024',
    title: 'Advanced Security Protocols for Modern Startups',
    excerpt: 'Implement enterprise-grade security on a startup budget with our comprehensive guide to threat prevention.',
    image: 'https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?t=st=1764935265~exp=1764938865~hmac=f3e5ef8a05c003bc6a90e6e68ceb04ec0385f10261734fadf077e631b65367f4&w=1060',
    author: 'Sam Rivera',
    readTime: '7 min read',
    isPremium: false
  },
  {
    id: 3,
    category: 'Consulting',
    comments: 18,
    likes: 156,
    date: '12 January, 2024',
    title: 'Innovation Strategy: Disrupting Established Markets',
    excerpt: 'Learn how to identify market gaps and execute disruptive innovation strategies that challenge industry leaders.',
    image: 'https://img.freepik.com/free-photo/man-using-digital-tablet-psd-mockup-smart-technology_53876-110815.jpg?t=st=1764935193~exp=1764938793~hmac=c46bc000883b0e8b08e9762000efa8b964f981e5cbc335c32941e80f05109109&w=1060',
    author: 'Jordan Lee',
    readTime: '6 min read',
    isPremium: true
  },
  
];

export default function InnovationDiaries() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getAuthorInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section className="innovation-diaries-wrap">
      <div className="innovation-container">
        <h2 className="innovation-section-title">
          <span>The Innovation Diaries</span>
        </h2>
        <p className="innovation-subtitle">
          Expert insights, strategies, and stories from the forefront of technology 
          and business innovation. Stay ahead with cutting-edge content powered by data-driven analysis.
        </p>
        
        <div className="innovation-posts-grid">
          {posts.map((post) => (
            <article 
              className="innovation-post-card" 
              key={post.id}
              onMouseEnter={() => handleMouseEnter(post.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="innovation-post-image">
                <img 
                  src={post.image} 
                  alt={`${post.title} thumbnail`} 
                  style={{
                    transform: hoveredCard === post.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                
                {/* Image Overlay on Hover */}
                <div 
                  className="innovation-post-image-overlay"
                  style={{
                    opacity: hoveredCard === post.id ? 1 : 0,
                    transform: hoveredCard === post.id ? 'translateY(0)' : 'translateY(10px)'
                  }}
                >
                  <h4>Article Stats</h4>
                  <div className="innovation-overlay-stats">
                    <div className="innovation-overlay-stat">
                      <div className="innovation-overlay-stat-value">{formatNumber(post.likes)}</div>
                      <div className="innovation-overlay-stat-label">Likes</div>
                    </div>
                    <div className="innovation-overlay-stat">
                      <div className="innovation-overlay-stat-value">{post.comments}</div>
                      <div className="innovation-overlay-stat-label">Comments</div>
                    </div>
                    <div className="innovation-overlay-stat">
                      <div className="innovation-overlay-stat-value">{post.readTime.split(' ')[0]}</div>
                      <div className="innovation-overlay-stat-label">Read Time</div>
                    </div>
                  </div>
                </div>
                
                <span className="innovation-date-badge">{post.date}</span>
                
              </div>

              <div className="innovation-post-meta">
                <a href="#" className="innovation-post-category">{post.category}</a>
                <span className="innovation-post-comments">{post.comments} comments</span>
              </div>

              <h3 className="innovation-post-title">{post.title}</h3>
              
              <p className="innovation-post-excerpt">{post.excerpt}</p>
              
              

              <a className="innovation-read-more" href="#">
                Read Full Article
              </a>
            </article>
          ))}
        </div>
        
        
      </div>
    </section>
  );
}