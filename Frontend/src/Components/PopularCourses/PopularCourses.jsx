import React, { useState, useEffect } from 'react';
import './PopularCourses.css';

import courseImg1 from '../../assets/popular-courses1.png';
import courseImg2 from '../../assets/popular-courses2.png';
import courseImg3 from '../../assets/popular-courses3.png';
import marqueeIcon from '../../assets/marquee-icon.png';

const COURSES_DATA = [
  {
    id: 1,
    tag: 'ONLINE LEARNING',
    title: 'Advance Your Career with Our Training Programs',
    price: '$60',
    lessons: 8,
    students: 6,
    rating: '5.0/ 3 Ratings',
    image: courseImg1,
    categories: ['all', 'online-learning', 'development'],
  },
  {
    id: 2,
    tag: 'EXPERT TRAINING',
    title: 'Education That Transforms Choose Your Course',
    price: '$50',
    lessons: 8,
    students: 6,
    rating: '5.0/ 3 Ratings',
    image: courseImg2,
    categories: ['all', 'business', 'finance'],
  },
  {
    id: 3,
    tag: 'LIFELONG SUCCESS',
    title: 'Professional Training for Lifelong Success',
    price: '$70',
    lessons: 8,
    students: 6,
    rating: '5.0/ 3 Ratings',
    image: courseImg3,
    categories: ['all', 'online-learning', 'business', 'development'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'online-learning', label: 'Online Learning' },
  { id: 'business', label: 'Business' },
  { id: 'development', label: 'Development' },
  { id: 'finance', label: 'Finance' },
];

const MARQUEE_ITEMS = [
  'LEARNING INNOVATION',
  'WORLDWIDE LEARNERS',
  'UNIQUE KNOWLEDGE',
  'DREAM TRAINING',
  'EXPERT INSTRUCTORS',
  'GLOBAL COMMUNITY',
];

const PopularCourses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedCategory, setDisplayedCategory] = useState('all');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleCategoryChange = (catId) => {
    if (catId === activeCategory || isAnimatingOut) return;
    setActiveCategory(catId);
    setIsAnimatingOut(true);
  };

  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        setDisplayedCategory(activeCategory);
        setIsAnimatingOut(false);
      }, 350); // Matches the exit transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, activeCategory]);

  const filteredCourses = COURSES_DATA.filter((course) =>
    course.categories.includes(displayedCategory)
  );

  return (
    <section className="PopularCourses-container">
      <div className="PopularCourses-inner-wrapper">
        {/* Header Section */}
        <div className="PopularCourses-header-row">
          <div className="PopularCourses-heading-col">
            <span className="PopularCourses-subtitle">
              <span className="PopularCourses-subtitle-square"></span>
              UNIQUE ONLINE COURSES
            </span>
            <h2 className="PopularCourses-title">Popular Courses Revealed</h2>
          </div>

          {/* Filter Pills */}
          <div className="PopularCourses-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`PopularCourses-filter-btn ${
                  activeCategory === cat.id ? 'PopularCourses-filter-btn--active' : ''
                }`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid with Smooth Bloom-In and Fold-Out */}
        <div className="PopularCourses-grid">
          {filteredCourses.map((course, index) => {
            const bloomClass = isAnimatingOut
              ? `PopularCourses-card--fold-${(index % 3) + 1}`
              : `PopularCourses-card--bloom-${(index % 3) + 1}`;

            return (
              <div
                key={course.id}
                className={`PopularCourses-card ${bloomClass}`}
                style={{
                  animationDelay: isAnimatingOut ? '0s' : `${index * 0.08}s`,
                }}
              >
                {/* Card Image and Badge */}
                <div className="PopularCourses-card-img-wrap">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="PopularCourses-card-img"
                  />
                  <span className="PopularCourses-card-badge">{course.price}</span>
                </div>

                {/* Card Body */}
                <div className="PopularCourses-card-body">
                  <span className="PopularCourses-card-tag">{course.tag}</span>
                  <h3 className="PopularCourses-card-title">{course.title}</h3>

                  <div className="PopularCourses-card-meta">
                    <div className="PopularCourses-card-meta-item">
                      <svg
                        className="PopularCourses-meta-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      <span>Lessons {course.lessons}</span>
                    </div>

                    <div className="PopularCourses-card-meta-item">
                      <svg
                        className="PopularCourses-meta-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                      <span>Students {course.students}</span>
                    </div>
                  </div>

                  <div className="PopularCourses-card-rating">
                    <div className="PopularCourses-card-stars">★★★★★</div>
                    <span className="PopularCourses-card-rating-text">
                      ({course.rating})
                    </span>
                  </div>

                  {/* Enroll Button */}
                  <div className="PopularCourses-card-btn-wrap">
                    <button type="button" className="PopularCourses-card-btn">
                      <span className="PopularCourses-card-btn-text">
                        Enroll Now &rarr;
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Infinite Continuous Marquee */}
      <div className="PopularCourses-marquee-bar">
        <div className="PopularCourses-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="PopularCourses-marquee-item">
              <span className="PopularCourses-marquee-text">{item}</span>
              <img
                src={marqueeIcon}
                alt="flower star"
                className="PopularCourses-marquee-star"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;