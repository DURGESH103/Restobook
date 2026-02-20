import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiBook, FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-badge"
          >
            Premium Dining Experience
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-title"
          >
            Exquisite Flavors,
            <span className="text-gradient"> Unforgettable Moments</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-description"
          >
            Experience culinary excellence in an elegant atmosphere. 
            Reserve your table today and indulge in a journey of taste.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="hero-actions"
          >
            <Link to="/booking">
              <Button variant="primary" size="lg" icon={<FiCalendar />}>
                Book a Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="secondary" size="lg" icon={<FiBook />}>
                View Menu
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hero-stats"
        >
          <div className="stat-item">
            <h3 className="stat-number">15+</h3>
            <p className="stat-label">Years Experience</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Menu Items</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="stat-number">10K+</h3>
            <p className="stat-label">Happy Customers</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="scroll-indicator"
      >
        <span>Scroll to explore</span>
        <FiArrowRight className="scroll-arrow" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
