import React, { useState } from "react";
import "./IndustryManagement.css";

const IndustryManagement = () => {
  const [formData, setFormData] = useState({
    industryName: "",
    category: "",
    location: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [industryList, setIndustryList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.industryName ||
      !formData.category ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill all fields");
      return;
    }

    const newIndustry = {
      id: Date.now(),
      ...formData,
      image: preview,
    };

    setIndustryList((prev) => [...prev, newIndustry]);

    setFormData({
      industryName: "",
      category: "",
      location: "",
      description: "",
      image: null,
    });

    setPreview(null);
  };

  return (
    <div className="industry-management">
      {/* FORM SECTION */}
      <div className="industry-management__form-section">
        <div className="industry-management__card">
          <h2 className="industry-management__title">
            Add Industry Details
          </h2>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter industry details..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="industry-management__group">
              <label>Upload Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {preview && (
              <div className="industry-management__preview-box">
                <img
                  src={preview}
                  alt="Preview"
                  className="industry-management__preview-image"
                />
              </div>
            )}

            <button
              type="submit"
              className="industry-management__btn"
            >
              Add Industry
            </button>
          </form>
        </div>
      </div>

      {/* TABLE SECTION */}
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
                </tr>
              </thead>

              <tbody>
                {industryList.length > 0 ? (
                  industryList.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt="industry"
                          className="industry-management__img"
                        />
                      </td>
                      <td>{item.industryName}</td>
                      <td>{item.category}</td>
                      <td>{item.location}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="industry-management__empty"
                    >
                      No Data Available
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