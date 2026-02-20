const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 500 },
  adminReply: { type: String, trim: true, maxlength: 500 },
  repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  repliedAt: Date
}, { timestamps: true });

// One review per user per menu item
reviewSchema.index({ menuItem: 1, user: 1 }, { unique: true });

// Auto-calculate rating on save/delete
reviewSchema.statics.calcAverageRating = async function(menuItemId) {
  const stats = await this.aggregate([
    { $match: { menuItem: menuItemId } },
    { $group: { _id: '$menuItem', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  
  await mongoose.model('MenuItem').findByIdAndUpdate(menuItemId, {
    averageRating: stats[0]?.avgRating || 0,
    totalReviews: stats[0]?.count || 0
  });
};

reviewSchema.post('save', function() {
  this.constructor.calcAverageRating(this.menuItem);
});

reviewSchema.post('remove', function() {
  this.constructor.calcAverageRating(this.menuItem);
});

module.exports = mongoose.model('Review', reviewSchema);
