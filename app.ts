import * as fs from "fs"

const Package = "xianyubb-bot"
const Version = [0, 1, 5]
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




