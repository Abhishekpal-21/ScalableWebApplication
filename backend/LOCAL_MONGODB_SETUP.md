# 🗄️ Setup Local MongoDB Community Edition

## Quick Setup Guide

### Step 1: Make Sure MongoDB is Running

**Check if MongoDB is running:**
```powershell
# Check service status
Get-Service -Name MongoDB

# Or check if port 27017 is listening
netstat -an | findstr 27017
```

**Start MongoDB (if not running):**

**Option A: Windows Service (if installed as service)**
```powershell
net start MongoDB
```

**Option B: Manual Start**
```powershell
mongod --dbpath "C:\data\db"
```
*(Note: Make sure the data directory exists or create it first)*

**Option C: Double-click MongoDB Compass**
- If you installed MongoDB Compass, it should start MongoDB automatically

---

### Step 2: Update .env File

1. **Open** `backend/.env` file

2. **Change the MONGODB_URI line** from:
   ```
   MONGODB_URI=mongodb+srv://...@...mongodb.net/...
   ```
   
   **To:**
   ```
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   ```

3. **Save** the file

---

### Step 3: Test Connection

Run this command:
```bash
cd backend
npm run test-db
```

You should see:
```
✅ SUCCESS: MongoDB connected successfully!
📊 Database: scalable-web-app
🔗 Connection: Local MongoDB
```

---

## Complete .env File Example

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-web-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

---

## Troubleshooting

### ❌ "Cannot connect to MongoDB"

**Solution:**
1. Make sure MongoDB is running
2. Check port 27017 is not blocked
3. Verify connection string: `mongodb://localhost:27017/scalable-web-app`

### ❌ "Service not found"

**Solution:**
- MongoDB might not be installed as a service
- Try running `mongod` manually
- Or use MongoDB Compass to start it

### ❌ "Port 27017 already in use"

**Solution:**
- Another MongoDB instance might be running
- Stop other MongoDB processes
- Or change MongoDB port (requires config file changes)

---

## Quick Commands

**Check if MongoDB is running:**
```powershell
Get-Service -Name MongoDB
```

**Start MongoDB service:**
```powershell
net start MongoDB
```

**Stop MongoDB service:**
```powershell
net stop MongoDB
```

**Test connection:**
```bash
npm run test-db
```

---

## Alternative: Use the Helper Script

I've created a helper script that will:
1. Check if MongoDB is running
2. Start it if needed
3. Update your .env file automatically
4. Test the connection

**Run:**
```bash
cd backend
start-local-mongodb.bat
```

---

## Benefits of Local MongoDB

✅ No internet required
✅ No authentication setup needed
✅ Faster development
✅ Free and unlimited
✅ Full control over your data

---

## After Setup

Once MongoDB is connected, start your backend:
```bash
npm run dev
```

Then start your frontend in another terminal:
```bash
cd frontend
npm run dev
```

Visit: http://localhost:3000
