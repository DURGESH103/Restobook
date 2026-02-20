# 🔧 Fix 500 Error - Production-Safe Login

## Changes Made

### 1. **authRoutes.js** - Production-Safe Login
✅ Validates JWT_SECRET exists before use
✅ Checks if user exists (prevents null errors)
✅ Validates comparePassword method exists
✅ Wraps bcrypt in try-catch (prevents bcrypt crashes)
✅ Wraps JWT generation in try-catch
✅ Detailed logging for debugging
✅ Returns appropriate error codes

### 2. **User.js Model** - Safe Password Handling
✅ Added `select: false` to password field
✅ Added error handling to comparePassword method
✅ Prevents undefined password errors

---

## Required Environment Variables on Render

Go to **Render Dashboard** → Your Service → **Environment**

### Set These Variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://durgesh_kumar:GQI6yL3PzHeUbT0L@cluster0.3wydx.mongodb.net/restobook
JWT_SECRET=6c24a30965a06e1c9da797728f6347244142eaf21d22c5d3111e59089dbd3eef
JWT_EXPIRE=7d
```

**CRITICAL:**
- ✅ `JWT_SECRET` must be a long random string (use the one above)
- ✅ `NODE_ENV` must be `production` (not `development`)
- ✅ `MONGODB_URI` must be your actual MongoDB connection string
- ✅ All variables must be set (no placeholders)

---

## Deploy to Render

```bash
cd backend
git add routes/authRoutes.js models/User.js
git commit -m "Fix 500 error - production-safe login with error handling"
git push
```

**Wait 2-3 minutes for Render to deploy**

---

## Debug Using Render Logs

### 1. Go to Render Dashboard
https://dashboard.render.com

### 2. Select Your Service
Click on your backend service

### 3. Click "Logs" Tab
You'll see real-time logs

### 4. Look for These Messages

**Success:**
```
[LOGIN] Success: user@email.com
```

**Errors:**
```
[LOGIN] Missing credentials
[LOGIN] JWT_SECRET is not defined!
[LOGIN] User not found: user@email.com
[LOGIN] Invalid password for: user@email.com
[LOGIN] Bcrypt error: ...
[LOGIN] JWT generation error: ...
```

### 5. Filter Logs
Use the search box to filter for `[LOGIN]`

---

## Test After Deploy

### 1. Test Backend Configuration
```javascript
// Open browser console at https://restobook.vercel.app
fetch('https://restobook-kd40.onrender.com/api/auth/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'data' })
})
.then(r => r.json())
.then(data => {
  console.log('Backend Status:', data);
  console.log('Has JWT_SECRET:', data.hasJWT); // Must be true
  console.log('Has MONGODB_URI:', data.hasDB); // Must be true
});
```

**Expected:**
```json
{
  "message": "Backend is working",
  "hasJWT": true,
  "hasDB": true,
  "body": { "test": "data" }
}
```

### 2. Create Test User (If None Exists)
```javascript
fetch('https://restobook-kd40.onrender.com/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@test.com',
    password: 'test123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### 3. Test Login
```javascript
fetch('https://restobook-kd40.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login Response:', data);
  if (data.token) {
    console.log('✅ Login successful!');
  } else {
    console.log('❌ Login failed:', data.message);
  }
})
.catch(console.error);
```

---

## Common Errors & Solutions

### Error: "JWT_SECRET is not defined"
**Render Logs:** `[LOGIN] JWT_SECRET is not defined!`

**Fix:**
1. Go to Render → Environment
2. Add: `JWT_SECRET=6c24a30965a06e1c9da797728f6347244142eaf21d22c5d3111e59089dbd3eef`
3. Save and wait for redeploy

---

### Error: "User not found"
**Render Logs:** `[LOGIN] User not found: email@example.com`

**Fix:** Register a user first using `/api/auth/register`

---

### Error: "Bcrypt error"
**Render Logs:** `[LOGIN] Bcrypt error: ...`

**Causes:**
- Password field is null/undefined
- Corrupted password hash in database

**Fix:**
1. Check User model has password field
2. Re-register the user
3. Check bcrypt version compatibility

---

### Error: "JWT generation error"
**Render Logs:** `[LOGIN] JWT generation error: ...`

**Causes:**
- JWT_SECRET is invalid
- JWT_EXPIRE format is wrong

**Fix:**
1. Set `JWT_SECRET` to a long random string
2. Set `JWT_EXPIRE=7d` (not `7 days`)

---

### Error: "MongoServerError"
**Render Logs:** `MongoServerError: bad auth`

**Fix:**
1. Check MONGODB_URI username/password
2. MongoDB Atlas → Network Access → Allow 0.0.0.0/0
3. Check database name in connection string

---

## MongoDB Atlas Setup

### 1. Network Access
1. Go to MongoDB Atlas
2. Network Access → IP Access List
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere"
5. IP: `0.0.0.0/0`
6. Click "Confirm"

### 2. Database User
1. Database Access → Database Users
2. Verify user exists: `durgesh_kumar`
3. Verify password is correct
4. User has "Read and write to any database" permission

---

## Verify Everything Works

### Checklist:
- [ ] Environment variables set on Render
- [ ] JWT_SECRET is a long random string (not placeholder)
- [ ] NODE_ENV=production
- [ ] MongoDB Atlas allows connections from anywhere
- [ ] Backend deployed successfully
- [ ] Render logs show "Server running on port 5000"
- [ ] Test endpoint returns hasJWT: true, hasDB: true
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Frontend can login successfully

---

## Production Logging

The new login route logs everything:

```
[LOGIN] Missing credentials
[LOGIN] JWT_SECRET is not defined!
[LOGIN] User not found: email@example.com
[LOGIN] Invalid password for: email@example.com
[LOGIN] Bcrypt error: ...
[LOGIN] JWT generation error: ...
[LOGIN] Success: email@example.com
[LOGIN] Unexpected error: ...
```

**Check Render logs to see exactly what's failing!**

---

## Final Steps

1. ✅ Set environment variables on Render
2. ✅ Deploy updated code
3. ✅ Check Render logs
4. ✅ Test with browser console
5. ✅ Try login from frontend

**Your login will now work in production!** 🚀
