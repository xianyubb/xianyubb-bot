import * as fs from "fs";
import { logger } from "../app";
import { FileTool } from "./File/FileTool";

const conf = {
  onebot: {
    WebSocketAddress: "ws://127.0.0.1:8080",
  },
  BDS: {
    Enable: false,
    port: 8081,
  }
};

const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString());

function config() {
  if (!FileTool.isexists("./config/config.json")) {
    logger.log("未读取到配置文件 正在尝试生成");
    try {
      FileTool.mkdir("./config");
      FileTool.writeTo("./config/config.json", JSON.stringify(conf));
      FileTool.mkdir("./plugins");
      FileTool.mkdir("./plugins_ts");
    } catch (error) {
      logger.log(error);
    }

    if (FileTool.isexists("./config/config.json")) {
      logger.log("生成成功!请修改配置文件后启动BOT");
    }
  } else {
    require("./bot");
    require("./API/api");
    require("./Events");
    require("./PluginLoader");
    if (data_.BDS.Enable) {
      require("./BDS/index");
    }
  }
}

config();
