import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../WebStyle/dashboard.css';

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Backdrop when Sidebar is Open */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar} />
      )}

      {/* Sidebar Panel */}
      <Sidebar mobileOpen={mobileOpen} closeSidebar={closeSidebar} />

      {/* Main Contents Panel */}
      <main className="dashboard-content">
        {/* Background glow effects */}
        <div className="dashboard-ambient-glow"></div>
        
        {/* Child Router Views */}
        <Outlet context={{ toggleSidebar }} />
      </main>
    </div>
  );
}

export default DashboardLayout;
