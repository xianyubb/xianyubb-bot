let bds = require("../src/BDS").Bds
let bot = require("../app").bot
let Plugin = require("../src/plugins").Plugins


const plugins = new Plugin("test", "test", [0, 1, 0], { author:"hhh" })


let b = new bds(8081)

b.bds.on("connection", (ws) => {
  b.receive().then((v) => {
    console.log(v)
  })
})
