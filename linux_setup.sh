#!/bin/ksh

if ! npm list ansi-escapes > /dev/null 2>&1
then
    echo "Installing required modules..."
    npm install ansi-escapes > /dev/null 2>&1
else
    echo "Required modules already installed..."
fi

