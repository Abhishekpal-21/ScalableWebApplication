import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function updateConnectionString() {
  console.log('\n🔧 MongoDB Connection String Updater\n');
  console.log('This will help you fix your MongoDB connection string.\n');

  // Read current .env
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Extract current connection string parts
  const currentUriMatch = envContent.match(/MONGODB_URI=(.+)/);
  if (!currentUriMatch) {
    console.log('❌ Could not find MONGODB_URI in .env file!');
    rl.close();
    return;
  }

  const currentUri = currentUriMatch[1].trim().replace(/['"]/g, '');
  const uriParts = currentUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)/);
  
  if (!uriParts) {
    console.log('❌ Could not parse current connection string!');
    rl.close();
    return;
  }

  const username = uriParts[1];
  const host = uriParts[2] + '@' + uriParts[3]; // This is wrong, let me fix
  // Actually, let me re-parse
  const correctParts = currentUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)/);
  const currentUsername = correctParts[1];
  const currentHost = correctParts[3];

  console.log('Current connection details:');
  console.log(`  Username: ${currentUsername}`);
  console.log(`  Host: ${currentHost}`);
  console.log(`  Database: MISSING (this is the problem!)`);
  console.log('\n');

  console.log('⚠️  IMPORTANT: The authentication error suggests your PASSWORD might be wrong!');
  console.log('\nLet\'s fix this step by step:\n');

  // Get password from user
  console.log('STEP 1: Get your MongoDB Atlas password');
  console.log('─────────────────────────────────────────────');
  console.log('1. Go to: https://cloud.mongodb.com/');
  console.log('2. Click "Database Access"');
  console.log('3. Find user:', currentUsername);
  console.log('4. Click "Edit"');
  console.log('5. Check the password or click "Edit Password" to reset');
  console.log('\n');

  const password = await question('Enter your MongoDB Atlas password: ');
  
  if (!password || password.trim() === '') {
    console.log('\n❌ Password cannot be empty!');
    rl.close();
    return;
  }

  // URL encode password if needed
  let encodedPassword = password.trim();
  // Auto-detect and encode common special characters
  if (encodedPassword.includes('@') || encodedPassword.includes('#') || 
      encodedPassword.includes('$') || encodedPassword.includes('%')) {
    console.log('\n⚠️  Password contains special characters. Encoding them...');
    encodedPassword = encodeURIComponent(encodedPassword);
    console.log('✅ Password encoded');
  }

  // Build correct connection string
  const databaseName = 'scalable-web-app';
  const correctUri = `mongodb+srv://${currentUsername}:${encodedPassword}@${currentHost}/${databaseName}?retryWrites=true&w=majority`;

  console.log('\n─────────────────────────────────────────────');
  console.log('✅ CORRECTED CONNECTION STRING:');
  console.log('─────────────────────────────────────────────');
  console.log(`mongodb+srv://${currentUsername}:***@${currentHost}/${databaseName}?retryWrites=true&w=majority`);
  console.log('─────────────────────────────────────────────\n');

  // Update .env file
  const updatedContent = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${correctUri}`
  );

  fs.writeFileSync(envPath, updatedContent, 'utf8');
  
  console.log('✅ .env file updated successfully!\n');

  console.log('─────────────────────────────────────────────');
  console.log('NEXT STEPS:');
  console.log('─────────────────────────────────────────────');
  console.log('1. ✅ Connection string format fixed');
  console.log('2. ⚠️  Verify Network Access in MongoDB Atlas:');
  console.log('   → Go to Network Access');
  console.log('   → Add your current IP address (or Allow from Anywhere for testing)');
  console.log('3. Test the connection:');
  console.log('   → npm run test-db');
  console.log('\n');

  rl.close();

  // Auto-test connection
  console.log('Testing connection in 2 seconds...\n');
  setTimeout(() => {
    import('./check-connection.js');
  }, 2000);
}

updateConnectionString().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
