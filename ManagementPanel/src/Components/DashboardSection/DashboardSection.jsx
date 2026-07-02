import React, { useState, useRef, useEffect } from 'react'
import {
  MoreVertical,
  PlusCircle,
  Trash2,
  RefreshCw,
  Filter,
  BellRing,
  ChevronRight,
  CalendarCheck2,
  UserPlus2,
  ClipboardList,
  Plane,
  Stethoscope,
  UserCircle2,
  History,
} from 'lucide-react'
import './DashboardSection.css'

/* ---------------------------------- */
/*            DUMMY DATA              */
/* ---------------------------------- */

const DISTRIBUTION_DATA = [
  { id: 'eng', label: 'Engineering', value: 42, max: 42, color: 'var(--color-eng)' },
  { id: 'sales', label: 'Sales', value: 36, max: 42, color: 'var(--color-sales)' },
  { id: 'marketing', label: 'Marketing', value: 25, max: 42, color: 'var(--color-marketing)' },
  { id: 'finance', label: 'Finance', value: 20, max: 42, color: 'var(--color-finance)' },
  { id: 'hr', label: 'HR', value: 14, max: 42, color: 'var(--color-hr)' },
  { id: 'ops', label: 'Operations', value: 19, max: 42, color: 'var(--color-ops)' },
]

const ACTIVITY_DATA = [
  {
    id: 'act-1',
    icon: CalendarCheck2,
    iconClass: 'activity-item__icon--amber',
    title: 'Leave Request Approved',
    status: 'approved',
    statusClass: 'status-pill--approved',
    description: 'Annual leave request has been approved by HR Manager',
    time: '1 day ago',
    person: 'John Doe',
    avatar: 'https://i.pravatar.cc/64?img=47',
  },
  {
    id: 'act-2',
    icon: UserPlus2,
    iconClass: 'activity-item__icon--green',
    title: 'New Employee Onboarded',
    status: 'completed',
    statusClass: 'status-pill--completed',
    description: 'New employee has completed onboarding process',
    time: '1 day ago',
    person: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/64?img=32',
  },
  {
    id: 'act-3',
    icon: ClipboardList,
    iconClass: 'activity-item__icon--purple',
    title: 'Performance Review Scheduled',
    status: 'pending',
    statusClass: 'status-pill--pending',
    description: 'Quarterly performance review has been scheduled',
    time: '2 days ago',
    person: 'Michael Wilson',
    avatar: 'https://i.pravatar.cc/64?img=12',
  },
  {
    id: 'act-4',
    icon: CalendarCheck2,
    iconClass: 'activity-item__icon--amber',
    title: 'Sick Leave Requested',
    status: 'pending',
    statusClass: 'status-pill--pending',
    description: 'Sick leave request awaiting manager approval',
    time: '3 days ago',
    person: 'Sarah Lee',
    avatar: 'https://i.pravatar.cc/64?img=25',
  },
  {
    id: 'act-5',
    icon: UserPlus2,
    iconClass: 'activity-item__icon--green',
    title: 'New Employee Onboarded',
    status: 'completed',
    statusClass: 'status-pill--completed',
    description: 'New employee has completed onboarding process',
    time: '4 days ago',
    person: 'David Kim',
    avatar: 'https://i.pravatar.cc/64?img=15',
  },
]

const EMPLOYEE_DATA = [
  {
    id: 'emp-1',
    name: 'John Doe',
    role: 'Senior Developer',
    department: 'Engineering',
    avatar: 'https://i.pravatar.cc/80?img=47',
    leaves: {
      annual: { used: 5, total: 20 },
      sick: { used: 2, total: 10 },
      personal: { used: 1, total: 5 },
    },
  },
  {
    id: 'emp-2',
    name: 'Jane Smith',
    role: 'Product Designer',
    department: 'Marketing',
    avatar: 'https://i.pravatar.cc/80?img=5',
    leaves: {
      annual: { used: 8, total: 20 },
      sick: { used: 1, total: 10 },
      personal: { used: 3, total: 5 },
    },
  },
  {
    id: 'emp-3',
    name: 'Michael Johnson',
    role: 'Sales Executive',
    department: 'Sales',
    avatar: 'https://i.pravatar.cc/80?img=12',
    leaves: {
      annual: { used: 12, total: 20 },
      sick: { used: 4, total: 10 },
      personal: { used: 0, total: 5 },
    },
  },
  {
    id: 'emp-4',
    name: 'Sarah Lee',
    role: 'HR Coordinator',
    department: 'HR',
    avatar: 'https://i.pravatar.cc/80?img=25',
    leaves: {
      annual: { used: 6, total: 20 },
      sick: { used: 3, total: 10 },
      personal: { used: 2, total: 5 },
    },
  },
  {
    id: 'emp-5',
    name: 'David Kim',
    role: 'Finance Analyst',
    department: 'Finance',
    avatar: 'https://i.pravatar.cc/80?img=15',
    leaves: {
      annual: { used: 9, total: 20 },
      sick: { used: 0, total: 10 },
      personal: { used: 1, total: 5 },
    },
  },
]

