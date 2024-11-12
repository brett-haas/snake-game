@echo off

npm list ansi-escapes >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing required modules...
    npm install ansi-escapes >nul 2>&1
) else (
    echo Required modules already installed...
)
