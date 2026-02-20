import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  glass = false,
  className = '',
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)' } : {}}
      className={`card ${variant === 'glass' || glass ? 'card-glass' : 'card-default'} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
