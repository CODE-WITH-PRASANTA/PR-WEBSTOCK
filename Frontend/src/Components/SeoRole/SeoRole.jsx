import React from "react";
import "./SeoRole.css";
import seoImage from "../../assets/Targeted-Keywords.webp";

const SeoRole = () => {
  const seoLeadData = [
    {
      title: "Targeted Keywords",
      points: [
        "Research keywords with strong search intent.",
        "Improve search visibility.",
        "Drive qualified organic traffic.",
        "Generate valuable leads."
      ]
    },
    {
      title: "Better User Experience",
      points: [
        "Improve website structure and navigation.",
        "Increase user engagement.",
        "Reduce bounce rates.",
        "Support higher conversions."
      ]
    },
    {
      title: "Quality Content",
      points: [
        "Create content users want to read.",
        "Build trust and authority.",
        "Answer customer queries.",
        "Encourage lead generation."
      ]
    },
    {
      title: "Improved Visibility",
      points: [
        "Increase online presence.",
        "Rank for relevant searches.",
        "Reach potential customers.",
        "Boost website traffic."
      ]
    },
    {
      title: "Analytics & Tracking",
      points: [
        "Measure SEO performance.",
        "Track visitor behavior.",
        "Improve marketing decisions.",
        "Optimize lead generation."
      ]
    },
    {
      title: "Local SEO",
      points: [
        "Improve local search rankings.",
        "Target nearby customers.",
        "Strengthen local visibility.",
        "Generate local leads."
      ]
    },
    {
      title: "Mobile Optimization",
      points: [
        "Enhance mobile experience.",
        "Improve page performance.",
        "Reach mobile users.",
        "Increase engagement."
      ]
    },
    {
      title: "Social Media Integration",
      points: [
        "Increase brand awareness.",
        "Support content promotion.",
        "Expand audience reach.",
        "Drive website visits."
      ]
    },
    {
      title: "CTA Optimization",
      points: [
        "Encourage user actions.",
        "Improve conversions.",
        "Increase enquiries.",
        "Generate more leads."
      ]
    }
  ];

  return (
    <section className="lead-section">
      <div className="lead-container">

        <div className="lead-top">
          <h2>
            How PR WEBSTOCK SEO Services Drive Quality Leads in Bhubaneswar, Odisha
          </h2>

          <p>
            PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve
            search rankings, increase organic traffic, and generate quality
            leads through effective SEO strategies designed for long-term growth.
          </p>
        </div>

        <div className="lead-bottom">

          <div className="lead-image">
            <img
              src={seoImage}
              alt="PR WEBSTOCK SEO Services in Bhubaneswar Odisha"
            />
          </div>

          <div className="lead-content custom-scrollbar">
            {seoLeadData.map((section, index) => (
              <div className="lead-row" key={index}>
                <h3>{section.title}</h3>

                <ul>
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SeoRole;