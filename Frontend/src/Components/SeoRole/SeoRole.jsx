import React from "react";
import "./SeoRole.css";
import seoImage from "../../assets/Targeted-Keywords.webp";

const SeoRole = () => {
  const seoLeadData = [
    {
      title: "Targeted keywords",
      points: [
        "Strategic optimization with relevant keywords.",
        "Aligning content with user search queries.",
        "Driving organic traffic.",
        "Attracting qualified leads."
      ]
    },
    {
      title: "Superior user experience",
      points: [
        "SEO enhancements refine website design, structure, and navigation.",
        "Deliver a great user experience.",
        "Keep the visitors interested.",
        "Encourage exploration and drive lead generation."
      ]
    },
    {
      title: "High-quality content",
      points: [
        "Content created precisely to meet audience needs.",
        "High-quality content establishes authority and builds trust.",
        "Engaging users with persuasive language, visuals, data, and CTAs.",
        "Highly encourage visitors to convert into leads."
      ]
    },
    {
      title: "Improved visibility",
      points: [
        "Effective proven techniques enhance website visibility.",
        "Capture the attention of potential leads.",
        "Improve search result rankings.",
        "Attract actively searching audiences interested in similar products or services."
      ]
    },
    {
      title: "Analytics and tracking",
      points: [
        "Analytics tools like Google Analytics offer data and insights.",
        "Data-driven decisions help in generating more leads.",
        "Optimizing strategies thereby continually improving lead-generation efforts."
      ]
    },
    {
      title: "Local SEO",
      points: [
        "Optimize for local searches.",
        "Penetrate and enhance presence in specific areas.",
        "Attract local customers seeking local solutions.",
        "Increase lead generation from the local audience."
      ]
    },
    {
      title: "Mobile optimization",
      points: [
        "Making the website mobile-friendly.",
        "Improving user experience on mobile devices.",
        "Capturing leads from the increasing number of mobile users.",
        "Adapting to the rise in mobile device usage."
      ]
    },
    {
      title: "Social media integration",
      points: [
        "Connecting SEO with social media.",
        "Reaching more people and engaging your audience.",
        "Facilitating content sharing.",
        "Generating more leads and growing your customer base."
      ]
    },
    {
      title: "Call-to-action (CTA) optimization",
      points: [
        "Place persuasive CTAs strategically on your website.",
        "Encourage visitors to take action.",
        "Boost lead generation.",
        "Prompt actions like contacting you, subscribing, or requesting a consultation."
      ]
    }
  ];

  return (
    <section className="lead-section">
      <div className="lead-container">

        {/* TOP */}
        <div className="lead-top">
          <h2>
            Role of SEO in qualified lead <br />
            generation
          </h2>
          <p>
            In the digital world, an attractive website alone is not enough.
            With methodical and carefully planned SEO strategies, businesses
            can achieve higher rankings, better visibility, and increased
            conversions.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="lead-bottom">

          {/* IMAGE */}
          <div className="lead-image">
            <img src={seoImage} alt="SEO lead generation" />
          </div>

          {/* CONTENT */}
          <div className="lead-content">
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
