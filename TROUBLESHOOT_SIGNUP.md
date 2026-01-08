# 🔧 Troubleshooting Signup Failed Error

## Common Causes & Solutions

### ❌ Problem: "Signup failed" or Network Error

**Possible Causes:**

1. **Backend server is not running**
2. **Backend not accessible from frontend**
3. **MongoDB connection issue**
4. **Validation error (not displayed properly)**

---

## ✅ Step-by-Step Debugging

### **Step 1: Check Backend Server is Running**

1. **Check backend terminal** - You should see:
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 5000
   ```

2. **If not running, start it:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Test backend directly:**
   - Open browser: `http://localhost:5000/api/health`
   - Should see: `{"status":"OK","message":"Server is running"}`

---

### **Step 2: Check MongoDB Connection**

1. **In backend terminal, look for:**
   ```
   ✅ MongoDB connected successfully
   📊 Database: scalable-web-app
   ```

2. **If you see MongoDB error:**
   ```bash
   cd backend
   npm run test-db
   ```

3. **If MongoDB not connected:**
   - Start MongoDB service: `net start MongoDB`
   - Or run `mongod` manually
   - See `backend/START_MONGODB.md` for help

---

### **Step 3: Check Browser Console**

1. **Open browser Developer Tools:**
   - Press `F12` or Right-click → Inspect

2. **Go to Console tab**

3. **Try signing up again**

4. **Look for errors:**
   - Red error messages
   - Network errors
   - CORS errors

5. **Go to Network tab:**
   - Filter: XHR or Fetch
   - Try signing up
   - Click on the `/api/auth/signup` request
   - Check:
     - Status code (should be 201 or 400)
     - Response tab for error message

---

### **Step 4: Check Backend Logs**

1. **Look at backend terminal** when you try to sign up
2. **Check for error messages:**
   - "Signup error: ..."
   - "MongoDB connection error"
   - Any other errors

---

### **Step 5: Test API Directly**

**Test signup endpoint manually:**

Open PowerShell or Command Prompt:

```powershell
# Test signup API
curl -X POST http://localhost:5000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**OR use this test script:**

Save as `test-signup-api.js` in backend folder:
```javascript
import axios from 'axios';

axios.post('http://localhost:5000/api/auth/signup', {
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123'
})
.then(response => {
  console.log('✅ Success:', response.data);
})
.catch(error => {
  console.error('❌ Error:', error.response?.data || error.message);
});
```

Run: `node test-signup-api.js`

---

## 🔍 Common Error Messages & Fixes

### **"Cannot connect to server"**
- ❌ Backend not running
- ✅ Start backend: `cd backend && npm run dev`

### **"Network Error" or "ERR_CONNECTION_REFUSED"**
- ❌ Backend not accessible
- ✅ Check backend is running on port 5000
- ✅ Check `frontend/vite.config.js` proxy settings

### **"User with this email already exists"**
- ❌ Email already registered
- ✅ Use different email
- ✅ Or try logging in instead

### **"Validation failed"**
- ❌ Form data doesn't meet requirements
- ✅ Check:
  - Name: 2-50 characters
  - Email: Valid email format
  - Password: At least 6 characters
  - Passwords match

### **"MongoDB connection error"**
- ❌ Database not connected
- ✅ Start MongoDB: `net start MongoDB`
- ✅ Test: `npm run test-db`

---

## ✅ Quick Checklist

Before trying to sign up again:

- [ ] Backend server running (`npm run dev` in backend folder)
- [ ] Backend shows: `✅ MongoDB connected successfully`
- [ ] Backend shows: `🚀 Server running on port 5000`
- [ ] Frontend server running (`npm run dev` in frontend folder)
- [ ] MongoDB is running
- [ ] Can access: `http://localhost:5000/api/health`
- [ ] Browser console shows no errors
- [ ] Form data is valid (name 2-50 chars, valid email, password 6+ chars)

---

## 🧪 Test Everything is Working

**1. Test Backend:**
```bash
curl http://localhost:5000/api/health
```

**2. Test MongoDB:**
```bash
cd backend
npm run test-db
```

**3. Test Signup API:**
Use the test script above or check Network tab in browser

---

## 💡 Still Having Issues?

1. **Check all error messages** - in browser console AND backend terminal
2. **Verify all services are running** - MongoDB, Backend, Frontend
3. **Check ports** - 27017 (MongoDB), 5000 (Backend), 3000 (Frontend)
4. **Try clearing browser cache** and refreshing
5. **Check firewall** - make sure ports aren't blocked

---

## 📝 Get Detailed Error Information

The frontend now shows more detailed error messages. Check:
- Browser console (F12)
- Backend terminal
- Network tab in browser DevTools

This will tell you exactly what's wrong!
