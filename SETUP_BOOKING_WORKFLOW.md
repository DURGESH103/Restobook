# Quick Setup Guide - Booking Approval Workflow

## 🚀 Installation Steps

### 1. Backend Setup

```bash
cd backend

# Install nodemailer (if not already installed)
npm install nodemailer

# Update .env file
echo "EMAIL_USER=your-email@gmail.com" >> .env
echo "EMAIL_PASS=your-app-password" >> .env

# Restart server
npm run dev
```

### 2. Gmail Configuration

1. Go to Google Account Settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
   - Use this in EMAIL_PASS

### 3. Database Migration

**IMPORTANT:** Update existing bookings to new status format:

```javascript
// Run this in MongoDB shell or Compass
db.bookings.updateMany(
  { status: "pending" },
  { $set: { status: "PENDING" } }
);

db.bookings.updateMany(
  { status: "confirmed" },
  { $set: { status: "CONFIRMED" } }
);

db.bookings.updateMany(
  { status: "cancelled" },
  { $set: { status: "REJECTED" } }
);
```

### 4. Frontend Setup

```bash
cd frontend

# No new dependencies needed
# Just restart the dev server
npm start
```

### 5. Test the System

#### Create Test Booking:
1. Login as regular user
2. Go to /booking
3. Fill form and submit
4. Check email for "Pending Approval" message
5. Go to /my-bookings to see status

#### Test Admin Approval:
1. Login as admin
2. Go to /admin
3. Click "Bookings" tab
4. See pending booking
5. Click ✅ to approve or ❌ to reject
6. Check email for confirmation/rejection

---

## 🔑 API Endpoints Reference

### User Endpoints
```
POST   /api/user/bookings              - Create booking
GET    /api/user/bookings/my-bookings  - Get my bookings
DELETE /api/user/bookings/:id          - Cancel booking
```

### Admin Endpoints
```
GET    /api/admin/bookings             - Get all bookings
GET    /api/admin/bookings?status=PENDING - Filter by status
GET    /api/admin/bookings/stats       - Get statistics
PUT    /api/admin/bookings/:id/status  - Update status
DELETE /api/admin/bookings/:id         - Delete booking
```

---

## 📝 Status Values

- `PENDING` - Awaiting admin approval (default)
- `CONFIRMED` - Approved by admin
- `REJECTED` - Rejected by admin

---

## 🎨 Frontend Routes

- `/booking` - Create new booking
- `/my-bookings` - User dashboard (view bookings)
- `/admin` - Admin dashboard (manage bookings)

---

## ✅ Verification Checklist

- [ ] Backend server running without errors
- [ ] Email credentials configured in .env
- [ ] Test email sent successfully
- [ ] User can create booking
- [ ] User receives "Pending" email
- [ ] Admin can see pending bookings
- [ ] Admin can approve/reject
- [ ] User receives confirmation/rejection email
- [ ] User can view bookings in /my-bookings
- [ ] User can cancel PENDING bookings only
- [ ] Statistics display correctly

---

## 🐛 Common Issues

### "Email sending failed"
- Check EMAIL_USER and EMAIL_PASS
- Use Gmail App Password, not regular password
- Verify 2FA is enabled

### "Not authorized as admin"
- Check user role in database
- Verify JWT token includes role
- Login again to refresh token

### "Booking not found"
- Check booking ID
- Verify user owns the booking
- Check database connection

---

## 📞 Need Help?

Review the detailed documentation in `BOOKING_WORKFLOW.md`
