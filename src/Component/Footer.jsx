import Logo from './Logo';
import '../Style/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1: Logo & Info */}
        <div className="footer-info">
          <Logo size={32} showText={true} animated={true} />
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