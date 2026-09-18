@echo off
setlocal
cd /d "%~dp0"
echo =====================================
echo       OUR STORY - LOCAL PREVIEW
echo =====================================
echo.
where node >nul 2>nul || (
  echo Node.js belum ditemukan. Install Node.js 22 LTS terlebih dahulu.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing dependencies...
  call npm install || goto :error
)
echo.
echo Starting local site...
call npm run dev
goto :eof
:error
echo.
echo Terjadi error. Salin error terminal ke ChatGPT.
pause
exit /b 1
