del /f/s/q dist\app.js.map
del /f/s/q dist\src\api.js.map
del /f/s/q dist\src\Events.js.map
del /f/s/q dist\src\BDS.js.map
del /f/s/q dist\src\plugins.js.map
del /f/s/q dist\src\data.js.map
copy package.json dist
bz a "xianyubb-bot.zip" "dist"