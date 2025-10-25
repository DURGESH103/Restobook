import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  const luxurySlides = [
    {
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Exquisite',
      subtitle: 'Dining',
      description: 'Where culinary artistry meets unparalleled luxury in every extraordinary moment',
      accent: 'Michelin Excellence'
    },
    {
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Culinary',
      subtitle: 'Mastery',
      description: 'Experience the symphony of flavors orchestrated by world-renowned master chefs',
      accent: 'Award Winning'
    },
    {
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Premium',
      subtitle: 'Experience',
      description: 'Indulge in an atmosphere where every detail is crafted for perfection',
      accent: 'Luxury Redefined'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % luxurySlides.length);
    }, 6000);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [luxurySlides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <div className="absolute inset-0 z-0">
        {luxurySlides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            />
          </motion.div>
        ))}
        
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Floating Luxury Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-20 w-32 h-32 border border-gold/30 rounded-full opacity-60"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-32 right-32 w-24 h-24 border border-gold/20 rounded-full opacity-40"
      />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-60"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Accent Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-block mb-8"
          >
            <div className="luxury-badge">
              {luxurySlides[currentSlide].accent}
            </div>
          </motion.div>
          
          {/* Main Title */}
          <h1 className="text-7xl md:text-9xl font-playfair font-bold mb-6 leading-none">
            <motion.span 
              className="block text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              {luxurySlides[currentSlide].title}
            </motion.span>
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
            >
              {luxurySlides[currentSlide].subtitle}
            </motion.span>
          </h1>
          
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1.5, delay: 1 }}
            className="h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"
          />
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl mb-16 font-light leading-relaxed max-w-4xl mx-auto text-gray-200"
          >
            {luxurySlides[currentSlide].description}
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/menu" className="hero-btn-primary group">
              <span className="relative z-10">Explore Our Menu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-yellow-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/booking" className="hero-btn-secondary group">
              <span className="relative z-10">Reserve Experience</span>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        {luxurySlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-gradient-to-r from-gold to-yellow-500' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="luxury-scroll-indicator">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-4 bg-gradient-to-b from-gold to-yellow-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;