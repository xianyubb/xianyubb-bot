import { Logger } from "./src/Logger";

export const logger = new Logger();


// 获取当前执行脚本的目录（入口文件的所在目录）
const entryDir = __dirname;

// 设置项目根目录
export const rootDir = entryDir; // 这里假设项目根目录在入口文件的上一级目录

logger.log(entryDir);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project_Name = "xianyubb-bot";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Version = [0, 6, 0];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Author = "xianyubb";


require(`./src/config`);
require("./src/Api/otherApi");

// require("./src/Api/QQ_Bot");



process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // 在这里添加你的处理逻辑，例如记录错误或其他操作
});



(global as any).bot = require('./src/bot').bot;
(global as any).OtherAPI = require('./src/API/otherApi').OtherAPI;
(global as any).Logger = require('./src/Logger').Logger;