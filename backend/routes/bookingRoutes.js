// DEPRECATED: This file is kept for backward compatibility
// Use /api/user/bookings for user operations
// Use /api/admin/bookings for admin operations

const express = require('express');
const router = express.Router();

router.all('*', (req, res) => {
  res.status(410).json({ 
    message: 'This endpoint is deprecated. Use /api/user/bookings or /api/admin/bookings' 
  });
});

module.exports = router;