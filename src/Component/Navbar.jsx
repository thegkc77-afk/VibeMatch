import { useState, useEffect } from 'react';
import '../Style/navbar.css';
import { Link, useLocation } from 'react-router-dom';

import Logo from './Logo';

function Navbar({ forceShow }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not render the global navbar on dashboard pages and early access login/signup
  const hideGlobalNavbarPaths = ['/getearlyaccess', '/explore', '/nearby', '/chat', '/notification', '/talknow', '/profile'];
  if (hideGlobalNavbarPaths.includes(location.pathname.toLowerCase()) && !forceShow) {
    return null;
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo size={28} showText={true} animated={true} />
      </Link>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="auth-buttons">
        <Link to='/GetEarlyAccess'>
          <button className='nav-btn'>Get Early Access</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;