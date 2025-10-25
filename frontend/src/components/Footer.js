import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-gradient mb-4">RestoBook</h3>
            <p className="text-gray-400 mb-4">Experience culinary excellence in an atmosphere of refined elegance.</p>
            <div className="flex space-x-4">
              <FiFacebook className="w-5 h-5 hover:text-primary-500 cursor-pointer transition-colors" />
              <FiInstagram className="w-5 h-5 hover:text-primary-500 cursor-pointer transition-colors" />
              <FiTwitter className="w-5 h-5 hover:text-primary-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/menu" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="/booking" className="hover:text-white transition-colors">Reservations</a></li>
              <li><a href="/gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                <span>info@restobook.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                <span>123 Fine Dining St, City</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Opening Hours</h4>
            <div className="space-y-2 text-gray-400">
              <div>Mon - Thu: 5:00 PM - 10:00 PM</div>
              <div>Fri - Sat: 5:00 PM - 11:00 PM</div>
              <div>Sunday: 4:00 PM - 9:00 PM</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2024 RestoBook. All rights reserved.</p>
          <a href="/admin" className="text-gold hover:text-gold-400 transition-colors mt-2 md:mt-0">
            Admin Dashboard
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;