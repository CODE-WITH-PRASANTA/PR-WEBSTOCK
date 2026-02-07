import React from "react";
import "./Casestudies.css";

const caseStudies = [
  {
    id: 1,
    tag: "Qwikcilver",
    title: "Industrial Tech Innovator",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&blur=20",
    problem:
      "The client’s outdated website failed to clearly communicate product value and performed poorly on mobile devices, leading to low engagement and missed leads.",
    solution:
      "PR WEBSTOCK designed a mobile-first, coding-based B2B website using modern UI principles. We improved navigation, optimized content structure, and implemented fast loading with Cloud / VPS hosting.",
    result:
      "2.5x qualified leads, 60% boost in mobile user engagement",
  },
  {
    id: 2,
    tag: "Zycus",
    title: "Health & Wellness Brand",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&blur=20",
    problem:
      "Slow website speed and poor user experience were limiting conversions and reducing user trust.",
    solution:
      "We rebuilt the platform using MERN Stack (full code-based development), optimized performance with Cloudinary for image storage, and improved UX flow supported by analytics integration.",
    result:
      "3x page views,40% growth in online conversions",
  },
  {
    id: 3,
    tag: "Simplify360",
    title: "AI-Driven SaaS Platform",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&blur=20",
    problem:
      "Complex service offerings were confusing users, resulting in high bounce rates and low demo requests.",
    solution:
      "PR WEBSTOCK created a clean, conversion-focused website with simplified messaging, SEO-friendly structure, and fast performance. API integrations for email and WhatsApp communication improved lead follow-ups.",
    result:
      "50% reduction in bounce rate, 2× increase in demo requests",
  },
];

const Casestudies = () => {
  return (
    <section className="case-studies">
      <div className="case-header">
        <h2 className="case-title">Case Studies</h2>
        <p className="case-subtitle">Real impact, measurable results</p>
      </div>

      <div className="case-grid">
        {caseStudies.map((item) => (
          <div className="case-card" key={item.id}>
            <div className="case-image">
              <img 
                src={item.img.replace('&blur=20', '')} 
                alt={item.title}
                loading="lazy"
              />
              <span className="case-tag">{item.tag}</span>
            </div>
            
            <div className="case-content">
              <h3>{item.title}</h3>
              
              <div className="case-metrics">
                <div className="metric-item">
                  <div className="metric-header">
                    <span className="metric-label">Problem</span>
                  </div>
                  <p>{item.problem}</p>
                </div>

                <div className="metric-item">
                  <div className="metric-header">
                    <span className="metric-label">Solution</span>
                  </div>
                  <p>{item.solution}</p>
                </div>

                <div className="metric-item result">
                  <div className="metric-header">
                    <span className="metric-label">Result</span>
                  </div>
                  <p className="metric-value">{item.result}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Casestudies;