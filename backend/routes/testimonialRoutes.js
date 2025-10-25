const express = require('express');
const Testimonial = require('../models/Testimonial');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Get approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all testimonials (admin)
router.get('/all', protect, admin, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new testimonial (authenticated users only)
router.post('/', protect, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    const savedTestimonial = await testimonial.save();
    res.status(201).json({ 
      message: 'Thank you for your feedback! It will be reviewed before publishing.', 
      testimonial: savedTestimonial 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Approve testimonial (admin only)
router.put('/:id/approve', protect, admin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      { isApproved: true }, 
      { new: true }
    );
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;