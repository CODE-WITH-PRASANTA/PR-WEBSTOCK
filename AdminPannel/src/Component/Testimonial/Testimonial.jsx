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
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList([...dataList, formData]);

    setFormData({
      photo: null,
      name: "",
      designation: "",
      feedback: "",
      rating: 0,
    });
  };

  const handleDelete = (index) => {
    const updated = dataList.filter((_, i) => i !== index);
    setDataList(updated);
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  return (
    <div className="testimonial-page">
      <h2 className="title">⭐ Testimonial Dashboard</h2>

      <div className="layout">
        {/* LEFT FORM */}
        <div className="left-panel">
          <form className="testimonial-form" onSubmit={handleSubmit}>
            <h3>Add Testimonial</h3>

            <input type="file" accept="image/*" onChange={handleImage} />

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />

            {/* ⭐ STAR RATING */}
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= formData.rating ? "star active" : "star"}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              name="feedback"
              placeholder="Feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Testimonial</button>
          </form>
        </div>

        {/* RIGHT TABLE */}
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
                      No testimonials added
                    </td>
                  </tr>
                ) : (
                  dataList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.photo && (
                          <img
                            src={item.photo}
                            alt="user"
                            className="avatar"
                          />
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.designation}</td>
                      <td className="feedback">{item.feedback}</td>
                      <td>
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