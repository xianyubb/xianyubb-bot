
import * as path from 'path';
import * as fs from "fs"
import { spawn } from 'child_process';
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

bot.bot.on("open", () => {
  bot.get_login_info().then((v) => {
    console.log("成功连接 BOT: $1, QQ: $2"
      .replace("$1", v.data.nickname)
      .replace("$2",v.data.user_id)
    )
  })
 
})