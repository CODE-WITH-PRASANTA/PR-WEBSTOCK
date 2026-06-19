import React, { useState } from "react";
import "./From.css";
import { FaTimes, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Form = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Thank you! Our team will contact you shortly.");

    setFormData({
      name: "",
      address: "",
      phone: "",
      message: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay">
      <div className="floating-form">

        <button
          className="close-btn"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <h2>PR WEBSTOCK</h2>

        <h4>Website Development & Digital Marketing Company</h4>
   
       
        <form onSubmit={handleSubmit}>

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
            name="address"
            placeholder="Address / City"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Enquiry
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="contact-buttons">

          <a href="tel:+919999999999" className="call-btn">
            <FaPhoneAlt />
            Call Us
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

        </div>

      </div>
    </div>
  );
};

export default Form;