@echo off
title MongoDB Connection Fixer
color 0E
echo.
echo ============================================================
echo   MongoDB Connection String Fixer
echo ============================================================
echo.
echo This will help you fix your MongoDB Atlas connection.
echo.
echo ============================================================
echo   STEP 1: Test Current Connection
echo ============================================================
echo.

node check-connection.js

echo.
echo ============================================================
echo   Connection String Format Guide
echo ============================================================
echo.
echo Your connection string should look like this:
echo.
echo mongodb+srv://username:password@cluster.mongodb.net/DATABASE-NAME?retryWrites=true^&w=majority
echo.
echo IMPORTANT:
echo  1. Replace username with your MongoDB Atlas username
echo  2. Replace password with your database password (URL-encode special chars)
echo  3. Replace DATABASE-NAME with: scalable-web-app
echo  4. Make sure database name comes BEFORE the ? 
echo.
echo ============================================================
echo   Common Issues:
echo ============================================================
echo.
echo ❌ "authentication failed"
echo    → Wrong password or username
echo    → Password needs URL encoding (special characters)
echo.
echo ❌ "timeout"
echo    → IP address not whitelisted in Network Access
echo.
echo ❌ "bad auth"
echo    → User doesn't have proper permissions
echo.
echo ============================================================
echo   Next Steps:
echo ============================================================
echo.
echo 1. Open backend/.env file
echo 2. Check your MONGODB_URI connection string
echo 3. Make sure it includes /scalable-web-app before the ?
echo 4. Verify username and password are correct
echo 5. URL-encode password if it has special characters
echo 6. Run this script again: npm run test-db
echo.
echo See FIX_CONNECTION.md for detailed instructions
echo.
pause
