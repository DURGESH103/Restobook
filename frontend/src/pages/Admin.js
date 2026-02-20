import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiCalendar, FiClock, FiUsers, FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import { menuAPI, adminBookingAPI, testimonialAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [menuItems, setMenuItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Starters',
    imageURL: '',
    rating: 4.5,
    isVeg: false,
    ingredients: '',
    isAvailable: true
  });

  const fetchData = useCallback(async () => {
    try {
      if (activeTab === 'menu') {
        const response = await menuAPI.getAdminMenu();
        setMenuItems(response.data);
      } else if (activeTab === 'bookings') {
        const response = await adminBookingAPI.getAll();
        setBookings(response.data);
      } else if (activeTab === 'testimonials') {
        const response = await testimonialAPI.getAll();
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...menuForm,
        price: parseFloat(menuForm.price),
        rating: parseFloat(menuForm.rating),
        ingredients: menuForm.ingredients.split(',').map(i => i.trim()).filter(i => i)
      };

      if (editingItem) {
        await menuAPI.update(editingItem._id, formData);
        toast.success('Menu item updated successfully');
      } else {
        await menuAPI.create(formData);
        toast.success('Menu item created successfully');
      }

      setShowForm(false);
      setEditingItem(null);
      resetMenuForm();
      fetchData();
    } catch (error) {
      toast.error('Failed to save menu item');
    }
  };

  const resetMenuForm = () => {
    setMenuForm({
      name: '',
      description: '',
      price: '',
      category: 'Starters',
      imageURL: '',
      rating: 4.5,
      isVeg: false,
      ingredients: '',
      isAvailable: true
    });
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'menu') {
        await menuAPI.delete(id);
      } else if (type === 'booking') {
        await adminBookingAPI.delete(id);
      } else if (type === 'testimonial') {
        await testimonialAPI.delete(id);
      }
      toast.success('Item deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const handleApproveTestimonial = async (id) => {
    try {
      await testimonialAPI.approve(id);
      toast.success('Testimonial approved');
      fetchData();
    } catch (error) {
      toast.error('Failed to approve testimonial');
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      imageURL: item.imageURL || item.image || '',
      rating: item.rating || 4.5,
      isVeg: item.isVeg || false,
      ingredients: item.ingredients?.join(', ') || '',
      isAvailable: item.isAvailable
    });
    setShowForm(true);
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await adminBookingAPI.updateStatus(id, status);
      toast.success(`Booking ${status.toLowerCase()}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (bookingFilter !== 'all' && booking.status !== bookingFilter.toUpperCase()) return false;
    if (dateFilter && !booking.date.includes(dateFilter)) return false;
    return true;
  });

  const getBookingStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.date.includes(today));
    const pending = bookings.filter(b => b.status === 'PENDING');
    const confirmed = bookings.filter(b => b.status === 'CONFIRMED');
    const rejected = bookings.filter(b => b.status === 'REJECTED');
    const totalGuests = bookings.reduce((sum, b) => sum + (b.guests || 0), 0);
    
    return {
      total: bookings.length,
      today: todayBookings.length,
      pending: pending.length,
      confirmed: confirmed.length,
      rejected: rejected.length,
      totalGuests
    };
  };

  const stats = getBookingStats();

  return (
    <div className="min-h-screen pt-20 section-padding bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-playfair font-bold text-white mb-4">
            Admin <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-gray-300 text-xl">Manage your restaurant operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          {[
            { key: 'bookings', label: 'Bookings', count: bookings.length },
            { key: 'menu', label: 'Menu', count: menuItems.length },
            { key: 'testimonials', label: 'Testimonials', count: testimonials.length }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              className={`luxury-admin-tab ${activeTab === tab.key ? 'active' : ''}`}
            >
              {tab.label}
              <span className="luxury-tab-badge">{tab.count}</span>
            </motion.button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            {/* Booking Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              <div className="luxury-stat-card">
                <div className="text-3xl font-bold text-gold">{stats.total}</div>
                <div className="text-gray-400">Total</div>
              </div>
              <div className="luxury-stat-card">
                <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
                <div className="text-gray-400">Pending</div>
              </div>
              <div className="luxury-stat-card">
                <div className="text-3xl font-bold text-green-400">{stats.confirmed}</div>
                <div className="text-gray-400">Confirmed</div>
              </div>
              <div className="luxury-stat-card">
                <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
                <div className="text-gray-400">Rejected</div>
              </div>
              <div className="luxury-stat-card">
                <div className="text-3xl font-bold text-purple-400">{stats.totalGuests}</div>
                <div className="text-gray-400">Total Guests</div>
              </div>
            </div>

            {/* Filters */}
            <div className="luxury-filter-bar">
              <div className="flex gap-4">
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="luxury-filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="luxury-filter-select"
                />
              </div>
              
              <button className="luxury-export-btn">
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredBookings.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="luxury-booking-card"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Customer Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{booking.name}</h3>
                          <span className={`luxury-status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FiMail className="w-4 h-4 text-gold" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FiPhone className="w-4 h-4 text-gold" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FiCalendar className="w-4 h-4 text-gold" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FiClock className="w-4 h-4 text-gold" />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FiUsers className="w-4 h-4 text-gold" />
                            {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                          </div>
                        </div>
                        
                        {booking.specialRequests && (
                          <div className="mt-3 p-3 bg-gold/10 border border-gold/20 rounded-lg">
                            <p className="text-sm text-gray-300">
                              <strong className="text-gold">Special Requests:</strong> {booking.specialRequests}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {booking.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'CONFIRMED')}
                              className="luxury-action-btn confirm"
                              title="Approve"
                            >
                              <FiCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'REJECTED')}
                              className="luxury-action-btn cancel"
                              title="Reject"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(booking._id, 'booking')}
                          className="luxury-action-btn delete"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No bookings found</h3>
                <p className="text-gray-400">No bookings match your current filters</p>
              </div>
            )}
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-white">Menu Management</h2>
              <button
                onClick={() => setShowForm(true)}
                className="luxury-add-btn"
              >
                <FiPlus className="w-5 h-5" />
                Add Menu Item
              </button>
            </div>

            {/* Menu Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="luxury-form-card mb-8"
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </h3>
                  
                  <form onSubmit={handleMenuSubmit} className="grid md:grid-cols-2 gap-6">
                    <div className="luxury-input-group">
                      <label className="luxury-label">Item Name</label>
                      <input
                        type="text"
                        value={menuForm.name}
                        onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
                        required
                        className="luxury-input"
                        placeholder="Enter item name"
                      />
                    </div>

                    <div className="luxury-input-group">
                      <label className="luxury-label">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={menuForm.price}
                        onChange={(e) => setMenuForm({...menuForm, price: e.target.value})}
                        required
                        className="luxury-input"
                        placeholder="0.00"
                      />
                    </div>

                    <div className="luxury-input-group">
                      <label className="luxury-label">Category</label>
                      <select
                        value={menuForm.category}
                        onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                        className="luxury-input"
                      >
                        <option value="Starters">Starters</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                      </select>
                    </div>

                    <div className="luxury-input-group">
                      <label className="luxury-label">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={menuForm.rating}
                        onChange={(e) => setMenuForm({...menuForm, rating: e.target.value})}
                        className="luxury-input"
                      />
                    </div>

                    <div className="luxury-input-group md:col-span-2">
                      <label className="luxury-label">Image URL</label>
                      <input
                        type="url"
                        value={menuForm.imageURL}
                        onChange={(e) => setMenuForm({...menuForm, imageURL: e.target.value})}
                        className="luxury-input"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="luxury-input-group md:col-span-2">
                      <label className="luxury-label">Description</label>
                      <textarea
                        value={menuForm.description}
                        onChange={(e) => setMenuForm({...menuForm, description: e.target.value})}
                        required
                        rows={3}
                        className="luxury-input resize-none"
                        placeholder="Describe the dish..."
                      />
                    </div>

                    <div className="luxury-input-group md:col-span-2">
                      <label className="luxury-label">Ingredients (comma separated)</label>
                      <input
                        type="text"
                        value={menuForm.ingredients}
                        onChange={(e) => setMenuForm({...menuForm, ingredients: e.target.value})}
                        className="luxury-input"
                        placeholder="Ingredient 1, Ingredient 2, ..."
                      />
                    </div>

                    <div className="flex items-center gap-6 md:col-span-2">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          checked={menuForm.isVeg}
                          onChange={(e) => setMenuForm({...menuForm, isVeg: e.target.checked})}
                          className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold"
                        />
                        Vegetarian
                      </label>
                      
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          checked={menuForm.isAvailable}
                          onChange={(e) => setMenuForm({...menuForm, isAvailable: e.target.checked})}
                          className="w-4 h-4 text-gold bg-gray-100 border-gray-300 rounded focus:ring-gold"
                        />
                        Available
                      </label>
                    </div>

                    <div className="flex gap-4 md:col-span-2">
                      <button type="submit" className="luxury-submit-btn">
                        {editingItem ? 'Update Item' : 'Create Item'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingItem(null);
                          resetMenuForm();
                        }}
                        className="luxury-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  className="luxury-menu-admin-card"
                >
                  <div className="relative h-48 rounded-t-xl overflow-hidden">
                    <img
                      src={item.imageURL || item.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="luxury-badge">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <span className="text-xl font-bold text-gold">${item.price}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {item.isVeg && <span className="text-green-400 text-xs">🌱 Veg</span>}
                        <span className={`text-xs ${item.isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="luxury-action-btn edit"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, 'menu')}
                          className="luxury-action-btn delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-3xl font-semibold text-white mb-8">Testimonials Management</h2>
            
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial._id}
                  layout
                  className="luxury-testimonial-card"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                        {!testimonial.isApproved && (
                          <span className="luxury-status-badge pending">Pending</span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{testimonial.email}</p>
                      <p className="text-gray-300">{testimonial.message}</p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {!testimonial.isApproved && (
                        <button
                          onClick={() => handleApproveTestimonial(testimonial._id)}
                          className="luxury-action-btn confirm"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(testimonial._id, 'testimonial')}
                        className="luxury-action-btn delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;