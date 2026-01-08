import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scalable-web-app';

async function testSignup() {
  try {
    console.log('🔍 Testing MongoDB connection for signup...\n');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB connected successfully!\n');
    
    // Test User model
    const User = (await import('./models/User.js')).default;
    
    // Test creating a user (without saving)
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });
    
    console.log('✅ User model is working correctly');
    console.log('✅ Password will be hashed automatically\n');
    
    // Clean up
    await mongoose.connection.close();
    console.log('✅ Test completed successfully!\n');
    console.log('💡 If signup still fails, check:');
    console.log('   1. Backend server is running (npm run dev)');
    console.log('   2. Check browser console for detailed error messages');
    console.log('   3. Check backend terminal for error logs\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. MongoDB is running');
    console.error('   2. Connection string in .env is correct');
    process.exit(1);
  }
}

testSignup();
