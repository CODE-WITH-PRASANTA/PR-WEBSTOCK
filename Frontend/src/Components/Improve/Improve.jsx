import React from "react";
import "./Improve.css";
import { FiUser, FiCalendar } from "react-icons/fi";

const Improve = () => {
  return (
    <section className="improve-section">
      <div className="improve-container">
        <h1 className="improve-title">
          The 5 Ways To Improve Your Credibility
          <br />
          Working From Home
        </h1>
 
        <div className="improve-meta">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Admin"
            className="admin-image"
          />

          <div className="meta-item">
            <FiUser />
            <span>ADMIN</span>
          </div>

          <span className="meta-dot">•</span>

          <div className="meta-item">
            <FiCalendar />
            <span>MARCH 1, 2023</span>
          </div>

          <span className="meta-dot">•</span>

          <div className="meta-item">
            <span>BUSINESS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Improve;