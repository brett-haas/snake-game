$npmListOutput = npm list ansi-escapes --depth=0 2>&1
if ($npmListOutput -like "*ansi-escapes*") {
    Write-Output "Required modules already installed..."
} else {
    Write-Output "Installing required modules..."
    npm install ansi-escapes > $null 2>&1
}
