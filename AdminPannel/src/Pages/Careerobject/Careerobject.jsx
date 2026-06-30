import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import API from "../../api/axios";
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

 const fetchJobs = async () => {
  try {
    const res = await API.get("/careers");

    console.log("Career API Response:", res.data);

    const jobsData =
      Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.careers)
        ? res.data.careers
        : [];

    setJobs(jobsData);
  } catch (error) {
    console.log(error);
    setJobs([]);
  }
};

useEffect(() => {
  fetchJobs();
}, []);

  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editId) {
      await API.put(`/careers/${editId}`, formData);
    } else {
      await API.post("/careers", formData);
    }

    fetchJobs();

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

    setEditId(null);
  } catch (error) {
    console.log(error);
  }
};
const handleDelete = async (id) => {
  try {
    await API.delete(`/careers/${id}`);
    fetchJobs();
  } catch (error) {
    console.log(error);
  }
};

  const handleEdit = (job) => {
  setFormData({
    name: job.name,
    designation: job.designation,
    description: job.description,
    keyHighlight: job.keyHighlight,
    salary: job.salary,
    experience: job.experience,
    location: job.location,
    vacancy: job.vacancy,
    jobType: job.jobType,
    skills: job.skills,
    whatsapp: job.whatsapp,
  });

  setEditId(job._id);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <div className="career-object">
      <div className="career-object-container">

        {/* FORM SIDE */}

        <div className="career-object-form-section">
          <div className="career-object-card">
            <h2 className="career-object-title">
              {editId ? "Edit Job Opportunity" : "Create Job Opportunity"}
            </h2>

            <form onSubmit={handleSubmit}>

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

              {/* Description */}
<div className="career-object-field">
  <label>Description</label>

  <Editor
    apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
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
                  placeholder="Enter key highlights"
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
                    placeholder="₹25,000"
                  />
                </div>

                <div className="career-object-field">
                  <label>Experience</label>

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="2 Years"
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
                    placeholder="Bhubaneswar"
                  />
                </div>

                <div className="career-object-field">
                  <label>Vacancy</label>

                  <input
                    type="number"
                    name="vacancy"
                    value={formData.vacancy}
                    onChange={handleChange}
                    placeholder="5"
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
                  placeholder="React, JavaScript, CSS..."
                />
              </div>

              <div className="career-object-field">
                <label>WhatsApp Number</label>

                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <button
                className="career-object-submit-btn"
                type="submit"
              >
                {editId ? "Update Job" : "Submit Job"}
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
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                 {Array.isArray(jobs) && jobs.length > 0 ? (
                    jobs.map((job) => (
                     <tr key={job._id}>
                        <td>{job.name}</td>
                        <td>{job.designation}</td>
                        <td>{job.salary}</td>
                        <td>{job.location}</td>
                        <td>{job.jobType}</td>

                        <td>
                          <div className="career-object-actions">
                            <button
                              type="button"
                              className="career-edit-btn"
                              onClick={() => handleEdit(job)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="career-delete-btn"
                              onClick={() => handleDelete(job._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="career-object-empty"
                      >
                        No Jobs Added Yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* <div className="career-object-preview-list">
            {Array.isArray(jobs) &&
  jobs.map((job) => (
                <div
                  className="career-object-preview-card"
                 key={job._id}
                >
                  <h3>{job.designation}</h3>

                  <p>
                    <strong>Company:</strong> {job.name}
                  </p>

                  <p>
                    <strong>Salary:</strong> {job.salary}
                  </p>

                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>

                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>

                  <p>
                    <strong>Vacancy:</strong> {job.vacancy}
                  </p>

                  <p>
                    <strong>Job Type:</strong> {job.jobType}
                  </p>

                  <p>
                    <strong>Skills:</strong> {job.skills}
                  </p>

                  <p>
                    <strong>WhatsApp:</strong> {job.whatsapp}
                  </p>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.description,
                    }}
                  />
                </div>
              ))}
            </div> */}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Careerobject;