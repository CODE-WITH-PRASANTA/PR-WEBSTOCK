import React from 'react';
import { 
  FaRegClock, 
  FaRegCircleCheck, // Corrected from FaRegCheckCircle
  FaTriangleExclamation, 
  FaRegFaceSmile, // Corrected from FaRegSmile
  FaGear, 
  FaHouse 
} from 'react-icons/fa6';
import { MdKeyboardArrowRight } from "react-icons/md";
import './SLAStatus.css';

const SLAStatus = () => {
  // Mock data for the KPI top cards
  const kpiData = [
    {
      title: 'Initial Response Time',
      target: 'Target: 4 Hours',
      status: 'On Track',
      statusType: 'track',
      percentage: '92%',
      icon: <FaRegClock className="text-xl" />,
      iconBg: 'bg-green-600',
      progressColor: 'bg-blue-600',
    },
    {
      title: 'Resolution Time',
      target: 'Target: 24 Hours',
      status: 'On Track',
      statusType: 'track',
      percentage: '85%',
      icon: <FaRegCircleCheck className="text-xl" />, // Reference updated
      iconBg: 'bg-blue-500',
      progressColor: 'bg-blue-600',
    },
    {
      title: 'Critical Ticket Resolution',
      target: 'Target: 2 Hours',
      status: 'Excellent',
      statusType: 'excellent',
      percentage: '100%',
      icon: <FaTriangleExclamation className="text-xl" />,
      iconBg: 'bg-amber-500',
      progressColor: 'bg-blue-600',
    },
    {
      title: 'Client Satisfaction',
      target: 'Target: 90%',
      status: 'Excellent',
      statusType: 'excellent',
      percentage: '95%',
      icon: <FaRegFaceSmile className="text-xl" />, // Reference updated
      iconBg: 'bg-purple-700',
      progressColor: 'bg-blue-600',
    },
  ];

  // Mock data for the compliance overview table
  const tableData = [
    {
      category: 'Critical Issues',
      target: '2 Hours',
      performance: '1.5 Hours',
      status: 'Excellent',
      statusBg: 'bg-green-100 text-green-700 border-green-200',
    },
    {
      category: 'Technical Support',
      target: '4 Hours',
      performance: '3.8 Hours',
      status: 'On Track',
      statusBg: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      category: 'Billing Queries',
      target: '24 Hours',
      performance: '20 Hours',
      status: 'On Track',
      statusBg: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      category: 'Feature Requests',
      target: '48 Hours',
      performance: '40 Hours',
      status: 'On Track',
      statusBg: 'bg-blue-100 text-blue-700 border-blue-200',
    },
  ];

  return (
    <div className="SLAStatus min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans relative text-slate-800">
      
      {/* --- Floating Settings Gear Button --- */}
      <button className="absolute right-0 top-36 bg-indigo-500 text-white p-2.5 rounded-l-md shadow-md hover:bg-indigo-600 transition-colors z-10 hidden sm:block">
        <FaGear className="text-lg animate-spin-slow" />
      </button>

      {/* --- Top Header / Breadcrumbs Section --- */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h1 className="text-2xl font-semibold text-slate-700">SLA Status</h1>
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <FaHouse className="text-slate-400" />
          <MdKeyboardArrowRight className="text-lg text-slate-400" />
          <span className="hover:underline cursor-pointer">Support</span>
          <MdKeyboardArrowRight className="text-lg text-slate-400" />
          <span className="text-slate-600 font-medium">SLA Dashboard</span>
        </nav>
      </header>

      {/* --- KPI Grid Section --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm p-5 border border-slate-200/60 flex flex-col justify-between min-h-[140px]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                {/* Icon wrapper */}
                <div className={`${kpi.iconBg} text-white p-3.5 rounded-lg flex items-center justify-center shadow-sm h-12 w-12 shrink-0`}>
                  {kpi.icon}
                </div>
                {/* Metric text details */}
                <div>
                  <h3 className="font-semibold text-lg text-slate-700 leading-tight">{kpi.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {kpi.target} |{' '}
                    <span className={kpi.statusType === 'excellent' ? 'text-slate-400 font-medium' : 'text-slate-400 font-medium'}>
                      {kpi.status}
                    </span>
                  </p>
                </div>
              </div>
              {/* Huge percentage value */}
              <span className="text-3xl sm:text-4xl font-bold text-slate-700 tracking-tight">{kpi.percentage}</span>
            </div>

            {/* Custom Bottom Progress Bar Match */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div 
                className={`${kpi.progressColor} h-full rounded-full transition-all duration-500`} 
                style={{ width: kpi.percentage }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* --- SLA Compliance Overview Table Section --- */}
      <section className="bg-white rounded-lg shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700">SLA Compliance Overview</h2>
        </div>
        
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white text-slate-800 text-sm font-bold border-b border-slate-100">
                <th className="p-4 pl-6 w-1/4">Service Category</th>
                <th className="p-4 w-1/4">Target SLA</th>
                <th className="p-4 w-1/4">Current Performance</th>
                <th className="p-4 pr-6 w-1/4">Compliance</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 text-sm divide-y divide-slate-100">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6 font-medium text-slate-700">{row.category}</td>
                  <td className="p-4">{row.target}</td>
                  <td className="p-4">{row.performance}</td>
                  <td className="p-4 pr-6">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded border ${row.statusBg}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default SLAStatus;