import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./Careerobject.css";

const Careerobject = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    keyHighlight: "",
    salary: "",
    experience: "",
    location: "",
    vacancy: "",
    jobType: "",
    skills: "",
    whatsapp: "",
  });

  const [jobs, setJobs] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setJobs([
      {
        id: Date.now(),
        ...formData,
      },
      ...jobs,
    ]);

    setFormData({
      name: "",
      designation: "",
      description: "",
      keyHighlight: "",
      salary: "",
      experience: "",
      location: "",
      vacancy: "",
      jobType: "",
      skills: "",
      whatsapp: "",
    });
  };

  return (
    <div className="career-object">
      <div className="career-object-container">
        {/* FORM SIDE */}

        <div className="career-object-form-section">
          <div className="career-object-card">
            <h2 className="career-object-title">
              Create Job Opportunity
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name + Designation */}

              <div className="career-object-grid">
                <div className="career-object-field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                </div>

                <div className="career-object-field">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Frontend Developer"
                  />
                </div>
              </div>

              {/* TinyMCE */}

              <div className="career-object-field">
                <label>Description</label>

                <Editor
                  value={formData.description}
                  onEditorChange={(content) =>
                    setFormData({
                      ...formData,
                      description: content,
                    })
                  }
                  init={{
                    height: 250,
                    menubar: false,
                    plugins:
                      "lists link image table code wordcount",
                    toolbar:
                      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | code",
                    skin: "oxide-dark",
                    content_css: "dark",
                  }}
                />
              </div>

              <div className="career-object-field">
                <label>Key Highlights</label>
                <textarea
                  name="keyHighlight"
                  value={formData.keyHighlight}
                  onChange={handleChange}
                />
              </div>

              <div className="career-object-grid">
                <div className="career-object-field">
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>

                <div className="career-object-field">
                  <label>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="career-object-grid">
                <div className="career-object-field">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="career-object-field">
                  <label>Vacancy</label>
                  <input
                    type="number"
                    name="vacancy"
                    value={formData.vacancy}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="career-object-field">
                <label>Job Type</label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="career-object-field">
                <label>Skills Required</label>

                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="career-object-field">
                <label>WhatsApp Number</label>

                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
              </div>

              <button
                className="career-object-submit-btn"
                type="submit"
              >
                Submit Job
              </button>
            </form>
          </div>
        </div>

        {/* TABLE SIDE */}

        <div className="career-object-table-section">
          <div className="career-object-card">
            <h2 className="career-object-title">
              Live Job Preview
            </h2>

            <div className="career-object-table-wrapper">
              <table className="career-object-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Location</th>
                    <th>Job Type</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.name}</td>
                      <td>{job.designation}</td>
                      <td>{job.salary}</td>
                      <td>{job.location}</td>
                      <td>{job.jobType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {jobs.map((job) => (
              <div
                className="career-object-preview-card"
                key={job.id}
              >
                <h3>{job.designation}</h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: job.description,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careerobject;