import React from "react";
import "./Industries.css";

const Industries = () => {
 const industries = [
  {
    title1: "Social Media Marketing",
    title2: "For Real Estate",
    desc: "PR WEBSTOCK helps real estate businesses in Bhubaneswar generate quality property inquiries through targeted social media campaigns, property showcases, virtual tours, and location-focused advertising."
  },
  {
    title1: "Social Media Solutions",
    title2: "For Ecommerce",
    desc: "We help ecommerce brands increase product visibility, website traffic, and online sales through engaging content, social commerce strategies, and performance-driven advertising campaigns."
  },
  {
    title1: "Social Media Marketing",
    title2: "For Healthcare",
    desc: "Our healthcare marketing strategies help hospitals, clinics, and healthcare professionals build trust, educate patients, and strengthen their online reputation through informative social content."
  },
  {
    title1: "Social Media Marketing",
    title2: "For Small Businesses",
    desc: "We create affordable and effective social media campaigns that help small businesses in Odisha improve brand awareness, attract local customers, and grow their online presence."
  },
  {
    title1: "Social Media Marketing",
    title2: "For Education",
    desc: "PR WEBSTOCK helps schools, colleges, coaching institutes, and educational organizations promote admissions, achievements, and programs through strategic social media marketing."
  },
  {
    title1: "Social Media Marketing",
    title2: "For Restaurants",
    desc: "We help restaurants and food businesses increase customer engagement through creative food content, local promotions, social media advertising, and audience-focused campaigns."
  }
];

  return (
    <section className="industry-wrapper">
      <h2 className="industry-main-title">
        Social Media Marketing Services For Every Industry In Bhubaneswar
      </h2>

      <div className="industry-grid">
        {industries.map((item, index) => (
          <div className="industry-box" key={index}>
            <h3 className="industry-title">
              {item.title1} <br />
              <span>{item.title2}</span>
            </h3>

            <p className="industry-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Industries;
