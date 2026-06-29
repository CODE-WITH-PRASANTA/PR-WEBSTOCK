import React, {
  useEffect,
  useState,
} from "react";

import {
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

import API, {
  IMG_URL,
} from "../../api/axios";

import "./TeamSection.css";

const TeamCard = ({ member }) => {
  const imageUrl = member.image?.startsWith("http")
    ? member.image
    : `${IMG_URL}${member.image}`;

  return (
    <div className="team-card">
      <div className="arch-frame">
        <div className="arch-avatar">
          <img
            className="arch-image"
            src={imageUrl}
            alt={member.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
        </div>
      </div>

      <div className="card-body">
        <h4 className="card-name">
          {member.name}
        </h4>

        <p className="card-role">
          {member.designation}
        </p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers =
    async () => {
      try {
        const res =
          await API.get(
            "/team-members"
          );

        if (
          res.data &&
          res.data.data
        ) {
          setMembers(
            res.data.data
          );
        }
      } catch (error) {
        console.log(
          "Team Fetch Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="team-section">
      <div className="container">
        {/* LEFT CONTENT */}
        <aside className="left-panel">
          <div className="teamSec-badge">
            <FaStar />
            OUR EXPERT TEAM
            <FaStar className="right-star" />
          </div>

          <h1 className="teamSec-headline">
            Meet the Creative Minds
            <br />
            <span className="subline">
              Behind PR WEBSTOCK.
            </span>
          </h1>

          <p className="lead">
            At PR WEBSTOCK, our
            strength lies in our
            people. Our team of
            developers, designers,
            strategists, and
            innovators work with
            complete dedication to
            deliver meaningful
            digital experiences.

            <br />
            <br />

            Our experts specialize
            in modern frontend
            development, backend
            engineering, API
            architecture, database
            design, cloud
            integration, and
            full-scale application
            development.
          </p>

          <div className="join-cta">
            <div className="join-shape">
              <a
                className="join-link"
                href="/career"
              >
                Work With Us
                <FaArrowRight className="cta-arrow" />
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="right-panel">
          {loading ? (
            <div className="team-loading">
              Loading Team...
            </div>
          ) : members.length >
            0 ? (
            <>
              {/* DESKTOP GRID */}
              <div className="cards-grid desktop-grid">
                {members.map(
                  (
                    member
                  ) => (
                    <TeamCard
                      key={
                        member._id
                      }
                      member={
                        member
                      }
                    />
                  )
                )}
              </div>

              {/* MOBILE SLIDER */}
              <div className="mobile-slider">
                <div className="slider-track">
                  {members.map(
                    (
                      member
                    ) => (
                      <div
                        className="slider-item"
                        key={
                          member._id
                        }
                      >
                        <TeamCard
                          member={
                            member
                          }
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="slider-dots">
                  {members.map(
                    (
                      _,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className="dot"
                      />
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="team-empty">
              No Team Members Found
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default TeamSection;