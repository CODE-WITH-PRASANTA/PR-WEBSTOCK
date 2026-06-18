import React from "react";
import "./SeoFeatures.css";

const SeoFeatures = () => {
  const features = [
    {
      title: "SEO-Friendly Content Strategy",
      description:
        "PR WEBSTOCK creates high-quality SEO-friendly content that helps businesses in Bhubaneswar, Odisha improve search visibility, attract relevant audiences, and build long-term online authority."
    },
    {
      title: "Higher Search Rankings",
      description:
        "Our SEO experts at PR WEBSTOCK implement proven optimization strategies to help websites achieve higher rankings on Google and other search engines across competitive industries in Bhubaneswar."
    },
    {
      title: "More Qualified Leads",
      description:
        "By targeting the right keywords and user intent, PR WEBSTOCK helps businesses in Bhubaneswar, Odisha generate more qualified leads and increase customer inquiries consistently."
    },
    {
      title: "Advanced SEO Tools & Analytics",
      description:
        "PR WEBSTOCK utilizes industry-leading SEO tools for keyword research, competitor analysis, technical audits, and performance tracking to deliver measurable growth."
    },
    {
      title: "Stronger Online Presence",
      description:
        "Expand your brand visibility with customized SEO campaigns designed by PR WEBSTOCK to help businesses across Bhubaneswar, Odisha reach local and national audiences."
    },
    {
      title: "Experienced SEO Professionals",
      description:
        "With years of digital marketing expertise, PR WEBSTOCK provides reliable SEO services in Bhubaneswar that focus on sustainable growth, increased traffic, and higher conversions."
    }
  ];

  return (
    <section className="seo-features-section">
      <div className="seo-features-container">
        <div className="seo-features-header">
          <h2>
            What Makes <span>PR WEBSTOCK</span> the Best SEO Company in
            Bhubaneswar?
          </h2>
        </div>

        <div className="seo-features-grid">
          {features.map((item, index) => (
            <div className="seo-features-card" key={index}>
              <div className="seo-features-line"></div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoFeatures;