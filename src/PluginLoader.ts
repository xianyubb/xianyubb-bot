import path = require('path');
import { FileTool } from './File/FileTool';
import { bot } from './bot';

const PluginPath = "./plugins"


export class PluginLoader {
  exports: any;

  static exports: any;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() { }

  /** 获取插件 */
  static async getPlugin() {
    return FileTool.readdir(PluginPath)
  }

  /** 加载插件 */
  static async loadPlugin(file: string) {
    this.exports = await import(`./plugins/${file}`)
  }


}
async function Load() {
  const File = await FileTool.readdir("./plugins")
  File.forEach((filename) => {
    if (path.extname(`./plugins/${filename}`) === ".js") {
      import(`../../plugins/${filename}`)
    }
  })
}

bot.bot.on("open", () => {
  bot.get_login_info().then((v) => {
    console.log(`成功连接到 BOT: ${v.data.nickname} , QQ: ${v.data.user_id}`)
    Load()
  })

})