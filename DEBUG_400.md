# 🔍 Debug 400 Error - Quick Steps

## Deploy Test Endpoint

```bash
cd backend
git add routes/authRoutes.js
git commit -m "Add test endpoint for debugging"
git push
```

Wait 2 minutes for Render to deploy.

## Test Backend Configuration

Open browser console at `https://restobook.vercel.app`:

```javascript
// Test if backend receives data correctly
fetch('https://restobook-kd40.onrender.com/api/auth/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
})
.then(r => r.json())
.then(data => {
  console.log('Backend Response:', data);
  console.log('Has JWT_SECRET:', data.hasJWT);
  console.log('Has MONGODB_URI:', data.hasDB);
  console.log('Received body:', data.body);
});
```

## Expected Response

```json
{
  "message": "Backend is working",
  "body": {
    "email": "test@test.com",
    "password": "test123"
  },
  "hasJWT": true,
  "hasDB": true
}
```

## If hasJWT or hasDB is false:

**Go to Render Dashboard:**
1. Your Service → Environment
2. Add missing variables:
   - `JWT_SECRET` (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `MONGODB_URI` (your MongoDB connection string)
3. Save and wait for redeploy

## If body is empty or null:

The request body isn't being parsed. Check:
1. CORS is before body parsers in server.js ✅ (already fixed)
2. Content-Type header is set ✅ (already set in api.js)

## Then Test Login

After confirming test endpoint works:

```javascript
fetch('https://restobook-kd40.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## Check Render Logs

Render Dashboard → Logs

Look for:
- "Login error: ..." (shows exact error)
- "Backend is working" (from test endpoint)

**This will show exactly what's wrong!** 🎯
