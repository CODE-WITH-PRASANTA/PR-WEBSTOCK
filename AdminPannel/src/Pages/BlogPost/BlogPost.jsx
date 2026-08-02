import React, { useState, useEffect } from "react";
import API, { IMG_URL } from "../../api/axios"; // Imported IMG_URL from API configuration
import "./BlogPost.css";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaTimes,
  FaImage,
} from "react-icons/fa";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState({
    adminName: "",
    designation: "",
    title: "",
    category: "",
    quote: "",
    publishDate: "",
    description: "",
    image: null,
    media: null,
    tags: [],
  });

  // Helper to format image URLs safely across environments
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/100x100?text=No+Img";
    }

    const trimmed = imagePath.trim();

    // Replaces legacy hardcoded local paths if present
    let cleanPath = trimmed.replace(/http:\/\/localhost:(5000|6013)/g, "");

    if (
      cleanPath.startsWith("http://") ||
      cleanPath.startsWith("https://") ||
      cleanPath.startsWith("data:")
    ) {
      return cleanPath;
    }

    cleanPath = cleanPath.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      const blogData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchSingleBlog = async (blogId) => {
    try {
      const res = await API.get(`/blogs/${blogId}`);
      const blog = res.data.data || res.data;

      let parsedTags = [];
      if (Array.isArray(blog.tags)) {
        parsedTags = blog.tags;
      } else if (typeof blog.tags === "string") {
        try {
          parsedTags = JSON.parse(blog.tags);
        } catch {
          parsedTags = blog.tags.split(",").map((t) => t.trim()).filter(Boolean);
        }
      }

      setFormData({
        adminName: blog.adminName || "",
        designation: blog.designation || "",
        title: blog.title || "",
        category: blog.category || "",
        quote: blog.quote || "",
        publishDate: blog.publishDate
          ? blog.publishDate.substring(0, 10)
          : "",
        description: blog.description || "",
        image: null,
        media: null,
        tags: parsedTags,
      });
    } catch (err) {
      console.error("Error fetching single blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    if (id && id !== "new" && isValidObjectId) {
      fetchSingleBlog(id);
    }
  }, [id]);

  const uploadImage = async (file) => {
    try {
      const data = new FormData();
      data.append("image", file);

      const res = await API.post(
        "/blogs/upload-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.image || res.data.url || "";
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addTag = () => {
    if (
      tagInput.trim() &&
      !formData.tags.includes(tagInput.trim())
    ) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = "";
      let mediaPath = "";

      if (formData.image instanceof File) {
        imagePath = await uploadImage(formData.image);
      }

      if (formData.media instanceof File) {
        mediaPath = await uploadImage(formData.media);
      }

      const payload = {
        adminName: formData.adminName,
        designation: formData.designation,
        title: formData.title,
        category: formData.category,
        quote: formData.quote,
        publishDate: formData.publishDate,
        description: formData.description,
        ...(imagePath && { image: imagePath }),
        ...(mediaPath && { media: mediaPath }),
        tags: JSON.stringify(formData.tags),
      };

      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

      if (id && id !== "new" && isValidObjectId) {
        await API.put(`/blogs/${id}`, payload);
      } else {
        await API.post("/blogs", payload);
      }

      navigate("/admin/blog-management");
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const deleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/blogs/${blogId}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="BlogPost">
      {/* FORM SECTION */}
      <div className="BlogPost_FormSection">
        <div className="BlogPost_FormHeader">
          <h2>
            {id && id !== "new" ? "Update Blog" : "Create Blog Post"}
          </h2>
        </div>

        <form
          className="BlogPost_Form"
          onSubmit={handleSubmit}
        >
          <div className="BlogPost_Row">
            <div className="BlogPost_Field">
              <label>Admin Name</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="Enter Admin Name"
              />
            </div>

            <div className="BlogPost_Field">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter Designation"
              />
            </div>
          </div>

          <div className="BlogPost_Field">
            <label>Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
            />
          </div>

          <div className="BlogPost_Row">
            <div className="BlogPost_Field">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select Category
                </option>
                <option>Technology</option>
                <option>Education</option>
                <option>Business</option>
                <option>Marketing</option>
                <option>Development</option>
              </select>
            </div>

            <div className="BlogPost_Field">
              <label>Publishing Date</label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="BlogPost_Field">
            <label>Quote</label>
            <input
              type="text"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="Short Quote"
            />
          </div>

          <div className="BlogPost_Field">
            <label>Description</label>
            <Editor
              apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
              value={formData.description}
              onEditorChange={(content) =>
                setFormData({
                  ...formData,
                  description: content,
                })
              }
              init={{
                height: 350,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "link image media table | code fullscreen",
                skin: "oxide-dark",
                content_css: "dark",
                branding: false,
                images_upload_handler: async (blobInfo) => {
                  try {
                    const uploadedPath = await uploadImage(blobInfo.blob());
                    return getImageUrl(uploadedPath);
                  } catch (err) {
                    console.error("Editor upload error:", err);
                    return "";
                  }
                },
              }}
            />
          </div>

          <div className="BlogPost_Field">
            <label>Tags</label>
            <div className="BlogPost_TagInput">
              <input
                type="text"
                value={tagInput}
                placeholder="Add Tag"
                onChange={(e) =>
                  setTagInput(e.target.value)
                }
              />
              <button
                type="button"
                onClick={addTag}
              >
                <FaPlus />
              </button>
            </div>

            <div className="BlogPost_Tags">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="BlogPost_Tag"
                >
                  {tag}
                  <FaTimes
                    onClick={() =>
                      removeTag(tag)
                    }
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="BlogPost_Row">
            <div className="BlogPost_Field">
              <label>Featured Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
              />
            </div>

            <div className="BlogPost_Field">
              <label>Upload Media</label>
              <input
                type="file"
                name="media"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="BlogPost_SubmitBtn"
            type="submit"
          >
            {id && id !== "new" ? "Update Blog" : "Publish Blog"}
          </button>
        </form>
      </div>

      {/* TABLE SECTION */}
      <div className="BlogPost_TableSection">
        <div className="BlogPost_TableHeader">
          <h2>Blog List</h2>
        </div>

        <div className="BlogPost_TableWrap">
          <table className="BlogPost_Table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Admin</th>
                <th>Date</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    {blog.image ? (
                      <img
                        src={getImageUrl(blog.image)}
                        alt={blog.title || "Blog thumbnail"}
                        width="60"
                        height="40"
                        style={{
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                        onError={(e) => {
                          if (e.target.src.includes("placehold.co")) return;
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/100x100?text=Error";
                        }}
                      />
                    ) : (
                      <FaImage />
                    )}
                  </td>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.adminName}</td>
                  <td>{blog.publishDate ? blog.publishDate.substring(0, 10) : ""}</td>
                  <td>
                    {Array.isArray(blog.tags)
                      ? blog.tags.join(", ")
                      : typeof blog.tags === "string"
                      ? blog.tags
                      : ""}
                  </td>
                  <td>
                    <div className="BlogPost_ActionBtns">
                      <button
                        onClick={() =>
                          navigate(`/admin/blog-post/${blog._id}`)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteBlog(blog._id)
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

export default BlogPost;