const LEAVE_TYPES = [
  { key: 'annual', label: 'Annual Leave', icon: Plane, iconClass: 'leave-type__icon--green' },
  { key: 'sick', label: 'Sick Leave', icon: Stethoscope, iconClass: 'leave-type__icon--red' },
  { key: 'personal', label: 'Personal Leave', icon: UserCircle2, iconClass: 'leave-type__icon--blue' },
]

/* ---------------------------------- */
/*         REUSABLE SUBPARTS          */
/* ---------------------------------- */

const useOutsideClose = (isOpen, setIsOpen) => {
  const ref = useRef(null)
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
    }
    if (isOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, setIsOpen])
  return ref
}

const SummaryMenu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useOutsideClose(open, setOpen)

  return (
    <div className="summary-card__menu" ref={menuRef}>
      <button
        type="button"
        className="icon-button"
        aria-label="Open summary options"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreVertical size={18} />
      </button>
      {open && (
        <div className="dropdown-menu dropdown-menu--summary" role="menu">
          <button type="button" className="dropdown-menu__item" role="menuitem" onClick={() => setOpen(false)}>
            <PlusCircle size={16} />
            <span>Add Employee</span>
          </button>
          <button type="button" className="dropdown-menu__item" role="menuitem" onClick={() => setOpen(false)}>
            <Trash2 size={16} />
            <span>Delete Record</span>
          </button>
          <button type="button" className="dropdown-menu__item" role="menuitem" onClick={() => setOpen(false)}>
            <RefreshCw size={16} />
            <span>Refresh Data</span>
          </button>
        </div>
      )}
    </div>
  )
}

