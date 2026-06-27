@echo off
cd /d D:\Software\FreeAgent_text\sites\manifestkit
call npx -y wrangler pages deploy dist --project-name=manifestkit > D:\Software\FreeAgent_text\sites\manifestkit\deploy_result.txt 2>&1
echo DONE >> D:\Software\FreeAgent_text\sites\manifestkit\deploy_result.txt