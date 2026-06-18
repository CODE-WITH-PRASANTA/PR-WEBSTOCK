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
      {
        id: Date.now(),
        ...formData,
      },
      ...prev,
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
        {/* ================= FORM SECTION ================= */}
        <div className="project-user-form-section">
          <div className="project-user-card">
            <div className="project-user-header">
              <h2 className="project-user-title">Add Project</h2>
              <span className="project-user-badge">Dashboard</span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Upload Image */}
              <div className="project-user-field">
                <label>Upload Project Image</label>
                <input
                  type="file"
                  id="projectImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Preview Image */}
              {formData.image && (
                <div className="project-user-image-preview">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="project-user-preview-image-large"
                  />
                </div>
              )}

              {/* Project Name */}
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

              {/* Description */}
              <div className="project-user-field">
                <label>Project Description</label>
                <textarea
                  name="projectDescription"
                  placeholder="Enter project description"
                  value={formData.projectDescription}
                  onChange={handleChange}
                />
              </div>

              {/* Owner Name */}
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

        {/* ================= TABLE SECTION ================= */}
        <div className="project-user-table-section">
          <div className="project-user-card">
            <div className="project-user-header">
              <h2 className="project-user-title">Project List</h2>

              <span className="project-user-badge">
                {projects.length} Projects
              </span>
            </div>

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
                    projects.map((project) => (
                      <tr key={project.id}>
                        <td>
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.projectName}
                              className="project-user-preview-image"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>

                        <td>{project.projectName}</td>

                        <td>{project.projectDescription}</td>

                        <td>{project.ownerName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="project-user-empty"
                      >
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