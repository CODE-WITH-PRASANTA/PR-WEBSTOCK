import React, { useState } from "react";
import "./Gallary.css";
import {
  FaTrash,
  FaEdit,
  FaImage,
  FaUpload,
} from "react-icons/fa";

const Gallary = () => {
  const [image, setImage] = useState(null);

  const [galleryData, setGalleryData] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) return;

    setGalleryData((prev) => [
      {
        id: Date.now(),
        image,
      },
      ...prev,
    ]);

    setImage(null);
  };

  const handleDelete = (id) => {
    setGalleryData(
      galleryData.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="Gallary">
      {/* FORM SECTION */}

      <div className="Gallary_FormSection">
        <div className="Gallary_FormHeader">
          <h2>Gallery Management</h2>
        </div>

        <form
          className="Gallary_Form"
          onSubmit={handleSubmit}
        >
          <div className="Gallary_UploadBox">
            <label>
              <FaUpload />
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {image && (
            <div className="Gallary_Preview">
              <img
                src={image}
                alt="preview"
              />
            </div>
          )}

          <button
            type="submit"
            className="Gallary_SubmitBtn"
          >
            Add To Gallery
          </button>
        </form>
      </div>

      {/* TABLE SECTION */}

      <div className="Gallary_TableSection">
        <div className="Gallary_TableHeader">
          <h2>Gallery Images</h2>
        </div>

        <div className="Gallary_TableWrap">
          <table className="Gallary_Table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {galleryData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={item.image}
                      alt="gallery"
                      className="Gallary_TableImage"
                    />
                  </td>

                  <td>
                    <div className="Gallary_ActionBtns">
                      <button className="Gallary_EditBtn">
                        <FaEdit />
                      </button>

                      <button
                        className="Gallary_DeleteBtn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Gallary;