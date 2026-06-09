import '../Style/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1: Logo & Info */}
        <div className="footer-info">
          <div className="footer-logo">
            <svg className="footer-logo-icon" viewBox="0 0 24 24" width="32" height="32" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#footer-logo-grad)" />
              <path d="M12 12.75l-.73-.66C8.67 9.8 7.5 8.71 7.5 7.4c0-1.05.8-1.85 1.85-1.85.59 0 1.16.28 1.53.71.37-.43.94-.71 1.53-.71 1.05 0 1.85.8 1.85 1.85 0 1.31-1.17 2.4-3.77 4.69l-.73.66z" fill="#ffffff" />
              <defs>
                <linearGradient id="footer-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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
          <p className="footer-tagline">
            Building real connections through hyperlocal discovery and mood-based matching.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-links-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Subscribe */}
        <div className="footer-subscribe-col">
          <h3>Stay Connected</h3>
          <p className="subscribe-text">Subscribe to our newsletter</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="join-btn">Join</button>
          </div>
        </div>

      </div>

      {/* Copyright Row */}
      <div className="footer-bottom">
        <p>© 2026 VibeMatch — Find Your Vibe.</p>
      </div>
    </footer>
  );
}

export default Footer;