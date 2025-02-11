

// 获取当前执行脚本的目录（入口文件的所在目录）
export const entryDir = __dirname;


// 设置项目根目录
export const rootDir = entryDir; // 这里假设项目根目录在入口文件的上一级目录


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project_Name = "xianyubb-bot";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Version = [0, 7, 0];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Author = "xianyubb";


require(`./src/config`);
require("./src/Api/otherApi");

// require("./src/Api/QQ_Bot");


(global as any).bot = require('./src/bot').bot;
(global as any).OtherAPI = require('./src/API/otherApi').OtherAPI;
(global as any).Logger = require('./src/Logger').Logger;


