import React, { useState, useEffect } from "react";
import API from "../../api/axios";
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



const fetchBlogs = async () => {
  try {
 const res = await API.get("/blogs");

    const blogData = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    setBlogs(blogData);
  } catch (error) {
    console.log(error);
  }
};
const fetchSingleBlog = async () => {
  try {
    const res = await API.get(`/blogs/${id}`);

    const blog = res.data.data;

    setFormData({
      adminName: blog.adminName || "",
      designation: blog.designation || "",
      title: blog.title || "",
      category: blog.category || "",
      quote: blog.quote || "",
      publishDate: blog.publishDate
        ? blog.publishDate.split("T")[0]
        : "",
      description: blog.description || "",
      image: null,
      media: null,
      tags: Array.isArray(blog.tags)
  ? blog.tags
  : JSON.parse(blog.tags || "[]"),
    });

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchBlogs();

  if (id) {
    fetchSingleBlog();
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
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data.image;
  } catch (error) {
    console.log(error);
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

    if (formData.image) {
      imagePath = await uploadImage(
        formData.image
      );
    }

    const payload = {
      adminName: formData.adminName,
      designation: formData.designation,
      title: formData.title,
      category: formData.category,
      quote: formData.quote,
      publishDate: formData.publishDate,
      description: formData.description,
      image: imagePath,
      media: mediaPath,
      tags: JSON.stringify(formData.tags),
    };

  if (id) {
await API.put(`/blogs/${id}`, payload);

   navigate("/blog-management");

} else {

   await API.post("/blogs", payload);

}

    fetchBlogs();

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
  } catch (error) {
    console.log(error);
  }
};
  const deleteBlog = async (id) => {
  try {
   await API.delete(`/blogs/${id}`);
   

    fetchBlogs();
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className="BlogPost">
      {/* FORM */}
      <div className="BlogPost_FormSection">
        <div className="BlogPost_FormHeader">
         <h2>
{id ? "Update Blog" : "Create Blog Post"}
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
{id ? "Update Blog" : "Publish Blog"}
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
               <tr key={blog._id}>
                  <td>
  {blog.image ? (
    <img
      src={`http://localhost:5000${blog.image}`}
      alt={blog.title}
      width="60"
      height="40"
      style={{
        objectFit: "cover",
        borderRadius: "6px",
      }}
    />
  ) : (
    <FaImage />
  )}
</td>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.adminName}</td>
                  <td>{blog.publishDate}</td>
                  <td>
                    {Array.isArray(blog.tags)
  ? blog.tags.join(", ")
  : JSON.parse(blog.tags || "[]").join(", ")}
                  </td>

                  <td>
                    <div className="BlogPost_ActionBtns">
                <button
                      onClick={() =>
                      navigate(`/blog-post/${blog._id}`)
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