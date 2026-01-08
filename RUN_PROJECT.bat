@echo off
title Scalable Web App - Start Project
color 0B
echo.
echo ============================================================
echo   SCALABLE WEB APPLICATION - START PROJECT
echo ============================================================
echo.

echo This will help you start all required services.
echo.
echo You need THREE things running:
echo   1. MongoDB (Database)
echo   2. Backend Server (Port 5000)
echo   3. Frontend Server (Port 3000)
echo.
echo ============================================================
echo.

REM Check MongoDB
echo [STEP 1] Checking MongoDB...
echo.
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    sc query MongoDB | findstr "RUNNING" >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ MongoDB service is running!
        echo.
        goto :start_backend
    ) else (
        echo ⚠️  MongoDB service found but not running.
        echo Starting MongoDB service...
        net start MongoDB >nul 2>&1
        if %errorlevel% equ 0 (
            echo ✅ MongoDB service started!
            echo.
        ) else (
            echo ❌ Could not start MongoDB automatically.
            echo.
            echo Please start MongoDB manually:
            echo   1. Open Services (services.msc)
            echo   2. Find "MongoDB" and start it
            echo   3. OR run: mongod (if installed manually)
            echo.
            pause
            exit /b 1
        )
    )
) else (
    echo ⚠️  MongoDB service not found.
    echo.
    echo Please make sure MongoDB is installed and running.
    echo Options:
    echo   1. Start MongoDB from Services (services.msc)
    echo   2. Run: mongod (if installed manually)
    echo   3. Open MongoDB Compass
    echo.
    echo Press any key after starting MongoDB...
    pause >nul
)

:start_backend
echo ============================================================
echo [STEP 2] Starting Backend Server...
echo ============================================================
echo.
echo Opening backend in new window...
echo.
cd /d "%~dp0\backend"
start "Backend Server - Port 5000" cmd /k "echo Starting Backend Server... && echo. && npm run dev"
timeout /t 3 >nul
echo ✅ Backend server starting (check new window)
echo.

:start_frontend
echo ============================================================
echo [STEP 3] Starting Frontend Server...
echo ============================================================
echo.
echo Opening frontend in new window...
echo.
cd /d "%~dp0\frontend"
start "Frontend Server - Port 3000" cmd /k "echo Starting Frontend Server... && echo. && npm run dev"
timeout /t 3 >nul
echo ✅ Frontend server starting (check new window)
echo.

:summary
echo ============================================================
echo   SETUP COMPLETE!
echo ============================================================
echo.
echo Three windows should be open:
echo.
echo 1. MongoDB        - Database (if started manually)
echo 2. Backend Server - API (Port 5000)
echo 3. Frontend Server - UI (Port 3000)
echo.
echo ============================================================
echo   NEXT STEPS
echo ============================================================
echo.
echo 1. Wait for both servers to start (check their windows)
echo 2. Browser should open automatically to: http://localhost:3000
echo 3. If not, manually open: http://localhost:3000
echo 4. Sign up to create your account
echo 5. Start using the application!
echo.
echo ============================================================
echo   TROUBLESHOOTING
echo ============================================================
echo.
echo If you see errors:
echo   - MongoDB not running → Start it first
echo   - Port already in use → Close other applications
echo   - Module not found → Run: npm install
echo.
echo For detailed help, see: HOW_TO_RUN_PROJECT.md
echo.
echo ============================================================
echo.
echo Press any key to exit this window...
echo (Servers will continue running in their own windows)
pause >nul
