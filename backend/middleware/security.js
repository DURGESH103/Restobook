const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: 'Too many attempts, try again later'
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

// Security headers - Don't override CORS
const securityHeaders = helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
});

// Sanitize data
const sanitize = mongoSanitize({ replaceWith: '_' });

module.exports = { authLimiter, apiLimiter, securityHeaders, sanitize };
