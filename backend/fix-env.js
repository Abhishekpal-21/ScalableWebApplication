import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

console.log('🔧 MongoDB Connection String Fixer\n');

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Creating .env from env.example...\n');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created. Please edit it with your MongoDB connection string.\n');
  }
  process.exit(1);
}

// Read .env file
let envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

console.log('Current .env file contents:');
console.log('─'.repeat(60));

let mongoUriLine = null;
let mongoUriIndex = -1;

lines.forEach((line, index) => {
  if (line.trim().startsWith('MONGODB_URI=')) {
    mongoUriLine = line;
    mongoUriIndex = index;
    // Show connection string with password hidden
    const match = line.match(/MONGODB_URI=(.+)/);
    if (match) {
      const uri = match[1].trim().replace(/['"]/g, '');
      const hiddenUri = uri.replace(/:([^:@]+)@/, ':***@');
      console.log(`Line ${index + 1}: MONGODB_URI=${hiddenUri}`);
    }
  } else {
    console.log(`Line ${index + 1}: ${line}`);
  }
});

console.log('─'.repeat(60));

if (!mongoUriLine) {
  console.log('\n❌ MONGODB_URI not found in .env file!');
  process.exit(1);
}

// Extract connection string
const uriMatch = mongoUriLine.match(/MONGODB_URI=(.+)/);
if (!uriMatch) {
  console.log('\n❌ Could not parse MONGODB_URI!');
  process.exit(1);
}

let connectionString = uriMatch[1].trim().replace(/['"]/g, '');

console.log('\n📋 Analysis:');
console.log('─'.repeat(60));

// Check for issues
const issues = [];

// Check if database name is missing
if (!connectionString.includes('/') || connectionString.includes('/?')) {
  issues.push('❌ Missing database name in connection string');
}

// Check if password might be wrong (we can't verify without connecting)
issues.push('⚠️  Password authentication is failing - verify password in MongoDB Atlas');

// Check format
if (!connectionString.includes('mongodb+srv://')) {
  issues.push('❌ Connection string should start with mongodb+srv://');
}

// Check for database name
const dbNameMatch = connectionString.match(/mongodb\+srv:\/\/[^/]+\/([^?]+)/);
if (!dbNameMatch || !dbNameMatch[1]) {
  issues.push('❌ Database name missing - should be: /scalable-web-app');
}

// Check query parameters
if (connectionString.includes('appName=')) {
  issues.push('⚠️  Connection string has appName parameter - should use: ?retryWrites=true&w=majority');
}

issues.forEach(issue => console.log(issue));

console.log('─'.repeat(60));

// Generate correct format
const correctFormat = 'mongodb+srv://USERNAME:PASSWORD@HOST/DATABASE?retryWrites=true&w=majority';

console.log('\n✅ CORRECT FORMAT:');
console.log('─'.repeat(60));
console.log(correctFormat);
console.log('─'.repeat(60));

// Extract parts from current connection string
const uriParts = connectionString.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)(?:\/([^?]*))?(?:\?(.+))?/);

if (uriParts) {
  const username = uriParts[1];
  const password = uriParts[2];
  const host = uriParts[3];
  const database = uriParts[4] || '';
  const queryParams = uriParts[5] || '';

  console.log('\n📝 Extracted Connection Details:');
  console.log('─'.repeat(60));
  console.log(`Username: ${username}`);
  console.log(`Password: ${password.length > 0 ? '***' + password.slice(-2) : 'MISSING'}`);
  console.log(`Host: ${host}`);
  console.log(`Database: ${database || 'MISSING'}`);
  console.log(`Query Params: ${queryParams || 'MISSING/INCORRECT'}`);
  console.log('─'.repeat(60));

  // Build corrected connection string
  const correctedDatabase = database || 'scalable-web-app';
  const correctedQueryParams = 'retryWrites=true&w=majority';
  const correctedUri = `mongodb+srv://${username}:${password}@${host}/${correctedDatabase}?${correctedQueryParams}`;

  console.log('\n✨ CORRECTED CONNECTION STRING:');
  console.log('─'.repeat(60));
  console.log(`mongodb+srv://${username}:***@${host}/${correctedDatabase}?${correctedQueryParams}`);
  console.log('─'.repeat(60));

  console.log('\n⚠️  IMPORTANT NEXT STEPS:');
  console.log('─'.repeat(60));
  console.log('1. Verify your password in MongoDB Atlas:');
  console.log('   → Go to: https://cloud.mongodb.com/');
  console.log('   → Database Access → Find user:', username);
  console.log('   → Click "Edit" → Verify or reset password');
  console.log('');
  console.log('2. If password has special characters, URL encode them:');
  console.log('   @ → %40    # → %23    $ → %24    % → %25');
  console.log('');
  console.log('3. Update your .env file with the corrected format above');
  console.log('   Replace the entire MONGODB_URI line with:');
  console.log(`   MONGODB_URI=${correctedUri.replace(password, 'YOUR_PASSWORD')}`);
  console.log('');
  console.log('4. Make sure Network Access in Atlas includes your IP');
  console.log('─'.repeat(60));

  // Ask if user wants to update
  console.log('\n💡 TIP: The authentication error usually means:');
  console.log('   1. Password is incorrect');
  console.log('   2. Password needs URL encoding (special characters)');
  console.log('   3. Username is incorrect');
  console.log('   4. Database user was deleted or changed');
} else {
  console.log('\n❌ Could not parse connection string format!');
  console.log('Please check your connection string format.');
}

console.log('');
