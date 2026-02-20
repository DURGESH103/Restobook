import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import Button from '../ui/Button';
import Card from '../ui/Card';
import './MenuCard.css';

const MenuCard = ({ item, onAddToCart }) => {
  const { name, description, price, category, image, rating = 4.5, isVegetarian } = item;

  return (
    <Card className="menu-card">
      <div className="menu-card-image-wrapper">
        <img 
          src={image || 'https://via.placeholder.com/400x300'} 
          alt={name}
          className="menu-card-image"
          loading="lazy"
        />
        {isVegetarian && (
          <span className="menu-badge veg">🌱 Veg</span>
        )}
        <div className="menu-card-overlay">
          <Button
            variant="primary"
            size="sm"
            icon={<FiShoppingCart />}
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="menu-card-content">
        <div className="menu-card-header">
          <span className="menu-category">{category}</span>
          <div className="menu-rating">
            <FiStar className="star-icon" />
            <span>{rating}</span>
          </div>
        </div>

        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-description">{description}</p>

        <div className="menu-card-footer">
          <span className="menu-price">${price}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="quick-add-btn"
            onClick={() => onAddToCart(item)}
          >
            <FiShoppingCart size={18} />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

export default MenuCard;
