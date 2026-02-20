# Production-Ready Implementation Guide

## 1. Install Required Packages

### Backend
```bash
cd backend
npm install express-rate-limit express-mongo-sanitize helmet express-validator joi
```

### Frontend
```bash
cd frontend
npm install react-hot-toast
```

## 2. Update server.js with Security Middleware

```javascript
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter, securityHeaders, sanitize } = require('./middleware/security');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Security
app.use(securityHeaders);
app.use(sanitize);
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api/reviews', reviewRoutes);
// ... other routes

// Error handler (must be last)
app.use(errorHandler);
```

## 3. Update authRoutes.js with Rate Limiting

```javascript
const { authLimiter } = require('../middleware/security');
const { body, validationResult } = require('express-validator');

// Add to login/register routes
router.post('/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... existing login logic
  } catch (error) {
    next(error);
  }
});
```

## 4. Update JWT Generation with Expiration

```javascript
// In authRoutes.js or utils/jwt.js
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
};
```

## 5. Update Frontend API Calls to Use apiClient

```javascript
// In api.js or create new files
import api from './apiClient';

export const menuAPI = {
  getAll: async () => {
    const { data } = await api.get('/menu');
    return data;
  },
  // ... other methods using api instead of axios
};
```

## 6. Add Review Section to Menu Item Page

```javascript
import { useState, useEffect } from 'react';
import { ReviewForm, ReviewList } from '../components/ReviewComponents';
import { reviewAPI } from '../utils/reviewAPI';
import { toast } from '../utils/toast';
import { useAuth } from '../context/AuthContext';

function MenuItemDetail({ itemId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadReviews();
  }, [itemId]);

  const loadReviews = async () => {
    try {
      const data = await reviewAPI.getByMenuItem(itemId);
      setReviews(data);
    } catch (error) {
      toast.error('Failed to load reviews');
    }
  };

  const handleSubmit = async (reviewData) => {
    setLoading(true);
    try {
      await reviewAPI.create(reviewData);
      toast.success('Review submitted!');
      loadReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (reviewId, reply) => {
    try {
      await reviewAPI.reply(reviewId, reply);
      toast.success('Reply sent!');
      loadReviews();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  return (
    <div className="space-y-8">
      {/* Menu item details */}
      
      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        
        {isAuthenticated && (
          <div className="mb-6">
            <ReviewForm 
              menuItemId={itemId} 
              onSubmit={handleSubmit} 
              loading={loading} 
            />
          </div>
        )}
        
        <ReviewList 
          reviews={reviews} 
          currentUserId={user?._id}
          onReply={handleReply}
          isAdmin={user?.role === 'ADMIN'}
        />
      </div>
    </div>
  );
}
```

## 7. Update App.js with Toast Provider

```javascript
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
}
```

## 8. Optimize Admin Dashboard with Lean Queries

```javascript
// In adminBookingRoutes.js
router.get('/', protect, authorize('ADMIN'), async (req, res, next) => {
  try {
    const bookings = await Booking.find({ owner: req.user._id })
      .populate('userId', 'name email')
      .populate({ path: 'menuItem', select: 'name', strictPopulate: false })
      .sort('-createdAt')
      .lean(); // Add lean() for better performance
    
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});
```

## 9. Add Indexes for Performance

```javascript
// Run in MongoDB or add to models
db.reviews.createIndex({ menuItem: 1, user: 1 }, { unique: true });
db.reviews.createIndex({ menuItem: 1, createdAt: -1 });
db.menuItems.createIndex({ averageRating: -1, totalReviews: -1 });
```

## 10. Environment Variables

```env
# Backend .env
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
NODE_ENV=production
MONGODB_URI=your-mongodb-uri
```

## 11. Update MenuCard to Show Reviews

```javascript
// Replace existing MenuCard with OptimizedCards version
import { MenuCard } from './components/OptimizedCards';

// In Menu.js
{menuItems.map(item => (
  <MenuCard key={item._id} item={item} onAddToCart={addToCart} />
))}
```

## 12. Security Checklist

- [x] Rate limiting on auth routes (5 requests/15min)
- [x] Rate limiting on API routes (100 requests/15min)
- [x] Helmet for security headers
- [x] MongoDB injection sanitization
- [x] Input validation with express-validator
- [x] JWT expiration (7 days)
- [x] Proper error handling middleware
- [x] CORS configuration
- [x] Password hashing (already in User model)
- [x] Ownership validation on reviews

## 13. Performance Checklist

- [x] Lean queries where possible
- [x] Proper MongoDB indexes
- [x] React.memo for components
- [x] useMemo for expensive calculations
- [x] useCallback for event handlers
- [x] Lazy loading pages
- [x] Code splitting with React.lazy
- [x] Axios interceptors for token handling

## 14. Review System Features

- [x] One review per user per menu item
- [x] Auto-calculate averageRating and totalReviews
- [x] Admin can reply to reviews
- [x] Reply ownership validation (only item owner can reply)
- [x] Star rating with hover effect
- [x] Character limits (10-500 for reviews, 5-500 for replies)
- [x] Proper indexes for performance

## 15. Testing Endpoints

```bash
# Create review
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"menuItemId":"ITEM_ID","rating":5,"comment":"Great food!"}'

# Get reviews
curl http://localhost:5000/api/reviews/menu/ITEM_ID

# Admin reply
curl -X PUT http://localhost:5000/api/reviews/REVIEW_ID/reply \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reply":"Thank you for your feedback!"}'
```

## 16. Refresh Token Implementation (Future Enhancement)

```javascript
// For production, consider implementing refresh tokens:
// 1. Generate short-lived access token (15min)
// 2. Generate long-lived refresh token (7 days)
// 3. Store refresh token in httpOnly cookie
// 4. Add /api/auth/refresh endpoint
// 5. Update apiClient interceptor to auto-refresh
```

## Notes

- All security middleware is production-ready
- Review system prevents duplicate reviews via unique index
- Rating auto-updates on review save/delete via Mongoose hooks
- Admin can only reply to reviews on their own menu items
- JWT expiration handled gracefully with redirect to login
- All queries optimized with lean() and proper indexes
- React components memoized to prevent unnecessary re-renders
- Code splitting reduces initial bundle size
