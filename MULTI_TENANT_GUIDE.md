# Multi-Tenant Architecture - Implementation Guide

## 🏗️ Architecture Overview

This system now supports **multiple restaurants (admins)** with complete **data isolation**:

- Each ADMIN manages their own restaurant
- Users can see ALL restaurants' menus
- Users book tables at specific restaurants
- Admins only see their own bookings and menu items
- Complete data isolation between admins

---

## 🔑 Role System

### Roles:
- **USER** - Regular customers
- **ADMIN** - Restaurant owners/managers

### Permissions:

| Action | USER | ADMIN |
|--------|------|-------|
| View all menus | ✅ | ✅ |
| Create booking | ✅ | ❌ |
| View own bookings | ✅ | ❌ |
| Add menu items | ❌ | ✅ (own only) |
| Approve bookings | ❌ | ✅ (own only) |
| View dashboard | ❌ | ✅ (own data) |

---

## 📊 Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "USER" | "ADMIN",
  isActive: Boolean
}
```

### MenuItem Model
```javascript
{
  name, description, price, category,
  imageURL, rating, isVeg, isAvailable,
  owner: ObjectId (ref: User) // ADMIN who owns this item
}
```

### Booking Model
```javascript
{
  userId: ObjectId (ref: User),    // Customer who booked
  owner: ObjectId (ref: User),     // ADMIN who owns restaurant
  name, email, phone,
  date, time, guests,
  specialRequests,
  status: "PENDING" | "CONFIRMED" | "REJECTED"
}
```

---

## 🔒 Data Isolation Logic

### Menu Items:
- **Create**: Auto-assign `owner = req.user._id` (logged-in admin)
- **Public View**: `MenuItem.find()` - Shows ALL restaurants
- **Admin View**: `MenuItem.find({ owner: req.user._id })` - Only own items
- **Update/Delete**: Validate `menuItem.owner === req.user._id`

### Bookings:
- **Create**: User provides `ownerId` (restaurant to book)
- **User View**: `Booking.find({ userId: req.user._id })` - Only own bookings
- **Admin View**: `Booking.find({ owner: req.user._id })` - Only own restaurant's bookings
- **Update/Delete**: Validate `booking.owner === req.user._id`

---

## 🌐 API Endpoints

### Public Endpoints

#### Get All Menus (All Restaurants)
```
GET /api/menu
Query: ?category=Starters&ownerId=<admin_id>
Returns: All menu items from all restaurants
```

### User Endpoints (Protected)

#### Create Booking
```
POST /api/user/bookings
Body: {
  name, email, phone, date, time, guests,
  ownerId: "<restaurant_admin_id>",  // Required!
  specialRequests
}
```

#### Get My Bookings
```
GET /api/user/bookings/my-bookings
Returns: Only logged-in user's bookings
```

#### Cancel Booking
```
DELETE /api/user/bookings/:id
Validates: booking.userId === req.user._id
```

### Admin Endpoints (Protected + Role Check)

#### Get Own Menu Items
```
GET /api/menu/admin/my-menu
Returns: Only logged-in admin's menu items
```

#### Create Menu Item
```
POST /api/menu
Body: { name, description, price, category, imageURL, ... }
Auto-assigns: owner = req.user._id
```

#### Update Menu Item
```
PUT /api/menu/:id
Validates: menuItem.owner === req.user._id
```

#### Delete Menu Item
```
DELETE /api/menu/:id
Validates: menuItem.owner === req.user._id
```

#### Get Own Bookings
```
GET /api/admin/bookings
Query: ?status=PENDING
Returns: Only logged-in admin's restaurant bookings
```

#### Get Statistics
```
GET /api/admin/bookings/stats
Returns: Stats for logged-in admin's bookings only
```

#### Update Booking Status
```
PUT /api/admin/bookings/:id/status
Body: { status: "CONFIRMED" | "REJECTED" }
Validates: booking.owner === req.user._id
```

#### Delete Booking
```
DELETE /api/admin/bookings/:id
Validates: booking.owner === req.user._id
```

---

## 🛡️ Security Features

### 1. Authentication
- JWT token required for protected routes
- Token includes: `{ id: user._id, role: user.role }`

### 2. Authorization
```javascript
// Middleware usage
router.get('/', protect, authorize('ADMIN'), handler);
router.post('/', protect, authorize('USER'), handler);
```

### 3. Ownership Validation
```javascript
// Prevents IDOR attacks
validateBookingOwnership - Checks booking.owner === req.user._id
validateMenuOwnership - Checks menuItem.owner === req.user._id
```

### 4. Data Isolation
- Admins can NEVER see other admins' data
- Users can NEVER see other users' bookings
- All queries filtered by owner/userId

---

## 🚀 Migration Guide

### Step 1: Run Migration Script
```bash
cd backend
node migrate-multi-tenant.js
```

This will:
- Update roles: `user` → `USER`, `admin` → `ADMIN`
- Add `owner` field to existing menu items
- Add `owner` field to existing bookings
- Assign first admin as default owner

### Step 2: Verify Migration
Check MongoDB:
```javascript
// All users should have uppercase roles
db.users.find({ role: "USER" })
db.users.find({ role: "ADMIN" })

