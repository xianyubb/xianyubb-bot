import * as fs from "fs";
import { Bot } from "./API/api";
import { logger } from "../app";
import { Load } from "./PluginLoader";

const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString());

// eslint-disable-next-line import/no-mutable-exports, prefer-const
export let bot: Bot;
try {
  bot = new Bot(data_.WebSocketAddress);
  bot.bot.onerror = () => {
    logger.warn("WebSocket 连接错误");
    // reConnect();
  };
} catch (e) {
  logger.error(e.message);
}


// let child: ChildProcess;
// 
// function restartApp() {
//   logger.log("Restarting the Node.js application...");
// 
//   // 如果子进程存在，则杀死它
//   if (child) {
//     child.kill();
//   }
// 
//   // 启动新的子进程
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   startApp();
// }
// 
// function startApp() {
//   logger.log("Starting the Node.js application...");
// 
//   // 使用 spawn 方法启动子进程
//   child = spawn("node", ["app.js"], { stdio: "inherit" });
// 
//   // 监听子进程的关闭事件
//   child.on("close", (code) => {
//     if (code !== 0) {
//       console.error(`Child process exited with code ${code}`);
//       // 可以选择在这里处理错误，例如重新启动子进程
//       restartApp();
//     } else {
//       logger.log("Child process exited successfully");
//     }
//   });
// 
//   // 监听子进程的错误事件
//   child.on("error", (err) => {
//     console.error(`Child process error: ${err}`);
//     // 可以选择在这里处理错误，例如重新启动子进程
//     restartApp();
//   });
// }

// 启动应用程序

bot.bot.onopen = () => {
  logger.log("连接成功");
  Load();
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
        Load();
        
      };
    }
    else {
      process.stdin.pause();
      process.exit(0);
    }
  });
}

// 监听连接关闭事件
// eslint-disable-next-line @typescript-eslint/no-unused-vars
bot.bot.on("close", (code, reason) => {
  logger.warn(`WebSocket已关闭,状态码:${  code}`);
  reConnect();
});



// bot.bot.on("error", () => {
//   logger.log("WebSocket 连接错误");
//   reConnect();
// });