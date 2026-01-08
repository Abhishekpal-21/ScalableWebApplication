import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scalable-web-app';

console.log('🔍 Testing MongoDB Connection...\n');
console.log('Connection String:', MONGODB_URI.replace(/:([^:@]+)@/, ':***@')); // Hide password
console.log('\n');

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('✅ SUCCESS: MongoDB connected successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    console.log('\n✅ Your connection string is correct!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ ERROR: MongoDB connection failed!\n');
    console.error('Error Type:', err.name);
    console.error('Error Message:', err.message);
    console.error('\n💡 Troubleshooting Tips:\n');
    
    if (err.message.includes('authentication failed')) {
      console.error('   → Check your username and password in the connection string');
      console.error('   → Verify in MongoDB Atlas > Database Access');
      console.error('   → Make sure password is URL-encoded if it has special characters\n');
    }
    
    if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      console.error('   → Check your cluster URL/hostname in the connection string');
      console.error('   → Verify cluster is running (not paused) in MongoDB Atlas\n');
    }
    
    if (err.message.includes('timeout') || err.code === 'ENOTFOUND') {
      if (MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1')) {
        console.error('   → MongoDB is not running on your computer');
        console.error('   → Start MongoDB: net start MongoDB (if service)');
        console.error('   → Or run: mongod (if manual installation)');
        console.error('   → Check if MongoDB is installed correctly\n');
      } else {
        console.error('   → Check Network Access in MongoDB Atlas');
        console.error('   → Add your current IP address to whitelist');
        console.error('   → Wait 1-2 minutes after adding IP address\n');
      }
    }
    
    if (err.message.includes('ECONNREFUSED') || err.code === 'ECONNREFUSED') {
      console.error('   → MongoDB is not running or not accessible');
      console.error('   → Windows: net start MongoDB (if installed as service)');
      console.error('   → Or run: mongod (manual start)');
      console.error('   → Verify MongoDB installation');
      console.error('   → Check if port 27017 is available\n');
    }
    
    if (err.message.includes('bad auth') || err.message.includes('not authorized')) {
      console.error('   → Database user may not have proper permissions');
      console.error('   → Grant "Read and write to any database" role in Database Access\n');
    }
    
    console.error('📖 See MONGODB_SETUP.md for detailed instructions\n');
    process.exit(1);
  });
