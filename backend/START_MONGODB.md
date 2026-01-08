# 🚀 Start Local MongoDB - Quick Guide

## ✅ Connection String Updated!

Your `.env` file has been updated to use local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/scalable-web-app
```

## ⚠️ MongoDB is Not Running!

The error shows MongoDB is not running. Here's how to start it:

---

## Method 1: Start MongoDB Service (Recommended)

**If MongoDB was installed as a Windows Service:**

```powershell
net start MongoDB
```

**Check if service exists:**
```powershell
Get-Service -Name MongoDB
```

---

## Method 2: Manual Start

**If MongoDB is installed but not as a service:**

1. **Open Command Prompt or PowerShell as Administrator**

2. **Run:**
   ```powershell
   mongod
   ```

3. **Make sure the data directory exists:**
   ```powershell
   # Create data directory if it doesn't exist
   mkdir C:\data\db
   
   # Then start MongoDB
   mongod --dbpath C:\data\db
   ```

---

## Method 3: Using MongoDB Compass

1. **Open MongoDB Compass** (if installed)
2. It should automatically start MongoDB when you connect
3. Or it will give you instructions to start MongoDB

---

## Method 4: Check Installation

**Verify MongoDB is installed:**

```powershell
mongod --version
```

If this command works, MongoDB is installed. If not, you need to install it.

---

## After Starting MongoDB

**Test the connection:**
```bash
cd backend
npm run test-db
```

**Expected output:**
```
✅ SUCCESS: MongoDB connected successfully!
📊 Database: scalable-web-app
🔗 Connection: Local MongoDB
```

---

## Troubleshooting

### ❌ "MongoDB service not found"
- MongoDB might not be installed as a service
- Try Method 2 (manual start) or Method 3 (Compass)

### ❌ "mongod: command not found"
- MongoDB might not be installed
- Or MongoDB bin directory not in PATH
- Download from: https://www.mongodb.com/try/download/community

### ❌ "Port 27017 already in use"
- Another MongoDB instance is running
- Or another application is using port 27017
- Check: `netstat -an | findstr 27017`

---

## Quick Commands

**Start MongoDB:**
```powershell
net start MongoDB
```

**Stop MongoDB:**
```powershell
net stop MongoDB
```

**Test Connection:**
```bash
npm run test-db
```

---

## Next Steps

Once MongoDB is running and connection test passes:

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser:**
   ```
   http://localhost:3000
   ```

---

## Need Help?

1. Make sure MongoDB Community Edition is installed
2. Check if it's in your PATH: `mongod --version`
3. Try starting from MongoDB Compass
4. Check MongoDB documentation: https://docs.mongodb.com/manual/installation/
