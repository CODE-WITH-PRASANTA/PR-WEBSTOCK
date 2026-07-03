import React from 'react';
import {
  LuTrendingUp,
  LuTrendingDown,
  LuWallet,
  LuReceipt,
  LuHouse,
  LuChevronRight,
  LuCircleCheck,
  LuClock3,
  LuCircleX,
} from "react-icons/lu";

import './FinancialSummary.css';

const FinancialSummary = () => {
  // Mock Data for Table
  const transactions = [
    { id: '#TRX-1001', desc: 'Server Maintenance Payment', date: 'Feb 14, 2025', method: 'Bank Transfer', status: 'Completed', amount: '-$1,200.00', statusClass: 'status-completed' },
    { id: '#TRX-1002', desc: 'Client Project Payment (Acme Corp)', date: 'Feb 13, 2025', method: 'Wire', status: 'Completed', amount: '+$8,500.00', statusClass: 'status-completed' },
    { id: '#TRX-1003', desc: 'Office Supplies', date: 'Feb 12, 2025', method: 'Credit Card', status: 'Pending', amount: '-$350.50', statusClass: 'status-pending' },
    { id: '#TRX-1004', desc: 'Software Subscriptions (Annual)', date: 'Feb 10, 2025', method: 'PayPal', status: 'Rejected', amount: '-$2,100.00', statusClass: 'status-rejected' },
    { id: '#TRX-1005', desc: 'Consulting Fees Refund', date: 'Feb 8, 2025', method: 'Credit Note', status: 'Completed', amount: '+$500.00', statusClass: 'status-completed' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  return (
    <div className="financial-summary-container">
      {/* Header Breadcrumb */}
      <div className="financial-summary-header">
        <h2>Financial Summary</h2>
        <div className="financial-summary-breadcrumb">
          <LuHouse size={14} /> <LuChevronRight className="arrow-icon" /> <span>Accounts</span> <LuChevronRight className="arrow-icon" /> <span className="active-path">Financial Summary</span>
        </div>
      </div>

      {/* Top Summary Cards Grid */}
      <div className="financial-summary-cards-grid">
        {/* Total Income */}
        <div className="financial-summary-card">
          <div className="card-icon-wrapper income-icon-bg">
            <LuTrendingUp />
          </div>
          <div className="card-info">
            <span className="card-label">TOTAL INCOME</span>
            <h3 className="card-value">$ 1,23,456</h3>
            <span className="card-trend trend-up"><LuTrendingUp size={12} /> 15%</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="financial-summary-card">
          <div className="card-icon-wrapper expenses-icon-bg">
            <LuTrendingDown />
          </div>
          <div className="card-info">
            <span className="card-label">TOTAL EXPENSES</span>
            <h3 className="card-value">$ 98,765</h3>
            <span className="card-trend trend-down"><LuTrendingDown size={12} /> 10%</span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="financial-summary-card">
          <div className="card-icon-wrapper profit-icon-bg">
            <LuWallet />
          </div>
          <div className="card-info">
            <span className="card-label">NET PROFIT</span>
            <h3 className="card-value">$ 24,691</h3>
            <span className="card-trend trend-up"><LuTrendingUp size={12} /> 22%</span>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="financial-summary-card">
          <div className="card-icon-wrapper pending-icon-bg">
            <LuReceipt />
          </div>
          <div className="card-info">
            <span className="card-label">PENDING INVOICES</span>
            <h3 className="card-value">$ 12,345</h3>
            <span className="card-trend trend-down"><LuTrendingDown size={12} /> 5%</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="financial-summary-charts-row">
        {/* Bar Chart */}
        <div className="financial-summary-chart-box main-bar-chart">
          <h3>Income vs Expenses</h3>
          <div className="chart-legend">
            <div className="legend-item"><span className="legend-color income-blue"></span> Income</div>
            <div className="legend-item"><span className="legend-color expense-orange"></span> Expenses</div>
          </div>
          
          <div className="bar-chart-visual">
            <div className="y-axis-labels">
              <span>120</span><span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
            </div>
            <div className="bars-container">
              {[
                { inc: 65, exp: 40 }, { inc: 75, exp: 50 }, { inc: 92, exp: 52 },
                { inc: 88, exp: 51 }, { inc: 78, exp: 56 }, { inc: 96, exp: 53 },
                { inc: 82, exp: 58 }, { inc: 105, exp: 55 }, { inc: 86, exp: 61 }
              ].map((data, index) => (
                <div key={index} className="bar-group">
                  <div className="bar-wrapper">
                    <div className="bar income-bar" style={{ height: `${data.inc}%` }}></div>
                    <div className="bar expense-bar" style={{ height: `${data.exp}%` }}></div>
                  </div>
                  <span className="bar-month-label">{months[index]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="y-axis-title">$ (thousands)</div>
        </div>

        {/* Expense Breakdown Donut */}
        <div className="financial-summary-chart-box breakdown-donut-chart">
          <h3>Expense Breakdown</h3>
          <div className="donut-chart-container">
            <div className="donut-graphic">
              <div className="donut-hole">
                <div className="donut-labels-overlay">
                  <span className="p-249">24.9%</span>
                  <span className="p-311">31.1%</span>
                  <span className="p-73">7.3%</span>
                  <span className="p-243">24.3%</span>
                  <span className="p-124">12.4%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="donut-legend-grid">
            <div className="d-legend-item"><span className="d-color color-salaries"></span> Salaries</div>
            <div className="d-legend-item"><span className="d-color color-rent"></span> Rent & Infrastructure</div>
            <div className="d-legend-item"><span className="d-color color-utilities"></span> Utilities</div>
            <div className="d-legend-item"><span className="d-color color-marketing"></span> Marketing</div>
            <div className="d-legend-item"><span className="d-color color-misc"></span> Miscellaneous</div>
          </div>
        </div>
      </div>

      {/* Revenue and Transactions Layout Area */}
      <div className="financial-summary-lower-section">
        
        {/* Revenue Line Section */}
        <div className="financial-summary-chart-box revenue-growth-box">
          <h3>Revenue Growth</h3>
          <div className="revenue-growth-legend">
            <div className="legend-item"><span className="legend-color curve-revenue"></span> Revenue</div>
            <div className="legend-item"><span className="legend-color curve-cost"></span> Cost</div>
          </div>
          <div className="revenue-chart-visual">
            <div className="y-axis-labels-line">
              <span>120</span><span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
            </div>
            <div className="line-graph-waves">
              <div className="revenue-wave-fill"></div>
              <div className="cost-wave-fill"></div>
            </div>
            <div className="x-axis-timeline">
              <span>20:00</span><span>21:00</span><span>22:00</span><span>23:00</span><span className="bold-date">23 Sep</span>
              <span>02:00</span><span>03:00</span><span>04:00</span><span>05:00</span><span>06:00</span><span>07:00</span>
              <span>08:00</span><span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span>
              <span>14:00</span><span>15:00</span><span>16:00</span><span>17:00</span><span>18:00</span><span>19:00</span>
              <span>20:00</span><span>21:00</span><span>22:00</span><span>23:00</span><span className="bold-date">24 Sep</span>
              <span>02:00</span><span>03:00</span><span>04:00</span><span>05:00</span><span>06:00</span><span>07:00</span><span>08:00</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table Box */}
        <div className="financial-summary-table-box">
          <h3>Recent Transactions</h3>
          <div className="table-responsive-wrapper">
            <table className="financial-summary-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx, index) => (
                  <tr key={index}>
                    <td className="trx-id">{trx.id}</td>
                    <td className="trx-desc">{trx.desc}</td>
                    <td>{trx.date}</td>
                    <td>{trx.method}</td>
                    <td>
                      <span className={`status-badge ${trx.statusClass}`}>
                       {trx.status === "Completed" && <LuCircleCheck size={13} className="badge-icon" />}
                       {trx.status === "Pending" && <LuClock3 size={13} className="badge-icon" />}
                       {trx.status === "Rejected" && <LuCircleX size={13} className="badge-icon" />}
                      </span>
                    </td>
                    <td className={`trx-amount ${trx.amount.startsWith('+') ? 'amount-positive' : 'amount-negative'}`}>
                      {trx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinancialSummary;