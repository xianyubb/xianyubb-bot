import * as fs from "fs"
import { Bot } from "./src/api";
import *as keypress from "keypress"
import WebSocket = require("ws");
import { spawn } from 'child_process'
import * as path from 'path';

const Path = "./config/config.json"
function mkdir() {
  if (!fs.existsSync(Path)) {
    fs.mkdirSync("./config")
    fs.writeFileSync(Path, JSON.stringify({
      address: "127.0.0.1",
      port: 8080,
    }))
  }
  if (!fs.existsSync("./plugins")) {
    fs.mkdirSync("./plugins")
  }
}
mkdir()

export function log(...param: any[]) {
  console.log(param)
}
const data_ = JSON.parse(fs.readFileSync(Path).toString())

export let bot = new Bot(`ws://${data_.address}:${data_.port}`)


bot.bot.onopen = () => {
  console.log("连接成功")
}



console.log("正在启动xianyubb-bot")
console.log("正在连接go-cqhttp...")



bot.bot.on("error", (error) => {
  console.error("WebSocket连接错误:", error);
  console.log("正在尝试重连...")
  bot = new Bot(`ws://${data_.address}:${data_.port}`)
  bot.bot.on("error", (err) => {
    console.error("WebSocket重接错误:", error);
    exit()
  })
});
// 监听连接关闭事件
bot.bot.on("close", (code, reason) => {
  console.log("WebSocket已关闭，状态码:", code, "原因:", reason.toString());
  // 在连接关闭时执行适当的处理逻辑
  // 例如，可以尝试重新连接WebSocket
});


function exit() {
  console.log("点击任意键退出")
  // 开启键盘输入的监听
  keypress(process.stdin);

  // 监听键盘按键事件
  process.stdin.on("keypress", (ch, key) => {
    // 只要有键盘按键，就退出程序

    process.exit();
  });

  // 开启标准输入流的输入
  process.stdin.setRawMode(true);
  process.stdin.resume();
}

let restartCount = 0;

bot.bot.onopen = () => {
  console.log("连接成功");
  console.log("正在加载插件")
  const pluginsDir = './plugins'; // plugins文件夹路径
  let pluginarr: string[] = [];
  let restartCount = readRestartCount(); // 从文件中读取重启计数器的值
  const maxRestartCount = 3; // 最大重启次数
  
  async function loadPlugins() {
    try {
      const pluginFiles = await fs.promises.readdir(pluginsDir);
      for (const file of pluginFiles) {
        if (path.extname(file) === '.js') {
          try {
            const pluginModule = await import(`.\\plugins\\${file}`);
            // 在这里执行插件的初始化和使用操作
            console.log(`已加载插件: ${file}`);
            pluginarr.push(file);
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
