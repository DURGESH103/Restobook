import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuCard from '../components/MenuCard';
import { menuAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Drinks'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await menuAPI.getAll();
      setMenuItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
      // Fallback data for demo
      const demoItems = [
        {
          _id: '1',
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with herbs and lemon',
          price: 28,
          category: 'Dinner',
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isAvailable: true,
          ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive Oil']
        },
        {
          _id: '2',
          name: 'Truffle Pasta',
          description: 'Handmade pasta with black truffle and parmesan',
          price: 32,
          category: 'Dinner',
          image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isAvailable: true,
          ingredients: ['Pasta', 'Black Truffle', 'Parmesan', 'Cream']
        },
        {
          _id: '3',
          name: 'Avocado Toast',
          description: 'Sourdough bread with smashed avocado and poached egg',
          price: 16,
          category: 'Breakfast',
          image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isAvailable: true,
          ingredients: ['Sourdough', 'Avocado', 'Egg', 'Microgreens']
        },
        {
          _id: '4',
          name: 'Craft Cocktail',
          description: 'House special with premium spirits and fresh ingredients',
          price: 14,
          category: 'Drinks',
          image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isAvailable: true,
          ingredients: ['Premium Spirits', 'Fresh Herbs', 'Citrus']
        }
      ];
      setMenuItems(demoItems);
      setFilteredItems(demoItems);
      toast.info('Using demo data - connect to backend for live menu');
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === category));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gradient">Menu</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, crafted with the finest ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => filterByCategory(category)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 micro-interaction ${
                activeCategory === category
                  ? 'bg-gold text-black shadow-premium'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gold/10 dark:hover:bg-gray-700 border border-gold/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <MenuCard key={item._id} item={item} index={index} />
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;