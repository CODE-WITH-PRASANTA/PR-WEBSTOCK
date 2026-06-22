import React, { useState, useRef } from "react";
import "./Teammember.css";

const Teammember = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [memberDesignation, setMemberDesignation] = useState("");
  const [memberImage, setMemberImage] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [editIndex, setEditIndex] = useState(null);

  const fileRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      setMemberImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !memberName.trim() ||
      !memberDesignation.trim() ||
      !memberImage
    ) {
      alert("Please fill all fields");
      return;
    }

    const memberData = {
      image: memberImage,
      name: memberName,
      designation: memberDesignation,
    };

    if (editIndex !== null) {
      const updatedMembers = [...teamMembers];
      updatedMembers[editIndex] = memberData;
      setTeamMembers(updatedMembers);
      setEditIndex(null);
    } else {
      setTeamMembers([...teamMembers, memberData]);
    }

    // Reset Form
    setMemberName("");
    setMemberDesignation("");
    setMemberImage("");
    setFileName("No file chosen");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleEdit = (index) => {
    const member = teamMembers[index];

    setMemberName(member.name);
    setMemberDesignation(member.designation);
    setMemberImage(member.image);
    setFileName("Image Selected");

    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedMembers = teamMembers.filter(
      (_, i) => i !== index
    );

    setTeamMembers(updatedMembers);

    if (editIndex === index) {
      setMemberName("");
      setMemberDesignation("");
      setMemberImage("");
      setFileName("No file chosen");
      setEditIndex(null);
    }
  };

  return (
    <div className="tm-wrapper">
      {/* Form Section */}
      <div className="tm-form-section">
        <div className="tm-card">
          <h2 className="tm-title">
            Team Member Form
          </h2>

          <form
            className="tm-form"
            onSubmit={handleSubmit}
          >
            {/* Image Upload */}
            <div className="tm-form-group">
              <label>Profile Image</label>

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
                  onChange={handleImageUpload}
                  className="tm-hidden-file"
                />
              </div>
            </div>

            {/* Name */}
            <div className="tm-form-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter Name"
                value={memberName}
                onChange={(e) =>
                  setMemberName(e.target.value)
                }
              />
            </div>

            {/* Designation */}
            <div className="tm-form-group">
              <label>Designation</label>

              <input
                type="text"
                placeholder="Enter Designation"
                value={memberDesignation}
                onChange={(e) =>
                  setMemberDesignation(
                    e.target.value
                  )
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="tm-submit-btn"
            >
              {editIndex !== null
                ? "Update Member"
                : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Table Section */}
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
                {teamMembers.length > 0 ? (
                  teamMembers.map(
                    (member, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="tm-table-image"
                          />
                        </td>

                        <td>{member.name}</td>

                        <td>
                          {member.designation}
                        </td>

                        <td>
                          <div className="tm-action-buttons">
                            <button
                              type="button"
                              className="tm-edit-btn"
                              onClick={() =>
                                handleEdit(index)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="tm-delete-btn"
                              onClick={() =>
                                handleDelete(index)
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
                      No Team Members Added
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