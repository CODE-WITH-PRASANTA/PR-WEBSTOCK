import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
  FaUsers,
  FaChartLine,
  FaWhatsapp,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import API from "../../api/axios";
import "./AccountBdmExe.css";

// Reusable Expandable Component for HTML Content (Description)
const ExpandableDescription = ({ htmlContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150; 

  const plainText = htmlContent ? htmlContent.replace(/<[^>]*>/g, "") : "";
  const isLongText = plainText.length > maxLength;

  if (!isLongText) {
    return (
      <p
        className="AccountBdmExe-subtitle"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  const renderedContent = isExpanded
    ? htmlContent
    : htmlContent.substring(0, maxLength) + "...";

  return (
    <div className="AccountBdmExe-expandableWrapper">
      <p
        className="AccountBdmExe-subtitle"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="AccountBdmExe-readMoreBtn"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

// Reusable Expandable Component for Plain Text (Skills)
const ExpandableSkills = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 60; // Shorter threshold for the grid cell layout

  const isLongText = text && text.length > maxLength;

  if (!isLongText) {
    return <span className="AccountBdmExe-value break-word">{text}</span>;
  }

  const renderedText = isExpanded ? text : text.substring(0, maxLength) + "...";

  return (
    <div className="AccountBdmExe-expandableWrapper AccountBdmExe-skillsWrapper">
      <span className="AccountBdmExe-value break-word">{renderedText}</span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="AccountBdmExe-readMoreBtn skills-btn"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

const AccountBdmExe = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/careers");

      const jobsData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setJobs(jobsData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="AccountBdmExe">
      <div className="AccountBdmExe-container">
        {jobs.map((job) => (
          <div className="AccountBdmExe-card" key={job._id}>
            {/* Header Area */}
            <div className="AccountBdmExe-header">
              <h2 className="AccountBdmExe-title">{job.designation}</h2>
              <ExpandableDescription htmlContent={job.description} />
            </div>

            {/* Grid Layout replacing the legacy HTML table */}
            <div className="AccountBdmExe-infoGrid">
              <div className="AccountBdmExe-infoRow">
                <div className="AccountBdmExe-infoItem">
                  <span className="AccountBdmExe-label">
                    <FaMoneyBillWave /> Salary
                  </span>
                  <span className="AccountBdmExe-value">{job.salary}</span>
                </div>
                <div className="AccountBdmExe-infoItem">
                  <span className="AccountBdmExe-label">
                    <FaMapMarkerAlt /> Location
                  </span>
                  <span className="AccountBdmExe-value">{job.location}</span>
                </div>
              </div>

              <div className="AccountBdmExe-infoRow">
                <div className="AccountBdmExe-infoItem">
                  <span className="AccountBdmExe-label">
                    <FaBriefcase /> Experience
                  </span>
                  <span className="AccountBdmExe-value">{job.experience}</span>
                </div>
                <div className="AccountBdmExe-infoItem">
                  <span className="AccountBdmExe-label">
                    <FaUserTie /> Job Type
                  </span>
                  <span className="AccountBdmExe-value">{job.jobType}</span>
                </div>
              </div>

              <div className="AccountBdmExe-infoRow">
                <div className="AccountBdmExe-infoItem">
                  <span className="AccountBdmExe-label">
                    <FaUsers /> Vacancy
                  </span>
                  <span className="AccountBdmExe-value">{job.vacancy}</span>
                </div>
                <div className="AccountBdmExe-infoItem full-width">
                  <span className="AccountBdmExe-label">
                    <FaChartLine /> Skills
                  </span>
                  <ExpandableSkills text={job.skills} />
                </div>
              </div>
            </div>

            {/* Highlights Area */}
            <div className="AccountBdmExe-highlights">
              <h3>Key Highlights</h3>
              <p>{job.keyHighlight}</p>
            </div>

            {/* Actions Area */}
            <div className="AccountBdmExe-actions">
              <a
                href={`https://wa.me/${job.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="AccountBdmExe-whatsappBtn"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

              <a
                href={`mailto:prwebstock.com@gmail.com?subject=Application for ${job.designation}&body=Hello Team,%0D%0A%0D%0AI would like to apply for the position of ${job.designation}.%0D%0A%0D%0AName:%0D%0APhone:%0D%0AEmail:%0D%0A%0D%0AThank You.`}
                className="AccountBdmExe-applyBtn"
              >
                <FiSend />
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountBdmExe;