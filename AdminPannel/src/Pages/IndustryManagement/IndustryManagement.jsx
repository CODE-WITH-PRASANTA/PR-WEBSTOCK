import React, { useState, useEffect } from "react";
import "./IndustryManagement.css";
import api, { IMG_URL } from "../../api/axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const IndustryManagement = () => {
  const initialState = {
    industryName: "",
    category: "",
    location: "",
    description: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [industryList, setIndustryList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit State
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");

  // ===========================
  // Fetch Industries
  // ===========================

  const fetchIndustries = async () => {
    try {
      const res = await api.get("/industries");
      setIndustryList(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // ===========================
  // Input Change
  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================
  // Image Change
  // ===========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // ===========================
  // Submit (Add / Update)
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.industryName ||
      !formData.category ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("industryName", formData.industryName);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editId) {
        await api.put(`/industries/${editId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Industry Updated Successfully");
      } else {
        await api.post("/industries", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Industry Added Successfully");
      }

      setFormData(initialState);
      setPreview("");
      setEditId(null);

      document.querySelector('input[type="file"]').value = "";

      fetchIndustries();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Edit Industry
  // ===========================

  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      industryName: item.industryName,
      category: item.category,
      location: item.location,
      description: item.description,
      image: null,
    });

    setPreview(`${IMG_URL}${item.image}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===========================
  // Delete Industry
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this industry?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/industries/${id}`);

      alert("Industry Deleted Successfully");

      fetchIndustries();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };
  return (
  <div className="industry-management">
    {/* ================= FORM SECTION ================= */}

    <div className="industry-management__form-section">
      <div className="industry-management__card">
        <h2 className="industry-management__title">
          {editId ? "Update Industry" : "Add Industry Details"}
        </h2>

        <div className="industry-management__form-wrapper">
          <form
            className="industry-management__form"
            onSubmit={handleSubmit}
          >
            <div className="industry-management__group">
              <label>Industry Name</label>

              <input
                type="text"
                name="industryName"
                placeholder="Enter industry name"
                value={formData.industryName}
                onChange={handleChange}
              />
            </div>

            <div className="industry-management__group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="industry-management__group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="industry-management__group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="industry-management__group">
              <label>
                {editId ? "Change Image" : "Upload Image"}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {preview && (
              <div
                style={{
                  marginTop: "15px",
                  textAlign: "center",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "180px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "2px solid #ddd",
                  }}
                />
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                className="industry-management__btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Industry"
                  : "Add Industry"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="industry-management__btn industry-management__cancel"
                  onClick={() => {
                    setEditId(null);
                    setPreview("");
                    setFormData(initialState);

                    document.querySelector(
                      'input[type="file"]'
                    ).value = "";
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>

    {/* ================= TABLE SECTION ================= */}

    <div className="industry-management__table-section">
      <div className="industry-management__card">
        <h2 className="industry-management__title">
          Industry List
        </h2>

        <div className="industry-management__table-wrapper">
          <table className="industry-management__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {industryList.length > 0 ? (
                industryList.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`${IMG_URL}${item.image}`}
                        alt={item.industryName}
                        className="industry-management__img"
                      />
                    </td>

                    <td>{item.industryName}</td>

                    <td>{item.category}</td>

                    <td>{item.location}</td>

                    <td>{item.description}</td>

                    <td>
                      <div className="industry-management__actions">
                        <button
                          className="industry-management__edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          className="industry-management__delete"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="industry-management__empty"
                  >
                    No Industries Found
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

export default IndustryManagement;