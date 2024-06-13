import * as path from "path";
import { FileTool } from "./File/FileTool";
// import { bot } from "./bot";
import { logger } from "../app";

const PluginPath = "./plugins";

export class PluginLoader {
  static exports: any;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() { }

  /** 获取插件 */
  static async getPlugin() {
    return FileTool.readdir(PluginPath);
  }

  /** 加载插件 */
  static async loadPlugin(file: string) {
    this.exports = await import(`../plugins/${file}`);
  }
}
export async function Load() {
  const File = await FileTool.readdir("./plugins");
  File.forEach(async (filename) => {
    if (path.extname(`./plugins/${filename}`) === ".js") {
      logger.log(`正在尝试加载插件: ${filename}`);
      try {
        await PluginLoader.loadPlugin(filename);
        logger.log(`加载插件 ${filename} 成功`);
      } catch (error) {
        logger.error(error);
        logger.error(`加载插件 ${filename} 失败`);
      }
    }
  });
}

// bot.bot.on("open", () => {
//   bot.get_login_info().then((v) => {
//     logger.log(`成功连接到 BOT: ${v.data.nickname} , QQ: ${v.data.user_id}`);
//     Load();
//   });
// });
