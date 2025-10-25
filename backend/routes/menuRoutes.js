const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isAvailable: true } : { isAvailable: true };
    const menuItems = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new menu item (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update menu item (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete menu item (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;