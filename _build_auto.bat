@echo off
cd /d %~dp0
call npm install --legacy-peer-deps 2>&1
echo === INSTALL DONE ===
call npm run build 2>&1
echo === BUILD DONE ===