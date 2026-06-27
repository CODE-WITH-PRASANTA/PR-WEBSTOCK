import React, { useState, useEffect } from "react";
import API, { IMG_URL } from "../../api/axios"; // Imported IMG_URL for backend image matching
import "./Testimonial.css";

const Testimonial = () => {
  const [formData, setFormData] = useState({
    photoFile: null,      // Stores the actual Raw File Object for multipart transfer
    previewUrl: "",       // Stores temporary blob URL strictly for frontend preview
    name: "",
    designation: "",
    feedback: "",
    rating: 0,
  });

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH: Sync application state with backend database on component mount
  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/testimonial/all");
      
      console.log("GET RESPONSE", response.data); // Problem 4: Added console log

      // Problem 1: Safe payload parsing mapped to backend's success flag and data wrapper
      if (response.data && response.data.success) {
        setDataList(response.data.data || []);
      } else {
        setDataList([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.response?.data?.message || "Failed to fetch dashboard content.");
      setDataList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle standard text/textarea changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Capture file object and generate safe local browser layout preview string
  const handleImage = (e) => {
    const targetFile = e.target.files[0];
    if (targetFile) {
      // Clean up previous object URL if user changes the file multiple times before submitting
      if (formData.previewUrl) {
        URL.revokeObjectURL(formData.previewUrl);
      }
      
      setFormData((prev) => ({
        ...prev,
        photoFile: targetFile,
        previewUrl: URL.createObjectURL(targetFile),
      }));
    }
  };

  // Star selector trigger logic
  const handleStarClick = (ratingValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: ratingValue,
    }));
  };

  // POST: Assemble multi-part form entries for Multer image upload pipeline parsing
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double submissions
    setError("");

    if (formData.rating === 0) {
      setError("Please select a star rating before submitting.");
      return;
    }

    const submissionPayload = new FormData();
    submissionPayload.append("name", formData.name);
    submissionPayload.append("designation", formData.designation);
    submissionPayload.append("feedback", formData.feedback);
    submissionPayload.append("rating", formData.rating);

    // Key alignment matching backend multer middleware entry: upload.single("profileImage")
    if (formData.photoFile) {
      submissionPayload.append("profileImage", formData.photoFile);
    }

    setLoading(true);
    try {
      const response = await API.post("/testimonial/create", submissionPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("POST RESPONSE", response.data); // Problem 4: Added console log

      // Clear layout preview cache references out of local runtime to avoid memory leaks
      if (formData.previewUrl) {
        URL.revokeObjectURL(formData.previewUrl);
      }

      // Reset application state data parameters completely
      setFormData({
        photoFile: null,
        previewUrl: "",
        name: "",
        designation: "",
        feedback: "",
        rating: 0,
      });

      // Problem 3: Refresh state cleanly after creation using immediate inline parsing logic
      const res = await API.get("/testimonial/all");
      if (res.data && res.data.success) {
        setDataList(res.data.data || []);
      }

    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.response?.data?.message || "Failed to commit testimonial upload instance.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Selects collection table row records securely mapping standard database ID configurations
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently clear this testimonial?")) return;
    setError("");

    try {
      await API.delete(`/testimonial/delete/${id}`);
      // Filter target document out of state arrays locally instantly
      setDataList((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      setError(err.response?.data?.message || "Failed to cleanly remove data item document.");
    }
  };

  return (
    <div className="testimonial-page">
      <h2 className="title">⭐ Testimonial Dashboard</h2>

      {error && (
        <div className="error-banner" style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "10px", borderRadius: "4px", marginBottom: "15px", fontWeight: "bold" }}>
          ⚠️ {error}
        </div>
      )}

      <div className="layout">
        {/* FORM SECTION */}
        <div className="left-panel">
          <form className="testimonial-form" onSubmit={handleSubmit}>
            <h3>Add New Testimonial</h3>

            <div className="form-group">
              <label>Profile Photo</label>
              <input
                key={formData.photoFile ? formData.photoFile.name : "empty-file"}
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {formData.previewUrl && (
              <div className="preview-box">
                <img src={formData.previewUrl} alt="Preview" />
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
                    className={star <= formData.rating ? "star active" : "star"}
                    onClick={() => handleStarClick(star)}
                    style={{ cursor: "pointer" }}
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

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading && formData.name !== "" ? "Processing..." : "Add Testimonial"}
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
                {loading && dataList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">Loading dashboard rows...</td>
                  </tr>
                ) : dataList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">
                      No testimonials available
                    </td>
                  </tr>
                ) : (
                  dataList.map((item) => {
                    const recordId = item._id || item.id;
                    const resolvedImage = item.profileImage || item.photo;

                    return (
                      <tr key={recordId}>
                        <td>
                          {resolvedImage ? (
                            /* Problem 2: Prepended IMG_URL to target the asset server correctly */
                            <img
                              src={`${IMG_URL}${resolvedImage}`}
                              alt={item.name}
                              className="avatar"
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="no-avatar">N/A</span>
                          )}
                        </td>

                        <td>{item.name}</td>
                        <td>{item.designation}</td>
                        <td className="feedback-cell">{item.feedback}</td>

                        <td className="rating-cell">
                          {"★".repeat(Number(item.rating || 0))}
                          {"☆".repeat(5 - Number(item.rating || 0))}
                        </td>

                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(recordId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
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