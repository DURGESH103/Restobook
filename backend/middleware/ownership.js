const Booking = require('../models/Booking');
const MenuItem = require('../models/MenuItem');

const validateBookingOwnership = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Admin can only access their own restaurant's bookings
    if (req.user.role === 'ADMIN' && booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }

    // User can only access their own bookings
    if (req.user.role === 'USER' && booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }

    req.booking = booking;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateMenuOwnership = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (menuItem.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this menu item' });
    }

    req.menuItem = menuItem;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { validateBookingOwnership, validateMenuOwnership };
