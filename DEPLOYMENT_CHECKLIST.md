# ✅ Production Deployment Checklist

## Pre-Deployment

### Code Preparation
- [ ] All security dependencies installed
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Error handling middleware added
- [ ] Rate limiting enabled
- [ ] Input validation on all routes
- [ ] Console logs removed/disabled in production
- [ ] .gitignore files created
- [ ] No sensitive data in code

### Testing Locally
- [ ] Backend runs without errors
- [ ] Frontend runs without errors
- [ ] Registration works
- [ ] Login works
- [ ] JWT token persists
- [ ] Booking creation works
- [ ] Admin features work
- [ ] Review system works

---

## MongoDB Atlas Setup

- [ ] Account created
- [ ] Cluster created (M0 Free tier)
- [ ] Database user created with strong password
- [ ] Password saved securely
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] Password URL-encoded in connection string
- [ ] Database name added to connection string
- [ ] Connection tested in MongoDB Compass

**Connection String Format:**
```
mongodb+srv://USERNAME:URL_ENCODED_PASSWORD@cluster.mongodb.net/restobook?retryWrites=true&w=majority
```

---

## Backend Deployment (Render)

### Repository Setup
- [ ] Backend code pushed to GitHub
- [ ] Repository is public or Render has access
- [ ] .gitignore prevents .env from being committed

### Render Configuration
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] New Web Service created
- [ ] Correct repository selected
- [ ] Branch set to `main`
- [ ] Runtime set to `Node`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Instance type: `Free`

### Environment Variables Set
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - 64-character random string
- [ ] `JWT_EXPIRE` - Set to `7d`
- [ ] `NODE_ENV` - Set to `production`
- [ ] `FRONTEND_URL` - Will update after Vercel deployment
- [ ] `PORT` - Set to `5000`

### Deployment Verification
- [ ] Service deployed successfully
- [ ] No errors in logs
- [ ] Health check passes: `https://YOUR-BACKEND.onrender.com/api/health`
- [ ] Returns: `{"status":"OK","environment":"production",...}`
- [ ] Menu endpoint works: `https://YOUR-BACKEND.onrender.com/api/menu`

**Backend URL:** `https://__________________.onrender.com`

---

## Frontend Deployment (Vercel)

### Repository Setup
- [ ] Frontend code pushed to GitHub
- [ ] vercel.json file exists in frontend root
- [ ] .gitignore prevents .env from being committed

### Vercel Configuration
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Project imported
- [ ] Framework preset: Create React App (or Vite)
- [ ] Root directory correct
- [ ] Build command: `npm run build`
- [ ] Output directory: `build` (or `dist` for Vite)

### Environment Variables Set
- [ ] `REACT_APP_API_URL` - Render backend URL + `/api`
- [ ] OR `VITE_API_URL` if using Vite

**Example:** `https://restobook-backend.onrender.com/api`

### Deployment Verification
- [ ] Project deployed successfully
- [ ] No build errors
- [ ] Site loads: `https://YOUR-APP.vercel.app`
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] No console errors

**Frontend URL:** `https://__________________.vercel.app`

---

## Connect Frontend & Backend

### Update Backend FRONTEND_URL
- [ ] Go to Render dashboard
- [ ] Select backend service
- [ ] Go to Environment tab
- [ ] Update `FRONTEND_URL` with exact Vercel URL
- [ ] Save changes
- [ ] Wait for auto-redeploy (2-3 minutes)

### Verify Connection
- [ ] Open frontend in browser
- [ ] Open browser DevTools → Network tab
- [ ] Try to register a user
- [ ] Check Network tab - API call should succeed
- [ ] No CORS errors in console

---

## Functional Testing

### User Registration & Login
- [ ] Navigate to `/register`
- [ ] Register new user
- [ ] Registration succeeds
- [ ] Redirected to login or dashboard
- [ ] Login with new credentials
- [ ] Login succeeds
- [ ] JWT token stored in localStorage
- [ ] User name appears in navbar

### Menu & Booking
- [ ] Navigate to `/menu`
- [ ] Menu items display
- [ ] Images load correctly
- [ ] Navigate to `/booking`
- [ ] Fill booking form
- [ ] Submit booking
- [ ] Success message appears
- [ ] Navigate to `/my-bookings`
- [ ] Booking appears in list
- [ ] Status shows as PENDING

### Admin Features
- [ ] Create admin user (manually in MongoDB or via API)
- [ ] Login as admin
- [ ] "Admin Dashboard" link appears in navbar
- [ ] Navigate to `/admin`
- [ ] Bookings list loads
- [ ] Statistics display correctly
- [ ] Approve a booking
- [ ] Status updates to CONFIRMED
- [ ] Create menu item
- [ ] Menu item appears in menu

