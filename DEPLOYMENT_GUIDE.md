# 🚀 Complete Production Deployment Guide
## RestoBook - MERN Restaurant System

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Backend Preparation
- [x] Security middleware added (helmet, rate limiting, sanitization)
- [x] CORS configured for production
- [x] Error handling middleware
- [x] Environment variables configured
- [x] MongoDB connection string ready
- [x] JWT secret generated
- [x] Trust proxy enabled for Render
- [x] Health check endpoint added

### Frontend Preparation
- [x] API URL environment variable configured
- [x] vercel.json created for SPA routing
- [x] Axios interceptors for token handling
- [x] 401 error handling
- [x] Build command verified

---

## PART 1: MONGODB ATLAS SETUP

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click "Build a Database"

### Step 2: Create Cluster
1. Choose **FREE** tier (M0 Sandbox)
2. Select cloud provider: **AWS**
3. Select region: **Closest to your users**
4. Cluster name: `restobook-cluster`
5. Click "Create"

### Step 3: Create Database User
1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `restobook-admin`
5. Password: **Generate secure password** (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### Step 4: Configure Network Access
1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Required for Render deployment
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to **Database** → Click "Connect"
2. Choose "Connect your application"
3. Driver: **Node.js**, Version: **4.1 or later**
4. Copy connection string:
   ```
   mongodb+srv://restobook-admin:<password>@restobook-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before `?`:
   ```
   mongodb+srv://restobook-admin:YOUR_PASSWORD@restobook-cluster.xxxxx.mongodb.net/restobook?retryWrites=true&w=majority
   ```

✅ **MongoDB Atlas Setup Complete!**

---

## PART 2: BACKEND DEPLOYMENT (RENDER)

### Step 1: Prepare Backend Code
1. Install security dependencies:
   ```bash
   cd backend
   npm install express-rate-limit express-mongo-sanitize helmet express-validator
   ```

2. Verify package.json has correct start script:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

3. Generate JWT Secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Save the output!

### Step 2: Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Production ready backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restobook-backend.git
git push -u origin main
```

### Step 3: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 4: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your `restobook-backend` repository
3. Configure:
   - **Name**: `restobook-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `backend` if monorepo)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 5: Add Environment Variables
Click "Advanced" → "Add Environment Variable":

```
MONGODB_URI=mongodb+srv://restobook-admin:YOUR_PASSWORD@restobook-cluster.xxxxx.mongodb.net/restobook?retryWrites=true&w=majority

JWT_SECRET=your-generated-64-character-secret-from-step-1

JWT_EXPIRE=7d

NODE_ENV=production

FRONTEND_URL=https://your-app.vercel.app
(Leave blank for now, update after Vercel deployment)

PORT=5000
```

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Your backend URL: `https://restobook-backend.onrender.com`

### Step 7: Test Backend
```bash
# Health check
curl https://restobook-backend.onrender.com/api/health

# Expected response:
{"status":"OK","environment":"production","timestamp":"2024-01-15T10:30:00.000Z"}
```

✅ **Backend Deployed on Render!**

---

## PART 3: FRONTEND DEPLOYMENT (VERCEL)

### Step 1: Update Frontend Environment
1. Create `.env.production` in frontend folder:
   ```
   REACT_APP_API_URL=https://restobook-backend.onrender.com/api
   ```

2. Verify vercel.json exists in frontend folder

### Step 2: Push Frontend to GitHub
```bash
cd frontend
git init
git add .
git commit -m "Production ready frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restobook-frontend.git
git push -u origin main
```

### Step 3: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 4: Import Project
1. Click "Add New..." → "Project"
2. Import `restobook-frontend` repository
3. Configure:
   - **Framework Preset**: Create React App (or Vite)
   - **Root Directory**: Leave empty (or `frontend` if monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build` (or `dist` for Vite)

### Step 5: Add Environment Variables
Click "Environment Variables":

```
REACT_APP_API_URL=https://restobook-backend.onrender.com/api
```

Or if using Vite:
```
VITE_API_URL=https://restobook-backend.onrender.com/api
```

### Step 6: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your frontend URL: `https://restobook-frontend.vercel.app`

### Step 7: Update Backend FRONTEND_URL
1. Go back to Render dashboard
2. Select your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://restobook-frontend.vercel.app
   ```
5. Click "Save Changes"
6. Service will auto-redeploy

✅ **Frontend Deployed on Vercel!**

---

## PART 4: PRODUCTION HARDENING

### Security Checklist
- [x] HTTPS enforced (automatic on Render/Vercel)
- [x] CORS whitelist configured
- [x] Rate limiting enabled (5 auth requests/15min, 100 API/15min)
- [x] Helmet security headers
- [x] MongoDB injection protection
- [x] Input validation on all routes
- [x] JWT expiration (7 days)
- [x] Password hashing (bcrypt)
- [x] Environment variables secured
- [x] No credentials in code
- [x] Trust proxy enabled

### Performance Optimizations
- [x] MongoDB indexes created
- [x] Lean queries used
- [x] React lazy loading
- [x] Code splitting
- [x] Memoized components
- [x] Axios timeout (15s)
- [x] Request size limits (10mb)

### Monitoring Setup
1. **Render Logs**: Dashboard → Logs tab
2. **Vercel Analytics**: Dashboard → Analytics tab
3. **MongoDB Monitoring**: Atlas → Metrics tab

---

## PART 5: COMMON DEPLOYMENT ISSUES & FIXES

### Issue 1: CORS Error
**Symptom**: "Access to XMLHttpRequest blocked by CORS policy"

**Fix**:
1. Verify FRONTEND_URL in Render matches your Vercel URL exactly
2. Check CORS configuration in server.js
3. Ensure credentials: true in CORS config
4. Redeploy backend after changes

### Issue 2: 502 Bad Gateway (Render)
**Symptom**: Backend not responding

**Fix**:
1. Check Render logs for errors
2. Verify MongoDB connection string is correct
3. Ensure all environment variables are set
4. Check if free tier is sleeping (first request takes 30s)

### Issue 3: MongoDB Connection Failed
**Symptom**: "MongoServerError: bad auth"

**Fix**:
1. Verify username/password in connection string
2. Check if special characters in password are URL-encoded
3. Verify database user has correct permissions
4. Check Network Access allows 0.0.0.0/0

### Issue 4: JWT Token Not Working
**Symptom**: "Token expired" or "Invalid token"

**Fix**:
1. Verify JWT_SECRET is set in Render
2. Check JWT_EXPIRE is set (7d)
3. Clear localStorage in browser
4. Re-login to get new token

### Issue 5: Environment Variables Not Loading
**Symptom**: API calls to localhost instead of production URL

**Fix**:
1. Verify .env.production exists
2. Check variable names (REACT_APP_ or VITE_)
3. Rebuild and redeploy frontend
4. Clear browser cache

### Issue 6: 404 on Page Refresh (Vercel)
**Symptom**: Direct URL navigation fails

**Fix**:
1. Verify vercel.json exists with rewrites
2. Redeploy frontend
3. Check Framework Preset is correct

### Issue 7: Render Free Tier Sleeping
**Symptom**: First request takes 30+ seconds

**Solution**:
- Free tier sleeps after 15 minutes of inactivity
- Consider upgrading to paid tier ($7/month)
- Or use a cron job to ping every 10 minutes

---

## PART 6: FINAL TESTING CHECKLIST

### Backend Tests
```bash
# Health check
curl https://restobook-backend.onrender.com/api/health

# Get menu items
curl https://restobook-backend.onrender.com/api/menu

# Register user
curl -X POST https://restobook-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Frontend Tests (Manual)
1. ✅ Homepage loads
2. ✅ Menu page displays items
3. ✅ User registration works
4. ✅ User login works
5. ✅ JWT token persists
6. ✅ Booking creation works
7. ✅ User dashboard shows bookings
8. ✅ Admin login works
9. ✅ Admin dashboard shows bookings
10. ✅ Admin can approve/reject bookings
11. ✅ Review submission works
12. ✅ Admin can reply to reviews
13. ✅ Dark mode toggle works
14. ✅ Mobile responsive
15. ✅ Page refresh doesn't break routing

### Database Verification
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Verify collections exist:
   - users
   - menuitems
   - bookings
   - reviews
   - testimonials

---

## PART 7: POST-DEPLOYMENT TASKS

### 1. Create Admin User
```bash
# Register first admin via API or MongoDB Atlas
# In Atlas: Database → Browse Collections → users → Insert Document
{
  "name": "Admin Name",
  "email": "admin@restobook.com",
  "password": "$2a$10$...", // Use bcrypt to hash password
  "role": "ADMIN",
  "createdAt": ISODate(),
  "updatedAt": ISODate()
}
```

Or use registration endpoint and manually update role in database.

### 2. Add Sample Menu Items
Use admin dashboard or seed script to add menu items.

### 3. Configure Custom Domain (Optional)
**Vercel**:
1. Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records

**Render**:
1. Dashboard → Settings → Custom Domain
2. Add domain
3. Update DNS records

### 4. Enable Analytics
**Vercel**: Automatically enabled
**Render**: Check Metrics tab

### 5. Set Up Monitoring
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user tracking

---

## 📊 DEPLOYMENT SUMMARY

| Service | Platform | URL | Status |
|---------|----------|-----|--------|
| Frontend | Vercel | https://restobook-frontend.vercel.app | ✅ |
| Backend | Render | https://restobook-backend.onrender.com | ✅ |
| Database | MongoDB Atlas | Cluster: restobook-cluster | ✅ |

---

## 🔐 SECURITY NOTES

1. **Never commit .env files** - Added to .gitignore
2. **Rotate JWT secret** every 90 days
3. **Monitor MongoDB Atlas** for unusual activity
4. **Enable 2FA** on Render, Vercel, and MongoDB Atlas
5. **Regular backups** - MongoDB Atlas auto-backups on paid tier
6. **Update dependencies** monthly: `npm audit fix`

---

## 💰 COST BREAKDOWN

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Hobby | Free |
| Render | Free | Free (sleeps after 15min) |
| MongoDB Atlas | M0 | Free (512MB storage) |
| **Total** | | **$0/month** |

### Upgrade Recommendations:
- **Render Starter**: $7/month (no sleeping, better performance)
- **MongoDB M10**: $9/month (2GB RAM, auto-backups)
- **Vercel Pro**: $20/month (better analytics, more bandwidth)

---

## 📞 SUPPORT & TROUBLESHOOTING

### Render Support
- Docs: https://render.com/docs
- Community: https://community.render.com

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

### MongoDB Atlas Support
- Docs: https://docs.atlas.mongodb.com
- Community: https://community.mongodb.com

---

## 🎉 CONGRATULATIONS!

Your RestoBook restaurant system is now live on the internet!

**Next Steps**:
1. Share your live URL with users
2. Monitor logs for errors
3. Collect user feedback
4. Iterate and improve

**Your Live URLs**:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- API Docs: `https://your-backend.onrender.com/api/health`

---

## 📝 MAINTENANCE CHECKLIST

### Daily
- [ ] Check error logs on Render
- [ ] Monitor MongoDB Atlas metrics

### Weekly
- [ ] Review user feedback
- [ ] Check API response times
- [ ] Verify backups (if paid tier)

### Monthly
- [ ] Update npm dependencies
- [ ] Review security alerts
- [ ] Analyze usage metrics
- [ ] Optimize slow queries

### Quarterly
- [ ] Rotate JWT secret
- [ ] Review and update CORS whitelist
- [ ] Performance audit
- [ ] Security audit

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Version**: 1.0.0
