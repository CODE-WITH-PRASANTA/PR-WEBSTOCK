import React, { useState } from "react";
import "./ProjectUser.css";

const ProjectUser = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    ownerName: "",
    image: null,
  });

  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.projectName ||
      !formData.projectDescription ||
      !formData.ownerName
    ) {
      alert("Please fill all fields");
      return;
    }

    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      projectName: "",
      projectDescription: "",
      ownerName: "",
      image: null,
    });

    document.getElementById("projectImage").value = "";
  };

  return (
    <div className="project-user">
      <div className="project-user-container">
        {/* FORM SECTION */}
        <div className="project-user-form-section">
          <div className="project-user-card">
            <h2 className="project-user-title">Add Project</h2>

            <form onSubmit={handleSubmit}>
              <div className="project-user-field">
                <label>Upload Project Image</label>
                <input
                  type="file"
                  id="projectImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="project-user-field">
                <label>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  placeholder="Enter project name"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </div>

              <div className="project-user-field">
                <label>Project Description</label>
                <textarea
                  name="projectDescription"
                  placeholder="Enter project description"
                  value={formData.projectDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="project-user-field">
                <label>Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Enter owner name"
                  value={formData.ownerName}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="project-user-submit-btn">
                Submit Project
              </button>
            </form>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="project-user-table-section">
          <div className="project-user-card">
            <h2 className="project-user-title">Live Preview Table</h2>

            <div className="project-user-table-wrapper">
              <table className="project-user-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Owner</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.length > 0 ? (
                    projects.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt="project"
                              className="project-user-preview-image"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>

                        <td>{item.projectName}</td>
                        <td>{item.projectDescription}</td>
                        <td>{item.ownerName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="project-user-empty">
                        No Projects Added Yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectUser;