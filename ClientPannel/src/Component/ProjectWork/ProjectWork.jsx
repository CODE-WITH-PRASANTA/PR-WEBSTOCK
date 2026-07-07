import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ProjectWork.css';

// --- Datasets ---
const shopAppData = [
  { name: 'Jan', Hours: 69 },
  { name: 'Feb', Hours: 75 },
  { name: 'Mar', Hours: 72 },
  { name: 'Apr', Hours: 69 },
  { name: 'May', Hours: 75 },
  { name: 'Jun', Hours: 66 },
  { name: 'Jul', Hours: 80 },
];

const erpSystemData = [
  { name: 'Jan', Hours: 113 },
  { name: 'Feb', Hours: 120 },
  { name: 'Mar', Hours: 130 },
  { name: 'Apr', Hours: 120 },
];

const projectDetails = [
  { name: 'Angular website', percentage: 33, color: '#ff3d3d' },
  { name: 'Shopping App', percentage: 25, color: '#2196f3' },
  { name: 'ERP system', percentage: 12, color: '#ffc107' },
  { name: 'React admin panel', percentage: 10, color: '#9c27b0' },
  { name: 'Api Integration', percentage: 7, color: '#4caf50' },
  { name: 'Email Marketing', percentage: 13, color: '#00bcd4' },
];

// --- Subcomponents ---

// Renders static value tags directly over dataset peaks
const StaticNodeLabel = ({ x, y, value }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-14} y={-24} width={28} height={18} rx={4} fill="currentColor" opacity="0.85" />
    <text x={0} y={-11} textAnchor="middle" fill="#FFFFFF" fontSize={11} fontWeight="700">
      {value}
    </text>
  </g>
);

// Custom Cursor Tooltip showing Month Name and tracked numeric values
const CustomCursorTooltip = ({ active, payload, label, themeColor }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-container">
        <div className="tooltip-main-box">
          <div className="tooltip-header">{label}</div>
          <div className="tooltip-body">
            <span className="tooltip-indicator" style={{ backgroundColor: themeColor }} />
            <span className="tooltip-label">Hours:</span>
            <span className="tooltip-value">{payload[0].value}</span>
          </div>
        </div>
        
        <div className="tooltip-pointer-group">
          <div className="tooltip-triangle" />
          <div className="tooltip-axis-tag">{label}</div>
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Export View Component ---
const ProjectWork = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        
        {/* Card 1: My Shop App (Android) */}
        <div className="chart-card">
          <div>
            <h3 className="card-title">Project Hourly Work</h3>
            <p className="card-subtitle">
              My Shop App <span className="subtitle-tech">(Android)</span>
            </p>
          </div>
          
          <div className="chart-wrapper" style={{ color: '#6366f1' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={shopAppData} margin={{ top: 30, right: 15, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="shopAppGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  domain={[65, 80]} 
                  ticks={[65, 70, 75, 80]}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                />
                <Tooltip 
                  content={<CustomCursorTooltip themeColor="#6366f1" />} 
                  cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }}
                  position={{ y: -45 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Hours" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fill="url(#shopAppGrad)"
                  label={<StaticNodeLabel />}
                  dot={false}
                  activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: '#6366f1' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="axis-title-bottom">Months</div>
        </div>

        {/* Card 2: ERP System (Java) */}
        <div className="chart-card">
          <div>
            <h3 className="card-title">Project Hourly Work</h3>
            <p className="card-subtitle">
              ERP System <span className="subtitle-tech">(Java)</span>
            </p>
          </div>
          
          <div className="chart-wrapper" style={{ color: '#a855f7' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={erpSystemData} margin={{ top: 30, right: 15, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="erpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  domain={[110, 130]} 
                  ticks={[110, 115, 120, 125, 130]}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                />
                <Tooltip 
                  content={<CustomCursorTooltip themeColor="#a855f7" />} 
                  cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }}
                  position={{ y: -45 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Hours" 
                  stroke="#a855f7" 
                  strokeWidth={4} 
                  fill="url(#erpGrad)"
                  label={<StaticNodeLabel />}
                  dot={false}
                  activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: '#a855f7' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="axis-title-bottom">Months</div>
        </div>

        {/* Card 3: Project Hours Details List */}
        <div className="chart-card">
          <div className="details-header">
            <div>
              <h3 className="card-title" style={{ marginBottom: '4px' }}>Project Hours details</h3>
              <div className="metrics-left">
                <span className="metric-big-number">3487</span>
                <span className="metric-unit">Hours</span>
              </div>
            </div>
            <div className="metric-expected">Expected: 10000</div>
          </div>

          <div className="multi-progress-bar">
            {projectDetails.map((project, idx) => (
              <div 
                key={idx} 
                className="progress-segment"
                style={{ 
                  width: `${project.percentage}%`, 
                  backgroundColor: project.color 
                }} 
              />
            ))}
          </div>

          <div className="details-list-container">
            <div className="list-header-row">
              <span>Project Name</span>
              <span>Completed</span>
            </div>
            {projectDetails.map((project, idx) => (
              <div key={idx} className="list-item-row">
                <div className="item-left-block">
                  <span className="item-color-dot" style={{ backgroundColor: project.color }} />
                  <span className="item-name">{project.name}</span>
                </div>
                <span className="item-percentage">{project.percentage}%</span>
              </div>
            ))}
          </div>

          <div className="floating-side-tab">
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectWork;