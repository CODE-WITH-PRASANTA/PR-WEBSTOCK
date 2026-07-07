import React from 'react';
import './RecentDocuments.css';
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileArchive, 
  FaEye, 
  FaDownload, 
  FaFileUpload 
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RecentDocuments = () => {
  // Document List Data
  const documents = [
    { id: 1, title: 'Project Proposal', type: 'PDF', size: '2.4 MB', date: 'Dec 15, 2023', icon: 'pdf' },
    { id: 2, title: 'Contract Agreement', type: 'DOCX', size: '1.8 MB', date: 'Dec 10, 2023', icon: 'docx' },
    { id: 3, title: 'Design Mockups', type: 'ZIP', size: '15.2 MB', date: 'Nov 28, 2023', icon: 'zip' },
    { id: 4, title: 'Meeting Minutes', type: 'PDF', size: '0.8 MB', date: 'Nov 20, 2023', icon: 'pdf' },
    { id: 5, title: 'Invoice #INV-2023-11', type: 'PDF', size: '1.2 MB', date: 'Nov 15, 2023', icon: 'pdf' },
    { id: 6, title: 'Technical Specifications', type: 'DOCX', size: '3.1 MB', date: 'Dec 18, 2023', icon: 'docx' },
    { id: 7, title: 'User Guide', type: 'PDF', size: '4.5 MB', date: 'Dec 1, 2023', icon: 'pdf' },
    { id: 8, title: 'Deployment Package', type: 'ZIP', size: '22.0 MB', date: 'Nov 10, 2023', icon: 'zip' }
  ];

  // Chart configuration data matching image graph
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [12500, 18000, 15000, 22000, 17500, 24000],
        borderColor: '#4caf50',
        backgroundColor: '#4caf50',
        tension: 0.4, // Creates the smooth curve line
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: '#4caf50',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: 'Month',
          color: '#718096',
          font: { weight: 'bold', size: 11 }
        },
        ticks: { color: '#a0aec0' }
      },
      y: {
        min: 5000,
        max: 35000,
        ticks: {
          stepSize: 5000,
          color: '#a0aec0'
        },
        title: {
          display: true,
          text: 'Amount ($)',
          color: '#718096',
          font: { weight: 'bold', size: 11 }
        },
        grid: {
          color: '#edf2f7'
        }
      }
    }
  };

  const renderFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FaFilePdf className="rd-file-icon pdf-color" />;
      case 'docx': return <FaFileWord className="rd-file-icon docx-color" />;
      case 'zip': return <FaFileArchive className="rd-file-icon zip-color" />;
      default: return <FaFilePdf className="rd-file-icon" />;
    }
  };

  return (
    <div className="rd-dashboard-container">
      
      {/* Left Card: Recent Documents */}
      <div className="rd-panel-card rd-left-panel">
        <div className="rd-panel-header">
          <h2 className="rd-panel-title">Recent Documents</h2>
          <FaFileUpload className="rd-action-header-icon" />
        </div>
        
        <div className="rd-document-list">
          {documents.map((doc) => (
            <div key={doc.id} className="rd-document-row">
              <div className="rd-doc-info-group">
                {renderFileIcon(doc.icon)}
                <div className="rd-doc-meta">
                  <h4 className="rd-doc-title">{doc.title}</h4>
                  <p className="rd-doc-details">
                    <span>{doc.type}</span> &bull; <span>{doc.size}</span> &bull; <span>{doc.date}</span>
                  </p>
                </div>
              </div>
              <div className="rd-doc-actions-group">
                <button className="rd-action-btn" title="View"><FaEye /></button>
                <button className="rd-action-btn" title="Download"><FaDownload /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: Payment History */}
      <div className="rd-panel-card rd-right-panel">
        <h2 className="rd-panel-title">Payment History</h2>
        
        {/* Navigation Tabs */}
        <div className="rd-tabs-container">
          <button className="rd-tab-item rd-active-tab">Overview</button>
          <button className="rd-tab-item">Payment History</button>
        </div>

        {/* Metrics Summary Row */}
        <div className="rd-metrics-grid">
          <div className="rd-metric-card">
            <span className="rd-metric-label">Total Paid</span>
            <h3 className="rd-metric-value">$29,800.00</h3>
          </div>
          <div className="rd-metric-card">
            <span className="rd-metric-label">Pending</span>
            <h3 className="rd-metric-value">$20,100.00</h3>
          </div>
          <div className="rd-metric-card">
            <span className="rd-metric-label">Overdue</span>
            <h3 className="rd-metric-value">$11,600.00</h3>
          </div>
        </div>

        {/* Dynamic Canvas Chart */}
        <div className="rd-chart-wrapper">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

    </div>
  );
};

export default RecentDocuments;