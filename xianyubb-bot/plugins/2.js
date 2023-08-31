const bot = require("../app").bot

console.log("hello world!")

async function a() {
  let b = await bot.get_login_info()
  console.log(b)
}

a()
