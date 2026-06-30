import React, { useEffect, useRef, useState } from "react";
import "./Gallary.css";
import {
  FaTrash,
  FaEdit,
  FaUpload,
  FaPlus,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import API from "../../api/axios";

const Gallary = () => {
  const fileRef = useRef();

  // ===========================
  // STATES
  // ===========================
  const [galleryData, setGalleryData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editPreview, setEditPreview] = useState("");
  const [editImage, setEditImage] = useState(null);

  // ===========================
  // IMAGE KEY RESOLUTION UTILITIES
  // ===========================
  const getBaseUrl = () => {
    if (API.defaults.baseURL) {
      return API.defaults.baseURL.replace(/\/api\/?$/, "");
    }
    return "http://localhost:5000";
  };

  const extractImagePath = (item) => {
    if (!item) return "";
    return item.image || item.imageUrl || item.photo || item.filePath || item.url || "";
  };

  const resolveImageSrc = (item) => {
    const imagePath = extractImagePath(item);
    
    if (!imagePath) return "https://placehold.co/100x100?text=No+Data+Field";
    if (/^https?:\/\//i.test(imagePath)) return imagePath;
    if (/^data:image\//i.test(imagePath)) return imagePath; 

    const normalizedPath = imagePath.replace(/\\/g, "/").replace(/^\//, "");
    return `${getBaseUrl()}/${normalizedPath}`;
  };

  // ===========================
  // FETCH DATA
  // ===========================
  const fetchGallery = async () => {
    try {
      setTableLoading(true);
      const res = await API.get("/gallery/all");

      if (Array.isArray(res.data)) {
        setGalleryData(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setGalleryData(res.data.data);
      } else if (res.data && Array.isArray(res.data.gallery)) {
        setGalleryData(res.data.gallery);
      } else {
        setGalleryData([]);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setGalleryData([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ===========================
  // ADD IMAGE
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      await API.post("/gallery/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImage(null);
      setPreview("");
      if (fileRef.current) fileRef.current.value = "";

      fetchGallery();
      alert("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  // ===========================
  // DELETE IMAGE
  // ===========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      setDeleteLoading(id);
      await API.delete(`/gallery/delete/${id}`);
      fetchGallery();
      alert("Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  const openEditModal = (item) => {
    setEditId(item._id || item.id);
    setEditPreview(resolveImageSrc(item));
    setEditImage(null);
    setShowEditModal(true);
  };

  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditImage(file);
    setEditPreview(URL.createObjectURL(file));
  };

  // ===========================
  // UPDATE IMAGE
  // ===========================
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setEditLoading(true);
      const formData = new FormData();
      if (editImage) {
        formData.append("image", editImage);
      }

      await API.put(`/gallery/update/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowEditModal(false);
      setEditImage(null);
      setEditPreview("");
      fetchGallery();
      alert("Gallery Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="Gallary">
      {/* Upload Form Section */}
      <div className="Gallary_FormSection">
        <div className="Gallary_FormHeader">
          <h2>Gallery Management</h2>
        </div>
        <form className="Gallary_Form" onSubmit={handleSubmit}>
          <div className="Gallary_UploadBox">
            <label htmlFor="galleryImage">
              <FaUpload /> <span>Select Image</span>
            </label>
            <input
              id="galleryImage"
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {preview && (
            <div className="Gallary_Preview">
              <img src={preview} alt="preview" />
            </div>
          )}
          <button type="submit" className="Gallary_SubmitBtn" disabled={submitLoading}>
            {submitLoading ? (
              <>
                <FaSpinner className="spin" /> Uploading...
              </>
            ) : (
              <>
                <FaPlus /> Add To Gallery
              </>
            )}
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="Gallary_TableSection">
        <div className="Gallary_TableHeader">
          <h2>Gallery Images</h2>
        </div>
        <div className="Gallary_TableWrap">
          <table className="Gallary_Table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Sl No</th>
                <th>Image Preview</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableLoading ? (
                <tr>
                  <td colSpan="3" className="table_message_cell">
                    <FaSpinner className="spin" /> <br /> Loading Gallery...
                  </td>
                </tr>
              ) : galleryData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="table_message_cell">
                    No Images Found
                  </td>
                </tr>
              ) : (
                galleryData.map((item, index) => {
                  const itemId = item._id || item.id || index;
                  const imageSrc = resolveImageSrc(item);
                  return (
                    <tr key={itemId}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="Gallary_TableImageContainer">
                          <img
                            className="Gallary_TableImage"
                            src={imageSrc}
                            alt={`gallery-item-${index}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/100x100?text=Path+Inaccessible";
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="Gallary_ActionBtns">
                          <button type="button" className="Gallary_EditBtn" onClick={() => openEditModal(item)}>
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="Gallary_DeleteBtn"
                            disabled={deleteLoading !== null}
                            onClick={() => handleDelete(itemId)}
                          >
                            {deleteLoading === itemId ? (
                              <FaSpinner className="spin" />
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="Gallary_Modal">
          <div className="Gallary_ModalContent">
            <button type="button" className="Gallary_Close" onClick={() => setShowEditModal(false)}>
              <FaTimes />
            </button>
            <h2>Edit Gallery Image</h2>
            <form onSubmit={handleUpdate}>
              <div className="Gallary_UploadBox">
                <label htmlFor="editImage">
                  <FaUpload /> Change Image
                </label>
                <input id="editImage" type="file" accept="image/*" onChange={handleEditImage} />
              </div>
              {editPreview && (
                <div className="Gallary_Preview">
                  <img src={editPreview} alt="preview" />
                </div>
              )}
              <button type="submit" className="Gallary_SubmitBtn" disabled={editLoading}>
                {editLoading ? (
                  <>
                    <FaSpinner className="spin" /> Updating...
                  </>
                ) : (
                  <>
                    <FaEdit /> Update Gallery
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallary;