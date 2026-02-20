const express = require('express');
const Review = require('../models/Review');
const MenuItem = require('../models/MenuItem');
const { protect, authorize } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware
const validateReview = [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').trim().isLength({ min: 10, max: 500 })
];

// Get reviews for menu item
router.get('/menu/:menuItemId', async (req, res) => {
  try {
    const reviews = await Review.find({ menuItem: req.params.menuItemId })
      .populate('user', 'name')
      .populate('repliedBy', 'name')
      .sort('-createdAt')
      .lean();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create review (one per user per item)
router.post('/', protect, validateReview, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { menuItemId, rating, comment } = req.body;
    
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });

    const existing = await Review.findOne({ menuItem: menuItemId, user: req.user._id });
    if (existing) return res.status(400).json({ message: 'You already reviewed this item' });

    const review = await Review.create({
      menuItem: menuItemId,
      user: req.user._id,
      rating,
      comment
    });

    const populated = await review.populate('user', 'name');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update review (owner only)
router.put('/:id', protect, validateReview, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin reply
router.put('/:id/reply', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { reply } = req.body;
    if (!reply || reply.trim().length < 5 || reply.trim().length > 500) {
      return res.status(400).json({ message: 'Reply must be 5-500 characters' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const menuItem = await MenuItem.findById(review.menuItem);
    if (menuItem.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Can only reply to reviews on your items' });
    }

    review.adminReply = reply.trim();
    review.repliedBy = req.user._id;
    review.repliedAt = new Date();
    await review.save();

    const populated = await review.populate(['user repliedBy', 'name']);
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete review (owner or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const isOwner = review.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ADMIN';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
