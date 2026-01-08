@echo off
title Quick MongoDB Connection Fix
color 0A
echo.
echo ============================================================
echo   QUICK FIX INSTRUCTIONS
echo ============================================================
echo.
echo Your connection string has TWO problems:
echo.
echo 1. Missing database name: /scalable-web-app
echo 2. Password might be wrong (authentication failed)
echo.
echo ============================================================
echo   FIX STEP 1: Update .env File
echo ============================================================
echo.
echo Open: backend\.env
echo.
echo Find this line:
echo MONGODB_URI=mongodb+srv://abhishek2110pal_db_user:Abhishek21@sacalablewebapplication.s3i3rj8.mongodb.net/?
echo.
echo Replace with:
echo MONGODB_URI=mongodb+srv://abhishek2110pal_db_user:Abhishek21@sacalablewebapplication.s3i3rj8.mongodb.net/scalable-web-app?retryWrites=true^&w=majority
echo.
echo Notice: Added /scalable-web-app before the ?
echo.
pause
echo.
echo ============================================================
echo   FIX STEP 2: Verify Password in MongoDB Atlas
echo ============================================================
echo.
echo The password "Abhishek21" might be wrong!
echo.
echo 1. Go to: https://cloud.mongodb.com/
echo 2. Database Access -^> Find user: abhishek2110pal_db_user
echo 3. Click Edit -^> Edit Password
echo 4. Set new password (simple one like: MyPass123)
echo 5. Update .env file with new password
echo.
pause
echo.
echo ============================================================
echo   After fixing, test with: npm run test-db
echo ============================================================
echo.
echo Opening .env file for you to edit...
echo.
timeout /t 3
notepad backend\.env
echo.
echo After saving .env, run: npm run test-db
