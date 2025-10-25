import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonialAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialAPI.getApproved();
      setTestimonials(response.data);
    } catch (error) {
      // Demo testimonials
      const demoTestimonials = [
        {
          _id: '1',
          name: 'Sarah Johnson',
          rating: 5,
          message: 'Absolutely incredible dining experience! The food was exceptional and the service was impeccable.',
          createdAt: '2024-01-15'
        },
        {
          _id: '2',
          name: 'Michael Chen',
          rating: 5,
          message: 'Best restaurant in the city! Every dish was a masterpiece. Will definitely be coming back.',
          createdAt: '2024-01-10'
        },
        {
          _id: '3',
          name: 'Emily Davis',
          rating: 4,
          message: 'Great atmosphere and delicious food. The staff was very attentive and friendly.',
          createdAt: '2024-01-08'
        }
      ];
      setTestimonials(demoTestimonials);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await testimonialAPI.create(formData);
      toast.success('Thank you for your feedback! It will be reviewed before publishing.');
      setFormData({ name: '', email: '', rating: 5, message: '' });
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to submit testimonial. Please try again.');
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-20 section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-playfair font-bold mb-4">
            What Our <span className="text-gradient">Guests</span> Say
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Read reviews from our valued customers
          </p>
        </div>

        {/* Testimonials Carousel */}
        {testimonials.length > 0 && (
          <div className="relative mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonials[currentIndex].message}"
                </p>
                <h4 className="text-lg font-semibold">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-500 text-sm">
                  {new Date(testimonials[currentIndex].createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Add Testimonial Section */}
        <div className="text-center">
          {!showForm ? (
            isAuthenticated ? (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Share Your Experience
              </button>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-playfair font-bold mb-4">Share Your Experience</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Please login to share your dining experience with us.
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="/login" className="btn-primary">
                    Login
                  </a>
                  <a href="/register" className="btn-secondary">
                    Sign Up
                  </a>
                </div>
              </div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-playfair font-bold mb-6">Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={user?.name || formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    readOnly={!!user?.name}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold dark:bg-gray-700"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={user?.email || formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    readOnly={!!user?.email}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="focus:outline-none"
                      >
                        <FiStar
                          className={`w-8 h-8 ${
                            star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Share your experience..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gold dark:bg-gray-700"
                />

                <div className="flex gap-4 justify-center">
                  <button type="submit" className="btn-primary">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;