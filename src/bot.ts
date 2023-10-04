import { Bot } from "./api";
import * as fs from "fs"
import * as keypress from "keypress"
const data_ = JSON.parse(fs.readFileSync("./config/config.json").toString())

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


function keypress(stdin: NodeJS.ReadStream & { fd: 0; }) {
    throw new Error("Function not implemented.");
}

