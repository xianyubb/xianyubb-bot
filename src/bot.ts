import * as fs from "fs"
import { ChildProcess, spawn } from "child_process";
import { Bot } from "./api";

const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString())


// eslint-disable-next-line import/no-mutable-exports, prefer-const
export let bot = new Bot(data_.ws)

let child: ChildProcess;

function restartApp() {
    console.log('Restarting the Node.js application...');

    // 如果子进程存在，则杀死它
    if (child) {
        child.kill();
    }

    // 启动新的子进程
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    startApp();
}



function startApp() {
    console.log('Starting the Node.js application...');

    // 使用 spawn 方法启动子进程
    child = spawn('node', ['app.js'], { stdio: 'inherit' });

    // 监听子进程的关闭事件
    child.on('close', (code) => {
        if (code !== 0) {
            console.error(`Child process exited with code ${code}`);
            // 可以选择在这里处理错误，例如重新启动子进程
            restartApp();
        } else {
            console.log('Child process exited successfully');
        }
    });

    // 监听子进程的错误事件
    child.on('error', (err) => {
        console.error(`Child process error: ${err}`);
        // 可以选择在这里处理错误，例如重新启动子进程
        restartApp();
    });
}


// 启动应用程序


bot.bot.onopen = () => {
    console.log("连接成功")
}





console.log("正在启动xianyubb-bot");
console.log("正在连接go-cqhttp...");
function delay(ms: number) {
    return new Promise(resolve => { setTimeout(resolve, ms) });
}

// 重新连接WebScoket
async function restart() {
    // eslint-disable-next-line no-plusplus
    for (let i = 5; i >= 1; i--) {
        console.log(`即将在 ${i} 秒后重启...`);
        // eslint-disable-next-line no-await-in-loop
        await delay(1000);
    }
    console.log("正在尝试重新启动...");
    startApp();


}


bot.bot.on("error", (error) => {
    console.error("WebSocket 连接错误:", error);
    restart()
});
// 监听连接关闭事件
// eslint-disable-next-line @typescript-eslint/no-unused-vars
bot.bot.on("close", (code, reason) => {
    console.log("WebSocket已关闭,状态码:", code);
});