const ActivitiesMenu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useOutsideClose(open, setOpen)

  return (
    <div className="activities-card__menu" ref={menuRef}>
      <button
        type="button"
        className="icon-button"
        aria-label="Open activity options"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreVertical size={18} />
      </button>
      {open && (
        <div className="dropdown-menu dropdown-menu--activities" role="menu">
          <button type="button" className="dropdown-menu__item" role="menuitem" onClick={() => setOpen(false)}>
            <Filter size={16} />
            <span>Filter Activities</span>
          </button>
          <button type="button" className="dropdown-menu__item" role="menuitem" onClick={() => setOpen(false)}>
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button type="button" className="dropdown-menu__item" role="menuitem" onClick={() => setOpen(false)}>
            <BellRing size={16} />
            <span>Notification Settings</span>
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------------------------------- */
/*          MAIN COMPONENT            */
/* ---------------------------------- */

const DashboardSection = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(EMPLOYEE_DATA[0].id)
  const selectedEmployee =
    EMPLOYEE_DATA.find((employee) => employee.id === selectedEmployeeId) || EMPLOYEE_DATA[0]

  return (
    <div className="hr-dashboard">
      {/* ============ LEFT COLUMN ============ */}
      <div className="hr-dashboard__left">
        {/* ---------- Summary Card ---------- */}
        <section className="summary-card" aria-labelledby="summary-card-title">
          <header className="summary-card__header">
            <h2 id="summary-card-title" className="summary-card__title">
              HR Dashboard Summary
            </h2>
            <SummaryMenu />
          </header>

          <div className="summary-card__body">
            <div className="summary-card__stats">
              <div className="stat-block">
                <p className="stat-block__value">156</p>
                <p className="stat-block__label stat-block__label--green">Total Employees</p>
                <p className="stat-block__description">
                  Current active employees across all departments with complete profiles and documentation.
                </p>
              </div>

              <div className="stat-block">
                <p className="stat-block__value">92%</p>
                <p className="stat-block__label stat-block__label--amber">Employee Satisfaction</p>
                <p className="stat-block__description">
                  Based on the latest quarterly employee satisfaction survey results.
                </p>
              </div>
            </div>

            <div className="summary-card__distribution distribution">
              <h3 className="distribution__title">Department Distribution</h3>
              <ul className="distribution__list">
                {DISTRIBUTION_DATA.map((item) => (
                  <li className="distribution__row" key={item.id}>
                    <span className="distribution__label">{item.label}</span>
                    <span className="distribution__track">
                      <span
                        className="distribution__fill"
                        style={{ width: `${(item.value / 42) * 100}%`, backgroundColor: item.color }}
                      />
                    </span>
                    <span className="distribution__value">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Recent Activities Card ---------- */}
        <section className="activities-card" aria-labelledby="activities-card-title">
          <header className="activities-card__header">
            <div className="activities-card__heading">
              <h2 id="activities-card-title" className="activities-card__title">
                Recent Activities
              </h2>
              <p className="activities-card__subtitle">Latest HR activities and notifications</p>
            </div>
            <div className="activities-card__actions">
              <button type="button" className="icon-button" aria-label="Filter activities" title="Filter activities">
                <Filter size={17} />
              </button>
              <button type="button" className="icon-button" aria-label="Refresh activities" title="Refresh">
                <RefreshCw size={17} />
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label="Notification settings"
                title="Notification settings"
              >
                <BellRing size={17} />
              </button>
              <ActivitiesMenu />
            </div>
          </header>

          <ul className="activities-card__list scroll-area">
            {ACTIVITY_DATA.map((activity) => {
              const Icon = activity.icon
              return (
                <li className="activity-item" key={activity.id}>
                  <span className={`activity-item__icon ${activity.iconClass}`}>
                    <Icon size={18} />
                  </span>
                  <div className="activity-item__content">
                    <div className="activity-item__top">
                      <h4 className="activity-item__title">{activity.title}</h4>
                      <span className={`status-pill ${activity.statusClass}`}>{activity.status}</span>
                    </div>
                    <p className="activity-item__description">{activity.description}</p>
                    <div className="activity-item__footer">
                      <img className="activity-item__avatar" src={activity.avatar} alt={activity.person} />
                      <span className="activity-item__person">{activity.person}</span>
                    </div>
                  </div>
                  <span className="activity-item__time">{activity.time}</span>
                </li>
              )
            })}
          </ul>

          <footer className="activities-card__footer">
            <button type="button" className="link-button">
              View All Activities
              <ChevronRight size={16} />
            </button>
          </footer>
        </section>
      </div>

      {/* ============ RIGHT COLUMN ============ */}
      <aside className="hr-dashboard__right">
        <section className="leave-card" aria-labelledby="leave-card-title">
          <header className="leave-card__header">
            <h2 id="leave-card-title" className="leave-card__title">
              Leave Balance
            </h2>
          </header>

          <div className="leave-card__tabs scroll-area scroll-area--horizontal">
            {EMPLOYEE_DATA.map((employee) => (
              <button
                type="button"
                key={employee.id}
                className={`employee-tab ${employee.id === selectedEmployeeId ? 'employee-tab--active' : ''}`}
                onClick={() => setSelectedEmployeeId(employee.id)}
              >
                <img className="employee-tab__avatar" src={employee.avatar} alt={employee.name} />
                <span className="employee-tab__name">{employee.name}</span>
              </button>
            ))}
          </div>

          <div className="leave-card__profile">
            <img className="leave-card__profile-avatar" src={selectedEmployee.avatar} alt={selectedEmployee.name} />
            <div>
              <p className="leave-card__profile-name">{selectedEmployee.name}</p>
              <p className="leave-card__profile-role">{selectedEmployee.role}</p>
              <p className="leave-card__profile-department">{selectedEmployee.department}</p>
            </div>
          </div>

          <div className="leave-card__types">
            {LEAVE_TYPES.map(({ key, label, icon: Icon, iconClass }) => {
              const { used, total } = selectedEmployee.leaves[key]
              const remaining = total - used
              const percentage = (used / total) * 100
              return (
                <div className="leave-type" key={key}>
                  <span className={`leave-type__icon ${iconClass}`}>
                    <Icon size={20} />
                  </span>
                  <div className="leave-type__content">
                    <div className="leave-type__top">
                      <span className="leave-type__label">{label}</span>
                      <span className="leave-type__remaining">{remaining} days left</span>
                    </div>
                    <span className="leave-type__track">
                      <span className="leave-type__fill" style={{ width: `${percentage}%` }} />
                    </span>
                    <div className="leave-type__bottom">
                      <span>{used} used</span>
                      <span>{total} total</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <footer className="leave-card__footer">
            <button type="button" className="pill-button pill-button--primary">
              <PlusCircle size={16} />
              Apply Leave
            </button>
            <button type="button" className="pill-button pill-button--secondary">
              <History size={16} />
              Leave History
            </button>
          </footer>
        </section>
      </aside>
    </div>
  )
}

export default DashboardSection