import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"; 
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";

// Components
import TaskList from "./Components/TaskList/TaskList";
import SalaryDetails from "./Components/SalaryDetails/SalaryDetails";
import CompanyPolicies from "./Components/CompanyPolicies/CompanyPolicies";
import TeamMembers from "./Components/TeamMembers/TeamMembers";
import AttendanceAtten from "./Pages/AttendanceAtten/AttendanceAtten";
import TeamLeaves from "./Components/TeamLeaves/TeamLeaves";
import MyDocuments from "./Components/MyDocuments/MyDocuments";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import PasswordSecurity from "./Components/PasswordSecurity/PasswordSecurity";
import TeamPerformance from "./Pages/TeamPerformance/TeamPerformance";
import Calendar from "./Components/Calender/Calender";
import Payslips from "./Pages/Payslips/Payslips";
import Chats from "./Pages/Chats/Chats";
import Myproject from "./Pages/Myproject/Myproject";
import Contacts from "./Components/Contacts/Contacts";
import TeacherAttenanced from "./Components/TeacherAttenanced/TeacherAttenanced";
import MonthlyAttendance from "./Components/MonthlyAttendance/MonthlyAttendance";
import Attendance from "./Components/Attendance/Attendance";
import OverTime from "./Components/OverTime/OverTime";
import Leave from "./Components/Leave/Leave";
import LeavesRequstes from "./Components/LeavesRequstes/LeavesRequstes";
import LeaveBalance from "./Components/LeaveBalance/LeaveBalance";
import ShiftSchedule from "./Components/ShiftSchedule/ShiftSchedule";
import UploadDocument from "./Components/UploadDocument/UploadDocument";
import EmailInbox from "./Components/EmailInbox/EmailInbox";
import EmailCompose from "./Components/EmailCompose/EmailCompose";
import EmailRead from "./Components/EmailRead/EmailRead";
import LoginPage from "./Components/LoginPage/LoginPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirect Root */}
      <Route path="/" element={<Navigate to="/employee/today-attendance" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 🔐 WRAPPED PROTECTED ROUTES BLOCK */}
      <Route element={<ProtectedRoute />}>
        <Route path="/employee" element={<MainLayout />}>
          <Route
              index
              element={<Navigate to="today-attendance" replace />}
            />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="team-members" element={<TeamMembers />} />
          <Route path="my-tasks" element={<TaskList />} />
          <Route path="reimbursements" element={<SalaryDetails />} />
          <Route path="company-policies" element={<CompanyPolicies />} />
          <Route path="team-attendance" element={<AttendanceAtten />} />
          <Route path="team-leaves" element={<TeamLeaves />} />
          <Route path="my-documents" element={<MyDocuments />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="password-security" element={<PasswordSecurity />} />
          <Route path="Team-Performance" element={<TeamPerformance />} />
          <Route path="Calendar" element={<Calendar />} />
          <Route path="payslips" element={<Payslips/>}/>
          <Route path="my-projects" element={<Myproject/>}/>
          <Route path="chat" element={<Chats/>}/>
          <Route path="contacts" element={<Contacts />} />
          <Route path="today-attendance" element={<TeacherAttenanced/>}/>
          <Route path="monthly-attendance" element={<MonthlyAttendance/>}/>
          <Route path="attendance-history" element={<Attendance/>}/>
          <Route path="attendance-overtime" element={<OverTime/>}/>
          <Route path="apply-leave" element={<Leave/>}/>
          <Route path="leave-requests" element={<LeavesRequstes/>}/>
          <Route path="leave-balance" element={<LeaveBalance/>}/> 
          <Route path="shift-schedule" element={<ShiftSchedule/>}/>
          <Route path="upload-documents" element={<UploadDocument/>}/>
          <Route path="email-inbox" element={<EmailInbox/>}/>
          <Route path="email-compose" element={<EmailCompose/>}/>
          <Route path="email-read" element={<EmailRead/>}/>
        </Route>
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;