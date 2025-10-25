import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { menuAPI, bookingAPI, testimonialAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Breakfast',
    image: '',
    ingredients: '',
    isAvailable: true
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'menu') {
        const response = await menuAPI.getAll();
        setMenuItems(response.data);
      } else if (activeTab === 'bookings') {
        const response = await bookingAPI.getAll();
        setBookings(response.data);
      } else if (activeTab === 'testimonials') {
        const response = await testimonialAPI.getAll();
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...menuForm,
        price: parseFloat(menuForm.price),
        ingredients: menuForm.ingredients.split(',').map(i => i.trim())
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
      setMenuForm({
        name: '',
        description: '',
        price: '',
        category: 'Breakfast',
        image: '',
        ingredients: '',
        isAvailable: true
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to save menu item');
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'menu') {
        await menuAPI.delete(id);
      } else if (type === 'booking') {
        await bookingAPI.delete(id);
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
      image: item.image,
      ingredients: item.ingredients?.join(', ') || '',
      isAvailable: item.isAvailable
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen pt-20 section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold mb-8 text-center">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>

        <div className="flex justify-center mb-8">
          {['menu', 'bookings', 'testimonials'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gold text-black'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Menu Items</h2>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <form onSubmit={handleMenuSubmit} className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
                    required
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({...menuForm, price: e.target.value})}
                    required
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={menuForm.image}
                    onChange={(e) => setMenuForm({...menuForm, image: e.target.value})}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <textarea
                    placeholder="Description"
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({...menuForm, description: e.target.value})}
                    required
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Ingredients (comma separated)"
                    value={menuForm.ingredients}
                    onChange={(e) => setMenuForm({...menuForm, ingredients: e.target.value})}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 md:col-span-2"
                  />
                  <div className="flex items-center gap-4 md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={menuForm.isAvailable}
                        onChange={(e) => setMenuForm({...menuForm, isAvailable: e.target.checked})}
                      />
                      Available
                    </label>
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary">
                        {editingItem ? 'Update' : 'Create'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="grid gap-4">
              {menuItems.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.category} - ${item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, 'menu')}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Bookings</h2>
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{booking.email}</p>
                      <p className="text-sm">{new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                      <p className="text-sm">{booking.guests} guests</p>
                      {booking.specialRequests && (
                        <p className="text-sm mt-2 italic">{booking.specialRequests}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      <button
                        onClick={() => handleDelete(booking._id, 'booking')}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.email}</p>
                      <div className="flex items-center gap-1 my-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-sm">{testimonial.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {!testimonial.isApproved && (
                        <button
                          onClick={() => handleApproveTestimonial(testimonial._id)}
                          className="p-2 text-green-500 hover:bg-green-50 rounded"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(testimonial._id, 'testimonial')}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;