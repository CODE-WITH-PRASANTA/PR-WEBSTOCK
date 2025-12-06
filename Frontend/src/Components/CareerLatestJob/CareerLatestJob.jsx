import React from "react";
import "./CareerLatestJob.css";

import logo1 from "../../assets/logo-1.webp";
import logo2 from "../../assets/logo-2.webp";
import logo3 from "../../assets/logo-3.webp";

import { FaFacebookF, FaTwitter, FaYoutube, FaCheckCircle } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

const jobList = [
  {
    id: 1,
    logo: logo1,
    company: "NextTech",
    location: "London UK",
    title: "Web Developer",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    perks: ["But must explain", "Full Time", "$20k - $25k", "To you how all"],
    featured: false,
  },
  {
    id: 2,
    logo: logo2,
    company: "NextTech",
    location: "London UK",
    title: "Accounting",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    perks: ["But must explain", "Full Time", "$20k - $25k", "To you how all"],
    featured: true,
  },
  {
    id: 3,
    logo: logo3,
    company: "NextTech",
    location: "London UK",
    title: "Web Developer",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    perks: ["But must explain", "Full Time", "$20k - $25k", "To you how all"],
    featured: false,
  },
];

const CareerLatestJob = () => {
  return (
    <section className="careerlatestjob-section">
      <div className="careerlatestjob-container">
        <header className="careerlatestjob-header">
          <h2 className="careerlatestjob-title">Latest Job Listing</h2>
          <p className="careerlatestjob-sub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </header>

        <div className="careerlatestjob-cards">
          {jobList.map((job) => (
            <article key={job.id} className="careerlatestjob-card">
              {/* badge */}
              <div className="careerlatestjob-badge">
                <FaCheckCircle className="careerlatestjob-badge-icon" />
                <span>Recomendation</span>
              </div>

              {/* top row: logo / company / socials */}
              <div className="careerlatestjob-toprow">
                <div className="careerlatestjob-logo-wrap">
                  <img src={job.logo} alt={`${job.company} logo`} className="careerlatestjob-logo" />
                </div>

                <div className="careerlatestjob-company-wrap">
                  <div className="careerlatestjob-company-row">
                    <h3 className="careerlatestjob-company-name">{job.company}</h3>
                    <span className="careerlatestjob-location">{job.location}</span>
                  </div>
                </div>

                <div className="careerlatestjob-socials">
                  <button className="careerlatestjob-social-btn" aria-label="facebook">
                    <FaFacebookF />
                  </button>
                  <button className="careerlatestjob-social-btn" aria-label="twitter">
                    <FaTwitter />
                  </button>
                  <button className="careerlatestjob-social-btn" aria-label="youtube">
                    <FaYoutube />
                  </button>
                </div>
              </div>

              {/* role */}
              <h4 className="careerlatestjob-role">{job.title}</h4>

              {/* description */}
              <p className="careerlatestjob-desc">{job.desc}</p>

              {/* perks */}
              <ul className="careerlatestjob-perks">
                {job.perks.map((p, i) => (
                  <li key={i} className="careerlatestjob-perk-item">
                    <span className="careerlatestjob-check-circle">
                      <AiOutlineCheck />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* apply */}
              <div className="careerlatestjob-apply-wrap">
                <button
                  className={`careerlatestjob-apply ${job.featured ? "careerlatestjob-apply--yellow" : ""}`}
                >
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerLatestJob;
