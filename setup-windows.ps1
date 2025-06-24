# Windows Setup Script for Noelles Group Website
param(
    [switch]$SkipDependencies,
    [switch]$Force
)

$ErrorActionPreference = "Stop"

Write-Host "=== Noelles Group Website - Windows Setup ===" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node --version
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

$npmVersion = npm --version
Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green

if (-not (Test-Command "psql")) {
    Write-Host "❌ PostgreSQL not found" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host "Make sure to add PostgreSQL to your PATH during installation" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ PostgreSQL found" -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" ".env"
        Write-Host "✅ .env file created" -ForegroundColor Green
        Write-Host "⚠️  Please edit .env file with your database credentials" -ForegroundColor Yellow
    } else {
        Write-Host "❌ .env.example not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
}

# Install dependencies
if (-not $SkipDependencies) {
    if (-not (Test-Path "node_modules") -or $Force) {
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
            exit 1
        }
        Write-Host "✅ Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✅ Dependencies already installed (use -Force to reinstall)" -ForegroundColor Green
    }
}

# Database setup
Write-Host ""
Write-Host "Setting up database..." -ForegroundColor Yellow

# Load environment variables from .env
Get-Content ".env" | ForEach-Object {
    if ($_ -match "^([^#][^=]*)=(.*)$") {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}

$dbUrl = $env:DATABASE_URL
if (-not $dbUrl) {
    Write-Host "❌ DATABASE_URL not found in .env" -ForegroundColor Red
    Write-Host "Please configure your database connection in .env file" -ForegroundColor Yellow
    exit 1
}

# Test database connection
Write-Host "Testing database connection..." -ForegroundColor Yellow
try {
    $pgUser = $env:PGUSER
    $pgHost = $env:PGHOST
    $pgPort = $env:PGPORT
    $pgDatabase = $env:PGDATABASE
    
    # Test connection (this will prompt for password if not set in PGPASSWORD)
    $env:PGPASSWORD = $env:PGPASSWORD
    $result = psql -h $pgHost -p $pgPort -U $pgUser -d $pgDatabase -c "SELECT 1;" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed" -ForegroundColor Red
        Write-Host "Error: $result" -ForegroundColor Red
        Write-Host "Please check your database credentials in .env file" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Database connection test failed: $_" -ForegroundColor Red
    Write-Host "Please verify PostgreSQL is running and credentials are correct" -ForegroundColor Yellow
    exit 1
}

# Push database schema
Write-Host "Pushing database schema..." -ForegroundColor Yellow
npm run db:push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push database schema" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database schema updated" -ForegroundColor Green

# Setup complete
Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open project in VSCode: code ." -ForegroundColor White
Write-Host "2. Install recommended extensions (VSCode will prompt)" -ForegroundColor White
Write-Host "3. Start development server: npm run dev" -ForegroundColor White
Write-Host "   OR use: ./start-dev.ps1" -ForegroundColor White
Write-Host "   OR use: ./start-dev.bat" -ForegroundColor White
Write-Host ""
Write-Host "Application will be available at:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "- Backend: http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "For debugging in VSCode: Press F5" -ForegroundColor Yellow
Write-Host ""

# Offer to start development server
$startNow = Read-Host "Would you like to start the development server now? (y/N)"
if ($startNow -eq "y" -or $startNow -eq "Y") {
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run dev
}