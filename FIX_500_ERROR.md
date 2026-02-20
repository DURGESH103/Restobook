# 🔧 Fix 500 Error - Render Environment Variables

## Problem
500 Internal Server Error = Backend is crashing, likely due to invalid JWT_SECRET

## Solution
Set proper environment variables on Render

---

## Steps to Fix

### 1. Go to Render Dashboard
https://dashboard.render.com

### 2. Select Your Service
Click on your backend service (restobook-kd40)

### 3. Go to Environment Tab
Left sidebar → Environment

### 4. Set These Variables

**Delete any existing variables and add these:**

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://durgesh_kumar:GQI6yL3PzHeUbT0L@cluster0.3wydx.mongodb.net/restobook
JWT_SECRET=6c24a30965a06e1c9da797728f6347244142eaf21d22c5d3111e59089dbd3eef
JWT_EXPIRE=7d
```

**IMPORTANT:** 
- Use the JWT_SECRET above (already generated)
- Make sure MONGODB_URI is exactly as shown
- Set NODE_ENV to `production` (not `development`)

### 5. Save Changes
Click "Save Changes" button

### 6. Wait for Redeploy
Render will automatically redeploy (takes 2-3 minutes)

### 7. Check Logs
After deploy, go to Logs tab and verify:
- "MongoDB connected successfully" ✅
- "Server running on port 5000" ✅
- No error messages ✅

---

## Test After Deploy

Open browser console at https://restobook.vercel.app:

```javascript
// Test login
fetch('https://restobook-kd40.onrender.com/api/auth/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test', password: 'test' })
})
.then(r => r.json())
.then(data => {
  console.log('Backend Status:', data);
  console.log('Has JWT:', data.hasJWT); // Should be true
  console.log('Has DB:', data.hasDB);   // Should be true
});
```

Expected response:
```json
{
  "message": "Backend is working",
  "hasJWT": true,
  "hasDB": true,
  "body": { "email": "test", "password": "test" }
}
```

---

## If Still Getting 500 Error

### Check Render Logs
Look for specific error messages like:
- "MongoServerError" → Database connection issue
- "JWT" → JWT_SECRET issue
- "Cannot read property" → Missing environment variable

### Common Issues

**Issue: "MongoServerError: bad auth"**
- Fix: Check MONGODB_URI username/password are correct

**Issue: "JWT_SECRET is not defined"**
- Fix: Make sure JWT_SECRET is set in Render environment

**Issue: "Cannot connect to MongoDB"**
- Fix: Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

---

## MongoDB Atlas Network Access

If database connection fails:

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere"
4. Add IP: `0.0.0.0/0`
5. Save

---

## After Setting Variables

1. ✅ Render will auto-redeploy
2. ✅ Wait 2-3 minutes
3. ✅ Check logs for "Server running"
4. ✅ Test login from frontend
5. ✅ Should work now!

**Set the environment variables on Render and it will work!** 🚀
