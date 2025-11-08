@echo off
echo Installing dependencies for Paddy Rice Tracker...
echo.

cd /d "%~dp0"

echo Step 1: Installing main dependencies...
call npm install

echo.
echo Step 2: Installing Tailwind CSS and related packages...
call npm install -D tailwindcss postcss autoprefixer

echo.
echo Step 3: Installation complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
pause
