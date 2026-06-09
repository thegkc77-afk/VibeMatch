import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
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

      {/* Mobile Toggle Header */}
      <header className="dashboard-mobile-header">
        <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={24} />
        </button>
        <span className="mobile-logo-text">VibeMatch</span>
        <div style={{ width: '40px' }} /> {/* Balance space */}
      </header>

      {/* Sidebar Panel */}
      <Sidebar mobileOpen={mobileOpen} closeSidebar={closeSidebar} />

      {/* Main Contents Panel */}
      <main className="dashboard-content">
        {/* Background glow effects */}
        <div className="dashboard-ambient-glow"></div>
        
        {/* Child Router Views */}
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
