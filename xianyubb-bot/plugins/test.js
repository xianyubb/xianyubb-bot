let bot = require("../app")

bot.bot.BotEvents.on("onReceiveGroupMessage", (msg) => {
    console.log(msg)
})


