@echo off
:a
node index.js
if %ERRORLEVEL% EQU 0 exit
echo Crashed... Restarting
goto a
