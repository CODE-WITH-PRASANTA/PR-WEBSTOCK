import React, { useState, useEffect } from "react";
import "./RoiSolution.css";

// Importing images
import healthcareImg from "../../assets/Healthcare-industry.webp";
import ecommerceImg from "../../assets/E-commerce-industry.webp";
import technologyImg from "../../assets/Technology-industry.webp";
import financialImg from "../../assets/Financial-services-industry.webp";
import manufacturingImg from "../../assets/Manufacturing-industry.webp";
import travelImg from "../../assets/Travel-and-hospitality-industry.webp";

const data = [
  {
    title: "Healthcare industry",
    desc: "We help hospitals, clinics, and healthcare brands attract more patients with SEO, paid ads, and reputation management while ensuring compliance with industry regulations.",
    img: healthcareImg,
  },
  {
    title: "E-commerce industry",
    desc: "From product ads to high-converting landing pages, we optimize your store for more traffic, better sales, and repeat customers through data-driven marketing strategies.",
    img: ecommerceImg,
  },
  {
    title: "Technology industry",
    desc: "We position tech brands as industry leaders with thought-leadership content, SEO, PPC, and LinkedIn marketing to generate high-quality B2B leads.",
    img: technologyImg,
  },
  {
    title: "Financial services industry",
    desc: "We build trust and authority for banks, fintech, and financial advisors with content marketing, lead-generation ads, and compliance-friendly digital strategies.",
    img: financialImg,
  },
  {
    title: "Manufacturing industry",
    desc: "We help B2B manufacturers reach decision-makers through LinkedIn marketing, SEO-driven content, and lead nurturing strategies that drive real business growth.",
    img: manufacturingImg,
  },
  {
    title: "Travel & Hospitality industry",
    desc: "We boost bookings for hotels, travel agencies, and tourism brands through targeted ads, SEO, and social campaigns that attract global travelers.",
    img: travelImg,
  },
];

export default function RoiSolution() {
  const [active, setActive] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="industry-wrapper">

      <h1 className="industry-heading">
        Our industry specific ROI based digital marketing solution
      </h1>

      <div className="industry-container">

        {/* LEFT IMAGE SECTION */}
        <div className="industry-image-wrapper">
          <div className="pink-block"></div>
          <img
            key={active}
            src={data[active].img}
            alt={data[active].title}
            className="industry-image fade"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="industry-right">
          {data.map((item, i) => (
            <div
              key={i}
              className={`industry-row ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <h2 className="industry-title">{item.title}</h2>
              <p className="industry-desc">{item.desc}</p>
              {i !== data.length - 1 && <div className="separator"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="callback-btn">Request a Callback</div>
      <div className="whatsapp-btn">💬</div>

    </section>
  );
}
