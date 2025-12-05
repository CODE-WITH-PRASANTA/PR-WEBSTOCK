import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./AwardsSection.css"; // make sure this path matches where you paste the CSS

const awardsData = [
  { year: "2024", title: "Innovation Ignition Award", subtitle: "Site Of The Day" },
  { year: "2024", title: "CSS Design Award", subtitle: "Site Of The Month" },
  { year: "2024", title: "Masterpiece Maker", subtitle: "Awards Jury 2024" },
  { year: "2024", title: "Alchemy Achievement", subtitle: "Site Of The Day" },
];

const AwardsSection = () => {
  return (
    <section className="awards-wrap">
      <div className="awards-inner">
        <aside className="awards-left">
          <div className="badge">
            <span className="badge-dot" />
            <span className="badge-text">OUR AWARD TIME</span>
          </div>

          <h1 className="headline">
            Celebrating Zenfy's<br />
            <span className="muted">Award-Winning</span><br />
            Excellence.
          </h1>

          <a className="about-link" href="#about">
            About Us More <span className="chev">↗</span>
          </a>
        </aside>

        <main className="awards-right" aria-label="Awards timeline">
          <div className="timeline-track">
            <div className="timeline-pin" />
            <div className="timeline-scroll">
              {awardsData.map((a, idx) => (
                <article key={idx} className="timeline-item">
                  <div className="item-content">
                    <div className="item-year">{a.year}</div>
                    <h3 className="item-title">{a.title}</h3>
                    <div className="item-sub">{a.subtitle}</div>
                  </div>

                  <button className="open-btn" aria-label={`Open ${a.title}`}>
                    <div className="open-ring">
                      <FiArrowRight />
                    </div>
                  </button>
                </article>
              ))}
              {/* add spacing at bottom so last item isn't cramped */}
              <div style={{ height: 40 }} />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AwardsSection;
