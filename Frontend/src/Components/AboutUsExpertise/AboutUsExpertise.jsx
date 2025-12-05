import React from "react";
import { LuFileCheck2, LuHandHeart    , LuCalendarClock } from "react-icons/lu";
import "./AboutUsExpertise.css";

const AboutUsExpertise = () => {
  return (
    <section className="about-us-expertise">
      <div className="about-us-expertise-inner">

        {/* LEFT SECTION */}
        <div className="about-us-expertise-left">
          <div className="about-us-expertise-badge">
            ✶ EXPERTISE YOU CAN TRUST ✶
          </div>

          <h1 className="about-us-expertise-title">
            We are a Startup agency working with
            <br />
            young talents on delivering unique
            <br />
            ideas and creative work.
          </h1>

          <p className="about-us-expertise-description">
            Where innovation meets passion in a journey that started with a simple idea
            and a shared dream. Founded in recent year we embarked on a mission to bring
            the new innovation and introduce the technology. From humble beginnings to
            our current aspirations, every step has been fueled by a relentless commitment.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <aside className="about-us-expertise-stats">

          {/* STAT 1 */}
          <div className="about-us-expertise-stat">
            <div className="about-us-expertise-stat-icon-wrap">
              <LuFileCheck2 className="about-us-expertise-icon" />
            </div>
            <div className="about-us-expertise-stat-body">
              <div className="about-us-expertise-stat-number">150</div>
              <div className="about-us-expertise-stat-label">
                Projects <br />
                <span className="muted">We Have Completed</span>
              </div>
            </div>
          </div>

          {/* STAT 2 */}
          <div className="about-us-expertise-stat">
            <div className="about-us-expertise-stat-icon-wrap">
              <LuHandHeart     className="about-us-expertise-icon" />
            </div>
            <div className="about-us-expertise-stat-body">
              <div className="about-us-expertise-stat-number">
                90 <span className="percent">%</span>
              </div>
              <div className="about-us-expertise-stat-label">
                Customer Satisfaction
              </div>
            </div>
          </div>

          {/* STAT 3 */}
          <div className="about-us-expertise-stat">
            <div className="about-us-expertise-stat-icon-wrap">
              <LuCalendarClock className="about-us-expertise-icon" />
            </div>
            <div className="about-us-expertise-stat-body">
              <div className="about-us-expertise-stat-number">
                3 <span className="small">Mins</span>
              </div>
              <div className="about-us-expertise-stat-label">
                Average Answer Time
              </div>
            </div>
          </div>

        </aside>
      </div>
    </section>
  );
};

export default AboutUsExpertise;
