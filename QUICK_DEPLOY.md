# 🚀 Quick Deployment Commands

## Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Install Backend Dependencies
```bash
cd backend
npm install express-rate-limit express-mongo-sanitize helmet express-validator
```

## Install Frontend Dependencies
```bash
cd frontend
npm install react-hot-toast
```

## Test Backend Locally
```bash
cd backend
npm start
# Visit: http://localhost:5000/api/health
```

## Test Frontend Locally
```bash
cd frontend
npm start
# Visit: http://localhost:3000
```

## Build Frontend for Production
```bash
cd frontend
npm run build
```

## Git Commands - Backend
```bash
cd backend
git init
git add .
git commit -m "Production ready backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restobook-backend.git
git push -u origin main
```

## Git Commands - Frontend
```bash
cd frontend
git init
git add .
git commit -m "Production ready frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restobook-frontend.git
git push -u origin main
```

## Test Production Backend
```bash
# Health check
curl https://YOUR-BACKEND.onrender.com/api/health

# Get menu
curl https://YOUR-BACKEND.onrender.com/api/menu

# Register user
curl -X POST https://YOUR-BACKEND.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST https://YOUR-BACKEND.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## Environment Variables Quick Reference

### Backend (.env on Render)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/restobook
JWT_SECRET=your-64-char-secret
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
PORT=5000
```

### Frontend (.env on Vercel)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## MongoDB Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

## URL Encode Special Characters in Password
```
! → %21
@ → %40
# → %23
$ → %24
% → %25
^ → %5E
& → %26
* → %2A
```

## Render Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18.x

## Vercel Build Settings
- **Framework**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

## Common Fixes

### CORS Error
```javascript
// In Render environment variables, update:
FRONTEND_URL=https://your-exact-vercel-url.vercel.app
```

### MongoDB Connection Error
```bash
# Check connection string format
# Ensure password is URL-encoded
# Verify IP whitelist: 0.0.0.0/0
```

### 404 on Refresh (Vercel)
```json
// Ensure vercel.json exists with:
{
  "rewrites": [{"source": "/(.*)", "destination": "/index.html"}]
}
```

### Token Expired
```javascript
// Clear browser storage
localStorage.clear();
// Re-login
```

## Deployment Checklist
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] JWT secret generated
- [ ] Backend pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Environment variables set on Render
- [ ] Backend health check passes
- [ ] Frontend pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set on Vercel
- [ ] FRONTEND_URL updated on Render
- [ ] Frontend loads successfully
- [ ] Registration works
- [ ] Login works
- [ ] Booking works
- [ ] Admin dashboard works
- [ ] Reviews work

## Support Links
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
