# MongoDB Atlas Setup Guide

## Common Connection String Issues & Fixes

### 1. Check Your Connection String Format

**Correct format for MongoDB Atlas:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `<username>` with your MongoDB Atlas username
- Replace `<password>` with your MongoDB Atlas password
- Replace `<database-name>` with your database name (e.g., `scalable-web-app`)
- Make sure there are **NO spaces** in the connection string
- The password might contain special characters - if so, URL encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `$` becomes `%24`
  - `%` becomes `%25`

### 2. Example Connection String

```
mongodb+srv://myuser:MyPass123@cluster0.abc123.mongodb.net/scalable-web-app?retryWrites=true&w=majority
```

### 3. Steps to Get Your Connection String from MongoDB Atlas

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Copy the connection string**
5. **Replace `<password>`** with your actual database user password
6. **Replace `<database>`** with `scalable-web-app` (or your preferred database name)

### 4. Configure Network Access in MongoDB Atlas

**CRITICAL:** Your IP must be whitelisted!

1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. For development, you can click **"Add Current IP Address"**
4. OR click **"Allow Access from Anywhere"** (for testing only - not recommended for production)
5. Wait 1-2 minutes for changes to take effect

### 5. Configure Database User

1. In MongoDB Atlas, go to **Database Access**
2. Create a database user (if not already created)
3. Set username and password
4. Grant **"Atlas Admin"** or **"Read and write to any database"** role
5. **IMPORTANT:** Use this username and password in your connection string

### 6. Update Your .env File

Open `backend/.env` and update the connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/scalable-web-app?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Make sure:**
- ✅ No quotes around the connection string
- ✅ No extra spaces
- ✅ Password is URL-encoded if it has special characters
- ✅ Database name is included in the connection string

### 7. Test Your Connection String

After updating `.env`, restart your backend server:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
📊 Database: scalable-web-app
```

### 8. Common Error Messages & Solutions

**Error: "authentication failed"**
- ❌ Wrong username or password
- ✅ Check Database Access settings in Atlas
- ✅ Make sure password is correctly URL-encoded

**Error: "ENOTFOUND" or "getaddrinfo"**
- ❌ Wrong cluster URL/hostname
- ✅ Double-check the connection string from Atlas
- ✅ Make sure cluster is running (not paused)

**Error: "timeout" or "connection timeout"**
- ❌ IP address not whitelisted
- ✅ Go to Network Access in Atlas
- ✅ Add your current IP address
- ✅ Wait 1-2 minutes after adding

**Error: "bad auth" or "not authorized"**
- ❌ Database user doesn't have proper permissions
- ✅ Grant "Read and write to any database" role in Database Access

### 9. Quick Checklist

- [ ] Connection string starts with `mongodb+srv://`
- [ ] Username and password are correct (URL-encoded if needed)
- [ ] Database name is included in connection string
- [ ] No quotes around the connection string in .env
- [ ] IP address is whitelisted in Network Access
- [ ] Database user has proper permissions
- [ ] Cluster is running (not paused)

### 10. Still Having Issues?

1. **Check the exact error message** in your terminal
2. **Verify connection string format** - copy directly from Atlas
3. **Test connection string** in MongoDB Compass (desktop tool)
4. **Check Atlas status** - make sure cluster is running
5. **Try creating a new database user** with simpler password

### Alternative: Use Local MongoDB

If Atlas is causing issues, you can use local MongoDB:

1. Install MongoDB Community Server locally
2. Start MongoDB service
3. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/scalable-web-app
   ```
