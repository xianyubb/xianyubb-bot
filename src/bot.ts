import * as fs from "fs";
import { Bot } from "./API/api";
import { logger } from "../app";
import { Load, Loadts } from "./PluginLoader";

const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString());

// eslint-disable-next-line import/no-mutable-exports, prefer-const
export let bot: Bot;
try {
  bot = new Bot(data_.onebot.WebSocketAddress);
  bot.bot.onerror = () => {
    logger.warn("WebSocket 连接错误");
    // reConnect();
  };
} catch (e) {
  logger.error(e.message);
}

bot.bot.onopen = () => {
  logger.log("连接成功");
  bot.get_login_info().then((v) => {
    logger.log(`登录账号: ${v.data.nickname}`);
  });
  logger.log("正在加载插件...");
  Load();
  Loadts();
};

logger.log("启动xianyubb-bot...");
logger.log("连接服务端...");

function reConnect() {
  logger.log("是否尝试进行重连? (yes/no)");
  process.stdin.on("data", (data) => {
    const res = data.toString();
    // logger.log(res.trim().length.toString());
    if (res.trim() === "y" || res.trim() === "yes") {
      // logger.log("尝试重连中...");
      bot = new Bot(data_.WebSocketAddress);
      bot.bot.onerror = (error) => {
        logger.error(error.message);
        logger.error("WebSocket 连接错误");
        reConnect();
        // return;
      };
      bot.bot.onopen = () => {
        logger.log("重新连接成功");
        logger.log("正在加载插件...");
        bot.get_login_info().then((v) => {
          logger.log(`登录账号: ${v.data.nickname}`);
        });
        Load();
        Loadts();
      };
    } else {
      process.stdin.pause();
      process.exit(0);
    }
  });
}

// 监听连接关闭事件
// eslint-disable-next-line @typescript-eslint/no-unused-vars
bot.bot.on("close", (code, reason) => {
  logger.warn(`WebSocket已关闭,状态码:${code}`);
  reConnect();
});

// bot.bot.on("error", () => {
//   logger.log("WebSocket 连接错误");
//   reConnect();
// });

bot.BotEvents.on("onReceiveGroupMessage", (msg) => {
  if (msg.raw_message.trim() === "ping") {
    bot.send_group_msg(msg.group_id, "pong", false);
    logger.log(`[Group][${msg.group_id}] ${msg.sender.nickname} 发送了: ping`);
  }
});

bot.BotEvents.on("onReceivePrivateMessage", (msg) => {
  if (msg.raw_message.trim() === "ping") {
    bot.send_private_msg(msg.user_id, "pong", false);
    logger.log(`[Private][${msg.user_id}] ${msg.sender.nickname} 发送了: ping`);
  }
});
