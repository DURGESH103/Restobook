import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';
import { addToCart } from '../utils/cart';
import { toast } from 'react-toastify';

const MenuCard = ({ item, index }) => {
  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-premium overflow-hidden card-hover group border border-gold/10"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image || `https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {item.category}
          </span>
        </div>
        {item.spiceLevel && item.spiceLevel !== 'Mild' && (
          <div className="absolute top-4 left-4 flex items-center">
            <FiStar className="text-red-500 w-4 h-4" />
            <span className="text-white text-sm ml-1">{item.spiceLevel}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-playfair font-semibold text-gray-800 dark:text-white">
            {item.name}
          </h3>
          <span className="text-2xl font-bold text-gold">
            ${item.price}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {item.description}
        </p>

        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 3).map((ingredient, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
              {item.ingredients.length > 3 && (
                <span className="text-xs text-gray-500">+{item.ingredients.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!item.isAvailable}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 micro-interaction ${
            item.isAvailable
              ? 'bg-gold hover:bg-gold-700 text-black hover:shadow-premium transform hover:-translate-y-1'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FiPlus className="w-4 h-4" />
          {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </motion.div>
  );
};

export default MenuCard;