@echo off
cd /d %~dp0
npx wrangler pages dev ./dist
pause