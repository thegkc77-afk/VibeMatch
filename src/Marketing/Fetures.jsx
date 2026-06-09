import "../Style/features.css";
import { motion } from "framer-motion";

import {  MapPin,  Smile,  Zap,  Camera,  MessageCircle,  Pizza,} from "lucide-react";

const Features = () => {
  const featuresData = [
    {
      icon: <MapPin />,
      title: "Nearby Discovery",
      desc: "Find people within 1–5 km radius.",
      color: "purple",
    },
    {
      icon: <Smile />,
      title: "Mood Matching",
      desc: "Match based on current vibe and intent.",
      color: "pink",
    },
    {
      icon: <Zap />,
      title: "Talk Now",
      desc: "Start instant real-time conversations.",
      color: "purple",
    },
    {
      icon: <Camera />,
      title: "Social Feed",
      desc: "Share stories, posts, and moments.",
      color: "pink",
    },
    {
      icon: <MessageCircle />,
      title: "Icebreakers",
      desc: "Smart prompts to start conversations.",
      color: "purple",
    },
    {
      icon: <Pizza />,
      title: "Meet Planning",
      desc: "Plan nearby hangouts and activities.",
      color: "pink",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="features-section">

      {/* Background Glow */}
      <div className="bg-glow"></div>

      {/* Heading */}
      <motion.h1 
        className="features-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Everything You Need To Start <br/>
        <span className="animated-gradient-text">Real Connections</span>
      </motion.h1>

      {/* Cards */}
      <motion.div 
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {featuresData.map((item, index) => (
          <motion.div 
            className={`feature-card ${item.color}`} 
            key={index}
            variants={cardVariants}
          >
            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;