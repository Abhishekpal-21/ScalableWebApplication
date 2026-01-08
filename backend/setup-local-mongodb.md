# 🔧 Setup Local MongoDB Community Edition

## Connection String for Local MongoDB

For local MongoDB Community Edition, use this format:

```
mongodb://localhost:27017/scalable-web-app
```

**OR**

```
mongodb://127.0.0.1:27017/scalable-web-app
```

---

## Steps to Update

1. **Make sure MongoDB is running:**
   - On Windows: Check Services or run `mongod` from command prompt
   - The MongoDB service should be running on port 27017

2. **Update your .env file:**
   - Open `backend/.env`
   - Change `MONGODB_URI` to: `mongodb://localhost:27017/scalable-web-app`

3. **Test the connection:**
   ```bash
   npm run test-db
   ```

---

## Verify MongoDB is Running

### Windows:
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Or check if port 27017 is listening
netstat -an | findstr 27017
```

### Start MongoDB if not running:
```powershell
# If installed as service
net start MongoDB

# Or run manually (if installed manually)
mongod --dbpath "C:\data\db"
```

---

## Your .env File Should Look Like:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-web-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```
