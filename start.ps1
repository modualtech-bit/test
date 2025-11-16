# Modual Quick Start Script
# Dit script helpt je om snel te starten met Modual

Write-Host "╔═══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                       ║" -ForegroundColor Cyan
Write-Host "║         MODUAL SETUP & START          ║" -ForegroundColor Cyan
Write-Host "║                                       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "🔍 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion gevonden!" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js niet gevonden!" -ForegroundColor Red
    Write-Host "   Download Node.js van: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Druk op Enter om af te sluiten"
    exit
}

Write-Host ""

# Check if .env.local exists
if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local niet gevonden" -ForegroundColor Yellow
    Write-Host "   Het bestand bestaat al met standaard waarden." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   TIP: Voeg je OpenAI API key toe aan .env.local" -ForegroundColor Cyan
    Write-Host "   voor AI website generatie!" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "✅ .env.local gevonden" -ForegroundColor Green
    Write-Host ""
}

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Dependencies worden geïnstalleerd..." -ForegroundColor Yellow
    Write-Host "   Dit kan een paar minuten duren..." -ForegroundColor Cyan
    Write-Host ""
    
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Dependencies succesvol geïnstalleerd!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Fout bij installeren dependencies" -ForegroundColor Red
        Write-Host "   Probeer handmatig: npm install" -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Druk op Enter om af te sluiten"
        exit
    }
} else {
    Write-Host "✅ Dependencies al geïnstalleerd" -ForegroundColor Green
}

Write-Host ""
Write-Host "╔═══════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                       ║" -ForegroundColor Green
Write-Host "║        MODUAL IS KLAAR! 🚀           ║" -ForegroundColor Green
Write-Host "║                                       ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Development server wordt gestart..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Open je browser en ga naar:" -ForegroundColor Cyan
Write-Host "   👉 http://localhost:3000" -ForegroundColor Cyan -BackgroundColor DarkBlue
Write-Host ""
Write-Host "   Druk op Ctrl+C om de server te stoppen" -ForegroundColor Yellow
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

# Start the development server
npm install && npx prisma generate && npm run dev




