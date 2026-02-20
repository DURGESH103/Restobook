# 📋 Quick Reference - Booking Approval Workflow

## 🔑 Status Values
```
PENDING    → Awaiting admin approval (default)
CONFIRMED  → Approved by admin
REJECTED   → Rejected by admin
```

## 🎨 Status Colors
```
PENDING    → Yellow (#ffc107)
CONFIRMED  → Green (#28a745)
REJECTED   → Red (#dc3545)
```

## 🌐 API Endpoints

### User (Protected)
```
POST   /api/user/bookings              Create booking
GET    /api/user/bookings/my-bookings  Get my bookings
DELETE /api/user/bookings/:id          Cancel PENDING booking
```

### Admin (Admin Only)
```
GET    /api/admin/bookings                Get all bookings
GET    /api/admin/bookings?status=PENDING Filter by status
GET    /api/admin/bookings/stats          Get statistics
PUT    /api/admin/bookings/:id/status     Update status
DELETE /api/admin/bookings/:id            Delete booking
```

## 📧 Email Triggers
```
Create Booking    → PENDING email
Admin Approves    → CONFIRMED email
Admin Rejects     → REJECTED email
```

## 🛣️ Frontend Routes
```
/booking       → Create new booking
/my-bookings   → User dashboard
/admin         → Admin dashboard
```

## 💻 Code Snippets

### Create Booking (Frontend)
```javascript
import { userBookingAPI } from '../utils/api';

const response = await userBookingAPI.create({
  name, email, phone, date, time, guests, specialRequests
});
// Returns: { message, booking: { status: 'PENDING', ... } }
```

### Get My Bookings (Frontend)
```javascript
const response = await userBookingAPI.getMyBookings();
// Returns: [{ _id, status, date, time, guests, ... }]
```

### Approve Booking (Admin Frontend)
```javascript
import { adminBookingAPI } from '../utils/api';

await adminBookingAPI.updateStatus(bookingId, 'CONFIRMED');
// Sends confirmation email automatically
```

### Get Statistics (Admin Frontend)
```javascript
const stats = await adminBookingAPI.getStats();
// Returns: { total, pending, confirmed, rejected, totalGuests }
```

### Send Email (Backend)
```javascript
const { sendBookingEmail } = require('../utils/emailService');

await sendBookingEmail(booking, 'PENDING');
await sendBookingEmail(booking, 'CONFIRMED');
await sendBookingEmail(booking, 'REJECTED');
```

## 🔒 Middleware Usage

### Protect Route (User Auth)
```javascript
const { protect } = require('../middleware/auth');
router.post('/', protect, async (req, res) => {
  // req.user available here
});
```

### Admin Only Route
```javascript
const { protect, admin } = require('../middleware/auth');
router.get('/', protect, admin, async (req, res) => {
  // Only admin can access
});
```

## 📊 Database Queries

### Find Pending Bookings
```javascript
const pending = await Booking.find({ status: 'PENDING' })
  .sort({ createdAt: -1 });
```

### Find User Bookings
```javascript
const bookings = await Booking.find({ userId: req.user._id })
  .sort({ createdAt: -1 });
```

### Get Statistics
```javascript
const total = await Booking.countDocuments();
const pending = await Booking.countDocuments({ status: 'PENDING' });
const confirmed = await Booking.countDocuments({ status: 'CONFIRMED' });
const rejected = await Booking.countDocuments({ status: 'REJECTED' });
```

## 🎯 Business Rules

### User Can:
- ✅ Create booking (auto-PENDING)
- ✅ View own bookings
- ✅ Cancel PENDING bookings
- ❌ Cancel CONFIRMED bookings
- ❌ Cancel REJECTED bookings
- ❌ View other users' bookings

### Admin Can:
- ✅ View all bookings
- ✅ Filter by status
- ✅ Approve PENDING bookings
- ✅ Reject PENDING bookings
- ✅ Delete any booking
- ✅ View statistics

### System Will:
- ✅ Send email on booking creation (PENDING)
- ✅ Send email on approval (CONFIRMED)
- ✅ Send email on rejection (REJECTED)
- ✅ Validate future dates only
- ✅ Validate status values
- ✅ Attach userId from JWT token

## 🐛 Common Errors

### "Not authorized, no token"
```
Solution: Include JWT token in Authorization header
Header: Authorization: Bearer <token>
```

### "Not authorized as admin"
```
Solution: User role must be 'admin' in database
Check: db.users.findOne({ email: 'admin@example.com' })
Update: db.users.updateOne({ email: '...' }, { $set: { role: 'admin' } })
```

### "Email sending failed"
```
Solution: Check EMAIL_USER and EMAIL_PASS in .env
Use Gmail App Password, not regular password
```

### "Only pending bookings can be cancelled"
```
Solution: User can only cancel bookings with status: 'PENDING'
CONFIRMED and REJECTED bookings cannot be cancelled
```

### "Booking date must be in the future"
```
Solution: Date validation prevents past bookings
Use date >= today
```

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "nodemailer": "^6.9.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.10.0",
  "axios": "^1.3.0",
  "framer-motion": "^10.0.0",
  "react-toastify": "^9.1.0",
  "react-icons": "^4.8.0"
}
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restobook
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
npm install nodemailer
node migrate-booking-status.js  # Run once
npm run dev
```

### Frontend
```bash
cd frontend
npm start
```

### Test Email
```bash
# In backend directory
node -e "require('./utils/emailService').sendBookingEmail({ name: 'Test', email: 'test@example.com', date: new Date(), time: '19:00', guests: 2 }, 'PENDING')"
```

## 📱 Status Badge Component (React)

```javascript
const getStatusBadge = (status) => {
  const config = {
    PENDING: { color: 'yellow', icon: '⏳' },
    CONFIRMED: { color: 'green', icon: '✅' },
    REJECTED: { color: 'red', icon: '❌' }
  };
  
  const { color, icon } = config[status];
  return (
    <span className={`badge badge-${color}`}>
      {icon} {status}
    </span>
  );
};
```

## 🎨 CSS Classes (Tailwind)

```css
/* Status Badges */
.badge-yellow { @apply bg-yellow-500/20 text-yellow-400 border-yellow-500/50; }
.badge-green  { @apply bg-green-500/20 text-green-400 border-green-500/50; }
.badge-red    { @apply bg-red-500/20 text-red-400 border-red-500/50; }

/* Action Buttons */
.btn-approve  { @apply bg-green-500 hover:bg-green-600; }
.btn-reject   { @apply bg-red-500 hover:bg-red-600; }
.btn-delete   { @apply bg-gray-500 hover:bg-gray-600; }
```

## 📞 Support

- **Documentation:** See BOOKING_WORKFLOW.md
- **Setup Guide:** See SETUP_BOOKING_WORKFLOW.md
- **Checklist:** See DEPLOYMENT_CHECKLIST.md

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready
