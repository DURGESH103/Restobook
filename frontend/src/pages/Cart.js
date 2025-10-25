import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../utils/cart';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = getCart();
    setCartItems(cart);
    setLoading(false);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    updateCartItem(itemId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    loadCart();
    window.dispatchEvent(new Event('storage'));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    clearCart();
    loadCart();
    window.dispatchEvent(new Event('storage'));
    toast.success('Cart cleared');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const getRecommendedItems = () => {
    // Mock recommended items based on cart categories
    const categories = [...new Set(cartItems.map(item => item.category))];
    return [
      {
        _id: 'rec1',
        name: 'Garlic Bread',
        price: 8.99,
        imageURL: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'Starters'
      },
      {
        _id: 'rec2',
        name: 'Tiramisu',
        price: 12.99,
        imageURL: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        category: 'Desserts'
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="luxury-loader" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 section-padding bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-playfair font-bold mb-4 text-white"
          >
            Your <span className="text-gradient bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">Cart</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </motion.p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h3 className="text-3xl font-semibold text-white mb-4">Your cart is empty</h3>
            <p className="text-gray-400 mb-8 text-lg">
              Discover our delicious menu and add some items to get started
            </p>
            <Link to="/menu" className="luxury-btn-primary inline-flex items-center gap-3">
              <FiShoppingBag className="w-5 h-5" />
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-white">Cart Items</h2>
                <button
                  onClick={handleClearCart}
                  className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1 }}
                      className="luxury-cart-item"
                    >
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageURL || item.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-1">{item.description}</p>
                          
                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                className="luxury-quantity-btn"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="text-white font-semibold w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                className="luxury-quantity-btn"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-xl font-bold text-gold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-400">
                                ${item.price} each
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="luxury-order-summary sticky top-24"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (8%)</span>
                    <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gold/20 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-gold">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/booking"
                  className="luxury-checkout-btn w-full flex items-center justify-center gap-3"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight className="w-5 h-5" />
                </Link>

                <div className="mt-6 text-center">
                  <Link to="/menu" className="text-gold hover:text-yellow-400 transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>

              {/* Recommended Items */}
              {getRecommendedItems().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 luxury-recommendations"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Recommended for You</h3>
                  <div className="space-y-4">
                    {getRecommendedItems().map((item) => (
                      <div key={item._id} className="luxury-recommendation-item">
                        <img
                          src={item.imageURL}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-gold font-semibold">${item.price}</p>
                        </div>
                        <button className="luxury-add-rec-btn">
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;