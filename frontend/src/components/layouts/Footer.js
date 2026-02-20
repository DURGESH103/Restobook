import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-logo">RestoBook</h3>
            <p className="footer-description">
              Experience culinary excellence in an elegant atmosphere. 
              Your perfect dining destination.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FiTwitter />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/booking">Book Table</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Opening Hours</h4>
            <ul className="footer-hours">
              <li>
                <span>Monday - Friday</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li>
                <span>Saturday - Sunday</span>
                <span>10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <FiMapPin />
                <span>123 Restaurant St, Food City, FC 12345</span>
              </li>
              <li>
                <FiPhone />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FiMail />
                <span>info@restobook.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} RestoBook. All rights reserved.
          </p>
          <p className="footer-credit">
            Made with <FiHeart className="heart-icon" /> by Your Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
