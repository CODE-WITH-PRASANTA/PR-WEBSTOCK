import React, { useState } from "react";
import "./BlogPost.css";
import { Editor } from "@tinymce/tinymce-react";

import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaTimes,
  FaImage,
} from "react-icons/fa";

const BlogPost = () => {
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

  const [blogs, setBlogs] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setBlogs([
      ...blogs,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
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
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="BlogPost">
      {/* FORM */}
      <div className="BlogPost_FormSection">
        <div className="BlogPost_FormHeader">
          <h2>Create Blog Post</h2>
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
    apiKey="no-api-key"
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
            Publish Blog
          </button>
        </form>
      </div>

      {/* TABLE */}
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
                <tr key={blog.id}>
                  <td>
                    <FaImage />
                  </td>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.adminName}</td>
                  <td>{blog.publishDate}</td>
                  <td>
                    {blog.tags.join(", ")}
                  </td>

                  <td>
                    <div className="BlogPost_ActionBtns">
                      <button>
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteBlog(blog.id)
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