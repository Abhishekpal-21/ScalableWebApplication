@echo off
echo ========================================
echo Starting Frontend Setup
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
echo ========================================
echo Starting Frontend Development Server...
echo ========================================
echo Frontend will be available at http://localhost:3000
echo Make sure backend is running on port 5000
echo.
npm run dev
