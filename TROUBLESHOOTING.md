# 🔧 Deployment Troubleshooting Guide

## Error: "Access to XMLHttpRequest blocked by CORS policy"

### Symptoms
- Frontend can't connect to backend
- Console shows CORS error
- API calls fail with network error

### Solutions
1. **Check FRONTEND_URL in Render**
   ```
   Go to Render → Your Service → Environment
   Verify FRONTEND_URL matches your Vercel URL exactly
   Example: https://restobook-frontend.vercel.app (no trailing slash)
   ```

2. **Verify CORS Configuration**
   ```javascript
   // In server.js, ensure:
   const allowedOrigins = [
     process.env.FRONTEND_URL,
     'http://localhost:3000'
   ].filter(Boolean);
   ```

3. **Check API URL in Frontend**
   ```
   Vercel → Your Project → Settings → Environment Variables
   Verify REACT_APP_API_URL or VITE_API_URL is correct
   ```

4. **Redeploy Both Services**
   - Render: Click "Manual Deploy" → "Deploy latest commit"
   - Vercel: Deployments → Click "Redeploy"

---

## Error: "502 Bad Gateway" on Render

### Symptoms
- Backend URL returns 502
- Health check fails
- Service shows "Deploy failed"

### Solutions
1. **Check Render Logs**
   ```
   Render Dashboard → Your Service → Logs
   Look for error messages
   ```

2. **Common Causes**
   - MongoDB connection failed
   - Missing environment variables
   - Port binding issue
   - Build failed

3. **Verify Environment Variables**
   ```
   Required variables:
   - MONGODB_URI (must be valid)
   - JWT_SECRET (must be set)
   - NODE_ENV=production
   - FRONTEND_URL (must be set)
   ```

4. **Check MongoDB Connection**
   ```
   Test connection string in MongoDB Compass
   Ensure password is URL-encoded
   Verify IP whitelist includes 0.0.0.0/0
   ```

5. **Verify Start Command**
   ```
   Render → Settings → Build & Deploy
   Start Command: npm start
   ```

---

## Error: "MongoServerError: bad auth"

### Symptoms
- Backend logs show MongoDB authentication error
- Can't connect to database
- "Authentication failed" message

### Solutions
1. **Verify Connection String**
   ```
   Format: mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE
   
   Check:
   - Username is correct
   - Password is correct
   - Password is URL-encoded
   - Database name is included
   ```

2. **URL Encode Special Characters**
   ```
   If password contains special characters:
   ! → %21    @ → %40    # → %23
   $ → %24    % → %25    ^ → %5E
   & → %26    * → %2A
   
   Example:
   Password: Pass@123!
   Encoded: Pass%40123%21
   ```

3. **Check Database User Permissions**
   ```
   MongoDB Atlas → Database Access
   Ensure user has "Read and write to any database"
   ```

4. **Verify Network Access**
   ```
   MongoDB Atlas → Network Access
   Ensure 0.0.0.0/0 is whitelisted
   ```

---

## Error: "Token expired" or "Invalid token"

### Symptoms
- User gets logged out automatically
- API returns 401 Unauthorized
- "Token expired" message

### Solutions
1. **Verify JWT_SECRET**
   ```
   Render → Environment Variables
   Ensure JWT_SECRET is set and matches across deployments
   ```

2. **Check JWT_EXPIRE**
   ```
   Should be set to: 7d
   ```

3. **Clear Browser Storage**
   ```javascript
   // In browser console:
   localStorage.clear();
   // Then re-login
   ```

4. **Verify Token Generation**
   ```javascript
   // In authRoutes.js:
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRE || '7d'
   });
   ```

---

## Error: "404 Not Found" on Page Refresh (Vercel)

### Symptoms
- Direct URL navigation fails
- Page refresh returns 404
- Only homepage works

### Solutions
1. **Verify vercel.json Exists**
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

2. **Check File Location**
   ```
   vercel.json must be in frontend root directory
   Same level as package.json
   ```

3. **Redeploy Frontend**
   ```
   Vercel → Deployments → Redeploy
   ```

---

## Error: Environment Variables Not Loading

### Symptoms
- API calls go to localhost
- Features don't work in production
- Console shows undefined variables

### Solutions
1. **Check Variable Names**
   ```
   Create React App: REACT_APP_API_URL
   Vite: VITE_API_URL
   ```

2. **Verify in Vercel**
   ```
   Vercel → Settings → Environment Variables
   Ensure variables are set for "Production"
   ```

3. **Rebuild Frontend**
   ```
   Environment variables are baked into build
   Must redeploy after changing them
   ```

4. **Check .env.production**
   ```
   Should NOT be committed to Git
   Only used for local production builds
   ```

