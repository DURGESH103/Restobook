import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { menuAPI } from '../utils/api';
import MenuCard from '../components/MenuCard';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    isVeg: null,
    sortBy: 'default',
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAll();
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      // Demo data fallback
      const demoItems = [
        {
          _id: '1',
          name: 'Truffle Arancini',
          description: 'Crispy risotto balls with truffle oil and parmesan',
          price: 18.99,
          category: 'Starters',
          imageURL: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          isVeg: true,
          orderCount: 156
        },
        {
          _id: '2',
          name: 'Wagyu Beef Steak',
          description: 'Premium wagyu beef with roasted vegetables',
          price: 65.99,
          category: 'Main Course',
          imageURL: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.9,
          isVeg: false,
          orderCount: 89
        },
        {
          _id: '3',
          name: 'Chocolate Soufflé',
          description: 'Warm chocolate soufflé with vanilla bean ice cream',
          price: 14.99,
          category: 'Desserts',
          imageURL: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.7,
          isVeg: true,
          orderCount: 203
        },
        {
          _id: '4',
          name: 'Craft Cocktail',
          description: 'House special cocktail with premium spirits',
          price: 16.99,
          category: 'Drinks',
          imageURL: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          isVeg: true,
          orderCount: 124
        }
      ];
      setMenuItems(demoItems);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...menuItems];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Veg filter
    if (filters.isVeg !== null) {
      filtered = filtered.filter(item => item.isVeg === filters.isVeg);
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(item => item.rating >= filters.minRating);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [menuItems, selectedCategory, searchTerm, filters]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ isVeg: null, sortBy: 'default', minRating: 0 });
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen pt-20 section-padding bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-playfair font-bold mb-6 text-white"
          >
            Our <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Menu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover our carefully crafted culinary masterpieces
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="luxury-search-input"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="luxury-filter-btn"
            >
              <FiFilter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="luxury-filter-panel"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Veg Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gold mb-2">Diet</label>
                    <select
                      value={filters.isVeg === null ? 'all' : filters.isVeg.toString()}
                      onChange={(e) => handleFilterChange('isVeg', e.target.value === 'all' ? null : e.target.value === 'true')}
                      className="luxury-select"
                    >
                      <option value="all">All</option>
                      <option value="true">Vegetarian</option>
                      <option value="false">Non-Vegetarian</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gold mb-2">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="luxury-select"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gold mb-2">Min Rating</label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                      className="luxury-select"
                    >
                      <option value={0}>All Ratings</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button onClick={clearFilters} className="luxury-clear-btn">
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`luxury-category-tab ${
                selectedCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing {filteredItems.length} of {menuItems.length} dishes
          </p>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="luxury-loader" />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {filteredItems.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No dishes found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button onClick={clearFilters} className="luxury-btn-primary">
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;