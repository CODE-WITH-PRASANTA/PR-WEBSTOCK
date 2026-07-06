import React, { useState } from 'react';
import './TeamMembers.css';
import { 
  FaHome, 
  FaChevronRight, 
  FaMapMarkerAlt, 
  FaTwitter, 
  FaMobileAlt, 
  FaEnvelope, 
  FaStar, 
  FaRegStar,
  FaChevronLeft
} from 'react-icons/fa';

const teamData = [
  {
    id: 1,
    name: 'Sarah Smith',
    degree: 'B.E.',
    rating: 4,
    totalRatings: 12342,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer...',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=60',
    address: 'Shanti Nagar Bldg No B 4, Sector No 6, Mira Road',
    twitter: 'sarah_smith',
    phone: '123456789',
    email: 'sarah@example.com'
  },
  {
    id: 2,
    name: 'Jay Soni',
    degree: 'Computer Science',
    rating: 3,
    totalRatings: 6545,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer...',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=60',
    address: 'Shanti Nagar Bldg No B 4, Sector No 6, Mira Road',
    twitter: 'jay_soni',
    phone: '123456789',
    email: 'jay@example.com'
  },
  {
    id: 3,
    name: 'Megha Trivedi',
    degree: 'M.C.A.',
    rating: 4,
    totalRatings: 3456,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer...',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=60',
    address: 'Shanti Nagar Bldg No B 4, Sector No 6, Mira Road',
    twitter: 'megha_trivedi',
    phone: '123456789',
    email: 'megha@example.com'
  },
  {
    id: 4,
    name: 'Jacob Ryan',
    degree: 'B.E., M.E.',
    rating: 5,
    totalRatings: 3987,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer...',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60',
    address: 'Shanti Nagar Bldg No B 4, Sector No 6, Mira Road',
    twitter: 'jacob_ryan',
    phone: '123456789',
    email: 'jacob@example.com'
  },
  {
    id: 5,
    name: 'Ashton Cox',
    degree: 'B.C.A., M.C.A.',
    rating: 3,
    totalRatings: 34,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60',
    address: 'Shanti Nagar Bldg No B 4, Sector No 6, Mira Road',
    twitter: 'ashton_cox',
    phone: '123456789',
    email: 'ashton@example.com'
  },
  {
    id: 6,
    name: 'Angelica Ramos',
    degree: 'M. Tech',
    rating: 5,
    totalRatings: 765,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer...',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=60',
    address: 'Shanti Nagar Bldg No B 4, Sector No 6, Mira Road',
    twitter: 'angelica_ramos',
    phone: '123456789',
    email: 'angelica@example.com'
  }
];

const TeamMembers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  // Calculate slice indices for pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = teamData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(teamData.length / cardsPerPage);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon empty" />);
      }
    }
    return stars;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="my-team-container">
      {/* Header section with Breadcrumbs */}
      <header className="team-header">
        <h1 className="header-title">My Team</h1>
        <div className="breadcrumb">
          <FaHome className="home-icon" />
          <FaChevronRight className="arrow-icon" />
          <span className="bread-link">Home</span>
          <FaChevronRight className="arrow-icon" />
          <span className="bread-current">My Team</span>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <main className="team-content-wrapper">
        <div className="team-list">
          {currentCards.map((member) => (
            <div key={member.id} className="member-card">
              
              {/* Left Column: Image Container */}
              <div className="member-image-column">
                <div className="image-container">
                  <img src={member.image} alt={member.name} className="member-photo" />
                </div>
              </div>

              {/* Middle Column: Personal details & Text Bio */}
              <div className="member-bio-column">
                <h2 className="member-name">{member.name}</h2>
                <p className="member-degree">{member.degree}</p>
                
                <div className="rating-container">
                  <span className="rating-number">{member.rating}</span>
                  <div className="stars-wrapper">{renderStars(member.rating)}</div>
                  <span className="ratings-count">({member.totalRatings} ratings)</span>
                </div>

                <p className="member-description">
                  <strong>Lorem Ipsum</strong> {member.description.replace('Lorem Ipsum', '')}
                </p>
              </div>

              {/* Right Column: Contact Details Lists */}
              <div className="member-contact-column">
                <ul className="contact-list">
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <span className="contact-text">{member.address}</span>
                  </li>
                  <li>
                    <FaTwitter className="contact-icon" />
                    <span className="contact-text">{member.twitter}</span>
                  </li>
                  <li>
                    <FaMobileAlt className="contact-icon" />
                    <span className="contact-text">{member.phone}</span>
                  </li>
                  <li>
                    <FaEnvelope className="contact-icon" />
                    <span className="contact-text">{member.email}</span>
                  </li>
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button 
              className="pagination-btn arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              className="pagination-btn arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamMembers;