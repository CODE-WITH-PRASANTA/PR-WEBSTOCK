import React, { useState, useRef } from "react";
import { FiHome, FiUpload, FiCheckCircle, FiFile } from "react-icons/fi";
import "./UploadDocuments.css";

const UploadDocuments = () => {
  const [docType, setFormDocType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Drag and drop event handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!docType) return;
    
    // Simulate API upload task action
    alert(`Uploading file "${selectedFile?.name || 'No file selected'}" as ${docType}`);
    
    // Reset state values smoothly after form submission
    setFormDocType("");
    setDescription("");
    setSelectedFile(null);
  };

  return (
    <div className="ud-layout-root-container">
      
      {/* ================= BREADCRUMB HEADER ================= */}
      <div className="ud-breadcrumb-header-strip">
        <div className="ud-crumb-left">
          <h2>Upload Documents</h2>
        </div>
        <div className="ud-crumb-right">
          <FiHome className="ud-home-icon-node" />
          <span className="ud-separator-node">&gt;</span>
          <span className="ud-dim-node">Documents</span>
          <span className="ud-separator-node">&gt;</span>
          <span className="ud-active-node">Upload</span>
        </div>
      </div>

      {/* ================= CARD FORM CONTAINER WRAPPER ================= */}
      <div className="ud-main-form-card">
        <span className="ud-form-section-title">Upload New Document</span>

        <form onSubmit={handleUploadSubmit} className="ud-form-element-body">
          
          {/* Document Type select dropdown outline block mapping reference image 2 options */}
          <div className={`ud-fieldset-select-node ${!docType ? "empty-required-highlight" : ""}`}>
            <legend className={!docType ? "legend-red" : ""}>Document Type*</legend>
            <select 
              required
              value={docType} 
              onChange={(e) => setFormDocType(e.target.value)}
            >
              <option value="" disabled hidden></option>
              <option value="ID Proof">ID Proof</option>
              <option value="Address Proof">Address Proof</option>
              <option value="Educational Certificate">Educational Certificate</option>
              <option value="Experience Letter">Experience Letter</option>
              <option value="Relieving Letter">Relieving Letter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description Textarea Field block mapping reference image 1 */}
          <div className="ud-fieldset-textarea-node">
            <legend>Description</legend>
            <textarea 
              rows="3" 
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Drag & Drop Upload interactive landing deck box area */}
          <div 
            className={`ud-drag-drop-zone-frame ${dragActive ? "drag-active" : ""} ${selectedFile ? "file-loaded" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="ud-hidden-file-input" 
              onChange={handleFileChange}
            />
            
            <div className="ud-zone-inside-content">
              {selectedFile ? (
                <>
                  <FiCheckCircle className="ud-upload-icon-graphic green-success-ico" />
                  <p className="ud-file-meta-lbl">Selected File: <strong>{selectedFile.name}</strong></p>
                  <span className="ud-alt-click-trigger">Click or drag another file to replace</span>
                </>
              ) : (
                <>
                  <FiUpload className="ud-upload-icon-graphic" />
                  <p className="ud-drag-drop-instruction-txt">Click or Drag and Drop to select a file</p>
                </>
              )}
            </div>
          </div>

          {/* Form action button container layout */}
          <div className="ud-form-action-footer-row">
            <button 
              type="submit" 
              className="ud-submit-upload-btn"
              disabled={!docType}
            >
              Upload Document
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default UploadDocuments;