@echo off
echo ========================================
echo Starting Backend Server Setup
echo ========================================
echo.

cd /d "%~dp0"

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Checking for .env file...
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Creating .env from env.example...
    copy env.example .env
    echo.
    echo Please edit .env file with your MongoDB connection string
    echo Press any key to continue after editing .env...
    pause >nul
)

echo.
echo ========================================
echo Starting Backend Server...
echo ========================================
echo.
npm run dev
