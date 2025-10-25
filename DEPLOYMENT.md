# RestoBook Deployment Guide

## 🚀 Live Deployment URLs

### Frontend (Netlify)
- **URL**: https://restobook-luxury.netlify.app
- **Build Command**: `npm run build`
- **Publish Directory**: `frontend/build`

### Backend (Heroku/Railway)
- **URL**: https://restobook-backend.herokuapp.com
- **Build Command**: `npm start`
- **Environment Variables Required**:
  - `MONGODB_URI`: Your MongoDB Atlas connection string
  - `JWT_SECRET`: Your JWT secret key
  - `NODE_ENV`: production

## 📋 Deployment Steps

### 1. Backend Deployment (Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create restobook-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_connection_string"
heroku config:set JWT_SECRET="your_jwt_secret_key"
heroku config:set NODE_ENV="production"

# Deploy
git subtree push --prefix backend heroku master
```

### 2. Frontend Deployment (Netlify)
```bash
# Build the project
cd frontend
npm run build

# Deploy to Netlify
# 1. Connect GitHub repo to Netlify
# 2. Set build command: npm run build
# 3. Set publish directory: frontend/build
# 4. Set environment variable: REACT_APP_API_URL=https://restobook-backend.herokuapp.com/api
```

### 3. Alternative: Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy backend
railway login
railway init
railway up
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restobook
NODE_ENV=production
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

## 📱 Features Deployed

### ✅ Complete Authentication System
- Role-based registration (Customer/Admin)
- JWT-based secure authentication
- Protected routes and components

### ✅ Admin Dashboard
- Menu management (CRUD operations)
- Table management (Add/edit/delete tables)
- Booking management (View all reservations)
- Testimonial approval system

### ✅ User Features
- Table booking with smart table selection
- Menu browsing (no mock data)
- Cart management with localStorage
- Testimonial submission

### ✅ Premium UI/UX
- Luxury black-gray-gold design
- Fully responsive mobile-first design
- Dark/light mode toggle
- Smooth animations and micro-interactions

## 🎯 User Roles

### Customer Account
- Browse menu items
- Book tables (select based on guest count)
- Add items to cart
- Submit testimonials
- View approved reviews

### Admin Account
- Manage restaurant tables
- Manage menu items and categories
- View and manage all bookings
- Approve/reject customer testimonials
- Full dashboard access

## 🔗 Repository
- **GitHub**: https://github.com/DURGESH103/Restobook.git
- **Frontend**: `/frontend` directory
- **Backend**: `/backend` directory

## 📞 Support
For deployment issues, check the logs:
- Heroku: `heroku logs --tail`
- Netlify: Check deploy logs in Netlify dashboard
- Railway: `railway logs`