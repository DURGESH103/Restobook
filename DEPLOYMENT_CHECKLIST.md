# 🚀 Deployment Checklist - CORS Fix

## ✅ Changes Made

### Backend (server.js)
- [x] Updated CORS configuration
- [x] Added `https://restobook.vercel.app` to allowed origins
- [x] Added explicit methods: GET, POST, PUT, DELETE, OPTIONS
- [x] Added allowed headers: Content-Type, Authorization
- [x] Set preflight cache: 600 seconds

### Frontend (utils/api.js)
- [x] Fixed API base URL to auto-append `/api`
- [x] Maintains compatibility with existing env var

---

## 📋 Deployment Steps

### Step 1: Deploy Backend to Render
```bash
cd backend
git add server.js
git commit -m "Fix CORS configuration for Vercel frontend"
git push origin main
```

**Wait for Render to redeploy** (check Render dashboard)

### Step 2: Deploy Frontend to Vercel
```bash
cd frontend
git add src/utils/api.js
git commit -m "Fix API base URL to include /api prefix"
git push origin main
```

**Wait for Vercel to redeploy** (check Vercel dashboard)

---

## 🧪 Testing After Deployment

### 1. Test Health Endpoint
Open browser console at `https://restobook.vercel.app`:

```javascript
fetch('https://restobook-kd40.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log);

// Expected: { status: 'OK', environment: 'production', ... }
```

### 2. Test CORS Headers
```javascript
fetch('https://restobook-kd40.onrender.com/api/health', {
  method: 'OPTIONS'
})
.then(r => {
  console.log('CORS Headers:');
  console.log('Allow-Origin:', r.headers.get('access-control-allow-origin'));
  console.log('Allow-Methods:', r.headers.get('access-control-allow-methods'));
  console.log('Allow-Headers:', r.headers.get('access-control-allow-headers'));
});

// Expected:
// Allow-Origin: https://restobook.vercel.app
// Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
// Allow-Headers: Content-Type, Authorization
```

### 3. Test Login
1. Go to `https://restobook.vercel.app/login`
2. Enter credentials
3. Click Login
4. Check browser console - should see NO CORS errors
5. Should redirect to dashboard on success

### 4. Test Menu Loading
1. Go to `https://restobook.vercel.app/menu`
2. Menu items should load
3. No CORS errors in console

---

## ✅ Success Indicators

- [ ] No CORS errors in browser console
- [ ] Login works successfully
- [ ] Menu items load
- [ ] Booking form submits
- [ ] Admin dashboard loads data
- [ ] All API calls succeed

---

## 🐛 Troubleshooting

### Still Getting CORS Error?

**1. Clear Cache**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**2. Check Render Logs**
```
Render Dashboard → Your Service → Logs
```
Look for:
- "Server running on port 5000"
- No CORS-related errors

**3. Verify Environment Variables**
Render Dashboard → Your Service → Environment:
- `NODE_ENV=production`
- `MONGODB_URI=your_connection_string`

**4. Check Vercel Environment Variables**
Vercel Dashboard → Your Project → Settings → Environment Variables:
- `REACT_APP_API_URL=https://restobook-kd40.onrender.com`

**5. Test Backend Directly**
```bash
curl -I https://restobook-kd40.onrender.com/api/health
```
Should return `200 OK`

**6. Test CORS from Command Line**
```bash
curl -H "Origin: https://restobook.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://restobook-kd40.onrender.com/api/auth/login -v
```

Should return CORS headers in response.

---

## 📝 Quick Reference

### API Endpoints
```
Backend Base: https://restobook-kd40.onrender.com
API Base:     https://restobook-kd40.onrender.com/api

Auth:         /api/auth/login, /api/auth/register
Menu:         /api/menu
Bookings:     /api/bookings
Admin:        /api/admin/bookings
```

### Frontend URLs
```
Production:   https://restobook.vercel.app
Login:        https://restobook.vercel.app/login
Menu:         https://restobook.vercel.app/menu
Admin:        https://restobook.vercel.app/admin
```

---

## 🎉 Done!

After deploying both backend and frontend:
1. ✅ CORS errors resolved
2. ✅ API calls working
3. ✅ Login functional
4. ✅ Data loading correctly
5. ✅ Production ready

**Your MERN app is now live and working!** 🚀
