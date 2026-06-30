import React from "react";
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
import "./AccountBdmExe.css";

const AccountBdmExe = () => {
  return (
    <section className="AccountBdmExe">
      <div className="AccountBdmExe-card">

        {/* Header */}
        <div className="AccountBdmExe-header">
          <h2 className="AccountBdmExe-title">
            Accounts & BDM Executive (Intern)
          </h2>

          <p className="AccountBdmExe-subtitle">
            We are hiring a dedicated candidate for accounts handling and
            business development activities.
          </p>
        </div>

        {/* Job Details */}
        <div className="AccountBdmExe-tableWrapper">
          <table className="AccountBdmExe-table">
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
                <td>Bhubaneswar (On-site)</td>
              </tr>

              <tr>
                <th>
                  <FaBriefcase />
                  Experience
                </th>
                <td>0 – 1 Years</td>

                <th>
                  <FaUserTie />
                  Job Type
                </th>
                <td>Internship → Full-Time</td>
              </tr>

              <tr>
                <th>
                  <FaUsers />
                  Vacancy
                </th>
                <td>5</td>

                <th>
                  <FaChartLine />
                  Skills
                </th>
                <td>
                  Basic Accounting, Excel, Billing, Canva
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Highlights */}
        <div className="AccountBdmExe-highlights">
          <h3>Key Highlights:</h3>

          <p>
            Stipend + TA/DA, Career growth, Learning opportunity
          </p>
        </div>

        {/* Buttons */}
        <div className="AccountBdmExe-actions">
          <a
            href="https://wa.me/917789801327"
            target="_blank"
            rel="noopener noreferrer"
            className="AccountBdmExe-whatsappBtn"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <button className="AccountBdmExe-applyBtn">
            <FiSend />
            Apply Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default AccountBdmExe;