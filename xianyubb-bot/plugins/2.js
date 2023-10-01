
///// <reference path="C:/Users/Administrator/Desktop/xianyubb-bot/completion/index.d.ts" />

let bot = require("../app.js").bot

console.log("hello world!")

async function a() {
  let b = await bot.get_login_info()
  console.log(b)
}

a()
bot.BotEvents.on()



