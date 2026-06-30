import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
<<<<<<< HEAD
import MyDocuments from "./Components/MyDocuments/MyDocuments";
=======
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import PasswordSecurity from "./Components/PasswordSecurity/PasswordSecurity";
import TeamPerformance from "./Pages/TeamPerformance/TeamPerformance";
>>>>>>> 28725278f3eb60a62ab8aadcc0298f439599facb

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
<<<<<<< HEAD
        <Route path="team-attendance" element={<AttendanceAtten />} />
        <Route path="team-leaves" element={<TeamLeaves />} />
        <Route path="my-documents" element={<MyDocuments />} />
=======
        <Route path="team-attendance" element={<CompanyPolicies />} />
        <Route path="team-leaves" element={<TeamLeaves />} />
        <Route path="profile-settings" element={<ProfileSettings />} />
        <Route path="password-security" element={<PasswordSecurity />} />
        <Route path="Team-Performance" element={<TeamPerformance />} />
>>>>>>> 28725278f3eb60a62ab8aadcc0298f439599facb
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;