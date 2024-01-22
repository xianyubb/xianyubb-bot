import { FileTool } from "./File/FileTool";

const conf = {
  WebSocketAddress: "ws://127.0.0.1:8080",
  token: "",
};
function config() {
  if (!FileTool.isexists("./config/config.json")) {
    console.log("未读取到配置文件 正在尝试生成");
    try {
      FileTool.mkdir("./config");
      FileTool.mkdir("./plugins");
      FileTool.writeTo("./config/config.json", JSON.stringify(conf));
    } catch (error) {
      console.log(error);
    }

    if (FileTool.isexists("./config/config.json")) {
      console.log("生成成功!请修改配置文件后启动BOT");
    }
  } else {
    require("./bot");
    require("./API/api");
    require("./Events");
    require("./PluginLoader");
    require("./HttpApi/api");
  }
}

config();
