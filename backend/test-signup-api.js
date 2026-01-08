import axios from 'axios';

console.log('🧪 Testing Signup API...\n');

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'test123'
};

console.log('Sending signup request:');
console.log(`  Name: ${testData.name}`);
console.log(`  Email: ${testData.email}`);
console.log(`  Password: ${testData.password}\n`);

axios.post('http://localhost:5000/api/auth/signup', testData)
  .then(response => {
    console.log('✅ SUCCESS!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    console.log('\n✅ Signup API is working correctly!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ ERROR!\n');
    
    if (!error.response) {
      console.error('Network Error:');
      console.error('  → Backend server is not running');
      console.error('  → Or not accessible on port 5000');
      console.error('  → Start backend: cd backend && npm run dev\n');
    } else {
      console.error('Error Status:', error.response.status);
      console.error('Error Message:', error.response.data.message || 'Unknown error');
      
      if (error.response.data.errors) {
        console.error('\nValidation Errors:');
        error.response.data.errors.forEach(err => {
          console.error(`  → ${err.param}: ${err.msg}`);
        });
      }
      
      if (error.response.data.error) {
        console.error('\nError Details:', error.response.data.error);
      }
    }
    
    process.exit(1);
  });
