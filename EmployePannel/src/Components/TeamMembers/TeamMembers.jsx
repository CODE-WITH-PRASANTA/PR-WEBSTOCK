import React, { useState, useEffect, useCallback } from 'react';
import './TeamMembers.css';
import API from "../../api/axios"; 
import { FaMapMarkerAlt, FaMobileAlt, FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TeamMembers = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const limit = 3;

  const fetchEmployees = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await API.get(`/addemployees/employees?page=${page}&limit=${limit}`);
      if (response.data?.success) {
        setEmployees(response.data.data);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage, fetchEmployees]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/default-avatar.png';
  if (imagePath.startsWith('http')) return imagePath;

  const apiBase = API.defaults.baseURL;

  const serverBase = apiBase.replace(/\/api$/, "");

  // 3. Ensure path starts with a slash
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  // 4. Combine them
  return `${serverBase}${cleanPath}`;
};


  return (
    <div className="my-team-container">
      <header className="team-header">
        <h1 className="header-title">My Team</h1>
      </header>

      <main className="team-content-wrapper">
        {loading ? (
          <div className="loading-state">Loading team members...</div>
        ) : (
          <div className="team-list">
            {employees.map((member) => (
              <div key={member._id} className="member-card">
                <div className="member-image-column">
                  <div className="image-container">
                    <img 
                      src={getImageUrl(member.profileImage)} 
                      alt={member.name} 
                      className="member-photo"
                      onError={(e) => { e.target.src = '/default-avatar.png'; }}
                    />
                  </div>
                  <span className={`status-badge ${member.employeeStatus?.toLowerCase().replace(' ', '-')}`}>
                    {member.employeeStatus}
                  </span>
                </div>

                <div className="member-bio-column">
                  <h2 className="member-name">{member.name}</h2>
                  <p className="member-role">{member.role} | {member.department}</p>
                  <p className="member-degree"><strong>Degree:</strong> {member.degree || "N/A"}</p>
                  
                  <div className="extra-details">
                    <p><strong>Work Location:</strong> {member.workLocation || "N/A"}</p>
                    {member.birthDate && (
                      <p><strong>DOB:</strong> {new Date(member.birthDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

               <div className="member-contact-column">
                  <ul className="contact-list">
                    <li><strong>ID:</strong> {member.employeeId}</li>
                    <li><span className="contact-icon-wrapper"><FaMapMarkerAlt /></span> {member.address || "No address"}</li>
                    <li><span className="contact-icon-wrapper"><FaMobileAlt /></span> {member.mobile}</li>
                    <li><span className="contact-icon-wrapper"><FaEnvelope /></span> {member.email}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination-container">
            <button className="pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <FaChevronLeft />
            </button>
            <span className="page-info">Page {currentPage} of {totalPages}</span>
            <button className="pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaChevronRight />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamMembers;