import React, { useState, useEffect } from "react";
import "./RoiSolution.css";

// Importing images
import healthcareImg from "../../assets/dg1.jpeg";
import ecommerceImg from "../../assets/dg2.jpeg";
import technologyImg from "../../assets/Technology-industry.webp";
import financialImg from "../../assets/Financial-services-industry.webp";
import manufacturingImg from "../../assets/Manufacturing-industry.webp";
import travelImg from "../../assets/Travel-and-hospitality-industry.webp";

const data = [
  {
    title: "Healthcare Industry",
    desc: "PR WEBSTOCK helps hospitals, clinics, and healthcare providers in Bhubaneswar improve online visibility, attract more patients, and build trust through SEO, content marketing, and digital advertising.",
    img: healthcareImg,
  },
  {
    title: "E-Commerce Industry",
    desc: "We help e-commerce businesses increase traffic, improve conversions, and grow online sales through SEO, Google Ads, social media marketing, and performance-driven campaigns.",
    img: ecommerceImg,
  },
  {
    title: "Technology Industry",
    desc: "Our digital marketing strategies help technology companies generate qualified leads, improve brand authority, and connect with decision-makers through targeted campaigns.",
    img: technologyImg,
  },
  {
    title: "Financial Services Industry",
    desc: "We support financial institutions, consultants, and fintech businesses with trusted digital marketing solutions focused on lead generation, brand awareness, and customer engagement.",
    img: financialImg,
  },
  {
    title: "Manufacturing Industry",
    desc: "PR WEBSTOCK helps manufacturers reach business buyers through SEO, LinkedIn marketing, content marketing, and lead generation strategies that drive measurable growth.",
    img: manufacturingImg,
  },
  {
    title: "Travel & Hospitality Industry",
    desc: "We help hotels, travel agencies, and tourism businesses attract more customers through social media marketing, search engine optimization, and targeted advertising campaigns.",
    img: travelImg,
  },
];

export default function RoiSolution() {
  const [active, setActive] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="industry-wrapper">

      <h2 className="industry-heading">
        Industry-Specific Digital Marketing Solutions For Business Growth
      </h2>

      <div className="industry-container">

        {/* LEFT IMAGE */}
        <div className="industry-image-wrapper">
          <img
            key={active}
            src={data[active].img}
            alt={data[active].title}
            className="industry-image fade"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="industry-right">
          {currentItems.map((item, i) => {
            const realIndex = startIndex + i;

            return (
              <div
                key={realIndex}
                className={`industry-row ${
                  realIndex === active ? "active" : ""
                }`}
                onMouseEnter={() => setActive(realIndex)}
              >
                <h2 className="industry-title">{item.title}</h2>

                {realIndex === active && (
                  <p className="industry-desc">{item.desc}</p>
                )}

                {i !== currentItems.length - 1 && (
                  <div className="separator"></div>
                )}
              </div>
            );
          })}

          {/* Pagination */}
          <div className="industry-pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`pagination-btn ${
                  currentPage === index + 1 ? "active-page" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}