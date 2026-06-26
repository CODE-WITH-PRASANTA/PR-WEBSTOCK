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

const AccountBdmExe = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/careers");

      const jobsData =
        Array.isArray(res.data)
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
      {jobs.map((job) => (
        <div className="AccountBdmExe-card" key={job._id}>
          <div className="AccountBdmExe-header">
            <h2 className="AccountBdmExe-title">
              {job.designation}
            </h2>

            <p
              className="AccountBdmExe-subtitle"
              dangerouslySetInnerHTML={{
                __html: job.description,
              }}
            />
          </div>

          <div className="AccountBdmExe-tableWrapper">
            <table className="AccountBdmExe-table">
              <tbody>
                <tr>
                  <th>
                    <FaMoneyBillWave />
                    Salary
                  </th>
                  <td>{job.salary}</td>

                  <th>
                    <FaMapMarkerAlt />
                    Location
                  </th>
                  <td>{job.location}</td>
                </tr>

                <tr>
                  <th>
                    <FaBriefcase />
                    Experience
                  </th>
                  <td>{job.experience}</td>

                  <th>
                    <FaUserTie />
                    Job Type
                  </th>
                  <td>{job.jobType}</td>
                </tr>

                <tr>
                  <th>
                    <FaUsers />
                    Vacancy
                  </th>
                  <td>{job.vacancy}</td>

                  <th>
                    <FaChartLine />
                    Skills
                  </th>
                  <td>{job.skills}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="AccountBdmExe-highlights">
            <h3>Key Highlights</h3>
            <p>{job.keyHighlight}</p>
          </div>

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
    </section>
  );
};

export default AccountBdmExe;