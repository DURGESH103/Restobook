// Production Logger - Disables console logs in production

const isDevelopment = process.env.NODE_ENV !== 'production';

const logger = {
  log: (...args) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args) => {
    console.error(...args); // Always log errors
  },
  warn: (...args) => {
    if (isDevelopment) console.warn(...args);
  },
  info: (...args) => {
    if (isDevelopment) console.info(...args);
  },
  debug: (...args) => {
    if (isDevelopment) console.debug(...args);
  }
};

module.exports = logger;

// Usage: const logger = require('./utils/logger');
// logger.log('This only shows in development');
// logger.error('This always shows');
