@echo off
title Start Local MongoDB
color 0A
echo.
echo ============================================================
echo   Starting Local MongoDB Community Edition
echo ============================================================
echo.

REM Check if MongoDB service exists
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo Checking MongoDB Service...
    sc query MongoDB | findstr "RUNNING" >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ MongoDB service is already running!
        echo.
        goto :update_env
    ) else (
        echo Starting MongoDB service...
        net start MongoDB
        if %errorlevel% equ 0 (
            echo ✅ MongoDB service started successfully!
            echo.
            goto :update_env
        ) else (
            echo ⚠️  Could not start MongoDB service automatically.
            echo Please start it manually from Services or run mongod command.
            echo.
            pause
            exit /b 1
        )
    )
) else (
    echo ⚠️  MongoDB service not found as Windows service.
    echo.
    echo Please start MongoDB manually:
    echo   1. Run: mongod
    echo   2. OR start from MongoDB Compass
    echo   3. OR check if MongoDB is installed correctly
    echo.
    pause
    exit /b 1
)

:update_env
echo ============================================================
echo   Updating .env file for Local MongoDB
echo ============================================================
echo.

REM Check if .env exists
if not exist .env (
    echo ❌ .env file not found!
    echo Creating from env.example...
    copy env.example .env
)

REM Read current MONGODB_URI
findstr /C:"MONGODB_URI=" .env > temp_env_line.txt
set /p CURRENT_URI=<temp_env_line.txt
del temp_env_line.txt

echo Current connection string:
echo %CURRENT_URI%
echo.

REM Check if already using local MongoDB
echo %CURRENT_URI% | findstr /C:"mongodb://localhost" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Already configured for local MongoDB!
    echo.
) else (
    echo Updating to local MongoDB connection string...
    echo.
    
    REM Create backup
    copy .env .env.backup >nul 2>&1
    
    REM Update MONGODB_URI
    powershell -Command "(Get-Content .env) -replace 'MONGODB_URI=.*', 'MONGODB_URI=mongodb://localhost:27017/scalable-web-app' | Set-Content .env"
    
    echo ✅ .env file updated!
    echo New connection string: mongodb://localhost:27017/scalable-web-app
    echo.
)

echo ============================================================
echo   Test Connection
echo ============================================================
echo.
echo Testing MongoDB connection...
echo.
node check-connection.js

echo.
echo ============================================================
echo   Next Steps
echo ============================================================
echo.
echo 1. ✅ MongoDB should be running
echo 2. ✅ .env file updated for local MongoDB
echo 3. Start your backend server:
echo    npm run dev
echo.
pause
