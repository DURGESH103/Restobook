import React from 'react';
import { motion } from 'framer-motion';

// Premium Button Component
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gold text-white hover:bg-gold-600 hover:shadow-gold focus:ring-gold/30',
    secondary: 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-white hover:shadow-gold focus:ring-gold/30',
    ghost: 'bg-transparent text-gray-700 dark:text-light-secondary hover:bg-gray-50 dark:hover:bg-dark-tertiary focus:ring-gray-200',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Premium Card Component
export const Card = ({ children, elevated = false, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${elevated ? 'card-elevated' : 'card'} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Premium Input Component
export const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-light-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`input ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

// Premium Textarea Component
export const Textarea = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-light-secondary mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`input resize-none ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

// Premium Badge Component
export const Badge = ({ children, variant = 'gold', className = '' }) => {
  const variants = {
    gold: 'badge-gold',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  };
  
  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Section Header Component
export const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {subtitle && (
        <p className="text-sm font-medium text-gold tracking-wider uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-h2 font-serif text-gray-900 dark:text-light mb-4">
        {title}
      </h2>
      <div className={`accent-line ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};

// Stats Card Component
export const StatCard = ({ icon: Icon, label, value, trend, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`stat-card ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-light-secondary mb-1">
            {label}
          </p>
          <p className="text-3xl font-serif font-medium text-gray-900 dark:text-light">
            {value}
          </p>
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-gold/10 rounded-xl">
            <Icon className="w-6 h-6 text-gold" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Empty State Component
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`text-center py-16 ${className}`}
    >
      {Icon && (
        <div className="inline-flex p-4 bg-gray-50 dark:bg-dark-tertiary rounded-2xl mb-4">
          <Icon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
        </div>
      )}
      <h3 className="text-xl font-serif font-medium text-gray-900 dark:text-light mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-light-secondary mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action}
    </motion.div>
  );
};

// Loading Spinner Component
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className={`inline-block ${sizes[size]} ${className}`}>
      <div className="w-full h-full border-3 border-gray-200 dark:border-gray-700 border-t-gold rounded-full animate-spin" />
    </div>
  );
};
