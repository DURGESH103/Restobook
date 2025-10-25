import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Gallery from '../components/Gallery';

const GalleryPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen pt-20 section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-playfair font-bold mb-4"
          >
            Our <span className="text-gradient">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Take a visual journey through our culinary creations and elegant dining spaces
          </motion.p>
        </div>

        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;