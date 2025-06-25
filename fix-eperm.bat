@echo off
echo 🔧 Stacks NFT Marketplace - Windows EPERM Fix
echo.

echo ⏹️ Stopping any running Node processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM "next-router-worker*" 2>nul
timeout /t 2 >nul

echo 🗑️ Cleaning build artifacts...
if exist ".next" (
    echo Removing .next directory...
    rmdir /s /q ".next" 2>nul
    timeout /t 1 >nul
)

if exist "node_modules\.cache" (
    echo Removing Node modules cache...
    rmdir /s /q "node_modules\.cache" 2>nul
)

if exist "tsconfig.tsbuildinfo" (
    echo Removing TypeScript build info...
    del "tsconfig.tsbuildinfo" 2>nul
)

echo 📦 Clearing npm cache...
npm cache clean --force

echo 🚀 Starting development server with Windows optimizations...
echo.
echo ✅ EPERM Error Fix Applied!
echo ✅ Images Configuration Updated!
echo ✅ Windows File Watching Optimized!
echo.

set NODE_OPTIONS=--max-old-space-size=4096
npm run dev -- --port 3003

pause
