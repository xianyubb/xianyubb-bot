import * as fs from "fs"
import "./src/api"
import "./src/bot"
import "./src/Events"
import "./src/Genshin/API"
import "./src/PluginLoader"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Package = "xianyubb-bot"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Version = [0, 1, 5]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Author = "xianyubb"

const Path = "./config/config.json"


function mkdir() {
  if (!fs.existsSync(Path)) {
    fs.mkdirSync("./config")
    fs.writeFileSync(Path, JSON.stringify({
      address: "127.0.0.1",
      port: 8080,
    }))
  }
  if (!fs.existsSync("./plugins")) {
    fs.mkdirSync("./plugins")
  }
}

mkdir()





