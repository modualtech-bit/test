@echo off
REM Modual Quick Start Script (Windows Batch)
REM Dit script start Modual voor gebruikers die geen PowerShell gebruiken

echo.
echo ========================================
echo          MODUAL SETUP ^& START
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js niet gevonden!
    echo         Download Node.js van: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js gevonden!
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Dependencies worden geinstalleerd...
    echo        Dit kan een paar minuten duren...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Fout bij installeren dependencies
        echo         Probeer handmatig: npm install
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies succesvol geinstalleerd!
) else (
    echo [OK] Dependencies al geinstalleerd
)

echo.
echo ========================================
echo        MODUAL IS KLAAR! 
echo ========================================
echo.
echo [INFO] Development server wordt gestart...
echo.
echo        Open je browser en ga naar:
echo        http://localhost:3000
echo.
echo        Druk op Ctrl+C om de server te stoppen
echo.
echo ========================================
echo.

REM Start the development server
call npm run dev



