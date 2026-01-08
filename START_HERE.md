# 🎯 START HERE - How to Run the Project

## ✅ Prerequisites Check
You have:
- ✅ Node.js v22.15.1 installed
- ✅ npm v10.9.2 installed

Now let's get the project running!

---

## 📋 Step-by-Step Instructions

### **STEP 1: Install Backend Dependencies**

1. Open PowerShell or Command Prompt
2. Navigate to the backend folder:
   ```powershell
   cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\backend"
   ```
   
3. Install dependencies:
   ```powershell
   npm install
   ```
   
   ⏱️ Wait 1-2 minutes for installation to complete.

---

### **STEP 2: Setup Backend Environment File**

1. Create `.env` file in the `backend` folder:
   ```powershell
   Copy-Item env.example .env
   ```

2. Edit `.env` file (using Notepad or any text editor):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

   **Important:** 
   - If you have MongoDB installed locally, make sure it's running
   - OR use MongoDB Atlas (free cloud database) and replace `MONGODB_URI` with your connection string

---

### **STEP 3: Start MongoDB (Choose One)**

**Option A: Local MongoDB**
- Make sure MongoDB service is running on your computer
- If not installed, download from: https://www.mongodb.com/try/download/community

**Option B: MongoDB Atlas (Recommended for beginners)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a free cluster
- Get connection string and paste it in `.env` as `MONGODB_URI`

**Option C: Use Docker (if you have it)**
```powershell
docker run -d -p 27017:27017 --name mongodb mongo
```

---

### **STEP 4: Start Backend Server**

In the same terminal where you ran `npm install`:
```powershell
npm run dev
```

✅ **Success looks like:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

**Keep this terminal window open!** The server needs to keep running.

---

### **STEP 5: Install Frontend Dependencies**

1. **Open a NEW terminal/PowerShell window**
2. Navigate to frontend folder:
   ```powershell
   cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\frontend"
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```
   
   ⏱️ Wait 1-2 minutes for installation to complete.

---

### **STEP 6: Start Frontend Server**

In the frontend terminal:
```powershell
npm run dev
```

✅ **Success looks like:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

The browser should automatically open to `http://localhost:3000`

---

## 🎉 You're Done!

### What You Should See:

1. **Two terminal windows running:**
   - Backend: Port 5000 ✅
   - Frontend: Port 3000 ✅

2. **Browser open to:** http://localhost:3000

3. **Login page visible** - ready to create an account!

---

## 🧪 Test the Application

1. **Sign Up:**
   - Click "Sign up" link
   - Enter: Name, Email, Password (min 6 chars)
   - Click "Sign Up"

2. **Dashboard:**
   - You'll be redirected to dashboard
   - See your profile and task management

3. **Create a Task:**
   - Click "+ Add New Task"
   - Fill in details
   - Click "Create"

4. **Try Features:**
   - Edit tasks
   - Delete tasks
   - Change task status
   - Search and filter tasks
   - Edit your profile

---

## ❌ Troubleshooting

### Problem: "npm install" fails
**Solution:** 
```powershell
npm cache clean --force
npm install
```

### Problem: "MongoDB connection error"
**Solutions:**
- Check if MongoDB is running
- Verify `.env` file has correct `MONGODB_URI`
- Try: `mongodb://127.0.0.1:27017/scalable-web-app`

### Problem: Port 5000 already in use
**Solution:** Change PORT in `backend/.env` to `5001`, then update `frontend/vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Changed from 5000
```

### Problem: Blank page or errors
**Solution:**
- Make sure backend is running (check terminal)
- Check browser console (F12) for errors
- Verify you're accessing `http://localhost:3000` (not opening HTML file directly)

### Problem: "Cannot find module" errors
**Solution:** Make sure you ran `npm install` in both backend AND frontend folders

---

## 📁 Quick Reference - File Locations

- Backend folder: `backend/`
- Frontend folder: `frontend/`
- Environment file: `backend/.env`
- Backend entry: `backend/server.js`
- Frontend entry: `frontend/src/main.jsx`

---

## 🚀 Alternative: Use Batch Files (Windows Only)

If you prefer, you can use the batch files I created:

1. **Double-click:** `backend/run-backend.bat`
2. **In a new window, double-click:** `frontend/run-frontend.bat`

These will automatically install dependencies if needed.

---

## 📞 Still Having Issues?

1. Check both terminals for error messages
2. Verify Node.js is installed: `node --version`
3. Make sure you're in the correct directories
4. Check that MongoDB is accessible
5. Review `SETUP.md` for detailed troubleshooting

---

## ✨ Summary

**Terminal 1:**
```powershell
cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\backend"
npm install
npm run dev
```

**Terminal 2:**
```powershell
cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\frontend"
npm install
npm run dev
```

**Browser:** Open http://localhost:3000

That's it! 🎊
