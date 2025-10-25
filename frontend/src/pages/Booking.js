import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiUsers, FiUser, FiMail, FiPhone, FiCheck, FiX } from 'react-icons/fi';

const Booking = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await bookingAPI.create(formData);
      setBookingDetails({ ...formData, ...response.data.booking });
      setShowSuccessModal(true);
      toast.success('Booking confirmed! Check your email for details.');
      
      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen pt-20 section-padding bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-playfair font-bold mb-6 text-white"
          >
            Reserve Your <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Table</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Book your extraordinary dining experience with us
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="luxury-booking-form"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-playfair font-bold text-white mb-2">Reservation Details</h2>
              <p className="text-gray-400">Please fill in your booking information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="luxury-input-group">
                  <label className="luxury-label">
                    <FiUser className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    placeholder="Your full name"
                    readOnly={!!user?.name}
                  />
                </div>
                
                <div className="luxury-input-group">
                  <label className="luxury-label">
                    <FiMail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    placeholder="your@email.com"
                    readOnly={!!user?.email}
                  />
                </div>
              </div>

              <div className="luxury-input-group">
                <label className="luxury-label">
                  <FiPhone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="luxury-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="luxury-input-group">
                  <label className="luxury-label">
                    <FiCalendar className="w-4 h-4" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    className="luxury-input"
                  />
                </div>

                <div className="luxury-input-group">
                  <label className="luxury-label">
                    <FiClock className="w-4 h-4" />
                    Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="luxury-input-group">
                  <label className="luxury-label">
                    <FiUsers className="w-4 h-4" />
                    Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="luxury-input"
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="luxury-input-group">
                <label className="luxury-label">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="luxury-input resize-none"
                  placeholder="Any dietary restrictions, allergies, or special occasions?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="luxury-submit-btn"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Reserve Table'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="luxury-info-card">
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">Reservation Policy</h3>
              <div className="space-y-4">
                {[
                  'Reservations are held for 15 minutes past booking time',
                  'Cancellations must be made 24 hours in advance',
                  'Large parties (8+) may require a deposit',
                  'Smart casual dress code is preferred',
                  'Children are welcome with advance notice'
                ].map((policy, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{policy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="luxury-info-card">
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-gold" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-gold" />
                  <span className="text-gray-300">reservations@restobook.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gold mt-0.5">📍</div>
                  <span className="text-gray-300">123 Fine Dining Street<br />Culinary District, City 12345</span>
                </div>
              </div>
            </div>

            <div className="luxury-hours-card">
              <h3 className="text-2xl font-playfair font-bold text-black mb-6">Opening Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Thursday</span>
                  <span>5:00 PM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Friday - Saturday</span>
                  <span>5:00 PM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>4:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="luxury-success-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheck className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-playfair font-bold text-white mb-4">
                  Reservation Confirmed!
                </h2>
                <p className="text-gray-300 text-lg">
                  Your table has been successfully booked. Check your email for confirmation details.
                </p>
              </div>

              {bookingDetails && (
                <div className="luxury-booking-summary">
                  <h3 className="text-xl font-semibold text-white mb-4">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Date:</span>
                      <p className="text-white font-medium">
                        {new Date(bookingDetails.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Time:</span>
                      <p className="text-white font-medium">{bookingDetails.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Guests:</span>
                      <p className="text-white font-medium">
                        {bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <p className="text-green-400 font-medium">Confirmed</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 luxury-modal-btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.href = '/menu';
                  }}
                  className="flex-1 luxury-modal-btn-primary"
                >
                  Browse Menu
                </button>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;