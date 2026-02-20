const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Convert role to uppercase for consistency
    const userRole = role ? role.toUpperCase() : 'USER';

    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: userRole
    });
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Test endpoint to verify backend is working
router.post('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working',
    body: req.body,
    hasJWT: !!process.env.JWT_SECRET,
    hasDB: !!process.env.MONGODB_URI
  });
});

// Login user - Production Safe
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      console.log('[LOGIN] Missing credentials');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Check JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('[LOGIN] JWT_SECRET is not defined!');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // 3. Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log(`[LOGIN] User not found: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Check if comparePassword method exists
    if (typeof user.comparePassword !== 'function') {
      console.error('[LOGIN] comparePassword method not found on user model');
      return res.status(500).json({ message: 'Server error' });
    }

    // 5. Compare password safely
    let isMatch = false;
    try {
      isMatch = await user.comparePassword(password);
    } catch (bcryptError) {
      console.error('[LOGIN] Bcrypt error:', bcryptError.message);
      return res.status(500).json({ message: 'Authentication error' });
    }

    if (!isMatch) {
      console.log(`[LOGIN] Invalid password for: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 6. Generate token safely
    let token;
    try {
      token = generateToken(user._id);
    } catch (jwtError) {
      console.error('[LOGIN] JWT generation error:', jwtError.message);
      return res.status(500).json({ message: 'Token generation failed' });
    }

    // 7. Success response
    console.log(`[LOGIN] Success: ${email}`);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('[LOGIN] Unexpected error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;