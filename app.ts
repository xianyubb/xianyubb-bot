import { FileTool } from "./src/File/FileTool"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project_Name = "xianyubb-bot"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Version = [0, 3, 0]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Author = "xianyubb"

const conf = {
  ws: "ws://127.0.0.1:8080",
  bds: {
    use: false,
    port: 8081
  }
}
function config() {
  if (!FileTool.isexists("./config/config.json")) {
    console.log("未读取到配置文件 正在尝试生成")
    FileTool.mkdir("./config")
    FileTool.mkdir("./plugins")
    FileTool.writeTo("./config/config.json", JSON.stringify(conf))
    if (FileTool.isexists("./config/config.json")) {
      console.log("生成成功!请修改配置文件后启动BOT")
    }
  } else {
    require("./src/bot")
    require("./src/api")
    require("./src/Events")
    require("./src/PluginLoader")

  }
}

config();


(global as any).bot = require('./src/bot').bot;



