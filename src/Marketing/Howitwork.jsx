// HowItWorks.jsx

import '../Style/howitwork.css';
import { motion } from 'framer-motion';

import {
  UserPlus,
  Search,
  MessageSquare,
  Users,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Profile",
    description: "Upload photos and choose your vibe.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Nearby",
    description: "Explore people around your location.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Start Conversation",
    description: "Use Talk Now or comments.",
  },
  {
    number: "04",
    icon: Users,
    title: "Meet & Connect",
    description: "Plan real-world experiences.",
  },
];

const Howitwork = () => {
  return (
    <section id="how-it-works" className="how-section">
      <div className="how-overlay"></div>

      <div className="how-container">
        {/* Heading */}
        <motion.div 
          className="how-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>
            Find Your Vibe in{" "}
            <span className="animated-gradient-text">4 Simple Steps</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          <div className="timeline-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`timeline-step ${
                    isEven
                      ? "left-layout"
                      : "right-layout"
                  }`}
                >
                  {/* Content */}
                  <motion.div 
                    className="step-content"
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div 
                      className="step-card"
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        borderColor: "rgba(123, 97, 255, 0.65)",
                        boxShadow: "0 16px 48px rgba(123, 97, 255, 0.25), 0 0 20px rgba(123, 97, 255, 0.15)"
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="step-flex">
                        <div className="step-icon">
                          <Icon />
                        </div>

                        <div>
                          <div className="step-number">
                            {step.number}
                          </div>

                          <h3>{step.title}</h3>

                          <p>{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Dot */}
                  <div className="timeline-dot">
                    <div className="dot-ping"></div>
                  </div>

                  {/* Spacer */}
                  <div className="step-spacer"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howitwork;