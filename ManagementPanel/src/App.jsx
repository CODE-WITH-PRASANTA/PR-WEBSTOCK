import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllProjects from "./Pages/AllProjects/AllProjects";
import AddProjects from "./Components/AddProjects/AddProjects";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/management/dashboard" replace />} />

        {/* Employee Layout */}
        <Route path="/management" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allproject" element={<AllProjects />} />
          <Route path="projects/add" element={<AddProjects />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;