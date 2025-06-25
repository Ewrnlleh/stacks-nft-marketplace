@echo off
echo === Stacks NFT Marketplace - Windows Fix ===
echo Fixing Next.js permissions issue...

REM Navigate to project directory
cd /d "c:\Users\Can\Desktop\Stacks NFT Marketplace"

REM Stop any running Next.js processes
echo 1. Stopping any running Node.js processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

REM Clean Next.js cache with multiple attempts
echo 2. Cleaning Next.js cache...
if exist .next rmdir /s /q .next 2>nul
timeout /t 1 /nobreak >nul
if exist .next rmdir /s /q .next 2>nul
if exist node_modules\.cache rmdir /s /q node_modules\.cache 2>nul

REM Clear npm cache
echo 3. Clearing npm cache...
npm cache clean --force >nul 2>&1

REM Set environment variables
echo 4. Setting environment variables...
set NODE_OPTIONS=--max-old-space-size=4096
set FORCE_COLOR=1

REM Start development server
echo 5. Starting development server on port 3003...
echo    URL: http://localhost:3003
echo    Press Ctrl+C to stop the server
echo.
npm run dev:win

pause
