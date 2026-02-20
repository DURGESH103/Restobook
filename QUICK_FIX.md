# ⚡ Quick Fix - 500 Error

## 1. Deploy Fixed Code

```bash
cd backend
git add routes/authRoutes.js models/User.js
git commit -m "Fix 500 error - production-safe login"
git push
```

## 2. Set Render Environment Variables

**Render Dashboard → Environment → Add:**

```
JWT_SECRET=6c24a30965a06e1c9da797728f6347244142eaf21d22c5d3111e59089dbd3eef
NODE_ENV=production
JWT_EXPIRE=7d
MONGODB_URI=mongodb+srv://durgesh_kumar:GQI6yL3PzHeUbT0L@cluster0.3wydx.mongodb.net/restobook
```

**Save → Wait 2-3 minutes**

## 3. Check Render Logs

Look for:
- ✅ "Server running on port 5000"
- ✅ "MongoDB connected"
- ✅ "[LOGIN] Success: ..."

## 4. Test

```javascript
// Browser console at https://restobook.vercel.app
fetch('https://restobook-kd40.onrender.com/api/auth/test', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({})
}).then(r=>r.json()).then(d => {
  console.log('JWT:', d.hasJWT, 'DB:', d.hasDB);
});
```

Both should be `true`

## 5. Create User & Login

```javascript
// Register
fetch('https://restobook-kd40.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com',
    password: 'test123'
  })
}).then(r=>r.json()).then(console.log);

// Login
fetch('https://restobook-kd40.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123'
  })
}).then(r=>r.json()).then(console.log);
```

## Done! ✅

Login will now work on production.
