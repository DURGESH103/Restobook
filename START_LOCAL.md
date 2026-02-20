# 🚀 Quick Start Guide - Local Development

## Start Backend Server

### Option 1: Using npm
```bash
cd backend
npm install
npm start
```

### Option 2: Using nodemon (auto-restart on changes)
```bash
cd backend
npm install
npm run dev
```

**Backend will run on:** http://localhost:5000

**Test it:**
- Open browser: http://localhost:5000/api/health
- Should see: `{"status":"OK",...}`

---

## Start Frontend Server

### In a NEW terminal window:
```bash
cd frontend
npm install
npm start
```

**Frontend will run on:** http://localhost:3000

---

## Common Issues

### Error: "Cannot find module"
```bash
# Install dependencies
cd backend
npm install

cd ../frontend
npm install
```

### Error: "Port 5000 already in use"
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Or change port in backend/.env
PORT=5001
```

### Error: "MongoDB connection failed"
```bash
# Check backend/.env has valid MONGODB_URI
# Your current connection string looks correct
```

### Error: "ERR_CONNECTION_REFUSED"
**This means backend is not running!**
```bash
# Start backend first:
cd backend
npm start

# Then in new terminal, start frontend:
cd frontend
npm start
```

---

## Verify Everything Works

1. ✅ Backend running: http://localhost:5000/api/health
2. ✅ Frontend running: http://localhost:3000
3. ✅ No console errors
4. ✅ Can register/login

---

## Development Workflow

1. Start backend (Terminal 1)
2. Start frontend (Terminal 2)
3. Make changes
4. Backend auto-restarts with nodemon
5. Frontend auto-reloads

---

## Stop Servers

**Windows:**
- Press `Ctrl + C` in each terminal

**Or close terminal windows**
