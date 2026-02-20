# Booking Approval Workflow - Implementation Guide

## Overview
This document describes the complete booking approval workflow implementation for RestoBook. The system now requires admin approval for all bookings instead of automatic confirmation.

---

## 🔄 Workflow Summary

### User Flow:
1. User creates a booking → Status: **PENDING**
2. User receives "Pending Approval" email
3. Admin reviews and approves/rejects
4. User receives "Confirmed" or "Rejected" email
5. User can cancel only **PENDING** bookings

### Admin Flow:
1. View all bookings with filters (PENDING, CONFIRMED, REJECTED)
2. See statistics dashboard
3. Approve or reject pending bookings
4. System sends automatic email notifications

---

## 📁 File Structure

```
backend/
├── models/
│   └── Booking.js                 # Updated with PENDING/CONFIRMED/REJECTED status
├── routes/
│   ├── userBookingRoutes.js       # User booking operations
│   ├── adminBookingRoutes.js      # Admin booking management
│   └── bookingRoutes.js           # Deprecated (backward compatibility)
├── utils/
│   └── emailService.js            # Email templates and sending logic
└── server.js                      # Updated with new routes

frontend/
├── pages/
│   ├── Booking.js                 # Updated to show pending status
│   ├── UserDashboard.js           # NEW: User booking history
│   └── Admin.js                   # Updated with approval buttons
├── utils/
│   └── api.js                     # Updated API endpoints
└── App.js                         # Added /my-bookings route
```

---

## 🔧 Backend Implementation

### 1. Booking Model (`models/Booking.js`)

**Status Enum:**
```javascript
status: { 
  type: String, 
  enum: ['PENDING', 'CONFIRMED', 'REJECTED'], 
  default: 'PENDING' 
}
```

**Indexes:**
- `userId + createdAt` (for user queries)
- `status` (for admin filters)

---

### 2. API Endpoints

#### User Endpoints (`/api/user/bookings`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new booking (PENDING) | User |
| GET | `/my-bookings` | Get user's own bookings | User |
| DELETE | `/:id` | Cancel own PENDING booking | User |

#### Admin Endpoints (`/api/admin/bookings`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all bookings (with filters) | Admin |
| GET | `/stats` | Get booking statistics | Admin |
| PUT | `/:id/status` | Update booking status | Admin |
| DELETE | `/:id` | Delete any booking | Admin |

---

### 3. Email Service (`utils/emailService.js`)

**Email Templates:**
- **PENDING**: Yellow theme, "Pending Approval" message
- **CONFIRMED**: Green theme, "Booking Confirmed" message
- **REJECTED**: Red theme, "Cannot accommodate" message

**Usage:**
```javascript
const { sendBookingEmail } = require('../utils/emailService');
await sendBookingEmail(booking, 'PENDING');
await sendBookingEmail(booking, 'CONFIRMED');
await sendBookingEmail(booking, 'REJECTED');
```

---

### 4. Environment Variables

Add to `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Gmail Setup:**
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in EMAIL_PASS

---

## 🎨 Frontend Implementation

### 1. User Booking Page (`pages/Booking.js`)

**Changes:**
- Uses `userBookingAPI.create()`
- Shows "Pending Approval" in success modal
- Status badge: ⏳ Pending Approval (yellow)

---

### 2. User Dashboard (`pages/UserDashboard.js`)

**Features:**
- Display all user bookings sorted by latest
- Status badges with colors:
  - 🟡 PENDING (yellow)
  - 🟢 CONFIRMED (green)
  - 🔴 REJECTED (red)
- Cancel button (only for PENDING bookings)
- Booking details: date, time, guests, special requests

**Route:** `/my-bookings`

---

### 3. Admin Dashboard (`pages/Admin.js`)

**Updated Features:**

**Statistics Cards:**
- Total Bookings
- Pending Count (yellow)
- Confirmed Count (green)
- Rejected Count (red)
- Total Guests

**Filters:**
- Status: All / PENDING / CONFIRMED / REJECTED
- Date filter

**Actions:**
- ✅ Approve (green button) - Only for PENDING
- ❌ Reject (red button) - Only for PENDING
- 🗑️ Delete (always available)

**Pending Bookings Priority:**
- Sorted by creation date (newest first)
- Highlighted for quick action

---

### 4. API Utilities (`utils/api.js`)

**New Exports:**
```javascript
// User Booking API
export const userBookingAPI = {
  create: (data) => api.post('/user/bookings', data),
  getMyBookings: () => api.get('/user/bookings/my-bookings'),
  cancel: (id) => api.delete(`/user/bookings/${id}`)
};

