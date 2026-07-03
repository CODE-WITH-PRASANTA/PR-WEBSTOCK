import React, { useState } from 'react';
import { FiUploadCloud, FiChevronDown } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import './UploadDocument.css';

const UploadDocument = () => {
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOptions = [
    'ID Proof',
    'Address Proof',
    'Educational Certificate',
    'Experience Letter',
    'Relieving Letter',
    'Other'
  ];

  const handleOptionClick = (option) => {
    setDocumentType(option);
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const isFormValid = documentType.trim() !== '' && file !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert(`Uploading: ${file.name} (${documentType})`);
    }
  };

  return (
    <div className="upload-document-container">
      {/* Container holding both Main Page Header and Breadcrumbs */}
      <div className="upload-document-top-header">
        <h1 className="upload-document-page-title">Upload Documents</h1>
        
        <div className="upload-document-breadcrumb">
          <GoHome className="breadcrumb-home-icon" />
          <span className="breadcrumb-link">Documents</span>
          <IoIosArrowForward className="breadcrumb-arrow-icon" />
          <span className="breadcrumb-current">Upload</span>
        </div>
      </div>

      {/* Main Form Card Layout */}
      <div className="upload-document-card">
        <h2 className="upload-document-title">Upload New Document</h2>

        <form onSubmit={handleSubmit} className="upload-document-form">
          
          {/* Custom Dropdown Component */}
          <div className="upload-document-dropdown-container">
            <div 
              className={`upload-document-dropdown-header ${documentType ? 'has-value' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="dropdown-label-text">
                {documentType ? documentType : 'Document Type*'}
              </span>
              <FiChevronDown className={`dropdown-chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
            </div>

            <div className={`upload-document-dropdown-list-wrapper ${isDropdownOpen ? 'show' : ''}`}>
              <ul className="upload-document-dropdown-list">
                {dropdownOptions.map((option, index) => (
                  <li 
                    key={index} 
                    className={`upload-document-dropdown-item ${documentType === option ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Description Textarea Box */}
          <div className="upload-document-textarea-container">
            <textarea
              id="description"
              className="upload-document-textarea"
              placeholder=" "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="description" className="upload-document-textarea-label">
              Description
            </label>
          </div>

          {/* Drag & Drop File Upload Area */}
          <div 
            className={`upload-document-drag-zone ${file ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <input 
              type="file" 
              id="file-input" 
              className="upload-document-file-input" 
              onChange={handleFileChange}
              hidden
            />
            <FiUploadCloud className="upload-document-zone-icon" />
            <p className="upload-document-zone-text">
              {file ? `Selected File: ${file.name}` : 'Click or Drag and Drop to select a file'}
            </p>
          </div>

          {/* Form Submit Button */}
          <button 
            type="submit" 
            className={`upload-document-submit-btn ${isFormValid ? 'active' : 'disabled'}`}
            disabled={!isFormValid}
          >
            Upload Document
          </button>

        </form>
      </div>
    </div>
  );
};

export default UploadDocument;