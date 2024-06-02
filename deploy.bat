@DEL %~dp0\.firebase\*.cache
@CALL npm run build
@firebase deploy
