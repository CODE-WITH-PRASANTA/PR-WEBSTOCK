import React, { useEffect, useState } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./ProjectUser.css";

const ProjectUser = () => {
const [formData, setFormData] = useState({
projectName: "",
projectDescription: "",
ownerName: "",
projectDomain: "",
});

const [imageFile, setImageFile] = useState(null);
const [projects, setProjects] = useState([]);
const [editId, setEditId] = useState(null);

const fetchProjects = async () => {
try {
const res = await API.get("/projects");


  if (res.data.success) {
    setProjects(res.data.data);
  }
} catch (error) {
  console.log(error);
}


};

useEffect(() => {
fetchProjects();
}, []);

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
  setImageFile(file);
}


};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  const data = new FormData();

  data.append(
    "projectName",
    formData.projectName
  );

  data.append(
    "projectDescription",
    formData.projectDescription
  );

  data.append(
    "ownerName",
    formData.ownerName
  );

  data.append(
    "projectDomain",
    formData.projectDomain
  );

  if (imageFile) {
    data.append("image", imageFile);
  }

  if (editId) {
    await API.put(
      `/projects/update/${editId}`,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  } else {
    await API.post(
      "/projects/create",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  }

  setFormData({
    projectName: "",
    projectDescription: "",
    ownerName: "",
    projectDomain: "",
  });

  setImageFile(null);
  setEditId(null);

  document.getElementById(
    "projectImage"
  ).value = "";

  fetchProjects();
} catch (error) {
  console.log(error);
}


};

const handleDelete = async (id) => {
try {
await API.delete(
`/projects/delete/${id}`
);


  fetchProjects();
} catch (error) {
  console.log(error);
}


};

const handleEdit = (project) => {
setFormData({
projectName: project.projectName,
projectDescription:
project.projectDescription,
ownerName: project.ownerName,
projectDomain:
project.projectDomain,
});


setEditId(project._id);


};

return ( <div className="project-user"> <div className="project-user-container"> <div className="project-user-form-section"> <div className="project-user-card"> <div className="project-user-header"> <h2 className="project-user-title">
{editId
? "Edit Project"
: "Add Project"} </h2>


          <span className="project-user-badge">
            Dashboard
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="project-user-field">
            <label>
              Upload Project Image
            </label>

            <input
              type="file"
              id="projectImage"
              accept="image/*"
              onChange={
                handleImageChange
              }
            />
          </div>

          {imageFile && (
            <img
              src={URL.createObjectURL(
                imageFile
              )}
              alt="Preview"
              className="project-user-preview-image"
            />
          )}

          <div className="project-user-field">
            <label>Project Name</label>

            <input
              type="text"
              name="projectName"
              value={
                formData.projectName
              }
              placeholder="Enter project name"
              onChange={handleChange}
            />
          </div>

          <div className="project-user-field">
            <label>
              Project Description
            </label>

            <textarea
              name="projectDescription"
              value={
                formData.projectDescription
              }
              placeholder="Enter project description"
              onChange={handleChange}
            />
          </div>

          <div className="project-user-field">
            <label>Owner Name</label>

            <input
              type="text"
              name="ownerName"
              value={
                formData.ownerName
              }
              placeholder="Enter owner name"
              onChange={handleChange}
            />
          </div>

          <div className="project-user-field">
            <label>
              Project Website / Domain
            </label>

            <input
              type="url"
              name="projectDomain"
              value={
                formData.projectDomain
              }
              placeholder="https://example.com"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="project-user-submit-btn"
          >
            {editId
              ? "Update Project"
              : "Submit Project"}
          </button>
        </form>
      </div>
    </div>

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
                <th>Website</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {projects.length > 0 ? (
                projects.map(
                  (project) => (
                    <tr
                      key={
                        project._id
                      }
                    >
                      <td>
                        {project.image ? (
                          <img
                            src={`${IMG_URL}${project.image}`}
                            alt={
                              project.projectName
                            }
                            className="project-user-preview-image"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      <td>
                        {
                          project.projectName
                        }
                      </td>

                      <td>
                        {
                          project.projectDescription
                        }
                      </td>

                      <td>
                        {
                          project.ownerName
                        }
                      </td>

                      <td>
                        <a
                          href={
                            project.projectDomain
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-domain-link"
                        >
                          Visit Website
                        </a>
                      </td>

                      <td>
                        <div className="project-user-actions">
                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(
                                project
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                project._id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
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
