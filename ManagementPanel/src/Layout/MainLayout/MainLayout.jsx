import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";

export default function MainLayout() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth <= 992
  );

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth <= 992) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }

    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return (

    <div className="AdminLayout">

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div
        className={`AdminLayout-main ${
          sidebarCollapsed ? "collapsed" : ""
        }`}
      >

        <Topbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <div className="AdminLayout-content">
          <Outlet />
        </div>

      </div>

    </div>

  );
}