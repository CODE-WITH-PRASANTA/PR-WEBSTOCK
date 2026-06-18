import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaUserTie,
  FaUsers,
  FaCode,
  FaWhatsapp,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "./FrontendDev.css";

const FrontendDev = () => {
  return (
    <section className="FrontendDev">
      <div className="FrontendDev-card">
        
        {/* Header */}
        <div className="FrontendDev-header">
          <h2 className="FrontendDev-title">Frontend Developer</h2>
          <p className="FrontendDev-subtitle">
            We are looking for a skilled frontend developer to build modern,
            responsive web applications.
          </p>
        </div>

        {/* Details Table */}
        <div className="FrontendDev-tableWrapper">
          <table className="FrontendDev-table">
            <tbody>
              <tr>
                <th>
                  <FaMoneyBillWave />
                  Salary
                </th>
                <td>₹10000 – ₹12000</td>

                <th>
                  <FaMapMarkerAlt />
                  Location
                </th>
                <td>Bhubaneswar, Odisha</td>
              </tr>

              <tr>
                <th>
                  <FaBriefcase />
                  Experience
                </th>
                <td>1 – 3 Years</td>

                <th>
                  <FaUserTie />
                  Job Type
                </th>
                <td>Full-Time</td>
              </tr>

              <tr>
                <th>
                  <FaUsers />
                  Vacancy
                </th>
                <td>2</td>

                <th>
                  <FaCode />
                  Skills
                </th>
                <td>
                  React.js, JavaScript, HTML, CSS, API, Git
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Highlights */}
        <div className="FrontendDev-highlights">
          <h3>Key Highlights:</h3>
          <p>
            Real-time projects, Growth opportunity, Team collaboration
          </p>
        </div>

        {/* Buttons */}
        <div className="FrontendDev-actions">
          <a
            href="https://wa.me/917789801327"
            target="_blank"
            rel="noreferrer"
            className="FrontendDev-whatsappBtn"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <button className="FrontendDev-applyBtn">
            <FiSend />
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FrontendDev;