import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./Teammember.css";

import API, {
  IMG_URL,
} from "../../api/axios";

const Teammember = () => {
  const [teamMembers, setTeamMembers] =
    useState([]);

  const [memberName, setMemberName] =
    useState("");

  const [
    memberDesignation,
    setMemberDesignation,
  ] = useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [fileName, setFileName] =
    useState("No file chosen");

  const [editId, setEditId] =
    useState(null);

  const fileRef = useRef(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await API.get(
        "/team-members"
      );

      setTeamMembers(
        res.data.data || []
      );
    } catch (error) {
      console.log(
        "Fetch Error:",
        error
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      if (
        !memberName.trim() ||
        !memberDesignation.trim()
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "name",
        memberName
      );

      formData.append(
        "designation",
        memberDesignation
      );

      if (selectedFile) {
        formData.append(
          "image",
          selectedFile
        );
      }

      if (editId) {
        await API.put(
          `/team-members/${editId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      } else {
        await API.post(
          "/team-members",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      await fetchMembers();

      setMemberName("");
      setMemberDesignation("");
      setSelectedFile(null);
      setEditId(null);
      setFileName(
        "No file chosen"
      );

      if (fileRef.current) {
        fileRef.current.value =
          "";
      }
    } catch (error) {
      console.log(
        "Submit Error:",
        error
      );
    }
  };

  const handleEdit = (
    member
  ) => {
    setMemberName(member.name);

    setMemberDesignation(
      member.designation
    );

    setEditId(member._id);

    setFileName(
      "Current Image Selected"
    );
  };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this member?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/team-members/${id}`
        );

        fetchMembers();
      } catch (error) {
        console.log(
          "Delete Error:",
          error
        );
      }
    };

  return (
    <div className="tm-wrapper">
      {/* FORM SECTION */}
      <div className="tm-form-section">
        <div className="tm-card">
          <h2 className="tm-title">
            Team Member Form
          </h2>

          <form
            className="tm-form"
            onSubmit={handleSubmit}
          >
            <div className="tm-form-group">
              <label>
                Profile Image
              </label>

              <div className="tm-file-upload-wrapper">
                <label
                  htmlFor="teamImage"
                  className="tm-file-button"
                >
                  Choose File
                </label>

                <span className="tm-file-name">
                  {fileName}
                </span>

                <input
                  id="teamImage"
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={
                    handleImageUpload
                  }
                  className="tm-hidden-file"
                />
              </div>
            </div>

            <div className="tm-form-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter Name"
                value={memberName}
                onChange={(e) =>
                  setMemberName(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="tm-form-group">
              <label>
                Designation
              </label>

              <input
                type="text"
                placeholder="Enter Designation"
                value={
                  memberDesignation
                }
                onChange={(e) =>
                  setMemberDesignation(
                    e.target.value
                  )
                }
              />
            </div>

            <button
              type="submit"
              className="tm-submit-btn"
            >
              {editId
                ? "Update Member"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="tm-table-section">
        <div className="tm-card">
          <h2 className="tm-title">
            Team Members List
          </h2>

          <div className="tm-table-wrapper">
            <table className="tm-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {teamMembers.length >
                0 ? (
                  teamMembers.map(
                    (
                      member
                    ) => (
                      <tr
                        key={
                          member._id
                        }
                      >
                        <td>
                         <img
  src={`${IMG_URL}${member.image}`}
  alt={member.name}
  className="tm-table-image"
  onError={() => {
    console.log(
      "BROKEN IMAGE URL:",
      `${IMG_URL}${member.image}`
    );
  }}
/>
                        </td>

                        <td>
                          {
                            member.name
                          }
                        </td>

                        <td>
                          {
                            member.designation
                          }
                        </td>

                        <td>
                          <div className="tm-action-buttons">
                            <button
                              type="button"
                              className="tm-edit-btn"
                              onClick={() =>
                                handleEdit(
                                  member
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="tm-delete-btn"
                              onClick={() =>
                                handleDelete(
                                  member._id
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
                      colSpan="4"
                      className="tm-no-data"
                    >
                      No Team Members
                      Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammember;