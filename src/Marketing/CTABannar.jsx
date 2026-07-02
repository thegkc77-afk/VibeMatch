// CTABanner.jsx

import "../Style/CTABannar.css";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="cta-section">
      {/* Background Decorative Orbs */}
      <motion.div 
        className="cta-orb cta-orb-purple"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="cta-orb cta-orb-pink"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="cta-container">
        <motion.div 
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top Badge */}
          <div className="cta-badge">
            <Sparkles className="badge-icon" />
            <span>Join The Movement</span>
          </div>

          {/* Heading */}
          <h2 className="cta-heading">
            Ready To Find Your{" "}
            <span className="gradient-text animated-gradient-text">
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
            <Link to="/GetEarlyAccess">
              <button className="primary-btn">
                Get Started Now
              </button>
            </Link>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;