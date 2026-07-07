import React from 'react';
import { 
  Home, Clipboard, Clock, UserCheck, 
  CreditCard, TrendingUp, TrendingDown 
} from 'lucide-react';
import './DashA.css'; // Custom styles loaded below

const DASHBOARD_METRICS = [
  {
    id: 1,
    title: "Running Projects",
    value: "70",
    valueColor: "#27ae60",
    changeText: "10% Higher Than Last Month",
    isPositive: true,
    icon: <Clipboard size={36} className="metric-icon" style={{ color: '#f2994a' }} />
  },
  {
    id: 2,
    title: "Active Tickets",
    value: "650",
    valueColor: "#27ae60",
    changeText: "07% Less Then Last Month",
    isPositive: false,
    icon: <Clock size={36} className="metric-icon" style={{ color: '#2f80ed' }} />
  },
  {
    id: 3,
    title: "Assigned Employee",
    value: "885",
    valueColor: "#27ae60",
    changeText: "12% Higher Then Last Month",
    isPositive: true,
    icon: <UserCheck size={36} className="metric-icon" style={{ color: '#f2c94c' }} />
  },
  {
    id: 4,
    title: "Total Payments",
    value: "$9,456",
    valueColor: "#27ae60",
    changeText: "22% Less Then Last Month",
    isPositive: false,
    icon: <CreditCard size={36} className="metric-icon" style={{ color: '#2f80ed' }} />
  }
];

const DashA = () => {
  return (
    <div className="dashboard-app">
      
      {/* Navigation Path Area Header */}
      <div className="dashboard-app__header">
        <h1 className="dashboard-app__title">Dashboard</h1>
        <div className="dashboard-app__breadcrumbs">
          <Home size={14} className="crumb-home-icon" />
          <span className="crumb">Home</span> &gt; 
          <span className="crumb active">Dashboard</span>
        </div>
      </div>

      {/* Primary Hero Welcome Banner Block */}
      <div className="welcome-banner">
        <div className="welcome-banner__graphic-side">
          {/* Replicating vector characters shape wrapper */}
          <div className="welcome-banner__avatar-composition">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
              alt="Team Female" 
              className="composition-avatar composition-avatar--female"
            />
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
              alt="Team Male" 
              className="composition-avatar composition-avatar--male"
            />
            <div className="hand-wave-indicator">👋</div>
          </div>
        </div>

        <div className="welcome-banner__content-side">
          <span className="welcome-banner__greet-subtitle">Welcome back</span>
          <h2 className="welcome-banner__username">Cara Stevens!</h2>
          <p className="welcome-banner__description">
            We would like to take this opportunity to welcome you to our practice and to thank you for choosing our 
            company. Nam quis ligula est. Nunc sed risus non turpis tristique tempor. Ut sollicitudin faucibus magna nec 
            gravida..
          </p>
        </div>
      </div>

      {/* Grid Allocation Blocks for Matrix Cards */}
      <div className="dashboard-app__metrics-grid">
        {DASHBOARD_METRICS.map((card) => (
          <div key={card.id} className="metric-summary-card">
            <div className="metric-summary-card__upper">
              <div className="metric-summary-card__icon-container">
                {card.icon}
              </div>
              <div className="metric-summary-card__data-block">
                <span className="metric-title-label">{card.title}</span>
                <span className="metric-value-display" style={{ color: card.valueColor }}>
                  {card.value}
                </span>
              </div>
            </div>
            
            <div className="metric-summary-card__lower">
              {card.isPositive ? (
                <TrendingUp size={14} className="trend-arrow trend-arrow--up" />
              ) : (
                <TrendingDown size={14} className="trend-arrow trend-arrow--down" />
              )}
              <span className="trend-message-text">{card.changeText}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashA;