import '../Style/about.css';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import Footer from '../Component/Footer';

function About() {
  return (

    <main className="about-page" id="about-content">

      {/* Background glow effects */}
      <div className="about-glow about-glow-1"></div>
      <div className="about-glow about-glow-2"></div>



      {/* 1. HERO SECTION */}
      <section className="about-hero-section">
        <h1 className="about-hero-heading">
          Built For Real Connections, <br />
          <span className="gradient-text">Not Endless Swiping.</span>
        </h1>
        <p className="about-hero-desc">
          We're rewriting the rules of local social networking. No more ghosting, no more bot profiles—just authentic vibes in your immediate vicinity.
        </p>
        <div className="about-hero-buttons">
          <Link to="/getearlyaccess" className="primary-pill-btn">Get Started</Link>
          <Link to="/explore" className="secondary-pill-btn">Find Saathi</Link>
        </div>
      </section>




      {/* 4. READY TO FIND YOUR VIBE (BOTTOM CTA) */}
      <section className="about-cta-section">
        <div className="cta-glass-card">
          <h2>Ready to find your vibe?</h2>
          <p>Join 50k+ others who are already discovering their local social scene.</p>
          <div className="cta-btn-wrapper">
            <Link to="/getearlyaccess" className="cta-download-btn">Download App</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default About;