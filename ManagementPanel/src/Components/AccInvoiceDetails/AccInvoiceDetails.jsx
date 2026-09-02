import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  FiSearch, FiSliders, FiPlusCircle, FiRefreshCw, 
  FiEdit, FiTrash2, FiX, FiChevronDown, 
  FiChevronLeft, FiChevronRight, FiUser, FiPhone, 
  FiMail, FiGlobe, FiBriefcase, FiHash, FiMapPin, 
  FiCalendar, FiFileText, FiAlertCircle,
  FiCheckCircle, FiServer, FiCheckSquare, FiPercent
} from 'react-icons/fi';
import { FaWhatsapp, FaRupeeSign } from 'react-icons/fa';
import './AccInvoiceDetails.css';
import API from '../../api/axios';

const formatINR = (val) => {
  const num = Number(val) || 0;
  return '₹' + num.toLocaleString('en-IN');
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Generates scheduled EMI rows based on start month, day, and tenure
const buildEmiSchedule = (startMonthYear, emiDay, emiMonths, perMonthEmi) => {
  if (!startMonthYear || !emiMonths) return [];
  const [yearStr, monthStr] = startMonthYear.split('-');
  const startYear = parseInt(yearStr, 10);
  const startMonthIndex = parseInt(monthStr, 10) - 1;
  const day = parseInt(emiDay, 10) || 1;

  const schedule = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < emiMonths; i++) {
    const dueDate = new Date(startYear, startMonthIndex + i, day);
    const monthLabel = dueDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

    let initialStatus = 'Upcoming';
    if (today >= dueDate) {
      initialStatus = 'Pending';
    }

    schedule.push({
      installmentNo: i + 1,
      monthLabel,
      dueDate: dueDate.toISOString().split('T')[0],
      amount: perMonthEmi,
      status: initialStatus,
      paidDate: null
    });
  }
  return schedule;
};

const defaultStartMonth = new Date().toISOString().slice(0, 7);
const defaultTodayDate = new Date().toISOString().split('T')[0];

const CATEGORIES = [
  'WEBSITE DEVELOPMENT',
  'APPLICATION DEVELOPMENT',
  'BOTH WEBSITE AND APPLICATION',
  'SEO WORK',
  'SOCIAL MEDIA MANAGEMENT',
  'DIGITAL MARKETING'
];

const TAX_OPTIONS = [
  { label: 'No Tax / Non-GST (0%)', value: 0 },
  { label: 'GST 5%', value: 5 },
  { label: 'GST 12%', value: 12 },
  { label: 'GST 18%', value: 18 },
  { label: 'GST 28%', value: 28 },
  { label: 'Custom Tax %', value: 'custom' }
];

const emptyForm = {
  itemNo: '',
  invoiceDate: defaultTodayDate,
  clientName: '',
  mobile: '',
  whatsapp: '',
  email: '',
  businessAddress: '',
  projectName: '',
  projectCategory: 'WEBSITE DEVELOPMENT',
  projectDomain: '',
  domainProvider: 'None / Not Applicable',
  projectDescription: '',
  deliverablesSummary: '',
  totalCost: 0,
  advanceCost: 0,
  advanceStatus: 'Paid',
  advancePaidDate: defaultTodayDate,
  emiMonths: 1,
  emiStartMonth: defaultStartMonth,
  emiDayOfMonth: 1,
  tax: 0, // Default set to 0 (No Tax)
  status: 'In Progress',
  emiSchedule: []
};

const AccInvoiceDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // UI state
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [activeItem, setActiveItem] = useState(null);
  const [scheduleModalItem, setScheduleModalItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Column visibility
  const [columns, setColumns] = useState({
    checkbox: true,
    slNo: true,
    itemNo: true,
    invoiceDate: true,
    clientName: true,
    mobile: true,
    projectName: true,
    projectCategory: true,
    projectDomain: true,
    domainProvider: false,
    deliverablesSummary: true,
    dueDate: true,
    totalCost: true,
    tax: false,
    taxAmount: false,
    advanceCost: true,
    advanceStatus: true,
    remainingBalance: true,
    emiMonths: true,
    perMonthEmi: true,
    grandTotal: true,
    status: true,
    actions: true
  });

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [taxMode, setTaxMode] = useState('0');
  const filterRef = useRef(null);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Form Financial Calculations
  const calcTotalCost = Number(formInputs.totalCost) || 0;
  const calcAdvanceCost = Number(formInputs.advanceCost) || 0;
  const calcEmiMonths = Number(formInputs.emiMonths) > 0 ? Number(formInputs.emiMonths) : 1;
  const calcTaxRate = Number(formInputs.tax) || 0;

  const calcTaxAmount = Math.round(((calcTotalCost * calcTaxRate) / 100) * 100) / 100;
  const calcGrandTotal = Math.round((calcTotalCost + calcTaxAmount) * 100) / 100;
  const calcRemainingBalance = Math.max(0, calcGrandTotal - calcAdvanceCost);
  const calcPerMonthEmi = Math.round((calcRemainingBalance / calcEmiMonths) * 100) / 100;

  useEffect(() => {
    if (modalType === 'add') {
      const freshSchedule = buildEmiSchedule(
        formInputs.emiStartMonth,
        formInputs.emiDayOfMonth,
        calcEmiMonths,
        calcPerMonthEmi
      );
      setFormInputs(prev => ({ ...prev, emiSchedule: freshSchedule }));
    }
  }, [formInputs.emiStartMonth, formInputs.emiDayOfMonth, calcEmiMonths, calcPerMonthEmi, modalType]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        search: searchQuery.trim(),
        category: categoryFilter
      };

      const response = await API.get('/invoices', { params });
      if (response.data?.success) {
        setData(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalRecords(response.data.pagination?.totalRecords || 0);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to load invoices from server.');
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery, categoryFilter]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchInvoices();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [fetchInvoices]);

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? data.map(item => item._id) : []);
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleColumn = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  const openAddModal = () => {
    const genId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const initialSchedule = buildEmiSchedule(defaultStartMonth, 1, 1, 0);

    setTaxMode('0');
    setFormInputs({
      ...emptyForm,
      itemNo: genId,
      invoiceDate: defaultTodayDate,
      emiStartMonth: defaultStartMonth,
      emiDayOfMonth: 1,
      tax: 0,
      emiSchedule: initialSchedule
    });
    setErrorMessage('');
    setModalType('add');
  };

  const openEditModal = (item) => {
    setActiveItem(item);
    const existingTax = item.tax !== undefined ? item.tax : 0;
    const isStandardRate = [0, 5, 12, 18, 28].includes(Number(existingTax));
    setTaxMode(isStandardRate ? String(existingTax) : 'custom');

    setFormInputs({ 
      ...item,
      tax: existingTax,
      invoiceDate: item.invoiceDate ? item.invoiceDate.split('T')[0] : defaultTodayDate,
      emiStartMonth: item.emiStartMonth || defaultStartMonth,
      emiDayOfMonth: item.emiDayOfMonth || 1,
      advanceStatus: item.advanceStatus || 'Paid',
      projectDescription: item.projectDescription || '',
      deliverablesSummary: item.deliverablesSummary || '',
      emiSchedule: item.emiSchedule ? JSON.parse(JSON.stringify(item.emiSchedule)) : []
    });
    setErrorMessage('');
    setModalType('edit');
  };

  const openDeleteModal = (item) => {
    setActiveItem(item);
    setErrorMessage('');
    setModalType('delete');
  };

  const handleTaxModeChange = (modeValue) => {
    setTaxMode(modeValue);
    if (modeValue !== 'custom') {
      setFormInputs(prev => ({ ...prev, tax: Number(modeValue) }));
    }
  };

  const handleFormInstallmentStatusChange = (index, newStatus) => {
    setFormInputs(prev => {
      const updatedSchedule = [...prev.emiSchedule];
      updatedSchedule[index] = {
        ...updatedSchedule[index],
        status: newStatus,
        paidDate: newStatus === 'Paid' ? defaultTodayDate : null
      };
      return { ...prev, emiSchedule: updatedSchedule };
    });
  };

  const handleRegenerateFormSchedule = () => {
    const freshSchedule = buildEmiSchedule(
      formInputs.emiStartMonth,
      formInputs.emiDayOfMonth,
      calcEmiMonths,
      calcPerMonthEmi
    );
    setFormInputs(prev => ({ ...prev, emiSchedule: freshSchedule }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const nextUnpaidEmi = formInputs.emiSchedule.find(i => i.status !== 'Paid' && i.status !== 'Cancelled');
    const derivedDueDate = nextUnpaidEmi ? nextUnpaidEmi.dueDate : null;

    const payload = {
      ...formInputs,
      totalCost: calcTotalCost,
      advanceCost: calcAdvanceCost,
      tax: calcTaxRate,
      taxAmount: calcTaxAmount,
      grandTotal: calcGrandTotal,
      remainingBalance: calcRemainingBalance,
      emiMonths: calcEmiMonths,
      perMonthEmi: calcPerMonthEmi,
      dueDate: derivedDueDate
    };

    try {
      if (modalType === 'add') {
        const res = await API.post('/invoices', payload);
        if (res.data?.success) {
          setSuccessMessage('Contract invoice added successfully.');
          setModalType(null);
          fetchInvoices();
        }
      } else if (modalType === 'edit') {
        const res = await API.put(`/invoices/${activeItem._id}`, payload);
        if (res.data?.success) {
          setSuccessMessage('Contract invoice updated successfully.');
          setModalType(null);
          fetchInvoices();
        }
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to save contract invoice.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateInstallmentStatus = async (recordId, installmentNo, newStatus) => {
    try {
      const res = await API.patch(`/invoices/${recordId}/emi/${installmentNo}`, {
        status: newStatus,
        paidDate: newStatus === 'Paid' ? defaultTodayDate : null
      });

      if (res.data?.success) {
        const updatedInvoice = res.data.data;
        setData(prev => prev.map(item => item._id === recordId ? updatedInvoice : item));
        if (scheduleModalItem && scheduleModalItem._id === recordId) {
          setScheduleModalItem(updatedInvoice);
        }
        setSuccessMessage(`Installment #${installmentNo} marked as ${newStatus}.`);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update installment status.');
    }
  };

  const handleUpdateAdvanceStatus = async (recordId, newStatus) => {
    try {
      const res = await API.patch(`/invoices/${recordId}/advance-status`, {
        advanceStatus: newStatus
      });

      if (res.data?.success) {
        const updatedInvoice = res.data.data;
        setData(prev => prev.map(item => item._id === recordId ? updatedInvoice : item));
        setSuccessMessage('Advance payment status updated.');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update advance status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!activeItem?._id) return;
    setSubmitting(true);
    try {
      const res = await API.delete(`/invoices/${activeItem._id}`);
      if (res.data?.success) {
        setSelectedIds(prev => prev.filter(id => id !== activeItem._id));
        setModalType(null);
        setSuccessMessage('Contract deleted successfully.');
        fetchInvoices();
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to delete contract invoice.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderDueDateBadge = (dueDateStr) => {
    if (!dueDateStr) return <span className="acc-inv-due-badge__none">Completed / Nil</span>;
    const due = new Date(dueDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    let badgeModifier = 'normal';
    let labelDetail = '';

    if (diffDays < 0) {
      badgeModifier = 'overdue';
      labelDetail = ` (${Math.abs(diffDays)}d overdue)`;
    } else if (diffDays <= 7) {
      badgeModifier = 'urgent';
      labelDetail = ` (${diffDays === 0 ? 'Today' : `${diffDays}d left`})`;
    }

    return (
      <span className={`acc-inv-due-badge acc-inv-due-badge--${badgeModifier}`}>
        <FiCalendar className="acc-inv-due-badge__icon" />
        {formatDate(dueDateStr)}
        {labelDetail && <strong className="acc-inv-due-badge__detail">{labelDetail}</strong>}
      </span>
    );
  };

  return (
    <div className="acc-inv-wrapper">
      <header className="acc-inv-header">
        <div className="acc-inv-header__titles">
          <h1 className="acc-inv-header__title">Invoice & Project Billing</h1>
          <p className="acc-inv-header__subtitle">Manage contracts, deliverables, advance receipts, and EMI schedules</p>
        </div>
        <nav className="acc-inv-header__breadcrumb" aria-label="Breadcrumb">
          <span>Home</span> &gt; <span>Accounts</span> &gt; <span className="acc-inv-header__breadcrumb--active">Invoices</span>
        </nav>
      </header>

      {errorMessage && (
        <div className="acc-inv-alert acc-inv-alert--error">
          <FiAlertCircle className="acc-inv-alert__icon" />
          <span className="acc-inv-alert__text">{errorMessage}</span>
          <button className="acc-inv-alert__close-btn" onClick={() => setErrorMessage('')} aria-label="Close Error">✕</button>
        </div>
      )}
      {successMessage && (
        <div className="acc-inv-alert acc-inv-alert--success">
          <FiCheckCircle className="acc-inv-alert__icon" />
          <span className="acc-inv-alert__text">{successMessage}</span>
          <button className="acc-inv-alert__close-btn" onClick={() => setSuccessMessage('')} aria-label="Close Success">✕</button>
        </div>
      )}

      <section className="acc-inv-card">
        <div className="acc-inv-toolbar">
          <div className="acc-inv-toolbar__left">
            <span className="acc-inv-toolbar__count-label">
              Invoices & Contracts ({totalRecords})
            </span>
            
            <div className="acc-inv-search">
              <FiSearch className="acc-inv-search__icon" />
              <input 
                type="text" 
                className="acc-inv-search__input"
                placeholder="Search invoice #, client, domain..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              />
            </div>

            <div className="acc-inv-filter-select">
              <select 
                className="acc-inv-filter-select__input"
                value={categoryFilter} 
                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="acc-inv-toolbar__right">
            <div className="acc-inv-col-dropdown" ref={filterRef}>
              <button 
                className={`acc-inv-icon-btn ${showFilters ? 'acc-inv-icon-btn--active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
                title="Toggle Columns"
              >
                <FiSliders />
              </button>
              
              {showFilters && (
                <div className="acc-inv-col-dropdown__menu">
                  <div className="acc-inv-col-dropdown__header">Visible Columns</div>
                  <div className="acc-inv-col-dropdown__list">
                    {Object.keys(columns).map((colKey) => (
                      <label key={colKey} className="acc-inv-col-dropdown__item">
                        <input 
                          type="checkbox" 
                          checked={columns[colKey]} 
                          onChange={() => toggleColumn(colKey)}
                        />
                        <span>
                          {colKey === 'slNo' ? 'S.No' : 
                           colKey === 'itemNo' ? 'Invoice No.' : 
                           colKey === 'invoiceDate' ? 'Invoice Date' : 
                           colKey === 'tax' ? 'Tax (%)' :
                           colKey === 'taxAmount' ? 'Tax Amount' :
                           colKey === 'projectDomain' ? 'Domain' : 
                           colKey === 'deliverablesSummary' ? 'Deliverables' : 
                           colKey === 'dueDate' ? 'Next Due Date' : 
                           colKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="acc-inv-btn acc-inv-btn--primary" onClick={openAddModal}>
              <FiPlusCircle /> New Contract
            </button>
            <button 
              className="acc-inv-icon-btn" 
              onClick={() => { setPage(1); setSearchQuery(''); setCategoryFilter(''); fetchInvoices(); }} 
              title="Refresh Data"
              disabled={loading}
            >
              <FiRefreshCw className={loading ? 'acc-inv-spin' : ''} />
            </button>
          </div>
        </div>

        <div className="acc-inv-table-container">
          <table className="acc-inv-table">
            <thead className="acc-inv-table__head">
              <tr>
                {columns.checkbox && (
                  <th className="acc-inv-table__th acc-inv-table__th--checkbox">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={data.length > 0 && selectedIds.length === data.length}
                    />
                  </th>
                )}
                {columns.slNo && <th className="acc-inv-table__th">S.No</th>}
                {columns.itemNo && <th className="acc-inv-table__th">Invoice No.</th>}
                {columns.invoiceDate && <th className="acc-inv-table__th">Invoice Date</th>}
                {columns.clientName && <th className="acc-inv-table__th">Client Name</th>}
                {columns.mobile && <th className="acc-inv-table__th">Mobile</th>}
                {columns.projectName && <th className="acc-inv-table__th">Project</th>}
                {columns.projectCategory && <th className="acc-inv-table__th">Category</th>}
                {columns.projectDomain && <th className="acc-inv-table__th">Domain</th>}
                {columns.domainProvider && <th className="acc-inv-table__th">Provider</th>}
                {columns.deliverablesSummary && <th className="acc-inv-table__th">Deliverables</th>}
                {columns.dueDate && <th className="acc-inv-table__th acc-inv-table__th--highlight">⚡ Next Due Date</th>}
                {columns.totalCost && <th className="acc-inv-table__th">Base Cost</th>}
                {columns.tax && <th className="acc-inv-table__th">Tax Rate</th>}
                {columns.taxAmount && <th className="acc-inv-table__th">Tax Amount</th>}
                {columns.grandTotal && <th className="acc-inv-table__th">Grand Total</th>}
                {columns.advanceCost && <th className="acc-inv-table__th">Advance Paid</th>}
                {columns.advanceStatus && <th className="acc-inv-table__th">Advance Status</th>}
                {columns.remainingBalance && <th className="acc-inv-table__th">Balance</th>}
                {columns.emiMonths && <th className="acc-inv-table__th">Tenure</th>}
                {columns.perMonthEmi && <th className="acc-inv-table__th">Monthly EMI</th>}
                {columns.status && <th className="acc-inv-table__th">Status</th>}
                {columns.actions && <th className="acc-inv-table__th">Actions</th>}
              </tr>
            </thead>
            <tbody className="acc-inv-table__body">
              {loading ? (
                <tr>
                  <td colSpan="24" className="acc-inv-table__empty">Loading contract invoices...</td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, idx) => (
                  <tr 
                    key={row._id} 
                    className={`acc-inv-table__row ${selectedIds.includes(row._id) ? 'acc-inv-table__row--selected' : ''}`}
                  >
                    {columns.checkbox && (
                      <td className="acc-inv-table__td acc-inv-table__td--checkbox">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(row._id)}
                          onChange={() => handleSelectRow(row._id)}
                        />
                      </td>
                    )}
                    {columns.slNo && <td className="acc-inv-table__td">{row.slNo || (page - 1) * limit + idx + 1}</td>}
                    {columns.itemNo && <td className="acc-inv-table__td acc-inv-table__code">{row.itemNo}</td>}
                    {columns.invoiceDate && <td className="acc-inv-table__td">{formatDate(row.invoiceDate)}</td>}
                    {columns.clientName && <td className="acc-inv-table__td font-weight-bold">{row.clientName}</td>}
                    {columns.mobile && <td className="acc-inv-table__td">{row.mobile}</td>}
                    {columns.projectName && <td className="acc-inv-table__td">{row.projectName}</td>}
                    {columns.projectCategory && (
                      <td className="acc-inv-table__td">
                        <span className="acc-inv-pill acc-inv-pill--category">{row.projectCategory}</span>
                      </td>
                    )}
                    {columns.projectDomain && (
                      <td className="acc-inv-table__td">
                        {row.projectDomain ? (
                          <span className="acc-inv-domain"><FiGlobe /> {row.projectDomain}</span>
                        ) : '-'}
                      </td>
                    )}
                    {columns.domainProvider && <td className="acc-inv-table__td">{row.domainProvider || '-'}</td>}
                    {columns.deliverablesSummary && (
                      <td className="acc-inv-table__td acc-inv-table__truncate" title={row.deliverablesSummary}>
                        {row.deliverablesSummary || '-'}
                      </td>
                    )}
                    {columns.dueDate && (
                      <td className="acc-inv-table__td acc-inv-table__td--highlight">
                        {renderDueDateBadge(row.dueDate)}
                      </td>
                    )}
                    {columns.totalCost && <td className="acc-inv-table__td">{formatINR(row.totalCost)}</td>}
                    {columns.tax && (
                      <td className="acc-inv-table__td">
                        {row.tax > 0 ? `${row.tax}%` : <span className="acc-inv-text-muted">0%</span>}
                      </td>
                    )}
                    {columns.taxAmount && (
                      <td className="acc-inv-table__td">
                        {row.taxAmount > 0 ? formatINR(row.taxAmount) : <span className="acc-inv-text-muted">-</span>}
                      </td>
                    )}
                    {columns.grandTotal && <td className="acc-inv-table__td text-grand font-weight-bold">{formatINR(row.grandTotal)}</td>}
                    {columns.advanceCost && <td className="acc-inv-table__td text-advance">{formatINR(row.advanceCost)}</td>}
                    {columns.advanceStatus && (
                      <td className="acc-inv-table__td">
                        <select 
                          className={`acc-inv-select-inline acc-inv-select-inline--${(row.advanceStatus || 'paid').toLowerCase().replace(/\s+/g, '-')}`}
                          value={row.advanceStatus || 'Paid'}
                          onChange={(e) => handleUpdateAdvanceStatus(row._id, e.target.value)}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Partially Paid">Partially Paid</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </td>
                    )}
                    {columns.remainingBalance && <td className="acc-inv-table__td">{formatINR(row.remainingBalance)}</td>}
                    {columns.emiMonths && <td className="acc-inv-table__td">{row.emiMonths} Mos</td>}
                    {columns.perMonthEmi && <td className="acc-inv-table__td text-accent font-weight-bold">{formatINR(row.perMonthEmi)}/mo</td>}
                    {columns.status && (
                      <td className="acc-inv-table__td">
                        <span className={`acc-inv-pill acc-inv-pill--status-${(row.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                          {row.status}
                        </span>
                      </td>
                    )}
                    {columns.actions && (
                      <td className="acc-inv-table__td">
                        <div className="acc-inv-actions">
                          {row.emiSchedule && row.emiSchedule.length > 0 && (
                            <button 
                              className="acc-inv-action-btn acc-inv-action-btn--calendar" 
                              onClick={() => setScheduleModalItem(row)} 
                              title="Update Monthly EMI Statuses"
                            >
                              <FiCalendar />
                            </button>
                          )}
                          <button className="acc-inv-action-btn acc-inv-action-btn--edit" onClick={() => openEditModal(row)} title="Edit">
                            <FiEdit />
                          </button>
                          <button className="acc-inv-action-btn acc-inv-action-btn--delete" onClick={() => openDeleteModal(row)} title="Delete">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="24" className="acc-inv-table__empty">No invoice records match your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="acc-inv-pagination">
          <div className="acc-inv-pagination__inner">
            <span className="acc-inv-pagination__label">Rows per page:</span>
            <div className="acc-inv-pagination__select-wrap">
              <select 
                className="acc-inv-pagination__select"
                value={limit} 
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <FiChevronDown className="acc-inv-pagination__arrow" />
            </div>
            <span className="acc-inv-pagination__text">
              Page {page} of {totalPages} ({totalRecords} items)
            </span>
            <div className="acc-inv-pagination__nav">
              <button 
                className="acc-inv-pagination__nav-btn"
                disabled={page <= 1 || loading} 
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <FiChevronLeft />
              </button>
              <button 
                className="acc-inv-pagination__nav-btn"
                disabled={page >= totalPages || loading} 
                onClick={() => setPage(p => p + 1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Create / Edit Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="acc-inv-modal-overlay">
          <div className="acc-inv-modal-card acc-inv-modal-card--wide">
            <header className="acc-inv-modal-header">
              <div>
                <h3 className="acc-inv-modal-header__title">
                  {modalType === 'add' ? '✨ Generate Master Project Contract' : `✏️ Edit Invoice: ${activeItem?.itemNo}`}
                </h3>
                <p className="acc-inv-modal-header__subtitle">
                  Configure contract details, scope, optional tax compliance, and installment breakdowns
                </p>
              </div>
              <button className="acc-inv-modal-close" onClick={() => setModalType(null)}><FiX /></button>
            </header>
            
            <form onSubmit={handleSave} className="acc-inv-form">
              {/* Section 1: Identifiers */}
              <fieldset className="acc-inv-form-section">
                <legend className="acc-inv-form-section__legend"><FiUser /> Invoice & Client Identifiers</legend>
                <div className="acc-inv-form-grid acc-inv-form-grid--3">
                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Invoice / Contract No.*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="text" required 
                        className="acc-inv-field__input"
                        value={formInputs.itemNo}
                        onChange={(e) => setFormInputs({...formInputs, itemNo: e.target.value})}
                      />
                      <FiHash className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Invoice Date*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="date" required 
                        className="acc-inv-field__input"
                        value={formInputs.invoiceDate}
                        onChange={(e) => setFormInputs({...formInputs, invoiceDate: e.target.value})}
                      />
                      <FiCalendar className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Client Full Name*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="text" required 
                        className="acc-inv-field__input"
                        placeholder="e.g. Rahul Sharma" 
                        value={formInputs.clientName}
                        onChange={(e) => setFormInputs({...formInputs, clientName: e.target.value})}
                      />
                      <FiUser className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Primary Mobile*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="tel" required 
                        className="acc-inv-field__input"
                        placeholder="10-digit number" 
                        value={formInputs.mobile}
                        onChange={(e) => setFormInputs({...formInputs, mobile: e.target.value})}
                      />
                      <FiPhone className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">WhatsApp Number</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="tel" 
                        className="acc-inv-field__input"
                        placeholder="WhatsApp contact" 
                        value={formInputs.whatsapp}
                        onChange={(e) => setFormInputs({...formInputs, whatsapp: e.target.value})}
                      />
                      <FaWhatsapp className="acc-inv-field__icon acc-inv-field__icon--whatsapp" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Official Email ID*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="email" required 
                        className="acc-inv-field__input"
                        placeholder="client@domain.com" 
                        value={formInputs.email}
                        onChange={(e) => setFormInputs({...formInputs, email: e.target.value})}
                      />
                      <FiMail className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field acc-inv-field--span-all">
                    <label className="acc-inv-field__label">Billing & Office Address</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="text" 
                        className="acc-inv-field__input"
                        placeholder="Office location, City, State..." 
                        value={formInputs.businessAddress}
                        onChange={(e) => setFormInputs({...formInputs, businessAddress: e.target.value})}
                      />
                      <FiMapPin className="acc-inv-field__icon" />
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Section 2: Project Scope */}
              <fieldset className="acc-inv-form-section">
                <legend className="acc-inv-form-section__legend"><FiBriefcase /> Project Scope & Deliverables</legend>
                <div className="acc-inv-form-grid acc-inv-form-grid--3">
                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Project Title*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="text" required 
                        className="acc-inv-field__input"
                        placeholder="e.g. Enterprise Portal" 
                        value={formInputs.projectName}
                        onChange={(e) => setFormInputs({...formInputs, projectName: e.target.value})}
                      />
                      <FiBriefcase className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Project Category*</label>
                    <div className="acc-inv-field__input-box">
                      <select 
                        className="acc-inv-field__select"
                        value={formInputs.projectCategory}
                        onChange={(e) => setFormInputs({...formInputs, projectCategory: e.target.value})}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <FiChevronDown className="acc-inv-field__select-arrow" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Domain Name</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="text" 
                        className="acc-inv-field__input"
                        placeholder="e.g. mybrand.com" 
                        value={formInputs.projectDomain}
                        onChange={(e) => setFormInputs({...formInputs, projectDomain: e.target.value})}
                      />
                      <FiGlobe className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Domain Provider</label>
                    <div className="acc-inv-field__input-box">
                      <select 
                        className="acc-inv-field__select"
                        value={formInputs.domainProvider}
                        onChange={(e) => setFormInputs({...formInputs, domainProvider: e.target.value})}
                      >
                        <option value="None / Not Applicable">None / Not Applicable</option>
                        <option value="Company">Company Provided</option>
                        <option value="Client">Client Managed</option>
                      </select>
                      <FiServer className="acc-inv-field__select-arrow" />
                    </div>
                  </div>

                  <div className="acc-inv-field acc-inv-field--span-2">
                    <label className="acc-inv-field__label">Deliverables Summary*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="text" required 
                        className="acc-inv-field__input"
                        placeholder="e.g. 5 Page Responsive Site, Admin Dashboard" 
                        value={formInputs.deliverablesSummary}
                        onChange={(e) => setFormInputs({...formInputs, deliverablesSummary: e.target.value})}
                      />
                      <FiCheckSquare className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field acc-inv-field--span-all">
                    <label className="acc-inv-field__label">Project Scope Description</label>
                    <div className="acc-inv-field__input-box">
                      <textarea 
                        rows="2" 
                        className="acc-inv-field__textarea"
                        placeholder="Tech stack, timeline deliverables, support period..." 
                        value={formInputs.projectDescription}
                        onChange={(e) => setFormInputs({...formInputs, projectDescription: e.target.value})}
                      />
                      <FiFileText className="acc-inv-field__icon acc-inv-field__icon--textarea" />
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Section 3: Financials & Managed Tax */}
              <fieldset className="acc-inv-form-section">
                <legend className="acc-inv-form-section__legend"><FaRupeeSign /> Financials & Tax Management</legend>
                <div className="acc-inv-form-grid acc-inv-form-grid--3">
                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Total Project Cost (Base ₹)*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="number" min="0" required 
                        className="acc-inv-field__input"
                        value={formInputs.totalCost}
                        onChange={(e) => setFormInputs({...formInputs, totalCost: e.target.value})}
                      />
                      <FaRupeeSign className="acc-inv-field__icon" />
                    </div>
                  </div>

                  {/* Tax Application Selector */}
                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Tax / GST Setting</label>
                    <div className="acc-inv-field__input-box">
                      <select 
                        className="acc-inv-field__select"
                        value={taxMode}
                        onChange={(e) => handleTaxModeChange(e.target.value)}
                      >
                        {TAX_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <FiChevronDown className="acc-inv-field__select-arrow" />
                    </div>
                  </div>

                  {/* Custom Tax input if 'custom' is selected */}
                  {taxMode === 'custom' ? (
                    <div className="acc-inv-field">
                      <label className="acc-inv-field__label">Custom Tax Rate (%)*</label>
                      <div className="acc-inv-field__input-box">
                        <input 
                          type="number" min="0" max="100" step="0.1" required 
                          className="acc-inv-field__input"
                          value={formInputs.tax}
                          onChange={(e) => setFormInputs({...formInputs, tax: Number(e.target.value)})}
                        />
                        <FiPercent className="acc-inv-field__icon" />
                      </div>
                    </div>
                  ) : (
                    <div className="acc-inv-field">
                      <label className="acc-inv-field__label">Tax Calculated (₹)</label>
                      <div className="acc-inv-field__input-box">
                        <input 
                          type="text" readOnly 
                          className="acc-inv-field__input acc-inv-field__input--readonly"
                          value={formatINR(calcTaxAmount)}
                        />
                        <FaRupeeSign className="acc-inv-field__icon" />
                      </div>
                    </div>
                  )}

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Advance Received (₹)*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="number" min="0" 
                        className="acc-inv-field__input"
                        value={formInputs.advanceCost}
                        onChange={(e) => setFormInputs({...formInputs, advanceCost: e.target.value})}
                      />
                      <FaRupeeSign className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Advance Payment Status*</label>
                    <div className="acc-inv-field__input-box">
                      <select 
                        className="acc-inv-field__select"
                        value={formInputs.advanceStatus}
                        onChange={(e) => setFormInputs({...formInputs, advanceStatus: e.target.value})}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Partially Paid">Partially Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                      <FiChevronDown className="acc-inv-field__select-arrow" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">EMI Tenure (Months)*</label>
                    <div className="acc-inv-field__input-box">
                      <select 
                        className="acc-inv-field__select"
                        value={formInputs.emiMonths}
                        onChange={(e) => setFormInputs({...formInputs, emiMonths: Number(e.target.value)})}
                      >
                        <option value="1">1 Month (Lump sum)</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="4">4 Months</option>
                        <option value="5">5 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months (1 Year)</option>
                      </select>
                      <FiChevronDown className="acc-inv-field__select-arrow" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">Billing Cycle Start Month*</label>
                    <div className="acc-inv-field__input-box">
                      <input 
                        type="month" required 
                        className="acc-inv-field__input"
                        value={formInputs.emiStartMonth}
                        onChange={(e) => setFormInputs({...formInputs, emiStartMonth: e.target.value})}
                      />
                      <FiCalendar className="acc-inv-field__icon" />
                    </div>
                  </div>

                  <div className="acc-inv-field">
                    <label className="acc-inv-field__label">EMI Due Date (Day of Month)*</label>
                    <div className="acc-inv-field__input-box">
                      <select 
                        className="acc-inv-field__select"
                        value={formInputs.emiDayOfMonth}
                        onChange={(e) => setFormInputs({...formInputs, emiDayOfMonth: Number(e.target.value)})}
                      >
                        <option value="1">1st of every month</option>
                        <option value="5">5th of every month</option>
                        <option value="10">10th of every month</option>
                        <option value="15">15th of every month</option>
                        <option value="20">20th of every month</option>
                        <option value="25">25th of every month</option>
                      </select>
                      <FiChevronDown className="acc-inv-field__select-arrow" />
                    </div>
                  </div>
                </div>

                {/* Live Financial Projection Panel */}
                <div className="acc-inv-summary-panel">
                  <div className="acc-inv-summary-panel__title">
                    <FaRupeeSign /> Live Cost Summary
                  </div>
                  <div className="acc-inv-summary-panel__grid">
                    <div className="acc-inv-summary-panel__item">
                      <span>Base Cost:</span>
                      <strong>{formatINR(calcTotalCost)}</strong>
                    </div>
                    {calcTaxRate > 0 && (
                      <div className="acc-inv-summary-panel__item">
                        <span>Tax (+{calcTaxRate}%):</span>
                        <strong>{formatINR(calcTaxAmount)}</strong>
                      </div>
                    )}
                    <div className="acc-inv-summary-panel__item acc-inv-summary-panel__item--grand">
                      <span>Grand Total:</span>
                      <strong>{formatINR(calcGrandTotal)}</strong>
                    </div>
                    <div className="acc-inv-summary-panel__item acc-inv-summary-panel__item--danger">
                      <span>Advance Received:</span>
                      <strong>- {formatINR(calcAdvanceCost)} ({formInputs.advanceStatus})</strong>
                    </div>
                    <div className="acc-inv-summary-panel__item">
                      <span>Remaining Balance:</span>
                      <strong>{formatINR(calcRemainingBalance)}</strong>
                    </div>
                    <div className="acc-inv-summary-panel__item acc-inv-summary-panel__item--highlight">
                      <span>Monthly EMI ({calcEmiMonths} mo):</span>
                      <strong>{formatINR(calcPerMonthEmi)} / mo</strong>
                    </div>
                  </div>
                </div>

                {/* EMI Schedule Table */}
                <div className="acc-inv-schedule-box">
                  <div className="acc-inv-schedule-box__header">
                    <span className="acc-inv-schedule-box__title">
                      <FiCalendar /> Monthly Installment Status Update
                    </span>
                    {modalType === 'edit' && (
                      <button 
                        type="button" 
                        className="acc-inv-schedule-box__reset-btn" 
                        onClick={handleRegenerateFormSchedule}
                        title="Recompute all rows according to tenure"
                      >
                        <FiRefreshCw /> Reset/Regenerate Rows
                      </button>
                    )}
                  </div>
                  
                  <div className="acc-inv-schedule-box__table-wrap">
                    <table className="acc-inv-mini-table">
                      <thead>
                        <tr>
                          <th>Installment #</th>
                          <th>Month</th>
                          <th>Due Date</th>
                          <th>Amount (₹)</th>
                          <th>Status</th>
                          <th>Paid Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formInputs.emiSchedule && formInputs.emiSchedule.length > 0 ? (
                          formInputs.emiSchedule.map((row, idx) => (
                            <tr key={idx}>
                              <td><strong>#{row.installmentNo}</strong></td>
                              <td><span>{row.monthLabel}</span></td>
                              <td>{formatDate(row.dueDate)}</td>
                              <td className="font-weight-bold">{formatINR(row.amount)}</td>
                              <td>
                                <select 
                                  className={`acc-inv-select-inline acc-inv-select-inline--${(row.status || 'upcoming').toLowerCase()}`}
                                  value={row.status}
                                  onChange={(e) => handleFormInstallmentStatusChange(idx, e.target.value)}
                                >
                                  <option value="Upcoming">Upcoming</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Paid">Paid</option>
                                  <option value="Overdue">Overdue</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td>
                                {row.status === 'Paid' ? (
                                  <input 
                                    type="date"
                                    className="acc-inv-mini-date-input"
                                    value={row.paidDate ? row.paidDate.split('T')[0] : defaultTodayDate}
                                    onChange={(e) => {
                                      const updatedSchedule = [...formInputs.emiSchedule];
                                      updatedSchedule[idx].paidDate = e.target.value;
                                      setFormInputs(prev => ({ ...prev, emiSchedule: updatedSchedule }));
                                    }}
                                  />
                                ) : (
                                  <span className="acc-inv-text-muted">-</span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="acc-inv-mini-table__empty">
                              No EMI installments generated. Check cost and tenure.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </fieldset>

              <footer className="acc-inv-modal-footer">
                <button type="button" className="acc-inv-btn acc-inv-btn--cancel" onClick={() => setModalType(null)} disabled={submitting}>Cancel</button>
                <button type="submit" className="acc-inv-btn acc-inv-btn--confirm" disabled={submitting}>
                  {submitting ? 'Saving...' : modalType === 'add' ? 'Create Contract & Schedule' : 'Save Changes'}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {/* Quick EMI Schedule Modal */}
      {scheduleModalItem && (
        <div className="acc-inv-modal-overlay">
          <div className="acc-inv-modal-card acc-inv-modal-card--medium">
            <header className="acc-inv-modal-header">
              <div>
                <h3 className="acc-inv-modal-header__title">💳 Monthly Installment Status Tracking</h3>
                <p className="acc-inv-modal-header__subtitle">
                  Contract: <strong>{scheduleModalItem.itemNo}</strong> | {scheduleModalItem.clientName} ({scheduleModalItem.projectName})
                </p>
              </div>
              <button className="acc-inv-modal-close" onClick={() => setScheduleModalItem(null)}><FiX /></button>
            </header>

            <div className="acc-inv-schedule-scroll">
              <table className="acc-inv-table">
                <thead className="acc-inv-table__head">
                  <tr>
                    <th className="acc-inv-table__th">Installment #</th>
                    <th className="acc-inv-table__th">Billing Month</th>
                    <th className="acc-inv-table__th">Due Date</th>
                    <th className="acc-inv-table__th">Amount</th>
                    <th className="acc-inv-table__th">Current Status</th>
                    <th className="acc-inv-table__th">Update Status</th>
                  </tr>
                </thead>
                <tbody className="acc-inv-table__body">
                  {scheduleModalItem.emiSchedule?.map((inst) => (
                    <tr key={inst.installmentNo} className="acc-inv-table__row">
                      <td className="acc-inv-table__td">#{inst.installmentNo}</td>
                      <td className="acc-inv-table__td font-weight-bold">{inst.monthLabel || formatDate(inst.dueDate)}</td>
                      <td className="acc-inv-table__td">{formatDate(inst.dueDate)}</td>
                      <td className="acc-inv-table__td font-weight-bold">{formatINR(inst.amount)}</td>
                      <td className="acc-inv-table__td">
                        <span className={`acc-inv-pill acc-inv-pill--status-${(inst.status || '').toLowerCase()}`}>
                          {inst.status}
                        </span>
                      </td>
                      <td className="acc-inv-table__td">
                        <select 
                          className="acc-inv-select-inline"
                          value={inst.status}
                          onChange={(e) => handleUpdateInstallmentStatus(
                            scheduleModalItem._id, 
                            inst.installmentNo, 
                            e.target.value
                          )}
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Overdue">Overdue</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && (
        <div className="acc-inv-modal-overlay">
          <div className="acc-inv-modal-card acc-inv-modal-card--mini">
            <h3 className="acc-inv-dialog-title">Delete Contract?</h3>
            <p className="acc-inv-dialog-desc">
              Permanently delete contract <strong>{activeItem?.itemNo}</strong> and its linked EMI monthly records?
            </p>
            <footer className="acc-inv-modal-footer">
              <button className="acc-inv-btn acc-inv-btn--cancel" onClick={() => setModalType(null)} disabled={submitting}>Cancel</button>
              <button className="acc-inv-btn acc-inv-btn--delete" onClick={handleDeleteConfirm} disabled={submitting}>
                {submitting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccInvoiceDetails;