const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Starters', 'Main Course', 'Desserts', 'Drinks']
  },
  imageURL: { type: String, required: true },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  isVeg: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  orderCount: { type: Number, default: 0 },
  ingredients: [String],
  spiceLevel: { type: String, enum: ['Mild', 'Medium', 'Hot'], default: 'Mild' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

menuItemSchema.index({ owner: 1 });
menuItemSchema.index({ category: 1, isAvailable: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);