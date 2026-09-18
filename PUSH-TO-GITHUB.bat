@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
echo =============================================
echo        PUSH OUR STORY TO GITHUB
 echo =============================================
echo.
where git >nul 2>nul || (
  echo Git belum ditemukan. Install Git for Windows terlebih dahulu.
  pause
  exit /b 1
)
set /p REPO_URL=Paste URL HTTPS repository GitHub kamu: 
if "%REPO_URL%"=="" (
  echo URL repository tidak boleh kosong.
  pause
  exit /b 1
)
if not exist .git git init
call git branch -M main
call git add .
call git diff --cached --quiet
if errorlevel 1 (
  call git commit -m "Deploy Our Story V7 fixed source" || goto :error
) else (
  echo Tidak ada perubahan baru untuk di-commit.
)
call git remote get-url origin >nul 2>nul
if errorlevel 1 (
  call git remote add origin "%REPO_URL%" || goto :error
) else (
  call git remote set-url origin "%REPO_URL%" || goto :error
)
echo.
echo Pushing to GitHub...
call git push -u origin main || goto :error
echo.
echo Selesai push. Sekarang buka GitHub ^> Settings ^> Pages ^> Source: GitHub Actions.
pause
exit /b 0
:error
echo.
echo Push gagal. Salin pesan error terminal ke ChatGPT.
pause
exit /b 1
