const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const { sendBookingEmail } = require('../utils/emailService');
const router = express.Router();

// Create new booking (authenticated users)
router.post('/', protect, async (req, res) => {
  try {
    const { date, time, guests, name, email, phone, specialRequests, ownerId, menuItemId } = req.body;

    // Validate date is in future
    const bookingDate = new Date(date);
    if (bookingDate < new Date()) {
      return res.status(400).json({ message: 'Booking date must be in the future' });
    }

    let restaurantOwner = ownerId;
    
    // If menuItemId provided, get owner from menu item
    if (menuItemId) {
      const MenuItem = require('../models/MenuItem');
      const menuItem = await MenuItem.findById(menuItemId);
      
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      
      restaurantOwner = menuItem.owner;
    }
    
    // If still no owner, use first admin as default
    if (!restaurantOwner) {
      const User = require('../models/User');
      const firstAdmin = await User.findOne({ role: { $in: ['ADMIN', 'admin'] } });
      if (firstAdmin) {
        restaurantOwner = firstAdmin._id;
      } else {
        return res.status(400).json({ message: 'No restaurant available for booking' });
      }
    }

    const booking = new Booking({
      userId: req.user._id,
      owner: restaurantOwner,
      menuItem: menuItemId || undefined,
      name,
      email,
      phone,
      date: bookingDate,
      time,
      guests,
      specialRequests,
      status: 'PENDING'
    });

    const savedBooking = await booking.save();
    await sendBookingEmail(savedBooking, 'PENDING');

    res.status(201).json({ 
      message: 'Booking request submitted! You will receive a confirmation email once approved.', 
      booking: savedBooking 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's own bookings
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel own booking (only if PENDING)
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'PENDING') {
      return res.status(400).json({ 
        message: 'Only pending bookings can be cancelled' 
      });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