---

## Error: Render Free Tier Sleeping

### Symptoms
- First request takes 30+ seconds
- "Service unavailable" initially
- Works after waiting

### Solutions
1. **This is Normal for Free Tier**
   - Free tier sleeps after 15 minutes of inactivity
   - First request wakes it up (takes 30-60 seconds)

2. **Upgrade to Paid Tier**
   ```
   Render Starter: $7/month
   - No sleeping
   - Better performance
   - More resources
   ```

3. **Keep-Alive Workaround**
   ```
   Use a cron job to ping every 10 minutes:
   https://cron-job.org
   
   URL to ping: https://your-backend.onrender.com/api/health
   Interval: Every 10 minutes
   ```

---

## Error: "Cannot read property of undefined"

### Symptoms
- Frontend crashes
- Console shows undefined errors
- Components don't render

### Solutions
1. **Check API Response Format**
   ```javascript
   // Ensure backend returns consistent format
   res.json({ data: items }) // Not just res.json(items)
   ```

2. **Add Optional Chaining**
   ```javascript
   // Instead of: user.name
   // Use: user?.name
   ```

3. **Check Network Tab**
   ```
   Browser DevTools → Network
   Verify API responses are correct format
   ```

---

## Error: Build Failed on Render

### Symptoms
- Deployment fails
- "Build failed" message
- Service doesn't start

### Solutions
1. **Check Build Logs**
   ```
   Render → Logs → Build Logs
   Look for npm install errors
   ```

2. **Verify package.json**
   ```json
   {
     "engines": {
       "node": "18.x"
     },
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

3. **Check Dependencies**
   ```bash
   # Test locally:
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

4. **Verify Build Command**
   ```
   Render → Settings → Build Command
   Should be: npm install
   ```

---

## Error: Build Failed on Vercel

### Symptoms
- Frontend deployment fails
- Build errors in logs
- Site doesn't deploy

### Solutions
1. **Check Build Logs**
   ```
   Vercel → Deployments → Failed Deployment → View Logs
   ```

2. **Test Build Locally**
   ```bash
   cd frontend
   npm run build
   # Fix any errors that appear
   ```

3. **Check Build Settings**
   ```
   Vercel → Settings → General
   Framework Preset: Create React App (or Vite)
   Build Command: npm run build
   Output Directory: build (or dist for Vite)
   ```

4. **Verify Node Version**
   ```json
   // In package.json:
   "engines": {
     "node": "18.x"
   }
   ```

---

## Error: "Rate limit exceeded"

### Symptoms
- API returns 429 status
- "Too many requests" message
- Requests blocked

### Solutions
1. **This is Security Feature**
   - Auth routes: 5 requests per 15 minutes
   - API routes: 100 requests per 15 minutes

2. **Wait and Retry**
   ```
   Wait 15 minutes for rate limit to reset
   ```

3. **Adjust Rate Limits (if needed)**
   ```javascript
   // In middleware/security.js:
   const authLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 10, // Increase from 5
   });
   ```

---

## Error: Images Not Loading

### Symptoms
- Menu item images broken
- Gallery images don't show
- 404 on image URLs

### Solutions
1. **Use Full URLs**
   ```javascript
   // Instead of: /images/food.jpg
   // Use: https://your-cdn.com/images/food.jpg
   ```

2. **Use Image Hosting**
   ```
   Recommended services:
   - Cloudinary (free tier)
   - ImgBB
   - AWS S3
   ```

3. **Check CORS for Images**
   ```
   If using external CDN, ensure CORS is enabled
   ```

---

## Quick Diagnostic Commands

### Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

### Test Backend CORS
```bash
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://your-backend.onrender.com/api/auth/login
```

### Test MongoDB Connection
```bash
# Use MongoDB Compass with your connection string
```

### Check Environment Variables
```bash
# In Render logs, you'll see:
[PRODUCTION] Server running on port 5000

# If you see [DEVELOPMENT], NODE_ENV is not set correctly
```

---

## Getting Help

### Render Support
- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Status: https://vercel-status.com

### MongoDB Atlas Support
- Docs: https://docs.atlas.mongodb.com
- Community: https://community.mongodb.com
- Status: https://status.mongodb.com

---

## Still Having Issues?

1. **Check Service Status Pages**
   - Render, Vercel, MongoDB Atlas might be down

2. **Review All Environment Variables**
   - Print them in logs (without sensitive values)

3. **Test Locally First**
   - If it works locally, it's a deployment config issue

4. **Check Browser Console**
   - Often shows the real error

5. **Review Recent Changes**
   - What changed since it last worked?

6. **Start Fresh**
   - Sometimes easier to redeploy from scratch
