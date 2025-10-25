const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Desserts']
  },
  image: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  ingredients: [String],
  spiceLevel: { type: String, enum: ['Mild', 'Medium', 'Hot'], default: 'Mild' }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);