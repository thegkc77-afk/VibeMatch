// HowItWorks.jsx

import '../Style/howitwork.css';

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
        <div className="how-heading">
          <h2>
            Find Your Vibe in{" "}
            <span>4 Simple Steps</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          <div className="timeline-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className={`timeline-step ${
                    index % 2 === 0
                      ? "left-layout"
                      : "right-layout"
                  }`}
                >
                  {/* Content */}
                  <div className="step-content">
                    <div className="step-card">
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
                    </div>
                  </div>

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