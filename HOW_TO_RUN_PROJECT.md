# 🚀 How to Run the Project - Complete Guide

## ✅ Current Status

✅ Backend dependencies installed
✅ Frontend dependencies installed  
✅ Connection string updated for local MongoDB
⚠️  **MongoDB needs to be started**

---

## 📋 Step-by-Step Instructions

### **STEP 1: Start MongoDB**

Since MongoDB command is not recognized, you have two options:

#### **Option A: MongoDB is Installed but Not in PATH**

1. **Find MongoDB installation folder** (usually):
   - `C:\Program Files\MongoDB\Server\<version>\bin\`
   - Or `C:\mongodb\bin\`

2. **Navigate to bin folder and start:**
   ```powershell
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   .\mongod.exe
   ```
   *(Replace `7.0` with your MongoDB version)*

3. **Keep this window open** - MongoDB must keep running

#### **Option B: Start MongoDB as Windows Service**

1. **Open Services:**
   - Press `Win + R`
   - Type: `services.msc`
   - Press Enter

2. **Find "MongoDB" service**
3. **Right-click → Start**
4. **Set to "Automatic"** (optional, starts on boot)

#### **Option C: Use MongoDB Compass**

1. **Open MongoDB Compass** (if installed)
2. It will guide you to start MongoDB or connect to it
3. Keep Compass running

#### **Option D: Install MongoDB (if not installed)**

If MongoDB is not installed:

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install** with default settings
3. **It will install as a Windows Service automatically**
4. **Start the service** from Services (services.msc)

---

### **STEP 2: Verify MongoDB is Running**

**Test the connection:**
```bash
cd backend
npm run test-db
```

**✅ Success looks like:**
```
✅ SUCCESS: MongoDB connected successfully!
📊 Database: scalable-web-app
🔗 Connection: Local MongoDB
```

**❌ If you see connection error:**
- MongoDB is not running - go back to Step 1
- Check if port 27017 is available

---

### **STEP 3: Start Backend Server**

1. **Open PowerShell or Command Prompt**

2. **Navigate to backend folder:**
   ```powershell
   cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\backend"
   ```

3. **Start the server:**
   ```powershell
   npm run dev
   ```

4. **✅ Success looks like:**
   ```
   ✅ MongoDB connected successfully
   📊 Database: scalable-web-app
   🔗 Connection: Local MongoDB
   🚀 Server running on port 5000
   ```

5. **KEEP THIS TERMINAL WINDOW OPEN!** The backend must keep running.

---

### **STEP 4: Start Frontend Server**

1. **Open a NEW PowerShell or Command Prompt window**

2. **Navigate to frontend folder:**
   ```powershell
   cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\frontend"
   ```

3. **Start the frontend:**
   ```powershell
   npm run dev
   ```

4. **✅ Success looks like:**
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

5. **Browser should automatically open** to `http://localhost:3000`

---

### **STEP 5: Use the Application**

1. **You should see the Login page** at `http://localhost:3000`

2. **Create an account:**
   - Click **"Sign up"**
   - Enter:
     - Name: Your name
     - Email: your@email.com
     - Password: (minimum 6 characters)
   - Click **"Sign Up"**

3. **Dashboard:**
   - After signup, you'll be logged in automatically
   - See your profile and task management interface

4. **Create Tasks:**
   - Click **"+ Add New Task"**
   - Fill in task details
   - Click **"Create"**

5. **Manage Tasks:**
   - Edit, delete, or change task status
   - Use search and filters
   - Update your profile

---

## 📝 Quick Reference Commands

### **Terminal 1 - MongoDB:**
```powershell
# Start MongoDB (if installed as service)
net start MongoDB

# OR run manually (if not service)
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongod.exe
```

### **Terminal 2 - Backend:**
```powershell
cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\backend"
npm run dev
```

### **Terminal 3 - Frontend:**
```powershell
cd "C:\Users\abhis\OneDrive\Desktop\Scalable Web Application\frontend"
npm run dev
```

### **Browser:**
```
http://localhost:3000
```

---

## 🎯 Summary - What Should Be Running

You should have **3 things running**:

1. ✅ **MongoDB** (Terminal 1 or Windows Service)
   - Running on port 27017
   - Connection: `mongodb://localhost:27017`

2. ✅ **Backend Server** (Terminal 2)
   - Running on port 5000
   - URL: `http://localhost:5000`

3. ✅ **Frontend Server** (Terminal 3)
   - Running on port 3000
   - URL: `http://localhost:3000`
   - **This is what you open in browser**

---

## ❌ Troubleshooting

### Problem: MongoDB connection error

**Solution:**
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Start MongoDB service
net start MongoDB

# OR start manually
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongod.exe
```

### Problem: Port 5000 already in use

**Solution:**
- Another app is using port 5000
- Stop that app or change PORT in `backend/.env` to 5001
- Update `frontend/vite.config.js` proxy to `http://localhost:5001`

### Problem: Port 3000 already in use

**Solution:**
- Another app is using port 3000
- Close that app or Vite will suggest another port automatically

### Problem: Backend won't start

**Solution:**
```powershell
# Make sure you're in backend folder
cd backend

# Check if node_modules exists
dir node_modules

# If missing, reinstall:
npm install

# Then start:
npm run dev
```

### Problem: Frontend won't start

**Solution:**
```powershell
# Make sure you're in frontend folder
cd frontend

# Check if node_modules exists
dir node_modules

# If missing, reinstall:
npm install

# Then start:
npm run dev
```

### Problem: "Cannot find module" errors

**Solution:**
- Make sure you ran `npm install` in both backend and frontend
- Check that `node_modules` folder exists

---

## 🎉 Success Checklist

- [ ] MongoDB is running (verified with `npm run test-db`)
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 3000
- [ ] Browser opens to http://localhost:3000
- [ ] Can sign up and login
- [ ] Can create and manage tasks

---

## 🆘 Need More Help?

1. **Check terminal error messages** - they usually tell you what's wrong
2. **Verify all prerequisites** - Node.js, MongoDB installed
3. **Check ports** - 27017 (MongoDB), 5000 (Backend), 3000 (Frontend)
4. **Review logs** - Both backend and frontend show helpful error messages

---

## 🚀 Alternative: Use Batch Files

I've created helper batch files:

**For Backend:**
- Double-click: `backend/run-backend.bat`

**For Frontend:**
- Double-click: `frontend/run-frontend.bat`

*(Make sure MongoDB is running first!)*

---

**That's it! Follow these steps and your application will be running! 🎊**
