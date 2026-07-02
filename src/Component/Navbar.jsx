import { useState, useEffect } from 'react';
import '../Style/navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import Logo from './Logo';

function Navbar({ forceShow }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Do not render the global navbar on dashboard pages and early access login/signup
  const hideGlobalNavbarPaths = ['/getearlyaccess', '/explore', '/nearby', '/chat', '/notification', '/talknow', '/profile'];
  if (hideGlobalNavbarPaths.includes(location.pathname.toLowerCase()) && !forceShow) {
    return null;
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open-active' : ''}`}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
        <Logo size={28} showText={true} animated={true} />
      </Link>

      {/* Hamburger Toggle Button */}
      <button 
        className="nav-hamburger-btn" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/help" onClick={() => setMobileMenuOpen(false)}>Help</Link>
        </li>
        <li className="mobile-only-link">
          <Link to="/GetEarlyAccess" onClick={() => setMobileMenuOpen(false)}>
            <button className="nav-btn mobile-nav-btn">Get Early Access</button>
          </Link>
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