const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  avatar: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);