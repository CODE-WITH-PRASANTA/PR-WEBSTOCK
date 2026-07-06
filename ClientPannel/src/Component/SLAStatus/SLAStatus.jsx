import React, { useRef } from 'react';
import { AiOutlineClockCircle, AiFillWarning, AiOutlineSmile, AiFillCheckCircle, AiOutlineHome } from 'react-icons/ai';
import { BsArrowRightShort, BsGearFill } from 'react-icons/bs';
import { MdOutlinePrint, MdPictureAsPdf } from 'react-icons/md';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- Hardcoded UI Data Arrays ---
const kpiData = [
  {
    id: 1,
    title: 'Initial Response Time',
    targetText: 'Target: 4 Hours',
    trackStatus: 'On Track',
    percentage: 92,
    icon: <AiOutlineClockCircle className="text-xl text-white" />,
    iconBgColor: 'bg-[#4caf50]', // Authentic Material Green from image
  },
  {
    id: 2,
    title: 'Resolution Time',
    targetText: 'Target: 24 Hours',
    trackStatus: 'On Track',
    percentage: 85,
    icon: <AiFillCheckCircle className="text-xl text-white" />,
    iconBgColor: 'bg-[#2196f3]', // Authentic Material Blue
  },
  {
    id: 3,
    title: 'Critical Ticket Resolution',
    targetText: 'Target: 2 Hours',
    trackStatus: 'Excellent',
    percentage: 100,
    icon: <AiFillWarning className="text-xl text-white" />,
    iconBgColor: 'bg-[#ff9800]', // Orange Warning Accent
  },
  {
    id: 4,
    title: 'Client Satisfaction',
    targetText: 'Target: 90%',
    trackStatus: 'Excellent',
    percentage: 95,
    icon: <AiOutlineSmile className="text-xl text-white" />,
    iconBgColor: 'bg-[#9c27b0]', // Purple Smiley Accent
  },
];

const overviewData = [
  { category: 'Critical Issues', target: '2 Hours', performance: '1.5 Hours', compliance: 'Excellent' },
  { category: 'Technical Support', target: '4 Hours', performance: '3.8 Hours', compliance: 'On Track' },
  { category: 'Billing Queries', target: '24 Hours', performance: '20 Hours', compliance: 'On Track' },
  { category: 'Feature Requests', target: '48 Hours', performance: '40 Hours', compliance: 'On Track' },
];

const SLAStatus = () => {
  const printContainerRef = useRef();

  // --- Browser Native Print Functionality ---
  const handlePrint = () => {
    window.print();
  };

  // --- HTML Canvas to jsPDF Generator ---
  const handleDownloadPDF = async () => {
    const element = printContainerRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2, // Scales layout up for crisp vector rendering in PDF
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4'); // Sets document to landscape for wide layouts
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

    pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
    pdf.save('SLA_Status_Dashboard.pdf');
  };

  return (
    <div className="SLAStatus w-full min-h-screen bg-[#f4f7f6] p-4 md:p-8 font-sans text-[#333d47]">
      
      {/* Action Controller Block (Hidden entirely during raw prints) */}
      <div className="SLAStatus-actions flex justify-end gap-3 mb-4 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-700 font-medium text-sm hover:bg-gray-50 transition"
        >
          <MdOutlinePrint className="text-lg" /> Print Report
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-[#0052cc] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition"
        >
          <MdPictureAsPdf className="text-lg" /> Export PDF
        </button>
      </div>

      {/* Target Ref Area for PDF Rendering and Native Layout Architecture */}
      <div ref={printContainerRef} className="SLAStatus-printable-content w-full">
        
        {/* Main Section Header Block */}
        <div className="SLAStatus-header flex flex-row justify-between items-center w-full mb-6 relative">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-[#333d47]">SLA Status</h1>
            <div className="SLAStatus-breadcrumb flex items-center text-xs md:text-sm text-[#8a94a6] mt-1 gap-1">
              <AiOutlineHome className="text-sm" />
              <span className="hover:underline cursor-pointer">Support</span>
              <BsArrowRightShort className="text-base text-gray-400" />
              <span className="font-medium text-[#4a5568]">SLA Dashboard</span>
            </div>
          </div>

          {/* Floating Settings Gear Box aligned on right block */}
          <div className="SLAStatus-config-tab bg-[#7b68ee] text-white p-2.5 rounded-l-md absolute -right-4 md:-right-8 shadow-sm no-print cursor-pointer">
            <BsGearFill className="text-base animate-spin-slow" />
          </div>
        </div>

        {/* Core KPI Metrics Grid */}
        <div className="SLAStatus-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {kpiData.map((kpi) => (
            <div key={kpi.id} className="SLAStatus-card bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4">
              <div className={`${kpi.iconBgColor} p-3 rounded-lg flex items-center justify-center shadow-sm`}>
                {kpi.icon}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-[#4a5568]">{kpi.title}</h3>
                    <p className="text-xs md:text-sm text-[#a0aec0] mt-1">
                      {kpi.targetText} <span className="text-gray-300 mx-1">|</span>{' '}
                      <span className="text-[#718096] font-semibold">{kpi.trackStatus}</span>
                    </p>
                  </div>
                  <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#2d3748]">
                    {kpi.percentage}%
                  </span>
                </div>

                {/* Simulated Custom Metric Baseline Line */}
                <div className="SLAStatus-progress-track w-full bg-[#edf2f7] h-1.5 rounded-full mt-4 overflow-hidden relative">
                  <div 
                    className="SLAStatus-progress-bar absolute top-0 left-0 h-full bg-[#0052cc] rounded-full transition-all duration-500"
                    style={{ width: `${kpi.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Tabular Data Matrix */}
        <div className="SLAStatus-overview-container bg-white p-5 rounded-lg shadow-sm border border-gray-100 w-full">
          <h2 className="text-base font-semibold text-[#4a5568] mb-4">SLA Compliance Overview</h2>
          
          <div className="overflow-x-auto w-full">
            <table className="SLAStatus-table w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm font-bold text-gray-800">Service Category</th>
                  <th className="pb-3 text-sm font-bold text-gray-800 text-center">Target SLA</th>
                  <th className="pb-3 text-sm font-bold text-gray-800 text-center">Current Performance</th>
                  <th className="pb-3 text-sm font-bold text-gray-800 text-right">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {overviewData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                    <td className="py-4 text-sm font-medium text-[#2d3748]">{row.category}</td>
                    <td className="py-4 text-sm text-[#2d3748] text-center">{row.target}</td>
                    <td className="py-4 text-sm text-[#2d3748] text-center">{row.performance}</td>
                    <td className="py-4 text-sm text-right">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold border ${
                        row.compliance === 'Excellent' 
                          ? 'bg-[#e6f6ec] text-[#2e7d32] border-[#c8e6c9]' 
                          : 'bg-[#e8f4fd] text-[#1976d2] border-[#bbdefb]'
                      }`}>
                        {row.compliance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Embedded Global Styles overrides for Native Print Frameworks */}
      <style>{`
        @media print {
          body { background-color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .SLAStatus { background-color: #ffffff !important; padding: 0 !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SLAStatus;