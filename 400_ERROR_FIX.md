# 🔍 400 Bad Request - Troubleshooting

## ✅ CORS Fixed!
No more CORS errors - the request is reaching the backend.

## ❌ 400 Bad Request Issue

### Possible Causes:

1. **Missing Environment Variables on Render**
2. **Database Connection Issue**
3. **Missing Request Body**
4. **JWT_SECRET not set**

---

## Fix Steps

### 1. Check Render Environment Variables

Go to Render Dashboard → Your Service → Environment

**Required Variables:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
```

**Generate JWT_SECRET** (if missing):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Check Render Logs

Render Dashboard → Your Service → Logs

Look for:
- "Login error: ..." (shows the actual error)
- "MongoDB connected" (confirms DB connection)
- "Server running on port 5000"

### 3. Test Backend Directly

```bash
# Test health endpoint
curl https://restobook-kd40.onrender.com/api/health

# Test login with curl
curl -X POST https://restobook-kd40.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### 4. Create Test User

If no users exist, register one first:

```bash
curl -X POST https://restobook-kd40.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@test.com",
    "password":"password123"
  }'
```

---

## Deploy Updated Auth Routes

```bash
cd backend
git add routes/authRoutes.js
git commit -m "Add input validation and better error logging"
git push
```

Wait for Render to redeploy, then check logs for detailed error messages.

---

## Common Issues

### Issue: "JWT_SECRET is not defined"
**Fix**: Add JWT_SECRET to Render environment variables

### Issue: "MongoServerError: ..."
**Fix**: Check MONGODB_URI is correct and MongoDB Atlas allows Render IPs

### Issue: "User not found"
**Fix**: Register a user first using /api/auth/register

### Issue: "Invalid email or password"
**Fix**: Check credentials are correct

---

## Check Logs After Deploy

Render logs will now show:
- "Login error: [specific error]"
- "Registration error: [specific error]"

This will tell you exactly what's wrong!

---

## Quick Test

1. Deploy the updated authRoutes.js
2. Check Render logs
3. Try login from frontend
4. Check logs for error message
5. Fix based on error message

**The logs will tell you exactly what's wrong!** 🔍
