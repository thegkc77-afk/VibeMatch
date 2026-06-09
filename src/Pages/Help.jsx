// Help.jsx

import React, { useState } from "react";
import "../Style/help.css";
import Footer from "../Component/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send, CheckCircle, Clock } from "lucide-react";

function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setSubmitted(false);
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <>
      <section className="help-section">
        {/* Background Decorative Orbs */}
        <motion.div
          className="help-orb help-orb-purple"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="help-orb help-orb-pink"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="help-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="help-header" variants={itemVariants}>
            <h1>
              How Can We <span className="animated-gradient-text">Help?</span>
            </h1>
            <p>
              Have questions or feedback? Connect with the VibeMatch support
              team and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="help-grid">
            {/* Support Info Cards */}
            <motion.div className="help-info-column" variants={containerVariants}>
              {/* Card 1: Email */}
              <motion.div className="support-card" variants={itemVariants}>
                <div className="support-icon-wrapper">
                  <Mail className="support-icon" />
                </div>
                <div className="support-details">
                  <h3>Email Us</h3>
                  <p>Shoot us a message directly. We typically reply within 12 hours.</p>
                  <a href="mailto:support@vibematch.com" className="support-link">
                    support@vibematch.com
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Live Chat */}
              <motion.div className="support-card" variants={itemVariants}>
                <div className="support-icon-wrapper">
                  <MessageSquare className="support-icon" />
                </div>
                <div className="support-details">
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                    <h3>Live Chat</h3>
                    <span className="status-badge">
                      <span className="status-dot"></span>
                      Online
                    </span>
                  </div>
                  <p>Instantly chat with our team or support assistant for quick help.</p>
                  <a href="#" className="support-link" onClick={(e) => e.preventDefault()}>
                    Start Live Session
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Office Address */}
              <motion.div className="support-card" variants={itemVariants}>
                <div className="support-icon-wrapper">
                  <MapPin className="support-icon" />
                </div>
                <div className="support-details">
                  <h3>Headquarters</h3>
                  <p>Patna, Bihar.</p>
                  <span className="support-link" style={{ cursor: "default" }}>
                    INDIA
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Interactive Contact Form Card */}
            <motion.div className="help-form-card" variants={itemVariants}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="help-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2>Send a Message</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-input"
                        placeholder="What is this about?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-input"
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="help-submit-btn">
                      <span>Send Message</span>
                      <Send className="submit-icon" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    className="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.div
                      className="success-icon-wrapper"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle className="success-icon" />
                    </motion.div>
                    <h2>Message Sent!</h2>
                    <p>
                      Thank you for reaching out, <strong>{formData.name}</strong>.
                      Our team has received your message and will respond to you at
                      <strong> {formData.email}</strong> shortly.
                    </p>
                    <button className="success-back-btn" onClick={handleReset}>
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}

export default Help;