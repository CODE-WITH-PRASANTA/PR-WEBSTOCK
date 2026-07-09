import React, { useState, useEffect } from "react";
import "./LeaveBalance.css";
import { FiHome, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { 
  FaBriefcaseMedical, 
  FaLeaf, 
  FaRegSadTear, 
  FaFolderOpen, 
  FaChartPie, 
  FaCalendarCheck, 
  FaClock 
} from "react-icons/fa";
import API from "../../api/axios"; // Uses pre-configured Axios instance


const getLeaveStyle = (title = "") => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("sick") || lowerTitle.includes("medical")) {
    return { icon: <FaBriefcaseMedical />, color: "#ff4d4f" };
  }
  if (lowerTitle.includes("casual") || lowerTitle.includes("annual")) {
    return { icon: <FaLeaf />, color: "#52c41a" };
  }
  if (lowerTitle.includes("unpaid") || lowerTitle.includes("loss")) {
    return { icon: <FaRegSadTear />, color: "#faad14" };
  }
  // Default fallback style
  return { icon: <FaFolderOpen />, color: "#1890ff" };
};

const LeaveBalance = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaveBalances = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await API.get("/leave-balances/balance");
        
        if (response.data && response.data.success) {
          setLeaveBalances(response.data.data);
        } else {
          setError("Failed to fetch balance details.");
        }
      } catch (err) {
        console.error("Error fetching leave balances:", err);
        setError(
          err.response?.data?.message || "Something went wrong while loading balances."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveBalances();
  }, []);

  // Compute aggregated metric constants on render across all sub-categories
  const aggregateMetrics = leaveBalances.reduce(
    (acc, curr) => {
      acc.totalAllocated += curr.total || 0;
      acc.totalUsed += curr.used || 0;
      acc.totalAvailable += curr.available || 0;
      return acc;
    },
    { totalAllocated: 0, totalUsed: 0, totalAvailable: 0 }
  );

  // Fallback check against zero allocation to protect layout rules
  const overallUsedPercentage =
    aggregateMetrics.totalAllocated > 0
      ? (aggregateMetrics.totalUsed / aggregateMetrics.totalAllocated) * 100
      : 0;

  return (
    <div className="leave-page">
      {/* Header Section */}
      <div className="leave-header">
        <h2>Annual Summary</h2>
        <div className="leave-breadcrumb">
          <FiHome />
          <FiChevronRight />
          <span>Leaves</span>
          <FiChevronRight />
          <span>Dashboard Summary</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="leave-error-message" style={{ color: "#ff1717", marginBottom: "20px", fontWeight: "500" }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="leave-loading">Calculating overall leave matrices...</div>
      ) : (
        <div className="summary-container" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          
          {/* 1. Main Global Performance Aggregator Metric Card */}
          <div className="main-summary-card">
            <div className="summary-top">
              <div>
                <h3 style={{ fontSize: "20px", color: "#222" }}>Total Cumulative Annual Leave</h3>
                <p className="summary-subtitle">All structural leave allocations combined</p>
              </div>
              <div className="summary-main-icon" style={{ background: "#5d74f3" }}>
                <FaChartPie style={{ color: "#fff" }} />
              </div>
            </div>

            <div className="summary-grand-stats">
              <div className="stat-block">
                <span className="stat-label">
                  <FaCalendarCheck className="label-icon" style={{ color: "#11d9e8" }} /> Total Allocated
                </span>
                <h2 className="stat-value">{aggregateMetrics.totalAllocated} Days</h2>
              </div>

              <div className="stat-block">
                <span className="stat-label">
                  <FaClock className="label-icon" style={{ color: "#ff1717" }} /> Total Used
                </span>
                <h2 className="stat-value">{aggregateMetrics.totalUsed} Days</h2>
              </div>

              <div className="stat-block">
                <span className="stat-label">
                  <FiCheckCircle className="label-icon" style={{ color: "#0A8F08" }} /> Remaining Available
                </span>
                <h2 className="stat-value" style={{ color: "#0A8F08" }}>{aggregateMetrics.totalAvailable} Days</h2>
              </div>
            </div>

            {/* Comprehensive Linear Progress Meter */}
            <div className="summary-progress-wrapper">
              <div className="progress-text-split">
                <span>Utilization Rate</span>
                <span>{Math.round(overallUsedPercentage)}% Used</span>
              </div>
              <div className="summary-progress-bar-bg">
                <div 
                  className="summary-progress-bar-fill"
                  style={{ width: `${Math.min(overallUsedPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 2. Itemized Breakdown Grid Section (Now styled properly using card class names) */}
          {leaveBalances.length > 0 && (
            <div className="breakdown-section">
              <h3 style={{ fontSize: "20px", marginBottom: "20px", color: "#232323", fontWeight: "500" }}>
                Itemized Categories
              </h3>
              
              <div className="leave-grid">
                {leaveBalances.map((item, idx) => {
                  // Get context-aware styling configurations
                  const styleConfig = getLeaveStyle(item.title);
                  const individualUsedPercent = item.total > 0 ? (item.used / item.total) * 100 : 0;

                  return (
                    <div key={idx} className="leave-card">
                      {/* Top Row with Title & Styled Background Icon */}
                      <div className="leave-top">
                        <h3>{item.title}</h3>
                        <div className="leave-icon" style={{ backgroundColor: styleConfig.color }}>
                          {styleConfig.icon}
                        </div>
                      </div>

                      {/* Middle Stats Blocks */}
                      <div className="leave-stats">
                        <div>
                          <small>Available</small>
                          <h4 style={{ color: styleConfig.color }}>{item.available} Days</h4>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <small>Used / Total</small>
                          <h4>{item.used} / {item.total}</h4>
                        </div>
                      </div>

                      {/* Progress bar matching the item's individual theme color */}
                      <div className="leave-progress">
                        <div 
                          className="leave-progress-fill" 
                          style={{ 
                            width: `${Math.min(individualUsedPercent, 100)}%`,
                            backgroundColor: styleConfig.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default LeaveBalance;