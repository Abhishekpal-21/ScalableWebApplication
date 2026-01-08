# 🚀 Quick Start Guide

## Method 1: Using Batch Files (Easiest - Windows)

### Step 1: Setup Backend
1. Double-click `backend/run-backend.bat`
2. Wait for dependencies to install (first time only)
3. If prompted, edit `.env` file with your MongoDB connection
4. Server will start automatically

### Step 2: Setup Frontend
1. Open a **NEW** window/terminal
2. Double-click `frontend/run-frontend.bat`
3. Wait for dependencies to install (first time only)
4. Browser will open automatically to http://localhost:3000

---

## Method 2: Manual Setup (All Platforms)

### Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from env.example)
# Windows: copy env.example .env
# Mac/Linux: cp env.example .env

# Edit .env file with your MongoDB connection string

# Start server
npm run dev
```

### Frontend Setup (New Terminal)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## What You Should See

### Backend Terminal:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Frontend Terminal:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### Browser:
- Login/Signup page at http://localhost:3000

---

## First Time Setup Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] MongoDB running or Atlas connection ready?
- [ ] Backend dependencies installed? (`cd backend && npm install`)
- [ ] Backend .env file created and configured?
- [ ] Frontend dependencies installed? (`cd frontend && npm install`)
- [ ] Backend server running on port 5000?
- [ ] Frontend server running on port 3000?

---

## Common Issues & Fixes

### ❌ "npm: command not found"
**Fix:** Install Node.js from nodejs.org

### ❌ "MongoDB connection error"
**Fix:** 
- Start MongoDB: `mongod` (local) or
- Update `.env` with Atlas connection string

### ❌ "Port 5000 already in use"
**Fix:** Change PORT in backend/.env to 5001, update vite.config.js proxy

### ❌ Blank page in browser
**Fix:** 
- Check backend is running
- Open browser console (F12) for errors
- Verify you're on http://localhost:3000 (not opening HTML file directly)

---

## Testing the Setup

1. **Test Backend**: Open http://localhost:5000/api/health
   - Should show: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**: Open http://localhost:3000
   - Should show login page

3. **Test Full Flow**:
   - Sign up with a new account
   - Login
   - Create a task
   - Edit profile

---

## Need Help?

Check `SETUP.md` for detailed troubleshooting steps.
