import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scalable-web-app';

// Check if using local MongoDB or Atlas
const isLocalMongoDB = MONGODB_URI.startsWith('mongodb://localhost') || MONGODB_URI.startsWith('mongodb://127.0.0.1');

mongoose
  .connect(MONGODB_URI, {
    // Connection options
    serverSelectionTimeoutMS: isLocalMongoDB ? 3000 : 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Connection: ${isLocalMongoDB ? 'Local MongoDB' : 'MongoDB Atlas'}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:');
    console.error('Error details:', err.message);
    
    if (isLocalMongoDB) {
      console.error('\n💡 Local MongoDB Troubleshooting:');
      console.error('   1. Make sure MongoDB is running:');
      console.error('      Windows: Check Services or run "mongod"');
      console.error('      Command: net start MongoDB (if installed as service)');
      console.error('   2. Verify MongoDB is listening on port 27017');
      console.error('   3. Check connection string: mongodb://localhost:27017/scalable-web-app');
    } else {
      if (err.message.includes('authentication failed')) {
        console.error('💡 Tip: Check your username and password in the connection string');
      }
      if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
        console.error('💡 Tip: Check your cluster URL/hostname in the connection string');
      }
      if (err.message.includes('timeout')) {
        console.error('💡 Tip: Check your network access settings in MongoDB Atlas');
        console.error('💡 Make sure your IP address is whitelisted in Atlas Network Access');
      }
    }
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
