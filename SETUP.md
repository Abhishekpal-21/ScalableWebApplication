# Setup Guide - Step by Step Instructions

Follow these steps carefully to get the application running.

## Prerequisites Check

First, verify you have these installed:
- **Node.js** (v16 or higher) - Check with: `node --version`
- **npm** (comes with Node.js) - Check with: `npm --version`
- **MongoDB** - Either local installation or MongoDB Atlas account

## Step 1: Install Backend Dependencies

1. Open a terminal/command prompt
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   This may take 1-2 minutes. Wait for it to complete.

## Step 2: Setup Backend Environment

1. Create a `.env` file in the `backend` directory:
   - Copy `env.example` to `.env` (or create manually)
   - On Windows PowerShell: `Copy-Item env.example .env`
   - On Mac/Linux: `cp env.example .env`

2. Edit the `.env` file and set:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```
   
   **Important:** 
   - If using MongoDB Atlas (cloud), replace `MONGODB_URI` with your connection string
   - If MongoDB is on a different port, update it accordingly

## Step 3: Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB service is running
- On Windows: Check Services or run `mongod` if not running as a service
- On Mac: `brew services start mongodb-community` (if installed via Homebrew)
- On Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- Skip this step if using MongoDB Atlas
- Just make sure your connection string is in the `.env` file

## Step 4: Start Backend Server

1. In the terminal (still in `backend` directory):
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 5000
   ```

2. **Keep this terminal window open** - the server needs to keep running

3. Test the backend by opening: `http://localhost:5000/api/health`
   - You should see: `{"status":"OK","message":"Server is running"}`

## Step 5: Install Frontend Dependencies

1. Open a **NEW** terminal/command prompt window
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
   (If you're in the root, use: `cd "Scalable Web Application/frontend"`)

3. Install dependencies:
   ```bash
   npm install
   ```
   This may take 1-2 minutes.

## Step 6: Start Frontend Development Server

1. In the frontend terminal (still in `frontend` directory):
   ```bash
   npm run dev
   ```

2. You should see output like:
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

3. The browser should automatically open to `http://localhost:3000`
   - If not, manually open your browser and go to: `http://localhost:3000`

## Step 7: Use the Application

1. **Sign Up**: Create a new account
   - Click "Sign up" on the login page
   - Fill in Name, Email, and Password (minimum 6 characters)
   - Click "Sign Up"

2. **Dashboard**: After signup/login, you'll see:
   - Your profile information
   - Task management interface

3. **Create Tasks**: 
   - Click "+ Add New Task"
   - Fill in the form and submit

4. **Manage Tasks**:
   - Edit, delete, or change status of tasks
   - Use search and filters to find tasks

## Troubleshooting

### Backend Issues

**Problem:** `npm install` fails
- **Solution:** Make sure you have Node.js installed (`node --version`)
- Try: `npm cache clean --force` then `npm install` again

**Problem:** "Cannot find module" errors
- **Solution:** Make sure you ran `npm install` in the backend directory
- Check that `node_modules` folder exists in backend

**Problem:** MongoDB connection error
- **Solution:** 
  - Verify MongoDB is running (Option A) or connection string is correct (Option B)
  - For local: Try `mongodb://127.0.0.1:27017/scalable-web-app`
  - Check firewall settings

**Problem:** Port 5000 already in use
- **Solution:** Change PORT in `.env` file to a different port (e.g., 5001)
- Update frontend `vite.config.js` proxy target to match

### Frontend Issues

**Problem:** `npm install` fails
- **Solution:** Make sure you have Node.js installed
- Try: `npm cache clean --force` then `npm install` again

**Problem:** Blank page or errors in browser
- **Solution:** 
  - Check browser console (F12) for errors
  - Make sure backend is running on port 5000
  - Check that Vite dev server started successfully

**Problem:** API calls fail (Network errors)
- **Solution:**
  - Verify backend server is running
  - Check that backend is on port 5000
  - Verify CORS is enabled (should be automatic)

**Problem:** Page shows "Cannot GET /"
- **Solution:** This is normal for React apps - make sure you're using the Vite dev server, not opening the HTML file directly

### General Issues

**Problem:** Commands not recognized
- **Solution:** Make sure you're in the correct directory
- Use `cd` to navigate: `cd "Scalable Web Application/backend"` or `cd "Scalable Web Application/frontend"`

**Problem:** Permission errors (especially on Mac/Linux)
- **Solution:** You might need `sudo` for some operations, but try without first

## Quick Start Scripts

You can also create these helper scripts:

### Windows (run-backend.bat)
```batch
@echo off
cd backend
call npm install
call npm run dev
```

### Windows (run-frontend.bat)
```batch
@echo off
cd frontend
call npm install
call npm run dev
```

### Mac/Linux (run-backend.sh)
```bash
#!/bin/bash
cd backend
npm install
npm run dev
```

### Mac/Linux (run-frontend.sh)
```bash
#!/bin/bash
cd frontend
npm install
npm run dev
```

## Need More Help?

1. Check the console/terminal for specific error messages
2. Verify all prerequisites are installed correctly
3. Make sure both servers are running (backend on 5000, frontend on 3000)
4. Check that MongoDB is accessible

## Summary of Commands

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

**Browser:**
- Open `http://localhost:3000`

That's it! 🎉
