const express = require('express');
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');
const { validateBookingOwnership } = require('../middleware/ownership');
const { sendBookingEmail } = require('../utils/emailService');
const router = express.Router();

// Get all bookings for logged-in admin (multi-tenant)
router.get('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { owner: req.user._id };
    if (status) filter.status = status.toUpperCase();
    
    const bookings = await Booking.find(filter)
      .populate('userId', 'name email')
      .populate('menuItem', 'name price category')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking statistics for logged-in admin
router.get('/stats', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const filter = { owner: req.user._id };
    
    const total = await Booking.countDocuments(filter);
    const pending = await Booking.countDocuments({ ...filter, status: 'PENDING' });
    const confirmed = await Booking.countDocuments({ ...filter, status: 'CONFIRMED' });
    const rejected = await Booking.countDocuments({ ...filter, status: 'REJECTED' });
    
    const totalGuests = await Booking.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$guests' } } }
    ]);

    res.json({
      total,
      pending,
      confirmed,
      rejected,
      totalGuests: totalGuests[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (with ownership validation)
router.put('/:id/status', protect, authorize('ADMIN'), validateBookingOwnership, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['PENDING', 'CONFIRMED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    req.booking.status = status;
    await req.booking.save();

    await sendBookingEmail(req.booking, status);

    res.json({ message: `Booking ${status.toLowerCase()}`, booking: req.booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete booking (with ownership validation)
router.delete('/:id', protect, authorize('ADMIN'), validateBookingOwnership, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
