import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";

// Components
import TaskHeader from "./Components/TaskHeader/TaskHeader";
import TaskList from "./Components/TaskList/TaskList";
import SalaryDetails from "./Components/SalaryDetails/SalaryDetails";
import SalaryHeader from "./Components/SalaryHeader/SalaryHeader";
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
import Chats from "./Pages/chats/chats";
import Myproject from "./Pages/Myproject/Myproject";
import Contacts from "./Components/Contacts/Contacts";
import UploadDocuments from "./Components/UploadDocuments/UploadDocuments";
import Inbox from "./Components/Inbox/Inbox";
import Compose from "./Components/Compose/Compose";
import ReadEmail from "./Components/ReadEmail/ReadEmail";
import TeacherAttenanced from "./Components/TeacherAttenanced/TeacherAttenanced";
import MonthlyAttendance from "./Components/MonthlyAttendance/MonthlyAttendance";
import Attendance from "./Components/Attendance/Attendance";
import OverTime from "./Components/OverTime/OverTime";
import Leave from "./Components/Leave/Leave";
import LeavesRequstes from "./Components/LeavesRequstes/LeavesRequstes";
import LeaveBalance from "./Components/LeaveBalance/LeaveBalance";
import ShiftSchedule from "./Components/ShiftSchedule/ShiftSchedule";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/employee/dashboard" replace />} />

      {/* Employee */}
      <Route path="/employee" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="team-members" element={<TeamMembers />} />
        <Route path="my-tasks" element={<TaskList />} />
        <Route path="reimbursements" element={<SalaryDetails />} />
        <Route path="company-policies" element={<CompanyPolicies />} />
        <Route path="team-attendance" element={<AttendanceAtten />} />
        <Route path="team-leaves" element={<TeamLeaves />} />
        <Route path="my-documents" element={<MyDocuments />} />
        <Route path="team-attendance" element={<CompanyPolicies />} />
        <Route path="team-leaves" element={<TeamLeaves />} />
        <Route path="profile-settings" element={<ProfileSettings />} />
        <Route path="password-security" element={<PasswordSecurity />} />
        <Route path="Team-Performance" element={<TeamPerformance />} />
        <Route path="Calendar" element={<Calendar />} />
        <Route path="payslips"element={<Payslips/>}/>
        <Route path="my-projects"element={<Myproject/>}/>
        <Route path="chat"element={<Chats/>}/>
        <Route path="contacts" element={<Contacts />} />
        <Route path="upload-documents" element ={<UploadDocuments/>}/>
        <Route path="email-inbox" element={<Inbox/>}/>
        <Route path="email-compose" element={<Compose/>}/>
        <Route path="email-read" element={<ReadEmail/>}/>
        <Route path="today-attendance" element={<TeacherAttenanced/>}/>
        <Route path="monthly-attendance" element={<MonthlyAttendance/>}/>
        <Route path="attendance-history" element={<Attendance/>}/>
        <Route path="attendance-overtime" element={<OverTime/>}/>
        <Route path="apply-leave" element={<Leave/>}/>
        <Route path="leave-requests" element={<LeavesRequstes/>}/>
        <Route path="leave-balance" element={<LeaveBalance/>}/> 
        <Route path="shift-schedule" element={<ShiftSchedule/>}/>
            

      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;