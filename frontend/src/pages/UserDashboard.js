import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiX } from 'react-icons/fi';
import { userBookingAPI } from '../utils/api';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await userBookingAPI.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await userBookingAPI.cancel(id);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      CONFIRMED: 'bg-green-500/20 text-green-400 border-green-500/50',
      REJECTED: 'bg-red-500/20 text-red-400 border-red-500/50'
    };

    const icons = {
      PENDING: '⏳',
      CONFIRMED: '✅',
      REJECTED: '❌'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status]}`}>
        {icons[status]} {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 section-padding bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 section-padding bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-playfair font-bold text-white mb-4">
            My <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Bookings</span>
          </h1>
          <p className="text-gray-300 text-xl">View and manage your reservations</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No bookings yet</h3>
            <p className="text-gray-400 mb-6">Start by making your first reservation</p>
            <a href="/booking" className="luxury-btn">
              Book a Table
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gold/20 rounded-xl p-6 hover:border-gold/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-semibold text-white">{booking.name}</h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-5 h-5 text-gold" />
                        <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-5 h-5 text-gold" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUsers className="w-5 h-5 text-gold" />
                        <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <strong className="text-gold">Special Requests:</strong> {booking.specialRequests}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 text-sm text-gray-500">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {booking.status === 'PENDING' && (
                    <div>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                      >
                        <FiX className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
