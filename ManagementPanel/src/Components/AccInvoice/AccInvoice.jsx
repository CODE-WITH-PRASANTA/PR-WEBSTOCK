import React, { useState, useEffect, useCallback } from 'react';
import {
  FiCalendar,
  FiPrinter,
  FiPhone,
  FiMail,
  FiGlobe,
  FiMapPin,
  FiBriefcase,
  FiShield,
  FiSearch,
  FiX,
  FiFileText,
  FiLoader,
  FiAlertCircle
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import API from '../../api/axios';

import companyLogo from '../../assets/prwebstock_logo.png';
import authorisedStamp from '../../assets/Stamp.webp';
import directorSignature from '../../assets/Sign.webp';

import './AccInvoice.css';

const COMPANY_DETAILS = {
  name: 'PR WEBSTOCK OPC PVT. LTD.',
  cin: 'U62010OD2025OPC051339',
  tagline: 'Best Software Solution',
  address: '608A, Grand Bazar, Phulnakhara',
  cityStatePin: 'Bhubaneswar, Odisha - 754001',
  gstin: '21U62010OD2025OPC1Z5',
  email: 'prwebstock.com@gmail.com',
  phone: '+91 7789801327',
  website: 'prwebstock.com'
};

const formatINR = (val) => {
  const num = Number(val) || 0;
  return '₹' + num.toLocaleString('en-IN');
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? dateStr
    : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const computeEmiSchedule = (raw) => {
  if (Array.isArray(raw?.emiSchedule) && raw.emiSchedule.length > 0) {
    return raw.emiSchedule.map((item) => {
      const d = new Date(item.dueDate || raw.invoiceDate || new Date());
      return {
        installmentNo: item.installmentNo,
        monthName: item.monthLabel || d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
        amount: item.amount,
        status: item.status || 'Upcoming'
      };
    });
  }
  return [];
};

const mapBackendToInvoice = (raw) => {
  if (!raw) return null;

  const invDate = raw.invoiceDate || raw.createdAt || new Date();
  const dueDateVal = raw.dueDate || null;
  const taxRate = Number(raw.tax) || 0;

  return {
    _id: raw._id,
    invoiceNo: raw.itemNo || `INV-${raw.slNo || '001'}`,
    invoiceDate: formatDate(invDate),
    dueDate: dueDateVal ? formatDate(dueDateVal) : 'On Demand / Nil',
    status: raw.status || 'In Progress',
    company: COMPANY_DETAILS,
    client: {
      name: raw.clientName || 'N/A',
      companyName: raw.projectName || 'Client',
      businessAddress: raw.businessAddress || 'Not Provided',
      mobile: raw.mobile || 'N/A',
      whatsapp: raw.whatsapp || raw.mobile || 'N/A',
      email: raw.email || 'N/A'
    },
    project: {
      name: raw.projectName || 'Software Development',
      category: raw.projectCategory || 'General Service',
      domain: raw.projectDomain || 'N/A',
      domainProvider: raw.domainProvider || 'None / Not Applicable',
      description: raw.projectDescription || raw.deliverablesSummary || 'Standard Scope of Work'
    },
    financials: {
      totalCost: raw.totalCost || 0,
      advancePaid: raw.advanceCost || 0,
      advanceStatus: raw.advanceStatus || 'Paid',
      remainingBalance: raw.remainingBalance || 0,
      emiMonths: raw.emiMonths || 1,
      perMonthEmi: raw.perMonthEmi || 0,
      taxRate: taxRate,
      taxAmount: raw.taxAmount || 0,
      grandTotal: raw.grandTotal || 0
    },
    emiSchedule: computeEmiSchedule(raw)
  };
};

const AccInvoice = ({ invoiceId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadInvoice = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const res = await API.get(`/invoices/${id}`);
      if (res.data?.success && res.data.data) {
        setSelectedInvoice(mapBackendToInvoice(res.data.data));
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to fetch the invoice record.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (invoiceId) {
      loadInvoice(invoiceId);
      return;
    }

    const fetchLatestInvoice = async () => {
      try {
        setIsLoading(true);
        const res = await API.get('/invoices', { params: { limit: 1 } });
        if (res.data?.data?.length > 0) {
          setSelectedInvoice(mapBackendToInvoice(res.data.data[0]));
        }
      } catch (err) {
        setErrorMessage('Unable to load initial invoice from database.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestInvoice();
  }, [invoiceId, loadInvoice]);

  useEffect(() => {
    const query = searchTerm.trim();
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await API.get('/invoices', { params: { search: query, limit: 8 } });
        setSearchResults(res.data?.data || []);
      } catch (err) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelectResult = (rawRecord) => {
    setSelectedInvoice(mapBackendToInvoice(rawRecord));
    setSearchTerm('');
    setSearchResults([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="AccInvoice-container">
      {/* Search Header */}
      <div className="AccInvoice-header-nav no-print">
        <div>
          <span className="AccInvoice-title">Invoice Document Viewer</span>
          <p className="AccInvoice-subtitle">Official billing statement, deliverables & EMI recurrence schedule</p>
        </div>
        <div className="AccInvoice-breadcrumb">
          <span>Accounts</span> &gt; <span className="AccInvoice-active-crumb">Invoice Document</span>
        </div>
      </div>

      <div className="AccInvoice-search-wrapper no-print">
        <div className="AccInvoice-search-bar">
          <FiSearch className="AccInvoice-search-icon" />
          <input
            type="text"
            className="AccInvoice-search-input"
            placeholder="Search by Invoice No (e.g. INV-123456), Client Name, or Mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isSearching && <FiLoader className="AccInvoice-search-spinner spin" />}
          {searchTerm && !isSearching && (
            <button
              type="button"
              className="AccInvoice-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>

        {searchTerm.trim().length > 0 && (
          <div className="AccInvoice-search-results">
            {searchResults.length === 0 && !isSearching ? (
              <div className="AccInvoice-search-empty">
                <FiFileText />
                <span>No invoice found matching "{searchTerm}"</span>
              </div>
            ) : (
              searchResults.map((inv) => (
                <button
                  type="button"
                  key={inv._id}
                  className={`AccInvoice-search-result-item ${selectedInvoice?._id === inv._id ? 'is-active' : ''}`}
                  onClick={() => handleSelectResult(inv)}
                >
                  <div className="result-main">
                    <span className="result-bill-no">{inv.itemNo}</span>
                    <span className="result-client-name">
                      {inv.clientName} &middot; {inv.projectName}
                    </span>
                  </div>
                  <div className="result-meta">
                    <span className={`emi-badge status-chip status-${(inv.status || 'in-progress').toLowerCase().replace(/\s+/g, '-')}`}>
                      {inv.status || 'In Progress'}
                    </span>
                    <span className="result-amount">{formatINR(inv.grandTotal)}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="AccInvoice-error-card no-print">
          <FiAlertCircle /> {errorMessage}
        </div>
      )}

      {isLoading && (
        <div className="AccInvoice-loading-card">
          <FiLoader className="spin" /> Loading Invoice Record...
        </div>
      )}

      {/* Printable Invoice View */}
      {!isLoading && selectedInvoice && (
        <div className="AccInvoice-card" id="printable-invoice">
          {/* Banner */}
          <div className="AccInvoice-top-banner">
            <div className="AccInvoice-brand-block">
              <img
                src={companyLogo}
                alt="PR Webstock Logo"
                className="AccInvoice-logo"
              />
              <div>
                <h2 className="AccInvoice-company-heading">{selectedInvoice.company.name}</h2>
                <span className="AccInvoice-company-tagline">{selectedInvoice.company.tagline}</span>
                <div className="AccInvoice-cin-badge">
                  <FiShield /> CIN: {selectedInvoice.company.cin}
                </div>
              </div>
            </div>
            <div className="AccInvoice-invoice-title-block">
              <h1 className="AccInvoice-doc-type">
                {selectedInvoice.financials.taxRate > 0 ? 'TAX INVOICE' : 'COMMERCIAL INVOICE'}
              </h1>
              <span className="AccInvoice-inv-number">#{selectedInvoice.invoiceNo}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="AccInvoice-details-grid">
            <div className="AccInvoice-info-box">
              <span className="info-box-label">SERVICE PROVIDER (BILLED BY)</span>
              <h4 className="info-box-name">{selectedInvoice.company.name}</h4>
              <p className="info-box-text"><FiMapPin /> {selectedInvoice.company.address}, {selectedInvoice.company.cityStatePin}</p>
              {selectedInvoice.financials.taxRate > 0 && (
                <p className="info-box-text"><strong>GSTIN:</strong> {selectedInvoice.company.gstin}</p>
              )}
              <p className="info-box-text"><FiPhone /> {selectedInvoice.company.phone}</p>
              <p className="info-box-text"><FiMail /> {selectedInvoice.company.email}</p>
              <p className="info-box-text"><FiGlobe /> {selectedInvoice.company.website}</p>
            </div>

            <div className="AccInvoice-info-box client-box">
              <span className="info-box-label">CLIENT PROFILE (BILLED TO)</span>
              <h4 className="info-box-name">{selectedInvoice.client.name}</h4>
              <p className="info-box-subname">{selectedInvoice.project.name}</p>
              <p className="info-box-text"><FiMapPin /> {selectedInvoice.client.businessAddress || 'Not Provided'}</p>
              <p className="info-box-text"><FiPhone /> {selectedInvoice.client.mobile} &nbsp;|&nbsp; <FaWhatsapp className="text-whatsapp" /> {selectedInvoice.client.whatsapp}</p>
              <p className="info-box-text"><FiMail /> {selectedInvoice.client.email}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="AccInvoice-metadata-strip">
            <div className="meta-cell">
              <span>Invoice Date:</span>
              <strong><FiCalendar /> {selectedInvoice.invoiceDate}</strong>
            </div>
            <div className="meta-cell">
              <span>Project Category:</span>
              <strong className="badge-pill">{selectedInvoice.project.category}</strong>
            </div>
            <div className="meta-cell">
              <span>Next Due Date:</span>
              <strong><FiCalendar /> {selectedInvoice.dueDate}</strong>
            </div>
            <div className="meta-cell">
              <span>Status:</span>
              <strong className={`status-badge-inline status-${selectedInvoice.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {selectedInvoice.status}
              </strong>
            </div>
          </div>

          {/* Scope Card */}
          <div className="AccInvoice-project-summary-card">
            <div className="project-summary-header">
              <FiBriefcase /> Project Scope & Deliverables
            </div>
            <div className="project-summary-content">
              <p><strong>Project Name:</strong> {selectedInvoice.project.name}</p>
              {selectedInvoice.project.domain && selectedInvoice.project.domain !== 'N/A' && (
                <p><strong>Domain Reference:</strong> {selectedInvoice.project.domain} ({selectedInvoice.project.domainProvider})</p>
              )}
              <p className="project-desc"><strong>Deliverables Summary:</strong> {selectedInvoice.project.description}</p>
            </div>
          </div>

          {/* Table */}
          <div className="AccInvoice-table-wrapper">
            <table className="AccInvoice-table">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Project Description</th>
                  <th>Domain / Category</th>
                  <th className="text-right">Base Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  <td>
                    <strong>{selectedInvoice.project.name}</strong>
                    <div className="table-subtext">{selectedInvoice.project.description}</div>
                  </td>
                  <td>
                    <div>{selectedInvoice.project.category}</div>
                    <small className="text-muted">{selectedInvoice.project.domain}</small>
                  </td>
                  <td className="text-right font-bold">{formatINR(selectedInvoice.financials.totalCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Split Totals & EMI */}
          <div className="AccInvoice-split-section">
            <div className="AccInvoice-emi-schedule-box">
              <div className="emi-schedule-header">
                <span>📅 Month-wise EMI Installment Schedule</span>
                <small>Tenure: {selectedInvoice.financials.emiMonths} Month(s)</small>
              </div>

              {selectedInvoice.emiSchedule.length > 0 ? (
                <table className="AccInvoice-emi-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Installment Month</th>
                      <th>EMI Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.emiSchedule.map((emi) => (
                      <tr key={emi.installmentNo}>
                        <td>#{emi.installmentNo}</td>
                        <td className="font-semibold">{emi.monthName}</td>
                        <td className="font-bold text-primary">{formatINR(emi.amount)}</td>
                        <td>
                          <span className={`emi-badge emi-${emi.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {emi.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="AccInvoice-search-empty">
                  <span>Full payment cleared upfront (No recurring installments).</span>
                </div>
              )}
            </div>

            <div className="AccInvoice-totals-box">
              <div className="totals-row">
                <span>Total Project Base Cost:</span>
                <strong>{formatINR(selectedInvoice.financials.totalCost)}</strong>
              </div>

              {selectedInvoice.financials.taxRate > 0 && (
                <div className="totals-row">
                  <span>GST @ {selectedInvoice.financials.taxRate}%:</span>
                  <strong>+ {formatINR(selectedInvoice.financials.taxAmount)}</strong>
                </div>
              )}

              <div className="totals-row border-highlight">
                <span>Grand Total:</span>
                <strong>{formatINR(selectedInvoice.financials.grandTotal)}</strong>
              </div>

              <div className="totals-row text-success">
                <span>Advance Paid ({selectedInvoice.financials.advanceStatus}):</span>
                <strong>- {formatINR(selectedInvoice.financials.advancePaid)}</strong>
              </div>

              <div className="totals-row">
                <span>Remaining Balance:</span>
                <strong>{formatINR(selectedInvoice.financials.remainingBalance)}</strong>
              </div>

              {selectedInvoice.financials.emiMonths > 1 && (
                <div className="totals-row">
                  <span>Monthly EMI ({selectedInvoice.financials.emiMonths} Mos):</span>
                  <strong className="text-primary">{formatINR(selectedInvoice.financials.perMonthEmi)} / mo</strong>
                </div>
              )}

              <div className="totals-final-row">
                <span>Net Outstanding Payable:</span>
                <span className="final-value">{formatINR(selectedInvoice.financials.remainingBalance)}</span>
              </div>
            </div>
          </div>

          {/* Bank Info */}
      <div className="AccInvoice-payment-terms">
          <div className="terms-column">
            <h4>Terms & Conditions</h4>
            <ol>
              <li>
                <strong>Payment Due Date:</strong> Installments must be cleared on or before 
                the designated due date ({selectedInvoice.dueDate || 'as scheduled'}).
              </li>
              <li>
                <strong>Grace Period:</strong> A 3-day grace period is allowed after the due date to complete the pending payment.
              </li>
              <li>
                <strong>Service Suspension / Site Takedown:</strong> If payment is not received within the grace period, website/application services, hosting, and domain access may be temporarily taken down or suspended without further notice.
              </li>
              <li>
                <strong>Reactivation Fee:</strong> A standard reactivation charge may apply to restore suspended services once pending dues are cleared.
              </li>
              <li>
                <strong>Ownership & Deliverables:</strong> Source code, administrative access, and project assets will be fully transferred only after 100% contract payment clearance.
              </li>
            </ol>
          </div>

          <div className="bank-column">
            <h4>Bank Details for NEFT / RTGS / IMPS</h4>
            <p><strong>A/C Name:</strong> PRASANTA KUMAR KUNTIA</p>
            <p><strong>Bank:</strong> Kotak Mahindra Bank</p>
            <p><strong>A/C No:</strong> 5450351047</p>
            <p><strong>IFSC:</strong> KKBK0007247</p>
            <p><strong>Branch:</strong> Bomikhal</p>
          </div>
        </div>

          {/* Stamps & Signatures */}
          <div className="AccInvoice-signatures-wrapper">
            <div className="stamp-box">
              <div className="stamp-image-container">
                <img
                  src={authorisedStamp}
                  alt="Authorised Seal"
                  className="authorised-stamp-img"
                />
              </div>
              <div className="signature-line"></div>
              <strong>Authorised Company Seal</strong>
              <span className="signature-caption">{selectedInvoice.company.name}</span>
            </div>

            <div className="signature-box">
              <div className="signature-image-container">
                <img
                  src={directorSignature}
                  alt="Managing Director"
                  className="director-signature-img"
                />
              </div>
              <div className="signature-line"></div>
              <strong>Managing Director</strong>
              <span className="signature-caption">For {selectedInvoice.company.name}</span>
            </div>
          </div>

          {/* Print Trigger Button */}
          <div className="AccInvoice-actions-panel no-print">
            <button className="AccInvoice-btn-print" onClick={handlePrint}>
              <FiPrinter className="AccInvoice-print-icon" /> Print Official Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccInvoice;