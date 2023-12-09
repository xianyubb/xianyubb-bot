import * as path from 'path'
import { FileTool } from './File/FileTool';
import { bot } from './bot';


const PluginPath = "./plugins"


export class PluginLoader {
  static exports: any;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() { }

  /** 获取插件 */
  static async getPlugin() {
    return FileTool.readdir(PluginPath)
  }

  /** 加载插件 */
  static async loadPlugin(file: string) {
    this.exports = await import(`../plugins/${file}`)
  }


}
async function Load() {
  const File = await FileTool.readdir("./plugins")
  File.forEach(async (filename) => {
    if (path.extname(`./plugins/${filename}`) === ".js") {
      try {
        await PluginLoader.loadPlugin(filename)
        console.log(`正在加载${filename}`)
      } catch (error) {
        console.error(error)
        console.log(`加载失败${filename}`)
      }
    }
  })
}

bot.bot.on("open", () => {
  bot.get_login_info().then((v) => {
    console.log(`成功连接到 BOT: ${v.data.nickname} , QQ: ${v.data.user_id}`)
    Load()
  })

})