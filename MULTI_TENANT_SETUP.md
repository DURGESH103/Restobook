# 🚀 Multi-Tenant Setup - Quick Start

## Prerequisites
- Existing RestoBook installation
- MongoDB running
- Node.js installed

---

## Step-by-Step Setup

### 1️⃣ Run Migration Script

```bash
cd backend
node migrate-multi-tenant.js
```

**Expected Output:**
```
✅ MongoDB Connected
🔄 Starting multi-tenant migration...

✅ Updated X users: user → USER
✅ Updated X admins: admin → ADMIN
📌 Using admin "John Doe" (john@example.com) as default owner
✅ Updated X menu items with owner field
✅ Updated X bookings with owner field

📊 Verification:
   Users: X USER, X ADMIN
   Menu items with owner: X
   Bookings with owner: X

✅ Multi-tenant migration completed successfully!
```

---

### 2️⃣ Restart Backend

```bash
# In backend directory
npm run dev
```

---

### 3️⃣ Restart Frontend

```bash
# In frontend directory
npm start
```

---

### 4️⃣ Test the System

#### Test Admin Isolation:

1. **Login as Admin A**
   - Go to Admin Dashboard
   - Create a menu item
   - Note: Item is auto-assigned to Admin A

2. **Login as Admin B** (different account)
   - Go to Admin Dashboard
   - Create a menu item
   - Verify: Admin B CANNOT see Admin A's items

3. **Check Public Menu**
   - Logout
   - Go to Menu page
   - Verify: Both admins' items are visible

#### Test Booking Flow:

1. **Login as User**
   - Browse menu
   - Book a table (provide ownerId)
   - Check "My Bookings"

2. **Login as Admin**
   - Go to Admin Dashboard → Bookings
   - Verify: Only see bookings for your restaurant
   - Approve/Reject booking

3. **Login as User Again**
   - Check "My Bookings"
   - Verify: Status updated

---

## 🔧 Configuration

### Backend (.env)
```env
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/restobook
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📝 Important Changes

### 1. Role Values (Case Sensitive!)
```javascript
// OLD
user.role === 'admin'

// NEW
user.role === 'ADMIN'
```

### 2. Booking Creation (ownerId Required!)
```javascript
// When user books, must provide restaurant owner ID
const bookingData = {
  name, email, phone, date, time, guests,
  ownerId: selectedRestaurantAdminId  // Required!
};
```

### 3. Admin Menu Fetch
```javascript
// Admin dashboard should fetch only own items
const response = await menuAPI.getAdminMenu();
```

---

## 🧪 Verification Checklist

- [ ] Migration script ran successfully
- [ ] All users have uppercase roles (USER/ADMIN)
- [ ] All menu items have owner field
- [ ] All bookings have owner field
- [ ] Admin A cannot see Admin B's data
- [ ] Users can see all menus
- [ ] Users can only see own bookings
- [ ] Ownership validation works (403 errors when accessing other's data)

---

## 🐛 Troubleshooting

### Issue: "owner is required"
**Solution:** Menu items and bookings now require owner field. Run migration script.

### Issue: "Not authorized as admin"
**Solution:** Role values are now uppercase. Check `user.role === 'ADMIN'`

### Issue: Admin sees all bookings
**Solution:** Backend should filter by owner: `Booking.find({ owner: req.user._id })`

### Issue: Cannot create booking
**Solution:** Frontend must provide `ownerId` in request body

---

## 📊 Database Verification

### Check Roles:
```javascript
// In MongoDB shell or Compass
db.users.find({ role: "USER" })
db.users.find({ role: "ADMIN" })
```

### Check Ownership:
```javascript
// All menu items should have owner
db.menuitems.find({ owner: { $exists: true } })

// All bookings should have owner
db.bookings.find({ owner: { $exists: true } })
```

### Check Indexes:
```javascript
db.menuitems.getIndexes()
// Should include: { owner: 1 }

db.bookings.getIndexes()
// Should include: { owner: 1, status: 1 }
```

---

## 🎯 Quick Test Commands

### Create Test Admin:
```bash
# In MongoDB shell
db.users.insertOne({
  name: "Test Restaurant",
  email: "test@restaurant.com",
  password: "$2a$12$...",  // Use bcrypt hash
  role: "ADMIN",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Create Test User:
```bash
db.users.insertOne({
  name: "Test User",
  email: "user@test.com",
  password: "$2a$12$...",  // Use bcrypt hash
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 📞 Support

### Common Issues:

1. **Migration fails**
   - Check MongoDB connection
   - Verify .env file exists
   - Ensure at least one admin exists

2. **Frontend errors**
   - Clear browser cache
   - Check console for errors
   - Verify API_BASE_URL

3. **Authorization errors**
   - Check JWT token
   - Verify role is uppercase
   - Check middleware order

---

## 🎉 Success Indicators

✅ Migration script completes without errors  
✅ Admin dashboard shows only own data  
✅ Public menu shows all restaurants  
✅ Users can book at any restaurant  
✅ Ownership validation prevents unauthorized access  

---

## 📚 Next Steps

1. ✅ Run migration
2. ✅ Test admin isolation
3. ✅ Test booking flow
4. ✅ Verify ownership validation
5. ✅ Deploy to production

---

**Ready to go! Your multi-tenant system is now operational.** 🚀

For detailed documentation, see:
- `MULTI_TENANT_GUIDE.md` - Complete technical guide
- `MULTI_TENANT_SUMMARY.md` - Implementation summary
