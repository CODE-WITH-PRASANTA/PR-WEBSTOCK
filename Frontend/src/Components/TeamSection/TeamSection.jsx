import React from 'react';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import './TeamSection.css';

const members = [
  { name: 'Cassian Coleson', role: 'Founder at, Pr WebStock', color: '#2dbb68' },
  { name: 'Jacob Logan', role: 'Web Designer', color: '#6ca0f6' },
  { name: 'Charlotte Amelia', role: 'Software Developer', color: '#9b7bf6' },
  { name: 'Sofia Scarlett', role: 'Product Designer', color: '#27a2c8' },
  { name: 'Maverick Dylan', role: 'QA Engineer', color: '#d3d3d3' },
  { name: 'Violet Penelope', role: 'Marketing Lead', color: '#00b7c7' },
];

const ArchAvatar = ({ initials, bg, imgSrc }) => (
  <div className="arch-avatar" style={{ backgroundColor: bg }}>
    {/* random image sits behind the initials */}
    <img className="arch-image" src={imgSrc} alt={`${initials} avatar`} />
    <span className="arch-initials">{initials}</span>
  </div>
);

const TeamCard = ({ member, index }) => {
  const initials = member.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  // use a seeded picsum photo so each member gets a consistent 'random' image
  const imgSrc = `https://picsum.photos/seed/${encodeURIComponent(member.name)} /600/600`.replace(' ', '');
  return (
    <div className="team-card">
      <div className="arch-frame">
        <ArchAvatar initials={initials} bg={member.color} imgSrc={imgSrc} />
      </div>
      <div className="card-body">
        <h4 className="card-name">{member.name}</h4>
        <p className="card-role">{member.role}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="container">
          <aside className="left-panel">
            <div className="teamSec-badge">
              <FaStar /> OUR EXPERT TEAM <FaStar className="right-star" />
            </div>

            <h1 className="teamSec-headline">
              Meet the Creative Minds <br />
              <span className="subline">Behind PR WEBSTOCK.</span>
            </h1>

         <p className="lead">
            At PR WEBSTOCK, our strength lies in our people. Our team of developers,
            designers, strategists, and innovators work with complete dedication to
            deliver meaningful digital experiences. We follow a collaborative, disciplined,
            and detail-oriented working style — ensuring every project is researched, crafted,
            and executed with precision.

            <br /><br />

            Our experts specialize in modern frontend development, backend engineering,
            API architecture, database design, cloud integration, and full-scale application
            development. Whether it’s building a high-performance website, a secure backend
            system, or a scalable mobile application, our team combines innovation, technology,
            and problem-solving to create solutions that move businesses forward.
          </p>


            <div className="join-cta">
              <div className="join-shape">
                <a className="join-link" href="/career">
                  Work With Us <FaArrowRight className="cta-arrow" />
                </a>
              </div>
            </div>
          </aside>


       <main className="right-panel">
        <div className="cards-grid desktop-grid">
          {members.map((m, i) => (
            <TeamCard key={i} member={m} index={i} />
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="mobile-slider">
          <div className="slider-track">
            {members.map((m, i) => (
              <div className="slider-item" key={i}>
                <TeamCard member={m} index={i} />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="slider-dots">
            {members.map((_, i) => (
              <span key={i} className="dot" />
            ))}
          </div>
        </div>
      </main>

      </div>
    </section>
  );
};

export default TeamSection;
