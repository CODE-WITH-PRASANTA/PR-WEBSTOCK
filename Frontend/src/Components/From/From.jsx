import React, { useState } from "react";
import "./From.css";
import { FaTimes, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

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

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "7ea3f90e-a50c-40f3-9078-ba132a07a037",
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        message: formData.message,
        subject: "New Enquiry from PR WEBSTOCK Website",
        from_name: "PR WEBSTOCK Website",
      }),
    });

    const result = await response.json();

    if (result.success) {
  // Reset form
  setFormData({
    name: "",
    address: "",
    phone: "",
    message: "",
  });

  // Close popup form
  setIsOpen(false);

  // Small delay so React updates the UI first
  setTimeout(() => {
    Swal.fire({
      title: "Enquiry Submitted!",
      text: "Thank you for contacting PR WEBSTOCK. We'll get back to you soon.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#2563eb",
      draggable: true,
    });
  }, 100);
}else {
      alert("❌ Submission failed. Please try again.");
      console.log(result);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay">
      <div className="floating-form">
        {/* Close Button */}
        <button
          className="close-btn"
          onClick={handleClose}
          aria-label="Close"
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

          <button type="submit" className="submit-btn">
            Submit Enquiry
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="contact-buttons">
          <a href="tel:+917789801327" className="call-btn">
            <FaPhoneAlt />
            Call Us
          </a>

          <a
            href="https://wa.me/917789801327"
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