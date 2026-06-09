import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, MapPin, MessageCircle, Bell, User, Zap } from 'lucide-react';
import Profile from './Profile';
import '../WebStyle/sidebar.css';

function Sidebar({ mobileOpen, closeSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Nearby', path: '/nearby', icon: MapPin },
    { name: 'Talk Now', path: '/talknow', icon: Zap },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Notification', path: '/notification', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div>
        {/* Brand Header */}
        <div className="sidebar-header" onClick={() => { navigate('/'); if (closeSidebar) closeSidebar(); }}>
          <h1 className="sidebar-title">Discover</h1>
          <span className="sidebar-subtitle">Local Discovery</span>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.toLowerCase() === item.path.toLowerCase();
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Icon className="sidebar-icon" size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <Profile isSidebar={true} closeSidebar={closeSidebar} />
    </aside>
  );
}

export default Sidebar;