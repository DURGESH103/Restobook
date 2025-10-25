import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiUsers } from 'react-icons/fi';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Fresh ingredients sourced from local farms"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Fast Service",
      description: "Quick preparation without compromising quality"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Expert Chefs",
      description: "Michelin-trained chefs crafting every dish"
    }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* About Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-playfair font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                For over two decades, RestoBook has been synonymous with culinary excellence. 
                Our passion for creating extraordinary dining experiences drives everything we do.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                From farm-fresh ingredients to innovative cooking techniques, we craft each dish 
                with meticulous attention to detail and an unwavering commitment to quality.
              </p>
              <Link to="/menu" className="btn-primary">
                Explore Our Menu
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Restaurant interior"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold mb-12">
            Why Choose <span className="text-gradient">RestoBook</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg card-hover"
              >
                <div className="text-primary-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-playfair font-bold mb-6">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Reserve your table today and embark on a culinary journey like no other.
            </p>
            <Link to="/booking" className="bg-white text-primary-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Book Your Table
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;