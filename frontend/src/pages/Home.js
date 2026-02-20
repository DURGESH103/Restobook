import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AOS from 'aos';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiShield } from 'react-icons/fi';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    AOS.init({ duration: 1200, easing: 'ease-out-cubic' });
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const luxuryFeatures = [
    {
      icon: <FiAward className="w-10 h-10" />,
      title: "Michelin Excellence",
      description: "Award-winning culinary artistry recognized globally",
      gradient: "from-gold-400 to-yellow-600"
    },
    {
      icon: <FiHeart className="w-10 h-10" />,
      title: "Passionate Craft",
      description: "Every dish crafted with love and precision",
      gradient: "from-rose-400 to-pink-600"
    },
    {
      icon: <FiShield className="w-10 h-10" />,
      title: "Premium Quality",
      description: "Only the finest ingredients, sourced responsibly",
      gradient: "from-emerald-400 to-teal-600"
    }
  ];

  const stats = [
    { number: "25+", label: "Years of Excellence" },
    { number: "50K+", label: "Happy Guests" },
    { number: "200+", label: "Signature Dishes" },
    { number: "15+", label: "Awards Won" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-gold/10 to-yellow-500/10 blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-gradient-to-l from-rose-500/10 to-pink-500/10 blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
      </div>

      <HeroSection />
      
      {/* Luxury About Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-gold rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-gold/30 rounded-full" />
              <h2 className="text-6xl font-playfair font-bold mb-8 text-white leading-tight">
                Culinary <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Mastery</span>
                <br />Redefined
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mb-8" />
              <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                In the heart of culinary innovation, RestoBook stands as a beacon of gastronomic excellence. 
                Our master chefs orchestrate symphonies of flavor, transforming the finest ingredients into 
                extraordinary experiences that transcend ordinary dining.
              </p>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light">
                Each dish tells a story of passion, precision, and artistry—a testament to our unwavering 
                commitment to culinary perfection and your unforgettable journey.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/menu" className="luxury-btn group">
                  <span className="relative z-10">Discover Our Artistry</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold to-yellow-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <img
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Luxury restaurant interior"
                  className="relative rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gold via-yellow-500 to-gold">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center text-black"
              >
                <div className="text-4xl md:text-5xl font-playfair font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base font-medium opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Features Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
              The <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">RestoBook</span> Experience
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8" />
            <p className="text-gray-300 text-xl max-w-3xl mx-auto font-light">
              Where luxury meets culinary innovation, creating moments that linger in memory long after the last bite
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {luxuryFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="luxury-card">
                  <div className={`luxury-icon bg-gradient-to-br ${feature.gradient}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center text-white relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8 leading-tight">
              Begin Your
              <br />
              <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
                Culinary Journey
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-12" />
            <p className="text-xl md:text-2xl mb-16 opacity-90 font-light leading-relaxed max-w-4xl mx-auto">
              Reserve your table and step into a world where every moment is crafted to perfection, 
              every flavor tells a story, and every visit becomes an unforgettable memory.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link to="/booking" className="premium-cta-btn group">
                <span className="relative z-10 text-black font-semibold text-lg">Reserve Your Experience</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold rounded-full transform scale-110 group-hover:scale-125 transition-transform duration-500" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;