import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiStar, FiHeart } from 'react-icons/fi';
import { addToCart } from '../utils/cart';
import { toast } from 'react-toastify';

const MenuCard = ({ item }) => {
  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="luxury-menu-card group"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={item.imageURL || item.image || `https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="luxury-badge">
            {item.category}
          </span>
        </div>
        
        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-4 left-4">
          {item.isVeg ? (
            <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="w-3 h-3 bg-green-600 rounded-full" />
              <span className="text-xs text-white font-medium">Veg</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="w-3 h-3 bg-red-600 rounded-full" />
              <span className="text-xs text-white font-medium">Non-Veg</span>
            </div>
          )}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white font-medium">{item.rating}</span>
          </div>
        )}

        {/* Popular Badge */}
        {item.orderCount > 100 && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-gold/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <FiHeart className="w-3 h-3 text-black" />
            <span className="text-xs text-black font-medium">Popular</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-playfair font-bold text-white group-hover:text-gold transition-colors duration-300">
            {item.name}
          </h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-gold">
              ${item.price}
            </span>
            {item.orderCount && (
              <p className="text-xs text-gray-400">{item.orderCount} orders</p>
            )}
          </div>
        </div>
        
        {/* Rating Stars */}
        {item.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(item.rating)}
            </div>
            <span className="text-sm text-gray-400">({item.rating})</span>
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Ingredients */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gold mb-2 font-medium">Key Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 3).map((ingredient, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gold/10 border border-gold/20 text-gold px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
              {item.ingredients.length > 3 && (
                <span className="text-xs text-gray-400 px-2 py-1">
                  +{item.ingredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!item.isAvailable}
          className={`luxury-add-to-cart-btn ${
            item.isAvailable ? 'active' : 'disabled'
          }`}
        >
          <FiPlus className="w-5 h-5" />
          <span>{item.isAvailable ? 'Add to Cart' : 'Unavailable'}</span>
          <div className="luxury-btn-glow" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuCard;