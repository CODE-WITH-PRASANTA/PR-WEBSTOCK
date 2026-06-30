import React, { useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    designation: "",
    feedback: "",
    rating: 0,
  });

  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleStarClick = (ratingValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: ratingValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setDataList((prev) => [...prev, formData]);

    setFormData({
      photo: null,
      name: "",
      designation: "",
      feedback: "",
      rating: 0,
    });
  };

  const handleDelete = (index) => {
    setDataList(dataList.filter((_, i) => i !== index));
  };

  return (
    <div className="testimonial-page">
      <h2 className="title">⭐ Testimonial Dashboard</h2>

      <div className="layout">
        {/* FORM SECTION */}
        <div className="left-panel">
          <form className="testimonial-form" onSubmit={handleSubmit}>
            <h3>Add New Testimonial</h3>

            <div className="form-group">
              <label>Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {formData.photo && (
              <div className="preview-box">
                <img src={formData.photo} alt="Preview" />
              </div>
            )}

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Rating</label>

              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= formData.rating
                        ? "star active"
                        : "star"
                    }
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Feedback</label>
              <textarea
                name="feedback"
                placeholder="Write customer feedback..."
                value={formData.feedback}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Testimonial
            </button>
          </form>
        </div>

        {/* TABLE SECTION */}
        <div className="right-panel">
          <div className="table-wrapper">
            <h3>All Testimonials</h3>

            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Feedback</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {dataList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">
                      No testimonials available
                    </td>
                  </tr>
                ) : (
                  dataList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.photo && (
                          <img
                            src={item.photo}
                            alt="User"
                            className="avatar"
                          />
                        )}
                      </td>

                      <td>{item.name}</td>

                      <td>{item.designation}</td>

                      <td className="feedback-cell">
                        {item.feedback}
                      </td>

                      <td className="rating-cell">
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;