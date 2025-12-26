import React from "react";
import "./Casestudies.css";

const caseStudies = [
  {
    id: 1,
    tag: "Qwikcilver",
    title: "Industrial Tech Innovator",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&blur=20",
    problem:
      "Outdated website failed to showcase product value and lacked mobile optimization.",
    solution:
      "Mobile-first B2B website with improved navigation and lead capture.",
    result:
      "2.5x qualified leads, 60% mobile engagement boost",
  },
  {
    id: 2,
    tag: "Zycus",
    title: "Health & Wellness Brand",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&blur=20",
    problem:
      "Poor site performance limiting online conversions.",
    solution:
      "Optimized UX, faster load times, integrated analytics.",
    result:
      "3x page views, 40% sales growth",
  },
  {
    id: 3,
    tag: "Simplify360",
    title: "AI-Driven SaaS Platform",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&blur=20",
    problem:
      "Complex service offering confusing users.",
    solution:
      "Clean, conversion-focused website with simplified messaging.",
    result:
      "50% lower bounce rate, 2x demo requests",
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