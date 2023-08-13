let bds = require("../src/BDS").Bds
let bot = require("../app").bot
let Plugin = require("../src/plugins").Plugins


const plugins = new Plugin("test", "test", [0, 1, 0], { author:"hhh" })


bot.BotEvents.on("onReceiveGroupMessage", (msg) => {
  console.log(msg)
})

