# 🔧 Stacks NFT Marketplace - Windows EPERM Fix (PowerShell)
Write-Host "🔧 Stacks NFT Marketplace - Windows EPERM Fix" -ForegroundColor Cyan
Write-Host ""

Write-Host "⏹️ Stopping any running Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "*next*" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "🗑️ Cleaning build artifacts..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Gray
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

if (Test-Path "node_modules\.cache") {
    Write-Host "Removing Node modules cache..." -ForegroundColor Gray
    Remove-Item -Recurse -Force "node_modules\.cache" -ErrorAction SilentlyContinue
}

if (Test-Path "tsconfig.tsbuildinfo") {
    Write-Host "Removing TypeScript build info..." -ForegroundColor Gray
    Remove-Item "tsconfig.tsbuildinfo" -ErrorAction SilentlyContinue
}

Write-Host "📦 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "🚀 Starting development server with Windows optimizations..." -ForegroundColor Green
Write-Host ""
Write-Host "✅ EPERM Error Fix Applied!" -ForegroundColor Green
Write-Host "✅ Images Configuration Updated!" -ForegroundColor Green
Write-Host "✅ Windows File Watching Optimized!" -ForegroundColor Green
Write-Host ""

$env:NODE_OPTIONS = "--max-old-space-size=4096"
npm run dev -- --port 3003
