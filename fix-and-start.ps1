# Fix Next.js permissions and start development server
Write-Host "=== Stacks NFT Marketplace - Windows Fix ===" -ForegroundColor Cyan
Write-Host "Fixing Next.js permissions issue..." -ForegroundColor Yellow

# Navigate to project directory
Set-Location "c:\Users\Can\Desktop\Stacks NFT Marketplace"

# Stop any running Node.js processes
Write-Host "1. Stopping any running Node.js processes..." -ForegroundColor Blue
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Force kill any processes using port 3000-3003
Write-Host "2. Freeing up ports 3000-3003..." -ForegroundColor Blue
$ports = @(3000, 3001, 3002, 3003)
foreach ($port in $ports) {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    if ($process) {
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
    }
}

# Clean Next.js build artifacts with multiple attempts
Write-Host "3. Cleaning Next.js cache..." -ForegroundColor Blue
for ($i = 1; $i -le 3; $i++) {
    Write-Host "   Attempt $i/3..." -ForegroundColor Gray
    Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path node_modules\.cache -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path .next\trace -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    if (-not (Test-Path .next)) { break }
}

# Clear npm cache
Write-Host "4. Clearing npm cache..." -ForegroundColor Blue
npm cache clean --force 2>$null

# Set environment variables for Windows
Write-Host "5. Setting environment variables..." -ForegroundColor Blue
$env:NODE_OPTIONS = "--max-old-space-size=4096"
$env:FORCE_COLOR = "1"

# Start development server on port 3003
Write-Host "6. Starting development server on port 3003..." -ForegroundColor Green
Write-Host "   URL: http://localhost:3003" -ForegroundColor Cyan
Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

Start-Process powershell -ArgumentList "-Command", "cd 'c:\Users\Can\Desktop\Stacks NFT Marketplace'; npm run dev:win" -WindowStyle Normal
