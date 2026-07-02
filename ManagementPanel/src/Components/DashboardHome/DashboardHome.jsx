import React, { useState, useRef, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import {
  Clock3,
  RefreshCcw,
  GraduationCap,
  Users,
  UserCheck,
  UserPlus,
  MoreVertical,
  History,
  FileBarChart2,
  Download,
  Printer,
  RotateCcw,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react'
import './DashboardHome.css'

/* ------------------------------------------------------------------ */
/* Static data — swap these out for API data whenever it's ready       */
/* ------------------------------------------------------------------ */

const STAT_CARDS = [
  {
    id: 'hire-time',
    icon: Clock3,
    iconClass: 'stat-icon--green',
    label: 'Average Time to Hire',
    value: '18',
    unit: 'days',
    caption: 'vs last month',
    trend: -2.5,
    sparkline: [40, 38, 42, 30, 34, 26, 20],
    sparkClass: 'spark--green',
  },
  {
    id: 'turnover',
    icon: RefreshCcw,
    iconClass: 'stat-icon--red',
    label: 'Employee Turnover Rate',
    value: '4.2',
    unit: '%',
    caption: 'vs last quarter',
    trend: 0.8,
    sparkline: [10, 22, 14, 30, 20, 34, 24],
    sparkClass: 'spark--red',
  },
  {
    id: 'training',
    icon: GraduationCap,
    iconClass: 'stat-icon--blue',
    label: 'Training Completion Rate',
    value: '87',
    unit: '%',
    caption: 'vs last quarter',
    trend: 5.3,
    sparkline: [14, 24, 18, 30, 24, 38, 34],
    sparkClass: 'spark--blue',
  },
]

const EMPLOYEE_METRICS = [
  { id: 'total', icon: Users, iconClass: 'metric-icon--blue', value: 256, label: 'Total Employees' },
  { id: 'active', icon: UserCheck, iconClass: 'metric-icon--green', value: 235, label: 'Active Employees' },
  { id: 'contractors', icon: UserPlus, iconClass: 'metric-icon--orange', value: 21, label: 'Contractors' },
]

const DEPARTMENTS = [
  { id: 'hr', name: 'HR', count: 15, percent: 5.9, color: '#27ae60' },
  { id: 'engineering', name: 'Engineering', count: 78, percent: 30.5, color: '#2f80ed' },
  { id: 'marketing', name: 'Marketing', count: 42, percent: 16.4, color: '#f2c94c' },
  { id: 'finance', name: 'Finance', count: 30, percent: 11.7, color: '#9b51e0' },
  { id: 'operations', name: 'Operations', count: 65, percent: 25.4, color: '#eb5757' },
  { id: 'others', name: 'Others', count: 26, percent: 10.2, color: '#718096' },
]

const ATTENDANCE_TODAY = [
  { id: 'present', value: 215, label: 'Present', percent: '84.0%', className: 'attend-card--present' },
  { id: 'absent', value: 12, label: 'Absent', percent: '4.7%', className: 'attend-card--absent' },
  { id: 'late', value: 8, label: 'Late', percent: '3.1%', className: 'attend-card--late' },
]

const ON_LEAVE = { value: 21, label: 'On Leave', percent: '8.2%' }

const WEEKLY_ATTENDANCE = [
  { day: 'Mon', Present: 221, Absent: 10, Late: 6 },
  { day: 'Tue', Present: 218, Absent: 11, Late: 7 },
  { day: 'Wed', Present: 212, Absent: 13, Late: 9 },
  { day: 'Thu', Present: 216, Absent: 9, Late: 8 },
  { day: 'Fri', Present: 208, Absent: 14, Late: 12 },
]

/* ------------------------------------------------------------------ */
/* Small reusable pieces                                               */
/* ------------------------------------------------------------------ */

const Sparkline = ({ points, className }) => {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const width = 100
  const height = 32
  const step = width / (points.length - 1)

  const path = points
    .map((p, i) => {
      const x = i * step
      const y = height - ((p - min) / range) * height
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg className={`sparkline ${className}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={path} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PanelMenu = ({ onRefresh, onExport, onPrint }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (action) => {
    setOpen(false)
    if (action === 'refresh') onRefresh?.()
    if (action === 'export') onExport?.()
    if (action === 'print') onPrint?.()
  }

  return (
    <div className="panel-menu" ref={menuRef}>
      <button
        type="button"
        className="panel-menu__trigger"
        aria-label="Panel options"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="panel-menu__dropdown" role="menu">
          <button type="button" className="panel-menu__item" role="menuitem" onClick={() => handleSelect('refresh')}>
            <RotateCcw size={15} />
            <span>Refresh</span>
          </button>
          <button type="button" className="panel-menu__item" role="menuitem" onClick={() => handleSelect('export')}>
            <Download size={15} />
            <span>Export</span>
          </button>
          <button type="button" className="panel-menu__item" role="menuitem" onClick={() => handleSelect('print')}>
            <Printer size={15} />
            <span>Print</span>
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

const DashboardHome = () => {
  const handleRefresh = (panel) => console.log(`[${panel}] refresh requested`)
  const handleExport = (panel) => console.log(`[${panel}] export requested`)
  const handlePrint = (panel) => window.print()

  return (
    <div className="dashboard">
      {/* ---------------- Top stat cards ---------------- */}
      <section className="dashboard__stats stats-row">
        {STAT_CARDS.map(({ id, icon: Icon, iconClass, label, value, unit, caption, trend, sparkline, sparkClass }) => (
          <article key={id} className="stat-card">
            <div className="stat-card__top">
              <span className={`stat-card__icon ${iconClass}`}>
                <Icon size={20} />
              </span>
              <span className="stat-card__label">{label}</span>
            </div>

            <div className="stat-card__value-row">
              <p className="stat-card__value">
                {value}
                <span className="stat-card__unit">{unit}</span>
              </p>
              <span className={`stat-card__trend ${trend >= 0 ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
                {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(trend)}%
              </span>
            </div>

            <p className="stat-card__caption">{caption}</p>
            <Sparkline points={sparkline} className={sparkClass} />
          </article>
        ))}
      </section>

      {/* ---------------- Employee Summary + Attendance Overview ---------------- */}
      <section className="dashboard__panels panels-grid">
        {/* -------- Employee Summary -------- */}
        <div className="panel employee-summary">
          <header className="panel__header">
            <h2 className="panel__title">Employee Summary</h2>
            <PanelMenu
              onRefresh={() => handleRefresh('Employee Summary')}
              onExport={() => handleExport('Employee Summary')}
              onPrint={() => handlePrint('Employee Summary')}
            />
          </header>

          <div className="employee-summary__body">
            <div className="employee-summary__metrics">
              {EMPLOYEE_METRICS.map(({ id, icon: Icon, iconClass, value, label }) => (
                <div key={id} className="metric-row">
                  <span className={`metric-row__icon ${iconClass}`}>
                    <Icon size={18} />
                  </span>
                  <div className="metric-row__text">
                    <span className="metric-row__value">{value}</span>
                    <span className="metric-row__label">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="employee-summary__chart">
              <h3 className="chart-heading">Department Distribution</h3>
              <div className="donut-chart">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={DEPARTMENTS}
                      dataKey="count"
                      nameKey="name"
                      innerRadius={0}
                      outerRadius={90}
                      paddingAngle={1}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <Cell key={dept.id} fill={dept.color} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} employees`, name]}
                      contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="chart-legend">
                {DEPARTMENTS.map((dept) => (
                  <li key={dept.id} className="chart-legend__item">
                    <span className="chart-legend__dot" style={{ backgroundColor: dept.color }} />
                    {dept.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="department-list">
            {DEPARTMENTS.map((dept) => (
              <li key={dept.id} className="department-list__item" style={{ borderColor: dept.color }}>
                <span className="department-list__name">{dept.name}</span>
                <span className="department-list__count">{dept.count}</span>
                <span className="department-list__percent">{dept.percent}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- Attendance Overview -------- */}
        <div className="panel attendance-overview">
          <header className="panel__header">
            <h2 className="panel__title">Attendance Overview</h2>
            <PanelMenu
              onRefresh={() => handleRefresh('Attendance Overview')}
              onExport={() => handleExport('Attendance Overview')}
              onPrint={() => handlePrint('Attendance Overview')}
            />
          </header>

          <div className="attendance-overview__body">
            <h3 className="chart-heading">Today&rsquo;s Attendance</h3>
            <div className="attendance-today">
              {ATTENDANCE_TODAY.map(({ id, value, label, percent, className }) => (
                <div key={id} className={`attend-card ${className}`}>
                  <span className="attend-card__value">{value}</span>
                  <span className="attend-card__label">{label}</span>
                  <span className="attend-card__percent">{percent}</span>
                </div>
              ))}
            </div>

            <div className="attend-card attend-card--leave">
              <span className="attend-card__value">{ON_LEAVE.value}</span>
              <span className="attend-card__label">{ON_LEAVE.label}</span>
              <span className="attend-card__percent">{ON_LEAVE.percent}</span>
            </div>

            <div className="attendance-weekly">
              <div className="attendance-weekly__header">
                <h3 className="chart-heading">Weekly Attendance</h3>
                <ul className="weekly-legend">
                  <li className="weekly-legend__item">
                    <span className="weekly-legend__dot weekly-legend__dot--present" />
                    Present
                  </li>
                  <li className="weekly-legend__item">
                    <span className="weekly-legend__dot weekly-legend__dot--absent" />
                    Absent
                  </li>
                  <li className="weekly-legend__item">
                    <span className="weekly-legend__dot weekly-legend__dot--late" />
                    Late
                  </li>
                </ul>
              </div>

              <div className="weekly-bar-chart">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={WEEKLY_ATTENDANCE} barSize={28}>
                    <CartesianGrid vertical={false} stroke="#eef1f5" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={32} />
                    <Tooltip
                      cursor={{ fill: 'rgba(148,163,184,0.08)' }}
                      contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
                    />
                    <Bar dataKey="Present" stackId="a" fill="#27ae60" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Absent" stackId="a" fill="#eb5757" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Late" stackId="a" fill="#f2994a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="attendance-actions">
              <button type="button" className="action-btn">
                <History size={16} />
                View Full Attendance History
              </button>
              <button type="button" className="action-btn">
                <FileBarChart2 size={16} />
                Generate Attendance Report
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardHome