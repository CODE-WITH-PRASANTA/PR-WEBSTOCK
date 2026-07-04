import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllProjects from "./Pages/AllProjects/AllProjects";
import AddProjects from "./Components/AddProject/AddProject";
import EditProjects from "./Components/EditProjects/EditProjects";
import ProjectTasks from "./Components/ProjectTasks/ProjectTasks";
import ProjectBudget from "./Components/ProjectBudget/ProjectBudget";
import ProjectRiskIssue from "./Components/ProjectRiskIssue/ProjectRiskIssue";

import ProjectMembers from "./Components/ProjectMembers/ProjectMembers";
import ProjectFiles from "./Components/ProjectFiles/ProjectFiles";
import AllEmployees from "./Components/AllEmployees/AllEmployees";
import AddEmployee from "./Components/AddEmployee/AddEmployee";
import AddProject from "./Components/AddProject/AddProject";
import EmployeeShift from "./Components/EmployeeShift/EmployeeShift";
import EmployeeProfile from "./Components/EmployeeProfile/EmployeeProfile";
import EditManagement from "./Components/EditManagement/EditManagement";
import TodayAttendance from "./Components/TodayAttendance/TodayAttendance";
import EmployeeAttendance from "./Components/EmployeeAttendance/EmployeeAttendance";
import LeaveRequest from "./Components/LeaveRequest/LeaveRequest";
import LeaveBalance from "./Components/LeaveBalance/LeaveBalance";
import LeaveTypes from "./Components/LeaveTypes/LeaveTypes";
import LeaveSettings from "./Components/LeaveSettings/LeaveSettings";

import EmployeeDocuments from "./Components/EmployeeDocuments/EmployeeDocuments";
import EmployeeAssets from "./Components/EmployeeAssets/EmployeeAssets";
import EmployeePerformance from "./Components/EmployeePerformance/EmployeePerformance";
import PayrollHistory from "./Components/PayrollHistory/PayrollHistory";
import BonusesIncentives from "./Components/BonusesIncentives/BonusesIncentives";
import Deductions from "./Components/Deductions/Deductions";
import StatutoryCompliance from "./Components/StatutoryCompliance/StatutoryCompliance";
import AllHolidays from "./Components/AllHolidays/AllHolidays";
import AddHoliday from "./Components/AddHoliday/AddHoliday";
import EditHoliday from "./Components/EditHoliday/EditHoliday";
import AllClients from "./Components/AllClients/AllClients";
import AddClient from "./Components/AddClient/AddClient";
import EditClient from "./Components/EditClient/EditClient";
import ClientProfile from "./Components/ClientProfile/ClientProfile";
import ProjectDetails from "./Components/ProjectDetails/ProjectDetails";
import Estimates from "./Components/Estimates/Estimates";
import ClientContacts from "./Components/ClientContacts/ClientContacts";
import ClientProjects from "./Components/ClientProjects/ClientProjects";
import ClientInvoices from "./Components/ClientInvoices/ClientInvoices";
import ClientPayments from "./Components/ClientPayments/ClientPayments";

import Overtime from "./Pages/Overtime/Overtime";
import ShiftPlanning from "./Pages/ShiftPlanning/ShiftPlanning";
import Remote from "./Pages/Remote/Remote";
import EmployeeSalary from "./Components/EmployeeSalary/EmployeeSalary";
import PaySlip from "./Components/PaySlip/PaySlip";
import SalaryStructure from "./Components/SalaryStructure/SalaryStructure";

import AttendanceSheet from "./Components/AttendanceSheet/AttendanceSheet";
import Timesheets from "./Components/Timesheets/Timesheets";
import EmployeeExit from "./Components/EmployeeExit/EmployeeExit";
import LeaveReport from "./Components/LeaveReport/LeaveReport";
import ExpenseReport from "./Components/ExpenseReport/ExpenseReport";
import Leads from "./Components/Leads/Leads";

import PayrollProcessing from "./Components/PayrollProcessing/PayrollProcessing";
import CompanyDocument from "./Components/CompanyDocument/CompanyDocument";
import ManagementDocument from "./Components/ManagementDocument/ManagementDocument";
import DocumentPolicies from "./Components/DocumentPolicies/DocumentPolicies";
import ESignatures from "./Components/ESignatures/ESignatures";
import DocumentTemplates from "./Components/DocumentTemplates/DocumentTemplates";
import Calender from "./Components/Calender/Calender";
import AccPayments from "./Components/AccPayments/AccPayments";
import AccAddpayments from "./Components/AccAddpayments/AccAddpayments";
import AccInvoice from "./Components/AccInvoice/AccInvoice";
import AccInvoiceDetails from "./Components/AccInvoiceDetails/AccInvoiceDetails";
import Expenses from "./Components/Expenses/Expenses";
import ExpenseApprovals from "./Components/ExpenseApprovals/ExpenseApprovals";
import Reimbursements from "./Components/Reimbursements/Reimbursements";
import FinancialSummary from "./Components/FinancialSummary/FinancialSummary";
import TaxReports from "./Components/TaxReports/TaxReports";
import Task from "./Components/Task/Task";
import Appraisals from "./Components/Appraisals/Appraisals";
import PerformanceReviews from "./Components/PerformanceReviews/PerformanceReviews";
import Feedback from "./Components/Feedback/Feedback";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/management/dashboard" replace />} />

        {/* Employee Layout */}
        <Route path="management" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allproject" element={<AllProjects />} />
          <Route path="projects/add" element={<AddProjects />} />
          <Route path="projects/estimates" element={<Estimates />} />
          <Route path="projects/details" element={<ProjectDetails />} />
          <Route path="projects/edit" element={<EditProjects />} />
          <Route path="projects/tasks" element={<ProjectTasks />} />
          <Route path="projects/budget" element={<ProjectBudget/>}/>
          <Route path="projects/risks" element={<ProjectRiskIssue/>}/>
          <Route path="projects/members" element={<ProjectMembers/>}/>
          <Route path="projects/files" element={<ProjectFiles/>}/>
          <Route path="all" element={<AllEmployees/>}/>
          <Route path="add" element={<AddEmployee/>}/>
          <Route path="projects/add" element={<AddProject/>}/>
          <Route path="shift" element={<EmployeeShift/>}/>
          <Route path="profile" element={<EmployeeProfile/>}/>
          <Route path="edit" element={<EditManagement/>}/>
          <Route path="today" element={<TodayAttendance/>}/>
          <Route path="management" element={<EmployeeAttendance/>}/>
          <Route path="appraisals" element={<Appraisals/>}/>
          <Route path="reviews" element={<PerformanceReviews/>}/>
          <Route path="feedback" element={<Feedback/>}/>

          
          
          <Route path="documents" element={<EmployeeDocuments />} />
          <Route path="requests" element={<LeaveRequest />} />
          <Route path="leaves/settings" element={<LeaveSettings />} />
          <Route path="balance" element={<LeaveBalance />} />
          <Route path="leaves/types" element={<LeaveTypes />} />
          <Route path="payroll/salary" element={<EmployeeSalary />} />
          <Route path="payroll/payslip" element={<PaySlip />} />
          <Route path="documents" element={<EmployeeDocuments />}/>
          <Route path="assets" element={<EmployeeAssets />}/>
          <Route path="performance" element={<EmployeePerformance />} />
          <Route path="payroll/history" element={<PayrollHistory />} />
          <Route path="payroll/bonuses" element={<BonusesIncentives />} />
          <Route path="payroll/deductions" element={<Deductions />} />
          <Route path="payroll/compliance" element={<StatutoryCompliance />}/>
          <Route path="payroll/structure"element={<SalaryStructure/>}/>
          <Route path="payroll/processing"element={<PayrollProcessing/>}/>
          <Route path="company"element={<CompanyDocument/>}/>
          <Route path="management-doc"element={<ManagementDocument/>}/>
          <Route path="policies"element={<DocumentPolicies/>}/>
          <Route path="templates"element={<DocumentTemplates/>}/>
          <Route path="signatures"element={<ESignatures/>}/>
          <Route path="shortlist"element={<Calender/>}/>

          
          <Route path="holidays/all" element={<AllHolidays/>}/>
         <Route path="holidays/add" element={<AddHoliday/>}/>
         <Route path="holidays/edit" element={<EditHoliday/>}/>
         <Route path="clients/all" element={<AllClients/>}/>
         <Route path="clients/add" element={<AddClient/>}/>
         <Route path="clients/edit" element={<EditClient/>}/>
         <Route path="clients/profile" element={<ClientProfile/>}/>
         <Route path="projects/details" element={<ProjectDetails/>}/>
         <Route path="projects/estimates" element={<Estimates/>}/>
         <Route path="clients/contacts" element={<ClientContacts/>}/>
         <Route path="clients/projects"element={<ClientProjects/>}/>
         <Route path="clients/invoices" element={<ClientInvoices/>}/>
         <Route path="clients/payments" element={<ClientPayments/>}/>
         <Route path="overtime"element={<Overtime/>}/>
         <Route path="shift-planning"element={<ShiftPlanning/>}/>
         <Route path="remote"element={<Remote/>}/>
         <Route path="structure"element={<SalaryStructure/>}/>
         <Route path="sheet" element={<AttendanceSheet />} />
         <Route path="timesheets" element={<Timesheets />} />
         <Route path="exit" element={<EmployeeExit />} />
         <Route path="leave" element={<LeaveReport />} />
         <Route path="expense" element={<ExpenseReport />} />
         <Route path="leaders" element={<Leads />} />
          <Route path="projects/details" element={<ProjectDetails/>}/>
          <Route path="projects/estimates" element={<Estimates/>}/>
          <Route path="clients/contacts" element={<ClientContacts/>}/>
          <Route path="clients/projects"element={<ClientProjects/>}/>
          <Route path="clients/invoices" element={<ClientInvoices/>}/>
          <Route path="clients/payments" element={<ClientPayments/>}/>
          <Route path="overtime"element={<Overtime/>}/>
          <Route path="shift-planning"element={<ShiftPlanning/>}/>
          <Route path="remote"element={<Remote/>}/>
          <Route path="structure"element={<SalaryStructure/>}/>
          <Route path="accounts/payments" element={<AccPayments/>}/>
          <Route path="accounts/add-payment" element={<AccAddpayments/>}/>
          <Route path="accounts/invoice" element={<AccInvoice/>}/>
          <Route path="accounts/invoice-details" element={<AccInvoiceDetails/>}/>
          <Route path="accounts/expenses" element={<Expenses/>}/>
          <Route path="accounts/expense-approvals" element={<ExpenseApprovals/>}/>
          <Route path="accounts/reimbursements" element={<Reimbursements/>}/>
          <Route path="accounts/summary" element={<FinancialSummary/>}/>
          <Route path="accounts/tax-reports" element={<TaxReports/>}/>
          <Route path="apps/task" element={<Task/>}/>

        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 