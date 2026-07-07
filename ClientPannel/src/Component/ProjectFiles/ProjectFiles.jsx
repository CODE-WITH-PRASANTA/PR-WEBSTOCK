import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, RotateCw, Download, 
  Calendar, ChevronLeft, ChevronRight 
} from 'lucide-react';
import './ProjectFiles.css';

const ProjectFiles = () => {
  // --- Core Source Data Mock Matching image_d23818.png Exactly ---
  const initialFilesDataset = [
    { id: '1', name: 'Project_Charter_v1.pdf', category: 'Documentation', size: '1.5 MB', date: '01/12/2024' },
    { id: '2', name: 'UI_Brand_Guidelines.pdf', category: 'Design', size: '5.2 MB', date: '01/20/2024' },
    { id: '3', name: 'Database_Entity_Diagram.png', category: 'Technical', size: '2.8 MB', date: '01/28/2024' },
    { id: '4', name: 'Meeting_Minutes_Jan_24.docx', category: 'Meeting', size: '0.4 MB', date: '01/25/2024' },
    { id: '5', name: 'Client_Requirements_v2.xlsx', category: 'Business', size: '1.2 MB', date: '02/02/2024' },
    { id: '6', name: 'Architecture_Review_v3.pdf', category: 'Technical', size: '3.4 MB', date: '02/10/2024' },
    { id: '7', name: 'User_Feedback_Summary.docx', category: 'Documentation', size: '0.8 MB', date: '02/14/2024' },
    { id: '8', name: 'API_EndPoints_Draft.xlsx', category: 'Technical', size: '1.9 MB', date: '02/19/2024' }
  ];

  const [files, setFiles] = useState(initialFilesDataset);
  const [searchTerm, setSearchTerm] = useState('');
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

  // --- Dynamic Columns Display Visibility Tracking Mapping (image_d23aff.png) ---
  const [visibleColumns, setVisibleColumns] = useState({
    id: false, // Default hidden as per checkbox setup illustration image_d23aff.png
    fileName: true,
    category: true,
    size: true,
    uploadedDate: true,
    download: true
  });

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  // --- Responsive Pagination Controls (Forced Per Request Window Context) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Search Filtering Business Rules Implementation ---
  const filteredFiles = useMemo(() => {
    return files.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [files, searchTerm]);

  // Compute pagination coordinates boundaries
  const totalItemsCount = filteredFiles.length;
  const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage) || 1;

  const paginatedFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFiles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFiles, currentPage]);

  const recordStartIndex = totalItemsCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const recordEndIndex = Math.min(currentPage * itemsPerPage, totalItemsCount);

  // --- Operational Action Toolbar Event Triggers ---
  
  // 1. Reset/Refresh table back to default states
  const triggerTableRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setFiles([...initialFilesDataset]);
    alert('Project documents directory list refreshed successfully!');
  };

  // 2. Global Backup Dataset CSV Trigger Downloader
  const downloadGlobalDatasetCSV = () => {
    const csvHeaders = 'ID,File Name,Category,Size,Uploaded Date\n';
    const csvContent = files.map(f => `"${f.id}","${f.name}","${f.category}","${f.size}","${f.date}"`).join('\n');
    
    const manifestBlob = new Blob([csvHeaders + csvContent], { type: 'text/csv;charset=utf-8;' });
    const virtualLinkElement = document.createElement('a');
    virtualLinkElement.href = URL.createObjectURL(manifestBlob);
    virtualLinkElement.setAttribute('download', 'Project_Documents_Manifest.csv');
    document.body.appendChild(virtualLinkElement);
    virtualLinkElement.click();
    document.body.removeChild(virtualLinkElement);
  };

  // 3. Row Specific Dummy File Object Downloader Trigger
  const triggerSingleFileDownload = (fileName) => {
    const textDataContent = `Simulated download data payload for file container reference matching target: ${fileName}`;
    const dynamicBlob = new Blob([textDataContent], { type: 'text/plain' });
    const elementAnchor = document.createElement('a');
    elementAnchor.href = URL.createObjectURL(dynamicBlob);
    elementAnchor.setAttribute('download', fileName);
    document.body.appendChild(elementAnchor);
    elementAnchor.click();
    document.body.removeChild(elementAnchor);
  };

  return (
    <div className="files-dashboard-container">
      
      {/* Top Breadcrumb Navigation Header Map */}
      <div className="files-breadcrumb">
        <span>🏠</span>
        <span>&gt;</span>
        <a href="#projects" className="files-breadcrumb-link">Projects</a>
        <span>&gt;</span>
        <span className="files-breadcrumb-active">Files</span>
      </div>

      <h1 className="files-main-headline">Project Files</h1>

      {/* CORE DATA CONTROLLER WRAPPER GRID CARD */}
      <div className="files-core-panel-card">
        
        {/* ACTION HEADER BAR CONTROLLER TOOLBAR */}
        <div className="files-control-action-bar">
          <div className="files-bar-left-segment">
            <span className="files-panel-subtitle">Project Documents</span>
            <div className="files-search-input-wrapper">
              <Search size={16} className="files-search-icon-embed" />
              <input 
                type="text" 
                placeholder="Search" 
                className="files-search-input-field"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Auto reset pagination tracker to page 1 during keystrokes
                }}
              />
            </div>
          </div>

          <div className="files-bar-right-segment">
            {/* Show/Hide Target Column Dropdown Selection Framework Trigger Toggle */}
            <button 
              className="files-action-icon-trigger-btn"
              onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
              title="Show/Hide Columns Menu Options"
            >
              <SlidersHorizontal size={18} />
            </button>

            {/* Column Visibility Configuration Dropdown Popover Flyout Menu Box (Matches image_d23aff.png Exactly) */}
            {isColumnMenuOpen && (
              <div className="files-popover-column-menu">
                <div className="files-popover-menu-header">Show/Hide Column</div>
                <div className="files-column-checkbox-row" onClick={() => toggleColumnVisibility('id')}>
                  <input type="checkbox" checked={visibleColumns.id} readOnly className="files-custom-checkbox-native" />
                  <span className="files-checkbox-row-label">ID</span>
                </div>
                <div className="files-column-checkbox-row" onClick={() => toggleColumnVisibility('fileName')}>
                  <input type="checkbox" checked={visibleColumns.fileName} readOnly className="files-custom-checkbox-native" />
                  <span className="files-checkbox-row-label">File Name</span>
                </div>
                <div className="files-column-checkbox-row" onClick={() => toggleColumnVisibility('category')}>
                  <input type="checkbox" checked={visibleColumns.category} readOnly className="files-custom-checkbox-native" />
                  <span className="files-checkbox-row-label">Category</span>
                </div>
                <div className="files-column-checkbox-row" onClick={() => toggleColumnVisibility('size')}>
                  <input type="checkbox" checked={visibleColumns.size} readOnly className="files-custom-checkbox-native" />
                  <span className="files-checkbox-row-label">Size</span>
                </div>
                <div className="files-column-checkbox-row" onClick={() => toggleColumnVisibility('uploadedDate')}>
                  <input type="checkbox" checked={visibleColumns.uploadedDate} readOnly className="files-custom-checkbox-native" />
                  <span className="files-checkbox-row-label">Uploaded Date</span>
                </div>
                <div className="files-column-checkbox-row" onClick={() => toggleColumnVisibility('download')}>
                  <input type="checkbox" checked={visibleColumns.download} readOnly className="files-custom-checkbox-native" />
                  <span className="files-checkbox-row-label">Download</span>
                </div>
              </div>
            )}

            <button className="files-action-icon-trigger-btn" onClick={triggerTableRefresh} title="Refresh Table Layout"><RotateCw size={18} /></button>
            <button className="files-action-icon-trigger-btn" onClick={downloadGlobalDatasetCSV} title="Download Files Manifest Report"><Download size={18} /></button>
          </div>
        </div>

        {/* RESPONSIVE SCROLLER TABLE MAIN INTERFACE */}
        <div className="files-grid-responsive-scroller">
          <table className="files-data-table-node">
            <thead>
              <tr>
                {visibleColumns.id && <th>ID</th>}
                {visibleColumns.fileName && <th>File Name</th>}
                {visibleColumns.category && <th>Category</th>}
                {visibleColumns.size && <th>Size</th>}
                {visibleColumns.uploadedDate && <th>Uploaded Date</th>}
                {visibleColumns.download && <th style={{ textAlign: 'center', width: '100px' }}>Download</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedFiles.length > 0 ? (
                paginatedFiles.map((file) => (
                  <tr key={file.id}>
                    {visibleColumns.id && <td>{file.id}</td>}
                    {visibleColumns.fileName && <td className="files-text-cell-bold">{file.name}</td>}
                    {visibleColumns.category && <td>{file.category}</td>}
                    {visibleColumns.size && <td>{file.size}</td>}
                    {visibleColumns.uploadedDate && (
                      <td>
                        <div className="files-date-cell-container">
                          <Calendar size={15} className="files-date-icon-embed" />
                          <span>{file.date}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.download && (
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className="files-row-download-btn"
                          onClick={() => triggerSingleFileDownload(file.name)}
                          title={`Download ${file.name}`}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="files-empty-fallback-row">
                    No directory document results matched your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER TRAY (Configured at 5 items per view window layout partition boundary) */}
        <div className="files-pagination-footer-tray">
          <div className="files-pagination-dropdown-block">
            <span>Items per page:</span>
            <select className="files-pagination-select-native" defaultValue="5" disabled>
              <option value="5">5</option>
            </select>
          </div>

          <div className="files-pagination-record-index-summary">
            {recordStartIndex} – {recordEndIndex} of {totalItemsCount}
          </div>

          <div className="files-pagination-nav-arrow-cluster">
            <button 
              className="files-pagination-nav-arrow-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="files-pagination-nav-arrow-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPagesCount))}
              disabled={currentPage === totalPagesCount}
              title="Next Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectFiles;