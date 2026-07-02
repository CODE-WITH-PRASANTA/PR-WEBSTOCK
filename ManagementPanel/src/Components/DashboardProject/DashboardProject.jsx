import React, { useState, useRef, useEffect } from 'react';
import {
  ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, AreaChart, BarChart
} from 'recharts';
import './DashboardProject.css';

/* ---------------------------------------------------------------- */
/* ------------------------- STATIC DATA ---------------------------- */
/* ---------------------------------------------------------------- */

const INITIAL_PROJECT_DATA = [
  { date: '24 Sep', projectA: 0, projectB: 34, projectC: 47 },
  { date: "Oct '03", projectA: 0, projectB: 28, projectC: 42 },
  { date: '05 Oct', projectA: 22, projectB: 26, projectC: 37 },
  { date: '08 Oct', projectA: 22, projectB: 27, projectC: 36 },
  { date: '16 Oct', projectA: 0, projectB: 32, projectC: 37 },
  { date: '24 Oct', projectA: 25, projectB: 40, projectC: 40 },
  { date: "Nov '03", projectA: 25, projectB: 44, projectC: 39 },
];

const EARNING_SPARK = [
  { v: 14 }, { v: 22 }, { v: 12 }, { v: 26 }, { v: 16 },
  { v: 30 }, { v: 18 }, { v: 28 }, { v: 15 }, { v: 24 },
];

const CLIENTS_SPARK = [
  { v: 10 }, { v: 24 }, { v: 14 }, { v: 22 }, { v: 12 },
  { v: 26 }, { v: 16 }, { v: 20 }, { v: 30 }, { v: 18 },
];

const INITIAL_INVOICES = [
  { id: 'IN8526', name: 'Ashton Cox', date: '02/15/2018', status: 'not-paid', amount: 2398 },
  { id: 'IN2473', name: 'Cara Stevens', date: '01/28/2017', status: 'paid', amount: 834 },
  { id: 'IN7366', name: 'Jacob Ryan', date: '03/11/2017', status: 'partial', amount: 147 },
  { id: 'IN5642', name: 'Emily Walker', date: '09/12/2018', status: 'paid', amount: 650 },
  { id: 'IN1457', name: 'Michael Brown', date: '04/20/2019', status: 'not-paid', amount: 1220 },
  { id: 'IN9083', name: 'Olivia Green', date: '10/03/2020', status: 'partial', amount: 850 },
  { id: 'IN3379', name: 'David Lee', date: '06/25/2021', status: 'paid', amount: 1295 },
  { id: 'IN9874', name: 'Sophia Johnson', date: '01/18/2022', status: 'not-paid', amount: 320 },
];

const DAILY_BILL = [
  { day: 'Sun', amount: 113 },
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 130 },
  { day: 'Wed', amount: 120 },
  { day: 'Thu', amount: 125 },
  { day: 'Fri', amount: 119 },
  { day: 'Sat', amount: 126 },
];

const CLIENT_SURVEY = [
  { date: '19 Sep', newClients: 30, oldClients: 15 },
  { date: '20 Sep', newClients: 38, oldClients: 32 },
  { date: '21 Sep', newClients: 32, oldClients: 44 },
  { date: '22 Sep', newClients: 50, oldClients: 32 },
  { date: '23 Sep', newClients: 42, oldClients: 36 },
  { date: '24 Sep', newClients: 85, oldClients: 50 },
];

const SUPPORT_TICKETS = [
  { day: 'Mon', open: 43, pending: 15, resolved: 10, closed: 20 },
  { day: 'Tue', open: 55, pending: 24, resolved: 15, closed: 9 },
  { day: 'Wed', open: 41, pending: 19, resolved: 18, closed: 23 },
  { day: 'Thu', open: 65, pending: 8, resolved: 17, closed: 13 },
  { day: 'Fri', open: 22, pending: 13, resolved: 25, closed: 18 },
  { day: 'Sat', open: 49, pending: 20, resolved: 12, closed: 10 },
];

/* ---------------------------------------------------------------- */
/* --------------------------- ICONS -------------------------------- */
/* ---------------------------------------------------------------- */

const IconMoreVertical = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
    <circle cx="12" cy="5" r="1.4" />
    <circle cx="12" cy="12" r="1.4" />
    <circle cx="12" cy="19" r="1.4" />
  </svg>
);

const IconRefresh = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 4v6h-6" />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const IconTrash = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

const IconEdit = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IconDownload = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 21h16" />
  </svg>
);

/* Illustration for the "Download Reports" card */
const IllustrationReports = () => (
  <svg viewBox="0 0 200 190" width="130" height="122" className="dp-illustration">
    <ellipse cx="100" cy="176" rx="70" ry="8" fill="#F1EEFB" />
    <path d="M40 150c0-46 27-84 60-84s60 38 60 84H40Z" fill="#F4A24C" />
    <circle cx="100" cy="52" r="26" fill="#2E2A4D" />
    <circle cx="100" cy="58" r="21" fill="#FFD9B8" />
    <path d="M79 52c0-16 42-22 42 2-10-4-30-2-42-2Z" fill="#2E2A4D" />
    <rect x="70" y="96" width="60" height="46" rx="10" fill="#59C9C5" />
    <rect x="82" y="106" width="36" height="24" rx="3" fill="#EAF9F8" />
    <rect x="60" y="128" width="80" height="10" rx="5" fill="#3F3D68" />
    <circle cx="146" cy="70" r="4" fill="#F76E6E" />
    <circle cx="158" cy="90" r="3" fill="#59C9C5" />
    <circle cx="44" cy="86" r="3.5" fill="#F4A24C" />
  </svg>
);

/* ---------------------------------------------------------------- */
/* --------------------- SMALL HELPER PIECES ------------------------ */
/* ---------------------------------------------------------------- */

const STATUS_LABEL = {
  paid: 'Paid',
  'not-paid': 'Not Paid',
  partial: 'Partially Paid',
};

const StatusBadge = ({ status }) => (
  <span className={`dp-badge dp-badge--${status}`}>{STATUS_LABEL[status]}</span>
);

/* custom bubble label used above each point on the Average Daily Bill chart */
const BubbleLabel = (props) => {
  const { x, y, value } = props;
  const w = String(value).length > 2 ? 30 : 26;
  return (
    <g transform={`translate(${x - w / 2}, ${y - 34})`}>
      <rect width={w} height={20} rx={5} className="dp-bubble" />
      <text x={w / 2} y={14} textAnchor="middle" className="dp-bubble__text">{value}</text>
    </g>
  );
};

/* ---------------------------------------------------------------- */
/* ------------------------- MAIN COMPONENT -------------------------- */
/* ---------------------------------------------------------------- */

const DashboardProject = () => {
  const [projectData, setProjectData] = useState(INITIAL_PROJECT_DATA);
  const [projectVisible, setProjectVisible] = useState(true);
  const [projectLoading, setProjectLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [invoiceCounter, setInvoiceCounter] = useState(1);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------------- Project Survey actions ---------------- */

  const handleRefreshProject = () => {
    setMenuOpen(false);
    setProjectLoading(true);
    setTimeout(() => {
      setProjectData((prev) =>
        prev.map((p) => ({
          ...p,
          projectB: Math.max(10, Math.round(p.projectB + (Math.random() * 16 - 8))),
          projectC: Math.max(10, Math.round(p.projectC + (Math.random() * 16 - 8))),
        }))
      );
      setProjectLoading(false);
    }, 650);
  };

  const handleAddDataPoint = () => {
    setMenuOpen(false);
    setProjectData((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      next.push({
        date: `Point ${next.length + 1}`,
        projectA: Math.random() > 0.6 ? 20 + Math.round(Math.random() * 8) : 0,
        projectB: Math.max(10, Math.round(last.projectB + (Math.random() * 10 - 5))),
        projectC: Math.max(10, Math.round(last.projectC + (Math.random() * 10 - 5))),
      });
      return next;
    });
  };

  const handleDeleteProject = () => {
    setMenuOpen(false);
    setProjectVisible(false);
  };

  const handleRestoreProject = () => {
    setProjectVisible(true);
    setProjectData(INITIAL_PROJECT_DATA);
  };

  /* ---------------- Invoices table actions ---------------- */

  const handleDeleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const handleEditInvoice = (id) => {
    const target = invoices.find((inv) => inv.id === id);
    if (!target) return;
    const order = ['not-paid', 'partial', 'paid'];
    const nextStatus = order[(order.indexOf(target.status) + 1) % order.length];
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: nextStatus } : inv))
    );
  };

  const handleAddInvoice = () => {
    const id = `IN${1000 + Math.floor(Math.random() * 9000)}`;
    setInvoices((prev) => [
      {
        id,
        name: `New Client ${invoiceCounter}`,
        date: new Date().toLocaleDateString('en-US'),
        status: 'not-paid',
        amount: 100 + Math.floor(Math.random() * 900),
      },
      ...prev,
    ]);
    setInvoiceCounter((c) => c + 1);
  };

  const handleRefreshInvoices = () => {
    setInvoices(INITIAL_INVOICES);
  };

  const invoiceTotal = invoices.length;

  return (
    <div className="dp-page">
      <div className="dp-wrap">

        {/* ============================= ROW 1 ============================= */}
        <div className="dp-row dp-row--one">

          {/* --------- Project Survey --------- */}
          <div className="dp-card dp-card--survey">
            {projectVisible ? (
              <>
                <div className="dp-card__header">
                  <h3 className="dp-card__title">Project Survey</h3>
                  <div className="dp-menu" ref={menuRef}>
                    <button
                      type="button"
                      className="dp-menu__trigger"
                      aria-label="Project survey options"
                      aria-expanded={menuOpen}
                      onClick={() => setMenuOpen((o) => !o)}
                    >
                      <IconMoreVertical />
                    </button>
                    {menuOpen && (
                      <div className="dp-menu__dropdown" role="menu">
                        <button type="button" className="dp-menu__item" onClick={handleRefreshProject} role="menuitem">
                          <IconRefresh /> Refresh
                        </button>
                        <button type="button" className="dp-menu__item" onClick={handleAddDataPoint} role="menuitem">
                          <IconPlus /> Add data point
                        </button>
                        <button type="button" className="dp-menu__item dp-menu__item--danger" onClick={handleDeleteProject} role="menuitem">
                          <IconTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="dp-legend">
                  <span className="dp-legend__item"><i className="dp-dot dp-dot--a" />Project A</span>
                  <span className="dp-legend__item"><i className="dp-dot dp-dot--b" />Project B</span>
                  <span className="dp-legend__item"><i className="dp-dot dp-dot--c" />Project C</span>
                </div>

                <div className={`dp-chart dp-chart--survey ${projectLoading ? 'dp-chart--loading' : ''}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={projectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="dpColorB" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B7CF6" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#8B7CF6" stopOpacity={0.03} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#EDEFF3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 12, fill: '#9AA1AC' }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 80]}
                        ticks={[0, 20, 40, 60, 80]}
                        label={{ value: 'Revenue', angle: -90, position: 'insideLeft', fill: '#9AA1AC', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: 10, border: '1px solid #EDEFF3', fontSize: 12 }}
                        cursor={{ stroke: '#D8DBE3', strokeDasharray: '3 3' }}
                      />
                      <Bar dataKey="projectA" fill="#B9BDC7" barSize={54} radius={[0, 0, 0, 0]} />
                      <Area type="monotone" dataKey="projectB" stroke="#8B7CF6" strokeWidth={2.5} fill="url(#dpColorB)" dot={false} activeDot={{ r: 4 }} />
                      <Line type="monotone" dataKey="projectC" stroke="#F4A24C" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="dp-empty">
                <p className="dp-empty__text">Project Survey widget was removed.</p>
                <button type="button" className="dp-empty__button" onClick={handleRestoreProject}>
                  <IconRefresh /> Restore widget
                </button>
              </div>
            )}
          </div>

          {/* --------- Right column: stat cards + download --------- */}
          <div className="dp-card--survey-side">
            <div className="dp-stat-row">
              <div className="dp-card dp-card--stat">
                <span className="dp-stat-card__label">Earning</span>
                <span className="dp-stat-card__value">$20,125</span>
                <div className="dp-spark">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={EARNING_SPARK}>
                      <defs>
                        <linearGradient id="dpSparkPurple" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B7CF6" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#8B7CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#8B7CF6" strokeWidth={2} fill="url(#dpSparkPurple)" dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="dp-card dp-card--stat">
                <span className="dp-stat-card__label">New Clients</span>
                <span className="dp-stat-card__value">129</span>
                <div className="dp-spark">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CLIENTS_SPARK}>
                      <defs>
                        <linearGradient id="dpSparkOrange" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F4A24C" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#F4A24C" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#F4A24C" strokeWidth={2} fill="url(#dpSparkOrange)" dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="dp-card dp-card--report">
              <IllustrationReports />
              <div className="dp-report__body">
                <h4 className="dp-report__title">Download Reports</h4>
                <p className="dp-report__text">Download employee salary reports.</p>
                <a href="#download" className="dp-report__link" onClick={(e) => e.preventDefault()}>
                  Download <IconDownload />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================= ROW 2 ============================= */}
        <div className="dp-row dp-row--two">

          {/* --------- Invoices table --------- */}
          <div className="dp-card dp-card--table">
            <div className="dp-card__header">
              <h3 className="dp-card__title">Invoices</h3>
              <div className="dp-card__actions">
                <span className="dp-card__count">{invoiceTotal} total</span>
                <button type="button" className="dp-icon-btn" title="Refresh invoices" onClick={handleRefreshInvoices}>
                  <IconRefresh />
                </button>
                <button type="button" className="dp-icon-btn dp-icon-btn--accent" title="Add invoice" onClick={handleAddInvoice}>
                  <IconPlus />
                </button>
                <a href="#viewall" className="dp-card__link" onClick={(e) => e.preventDefault()}>View All</a>
              </div>
            </div>

            <div className="dp-table-scroll">
              <table className="dp-table">
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="dp-table__row">
                      <td className="dp-table__id">#{inv.id}</td>
                      <td className="dp-table__name">{inv.name}</td>
                      <td className="dp-table__date">
                        <IconCalendar /> {inv.date}
                      </td>
                      <td><StatusBadge status={inv.status} /></td>
                      <td className="dp-table__amount">${inv.amount}</td>
                      <td className="dp-table__actions">
                        <button type="button" className="dp-icon-btn dp-icon-btn--edit" title="Cycle status" onClick={() => handleEditInvoice(inv.id)}>
                          <IconEdit />
                        </button>
                        <button type="button" className="dp-icon-btn dp-icon-btn--delete" title="Delete invoice" onClick={() => handleDeleteInvoice(inv.id)}>
                          <IconTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr>
                      <td colSpan={6} className="dp-table__empty">No invoices yet. Use the + button to add one.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --------- Average Daily Bill --------- */}
          <div className="dp-card dp-card--bill">
            <div className="dp-card__header">
              <h3 className="dp-card__title">Average Daily Bill</h3>
              <a href="#viewall" className="dp-card__link" onClick={(e) => e.preventDefault()}>View All</a>
            </div>
            <div className="dp-bill__figure">
              <span className="dp-bill__number">129</span> Dollar <span className="dp-bill__caption">(Average)</span>
            </div>
            <div className="dp-chart dp-chart--bill">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={DAILY_BILL} margin={{ top: 34, right: 14, left: -6, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#EDEFF3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} domain={[105, 132]} ticks={[110, 115, 120, 125, 130]} label={{ value: 'Bill Amount ($)', angle: -90, position: 'insideLeft', fill: '#9AA1AC', fontSize: 11 }} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#4B5563"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, stroke: '#4B5563', strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 5 }}
                    label={<BubbleLabel />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ============================= ROW 3 ============================= */}
        <div className="dp-row dp-row--three">

          {/* --------- Client Survey --------- */}
          <div className="dp-card dp-card--client">
            <div className="dp-card__header">
              <h3 className="dp-card__title">Client Survey</h3>
              <a href="#viewall" className="dp-card__link" onClick={(e) => e.preventDefault()}>View All</a>
            </div>
            <div className="dp-legend dp-legend--center">
              <span className="dp-legend__item"><i className="dp-dot dp-dot--new" />New Clients</span>
              <span className="dp-legend__item"><i className="dp-dot dp-dot--old" />Old Clients</span>
            </div>
            <div className="dp-chart dp-chart--client">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CLIENT_SURVEY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dpColorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F87171" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#F87171" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="dpColorOld" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#EDEFF3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #EDEFF3', fontSize: 12 }} />
                  <Area type="monotone" dataKey="oldClients" stroke="#6366F1" strokeWidth={2.5} fill="url(#dpColorOld)" dot={false} activeDot={{ r: 4 }} />
                  <Area type="monotone" dataKey="newClients" stroke="#F87171" strokeWidth={2.5} fill="url(#dpColorNew)" dot={false} activeDot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --------- Support Tickets Survey --------- */}
          <div className="dp-card dp-card--tickets">
            <div className="dp-card__header">
              <h3 className="dp-card__title">Support Tickets Survey</h3>
              <a href="#viewall" className="dp-card__link" onClick={(e) => e.preventDefault()}>View All</a>
            </div>
            <div className="dp-chart dp-chart--tickets">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SUPPORT_TICKETS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="28%">
                  <CartesianGrid vertical={false} stroke="#EDEFF3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9AA1AC' }} axisLine={false} tickLine={false} domain={[0, 120]} ticks={[0, 20, 40, 60, 80, 100, 120]} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #EDEFF3', fontSize: 12 }} cursor={{ fill: '#F5F6F8' }} />
                  <Bar dataKey="open" stackId="tickets" fill="#2DD4BF" />
                  <Bar dataKey="pending" stackId="tickets" fill="#4B5563" />
                  <Bar dataKey="resolved" stackId="tickets" fill="#FB7185" />
                  <Bar dataKey="closed" stackId="tickets" fill="#FBBF24" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardProject;