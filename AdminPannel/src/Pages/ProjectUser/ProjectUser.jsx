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
  const [editId, setEditId] = useState(null);

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

    if (editId) {
      setProjects((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...formData, id: editId } : item
        )
      );

      setEditId(null);
    } else {
      setProjects((prev) => [
        {
          id: Date.now(),
          ...formData,
        },
        ...prev,
      ]);
    }

    setFormData({
      projectName: "",
      projectDescription: "",
      ownerName: "",
      image: null,
    });

    document.getElementById("projectImage").value = "";
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((item) => item.id !== id));
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditId(project.id);
  };

  return (
    <div className="project-user">
      <div className="project-user-container">

        {/* FORM */}

        <div className="project-user-form-section">
          <div className="project-user-card">

            <div className="project-user-header">
              <h2 className="project-user-title">
                {editId ? "Edit Project" : "Add Project"}
              </h2>
              <span className="project-user-badge">Dashboard</span>
            </div>

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
                  value={formData.projectName}
                  placeholder="Enter project name"
                  onChange={handleChange}
                />
              </div>

              <div className="project-user-field">
                <label>Project Description</label>

                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  placeholder="Enter project description"
                  onChange={handleChange}
                />
              </div>

              <div className="project-user-field">
                <label>Owner Name</label>

                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  placeholder="Enter owner name"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="project-user-submit-btn"
              >
                {editId ? "Update Project" : "Submit Project"}
              </button>
            </form>

          </div>
        </div>

        {/* TABLE */}

        <div className="project-user-table-section">
          <div className="project-user-card">

            <div className="project-user-header">
              <h2 className="project-user-title">
                Project List
              </h2>

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
                    <th>Action</th>
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
                              alt=""
                              className="project-user-preview-image"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>

                        <td>{project.projectName}</td>

                        <td>{project.projectDescription}</td>

                        <td>{project.ownerName}</td>

                        <td>
                          <div className="project-user-actions">
                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(project)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(project.id)
                              }
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
                        colSpan="5"
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