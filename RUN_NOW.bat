@echo off
title Scalable Web App - Quick Start Guide
color 0A
echo.
echo ============================================================
echo   SCALABLE WEB APPLICATION - QUICK START
echo ============================================================
echo.
echo ✅ All dependencies have been installed!
echo.
echo This script will help you start the application.
echo.
echo You need TWO terminal windows:
echo   1. Backend server (Port 5000)
echo   2. Frontend server (Port 3000)
echo.
echo ============================================================
echo   IMPORTANT: MongoDB Setup Required First!
echo ============================================================
echo.
echo Before starting, make sure MongoDB is configured:
echo.
echo OPTION A: Local MongoDB
echo   - Make sure MongoDB is running on your computer
echo   - Edit backend\.env file if needed
echo.
echo OPTION B: MongoDB Atlas (Recommended)
echo   1. Go to: https://www.mongodb.com/cloud/atlas
echo   2. Create free account and cluster
echo   3. Edit backend\.env and update MONGODB_URI
echo.
echo ============================================================
echo.
pause
echo.
echo Opening backend folder for you...
echo.
cd /d "%~dp0\backend"
echo Current directory: %CD%
echo.
echo To start backend, run: npm run dev
echo.
echo Opening frontend folder in a new window...
echo.
start cmd /k "cd /d %~dp0\frontend && echo Frontend directory: %CD% && echo. && echo To start frontend, run: npm run dev"
echo.
echo ============================================================
echo   INSTRUCTIONS:
echo ============================================================
echo.
echo TERMINAL 1 (Backend - this window):
echo   cd backend
echo   npm run dev
echo.
echo TERMINAL 2 (Frontend - new window that just opened):
echo   npm run dev
echo.
echo After both servers start:
echo   - Backend: http://localhost:5000/api/health
echo   - Frontend: http://localhost:3000
echo.
echo ============================================================
echo.
echo Press any key to continue to backend directory...
pause >nul
