import { useState, useEffect } from 'react';
import '../Style/navbar.css';
import { Link, useLocation } from 'react-router-dom';

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
      <div className="logo">
        <svg className="logo-icon" viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#nav-logo-grad)" />
          <path d="M12 12.75l-.73-.66C8.67 9.8 7.5 8.71 7.5 7.4c0-1.05.8-1.85 1.85-1.85.59 0 1.16.28 1.53.71.37-.43.94-.71 1.53-.71 1.05 0 1.85.8 1.85 1.85 0 1.31-1.17 2.4-3.77 4.69l-.73.66z" fill="#ffffff" />
          <defs>
            <linearGradient id="nav-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7b61ff" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <span className="logo-text">
          <span className="purple-text">Vibe</span>
          <span className="pink-text">Match</span>
        </span>
      </div>

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