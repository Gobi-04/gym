@echo off
echo ===================================================
echo   Gym Management System - Database Auto-Setup
echo ===================================================
echo.

cd server
echo Installing server dependencies (if needed)...
call npm install --no-audit --no-fund

echo.
echo Running automated database setup script...
call node database\init-db.js

echo.
echo ===================================================
pause
