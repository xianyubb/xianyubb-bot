let bot = require("../app")

bot.bot.get_login_info().then((data) => {
  console.log(JSON.stringify(data))
}).catch((err) => {
  console.log(err)
})