### Review System
- [ ] Login as regular user
- [ ] Navigate to menu item
- [ ] Submit review
- [ ] Review appears
- [ ] Login as admin
- [ ] Reply to review
- [ ] Reply appears under review

### Mobile Responsiveness
- [ ] Open site on mobile device or DevTools mobile view
- [ ] Navigation menu works
- [ ] All pages display correctly
- [ ] Forms are usable
- [ ] Buttons are clickable

### Dark Mode
- [ ] Toggle dark mode
- [ ] Theme persists on page refresh
- [ ] All pages readable in dark mode

### Page Refresh
- [ ] Navigate to `/menu`
- [ ] Refresh page
- [ ] Page loads correctly (no 404)
- [ ] Navigate to `/booking`
- [ ] Refresh page
- [ ] Page loads correctly

---

## Security Verification

### HTTPS
- [ ] Frontend uses HTTPS (automatic on Vercel)
- [ ] Backend uses HTTPS (automatic on Render)
- [ ] No mixed content warnings

### CORS
- [ ] Only allowed origins can access API
- [ ] Test from different domain - should fail

### Rate Limiting
- [ ] Try logging in 6 times with wrong password
- [ ] Should get rate limit error after 5 attempts

### JWT
- [ ] Token expires after 7 days
- [ ] Expired token redirects to login
- [ ] Invalid token rejected

### Input Validation
- [ ] Try submitting empty forms
- [ ] Should show validation errors
- [ ] Try SQL injection in inputs
- [ ] Should be sanitized

---

## Performance Check

### Backend
- [ ] Health check responds in < 1 second
- [ ] API endpoints respond in < 2 seconds
- [ ] No memory leaks in logs
- [ ] MongoDB queries optimized

### Frontend
- [ ] Initial load < 3 seconds
- [ ] Lighthouse score > 80
- [ ] Images optimized
- [ ] No console errors
- [ ] Smooth animations

---

## Database Verification

### MongoDB Atlas
- [ ] Login to MongoDB Atlas
- [ ] Navigate to Database → Browse Collections
- [ ] Verify collections exist:
  - [ ] `users` - Contains registered users
  - [ ] `menuitems` - Contains menu items
  - [ ] `bookings` - Contains bookings
  - [ ] `reviews` - Contains reviews
  - [ ] `testimonials` - Contains testimonials
- [ ] Check indexes are created
- [ ] Verify data is being saved correctly

---

## Post-Deployment Tasks

### Documentation
- [ ] Update README with live URLs
- [ ] Document admin credentials (securely)
- [ ] Create user guide if needed

### Monitoring Setup
- [ ] Bookmark Render dashboard
- [ ] Bookmark Vercel dashboard
- [ ] Bookmark MongoDB Atlas dashboard
- [ ] Set up error alerts (optional)

### Backup Plan
- [ ] Know how to rollback deployment
- [ ] Have local backup of database
- [ ] Document recovery procedures

### Share & Promote
- [ ] Share live URL with stakeholders
- [ ] Add to portfolio
- [ ] Share on social media
- [ ] Collect user feedback

---

## Maintenance Schedule

### Daily (First Week)
- [ ] Check error logs on Render
- [ ] Monitor MongoDB Atlas metrics
- [ ] Review user feedback

### Weekly
- [ ] Check API response times
- [ ] Review security logs
- [ ] Update dependencies if needed

### Monthly
- [ ] Run `npm audit fix`
- [ ] Review and optimize slow queries
- [ ] Check storage usage on MongoDB
- [ ] Review rate limit settings

### Quarterly
- [ ] Rotate JWT secret
- [ ] Security audit
- [ ] Performance optimization
- [ ] Update documentation

---

## Emergency Contacts

**Render Support:** https://render.com/docs
**Vercel Support:** https://vercel.com/docs
**MongoDB Support:** https://docs.atlas.mongodb.com

**Service Status:**
- Render: https://status.render.com
- Vercel: https://vercel-status.com
- MongoDB: https://status.mongodb.com

---

## Final Sign-Off

**Deployment Date:** _______________

**Deployed By:** _______________

**Live URLs:**
- Frontend: _______________
- Backend: _______________

**Admin Credentials:**
- Email: _______________ (Store securely!)
- Password: _______________ (Store securely!)

**MongoDB:**
- Cluster: _______________
- Database: restobook

**Status:** 
- [ ] ✅ Fully Deployed
- [ ] ✅ All Tests Passed
- [ ] ✅ Ready for Production

---

## 🎉 Congratulations!

Your RestoBook restaurant system is now live and production-ready!

**Next Steps:**
1. Monitor for the first 24 hours
2. Collect user feedback
3. Plan feature enhancements
4. Enjoy your live application!

---

**Notes:**
_Use this space for any deployment-specific notes or issues encountered_

_______________________________________________
_______________________________________________
_______________________________________________
