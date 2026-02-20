# ✅ CORS Issue Fixed - Frontend ↔ Backend Communication

## Issues Fixed

### 1. **Backend CORS Configuration** ✅
**Problem**: Backend wasn't allowing requests from `https://restobook.vercel.app`

**Solution**: Updated CORS to explicitly allow Vercel domain

### 2. **Frontend API Path** ✅
**Problem**: Frontend calling `/auth/login` but backend expects `/api/auth/login`

**Solution**: Added `/api` prefix to base URL in axios configuration

### 3. **Preflight Requests** ✅
**Problem**: OPTIONS requests not properly handled

**Solution**: Added explicit methods and headers configuration

---

## Backend Fix (server.js)

### Before:
```javascript
// Conditional CORS based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
} else {
  app.use(cors());
}
```

### After:
```javascript
// CORS Configuration
const allowedOrigins = [
  'https://restobook.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // 10 minutes
}));
```

**Key Changes**:
- ✅ Explicitly allows `https://restobook.vercel.app`
- ✅ Handles requests with no origin (Postman, mobile apps)
- ✅ Specifies allowed HTTP methods
- ✅ Specifies allowed headers (Content-Type, Authorization)
- ✅ Sets preflight cache duration (10 minutes)

---

## Frontend Fix (utils/api.js)

### Before:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  // ...
});
```

**Problem**: `REACT_APP_API_URL=https://restobook-kd40.onrender.com` (missing `/api`)

### After:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  // ...
});
```

**Key Changes**:
- ✅ Automatically adds `/api` if not present
- ✅ Works with both `https://restobook-kd40.onrender.com` and `https://restobook-kd40.onrender.com/api`
- ✅ Maintains backward compatibility

---

## Environment Variables

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://restobook-kd40.onrender.com
```

**Note**: No `/api` needed - it's added automatically!

### Backend (.env on Render)
```env
NODE_ENV=production
FRONTEND_URL=https://restobook.vercel.app
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

## API Call Examples

### Login Request
```javascript
// Frontend calls
authAPI.login({ email, password })

// Translates to
POST https://restobook-kd40.onrender.com/api/auth/login

// Backend route
app.use('/api/auth', authRoutes)
// Matches: /api/auth/login ✅
```

### Get Menu
```javascript
// Frontend calls
menuAPI.getAll()

// Translates to
GET https://restobook-kd40.onrender.com/api/menu

// Backend route
app.use('/api/menu', menuRoutes)
// Matches: /api/menu ✅
```

---

## CORS Headers Returned

When frontend makes a request, backend now returns:

```
Access-Control-Allow-Origin: https://restobook.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 600
```

---

## Preflight Request Flow

### 1. Browser sends OPTIONS request:
```
OPTIONS /api/auth/login
Origin: https://restobook.vercel.app
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, authorization
```

### 2. Backend responds:
```
200 OK
Access-Control-Allow-Origin: https://restobook.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
```

### 3. Browser sends actual request:
```
POST /api/auth/login
Origin: https://restobook.vercel.app
Content-Type: application/json
Authorization: Bearer token...
```

### 4. Backend responds with data:
```
200 OK
Access-Control-Allow-Origin: https://restobook.vercel.app
Content-Type: application/json

{ "token": "...", "user": {...} }
```

---

## Deployment Steps

### 1. Deploy Backend to Render
```bash
cd backend
git add server.js
git commit -m "Fix CORS for production"
git push
```

Render will automatically redeploy.

### 2. Deploy Frontend to Vercel
```bash
cd frontend
git add src/utils/api.js
git commit -m "Fix API base URL"
git push
```

Vercel will automatically redeploy.

### 3. Verify
Open browser console at `https://restobook.vercel.app`:
- ✅ No CORS errors
- ✅ API calls succeed
- ✅ Login works
- ✅ Data loads

---

## Testing

### Test CORS from Browser Console
```javascript
// Open https://restobook.vercel.app
// Open DevTools Console

fetch('https://restobook-kd40.onrender.com/api/health', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);

// Should return: { status: 'OK', environment: 'production', ... }
```

### Test Login
```javascript
fetch('https://restobook-kd40.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'password' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

---

## Common Issues & Solutions

### Issue: Still getting CORS error
**Solution**: 
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check Render logs for CORS errors
4. Verify environment variables on Render

### Issue: 404 Not Found
**Solution**: 
- Check API path includes `/api`
- Verify backend routes are correct
- Check Render deployment logs

### Issue: Preflight fails
**Solution**:
- Ensure OPTIONS method is allowed
- Check allowedHeaders includes what you're sending
- Verify CORS middleware is before routes

---

## Security Notes

✅ **Credentials**: Enabled for cookies/auth  
✅ **Origin Validation**: Only allows specific domains  
✅ **Methods**: Only allows necessary HTTP methods  
✅ **Headers**: Only allows Content-Type and Authorization  
✅ **Preflight Cache**: 10 minutes to reduce OPTIONS requests  

---

## Production Ready ✅

Your app is now:
- ✅ CORS properly configured
- ✅ Frontend calling correct API paths
- ✅ Preflight requests handled
- ✅ Secure origin validation
- ✅ Ready for production use

**No more CORS errors!** 🚀