// All menu items should have owner
db.menuitems.find({ owner: { $exists: true } })

// All bookings should have owner
db.bookings.find({ owner: { $exists: true } })
```

### Step 3: Update Frontend
- Role checks now use `'ADMIN'` instead of `'admin'`
- Booking form must include `ownerId`
- Admin dashboard fetches only own data

---

## 💻 Frontend Changes

### Navbar.js
```javascript
// OLD
{user?.role === 'admin' && ...}

// NEW
{user?.role === 'ADMIN' && ...}
```

### Admin Dashboard
```javascript
// OLD
const response = await menuAPI.getAll();

// NEW
const response = await menuAPI.getAdminMenu();
```

### Booking Form
```javascript
// Must include ownerId when creating booking
const bookingData = {
  ...formData,
  ownerId: selectedRestaurantAdminId  // Required!
};
await userBookingAPI.create(bookingData);
```

---

## 🧪 Testing Scenarios

### Test 1: Admin Data Isolation
1. Create Admin A and Admin B
2. Admin A creates menu items
3. Admin B creates menu items
4. Admin A should only see their own items
5. Admin B should only see their own items

### Test 2: Booking Isolation
1. User books at Admin A's restaurant
2. User books at Admin B's restaurant
3. Admin A should only see bookings for their restaurant
4. Admin B should only see bookings for their restaurant
5. User should see both bookings

### Test 3: Public Menu Visibility
1. Admin A creates menu items
2. Admin B creates menu items
3. Public menu page should show ALL items
4. Users can filter by restaurant (ownerId)

### Test 4: Ownership Validation
1. Admin A tries to update Admin B's menu item → ❌ Forbidden
2. Admin A tries to approve Admin B's booking → ❌ Forbidden
3. User A tries to cancel User B's booking → ❌ Forbidden

---

## 📝 Example Workflow

### Scenario: User Books at Restaurant

1. **User browses menu**
   ```
   GET /api/menu
   → Returns all restaurants' menus
   ```

2. **User selects restaurant and books**
   ```
   POST /api/user/bookings
   Body: {
     ownerId: "admin_restaurant_id",
     date, time, guests, ...
   }
   → Creates booking with owner = admin_restaurant_id
   ```

3. **Admin receives booking**
   ```
   GET /api/admin/bookings
   → Admin sees only their restaurant's bookings
   ```

4. **Admin approves**
   ```
   PUT /api/admin/bookings/:id/status
   Body: { status: "CONFIRMED" }
   → Validates ownership before updating
   ```

5. **User receives confirmation**
   ```
   GET /api/user/bookings/my-bookings
   → User sees their booking status updated
   ```

---

## 🔧 Configuration

### Environment Variables
```env
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/restobook
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Database Indexes
```javascript
// Booking indexes
{ userId: 1, createdAt: -1 }
{ owner: 1, status: 1 }
{ status: 1 }

// MenuItem indexes
{ owner: 1 }
{ category: 1, isAvailable: 1 }
```

---

## ⚠️ Important Notes

1. **ownerId is Required**: When creating bookings, frontend MUST provide `ownerId`
2. **Role Case Sensitive**: Use `'ADMIN'` and `'USER'` (uppercase)
3. **Ownership Validation**: Always validate ownership before update/delete
4. **Public vs Private**: Menu is public, bookings are private
5. **Migration**: Run migration script ONCE before deploying

---

## 🎯 Benefits

✅ **Complete Data Isolation** - Admins can't see each other's data  
✅ **Scalable** - Support unlimited restaurants  
✅ **Secure** - Ownership validation prevents unauthorized access  
✅ **Flexible** - Users can book at any restaurant  
✅ **Production-Ready** - Follows MERN best practices  

---

## 📞 Support

For issues:
1. Check ownership validation middleware
2. Verify JWT token includes correct role
3. Ensure migration script ran successfully
4. Check database indexes are created

---

**Version:** 2.0.0 (Multi-Tenant)  
**Status:** ✅ Production Ready