// Admin Booking API
export const adminBookingAPI = {
  getAll: (status) => api.get(`/admin/bookings?status=${status}`),
  getStats: () => api.get('/admin/bookings/stats'),
  updateStatus: (id, status) => api.put(`/admin/bookings/${id}/status`, { status }),
  delete: (id) => api.delete(`/admin/bookings/${id}`)
};
```

---

## 🔒 Security Features

### 1. Authentication & Authorization
- JWT token required for all booking operations
- Admin role check for admin endpoints
- Users can only access their own bookings

### 2. Validation
- Booking date must be in future
- Status values validated (PENDING/CONFIRMED/REJECTED)
- Only PENDING bookings can be cancelled by users

### 3. Data Protection
- User ID automatically attached from JWT
- No cross-user data access
- Admin actions logged

---

## 📧 Email Notification Flow

```
User Creates Booking
    ↓
Status: PENDING
    ↓
Email: "Booking Received - Pending Approval"
    ↓
Admin Reviews
    ↓
    ├─→ APPROVED
    │       ↓
    │   Email: "Booking Confirmed ✅"
    │
    └─→ REJECTED
            ↓
        Email: "Booking Update (Cannot Accommodate)"
```

---

## 🚀 Deployment Checklist

### Backend:
- [ ] Install nodemailer: `npm install nodemailer`
- [ ] Set EMAIL_USER and EMAIL_PASS in production .env
- [ ] Test email sending with Gmail App Password
- [ ] Verify MongoDB indexes are created
- [ ] Test all API endpoints

### Frontend:
- [ ] Update REACT_APP_API_URL for production
- [ ] Test user booking flow
- [ ] Test admin approval flow
- [ ] Verify email notifications
- [ ] Test responsive design

---

## 🧪 Testing Guide

### User Tests:
1. Create a booking → Check PENDING status
2. Receive "Pending Approval" email
3. View booking in /my-bookings
4. Cancel PENDING booking
5. Try to cancel CONFIRMED booking (should fail)

### Admin Tests:
1. View all bookings
2. Filter by status (PENDING/CONFIRMED/REJECTED)
3. Approve a PENDING booking
4. Reject a PENDING booking
5. Verify email sent after each action
6. Check statistics update correctly

---

## 📊 Database Queries

### Get Pending Bookings:
```javascript
Booking.find({ status: 'PENDING' }).sort({ createdAt: -1 });
```

### Get User Bookings:
```javascript
Booking.find({ userId: userId }).sort({ createdAt: -1 });
```

### Get Statistics:
```javascript
const stats = {
  total: await Booking.countDocuments(),
  pending: await Booking.countDocuments({ status: 'PENDING' }),
  confirmed: await Booking.countDocuments({ status: 'CONFIRMED' }),
  rejected: await Booking.countDocuments({ status: 'REJECTED' })
};
```

---

## 🐛 Troubleshooting

### Email Not Sending:
- Check EMAIL_USER and EMAIL_PASS in .env
- Verify Gmail App Password (not regular password)
- Check Gmail "Less secure app access" settings
- Review console logs for error messages

### Status Not Updating:
- Verify admin role in JWT token
- Check API endpoint URL
- Inspect network tab for errors
- Verify booking ID is correct

### User Can't Cancel:
- Check booking status (must be PENDING)
- Verify user owns the booking
- Check JWT token validity

---

## 🔮 Future Enhancements

1. **SMS Notifications** - Twilio integration
2. **Real-time Updates** - WebSocket for live status
3. **Booking Reminders** - Scheduled emails 24h before
4. **Capacity Management** - Auto-reject if fully booked
5. **Waitlist System** - Queue for rejected bookings
6. **Analytics Dashboard** - Booking trends and insights

---

## 📞 Support

For issues or questions:
- Check console logs (backend and frontend)
- Review API responses in Network tab
- Verify environment variables
- Test with Postman/Thunder Client

---

## ✅ Implementation Complete

All features have been implemented:
- ✅ Booking status logic (PENDING by default)
- ✅ Updated Booking model
- ✅ Admin dashboard with approval buttons
- ✅ User dashboard for booking history
- ✅ Email notifications (3 templates)
- ✅ Security and validation
- ✅ API endpoints (user + admin)
- ✅ Frontend components
- ✅ Status badges and filters

**Ready for production deployment!**
