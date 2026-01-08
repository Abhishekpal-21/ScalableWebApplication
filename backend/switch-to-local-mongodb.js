import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

console.log('\n🔄 Switching to Local MongoDB Community Edition\n');

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found! Creating from env.example...\n');
  const envExamplePath = path.join(__dirname, 'env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created!\n');
  } else {
    console.log('❌ env.example not found either!');
    process.exit(1);
  }
}

// Read current .env
let envContent = fs.readFileSync(envPath, 'utf8');

// Check if already using local MongoDB
if (envContent.includes('mongodb://localhost') || envContent.includes('mongodb://127.0.0.1')) {
  console.log('✅ Already configured for local MongoDB!\n');
  console.log('Current MONGODB_URI:');
  const currentUri = envContent.match(/MONGODB_URI=(.+)/);
  if (currentUri) {
    console.log(currentUri[1].trim().replace(/['"]/g, ''));
  }
  console.log('\nIf MongoDB is running, you can test with: npm run test-db\n');
  process.exit(0);
}

// Create backup
const backupPath = envPath + '.backup';
fs.writeFileSync(backupPath, envContent, 'utf8');
console.log(`✅ Backup created: .env.backup\n`);

// Update MONGODB_URI
const localUri = 'mongodb://localhost:27017/scalable-web-app';
const updatedContent = envContent.replace(
  /MONGODB_URI=.*/,
  `MONGODB_URI=${localUri}`
);

// Write updated content
fs.writeFileSync(envPath, updatedContent, 'utf8');

console.log('✅ .env file updated successfully!\n');
console.log('─'.repeat(60));
console.log('NEW Connection String:');
console.log(`MONGODB_URI=${localUri}`);
console.log('─'.repeat(60));

console.log('\n📋 Next Steps:\n');
console.log('1. Make sure MongoDB is running:');
console.log('   → Check Services: Get-Service -Name MongoDB');
console.log('   → Start service: net start MongoDB');
console.log('   → Or run: mongod\n');
console.log('2. Test the connection:');
console.log('   → npm run test-db\n');
console.log('3. If successful, start your backend:');
console.log('   → npm run dev\n');
