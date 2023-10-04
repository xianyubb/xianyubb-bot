
import * as path from 'path';
import * as fs from "fs"
import { FileTool } from './File/FileTool';
import { spawn } from 'child_process';
import { bot } from './bot';
const PluginPath = "./plugins"


export class PluginLoader {
  exports: any;
  static exports: any;

  constructor() { }

  /** 获取插件 */
 static async getPlugin() {
    return await FileTool.readdir(PluginPath)
  }
  /** 加载插件 */
  static async loadPlugin(file: string) {
    this.exports = await import(`./plugins/${file}`)
  }


}

bot.bot.onopen = () => {
  console.log("连接成功");
  console.log("正在加载插件")
  let restartCount = readRestartCount(); // 从文件中读取重启计数器的值
  const maxRestartCount = 3; // 最大重启次数
  async function loadPlugins() {
    try {
      const pluginFiles = await PluginLoader.getPlugin()
      for (const file of pluginFiles) {
        if (path.extname(file) === '.js') {
          try {
            PluginLoader.loadPlugin(file)
            // 在这里执行插件的初始化和使用操作
            console.log(`已加载插件: ${file}`);
          } catch (error) {
            console.error(`加载插件时出错: ${file}`);
            console.error(error);
            restartProgram(); // 发生错误时重启程序
          }
        }
      }
    } catch (error) {
      console.error('读取插件文件夹时出错');
      console.error(error);
      restartProgram(); // 发生错误时重启程序
    }
  }

  function readRestartCount() {
    try {
      const data = fs.readFileSync('restartCount.txt', 'utf8');
      return parseInt(data);
    } catch (error) {
      return 0; // 如果文件不存在或读取错误，则默认为0
    }
  }

  function writeRestartCount(count: number) {
    fs.writeFileSync('restartCount.txt', count.toString(), 'utf8');
  }

  function restartProgram() {
    restartCount++;
    if (restartCount <= maxRestartCount) {
      console.log(`正在重启程序，重启次数: `);
      writeRestartCount(restartCount); // 将计数器的值写入文件
      const nodeCmd = process.argv[0]; // 当前 Node.js 可执行文件路径
      const scriptPath = process.argv[1]; // 当前脚本文件路径
      const args = process.argv.slice(2); // 命令行参数（去除前两个默认参数）
      const child = spawn(nodeCmd, [scriptPath, ...args], { stdio: 'inherit' });
      child.on('exit', (code) => {
        process.exit(code); // 子进程退出时，父进程也退出，并返回相同的退出码
      });
    } else {
      console.log(`达到最大重启次数: ，重置重启次数`);
      writeRestartCount(0); // 重置计数器为零
      process.exit(1);
    }
  }

  loadPlugins();

}
