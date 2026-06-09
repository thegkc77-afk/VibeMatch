// CTABanner.jsx

import "../Style/CTABannar.css";
import { Sparkles } from "lucide-react";

const CTABanner = ({ onEarlyAccessClick }) => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-card">
          
          {/* Top Badge */}
          <div className="cta-badge">
            <Sparkles className="badge-icon" />
            <span>Join The Movement</span>
          </div>

          {/* Heading */}
          <h2 className="cta-heading">
            Ready To Find Your{" "}
            <span className="gradient-text">
              Perfect Vibe?
            </span>
          </h2>

          {/* Description */}
          <p className="cta-description">
            Join thousands of people who are already making real
            connections nearby.<br/> Your next great experience is
            just around the corner.
          </p>

          {/* Buttons */}
          <div className="cta-buttons">
            <button
              className="primary-btn"
              onClick={onEarlyAccessClick}
            >
              Get Started Now
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;