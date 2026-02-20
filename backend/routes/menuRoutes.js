const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, authorize } = require('../middleware/auth');
const { validateMenuOwnership } = require('../middleware/ownership');
const router = express.Router();

// Get all menu items (PUBLIC - shows all restaurants' menus)
router.get('/', async (req, res) => {
  try {
    const { category, isVeg, sortBy, minRating, ownerId } = req.query;
    
    let filter = { isAvailable: true };
    if (category && category !== 'All') filter.category = category;
    if (isVeg !== undefined) filter.isVeg = isVeg === 'true';
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    if (ownerId) filter.owner = ownerId; // Filter by specific restaurant
    
    let sortOptions = { createdAt: -1 };
    if (sortBy === 'price-low') sortOptions = { price: 1 };
    else if (sortBy === 'price-high') sortOptions = { price: -1 };
    else if (sortBy === 'rating') sortOptions = { rating: -1 };
    else if (sortBy === 'popularity') sortOptions = { orderCount: -1 };
    
    const menuItems = await MenuItem.find(filter)
      .populate('owner', 'name email')
      .sort(sortOptions);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin's own menu items (ADMIN only - multi-tenant)
router.get('/admin/my-menu', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate('owner', 'name email');
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new menu item (ADMIN only - auto-assign owner)
router.post('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const menuItem = new MenuItem({
      ...req.body,
      owner: req.user._id
    });
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update menu item (ADMIN only - with ownership validation)
router.put('/:id', protect, authorize('ADMIN'), validateMenuOwnership, async (req, res) => {
  try {
    Object.assign(req.menuItem, req.body);
    await req.menuItem.save();
    res.json(req.menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete menu item (ADMIN only - with ownership validation)
router.delete('/:id', protect, authorize('ADMIN'), validateMenuOwnership, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;