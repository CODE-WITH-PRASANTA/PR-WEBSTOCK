import React from "react";
import "./CareerBrowseJob.css";
import { FiSearch, FiMapPin, FiChevronDown, FiArrowRight } from "react-icons/fi";

const CareerBrowseJob = () => {
  return (
    <section className="careerbrowsejob-section">
      <div className="careerbrowsejob-container">
        {/* LEFT — FORM */}
        <div className="careerbrowsejob-left">
          <h2 className="careerbrowsejob-heading">Find Your Perfect Job</h2>
          <p className="careerbrowsejob-sub">
            Search openings tailored to your skills, location and passion.
            Easily explore thousands of opportunities in one simple step.
          </p>

          <div className="careerbrowsejob-form">
            <div className="careerbrowsejob-input">
              <FiSearch className="careerbrowsejob-input-icon" />
              <input type="text" placeholder="Job title, Company, Keyword" />
            </div>

            <div className="careerbrowsejob-input">
              <FiMapPin className="careerbrowsejob-input-icon" />
              <input type="text" placeholder="City, Country" />
            </div>

            <div className="careerbrowsejob-select">
              <select>
                <option>Select Category</option>
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Management</option>
              </select>
              <FiChevronDown className="careerbrowsejob-select-icon" />
            </div>

            <button className="careerbrowsejob-btn">
              Search Jobs <FiArrowRight />
            </button>
          </div>
        </div>

        {/* RIGHT — INFO CARD */}
        <div className="careerbrowsejob-rightcard">
          <h3 className="careerbrowsejob-card-title">Browse Job</h3>

          <p className="careerbrowsejob-card-desc">
            Discover job roles curated specially for you.
            Explore verified companies, trending industries, and fast-growing startups.
          </p>

          <ul className="careerbrowsejob-card-list">
            <li>✔ Instant job recommendations tailored to your profile</li>
            <li>✔ Trusted company reviews & transparent salary insights</li>
            <li>✔ Smart filters and easy advanced search system</li>
          </ul>

          <button className="careerbrowsejob-card-btn">
            Learn More <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerBrowseJob;
