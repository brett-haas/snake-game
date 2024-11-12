if (-not (npm list ansi-escapes > $null 2>&1)) {
    Write-Output "Installing required modules..."
    npm install ansi-escapes > $null 2>&1
} else {
    Write-Output "Required modules already installed..."
}
